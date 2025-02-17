"use client";

import { SidebarTrigger } from "../ui/sidebar";
import { usePathname } from "next/navigation";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Button } from "../ui/button";
import React from "react";
import Notifications from "./Notifications";

export default function Header() {
  const pathname = usePathname();

  // Convert pathname to breadcrumb segments
  const generateBreadcrumbs = () => {
    // Remove trailing slash and split
    const segments = pathname
      .replace(/\/$/, "")
      .split("/")
      .filter((segment) => segment !== "");

    // Generate array of breadcrumb items with paths
    return segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;
      // Capitalize and remove hyphens for display
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      return { label, path };
    });
  };

  const breadcrumbs = generateBreadcrumbs();
  return (
    <header>
      <div className="flex items-center gap-4 px-6 py-4">
        <SidebarTrigger />
        <Breadcrumb className="py-4">
          <BreadcrumbList>
            {breadcrumbs.map((breadcrumb, index) => (
              <React.Fragment key={index}>
                {index === breadcrumbs.length - 1 ? (
                  <BreadcrumbItem key={breadcrumb.path}>
                    <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <>
                    <BreadcrumbItem key={breadcrumb.path}>
                      <BreadcrumbLink href={breadcrumb.path}>
                        {breadcrumb.label}
                      </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                  </>
                )}
              </React.Fragment>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
        <Notifications />
        <Button variant={"outline"}>Feedback</Button>
      </div>
    </header>
  );
}
