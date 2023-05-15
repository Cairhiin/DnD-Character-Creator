import { create } from "zustand";
import type {
  CharacterFormState,
  CharacterDescription,
  AbilityScores,
  Skills,
  ApiClass,
  ApiRace,
  Background,
  Item,
} from "@/types";

export const characterStore = create<CharacterFormState>((set) => ({
  race: { name: "", index: "" },
  dndClass: { name: "", index: "" },
  abilityScores: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 },
  equipment: {
    armors: [],
    weapons: [],
    tools: [],
    misc: [],
  },
  background: {
    name: "",
    id: "",
    skill_proficiencies: [],
    tool_proficiencies: [],
    languages: 0,
    feature: "",
    traits: [],
    ideals: [],
    bonds: [],
    flaws: [],
  },
  hitpoints: 0,
  gold: 0,
  level: 0,
  description: {
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
  skills: {
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
  },
  setRace: (race: ApiRace) => set((state) => ({ race: race })),
  setClass: (dndClass: ApiClass) => set((state) => ({ dndClass: dndClass })),
  setBackground: (background: Background) =>
    set((state) => ({ background: background })),
  setHitpoints: (hitpoints: number) =>
    set((state) => ({ hitpoints: hitpoints })),
  setAbilityScores: (scores: AbilityScores) =>
    set((state) => ({ abilityScores: scores })),
  setDescription: (description: CharacterDescription) =>
    set((state) => ({ description: description })),
  setSkills: (skills: Skills) => set((state) => ({ skills: skills })),
  setGold: (gold: number) => set((state) => ({ gold: gold })),
  setLevel: (level: number) => set((state) => ({ level: level })),
  addMisc: (item: Item) =>
    set((state) => ({
      equipment: { ...state.equipment, misc: [...state.equipment.misc, item] },
    })),
  addArmor: (item: Item) =>
    set((state) => ({
      equipment: {
        ...state.equipment,
        armors: [...state.equipment.armors, item],
      },
    })),
  addWeapon: (item: Item) =>
    set((state) => ({
      equipment: {
        ...state.equipment,
        weapons: [...state.equipment.weapons, item],
      },
    })),
  addTool: (item: Item) =>
    set((state) => ({
      equipment: {
        ...state.equipment,
        tools: [...state.equipment.tools, item],
      },
    })),
}));
