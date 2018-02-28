const sgMail      = require('@sendgrid/mail');
const ironWorker  = require('iron_worker');

sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const msg = {
    to:      ironWorker.params().to,
    from:    ironWorker.params().from,
    subject: ironWorker.params().subject,
    text:    ironWorker.params().body,
    html:    ironWorker.params().html,
};

console.log(`--> Sending email obj: ${JSON.stringify(msg)}`);

sgMail
    .send(msg)
    .then(() => {
        console.log('--> Email has been sent!');
    })
    .catch(error => {
        console.error(error.toString());
        process.exit(1);
    });