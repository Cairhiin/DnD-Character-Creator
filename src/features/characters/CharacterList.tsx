import { useState } from "react";
import styles from "@/styles/CharacterList.module.scss";
import Link from "next/link";
import Modal from "@/components/Modal";
import AnimatedButton from "../../components/AnimatedButton";
import type { Character } from "@/types";

const CharacterListItem: ({
  character,
  onDelete,
}: {
  character: Character;
  onDelete: (id: string) => void;
}) => JSX.Element = ({ character, onDelete }) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const handleDelete: (id: string) => void = (id) => {
    onDelete(character._id!);
    setIsOpen(false);
  };

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
          <AnimatedButton onClick={() => setIsOpen(true)}>
            DELETE
          </AnimatedButton>
          <Modal
            onClick={() => {
              handleDelete(character._id!);
            }}
            onClose={() => setIsOpen(false)}
            title={`${character.description?.details.name}`}
            isOpen={isOpen}
          >
            <p>Are you certain you want to delete this character?</p>{" "}
            <p>
              Deletion is final - once deleted the character can no longer be
              recovered
            </p>
          </Modal>
        </div>
      </div>
    </>
  );
};

const CharacterList: ({
  characters,
  onDelete,
}: {
  characters: Character[];
  onDelete: (id: string) => void;
}) => JSX.Element = ({ characters, onDelete }) => {
  return (
    <div className={styles.character__list}>
      <ul>
        {characters.map(
          (character: Character): JSX.Element => (
            <li className={styles.character__card} key={character._id}>
              <CharacterListItem character={character} onDelete={onDelete} />
            </li>
          )
        )}
      </ul>
    </div>
  );
};

export default CharacterList;
