import CrossLanguage from "@/components/layout/landing/CrossLanguage";
import FadeToTransparentImage from "@/components/layout/landing/FadeToTransparentImage";
import Features from "@/components/layout/landing/Features";
import Glimpse from "@/components/layout/landing/Glimpse";
import Hero from "@/components/layout/landing/Hero";
import Public_Footer from "@/components/layout/public/Public_Footer";
import Public_Header from "@/components/layout/public/Public_Header";
import { NeonGradientCard } from "@/components/magicui/neon-gradient-card";
import { SparklesText } from "@/components/magicui/sparkles-text";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default async function Home() {
  return (
    <>
      <Public_Header />
      <main className="w-[80%] m-auto my-12 max-md:w-full">
        {/* Hero */}
        <Hero />

        {/* Product Image */}
        <NeonGradientCard
          borderRadius={5}
          className="w-full m-auto my-16 max-md:-mt-16 max-md:w-[90%]"
        >
          <Image
            className="rounded-md shadow-2xl opacity-85"
            alt="dashboard"
            width={1920}
            height={892}
            src={"/images/dashboard.png"}
          />
        </NeonGradientCard>

        {/* Feature Cards */}
        <h1
          id="features"
          className="mt-32  text-3xl font-bold text-center mb-4"
        >
          Key Features
        </h1>
        <p className="text-muted-foreground text-center  m-auto mb-16 w-1/2 max-md:w-[90%]">
          Our platform offers a wide range of powerful features to help you
          build and test your web applications with mock data.
        </p>
        <Features />

        {/* Glimpse */}
        <h1 className="mt-32  text-3xl font-bold text-center mb-4">
          A Glimpse
        </h1>
        <p className="text-muted-foreground text-center m-auto mb-16 w-1/2 max-md:w-[90%]">
          Take a look at out user-friendly, east-to-start dashboard that only
          shows you whats important - no unnecessary data clogging your view.
        </p>
        <Glimpse />

        {/* Support */}
        <h1 className="mt-32 text-3xl font-bold m-auto text-center mb-4 max-md:w-[90%]">
          Use Everywhere
        </h1>
        <p className="text-muted-foreground text-center  m-auto w-1/2 max-md:w-[90%]">
          Connect with a simple HTTP request from any language
        </p>
        <CrossLanguage />

        {/* Pricing */}
        <section className="relative mb-[50vh] ">
          <div className="relative z-[99]">
            <h1 className=" text-3xl text-center mb-4">
              And the best part is,{" "}
              <SparklesText className="max-md:text-5xl" text="It's free" />
            </h1>
            <p className="mb-8 text-center text-white/50 m-auto w-[50%] max-md:w-[90%]">
              Create upto 3 projects with 3 endpoints each and deploy unlimited
              functions tailored to your needs!
            </p>
            <Link href={"/dashboard"} className="grid place-content-center ">
              <Button className="bg-violet-700 hover:bg-violet-600">
                Start Creating APIs <ArrowRight />
              </Button>
            </Link>
          </div>
          <FadeToTransparentImage
            showGradient={false}
            className="absolute w-full -top-24 -z-10"
            direction="bg-gradient-to-t"
          >
            <Image
              id="pricing"
              src={"/images/project.png"}
              alt="Glimpse"
              width={1920}
              height={892}
              className="rounded-lg opacity-25"
            />
          </FadeToTransparentImage>
        </section>
      </main>

      <Public_Footer />
    </>
  );
}
