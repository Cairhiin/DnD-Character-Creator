import mongoose from 'mongoose';

const CharacterSchema = mongoose.Schema({
    userId: { 
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
        required: true
    },
    name: String,
    race: Object,
    dndClass: Object,
    subClass: Object,
    background: Object,
    level: Number,
    gold: Number,
    xp: Number,
    attributes: { STR: Number, DEX: Number, CON: Number, INT: Number, WIS: Number, CHA: Number },
    description: Object,
    skills: {
        acrobatics: { value: Boolean, name: String, modifier: String },
        animalHandling: { value: Boolean, name: String, modifier: String },
        arcana: { value: Boolean, name: String, modifier: String },
        athletics: { value: Boolean, name: String, modifier: String },
        deception: { value: Boolean, name: String, modifier: String },
        history: { value: Boolean, name: String, modifier: String },
        insight: { value: Boolean, name: String, modifier: String },
        intimidation: { value: Boolean, name: String, modifier: String },
        investigation: { value: Boolean, name: String, modifier: String },
        medicine: { value: Boolean, name: String, modifier: String },
        nature: { value: Boolean, name: String, modifier: String },
        perception: { value: Boolean, name: String, modifier: String },
        performance: { value: Boolean, name: String, modifier: String },
        persuasion: { value: Boolean, name: String, modifier: String },
        religion: { value: Boolean, name: String, modifier: String },
        sleightOfHand: { value: Boolean, name: String, modifier: String },
        stealth: { value: Boolean, name: String, modifier: String },
        survival: { value: Boolean, name: String, modifier: String }
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