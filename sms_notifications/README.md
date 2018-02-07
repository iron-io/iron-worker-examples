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

- You must have an [Iron.io](http://www.iron.io) account
- Have your iron credentials setup. See: http://dev.iron.io/worker/reference/configuration/
- Install the IronWorker command line (CLI) tool: http://dev.iron.io/worker/cli/
- Fill the `payload.json` file with your Twilio information. In the 'to' field,
enter your own mobile phone number so you can receive the text.

## Sending a Text

- Install the dependencies for your code:
```sh
docker run --rm -v "$PWD":/worker -w /worker iron/ruby:dev bundle install --standalone --clean
```
- Package and upload the worker if it hasn't been uploaded yet, from command line:
```sh
zip -r twilio.zip .
iron worker upload --name twilio --zip twilio.zip iron/ruby ruby sms.rb
```
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

