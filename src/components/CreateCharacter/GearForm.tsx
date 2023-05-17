import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import styles from "@/styles/Create.module.scss";
import AnimatedButton from "../AnimatedButton";
import { ErrorField } from "./ClassSelectionForm";
import { useState } from "react";
import { characterStore } from "@/store";
import { Equipment, EquipmentFormInput } from "@/types";
import { ARMORS, WEAPONS, TOOLS } from "@/constants";

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
  const goldFromStore = characterStore((state) => state.gold);

  const availableArmors = items.results.filter((item: Equipment) =>
    ARMORS.includes(item.index)
  );

  const availableWeapons = items.results.filter((item: Equipment) =>
    WEAPONS.includes(item.index)
  );

  const availableTools = items.results.filter((item: Equipment) =>
    TOOLS.includes(item.index)
  );

  const availableMisc = items.results.filter(
    (item: Equipment) =>
      !(
        WEAPONS.includes(item.index) ||
        TOOLS.includes(item.index) ||
        ARMORS.includes(item.index)
      )
  );

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<EquipmentFormInput>({
    defaultValues: {},
    mode: "onSubmit",
  });

  const equipment = useFieldArray<EquipmentFormInput, "misc", "id">({
    control,
    name: "misc",
  }).fields;
  const weapons = useFieldArray<EquipmentFormInput, "weapons", "id">({
    control,
    name: "weapons",
  }).fields;
  const armors = useFieldArray<EquipmentFormInput, "armors", "id">({
    control,
    name: "armors",
  }).fields;
  const tools = useFieldArray<EquipmentFormInput, "tools", "id">({
    control,
    name: "tools",
  }).fields;

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
  console.log(items);
  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside></aside>
      <form
        className={styles.character__creation__form}
        onSubmit={handleSubmit(saveData)}
      >
        <div>
          <h3>Armors</h3>
          <select {...register(`armors.${0}` as const)}>
            <option>No armor</option>
            {availableArmors.map((item: Equipment) => (
              <option key={item.index} value={item.index}>
                {item.name}
              </option>
            ))}
          </select>
          <select {...register("shield")}>
            <option value="">No shield</option>
            <option value="shield">Shield</option>
          </select>
          {/* HACK: Loop 2 times to create 2 select fields */}
          <h3>Weapons</h3>
          {[...Array(4)].map(
            (i: number, index: number): JSX.Element => (
              <select {...register(`weapons.${index}` as const)} key={index}>
                <option>No weapon</option>
                {availableWeapons.map((item: Equipment) => (
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
              <select {...register(`tools.${index}` as const)} key={index}>
                <option>No tool</option>
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
                <option>No item</option>
                {availableMisc.map((item: Equipment) => (
                  <option key={item.index} value={item.index}>
                    {item.name}
                  </option>
                ))}
              </select>
            )
          )}
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
