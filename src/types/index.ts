export interface Ability {
    "ability_score": {
        "index": string,
        "name": string,
        "url": string
    },
    "bonus": number
};

export interface Language {
    "index": string,
    "name": string,
    "url": string
}

export interface Trait {
    "index": string,
    "name": string,
    "url": string
}

export interface Race {
    "index": string,
    "name": string,
    "speed": number,
    "ability_bonuses": Array<Ability>,
    "alignment": string,
    "age": string,
    "size": string,
    "size_description": string,
    "starting_proficiencies": Array<string>,
    "languages": Array<Language>,
    "language_desc": string,
    "traits": Array<Trait>,
    "subraces": Array<string>,
    "url": string
};

export interface AbilityScores {
    STR: number,
    DEX: number,
    CON: number,
    INT: number,
    WIS: number,
    CHA: number
};

export interface CharacterDescription {
    background: string;
    details: {    
        alignment: string;
        faith: string;
    }
    physical: {
        hair: string;
        skin: string;
        eyes: string;
        height: string;
        weight: string;
        age: string;
        gender: string;
    },
    personal: {
        traits: string;
        ideals: string;
        bonds: string;
        flaws: string;
    },
    notes: {
        organizations: string;
        allies: string;
        enemies: string;
        backstory: string;
        other: string;
    }
}

export interface CharacterFormState {
    race: string,
    dndClass: string,
    abilityScores: AbilityScores,
    equipment: string[],
    description: CharacterDescription,
    skills: Skills,
    setRace: (race: string) => void
    setClass: (dndClass: string) => void
    setAbilityScores: (scores: AbilityScores) => void,
    setDescription: (description: CharacterDescription) => void,
    setSkills: (skills: Skills) => void
};

export interface AbilityFormInput {  
    method: string;
    STR: number;
    DEX: number;
    CON: number;
    INT: number;
    WIS: number;
    CHA: number;
};

export interface Skills {
    acrobatics: number; 
    animalHandling: number;
    arcana: number;
    athletics: number; 
    deception: number; 
    history: number;
    insight: number;
    intimidation: number; 
    investigation: number;
    medicine: number;
    nature: number;
    perception: number;
    performance: number;
    persuasion: number;
    religion: number; 
    sleightOfHand: number; 
    stealth: number; 
    survival: number;
}

export interface DndClass {
    id: string,
    name: string,
    skills: string[]
}