import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { characterStore } from "@/store";
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
  const skillsFromStore = characterStore((state) => state.skills);
  const setSkills = characterStore((state) => state.setSkills);

  // In case the user comes back to the page filter the chosen skills and set as initial state
  const selectedSkillsFromStore: string[] = Object.keys(skillsFromStore).filter(
    (skill: string) => (skillsFromStore as any)[skill] === true
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>(
    selectedSkillsFromStore
  );

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
    if (selectedSkills.length >= 4) {
      setSkills(skills);
      nextTab();
    }
  };

  const handleChange = (skill: string): void => {
    // Check if the amount of chosen skills is less than are allowed to be chosen
    if (
      selectedSkills.indexOf(skill) < 0 &&
      selectedSkills.length < classFromStore.proficiency_choices![0].choose
    ) {
      // Add the skill to the list of selected skills
      setSelectedSkills((state) => [...state, skill]);
    } else {
      // If the skill is already in the list remove it instead
      setSelectedSkills((state) => state.filter((s: string) => s !== skill));
    }
  };

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside>
        {selectedSkills.map((skill) => (
          <p key={skill}>{skill}</p>
        ))}
      </aside>
      <form
        className={styles.character__creation__form}
        onSubmit={handleSubmit(saveData)}
      >
        <div className={styles.character__creation__form__column}>
          {classFromStore.proficiency_choices &&
            classFromStore.proficiency_choices[0].from.options.map(
              ({ item }: any) => (
                <div key={item.index}>
                  <input
                    id={item.index}
                    checked={selectedSkills.includes(
                      cleanUpSkillDescription(item.name)
                    )}
                    type="checkbox"
                    {...register(cleanUpSkillDescription(item.name) as any)}
                    onClick={() =>
                      handleChange(cleanUpSkillDescription(item.name))
                    }
                  />
                  <label
                    htmlFor={item.index}
                    className={styles.checkbox}
                    data-label={cleanUpSkillDescription(item.name)}
                  ></label>
                </div>
              )
            )}
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
