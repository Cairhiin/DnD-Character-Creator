import { useState } from "react";
import { Character, LevelData, SubClass } from "@/types";
import { calculateAbilityModifier } from "@/utils";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";
import { ParsedUrlQuery } from "querystring";
import styles from "@/styles/Characters/Edit.module.scss";
import EditCharacterForm from "@/features/characters/EditCharacterForm";

interface Params extends ParsedUrlQuery {
  id: string;
}

interface Props {
  character: Character;
  levelData: LevelData;
  subClass: SubClass;
}

export default function EditCharacter({
  character,
  levelData,
  subClass,
}: Props): JSX.Element {
  const { data: session, status } = useSession();
  const [newHP, setNewHP] = useState<number>();
  const [isDisabled, setIsDisabled] = useState<boolean>(false);
  const [error, setError] = useState<string>();

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

  const newLevel = character.level + 1;

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
      <EditCharacterForm
        character={character}
        levelData={levelData}
        subClass={subClass}
        newHP={newHP}
        isDisabled={isDisabled}
        saveCharacter={saveCharacter}
        handleClick={handleClick}
        handleReset={handleReset}
      ></EditCharacterForm>
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

  const levelUp = results.level + 1;
  const isEligbleForSubClass =
    (levelUp === 2 &&
      (results.dndClass.index === "druid" ||
        results.dndClass.index === "wizard")) ||
    (levelUp === 3 &&
      !(
        results.dndClass.index === "druid" ||
        results.dndClass.index === "wizard" ||
        results.dndClass.index === "cleric" ||
        results.dndClass.index === "sorcerer" ||
        results.dndClass.index === "warlock"
      ));
  let subClassRes;
  if (isEligbleForSubClass) {
    const subClass = await fetch(
      `https://www.dnd5eapi.co/api/classes/${results.dndClass.index}/subclasses`
    );

    subClassRes = await subClass.json();
  }

  return {
    props: {
      character: results,
      levelData: levelRes,
      subClass: subClassRes.results[0],
    },
  };
};
