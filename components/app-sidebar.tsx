"use client"

import * as React from "react"
import {
  BotMessageSquare,
  ChartCandlestick,
  Command,
  Gpu,
  LifeBuoy,
  MessageSquareQuote,
  SquareTerminal,
  Store,
} from "lucide-react"

import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

const data = {
  user: {
    name: "Demo User",
    email: "demo@alphafusion.corp",
    avatar: "/avatars/shadcn.jpg",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "#",
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: "Global",
          url: "#",
        },
        {
          title: "More...",
          url: "#",
        },
      ],
    },
    {
      title: "Trading",
      url: "#",
      icon: ChartCandlestick,
      items: [
        {
          title: "More...",
          url: "#",
        },
      ],
    },
    {
      title: "Bots",
      url: "#",
      icon: BotMessageSquare,
      items: [
        {
          title: "More...",
          url: "#",
        },
      ],
    },
    {
      title: "Mining",
      url: "#",
      icon: Gpu,
      items: [
        {
          title: "More...",
          url: "#",
        },
      ],
    }
  ],
  navSecondary: [
    {
      title: "About",
      url: "#",
      icon: Store,
    },
    {
      title: "Support",
      url: "#",
      icon: LifeBuoy,
    },
    {
      title: "Feedback",
      url: "#",
      icon: MessageSquareQuote,
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar
      className="top-(--header-height) h-[calc(100svh-var(--header-height))]!"
      {...props}
    >
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild className="p-1.5 h-auto">
              <a href="#" className="bg-gradient-to-tr from-green-500/20 to-emerald-700/40 flex items-center justify-center shadow-inner border border-green-800/50">
                <div className="bg-sidebar-primary text-sidebar-primary-foreground flex aspect-square size-7 items-center justify-center rounded-sm">
                  <Command className="size-4" />
                </div>
                <div className="grid flex-1 text-left text-xs leading-tight">
                  <span className="truncate font-bold text-emerald-400">AlphaFusion</span>
                  <span className="truncate text-[11px] text-green-200/80">Finance</span>
                </div>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
