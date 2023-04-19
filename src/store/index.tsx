import { create } from "zustand";
import { CharacterFormState } from "@/types";

export const characterStore = create<CharacterFormState>((set) => ({
    race: '',
    dndClass: '',
    abilityScores: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 },
    equipment: [],
    description: [],
    setRace: (race) => set((state) => ({ race: race })),
    setClass: (dndClass) => set((state) => ({ dndClass: dndClass })),
    setAbilityScores: (scores) => set((state) => ({ abilityScores: scores }))
}));