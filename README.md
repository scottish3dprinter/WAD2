# WAD2

[repo](https://github.com/scottish3dprinter/WAD2)

[server](http://wad2.arronweir.com) 
username: admin
password: admin


WAD2 is a [Node.js](https://nodejs.org/) and [Express](https://expressjs.com/) web app using MVC structure, Mustache templates, and Docker for deployment.

There is a Github action pipeline set up that deploys to my Ubuntu server that is hosted on [Linode](https://www.linode.com/). It runs on a high port and Nginx passes from 80.


## Features
- MVC folder structure
- Authentication system
- Mustache templates for views
- Docker support

## Getting Started
```bash
git clone https://github.com/scottish3dprinter/WAD2.git
cd WAD2
npm install
npm start
```
Visit [http://localhost:3000](http://localhost:3000)

## Run with Docker
```bash
docker build -t wad2-app .
docker run -p 3000:3000 wad2-app
```
Visit [http://localhost:3000](http://localhost:3000)
