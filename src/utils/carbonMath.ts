export type BreakdownItem = {
  label: string;
  value: number;
  color: string;
};

export type SafetyStatus = {
  label: string;
  color: string;
};

export type CalculatorResult = {
  total: number;
  breakdown: BreakdownItem[];
  suggestion: string;
  safetyStatus: SafetyStatus;
};

export function calculateCarbonFootprint(
  electricity: number, 
  vehicleKm: number, 
  flights: number, 
  diet: string, 
  waste: string
): CalculatorResult {
  const elecTons = (electricity * 12 * 0.4) / 1000;
  const vehicleTons = (vehicleKm * 52 * 0.2) / 1000;
  const flightTons = flights * 0.25;
  
  let dietTons = 2.5;
  if (diet === 'Vegan') dietTons = 1.5;
  if (diet === 'Vegetarian') dietTons = 1.7;
  if (diet === 'Meat-heavy') dietTons = 3.3;

  let wasteTons = 0.5;
  if (waste === 'Frequent') wasteTons = 0.3;
  if (waste === 'Rarely') wasteTons = 0.8;

  const total = elecTons + vehicleTons + flightTons + dietTons + wasteTons;
  
  const breakdown: BreakdownItem[] = [
    { label: 'Energy', value: elecTons, color: 'bg-yellow-400' },
    { label: 'Transport', value: vehicleTons, color: 'bg-blue-400' },
    { label: 'Flights', value: flightTons, color: 'bg-sky-400' },
    { label: 'Diet', value: dietTons, color: 'bg-green-400' },
    { label: 'Waste', value: wasteTons, color: 'bg-orange-400' },
  ].sort((a, b) => b.value - a.value);

  let suggestion = "Great job! Your footprint is low.";
  if (breakdown[0].label === 'Diet') suggestion = "Consider swapping out 2 meat meals a week for plant-based alternatives to drastically cut your dietary footprint.";
  if (breakdown[0].label === 'Energy') suggestion = "Look into smart thermostats or renewable energy suppliers in your area.";
  if (breakdown[0].label === 'Transport') suggestion = "Could you replace 1 drive a week with public transit or biking?";
  if (breakdown[0].label === 'Flights') suggestion = "Flights are a massive contributor. Consider offsetting flights or taking trains for regional travel.";

  let safetyStatus: SafetyStatus = { label: "High Impact", color: "text-red-400 border-red-400/30 bg-red-400/10" };
  if (total <= 2.5) safetyStatus = { label: "Safe / Sustainable", color: "text-green-400 border-green-400/30 bg-green-400/10" };
  else if (total <= 6.0) safetyStatus = { label: "Average", color: "text-yellow-400 border-yellow-400/30 bg-yellow-400/10" };

  return { total, breakdown, suggestion, safetyStatus };
}
