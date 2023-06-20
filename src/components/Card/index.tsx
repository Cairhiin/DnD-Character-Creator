import { ReactNode } from "react";
import styles from "@/styles/Components/Card.module.scss";

interface Props {
  backgroundColor?: string;
  borderColor?: string;
  header: string;
  children: ReactNode;
}

export default function Card({
  children,
  backgroundColor,
  borderColor,
  header,
}: Props): JSX.Element {
  return (
    <div
      className={styles.card}
      style={{
        backgroundColor: backgroundColor ?? "",
        borderColor: borderColor ?? "",
      }}
    >
      <h2 className={styles.card__header}>{header}</h2>
      <div className={styles.card__content}>{children}</div>
    </div>
  );
}
