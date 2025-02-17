import AppBar from "@/components/layout/appbar/AppBar";
import Header from "@/components/layout/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { auth } from "@clerk/nextjs/server";
import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { userId } = await auth();

  if (!userId) redirect("/sign-in");
  return (
    <SidebarProvider>
      <AppBar />
      <SidebarInset className="bg-zinc-950 text-white">
        <Header />
        <main className="w-full h-full p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  );
}
