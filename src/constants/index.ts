export const RACES: string[] = 
    ["dragonborn", "dwarf", "elf", "gnome", "half-elf", "half-orc", "halfling", "human", "tiefling"];

export const CLASSES: string[] =
    ["barbarian", "bard", "cleric", "druid", "fighter", "monk", "paladin", "ranger", "rogue", "sorcerer", "warlock", "wizard"];

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