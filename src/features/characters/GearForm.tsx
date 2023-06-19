import {
  useForm,
  SubmitHandler,
  useFieldArray,
  useFormState,
} from "react-hook-form";
import { produce } from "immer";
import { ErrorField } from "./ClassSelectionForm";
import { useCallback, useContext, useEffect, useState } from "react";
import type { EquipmentFormInput, Equipment, Item } from "@/types";
import { CreateCharacterCard, FormStateContext } from "@/pages/create";
import AnimatedButton from "../../components/AnimatedButton";
import styles from "@/styles/Create.module.scss";
import { useFetchWeapons } from "@/hooks/useFetchWeapons";

interface Props {
  nextTab: () => void;
  previousTab: () => void;
  items: Array<Item>;
}

interface WeaponSelectProps {
  weapons: Array<Item>;
  index: number;
  changeItem: (e: any, index: number, weapons: Array<Item>) => void;
}

const WeaponSelect = ({
  weapons,
  index,
  changeItem,
}: WeaponSelectProps): JSX.Element => (
  <div
    className={`${styles.character__creation__form__flex} ${styles.choose__weapon}`}
  >
    <p>Choose a Weapon from the list</p>
    <select onChange={(e) => changeItem(e, index, weapons)}>
      {weapons.map(
        (item: Item, i: number): JSX.Element => (
          <option key={item.index} value={i}>
            {item.name}
          </option>
        )
      )}
    </select>
  </div>
);

export default function GearForm({
  nextTab,
  previousTab,
  items,
}: Props): JSX.Element {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const [equipment, setEquipment] = useState<{
    shields: [];
    armors: [];
    weapons: [];
    misc: [];
  }>({ shields: [], armors: [], weapons: [], misc: [] });
  const {
    isLoading: simpleWeaponsLoading,
    error: simpleWeaponsError,
    weapons: simpleWeapons,
  } = useFetchWeapons("simple-weapons");
  const {
    isLoading: martialWeaponsLoading,
    error: martialWeaponsError,
    weapons: martialWeapons,
  } = useFetchWeapons("martial-weapons");
  const {
    isLoading: martialMeleeWeaponsLoading,
    error: martialMeleeWeaponsError,
    weapons: martialMeleeWeapons,
  } = useFetchWeapons("martial-melee-weapons");
  const { form, setForm } = useContext(FormStateContext);
  const [buttonIsActive, setButtonIsActive] = useState<boolean[]>([
    true,
    true,
    true,
    true,
  ]);
  const { starting_equipment, starting_equipment_options } =
    form.steps.classSelection.value.dndClass;
  const equipmentFromContext = form.steps.equipmentSelection.value;

  // Remove the choices flagged as equipment_category as they only have 1 option and not really a choice
  const equipmentChoices = starting_equipment_options?.filter(
    ({ from }: any): any => from.option_set_type !== "equipment_category"
  );

  // If the user has already chosen equipment set all buttons to inactive - NOTE: implement reset button!!!
  if (equipmentFromContext.length && buttonIsActive[0] === true) {
    const activeButtons = buttonIsActive.map(
      (isActive: boolean): boolean => (isActive = false)
    );
    setButtonIsActive(activeButtons);
  }

  const fetchEquipmentData: (item: Item) => void = useCallback((item) => {
    setLoading(true);
    fetch(`https://www.dnd5eapi.co${item.url}`)
      .then((res) => res.json())
      .then((data) => {
        setEquipment(
          produce<any>((draftState: any) => {
            console.log(data);
            switch (data.armor_category) {
              case "Shield":
                draftState.shields.push(data);
              case "Light":
              case "Heavy":
              case "Medium":
                draftState.armors.push(data);
              case "Weapon":
                draftState.weapons.push(data);
              default:
                draftState.misc.push(data);
            }
          })
        );
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to retrieve equipment data from API");
      })
      .finally(() => setLoading(false));
  }, []);

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<EquipmentFormInput>({
    defaultValues: {
      items: form.steps.equipmentSelection.value,
    },
    mode: "onSubmit",
  });

  const { isDirty } = useFormState({
    control,
  });

  useEffect(() => {
    setForm(
      produce((form) => {
        form.steps.equipmentSelection.dirty = isDirty;
      })
    );
  }, [isDirty, setForm]);

  const { fields, append, update } = useFieldArray({
    control,
    name: "items",
  });

  const saveData: SubmitHandler<EquipmentFormInput> = ({ items }): void => {
    console.log(equipment);
    setForm(
      produce((formState) => {
        formState.steps.equipmentSelection = {
          value: items,
          valid: true,
          dirty: false,
        };
      })
    );
    nextTab();
  };

  const addItem: (items: Equipment[], index: number) => void = (
    items,
    index
  ) => {
    let buttons = buttonIsActive;
    buttons[index] = false;
    setButtonIsActive(buttons);
    items.forEach((item: Equipment): void => append(item));
  };

  const changeItem: (e: any, index: number, items: Item[]) => void = (
    e,
    index,
    items
  ) => {
    fetchEquipmentData(items[e.target.value]);
    update(index, { ...items[e.target.value], amount: 1 });
  };

  /* If there are available items already in store use those else use the current form values
  Only necessary to display the selected items in the starting equipment card */
  const selectedItems = equipmentFromContext.length
    ? equipmentFromContext
    : Object.values(fields);

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside>
        {!fields.length && !equipmentFromContext.length ? (
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
                  {starting_equipment.map(
                    (item: any, index: number, arr: any[]) => (
                      <span key={item.equipment.index}>
                        {index < arr.length - 1
                          ? `${item.equipment.name}, `
                          : item.equipment.name}
                      </span>
                    )
                  )}
                </div>
              )}
              <div>
                Gold: <span>10</span>
              </div>
              <div>
                {selectedItems.map(
                  (item: Equipment, index: number): JSX.Element => (
                    <div key={`${item.index}-${index}`}>
                      {item.index !== "martial-weapons" &&
                        item.index !== "martial-melee-weapons" &&
                        item.index !== "simple-weapons" &&
                        (item.amount > 1 ? (
                          <p>
                            {item.amount} {`${item.name}s`}
                          </p>
                        ) : (
                          <p key={item.index}>{item.name}</p>
                        ))}
                    </div>
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
                                        ...(option.of as Item),
                                        amount: option.count,
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
                            const items: Equipment[] = option.items.map(
                              (item: any): Equipment => {
                                if (item.option_type === "counted_reference")
                                  return {
                                    ...(item.of as Item),
                                    amount: item.count,
                                  };
                                return {
                                  ...(item.choice.from
                                    .equipment_category as Item),
                                  amount: item.choice.choose,
                                };
                              }
                            );

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
                            const items: Equipment[] = [
                              ...Array(option.choice.choose),
                            ].map((i: number): any => {
                              return {
                                ...(option.choice.from
                                  .equipment_category as Item),
                                amount: 1,
                              };
                            });

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
            if (field.index === "simple-weapons") {
              return (
                <WeaponSelect
                  key={`${field.index}-${index}`}
                  changeItem={changeItem}
                  weapons={simpleWeapons}
                  index={index}
                ></WeaponSelect>
              );
            }
            if (field.index === "martial-weapons") {
              return (
                <WeaponSelect
                  key={`${field.index}-${index}`}
                  changeItem={changeItem}
                  weapons={martialWeapons}
                  index={index}
                ></WeaponSelect>
              );
            }
            if (field.index === "martial-melee-weapons") {
              return (
                <WeaponSelect
                  key={`${field.index}-${index}`}
                  changeItem={changeItem}
                  weapons={martialMeleeWeapons}
                  index={index}
                ></WeaponSelect>
              );
            }
            return <div key={`${field.index}-${index}`}></div>;
          })}
        </div>
        <div className={styles.create__form__buttonRow}>
          <div onClick={previousTab}>
            <AnimatedButton variant="secondary" type="outline">
              Previous
            </AnimatedButton>
          </div>
          <AnimatedButton variant="secondary">Save Character</AnimatedButton>
        </div>
      </form>
      <div></div>
    </div>
  );
}
