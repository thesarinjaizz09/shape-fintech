"use client"

import {
  BadgeCheck,
  Bell,
  ChevronsUpDown,
  CreditCard,
  LogOut,
  Sparkles,
} from "lucide-react"

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar"

export function NavUser({
  user,
}: {
  user: {
    name: string
    email: string
    avatar: string
  }
}) {
  const { isMobile } = useSidebar()

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground bg-gradient-to-tr from-green-500/20 to-emerald-700/40 flex items-center justify-center shadow-inner border border-green-800/50"
            >
              <Avatar className="h-7 w-7">
                <AvatarImage src={user.avatar} alt={user.name} />
                <AvatarFallback className="text-[10px]">CN</AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left text-[11px] leading-tight">
                <span className="truncate font-medium text-green-200/80">{user.name}</span>
                <span className="truncate text-[10px] text-green-200/50">{user.email}</span>
              </div>
              <ChevronsUpDown className="ml-auto size-3 text-emerald-100/80" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-(--radix-dropdown-menu-trigger-width) min-w-56 rounded-md bg-gradient-to-br from-[#000d08] via-[#001a10] to-[#000f09] shadow-inner border border-green-800/50"
            side={isMobile ? "bottom" : "right"}
            align="end"
            sideOffset={4}
          >
            <DropdownMenuLabel className="p-0 font-normal">
              <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                <Avatar className="h-7 w-7">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback className="text-[10px]">CN</AvatarFallback>
                </Avatar>
                <div className="grid flex-1 text-left text-[11px] leading-tight">
                  <span className="truncate font-medium text-green-200/80">{user.name}</span>
                  <span className="truncate text-[10px] text-green-200/50">{user.email}</span>
                </div>
              </div>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-green-200/50 text-[10px]">
                <Sparkles style={{
                  width: '14px',
                  height: '14px'
                }} />
                Upgrade to Pro
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem className="text-green-200/50 text-[10px]">
                <BadgeCheck style={{
                  width: '14px',
                  height: '14px'
                }} />
                Account
              </DropdownMenuItem>
              <DropdownMenuItem className="text-green-200/50 text-[10px]">
                <CreditCard style={{
                  width: '14px',
                  height: '14px'
                }} />
                Billing
              </DropdownMenuItem>
              <DropdownMenuItem className="text-green-200/50 text-[10px]">
                <Bell style={{
                  width: '14px',
                  height: '14px'
                }} />
                Notifications
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-green-200/50 text-[10px]">
              <LogOut style={{
                width: '14px',
                height: '14px'
              }} />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  )
}
