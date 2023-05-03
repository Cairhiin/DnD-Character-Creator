import { useForm } from "react-hook-form/dist/useForm";
import { BACKGROUNDS } from "@/constants";
import styles from "@/styles/CharacterForm.module.scss";

interface Props {
  nextTab: () => void;
  previousTab: () => void;
}

export default function BackgroundSelectionForm({
  nextTab,
  previousTab,
}: Props): JSX.Element {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    defaultValues: {
      background: {},
    },
    mode: "onSubmit",
  });

  return (
    <div className={styles.create__character__radio}>
      {BACKGROUNDS.map(
        ({ id, name }: { id: string; name: string }): JSX.Element => (
          <div key={id}>
            <select {...register("background")}>
              <option value={name}>TEST</option>
            </select>
            <label htmlFor={name}>{name}</label>
            <p>{errors.background?.message}</p>
          </div>
        )
      )}
    </div>
  );
}
