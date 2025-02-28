import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLDivElement> {
  reverse?: boolean;
}

export default function FadeToTransparentImage({
  children,
  className,
  reverse = false,
}: Props) {
  return (
    <div className={cn("relative mx-auto", className)}>
      <div className="relative">
        {children}

        <div
          className={`absolute inset-0 ${
            reverse ? "bg-gradient-to-r" : "bg-gradient-to-l"
          }  from-transparent to-zinc-950 rounded-lg`}
        ></div>
      </div>
    </div>
  );
}
