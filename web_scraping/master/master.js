const Horseman = require('node-horseman');
const iron_worker = require('iron_worker');

const horseman = new Horseman();
const worker = new iron_worker.Client({token: process.env.IW_TOKEN, project_id: process.env.IW_PROJECT_ID});

const mainPage = 'https://www.olympic.org/olympic-results';
const slaveName = process.env.IW_SLAVE_NAME; // = phantom_slave
let scrapedData = [];

function scrapeGamesByYear(arr) {
    return arr.reduce((promise, year) => {
        return promise
            .then(function () {
                console.log(`--> Processing ${year}`);
                return horseman
                    .evaluate(function (selector) {  // change select box for current year and apply
                        $("#sel-games").val(selector).trigger('change');
                    }, year)
                    .waitFor({ // wait until xhr will be executed and second select box will be filled
                        fn: function waitForSelectorCount(selector, count) {
                            return $(selector).length >= count
                        },
                        args: ["span:contains('Sports')", 6],
                        value: true,
                        timeout: 20000
                    })
                    .evaluate(function (selector) { // grab all games for current year
                        var sports = [];
                        $("#sel-disc option").each(function () {
                            if ($(this).val() && $(this).val() !== "Sports")
                                sports.push($(this).val());
                        });
                        return {
                            games: sports,
                            year: selector
                        };
                    }, year)
                    .then(function (msg) {
                        scrapedData.push(msg);
                    })
            })
            .catch(console.error);
    }, Promise.resolve());
}
function launchSlaveWorkers() {
    return scrapedData.reduce((promise, entry) => {
        return promise
            .then(function () {
                console.log(`--> Launching slave worker for ${entry.year}`);
                return new Promise(function (resolve, reject) {
                    worker.tasksCreate(slaveName, {
                        year: entry.year,
                        games: entry.games
                    }, {}, function (error, body) {
                        if (error) reject(error);
                        else resolve(body);
                    })
                })
            })
            .then(function (body) {
                console.log(`--> Slave worker launched, id: ${body.id}`);
            })
            .catch(console.error);
    }, Promise.resolve());
}

console.log(`--> Starting to work, loading url: ${mainPage}`);
horseman
    .open(mainPage)
    .evaluate(function () {   // grab all olympic games by year
        var years = [];
        $("#sel-games option").each(function () {
            if ($(this).val() && $(this).val() !== "Games")
                years.push($(this).val());
        });
        return years;
    })
    .then(scrapeGamesByYear)  // scrape all games for each year
    .then(launchSlaveWorkers) // launch slave worker for each year
    .finally(function () {
        return horseman.close();
    });
