const FCM = require('fcm-node');
const iron_worker = require('iron_worker');

const fcm = new FCM(process.env.FCM_SERVER_KEY);

const to = iron_worker.params().to;                     //this may vary according to the message type (single recipient, multicast, topic, et cetera)
const notification = iron_worker.params().notification; // you can send only notification or only data(or include both)
const payload = iron_worker.params().data;

const message = {
    to: to
};

if (notification) {
    message.notification = notification;
}
if (payload) {
    message.data = payload;
}

console.log(`--> Pushing to: ${to}, pushing what: ${JSON.stringify(message)}`);
fcm.send(message, function(err, response){
    if (err) {
        console.log(`--> Something has gone wrong! ${err}`);
    } else {
        console.log("--> Successfully sent with response: ", response);
    }
});