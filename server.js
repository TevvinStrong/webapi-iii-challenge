//Imports
const express = require('express');
const helmet = require('helmet');
//  make custom logger
const morgan = require('morgan');

const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

const server = express();

//Built-in middleware
server.use(express.json());
server.use(morgan('dev'));

//Thrid party middleware
server.use(helmet());

//Custom middleware


//Router
server.use('api/users', userRouter);
server.use('api/posts', postRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//Custom middleware

function logger(req, res, next) {
  console.log(
    `[${new Date().toISOString()}] ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )}`
  );

  next();
};

module.exports = server;
