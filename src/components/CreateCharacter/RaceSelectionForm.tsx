import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { RACES } from "@/constants";
import { characterStore } from "@/store";
import { ErrorField } from "./ClassSelectionForm";
import { CreateCharacterCard } from "@/pages/create";
import { formatAttribute } from "@/utils";
import styles from "@/styles/Create.module.scss";

interface RaceFormInput {
  race: string;
}

interface Props {
  nextTab: () => void;
}

export default function RaceSelection({ nextTab }: Props) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const raceFromStore = characterStore((state) => state.race);
  const setRace = characterStore((state) => state.setRace);

  const handleClick = (race: string) => {
    setLoading(true);
    // Call the free SRD api to retrieve class data
    fetch(`https://www.dnd5eapi.co/api/races/${race.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        setRace(data);
        console.log(data);
        setLoading(false);
      });
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RaceFormInput>({
    defaultValues: { race: raceFromStore.name },
    mode: "onSubmit",
  });

  const saveData: SubmitHandler<RaceFormInput> = ({
    race,
  }: {
    race: string;
  }): void => {
    if (!race) {
      return setError("Please choose a race before continuing.");
    }

    if (!isLoading) {
      nextTab();
    }
  };

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside>
        {raceFromStore.name ? (
          <CreateCharacterCard header={raceFromStore.name}>
            <div>
              Ability Score Increase:{" "}
              <ul className={styles.create__layout__content}>
                {raceFromStore.ability_bonuses?.map(
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
              Size: <span>{raceFromStore.size}</span>
            </div>
            <div>
              Speed:{" "}
              <span>
                {raceFromStore.speed} ft/round ({raceFromStore.speed || 0 / 5}{" "}
                squares)
              </span>
              <div>
                Languages:{" "}
                <ul className={styles.create__layout__content}>
                  {raceFromStore.languages?.map(
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
                  {raceFromStore.traits?.map(
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
                  checked={race === raceFromStore.name}
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
          <button>Next</button>
        </div>
      </form>
      <div></div>
    </div>
  );
}
