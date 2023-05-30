import { describe, expect, test } from '@jest/globals';
import { calculateProfBonus } from '@/utils';

describe('Calculate Proficiency Bonus', () => {
  test('Expect Calculate Proficiency to return 2 when level is 1', () => {
    expect(calculateProfBonus(1)).toBe(2);
  });
  test('Expect Calculate Proficiency to return 2 when level is 4', () => {
    expect(calculateProfBonus(4)).toBe(2);
  });
  test('Expect Calculate Proficiency to return 3 when level is 5', () => {
    expect(calculateProfBonus(5)).toBe(3);
  });
  test('Expect Calculate Proficiency to return 3 when level is 8', () => {
    expect(calculateProfBonus(8)).toBe(3);
  });
  test('Expect Calculate Proficiency to return 4 when level is 9', () => {
    expect(calculateProfBonus(9)).toBe(4);
  });
  test('Expect Calculate Proficiency to return 5 when level is 15', () => {
    expect(calculateProfBonus(15)).toBe(5);
  });
  test('Expect Calculate Proficiency to return 6 when level is 19', () => {
    expect(calculateProfBonus(19)).toBe(6);
  });
  test('Expect Calculate Proficiency to return 6 when level is 20', () => {
    expect(calculateProfBonus(20)).toBe(6);
  });
});