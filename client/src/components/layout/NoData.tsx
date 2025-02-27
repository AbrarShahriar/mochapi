import { ChartNoAxesColumn } from "lucide-react";

interface Props {
  subtitle: string;
}

export default function NoData({ subtitle }: Props) {
  return (
    <div className="w-full h-[300px] flex flex-col items-center justify-center  text-center">
      <div className="border border-zinc-800 rounded-md p-2 mb-4">
        <ChartNoAxesColumn className="size-8 " />
      </div>
      <h1 className="text-lg font-semibold">No Data Found</h1>
      <p className="text-muted-foreground text-sm">{subtitle}</p>
    </div>
  );
}
