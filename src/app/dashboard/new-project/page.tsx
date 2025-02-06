import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function NewProjectPage() {
  return (
    <section className="p-6">
      <h1 className="text-2xl font-bold">Create a new project</h1>
      <p className="text-white/60">
        Fill up the necessary information, add fields and assign functions to
        those fields to generate random data.
      </p>

      <form className="flex flex-column gap-2 items-center mt-8">
        <div className="flex items-start gap-2 flex-col">
          <Label htmlFor="project-name">Project Name</Label>
          <Input
            placeholder="Project Name"
            name="project-name"
            id="project-name"
          />
        </div>
      </form>
    </section>
  );
}
