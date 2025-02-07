import { Copy, Edit, Trash } from "lucide-react";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

interface Props {
  name: string;
  description: string;
  callSignature: string;
  functionBody: string;
  createdAt: Date;
  updatedAt: Date;
}

export default function FunctionCard({
  name,
  description,
  callSignature,
}: //   functionBody,
//   callSignature,
//   createdAt,
//   updatedAt,
Props) {
  return (
    <Card className="h-full text-left overflow-hidden">
      <CardHeader>
        <CardTitle>{name}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-1 text-sm font-semibold  rounded-md ">
          <span className="">Signature: </span>
          <div className="flex items-center justify-between ">
            <pre className="bg-blue-500/25 py-1 px-2  text-[12px] rounded-md w-fit ">
              {callSignature}
            </pre>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex items-center justify-between gap-2 w-full">
          <Button size={"sm"} className="text-blue-500">
            <Edit /> Edit
          </Button>
          <Button size={"sm"} className="text-red-500 ">
            <Trash /> Delete
          </Button>
          <Button className="ml-auto bg-transparent hover:bg-transparent">
            <Copy />
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
