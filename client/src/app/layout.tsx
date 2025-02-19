import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "Mochapi",
  description: "Create the most powerful mock API",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased font-geist`}>
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <NextTopLoader showSpinner={false} />
          <main>{children}</main>
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
