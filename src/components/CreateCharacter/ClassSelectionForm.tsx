import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { CLASSES } from "@/constants";
import { characterStore } from "@/store";
import { CreateClassCard } from "@/pages/create";
import { formatAttribute } from "@/utils";
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
  const dndClassFromStore = characterStore((state) => state.dndClass);
  const setClass = characterStore((state) => state.setClass);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ClassFormInput>({
    defaultValues: { dndClass: dndClassFromStore.name },
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
    console.log(dndClassFromStore);
    if (!isLoading) {
      nextTab();
    }
  };

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside>
        {dndClassFromStore.name && (
          <CreateClassCard header={dndClassFromStore.name}>
            <p>
              Hitdie:{" "}
              <span className={styles.create__layout__content}>
                1d{dndClassFromStore.hit_die}
              </span>
            </p>
            <p>
              Armors:{" "}
              <ul className={styles.create__layout__content}>
                {/* Filter the proficiences to include only armors */}
                {dndClassFromStore.proficiencies &&
                  dndClassFromStore.proficiencies
                    .filter(
                      (item) =>
                        item.name.includes("Shield") ||
                        item.name.includes("Armor")
                    )
                    .map(
                      (item, i, arr): JSX.Element => (
                        <li key={item.name}>
                          {item.name}
                          {i < arr.length - 1 ? ", " : ""}
                        </li>
                      )
                    )}
              </ul>
            </p>
            <p>
              Weapons: {/* Filter the proficiences to include only weapons */}
              <ul className={styles.create__layout__content}>
                {dndClassFromStore.proficiencies &&
                  dndClassFromStore.proficiencies
                    .filter(
                      (item) =>
                        !item.name.includes("Shield") &&
                        !item.name.includes("Armor") &&
                        !item.name.includes("Saving Throw")
                    )
                    .map(
                      (item, i, arr): JSX.Element => (
                        <li key={item.index}>
                          {item.name}
                          {i < arr.length - 1 ? ", " : ""}
                        </li>
                      )
                    )}
              </ul>
            </p>
            <p>
              Saving Throws:{" "}
              <ul>
                {dndClassFromStore.saving_throws &&
                  dndClassFromStore.saving_throws.map(
                    (st, i, arr): JSX.Element => (
                      <li key={st.index}>
                        {formatAttribute(st.name)}
                        {i < arr.length - 1 ? ", " : ""}
                      </li>
                    )
                  )}
              </ul>
            </p>
            <p>
              Skills:{" "}
              <ul>
                {dndClassFromStore.proficiency_choices?.map((choice) => (
                  <li key={choice.desc}>{choice.desc}. </li>
                ))}
              </ul>
            </p>
          </CreateClassCard>
        )}
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
                  checked={name === dndClassFromStore.name}
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
