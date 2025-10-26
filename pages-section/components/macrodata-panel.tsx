"use client";

import { Diff, Shapes } from "lucide-react";
import WindowLayout from "@/components/window-layout";
import DynamicTable from "@/components/global/dynamic-table";

const MacroDataPanel = () => {
    // --- Data ---
const miningTableData = [
  {
    "Device": "TeslaRig",
    "Pool": "Ethermine",
    "Coin": "ETH",
    "Hash Rate": "120 MH/s",
    "Uptime %": "99.2%",
    "Current Reward": "+$12.50",
    "Change %": "3.2%",
    "Performance": "Good"
  },
  {
    "Device": "NVIDIA Rig",
    "Pool": "F2Pool",
    "Coin": "ETH",
    "Hash Rate": "95 MH/s",
    "Uptime %": "97.8%",
    "Current Reward": "+$9.80",
    "Change %": "1.8%",
    "Performance": "Average"
  },
  {
    "Device": "AMD GPUs",
    "Pool": "Ethermine",
    "Coin": "ETH",
    "Hash Rate": "60 MH/s",
    "Uptime %": "100%",
    "Current Reward": "+$6.75",
    "Change %": "4.1%",
    "Performance": "Good"
  },
  {
    "Device": "BTC ASIC",
    "Pool": "F2Pool",
    "Coin": "BTC",
    "Hash Rate": "50 MH/s",
    "Uptime %": "96.5%",
    "Current Reward": "+$5.20",
    "Change %": "-0.5%",
    "Performance": "Poor"
  },
  {
    "Device": "ASIC",
    "Pool": "SlushPool",
    "Coin": "BTC",
    "Hash Rate": "400 GH/s",
    "Uptime %": "99.9%",
    "Current Reward": "+$25.00",
    "Change %": "5.0%",
    "Performance": "Excellent"
  },
  {
    "Device": "Load Rig",
    "Pool": "Ethermine",
    "Coin": "ETH",
    "Hash Rate": "110 MH/s",
    "Uptime %": "98.7%",
    "Current Reward": "+$11.20",
    "Change %": "2.5%",
    "Performance": "Good"
  },
];


    const headers = ["Device", "Pool", "Coin", "Hash Rate", "Uptime %", "Current Reward", "Change %", "Performance"]


    return (
        <WindowLayout title="Mining Overview" icon={Shapes} fit={true} className="col-span-2">
            <div className="flex gap-3 text-[10px] text-gray-400 mb-2">
                <button className="flex items-center gap-1 hover:text-accent bg-[#10182A] rounded-sm px-2 py-1 border border-gray-700">
                    <Diff className="w-3 h-3" />
                    Buy Mining Rig 
                </button>
                <button className="flex items-center gap-1 hover:text-accent bg-[#10182A] rounded-sm px-2 py-1 border border-gray-700">
                    <Diff className="w-3 h-3" />
                    Invest In Pool
                </button>
            </div>
            <DynamicTable
                headers={headers}
                data={miningTableData}
                rowsPerPageProps={6}
            />
        </WindowLayout>
    );
};

export default MacroDataPanel;
