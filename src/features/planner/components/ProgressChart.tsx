// src/features/planner/components/ProgressChart.tsx
'use client'; // Recharts components are client-side

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export interface ProgressData {
  name: string; // Subject name or overall
  progress: number; // Percentage 0-100
}

interface ProgressChartProps {
  data: ProgressData[];
  chartType?: 'bar' | 'pie';
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

export default function ProgressChart({ data, chartType = 'bar' }: ProgressChartProps) {
  if (!data || data.length === 0) {
    return <p className="text-muted-foreground">進捗データがまだありません。</p>;
  }

  return (
    <div className="p-4 border rounded-lg shadow-sm bg-card h-80"> {/* Fixed height for chart container */}
      <h3 className="text-lg font-semibold mb-3 text-card-foreground">あなたの進捗</h3>
      <ResponsiveContainer width="100%" height="100%">
        {chartType === 'bar' ? (
          <BarChart data={data} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}> {/* Adjusted margins */}
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="progress" fill="#8884d8" />
          </BarChart>
        ) : (
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="45%" // Adjusted to prevent label cutoff
              labelLine={false}
              label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="progress"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}
