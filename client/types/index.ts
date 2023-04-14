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