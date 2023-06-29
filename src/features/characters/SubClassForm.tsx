import { useContext, useEffect, useState } from "react";
import { useForm, useFormState } from "react-hook-form";
import { CreateCharacterCard, FormStateContext } from "@/pages/create";
import { produce } from "immer";
import type { SubClass } from "@/types";
import styles from "@/styles/Create.module.scss";
import AnimatedButton from "../ui/AnimatedButton";
import { ErrorField } from "./ClassSelectionForm";
import { isEligbleForSubClass } from "@/utils";

interface SubClassFormInput {
  subClass: number;
}

interface Props {
  nextTab: () => void;
  previousTab: () => void;
}

export default function SubClassForm({
  nextTab,
  previousTab,
}: Props): JSX.Element {
  const { form, setForm } = useContext(FormStateContext);
  const { subclasses } = form.steps.classSelection.value.dndClass;
  const [error, setError] = useState<string>("");

  const isEligible: boolean = isEligbleForSubClass(
    1,
    form.steps.classSelection.value.dndClass.index
  );

  const {
    handleSubmit,
    register,
    setValue,
    watch,
    control,
    formState: { errors },
  } = useForm<SubClassFormInput>({
    defaultValues: { subClass: 0 },
    mode: "onSubmit",
  });

  const { isDirty } = useFormState({
    control,
  });

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.subClassSelection.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  const saveData: ({ subClass }: { subClass: number }) => void = ({
    subClass,
  }) => {
    if (!subClass) {
      return setError("Please choose a background before continuing.");
    }

    setForm(
      produce((formState) => {
        formState.steps.subClassSelection = {
          value: {
            subClass: subclasses && subclasses[subClass],
          },
          valid: true,
          dirty: false,
        };
      })
    );

    nextTab();
  };

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside>
        <CreateCharacterCard header="Choose your subclass">
          <div className={styles.create__description__text}>
            <p>
              A character's subclass represents a specialization and enables
              access to new special abilities at certain levels. This differs
              across classes.
            </p>
            {!isEligible && (
              <p>
                Your class is not eligible to choose a subclass at level 1, but
                you will get that choice at level 2 or level 3!
              </p>
            )}
          </div>
        </CreateCharacterCard>
      </aside>
      <form
        className={styles.character__creation__form}
        onSubmit={handleSubmit(saveData)}
      >
        {isEligible && (
          <div className={styles.character__creation__form__method}>
            <label htmlFor="subClass">Choose a subclass</label>
            <select {...register("subClass")}>
              {subclasses?.map(
                (
                  {
                    index,
                    name,
                  }: {
                    index: string;
                    name: string;
                  },
                  i: number
                ): JSX.Element => (
                  <option value={i} key={index}>
                    {name}
                  </option>
                )
              )}
            </select>
          </div>
        )}
        {errors.subClass?.message && (
          <ErrorField error={errors.subClass.message} />
        )}
        <div className={styles.create__form__buttonRow}>
          <AnimatedButton
            variant="secondary"
            outline="outline"
            onClick={previousTab}
          >
            Previous
          </AnimatedButton>
          <AnimatedButton variant="secondary" type="submit">
            Next
          </AnimatedButton>
        </div>
      </form>
    </div>
  );
}
