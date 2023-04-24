import { useState } from "react";
import { useImmer } from "use-immer";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { characterStore } from "@/store";
import { AbilityScores, AbilityFormInput } from "@/types";
import { POINT_BUY_TOTAL } from "@/constants";
import Rolled from "./AbilitySelection/Rolled";
import StandardArray from "./AbilitySelection/StandardArray";
import PointBuy from "./AbilitySelection/PointBuy";
import styles from "@/styles/CreateCharacter/CharacterForm.module.scss";

interface Props {
    nextTab: () => void;
    previousTab: () => void;
};

export default function AbilitySelection({ nextTab, previousTab }: Props) {
    const [formError, setFormError] = useState<string | null>(null);
    const [usedScores, setUsedScores] = useImmer<AbilityScores>({
        STR: 0,
        DEX: 0,
        CON: 0,
        INT: 0,
        WIS: 0,
        CHA: 0,
    });
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

    // Save the form state to Zustand and go to next tab if the form has no errors
    const saveData: SubmitHandler<AbilityFormInput> = ({ STR, DEX, CON, INT, WIS, CHA }): void => {
        setFormError(error => null);
        let formHasError = false;

        // Check if all ability scores are unique in standard array method
        if (watch("method") === "array") {
            const abilities: number[] = [STR, DEX, CON, INT, WIS, CHA];
            if (new Set(abilities).size !== abilities.length) {
                setFormError(error => "Please make certain you use all the ability scores in the standard array!");
                formHasError = true;
            }
        }
        
        // Check if the user has used exactly all points in point buy method
        if (watch("method") === "buy" && totalScorePointBuy !== POINT_BUY_TOTAL) {
            setFormError(error => "Please make certain you spend exactly all available points!");
            formHasError = true;
        }
        
        // Check if all ability scores have been set
        if (Object.values(usedScores).filter((score: number) => score === 0 || score === undefined).length !== 0) {
            setFormError(error => "Not all ability scores are set!")
            formHasError = true;
        }

        // If the form has no errors, save the ability scores to the store and go to next tab
        if (!formHasError) {
            setAbilityScores({ STR, DEX, CON, INT, WIS, CHA });
            nextTab();
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
        });
        setUsedScores((draft: any) => { 
            draft.STR = 0;
            draft.DEX = 0;
            draft.CON = 0;
            draft.INT = 0;
            draft.WIS = 0;
            draft.CHA = 0;
        });
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
                        && <Rolled 
                                register={register} 
                                usedScores={usedScores}
                                setUsedScores={setUsedScores}
                            />
                }
                { 
                    watch("method") === "array" 
                        && <StandardArray 
                                register={register} 
                                usedScores={usedScores}
                                setUsedScores={setUsedScores}
                        />
                }
                { 
                    watch("method") === "buy" 
                        && <PointBuy 
                                register={register} 
                                updateTotalPointsUsed={setTotalScorePointBuy}
                                totalPointsUsed={totalScorePointBuy}
                                usedScores={usedScores}
                                setUsedScores={setUsedScores}
                            />
                }
            </div>
            { formError && <div>{ formError }</div> }
            <div className={styles.create__form__buttonRow}>
                <div onClick={previousTab}>Previous</div>
                <button>Next</button>
            </div>
        </form>
    ); 
}