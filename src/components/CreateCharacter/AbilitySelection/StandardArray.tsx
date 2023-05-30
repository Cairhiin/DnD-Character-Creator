import { useState } from "react";
import { UseFormRegister, UseFormSetValue } from "react-hook-form/dist/types";
import type { AbilityScores, AbilityFormInput } from "@/types";
import { ABILITIES, STANDARD_ARRAY } from "@/constants";
import { ErrorField } from "../ClassSelectionForm";
import styles from "@/styles/Create.module.scss";

interface StandardArrayProps {
  register: UseFormRegister<AbilityFormInput>;
  setValue: UseFormSetValue<AbilityFormInput>;
  setUsedScores: (e: any) => void;
  setAbilityScores: (e: any) => void;
  usedScores: AbilityScores;
  abilityScores: AbilityScores;
}

export default function StandardArray({
  register,
  setValue,
  usedScores,
  setUsedScores,
  setAbilityScores,
  abilityScores,
}: StandardArrayProps) {
  const [abilityError, setAbilityError] = useState<string[]>([]);
  const validateScore = (value: string, ability: string): void => {
    const indexOfAbility = Object.values(usedScores).indexOf(parseInt(value));

    // Check if the ability score is already used by another ability
    if (
      indexOfAbility > -1 &&
      Object.keys(usedScores).indexOf(ability) !== indexOfAbility
    ) {
      setAbilityError((prev) => [...prev, ability]);
    } else {
      setUsedScores((draft: any) => {
        draft[ability] = parseInt(value);
      });

      /* 
        Check if the ability changed a score that previously 
        was already taken and remove the ability from the error array 
      */
      if (abilityError.indexOf(ability) > -1) {
        setAbilityError((prev) =>
          prev.filter((abilityScore) => abilityScore !== ability)
        );
      }
      setValue(ability as any, value);
      setAbilityScores({ ...abilityScores, [ability]: parseInt(value) });
    }
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
                {STANDARD_ARRAY.map(
                  (score: number, index: number): JSX.Element => (
                    <option value={score} key={score}>
                      {score}
                    </option>
                  )
                )}
              </select>
            </div>
          )
        )}
      </div>
      <div>
        {abilityError.length > 0 && (
          <ErrorField error="That ability score has already been used." />
        )}
      </div>
    </>
  );
}
