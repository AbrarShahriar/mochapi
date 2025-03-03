import Link from "next/link";
import { Github, Twitter, Linkedin } from "lucide-react";
import Image from "next/image";

export default function Public_Footer() {
  return (
    <footer className="relative border-t border-zinc-800/50 overflow-hidden">
      <div className="container flex flex-col gap-8 py-8 md:flex-row md:py-12">
        <div className="flex-1 px-8 py-4">
          <h2 className="font-bold">MochAPI</h2>
          <p className="text-sm text-muted-foreground">
            Powered by simplicity—build, test, and customize APIs effortlessly.
          </p>
        </div>
        <div className="grid flex-1 grid-cols-2 gap-12 max-md:grid-cols-2 max-md:px-4">
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Solutions</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/dashboard"
                  className="text-muted-foreground transition-colors"
                >
                  Mock API
                </Link>
              </li>
              <li>
                <Link
                  href="/playground/api-tester"
                  className="text-muted-foreground transition-colors"
                >
                  API Tester
                </Link>
              </li>
              <li>
                <Link
                  href="/playground/builtin-functions"
                  className="text-muted-foreground transition-colors"
                >
                  Pre-written Functions
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Company</h3>
            <ul className="space-y-3 text-sm">
              <li>
                <Link
                  href="/about"
                  className="text-muted-foreground transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/careers"
                  className="text-muted-foreground transition-colors"
                >
                  Careers
                </Link>
              </li>
            </ul>
          </div>
          <div className="space-y-4">
            <h3 className="text-sm font-medium">Connect</h3>
            <div className="flex space-x-4">
              <Link
                href="https://github.com/amanesoft"
                className="text-muted-foreground transition-colors"
              >
                <Github className="h-5 w-5" />
                <span className="sr-only">GitHub</span>
              </Link>
              <Link
                href="https://twitter.com/amanesoft"
                className="text-muted-foreground transition-colors"
              >
                <Twitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </Link>
              <Link
                href="https://linkedin.com/company/amanesoft"
                className="text-muted-foreground transition-colors"
              >
                <Linkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <div className="container border-t py-6 border-zinc-800/50">
        <p className="text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} Abrar Shariar. All rights reserved.
        </p>
      </div>
      <Image
        className="absolute -bottom-full -right-1/3 opacity-5 -rotate-[60deg]"
        alt="footer"
        src={"/images/footer.svg"}
        width={1920}
        height={512}
      />
      <Image
        className="absolute -bottom-1/3 -left-1/3 opacity-[7%]"
        alt="footer"
        src={"/images/footer.svg"}
        width={1920}
        height={512}
      />
    </footer>
  );
}
