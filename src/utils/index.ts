import { AbilityScores, ApiClass, Item } from "@/types";

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

  export const calculateArmorClass = (className: string, abilities: AbilityScores, armor: number, shield: number): number => {
    let AC = 10;
    
    armor > 0 ? AC = armor : AC = 10;
    AC += shield;
    AC += calculateMiscArmorBonus(className, abilities);
    return AC;
  }

  export const calculateMiscArmorBonus = (className: string, abilities: AbilityScores): number => {
    if (className === "barbarian") return calculateAbilityModifier(abilities.CON);
    if (className === "monk") return calculateAbilityModifier(abilities.CON) + calculateAbilityModifier(abilities.WIS);
    return 0;
  }

  export const calculateSpeed = (strength: number, armor: Item | undefined, baseSpeed: number = 0): number => {
    if (!armor?.str_minimum) return baseSpeed;
    if (strength > armor?.str_minimum) return baseSpeed;
    return baseSpeed - 10;
  }

  export const calculateAttackBonus = (weapon: Item, abilities: AbilityScores, level: number, dndClass: ApiClass): number => {
    let attackBonus: number = 0;
    const hasWeaponProficiency = dndClass.proficiencies?.filter(({name}: {name: string}) => name === `${weapon.weapon_category} Weapons`).length || 0 > 0;
    const isFinesseWeapon = weapon.properties?.filter(({index}: {index: string}): boolean => index === "finesse" ).length || 0 > 0;

    if (hasWeaponProficiency) {
      attackBonus += calculateProfBonus(level);
    }
    if ((isFinesseWeapon && abilities.STR < abilities.DEX) || weapon.weapon_range === "Ranged") {
      attackBonus += calculateAbilityModifier(abilities.DEX);
    } else {
      attackBonus += calculateAbilityModifier(abilities.STR);
    } 
    
    return attackBonus;
  }

  export const calculateDamage = (weapon: Item, abilities: AbilityScores): number => {
    let damageBonus: number = 0;
    const isFinesseWeapon = weapon.properties?.filter(({index}: {index: string}): boolean => index === "finesse" ).length || 0 > 0;

    if ((isFinesseWeapon && abilities.STR < abilities.DEX ) || weapon.weapon_range === "Ranged") {
      damageBonus += calculateAbilityModifier(abilities.DEX);
    } else {
      damageBonus += calculateAbilityModifier(abilities.STR);
    } 
    
    return damageBonus;
  }