import { produce } from "immer";
import type { AbilityScores, Character, LevelData, SubClass } from "@/types";
import { calculateAbilityModifier } from "@/utils";
import { SubmitHandler, set, useForm } from "react-hook-form";
import AnimatedButton from "@/features/ui/AnimatedButton";
import styles from "@/styles/Characters/Edit.module.scss";
import { useState } from "react";

interface Props {
  character: Character;
  levelData: LevelData;
  subClass?: SubClass;
  isDisabled: boolean;
  newHP?: number;
  saveCharacter: () => void;
  handleClick: () => void;
  handleReset: () => void;
}

interface FormData {
  hitpoints: number;
}

export default function EditCharacterForm({
  character,
  levelData,
  subClass,
  isDisabled,
  newHP,
  saveCharacter,
  handleClick,
  handleReset,
}: Props): JSX.Element {
  const [availableAttrPoints, setAvailableAttrPoints] = useState<number>(2);
  const [attributes, setAttributes] = useState<AbilityScores>(
    character.abilities
  );
  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {},
    mode: "onSubmit",
  });

  const saveData: SubmitHandler<FormData> = (data): void => {
    console.log(data);
  };

  const handleRemove: (
    e:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
      | undefined,
    attr: string
  ) => void = (e, attr) => {
    let pressedkey;
    if (e?.type === "keyup") {
      pressedkey = (e as any)["keyCode"];
    }
    if (
      availableAttrPoints < 2 &&
      (!pressedkey || pressedkey === 32 || pressedkey === 13)
    ) {
      if ((attributes as any)[attr] > (character.abilities as any)[attr]) {
        setAttributes(
          produce((draft) => {
            (draft as any)[attr]--;
          })
        );
        setAvailableAttrPoints((availableAttrPoints) => ++availableAttrPoints);
      }
    }
  };

  const handleAdd: (
    e:
      | React.MouseEvent<HTMLDivElement>
      | React.KeyboardEvent<HTMLDivElement>
      | undefined,
    attr: string
  ) => void = (e, attr) => {
    let pressedkey;
    if (e?.type === "keyup") {
      pressedkey = (e as any)["keyCode"];
    }
    if (
      availableAttrPoints > 0 &&
      (!pressedkey || pressedkey === 32 || pressedkey === 13)
    ) {
      setAttributes(
        produce((draft) => {
          (draft as any)[attr]++;
        })
      );
      setAvailableAttrPoints((availableAttrPoints) => --availableAttrPoints);
    }
  };

  return (
    <form onSubmit={handleSubmit(saveData)}>
      <div>
        <h4>New {character.dndClass.name} Features</h4>
        <ul>
          {levelData.features.map((feature) => (
            <div key={feature.index}>{feature.name}</div>
          ))}
        </ul>
        {!!subClass && <h4>New subclass: {subClass.name}</h4>}
        <h4>Hitpoints</h4>
        <div>
          Current max HP: <span>{character.hitpoints}</span>
        </div>
        <div className={styles.levelUp__hitpoints}>
          <div>
            New max HP:{" "}
            <input
              {...register("hitpoints")}
              type="number"
              readOnly
              value={
                character.hitpoints +
                (character.dndClass.hit_die ?? 6) / 2 +
                calculateAbilityModifier(character.abilities.CON) +
                1
              }
            />
            <div>Choose</div>
          </div>
          <div>
            Roll HP:{" "}
            <input
              readOnly
              type="number"
              value={
                newHP ??
                character.hitpoints +
                  (character.dndClass.hit_die ?? 6) / 2 +
                  calculateAbilityModifier(character.abilities.CON) +
                  1
              }
            />
            <div onClick={handleClick}>Roll</div>
            <div onClick={handleReset}>Reset</div>
          </div>
        </div>
        {(character.level + 1) % 4 === 0 && <h4>Asign 2 Attribute Points</h4>}
        {
          /* (character.level + 1) % 4 === 0 && */
          Object.entries(attributes).map(([ability, value]) => (
            <div key={ability}>
              {ability}: {value}{" "}
              <div
                onClick={(e) => handleRemove(e, ability)}
                className={styles.attr__button}
                tabIndex={0}
                onKeyUp={(e) => handleRemove(e, ability)}
              >
                -
              </div>
              <div
                onClick={(e) => handleAdd(e, ability)}
                className={styles.attr__button}
                tabIndex={0}
                onKeyUp={(e) => handleAdd(e, ability)}
              >
                +
              </div>
            </div>
          ))
        }
        <div className={styles.buttonRow}>
          <AnimatedButton onClick={handleSubmit(saveData)}>
            Save Character
          </AnimatedButton>
          <div onClick={handleReset}>
            <AnimatedButton type="outline" variant="secondary">
              Cancel
            </AnimatedButton>
          </div>
        </div>
      </div>
    </form>
  );
}
