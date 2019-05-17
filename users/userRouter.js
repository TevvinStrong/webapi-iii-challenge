const express = require('express');

const Users = require('../users/userDb.js');
const Posts = require('../posts/postDb.js');

const router = express.Router();

/*
TODO: Come back and firgure out with post endpoint isn't working.
*/
router.post('/', validatePost, async (req, res) => {
    try {
        const createPost = await Posts.insert(req.body);
        res.status(201).json(createPost);
    } catch (error) {
        res.status(400).json({ message: "failed to create post." });
    }
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
    try {
        const users = await Users.get(req.query);
        res.status(201).json(users);
    } catch (error) {
        res.status(400).json({ message: "users could not be retrieved." });
    }
});

router.get('/:id', validateUserId, async (req, res) => {
    const { id } = req.params;

    try {
        const userId = await Users.findById(id);
        if (userId.length) {
            res.json(userId);
        } else {
            res.status(404).json({ message: "The user with the specified ID does not exist." })
        }
    } catch (error) {
        res.status(400).json({ message: "No users found with that id" });
    }
});

router.get('/:id/posts', validateUserId, async (req, res) => {
    const { id } = req.params;

    try {
        const getUser = await Users.get(id);
        if (getUser.length) {
            res.json(getUser);
        } else {
            res.status(404).json({ message: "The user with the specified podt does not exist." });
        }
    } catch (error) {
        res.status(400), json({ message: "Post for this user does not exist." });
    }
});

router.delete('/:id', validateUserId, async (req, res) => {
    const { id } = req.params;

    try {
        const deleteUser = await Users.get(id);
        if (deleteUser.length) {
            res.json(deleteUser);
        } else {
            res.status(404).json({ message: "The user with the specified id does not exist." });
        }
    } catch (error) {
        res.status(400), json({ message: "User does not exist." });
    }
});

router.put('/:id', validateUserId, async (req, res) => {
    try {
        const updateUser = await Users.update(req.params.id, req.body);
        if (updateUser) {
            res.status(201).json(updateUser);
        } else {
            res.status(404).json({ message: "The user with the specified id does not exist." });
        }
    } catch (error) {
        res.status(400), json({ message: "The user information could not be modified." });
    }
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
            res.status(400).json({ message: "invalid user id." });
        }
    } catch (error) {
        res.status(400).json({ message: "missing required name field" });
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
