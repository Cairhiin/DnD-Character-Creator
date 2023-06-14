import { Character } from "@/types";
import styles from "@/styles/Character.module.scss";
import Link from "next/link";
import AnimatedButton from "../AnimatedButton";

const CharacterListItem: ({
  character,
}: {
  character: Character;
}) => JSX.Element = ({ character }) => {
  return (
    <li key={character._id}>
      <div>
        <h2>{character.description?.details.name}</h2>
        <h3>
          {character.race.name} {character.dndClass.name} {character.level}
        </h3>
      </div>
      <ul>
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
    </li>
  );
};

const CharacterList: ({
  characters,
}: {
  characters: Character[];
}) => JSX.Element = ({ characters }) => {
  return (
    <ul>
      {characters.map(
        (character: Character): JSX.Element => (
          <article className={styles.characterCard} key={character._id}>
            <CharacterListItem character={character} />
          </article>
        )
      )}
    </ul>
  );
};

export default CharacterList;
