import { capitalize } from "@/lib/utils";

interface Props {
  payload?: { name: string; value: number }[];
  label?: string;
  active?: boolean;
  dataKey: string;
  type: "bar" | "pie";
  valueFormatter?: (val: number) => string;
}

export default function Chart_Tooltip({
  payload,
  label,
  active,
  dataKey,
  type,
  valueFormatter,
}: Props) {
  if (active) {
    return (
      <div className="bg-zinc-800 py-2 px-4 shadow-md rounded-md border border-zinc-700">
        <h3 className="font-semibold text-md mb-2">
          {type == "bar" ? label : payload && payload[0].name}
        </h3>
        <p className="text-[#ffc658]">
          {capitalize(dataKey)}:{" "}
          {payload &&
            (valueFormatter
              ? valueFormatter(payload[0].value)
              : payload[0].value)}
        </p>
      </div>
    );
  }

  return null;
}
