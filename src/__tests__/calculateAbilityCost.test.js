import {describe, expect, test} from '@jest/globals';
import { calculateAbilityBuyCost } from '@/utils';

describe('Calculate Ability Cost function', () => {
  test('Calculate Ability to return null when score too low', () => {
    expect(calculateAbilityBuyCost(6)).toBe(null);
  });
  test('Calculate Ability to return 0 when score 8', () => {
    expect(calculateAbilityBuyCost(8)).toBe(0);
  });
  test('Calculate Ability to return 2 when score 10', () => {
    expect(calculateAbilityBuyCost(10)).toBe(2);
  });
  test('Calculate Ability to return 4 when score 12', () => {
    expect(calculateAbilityBuyCost(12)).toBe(4);
  });
  test('Calculate Ability to return 7 when score 14', () => {
    expect(calculateAbilityBuyCost(14)).toBe(7);
  });
  test('Calculate Ability to return 9 when score 15', () => {
    expect(calculateAbilityBuyCost(15)).toBe(9);
  });
  test('Calculate Ability to return null when score too high', () => {
    expect(calculateAbilityBuyCost(17)).toBe(null);
  });
});