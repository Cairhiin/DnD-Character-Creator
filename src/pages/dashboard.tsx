import Head from "next/head";
import { getSession } from "next-auth/react";
import styles from "@/styles/Dashboard.module.scss";
import { Character } from "@/types";
import { GetServerSideProps } from "next";
import Image from "next/image";
import AnimatedButton from "@/components/AnimatedButton";
import Link from "next/link";

interface Props {
  characters: Array<Character>;
}

export default function Dashboard({
  characters,
}: {
  characters: Array<Character>;
}) {
  return (
    <>
      <Head>
        <title>D&D Character Creator | Character Sheet</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.characterList}>
        <div>
          <h2>Dashboard</h2>
          <section>
            {characters.map(
              (char: Character): JSX.Element => (
                <article key={char._id} className={styles.characterCard}>
                  <div>
                    <h2>{char.description?.details.name}</h2>
                    <h3>
                      {char.race.name} {char.dndClass.name} {char.level}
                    </h3>
                  </div>
                  <ul>
                    {Object.entries(char.abilities).map(
                      ([attr, val]: [
                        attr: string,
                        val: number
                      ]): JSX.Element => (
                        <li key={attr}>
                          <span>{attr}:</span> {val}
                        </li>
                      )
                    )}
                  </ul>
                  <div className={styles.buttonRow}>
                    <AnimatedButton variant="secondary" type="outline">
                      <Link
                        href="/characters/[id]"
                        as={`characters/${char._id}`}
                      >
                        VIEW
                      </Link>
                    </AnimatedButton>
                    <AnimatedButton variant="secondary" type="outline">
                      LEVEL
                    </AnimatedButton>
                    <AnimatedButton>DELETE</AnimatedButton>
                  </div>
                </article>
              )
            )}
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