import { motion } from 'motion/react';

interface MeterProps {
  value: number;
}

export function Meter({ value }: MeterProps) {
  // Clamp value between 10 and 40 for display purposes
  const clampedValue = Math.min(Math.max(value, 10), 40);
  const percentage = ((clampedValue - 10) / (40 - 10)) * 100;

  return (
    <div className="w-full mt-6 space-y-2">
      <div className="flex justify-between text-xs text-gray-400 dark:text-gray-500 font-mono">
        <span>10</span>
        <span>18.5</span>
        <span>25</span>
        <span>30</span>
        <span>40</span>
      </div>
      
      <div className="relative h-4 w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
        {/* Gradient Background */}
        <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-blue-400 via-green-400 to-red-500 opacity-80" />
        
        {/* Marker */}
        <motion.div
          initial={{ left: '0%' }}
          animate={{ left: `${percentage}%` }}
          transition={{ type: 'spring', stiffness: 60, damping: 15 }}
          className="absolute top-0 bottom-0 w-1 bg-white shadow-[0_0_10px_rgba(0,0,0,0.5)] z-10 transform -translate-x-1/2"
        />
      </div>

      <div className="flex justify-between text-[10px] uppercase tracking-wider font-semibold text-gray-500 dark:text-gray-400">
        <span className="text-blue-500">Under</span>
        <span className="text-green-500 pl-8">Normal</span>
        <span className="text-yellow-500 pl-4">Over</span>
        <span className="text-red-500">Obese</span>
      </div>
    </div>
  );
}
