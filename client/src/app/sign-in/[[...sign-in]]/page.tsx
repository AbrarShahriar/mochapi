import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { SignIn } from "@clerk/nextjs";

export default function Signin() {
  return (
    <main className="w-full min-h-[100vh] grid place-content-center py-10">
      <NeonGradientCard>
        <SignIn />
      </NeonGradientCard>
    </main>
  );
}
