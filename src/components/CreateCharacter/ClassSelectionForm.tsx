import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CLASSES } from "@/constants";
import { characterStore } from "@/store";
import styles from "@/styles/CreateCharacter/CharacterForm.module.scss";

interface ClassFormInput {
  dndClass: string;
}

interface Props {
  nextTab: () => void;
  previousTab: () => void;
}

export default function ClassSelection({ nextTab, previousTab }: Props) {
  const [isLoading, setLoading] = useState(false);
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

  // Save the form state to Zustand and go to next tab
  const saveData: SubmitHandler<ClassFormInput> = ({ dndClass }): void => {
    setLoading(true);
    // Call the free SRD api to retrieve class data
    fetch(`https://www.dnd5eapi.co/api/classes/${dndClass}`)
      .then((res) => res.json())
      .then((data) => {
        setClass(data);
        setLoading(false);
      });
    nextTab();
  };

  return (
    <div>
      <h2>Class</h2>
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
                  {...register("dndClass")}
                />
                <label htmlFor={id}>{name}</label>
              </div>
            ))}
          </div>
        }
        <div className={styles.create__form__buttonRow}>
          <div onClick={previousTab}>Previous</div>
          <button>Next</button>
        </div>
      </form>
    </div>
  );
}
