import {describe, expect, test} from '@jest/globals';
import { calculateHP } from '@/utils';

describe('Calculate Hitpoints', () => {
  test('Calculate Hitpoints to return 0 when when hitDie is undefined', () => {
    expect(calculateHP(undefined, 2)).toBe(0);
  });
  test('Calculate Hitpoints to return 12 when hitDie is 12 and level is 1', () => {
    expect(calculateHP(12, 1)).toBe(12);
  });
  test('Calculate Hitpoints to return 19 when hitDie is 12 and level is 2', () => {
    expect(calculateHP(12, 2)).toBe(19);
  });
  test('Calculate Hitpoints to return 28 when hitDie is 8 and level is 5', () => {
    expect(calculateHP(8, 5)).toBe(28);
  });
  test('Calculate Hitpoints to return 46 when hitDie is 6 and level is 11', () => {
    expect(calculateHP(6, 11)).toBe(46);
  });
  test('Calculate Hitpoints to return 22 when hitDie is 4 and level is 7', () => {
    expect(calculateHP(4, 7)).toBe(22);
  });
  test('Calculate Hitpoints to return 100 when hitDie is 10 and level is 16', () => {
    expect(calculateHP(10, 16)).toBe(100);
  });
});