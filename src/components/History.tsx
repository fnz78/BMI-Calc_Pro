import { Trash2 } from 'lucide-react';
import { HistoryItem } from '../utils/bmi';

interface HistoryProps {
  history: HistoryItem[];
  onClear: () => void;
}

export function History({ history, onClear }: HistoryProps) {
  if (history.length === 0) {
    return (
      <div className="text-center text-gray-500 dark:text-gray-400 py-8">
        No history yet. Calculate your BMI to see results here.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200">
          Recent Calculations
        </h3>
        <button
          onClick={onClear}
          className="text-sm text-red-500 hover:text-red-600 flex items-center gap-1 transition-colors"
        >
          <Trash2 size={14} />
          Clear All
        </button>
      </div>

      <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
        {history.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg border border-gray-100 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-gray-900 dark:text-gray-100">
                  {item.bmi}
                </span>
                <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                  item.category === 'Normal' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-300' :
                  item.category === 'Overweight' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-300' :
                  item.category === 'Underweight' ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' :
                  'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-300'
                }`}>
                  {item.category}
                </span>
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                {new Date(item.date).toLocaleDateString()} • {item.height} {item.unit === 'metric' ? 'cm' : 'in'}, {item.weight} {item.unit === 'metric' ? 'kg' : 'lbs'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
