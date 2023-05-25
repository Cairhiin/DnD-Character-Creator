import { FormStateContext } from "@/pages/create";
import { Skills } from "@/types";
import { produce } from "immer";
import { useState, useContext, useEffect } from "react";
import { SubmitHandler, useForm, useFormState } from "react-hook-form";
import styles from "@/styles/Create.module.scss";
import AnimatedButton from "../AnimatedButton";

interface Props {
  nextTab: () => void;
  previousTab: () => void;
}

export default function SpellSelection({
  nextTab,
  previousTab,
}: Props): JSX.Element {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { form, setForm } = useContext(FormStateContext);
  const [availableSpells, setAvailableSpells] = useState<any[]>([]);
  const classFromContext = form.steps.classSelection.value;

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      ...form.steps.spellSelection.value,
    },
    mode: "onSubmit",
  });

  const { isDirty } = useFormState({
    control,
  });

  useEffect(() => {
    setLoading(true);
    let ignore = false;
    if (!ignore) {
      fetch(
        `https://www.dnd5eapi.co${classFromContext.dndClass.url}/levels/1/spells`
      )
        .then((res) => res.json())
        .then((data) => {
          setAvailableSpells(data.results);
          setLoading(false);
        });
    }

    return () => {
      ignore = true;
    };
  }, [classFromContext]);

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.descriptionForm.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  const saveData: SubmitHandler<Skills> = (): void => {};

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside></aside>
      <form
        className={styles.character__creation__form}
        onSubmit={handleSubmit(saveData)}
      >
        <div className={styles.character__creation__form__column}>
          {availableSpells.map(
            ({ name, index }: { name: string; index: string }): JSX.Element => (
              <div>
                <input key={index} {...register(name)} type="checkbox" />
                <label
                  htmlFor={name}
                  data-label={name}
                  className={styles.checkbox}
                ></label>
              </div>
            )
          )}
        </div>
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
