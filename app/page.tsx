import type { Metadata } from "next";
import { Suspense } from "react";

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
import { redirect } from "next/navigation";

export default function Page() {
  redirect("/analytics");

  return <></>;
}
