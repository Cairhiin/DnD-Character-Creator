import { ReactNode, useEffect, useState } from "react";
import styles from "@/styles/TypeWriterEffect.module.scss";

interface TypeWriterProps {
  children: ReactNode;
}

const withTypeWriterEffect =
  <P extends object>(
    WrappedComponent: React.ComponentType<P>
  ): React.FC<P & TypeWriterProps> =>
  ({ children, ...props }: TypeWriterProps): JSX.Element => {
    const text = children as string;
    const [textToWrite, setTextToWrite] = useState<string>("");
    const [isTyping, setIsTyping] = useState<boolean>(true);

    const sleep = (time: number): Promise<number> =>
      new Promise((resolve) => setTimeout(resolve, time));

    useEffect(() => {
      const randomTime: number = Math.floor(Math.random() * (200 - 50) + 50);
      const timeOut = setTimeout(() => {
        if (isTyping && textToWrite !== text) {
          setTextToWrite(text.slice(0, textToWrite.length + 1));
        } else if (textToWrite === text && isTyping) {
          sleep(2000).then(() => {
            setIsTyping(false);
          });
        } else if (!isTyping) {
          setTextToWrite(text.slice(0, textToWrite.length - 1));
          if (textToWrite.length <= 2) {
            setIsTyping(true);
          }
        }
      }, randomTime);

      return () => clearTimeout(timeOut);
    }, [textToWrite, isTyping]);

    return (
      <div className={styles.typewriter__effect}>
        <div className={styles.typewriter__effect__typearea}>
          <WrappedComponent {...(props as P)}>{textToWrite}</WrappedComponent>
          <div className={styles.cursor}></div>
        </div>
      </div>
    );
  };

export default withTypeWriterEffect;
