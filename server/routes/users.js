const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');

router.get('/register', (req, res, next) => {
    let user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    User.addUser(user, (err, user) => {
        if (err) {
            res.json({ success: false, message: 'Failed to register user' });
        } else {
            res,json({ success: true, message: 'User registered successfully'});
        }
    });
});

router.get('/authenticate', (req, res, next) => {
    res.send('AUTHENTICATE');
});

router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

router.get('/validate', (req, res, next) => {
    res.send('VALIDATE');
});

module.exports = router;