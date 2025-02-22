type Variants = "success" | "warning" | "error" | "neutral";

interface Props {
  variant: Variants;
}

export default function PulseRing({ variant }: Props) {
  const variantClass: Record<
    Variants,
    Record<"primary" | "secondary", string>
  > = {
    success: { primary: "bg-green-500", secondary: "bg-green-400" },
    error: { primary: "bg-red-500", secondary: "bg-red-400" },
    neutral: { primary: "bg-sky-500", secondary: "bg-sky-400" },
    warning: { primary: "bg-yellow-500", secondary: "bg-yellow-400" },
  };
  return (
    <span className="relative flex size-2">
      <span
        className={`absolute inline-flex h-full w-full animate-ping rounded-full ${variantClass[variant].secondary} opacity-75`}
      ></span>
      <span
        className={`relative inline-flex size-2 rounded-full ${variantClass[variant].primary}`}
      ></span>
    </span>
  );
}
