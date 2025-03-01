import { Ripple } from "@/components/magicui/ripple";
import Image from "next/image";
import React, { CSSProperties } from "react";

export default function CrossLanguage() {
  // Languages with their icons and names
  const icons = [
    "nodejs",
    "python",
    "java",
    "php",
    "cpp",
    "rust",
    "kotlin",
    "swift",
    "go",
  ];

  return (
    <div className="relative flex h-[500px] w-full flex-col items-center justify-center">
      {/* Card content */}
      <div className="grid grid-cols-3 gap-8 ">
        {icons.map((icon, i) => (
          <Image
            className="shadow-md levitate "
            style={{ "--delay": i + Math.random() * 0.5 } as CSSProperties}
            key={i}
            src={`https://skillicons.dev/icons?i=${icon}`}
            width={48}
            height={48}
            alt={"language icon"}
          />
        ))}
      </div>
      <Ripple />
    </div>
  );
}
