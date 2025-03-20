"use client";

import * as React from "react";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { RiSlowDownLine, RiTwitterXFill } from "@remixicon/react";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import SwitchTheme from "./switch-theme";

// This is sample data.
const data = {
  user: {
    name: "Mark Bannert",
    email: "mark@bannert.com",
    avatar:
      "https://res.cloudinary.com/dlzlfasou/image/upload/v1741345912/user_itiiaq.png",
  },
  navMain: [
    {
      title: "General",
      items: [
        {
          title: "Dashboard",
          url: "#",
          icon: RiSlowDownLine,
          isActive: true,
        },
      ],
    },
  ],
};

function SidebarLogo() {
  const id = React.useId();
  return (
    <div className="flex gap-2 px-2 group-data-[collapsible=icon]:px-0 transition-[padding] duration-200 ease-in-out">
      <Link className="group/logo inline-flex" href="/">
        <span className="sr-only">Logo</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          viewBox="0 0 36 36"
          className="size-9 group-data-[collapsible=icon]:size-8 transition-[width,height] duration-200 ease-in-out"
        >
          <path
            fill={`url(#${id})`}
            fillRule="evenodd"
            d="M12.972 2a6.806 6.806 0 0 0-4.813 1.993L2 10.153v2.819c0 1.991.856 3.783 2.22 5.028A6.788 6.788 0 0 0 2 23.028v2.82l6.16 6.159A6.806 6.806 0 0 0 18 31.78a6.806 6.806 0 0 0 9.841.226L34 25.847v-2.819A6.788 6.788 0 0 0 31.78 18 6.788 6.788 0 0 0 34 12.972v-2.82l-6.159-6.159A6.806 6.806 0 0 0 18 4.22 6.788 6.788 0 0 0 12.972 2Zm9.635 16a6.741 6.741 0 0 1-.226-.216L18 13.403l-4.381 4.381a6.741 6.741 0 0 1-.226.216c.077.07.152.142.226.216L18 22.597l4.381-4.381c.074-.074.15-.146.226-.216Zm-2.83 7.848v1.346a3.25 3.25 0 0 0 5.55 2.298l5.117-5.117v-1.347a3.25 3.25 0 0 0-5.549-2.298l-5.117 5.117Zm-3.555 0-5.117-5.118a3.25 3.25 0 0 0-5.55 2.298v1.347l5.118 5.117a3.25 3.25 0 0 0 5.55-2.298v-1.346Zm0-17.042v1.347l-5.117 5.117a3.25 3.25 0 0 1-5.55-2.298v-1.347l5.118-5.117a3.25 3.25 0 0 1 5.55 2.298Zm8.673 6.464-5.117-5.117V8.806a3.25 3.25 0 0 1 5.549-2.298l5.117 5.117v1.347a3.25 3.25 0 0 1-5.549 2.298Z"
            clipRule="evenodd"
          />
          <defs>
            <linearGradient
              id={id}
              x1="18"
              x2="18"
              y1="2"
              y2="34"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#F4F4F5" />
              <stop offset="1" stopColor="#A1A1AA" />
            </linearGradient>
          </defs>
        </svg>
      </Link>
    </div>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { toggleSidebar, open } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader
        className={cn(
          "h-16 max-md:mt-2 flex-row mb-2 duration-200 items-center justify-start font-black text-3xl",
          open ? "" : "text-sm"
        )}
      >
        NPM
        <span
          className={cn(
            "text-sm font-normal self-end -translate-y-2 duration-200",
            open ? "opacity-100" : "opacity-0"
          )}
        >
          Insight
        </span>
      </SidebarHeader>
      <SidebarContent className="-mt-2">
        {data.navMain.map((item) => (
          <SidebarGroup key={item.title}>
            <SidebarGroupLabel className="uppercase text-muted-foreground/65">
              {item.title}
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {item.items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton
                      asChild
                      className="group/menu-button group-data-[collapsible=icon]:px-[5px]! font-medium gap-3 h-9 [&>svg]:size-auto"
                      tooltip={item.title}
                      isActive={item.isActive}
                    >
                      <a href={item.url}>
                        {item.icon && (
                          <item.icon
                            className="text-muted-foreground/65 group-data-[active=true]/menu-button:text-primary"
                            size={22}
                            aria-hidden="true"
                          />
                        )}
                        <span>{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        ))}
      </SidebarContent>
      <SidebarFooter>
        {open && (
          <div>
            <SwitchTheme />
          </div>
        )}
        {open ? (
          <p className="text-xs text-muted-foreground whitespace-nowrap">
            Developed by{" "}
            <Link
              href="https://x.com/alisamadi__"
              target="_blank"
              className="underline text-foreground"
            >
              Ali Samadi
            </Link>
          </p>
        ) : (
          <Link
            href="https://x.com/alisamadi__"
            target="_blank"
            className="underline text-foreground"
          >
            <Button size="icon" variant={"outline"}>
              <RiTwitterXFill />
            </Button>
          </Link>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
