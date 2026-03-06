/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { AnimatePresence, motion } from 'motion/react';
import { useEffect, useState } from 'react';
import { History } from './components/History';
import { InputGroup } from './components/InputGroup';
import { Meter } from './components/Meter';
import { ReferenceChart } from './components/ReferenceChart';
import { ResultCard } from './components/ResultCard';
import { ThemeToggle } from './components/ThemeToggle';
import { BMIResult, calculateBMI, HistoryItem, UnitSystem } from './utils/bmi';
import { cn } from './utils/cn';
import { Ruler, Weight, RotateCcw, Calculator } from 'lucide-react';

export default function App() {
  const [unit, setUnit] = useState<UnitSystem>('metric');
  const [height, setHeight] = useState('');
  const [weight, setWeight] = useState('');
  const [heightFt, setHeightFt] = useState('');
  const [heightIn, setHeightIn] = useState('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState('');
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const savedHistory = localStorage.getItem('bmiHistory');
    if (savedHistory) {
      setHistory(JSON.parse(savedHistory));
    }
  }, []);

  const handleCalculate = () => {
    setError('');
    let h = 0;
    let w = parseFloat(weight);

    if (unit === 'metric') {
      h = parseFloat(height);
      if (!height || !weight) {
        setError('Please enter both height and weight.');
        return;
      }
    } else {
      const ft = parseFloat(heightFt || '0');
      const inch = parseFloat(heightIn || '0');
      h = ft * 12 + inch;
      w = parseFloat(weight); // weight is in lbs

      if ((!heightFt && !heightIn) || !weight) {
        setError('Please enter height and weight.');
        return;
      }
    }

    if (h <= 0 || w <= 0) {
      setError('Values must be greater than zero.');
      return;
    }

    const bmiResult = calculateBMI(h, w, unit);

    if (bmiResult) {
      setResult(bmiResult);
      const newHistoryItem: HistoryItem = {
        ...bmiResult,
        id: Date.now().toString(),
        date: new Date().toISOString(),
        height: unit === 'metric' ? `${h}` : `${heightFt}'${heightIn}"`,
        weight: `${w}`,
        unit,
      };
      const newHistory = [newHistoryItem, ...history].slice(0, 10); // Keep last 10
      setHistory(newHistory);
      localStorage.setItem('bmiHistory', JSON.stringify(newHistory));
    }
  };

  const handleReset = () => {
    setHeight('');
    setWeight('');
    setHeightFt('');
    setHeightIn('');
    setResult(null);
    setError('');
  };

  const clearHistory = () => {
    setHistory([]);
    localStorage.removeItem('bmiHistory');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-300 font-sans text-gray-900 dark:text-gray-100 p-4 sm:p-8">
      <div className="max-w-5xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-600 rounded-lg shadow-lg shadow-indigo-500/30">
              <Calculator className="text-white w-6 h-6" />
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400">
              BMI Pro
            </h1>
          </div>
          <ThemeToggle />
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Calculator Card */}
          <div className="lg:col-span-7 space-y-6">
            <motion.div
              layout
              className="bg-white dark:bg-gray-800 rounded-3xl shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden"
            >
              <div className="p-6 sm:p-8">
                {/* Unit Toggle */}
                <div className="flex bg-gray-100 dark:bg-gray-700/50 p-1 rounded-xl mb-8 w-full sm:w-fit">
                  {(['metric', 'imperial'] as const).map((u) => (
                    <button
                      key={u}
                      onClick={() => {
                        setUnit(u);
                        handleReset();
                      }}
                      className={cn(
                        'flex-1 sm:flex-none px-6 py-2 rounded-lg text-sm font-medium transition-all duration-200 capitalize',
                        unit === u
                          ? 'bg-white dark:bg-gray-600 text-indigo-600 dark:text-indigo-300 shadow-sm'
                          : 'text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200'
                      )}
                    >
                      {u}
                    </button>
                  ))}
                </div>

                <div className="space-y-6">
                  {/* Height Input */}
                  <div className="space-y-4">
                    {unit === 'metric' ? (
                      <InputGroup
                        label="Height"
                        value={height}
                        onChange={setHeight}
                        unit="cm"
                        placeholder="e.g. 175"
                        icon={<Ruler size={18} className="text-indigo-500" />}
                      />
                    ) : (
                      <div className="flex gap-4">
                        <InputGroup
                          label="Height (ft)"
                          value={heightFt}
                          onChange={setHeightFt}
                          unit="ft"
                          placeholder="5"
                          icon={<Ruler size={18} className="text-indigo-500" />}
                        />
                        <InputGroup
                          label="(in)"
                          value={heightIn}
                          onChange={setHeightIn}
                          unit="in"
                          placeholder="9"
                        />
                      </div>
                    )}
                  </div>

                  {/* Weight Input */}
                  <InputGroup
                    label="Weight"
                    value={weight}
                    onChange={setWeight}
                    unit={unit === 'metric' ? 'kg' : 'lbs'}
                    placeholder={unit === 'metric' ? 'e.g. 70' : 'e.g. 154'}
                    icon={<Weight size={18} className="text-indigo-500" />}
                  />

                  {error && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      className="text-red-500 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-100 dark:border-red-800/30"
                    >
                      {error}
                    </motion.div>
                  )}

                  <div className="pt-4 flex gap-3">
                    <button
                      onClick={handleCalculate}
                      className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-xl shadow-lg shadow-indigo-500/30 transition-all duration-200 transform hover:-translate-y-0.5 active:translate-y-0"
                    >
                      Calculate BMI
                    </button>
                    <button
                      onClick={handleReset}
                      className="p-3 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-xl transition-colors"
                      aria-label="Reset"
                    >
                      <RotateCcw size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>

            {/* Result Section */}
            <AnimatePresence mode="wait">
              {result && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="space-y-6"
                >
                  <ResultCard result={result} onReset={handleReset} />
                  <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg border border-gray-100 dark:border-gray-700">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-4">
                      Where you stand
                    </h3>
                    <Meter value={result.bmi} />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar: History & Chart */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
              <History history={history} onClear={clearHistory} />
            </div>
            
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-lg border border-gray-100 dark:border-gray-700 p-6">
              <ReferenceChart />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

