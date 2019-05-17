const express = require('express');

const Posts = require('../posts/postDb.js');
const Users = require('../users/userDb.js');

const router = express.Router();

//Able to get all posts in the database.
router.get('/', async (req, res) => {
    try {
        const getPosts = await Posts.get(req.query);
        res.status(201).json(getPosts);
    } catch (error) {
        res.status(500).json({ message: "he posts information could not be retrieved." });
    }
});

router.get('/:id', validatePostId, async (req, res) => {
    const { id } = req.params;

    try {
        const getPostId = await Posts.findById(id);
        if (getPostId.length) {
            res.status(201).json(getPostId);
        } else {
            res.status(400).json()
        }
    } catch (error) {
        res.status(500).json({ message: "The specifiec post does not exist." });
    }
});

router.delete('/:id', validatePostId, async (req, res) => {
    try {
        const deletePost = await Posts.remove(req.params.id);
        if (deletePosts > 0) {
            res.status(200).json({ message: "The selected posts has been destroyed." });
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    } catch (error) {
        res.status(500).json({ error: "The post could not be removed" });
    }
});

router.put('/:id', validatePostId, async (req, res) => {
    try {
        const updatePosts = await Posts.update(req.params.id, req.body);
        if (updatePosts) {
            res.status(200).json(updatePosts);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    } catch (error) {
        res.status(500).json({ error: "The post information could not be modified." });
    }
});

//Custom middleware

async function validatePostId(req, res, next) {
    try {
        const { id } = req.params;
        const post = await Posts.findById(id);
        if (post) {
            req.post = post;
            next();
        } else {
            res.status(400).json({ message: "invalid post id." });
        }
    } catch (error) {
        res.status(400).json({ message: "missing required name field" });
    }
};

module.exports = router;