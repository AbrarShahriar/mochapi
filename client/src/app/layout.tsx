import type { Metadata } from "next";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

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
        <NextTopLoader showSpinner={false} />
        {children}
      </body>
    </html>
  );
}
