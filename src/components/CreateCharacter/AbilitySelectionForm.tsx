import { useState } from "react";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { characterStore } from "@/store";
import { ABILITIES } from "@/constants";
import Rolled from "./AbilitySelection/Rolled";
import StandardArray from "./AbilitySelection/StandardArray";
import PointBuy from "./AbilitySelection/PointBuy";
import { rollRandomScore } from "@/utils";
import styles from "@/styles/CreateCharacter/CharacterForm.module.scss";

interface AbilityFormInput {  
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

export default function AbilitySelection({ nextTab, previousTab }: Props) {
    const [totalScorePointBuy, setTotalScorePointBuy] = useState<number>(0);
    const abilityScores = characterStore((state) => state.abilityScores);
    const setAbilityScores = characterStore((state: any) => state.setAbilityScores);
    const {
        handleSubmit,
        register,
        watch,
        reset,    
        formState: { errors },
    } = useForm<AbilityFormInput>({ 
        defaultValues: 
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
    const saveData: SubmitHandler<AbilityFormInput> = ({ STR, DEX, CON, INT, WIS, CHA }): void => {
        if (watch("method") === "array") {
            // Checking if all values are unique
            const abilities: number[] = [STR, DEX, CON, INT, WIS, CHA];
            if (new Set(abilities).size === abilities.length) {
                setAbilityScores({ STR, DEX, CON, INT, WIS, CHA });
                nextTab();
            }
        }
    };

    // Reset ability scores and total points used in case of point buy on method change
    const resetForm = (e: string): void => {
        setTotalScorePointBuy(0);
        reset({
            method: e,
            STR: abilityScores.STR,
            DEX: abilityScores.DEX, 
            CON: abilityScores.CON, 
            INT: abilityScores.INT, 
            WIS: abilityScores.WIS, 
            CHA: abilityScores.CHA
        })
    }

    return (
        <form className={styles.create__form__ability_score} onSubmit={handleSubmit(saveData)}>
            <select 
                {...register("method")} 
                onChange={(e) => resetForm(e.target.value)}
            >
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
                        && <Rolled  register={register} />
                }
                { 
                    watch("method") === "array" 
                        && <StandardArray register={register} />
                }
                { 
                    watch("method") === "buy" 
                        && <PointBuy 
                                register={register} 
                                updateTotalPointsUsed={setTotalScorePointBuy}
                                totalPointsUsed={totalScorePointBuy}
                            />
                }
            </div>
            <div className={styles.create__form__buttonRow}>
                <div onClick={previousTab}>Previous</div>
                <button>Next</button>
            </div>
        </form>
    ); 
}