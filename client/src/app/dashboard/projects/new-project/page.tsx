import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function NewProjectPage() {
  return (
    <section className="flex items-center justify-center w-full h-full">
      <div className="bg-zinc-900 shadow-md rounded-md m-auto p-6 max-w-[50%]">
        <h1 className="text-2xl font-bold">Create a new project</h1>
        <p className="text-white/60 ">
          Fill up the necessary information and create your project. Wait a few
          moment, it takes some time to setup your API.
        </p>

        <form className="flex flex-col gap-4 mt-8 ">
          <Input
            className="border border-zinc-600"
            placeholder="Project Name"
            name="project-name"
            id="project-name"
          />
          <Button className="bg-green-600 hover:bg-green-500 font-bold">
            Create
          </Button>
        </form>
      </div>
    </section>
  );
}
