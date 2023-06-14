import { CLASSES } from "@/constants";
import { CreateCharacterCard, FormStateContext } from "@/pages/create";
import { produce } from "immer";
import styles from "@/styles/Create.module.scss";
import type { ApiClass as DndClass } from "@/types";
import { formatAttribute } from "@/utils";
import { faWarning } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import AnimatedButton from "../../components/AnimatedButton";

interface ClassFormInput {
  dndClass: DndClass;
}

interface Props {
  nextTab: () => void;
  previousTab: () => void;
}

export const ErrorField = ({ error }: { error: string }) => (
  <div className={styles.error}>
    <FontAwesomeIcon icon={faWarning} /> {error}
  </div>
);

export default function ClassSelection({ nextTab, previousTab }: Props) {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { form, setForm } = useContext(FormStateContext);

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<ClassFormInput>({
    defaultValues: { dndClass: form.steps.classSelection.value.dndClass },
    mode: "onSubmit",
  });

  const { isDirty } = useFormState({
    control,
  });

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.classSelection.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  // Call the free SRD api to retrieve the rest of the class data
  useEffect(() => {
    setLoading(true);
    let ignore: boolean = false;
    if (!ignore) {
      fetch(
        `https://www.dnd5eapi.co/api/classes/${form.steps.classSelection.value.dndClass.index}`
      )
        .then((res) => res.json())
        .then((data) => {
          setValue("dndClass", data);
          setLoading(false);
        });
    }
    return () => {
      ignore = true;
    };
  }, [form.steps.classSelection.value.dndClass.name]);

  const handleClick = (dndClass: string) => {
    setLoading(true);
    // Call the free SRD api to retrieve class data
    fetch(`https://www.dnd5eapi.co/api/classes/${dndClass.toLowerCase()}`)
      .then((res) => res.json())
      .then((data) => {
        setValue("dndClass", data);
        setLoading(false);
      });
  };

  const saveData: SubmitHandler<ClassFormInput> = ({ dndClass }): void => {
    if (dndClass && !dndClass.name) {
      setError("Please choose a class before continuing.");
    } else {
      setForm(
        produce((formState) => {
          formState.steps.classSelection = {
            value: {
              dndClass: dndClass,
            },
            valid: true,
            dirty: false,
          };
        })
      );

      if (!isLoading) {
        nextTab();
      }
    }
  };

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside>
        {watch("dndClass").name ? (
          <CreateCharacterCard header={watch("dndClass").name}>
            <div>
              Hitdie:{" "}
              <span className={styles.create__layout__content}>
                1d{watch("dndClass").hit_die}
              </span>
            </div>
            <div>
              Armors:{" "}
              <ul className={styles.create__layout__content}>
                {/* Filter the proficiences to include only armors */}
                {watch("dndClass")
                  .proficiencies?.filter(
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
            </div>
            <div>
              Weapons: {/* Filter the proficiences to include only weapons */}
              <ul className={styles.create__layout__content}>
                {watch("dndClass")
                  .proficiencies?.filter(
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
            </div>
            <div>
              Saving Throws:{" "}
              <ul>
                {watch("dndClass").saving_throws?.map(
                  (st, i, arr): JSX.Element => (
                    <li key={st.index}>
                      {formatAttribute(st.name)}
                      {i < arr.length - 1 ? ", " : ""}
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              Skills:{" "}
              <ul>
                {watch("dndClass").proficiency_choices?.map((choice) => (
                  <li key={choice.desc}>{choice.desc}. </li>
                ))}
              </ul>
            </div>
          </CreateCharacterCard>
        ) : (
          <CreateCharacterCard header="Choose your class">
            <div className={styles.create__description__text}>
              <p>
                A character's class represents a profession, such as fighter or
                wizard. If this is a new character, he or she starts at 1st
                level in this chosen class.
              </p>
              <p>
                As the character gains experience points (XP) for defeating
                monsters, he goes up in level, granting him new powers and
                abilities.
              </p>
              <p>
                If your character is a spell caster that prepares spells (such
                as a wizard) you will need to determine the spells your
                character starts with.
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
            {CLASSES.map(({ id, name }) => (
              <div key={id}>
                <input
                  type="radio"
                  id={id}
                  value={id}
                  checked={name === watch("dndClass").name}
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
