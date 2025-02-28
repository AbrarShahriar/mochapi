import Features from "@/components/layout/landing/Features";
import Glimpse from "@/components/layout/landing/Glimpse";
import Hero from "@/components/layout/landing/Hero";
import Public_Footer from "@/components/layout/public/Public_Footer";
import Public_Header from "@/components/layout/public/Public_Header";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import Image from "next/image";

export default async function Home() {
  return (
    <>
      <Public_Header />
      <main className="w-[80%] m-auto my-12">
        {/* Hero */}
        <Hero />

        {/* Product Image */}
        <NeonGradientCard borderRadius={5} className="w-full m-auto my-16">
          <Image
            className="rounded-xl"
            alt="dashboard"
            width={1920}
            height={892}
            src={"/images/dashboard.png"}
          />
        </NeonGradientCard>

        {/* Feature Cards */}
        <h1 className="mt-32  text-3xl font-bold text-center mb-4">
          Key Features
        </h1>
        <p className="text-muted-foreground text-center max-w-[50%] m-auto mb-16">
          Our platform offers a wide range of powerful features to help you
          build and test your web applications with mock data.
        </p>
        <Features />

        {/* Glimpse */}
        <h1 className="mt-32  text-3xl font-bold text-center mb-4">
          A Glimpse
        </h1>
        <p className="text-muted-foreground text-center max-w-[50%] m-auto mb-16">
          Take a look at out user-friendly, east-to-start dashboard that only
          shows you whats important - no unnecessary data clogging your view.
        </p>
        <Glimpse />
      </main>

      <Public_Footer />
    </>
  );
}
