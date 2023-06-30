import { ReactNode } from "react";
import styles from "@/styles/Components/Modal.module.scss";
import AnimatedButton from "@/features/ui/AnimatedButton";

const Modal: ({
  title,
  children,
  isOpen,
  onClick,
  onClose,
}: {
  title: string;
  children: ReactNode;
  isOpen: boolean;
  onClick: (id: string) => void;
  onClose: () => void;
}) => JSX.Element | null = ({ title, children, isOpen, onClick, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className={styles.modal}>
      <div className={styles.modal__content}>
        <div className={styles.modal__header}>
          <h3>{title}</h3>
        </div>
        <div className={styles.modal__body}>{children}</div>
        <div className={styles.modal__footer}>
          <AnimatedButton onClick={(id) => onClick(id)}>Delete</AnimatedButton>
          <AnimatedButton onClick={onClose}>Cancel</AnimatedButton>
        </div>
      </div>
    </div>
  );
};

export default Modal;
