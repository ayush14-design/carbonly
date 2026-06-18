import { describe, it, expect } from 'vitest';
import { calculateCarbonFootprint } from './carbonMath';

describe('calculateCarbonFootprint', () => {
  it('calculates the baseline correct value for an average user', () => {
    const result = calculateCarbonFootprint(300, 100, 1, 'Mixed', 'Occasional');
    // Elec: 300 * 12 * 0.4 / 1000 = 1.44
    // Vehicle: 100 * 52 * 0.2 / 1000 = 1.04
    // Flights: 1 * 0.25 = 0.25
    // Diet: Mixed = 2.5
    // Waste: Occasional = 0.5
    // Total = 1.44 + 1.04 + 0.25 + 2.5 + 0.5 = 5.73
    
    expect(result.total).toBeCloseTo(5.73);
    expect(result.safetyStatus.label).toBe('Average');
    expect(result.breakdown[0].label).toBe('Diet'); // Diet is 2.5, highest
  });

  it('assigns the correct safety status for a sustainable lifestyle', () => {
    const result = calculateCarbonFootprint(100, 0, 0, 'Vegan', 'Frequent');
    // Elec: 100 * 12 * 0.4 / 1000 = 0.48
    // Vehicle: 0
    // Flights: 0
    // Diet: Vegan = 1.5
    // Waste: Frequent = 0.3
    // Total = 0.48 + 0 + 0 + 1.5 + 0.3 = 2.28

    expect(result.total).toBeCloseTo(2.28);
    expect(result.safetyStatus.label).toBe('Safe / Sustainable');
  });

  it('assigns High Impact for heavy users', () => {
    const result = calculateCarbonFootprint(1000, 500, 10, 'Meat-heavy', 'Rarely');
    expect(result.total).toBeGreaterThan(6.0);
    expect(result.safetyStatus.label).toBe('High Impact');
  });

  it('sorts the breakdown correctly', () => {
    const result = calculateCarbonFootprint(300, 100, 1, 'Mixed', 'Occasional');
    expect(result.breakdown[0].value).toBeGreaterThanOrEqual(result.breakdown[1].value);
    expect(result.breakdown[1].value).toBeGreaterThanOrEqual(result.breakdown[2].value);
  });
});
