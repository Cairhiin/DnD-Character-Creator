import { useState } from "react";
import { useImmer } from "use-immer";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { characterStore } from "@/store";
import Rolled from "./AbilitySelection/Rolled";
import StandardArray from "./AbilitySelection/StandardArray";
import styles from "@/styles/CreateCharacter/CharacterForm.module.scss";

interface AbiltyFormInput {  
    method: string;
    STR: number;
    DEX: number;
    CON: number;
    INT: number;
    WIS: number;
    CHA: number;
};

interface Props {
    nextTab: () => void;
    previousTab: () => void;
};

interface RollButtonProps {
    abilityScore: string;
    rollRandomScore: () => number;
    register: (e: any) => any;
}

export default function AbilitySelection({ nextTab, previousTab }: Props) {
    const STANDARD_ARRAY = [8, 10, 12, 13, 14, 15]; 
    const [abilityError, setAbilityError] = useState<boolean>(false);
    const [usedScores, setUsedScores] = useImmer({
        STR: 0,
        DEX: 0,
        CON: 0,
        INT: 0,
        WIS: 0,
        CHA: 0,
    });
    const abilityScores = characterStore((state) => state.abilityScores);
    const setAbilityScores = characterStore((state: any) => state.setAbilityScores);
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm<AbiltyFormInput>({ defaultValues: 
        {   
            method: "array",
            STR: abilityScores.STR,
            DEX: abilityScores.DEX, 
            CON: abilityScores.CON, 
            INT: abilityScores.INT, 
            WIS: abilityScores.WIS, 
            CHA: abilityScores.CHA
        }, 
        mode: "onSubmit" });

    // Save the form state to Zustand and go to next tab
    const saveData: SubmitHandler<AbiltyFormInput> = ({ STR, DEX, CON, INT, WIS, CHA }): void => {
        // Checking if all values are unique
        const abilities: number[] = [STR, DEX, CON, INT, WIS, CHA];
        if (new Set(abilities).size === abilities.length) {
            setAbilityScores({ STR, DEX, CON, INT, WIS, CHA });
            nextTab();
        }
    };

    const validateScore = (value: string, ability: string): void => {
        const indexOfAbility = Object.values(usedScores).indexOf(parseInt(value));
        if ((indexOfAbility > -1) &&
            (Object.keys(usedScores).indexOf(ability) !== indexOfAbility))
        {
            setAbilityError(true);
        } else {
            setUsedScores(draft => { 
                (draft as any)[ability] = parseInt(value)
            });
            setAbilityError(false);
        }
    }

    return (
        <form className={styles.create__form__ability_score} onSubmit={handleSubmit(saveData)}>
            <select {...register("method")}>
                <option value="array">Standard Array</option>
                <option value="buy">Point Buy</option> 
                <option value="roll">Roll</option>   
            </select>
            <div>
                <div className={styles.create__form__abilities}>
                    <div>Strength</div>
                    <div>Dexterity</div>
                    <div>Constitution</div>
                    <div>Intelligence</div>
                    <div>Wisdom</div>
                    <div>Charisma</div>
                </div>
                { 
                    // Check which method is selected to determine how to assign the attributes
                    watch("method") === "roll" 
                        && <Rolled />
                }
                { 
                    watch("method") === "array" 
                        && <StandardArray register={register} />
                }
            </div>
            <div className={styles.create__form__buttonRow}>
                <div onClick={previousTab}>Previous</div>
                <button>Next</button>
            </div>
        </form>
    ); 
}