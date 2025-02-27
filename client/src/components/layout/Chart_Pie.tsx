"use client";

import { ResponsiveContainer, Tooltip, PieChart, Pie, Cell } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Chart_Tooltip from "./Chart_Tooltip";
import { formatByteSize } from "@/lib/utils";
import NoData from "./NoData";

type ChartDataType = {
  [key: string]: string | number;
};

interface CustomizedLabelRenderer {
  cx: number;
  cy: number;
  midAngle: number;
  innerRadius: number;
  outerRadius: number;
  percent: number;
  index: number;
}

interface Props {
  data: Array<ChartDataType>;
  title: string;
  desc?: string;
}

export default function Chart_Pie({ data, title, desc }: Props) {
  const keys = data && data[0] ? Object.keys(data[0]) : [];

  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    index,
  }: CustomizedLabelRenderer) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos((-midAngle * Math.PI) / 180);
    const y = cy + radius * Math.sin((-midAngle * Math.PI) / 180);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor="middle"
        dominantBaseline="central"
      >
        {data[index].name}
      </text>
    );
  };

  return (
    <Card className="bg-transparent">
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        {desc && <CardDescription>{desc}</CardDescription>}
      </CardHeader>
      <CardContent>
        <div className="h-[300px]">
          {data && data.length !== 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={data}
                  dataKey="size"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  stroke="#27272a"
                  fill="#8884d8"
                  labelLine={false}
                  label={renderCustomizedLabel}
                >
                  {data.map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={`hsl(${index * 45}, 70%, 60%)`}
                    />
                  ))}
                </Pie>
                <Tooltip
                  content={
                    <Chart_Tooltip
                      dataKey={keys[1]}
                      type="pie"
                      valueFormatter={formatByteSize}
                    />
                  }
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <NoData subtitle="No data found for disk usage" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
