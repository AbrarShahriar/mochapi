import CreateFunctionForm from "@/components/layout/functions/CreateFunctionForm";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export default async function NewFunctionPage() {
  const user = await currentUser();
  if (!user) redirect("/sign-in");

  return (
    <section>
      <h1 className="text-2xl font-bold">Write Your Function</h1>
      <p className="text-white/60 max-w-[50%] mb-8">
        Fill up the necessary information and start writing your function. Wait
        a few moment, it takes some time to deploy your function.
      </p>

      <CreateFunctionForm />
    </section>
  );
}
