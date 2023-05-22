import { RACES } from "@/constants";
import { produce } from "immer";
import { CreateCharacterCard } from "@/pages/create";
import { characterStore } from "@/store";
import styles from "@/styles/Create.module.scss";
import { formatAttribute } from "@/utils";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import AnimatedButton from "../AnimatedButton";
import { ErrorField } from "./ClassSelectionForm";
import { FormStateContext } from "@/pages/create";
import { Race } from "@/types";

interface RaceFormInput {
  race: Race;
}

interface Props {
  nextTab: () => void;
}

export default function RaceSelection({ nextTab }: Props) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { form, setForm } = useContext(FormStateContext);

  const handleClick = (race: string) => {
    setLoading(true);
    // Call the free SRD api to retrieve class data
    fetch(`https://www.dnd5eapi.co/api/races/${race.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        setValue("race", data);
        setLoading(false);
      });
  };

  const {
    handleSubmit,
    register,
    control,
    setValue,
    watch,
    formState: { errors },
  } = useForm<RaceFormInput>({
    defaultValues: { race: form.steps.raceSelection.value.race },
    mode: "onSubmit",
  });

  const { isDirty } = useFormState({
    control,
  });

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.raceSelection.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  const saveData: SubmitHandler<RaceFormInput> = ({
    race,
  }: {
    race: Race;
  }): void => {
    setForm(
      produce((formState) => {
        formState.steps.raceSelection = {
          value: {
            race: race,
          },
          valid: true,
          dirty: false,
        };
      })
    );

    if (!isLoading) {
      nextTab();
    }
  };

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside>
        {form.steps.raceSelection.value ? (
          <CreateCharacterCard header={watch("race").name}>
            <div>
              Ability Score Increase:{" "}
              <ul className={styles.create__layout__content}>
                {watch("race").ability_bonuses?.map(
                  (ability, i, arr): JSX.Element => (
                    <li key={ability.ability_score.name}>
                      {formatAttribute(ability.ability_score.name)} +
                      {ability.bonus}
                      {i < arr.length - 1 ? ", " : ""}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              Size: <span>{watch("race").size}</span>
            </div>
            <div>
              Speed:{" "}
              <span>
                {watch("race").speed} ft/round ({watch("race").speed || 0 / 5}{" "}
                squares)
              </span>
              <div>
                Languages:{" "}
                <ul className={styles.create__layout__content}>
                  {watch("race").languages?.map(
                    (language, i, arr): JSX.Element => (
                      <li key={language.index}>
                        {language.name}
                        {i < arr.length - 1 ? ", " : ""}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                Traits:{" "}
                <ul className={styles.create__layout__content}>
                  {watch("race").traits?.map(
                    (trait, i, arr): JSX.Element => (
                      <li key={trait.index}>
                        {trait.name}
                        {i < arr.length - 1 ? ", " : ""}
                      </li>
                    )
                  )}
                </ul>
              </div>
            </div>
          </CreateCharacterCard>
        ) : (
          <CreateCharacterCard header="Choose your race">
            <div className={styles.create__description__text}>
              <p>
                Each race increases one or more of a character's ability scores
                and may offer various other benefits in the form of racial
                traits. Size and speed may also differ.
              </p>
            </div>
          </CreateCharacterCard>
        )}
      </aside>
      <form
        className={styles.character__creation__form}
        onSubmit={handleSubmit(saveData)}
      >
        {
          <div className={styles.character__creation__form__column}>
            {RACES.map((race: string) => (
              <div key={race}>
                <input
                  type="radio"
                  id={race}
                  value={race}
                  checked={race === watch("race").name}
                  {...register("race")}
                  onClick={() => handleClick(race)}
                />
                <label htmlFor={race}>{race}</label>
              </div>
            ))}
            {error && <ErrorField error={error} />}
          </div>
        }
        <div className={styles.create__form__buttonRow}>
          <AnimatedButton variant="secondary">Next</AnimatedButton>
        </div>
      </form>
      <div></div>
    </div>
  );
}
