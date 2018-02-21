# Push notification example (Firebase cloud messaging)

A push notification is a message sent from a central server (publisher) to an end device (subscriber). 
Push notifications tend to go out in batches. For example, a breaking news alert might be sent to millions of subscribers. 
Notice of a flight delay might be sent to thousands of flyers. 
Sending these notifications out in serial batches takes way too long. 
A better architecture is to use IronWorker to deliver these push notifications through APNS and GCM in parallel. 
This approach also lends itself to processing the lists on the fly to either dedup lists or offer customized messages.

This example shows how to send push notification via firebase cloud messaging using nodejs with fcm library.

## Getting started

- Be sure you've followed the base [getting started instructions on the top level README](https://github.com/iron-io/iron-worker-examples)

## Quick start

- Register your master worker with Iron (`FCM_SERVER_KEY` you can find in `firebase dev console`->`project settings`->`cloud messaging`->`Sender ID`):
```sh
iron register -e "FCM_SERVER_KEY=???" --name "chrome_pusher" iron/examples:push_notification
```
- Modify payload.json and queue up an task:
```sh
iron worker queue --payload-file payload.json --wait chrome_pusher
```

## Or you can build docker image by yourself if you want to change something

1. Change something in dockerfile or in `pusher.js` file

2. Build and push docker image: `docker build -t USERNAME/REPO . && docker push USERNAME/REPO`

3. And then execute the step above (register, queue up worker)

## Or you can use zipped code (see [email_notifications](https://github.com/iron-io/iron-worker-examples/tree/master/email_notifications) example)

1. Create one docker image (with nodejs)
2. Push it to your docker hub repo
3. Execute npm install to get all dependencies
4. Pack your code with all dependencies
5. Upload your code
6. Queue up task


## Web-client example how to

Web client example is also included (based on https://github.com/firebase/quickstart-js/tree/master/messaging, added subscribe feature). How to configure:

1. Create project in [firebase console](https://console.firebase.google.com/)
2. Copy project configuration from firebase console and paste them into `init.js` file. `legacyKey` you can find in `project settings`->`cloud messaging`->`Legacy server key` 
3. Change `messagingSenderId` in `firebase-messaging-sw.js`, you can find it in `project settings`->`cloud messaging`->`Sender ID`
4. Install nginx/apache
5. Create domain for this instance
5. Install ssl certificate
6. Deploy this example
7. Open domain in browser
8. Allow notification
9. Subscribe to some topic
10. Send notification via worker (to instance(token) or to topic(`/topics/news`))