"use client";

import {
  BarChart,
  ResponsiveContainer,
  XAxis,
  Tooltip,
  Bar,
  CartesianGrid,
} from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Chart_Tooltip from "./Chart_Tooltip";
import { ChartDataType } from "@/lib/type";
import NoData from "./NoData";

interface Props {
  data: Array<ChartDataType>;
  title: string;
  desc?: string;
}

export default function Chart_Bar({ data, title, desc }: Props) {
  // console.log("data", data);

  const keys = data && data[0] ? Object.keys(data[0]) : [];

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
              <BarChart data={data}>
                <CartesianGrid
                  opacity={0.25}
                  strokeWidth={0.5}
                  vertical={false}
                />
                <XAxis
                  dataKey={keys[0]}
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                />
                <Tooltip
                  cursor={{ fill: "#18181b", radius: 16 }}
                  content={<Chart_Tooltip dataKey={keys[1]} type="bar" />}
                />
                <Bar dataKey={keys[1]} fill="#ffc658" radius={16} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <NoData subtitle="No data found for route distribution" />
          )}
        </div>
      </CardContent>
    </Card>
  );
}
