import { MouseEventHandler, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { characterStore } from "@/store";
import { ALIGNMENT } from "@/constants";
import type { Background, CharacterDescription } from "@/types";
import { CreateCharacterCard } from "@/pages/create";
import PersonalFormElement from "@/components/CreateCharacter/Description/PersonalFormElement";
import styles from "@/styles/Create.module.scss";

interface Props {
  nextTab: () => void;
  previousTab: () => void;
}

const schema = yup
  .object({
    details: yup.object({
      name: yup.string().required(),
      alignment: yup.string().required(),
      faith: yup.string(),
    }),
    physical: yup.object({
      hair: yup.string().required(),
      skin: yup.string().required(),
      eyes: yup.string().required(),
      weight: yup.number().required(),
      height: yup.number().required(),
      age: yup.number().required(),
      gender: yup.string().required(),
    }),
    personal: yup.object({
      traits: yup.string().required(),
      ideals: yup.string().required(),
      bonds: yup.string().required(),
      flaws: yup.string().required(),
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
  const descriptionFromStore = characterStore((state) => state.description);
  const backgroundFromStore = characterStore((state) => state.background);
  const setDescription = characterStore((state) => state.setDescription);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      ...descriptionFromStore,
    },
    mode: "onSubmit",
  });

  const saveData: SubmitHandler<CharacterDescription> = (description): void => {
    setDescription(description);
    nextTab();
  };

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside>
        {descriptionFromStore.details.name ? (
          <CreateCharacterCard header={descriptionFromStore.details.name}>
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
        className={styles.character__creation__form}
        onSubmit={handleSubmit(saveData)}
      >
        <div
          onClick={() => setActiveIndex(1)}
          className={styles.character__creation__form__accordion}
        >
          <h3>Character Details</h3>
          <p>Alignment | Faith</p>
          {activeIndex === 1 && (
            <div>
              <label htmlFor="alignment">Alignment</label>
              <select {...register("details.alignment")}>
                Alignment
                {ALIGNMENT.map((alignment: string) => (
                  <option value={alignment}>{alignment}</option>
                ))}
              </select>
              <p>{errors.details?.alignment?.message}</p>
              <label htmlFor="faith">Faith</label>
              <input type="text" {...register("details.faith")} />
              <p>{errors.details?.faith?.message}</p>
            </div>
          )}
        </div>
        <div
          onClick={() => setActiveIndex(2)}
          className={styles.character__creation__form__accordion}
        >
          <h3>Physical Characteristics</h3>
          <p>Hair | Skin | Eyes | Height | Weight | Age | Gender</p>
          {activeIndex === 2 && (
            <div>
              <label htmlFor="hair">Hair</label>
              <input type="text" {...register("physical.hair")} />
              <p>{errors.physical?.hair?.message}</p>
              <label htmlFor="skin">Skin</label>
              <input type="text" {...register("physical.skin")} />
              <p>{errors.physical?.skin?.message}</p>
              <label htmlFor="eyes">Eyes</label>
              <input type="text" {...register("physical.eyes")} />
              <p>{errors.physical?.eyes?.message}</p>
              <label htmlFor="height">Height</label>
              <input type="text" {...register("physical.height")} />
              <p>{errors.physical?.height?.message}</p>
              <label htmlFor="weight">Weight</label>
              <input type="text" {...register("physical.weight")} />
              <p>{errors.physical?.weight?.message}</p>
              <label htmlFor="age">Age</label>
              <input type="text" {...register("physical.age")} />
              <p>{errors.physical?.age?.message}</p>
              <label htmlFor="gender">Gender</label>
              <select {...register("physical.gender")}>
                <option value="female">Female</option>
                <option value="male">Male</option>
                <option value="nonbinary">Non-binariy</option>
                <option value="other">Other</option>
              </select>
              <p>{errors.physical?.gender?.message}</p>
            </div>
          )}
        </div>
        <div
          onClick={() => setActiveIndex(3)}
          className={styles.character__creation__form__accordion}
        >
          <h3>Personal Characteristics</h3>
          <p>Personality | Ideals | Bonds | Flaws</p>
          {activeIndex === 3 && (
            <div>
              <PersonalFormElement
                type="personal.traits"
                label="Traits"
                data={backgroundFromStore.traits}
                register={register}
                setValue={setValue}
                errors={errors}
              />
              <PersonalFormElement
                type="personal.ideals"
                label="Ideals"
                data={backgroundFromStore.ideals}
                register={register}
                setValue={setValue}
                errors={errors}
              />
              <PersonalFormElement
                type="personal.bonds"
                label="Bonds"
                data={backgroundFromStore.bonds}
                register={register}
                setValue={setValue}
                errors={errors}
              />
              <PersonalFormElement
                type="personal.flaws"
                label="Flaws"
                data={backgroundFromStore.flaws}
                register={register}
                setValue={setValue}
                errors={errors}
              />
            </div>
          )}
        </div>
        <div
          onClick={() => setActiveIndex(4)}
          className={styles.character__creation__form__accordion}
        >
          <h3>Notes</h3>
          <p>Organization | Allies | Enemies | Backstory | Other</p>
          {activeIndex === 4 && (
            <div>
              <label htmlFor="organizations">Organizations</label>
              <input type="text" {...register("notes.organizations")} />
              <p>{errors.notes?.organizations?.message}</p>
              <label htmlFor="allies">Allies</label>
              <input type="text" {...register("notes.allies")} />
              <p>{errors.notes?.allies?.message}</p>
              <label htmlFor="enemies">Enemies</label>
              <input type="text" {...register("notes.enemies")} />
              <p>{errors.notes?.enemies?.message}</p>
              <label htmlFor="backstory">Backstory</label>
              <textarea {...register("notes.backstory")}></textarea>
              <p>{errors.notes?.backstory?.message}</p>
              <label htmlFor="other">Other</label>
              <textarea {...register("notes.other")}></textarea>
              <p>{errors.notes?.other?.message}</p>
            </div>
          )}
        </div>
        <div className={styles.create__form__buttonRow}>
          <div onClick={previousTab}>Previous</div>
          <button>Next</button>
        </div>
      </form>
      <div></div>
    </div>
  );
}
