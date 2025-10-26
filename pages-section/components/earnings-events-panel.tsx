"use client";
import { useState, useMemo } from "react";
import {
    ArrowUpDown,
    ChevronLeft,
    ChevronRight,
    Search,
    CalendarDays,
    Building2,
    LineChart,
    AlertTriangle,
    Clock,
    DollarSign,
} from "lucide-react";
import WindowLayout from "@/components/window-layout";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { NoResults } from "@/components/ui/no-results";

interface EventItem {
    Date: string;
    Company: string;
    Type: "Earnings" | "Dividend" | "IPO" | "Corporate Event";
    Description: string;
    EPS?: string;
    Dividend?: string;
    Impact: "High" | "Medium" | "Low";
    Source?: string;
}

const eventData: EventItem[] = [
    {
        Date: "2025-10-21",
        Company: "Infosys Ltd",
        Type: "Earnings",
        Description: "Q2 FY25 Results Release",
        EPS: "₹22.3",
        Impact: "High",
        Source: "NSE",
    },
    {
        Date: "2025-10-22",
        Company: "HDFC Bank",
        Type: "Dividend",
        Description: "₹19.00/share Interim Dividend Payout",
        Dividend: "₹19.00",
        Impact: "Medium",
        Source: "BSE",
    },
    {
        Date: "2025-10-23",
        Company: "Reliance Industries",
        Type: "Earnings",
        Description: "Q3 Earnings Release — Energy and Retail Focus",
        EPS: "₹29.7",
        Impact: "High",
        Source: "Bloomberg",
    },
    {
        Date: "2025-10-25",
        Company: "Zomato Ltd",
        Type: "Corporate Event",
        Description: "IPO Lockup Expiry for Institutional Holders",
        Impact: "Low",
        Source: "Reuters",
    },
    {
        Date: "2025-10-27",
        Company: "Tata Motors",
        Type: "Earnings",
        Description: "Quarterly Results Announcement",
        EPS: "₹14.9",
        Impact: "Medium",
        Source: "CNBC",
    },
    {
        Date: "2025-10-27",
        Company: "Tata Motors",
        Type: "Earnings",
        Description: "Quarterly Results Announcement",
        EPS: "₹14.9",
        Impact: "Medium",
        Source: "CNBC",
    },
    {
        Date: "2025-10-27",
        Company: "Tata Motors",
        Type: "Earnings",
        Description: "Quarterly Results Announcement",
        EPS: "₹14.9",
        Impact: "Medium",
        Source: "CNBC",
    },
];

const impactColor = (impact: string) => {
    switch (impact.toLowerCase()) {
        case "high":
            return "text-red-400 border-red-400/30";
        case "medium":
            return "text-yellow-400 border-yellow-400/30";
        default:
            return "text-green-400 border-green-400/30";
    }
};

const typeIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case "earnings":
            return <LineChart className="w-4 h-4 text-sky-400" />;
        case "dividend":
            return <DollarSign className="w-4 h-4 text-emerald-400" />;
        case "ipo":
            return <Building2 className="w-4 h-4 text-yellow-400" />;
        default:
            return <AlertTriangle className="w-4 h-4 text-purple-400" />;
    }
};

export default function EarningsEventsPanel({ rowsPerPage = 3 }: { rowsPerPage?: number }) {
    const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
    const [search, setSearch] = useState("");
    const [sortConfig, setSortConfig] = useState<{ key: keyof EventItem; direction: "asc" | "desc" } | null>({
        key: "Date",
        direction: "asc",
    });
    const [currentPage, setCurrentPage] = useState(1);

    // --- Filter + Sort ---
    const filteredData = useMemo(() => {
        let tempData = [...eventData];

        if (search) {
            const lower = search.toLowerCase();
            tempData = tempData.filter(
                (e) =>
                    e.Company.toLowerCase().includes(lower) ||
                    e.Type.toLowerCase().includes(lower) ||
                    e.Description.toLowerCase().includes(lower)
            );
        }

        if (sortConfig) {
            const { key, direction } = sortConfig;
            tempData.sort((a, b) => {
                let aVal: any = a[key];
                let bVal: any = b[key];

                // Sort dates properly
                if (key === "Date") {
                    aVal = new Date(aVal).getTime();
                    bVal = new Date(bVal).getTime();
                }

                if (typeof aVal === "number" && typeof bVal === "number") {
                    return direction === "asc" ? aVal - bVal : bVal - aVal;
                }

                return direction === "asc"
                    ? String(aVal).localeCompare(String(bVal))
                    : String(bVal).localeCompare(String(aVal));
            });
        }

        return tempData;
    }, [search, sortConfig]);

    // --- Pagination ---
    const totalPages = Math.ceil(filteredData.length / rowsPerPage);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * rowsPerPage;
        return filteredData.slice(start, start + rowsPerPage);
    }, [filteredData, currentPage]);

    const handleSort = (key: keyof EventItem) => {
        if (sortConfig?.key === key) {
            setSortConfig({ key, direction: sortConfig.direction === "asc" ? "desc" : "asc" });
        } else {
            setSortConfig({ key, direction: "asc" });
        }
    };

    return (
        <WindowLayout title="Events & News" icon={CalendarDays} fit={true}>
            {/* Search + Sort */}
            <div className="flex flex-col md:flex-row items-center justify-between mb-2 gap-2">
                <div className="flex items-center rounded-sm px-2 py-1 w-full max-w-xs bg-[#001f11]/70 border border-gray-700">
                    <Search className="w-3 h-3 text-gray-400 mr-2" />
                    <input
                        type="text"
                        placeholder="Search..."
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setCurrentPage(1);
                        }}
                        className="bg-transparent text-gray-200 text-[10px] outline-none w-full"
                    />
                </div>
                <div className="flex gap-3 text-[10px] text-gray-400">
                    <button
                        onClick={() => handleSort("Date")}
                        className="flex items-center gap-1 hover:text-accent bg-[#001f11]/70 border border-gray-700 rounded-sm px-2 py-1"
                    >
                        Date <ArrowUpDown className="w-3 h-3" />
                    </button>
                    <button
                        onClick={() => handleSort("Impact")}
                        className="flex items-center gap-1 hover:text-accent bg-[#001f11]/70 border border-gray-700 rounded-sm px-2 py-1"
                    >
                        Impact <ArrowUpDown className="w-3 h-3" />
                    </button>
                </div>
            </div>

            {/* Cards */}
            <div className="flex flex-col gap-1">
                {paginatedData.length > 0 ? (
                    paginatedData.map((event, idx) => (
                        <div
                            key={idx}
                            onClick={() => setSelectedEvent(event)}
                            className="cursor-pointer bg-gradient-to-r from-emerald-500/20 to-green-800/30 border border-green-900/40 p-2 rounded-sm shadow-md hover:shadow-[#E3B341]/20 transition-all flex flex-col"
                        >

                            <div className="flex justify-between items-start">
                                <span className="text-gray-400 text-[9px]">{event.Company}</span>
                                <span
                                    className={`text-[9px] font-semibold ${impactColor(event.Impact)} uppercase`}
                                >
                                    {event.Impact}
                                </span>
                            </div>
                            <h4 className="text-gray-200 font-medium text-[10px] mt-1 line-clamp-2">{event.Description.length > 45 ? `${event.Description.substring(0, 45)}...` : event.Description}</h4>
                            <div className="flex justify-between items-center mt-2 text-gray-400 text-[9px]">
                                <span>{event.Source}</span>
                                {event.EPS && (
                                    <span>{event.EPS}</span>
                                )}
                                {event.Dividend && (
                                    <span>{event.Dividend}</span>
                                )}
                                <span>{event.Date}</span>
                            </div>
                        </div>
                    ))
                ) : (
                    <NoResults
                        title="No Events Found"
                        description="No upcoming earnings or dividends match your search."
                        searchTerm={search || undefined}
                        showFilterIcon={false}
                        className="py-8"
                    />
                )}
            </div>

            {/* Pagination */}
            {filteredData.length > rowsPerPage && (
                <div className="flex justify-between items-center text-[10px] text-gray-300 px-3 py-2 border-t border-gray-800 bg-[#001f11]/70 mt-2">
                    <button
                        className="flex items-center gap-1 text-accent disabled:text-gray-600"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => Math.max(p - 1, 1))}
                    >
                        <ChevronLeft className="w-3 h-3" /> Prev
                    </button>
                    <div className="text-gray-400">
                        Page <span className="text-accent">{currentPage}</span> of {totalPages || 1}
                    </div>
                    <button
                        className="flex items-center gap-1 text-accent disabled:text-gray-600"
                        disabled={currentPage === totalPages || totalPages === 0}
                        onClick={() => setCurrentPage((p) => Math.min(p + 1, totalPages))}
                    >
                        Next <ChevronRight className="w-3 h-3" />
                    </button>
                </div>
            )}

            {/* Event Details Modal */}
            <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
                <DialogContent className="bg-[#0B1220] text-gray-200 max-w-3xl border border-[#1E2A44]">
                    <DialogHeader>
                        <DialogTitle className="flex justify-between items-start text-sm text-accent">
                            {selectedEvent?.Company} — {selectedEvent?.Type}
                        </DialogTitle>
                    </DialogHeader>
                    {selectedEvent && (
                        <div className="flex flex-col">
                            <div className="flex flex-wrap gap-3 text-[10px] mb-5 items-center">
                                <span className="flex items-center gap-2 px-2 py-1 rounded-md bg-white/3 text-sky-400">
                                    <CalendarDays className="w-4 h-4" />
                                    <span>{selectedEvent.Date}</span>
                                </span>
                                <span className={`flex items-center gap-2 px-2 py-1 rounded-md ${impactColor(selectedEvent.Impact)} bg-white/3`}>
                                    <AlertTriangle className="w-4 h-4" />
                                    <span>{selectedEvent.Impact} Impact</span>
                                </span>
                                {selectedEvent.EPS && (
                                    <span className="flex items-center gap-2 px-2 py-1 rounded-md bg-emerald-500/10 text-emerald-300">
                                        <LineChart className="w-4 h-4" />
                                        <span>EPS: {selectedEvent.EPS}</span>
                                    </span>
                                )}
                                {selectedEvent.Dividend && (
                                    <span className="flex items-center gap-2 px-2 py-1 rounded-md bg-yellow-500/10 text-yellow-300">
                                        <DollarSign className="w-4 h-4" />
                                        <span>Dividend: {selectedEvent.Dividend}</span>
                                    </span>
                                )}
                            </div>
                            <p className="text-gray-300 mb-3 text-xs">{selectedEvent.Description}</p>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </WindowLayout>
    );
}
