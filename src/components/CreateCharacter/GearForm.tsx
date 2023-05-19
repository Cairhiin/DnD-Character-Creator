import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import styles from "@/styles/Create.module.scss";
import AnimatedButton from "../AnimatedButton";
import { ErrorField } from "./ClassSelectionForm";
import { ChangeEvent, MouseEventHandler, useEffect, useState } from "react";
import { characterStore } from "@/store";
import { Equipment, EquipmentFormInput, Item } from "@/types";
import { ARMORS, TOOLS } from "@/constants";
import { CreateCharacterCard } from "@/pages/create";

interface Props {
  nextTab: () => void;
  previousTab: () => void;
  items: { results: Equipment[] };
}

export default function GearForm({
  nextTab,
  previousTab,
  items,
}: Props): JSX.Element {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [simpleWeapons, setSimpleWeapons] = useState<any>([]);
  const [martialWeapons, setMartialWeapons] = useState<any>([]);
  const [martialMeleeWeapons, setMartialMeleeWeapons] = useState<any>([]);
  const goldFromStore = characterStore((state) => state.gold);
  const { starting_equipment, starting_equipment_options } = characterStore(
    (state) => state.dndClass
  );

  const onChange: (e: ChangeEvent) => Promise<void> = async (e) => {
    const target = e.target as HTMLSelectElement;
    try {
      const itemRes = await fetch(
        `http://www.dnd5eapi.co/api/equipment/${target.value}`
      );
      const item = await itemRes.json();
    } catch (err) {
      console.error(err);
    }
  };

  const {
    handleSubmit,
    register,
    control,
    setValue,
    formState: { errors },
  } = useForm<EquipmentFormInput>({
    defaultValues: {},
    mode: "onSubmit",
  });

  const { fields } = useFieldArray({
    control,
    name: "items",
  });

  useEffect(() => {
    setLoading(true);
    try {
      fetch("http://www.dnd5eapi.co/api/equipment-categories/simple-weapons")
        .then((res) => res.json())
        .then(({ equipment }) => {
          setSimpleWeapons(equipment);
        });
    } catch (err: any) {
      console.error(err);
      setError("API not responding: unable to load simple weapons.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      fetch(
        "http://www.dnd5eapi.co/api/equipment-categories/martial-melee-weapons"
      )
        .then((res) => res.json())
        .then(({ equipment }) => {
          setMartialMeleeWeapons(equipment);
        });
    } catch (err: any) {
      console.error(err);
      setError("API not responding: unable to load martial melee weapons.");
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    setLoading(true);
    try {
      fetch("http://www.dnd5eapi.co/api/equipment-categories/martial-weapons")
        .then((res) => res.json())
        .then(({ equipment }) => {
          setMartialWeapons(equipment);
        });
    } catch (err) {
      console.error(err);
      setError("API not responding: unable to load martial weapons.");
    }
    setLoading(false);
  }, []);

  const saveData: SubmitHandler<EquipmentFormInput> = ({ items }): void => {
    console.log(items);
    if (!isLoading) {
      nextTab();
    }
  };

  // NOTES: Needs implementing
  const addItem: (
    items: { item: Item; amount: number }[],
    index: number
  ) => void = (items, index) => {
    console.log(index, items);
    //setValue(`items.${index}`, item);
  };

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside>
        <CreateCharacterCard header="Starting Equipment">
          <div>
            <p>
              Gear:{" "}
              {starting_equipment &&
                starting_equipment.map((item, index, arr) => (
                  <span key={item.equipment.index}>
                    {index < arr.length - 1
                      ? `${item.equipment.name}, `
                      : item.equipment.name}
                  </span>
                ))}
            </p>
            <p>
              Gold: <span>10</span>
            </p>
          </div>
        </CreateCharacterCard>
      </aside>
      <form
        className={styles.character__creation__form}
        onSubmit={handleSubmit(saveData)}
      >
        <div>
          <h3>Choose starting gear</h3>
          <div className={styles.character__creation__form__column}>
            {starting_equipment_options?.map(
              (option, index): JSX.Element => (
                <div key={index}>
                  <input
                    type="hidden"
                    {...register(`items.${index}` as const)}
                  ></input>
                  <div>{option.desc}</div>
                  <div className={styles.character__creation__form__flex}>
                    {option.from.options &&
                      option.from.options.map(
                        (option: any, optionNumber: number): JSX.Element => {
                          /* If the option type is a counted reference we can simply add a button
                        and pass the item, otherwise we will have to give the user a dropdown */
                          if (option.option_type === "counted_reference") {
                            return (
                              <div
                                tabIndex={1234} // necessary to make the div focusable
                                key={option.of.index}
                                className={styles.create__form__special__button}
                                onClick={() =>
                                  addItem(
                                    [{ item: option.of as Item, amount: 1 }],
                                    index
                                  )
                                }
                              >
                                {String.fromCharCode(65 + optionNumber)}
                              </div>
                            );
                          } else if (option.option_type === "multiple") {
                            const items: { item: Item; amount: number }[] =
                              option.items.map((item: any): any => {
                                if (item.option_type === "counted_reference")
                                  return { item: item.of, amount: item.count };
                                return {
                                  item: item.choice.from.equipment_category,
                                  amount: item.choice.choose,
                                };
                              });

                            return (
                              <div
                                tabIndex={1234} // necessary to make the div focusable
                                key={`${option.desc}`}
                                onClick={() => addItem(items, index)}
                              >
                                {String.fromCharCode(65 + optionNumber)}
                              </div>
                            );
                          } else {
                            /* HACK: Add the number of martial weapons or simple weapons based on the amount
                            the player gets to choose. Opted for this instead of changing the amount as that indicates
                            mostly the number of a specific simpleWeapons, not a weapon choice. */
                            const items: { item: Item; amount: number }[] = [
                              ...Array(option.choice.choose),
                            ].map((i: number, count: number): any => {
                              return {
                                item: option.choice.from.equipment_category,
                                amount: 1,
                              };
                            });

                            return (
                              <div
                                key={`${option.desc}${index}`}
                                onClick={() => addItem(items, index)}
                              >
                                {String.fromCharCode(65 + optionNumber)}
                              </div>
                            );
                          }
                        }
                      )}
                  </div>
                </div>
              )
            )}
          </div>
          <div></div>
        </div>
        {
          <div className={styles.character__creation__form__column}>
            {error && <ErrorField error={error} />}
          </div>
        }
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
