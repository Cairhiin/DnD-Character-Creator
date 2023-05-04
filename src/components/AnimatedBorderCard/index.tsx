import { ReactNode } from "react";
import styles from "@/styles/AnimatedBorderCard.module.scss";

interface Props {
  children: ReactNode;
  header: string;
}

const withAnimatedBorderCard =
  (WrappedComponent: React.FC<Props>) =>
  ({ children, header }: Props) =>
    (
      <div className={styles.animated__border}>
        <WrappedComponent header={header}>{children}</WrappedComponent>
      </div>
    );

export default withAnimatedBorderCard;
