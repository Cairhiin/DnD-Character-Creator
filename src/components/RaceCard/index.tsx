import styles from '@/styles/RaceCard.module.scss';
import { Race, Ability, Language, Trait } from '@/types/';

type Props = {
    race: Race
}

const RaceCard = ({ race }: Props): JSX.Element => {
    const { 
        name, speed, ability_bonuses, alignment, 
        age, size, size_description, languages, language_desc, traits 
    }: {
        name: string, speed: number, ability_bonuses: Array<Ability>, 
        alignment: string, age: string, size: string, size_description: string, 
        languages: Array<Language>, language_desc: string, traits: Array<Trait>
    } = race;
    return (
        <div className={styles.create__raceComponent}>
            <h2>{ name }</h2>
            <p>{ name } Traits: { traits.map((trait: Trait): JSX.Element => <span key={trait.name}>{ trait.name } </span>) }</p>
            <div className={styles.racial__traits}>
              <div className={styles.racial__traits__score}>
                <h4>Ability Score Increase</h4>
                <p>
                    { ability_bonuses.map((ability: Ability): JSX.Element => 
                        <span key={ability.ability_score.name}>{ ability.ability_score.name } +{ ability.bonus }</span>
                    )}
                </p>
              </div>
              <div className={styles.racial__traits__other}>
                <h4>Age</h4>
                <p>{ age }</p>
              </div>
              <div className={styles.racial__traits__other}>
                <h4>Alignment</h4>
                <p>{ alignment }</p>
              </div>
              <div className={styles.racial__traits__other}>
                <h4>Size</h4>
                <p>{ size_description }</p>
              </div>
              <div className={styles.racial__traits__other}>
                <h4>Speed</h4>
                <p>Your base walking speed is { speed } feet.</p>
              </div>
              <div className={styles.racial__traits__other}>
                <h4>Languages</h4>
                <p>{ language_desc }</p>
              </div>
            </div>
          </div>
    );
};

export default RaceCard;