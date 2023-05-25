import { useContext, useEffect, useState } from "react";
import {
  useForm,
  SubmitHandler,
  useFormState,
  useFieldArray,
} from "react-hook-form";
import { produce } from "immer";
import AnimatedButton from "../AnimatedButton";
import { CreateCharacterCard, FormStateContext } from "@/pages/create";
import { cleanUpSkillDescription } from "@/utils";
import type { Skills } from "@/types";
import styles from "@/styles/Create.module.scss";

interface Props {
  nextTab: () => void;
  previousTab: () => void;
}

const formatSkillName: (name: string) => string = (name) => {
  let formattedName = name.toLowerCase();
  if (formattedName === "animal handling") formattedName = "animalHandling";
  if (formattedName === "sleight of hand") formattedName = "sleightOfHand";

  return formattedName;
};

export default function SkillsForm({
  nextTab,
  previousTab,
}: Props): JSX.Element {
  const [error, setError] = useState<string>();
  const { form, setForm } = useContext(FormStateContext);
  const classFromContext = form.steps.classSelection.value.dndClass;
  const backgroundFromContext = form.steps.backgroundSelection.value.background;
  const [selectedSkills, setSelectedSkills] = useState<Skills>({
    ...form.steps.skillsSelection.value,
  });

  // Filter out the background skills from the available skill choices
  const availableSkills =
    classFromContext.proficiency_choices &&
    classFromContext.proficiency_choices[0].from.options
      .filter(
        ({ item }: any): boolean =>
          !backgroundFromContext.skill_proficiencies.includes(
            cleanUpSkillDescription(item.name)
          )
      )
      .map(({ item }: any): any => {
        return (selectedSkills as any)[
          formatSkillName(cleanUpSkillDescription(item.name))
        ];
      });

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {
      ...form.steps.skillsSelection.value,
    },
    mode: "onSubmit",
  });

  const { isDirty } = useFormState({
    control,
  });

  const { fields, update } = useFieldArray({
    control,
    name: "skills",
  });

  useEffect(() => {
    setSelectedSkills(form.steps.skillsSelection.value);
  }, [form.steps.skillsSelection.value]);

  useEffect(() => {
    backgroundFromContext.skill_proficiencies.forEach((skill: string): void => {
      setSelectedSkills(
        produce((draft: any): void => {
          draft[formatSkillName(skill)].value = true;
        })
      );
    });
  }, [backgroundFromContext]);

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.skillsSelection.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  const saveData: SubmitHandler<Skills> = (): void => {
    // Make certain one has chosen the right number of skills
    if (
      Object.values(selectedSkills).filter(
        ({ value }: { value: boolean }): boolean => value === true
      ).length >=
      backgroundFromContext.skill_proficiencies.length +
        classFromContext.proficiency_choices![0].choose
    ) {
      setForm(
        produce((formState) => {
          formState.steps.skillsSelection = {
            value: {
              ...selectedSkills,
            },
            valid: true,
            dirty: false,
          };
        })
      );
      nextTab();
    } else {
      setError("Please choose more skills before continuing.");
    }
  };

  const handleChange = (skill: any, index: number): void => {
    // Check if the number of chosen skills is less than are allowed to be chosen
    update(index, skill);
    console.log(fields);

    /* if (
      (selectedSkills as any)[skill].value === false &&
      // IMPORTANT: Subtract the number of free skills gained from background
      Object.values(selectedSkills).filter(
        ({ value }: { value: boolean }): boolean => value === true
      ).length -
        backgroundFromContext.skill_proficiencies.length <
        classFromContext.proficiency_choices![0].choose
    ) {
      setSelectedSkills(
        produce((draft: any): void => {
          draft[skill].value = true;
        })
      );
    } else {
      // If the skill is already in the list remove it
      setSelectedSkills(
        produce((draft: any): void => {
          draft[skill].value = false;
        })
      );
    } */
  };

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside>
        {Object.values(selectedSkills).filter(
          ({ value }: { value: boolean }): boolean => value === true
        ).length +
          backgroundFromContext.skill_proficiencies.length >
        0 ? (
          <CreateCharacterCard header="Choose your skill proficiencies">
            <div className={styles.skill__list}>
              <p>
                Available choices:{" "}
                {classFromContext.proficiency_choices![0].choose -
                  Object.values(selectedSkills).filter(
                    ({ value }: { value: boolean }): boolean => value === true
                  ).length +
                  backgroundFromContext.skill_proficiencies.length}
              </p>
              <h3>Chosen proficiencies</h3>
              {Object.values(selectedSkills).map(
                ({
                  value,
                  name,
                }: {
                  value: boolean;
                  name: string;
                }): JSX.Element =>
                  value ? <div key={name}>{name}</div> : <></>
              )}
            </div>
          </CreateCharacterCard>
        ) : (
          <CreateCharacterCard header="Choose your skill proficiencies">
            <div className={styles.skill__list}>
              <p>
                Your background gives you{" "}
                {backgroundFromContext.skill_proficiencies.map(
                  (skill: string, index: number): JSX.Element => {
                    if (
                      index <
                      backgroundFromContext.skill_proficiencies.length - 1
                    ) {
                      return (
                        <span key={skill}>
                          <span>{skill}</span> and{" "}
                        </span>
                      );
                    }

                    return <span key={skill}>{skill} </span>;
                  }
                )}{" "}
                as free proficiencies.
              </p>
              <p>
                You get to choose{" "}
                <span>{classFromContext.proficiency_choices![0].choose}</span>{" "}
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
            availableSkills.map((skill: any, index: number) => (
              <div key={skill.name}>
                <input
                  id={skill.name}
                  /* checked={
                    (selectedSkills as any)[formatSkillName(name)].value ===
                    true
                  } */
                  type="checkbox"
                  {...register(`skills.${index}.value` as const)}
                  //{...register(formatSkillName(name) as any)}
                  onClick={() => handleChange(skill, index)}
                />
                <label
                  htmlFor={skill.name}
                  className={styles.checkbox}
                  data-label={skill.name}
                ></label>
              </div>
            ))}
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
