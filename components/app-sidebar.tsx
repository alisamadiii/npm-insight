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
          title: "Analytics",
          url: "/analytics",
          icon: RiSlowDownLine,
          isActive: true,
        },
      ],
    },
  ],
};

function SidebarLogo() {
  const { open } = useSidebar();

  return (
    <div className="flex gap-2 px-2 group-data-[collapsible=icon]:px-0 transition-[padding] duration-200 ease-in-out">
      <Link className="group/logo" href="/">
        NPM{" "}
        <span
          className={cn(
            "text-sm font-normal self-end -translate-y-2 duration-200",
            open ? "opacity-100" : "opacity-0"
          )}
        >
          Insight
        </span>
      </Link>
    </div>
  );
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { open } = useSidebar();

  return (
    <Sidebar collapsible="icon" variant="inset" {...props}>
      <SidebarHeader
        className={cn(
          "h-16 max-md:mt-2 flex-row mb-2 duration-200 items-center justify-start font-black text-3xl",
          open ? "" : "text-sm"
        )}
      >
        <SidebarLogo />
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
