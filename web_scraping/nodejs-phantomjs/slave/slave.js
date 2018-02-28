const Horseman = require('node-horseman');
const iron_worker = require('iron_worker');

const horseman = new Horseman();

const year = iron_worker.params().year;
const games = iron_worker.params().games;
let result = [];

function scrapeSections() {
    return games.reduce((promise, section) => {  // open and scrape data for each game
        return promise
            .then(() => {
                console.log(`--> Opening https://www.olympic.org${section}`);
                return horseman
                    .open(`https://www.olympic.org${section}`)
                    .evaluate(function () {
                        var game = [];
                        $(".event-box").each(function () { // for each game
                            var winners = [];
                            $(this).find("table>tbody>tr").each(function () { // grab winners
                                winners.push({
                                    country: $.trim($(this).find(".profile-row").text()),
                                    name: $.trim($(this).find(".name").text()),
                                    reward: $.trim($(this).find(".medal>span").text())
                                });
                            });
                            game.push({
                                title: $.trim($(this).find("h2>a").text()),
                                winners: winners
                            });
                        });
                        return game;
                    })
                    .then(function (text) {
                        result.push({
                            section: section,
                            game: text
                        });
                    })
            })
            .catch(console.error);
    }, Promise.resolve());
}

console.log(`--> Starting to work slave worker for year: ${year}`);
scrapeSections()
    .then(() => {
            console.log(`--> FINISHED, result: ${JSON.stringify(result)}`);
            horseman.close()
        }
    );
