import { useState } from "react";
import { produce } from "immer";
import type {
  AbilityScores,
  Character,
  LevelData,
  SubClass,
  SubClassFeatures,
} from "@/types";
import { calculateAbilityModifier } from "@/utils";
import { SubmitHandler, useForm } from "react-hook-form";
import AnimatedButton from "@/features/ui/AnimatedButton";
import styles from "@/styles/Characters/Edit.module.scss";

interface Props {
  character: Character;
  levelData: LevelData;
  subClass?: SubClass;
  subClassFeatures?: SubClassFeatures;
  isDisabled: boolean;
  newHP?: number;
  saveCharacter: () => void;
  handleClick: () => void;
  handleReset: () => void;
}

interface FormData {
  hitpoints: number;
  roll: number;
}

export default function EditCharacterForm({
  character,
  levelData,
  subClass,
  subClassFeatures,
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
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {},
    mode: "onSubmit",
  });

  const saveData: SubmitHandler<FormData> = (data): void => {
    console.log(data);
  };

  const newHitpoints =
    character.hitpoints +
    (character.dndClass.hit_die ?? 6) / 2 +
    calculateAbilityModifier(character.abilities.CON) +
    1;

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
        {subClassFeatures?.count !== 0 && <h4>Subclass New Features</h4>}
        {subClassFeatures?.results.map((feature) => (
          <div>{feature.name}</div>
        ))}
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
              value={newHitpoints}
            />
            <div>Choose</div>
          </div>
          <div>
            Roll HP:{" "}
            <input
              readOnly
              type="number"
              {...register("roll")}
              value={newHP ?? newHitpoints}
            />
            <div onClick={handleClick}>Roll</div>
            <div onClick={handleReset}>Reset</div>
          </div>
        </div>
        {(character.level + 1) % 4 === 0 && <h4>Assign 2 Attribute Points</h4>}
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
          <AnimatedButton onClick={handleSubmit(saveData)} type="submit">
            Save Character
          </AnimatedButton>
          <AnimatedButton
            onClick={() => {
              reset(
                {
                  roll: newHitpoints,
                },
                {
                  keepErrors: true,
                  keepDirty: true,
                }
              );
            }}
          >
            Reset
          </AnimatedButton>
        </div>
      </div>
    </form>
  );
}
