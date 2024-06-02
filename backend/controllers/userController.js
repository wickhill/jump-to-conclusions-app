require('dotenv').config();
const router = require('express').Router();
const axios = require("axios")
const db = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require("../jwt.config")

// I.N.D.U.C.E.S
//
// Index   /user             GET
// New     /user/new         GET
// Delete  /user/:id         DELETE
// Update  /user/:id         PUT/PATCH
// Create  /user             POST
// Edit    /user/:id/edit    GET
// Show    /user/:id         GET

/* modules
--------------------------------------------------------------- */

// SIGNUP
router.post('/signup', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await db.User.findOne({ username });
        if (existingUser) {
            return res.status(409).json({ msg: `Username ${username} already exists. Please sign in.` });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new db.User({
            username,
            email,
            password: hashedPassword
        });
        await newUser.save();
        const token = createToken(newUser);
        res.json({ token, user: newUser });
    } catch (error) {
        console.log("Signup Error:", error.message)
        res.status(400).json({ msg: error.message });
    }
});

// SIGNIN
router.post('/signin', async (req, res) => {
    try {
        console.log("Attempting to sign in with:", req.body); 
        const { username, password } = req.body;
        const foundUser = await db.User.findOne({ username });
        if (!foundUser) throw new Error(`No user found with username ${username}`);
        const validPassword = await bcrypt.compare(password, foundUser.password);
        if (!validPassword) throw new Error(`The password credentials shared did not match the credentials for the user with username ${username}`);
        const token = createToken(foundUser);
        res.json({ token, user: foundUser });
    } catch (error) {
        res.status(400).json({ msg: error.message });
    }
});

// Create token form
function createToken(user) {
    return jwt.sign({ user }, process.env.SECRETKEY);
}

// Verify a token
function checkToken(req, res, next) {
    let token = req.get('Authorization');
    if (token) {
        token = token.split(' ')[1];
        jwt.verify(token, process.env.SECRETKEY, (err, decoded) => {
            req.user = err ? null : decoded.user;
        });
        return next();
    } else {
        req.user = null;
        return next();
    }
}

function ensureLoggedIn(req, res, next) {
    if (req.user) return next();
    res.status(401).json({ msg: 'Unauthorized You Shall Not Pass' });
}

// GET user by id
router.get('/:id', async (req, res) => {
    try {
        const user = await db.User.findById(req.params.id);
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: "Error fetching user", error: error });
    }
});

// DELETE user by id
router.delete('/:id', async (req, res) => {
    try {
        const deletedUser = await db.User.findByIdAndDelete(req.params.id);
        if (!deletedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ message: "Successfully deleted user" });
    } catch (error) {
        console.error('Error deleting user:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

// UPDATE user by id
router.put('/:id', async (req, res) => {
    let { password, ...updateData } = req.body;
    if (password === '') {
        password = undefined; // Ignore password update if field is left empty
    } else {
        const salt = await bcrypt.genSalt(10);
        password = await bcrypt.hash(password, salt);
        updateData.password = password;
    }
    const updatedUser = await db.User.findByIdAndUpdate(
        req.params.id,
        { $set: updateData },
        { new: true }
    ).select('-password -__v');
    const token = createToken(updatedUser);
    res.status(200).json({ token, user: updatedUser });
});


// CREATE Route for User Achievements:
router.get("/:id/achievements", function (req, res) {
    db.user.findById(req.params.id)
        .then((user) => {
            if (user) {
                res.json({ user }); // Send user data as JSON
            } else {
                res.status(404).json({ message: "User not found" }); // Send 404 if user isn't found
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error", error: err });
        });
});

// SHOW Route for User History:
router.get("/:id/history", function (req, res) {
    db.user.findById(req.params.id)
        .then((user) => {
            if (user) {
                res.json({ user }); // Send user data as JSON
            } else {
                res.status(404).json({ message: "User not found" }); // Send 404 if user isn't found
            }
        })
        .catch((err) => {
            console.error(err);
            res.status(500).json({ message: "Internal Server Error", error: err });
        });
});


module.exports = router;
