import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card p-3 border-2 border-dark-600">
        <p className="text-sm font-semibold text-dark-100 mb-1">{label}</p>
        {payload.map((entry, i) => (
          <p key={i} className="text-sm font-bold" style={{ color: entry.color }}>
            {entry.name}: ₹{entry.value.toLocaleString('en-IN')}
          </p>
        ))}
      </div>
    );
  }
  return null;
};

/**
 * Monthly income vs expense bar chart (last 6 months).
 */
export default function MonthlyBarChart({ data = [] }) {
  if (!data.length) {
    return (
      <div className="flex items-center justify-center h-64 text-dark-400 text-sm font-semibold">
        No monthly data yet
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} barGap={4}>
        <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" vertical={false} />
        <XAxis
          dataKey="month"
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#1E293B', fontSize: 12, fontWeight: 600 }}
        />
        <YAxis
          axisLine={false}
          tickLine={false}
          tick={{ fill: '#1E293B', fontSize: 12, fontWeight: 600 }}
          tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
        />
        <Tooltip content={<CustomTooltip />} cursor={{ fill: 'rgba(139, 92, 246, 0.05)' }} />
        <Legend
          wrapperStyle={{ paddingTop: 16 }}
          formatter={(value) => (
            <span className="text-xs text-dark-100 font-bold uppercase tracking-wider">{value}</span>
          )}
        />
        <Bar
          dataKey="income"
          name="Income"
          fill="#34D399"
          radius={[0, 0, 0, 0]}
          maxBarSize={40}
          animationDuration={800}
        />
        <Bar
          dataKey="expense"
          name="Expense"
          fill="#F87171"
          radius={[0, 0, 0, 0]}
          maxBarSize={40}
          animationDuration={800}
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
