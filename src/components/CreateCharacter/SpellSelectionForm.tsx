import { FormStateContext } from "@/pages/create";
import { Skills } from "@/types";
import { produce } from "immer";
import { useState, useContext, useEffect } from "react";
import {
  SubmitHandler,
  useFieldArray,
  useForm,
  useFormState,
} from "react-hook-form";
import styles from "@/styles/Create.module.scss";
import AnimatedButton from "../AnimatedButton";

interface Props {
  nextTab: () => void;
  previousTab: () => void;
}

export default function SpellSelection({
  nextTab,
  previousTab,
}: Props): JSX.Element {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const { form, setForm } = useContext(FormStateContext);
  const [availableSpells, setAvailableSpells] = useState<any[]>([]);

  // index 0: cantrips, index 1: level 1, etc
  const [numberOfSpells, setNumberOfSpells] = useState<number[]>([]);
  const classFromContext = form.steps.classSelection.value;

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<any>({
    defaultValues: {},
    mode: "onSubmit",
  });

  const { isDirty } = useFormState({
    control,
  });

  const { fields, update } = useFieldArray({
    control,
    name: "spells",
  });

  useEffect(() => {
    setLoading(true);
    let ignore = false;
    if (!ignore) {
      fetch(
        `https://www.dnd5eapi.co${classFromContext.dndClass.url}/levels/1/spells`
      )
        .then((res) => res.json())
        .then((data) => {
          setAvailableSpells(data.results);
          setValue("spells", data.results);
          setLoading(false);
        });
    }

    return () => {
      ignore = true;
    };
  }, [classFromContext]);

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.spellSelection.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  const saveData: SubmitHandler<any> = (): void => {};
  const handleChange: (spell: any, index: number) => void = (spell, index) => {
    const selectedFields = fields.filter(({ value }: any): boolean => {
      return value === true;
    });

    if (selectedFields.length <= numberOfSpells[1] || spell.value === true) {
      spell.value = !spell.value;
      update(index, spell);
    }
  };

  useEffect(() => {
    console.log(fields);
  }, [fields]);

  useEffect(() => {
    setLoading(true);
    let ignore = false;
    if (!ignore) {
      fetch(`https://www.dnd5eapi.co${classFromContext.dndClass.url}/levels/1/`)
        .then((res) => res.json())
        .then((data) => {
          setNumberOfSpells([
            data.spellcasting.cantrips_known,
            data.spellcasting.spell_slots_level_1,
          ]);
          setLoading(false);
        });
    }

    return () => {
      ignore = true;
    };
  }, []);

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside></aside>
      <form
        className={styles.character__creation__form}
        onSubmit={handleSubmit(saveData)}
      >
        <div className={styles.character__creation__form__column}>
          {fields.map((field: any, index: number): JSX.Element => {
            return (
              <>
                <input
                  key={field.id}
                  id={field.name}
                  {...register(`spells.${index}.value` as const)}
                  type="checkbox"
                  onChange={() => handleChange(field, index)}
                  checked={field.value}
                />
                <label
                  htmlFor={field.name}
                  data-label={field.name}
                  className={styles.checkbox}
                ></label>
              </>
            );
          })}
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
