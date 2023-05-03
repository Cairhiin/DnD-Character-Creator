import { DndClass } from "@/types";

export const RACES: string[] = 
    ["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Half-Orc", "Halfling", "Human", "Tiefling"];


export const BACKGROUNDS = [
    { 
        id: "acolyte",
        name: "Acolyte",
        skill_proficiencies: ["Insight", "Religion"],
        tool_proficiencies: [],
        feature: "Shelter of the Faithful"
    },
    {
        id: "criminal",
        name: "Criminal",
        skill_proficiencies: ["Deception", "Stealth"],
        languages: 0,
        tool_proficiencies: ["Gaming set", "Thieves' Tools"],
        feature: "Criminal Contact"
    },
    {
        id: "folk-hero",
        name: "Folk Hero",
        skill_proficiencies: ["Animal Handling", "Survival"],
        languages: 0,
        tool_proficiencies: ["Artisan's Tools", "Vehicles (land)"],
        feature: "Rustic Hospitality"
    },
    {
        id: "noble",
        name: "Noble",
        skill_proficiencies: ["History", "Persuasion"],
        languages: 1,
        tool_proficiencies: ["Gaming set"],
        feature: "Position of Priviledge"
    },
    {
        id: "sage",
        name: "Sage",
        skill_proficiencies: ["Arcana", "History"],
        languages: 2,
        tool_proficiencies: [],
        feature: "Researcher"
    },
    {
        id: "soldier",
        name: "Soldier",
        skill_proficiencies: ["Athletics", "Intimidation"],
        languages: 0,
        tool_proficiencies: ["Gaming set", "Vehicles (land)"],
        feature: "Military Rank"
    }
]

// TODO: Turn into API call
export const BARBARIAN = {
    id: "barbarian",
    name: "Barbarian",
    skills: ["animal-handling", "athletics", "intimidation", "nature", "perception", "survival"]
};

export const BARD = {
    id: "bard",
    name: "Bard",
    skills: ["animal-handling", "athletics", "intimidation", "nature", "perception", "survival"]
};

export const CLERIC = {
    id: "cleric",
    name: "Cleric",
    skills: ["animal-handling", "athletics", "intimidation", "nature", "perception", "survival"]
};

export const DRUID = {
    id: "druid",
    name: "Druid",
    skills: ["animal-handling", "athletics", "intimidation", "nature", "perception", "survival"]
};

export const FIGHTER = {
    id: "fighter",
    name: "Fighter",
    skills: ["animal-handling", "athletics", "intimidation", "nature", "perception", "survival"]
};

export const MONK = {
    id: "monk",
    name: "Monk",
    skills: ["animal-handling", "athletics", "intimidation", "nature", "perception", "survival"]
};

export const PALADIN = {
    id: "paladin",
    name: "Paladin",
    skills: ["animal-handling", "athletics", "intimidation", "nature", "perception", "survival"]
};

export const RANGER = {
    id: "ranger",
    name: "Ranger",
    skills: ["animal-handling", "athletics", "intimidation", "nature", "perception", "survival"]
};

export const ROGUE = {
    id: "rogue",
    name: "Rogue",
    skills: ["animal-handling", "athletics", "intimidation", "nature", "perception", "survival"]
};

export const SORCERER = {
    id: "sorcerer",
    name: "Sorcerer",
    skills: ["animal-handling", "athletics", "intimidation", "nature", "perception", "survival"]
};

export const WARLOCK = {
    id: "warlock",
    name: "Warlock",
    skills: ["animal-handling", "athletics", "intimidation", "nature", "perception", "survival"]
};

export const WIZARD = {
    id: "wizard",
    name: "Wizard",
    skills: ["animal-handling", "athletics", "intimidation", "nature", "perception", "survival"]
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
    "acrobatics", "animal-handling", "arcana", "athletics", "deception", "history", 
    "insight", "intimidation", "investigation", "medicine", "nature", "perception", 
    "performance", "persuasion", "religion", "sleight-of-hand", "stealth", "survival"
];