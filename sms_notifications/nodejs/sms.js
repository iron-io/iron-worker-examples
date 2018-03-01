const Twilio = require('twilio');
const ironWorker  = require('iron_worker');

const twilio = new Twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);

const data = {
    from: ironWorker.params().from,
    to: ironWorker.params().to,
    body: ironWorker.params().body
};

console.log(`--> Sending sms: ${JSON.stringify(data)}`);

twilio.messages.create(data, (error, result) => {
    if (error) {
        console.error(error);
        process.exit(1);
    } else {
        console.log('--> SMS has been sent!');
        console.log(result);
    }
});
