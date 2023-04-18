import { useForm, SubmitHandler } from "react-hook-form";
import { CLASSES } from "@/constants";
import { characterStore } from "@/store";
import styles from "@/styles/CreateCharacter/CharacterForm.module.scss";

interface ClassFormInput {
    dndClass: string;
};

interface Props {
    nextTab: () => void
    previousTab: () => void
};

export default function ClassSelection({ nextTab, previousTab }: Props) {
    const dndClass = characterStore((state) => state.dndClass);
    const setClass = characterStore((state: any) => state.setClass);
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm<ClassFormInput>({ defaultValues: { dndClass: dndClass }, mode: "onSubmit" });

    // Save the form state to Zustand and go to next tab
    const saveData: SubmitHandler<ClassFormInput> = ({ dndClass }): void => {
        setClass(dndClass);
        nextTab();
    };

    return (
        <form className={styles.race__selection} onSubmit={handleSubmit(saveData)}>
            { 
                <div className={styles.race__selection__radio}>
                    { 
                      CLASSES.map((dndClass: string) => (
                            <div key={dndClass}>
                                <input
                                    type="radio" 
                                    id={dndClass} 
                                    value={dndClass} 
                                    {...register("dndClass")}
                                />
                                <label htmlFor={dndClass}>{dndClass}</label>
                            </div>
                        ))
                    }
                </div>
              }
              <div className="styles.create__form__buttonRow">
                <button>Next</button>
              </div>
        </form>
    ); 
}