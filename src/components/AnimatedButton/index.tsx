import { ReactNode } from "react";
import styles from "@/styles/AnimatedButton.module.scss";

interface Props {
  type?: string;
  size?: string;
  variant?: string;
  children: ReactNode;
}

const AnimatedButton = ({
  type,
  size,
  variant,
  children,
}: Props): JSX.Element => (
  <button
    className={`${styles.btn} ${variant ? styles[variant] : styles.primary} ${
      size ? styles[size] : styles.regular
    } ${type ? styles[type] : styles.solid}`}
  >
    <span></span>
    {children}
    <span></span>
  </button>
);

export default AnimatedButton;
