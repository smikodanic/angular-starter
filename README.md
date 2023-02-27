# ng15-startup
> Angular 15 project startup with builtin API server. A boilerplate code to quickly build your new ng15+ project.


## Features
- integrated authentication: login, logout
- integrated authentication route guards with [ngboost-auth](https://www.npmjs.com/package/ngboost-auth)
- integrated backend API endpoints


## Installation
```bash
// frontend (open in first terminal)
$ git clone git@github.com:smikodanic/ng15-startup.git
$ cd ./ng15-startup
$ rm -rf .git && git init
$ npm install
$ ng serve

// backend API server (open in another terminal)
$ cd ./ng15-startup/server
$ npm install
$ nodmeon
```


## API Server Environment variables
The server requires env files: *development.env.js* and *production.env.js* which should be placed in /server/tmp/envs/ folder.
[Contact me](http://www.mikosoft.info) if you want to get env files with prepared MongoDB password and user collection.
```javascript
module.exports = {
  api_name: 'API - development',
  port: 4444,
  jwt_secret: 'babaDoo', // any string
  pwd_salt: '99dcdf9f3ae0dbb4144f32ec806bb73', // 32 chars length
  mongodb: 'mongodb://ng_user:12345@contact-me'
};

```


## API Endpoints
The API endpoints for user registration, login and test. See file /server/routes/panel/index.js


## Licence
Created by [Saša Mikodanić](http://www.mikosoft.info) under MIT licence.
