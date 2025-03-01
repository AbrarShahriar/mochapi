import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
  index?: number;
  showGradient?: boolean;
  direction?: string;
}

export default function FadeToTransparentImage({
  children,
  className,
  reverse = false,
  index = 1,
  showGradient = true,
  direction,
}: Props) {
  const colors = [
    "from-violet-600/40",
    "from-blue-600/40",
    "from-emerald-600/40",
    "from-cyan-600/40",
    "from-indigo-600/40",
  ];

  const color = colors[index % colors.length];

  return (
    <div className={cn("relative mx-auto", className)}>
      {showGradient && (
        <div
          className={`absolute -bottom-2  ${
            index % 2 !== 0 ? "left-0" : "right-0"
          } w-3/4 h-6 ${
            index % 2 == 0 ? "bg-gradient-to-l" : "bg-gradient-to-r"
          }  ${color} to-transparent blur-md rounded-full`}
        ></div>
      )}

      <div className="relative">
        {children}

        <div
          className={`absolute inset-0 ${
            direction
              ? direction
              : reverse
              ? "bg-gradient-to-r"
              : "bg-gradient-to-l"
          }  from-transparent to-zinc-950 rounded-lg`}
        ></div>
      </div>
    </div>
  );
}
