import { describe, expect, it } from 'vitest';
import { legalContribution, calculateBalance, canSelectPlan } from '@/lib/health-plans';
describe('Health estimation rules', () => {
 it('uses the requested legal 7% contribution', () => { expect(legalContribution(1500000)).toBe(105000); });
 it('calculates a positive balance including GES for every person', () => { expect(calculateBalance(150000, 2, .5, 2, 40000)).toEqual({ cost: 120000, surplus: 30000, additional: 0 }); });
 it('calculates the additional payment when the plan exceeds the contribution', () => { expect(calculateBalance(100000, 2, .5, 2, 40000)).toEqual({ cost: 120000, surplus: 0, additional: 20000 }); });
 it('limits comparison to the requested three plans', () => { expect(canSelectPlan(['a', 'b', 'c'], 'd')).toBe(false); expect(canSelectPlan(['a', 'b', 'c'], 'a')).toBe(true); expect(canSelectPlan(['a', 'b'], 'c')).toBe(true); });
});