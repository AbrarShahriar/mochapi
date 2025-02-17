import FunctionEditor from "@/components/layout/FunctionEditor";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Braces, Rocket } from "lucide-react";

export default function NewFunctionPage() {
  return (
    <section>
      <h1 className="text-2xl font-bold">Write Your Function</h1>
      <p className="text-white/60 max-w-[50%] mb-8">
        Fill up the necessary information and start writing your function. Wait
        a few moment, it takes some time to deploy your function.
      </p>

      <div className="flex flex-col gap-8 bg-zinc-800/75 p-6 rounded-md shadow-sm">
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
                abrarshahriar:
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
          <FunctionEditor />
        </div>
        <Button className="bg-green-600 hover:bg-green-500 font-bold w-fit ml-auto px-8">
          <Rocket />
          Deploy
        </Button>
      </div>
    </section>
  );
}
