const mongoose = require('mongoose');

const CharacterSchema = mongoose.Schema({
    name: String,
    race: String,
    class: String,
    subclass: String,
    attributes: { STR: Number, DEX: Number, CON: Number, INT: Number, WIS: Number, CHA: Number },
    skills: {
        acrobatics: Number,
        animalHandling: Number,
        arcana: Number,
        athletics: Number,
        deception: Number,
        history: Number,
        insight: Number,
        intimidation: Number,
        investigation: Number,
        medicine: Number,
        nature: Number,
        perception: Number,
        performance: Number,
        persuasion: Number,
        religion: Number,
        sleightOfHand: Number,
        stealth: Number,
        survival: Number
    },
    date: { type: Date, default: Date.now }
});

const Character = module.exports = mongoose.model('Character', CharacterSchema);

module.exports.getCharacterById = async function(id) {
    const character = await Character.findById(id);
    return character;
};

module.exports.addCharacter = async function(character) {
    await character.save();
};