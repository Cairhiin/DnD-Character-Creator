import express from 'express';
const router = express.Router();
import { Character } from '../models/character.js';

router.post('', async (req, res, next) => {
    const character = new Character(req.body);

    try {
        await Character.addCharacter(character);
        return res.json({ success: true, message: 'Character added successfully' });
    } catch (err) {
        console.error(err)
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

router.get('/:id', async (req, res, next) => {
    try {
        const character = await Character.getCharacterById(req.params.id);
        return res.json({ success: true, results: character });
    } catch (err) {
        console.error(err);
        return res.json({ success: false, message: `Failed to retrieve character with id: ${id}`})
    }
});

router.put('/:id', async (req, res, next) => {
    try {
        await Character.updateCharacter(req.params.id, req.body);
        return res.json({ success: true, message: 'Character updated successfully' });
    } catch (err) {
        console.error(err)
        return res.json({ success: false, message: `Failed to update character with id: ${id}` });
    }
});

router.delete('/:id', async (req, res, next) => {
    try {
        await Character.deleteCharacter(req.params.id);
        return res.json({ success: true, message: 'Character deleted successfully' });
    } catch (err) {
        console.error(err)
        return res.json({ success: false, message: `Failed to delete character with id: ${id}` });
    }
});

export default router;