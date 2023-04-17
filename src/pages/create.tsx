import Head from 'next/head';
import styles from '@/styles/Create.module.scss';
import RaceCard from '@/components/RaceCard';

const raceMock = {
  "index": "dragonborn",
  "name": "Dragonborn",
  "speed": 30,
  "ability_bonuses": [
    {
      "ability_score": {
        "index": "str",
        "name": "STR",
        "url": "/api/ability-scores/str"
      },
      "bonus": 2
    },
    {
      "ability_score": {
        "index": "cha",
        "name": "CHA",
        "url": "/api/ability-scores/cha"
      },
      "bonus": 1
    }
  ],
  "alignment": "Dragonborn tend to extremes, making a conscious choice for one side or the other in the cosmic war between good and evil. Most dragonborn are good, but those who side with evil can be terrible villains.",
  "age": "Young dragonborn grow quickly. They walk hours after hatching, attain the size and development of a 10-year-old human child by the age of 3, and reach adulthood by 15. They live to be around 80.",
  "size": "Medium",
  "size_description": "Dragonborn are taller and heavier than humans, standing well over 6 feet tall and averaging almost 250 pounds. Your size is Medium.",
  "starting_proficiencies": [],
  "languages": [
    {
      "index": "common",
      "name": "Common",
      "url": "/api/languages/common"
    },
    {
      "index": "draconic",
      "name": "Draconic",
      "url": "/api/languages/draconic"
    }
  ],
  "language_desc": "You can speak, read, and write Common and Draconic. Draconic is thought to be one of the oldest languages and is often used in the study of magic. The language sounds harsh to most other creatures and includes numerous hard consonants and sibilants.",
  "traits": [
    {
      "index": "draconic-ancestry",
      "name": "Draconic Ancestry",
      "url": "/api/traits/draconic-ancestry"
    },
    {
      "index": "breath-weapon",
      "name": "Breath Weapon",
      "url": "/api/traits/breath-weapon"
    },
    {
      "index": "damage-resistance",
      "name": "Damage Resistance",
      "url": "/api/traits/damage-resistance"
    }
  ],
  "subraces": [],
  "url": "/api/races/dragonborn"
};

export default function Home() {
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
            <ul>
              <li>1. Race</li>
              <li>2. Class</li>
              <li>3. Abilities</li>
              <li>4. Description</li>
              <li>5. Equipment</li>
            </ul>
          </div>
        </nav>
        <div className={styles.create__main}>
          <section className={styles.create__description}></section>
          <section className={styles.create__choices}>
            <RaceCard race={raceMock} />
          </section>
        </div>
      </div>
    </>
  )
}