"use client";

import { AnalyticsData } from "@/lib/type";
import { parseISO, format, startOfDay, subDays } from "date-fns";
import React, { HTMLProps } from "react";
import { XAxis, YAxis, ResponsiveContainer, LineChart, Line } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { cn } from "@/lib/utils";

interface Props extends HTMLProps<HTMLDivElement> {
  logs: AnalyticsData[];
}

const generateDateRange = () => {
  const today = startOfDay(new Date());
  return Array.from({ length: 7 }).map((_, i) => {
    const date = subDays(today, 6 - i); // Start from 6 days ago
    return {
      day: format(date, "yyyy-MM-dd"),
      date: format(date, "MMM dd"),
      requests: 0,
    };
  });
};

const calculateRequestsOverTime = (logs: AnalyticsData[]) => {
  return generateDateRange().map((dateObj) => {
    const count = logs.filter((log) => {
      return format(parseISO(log.timestamp), "yyyy-MM-dd") === dateObj.day;
    });

    return {
      ...dateObj,
      requests: count.length,
    };
  });
};

export default function Chart_Analytics({
  logs,
  className,
  ...delegate
}: Props) {
  return (
    <Card
      className={cn("bg-zinc-950 border-zinc-700", className)}
      {...delegate}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-base text-zinc-100">
          Daily requests
        </CardTitle>
        <CardDescription className="text-zinc-400">
          Last 7 days, calculated according to UTC+6:00
        </CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <div className="h-[250px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={calculateRequestsOverTime(logs)}>
              <XAxis
                dataKey="date"
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                stroke="#71717a"
              />
              <YAxis
                tickLine={false}
                axisLine={false}
                tickMargin={10}
                stroke="#71717a"
              />
              <Line
                type="monotone"
                dataKey="requests"
                strokeWidth={2}
                dot={true}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}
