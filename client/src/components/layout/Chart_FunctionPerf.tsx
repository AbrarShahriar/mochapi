"use client";

import React, { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";
import {
  Clock,
  Minimize2,
  Maximize2,
  CodeSquare,
  Binary,
  Database,
} from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "../ui/card";
import { capitalize } from "@/lib/utils";
import NoData from "./NoData";

const CustomTooltip = ({
  active,
  payload,
  label,
}: {
  active?: boolean;
  payload?: Array<{
    value: number;
    payload: {
      codeSize: number;
      operatorCount: number;
      variabilityIndex: number;
    };
  }>;
  label?: string;
}) => {
  if (!active || !payload || !payload.length) return null;

  return (
    <div className="bg-zinc-900 border border-zinc-700 rounded-lg p-4 shadow-lg">
      <h3 className="font-bold text-zinc-100 mb-2">{label}</h3>
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-sm">
          <Clock className="w-4 h-4 text-blue-400" />
          <span className="text-zinc-300">Avg:</span>
          <span className="text-blue-400 font-mono">
            {payload[0].value.toFixed(6)} ms
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Minimize2 className="w-4 h-4 text-green-400" />
          <span className="text-zinc-300">Min:</span>
          <span className="text-green-400 font-mono">
            {payload[1].value.toFixed(6)} ms
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Maximize2 className="w-4 h-4 text-orange-400" />
          <span className="text-zinc-300">Max:</span>
          <span className="text-orange-400 font-mono">
            {payload[2].value.toFixed(6)} ms
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <CodeSquare className="w-4 h-4 text-purple-400" />
          <span className="text-zinc-300">Size:</span>
          <span className="text-purple-400 font-mono">
            {payload[0].payload.codeSize} bytes
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Binary className="w-4 h-4 text-pink-400" />
          <span className="text-zinc-300">Operators:</span>
          <span className="text-pink-400 font-mono">
            {payload[0].payload.operatorCount}
          </span>
        </div>
        <div className="flex items-center gap-2 text-sm">
          <Database className="w-4 h-4 text-yellow-400" />
          <span className="text-zinc-300">Variability:</span>
          <span className="text-yellow-400 font-mono">
            {payload[0].payload.variabilityIndex.toFixed(3)}
          </span>
        </div>
      </div>
    </div>
  );
};

interface Props {
  data: Array<{ name: string; functionBody: string }>;
  title: string;
  desc?: string;
}

const FunctionTimer = ({ data, title, desc }: Props) => {
  const measureExecutionMetrics = (functionBody: string) => {
    const iterations = 1000;
    const times = [];
    let minTime = Infinity;
    let maxTime = -Infinity;

    new Function(functionBody)();

    for (let i = 0; i < iterations; i++) {
      const start = performance.now();
      new Function(functionBody)();
      const end = performance.now();
      const execTime = end - start;

      times.push(execTime);
      minTime = Math.min(minTime, execTime);
      maxTime = Math.max(maxTime, execTime);
    }

    const avgTime = times.reduce((a, b) => a + b) / iterations;
    const variance =
      times.reduce((acc, val) => acc + Math.pow(val - avgTime, 2), 0) /
      iterations;

    return {
      avgTime: Math.max(avgTime, 0.001),
      minTime: Math.max(minTime, 0.001),
      maxTime: Math.max(maxTime, 0.001),
      stdDev: Math.sqrt(variance),
      codeSize: new Blob([functionBody]).size,
      operatorCount: (functionBody.match(/[+\-*/%=<>!&|^]/g) || []).length,
      variabilityIndex: (maxTime - minTime) / avgTime,
    };
  };

  const executionData = useMemo(() => {
    return data.map(({ name, functionBody }) => ({
      name,
      ...measureExecutionMetrics(functionBody as string),
    }));
  }, [data]);

  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle className="mb-1">
          {title}{" "}
          <span className="ml-2 px-2 py-1 bg-green-100 text-green-800 text-xs font-medium rounded-full">
            Currently Deployed
          </span>
        </CardTitle>
        {desc && <CardDescription>{desc}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px] py-2">
          {data && data.length !== 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={executionData}>
                <CartesianGrid
                  opacity={0.25}
                  strokeWidth={0.5}
                  vertical={false}
                />
                <XAxis
                  dataKey={"name"}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  fontSize={14}
                />
                <YAxis
                  dataKey={"maxTime"}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "#18181b", radius: 16 }}
                  content={<CustomTooltip />}
                />
                <Legend
                  wrapperStyle={{ bottom: -10 }}
                  formatter={(value) => capitalize(value)}
                />
                <Bar
                  dataKey={"avgTime"}
                  fill="#ffc658"
                  className="bg-green-500"
                  radius={16}
                  minPointSize={5}
                />
                <Bar
                  dataKey={"minTime"}
                  fill="#22c55e"
                  radius={16}
                  minPointSize={10}
                />
                <Bar dataKey={"maxTime"} fill="#3b82f6" radius={16} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <NoData subtitle="No data found for functions" />
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default React.memo(FunctionTimer);
