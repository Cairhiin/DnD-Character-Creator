import { useState } from 'react';
import { useImmer } from 'use-immer';
import styles from '@/styles/CreateCharacter/CharacterForm.module.scss';

interface StandardArrayProps {
    register: (e: any) => any;
}

export default function StandardArray({ register  }: StandardArrayProps) {
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
    
    const validateScore = (value: string, ability: string): void => {
        const indexOfAbility = Object.values(usedScores).indexOf(parseInt(value));
        if ((indexOfAbility > -1) &&
            (Object.keys(usedScores).indexOf(ability) !== indexOfAbility)) {
            setAbilityError(true);
        } else {
            setUsedScores(draft => { 
                (draft as any)[ability] = parseInt(value)
            });
            setAbilityError(false);
        }
    }

    return (
        <div className={styles.create__form_abilities__roll}>
            <select {...register("STR")} onChange={(e) => validateScore(e.target.value, "STR")}>
                { 
                    STANDARD_ARRAY.map((score: number): JSX.Element => 
                        <option value={score}>{score}</option>
                    ) 
                }
            </select>

            <select {...register("DEX")} onChange={(e) => validateScore(e.target.value, "DEX")}>
                { 
                    STANDARD_ARRAY.map((score: number): JSX.Element => 
                        <option value={score}>{score}</option>
                    ) 
                }
            </select>

            <select {...register("CON")} onChange={(e) => validateScore(e.target.value, "CON")}>
                { 
                    STANDARD_ARRAY.map((score: number): JSX.Element => 
                        <option value={score}>{score}</option>
                    ) 
                }
            </select>

            <select {...register("INT")} onChange={(e) => validateScore(e.target.value, "INT")}>
                { 
                    STANDARD_ARRAY.map((score: number): JSX.Element => 
                        <option value={score}>{score}</option>
                    ) 
                }
            </select>

            <select {...register("WIS")} onChange={(e) => validateScore(e.target.value, "WIS")}>
                { 
                    STANDARD_ARRAY.map((score: number): JSX.Element => 
                        <option value={score}>{score}</option>
                    ) 
                }
            </select>

            <select {...register("CHA")} onChange={(e) => validateScore(e.target.value, "CHA")}>
                { 
                    STANDARD_ARRAY.map((score: number): JSX.Element => 
                        <option value={score}>{score}</option>
                    ) 
                }
            </select>
            <div>
                { abilityError && <p>That ability score has already been used.</p> }
            </div>
        </div>
    )
};