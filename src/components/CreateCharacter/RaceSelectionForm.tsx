import { useForm } from "react-hook-form";
import { RACES } from "@/constants";
import { characterStore } from "@/store";
import styles from "@/styles/CreateCharacter/CharacterForm.module.scss";

export default function RaceSelection() {
    const race = characterStore((state) => state.race);
    const setRace = characterStore((state: any) => state.setRace);
    const {
        handleSubmit,
        register,
        watch,
        formState: { errors },
    } = useForm({ defaultValues: { race: race }, mode: "onSubmit" });

    // Save the form state to Zustand 
    const saveData = (data: any): void => {
        setRace(data.race);
    }

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
              <div className="styles.create__form__buttonRow"></div>
              <button>Next</button>
        </form>
    ); 
}