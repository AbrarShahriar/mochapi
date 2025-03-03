import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import { Toaster } from "@/components/ui/toaster";
// import Script from "next/script";

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
        <script
          src="https://beamanalytics.b-cdn.net/beam.min.js"
          data-token={process.env.BEAM_ANALYTICS_TOKEN as string}
          async
        ></script>
        <ClerkProvider appearance={{ baseTheme: dark }}>
          <NextTopLoader showSpinner={false} />
          {children}
          <Toaster />
        </ClerkProvider>
      </body>
    </html>
  );
}
