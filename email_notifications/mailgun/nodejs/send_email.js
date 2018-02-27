const sgMail      = require('mailgun-js');
const ironWorker  = require('iron_worker');

const mailgun     = require('mailgun-js')({apiKey: process.env.MAILGUN_API_KEY, domain: ironWorker.params().domain});

const data = {
    to:      ironWorker.params().to,
    from:    ironWorker.params().from,
    subject: ironWorker.params().subject,
    html:    ironWorker.params().html,
};

console.log(`--> Sending email obj: ${JSON.stringify(data)}`);

mailgun.messages().send(data, function (error, body) {
    console.log(error);
    if (error) {
        console.error(error);
        process.exit(1);
    } else {
        console.log('--> Email has been sent!');
        console.log(body);
    }
});