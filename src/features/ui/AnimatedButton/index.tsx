import { ReactNode } from "react";
import styles from "@/styles/Components/AnimatedButton.module.scss";

interface Props {
  outline?: string;
  type?: "submit" | "reset" | "button" | undefined;
  size?: string;
  variant?: string;
  children: ReactNode;
  disabled?: boolean;
  onClick?: (e: any | undefined) => void;
}

const AnimatedButton = ({
  outline,
  type,
  size,
  variant,
  children,
  disabled,
  onClick,
}: Props): JSX.Element => (
  <button
    type={type ?? "button"}
    onClick={onClick}
    disabled={disabled}
    className={`${styles.btn} ${variant ? styles[variant] : styles.primary} ${
      size ? styles[size] : styles.regular
    } ${outline ? styles[outline] : styles.solid}`}
  >
    <span></span>
    {children}
    <span></span>
  </button>
);

export default AnimatedButton;
