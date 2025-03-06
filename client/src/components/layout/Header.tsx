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
import React, { useEffect, useState } from "react";
import Notifications from "./Notifications";
import { UserButton } from "@clerk/nextjs";
import { authFetch } from "@/lib/actions/helper";
import { BackendResponse, Endpoint, FunctionType, Project } from "@/lib/type";

export default function Header() {
  const pathname = usePathname();
  const [breadcrumbs, setBreadcrumbs] = useState<
    {
      label: string;
      path: string;
      isLoading: boolean;
      originalSegment: string;
    }[]
  >([]);

  useEffect(() => {
    // Initialize breadcrumbs with loading states
    const segments = pathname
      .replace(/\/$/, "")
      .split("/")
      .filter((segment) => segment !== "");

    const initialBreadcrumbs = segments.map((segment, index) => {
      const path = `/${segments.slice(0, index + 1).join("/")}`;
      const label = segment
        .split("-")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(" ");

      // Set loading state for project and subproject segments
      const isProject = segments[index - 1] === "projects";
      const isFunction = segments[index - 1] === "functions";
      const isSubproject = segments[index - 2] === "projects";
      const isLoading = isProject || isSubproject || isFunction;

      return {
        label,
        path,
        isLoading: isLoading,
        originalSegment: segment,
      };
    });

    setBreadcrumbs(initialBreadcrumbs);

    // Update project and subproject labels asynchronously
    const updateDynamicSegments = async () => {
      const updatedBreadcrumbs = [...initialBreadcrumbs];

      for (let index = 0; index < segments.length; index++) {
        const segment = segments[index];

        if (segments[index - 1] === "projects") {
          try {
            const project = await fetchProject(segment);
            updatedBreadcrumbs[index] = {
              ...updatedBreadcrumbs[index],
              label: (project as Project).name,
              isLoading: false,
            };
            setBreadcrumbs([...updatedBreadcrumbs]);
          } catch (error) {
            console.error(`Failed to fetch project ${segment}:`, error);
            updatedBreadcrumbs[index] = {
              ...updatedBreadcrumbs[index],
              isLoading: false,
            };
            setBreadcrumbs([...updatedBreadcrumbs]);
          }
        } else if (segments[index - 1] === "functions") {
          try {
            const functionRes = await fetchFunction(segment);
            updatedBreadcrumbs[index] = {
              ...updatedBreadcrumbs[index],
              label: (functionRes as FunctionType).name,
              isLoading: false,
            };
            setBreadcrumbs([...updatedBreadcrumbs]);
          } catch (error) {
            console.error(`Failed to fetch function ${segment}:`, error);
            updatedBreadcrumbs[index] = {
              ...updatedBreadcrumbs[index],
              isLoading: false,
            };
            setBreadcrumbs([...updatedBreadcrumbs]);
          }
        } else if (segments[index - 2] === "projects") {
          try {
            const endpoint = await fetchEndpoint(segment);
            updatedBreadcrumbs[index] = {
              ...updatedBreadcrumbs[index],
              label: (endpoint as Endpoint).name,
              isLoading: false,
            };
            setBreadcrumbs([...updatedBreadcrumbs]);
          } catch (error) {
            console.error(`Failed to fetch endpoint ${segment}:`, error);
            updatedBreadcrumbs[index] = {
              ...updatedBreadcrumbs[index],
              isLoading: false,
            };
            setBreadcrumbs([...updatedBreadcrumbs]);
          }
        }
      }
    };

    updateDynamicSegments();
  }, [pathname]);

  const fetchProject = async (projectId: string) => {
    const response = await authFetch<BackendResponse<Project>>(
      `/projects/one/${projectId}`,
      {
        cache: "force-cache",
      }
    );
    if (!response.success) throw new Error("Failed to fetch project");
    return response.payload;
  };

  const fetchEndpoint = async (endpointId: string) => {
    const response = await authFetch<BackendResponse<Endpoint>>(
      `/endpoints/one/${endpointId}`,
      { cache: "force-cache" }
    );
    if (!response.success) throw new Error("Failed to fetch endpoint");
    return response.payload;
  };

  const fetchFunction = async (functionId: string) => {
    const response = await authFetch<BackendResponse<FunctionType>>(
      `/functions/one/${functionId}`,
      { cache: "force-cache" }
    );
    if (!response.success) throw new Error("Failed to fetch function");
    return response.payload;
  };

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
                    <BreadcrumbPage>
                      {breadcrumb.isLoading ? `Loading...` : breadcrumb.label}
                    </BreadcrumbPage>
                  </BreadcrumbItem>
                ) : (
                  <>
                    <BreadcrumbItem key={breadcrumb.path}>
                      <BreadcrumbLink href={breadcrumb.path}>
                        {breadcrumb.isLoading ? `Loading...` : breadcrumb.label}
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

        <UserButton
          appearance={{
            elements: {
              avatarBox: {
                width: "32px",
                height: "32px",
              },
            },
          }}
        />
      </div>
    </header>
  );
}
