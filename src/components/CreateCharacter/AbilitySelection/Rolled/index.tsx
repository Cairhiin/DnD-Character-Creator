import { UseFormSetValue } from "react-hook-form";
import { rollRandomScore } from "@/utils";
import { ABILITIES } from "@/constants";
import { AbilityScores, AbilityFormInput } from "@/types";
import styles from '@/styles/CreateCharacter/CharacterForm.module.scss';

interface Props {
    register: (e: any) => any;
    setUsedScores: (e: any) => void;
    setValue: UseFormSetValue<AbilityFormInput>;
    usedScores: AbilityScores;
}

export default function RolledAbilityScores({ register, usedScores, setValue, setUsedScores }: Props): JSX.Element {
    const rollScore = (ability: string): void => {
        const randomScore = rollRandomScore();
        setUsedScores((draft: any) => { 
            (draft as any)[ability] = randomScore
        });

        // Set the value of the ability score because the button initiating is different from the register element
        setValue(ability as any, randomScore);
    }

    return (
        <div>
            { 
                ABILITIES.map((ability: string): JSX.Element => 
                    (
                        <div key={ability}>
                            <div><h3>{ ability }</h3></div>
                            <div>
                                { 
                                    ((usedScores as any)[ability] === 0 || (usedScores as any)[ability] === undefined)
                                        ? <button onClick={(e) => rollScore(ability)}>Roll</button>
                                        : <button disabled>Roll</button>
                                }
                            </div>
                            <input type="text" {...register(ability)} disabled />
                        </div>
                    )
                )
            }
        </div>
    );
}