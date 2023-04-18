import { ReactNode } from "react";
import RaceSelection from "./RaceSelectionForm";
import styles from '@/styles/CreateCharacter/CreateCharacterTabs.module.scss';

type TabsProps = {
    activeIndex: string
};

export default function CreateCharacterTabs({ activeIndex }: TabsProps) {
    return (
        <div className={styles.create__tabs}>
              { 
                activeIndex === "1" && <RaceSelection />
              }            
        </div>
    );
};