import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import { ErrorField } from "./ClassSelectionForm";
import { useEffect, useState } from "react";
import { characterStore } from "@/store";
import { EquipmentFormInput, Equipment } from "@/types";
import { CreateCharacterCard } from "@/pages/create";
import AnimatedButton from "../AnimatedButton";
import styles from "@/styles/Create.module.scss";

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
  const [buttonIsActive, setButtonIsActive] = useState<boolean[]>([
    true,
    true,
    true,
    true,
  ]);
  const [simpleWeapons, setSimpleWeapons] = useState<any>([]);
  const [martialWeapons, setMartialWeapons] = useState<any>([]);
  const [martialMeleeWeapons, setMartialMeleeWeapons] = useState<any>([]);
  const { starting_equipment, starting_equipment_options } = characterStore(
    (state) => state.dndClass
  );
  const equipmentFromStore = characterStore((state) => state.equipment);
  const setEquipment = characterStore((state) => state.setEquipment);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<EquipmentFormInput>({
    defaultValues: {
      items: equipmentFromStore,
    },
    mode: "onSubmit",
  });

  const { fields, append, update } = useFieldArray({
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
    setEquipment(items);
    if (!isLoading) {
      nextTab();
    }
  };

  const addItem: (
    items: { item: any; amount: number }[],
    index: number
  ) => void = (items, index) => {
    let buttons = buttonIsActive;
    buttons[index] = false;
    setButtonIsActive(buttons);
    items.map(({ item }: any, index: number): void => append(item));
  };

  const changeItem: (e: any, index: number, items: Equipment[]) => void = (
    e,
    index,
    items
  ) => {
    update(index, items[e.target.value]);
  };

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside>
        {!fields.length ? (
          <CreateCharacterCard header="Starting Equipment">
            <div className={styles.create__description__text}>
              <p>
                Choose one of the available item options for each line. If you
                choose a martial, martial melee, or simple weapon you get to
                select these after you have clicked the corresponding option
                button.
              </p>
            </div>
          </CreateCharacterCard>
        ) : (
          <CreateCharacterCard header="Starting Equipment">
            <div className={styles.create__description__text}>
              {starting_equipment && starting_equipment?.length > 0 && (
                <div>
                  Starting Gear:{" "}
                  {starting_equipment.map((item, index, arr) => (
                    <span key={item.equipment.index}>
                      {index < arr.length - 1
                        ? `${item.equipment.name}, `
                        : item.equipment.name}
                    </span>
                  ))}
                </div>
              )}
              <div>
                Gold: <span>10</span>
              </div>
              <div>
                {Object.values(fields).map(
                  (item: Equipment): JSX.Element => (
                    <>
                      {item.index !== "martial-weapons" &&
                        item.index !== "martial-melee-weapons" &&
                        item.index !== "simple-weapons" && <p>{item.name}</p>}
                    </>
                  )
                )}
              </div>
            </div>
          </CreateCharacterCard>
        )}
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
                              <AnimatedButton
                                variant="secondary"
                                type="outline"
                                key={option.of.index}
                                onClick={() =>
                                  addItem(
                                    [
                                      {
                                        item: option.of as Equipment,
                                        amount: 1,
                                      },
                                    ],
                                    index
                                  )
                                }
                                disabled={!buttonIsActive[index]}
                              >
                                {/* Display an A, B or C depending on the number of options */}
                                {String.fromCharCode(65 + optionNumber)}
                              </AnimatedButton>
                            );
                          } else if (option.option_type === "multiple") {
                            const items: { item: Equipment; amount: number }[] =
                              option.items.map((item: any): any => {
                                if (item.option_type === "counted_reference")
                                  return { item: item.of, amount: item.count };
                                return {
                                  item: item.choice.from.equipment_category,
                                  amount: item.choice.choose,
                                };
                              });

                            return (
                              <AnimatedButton
                                variant="secondary"
                                type="outline"
                                disabled={!buttonIsActive[index]}
                                key={`${option.desc}`}
                                onClick={() => addItem(items, index)}
                              >
                                {String.fromCharCode(65 + optionNumber)}
                              </AnimatedButton>
                            );
                          } else {
                            /* HACK: Add the number of martial weapons or simple weapons based on the amount
                            the player gets to choose. Opted for this instead of changing the amount as that indicates
                            mostly the number of a specific simpleWeapons, not a weapon choice. */
                            const items: { item: Equipment; amount: number }[] =
                              [...Array(option.choice.choose)].map(
                                (i: number, count: number): any => {
                                  return {
                                    item: option.choice.from.equipment_category,
                                    amount: 1,
                                  };
                                }
                              );

                            return (
                              <AnimatedButton
                                variant="secondary"
                                type="outline"
                                disabled={!buttonIsActive[index]}
                                key={`${option.desc}${index}`}
                                onClick={() => addItem(items, index)}
                              >
                                {String.fromCharCode(65 + optionNumber)}
                              </AnimatedButton>
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
        <div className={styles.character__creation__form__column}>
          {fields.map((field: any, index: number): JSX.Element => {
            if (field.index === "martial-weapons") {
              return (
                <div
                  className={`${styles.character__creation__form__flex} ${styles.choose__weapon}`}
                >
                  <p>Choose a Martial Weapon </p>
                  <select
                    onChange={(e) => changeItem(e, index, martialWeapons)}
                  >
                    {martialWeapons.map(
                      (item: Equipment, i: number): JSX.Element => (
                        <option key={i} value={i}>
                          {item.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
              );
            }
            if (field.index === "martial-melee-weapons") {
              return (
                <div className={styles.character__creation__form__flex}>
                  <p>Choose a Martial Melee Weapon </p>
                  <select
                    onChange={(e) => changeItem(e, index, martialMeleeWeapons)}
                  >
                    {martialMeleeWeapons.map(
                      (item: Equipment, i: number): JSX.Element => (
                        <option key={i} value={i}>
                          {item.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
              );
            }
            if (field.index === "simple-weapons") {
              return (
                <div className={styles.character__creation__form__flex}>
                  <p>Choose a Simple Weapon </p>
                  <select onChange={(e) => changeItem(e, index, simpleWeapons)}>
                    {simpleWeapons.map(
                      (item: Equipment, i: number): JSX.Element => (
                        <option key={i} value={i}>
                          {item.name}
                        </option>
                      )
                    )}
                  </select>
                </div>
              );
            }
            return <></>;
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
