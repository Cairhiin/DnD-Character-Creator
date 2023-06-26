import { useState } from "react";
import { Character, LevelData } from "@/types";
import { calculateAbilityModifier } from "@/utils";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";
import AnimatedButton from "@/features/ui/AnimatedButton";
import styles from "@/styles/Characters/Edit.module.scss";

interface Params extends ParsedUrlQuery {
  id: string;
}

interface Props {
  character: Character;
  levelData: LevelData;
}

export default function EditCharacter({
  character,
  levelData,
}: Props): JSX.Element {
  const { data: session, status } = useSession();
  const [newHP, setNewHP] = useState<number>();
  const [error, setError] = useState<string>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const newLevel = character.level + 1;

  const handleClick: () => void = () => {
    const diceRoll = Math.floor(
      Math.random() * (character.dndClass.hit_die ?? 6) + 1
    );
    setNewHP(
      character.hitpoints +
        diceRoll +
        calculateAbilityModifier(character.abilities.CON)
    );
    setIsDisabled(true);
  };

  const handleReset: () => void = () => {
    setIsDisabled(false);
    setNewHP(undefined);
    setError(undefined);
  };

  const saveCharacter: () => void = () => {
    const { _id } = character;
    if (newHP && !error) {
      console.log(_id);
      character.hitpoints = newHP;
      character.level++;
      fetch(`http://localhost:3001/api/characters/${_id}`, {
        method: "PUT",
        mode: "cors",
        credentials: "same-origin",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.user?.token}`,
        },
        body: JSON.stringify(character),
      })
        .then((res) => res)
        .then((data) => {
          console.log(data);
          return data.json;
        })
        .catch((err) => console.error(err));
    } else {
      setError("Please adjust the hitpoint value of your character.");
    }
  };

  return (
    <section className={styles.levelUp}>
      <h2>{`${character.description?.details.name} ${character.dndClass.name} ${newLevel}`}</h2>
      <div>
        <h4>New {character.dndClass.name} Features</h4>
        <ul>
          {levelData.features.map((feature) => (
            <div key={feature.index}>{feature.name}</div>
          ))}
        </ul>
        <h4>Hitpoints</h4>
        <div className={styles.levelUp__hitpoints}>
          <div>
            Current max HP: <span>{character.hitpoints}</span>
          </div>
          <div>
            New max HP:{" "}
            <span>
              {character.hitpoints +
                (character.dndClass.hit_die ?? 6) / 2 +
                calculateAbilityModifier(character.abilities.CON) +
                1}
            </span>
            <AnimatedButton size="small">Choose</AnimatedButton>
          </div>
          <div>
            Roll HP: <span>{newHP ?? "--"}</span>
            <AnimatedButton
              size="small"
              onClick={handleClick}
              disabled={isDisabled}
            >
              Roll
            </AnimatedButton>
            <AnimatedButton size="small" onClick={handleReset}>
              Reset
            </AnimatedButton>
          </div>
        </div>
        <div className={styles.buttonRow}>
          <AnimatedButton onClick={saveCharacter}>
            Save Character
          </AnimatedButton>
          <AnimatedButton type="outline" variant="secondary">
            Cancel
          </AnimatedButton>
        </div>
      </div>
    </section>
  );
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async ({
  params,
}) => {
  const { id } = params!;
  const character = await fetch(`http://localhost:3001/api/characters/${id}`);
  const { results }: { results: Character } = await character.json();
  const level = await fetch(
    `https://www.dnd5eapi.co/api/classes/${results.dndClass.index}/levels/${
      results.level + 1
    }`
  );
  const levelRes: LevelData = await level.json();

  return {
    props: {
      character: results,
      levelData: levelRes,
    },
  };
};
