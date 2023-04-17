import { ReactNode } from "react";
import { RACES, CLASSES } from '@/constants';
import styles from '@/styles/CreateCharacterTabs.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";

type TabsProps = {
    activeIndex: string,
};

type TabProps = {
    key: string,
    children: ReactNode
};

const Tab = ({ children, key }: TabProps) => {
    return (
        <div key={key} className={styles.create__tabs__tab__content}>
            { children }
            <FontAwesomeIcon icon={faChevronUp} />
        </div>
    );
}

export default function CreateCharacterTabs({ activeIndex }: TabsProps) {
    return (
        <div className={styles.create__tabs}>
              { 
                activeIndex === "1" &&
                  <div className={styles.create__tabs__tab}>
                    { 
                      RACES.map((race: string) => <Tab key={race}>
                        <h3>{race}</h3>
                      </Tab>)
                    }
                  </div>
              }
              { 
                activeIndex === "2" &&
                <div className={styles.create__tabs__tab}>
                  { 
                    CLASSES.map((dndClass: string) => <Tab key={dndClass}>
                      <h3>{dndClass}</h3>
                    </Tab>)
                  }
                </div>
              }   
        </div>
    );
};