import {
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border-2 border-dark-600">
        <p className="text-sm text-dark-400 mb-1">{label}</p>
        <p className="text-sm font-bold text-primary-600">
          ₹{payload[0].value.toLocaleString('en-IN')}
        </p>
      </div>
    );
  }
  return null;
};

/**
 * Daily expense trend line chart (last 30 days).
 */
export default function ExpenseTrendChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-64 text-dark-400 text-sm font-semibold">
        No trend data yet
      </div>
    );
  }

  // Format dates to shorter labels
  const formattedData = data.map((d) => ({
    ...d,
    label: new Date(d.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric' }),
  }));

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={formattedData}>
        <defs>
          <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8B5CF6" stopOpacity={0.3} />
            <stop offset="95%" stopColor="#8B5CF6" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
        <XAxis
          dataKey="label"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#1E293B', fontSize: 11, fontWeight: 600 }}
          interval="preserveStartEnd"
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#1E293B', fontSize: 12, fontWeight: 600 }}
          tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} />
        <Line
          type="monotone"
          dataKey="amount"
          stroke="#8B5CF6"
          strokeWidth={2.5}
          dot={false}
          activeDot={{
            r: 5,
            fill: '#8B5CF6',
            stroke: '#FAF3E0',
            strokeWidth: 2,
          }}
          animationDuration={1200}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
