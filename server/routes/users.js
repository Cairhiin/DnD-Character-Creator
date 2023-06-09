import express from 'express';
import Jwt from 'jsonwebtoken';
import passport from 'passport';
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
        return res.status(200).json({ success: true, message: 'User registered successfully' });
    } catch (err) {
        return res.status(500).json({ success: false, message: 'Failed to register user' });
    }
});

router.post('/authenticate', async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
 
    try {
        const user = await User.getUserByUsername(username);
        
        if (!user) {
            return res.status(404).json({ success: false, message: 'No such user'} );
        } 

        User.comparePassword(password, user.password, (err, isMatch) => {
            if (err) throw err;           
            if (isMatch) {               

                const token = Jwt.sign({data: user}, process.env.DATABASE_SECRET, {
					expiresIn: 604800
				});

                return res.status(200).json({
                    success: true,
                    token: token,
                    user: {
                        id: user._id,
                        name: user.name,
                        username: user.username,
                        email: user.email,
                        characters: user.characters
                    }
                });
            } else {
                return res.status(401).json({ success: false, message: 'Invalid Credentials'})
            }
        });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ 
            success: false, 
            message: 'An error occured while trying to retrieve the user' 
        });
    } 
});

router.get('/profile', passport.authenticate('jwt', { session: false }), (req, res, next) => {
    return res.json({ user: req.user });
});

router.get('/:id/characters', async (req, res, next) => {
    try {
        const characters = await User.getCharacters(req.params.id);

        if (!characters) {
            return res.status(404).json({ success: false, message: 'No characters found'});
        }

        return res.status(200).json({ success: true, characters: characters});
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'An error occured while retrieving the characters' });
    }
});

export default router;