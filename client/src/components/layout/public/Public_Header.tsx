import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { currentUser } from "@clerk/nextjs/server";
import { ChartPie, Cloud, Home, User } from "lucide-react";
import Link from "next/link";

export default async function Public_Header() {
  const user = await currentUser();

  return (
    <header className="fixed top-8 left-[50%] translate-x-[-50%] z-[999] w-[90%] mx-auto mb-8 backdrop-blur-md rounded-lg flex items-center justify-between p-4  bg-zinc-800/25  shadow-sm ">
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2" prefetch={false}>
          <Cloud className="w-6 h-6" />
          <span className="sr-only">Mochapi</span>
        </Link>
      </div>
      <div className="flex items-center gap-4 md:gap-6">
        <nav className="hidden md:flex items-center gap-4">
          <Link
            href="#features"
            className="text-sm font-medium hover:underline underline-offset-4"
            prefetch={false}
          >
            Features
          </Link>
          <Link
            href="#pricing"
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
      <div className="flex items-center gap-4">
        {user ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Avatar className="cursor-pointer">
                <AvatarImage src={user.imageUrl} />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <Link href={"/dashboard"} className="flex items-center gap-2">
                  <Home /> Dashboard
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link
                  href={"/dashboard/observability"}
                  className="flex items-center gap-2"
                >
                  <ChartPie /> Usage
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href={"/dashboard"} className="flex items-center gap-2">
                  <User /> Account
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ) : (
          <div className="flex items-center justify-between gap-2">
            <Link href={"/sign-in"}>
              <Button variant={"ghost"} className="text-violet-400">
                Sign In
              </Button>
            </Link>
            <Link href={"/sign-up"}>
              <Button className="bg-violet-700 hover:bg-violet-600 text-white">
                Get Started
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
