# Quick and simple web scraping example

The web is full of data — from social, to weather, to real estate, to bitcoin transactions, data is available to access, extract, share, 
create derivatives, and transform in any number of ways. But crawling and extracting data from the web requires lots of concurrent processes that run on a 
continual or frequent basis. Another great fit for background processing and IronWorker.

This example shows how to scrape data from web page with mechanize gem

In this example we will show you how to scrape top torrent records 1337x.to web page

## Getting started

- Be sure you've followed the base [getting started instructions on the top level README](https://github.com/iron-io/iron-worker-examples)

## Quick start

- Install the dependencies for your code:
```sh
docker run --rm -v "$PWD":/worker -w /worker iron/ruby:dev bundle install --standalone --clean
```
- Package and upload the worker from command line:
```sh
zip -r parser.zip .
iron worker upload --name 1337 --zip parser.zip iron/ruby:2.4.3 ruby parser.rb
```
- Queue up an email task:
```sh
iron worker queue --wait 1337
```
- Check logs for scraped data in json type
