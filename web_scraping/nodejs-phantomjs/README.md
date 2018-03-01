# Web scraping example (with master/slave separation)

The web is full of data — from social, to weather, to real estate, to bitcoin transactions, data is available to access, extract, share, 
create derivatives, and transform in any number of ways. But crawling and extracting data from the web requires lots of concurrent processes that run on a 
continual or frequent basis. Another great fit for background processing and IronWorker.

This example shows how to scrape data from web page with phantomjs and separate master worker and slave worker for more _quick execution_ 
and/or to make _less load on web server_ with using concurrency or/and use slave worker to avoid _blocking by ip_ on server side

In this example we will show you how to scrape all winners from all sections from all olympic games from https://www.olympic.org site

## Getting started

- Be sure you've followed the base [getting started instructions on the top level README](https://github.com/iron-io/iron-worker-examples)

## Quick start

- Register your master worker with Iron:
```sh
iron register -e "IW_SLAVE_NAME=phantom_slave" -e "IW_PROJECT_ID=???" -e "IW_TOKEN=???" --name "phantom_master" iron/examples:web_scraping_master_1
```
- Register your slave worker with Iron:
```sh
iron register --name "phantom_slave" iron/examples:web_scraping_slave_1
```
- Queue up an master task:
```sh
iron worker queue phantom_master
```
- Check execution of master and slave workers

## Or you can build docker image by yourself if you want to change something

1. Change something in dockerfile (master or slave) or in `master.js/slave.js` file

2. Build and push docker image for master/slave: `docker build -t USERNAME/REPO . && docker push USERNAME/REPO`

3. And then execute the step above (register master, slave, queue up master worker)

## Or you can use zipped code (see [email_notifications](https://github.com/iron-io/iron-worker-examples/tree/master/email_notifications) example)

1. Create one docker image (with nodejs and phantomjs)
2. Push it to your docker hub repo
3. Execute npm install to get all dependencies
4. Pack your code with all dependencies
5. Upload your code
6. Queue up task
