import { useState } from 'react';
import { UseFormRegister } from 'react-hook-form/dist/types';
import { AbilityScores, AbilityFormInput } from '@/types';
import { ABILITIES, STANDARD_ARRAY } from '@/constants';
import styles from '@/styles/CreateCharacter/CharacterForm.module.scss';

interface StandardArrayProps {
    register: UseFormRegister<AbilityFormInput>;
    setUsedScores: (e: any) => void;
    usedScores: AbilityScores;
}

export default function StandardArray({ register, usedScores, setUsedScores }: StandardArrayProps) {
    
    const [abilityError, setAbilityError] = useState<boolean>(false);
    
    const validateScore = (value: string, ability: string): void => {
        const indexOfAbility = Object.values(usedScores).indexOf(parseInt(value));
        if ((indexOfAbility > -1) &&
            (Object.keys(usedScores).indexOf(ability) !== indexOfAbility)) {
            setAbilityError(true);
        } else {
            setUsedScores((draft: any) => { 
                (draft as any)[ability] = parseInt(value)
            });
            setAbilityError(false);
        }
    }

    return (
        <div className={styles.create__form_abilities__roll}>
            {
                ABILITIES.map((ability: string): JSX.Element => 
                    (
                        <select {...register(ability as any)} onChange={(e) => validateScore(e.target.value, ability)}>
                            { 
                                STANDARD_ARRAY.map((score: number): JSX.Element => 
                                    <option value={score}>{score}</option>
                                ) 
                            }
                        </select>
                    )
                )
            }
            <div>
                { abilityError && <p>That ability score has already been used.</p> }
            </div>
        </div>
    )
};