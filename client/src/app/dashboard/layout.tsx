import AppBar from "@/components/layout/appbar/AppBar";
import Header from "@/components/layout/Header";
import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { getSession } from "@/lib/session";
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
  const session = await getSession();

  if (!session || !session.user) redirect("/auth/signin");
  console.log({ session });

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
