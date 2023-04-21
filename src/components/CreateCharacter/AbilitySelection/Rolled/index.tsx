import { AbilityScores } from "@/types";
import { ABILITIES } from "@/constants";

export const rollRandomScore = (): number => {
    let diceRolls: number[] = [];
    for (let i=1; i <= 4; i++) {
        diceRolls.push(Math.floor(Math.random() * 6 + 1));
    }

    // sort and remove lowest roll
    diceRolls.sort().pop();
    return diceRolls.reduce((acc: number, current: number) => acc + current, 0);
}

export default function RolledAbilityScores(): JSX.Element {
    return (
        <div>
            { 
                ABILITIES.map((ability: string) => 
                    (
                        <div>
                            <div><h3>{ ability }</h3></div>
                            <div><button>Roll</button></div>
                        </div>
                    )
                )
            }
        </div>
    );
}