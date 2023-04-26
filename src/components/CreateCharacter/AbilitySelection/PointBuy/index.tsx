import { calculateAbilityBuyCost } from "@/utils";
import { ABILITIES, POINT_BUY_TOTAL } from "@/constants";
import { AbilityScores } from "@/types";
import styles from '@/styles/CreateCharacter/CharacterForm.module.scss';

interface Props {
    register: (e: any) => any;
    updateTotalPointsUsed: (e: any) => void;
    totalPointsUsed: (number);
    setUsedScores: (e: any) => void;
    usedScores: AbilityScores;
}

export default function PointBuy(
        { register, updateTotalPointsUsed, totalPointsUsed, setUsedScores, usedScores }: Props
    ): JSX.Element {

    // Set the available ability scores from 8 to 15    
    const AVAILABLE_SCORES = Array(8).fill(0).map((_: number, i: number) => i + 8); 

    const validateScore = (value: string, ability: string): void => {     
        
        // Check if the ability already has been set and substract the old score from the total
        if ((usedScores as any)[ability] !== 0) {
            updateTotalPointsUsed((totalPointsUsed: number) => totalPointsUsed - (calculateAbilityBuyCost((usedScores as any)[ability]) ?? 0));
        } 

        updateTotalPointsUsed((totalPointsUsed: number) => totalPointsUsed + (calculateAbilityBuyCost(parseInt(value)) ?? 0));

        // Update the ability score
        setUsedScores((draft: any) => { 
            (draft as any)[ability] = parseInt(value)
        });

    };

    return (
        <div>
            <div>AVAILABLE POINTS: { POINT_BUY_TOTAL - totalPointsUsed }</div>
                {
                    ABILITIES.map((ability: string): JSX.Element => 
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
                { totalPointsUsed > POINT_BUY_TOTAL && <p>You currently have { totalPointsUsed - POINT_BUY_TOTAL } too many points used.</p> }
            </div>
        </div>
    );
};