import { rollRandomScore } from "@/utils";
import { ABILITIES } from "@/constants";
import { AbilityScores } from "@/types";
import styles from '@/styles/CreateCharacter/CharacterForm.module.scss';

interface Props {
    register: (e: any) => any;
    setUsedScores: (e: any) => void;
    usedScores: AbilityScores;
}

export default function RolledAbilityScores({ register, usedScores, setUsedScores }: Props): JSX.Element {

    const rollScore = (ability: string): void => {
        const randomScore = rollRandomScore();
        setUsedScores((draft: any) => { 
            (draft as any)[ability] = randomScore
        });
    }

    return (
        <div>
            { 
                ABILITIES.map((ability: string) => 
                    (
                        <div key={ability}>
                            <div><h3>{ ability }: { (usedScores as any)[ability] }</h3></div>
                            <div>
                                { 
                                    ((usedScores as any)[ability] === 0 || (usedScores as any)[ability] === undefined)
                                        ? <button onClick={(e) => rollScore(ability)}>Roll</button>
                                        : <button disabled>Roll</button>
                                }
                            </div>
                            <input type="text" {...register(ability)} value={(usedScores as any)[ability]} disabled />
                        </div>
                    )
                )
            }
        </div>
    );
}