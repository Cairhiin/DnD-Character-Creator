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

export interface Spell {
    index: string;
    name: string;
    url: string;
    value: boolean | undefined;
}

export interface Spells {
    0: Array<Spell>;
    1: Array<Spell>;
    2: Array<Spell>;
    3: Array<Spell>;
    4: Array<Spell>;
    5: Array<Spell>;
    6: Array<Spell>;
    7: Array<Spell>;
    8: Array<Spell>;
    9: Array<Spell>;
}

export interface Background {
    id: string;
    name: string;
    skill_proficiencies: Array<string>;
    languages: number;
    tool_proficiencies: Array<string>;
    feature: string;
    traits: Array<string>;
    bonds: Array<string>;
    ideals: Array<string>;
    flaws: Array<string>;
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
        armors: Array<Item>;
        shields: Array<Item>;
        weapons: Array<Item>;
        misc: Array<Item>;
    };
    description: CharacterDescription;
    skills: Skills;
    gold: number;
    experience: number;
    level: number;
    spells: Spells;
    setRace: (race: ApiRace) => void
    setClass: (dndClass: ApiClass) => void
    setBackground: (background: Background) => void
    setAbilityScores: (scores: AbilityScores) => void;
    setDescription: (description: CharacterDescription) => void;
    setSkills: (skills: Skills) => void;
    setGold: (gold: number) => void;
    setExperience: (experience: number) => void;
    setLevel: (level: number) => void;
    setHitpoints: (hitpoints: number) => void;
    addItem: (item: Equipment) => void;
    addShield: (item: Equipment) => void;
    addArmor: (item: Equipment) => void;
    addWeapon: (item: Equipment) => void;
    setEquipment: (items: { armors: Item[]; weapons: Item[]; shields: Item[]; misc: Item[]}) => void;
    addSpell: (spell: Spell, level: number) => void;
    setSpells: (spells: Spells) => void;
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

export interface EquipmentFormInput {
    items: Array<Equipment>;
}

export interface Skill {
    name: string;
    value: boolean;
    modifier: string;
}

export interface Skills {
    acrobatics: Skill; 
    animalHandling: Skill;
    arcana: Skill;
    athletics: Skill; 
    deception: Skill; 
    history: Skill;
    insight: Skill;
    intimidation: Skill; 
    investigation: Skill;
    medicine: Skill;
    nature: Skill;
    perception: Skill;
    performance: Skill;
    persuasion: Skill;
    religion: Skill; 
    sleightOfHand: Skill; 
    stealth: Skill; 
    survival: Skill;
}

export interface ApiClass {
    class_levels?: string;
    hit_die?: number;
    name: string;
    index: string;
    multi_classing?: {
        prerequisites:
            Array<{ 
                ability_score: {index: string; name: string; url: string; };
                minimum_score: number; 
            }>;
        proficiencies:
        Array<{ index: string; name: string; url: string; }>;   
    };
    proficiencies?:  
    Array<{ index: string; name: string; url: string; }>;
    proficiency_choices?:
    Array<{ 
            desc: string;
            choose: number;
            from: {
                options: Array<any>;
            }; 
        }>;
    saving_throws?: Array<{ index: string; name: string; url: string; }>;
    starting_equipment?: 
    Array<{ 
            equipment: {
                index: string;
                name: string;
                url: string;
            };
            quantity: number;
        }>;
    starting_equipment_options?: 
    Array<{ desc: string; choose: number; type: string; from: 
            { option_set_type: string; options: 
                Array<{ 
                    option_type: string;               
                    items: Array<{ 
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
                    }> 
                }>
            }
        }>;
    subclasses?: Array<{ index: string; name: string; url: string; }>;
    spellcasting: { 
        level: number, 
        spellcasting_ability: { index: string, name: string, url: string }, 
        info: Array<{name: string, desc: string}>
    }
    url: string;
}

export interface ApiRace {
    ability_bonuses?:
    Array<{ 
            ability_score: { index: string; name: string; url: string; }
            bonus: number;
        }>;
    age?: string;
    alignment?: string;
    index: string;
    language_desc?: string;
    languages?: Array<{ index: string; name: string; url: string; }>;
    name: string;
    size?: string;
    size_description?: string;
    speed?: number;
    starting_proficiencies?: Array<{ index: string; name: string; url: string; }>;
    starting_proficiencies_options?: 
    Array<{ desc: string; choose: number; type: string; from: 
            { option_set_type: 
                string; options: 
                Array<{ option_type: string; item: { index: string; name: string; url: string }}>
            }
        }>;
    subraces?: 
    Array<{ index: string; name: string; url: string }>;
    traits?: 
    Array<{ index: string; name: string; url: string }>;
    url?: string;
}

export interface DndClass {
    id: string;
    name: string;
    url?: string;
}

export interface Item {
    desc?: Array<string>;
    special?: Array<string>;
    index: string;
    name: string;
    equipment_category?: {
        index: string;
        name: string;
        url: string;
    };
    armor_category?: string,
    armor_class?: {
        base: number;
        dex_bonus: boolean;
    };
    str_minimum?: number;
    stealth_disadvantage?: boolean;
    gear_category?: {
        index: string;
        name: string;
        url: string;
    };
    cost?: {
        quantity: number;
        unit: string;
    };
    weight?: number;
    url: string;
    contents?: Array<string>;
    properties?: Array<string>;
}

export interface Equipment extends Item {
    amount: number;
}

export interface EquipmentChoices {
    name: string;
    index: string;
    equipment_options: 
    Array<{
            desc: string;
            type: string;
            items: Array<{ index: string; name: string; url: string; amount: number; }>
        }>
} 