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
import { ErrorField } from "./ClassSelectionForm";

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

  const { fields: spells, update: updateSpells } = useFieldArray({
    control,
    name: "spells",
  });

  const { fields: cantrips, update: updateCantrips } = useFieldArray({
    control,
    name: "cantrips",
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
          setValue("spells", data.results);
          setLoading(false);
        });
    }

    return () => {
      ignore = true;
    };
  }, [classFromContext]);

  useEffect(() => {
    setLoading(true);
    let ignore = false;
    if (!ignore) {
      fetch(
        `https://www.dnd5eapi.co${classFromContext.dndClass.url}/levels/0/spells`
      )
        .then((res) => res.json())
        .then((data) => {
          setValue("cantrips", data.results);
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

  const saveData: SubmitHandler<any> = (): void => {
    const selectedSpells = spells.filter(
      ({ value }: any): boolean => value === true
    );

    const selectedCantrips = cantrips.filter(
      ({ value }: any): boolean => value === true
    );

    setError((err) => "");

    if (selectedSpells.length < numberOfSpells[1])
      setError(
        (err) =>
          `Please select ${
            numberOfSpells[1] - selectedSpells.length
          } more spells!`
      );

    if (selectedCantrips.length < numberOfSpells[0])
      setError(
        (err) =>
          `Please select ${
            numberOfSpells[0] - selectedCantrips.length
          } more cantrips!`
      );

    setForm(
      produce((formState) => {
        formState.steps.spellSelection = {
          value: {
            0: selectedCantrips,
            1: selectedSpells,
          },
          valid: true,
          dirty: false,
        };
      })
    );
  };

  const handleChange: (spell: any, index: number, type: string) => void = (
    spell,
    index,
    type
  ) => {
    if (type === "spells") {
      const selectedFields = spells.filter(
        ({ value }: any): boolean => value === true
      );

      if (selectedFields.length < numberOfSpells[1] || spell.value === true) {
        spell.value = !spell.value;
        updateSpells(index, spell);
      }
    } else {
      const selectedFields = cantrips.filter(
        ({ value }: any): boolean => value === true
      );

      if (selectedFields.length < numberOfSpells[0] || spell.value === true) {
        spell.value = !spell.value;
        updateCantrips(index, spell);
      }
    }
  };

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
          <h3>Choose {numberOfSpells[0]} cantrips</h3>
          {cantrips.map((field: any, index: number): JSX.Element => {
            return (
              <>
                <input
                  key={field.id}
                  id={field.name}
                  {...register(`cantrips.${index}.value` as const)}
                  type="checkbox"
                  onChange={() => handleChange(field, index, "cantrips")}
                  checked={field.value === undefined ? false : field.value}
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
        <div className={styles.character__creation__form__column}>
          <h3>Choose {numberOfSpells[0]} level 1 spells</h3>
          {spells.map((field: any, index: number): JSX.Element => {
            return (
              <>
                <input
                  key={field.id}
                  id={field.name}
                  {...register(`spells.${index}.value` as const)}
                  type="checkbox"
                  onChange={() => handleChange(field, index, "spells")}
                  checked={field.value === undefined ? false : field.value}
                />
                <label
                  htmlFor={field.name}
                  data-label={field.name}
                  className={styles.checkbox}
                ></label>
              </>
            );
          })}
          {error && <ErrorField error={error} />}
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
