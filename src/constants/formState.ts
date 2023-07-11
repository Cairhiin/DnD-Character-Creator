import type {
  AbilityScores,
  ApiClass,
  ApiRace,
  Background,
  CharacterDescription,
  Equipment,
  Skills,
  SubClass,
} from "@/types";

export interface FormState {
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
      };
    };
    classSelection: {
      valid: boolean;
      dirty: boolean;
      value: {
        dndClass: ApiClass;
      };
    };
    subClassSelection: {
      valid: boolean;
      dirty: boolean;
      value: {
        subClass?: SubClass;
      };
    };
    abilitiesSelection: {
      valid: boolean;
      dirty: boolean;
      value: {
        method: string;
        abilities: AbilityScores;
      };
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
    };
    spellSelection: {
      valid: boolean;
      dirty: boolean;
      value: {
        0: Array<any>;
        1: Array<any>;
        2: Array<any>;
        3: Array<any>;
        4: Array<any>;
        5: Array<any>;
        6: Array<any>;
        7: Array<any>;
        8: Array<any>;
        9: Array<any>;
      };
    };
    equipmentSelection: {
      valid: boolean;
      dirty: boolean;
      value: {
        armors: Array<Equipment>;
        shields: Array<Equipment>;
        weapons: Array<Equipment>;
        misc: Array<Equipment>;
      };
    };
  };
}

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
        },
      },
    },
    classSelection: {
      valid: false,
      dirty: false,
      value: {
        dndClass: {
          name: "",
          index: "",
          url: "",
          spellcasting: {
            level: 1,
            spellcasting_ability: { index: "", name: "", url: "" },
            info: [{ name: "", desc: "" }],
          },
        },
      },
    },
    subClassSelection: {
      valid: false,
      dirty: false,
      value: {
        subClass: {
          name: "",
          index: "",
          url: "",
        },
      },
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
          INT: 0,
          WIS: 0,
          CHA: 0,
        },
      },
    },
    backgroundSelection: {
      valid: false,
      dirty: false,
      value: {
        background: {
          id: "",
          name: "",
          skill_proficiencies: [""],
          languages: 0,
          tool_proficiencies: [""],
          feature: "",
          traits: [""],
          bonds: [""],
          ideals: [""],
          flaws: [""],
        },
      },
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
        },
      },
    },
    skillsSelection: {
      valid: false,
      dirty: false,
      value: {
        acrobatics: { value: false, name: "Acrobatics", modifier: "DEX" },
        animalHandling: {
          value: false,
          name: "Animal Handling",
          modifier: "WIS",
        },
        arcana: { value: false, name: "Arcana", modifier: "INT" },
        athletics: { value: false, name: "Athletics", modifier: "STR" },
        deception: { value: false, name: "Deception", modifier: "CHA" },
        history: { value: false, name: "History", modifier: "INT" },
        insight: { value: false, name: "Insight", modifier: "WIS" },
        intimidation: { value: false, name: "Intimidation", modifier: "CHA" },
        investigation: { value: false, name: "Investigation", modifier: "INT" },
        medicine: { value: false, name: "Medicine", modifier: "WIS" },
        nature: { value: false, name: "Nature", modifier: "INT" },
        perception: { value: false, name: "Perception", modifier: "WIS" },
        performance: { value: false, name: "Performance", modifier: "CHA" },
        persuasion: { value: false, name: "Persuasion", modifier: "CHA" },
        religion: { value: false, name: "Religion", modifier: "INT" },
        sleightOfHand: {
          value: false,
          name: "Sleight Of Hand",
          modifier: "DEX",
        },
        stealth: { value: false, name: "Stealth", modifier: "DEX" },
        survival: { value: false, name: "Survival", modifier: "WIS" },
      },
    },
    spellSelection: {
      valid: false,
      dirty: false,
      value: {
        0: [],
        1: [],
        2: [],
        3: [],
        4: [],
        5: [],
        6: [],
        7: [],
        8: [],
        9: [],
      },
    },
    equipmentSelection: {
      valid: false,
      dirty: false,
      value: { armors: [], weapons: [], shields: [], misc: [] },
    },
  },
};

export default FORM_STATE;
