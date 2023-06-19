import express from 'express';
const router = express.Router();
import passport from 'passport';
import { Character } from '../models/character.js';

router.post('', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    const character = new Character(req.body);

    try {
        await Character.addCharacter(character);
        return res.status(200).json({ success: true, message: 'Character added successfully' });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: 'Failed to add character' });
    }
});

router.get('', async (req, res, next) => {
    try {
        const characters = await Character.getCharacters();
        return res.status(200).json({ success: true, results: characters });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: 'Failed to retrieve character list' });
    } 
});

router.get('/:id([0-9a-fA-F]{24})', async (req, res, next) => {
    try {
        const character = await Character.getCharacterById(req.params.id);
        return res.status(200).json({ success: true, results: character });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ success: false, message: `Failed to retrieve character with id: ${id}`})
    }
});

router.put('/:id([0-9a-fA-F]{24})',passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        await Character.updateCharacter(req.params.id, req.body);
        return res.status(200).json({ success: true, message: 'Character updated successfully' });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: `Failed to update character with id: ${id}` });
    }
});

router.delete('/:id([0-9a-fA-F]{24})', passport.authenticate('jwt', { session: false }), async (req, res, next) => {
    try {
        await Character.deleteCharacter(req.params.id);
        return res.status(200).json({ success: true, message: 'Character deleted successfully' });
    } catch (err) {
        console.error(err)
        return res.status(500).json({ success: false, message: `Failed to delete character with id: ${req.params.id}` });
    }
});

export default router;