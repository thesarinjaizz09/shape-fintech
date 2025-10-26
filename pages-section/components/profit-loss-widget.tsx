"use client"
import { useState } from "react"
import WindowLayout from "@/components/window-layout"
import {
    BarChart,
    Bar,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid,
} from "recharts"
import {
    Tooltip as TooltipPrimitive,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import ModernTimeFilter from "@/components/global/time-filters"
import { BarChart3, Timer } from "lucide-react"

const classes =
    "bg-[#001f11]/95 border border-accent/30 text-gray-200 rounded-md p-2 text-[10px] shadow-lg min-w-[50px] max-w-[180px] whitespace-pre-wrap";

const ProfitLossSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
    const barData = Array.from({ length: 8 }, (_, i) => ({
        name: `Day ${i + 1}`,
        profit: Math.random() * 1000 + (Math.random() > 0.5 ? 200 : -200),
    }))
    const pieData = [
        { name: "Trading", value: 45 },
        { name: "AI Bots", value: 30 },
        { name: "Mining", value: 25 },
    ]
    const totalValue = pieData.reduce((acc, cur) => acc + cur.value, 0)

    const COLORS = ["#34d399", "#10b981", "#064e3b"]

    return (
        <WindowLayout
            title="Profit & Loss Overview"
            icon={BarChart3}
            showFilters={false}
            className="col-span-2"
            full={true}
        >
            <div className=" grid md:grid-cols-2 gap-2 col-span-2 h-full">
                {/* Bar Chart */}
                <div className="h-full flex flex-col bg-gradient-to-r from-emerald-500/20 to-green-800/30 border border-green-900/40 p-2 rounded-sm">
                    <span className="text-[10px] text-green-300/80 font-semibold mb-5 border-b pb-1 border-accent flex items-center justify-between">
                        Profit Performance
                        <DropdownMenu>
                            <TooltipPrimitive>
                                <TooltipTrigger asChild>
                                    <DropdownMenuTrigger asChild>
                                        <Timer
                                            className="w-3 h-3 cursor-pointer text-gray-400 hover:text-accent transition"
                                        />
                                    </DropdownMenuTrigger>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className={classes}>
                                    Sort/Filter
                                </TooltipContent>
                            </TooltipPrimitive>

                            <DropdownMenuContent
                                side="bottom"
                                align="end"
                                className="text-[10px] max-w-lg text-emerald-100/80 bg-gradient-to-br from-[#000d08] via-[#001a10] to-[#000f09] shadow-inner border border-green-800/50 border-gray-700"
                            >
                                <ModernTimeFilter showSectorFilter={true} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </span>
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={barData} margin={{ top: 5, right: 5, left: -35, bottom: -10 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="rgba(52, 211, 153, 0.1)" vertical={false} />
                            <XAxis
                                dataKey="name"
                                tick={{ fill: "#a7f3d0", fontSize: 9 }}
                                stroke="rgba(52, 211, 153, 0.3)"
                                axisLine={{ stroke: "rgba(52, 211, 153, 0.3)" }}
                            />
                            <YAxis
                                tick={{ fill: "#a7f3d0", fontSize: 9 }}
                                stroke="rgba(52, 211, 153, 0.3)"
                                axisLine={{ stroke: "rgba(52, 211, 153, 0.3)" }}
                            />
                            <Tooltip
                                cursor={{ fill: "rgba(6, 95, 70, 0.1)" }}
                                contentStyle={{
                                    color: "#ffffff", // text color white
                                    background: "linear-gradient(to bottom right, #78968aff, #2e5244ff, #2b3d36ff)", // gradient
                                    boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)", // shadow-inner
                                    border: "1px solid rgba(0,128,0,0.5)", // border-green-800/50
                                    borderRadius: "0.125rem", // rounded-sm (~2px)
                                    padding: "0.25rem 0.5rem", // slightly smaller padding        
                                }}
                            />
                            <Bar
                                dataKey="profit"
                                fill="url(#barGradient)"
                                radius={[3, 3, 0, 0]}
                                barSize={18}
                            />
                            <defs>
                                <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="0%" stopColor="#34d399" stopOpacity={0.9} />
                                    <stop offset="100%" stopColor="#065f46" stopOpacity={0.6} />
                                </linearGradient>
                            </defs>
                        </BarChart>
                    </ResponsiveContainer>
                </div>

                {/* Pie Chart */}
                <div className="h-full flex flex-col bg-gradient-to-r from-emerald-500/20 to-green-800/30 border border-green-900/40 p-2 rounded-sm relative">
                    {/* Header */}
                    <span className="text-[10px] text-green-300/80 font-semibold border-b border-accent pb-1 flex items-center justify-between">
                        Portfolio Allocation
                        <DropdownMenu>
                            <TooltipPrimitive>
                                <TooltipTrigger asChild>
                                    <DropdownMenuTrigger asChild>
                                        <Timer
                                            className="w-3 h-3 cursor-pointer text-gray-400 hover:text-accent transition"
                                        />
                                    </DropdownMenuTrigger>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className={classes}>
                                    Sort/Filter
                                </TooltipContent>
                            </TooltipPrimitive>

                            <DropdownMenuContent
                                side="bottom"
                                align="end"
                                className="text-[10px] max-w-lg text-emerald-100/80 bg-gradient-to-br from-[#000d08] via-[#001a10] to-[#000f09] shadow-inner border border-green-800/50 border-gray-700"
                            >
                                <ModernTimeFilter showSectorFilter={true} />
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </span>
                    <div className="mb-3">
                        {/* Legends Column */}
                        <div className="flex flex-row mt-2 gap-1 text-[9px] text-green-200/70 w-full flex justify-end items-end">
                            {pieData.map((entry, i) => (
                                <div
                                    key={i}
                                    className="flex items-center gap-1 cursor-pointer transition-all duration-150 hover:text-green-100"
                                    onMouseEnter={() => setHoveredIndex(i)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    <span
                                        className="w-2 h-2 rounded-full"
                                        style={{
                                            backgroundColor: COLORS[i % COLORS.length],
                                            boxShadow:
                                                hoveredIndex === i
                                                    ? `0 0 6px ${COLORS[i % COLORS.length]}77`
                                                    : "none",
                                        }}
                                    ></span>
                                    <span className="font-medium">
                                        {entry.name} ({((entry.value / totalValue) * 100).toFixed(1)}%)
                                    </span>
                                </div>
                            ))}
                        </div>

                        {/* Optional Small Summary */}
                        <div className="mt-1 text-[8px] text-green-300/70 text-right">
                            Total Allocation: {totalValue} units across {pieData.length} categories
                        </div>
                    </div>

                    {/* Chart */}
                    <div className="flex items-center justify-center flex-1">
                        <ResponsiveContainer width="90%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    innerRadius="60%"
                                    outerRadius="80%"
                                    paddingAngle={4}
                                    dataKey="value"
                                    onMouseEnter={(_, index) => setHoveredIndex(index)}
                                    onMouseLeave={() => setHoveredIndex(null)}
                                >
                                    {pieData.map((entry, i) => (
                                        <Cell
                                            key={i}
                                            fill={COLORS[i % COLORS.length]}
                                            style={{
                                                transition: "transform 0.3s, filter 0.3s",
                                                transform: hoveredIndex === i ? "scale(1.05)" : "scale(1)",
                                                filter:
                                                    hoveredIndex === i
                                                        ? `drop-shadow(0 0 8px ${COLORS[i % COLORS.length]}77)`
                                                        : "none",
                                            }}
                                        />
                                    ))}
                                </Pie>
                                <Tooltip
                                    cursor={{ fill: "rgba(6, 95, 70, 0.1)" }}
                                    contentStyle={{
                                        color: "#ffffff", // text color white
                                        background: "linear-gradient(to bottom right, #78968aff, #2e5244ff, #2b3d36ff)", // gradient
                                        boxShadow: "inset 0 2px 4px rgba(0,0,0,0.6)", // shadow-inner
                                        border: "1px solid rgba(0,128,0,0.5)", // border-green-800/50
                                        borderRadius: "0.125rem", // rounded-sm (~2px)
                                        padding: "0.25rem 0.5rem", // slightly smaller padding        
                                    }}

                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>



            </div>
        </WindowLayout>
    )
}

export default ProfitLossSection
