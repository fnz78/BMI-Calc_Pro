export type UnitSystem = 'metric' | 'imperial';

export interface BMIResult {
  bmi: number;
  category: 'Underweight' | 'Normal' | 'Overweight' | 'Obese';
  color: string;
  message: string;
}

export interface HistoryItem extends BMIResult {
  id: string;
  date: string;
  height: string;
  weight: string;
  unit: UnitSystem;
}

export const calculateBMI = (
  height: number,
  weight: number,
  unit: UnitSystem
): BMIResult | null => {
  if (height <= 0 || weight <= 0) return null;

  let bmi = 0;

  if (unit === 'metric') {
    // height in cm, weight in kg
    const heightInMeters = height / 100;
    bmi = weight / (heightInMeters * heightInMeters);
  } else {
    // height in inches, weight in lbs
    // Formula: 703 * weight (lbs) / [height (in)]^2
    bmi = (703 * weight) / (height * height);
  }

  bmi = parseFloat(bmi.toFixed(1));

  let category: BMIResult['category'] = 'Normal';
  let color = 'text-green-500';
  let message = 'You have a healthy weight. Keep it up!';

  if (bmi < 18.5) {
    category = 'Underweight';
    color = 'text-blue-500';
    message = 'You are underweight. Consider consulting a nutritionist.';
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Normal';
    color = 'text-green-500';
    message = 'You have a healthy weight. Great job!';
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Overweight';
    color = 'text-yellow-500';
    message = 'You are slightly overweight. Exercise and diet may help.';
  } else {
    category = 'Obese';
    color = 'text-red-500';
    message = 'You are in the obese range. Please consult a healthcare provider.';
  }

  return { bmi, category, color, message };
};
