export const calculateAbilityBuyCost = (abilityScore: number): number | null => {
    if (abilityScore < 8 || abilityScore > 15) return null;
    if (abilityScore < 14) return abilityScore - 8;
    if (abilityScore < 15 )return abilityScore - 7;
    return abilityScore - 6;
}

export const rollRandomScore = (): number => {
    let diceRolls: number[] = [];
    for (let i=1; i <= 4; i++) {
        diceRolls.push(Math.floor(Math.random() * 6) + 1);
    }

    // sort descending and remove lowest roll
    diceRolls.sort((a: number, b: number): number => b - a).pop();
    return diceRolls.reduce((acc: number, current: number) => acc + current, 0);
}

export const formatAttribute = (attr: string): string => {
    switch (attr) {
      case "STR":
        return "Strength";
      case "DEX":
        return "Dexterity";
      case "CON":
        return "Constitution";
      case "INT":
        return "Intellect";
      case "WIS":
        return "Wisdom";
      case "CHA":
        return "Charisma";
      default:
        return "";
    }
  };