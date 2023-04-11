const express = require('express');
const router = express.Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const config = require('../config/database');

router.post('/register', async (req, res, next) => {
    let user = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    });

    try {
        await User.addUser(user);
        return res.json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        return res.json({ success: false, message: 'Failed to register user' });
    }
});

router.post('/authenticate', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        const user = await User.getUserByUsername(username);
        
        if (!user) {
            return res.json({ success: false, message: 'No such user'} );
        } 

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
                const token = jwt.sign(user.toJSON(), config.secret, {
                    expiresIn: 604800
                });

                return res.json({
                    success: true,
                    token: `JWT ${token}`,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email
                    }
                });
            } else {
                return res.json({ success: false, message: 'Invalid Credentials'})
            }
        });
    } catch (err) {
        return res.json({ 
            success: false, 
            message: 'An error occured while trying to retrieve the user' 
        });
    } 
});

router.get('/profile', (req, res, next) => {
    res.send('PROFILE');
});

router.get('/validate', (req, res, next) => {
    res.send('VALIDATE');
});

module.exports = router;