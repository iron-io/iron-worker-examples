FROM node:9.5.0-alpine

RUN apk add --no-cache nodejs-npm

WORKDIR /app
ADD . /app

RUN npm install

ENTRYPOINT ["node", "send_email.js"]
