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

export interface CharacterFormState {
    race: string,
    dndClass: string,
    abilityScores: AbilityScores,
    equipment: string[],
    description: string[],
    setRace: (race: string) => void
    setClass: (dndClass: string) => void
    setAbilityScores: (scores: AbilityScores) => void
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