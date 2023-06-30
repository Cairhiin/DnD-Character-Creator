import { useContext, useEffect } from "react";
import { useForm, SubmitHandler, useFormState } from "react-hook-form";
import { produce } from "immer";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import AnimatedButton from "@/features/ui/AnimatedButton";
import Accordion from "@/features/ui/Accordion";
import { ALIGNMENT } from "@/constants";
import type { CharacterDescription } from "@/types";
import { CreateCharacterCard, FormStateContext } from "@/pages/create";
import PersonalFormElement from "./Description/PersonalFormElement";
import { ErrorField } from "./ClassSelectionForm";
import styles from "@/styles/Create.module.scss";

interface Props {
  nextTab: () => void;
  previousTab: () => void;
}

const schema = yup
  .object({
    details: yup.object({
      name: yup.string().required(),
      alignment: yup.string(),
      faith: yup.string(),
    }),
    physical: yup.object({
      hair: yup.string(),
      skin: yup.string(),
      eyes: yup.string(),
      weight: yup.string(),
      height: yup.string(),
      age: yup.string(),
      gender: yup.string(),
    }),
    personal: yup.object({
      traits: yup.string(),
      ideals: yup.string(),
      bonds: yup.string(),
      flaws: yup.string(),
    }),
    notes: yup.object({
      organizations: yup.string(),
      allies: yup.string(),
      enemies: yup.string(),
      other: yup.string(),
    }),
  })
  .required();

export default function CharacterDescription({ nextTab, previousTab }: Props) {
  const { form, setForm } = useContext(FormStateContext);
  const backgroundFromContext = form.steps.backgroundSelection.value.background;

  const {
    handleSubmit,
    register,
    setValue,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: { ...form.steps.descriptionForm.value },
    mode: "onSubmit",
  });

  const { isDirty } = useFormState({
    control,
  });

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.descriptionForm.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  const saveData: SubmitHandler<CharacterDescription> = (description): void => {
    setForm(
      produce((formState) => {
        formState.steps.descriptionForm = {
          value: {
            ...description,
          },
          valid: true,
          dirty: false,
        };
      })
    );

    nextTab();
  };

  const accordionData = [
    {
      id: "character_details",
      header: "Character Details",
      subheader: "Alignment | Faith",
      content: (
        <div className={styles.create__accordion__grid}>
          <label htmlFor="name">Name</label>
          <input type="text" {...register("details.name")} />
          <label htmlFor="alignment">Alignment</label>
          <select {...register("details.alignment")}>
            Alignment
            {ALIGNMENT.map((alignment: string) => (
              <option value={alignment} key={alignment}>
                {alignment}
              </option>
            ))}
          </select>
          <label htmlFor="faith">Faith</label>
          <input type="text" {...register("details.faith")} />
          {errors.physical?.gender?.message && (
            <ErrorField error={errors.physical?.gender?.message} />
          )}
        </div>
      ),
    },
    {
      id: "character_physical",
      header: "Physical Characteristics",
      subheader: "Hair | Skin | Eyes | Height | Weight | Age | Gender",
      content: (
        <div className={styles.create__accordion__grid}>
          <label htmlFor="hair">Hair</label>
          <input type="text" {...register("physical.hair")} />
          <label htmlFor="skin">Skin</label>
          <input type="text" {...register("physical.skin")} />
          <label htmlFor="eyes">Eyes</label>
          <input type="text" {...register("physical.eyes")} />
          <label htmlFor="height">Height</label>
          <input type="text" {...register("physical.height")} />
          <label htmlFor="weight">Weight</label>
          <input type="text" {...register("physical.weight")} />
          <label htmlFor="age">Age</label>
          <input type="text" {...register("physical.age")} />
          <label htmlFor="gender">Gender</label>
          <select {...register("physical.gender")}>
            <option value="female">Female</option>
            <option value="male">Male</option>
            <option value="nonbinary">Non-binary</option>
            <option value="other">Other</option>
          </select>
        </div>
      ),
    },
    {
      id: "character_personal",
      header: "Personal Characteristics",
      subheader: "Personality | Ideals | Bonds | Flaws",
      content: (
        <div>
          <PersonalFormElement
            type="personal.traits"
            label="Traits"
            data={backgroundFromContext.traits}
            register={register}
            setValue={setValue}
          />
          <PersonalFormElement
            type="personal.ideals"
            label="Ideals"
            data={backgroundFromContext.ideals}
            register={register}
            setValue={setValue}
          />
          <PersonalFormElement
            type="personal.bonds"
            label="Bonds"
            data={backgroundFromContext.bonds}
            register={register}
            setValue={setValue}
          />
          <PersonalFormElement
            type="personal.flaws"
            label="Flaws"
            data={backgroundFromContext.flaws}
            register={register}
            setValue={setValue}
          />
        </div>
      ),
    },
    {
      id: "character_notes",
      header: "Notes",
      subheader: "Organization | Allies | Enemies | Backstory | Other",
      content: (
        <div className={styles.create__accordion__grid}>
          <label htmlFor="organizations">Organizations</label>
          <input type="text" {...register("notes.organizations")} />
          <label htmlFor="allies">Allies</label>
          <input type="text" {...register("notes.allies")} />
          <label htmlFor="enemies">Enemies</label>
          <input type="text" {...register("notes.enemies")} />
          <label htmlFor="other">Other</label>
          <textarea {...register("notes.other")}></textarea>
          <label htmlFor="backstory">Backstory</label>
          <textarea
            {...register("notes.backstory")}
            className={styles.backstory}
          ></textarea>
        </div>
      ),
    },
  ];

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside>
        {form.steps.descriptionForm.value.details.name ? (
          <CreateCharacterCard
            header={form.steps.descriptionForm.value.details.name}
          >
            <div>
              <p>
                Choose or make up a name for your character (or generate one
                randomly!), determine his or her age, alignment, and physical
                appearance (such as height, weight, eye and hair color etc).{" "}
              </p>
              <p>
                It is helpful to think of a few unique personality traits as
                well, to help you play the character during the game. You can
                either choose from a predetermined set based on your background
                or make up your own!
              </p>
            </div>
          </CreateCharacterCard>
        ) : (
          <CreateCharacterCard header="Describe your character">
            <div className={styles.create__description__text}>
              <p>
                Choose or make up a name for your character (or generate one
                randomly!), determine his or her age, alignment, and physical
                appearance (such as height, weight, eye and hair color etc).{" "}
              </p>
              <p>
                It is helpful to think of a few unique personality traits as
                well, to help you play the character during the game. You can
                either choose from a predetermined set based on your background
                or make up your own!
              </p>
            </div>
          </CreateCharacterCard>
        )}
      </aside>
      <form
        className={`${styles.character__creation__form} ${styles.description}`}
        onSubmit={handleSubmit(saveData)}
      >
        <Accordion data={accordionData}></Accordion>
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
