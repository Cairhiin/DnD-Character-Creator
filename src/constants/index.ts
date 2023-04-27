import { DndClass } from "@/types";

export const RACES: string[] = 
    ["dragonborn", "dwarf", "elf", "gnome", "half-elf", "half-orc", "halfling", "human", "tiefling"];

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

// NOTE: Acolyte is the only background available in the SRD
export const BACKGROUNDS: string[] = ["Acolyte"];

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