import { ReactNode } from "react";
import styles from "@/styles/AnimatedButton.module.scss";

interface Props {
  type?: string;
  size?: string;
  variant?: string;
  children: ReactNode;
  disabled?: boolean;
  onClick?: (e: any | undefined) => void;
}

const AnimatedButton = ({
  type,
  size,
  variant,
  children,
  disabled,
  onClick,
}: Props): JSX.Element => (
  <button
    onClick={onClick}
    disabled={disabled}
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
