import {describe, expect, test} from '@jest/globals';
import { calculateHP } from '@/utils';

describe('Calculate Hitpoints', () => {
  test('Expect Calculate Hitpoints to return 0 when when hitDie is undefined and con mod is 0', () => {
    expect(calculateHP(undefined, 2, 0)).toBe(0);
  });
  test('Expect Calculate Hitpoints to return 12 when hitDie is 12 and level is 1 and con mod is 0', () => {
    expect(calculateHP(12, 1, 0)).toBe(12);
  });
  test('Expect Calculate Hitpoints to return 12 when hitDie is 12 and level is 1 and con mod is 1', () => {
    expect(calculateHP(12, 1, 1)).toBe(13);
  });
  test('Expect Calculate Hitpoints to return 19 when hitDie is 12 and level is 2 and con mod is 2', () => {
    expect(calculateHP(12, 2, 2)).toBe(23);
  });
  test('Expect Calculate Hitpoints to return 28 when hitDie is 8 and level is 5 and con mod is 3', () => {
    expect(calculateHP(8, 5, 3)).toBe(43);
  });
  test('Expect Calculate Hitpoints to return 46 when hitDie is 6 and level is 11 and con mod is 1', () => {
    expect(calculateHP(6, 11, 1)).toBe(57);
  });
  test('Expect Calculate Hitpoints to return 22 when hitDie is 4 and level is 7 and con mod is 2', () => {
    expect(calculateHP(4, 7, 2)).toBe(36);
  });
  test('Expect Calculate Hitpoints to return 100 when hitDie is 10 and level is 16 and con mod is -1', () => {
    expect(calculateHP(10, 16, -1)).toBe(84);
  });
});