import { DndClass, EquipmentChoices } from "@/types";

export const RACES: string[] = 
    ["Dragonborn", "Dwarf", "Elf", "Gnome", "Half-Elf", "Half-Orc", "Halfling", "Human", "Tiefling"];

// TODO: Turn into API call
export const BARBARIAN = {
    id: "barbarian",
    name: "Barbarian"
};

export const BARD = {
    id: "bard",
    name: "Bard"
};

export const CLERIC = {
    id: "cleric",
    name: "Cleric"
};

export const DRUID = {
    id: "druid",
    name: "Druid"
};

export const FIGHTER = {
    id: "fighter",
    name: "Fighter"
};

export const MONK = {
    id: "monk",
    name: "Monk"
};

export const PALADIN = {
    id: "paladin",
    name: "Paladin"
};

export const RANGER = {
    id: "ranger",
    name: "Ranger"
};

export const ROGUE = {
    id: "rogue",
    name: "Rogue"
};

export const SORCERER = {
    id: "sorcerer",
    name: "Sorcerer"
};

export const WARLOCK = {
    id: "warlock",
    name: "Warlock"
};

export const WIZARD = {
    id: "wizard",
    name: "Wizard"
};

export const CLASSES: DndClass[] =
    [BARBARIAN, BARD, CLERIC, DRUID, FIGHTER, MONK, PALADIN, RANGER, ROGUE, SORCERER, WARLOCK, WIZARD];

export const ABILITIES: string[] = ["STR", "DEX", "CON", "INT", "WIS", "CHA"];

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
    "acrobatics", "animal handling", "arcana", "athletics", "deception", "history", 
    "insight", "intimidation", "investigation", "medicine", "nature", "perception", 
    "performance", "persuasion", "religion", "sleight of hand", "stealth", "survival"];

export const ARMORS = [
    "padded-armor", "leather-armor", "studded-leather-armor",  "hide-armor", "chain-shirt",  "scale-mail",
     "breastplate", "half-plate-armor", "ring-mail", "chain-mail", "splint-armor", "plate-armor"];



export const TOOLS = [
    "disguise-kit", "forgery-kit", "herbalism-kit",  "navigators-tools", "posioners-kit",  "thieves-tools",
     "bagpipe", "drum", "dulcimer", "flute", "horn", "lute", "lyre", "pan-flute", "shawm", "viol",
     "dice-set", "dragonchess-set", "playing-card-set", "three-dragon-ante-set", "alchemists-supplies", "brewers-supplies", 
     "calligraphers-supplies", "carpenters-tools", "cartographers-tools", "cobblers-tools",
     "cooks-utensils", "glassblowers-tools", "jewelers-tools", "leatherworkers-tools",
     "masons-tools", "painters-supplies", "potters-tools", "smiths-tools",
     "tinkers-tools", "weavers-tools", "woodcarvers-tools"
    ];

export const EQUIPMENT_CHOICES: EquipmentChoices = [
    {
        name: "Barbarian",
        index: "barbarian",
        equipment_options: [
            {
                desc: "(a) a greataxe or (b) any martial melee weapon",
                type: "select",
                items: [
                    { index: "greataxe", name: "Greataxe", url: "/api/equipment/greataxe", amount: 1 },
                    { index: "martial-weapon", name: "Martial Weapon", url: "/api/equipment-categories/martial-weapons", amount: 1 },
                ]
            },
            {
                desc: "(a) two handaxes or (b) any simple weapon",
                type: "select",
                items: [
                    { index: "handaxes", name: "Handaxe", url: "/api/equipment/handaxe", amount: 2 },
                    { index: "simple-weapon", name: "Simple Weapon", url: "/api/equipment-categories/simple-weapons", amount: 1 }
                ]
            }
        ]
    },
    {
        name: "Bard",
        index: "bard",
        equipment_options: [
            {
                desc: "(a) a rapier, (b) a longsword, or (c) any simple weapon",
                type: "select",
                items: [
                    { index: "rapier", name: "Rapier", url: "/api/equipment/rapier", amount: 1 },
                    { index: "longsword", name: "Longsword", url: "/api/equipment/longsword", amount: 1 },
                    { index: "simple-weapon", name: "Simple Weapon", url: "/api/equipment-categories/simple-weapons", amount: 1 }
                ]

            },
            {
                desc: "(a) a diplomat's pack or (b) an entertainer's pack",
                type: "choice",
                items: [
                    { index: "diplomats-pack", name: "Diplomat's pack", url: "/api/equipment/diplomats-pack", amount: 1 },
                    { index: "entertainers-pack", name: "Entertainer's pack", url: "/api/equipment/entertainers-pack", amount: 1 },
                ]
            },
            {
                desc: "(a) a lute or (b) any other musical instrument",
                type: "select",
                items: [
                    { index: "lute", name: "Lute", url: "/api/equipment/lute", amount: 1 },
                    { index: "instrument", name: "An instrument", url: "/api/equipment-categories/musical-instruments", amount: 1 },
                ]
            }
        ]
    },
    {
        name: "Cleric",
        index: "cleric",
        equipment_options: [
            {
                desc: "(a) a mace or (b) a warhammer (if proficient)",
                type: "choice",
                items: [
                    { index: "mace", name: "Mace", url: "/api/equipment/mace", amount: 1 },
                    { index: "warhammer", name: "Warhammer", url: "/api/equipment/warhammer", amount: 1 }
                ]
            },
            {
                desc: "(a) scale mail, (b) leather armor, or (c) chain mail (if proficient)",
                type: "choice",
                items: [
                    { index: "scale-mail", name: "Scale Mail", url: "/api/equipment/scale-mail", amount: 1 },
                    { index: "leather-armor", name: "Leather Armor", url: "/api/equipment/leather-armor", amount: 1 },
                    { index: "chain-mail", name: "Chain Mail", url: "/api/equipment/chain-mail", amount: 1 }
                ]
            },
            {
                desc: "(a) a light crossbow and 20 bolts or (b) any simple weapon",
                type: "select",
                items: [
                    { index: "light-crossbow", name: "Light Crossbow", url: "/api/equipment/light-crossbow", amount: 1 },
                    { index: "simple-weapon", name: "Simple Weapon", url: "/api/equipment-categories/simple-weapons", amount: 1 }
                ]
            },
            {
                desc: "(a) a priest's pack or (b) an explorer's pack",
                type: "choice",
                items: [
                    { index: "priests-pack", name: "Priest's Pack", url: "/api/equipment/priests-pack", amount: 1 },
                    { index: "explorers-pack", name: "Explorer's Pack", url: "/api/equipment/explorers-pack", amount: 1 }
                ]
            }
        ]
    },
    {
        name: "Druid",
        index: "druid",
        equipment_options: [
            {
                desc: "(a) a wooden shield or (b) any simple weapon",
                type: "select",
                items: [
                    { index: "shield", name: "Wooden Shield", url: "/api/equipment/shield", amount: 1 },
                    { index: "simple-weapon", name: "Simple Weapon", url: "/api/equipment-categories/simple-weapons", amount: 1 }
                ]
            },
            {
                desc: "(a) a scimitar or (b) any simple melee weapon",
                type: "select",
                items: [
                    { index: "scimitar", name: "Scimitar", url: "/api/equipment/scimitar", amount: 1 },
                    { index: "simple-weapon", name: "Simple Weapon", url: "/api/equipment-categories/simple-weapons", amount: 1 }
                ]
            }
        ]
    },
    {
        name: "Fighter",
        index: "fighter",
        equipment_options: [
            {
                desc: "(a) chain mail or (b) leather armor, longbow, and 20 arrows",
                type: "multiple",
                items: [
                    { index: "chain-mail", name: "Chain Mail", url: "/api/equipment/chain-mail", amount: 1 },
                    { index: "leather-armor", name: "Leather Armor", url: "/api/equipment/leather-armor", amount: 1 },
                    { index: "longbow", name: "Longbow", url: "/api/equipment/longbow", amount: 1 }
                ]
            },
            {
                desc: "(a) a martial weapon and a shield or (b) two martial weapons",
                type: "multiple",
                items: [
                    { index: "martial-weapon", name: "martial-weapon", url: "/api/equipment-categories/martial-weapons", amount: 1 },
                    { index: "shield", name: "Shield", url: "/api/equipment/shield", amount: 1 },
                    { index: "martial-weapon", name: "martial-weapon", url: "/api/equipment-categories/martial-weapons", amount: 2 }
                ]
            },
            {
                desc: "(a) a light crossbow and 20 bolts or (b) two handaxes",
                type: "choice",
                items: [
                    { index: "light-crossbow", name: "Light crossbow", url: "/api/equipment/light-crossbow", amount: 1 },
                    { index: "handaxe", name: "Handaxe", url: "/api/equipment/handaxe", amount: 2 }
                ]
            },
            {
                desc: "(a) a dungeoneer's pack or (b) an explorer's pack",
                type: "choice",
                items: [
                    { index: "dungeoneers-pack", name: "Dungeoneer's Pack", url: "/api/equipment/dungeoneers-pack", amount: 1 },
                    { index: "explorers-pack", name: "Explorer's Pack", url: "/api/equipment/explorers-pack", amount: 1 }
                ]
            }
        ]
    },
    {
        name: "Monk",
        index: "monk",
        equipment_options: [
            {
                desc: "(a) a shortsword or (b) any simple weapon",
                type: "select",
                items: [
                    { index: "shortsword", name: "Shortsword", url: "/api/equipment/shortsword", amount: 1 },
                    { index: "simple-weapon", name: "Simple Weapon", url: "/api/equipment-categories/simple-weapons", amount: 1 },
                ]
            },
            {
                desc: "(a) a dungeoneer's pack or (b) an explorer's pack",
                type: "choice",
                items: [
                    { index: "dungeoneers-pack", name: "Dungeoneer's Pack", url: "/api/equipment/dungeoneers-pack", amount: 1 },
                    { index: "explorers-pack", name: "Explorer's Pack", url: "/api/equipment/explorers-pack", amount: 1 }
                ]
            }
        ]
    },
    {
        name: "Paladin",
        index: "paladin",
        equipment_options: [
            {
                desc: "(a) a martial weapon and a shield or (b) two martial weapons",
                type: "multiple",
                items: [
                    { index: "martial-weapon", name: "martial-weapon", url: "/api/equipment-categories/martial-weapons", amount: 1 },
                    { index: "shield", name: "Shield", url: "/api/equipment/shield", amount: 1 },
                    { index: "martial-weapon", name: "martial-weapon", url: "/api/equipment-categories/martial-weapons", amount: 2 }
                ]
            },
            {
                desc: "(a) five javelins or (b) any simple melee weapon",
                type: "select",
                items: [
                    { index: "javelin", name: "Javelin", url: "/api/equipment/javelin", amount: 1 },
                    { index: "simple-weapon", name: "Simple Weapon", url: "/api/equipment-categories/simple-weapons", amount: 1 },
                ]
            },
            {
                desc: "(a) a priest's pack or (b) an explorer's pack",
                type: "choice",
                items: [
                    { index: "priests-pack", name: "Priest's Pack", url: "/api/equipment/priests-pack", amount: 1 },
                    { index: "explorers-pack", name: "Explorer's Pack", url: "/api/equipment/explorers-pack", amount: 1 }
                ]
            }
        ]
    },
    {
        name: "Ranger",
        index: "ranger",
        equipment_options: [
            {
                desc: "(a) scale mail or (b) leather armor",
                type: "choice",
                items: [
                    { index: "scale-mail", name: "Scale Mail", url: "/api/equipment/scale-mail", amount: 1 },
                    { index: "leather-armor", name: "Leather Armor", url: "/api/equipment/leather-armor", amount: 1 }
                ]
            },
            {
                desc: "(a) two shortswords or (b) two simple melee weapons",
                type: "select",
                items: [
                    { index: "shortsword", name: "Shortsword", url: "/api/equipment/shortsword", amount: 2 },
                    { index: "simple-weapon", name: "Simple Weapon", url: "/api/equipment-categories/simple-weapons", amount: 2 },
                ]
            },
            {
                desc: "(a) a dungeoneer's pack or (b) an explorer's pack",
                type: "choice",
                items: [
                    { index: "dungeoneers-pack", name: "Dungeoneer's Pack", url: "/api/equipment/dungeoneers-pack", amount: 1 },
                    { index: "explorers-pack", name: "Explorer's Pack", url: "/api/equipment/explorers-pack", amount: 1 }
                ]
            }
        ]
    },
    {
        name: "Rogue",
        index: "rogue",
        equipment_options: [
            {
                desc: "(a) a rapier or (b) a shortsword",
                type: "choice",
                items: [
                    { index: "rapier", name: "Rapier", url: "/api/equipment/rapier", amount: 1 },
                    { index: "shortsword", name: "Shortsword", url: "/api/equipment/shortsword", amount: 1 }
                ]
            },
            {
                desc: "(a) a shortbow and quiver of 20 arrows or (b) a shortsword",
                type: "choice",
                items: [
                    { index: "shortbow", name: "Shortbow", url: "/api/equipment/shortbow", amount: 1 },
                    { index: "shortsword", name: "Shortsword", url: "/api/equipment/shortsword", amount: 1 }
                ]
            },
            {
                desc: "(a) a burglar's pack, (b) a dungeoneer's pack, or (c) an explorer's pack",
                type: "choice",
                items: [
                    { index: "burglars-pack", name: "Burglar's Pack", url: "/api/equipment/burglars-pack", amount: 1 },
                    { index: "dungeoneers-pack", name: "Dungeoneer's Pack", url: "/api/equipment/dungeoneers-pack", amount: 1 },
                    { index: "explorers-pack", name: "Explorer's Pack", url: "/api/equipment/explorers-pack", amount: 1 }
                ]
            }
        ]
    },
    {
        name: "Sorcerer",
        index: "sorcerer",
        equipment_options: [
            {
                desc: "(a) a light crossbow and 20 bolts or (b) any simple weapon",
                type: "select",
                items: [
                    { index: "light-crossbow", name: "Light Crossbow", url: "/api/equipment/light-crossbow", amount: 1 },
                    { index: "simple-weapon", name: "Simple Weapon", url: "/api/equipment-categories/simple-weapons", amount: 1 },
                ]
            },
            {
                desc: "(a) a component pouch or (b) an arcane focus",
                type: "choice",
                items: [
                    { index: "component-pouch", name: "Component Pouch", url: "/api/equipment/component-pouch", amount: 1 },
                    { index: "arcane-focus", name: "Arcane Focus", url: "/api/equipment/arcane-focus", amount: 1 }
                ]
            },
            {
                desc: "(a) a dungeoneer's pack or (b) an explorer's pack",
                type: "choice",
                items: [
                    { index: "dungeoneers-pack", name: "Dungeoneer's Pack", url: "/api/equipment/dungeoneers-pack", amount: 1 },
                    { index: "explorers-pack", name: "Explorer's Pack", url: "/api/equipment/explorers-pack", amount: 1 }
                ]
            }
        ]
    },
    {
        name: "Warlock",
        index: "warlock",
        equipment_options: [
            {
                desc: "(a) a light crossbow and 20 bolts or (b) any simple weapon",
                type: "select",
                items: [
                    { index: "light-crossbow", name: "Light Crossbow", url: "/api/equipment/light-crossbow", amount: 1 },
                    { index: "simple-weapon", name: "Simple Weapon", url: "/api/equipment-categories/simple-weapons", amount: 1 },
                ]
            },
            {
                desc: "(a) a component pouch or (b) an arcane focus",
                type: "choice",
                items: [
                    { index: "component-pouch", name: "Component Pouch", url: "/api/equipment/component-pouch", amount: 1 },
                    { index: "arcane-focus", name: "Arcane Focus", url: "/api/equipment/arcane-focus", amount: 1 }
                ]
            },
            {
                desc: "(a) a scholar's pack or (b) a dungeoneer's pack",
                type: "choice",
                items: [
                    { index: "scholars-pack", name: "Scholar's Pack", url: "/api/equipment/scholars-pack", amount: 1 },
                    { index: "dungeoneers-pack", name: "Dungeoneer's Pack", url: "/api/equipment/dungeoneers-pack", amount: 1 }
                ]
            }
        ]
    },
    {
        name: "Wizard",
        index: "wizard",
        equipment_options: [
            {
                desc: "(a) a quarterstaff or (b) a dagger",
                type: "choice",
                items: [
                    { index: "quarterstaff", name: "Quarterstaff", url: "/api/equipment/quarterstaff", amount: 1 },
                    { index: "dagger", name: "Dagger", url: "/api/equipment/dagger", amount: 1 }
                ]
            },
            {
                desc: "(a) a component pouch or (b) an arcane focus",
                type: "choice",
                items: [
                    { index: "component-pouch", name: "Component Pouch", url: "/api/equipment/component-pouch", amount: 1 },
                    { index: "arcane-focus", name: "Arcane Focus", url: "/api/equipment/arcane-focus", amount: 1 }
                ]
            },
            {
                desc: "(a) a scholar's pack or (b) a explorer's pack",
                type: "choice",
                items: [
                    { index: "scholars-pack", name: "Scholar's Pack", url: "/api/equipment/scholars-pack", amount: 1 },
                    { index: "explorers-pack", name: "Explorer's Pack", url: "/api/equipment/explorers-pack", amount: 1 }
                ]
            }
        ]
    }
]