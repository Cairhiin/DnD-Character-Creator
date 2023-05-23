import { useState, useEffect, useContext } from "react";
import { useImmer } from "use-immer";
import { produce } from "immer";
import {
  useForm,
  SubmitHandler,
  UseFormRegister,
  useFormState,
} from "react-hook-form";
import AnimatedButton from "../AnimatedButton";
import { characterStore } from "@/store";
import { AbilityScores, AbilityFormInput } from "@/types";
import { POINT_BUY_TOTAL } from "@/constants";
import Rolled from "./AbilitySelection/Rolled";
import StandardArray from "./AbilitySelection/StandardArray";
import PointBuy from "./AbilitySelection/Pointbuy";
import { calculateAbilityModifier } from "@/utils";
import { CreateCharacterCard, FormStateContext } from "@/pages/create";
import { ErrorField } from "./ClassSelectionForm";
import styles from "@/styles/Create.module.scss";

interface Props {
  nextTab: () => void;
  previousTab: () => void;
}

export default function AbilitySelection({
  nextTab,
  previousTab,
}: Props): JSX.Element {
  const { form, setForm } = useContext(FormStateContext);
  const [formError, setFormError] = useState<string | null>(null);
  const [usedScores, setUsedScores] = useImmer<AbilityScores>({
    STR: form.steps.abilitiesSelection.value.abilities.STR,
    DEX: form.steps.abilitiesSelection.value.abilities.DEX,
    CON: form.steps.abilitiesSelection.value.abilities.CON,
    INT: form.steps.abilitiesSelection.value.abilities.INT,
    WIS: form.steps.abilitiesSelection.value.abilities.WIS,
    CHA: form.steps.abilitiesSelection.value.abilities.CHA,
  });
  const [totalScorePointBuy, setTotalScorePointBuy] = useState<number>(0);

  // Get the ability bonuses from the race choice
  const { ability_bonuses } = form.steps.raceSelection.value.race;
  const [abilityScores, setAbilityScores] = useState<AbilityScores>({
    STR: 0,
    DEX: 0,
    CON: 0,
    INT: 0,
    WIS: 0,
    CHA: 0,
  });
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
    getValues,
    reset,
    setValue,
    control,
    formState: { errors },
  } = useForm<AbilityFormInput>({
    defaultValues: {
      method: form.steps.abilitiesSelection.value.method || "array",
      STR: form.steps.abilitiesSelection.value.abilities.STR,
      DEX: form.steps.abilitiesSelection.value.abilities.DEX,
      CON: form.steps.abilitiesSelection.value.abilities.CON,
      INT: form.steps.abilitiesSelection.value.abilities.INT,
      WIS: form.steps.abilitiesSelection.value.abilities.WIS,
      CHA: form.steps.abilitiesSelection.value.abilities.CHA,
    },
    mode: "onSubmit",
  });

  const { isDirty } = useFormState({
    control,
  });

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.abilitiesSelection.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  useEffect(() => {
    /* If the user has a form state with point buy ability score method 
    set the points used to the max available */
    if (form.steps.abilitiesSelection.value.method === "buy") {
      setTotalScorePointBuy(POINT_BUY_TOTAL);
    }
  }, []);

  const saveData: SubmitHandler<AbilityFormInput> = ({
    STR,
    DEX,
    CON,
    INT,
    WIS,
    CHA,
    method,
  }): void => {
    setFormError((error) => null);
    let formHasError = false;

    if (method === "array") {
      const abilities: number[] = [STR, DEX, CON, INT, WIS, CHA];
      if (new Set(abilities).size !== abilities.length) {
        setFormError(
          (error) =>
            "Please make certain you use all the ability scores in the standard array!"
        );
        formHasError = true;
      }
    }

    if (method === "buy" && totalScorePointBuy !== POINT_BUY_TOTAL) {
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
      setForm(
        produce((formState) => {
          formState.steps.abilitiesSelection = {
            value: {
              method: method,
              abilities: {
                STR: STR,
                DEX: DEX,
                CON: CON,
                WIS: WIS,
                INT: INT,
                CHA: CHA,
              },
            },
            valid: true,
            dirty: false,
          };
        })
      );
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
    <div className={styles.create__layout}>
      <div></div>
      <aside>
        <CreateCharacterCard
          header={`Ability Scores | ${
            getValues("method")
              ? getValues("method")
              : form.steps.abilitiesSelection.value.method
          }`}
        >
          <div className={styles.create__attributes__card}>
            <div className={styles.create__attributes__card__list}>
              <div>Strength</div>
              <div>Dexterity</div>
              <div>Constitution</div>
              <div>Intelligence</div>
              <div>Wisdom</div>
              <div>Charisma</div>
            </div>
            <div className={styles.create__attributes__card__score}>
              {!getValues("STR") ? (
                Object.values(
                  form.steps.abilitiesSelection.value.abilities
                ).map((ability: number, index: number) => (
                  <div key={index}>
                    <span>{ability}</span>
                  </div>
                ))
              ) : (
                <>
                  <div key={"STR"}>
                    <span>{getValues("STR")}</span>
                  </div>
                  <div key={"DEX"}>
                    <span>{getValues("DEX")}</span>
                  </div>
                  <div key={"CON"}>
                    <span>{getValues("CON")}</span>
                  </div>
                  <div key={"INT"}>
                    <span>{getValues("INT")}</span>
                  </div>
                  <div key={"WIS"}>
                    <span>{getValues("WIS")}</span>
                  </div>
                  <div key={"CHA"}>
                    <span>{getValues("CHA")}</span>
                  </div>
                </>
              )}
            </div>
            <div className={styles.create__attributes__card__total}>
              {abilityBonusPerAttribute.map(
                (ability: number, index: number) => (
                  <div key={index}>
                    <span>+{ability}</span>
                  </div>
                )
              )}
            </div>
            <div className={styles.create__attributes__card__bonus}>
              {Object.values(abilityScores).map(
                (ability: number, index: number) => (
                  <div key={index}>
                    <span>{ability + abilityBonusPerAttribute[index]}</span>
                  </div>
                )
              )}
            </div>
            <div className={styles.create__attributes__card__mod}>
              {Object.values(abilityScores).map((ab: number, index: number) => (
                <div key={index}>
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
        className={styles.character__creation__form}
        onSubmit={handleSubmit(saveData)}
      >
        <div>
          <div className={styles.character__creation__form__method}>
            <label htmlFor="method">Choose a method</label>
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
                setValue={setValue}
                register={register}
                usedScores={usedScores}
                setUsedScores={setUsedScores}
                setAbilityScores={setAbilityScores}
                abilityScores={abilityScores}
              />
            )}
            {watch("method") === "buy" && (
              <PointBuy
                setValue={setValue}
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
          <div onClick={previousTab}>
            <AnimatedButton variant="secondary" type="outline">
              Previous
            </AnimatedButton>
          </div>
          <AnimatedButton variant="secondary">Next</AnimatedButton>
        </div>
      </form>
      <div></div>
    </div>
  );
}
