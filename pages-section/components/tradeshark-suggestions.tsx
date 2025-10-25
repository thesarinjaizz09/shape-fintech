'use client'
import { Bot, Brain } from "lucide-react";
import WindowLayout from "@/components/window-layout";
import DynamicTable from "@/components/global/dynamic-table";
import SentimentMeter from "@/components/global/sentiment-gauge";

const TradesharkSuggestions = () => {

    const tableData = [
        { Ticker: "AAPL", Action: "BUY", Target: "$220", Horizon: "2W", Score: "8.5" },
        { Ticker: "TSLA", Action: "HOLD", Target: "$250", Horizon: "1M", Score: "8.5" },
        { Ticker: "MSFT", Action: "SELL", Target: "$395", Horizon: "3D", Score: "8.5" },
        { Ticker: "MSFT", Action: "SELL", Target: "$395", Horizon: "3D", Score: "8.5" },
        { Ticker: "MSFT", Action: "SELL", Target: "$395", Horizon: "3D", Score: "8.5" },
        { Ticker: "MSFT", Action: "SELL", Target: "$395", Horizon: "3D", Score: "8.5" },
    ];

    return (
        <WindowLayout title="Autobots Overview" icon={Bot} showFilters={false}>
            <div className="flex items-start justify-between p-2 mb-2 shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 bg-gradient-to-r from-emerald-500/20 to-green-800/30 border border-green-900/40 p-2 rounded-sm">
                <div>
                    <h3 className="text-[10px] text-gray-400">Overall Sentiment</h3>
                    <div className="text-[11px] font-semibold text-green-400">Bullish</div>
                </div>
                <SentimentMeter value={82} />
            </div>
            <DynamicTable headers={["Ticker", "Action", "Target", "Horizon", "Score"]} data={tableData} />
        </WindowLayout>
    );
};

export default TradesharkSuggestions;
