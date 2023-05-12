export interface Ability {
    "ability_score": {
        "index": string;
        "name": string;
        "url": string;
    };
    "bonus": number;
};

export interface Language {
    "index": string;
    "name": string;
    "url": string;
}

export interface Trait {
    "index": string;
    "name": string;
    "url": string;
}

export interface Race {
    "index": string;
    "name": string;
    "speed": number;
    "ability_bonuses": Array<Ability>;
    "alignment": string;
    "age": string;
    "size": string;
    "size_description": string;
    "starting_proficiencies": Array<string>;
    "languages": Array<Language>;
    "language_desc": string;
    "traits": Array<Trait>;
    "subraces": Array<string>;
    "url": string;
};

export interface Background {
    id: string;
    name: string;
    skill_proficiencies: string[];
    languages: number;
    tool_proficiencies: string[];
    feature: string;
    traits: string[];
    bonds: string[];
    ideals: string[];
    flaws: string[];
}

export interface AbilityScores {
    STR: number;
    DEX: number;
    CON: number;
    INT: number;
    WIS: number;
    CHA: number;
};

export interface CharacterDescription {
    details: {   
        name: string; 
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
    };
    personal: {
        traits: string;
        ideals: string;
        bonds: string;
        flaws: string;
    };
    notes: {
        organizations: string;
        allies: string;
        enemies: string;
        backstory: string;
        other: string;
    }
}

export interface CharacterFormState {
    race: ApiRace;
    dndClass: ApiClass;
    background: Background;
    abilityScores: AbilityScores;
    equipment: string[];
    description: CharacterDescription;
    skills: Skills;
    setRace: (race: ApiRace) => void
    setClass: (dndClass: ApiClass) => void
    setBackground: (background: Background) => void
    setAbilityScores: (scores: AbilityScores) => void;
    setDescription: (description: CharacterDescription) => void;
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
    acrobatics: boolean; 
    animalHandling: boolean;
    arcana: boolean;
    athletics: boolean; 
    deception: boolean; 
    history: boolean;
    insight: boolean;
    intimidation: boolean; 
    investigation: boolean;
    medicine: boolean;
    nature: boolean;
    perception: boolean;
    performance: boolean;
    persuasion: boolean;
    religion: boolean; 
    sleightOfHand: boolean; 
    stealth: boolean; 
    survival: boolean;
}

export interface ApiClass {
    class_levels?: string;
    hit_die?: number;
    name: string;
    index: string;
    multi_classing?: {
        prerequisites: [
            { 
                ability_score: {index: string; name: string; url: string; };
                minimum_score: number; 
            } 
        ];
        proficiencies: [
            { index: string; name: string; url: string; }
        ];
    };
    proficiencies?: [ 
        { index: string; name: string; url: string; }
    ];
    proficiency_choices?: [
        { 
            desc: string;
            choose: number;
            from: {
                options: any[];
            }; 
        }
    ];
    saving_throws?: [
        { index: string; name: string; url: string; }
    ];
    starting_equipment?: [
        { 
            equipment: {
                index: string;
                name: string;
                url: string;
            };
            quantity: number;
        }
    ];
    starting_equipment_options?: [
        { desc: string; choose: number; type: string; from: 
            { option_set_type: string; options: [
                { option_type: string; count: number; of: { index: string; name: string; url: string; }} 
            ]}
        }
    ];
    subclasses?: [
        { index: string; name: string; url: string; }
    ];
    url?: string;
}

export interface ApiRace {
    ability_bonuses?: [
        { 
            ability_score: { index: string; name: string; url: string; }
            bonus: number;
        }
    ];
    age?: string;
    alignment?: string;
    index: string;
    language_desc?: string;
    languages?: [ 
        { index: string; name: string; url: string; }
    ];
    name: string;
    size?: string;
    size_description?: string;
    speed?: number;
    starting_proficiencies?: [
        { index: string; name: string; url: string; }
    ];
    starting_proficiencies_options?: [
        { desc: string; choose: number; type: string; from: 
            { option_set_type: string; options: [
                { option_type: string; item: { index: string; name: string; url: string }} 
            ]}
        }
    ];
    subraces?: [
        { index: string; name: string; url: string }
    ];
    traits?: [
        { index: string; name: string; url: string }
    ]
    url?: string;
}

export interface DndClass {
    id: string;
    name: string;
}