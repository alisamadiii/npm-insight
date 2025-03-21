import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Experiment 03 - Crafted.is",
};

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { Chart02 } from "@/components/chart-02";
import { Chart03 } from "@/components/chart-03";
import { ActionButtons } from "@/components/action-buttons";
import SearchBar from "@/components/search-bar";
import { Suspense } from "react";

export default function DashboardPage() {
  return (
    <div className="px-4 md:px-6 lg:px-8 @container">
      <div className="w-full max-w-6xl mx-auto">
        <header className="flex flex-wrap gap-3 min-h-20 py-4 shrink-0 items-center transition-all ease-linear border-b">
          {/* Left side */}
          <div className="flex flex-1 items-center gap-2">
            <SidebarTrigger className="-ms-1" />
            <div className="max-lg:hidden lg:contents">
              <Separator
                orientation="vertical"
                className="me-2 data-[orientation=vertical]:h-4"
              />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">Home</BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Analytics</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </div>
          {/* Right side */}
          <ActionButtons />
        </header>
        <Suspense>
          <SearchBar />
        </Suspense>
        <div className="grid auto-rows-min items-start @2xl:grid-cols-2 *:-ms-px *:-mt-px -m-px">
          {/* <Chart01 /> */}
          <Suspense>
            <Chart02 />
            <Chart03 />
          </Suspense>
          {/* <Chart04 />
                <Chart05 />
                <Chart06 /> */}
        </div>
      </div>
    </div>
  );
}
