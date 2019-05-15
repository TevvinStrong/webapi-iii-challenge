const express = require('express');
const helmet = require('helmet');
//  make custom logger
//const logger = require('morgan');

const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

const server = express();

//Built-in
server.use(express.json());

//Thrid party
server.use(helmet());

//Custom
server.use(logger);

//Router
server.use('api/users', userRouter);
server.use('api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`)
});

//Custom middleware

function logger(req, res, next) {

};

module.exports = server;
