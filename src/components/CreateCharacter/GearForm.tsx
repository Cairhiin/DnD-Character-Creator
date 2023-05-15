import { useForm, SubmitHandler, useFieldArray } from "react-hook-form";
import styles from "@/styles/Create.module.scss";
import AnimatedButton from "../AnimatedButton";
import { ErrorField } from "./ClassSelectionForm";
import { useState } from "react";
import { characterStore } from "@/store";
import { Equipment, EquipmentFormInput } from "@/types";

interface Props {
  nextTab: () => void;
  previousTab: () => void;
  items: Equipment[];
}

export default function GearForm({
  nextTab,
  previousTab,
  items,
}: Props): JSX.Element {
  const equipment = useFieldArray({ name: "equipment" }).fields;
  const weapons = useFieldArray({ name: "weapons" }).fields;
  const armors = useFieldArray({ name: "armors" }).fields;
  const tools = useFieldArray({ name: "tools" }).fields;
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>();
  const goldFromStore = characterStore((state) => state.gold);
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<EquipmentFormInput>({
    defaultValues: {
      armors: [],
      weapons: [],
      tools: [],
      gold: 0,
      treasure: "",
      misc: [],
    },
    mode: "onSubmit",
  });

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

  return (
    <div className={styles.create__layout}>
      <div></div>
      <aside></aside>
      <form
        className={styles.character__creation__form}
        onSubmit={handleSubmit(saveData)}
      >
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
