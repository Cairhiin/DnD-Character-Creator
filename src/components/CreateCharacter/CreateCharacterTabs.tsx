import RaceSelection from "./RaceSelectionForm";
import ClassSelection from "./ClassSelectionForm";
import styles from '@/styles/CreateCharacter/CreateCharacterTabs.module.scss';

type TabsProps = {
    activeIndex: number,
    nextTab: () => void,
    previousTab: () => void
};

export default function CreateCharacterTabs({ activeIndex, nextTab, previousTab }: TabsProps) {
  return (
      <div className={styles.create__tabs}>
            { 
              activeIndex === 1 && <RaceSelection nextTab={ nextTab } />
            }
            { 
              activeIndex === 2 && <ClassSelection nextTab={ nextTab } previousTab={ previousTab } />
            }             
      </div>
  );
};