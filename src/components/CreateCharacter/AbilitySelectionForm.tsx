import { useState, useEffect } from "react";
import { useImmer } from "use-immer";
import { useForm, SubmitHandler, UseFormRegister } from "react-hook-form";
import { characterStore } from "@/store";
import { AbilityScores, AbilityFormInput } from "@/types";
import { POINT_BUY_TOTAL } from "@/constants";
import Rolled from "./AbilitySelection/Rolled";
import StandardArray from "./AbilitySelection/StandardArray";
import PointBuy from "./AbilitySelection/Pointbuy";
import { calculateAbilityModifier } from "@/utils";
import { CreateCharacterCard } from "@/pages/create";
import { ErrorField } from "./ClassSelectionForm";
import styles from "@/styles/CharacterForm.module.scss";
import formStyles from "@/styles/CharacterForm.module.scss";

interface Props {
  nextTab: () => void;
  previousTab: () => void;
}

export default function AbilitySelection({
  nextTab,
  previousTab,
}: Props): JSX.Element {
  const [formError, setFormError] = useState<string | null>(null);
  const [usedScores, setUsedScores] = useImmer<AbilityScores>({
    STR: 0,
    DEX: 0,
    CON: 0,
    INT: 0,
    WIS: 0,
    CHA: 0,
  });
  const [totalScorePointBuy, setTotalScorePointBuy] = useState<number>(0);
  const abilityScores = characterStore((state) => state.abilityScores);
  const setAbilityScores = characterStore(
    (state: any) => state.setAbilityScores
  );

  // Get the ability bonuses from the race choice and create an array out of them
  const { ability_bonuses } = characterStore((state) => state.race);
  const abilityBonusPerAttribute: number[] = [];
  for (const key of Object.keys(usedScores)) {
    const ab = ability_bonuses?.filter(
      (bonus) => bonus.ability_score.name === key
    );
    if (ab?.length !== 0) {
      abilityBonusPerAttribute.push(ab ? ab[0].bonus : 0);
    } else {
      abilityBonusPerAttribute.push(0);
    }
  }

  const {
    handleSubmit,
    register,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm<AbilityFormInput>({
    defaultValues: {
      method: "array",
      STR: 0,
      DEX: 0,
      CON: 0,
      INT: 0,
      WIS: 0,
      CHA: 0,
    },
    mode: "onSubmit",
  });

  const saveData: SubmitHandler<AbilityFormInput> = ({
    STR,
    DEX,
    CON,
    INT,
    WIS,
    CHA,
  }): void => {
    setFormError((error) => null);
    let formHasError = false;

    if (watch("method") === "array") {
      const abilities: number[] = [STR, DEX, CON, INT, WIS, CHA];
      if (new Set(abilities).size !== abilities.length) {
        setFormError(
          (error) =>
            "Please make certain you use all the ability scores in the standard array!"
        );
        formHasError = true;
      }
    }

    if (watch("method") === "buy" && totalScorePointBuy !== POINT_BUY_TOTAL) {
      setFormError(
        (error) => "Please make certain you spend exactly all available points!"
      );
      formHasError = true;
    }

    if (
      Object.values(usedScores).filter(
        (score: number) => score === 0 || score === undefined
      ).length !== 0
    ) {
      setFormError((error) => "Not all ability scores are set!");
      formHasError = true;
    }

    if (!formHasError) {
      setUsedScores({ STR: 0, DEX: 0, CON: 0, INT: 0, WIS: 0, CHA: 0 });
      nextTab();
    }
  };

  // Reset ability scores and total points used in case of point buy on method change
  const resetForm = (e: string): void => {
    setTotalScorePointBuy(0);
    reset({
      method: e,
      STR: 0,
      DEX: 0,
      CON: 0,
      INT: 0,
      WIS: 0,
      CHA: 0,
    });
    setUsedScores((draft: any) => {
      draft.STR = 0;
      draft.DEX = 0;
      draft.CON = 0;
      draft.INT = 0;
      draft.WIS = 0;
      draft.CHA = 0;
    });
  };

  return (
    <div className={formStyles.create__layout}>
      <div></div>
      <aside>
        <CreateCharacterCard header={`Ability Scores | ${watch("method")}`}>
          <div className={formStyles.create__attributes__card}>
            <div className={styles.create__attributes__card__list}>
              <div>Strength</div>
              <div>Dexterity</div>
              <div>Constitution</div>
              <div>Intelligence</div>
              <div>Wisdom</div>
              <div>Charisma</div>
            </div>
            <div className={styles.create__attributes__card__score}>
              {Object.values(abilityScores).map((ability: number) => (
                <div>
                  <span>{ability}</span>
                </div>
              ))}
            </div>
            <div className={styles.create__attributes__card__total}>
              {abilityBonusPerAttribute.map((ability: number) => (
                <div>
                  <span>+{ability}</span>
                </div>
              ))}
            </div>
            <div className={styles.create__attributes__card__bonus}>
              {Object.values(abilityScores).map(
                (ability: number, index: number) => (
                  <div>
                    <span>{ability + abilityBonusPerAttribute[index]}</span>
                  </div>
                )
              )}
            </div>
            <div className={styles.create__attributes__card__mod}>
              {Object.values(abilityScores).map((ab: number, index: number) => (
                <div>
                  <span>
                    {calculateAbilityModifier(
                      ab + abilityBonusPerAttribute[index]
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CreateCharacterCard>
      </aside>
      <form
        className={formStyles.character__creation__form}
        onSubmit={handleSubmit(saveData)}
      >
        <div>
          <div className={styles.character__creation__form__method}>
            <select
              {...register("method")}
              onChange={(e) => resetForm(e.target.value)}
            >
              <option value="array">Standard Array</option>
              <option value="buy">Point Buy</option>
              <option value="roll">Roll</option>
            </select>
          </div>
          <div className={styles.character__creation__form__column}>
            <h3>Ability Scores</h3>
            {
              // Check which method is selected to determine how to assign the attributes
              watch("method") === "roll" && (
                <Rolled
                  register={register}
                  setUsedScores={setUsedScores}
                  setValue={setValue}
                  usedScores={usedScores}
                  setAbilityScores={setAbilityScores}
                  abilityScores={abilityScores}
                />
              )
            }
            {watch("method") === "array" && (
              <StandardArray
                register={register}
                usedScores={usedScores}
                setUsedScores={setUsedScores}
                setAbilityScores={setAbilityScores}
                abilityScores={abilityScores}
              />
            )}
            {watch("method") === "buy" && (
              <PointBuy
                register={register}
                updateTotalPointsUsed={setTotalScorePointBuy}
                totalPointsUsed={totalScorePointBuy}
                usedScores={usedScores}
                setUsedScores={setUsedScores}
                setAbilityScores={setAbilityScores}
                abilityScores={abilityScores}
              />
            )}
          </div>
        </div>
        {formError && <ErrorField error={formError} />}
        <div className={styles.create__form__buttonRow}>
          <div
            onClick={previousTab}
            className={styles.create__form__buttonRow__button}
          >
            Previous
          </div>
          <button>Next</button>
        </div>
      </form>
      <div></div>
    </div>
  );
}
