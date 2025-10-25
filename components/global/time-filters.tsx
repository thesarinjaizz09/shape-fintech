"use client";

import * as React from "react";
import { useState } from "react";
import { Combobox } from "@/components/ui/combobox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { Calendar as CalendarPicker } from "@/components/ui/calendar";
import { dummySectionsData } from "@/data/section.data";

interface TimeFilterBarProps {
    showSectorFilter?: boolean
}

type TimeRange = {
    label: string;
    value: string;
};

const timeRanges: { [group: string]: TimeRange[] } = {
    Intraday: [
        { label: "1 Minute", value: "1m" },
        { label: "5 Minutes", value: "5m" },
        { label: "15 Minutes", value: "15m" },
        { label: "30 Minutes", value: "30m" },
        { label: "1 Hour", value: "1h" },
    ],
    Daily: [
        { label: "1 Day", value: "1d" },
        { label: "3 Days", value: "3d" },
        { label: "1 Week", value: "1w" },
    ],
    Monthly: [
        { label: "1 Month", value: "1M" },
        { label: "3 Months", value: "3M" },
        { label: "6 Months", value: "6M" },
    ],
    Yearly: [
        { label: "1 Year", value: "1Y" },
        { label: "YTD", value: "ytd" },
    ],
    Custom: [
        { label: "Custom Range", value: "custom" }
    ],
};

export default function ModernTimeFilter({ showSectorFilter = true}: TimeFilterBarProps) {
    const [selected, setSelected] = useState<TimeRange>({ label: "1 Minute", value: "1m" });
    const [customRange, setCustomRange] = useState<{ from?: Date; to?: Date }>({});

    // Handler for Combobox selection
    const handleSelect = (range: TimeRange) => {
        setSelected(range);
        // Reset customRange if user selects non-custom
        if (range.value !== "custom") {
            setCustomRange({ from: undefined, to: undefined });
        }
    };

    return (
        <div className="rounded-xs p-2">
            {
                showSectorFilter && <div className="mb-2">
                    <Combobox mode="Select Mode..." span="full" items={dummySectionsData} />
                </div>
            }

            <div className="grid grid-cols-1 md:grid-cols-3 gap-2">
                {Object.keys(timeRanges).map((group) => (
                    <div key={group} className="relative">
                        <Combobox
                            span="full"
                            mode={group}
                            items={timeRanges[group]}
                            onSelect={handleSelect} // Pass handler
                            value={selected.value} // Bind selected value
                        />
                    </div>
                ))}

                {/* Custom Date Picker */}
                {selected.value === "custom" && (
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button className="bg-[#16223B]/80 shadow-lg text-accent justify-between h-[30px] font-normal text-[9px] rounded-sm transition-all duration-300 backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 overflow-hidden text-ellipsis border flex items-center">
                                <Calendar className="w-3 h-3" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="bg-[#0B1320] border border-gray-700 rounded-md shadow-lg p-4 w-auto">
                            <div className="flex flex-col gap-3">
                                <div>
                                    <label className="text-sm text-gray-200">From:</label>
                                    <CalendarPicker
                                        mode="single"
                                        selected={customRange.from}
                                        onSelect={(date) =>
                                            setCustomRange({ ...customRange, from: date || undefined })
                                        }
                                        className="bg-[#0A0F1C] rounded-md text-gray-100"
                                    />
                                </div>
                                <div>
                                    <label className="text-sm text-gray-200">To:</label>
                                    <CalendarPicker
                                        mode="single"
                                        selected={customRange.to}
                                        onSelect={(date) =>
                                            setCustomRange({ ...customRange, to: date || undefined })
                                        }
                                        className="bg-[#0A0F1C] rounded-md text-gray-100"
                                    />
                                </div>
                            </div>
                        </PopoverContent>
                    </Popover>
                )}
            </div>
        </div>
    );
}
