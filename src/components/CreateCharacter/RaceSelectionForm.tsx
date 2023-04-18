import { useForm, SubmitHandler } from "react-hook-form";
import { RACES } from "@/constants";
import { characterStore } from "@/store";
import styles from "@/styles/CreateCharacter/CharacterForm.module.scss";

interface RaceFormInput {
    race: string;
};

interface Props {
    nextTab: () => void
};

export default function RaceSelection({ nextTab }: Props) {
    const race = characterStore((state) => state.race);
    const setRace = characterStore((state: any) => state.setRace);
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm<RaceFormInput>({ defaultValues: { race: race }, mode: "onSubmit" });

    // Save the form state to Zustand and go to next tab
    const saveData: SubmitHandler<RaceFormInput> = ({ race }: { race: string }): void => {
        setRace(race);
        nextTab();
    };

    return (
        <form className={styles.race__selection} onSubmit={handleSubmit(saveData)}>
            { 
                <div className={styles.race__selection__radio}>
                    { 
                      RACES.map((race: string) => (
                            <div key={race}>
                                <input
                                    type="radio" 
                                    id={race} 
                                    value={race} 
                                    {...register("race")}
                                />
                                <label htmlFor={race}>{race}</label>
                            </div>
                        ))
                    }
                </div>
              }
              <div className={styles.create__form__buttonRow}>
                <button>Next</button>
              </div>
        </form>
    ); 
}