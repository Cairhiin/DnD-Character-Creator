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
        return "Intelligence";
      case "WIS":
        return "Wisdom";
      case "CHA":
        return "Charisma";
      default:
        return "";
    }
  };

  export const calculateAbilityModifier = (abilityScore: number): number => {
    if (abilityScore > 25) return 7
    if (abilityScore <= 1) return -5
    return Math.floor((abilityScore - 10) / 2);
  }

  export const cleanUpSkillDescription = (skill: string): string => {
    return skill.substring(7, skill.length);
  }

  export const calculateHP = (hitDie: number | undefined, level: number, conModifier: number): number => {
    if (hitDie === undefined) return 0;
    return hitDie + (Math.ceil((hitDie + 1) / 2) * (level - 1)) + (level * conModifier);
  }

  export const calculateProfBonus = (level: number): number => {
    return Math.floor((level - 1) / 4) + 2;
  }