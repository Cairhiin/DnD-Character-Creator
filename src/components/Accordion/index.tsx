import styles from "@/styles/Accordion.module.scss";
import { ReactNode, useState } from "react";

interface AccordionProps {
  items: Item[];
}

interface AccordionPanelProps {
  isActive: boolean;
  id: string;
  children: ReactNode;
}

interface Item {
  header: string;
  subheader: string;
  content: ReactNode;
  id: string;
}

const AccordionPanel = ({
  isActive,
  id,
  children,
}: AccordionPanelProps): JSX.Element => (
  <div
    className={isActive ? styles.open : ""}
    role="region"
    aria-labelledby={id}
  >
    <div className={styles.accordion__content}>{children}</div>
  </div>
);

export default function Accordion({ items }: AccordionProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <div className={styles.accordion}>
      {items.map((item: Item, index: number) => (
        <div className={styles.accordion__panel} key={item.id}>
          <button
            onClick={() => setActiveIndex(index)}
            type="button"
            aria-expanded={activeIndex === index}
            className={styles.accordion__trigger}
            aria-controls={item.id}
            id={item.id}
          >
            <h3>{item.header}</h3>
            <h4>{item.subheader}</h4>
          </button>
          <AccordionPanel isActive={activeIndex === index} id={item.id}>
            {item.content}
          </AccordionPanel>
        </div>
      ))}
    </div>
  );
}
