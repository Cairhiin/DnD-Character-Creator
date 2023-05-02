import RaceSelection from "./RaceSelectionForm";
import ClassSelection from "./ClassSelectionForm";
import AbilitySelection from "./AbilitySelectionForm";
import CharacterDescription from "./DescriptionForm";
import SkillsSelection from "./SkillsForm";
import styles from "@/styles/Create.module.scss";

type Props = {
  activeIndex: number;
  nextTab: () => void;
  previousTab: () => void;
};

export default function CreateCharacterTabs({
  activeIndex,
  nextTab,
  previousTab,
}: Props) {
  return (
    <div className={styles.create__tabs}>
      {activeIndex === 1 && <RaceSelection nextTab={nextTab} />}
      {activeIndex === 2 && (
        <ClassSelection nextTab={nextTab} previousTab={previousTab} />
      )}
      {activeIndex === 3 && (
        <AbilitySelection nextTab={nextTab} previousTab={previousTab} />
      )}
      {activeIndex === 4 && (
        <CharacterDescription nextTab={nextTab} previousTab={previousTab} />
      )}
      {activeIndex === 5 && (
        <SkillsSelection nextTab={nextTab} previousTab={previousTab} />
      )}
    </div>
  );
}
