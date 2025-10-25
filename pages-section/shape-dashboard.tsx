"use client"

import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from "@/components/site-header"
import GlobalIndicesCaraousel from '@/components/global/global-indices-caraousel'
import {
  SidebarInset,
  SidebarProvider,
} from "@/components/ui/sidebar"

const ShapeDashboard = () => {
  return (
    <div className="[--header-height:calc(--spacing(11.5))] bg-gradient-to-br from-[#000d08] via-[#001a10] to-[#000f09] text-green-100 antialiased backdrop-blur-2xl">
      <SidebarProvider className="flex flex-col">
        <SiteHeader />
        <div className="flex flex-1">
          <AppSidebar />
          <SidebarInset>
            <div className="grid grid-cols-1 p-2">
              <GlobalIndicesCaraousel selectedExchange="NASDAQ" />
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default ShapeDashboard