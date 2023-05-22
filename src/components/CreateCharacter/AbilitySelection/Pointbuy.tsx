import { Dispatch, SetStateAction } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form/dist/types";
import { calculateAbilityBuyCost } from "@/utils";
import { ABILITIES, POINT_BUY_TOTAL, AVAILABLE_SCORES } from "@/constants";
import { AbilityScores, AbilityFormInput } from "@/types";
import styles from "@/styles/Create.module.scss";

interface Props {
  register: UseFormRegister<AbilityFormInput>;
  setValue: UseFormSetValue<AbilityFormInput>;
  updateTotalPointsUsed: Dispatch<SetStateAction<number>>;
  totalPointsUsed: number;
  setUsedScores: (e: any) => any;
  usedScores: AbilityScores;
  setAbilityScores: (e: any) => any;
  abilityScores: AbilityScores;
}

export default function PointBuy({
  register,
  setValue,
  updateTotalPointsUsed,
  totalPointsUsed,
  setUsedScores,
  usedScores,
  setAbilityScores,
  abilityScores,
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

    setUsedScores((draft: any) => {
      draft[ability] = parseInt(value);
    });

    setValue(ability as any, value);
    setAbilityScores({ ...abilityScores, [ability]: parseInt(value) });
  };

  return (
    <>
      <div className={styles.create__form__abilities}>
        {ABILITIES.map(
          (ability: string): JSX.Element => (
            <div className={styles.create__form__abilities__ab} key={ability}>
              <label
                className={styles.create__form__abilities__label}
                htmlFor={ability}
              >
                {ability}
              </label>
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
            </div>
          )
        )}
      </div>
      <div>
        {totalPointsUsed > POINT_BUY_TOTAL && (
          <p>
            You currently have {totalPointsUsed - POINT_BUY_TOTAL} too many
            points used.
          </p>
        )}
      </div>
      <div className={styles.create__form__points}>
        AVAILABLE POINTS: <span>{POINT_BUY_TOTAL - totalPointsUsed}</span>
      </div>
    </>
  );
}
