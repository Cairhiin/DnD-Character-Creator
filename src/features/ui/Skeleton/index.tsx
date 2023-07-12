import styles from "@/styles/Components/Skeleton.module.scss";

export default function Skeleton({
  rows,
  hasAvatar,
}: {
  rows: number;
  hasAvatar: boolean;
}): JSX.Element {
  return (
    <div className={styles.skeleton}>
      <div className={styles.skeleton__header}>
        {hasAvatar && <div className={styles.skeleton__header__avatar}></div>}
        <div className={styles.skeleton__header__title}></div>
      </div>
      <div className={styles.skeleton__content}>
        {[...Array(rows)].map((x, i) => (
          <p key={i}></p>
        ))}
      </div>
    </div>
  );
}
