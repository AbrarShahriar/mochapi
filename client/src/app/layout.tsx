import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";

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
          {children}
        </ClerkProvider>
      </body>
    </html>
  );
}
