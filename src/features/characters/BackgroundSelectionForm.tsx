import { useContext, useEffect, useState } from "react";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import { produce } from "immer";
import AnimatedButton from "@/features/ui/AnimatedButton";
import type { Background } from "@/types";
import { CreateCharacterCard, FormStateContext } from "@/pages/create";
import { ErrorField } from "./ClassSelectionForm";
import styles from "@/styles/Create.module.scss";

interface Props {
  nextTab: () => void;
  previousTab: () => void;
  backgrounds: Background[];
}

interface BackgroundFormInput {
  backgroundName: string;
  background: Background;
}

export default function BackgroundSelectionForm({
  nextTab,
  previousTab,
  backgrounds,
}: Props): JSX.Element {
  const [error, setError] = useState<string>();
  const { form, setForm } = useContext(FormStateContext);
  const [background, setBackground] = useState<Background | null>(null);

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      backgroundName: form.steps.backgroundSelection.value.background.name,
      background: form.steps.backgroundSelection.value.background,
    },
    mode: "onSubmit",
  });

  const { isDirty } = useFormState({
    control,
  });

  useEffect(() => {
    setBackground(form.steps.backgroundSelection.value.background);
  }, [form.steps.backgroundSelection.value.background]);

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.backgroundSelection.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  const saveData: SubmitHandler<BackgroundFormInput> = (): void => {
    if (!background) {
      return setError("Please choose a background before continuing.");
    }

    setForm(
      produce((formState) => {
        formState.steps.backgroundSelection = {
          value: {
            background: background,
          },
          valid: true,
          dirty: false,
        };
      })
    );

    nextTab();
  };

  const handleChange = (e: string): void => {
    const chosenBackground = backgrounds.find(
      ({ name }: { name: string }) => name === e
    );
    chosenBackground && setBackground(chosenBackground);
  };

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside>
        {background?.name ? (
          <CreateCharacterCard header={background.name}>
            <div>
              Skill Proficiencies:{" "}
              {background.skill_proficiencies.map(
                (prof: string, index: number, arr: string[]) =>
                  index < arr.length - 1 ? (
                    <span key={prof}>{prof}, </span>
                  ) : (
                    <span key={prof}>{prof}</span>
                  )
              )}
            </div>
            <div>
              Languages: <span>{background.languages}</span>
            </div>
            <div>
              Tool Proficiencies:{" "}
              {background.tool_proficiencies.map(
                (prof: string, index: number, arr: string[]) =>
                  index < arr.length - 1 ? (
                    <span key={prof}>{prof}, </span>
                  ) : (
                    <span key={prof}>{prof}</span>
                  )
              )}
            </div>
            <div>
              Feature: <span>{background.feature}</span>
            </div>
          </CreateCharacterCard>
        ) : (
          <CreateCharacterCard header="Choose your background">
            <div className={styles.create__description__text}>
              <p>
                Choosing a background provides you with important story cues
                about your character's identity.
              </p>
              <p>
                The most important question to ask about your background is what
                changed?
              </p>
              <p>
                Why did you stop doing whatever your background describes and
                start adventuring?
              </p>
            </div>
          </CreateCharacterCard>
        )}
      </aside>
      <form
        className={styles.character__creation__form}
        onSubmit={handleSubmit(saveData)}
      >
        <div className={styles.character__creation__form__method}>
          <label htmlFor="backgroundName">Choose a background</label>
          <select
            {...register("backgroundName")}
            onChange={(e) => handleChange(e.target.value)}
          >
            {backgrounds.map(
              ({ id, name }: { id: string; name: string }): JSX.Element => (
                <option value={name} key={id}>
                  {name}
                </option>
              )
            )}
          </select>
        </div>
        {errors.background?.message && (
          <ErrorField error={errors.background.message} />
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
      <div></div>
    </div>
  );
}
