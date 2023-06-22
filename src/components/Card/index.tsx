import { ReactNode } from "react";
import Image from "next/image";
import styles from "@/styles/Components/Card.module.scss";

interface Props {
  image?: string;
  title?: string;
  subtitle?: string;
  children: ReactNode;
}

export default function Card({
  children,
  image,
  title,
  subtitle,
}: Props): JSX.Element {
  return (
    <div className={styles.card}>
      <div className={styles.card__header}>
        <div className={styles.card__header__image}>
          <Image src={image ?? "/images/avatar.jpg"} fill={true} alt="Avatar" />
        </div>
      </div>
      <div className={styles.card__content}>
        {!!title && <h2 className={styles.card__title}>{title}</h2>}
        {!!subtitle && <h3 className={styles.card__title}>{subtitle}</h3>}
        {children}
      </div>
    </div>
  );
}
