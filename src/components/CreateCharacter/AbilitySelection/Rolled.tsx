import { UseFormSetValue, UseFormRegister } from "react-hook-form";
import { rollRandomScore } from "@/utils";
import { ABILITIES } from "@/constants";
import { AbilityScores, AbilityFormInput } from "@/types";
import styles from "@/styles/Create.module.scss";

interface Props {
  register: UseFormRegister<AbilityFormInput>;
  setUsedScores: (e: any) => any;
  setValue: UseFormSetValue<AbilityFormInput>;
  usedScores: AbilityScores;
  setAbilityScores: (e: any) => any;
  abilityScores: AbilityScores;
}

export default function RolledAbilityScores({
  register,
  usedScores,
  setValue,
  setUsedScores,
  setAbilityScores,
  abilityScores,
}: Props): JSX.Element {
  const rollScore = (ability: string): void => {
    const randomScore = rollRandomScore();
    setUsedScores((draft: any) => {
      draft[ability] = randomScore;
    });

    // Set the value of the ability score because the button initiating is different from the register element
    setValue(ability as any, randomScore);

    setAbilityScores({ ...abilityScores, [ability]: randomScore });
  };

  return (
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
            <input type="text" {...register(ability as any)} disabled />
            <div>
              {(usedScores as any)[ability] === 0 ||
              (usedScores as any)[ability] === undefined ? (
                <button onClick={(e) => rollScore(ability)}>Roll</button>
              ) : (
                <button disabled>Roll</button>
              )}
            </div>
          </div>
        )
      )}
    </div>
  );
}
