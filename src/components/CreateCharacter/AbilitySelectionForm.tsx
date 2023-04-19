import { useForm, SubmitHandler } from "react-hook-form";
import { characterStore } from "@/store";
import styles from "@/styles/CreateCharacter/CharacterForm.module.scss";

const rollRandomScore = () => console.log(Math.random() * 24 + 4);

interface ClassFormInput {  
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
    rollRandomScore: () => void;
    register: () => void;
}

interface StandardArrayProps {
    abilityScore: string;
    register: () => void;
}

const RollButton = ({ abilityScore, register }: RollButtonProps) => (
    <div className={styles.create__form__abilities__button} onClick={rollRandomScore} {...register(abilityScore)}>
        { abilityScore }
    </div>
);

const StandardArrayInput = ({ abilityScore, register }: StandardArrayProps) => (
    <select className={styles.create__form__abilities__dropdown}  {...register(abilityScore)} >
        <option value="15">15</option>
        <option value="14">14</option>
        <option value="13">13</option>
        <option value="12">12</option>
        <option value="10">10</option>
        <option value="8">8</option>
    </select>
);

export default function AbilitySelection({ nextTab, previousTab }: Props) {
    const abilityScores = characterStore((state) => state.abilityScores);
    const setAbilityScores = characterStore((state: any) => state.setAbilityScores);
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm<ClassFormInput>({ defaultValues: 
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
    const saveData: SubmitHandler<ClassFormInput> = ({ STR, DEX, CON, INT, WIS, CHA }): void => {
        setAbilityScores({ STR, DEX, CON, INT, WIS, CHA });
        nextTab();
    };

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
                // Check what method is selected to determine how to assign the attributes
                watch("method") === "roll" && (
                        <div className={styles.create__form_abilities__roll}>
                            {
                                Object.keys(abilityScores).map((ability) => 
                                    <RollButton rollRandomScore={rollRandomScore} register={register} abilityScore={ability} />)    
                            }
                        </div>
                    )
                }
                { 
                watch("method") === "array" && (
                        <div className={styles.create__form_abilities__roll}>
                            {
                                Object.keys(abilityScores).map((ability) => 
                                    <StandardArrayInput register={register} abilityScore={ability} />)    
                            }
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