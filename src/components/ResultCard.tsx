import { motion } from 'motion/react';
import { BMIResult } from '../utils/bmi';
import { cn } from '../utils/cn';

interface ResultCardProps {
  result: BMIResult;
  onReset: () => void;
}

export function ResultCard({ result, onReset }: ResultCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Underweight':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-300 border-blue-200 dark:border-blue-800';
      case 'Normal':
        return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 border-green-200 dark:border-green-800';
      case 'Overweight':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-300 border-yellow-200 dark:border-yellow-800';
      case 'Obese':
        return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-300 border-red-200 dark:border-red-800';
      default:
        return 'bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300 border-gray-200 dark:border-gray-700';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      className="w-full bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 border border-gray-100 dark:border-gray-700"
    >
      <div className="text-center space-y-4">
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-400">
          Your BMI Result
        </h3>
        
        <div className="relative inline-block">
          <span className="text-6xl font-bold text-gray-900 dark:text-white tracking-tight">
            {result.bmi}
          </span>
        </div>

        <div
          className={cn(
            'inline-block px-4 py-1.5 rounded-full text-sm font-semibold border',
            getCategoryColor(result.category)
          )}
        >
          {result.category}
        </div>

        <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed max-w-xs mx-auto">
          {result.message}
        </p>

        <button
          onClick={onReset}
          className="mt-4 text-sm text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 underline decoration-dotted underline-offset-4 transition-colors"
        >
          Calculate Again
        </button>
      </div>
    </motion.div>
  );
}
