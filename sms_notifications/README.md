# Twilio SMS worker

This example shows you how to send and schedule SMS messages with Twilio via IronWorker. IronWorker for scheduling and Twilio
for sending the SMS's. Using IronWorker not only gives you scheduling capabilities, but also allows you to do some
pre-processing before hand to generate custom messages for each of your users and you can parallelize all that work
without any extra effort.

There are two common scenarios:

1. you want to schedule a single SMS to go out at some point in the future.
2. you want to schedule a recurring task that will send SMS's out on some recurring schedule, like nightly for example.

We'll cover both of these. But first, our sms worker, take a look at `sms.rb`. This worker simply sends an sms via Twilio.

## Getting started

- Be sure you've followed the base [getting started instructions on the top level README](https://github.com/iron-io/iron-worker-examples)
- You must have a [Twilio](https://www.twilio.com/) account
- Fill the `payload.json` file with the actual information. In the 'to' field,
enter your own mobile phone number so you can receive the text. Such parameters as twilio sid and twilio auth token will be passed in env variables for security. Environment variables will be set in upload command.

## Sending a Text

### Ruby way

#### Use existing iron docker image (for quick example)

- Register your master worker with Iron:
```sh
iron register -e "TWILIO_SID=YOUR_TWILIO_SID" -e "TWILIO_TOKEN=YOUR_TWILIO_TOKEN" --name twilio iron/examples:sms_twilio_ruby
```

To build your own image with your code, you have to install the dependencies for your code (see step below), build docker image and push to your docker hub account

#### Or get gems, zip package and upload worker

- Install the dependencies for your code:
```sh
docker run --rm -v "$PWD":/worker -w /worker iron/ruby:dev bundle install --standalone --clean
```
- Package and upload the worker if it hasn't been uploaded yet, from command line. Don't forget to replace `YOUR_TWILIO_SID` and `YOUR_TWILIO_TOKEN` with real values:
```sh
zip -r twilio.zip .
iron worker upload -e TWILIO_SID=YOUR_TWILIO_SID -e TWILIO_TOKEN=YOUR_TWILIO_TOKEN --name twilio --zip twilio.zip iron/ruby ruby sms.rb
```

### Nodejs way

#### Use existing iron docker image (for quick example)

- Register your master worker with Iron:
```sh
iron register -e "TWILIO_SID=???" -e "TWILIO_TOKEN=???" --name "twilio" iron/examples:sms_twilio_node
```

#### Or get node_modules, zip package and upload worker

- Install the dependencies for your code:
```sh
cd node && docker run --rm -v "$PWD":/worker -w /worker iron/node:dev npm install
```
- Package and upload the worker from command line. Don't forget to replace `YOUR_TWILIO_SID` and `YOUR_TWILIO_TOKEN` with real value:
```sh
zip -r twilio.zip .
iron worker upload -e TWILIO_SID=YOUR_TWILIO_SID -e TWILIO_TOKEN=YOUR_TWILIO_TOKEN --name twilio --zip twilio.zip node:alpine node sms.js
```

### PHP way

#### Use existing iron docker image (for quick example)

- Register your master worker with Iron:
```sh
iron register -e "TWILIO_SID=YOUR_TWILIO_SID" -e "TWILIO_TOKEN=YOUR_TWILIO_TOKEN" --name twilio iron/examples:sms_twilio_php
```

To build your own image with your code, you have to install the dependencies for your code (see step below), build docker image and push to your docker hub account

#### Or get dependencies, zip package and upload worker

- Install the dependencies for your code:
```sh
docker run --rm -v "$PWD":/worker -w /worker iron/php:dev composer install
```
- Package and upload the worker if it hasn't been uploaded yet, from command line. Don't forget to replace `YOUR_TWILIO_SID` and `YOUR_TWILIO_TOKEN` with real values:
```sh
zip -r twilio.zip .
iron worker upload -e TWILIO_SID=YOUR_TWILIO_SID -e TWILIO_TOKEN=YOUR_TWILIO_TOKEN --name twilio --zip twilio.zip iron/php php sms.php
```

### Launch it!

- Queue up an sms task:
```sh
iron worker queue --payload-file payload.json --wait twilio
```
- You should get a text in a few seconds

## Sending a text in the future

- Run `iron worker queue --payload-file payload.json -delay 60 twilio` which will queue up an sms task that will run in 60 seconds
- You should get a text in 60 seconds

## Sending a text on a recurring schedule

- Run: `iron worker schedule -payload-file payload.json -run-every 60 -run-times 5 twilio`
- You should start getting a text every minute. The process will stop after 5 times because the `-run-times` parameter is set
- Look at the Scheduled Tasks tab on IronWorker [dashboard](https://hud-e.iron.io/) to see the schedule.

