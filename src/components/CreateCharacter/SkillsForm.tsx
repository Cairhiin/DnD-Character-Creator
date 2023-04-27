import { useForm, SubmitHandler } from "react-hook-form";
import { characterStore } from "@/store";
import { SKILLS } from "@/constants";
import { Skills } from "@/types";
import styles from "@/styles/CreateCharacter/CharacterForm.module.scss";

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

  // Save the form state to Zustand and go to next tab
  const saveData: SubmitHandler<Skills> = (skills): void => {
    nextTab();
  };

  return (
    <form onSubmit={handleSubmit(saveData)}>
      <fieldset>
        {SKILLS.map((skill: string) => (
          <div key={skill}>
            <input type="checkbox" {...register(skill as any)} />
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
