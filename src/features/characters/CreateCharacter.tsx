import RaceSelectionForm from "./RaceSelectionForm";
import ClassSelectionForm from "./ClassSelectionForm";
import BackgroundSelectionForm from "./BackgroundSelectionForm";
import AbilitySelectionForm from "./AbilitySelectionForm";
import CharacterDescriptionForm from "./DescriptionForm";
import SkillsSelectionForm from "./SkillsForm";
import SpellSelectionForm from "./SpellSelectionForm";
import GearSelectionForm from "./GearForm";
import styles from "@/styles/Create.module.scss";
import type { Background, Equipment } from "@/types";
import SubClassForm from "./SubClassForm";

type Props = {
  activeIndex: number;
  backgrounds: Array<Background>;
  items: Array<Equipment>;
  nextTab: () => void;
  previousTab: () => void;
};

export default function CreateCharacterTabs({
  activeIndex,
  nextTab,
  previousTab,
  backgrounds,
  items,
}: Props) {
  return (
    <div className={styles.create__tabs}>
      {activeIndex === 1 && <RaceSelectionForm nextTab={nextTab} />}
      {activeIndex === 2 && (
        <ClassSelectionForm nextTab={nextTab} previousTab={previousTab} />
      )}
      {activeIndex === 3 && (
        <SubClassForm nextTab={nextTab} previousTab={previousTab} />
      )}
      {activeIndex === 4 && (
        <AbilitySelectionForm nextTab={nextTab} previousTab={previousTab} />
      )}
      {activeIndex === 5 && (
        <BackgroundSelectionForm
          nextTab={nextTab}
          previousTab={previousTab}
          backgrounds={backgrounds}
        />
      )}
      {activeIndex === 6 && (
        <CharacterDescriptionForm nextTab={nextTab} previousTab={previousTab} />
      )}
      {activeIndex === 7 && (
        <SkillsSelectionForm nextTab={nextTab} previousTab={previousTab} />
      )}
      {activeIndex === 8 && (
        <SpellSelectionForm nextTab={nextTab} previousTab={previousTab} />
      )}
      {activeIndex === 9 && (
        <GearSelectionForm
          nextTab={nextTab}
          previousTab={previousTab}
          items={items}
        />
      )}
    </div>
  );
}
