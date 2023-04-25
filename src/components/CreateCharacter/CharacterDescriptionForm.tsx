import { useForm, SubmitHandler } from 'react-hook-form';
import styles from '@/styles/CreateCharacter/CharacterForm.module.scss';

interface Props {
    nextTab: () => void
    previousTab: () => void
};

interface DescriptionFormInput {
    name: string;
};

export default function CharacterDescription ({ nextTab, previousTab }: Props) {
    const {
        handleSubmit,
        register,
        formState: { errors },
    } = useForm({ defaultValues: { name: "" }, mode: "onSubmit" });

    // Save the form state to Zustand and go to next tab
    const saveData: SubmitHandler<DescriptionFormInput> = ({  }): void => {
        nextTab();
    };

    return (
        <div>
            <h2>Description</h2>
            <form className={styles.create__form__ability_score} onSubmit={handleSubmit(saveData)}>

            </form>
        </div>
    );
}