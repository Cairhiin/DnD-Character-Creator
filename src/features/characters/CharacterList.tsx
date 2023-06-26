import { useState } from "react";
import Link from "next/link";
import Modal from "@/features/ui/Modal/";
import AnimatedButton from "@/features/ui/AnimatedButton";
import type { Character } from "@/types";
import styles from "@/styles/Characters/CharacterList.module.scss";
import Card from "@/features/ui/Card";

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
      <Card
        title={character.description?.details.name}
        subtitle={`${character.race.name} ${character.dndClass.name} ${character.level}`}
      >
        <ul className={styles.character__list__attributes}>
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
            <Link
              href="/characters/[id]/show"
              as={`characters/${character._id}/show`}
            >
              VIEW
            </Link>
          </AnimatedButton>
          <AnimatedButton variant="secondary" type="outline">
            <Link
              href="/characters/[id]/edit"
              as={`characters/${character._id}/edit`}
            >
              LEVEL
            </Link>
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
      </Card>
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
