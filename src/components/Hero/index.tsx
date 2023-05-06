import { ReactNode } from "react";
import styles from "@/styles/Hero.module.scss";

interface HeroProps {
  children: ReactNode;
}

export default function Hero({ children }: HeroProps): JSX.Element {
  return (
    <div className={styles.hero}>
      <div className={styles.hero__content}>{children}</div>
    </div>
  );
}
