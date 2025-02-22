"use client";

import SubmitButton from "@/components/ui/submitButton";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { updateFunction } from "@/lib/actions/function-actions";
import { Braces, Rocket } from "lucide-react";
import { Dispatch, SetStateAction, useState } from "react";
import FunctionEditor from "../FunctionEditor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { FunctionType } from "@/lib/type";
import { useUser } from "@clerk/nextjs";

interface Props {
  functionContent: FunctionType;
  functionId: string;
  setFunctionContent: Dispatch<SetStateAction<FunctionType>>;
}

export default function UpdateFunctionForm({
  functionContent,
  functionId,
  setFunctionContent,
}: Props) {
  const { user, isLoaded } = useUser();

  const [functionBody, setFunctionBody] = useState(
    functionContent.functionBody
  );
  const [dataUpdated, setDataUpdated] = useState(false);
  const { toast } = useToast();

  const onSubmit = async () => {
    const result = await updateFunction(
      { ...functionContent, functionBody },
      functionId
    );

    if (result.success) {
      toast({
        variant: "success",
        title: "Success :)",
        description: result.message,
      });
    } else {
      toast({
        variant: "destructive",
        title: "Failure :(",
        description: result.message,
      });
    }

    setDataUpdated(false);
  };
  return (
    <form
      action={onSubmit}
      className="flex flex-col gap-8 bg-zinc-800/75 p-6 rounded-md shadow-sm"
    >
      <h1 className="text-xl font-semibold border-b border-zinc-700 pb-1 flex items-center gap-2">
        <Braces />
        Edit Function
      </h1>
      <div className="flex items-center justify-between gap-8">
        <div className="w-[50%]">
          <Label htmlFor="function-name">Function Name</Label>
          <Input
            className="border border-zinc-600"
            placeholder="Function Name..."
            value={functionContent.name}
            onChange={(e) => {
              setDataUpdated(true);
              setFunctionContent((prev) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
            name="function-name"
            id="function-name"
          />
        </div>
        <div className="w-[50%]">
          <Label htmlFor="function-name">Call Signature</Label>
          <div className="flex items-center gap-2">
            <pre className="bg-blue-500/25 p-2 rounded-md w-fit ">
              {isLoaded
                ? user?.emailAddresses[0].emailAddress.split("@")[0]
                : "Loading..."}
              :
            </pre>
            <Input
              className="border border-zinc-600 w-full "
              placeholder="Call Signature..."
              value={functionContent.callSignature.split(":")[1]}
              readOnly
              disabled
              name="call-signature"
              id="call-signature"
            />
          </div>
        </div>
      </div>
      <div>
        <Label htmlFor="description">Description</Label>
        <Textarea
          placeholder="Write a short description."
          name="description"
          id="description"
          value={functionContent.description}
          onChange={(e) => {
            setDataUpdated(true);
            setFunctionContent((prev) => ({
              ...prev,
              description: e.target.value,
            }));
          }}
        />
      </div>
      <div>
        <Label htmlFor="function-body">Function Code</Label>
        <FunctionEditor
          functionBody={functionBody}
          setFunctionBody={(val) => {
            setDataUpdated(true);
            setFunctionBody(val);
          }}
        />
      </div>
      <SubmitButton
        disabled={!dataUpdated}
        className="bg-green-600 hover:bg-green-500 font-bold w-fit ml-auto px-8"
      >
        <Rocket />
        Deploy
      </SubmitButton>
    </form>
  );
}
