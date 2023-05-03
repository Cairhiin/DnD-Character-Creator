import { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { characterStore } from "@/store";
import { SKILLS } from "@/constants";
import type { Skills } from "@/types";
import styles from "@/styles/CharacterForm.module.scss";

interface Props {
  nextTab: () => void;
  previousTab: () => void;
}

export default function SkillsForm({
  nextTab,
  previousTab,
}: Props): JSX.Element {
  const skills = characterStore((state) => state.skills);
  const setSkills = characterStore((state) => state.setSkills);

  // In case the user comes back to the page filter the chosen skills and set as initial state
  const skillsInStore: string[] = Object.keys(skills).filter(
    (skill: string) => (skills as any)[skill] === true
  );
  const [selectedSkills, setSelectedSkills] = useState<string[]>(skillsInStore);

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<Skills>({
    defaultValues: {
      ...skills,
    },
    mode: "onSubmit",
  });

  const saveData: SubmitHandler<Skills> = (skills): void => {
    if (selectedSkills.length >= 4) {
      setSkills(skills);
      nextTab();
    }
  };

  const handleChange = (skill: string) => {
    if (selectedSkills.indexOf(skill) < 0) {
      // Add the skill to the list of selected skills
      setSelectedSkills((state) => [...state, skill]);
    } else {
      // If the skill is already in the list remove it instead
      setSelectedSkills((state) => state.filter((s: string) => s !== skill));
    }
  };

  return (
    <form onSubmit={handleSubmit(saveData)}>
      <fieldset name="skills">
        {SKILLS.map((skill: string) => (
          <div key={skill}>
            <input
              type="checkbox"
              {...register(skill as any)}
              onChange={() => handleChange(skill)}
            />
            <label htmlFor={skill}>{skill}</label>
          </div>
        ))}
      </fieldset>
      <div className={styles.create__form__buttonRow}>
        <div onClick={previousTab}>Previous</div>
        <button>Next</button>
      </div>
    </form>
  );
}
