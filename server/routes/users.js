import express from 'express';
const router = express.Router();
import { User } from '../models/user.js';

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
                return res.json({
                    success: true,
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
    return res.json({ user: req.user });
});

export default router;