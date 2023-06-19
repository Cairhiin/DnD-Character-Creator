import Head from "next/head";
import { getSession, useSession } from "next-auth/react";
import styles from "@/styles/Dashboard.module.scss";
import { Character } from "@/types";
import { GetServerSideProps } from "next";
import CharacterList from "@/features/characters/CharacterList";
import { useState } from "react";

interface Props {
  characters: Array<Character>;
}

export default function Dashboard({
  characters,
}: {
  characters: Array<Character>;
}) {
  const { data: session, status } = useSession();
  const [characterList, setCharacterList] = useState<Character[]>(characters);

  const handleDelete: (id: string | undefined) => void = (id) => {
    try {
      fetch(`http://localhost:3001/api/characters/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${session?.user?.token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setCharacterList((characters: Character[]) =>
            characters.filter(
              (character: Character): boolean => character._id !== id
            )
          );
        });
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <Head>
        <title>D&D Character Creator | Character Sheet</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.dashboard}>
        <div>
          <h2>Dashboard</h2>
          <section>
            <CharacterList characters={characterList} onDelete={handleDelete} />
          </section>
        </div>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const session = await getSession(context);
  let characters: Array<Character> = [];

  try {
    const res = await fetch(
      `http://localhost:3001/api/users/${session?.user?.user.id}/characters`
    );
    const result = await res.json();
    characters = result.characters;
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      characters,
    },
  };
};
