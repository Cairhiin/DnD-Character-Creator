import {describe, expect, test} from '@jest/globals';
import { rollRandomScore } from '@/components/CreateCharacter/AbilitySelection/RolledAbilityScores';

beforeEach(() => {
  jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
});


describe('roll random score function', () => {
  test('Roll four dice and drop lowest', () => {
    expect(rollRandomScore()).toBe(12);
  });
});