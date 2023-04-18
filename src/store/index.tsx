import { create } from "zustand";

interface CharacterFormState {
    race: string,
    dndClass: string,
    abilities: string[],
    equipment: string[],
    description: string[],
    setRace: (race: string) => void
    setClass: (dndClass: string) => void
};

export const characterStore = create<CharacterFormState>((set) => ({
    race: '',
    dndClass: '',
    abilities: [],
    equipment: [],
    description: [],
    setRace: (race) => set((state) => ({ race: race })),
    setClass: (dndClass) => set((state) => ({ dndClass: dndClass })),
}));