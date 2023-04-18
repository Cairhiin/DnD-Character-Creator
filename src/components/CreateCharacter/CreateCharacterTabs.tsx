import RaceSelection from "./RaceSelectionForm";
import styles from '@/styles/CreateCharacter/CreateCharacterTabs.module.scss';

type TabsProps = {
    activeIndex: string,
    nextTab: () => void,
    previousTab: () => void
};

export default function CreateCharacterTabs({ activeIndex, nextTab, previousTab }: TabsProps) {
  return (
      <div className={styles.create__tabs}>
            { 
              activeIndex === "1" && <RaceSelection nextTab={ nextTab } />
            }            
      </div>
  );
};