import { Button } from "@/components/ui/button";

import Link from "next/link";
import Image from "next/image";

export default async function Public_Header() {
  return (
    <header className="fixed top-8 left-[50%] translate-x-[-50%] z-[999] w-[90%] mx-auto mb-8 backdrop-blur-[8px] rounded-lg grid grid-cols-3 p-4  bg-zinc-800/25  shadow-sm ">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Image
            alt="Logo"
            src={"/images/logo-text.png"}
            width={150}
            height={32}
          />
          <span className="sr-only"></span>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-4 md:gap-6">
        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="/#features"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="/#pricing"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Pricing
          </Link>

          <Link
            href="/playground/api-tester"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Demo
          </Link>
        </nav>
      </div>
      <div className="flex items-center justify-end gap-4">
        <div className="flex items-center justify-between gap-2">
          <Link href={"/sign-in"}>
            <Button variant={"ghost"} className="text-violet-400">
              Sign In
            </Button>
          </Link>
          <Link href={"/dashboard"}>
            <Button className="bg-violet-700 hover:bg-violet-600 text-white">
              Get Started
            </Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
