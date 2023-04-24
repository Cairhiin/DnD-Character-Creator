import {describe, expect, test} from '@jest/globals';
import { rollRandomScore } from '@/utils';

beforeEach(() => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.9);
});

afterEach(() => {
  jest.spyOn(global.Math, 'random').mockRestore();
})

describe('Roll Random Score Function', () => {
  test('Use the function with random as 0.9, and expect result to be 18', () => {
    expect(rollRandomScore()).toBe(18);
  });
});
