import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import AnimatedButton from "../AnimatedButton";
import { characterStore } from "@/store";
import { Background } from "@/types";
import { CreateCharacterCard } from "@/pages/create";
import styles from "@/styles/Create.module.scss";

interface Props {
  nextTab: () => void;
  previousTab: () => void;
  backgrounds: Background[];
}

interface BackgroundFormInput {
  background: string;
}

export default function BackgroundSelectionForm({
  nextTab,
  previousTab,
  backgrounds,
}: Props): JSX.Element {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const backgroundFromStore = characterStore((state) => state.background);
  const setBackground = characterStore((state) => state.setBackground);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      background: "",
    },
    mode: "onSubmit",
  });

  const saveData: SubmitHandler<BackgroundFormInput> = ({
    background,
  }): void => {
    if (!background) {
      return setError("Please choose a class before continuing.");
    }

    if (!isLoading) {
      nextTab();
    }
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
        {backgroundFromStore.name ? (
          <CreateCharacterCard header={backgroundFromStore.name}>
            <div>
              Skill Proficiencies:{" "}
              {backgroundFromStore.skill_proficiencies.map(
                (prof: string, index: number, arr: string[]) =>
                  index < arr.length - 1 ? (
                    <span>{prof}, </span>
                  ) : (
                    <span>{prof}</span>
                  )
              )}
            </div>
            <div>
              Languages: <span>{backgroundFromStore.languages}</span>
            </div>
            <div>
              Tool Proficiencies:{" "}
              {backgroundFromStore.tool_proficiencies.map(
                (prof: string, index: number, arr: string[]) =>
                  index < arr.length - 1 ? (
                    <span>{prof}, </span>
                  ) : (
                    <span>{prof}</span>
                  )
              )}
            </div>
            <div>
              Feature: <span>{backgroundFromStore.feature}</span>
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
          <label htmlFor="background">Choose a background</label>
          <select
            {...register("background")}
            onChange={(e) => handleChange(e.target.value)}
          >
            {backgrounds.map(
              ({ id, name }: { id: string; name: string }): JSX.Element => (
                <option value={name}>{name}</option>
              )
            )}
          </select>
          <p>{errors.background?.message}</p>
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
