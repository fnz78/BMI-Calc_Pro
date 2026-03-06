import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const data = [
  { name: 'Underweight', range: '< 18.5', min: 0, max: 18.5, color: '#60a5fa' },
  { name: 'Normal', range: '18.5 - 24.9', min: 18.5, max: 24.9, color: '#4ade80' },
  { name: 'Overweight', range: '25 - 29.9', min: 25, max: 29.9, color: '#facc15' },
  { name: 'Obese', range: '30+', min: 30, max: 40, color: '#f87171' },
];

export function ReferenceChart() {
  return (
    <div className="w-full h-64 mt-8">
      <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
        BMI Categories Reference
      </h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          layout="vertical"
          margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#374151" opacity={0.2} />
          <XAxis type="number" hide />
          <YAxis
            dataKey="name"
            type="category"
            width={80}
            tick={{ fontSize: 12, fill: '#6b7280' }}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1f2937',
              border: 'none',
              borderRadius: '8px',
              color: '#f3f4f6',
            }}
            cursor={{ fill: 'transparent' }}
          />
          <Bar dataKey="max" radius={[0, 4, 4, 0]} barSize={20}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
