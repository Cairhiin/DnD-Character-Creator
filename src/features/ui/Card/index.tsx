import { ReactNode, useEffect, useRef, useState } from "react";
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
  const [width, setWidth] = useState<number>(0);
  const [height, setHeight] = useState<number>(0);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    elementRef.current && setWidth(elementRef.current.offsetWidth);
    elementRef.current && setHeight(elementRef.current.offsetHeight);
  }, []);

  const handleMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void = (
    e
  ) => {
    const x = e.clientX;
    const y = e.clientY;
    const middleX = elementRef.current
      ? elementRef.current.offsetLeft + width / 2
      : 0;
    const middleY = elementRef.current
      ? elementRef.current.offsetTop + height / 2
      : 0;

    const offsetX = ((x - middleX) / middleX) * 25;
    const offsetY = ((y - middleY) / middleY) * 25;
    elementRef.current &&
      elementRef.current.style.setProperty("--rotateX", offsetX + "deg");
    elementRef.current &&
      elementRef.current.style.setProperty("--rotateY", -1 * offsetY + "deg");
  };

  const resetPerspective: (e: React.MouseEvent<HTMLDivElement>) => void = (
    e
  ) => {
    elementRef.current &&
      elementRef.current.style.setProperty("--rotateX", "0deg");
    elementRef.current &&
      elementRef.current.style.setProperty("--rotateY", "0deg");
  };

  return (
    <div className={styles.card} ref={elementRef}>
      <div className={styles.card__header}>
        <div className={styles.card__header__image}>
          <Image
            src={image ?? "/images/avatar.jpg"}
            fill={true}
            sizes="(max-width: 300px)"
            alt="Avatar"
          />
        </div>
      </div>
      <div
        className={styles.card__content}
        onMouseMove={(e) => handleMouseMove(e)}
        onMouseLeave={(e) => resetPerspective(e)}
      >
        {!!title && <h2 className={styles.card__title}>{title}</h2>}
        {!!subtitle && <h3 className={styles.card__title}>{subtitle}</h3>}
        {children}
      </div>
    </div>
  );
}
