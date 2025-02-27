import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import NavItems from "./NavItems";
import { Cloud } from "lucide-react";
import Link from "next/link";
import { currentUser } from "@clerk/nextjs/server";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

export default async function AppBar() {
  const user = await currentUser();
  return (
    <Sidebar
      collapsible="icon"
      className="text-white border-r border-r-zinc-700"
    >
      <SidebarHeader className="bg-zinc-900">
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              size="lg"
              className="cursor-default bg-zinc-800 "
              asChild
              // isActive={}
            >
              <Link href="/dashboard">
                <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                  <Cloud className="size-8 p-1 rounded-md bg-blue-500" />
                </div>
                <div className="grid flex-1 text-left text-sm leading-tight">
                  <span className="truncate font-semibold">Mochapi</span>
                  <span className="truncate text-xs">Create Mock APIs</span>
                </div>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="bg-zinc-900 text-white">
        <NavItems />
      </SidebarContent>
      <SidebarFooter className="bg-zinc-800 flex-row items-center gap-4 ">
        <Avatar>
          <AvatarImage src={user?.imageUrl} />
          <AvatarFallback>
            {user?.firstName && user.firstName[0]}
          </AvatarFallback>
        </Avatar>
        <div className="grid flex-1 text-left text-sm leading-tight">
          <span className="truncate font-semibold">
            {user?.firstName} {user?.lastName}
          </span>
          <span className="truncate text-xs">
            {user?.emailAddresses[0].emailAddress}
          </span>
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
