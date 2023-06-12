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
  Item,
} from "@/types";

export const useCharacterStore = create<CharacterFormState>((set) => ({
  character: {
    id_: "",
    userId: "",
    race: { name: "", index: "" },
    dndClass: {
      name: "",
      index: "",
      url: "",
      spellcasting: {
        level: 1,
        info: [{ name: "", desc: "" }],
        spellcasting_ability: { index: "", name: "", url: "" },
      },
    },
    background: {
      name: "",
      index: "",
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
    abilities: {
      STR: 0,
      DEX: 0,
      CON: 0,
      INT: 0,
      WIS: 0,
      CHA: 0,
    },
    skills: {
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
      sleightOfHand: { value: false, name: "sleight Of Hand", modifier: "DEX" },
      stealth: { value: false, name: "Stealth", modifier: "DEX" },
      survival: { value: false, name: "Survival", modifier: "WIS" },
    },
    equipment: {
      misc: [],
      weapons: [],
      shields: [],
      armors: [],
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
  },
  setCharacter: (character) => set((state) => ({ character: character })),
  setRace: (race: ApiRace) =>
    set(
      produce((state) => {
        state.character.race = race;
      })
    ),
  setClass: (dndClass: ApiClass) =>
    set(
      produce((state) => {
        state.character.dndClass = dndClass;
      })
    ),
  setBackground: (background: Background) =>
    set(
      produce((state) => {
        state.character.background = background;
      })
    ),
  setHitpoints: (hitpoints: number) =>
    set(
      produce((state) => {
        state.character.hitpoints = hitpoints;
      })
    ),
  setAbilityScores: (scores: AbilityScores) =>
    set(
      produce((state) => {
        state.character.abilities = scores;
      })
    ),
  setDescription: (description: CharacterDescription) =>
    set(
      produce((state) => {
        state.character.description = description;
      })
    ),
  setSkills: (skills: Skills) =>
    set(
      produce((state) => {
        state.character.skills = skills;
      })
    ),
  setGold: (gold: number) =>
    set(
      produce((state) => {
        state.character.gold = gold;
      })
    ),
  setExperience: (experience: number) =>
    set(
      produce((state) => {
        state.character.experience = experience;
      })
    ),
  setLevel: (level: number) =>
    set(
      produce((state) => {
        state.character.level = level;
      })
    ),
  addMisc: (item: Equipment) =>
    set(
      produce((state) => {
        state.character.equipment.misc.push(item);
      })
    ),
  addShield: (item: Equipment) =>
    set(
      produce((state) => {
        state.character.equipment.shields.push(item);
      })
    ),
  addArmor: (item: Equipment) =>
    set(
      produce((state) => {
        state.character.equipment.armors.push(item);
      })
    ),
  addWeapon: (item: Equipment) =>
    set(
      produce((state) => {
        state.character.equipment.weapons.push(item);
      })
    ),
  setEquipment: (items: {
    weapons: Item[];
    armors: Item[];
    shields: Item[];
    misc: Item[];
  }) =>
    set(
      produce((state) => {
        state.character.equipment = items;
      })
    ),
  addSpell: (spell: Spell, level: number) =>
    set(
      produce((state) => {
        (state.character.spells as any)[level].push(spell);
      })
    ),
  setSpells: (spells: Spells) =>
    set(
      produce((state) => {
        state.character.spells = spells;
      })
    ),
}));
