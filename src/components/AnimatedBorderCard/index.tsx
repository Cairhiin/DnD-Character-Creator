import { ReactNode } from "react";
import styles from "@/styles/AnimatedBorderCard.module.scss";

interface AnimatedCardProps {
  children: ReactNode;
}

// TypeScript solution: https://medium.com/@jrwebdev/react-higher-order-component-patterns-in-typescript-42278f7590fb
const withAnimatedBorderCard =
  <P extends object>(
    WrappedComponent: React.ComponentType<P>
  ): React.FC<P & AnimatedCardProps> =>
  ({ children, ...props }: AnimatedCardProps) =>
    (
      <div className={styles.animated__border}>
        <WrappedComponent {...(props as P)}>{children}</WrappedComponent>
      </div>
    );

export default withAnimatedBorderCard;
