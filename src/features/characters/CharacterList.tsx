import type { Character } from "@/types";
import styles from "@/styles/CharacterList.module.scss";
import Link from "next/link";
import AnimatedButton from "../../components/AnimatedButton";

const CharacterListItem: ({
  character,
}: {
  character: Character;
}) => JSX.Element = ({ character }) => {
  return (
    <>
      <div key={character._id} className={styles.character__card__header}>
        <h2>{character.description?.details.name}</h2>
        <h3>
          {character.race.name} {character.dndClass.name} {character.level}
        </h3>
      </div>
      <div className={styles.character__card__content}>
        <ul className={styles.character__card__abilities}>
          {Object.entries(character.abilities).map(
            ([attr, val]: [attr: string, val: number]): JSX.Element => (
              <li key={attr}>
                <span>{attr}:</span> {val}
              </li>
            )
          )}
        </ul>
        <div className={styles.buttonRow}>
          <AnimatedButton variant="secondary" type="outline">
            <Link href="/characters/[id]" as={`characters/${character._id}`}>
              VIEW
            </Link>
          </AnimatedButton>
          <AnimatedButton variant="secondary" type="outline">
            LEVEL
          </AnimatedButton>
          <AnimatedButton>DELETE</AnimatedButton>
        </div>
      </div>
    </>
  );
};

const CharacterList: ({
  characters,
}: {
  characters: Character[];
}) => JSX.Element = ({ characters }) => {
  return (
    <div className={styles.character__list}>
      <ul>
        {characters.map(
          (character: Character): JSX.Element => (
            <li className={styles.character__card} key={character._id}>
              <CharacterListItem character={character} />
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default CharacterList;
