import type { Metadata } from "next";
import Public_Header from "@/components/layout/public/Public_Header";

export const metadata: Metadata = {
  title: "Playground",
};

export default function PlaygroundLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
      <Public_Header />
      {children}
    </div>
  );
}
