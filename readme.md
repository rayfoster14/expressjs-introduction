# ExpressJS introduction

## Install

Install as you would any NodeJS application.

1. Make sure `NodeJS` and `npm` are installed. Run `node -v` and `npm -v` in the command line to ensure they have installed correctly.
2. Clone this repository and navigate to it in your command line
3. Run `npm install` at the root repo's directory
4. Run `node server.js` to start the server.
5. Navigate to `http://localhost:3000` on machine it's running on or `http://some.ip.address:3000` for internal network devices.

## Introduction

All of the exciting ExpressJS stuff can be foundi in `server.js`. This is where we can interact with the PC, files, databases.etc. This is not client facing so it's a more secure way of dealing with credentials, or informaiton you don't want exposed, or edit and create files.etc

ExpressJS in this example is serving the `public` folder, that means that the `public` folder will be working as if it's the root of the site, to the web browser. We can define custom endpoints in the `server.js`.

In `public/script.js`, I have made a `GET` and a `POST` call to the ExpressJS server. These calls can be cross referenced in `server.js` to see what they are doing.

ExpressJS can be ran in the background using special programs like [PM2](https://pm2.keymetrics.io/). This will keep the port open and restart the script if an error occurs.
