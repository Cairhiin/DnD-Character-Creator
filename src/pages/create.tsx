import { useState } from "react";
import Head from "next/head";
import { characterStore } from "@/store";
import type { CharacterDescription } from "@/types";
import styles from "@/styles/Create.module.scss";
import CreateCharacterTabs from "@/components/CreateCharacter/CreateCharacterTabs";

export default function Home() {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(1);
  const { race, dndClass, abilityScores, description } = characterStore(
    (state) => state
  );
  const {
    background,
    details,
    physical,
    personal,
    notes,
  }: CharacterDescription = description;

  const setActiveIndex = (e: any) => {
    setActiveTabIndex(parseInt(e.dataset.tabId));
  };

  const nextTab = (): void => {
    setActiveTabIndex((prevIndex) =>
      prevIndex < 6 ? prevIndex + 1 : prevIndex
    );
  };

  const previousTab = (): void => {
    setActiveTabIndex((prevIndex) =>
      prevIndex > 1 ? prevIndex - 1 : prevIndex
    );
  };

  return (
    <>
      <Head>
        <title>D&D Character Creator | Create new character</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.main}>
        <nav className={styles.nav}>
          <div className={styles.create__topbar}>
            <ul
              onClick={(e: React.MouseEvent<HTMLElement>) =>
                setActiveIndex(e.target as any)
              }
            >
              <li data-tab-id="1">1. Race</li>
              <li data-tab-id="2">2. Class</li>
              <li data-tab-id="3">3. Abilities</li>
              <li data-tab-id="4">4. Description</li>
              <li data-tab-id="5">5. Equipment</li>
            </ul>
          </div>
        </nav>
        <section className={styles.create__main}>
          <div></div>
          <aside className={styles.create__chardata}>
            <div>
              <h3>RACE</h3>
              <p>{race.name}</p>
            </div>
            <div>
              <h3>CLASS</h3>
              <p>{dndClass.name}</p>
            </div>
            <div>
              <p>STR: {abilityScores.STR}</p>
              <p>DEX: {abilityScores.DEX}</p>
              <p>CON: {abilityScores.CON}</p>
              <p>INT: {abilityScores.INT}</p>
              <p>WIS: {abilityScores.WIS}</p>
              <p>CHA: {abilityScores.CHA}</p>
            </div>
            <div>
              <div>
                <div>
                  <h3>BACKGROUND</h3>
                  <p>{background}</p>
                </div>
                <div>
                  <h3>DETAILS</h3>
                  <p>{details.alignment}</p>
                  <p>{details.faith}</p>
                </div>
                <div>
                  <h3>PHYSICAL APPEARANCE</h3>
                  <p>{physical.hair}</p>
                  <p>{physical.skin}</p>
                  <p>{physical.eyes}</p>
                  <p>{physical.height}</p>
                  <p>{physical.weight}</p>
                  <p>{physical.gender}</p>
                </div>
                <div>
                  <h3>PERSONAL CHARACTERISTICS</h3>
                  <p>{personal.traits}</p>
                  <p>{personal.ideals}</p>
                  <p>{personal.bonds}</p>
                  <p>{personal.flaws}</p>
                </div>
                <div>
                  <h3>NOTES</h3>
                  <p>{notes.allies}</p>
                  <p>{notes.enemies}</p>
                  <p>{notes.organizations}</p>
                  <p>{notes.backstory}</p>
                  <p>{notes.other}</p>
                </div>
              </div>
            </div>
          </aside>
          <aside className={styles.create__choices}>
            <div className={styles.create__tabs}>
              <CreateCharacterTabs
                activeIndex={activeTabIndex}
                nextTab={nextTab}
                previousTab={previousTab}
              />
            </div>
          </aside>
          <div></div>
        </section>
      </div>
    </>
  );
}
