import { Edit } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Link from "next/link";

interface Props {
  id: string;
  name: string;
  description: string;
  callSignature: string;
  functionBody: string;
  createdAt: string;
  updatedAt: string;
  customAction?: React.ReactNode;
}

export default function FunctionCard({
  id,
  name,
  description,
  callSignature,
  customAction,
}: Props) {
  return (
    <Card className="h-full text-left overflow-hidden">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1 text-sm font-semibold  rounded-md ">
          <span>Signature: </span>
          <div className="flex items-center justify-between ">
            <pre className="bg-blue-500/25 py-1 px-2  text-[12px] rounded-md w-fit ">
              {callSignature}
            </pre>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between gap-2 w-full">
          {customAction ? (
            customAction
          ) : (
            <Link href={`/dashboard/functions/${id}`} className="w-full">
              <Button size={"sm"} className="text-blue-500 w-full">
                <Edit /> Edit
              </Button>
            </Link>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}
