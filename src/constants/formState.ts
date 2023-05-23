import { AbilityScores, ApiClass, ApiRace, Background, CharacterDescription, Skills } from "@/types";

interface FormState {
    steps: {
        raceSelection: {
            valid: boolean;
            dirty: boolean;
            value: {
                race: ApiRace;
            };
        };
        backgroundSelection: {
            valid: boolean;
            dirty: boolean;
            value: {
                background: Background;
            }
        };
        classSelection: {
            valid: boolean;
            dirty: boolean;
            value: {
                dndClass: ApiClass;
            }
        };
        abilitiesSelection: {
            valid: boolean;
            dirty: boolean;
            value: {
                method: string;
                abilities: AbilityScores;
            }
        };
        descriptionForm: {
            valid: boolean;
            dirty: boolean;
            value: CharacterDescription;
        };
        skillsSelection: {
            valid: boolean;
            dirty: boolean;
            value: Skills;
        }
    }
};

const FORM_STATE: FormState = {
    steps: {
        raceSelection: {
            valid: false,
            dirty: false,
            value: {
                race: {
                    name: "",
                    index: "",
                    url: "",                                  
                }
            }
        },
        classSelection: {
            valid: false,
            dirty: false,
            value: {
                dndClass: {
                    name: "",
                    index: "",
                    url: "",                 
                }
            }
        },
        abilitiesSelection: {
            valid: false,
            dirty: false,
            value: {
                method: "",
                abilities: {
                    STR: 0,
                    DEX: 0,
                    CON: 0,
                    WIS: 0,
                    INT: 0,
                    CHA: 0,
                }
            }
        },
        backgroundSelection: {
            valid: false,
            dirty: false,
            value: {
                background: {
                    id: "",
                    name: "",
                    skill_proficiencies:[""],
                    languages: 0,
                    tool_proficiencies: [""],
                    feature: "",
                    traits: [""],
                    bonds: [""],
                    ideals: [""],
                    flaws: [""],
                }
            }
        },
        descriptionForm: {
            valid: false,
            dirty: false,
            value: {
                details: {   
                    name: "",
                    alignment: "",
                    faith: "",
                },
                physical: {
                    hair: "",
                    skin: "",
                    eyes: "",
                    height: "",
                    weight: "",
                    age: "",
                    gender: "",
                },
                personal: {
                    traits: "",
                    ideals: "",
                    bonds: "",
                    flaws: "",
                },
                notes: {
                    organizations: "",
                    allies: "",
                    enemies: "",
                    backstory: "",
                    other: "",
                }
            }
        },
        skillsSelection: {
            valid: false,
            dirty: false,
            value: {
                acrobatics: false,
                animalHandling: false,
                arcana: false,
                athletics: false,
                deception: false, 
                history: false,
                insight: false,
                intimidation: false,
                investigation: false,
                medicine: false,
                nature: false,
                perception: false,
                performance: false,
                persuasion: false,
                religion: false,
                sleightOfHand: false,
                stealth: false,
                survival: false,
            }
        }
    }
};

export default FORM_STATE;