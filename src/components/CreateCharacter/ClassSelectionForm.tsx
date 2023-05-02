import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CLASSES } from "@/constants";
import { characterStore } from "@/store";
import { ApiClass } from "@/types";
import styles from "@/styles/CharacterForm.module.scss";

interface ClassFormInput {
  dndClass: string;
}

interface Props {
  nextTab: () => void;
  previousTab: () => void;
}

export const ErrorField = ({ error }: { error: string }) => (
  <div className="error">{error}</div>
);

export default function ClassSelection({ nextTab, previousTab }: Props) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const dndClass = characterStore((state) => state.dndClass);
  const setClass = characterStore((state) => state.setClass);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ClassFormInput>({
    defaultValues: { dndClass: dndClass.name },
    mode: "onSubmit",
  });

  const handleClick = (dndClass: string) => {
    setLoading(true);
    // Call the free SRD api to retrieve class data
    fetch(`https://www.dnd5eapi.co/api/classes/${dndClass.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        setClass(data);
        setLoading(false);
      });
  };

  // Save the form state to Zustand and go to next tab
  const saveData: SubmitHandler<ClassFormInput> = ({ dndClass }): void => {
    if (!dndClass) {
      return setError("Please choose a class before continuing.");
    }

    if (!isLoading) {
      nextTab();
    }
  };

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside>
        <h2>{dndClass.name}</h2>
      </aside>
      <form
        className={styles.race__selection}
        onSubmit={handleSubmit(saveData)}
      >
        {
          <div className={styles.race__selection__radio}>
            {CLASSES.map(({ id, name }) => (
              <div key={id}>
                <input
                  type="radio"
                  id={id}
                  value={id}
                  checked={name === dndClass.name}
                  {...register("dndClass")}
                  onClick={() => handleClick(name)}
                />
                <label htmlFor={id}>{name}</label>
              </div>
            ))}
            {error && <ErrorField error={error} />}
          </div>
        }
        <div className={styles.create__form__buttonRow}>
          <div onClick={previousTab}>Previous</div>
          <button>Next</button>
        </div>
      </form>
      <div></div>
    </div>
  );
}
