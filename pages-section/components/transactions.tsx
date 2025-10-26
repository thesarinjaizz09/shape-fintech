'use client'
import {
    useState, useEffect
} from "react";
import { CircleDollarSign, Scale } from "lucide-react";
import WindowLayout from "@/components/window-layout";
import DynamicTable from "@/components/global/dynamic-table";
import { useCurrency } from "@/hooks/use-currency";
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts"



const Transactions = () => {
    const { formatPrice } = useCurrency();
    const [vaults, setVaults] = useState<any[]>([])

    useEffect(() => {
        // Generate all random data client-side only (after hydration)
        const generateTrendData = () =>
            Array.from({ length: 8 }, (_, i) => ({
                name: `T${i + 1}`,
                value: Math.random() * 100 + (Math.random() > 0.5 ? 20 : -20),
            }))

        const generatedVaults = ["Main Vault"].map((title) => {
            const balance = (Math.random() * 10000).toFixed(2)
            const change = (Math.random() * 10 - 5).toFixed(2) // -5% to +5%
            const isPositive = parseFloat(change) >= 0
            const data = generateTrendData()
            return { title, balance, change, isPositive, data }
        })

        setVaults(generatedVaults)
    }, [])

    if (vaults.length === 0)
        return (
            <WindowLayout title="Account Balance Widget" icon={Scale} fit={true} showFilters={false}>
                <p className="text-sm text-gray-400">Loading balances...</p>
            </WindowLayout>
        )

const transactionsData = [
  {
    "ID": "TXN-1001",
    "Date": "2025-10-25 09:15",
    "Type": "Buy",
    "Asset": "AAPL",
    "Amount ($)": "1,200.50",
    "Status": "Completed"
  },
  {
    "ID": "TXN-1002",
    "Date": "2025-10-25 11:30",
    "Type": "Sell",
    "Asset": "TSLA",
    "Amount ($)": "950.75",
    "Status": "Completed"
  },
  {
    "ID": "TXN-1003",
    "Date": "2025-10-25 14:20",
    "Type": "Deposit",
    "Asset": "USD",
    "Amount ($)": "2,500.00",
    "Status": "Completed"
  },
  {
    "ID": "TXN-1004",
    "Date": "2025-10-25 16:45",
    "Type": "Withdrawal",
    "Asset": "USD",
    "Amount ($)": "1,000.00",
    "Status": "Pending"
  },
  {
    "ID": "TXN-1005",
    "Date": "2025-10-25 17:30",
    "Type": "Buy",
    "Asset": "ETH-USD",
    "Amount ($)": "1,800.00",
    "Status": "Completed"
  },
  {
    "ID": "TXN-1006",
    "Date": "2025-10-25 18:50",
    "Type": "Sell",
    "Asset": "BTC-USD",
    "Amount ($)": "3,200.25",
    "Status": "Completed"
  },
  {
    "ID": "TXN-1007",
    "Date": "2025-10-25 20:10",
    "Type": "Deposit",
    "Asset": "USD",
    "Amount ($)": "500.00",
    "Status": "Completed"
  },
];


    return (
        <WindowLayout title="Trading Earnings Overview" icon={CircleDollarSign} showFilters={true} fit={true} showSectorFilter={false}>
            <div className="flex items-start justify-between p-2 mb-2 shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 bg-gradient-to-r from-emerald-500/20 to-green-800/30 border border-green-900/40 p-2 rounded-sm">
                <div>
                    <h3 className="text-[10px] text-gray-400">Transaction Volume</h3>
                    <div className="text-[11px] font-semibold text-green-400">{formatPrice(1000)}</div>
                </div>
                <div className="flex items-end justify-end h-[35px] w-[70px]">
                    <div className="w-full h-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                                data={vaults[0].data}
                                margin={{ top: 0, right: 0, left: -60, bottom: -30 }}
                            >
                                <XAxis
                                    axisLine={{ stroke: "rgba(52, 211, 153, 0.3)", strokeWidth: 1 }}
                                    tickLine={false}
                                    ticks={[]}
                                    tick={false}
                                />
                                <YAxis
                                    axisLine={{ stroke: "rgba(52, 211, 153, 0.3)", strokeWidth: 1 }}
                                    tickLine={false}
                                    ticks={[]}
                                    tick={false}
                                    domain={["auto", "auto"]}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="value"
                                    stroke={vaults[0].isPositive ? "#34d399" : "#f87171"}
                                    strokeWidth={1.2}
                                    dot={false}
                                    isAnimationActive={false}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </div>
            <DynamicTable headers={["ID", "Date", "Type", "Asset", "Amount ($)", "Status"]} data={transactionsData} rowsPerPageProps={4} />
        </WindowLayout>
    );
};

export default Transactions;
