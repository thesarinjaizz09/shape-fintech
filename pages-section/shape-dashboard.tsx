"use client"

import { AppSidebar } from '@/components/app-sidebar'
import { SiteHeader } from "@/components/site-header"
import GlobalIndicesCaraousel from '@/components/global/global-indices-caraousel'
import BalanceWidget from './components/balance-widget'
import ProfitLossWidget from './components/profit-loss-widget'
import TradesharkSuggestions from './components/tradeshark-suggestions'
import TradingEarnings from './components/trading-earnings'
import EarningsEventsPanel from './components/earnings-events-panel'
import SocialSentimentBoard from './components/social-sentiment-board'
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
          <SidebarInset className='max-h-[calc(100vh-(var(--spacing)*11.5))] overflow-hidden overflow-y-auto'>
            <div className="grid grid-cols-1 p-2 gap-2">
              <GlobalIndicesCaraousel selectedExchange="NASDAQ" />
              <BalanceWidget />
              <div className="grid grid-cols-3 gap-2">
                <ProfitLossWidget />
                <TradesharkSuggestions />
              </div>
              <div className="grid grid-cols-3 gap-2">
                <TradingEarnings />
                <EarningsEventsPanel />
                <SocialSentimentBoard />
              </div>
              <div className="w-full bg-[#0A0F1C] px-4 py-3 text-gray-400 flex items-center justify-center border border-gray-800 rounded-sm w-full text-gray-200 text-[10px] transition-all duration-300 backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 relative overflow-hidden bg-[#001f11]/70 border border-green-900/40 backdrop-blur-md">
                Designed & Developed with ❤️ by Alphafusion Corporation
              </div>
            </div>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default ShapeDashboard