"use client";

import { useEffect, useState } from "react";

interface Props {
  width?: number;
  height?: number;
  lineColor?: string;
  showDots?: boolean;
}

export default function Chart_Activity({
  width = 50,
  height = 14,
  lineColor = "#3b82f6",
  showDots = false,
}: Props) {
  const [data, setData] = useState<number[]>([]);

  useEffect(() => {
    setData(
      Array(10)
        .fill((_: number) => _)
        .map(() => Math.round(Math.random() * 10))
    );
  }, []);

  const maxValue = Math.max(...data);
  const minValue = Math.min(...data);
  const range = maxValue - minValue;

  // Create points for the SVG path
  const points = data
    .map((value, index) => {
      const x = (index / (data.length - 1)) * width;
      // Normalize the y value (invert because SVG y-axis goes down)
      const normalizedY =
        range === 0
          ? height / 2
          : height - ((value - minValue) / range) * height;
      return `${x},${normalizedY}`;
    })
    .join(" ");

  return (
    <div
      style={{
        display: "inline-block",
        verticalAlign: "middle",
        marginLeft: 8,
        marginRight: 8,
      }}
    >
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {/* Line */}
        <polyline
          points={points}
          fill="none"
          strokeWidth="1.5"
          className={lineColor}
        />

        {/* Optional dots at each data point */}
        {showDots &&
          data.map((value, index) => {
            const x = (index / (data.length - 1)) * width;
            const normalizedY =
              range === 0
                ? height / 2
                : height - ((value - minValue) / range) * height;

            return (
              <circle
                key={index}
                cx={x}
                cy={normalizedY}
                r="2"
                fill={lineColor}
              />
            );
          })}
      </svg>
    </div>
  );
}
