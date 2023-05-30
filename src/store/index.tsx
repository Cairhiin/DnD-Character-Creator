import { create } from "zustand";
import { produce } from "immer";
import type {
  CharacterFormState,
  CharacterDescription,
  AbilityScores,
  Skills,
  ApiClass,
  ApiRace,
  Background,
  Equipment,
  Spell,
  Spells,
} from "@/types";

export const useCharacterStore = create<CharacterFormState>((set) => ({
  race: { name: "", index: "" },
  dndClass: { name: "", index: "", url: "" },
  abilityScores: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 },
  equipment: [],
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
  experience: 0,
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
    acrobatics: { value: false, name: "Acrobatics" },
    animalHandling: { value: false, name: "Animal Handling" },
    arcana: { value: false, name: "Arcana" },
    athletics: { value: false, name: "Athletics" },
    deception: { value: false, name: "Deception" },
    history: { value: false, name: "History" },
    insight: { value: false, name: "Insight" },
    intimidation: { value: false, name: "Intimidation" },
    investigation: { value: false, name: "Investigation" },
    medicine: { value: false, name: "Medicine" },
    nature: { value: false, name: "Nature" },
    perception: { value: false, name: "Perception" },
    performance: { value: false, name: "Performance" },
    persuasion: { value: false, name: "Persuasion" },
    religion: { value: false, name: "Religion" },
    sleightOfHand: { value: false, name: "sleight Of Hand" },
    stealth: { value: false, name: "Stealth" },
    survival: { value: false, name: "Survival" },
  },
  spells: {
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
  setExperience: (experience: number) =>
    set((state) => ({ experience: experience })),
  setLevel: (level: number) => set((state) => ({ level: level })),
  addItem: (item: Equipment) =>
    set((state) => ({
      equipment: {
        ...state.equipment,
        equipment: [...state.equipment, item],
      },
    })),
  setEquipment: (items: Equipment[]) => set((state) => ({ equipment: items })),
  addSpell: (spell: Spell, level: number) =>
    set(
      produce((state) => {
        (state.spells as any)[level] = spell;
      })
    ),
  setSpells: (spells: Spells) => set((state) => ({ spells: spells })),
}));
