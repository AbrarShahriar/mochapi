import { Particles } from "@/components/magicui/particles";
import { ShimmerButton } from "@/components/magicui/shimmer-button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <>
      <section className="container flex min-h-[calc(100vh-3.5rem)] max-w-screen-2xl flex-col items-center justify-center space-y-8 text-center ">
        <div className="space-y-4">
          <h1 className="text-7xl font-bold tracking-tight ">
            Build{" "}
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-pink-500 to-violet-500">
              Mock APIs
            </span>
            <br />
            in Seconds
          </h1>

          <p className="mx-auto max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
            Generate, customize, and test API endpoints in seconds with built-in
            and user-defined functions, real-time responses, and seamless
            integration—without managing a backend.
          </p>
        </div>
        <div className="flex gap-4">
          <Link href={"/dashboard"}>
            <ShimmerButton className="shadow-2xl">
              <span className="flex items-center gap-2 justify-center text-sm font-medium leading-none tracking-tight text-white =">
                Get Started <ArrowRight />
              </span>
            </ShimmerButton>
          </Link>
        </div>
      </section>
      <Particles
        className="absolute inset-0 z-0"
        quantity={100}
        ease={80}
        color={"#ffffff"}
        refresh
      />
    </>
  );
}
