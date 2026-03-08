"use client";

import {
  PolarAngleAxis,
  PolarGrid,
  PolarRadiusAxis,
  Radar,
  RadarChart,
  ResponsiveContainer,
} from "recharts";
import type { EmployeeStats } from "@/data/employees";

const statLabels: Record<keyof EmployeeStats, string> = {
  analysis: "分析力",
  creativity: "創造力",
  execution: "実行力",
  communication: "対話力",
  expertise: "専門性",
};

export default function StatsRadar({ stats }: { stats: EmployeeStats }) {
  const data = (Object.keys(statLabels) as (keyof EmployeeStats)[]).map((key) => ({
    label: statLabels[key],
    value: stats[key],
  }));

  return (
    <ResponsiveContainer width="100%" height={280}>
      <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
        <PolarGrid stroke="#ffd70040" />
        <PolarAngleAxis
          dataKey="label"
          tick={{ fill: "#ffd700", fontSize: 11, fontFamily: "DotGothic16, sans-serif" }}
        />
        <PolarRadiusAxis
          angle={90}
          domain={[0, 10]}
          tick={{ fill: "#ffffff80", fontSize: 9 }}
          axisLine={false}
        />
        <Radar
          dataKey="value"
          stroke="#22c55e"
          fill="#22c55e"
          fillOpacity={0.3}
          strokeWidth={2}
        />
      </RadarChart>
    </ResponsiveContainer>
  );
}
