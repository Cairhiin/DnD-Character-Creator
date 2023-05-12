import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { characterStore } from "@/store";
import { CreateCharacterCard } from "@/pages/create";
import { cleanUpSkillDescription } from "@/utils";
import type { Skills } from "@/types";
import styles from "@/styles/Create.module.scss";

interface Props {
  nextTab: () => void;
  previousTab: () => void;
}

export default function SkillsForm({
  nextTab,
  previousTab,
}: Props): JSX.Element {
  const classFromStore = characterStore((state) => state.dndClass);
  const backgroundFromStore = characterStore((state) => state.background);
  const skillsFromStore = characterStore((state) => state.skills);
  const setSkills = characterStore((state) => state.setSkills);

  // In case the user comes back to the page filter the chosen skills and set as initial state
  const selectedSkillsFromStore: string[] = Object.keys(skillsFromStore).filter(
    (skill: string) => (skillsFromStore as any)[skill] === true
  );

  // Filter out the background skills from the available skill choices and turn it into an array of strings
  const availableSkills =
    classFromStore.proficiency_choices &&
    classFromStore.proficiency_choices[0].from.options
      .filter(
        ({ item }: any): boolean =>
          !backgroundFromStore.skill_proficiencies.includes(
            cleanUpSkillDescription(item.name)
          )
      )
      .map(({ item }: any): string => cleanUpSkillDescription(item.name));

  // Add the background skills to the already selected skills
  const [selectedSkills, setSelectedSkills] = useState<string[]>([
    ...selectedSkillsFromStore,
    ...backgroundFromStore.skill_proficiencies,
  ]);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Skills>({
    defaultValues: {
      ...skillsFromStore,
    },
    mode: "onSubmit",
  });

  const saveData: SubmitHandler<Skills> = (skills): void => {
    // Make certain one has chosen the right number of skills
    if (
      selectedSkills.length >=
      backgroundFromStore.skill_proficiencies.length +
        classFromStore.proficiency_choices![0].choose
    ) {
      setSkills(skills);
      nextTab();
    }
  };

  const handleChange = (skill: string): void => {
    // Check if the number of chosen skills is less than are allowed to be chosen
    if (
      // IMPORTANT: Subtract the number of free skills gained from background
      selectedSkills.indexOf(skill) < 0 &&
      selectedSkills.length - backgroundFromStore.skill_proficiencies.length <
        classFromStore.proficiency_choices![0].choose
    ) {
      setSelectedSkills((state) => [...state, skill]);
    } else {
      // If the skill is already in the list remove it
      setSelectedSkills((state) => state.filter((s: string) => s !== skill));
    }
  };

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside>
        {selectedSkills.length -
          backgroundFromStore.skill_proficiencies.length >
        0 ? (
          <CreateCharacterCard header="Choose your skill proficiencies">
            <div className={styles.skill__list}>
              <h3>Background Proficiencies</h3>
              {backgroundFromStore.skill_proficiencies.map(
                (skill: string): JSX.Element => (
                  <div key={skill}>{skill}</div>
                )
              )}
              <h3>Chosen proficiencies</h3>
              {selectedSkills
                .filter(
                  (skill: string): boolean =>
                    !backgroundFromStore.skill_proficiencies.includes(skill)
                )
                .map(
                  (skill: string): JSX.Element => (
                    <div key={skill}>{skill}</div>
                  )
                )}
            </div>
          </CreateCharacterCard>
        ) : (
          <CreateCharacterCard header="Choose your skill proficiencies">
            <div className={styles.skill__list}>
              <p>
                Your background gives you{" "}
                {backgroundFromStore.skill_proficiencies.map(
                  (skill: string, index: number): JSX.Element => {
                    if (
                      index <
                      backgroundFromStore.skill_proficiencies.length - 1
                    ) {
                      return (
                        <>
                          <span>{skill}</span> and{" "}
                        </>
                      );
                    }

                    return <span>{skill} </span>;
                  }
                )}{" "}
                as free proficiencies.
              </p>
              <p>
                You get to choose{" "}
                <span>{backgroundFromStore.skill_proficiencies.length}</span>{" "}
                skill proficiencies from the list.
              </p>
            </div>
          </CreateCharacterCard>
        )}
      </aside>
      <form
        className={styles.character__creation__form}
        onSubmit={handleSubmit(saveData)}
      >
        <div className={styles.character__creation__form__column}>
          {availableSkills &&
            availableSkills.map((skill: string) => (
              <div key={skill}>
                <input
                  id={skill}
                  checked={selectedSkills.includes(skill)}
                  type="checkbox"
                  {...register(skill as any)}
                  onClick={() => handleChange(skill)}
                />
                <label
                  htmlFor={skill}
                  className={styles.checkbox}
                  data-label={skill}
                ></label>
              </div>
            ))}
        </div>
        <div className={styles.create__form__buttonRow}>
          <div
            onClick={previousTab}
            className={styles.create__form__buttonRow__button}
          >
            Previous
          </div>
          <button>Next</button>
        </div>
      </form>
      <div></div>
    </div>
  );
}
