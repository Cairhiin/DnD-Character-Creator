import { useEffect, useState } from "react";
import styles from "@/styles/TypeWriterEffect.module.scss";

interface TypeWriterProps {
  text: string;
}

export default function TypeWriterEffect({ text }: TypeWriterProps) {
  const [textToWrite, setTextToWrite] = useState<string>("");

  useEffect(() => {
    const timeOut = setTimeout(() => {
      setTextToWrite(text.slice(0, textToWrite.length + 1));
    }, 100);
    return () => clearTimeout(timeOut);
  }, [textToWrite]);

  return <div className={styles.typewriter__effect}>{textToWrite}</div>;
}
