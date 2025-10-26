'use client'
import { Bot, Brain, CircleDollarSign } from "lucide-react";
import WindowLayout from "@/components/window-layout";
import DynamicTable from "@/components/global/dynamic-table";
import SentimentMeter from "@/components/global/sentiment-gauge";
import { useCurrency } from "@/hooks/use-currency";
import { format } from "path";


const TradingEarnings = () => {
    const { formatPrice } = useCurrency();

    const tableData = [
        { Ticker: "AAPL", Action: "BUY", Target: "$220", Horizon: "2W", Score: "8.5" },
        { Ticker: "TSLA", Action: "HOLD", Target: "$250", Horizon: "1M", Score: "8.5" },
        { Ticker: "MSFT", Action: "SELL", Target: "$395", Horizon: "3D", Score: "8.5" },
        { Ticker: "MSFT", Action: "SELL", Target: "$395", Horizon: "3D", Score: "8.5" },
        { Ticker: "MSFT", Action: "SELL", Target: "$395", Horizon: "3D", Score: "8.5" },
        { Ticker: "MSFT", Action: "SELL", Target: "$395", Horizon: "3D", Score: "8.5" },
    ];

    return (
        <WindowLayout title="Trading Earnings Overview" icon={CircleDollarSign} showFilters={false} fit={true}>
            <div className="flex items-start justify-between p-2 mb-2 shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 bg-gradient-to-r from-emerald-500/20 to-green-800/30 border border-green-900/40 p-2 rounded-sm">
                <div>
                    <h3 className="text-[10px] text-gray-400">Session Earnings</h3>
                    <div className="text-[11px] font-semibold text-green-400">{formatPrice(1000)}</div>
                </div>
                <SentimentMeter value={82} />
            </div>
            <DynamicTable headers={["Ticker", "Action", "Target", "Horizon", "Score"]} data={tableData} rowsPerPageProps={3} />
        </WindowLayout>
    );
};

export default TradingEarnings;
