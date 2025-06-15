// src/features/connected-learning/components/LearningInfographic.tsx
'use client';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { BarChart, Bar, PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { BookOpen, PieChart as PieIcon, Activity } from 'lucide-react'; // Icons

export interface InfographicData {
  studentName: string;
  timePerSubject: Array<{ name: string; time: number }>; // time in minutes or hours
  topicDistribution: Array<{ name: string; value: number }>; // value could be tasks completed or time spent
  progressOverTime: Array<{ date: string; score: number }>; // score 0-100
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#AF19FF', '#FF4560'];

interface LearningInfographicProps {
  infographicData: InfographicData;
}

export default function LearningInfographic({ infographicData }: LearningInfographicProps) {
  return (
    <Card className="w-full shadow-lg overflow-hidden">
      <CardHeader className="bg-primary/10">
        <CardTitle className="text-2xl">Learning Infographic: {infographicData.studentName}</CardTitle>
        <CardDescription>A visual summary of learning activities and progress.</CardDescription>
      </CardHeader>
      <CardContent className="p-6 grid md:grid-cols-2 gap-8">
        {/* Time Spent Per Subject */}
        <div className="h-80">
          <h3 className="text-lg font-semibold mb-3 flex items-center"><BookOpen className="mr-2 h-5 w-5 text-primary" />Time Spent Per Subject (hours)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={infographicData.timePerSubject} layout="vertical" margin={{ top: 5, right: 20, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" />
              <YAxis dataKey="name" type="category" width={80} />
              <Tooltip formatter={(value: number) => `${value} hrs`} />
              <Legend />
              <Bar dataKey="time" fill={COLORS[0]} barSize={20} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Topic Distribution */}
        <div className="h-80">
          <h3 className="text-lg font-semibold mb-3 flex items-center"><PieIcon className="mr-2 h-5 w-5 text-primary" />Topic Distribution (Tasks)</h3>
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={infographicData.topicDistribution}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                outerRadius={90}
                fill="#8884d8"
                dataKey="value"
              >
                {infographicData.topicDistribution.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[(index + 1) % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number, name: string) => [`${value} tasks`, name]}/>
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Progress Over Time - Full Width for better display */}
        <div className="h-80 md:col-span-2">
          <h3 className="text-lg font-semibold mb-3 flex items-center"><Activity className="mr-2 h-5 w-5 text-primary" />Overall Progress Over Time</h3>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={infographicData.progressOverTime} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis domain={[0, 100]} />
              <Tooltip formatter={(value: number) => [`${value}%`, "Score"]}/>
              <Legend />
              <Line type="monotone" dataKey="score" stroke={COLORS[2]} strokeWidth={2} activeDot={{ r: 8 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
