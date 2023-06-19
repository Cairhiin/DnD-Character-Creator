import {
  ReactNode,
  createContext,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import { useSession } from "next-auth/react";
import { GetStaticProps } from "next";
import { produce } from "immer";
import type { Background, Character, Equipment } from "@/types";
import CreateCharacterTabs from "@/features/characters/CreateCharacter";
import FORM_STATE from "@/constants/formState";
import styles from "@/styles/Create.module.scss";
import { calculateAbilityModifier, calculateHP } from "@/utils";
import { FormState } from "@/constants/formState";

interface Props {
  backgrounds: Array<Background>;
  items: Array<Equipment>;
}

interface CardProps {
  children: ReactNode;
  header: string;
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
  const [form, setForm] = useState<FormState>(FORM_STATE);
  const [isCompleted, setIsCompleted] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [equipment, setEquipment] = useState<{
    shields: [];
    armors: [];
    weapons: [];
    misc: [];
  }>({ shields: [], armors: [], weapons: [], misc: [] });
  const router = useRouter();
  const { data: session, status } = useSession();
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
      if (prevIndex >= 9) {
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

  const fetchEquipmentData: (item: Equipment) => void = useCallback((item) => {
    fetch(`https://www.dnd5eapi.co${item.url}`)
      .then((res) => res.json())
      .then((data) => {
        setEquipment(
          produce<any>((draftState: any) => {
            switch (data.armor_category) {
              case "Shield":
                draftState.shields.push(data);
              case "Light":
              case "Heavy":
              case "Medium":
                draftState.armors.push(data);
              case "Weapon":
                draftState.weapons.push(data);
              default:
                draftState.misc.push(data);
            }
          })
        );
      });
  }, []);

  useEffect(() => {
    let ignore = false;

    if (!ignore) {
      setIsLoading(true);
      form.steps.equipmentSelection.value.forEach((item) =>
        fetchEquipmentData(item)
      );
    }
    setIsLoading(false);

    return () => {
      ignore = true;
    };
  }, [form.steps.equipmentSelection.value]);

  const onComplete = (): void => {
    // Removing unnecessary data to reduce size of the object

    const data: Character = {
      userId: session?.user?.user.id!,
      race: form.steps.raceSelection.value.race,
      dndClass: form.steps.classSelection.value.dndClass,
      abilities: form.steps.abilitiesSelection.value.abilities,
      background: form.steps.backgroundSelection.value.background,
      description: form.steps.descriptionForm.value,
      skills: form.steps.skillsSelection.value,
      spells: form.steps.spellSelection.value,
      level: 1,
      gold: 10,
      experience: 0,
      hitpoints: calculateHP(
        form.steps.classSelection.value.dndClass.hit_die,
        1,
        calculateAbilityModifier(
          form.steps.abilitiesSelection.value.abilities.CON
        )
      ),
      equipment: equipment,
    };

    if (!isCompleted) {
      try {
        fetch("http://localhost:3001/api/characters", {
          headers: {
            "Content-type": "application/json",
            Authorization: `Bearer ${session?.user?.token}`,
          },
          method: "POST",
          mode: "cors",
          credentials: "same-origin",
          body: JSON.stringify(data),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
          });
      } catch (err) {
        console.error(err);
      } finally {
        setIsCompleted(true);
        router.push("/dashboard");
      }
    }
  };

  useEffect(() => {
    let ignore = false;

    if (activeTabIndex === 9 && !ignore && !isLoading) {
      onComplete();
    }

    return () => {
      ignore = true;
    };
  }, [activeTabIndex, onComplete, isCompleted, isLoading]);

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
      <main className={styles.main}>
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
                <span>7</span> Spells
              </li>
              <li
                data-tab-id="8"
                className={availableMaxIndex >= 9 ? styles.finished : ""}
              >
                <span>8</span> Equipment
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
      </main>
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
    items = items.results;
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
