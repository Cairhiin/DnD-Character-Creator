import { DndClass, EquipmentChoices } from "@/types";

export const RACES: string[] = 
    ["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Half-Orc", "Halfling", "Human", "Tiefling"];

// TODO: Turn into API call
export const BARBARIAN = {
    id: "barbarian",
    name: "Barbarian"
};

export const BARD = {
    id: "bard",
    name: "Bard"
};

export const CLERIC = {
    id: "cleric",
    name: "Cleric"
};

export const DRUID = {
    id: "druid",
    name: "Druid"
};

export const FIGHTER = {
    id: "fighter",
    name: "Fighter"
};

export const MONK = {
    id: "monk",
    name: "Monk"
};

export const PALADIN = {
    id: "paladin",
    name: "Paladin"
};

export const RANGER = {
    id: "ranger",
    name: "Ranger"
};

export const ROGUE = {
    id: "rogue",
    name: "Rogue"
};

export const SORCERER = {
    id: "sorcerer",
    name: "Sorcerer"
};

export const WARLOCK = {
    id: "warlock",
    name: "Warlock"
};

export const WIZARD = {
    id: "wizard",
    name: "Wizard"
};

export const CLASSES: DndClass[] =
    [BARBARIAN, BARD, CLERIC, DRUID, FIGHTER, MONK, PALADIN, RANGER, ROGUE, SORCERER, WARLOCK, WIZARD];

export const ABILITIES: string[] = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

export const ALIGNMENT: string[] = [
    "Lawful Good", "Neutral Good", "Chaotic Good", 
    "Lawful Neutral", "True Neutral", "Chaotic Neutral",
    "Lawful Evil", "Neutral Evil", "Chaotic Evil" 
]

export const POINT_BUY_TOTAL: number = 27;

export const STANDARD_ARRAY = [8, 10, 12, 13, 14, 15]; 

// Set the available ability scores from 8 to 15    
export const AVAILABLE_SCORES = Array(8).fill(0).map((_: number, i: number) => i + 8); 

export const SKILLS = [ 
    "acrobatics", "animal handling", "arcana", "athletics", "deception", "history", 
    "insight", "intimidation", "investigation", "medicine", "nature", "perception", 
    "performance", "persuasion", "religion", "sleight of hand", "stealth", "survival"];

export const ARMORS = [
    "padded-armor", "leather-armor", "studded-leather-armor",  "hide-armor", "chain-shirt",  "scale-mail",
     "breastplate", "half-plate-armor", "ring-mail", "chain-mail", "splint-armor", "plate-armor"];



export const TOOLS = [
    "disguise-kit", "forgery-kit", "herbalism-kit",  "navigators-tools", "posioners-kit",  "thieves-tools",
     "bagpipe", "drum", "dulcimer", "flute", "horn", "lute", "lyre", "pan-flute", "shawm", "viol",
     "dice-set", "dragonchess-set", "playing-card-set", "three-dragon-ante-set", "alchemists-supplies", "brewers-supplies", 
     "calligraphers-supplies", "carpenters-tools", "cartographers-tools", "cobblers-tools",
     "cooks-utensils", "glassblowers-tools", "jewelers-tools", "leatherworkers-tools",
     "masons-tools", "painters-supplies", "potters-tools", "smiths-tools",
     "tinkers-tools", "weavers-tools", "woodcarvers-tools"
    ];

export const FORM_STATE = {
    steps: {
        raceSelection: {
            valid: false,
            dirty: false,
            value: {
                race: {
                    name: "",
                    index: "",
                    url: ""
                }
            }
        },
        classSelection: {
            valid: false,
            dirty: false,
            value: {
                dndClass: ""
            }
        },
        abilitiesSelection: {
            valid: false,
            dirty: false,
            value: {
                STR: 0,
                DEX: 0,
                CON: 0,
                WIS: 0,
                INT: 0,
                CHA: 0,
            }
        }
    }
};