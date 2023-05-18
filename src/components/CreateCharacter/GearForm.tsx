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
  const goldFromStore = characterStore((state) => state.gold);
  const [gearChoices, setGearChoices] = useState<Item[]>([]);
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
    formState: { errors },
  } = useForm<EquipmentFormInput>({
    defaultValues: {},
    mode: "onSubmit",
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

  const saveData: SubmitHandler<EquipmentFormInput> = ({
    armors,
    weapons,
    tools,
    gold,
    treasure,
    misc,
  }): void => {
    if (!isLoading) {
      nextTab();
    }
  };

  // NOTES: Needs implementing
  const addItem: () => void = () => {
    console.log("Add Item");
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
        <div>
          <h3>Choose starting gear</h3>
          <div>
            {starting_equipment_options?.map(
              (option, index, arr): JSX.Element => (
                <div key={index}>
                  {option.desc}
                  {option.from.options &&
                    option.from.options.map(
                      (option: any, index: number): JSX.Element => {
                        if (option.option_type === "counted_reference") {
                          return (
                            <div
                              className={styles.create__form__special__button}
                              onClick={() => addItem()}
                            >
                              {option.of.name}
                            </div>
                          );
                        } else {
                          return <div>{option.option_type}</div>;
                        }
                      }
                    )}
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
