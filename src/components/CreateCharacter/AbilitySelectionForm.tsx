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
        if (Object.values(usedScores).indexOf(value) > -1) {
            console.log("NUMBER ALREADY TAKEN");
        } else {
            setUsedScores(draft => { 
            (draft as any)[ability] = value 
            });
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
                    watch("method") === "roll" && <Rolled />
                }
                { 
                    watch("method") === "array" && (
                        <div className={styles.create__form_abilities__roll}>
                            <select {...register("STR")} onChange={(e) => validateScore(e.target.value, "STR")}>
                                <option value="8">8</option>
                                <option value="10">10</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                            </select>

                            <select {...register("DEX")} onChange={(e) => validateScore(e.target.value, "DEX")}>
                                <option value="8">8</option>
                                <option value="10">10</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                            </select>

                            <select {...register("CON")} onChange={(e) => validateScore(e.target.value, "CON")}>
                                <option value="8">8</option>
                                <option value="10">10</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                            </select>

                            <select {...register("INT")} onChange={(e) => validateScore(e.target.value, "INT")}>
                                <option value="8">8</option>
                                <option value="10">10</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                            </select>

                            <select {...register("WIS")} onChange={(e) => validateScore(e.target.value, "WIS")}>
                                <option value="8">8</option>
                                <option value="10">10</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                            </select>

                            <select {...register("CHA")} onChange={(e) => validateScore(e.target.value, "CHA")}>
                                <option value="8">8</option>
                                <option value="10">10</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                            </select>
                        </div>
                    )
                }
            </div>
            <div className={styles.create__form__buttonRow}>
            <div onClick={previousTab}>Previous</div>
            <button>Next</button>
            </div>
        </form>
    ); 
}