# Ringcaptcha SMS worker

This example shows you how to send and schedule SMS messages with Ringcaptcha via IronWorker. IronWorker is for scheduling and Ringcaptcha
is for sending the SMS's. Using IronWorker not only gives you scheduling capabilities, but also allows you to do some
pre-processing before hand to generate custom messages for each of your users and you can parallelize all that work
without any extra effort.

There are two common scenarios:

1. you want to schedule a single SMS to go out at some point in the future.
2. you want to schedule a recurring task that will send SMS's out on some recurring schedule, like nightly for example.

We'll cover both of these. But first, our sms worker, take a look at `sms.rb`. This worker simply sends an sms via Ringcaptcha.

## Getting started

- Be sure you've followed the base [getting started instructions on the top level README](https://github.com/iron-io/iron-worker-examples)
- You must have a [Ringcaptcha](https://ringcaptcha.com/) account
- Fill the `payload.json` file with the actual information. In the 'phone' field
enter a mobile phone number to which sms should come.

## Sending an SMS

#### Use existing iron docker image (for quick example)

- Register your worker with Iron:
```sh
iron register -e "APP_KEY=YOUR_RINGCAPTCHA_APP_KEY" -e "API_KEY=YOUR_RINGCAPTCHA_API_KEY" --name ringcaptcha litvak/ringcaptcha
```

To build your own image with your code, you have to install the dependencies for your code (see step below), build the docker image and push to your dockerhub account.

#### If you don't want to package your code using Docker, you can zip and upload your code directly to Iron

- Install the dependencies for your code:
```sh
docker run --rm -v "$PWD":/worker -w /worker iron/ruby:2.4-dev bundle install --standalone --clean
```
- Package and upload the worker. Don't forget to replace `YOUR_RINGCAPTCHA_APP_KEY` and `YOUR_RINGCAPTCHA_API_KEY` with real values:
```sh
zip -r ringcaptcha.zip .
iron worker upload -e "APP_KEY=YOUR_RINGCAPTCHA_APP_KEY" -e "API_KEY=YOUR_RINGCAPTCHA_API_KEY" --name ringcaptcha --zip ringcaptcha.zip iron/ruby:2.4 ruby sms.rb
```

### Launch it!

- Queue up an sms task:
```sh
iron worker queue --payload-file payload.json --wait ringcaptcha
```
- You should get an sms in a few seconds

## Sending an sms after some time

- Run `iron worker queue --payload-file payload.json -delay 60 ringcaptcha`. It will queue up an sms task in 60 seconds
- Get an sms in 60 seconds!

## Sending an sms on a recurring schedule

- Run `iron worker schedule -payload-file payload.json -run-every 60 -run-times 5 ringcaptcha`. It will schedule an sms task to run every 60 sec. The process will stop after 5 times because the `-run-times` parameter is set
- Look at the Scheduled Tasks tab on IronWorker [dashboard](https://hud-e.iron.io/) to see the schedule.