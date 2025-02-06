import type { Metadata } from "next";
import "./globals.css";

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
      <body className={`antialiased`}>{children}</body>
    </html>
  );
}
