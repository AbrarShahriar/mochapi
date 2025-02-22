"use client";

import SubmitButton from "@/components/ui/submitButton";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { createFunction } from "@/lib/actions/function-actions";
import { Braces, Rocket } from "lucide-react";
import { useState } from "react";
import FunctionEditor from "../FunctionEditor";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useUser } from "@clerk/nextjs";

const editorDefaultState = `/*
* Write your function from here.
* The "Call Signature" is the function name.
* Write the function body below.
*/

const names = ["Abrar", "Shahriar", "Kabir"];
const randomIndex = Math.floor(Math.random() * names.length);
return names[randomIndex];`;

export default function CreateFunctionForm() {
  const { user, isLoaded } = useUser();
  const [functionBody, setFunctionBody] = useState(editorDefaultState);
  const { toast } = useToast();

  const onSubmit = async (formData: FormData) => {
    const result = await createFunction(formData, functionBody);

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
  };

  return (
    <form
      action={onSubmit}
      className="flex flex-col gap-8 bg-zinc-800/75 p-6 rounded-md shadow-sm"
    >
      <h1 className="text-xl font-semibold border-b border-zinc-700 pb-1 flex items-center gap-2">
        <Braces />
        Function Creation Wizard
      </h1>
      <div className="flex items-center justify-between gap-8">
        <div className="w-[50%]">
          <Label htmlFor="function-name">Function Name</Label>
          <Input
            className="border border-zinc-600"
            placeholder="Function Name..."
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
        />
      </div>
      <div>
        <Label htmlFor="function-body">Function Code</Label>
        <FunctionEditor
          functionBody={functionBody}
          setFunctionBody={setFunctionBody}
        />
      </div>
      <SubmitButton className="bg-green-600 hover:bg-green-500 font-bold w-fit ml-auto px-8">
        <Rocket />
        Deploy
      </SubmitButton>
    </form>
  );
}
