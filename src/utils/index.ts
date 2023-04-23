export const calculateAbilityBuyCost = (abilityScore: number): number | null => {
    if (abilityScore < 8 || abilityScore > 15) return null;
    if (abilityScore < 14) return abilityScore - 8;
    if (abilityScore < 15 )return abilityScore - 7;
    return abilityScore - 6;
}