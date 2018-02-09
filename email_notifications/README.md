# Email worker example

Sending notifications is key to delivering great service. A growing user base means distributing the effort and shrinking the time it takes to get emails and messages to your users.

This communication never really needs to block requests, however. Notifications are asynchronous by nature, which makes them a perfect match for Iron.io’s services. As your application grows, your notification system needs to scale with your user base and usage. This, again, is something that the elastic, on-demand, massively scalable Iron.io architecture supports out of the box.

## Getting started

- Be sure you've followed the base [getting started instructions on the top level README](https://github.com/iron-io/iron-worker-examples)
- You must have a [Sendgrid](https://sendgrid.com/) account
- Fill the `payload.json` file with the actual information.

## Sending an Email

- Install the dependencies for your code:
```sh
docker run --rm -v "$PWD":/worker -w /worker iron/ruby:dev bundle install --standalone --clean
```
- Package and upload the worker from command line. Don't forget to replace `YOUR_SENDGRID_API_KEY` with real value:
```sh
zip -r email_worker.zip .
iron worker upload -e SENDGRID_API_KEY=YOUR_SENDGRID_API_KEY --name email_worker --zip email_worker.zip iron/ruby ruby send_email.rb
```
- Queue up an email task:
```sh
iron worker queue --payload-file payload.json --wait email_worker
```
- You should get an email in a few seconds
