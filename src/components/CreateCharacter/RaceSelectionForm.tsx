import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { RACES } from "@/constants";
import { characterStore } from "@/store";
import styles from "@/styles/CreateCharacter/CharacterForm.module.scss";

interface RaceFormInput {
  race: string;
}

interface Props {
  nextTab: () => void;
}

export default function RaceSelection({ nextTab }: Props) {
  const race = characterStore((state) => state.race);
  const setRace = characterStore((state) => state.setRace);
  const [isLoading, setLoading] = useState(false);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<RaceFormInput>({
    defaultValues: { race: race.name },
    mode: "onSubmit",
  });

  // Save the form state to Zustand and go to next tab
  const saveData: SubmitHandler<RaceFormInput> = ({
    race,
  }: {
    race: string;
  }): void => {
    setLoading(true);
    // Call the free SRD api to retrieve class data
    fetch(`https://www.dnd5eapi.co/api/races/${race}`)
      .then((res) => res.json())
      .then((data) => {
        setRace(data);
        setLoading(false);
      });
    nextTab();
  };

  return (
    <div>
      <h2>Race</h2>
      <form
        className={styles.race__selection}
        onSubmit={handleSubmit(saveData)}
      >
        {
          <div className={styles.create__character__radio}>
            {RACES.map((race: string) => (
              <div key={race}>
                <input
                  type="radio"
                  id={race}
                  value={race}
                  {...register("race")}
                />
                <label htmlFor={race}>{race}</label>
              </div>
            ))}
          </div>
        }
        <div className={styles.create__form__buttonRow}>
          <button>Next</button>
        </div>
      </form>
    </div>
  );
}
