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
    hitpoints: number;
    abilityScores: AbilityScores;
    equipment: {
        armors: Item[];
        weapons: Item[];
        tools: Item[];
        misc: Item[];
    }
    description: CharacterDescription;
    skills: Skills;
    gold: number;
    level: number;
    setRace: (race: ApiRace) => void
    setClass: (dndClass: ApiClass) => void
    setBackground: (background: Background) => void
    setAbilityScores: (scores: AbilityScores) => void;
    setDescription: (description: CharacterDescription) => void;
    setSkills: (skills: Skills) => void;
    setGold: (gold: number) => void;
    setLevel: (level: number) => void;
    setHitpoints: (hitpoints: number) => void;
    addMisc: (item: Item) => void;
    addArmor: (item: Item) => void;
    addWeapon: (item: Item) => void;
    addTool: (item: Item) => void;
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

interface Armor {
    armor: string;
}
interface Weapon {
    weapon: string;
}
interface Tool {
    tool: string;
}
interface Misc {
    misc: string;
}

export interface EquipmentFormInput {
    items: Array<Item>;
}

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
            { option_set_type: string; options: 
                { 
                    option_type: string;               
                    items: { 
                        option_type: string;
                        choice?: {
                            desc: string;
                            choose: number;
                            type: string;
                            from: {
                                option_set_type: string;
                                equipment_category: {
                                    index: string;
                                    name: string;
                                    url: string;
                                }
                            }
                        }
                        count?: number,
                        of?: { 
                            index: string;
                            name: string;
                            url: string;
                        }
                    }[] 
                }[]
            }
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

export interface Equipment {
    index: string;
    name: string;
    url: string;
}
export interface Item {
    desc: string[];
    special: string[];
    index: string;
    name: string;
    equipment_category: {
        index: string;
        name: string;
        url: string;
    },
    gear_category: {
        index: string;
        name: string;
        url: string;
    },
    cost: {
        quantity: number;
        unit: string;
    },
    weight: number;
    url: string;
    contents: string[];
    properties: string[];
}

export interface EquipmentChoices {
    name: string;
    index: string;
    equipment_options: 
        {
            desc: string;
            type: string;
            items: { index: string; name: string; url: string; amount: number; }[]
        }[]
} 