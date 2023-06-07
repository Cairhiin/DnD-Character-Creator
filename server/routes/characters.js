import express from 'express';
const router = express.Router();
import { Character } from '../models/character.js';

router.post('', async (req, res, next) => {
    let character = new Character(req.body);

    try {
        await Character.addCharacter(character);
        return res.json({ success: true, message: 'Character added successfully' });
    } catch (err) {
        console.lerrorog(err)
        return res.json({ success: false, message: 'Failed to add character' });
    }
});

router.get('', async (req, res, next) => {
    try {
        const characters = await Character.getCharacters();
        return res.json({ success: true, results: characters });
    } catch (err) {
        console.error(err);
        return res.json({ success: false, message: 'Failed to retrieve character list' });
    } 
});

export default router;