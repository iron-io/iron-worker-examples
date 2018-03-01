# Email worker example (sending emails via [mailgun](https://www.mailgun.com/))

Sending notifications is key to delivering great service. A growing user base means distributing the effort and shrinking the time it takes to get emails and messages to your users.

This communication never really needs to block requests, however. Notifications are asynchronous by nature, which makes them a perfect match for Iron.io’s services. As your application grows, your notification system needs to scale with your user base and usage. This, again, is something that the elastic, on-demand, massively scalable Iron.io architecture supports out of the box.

## Getting started

- Be sure you've followed the base [getting started instructions on the top level README](https://github.com/iron-io/iron-worker-examples)
- You must have a [mailgun](https://www.mailgun.com/) account
- Fill the `payload.json` file with the actual information.

## Sending an Email

### Ruby way

#### Use existing iron docker image (for quick example)

- Register your master worker with Iron:
```sh
iron register -e "MAILGUN_API_KEY=???" --name "email_worker" iron/examples:email_mailgun_ruby
```

To build your own image with your code, you have to install the dependencies for your code (see step below), build docker image and push to your docker hub account

#### Or get gems, zip package and upload worker

- Install the dependencies for your code:
```sh
cd ruby && docker run --rm -v "$PWD":/worker -w /worker iron/ruby:dev bundle install --standalone --clean
```
- Package and upload the worker from command line. Don't forget to replace `YOUR_MAILGUN_API_KEY` with real value:
```sh
zip -r email_worker.zip .
iron worker upload -e MAILGUN_API_KEY=YOUR_MAILGUN_API_KEY --name email_worker --zip email_worker.zip iron/ruby ruby send_email.rb
```

### Nodejs way

#### Use existing iron docker images (for quick example)

- Register your master worker with Iron:
```sh
iron register -e "MAILGUN_API_KEY=???" --name "email_worker" iron/examples:email_mailgun_node
```

#### Or get node_modules, zip package and upload worker

- Install the dependencies for your code:
```sh
cd node && docker run --rm -v "$PWD":/worker -w /worker iron/node:dev npm install
```
- Package and upload the worker from command line. Don't forget to replace `YOUR_MAILGUN_API_KEY` with real value:
```sh
zip -r email_worker.zip .
iron worker upload -e MAILGUN_API_KEY=YOUR_MAILGUN_API_KEY --name email_worker --zip email_worker.zip node:alpine node send_email.js
```


### Launch it!
- Queue up an email task:
```sh
iron worker queue --payload-file payload.json --wait email_worker
```
- You should get an email in a few seconds
