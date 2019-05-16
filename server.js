//Imports
const express = require('express');
const helmet = require('helmet');

const postRouter = require('./posts/postRouter.js');
const userRouter = require('./users/userRouter.js');

const server = express();

//Configure global middleware.
server.use(express.json()); // built-in middleware
server.use(helmet());
server.use(logger); //Custom middleware

//Configure route handlers
server.use('/api/users', userRouter);
server.use('/api/posts', postRouter);

//Route(test)
server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

//Custom middleware
function logger(req, res, next) {
  console.log(
    ` ${req.method} to ${req.url} from ${req.get(
      'Origin'
    )} [${new Date().toISOString()}]`
  );

  next();
}

module.exports = server;
