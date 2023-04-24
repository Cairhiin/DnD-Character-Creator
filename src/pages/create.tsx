import { useState } from 'react';
import Head from 'next/head';
import { characterStore } from '@/store';
import styles from '@/styles/Create.module.scss';
import CreateCharacterTabs from '@/components/CreateCharacter/CreateCharacterTabs';

export default function Home() {
  const [activeTabIndex, setActiveTabIndex] = useState<number>(1);
  const { race, dndClass, abilityScores } = characterStore((state) => state);

  const setActiveIndex = (e: any) => {
    setActiveTabIndex(parseInt(e.dataset.tabId));
  }

  const nextTab = (): void => {
    setActiveTabIndex(prevIndex => prevIndex < 5 ? prevIndex + 1 : prevIndex);
  }

  const previousTab = (): void => {
    setActiveTabIndex(prevIndex => prevIndex > 1 ? prevIndex - 1 : prevIndex);
  }

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
            <ul onClick={(e: React.MouseEvent<HTMLElement>) => setActiveIndex(e.target as any)}>
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
            { race }
          </div>
          <div>
            { dndClass }
          </div>
          <div>
            <div>STR: { abilityScores.STR }</div>
            <div>DEX: { abilityScores.DEX }</div>
            <div>CON: { abilityScores.CON }</div>
            <div>INT: { abilityScores.INT }</div>
            <div>WIS: { abilityScores.WIS }</div>
            <div>CHA: { abilityScores.CHA }</div>
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
  )
}