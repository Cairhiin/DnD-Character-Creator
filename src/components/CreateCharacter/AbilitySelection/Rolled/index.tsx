import { useImmer } from "use-immer";
import { rollRandomScore } from "@/utils";
import { ABILITIES } from "@/constants";
import styles from '@/styles/CreateCharacter/CharacterForm.module.scss';

export default function RolledAbilityScores(): JSX.Element {
    const [usedScores, setUsedScores] = useImmer({
        STR: 0,
        DEX: 0,
        CON: 0,
        INT: 0,
        WIS: 0,
        CHA: 0,
    });

    const rollScore = (ability: string): void => {
        const randomScore = rollRandomScore();
        setUsedScores(draft => { 
            (draft as any)[ability] = randomScore
        });
    }

    return (
        <div>
            { 
                ABILITIES.map((ability: string) => 
                    (
                        <div key={ability}>
                            <div><h3>{ ability }</h3></div>
                            <div>
                                { 
                                    (usedScores as any)[ability] !== 0 
                                        ? <button onClick={(e) => rollScore(ability)} disabled>Roll</button>
                                        : <button onClick={(e) => rollScore(ability)}>Roll</button>
                                }
                            </div>
                            <div>{(usedScores as any)[ability]}</div>
                        </div>
                    )
                )
            }
        </div>
    );
}