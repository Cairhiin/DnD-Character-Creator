import { ReactNode, createContext, useState } from "react";
import Head from "next/head";
import { GetStaticProps } from "next";
import { Background, Equipment, CharacterFormState } from "@/types";
import CreateCharacterTabs from "@/components/CreateCharacter";
import FORM_STATE from "@/constants/formState";
import styles from "@/styles/Create.module.scss";

interface CardProps {
  children: ReactNode;
  header: string;
}

interface Props {
  backgrounds: Background[];
  items: { results: Equipment[] };
}

export const CreateCharacterCard = ({ children, header }: CardProps) => {
  return (
    <div className={styles.create__card}>
      <h2 className={styles.create__card__header}>{header}</h2>
      <div className={styles.create__card__content}>{children}</div>
    </div>
  );
};

export const FormStateContext = createContext({
  form: FORM_STATE,
  setForm: (
    form: typeof FORM_STATE | ((form: typeof FORM_STATE) => typeof FORM_STATE)
  ) => {},
});

export default function Create({ backgrounds, items }: Props) {
  const [form, setForm] = useState(FORM_STATE);
  const [activeTabIndex, setActiveTabIndex] = useState<number>(1);
  const [availableMaxIndex, setAvailableMaxIndex] = useState<number>(1);

  const setActiveIndex = (e: any) => {
    const clickedIndex = parseInt(e.dataset.tabId);
    if (clickedIndex <= availableMaxIndex) {
      setActiveTabIndex(clickedIndex);
    }
  };

  const nextTab = (): void => {
    setActiveTabIndex((prevIndex) => {
      if (prevIndex >= 8) {
        return prevIndex;
      }

      setAvailableMaxIndex(prevIndex + 1);
      return prevIndex + 1;
    });
  };

  const previousTab = (): void => {
    setActiveTabIndex((prevIndex) =>
      prevIndex > 1 ? prevIndex - 1 : prevIndex
    );
  };

  return (
    <FormStateContext.Provider
      value={{
        form,
        setForm,
      }}
    >
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
              <li
                data-tab-id="1"
                className={availableMaxIndex >= 2 ? styles.finished : ""}
              >
                <span>1</span> Race
              </li>
              <li
                data-tab-id="2"
                className={availableMaxIndex >= 3 ? styles.finished : ""}
              >
                <span>2</span> Class
              </li>
              <li
                data-tab-id="3"
                className={availableMaxIndex >= 4 ? styles.finished : ""}
              >
                <span>3</span> Abilities
              </li>
              <li
                data-tab-id="4"
                className={availableMaxIndex >= 5 ? styles.finished : ""}
              >
                <span>4</span> Background
              </li>
              <li
                data-tab-id="5"
                className={availableMaxIndex >= 6 ? styles.finished : ""}
              >
                <span>5</span> Description
              </li>
              <li
                data-tab-id="6"
                className={availableMaxIndex >= 7 ? styles.finished : ""}
              >
                <span>6</span> Skills
              </li>
              <li
                data-tab-id="7"
                className={availableMaxIndex >= 8 ? styles.finished : ""}
              >
                <span>7</span> Equipment
              </li>
            </ul>
          </div>
        </nav>
        <section className={styles.create__main}>
          <div></div>
          <aside className={styles.create__chardata}></aside>
          <aside className={styles.create__choices}>
            <div className={styles.create__tabs}>
              <CreateCharacterTabs
                activeIndex={activeTabIndex}
                nextTab={nextTab}
                previousTab={previousTab}
                backgrounds={backgrounds}
                items={items}
              />
            </div>
          </aside>
          <div></div>
        </section>
      </div>
    </FormStateContext.Provider>
  );
}

export const getStaticProps: GetStaticProps<Props> = async () => {
  let backgrounds,
    items = [];
  try {
    const res = await fetch("http://localhost:3000/api/backgrounds");
    backgrounds = await res.json();
  } catch (err) {
    console.error(err);
  }

  try {
    const equipmentRes = await fetch("https://www.dnd5eapi.co/api/equipment/");
    items = await equipmentRes.json();
  } catch (err) {
    console.error(err);
  }

  return {
    props: {
      backgrounds,
      items,
    },
  };
};
