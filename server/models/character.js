import mongoose from 'mongoose';

const CharacterSchema = mongoose.Schema({
    name: String,
    race: Object,
    dndClass: Object,
    subClass: Object,
    background: Object,
    level: Number,
    gold: Number,
    xp: Number,
    attributes: { STR: Number, DEX: Number, CON: Number, INT: Number, WIS: Number, CHA: Number },
    skills: {
        acrobatics: Boolean,
        animalHandling: Boolean,
        arcana: Boolean,
        athletics: Boolean,
        deception: Boolean,
        history: Boolean,
        insight: Boolean,
        intimidation: Boolean,
        investigation: Boolean,
        medicine: Boolean,
        nature: Boolean,
        perception: Boolean,
        performance: Boolean,
        persuasion: Boolean,
        religion: Boolean,
        sleightOfHand: Boolean,
        stealth: Boolean,
        survival: Boolean
    },
    spells: {
        0: Array,
        1: Array,
        2: Array,
        3: Array,
        4: Array,
        5: Array,
        6: Array,
        7: Array,
        8: Array,
        9: Array,
    },
    equipment: {
        armors: Array,
        weapons: Array,
        shields: Array,
        misc: Array
    }
}, );

export const Character = mongoose.model('Character', CharacterSchema);

Character.getCharacters = async function() {
    const characters = await Character.find();
    return characters;
};

Character.getCharacterById = async function(id) {
    const character = await Character.findById(id);
    return character;
};

Character.addCharacter = async function(character) {
    await character.save();
};