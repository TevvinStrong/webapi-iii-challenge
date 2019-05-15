const express = require('express');

const Posts = require('../posts/postDb.js');
const Users = require('../users/userDb.js');

const router = express.Router();

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//Custom middleware

function validatePostId(req, res, next) {

};

module.exports = router;