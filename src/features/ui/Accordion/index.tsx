import { ReactNode, useState } from "react";
import styles from "@/styles/Components/Accordion.module.scss";

interface AccordionProps {
  data: Data[];
}

interface AccordionPanelProps {
  isActive: boolean;
  id: string;
  children: ReactNode;
}

interface Data {
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

export default function Accordion({ data }: AccordionProps): JSX.Element {
  const [activeIndex, setActiveIndex] = useState<number>(0);
  return (
    <div className={styles.accordion}>
      {data.map((data: Data, index: number) => (
        <div className={styles.accordion__panel} key={data.id}>
          <button
            onClick={() => setActiveIndex(index)}
            type="button"
            aria-expanded={activeIndex === index}
            className={styles.accordion__trigger}
            aria-controls={data.id}
            id={data.id}
          >
            <h3>{data.header}</h3>
            <h4>{data.subheader}</h4>
          </button>
          <AccordionPanel isActive={activeIndex === index} id={data.id}>
            {data.content}
          </AccordionPanel>
        </div>
      ))}
    </div>
  );
}
