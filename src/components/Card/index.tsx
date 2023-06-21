import { ReactNode } from "react";
import Image from "next/image";
import styles from "@/styles/Components/Card.module.scss";

interface Props {
  image?: string;
  title: string;
  children: ReactNode;
}

export default function Card({ children, image, title }: Props): JSX.Element {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <div className={styles.card__header__image}>
          <Image src="/images/avatar.jpg" fill={true} alt="Avatar" />
        </div>
      </div>
      <div className={styles.card__content}>
        <h2 className={styles.card__title}>{title}</h2>
        {children}
      </div>
    </div>
  );
}
