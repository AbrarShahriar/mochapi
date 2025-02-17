import { SignUp } from "@clerk/nextjs";

export default function page() {
  return (
    <main className="w-full min-h-[100vh] grid place-content-center py-10">
      <SignUp />
    </main>
  );
}
