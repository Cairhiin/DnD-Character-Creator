const FORM_STATE = {
    steps: {
        raceSelection: {
            valid: false,
            dirty: false,
            value: {
                race: {
                    name: "",
                    index: "",
                    url: "",
                    ability_bonuses: [
                        {
                            ability_score: {
                              index: "str",
                              name: "STR",
                              url: "/api/ability-scores/str"
                            },
                            bonus: 0
                          },
                          {
                            ability_score: {
                              index: "dex",
                              name: "DEX",
                              url: "/api/ability-scores/dex"
                            },
                            bonus: 0
                          },
                          {
                            ability_score: {
                              index: "con",
                              name: "CON",
                              url: "/api/ability-scores/con"
                            },
                            bonus: 0
                          },
                          {
                            ability_score: {
                              index: "int",
                              name: "INT",
                              url: "/api/ability-scores/int"
                            },
                            bonus: 0
                          },
                          {
                            ability_score: {
                              index: "wis",
                              name: "WIS",
                              url: "/api/ability-scores/wis"
                            },
                            bonus: 0
                          },
                          {
                            ability_score: {
                              index: "cha",
                              name: "CHA",
                              url: "/api/ability-scores/cha"
                            },
                            bonus: 0
                          }
                    ]
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
                    url: ""
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
                
            }
        }
    }
};

export default FORM_STATE;