import {describe, expect, test} from '@jest/globals';
import rollRandomScore from '@/utils';

beforeEach(() => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
});

describe('Roll Random Score Function', () => {
  test('Use the function with random as 0.5, and expect result to be 12', () => {
    expect(rollRandomScore()).toBe(12);
  });
});
