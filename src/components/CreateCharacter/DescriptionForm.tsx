import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { characterStore } from "@/store";
import { BACKGROUNDS, ALIGNMENT } from '@/constants';
import { CharacterDescription } from '@/types';
import styles from '@/styles/CreateCharacter/CharacterForm.module.scss';

interface Props {
    nextTab: () => void
    previousTab: () => void
};

export default function CharacterDescription ({ nextTab, previousTab }: Props) {
    const description = characterStore((state) => state.description);
    const setDescription = characterStore((state) => state.setDescription);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ defaultValues: 
        { 
            background: "", 
            details: { alignment: "", faith: "" },
            physical: {
                hair: "",
                skin: "",
                eyes: "",
                height: "",
                weight: "",
                age: "",
                gender: ""
            },
            personal: {
                traits: "",
                ideals: "",
                bonds: "",
                flaws: ""
            },
            notes: {
                organizations: "",
                allies: "",
                enemies: "",
                backstory: "",
                other: ""
            }
        }
        , mode: "onSubmit" }
    );

    // Save the form state to Zustand and go to next tab
    const saveData: SubmitHandler<CharacterDescription> = (description): void => {
        setDescription(description);
        nextTab();
    };

    return (
        <div>
            <h2>Description</h2>
            <form className={styles.create__form__ability_score} onSubmit={handleSubmit(saveData)}>
                <div className={styles.create__character__radio}>
                    { 
                        BACKGROUNDS.map((background: string) => (
                            <div key={background}>
                                <input
                                    type="radio" 
                                    id={background} 
                                    value={background} 
                                    {...register("background")}
                                />
                                <label htmlFor={background}>{background}</label>
                            </div>
                        ))
                    }
                </div>
                <div onClick={() => setActiveIndex(1)}>
                    <h3>Character Details</h3>
                    <p>Alignment | Faith</p>
                    { activeIndex === 1 && 
                        <div>
                            <label htmlFor="alignment">Alignment</label>
                            <select {...register("details.alignment")}>Alignment 
                            { 
                                ALIGNMENT.map((alignment: string) => 
                                    <option value={alignment}>{alignment}</option>)
                            }
                            </select>
                            <label htmlFor="faith">Faith</label>
                            <input type="text" {...register("details.faith")} />
                        </div> 
                    }
                </div>
                <div onClick={() => setActiveIndex(2)}>
                    <h3>Physical Characteristics</h3>
                    <p>Hair | Skin | Eyes | Height | Weight | Age | Gender</p>
                    { activeIndex === 2 && 
                        <div>
                            <label htmlFor="hair">Hair</label>
                            <input type="text" {...register("physical.hair")} />
                            <label htmlFor="skin">Skin</label>
                            <input type="text" {...register("physical.skin")} />
                            <label htmlFor="eyes">Eyes</label>
                            <input type="text" {...register("physical.eyes")} />
                            <label htmlFor="height">Height</label>
                            <input type="text" {...register("physical.height")} />
                            <label htmlFor="weight">Weight</label>
                            <input type="text" {...register("physical.weight")} />
                            <label htmlFor="age">Age</label>
                            <input type="text" {...register("physical.age")} />
                            <label htmlFor="gender">Gender</label>
                            <select {...register("physical.gender")}>
                                <option value="female">Female</option>
                                <option value="male">Male</option>
                                <option value="nonbinary">Non-binariy</option>
                                <option value="other">Other</option>
                            </select>
                        </div> 
                    }
                </div>
                <div onClick={() => setActiveIndex(3)}>
                    <h3>Personal Characteristics</h3>
                    <p>Personality | Ideals | Bonds | Flaws</p>
                    { activeIndex === 3 && 
                        <div>
                            <label htmlFor="traits">Personality Traits</label>
                            <input type="text" {...register("personal.traits")} />
                            <label htmlFor="ideals">Ideals</label>
                            <input type="text" {...register("personal.ideals")} />
                            <label htmlFor="bonds">Bonds</label>
                            <input type="text" {...register("personal.bonds")} />
                            <label htmlFor="flaws">Flaws</label>
                            <input type="text" {...register("personal.flaws")} />
                        </div> 
                    }
                </div>
                <div onClick={() => setActiveIndex(4)}>
                    <h3>Notes</h3>
                    <p>Organization | Allies | Enemies | Backstory | Other</p>
                    { activeIndex === 4 && 
                        <div>
                            <label htmlFor="organizations">Organizations</label>
                            <input type="text" {...register("notes.organizations")} />
                            <label htmlFor="allies">Allies</label>
                            <input type="text" {...register("notes.allies")} />
                            <label htmlFor="enemies">Enemies</label>
                            <input type="text" {...register("notes.enemies")} />
                            <label htmlFor="backstory">Backstory</label>
                            <textarea  {...register("notes.backstory")}></textarea>
                            <label htmlFor="other">Other</label>
                            <textarea {...register("notes.other")}></textarea>
                        </div> 
                    }
                </div>
                <div className={styles.create__form__buttonRow}>
                    <div onClick={previousTab}>Previous</div>
                    <button>Next</button>
                </div>
            </form>
        </div>
    );
}