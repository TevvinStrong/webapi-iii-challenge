const express = require('express');

const Users = require('../users/userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();


router.post('/', async (req, res) => {
    const createPost = await Posts.insert(req.body);
    res.status(201).json(createPost);
});

router.post('/:id/posts', (req, res) => {

});

router.get('/', (req, res) => {

});

router.get('/:id', (req, res) => {

});

router.get('/:id/posts', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.put('/:id', (req, res) => {

});

//Custom middleware

function validateUserId(req, res, next) {

};

function validateUser(req, res, next) {

};

function validatePost(req, res, next) {

};

module.exports = router;
