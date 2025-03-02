import AppBar from "@/components/layout/appbar/AppBar";
import Header from "@/components/layout/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Dashboard",
};

export default async function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
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
