import { create } from "zustand";
import { 
    CharacterFormState, CharacterDescription, AbilityScores 
} from "@/types";

export const characterStore = create<CharacterFormState>((set) => ({
    race: '',
    dndClass: '',
    abilityScores: { STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 },
    equipment: [],
    description: {
        background: "",
        details: {    
            alignment: "",
            faith: ""
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
    },
    setRace: (race: string) => set((state) => ({ race: race })),
    setClass: (dndClass: string) => set((state) => ({ dndClass: dndClass })),
    setAbilityScores: (scores: AbilityScores) => set((state) => ({ abilityScores: scores })),
    setDescription: (description: CharacterDescription) => set((state) => ({ description: description })),
}));