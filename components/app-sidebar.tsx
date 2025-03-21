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
import { RiGithubFill, RiSlowDownLine, RiTwitterXFill } from "@remixicon/react";
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
        <svg
          width="36"
          height="36"
          viewBox="0 0 36 36"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className={cn(
            "duration-200 ease-in-out",
            open ? "" : "scale-80 -translate-x-0.5"
          )}
        >
          <g clip-path="url(#clip0_116_4)">
            <path
              d="M4.19 33C3.82333 33 3.64 32.8167 3.64 32.45V4.224C3.64 3.85733 3.82333 3.674 4.19 3.674H16.686C17.038 3.674 17.3313 3.79133 17.566 4.026L21.966 8.426C22.2153 8.67533 22.34 8.96867 22.34 9.306V32.45C22.34 32.8167 22.1567 33 21.79 33H15.564C15.1973 33 15.014 32.8167 15.014 32.45V9.526H10.966V32.45C10.966 32.8167 10.7827 33 10.416 33H4.19ZM25.0866 33C24.7199 33 24.5366 32.8167 24.5366 32.45V4.224C24.5366 3.85733 24.7199 3.674 25.0866 3.674H31.3126C31.6792 3.674 31.8626 3.85733 31.8626 4.224V32.45C31.8626 32.8167 31.6792 33 31.3126 33H25.0866Z"
              fill="currentColor"
            />
          </g>
        </svg>
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
      <SidebarFooter className="px-2">
        {/* Social Links */}
        <SidebarMenuButton
          asChild
          className="group/menu-button group-data-[collapsible=icon]:px-[5px]! font-medium gap-3 h-9 [&>svg]:size-auto"
          tooltip="Github"
        >
          <a
            href="https://github.com/alisamadiii/npm-insight"
            className="w-full flex items-center justify-center"
            target="_blank"
          >
            <RiGithubFill className="text-foreground/70" />
            {open && <span className="text-sm">Github</span>}
          </a>
        </SidebarMenuButton>

        {/* Theme Switcher */}
        {open && <SwitchTheme />}

        {/* Developer Credit */}
        <div
          className={cn(
            "border-t border-border/50 pt-4 mt-2",
            !open && "flex justify-center"
          )}
        >
          {open ? (
            <div className="space-y-px">
              <p className="text-xs text-muted-foreground">Developed with by</p>
              <Link
                href="https://x.com/alisamadi__"
                target="_blank"
                className="text-sm font-medium hover:text-primary transition-colors"
              >
                Ali Samadi
              </Link>
            </div>
          ) : (
            <Link
              href="https://x.com/alisamadi__"
              target="_blank"
              className="text-foreground hover:text-primary transition-colors"
            >
              <Button
                size="icon"
                variant="ghost"
                className="size-8 rounded-md hover:bg-accent"
              >
                <RiTwitterXFill className="size-4" />
              </Button>
            </Link>
          )}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
