const express = require('express');

const Users = require('../users/userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();


router.post('/', validatePost, async (req, res) => {
    const createPost = await Posts.insert(req.body);
    res.status(201).json(createPost);
});

router.post('/:id/posts', validateUserId, validateUser, async (req, res) => {
    try {
        const createUser = await Users.insert(req.body);
        res.status(201).json(createUser);
    } catch (error) {
        res.status(500).json({ message: "failed to create user" });
    }
});

router.get('/', async (req, res) => {

});

router.get('/:id', validateUserId, async (req, res) => {

});

router.get('/:id/posts', validateUserId, async (req, res) => {

});

router.delete('/:id', validateUserId, async (req, res) => {

});

router.put('/:id', validateUserId, async (req, res) => {

});

//Custom middleware
async function validateUserId(req, res, next) {
    try {
        const { id } = req.params;
        const user = await Users.findById(id);
        if (user) {
            req.user = user;
            next();
        } else {
            res.status(404).json({ message: "User not found; invalid id" });
        }
    } catch (error) {
        res.status(500).json({ message: "Failed to process request" });
    }
};

async function validateUser(req, res, next) {
    try {
        const newUser = await Users.insert(req.body);
        console.log(newUser);
        if (newUser) {
            req.newUser = newUser;
            next();
        } else {
            res.status(400).json({ message: "missing user data." });
        }
    } catch (error) {
        res.status(400).json({ message: "missing required name field." });
    }
};

async function validatePost(req, res, next) {
    try {
        const newPosts = await Posts.insert(req.body);
        if (newPosts) {
            req.newPosts = newPosts;
            next();
        } else {
            res.status(400).json({ message: "Missing post data." });
        }
    } catch (error) {
        res.status(400).json({ message: "missing required text field" });
    }
};

module.exports = router;
