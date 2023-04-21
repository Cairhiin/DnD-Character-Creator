import styles from '@/styles/CreateCharacter/CharacterForm.module.scss';

interface StandardArrayProps {
    abilityScore: string;
    register: (e: any) => any;
    watch: (e: any) => any;
}

export default function StandardArray({ abilityScore, register, watch  }: StandardArrayProps) {
    const standardArray = [8, 10, 12, 13, 14, 15]; 
    const val = register(abilityScore)
    const ability = watch(val);
    return (
        <select 
            className={styles.create__form__abilities__dropdown}
            {...register(abilityScore)} 
            onChange={(e) => console.log(ability)}
        >
            { Object.values(standardArray)
                .map((value: number, index: number): JSX.Element => <option key={index} value={value}>{value}</option>) } 
        </select>
    )
};