import { Dispatch, SetStateAction } from "react";
import { UseFormRegister } from "react-hook-form/dist/types";
import { calculateAbilityBuyCost } from "@/utils";
import { ABILITIES, POINT_BUY_TOTAL, AVAILABLE_SCORES } from "@/constants";
import { AbilityScores, AbilityFormInput } from "@/types";
import styles from "@/styles/CharacterForm.module.scss";

interface Props {
  register: UseFormRegister<AbilityFormInput>;
  updateTotalPointsUsed: Dispatch<SetStateAction<number>>;
  totalPointsUsed: number;
  setUsedScores: (e: any) => any;
  usedScores: AbilityScores;
}

export default function PointBuy({
  register,
  updateTotalPointsUsed,
  totalPointsUsed,
  setUsedScores,
  usedScores,
}: Props): JSX.Element {
  const validateScore = (value: string, ability: string): void => {
    // Check if the ability already has been set and substract the old score from the total
    if ((usedScores as any)[ability] !== 0) {
      updateTotalPointsUsed(
        (totalPointsUsed: number) =>
          totalPointsUsed -
          (calculateAbilityBuyCost((usedScores as any)[ability]) ?? 0)
      );
    }

    updateTotalPointsUsed(
      (totalPointsUsed: number) =>
        totalPointsUsed + (calculateAbilityBuyCost(parseInt(value)) ?? 0)
    );

    // Update the ability score
    setUsedScores((draft: any) => {
      draft[ability] = parseInt(value);
    });
  };

  return (
    <div>
      <div>AVAILABLE POINTS: {POINT_BUY_TOTAL - totalPointsUsed}</div>
      {ABILITIES.map(
        (ability: string): JSX.Element => (
          <select
            {...register(ability as any)}
            onChange={(e) => validateScore(e.target.value, ability)}
          >
            {AVAILABLE_SCORES.map(
              (score: number): JSX.Element => (
                <option value={score}>{score}</option>
              )
            )}
          </select>
        )
      )}
      <div>
        {totalPointsUsed > POINT_BUY_TOTAL && (
          <p>
            You currently have {totalPointsUsed - POINT_BUY_TOTAL} too many
            points used.
          </p>
        )}
      </div>
    </div>
  );
}
