import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="glass-card p-3 !rounded-lg border border-dark-600">
        <p className="text-sm font-semibold text-dark-100">{data.name}</p>
        <p className="text-sm text-dark-400">
          ₹{data.value.toLocaleString('en-IN')} ({data.payload.percentage}%)
        </p>
      </div>
    );
  }
  return null;
};

const CustomLegend = ({ payload }) => (
  <div className="flex flex-wrap gap-3 justify-center mt-4">
    {payload?.map((entry, index) => (
      <div key={index} className="flex items-center gap-1.5 text-xs text-dark-300">
        <span
          className="w-2.5 h-2.5 rounded-full"
          style={{ backgroundColor: entry.color }}
        />
        {entry.value}
      </div>
    ))}
  </div>
);

/**
 * Spending by category pie chart.
 */
export default function SpendingPieChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-64 text-dark-500 text-sm">
        No expense data yet
      </div>
    );
  }

  const total = data.reduce((sum, d) => sum + d.total, 0);
  const chartData = data.map((d) => ({
    name: d.name,
    value: d.total,
    color: d.color,
    percentage: total > 0 ? ((d.total / total) * 100).toFixed(1) : 0,
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={chartData}
          cx="50%"
          cy="45%"
          innerRadius={60}
          outerRadius={100}
          paddingAngle={3}
          dataKey="value"
          stroke="none"
          animationBegin={0}
          animationDuration={800}
        >
          {chartData.map((entry, index) => (
            <Cell key={index} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
      </PieChart>
    </ResponsiveContainer>
  );
}
