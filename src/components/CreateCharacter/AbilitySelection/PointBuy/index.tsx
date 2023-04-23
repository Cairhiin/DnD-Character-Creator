import { useState } from "react";
import { useImmer } from "use-immer";
import { calculateAbilityBuyCost } from "@/utils";
import styles from '@/styles/CreateCharacter/CharacterForm.module.scss';

interface Props {
    register: (e: any) => any;
}

export default function PointBuy({ register }: Props): JSX.Element {
    const [totalScore, setTotalScore] = useState<number>(0);
    const [abilityError, setAbilityError] = useState<boolean>(false);
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
            setTotalScore(totalScore => totalScore - (calculateAbilityBuyCost((usedScores as any)[ability]) ?? 0));
        } 

        const newScore = totalScore + (calculateAbilityBuyCost(parseInt(value)) ?? 0);
        setTotalScore(totalScore => totalScore + (calculateAbilityBuyCost(parseInt(value)) ?? 0));
        if (newScore <= 27) {
            setAbilityError(false);
        } else {
            setAbilityError(true);
        }

        setUsedScores(draft => { 
            (draft as any)[ability] = parseInt(value)
        });

    };

    return (
        <div>
            <div>AVAILABLE POINTS: { 27 - totalScore }</div>
            <select {...register("STR")} onChange={(e) => validateScore(e.target.value, "STR")}>
                { 
                    AVAILABLE_SCORES.map((score: number): JSX.Element => 
                        <option value={score}>{score}</option>
                    ) 
                }
            </select>

            <select {...register("DEX")} onChange={(e) => validateScore(e.target.value, "DEX")}>
                { 
                    AVAILABLE_SCORES.map((score: number): JSX.Element => 
                        <option value={score}>{score}</option>
                    ) 
                }
            </select>

            <select {...register("CON")} onChange={(e) => validateScore(e.target.value, "CON")}>
                { 
                    AVAILABLE_SCORES.map((score: number): JSX.Element => 
                        <option value={score}>{score}</option>
                    ) 
                }
            </select>

            <select {...register("INT")} onChange={(e) => validateScore(e.target.value, "INT")}>
                { 
                    AVAILABLE_SCORES.map((score: number): JSX.Element => 
                        <option value={score}>{score}</option>
                    ) 
                }
            </select>

            <select {...register("WIS")} onChange={(e) => validateScore(e.target.value, "WIS")}>
                { 
                    AVAILABLE_SCORES.map((score: number): JSX.Element => 
                        <option value={score}>{score}</option>
                    ) 
                }
            </select>

            <select {...register("CHA")} onChange={(e) => validateScore(e.target.value, "CHA")}>
                { 
                    AVAILABLE_SCORES.map((score: number): JSX.Element => 
                        <option value={score}>{score}</option>
                    ) 
                }
            </select>
            <div>
                { abilityError && <p>You currently have { 27 - totalScore } too many points used.</p> }
            </div>
        </div>
    );
};