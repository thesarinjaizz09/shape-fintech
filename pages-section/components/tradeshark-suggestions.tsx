'use client'
import { Bot, Brain } from "lucide-react";
import WindowLayout from "@/components/window-layout";
import DynamicTable from "@/components/global/dynamic-table";
import SentimentMeter from "@/components/global/sentiment-gauge";

const TradesharkSuggestions = () => {

    const tableData = [
        { "Bot Name": "Astra AI", "ROI %": "12.5%", "Risk Level": "Low" },
        { "Bot Name": "Valkyrie Pro", "ROI %": "8.7%", "Risk Level": "Medium" },
        { "Bot Name": "Sentinel Edge", "ROI %": "15.2%", "Risk Level": "High" },
        { "Bot Name": "TitanX", "ROI %": "9.3%", "Risk Level": "Medium" },
        { "Bot Name": "NeuralAlpha", "ROI %": "11.8%", "Risk Level": "Low" },
        { "Bot Name": "RedMamba", "ROI %": "17.6%", "Risk Level": "High" },
    ];


    return (
        <WindowLayout title="Autobots Overview" icon={Bot} showFilters={true} fit={true}>
            <div className="flex items-start justify-between p-2 mb-2 shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 bg-gradient-to-r from-emerald-500/20 to-green-800/30 border border-green-900/40 p-2 rounded-sm">
                <div>
                    <h3 className="text-[10px] text-gray-400">Overall Sentiment</h3>
                    <div className="text-[11px] font-semibold text-green-400">Bullish</div>
                </div>
                <SentimentMeter value={82} />
            </div>
            <DynamicTable headers={["Bot Name", "ROI %", "Risk Level"]} data={tableData} rowsPerPageProps={3} showActions={true} />
        </WindowLayout>
    );
};

export default TradesharkSuggestions;
