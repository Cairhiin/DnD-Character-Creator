import { useState } from "react";
import { useImmer } from "use-immer";
import { calculateAbilityBuyCost } from "@/utils";
import { ABILITIES } from "@/constants";
import styles from '@/styles/CreateCharacter/CharacterForm.module.scss';

interface Props {
    register: (e: any) => any;
    updateTotalPointsUsed: (e: any) => void;
    totalPointsUsed: (number);
}

export default function PointBuy({ register, updateTotalPointsUsed, totalPointsUsed }: Props): JSX.Element {
    const [usedScores, setUsedScores] = useImmer({
        STR: 0,
        DEX: 0,
        CON: 0,
        INT: 0,
        WIS: 0,
        CHA: 0,
    });
    const AVAILABLE_SCORES = Array(8).fill(1).map((_: number, i: number) => i + 8); 

    const validateScore = (value: string, ability: string): void => {     
        
        // Check if the ability already has been set and substract the old score from the total
        if ((usedScores as any)[ability] !== 0) {
            updateTotalPointsUsed((totalPointsUsed: number) => totalPointsUsed - (calculateAbilityBuyCost((usedScores as any)[ability]) ?? 0));
        } 

        updateTotalPointsUsed((totalPointsUsed: number) => totalPointsUsed + (calculateAbilityBuyCost(parseInt(value)) ?? 0));

        // Update the ability score
        setUsedScores(draft => { 
            (draft as any)[ability] = parseInt(value)
        });

    };

    return (
        <div>
            <div>AVAILABLE POINTS: { 27 - totalPointsUsed }</div>
                {
                    ABILITIES.map((ability: string) => 
                        (
                            <select {...register(ability)} onChange={(e) => validateScore(e.target.value, ability)}>
                                { 
                                    AVAILABLE_SCORES.map((score: number): JSX.Element => 
                                        <option value={score}>{score}</option>
                                    ) 
                                }
                            </select>
                        )
                    )
                }
            <div>
                { totalPointsUsed > 27 && <p>You currently have { totalPointsUsed - 27 } too many points used.</p> }
            </div>
        </div>
    );
};