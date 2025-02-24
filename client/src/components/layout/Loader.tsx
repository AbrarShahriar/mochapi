import { LoaderCircle } from "lucide-react";

export default function Loader() {
  return (
    <div className="w-full h-full grid place-content-center">
      <LoaderCircle className="size-6 animate-spin" />
    </div>
  );
}
