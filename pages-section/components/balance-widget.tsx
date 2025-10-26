"use client"

import React, { useEffect, useState } from "react"
import WindowLayout from "@/components/window-layout"
import { Scale, ArrowUpRight, ArrowDownRight } from "lucide-react"
import { LineChart, Line, ResponsiveContainer, XAxis, YAxis } from "recharts"

const BalanceWidget = () => {
    const [vaults, setVaults] = useState<any[]>([])

    useEffect(() => {
        // Generate all random data client-side only (after hydration)
        const generateTrendData = () =>
            Array.from({ length: 8 }, (_, i) => ({
                name: `T${i + 1}`,
                value: Math.random() * 100 + (Math.random() > 0.5 ? 20 : -20),
            }))

        const generatedVaults = ["Main Vault", "Trading Vault", "Autobot Vault", "Mining Vault"].map((title) => {
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
            <WindowLayout title="Account Balance Widget" icon={Scale} fit={true} showFilters={true}>
                <p className="text-sm text-gray-400">Loading balances...</p>
            </WindowLayout>
        )

    return (
        <WindowLayout title="Account Balance Widget" icon={Scale} fit={true} showFilters={false}>
            <div className="grid md:grid-cols-4 gap-2">
                {vaults.map(({ title, balance, change, isPositive, data }, i) => (
                    <div
                        key={i}
                        className="p-2 py-2 rounded-sm bg-gradient-to-r from-emerald-500/20 to-green-800/30 text-emerald-300 border border-green-900/40 hover:from-emerald-500/30 hover:to-green-700/40 transition grid md:grid-cols-2 gap-1"
                    >
                        {/* Left Side Info */}
                        <div className="flex flex-col justify-between">
                            <div>
                                <span className="text-[11px] text-green-300/80 font-semibold">{title}</span>
                                <p className="text-sm font-bold text-green-100 mt-2">${balance}</p>
                            </div>
                            <div className="flex items-center mt-1">
                                {isPositive ? (
                                    <ArrowUpRight size={10} className="text-emerald-400" />
                                ) : (
                                    <ArrowDownRight size={10} className="text-red-400" />
                                )}
                                <span
                                    className={`text-[10px] font-semibold ${isPositive ? "text-emerald-400" : "text-red-400"
                                        }`}
                                >
                                    {isPositive ? "+" : ""}
                                    {change}%
                                </span>
                            </div>
                        </div>

                        {/* Right Side Chart */}
                        <div className="flex items-end justify-end">
                            <div className="w-full h-full">
                                <ResponsiveContainer width="100%" height="100%">
                                    <LineChart
                                        data={data}
                                        margin={{ top: 0, right: 0, left: -50, bottom: -30 }}
                                    >
                                        {/* Subtle Axis Lines Only */}
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
                                            stroke={isPositive ? "#34d399" : "#f87171"}
                                            strokeWidth={1.2}
                                            dot={false}
                                            isAnimationActive={false}
                                        />
                                    </LineChart>
                                </ResponsiveContainer>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </WindowLayout>
    )
}

export default BalanceWidget
