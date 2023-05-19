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
                starting_equipment.map((item) => (
                  <span key={item.equipment.index}>
                    {item.equipment.name},{" "}
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
        <div className={styles.character__creation__form__column}>
          <h3>Choose starting gear</h3>
          <div>
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
                      option.from.options.map((option: any): JSX.Element => {
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
                              {option.of.name}
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
                              {items.map(({ item, amount }) => {
                                if (item.index === "martial-weapons") {
                                  /* HACK: Adding a number of select elements equal to the options given by the class
                                  but looks ugly */
                                  const itemJSX = [...Array(amount)].map(
                                    (i: number, index: number) => (
                                      <select key={index}>
                                        {martialWeapons.map(
                                          (weapon: Item): JSX.Element => (
                                            <option key={weapon.index}>
                                              {weapon.name}
                                            </option>
                                          )
                                        )}
                                      </select>
                                    )
                                  );
                                  return itemJSX;
                                } else {
                                  return <div>{item.name}</div>;
                                }
                              })}
                            </div>
                          );
                        } else {
                          let availableWeapons: Item[] = [];
                          /* Check if the weapons to choose from belong to the martial melee group (Barbarian)
                        if not show the simple weapon list - there are no other options */
                          option.choice.from.equipment_category.index ===
                          "martial-melee-weapons"
                            ? (availableWeapons = martialMeleeWeapons)
                            : (availableWeapons = simpleWeapons);
                          return (
                            <div key={`${option.desc}${index}`}>
                              {[...Array(option.choice.choose)].map(
                                (i: number, index: number) => (
                                  <select key={`${option.choice.desc}${index}`}>
                                    {availableWeapons.map(
                                      (weapon: Item): JSX.Element => (
                                        <option key={weapon.index}>
                                          {weapon.name}
                                        </option>
                                      )
                                    )}
                                  </select>
                                )
                              )}
                            </div>
                          );
                        }
                      })}
                  </div>
                </div>
              )
            )}
          </div>
          <div></div>
        </div>

        {/* <div>
          <h3>Armors</h3>
          <select {...register(`armors.${0}` as const)} onChange={onChange}>
            <option key="no-armor">No armor</option>
            {availableArmors.map((item: Equipment) => (
              <option key={item.index} value={item.index}>
                {item.name}
              </option>
            ))}
          </select>
          <select {...register("shield")} onChange={onChange}>
            <option value="" key="no-shield">
              No shield
            </option>
            <option value="shield">Shield</option>
          </select>
          
          <h3>Weapons</h3>
          {[...Array(4)].map(
            (i: number, index: number): JSX.Element => (
              <select
                {...register(`weapons.${index}` as const)}
                key={index}
                onChange={onChange}
              >
                <option key="no-weapon">No weapon</option>
                {!isLoading &&
                  simpleWeapons.map((item: Equipment) => (
                    <option key={item.index} value={item.index}>
                      {item.name}
                    </option>
                  ))}
              </select>
            )
          )}
          <h3>Tools</h3>
          {[...Array(2)].map(
            (i: number, index: number): JSX.Element => (
              <select
                {...register(`tools.${index}` as const)}
                key={index}
                onChange={onChange}
              >
                <option key="no-tool">No tool</option>
                {availableTools.map((item: Equipment) => (
                  <option key={item.index} value={item.index}>
                    {item.name}
                  </option>
                ))}
              </select>
            )
          )}
          <h3>Miscellaneous Items</h3>
          {[...Array(8)].map(
            (i: number, index: number): JSX.Element => (
              <select {...register(`misc.${index}` as const)} key={index}>
                <option key="no-item">No item</option>
                {availableMisc.map((item: Equipment) => (
                  <option key={item.index} value={item.index}>
                    {item.name}
                  </option>
                ))}
              </select>
            )
          )}
        </div> */}
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
