import { CheckIcon } from "lucide-react";
import { ElementType } from "react";

interface Props {
  title: string;
  desc: string;
  points: string[];
  index: number;
  Icon: ElementType;
}

export default function FeatureCard({
  title,
  desc,
  points,
  index,
  Icon,
}: Props) {
  const positions = [
    "-top-16 -right-16", // top right corner (overflow)
    "-top-16 -left-16", // top left corner (overflow)
    "-bottom-16 -right-16", // bottom right corner (overflow)
    "-bottom-16 -left-16", // bottom left corner (overflow)
    "-top-16 right-1/4", // top edge
    "-left-16 top-1/4", // left edge
    "-right-16 top-3/4", // right edge
    "-bottom-16 left-1/3", // bottom edge
  ];

  // Array of different gradients
  const gradients = [
    "from-purple-400 via-pink-500 to-indigo-400",
    "from-blue-400 via-indigo-500 to-purple-400",
    "from-pink-400 via-purple-500 to-indigo-400",
    "from-indigo-400 via-blue-500 to-teal-400",
  ];

  // Array of different sizes - now much larger
  const sizes = ["w-64 h-64", "w-72 h-72", "w-80 h-80", "w-96 h-96"];

  // Determine position, gradient and size based on index
  const position = positions[index % positions.length];
  const gradient = gradients[index % gradients.length];
  const size = sizes[index % sizes.length];

  return (
    <div className="relative w-full max-w-md mx-auto overflow-hidden rounded-md  p-6 shadow-xl">
      {/* Gradient */}
      <div
        className={`absolute ${position} ${size} rounded-full bg-gradient-to-br ${gradient} opacity-15 blur-2xl`}
      ></div>

      {/* Card content */}
      <div className="relative z-10">
        <div className="flex items-center gap-4">
          <div className="bg-white/5 backdrop-blur-sm rounded-md p-3 flex items-center justify-center">
            <Icon className="w-6 h-6 text-primary-foreground" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-semibold">{title}</h3>
          </div>
        </div>
        <p className="text-white/55 mt-4">{desc}</p>
        <ul className="mt-4 space-y-2 text-sm">
          {points.map((point, i) => (
            <li key={i} className="flex items-center gap-2">
              <CheckIcon className="size-6" />
              {point}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
