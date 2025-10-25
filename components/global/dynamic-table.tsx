"use client";
import React, { useState, useMemo } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { ArrowUpDown, ChevronLeft, ChevronRight, Search, Maximize, Grid3X3 } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import NoResults from "../ui/no-results";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
} from "@/components/ui/dropdown-menu";

const classes =
    "bg-[#0A0F1C]/95 border border-accent/30 text-gray-200 rounded-md p-2 text-[10px] shadow-lg min-w-[50px] max-w-[180px] whitespace-pre-wrap";


interface DynamicTableProps {
    headers: string[];
    data: Record<string, any>[];
    rowKey?: string | ((row: Record<string, any>, idx: number) => string | number);
    title?: string;
    titlePosition?: "top" | "bottom";
    rowsPerPageProps?: number;
    enableGlobalSearch?: boolean;
    isDialog?: boolean; // new prop to adjust row count limit
    mode?: 'all' | 'paginated';
    onTableModeChange?: (mode: "all" | "paginated") => void;
}

function getColorClass(value: any): string {
    if (typeof value !== "string") return "text-gray-300";

    const trimmed = value.trim().toUpperCase();

    if (trimmed.startsWith("+")) return "text-green-400 font-semibold";
    if (trimmed.startsWith("-")) return "text-red-400 font-semibold";
    if (!isNaN(Number(trimmed))) return "text-yellow-400 font-semibold";

    if (["BUY", "HOLD", "SELL"].includes(trimmed)) {
        switch (trimmed) {
            case "BUY": return "text-green-400 font-semibold";
            case "SELL": return "text-red-400 font-semibold";
            case "HOLD": return "text-yellow-400 font-semibold";
        }
    }

    if (["POSITIVE", "NEGATIVE"].includes(trimmed)) return trimmed === "POSITIVE" ? "text-green-400 font-semibold" : "text-red-400 font-semibold";

    if (["HIGH", "MEDIUM", "LOW"].includes(trimmed)) {
        switch (trimmed) {
            case "HIGH": return "text-green-400 font-semibold";
            case "MEDIUM": return "text-yellow-400 font-semibold";
            case "LOW": return "text-red-400 font-semibold";
        }
    }

    return "text-gray-100";
}

const DynamicTable: React.FC<DynamicTableProps> = ({
    headers,
    data,
    rowKey,
    title,
    titlePosition = "bottom",
    rowsPerPageProps = 6,
    enableGlobalSearch = true,
    isDialog = false,
    mode = 'paginated',
    onTableModeChange,
}) => {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");
    const [tableMode, setTableMode] = useState<"all" | "paginated">(mode);
    const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageProps);


    const maxRowsPerPage = isDialog ? 10 : rowsPerPage;

    const setTableModeState = (newMode: "all" | "paginated") => {
        setTableMode(newMode);
        onTableModeChange?.(newMode); // propagate to parent
    };

    const processedData = useMemo(() => {
        let tempData = [...data];

        if (search) {
            const lowerSearch = search.toLowerCase();
            tempData = tempData.filter((row) =>
                Object.values(row).some((val) => String(val).toLowerCase().includes(lowerSearch))
            );
        }

        tempData = tempData.filter((row) =>
            headers.every((header) => {
                const filterValue = filters[header]?.toLowerCase() || "";
                if (!filterValue) return true;
                const cellValue = String(row[header]).toLowerCase();
                return cellValue.includes(filterValue);
            })
        );

        if (sortConfig) {
            const { key, direction } = sortConfig;
            tempData.sort((a, b) => {
                const aVal = a[key];
                const bVal = b[key];
                const aNum = parseFloat(String(aVal).replace(/[^\d.-]/g, ""));
                const bNum = parseFloat(String(bVal).replace(/[^\d.-]/g, ""));
                if (!isNaN(aNum) && !isNaN(bNum)) return direction === "asc" ? aNum - bNum : bNum - aNum;
                return direction === "asc" ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
            });
        }

        return tempData;
    }, [data, filters, headers, sortConfig, search]);

    const totalPages = Math.ceil(processedData.length / maxRowsPerPage);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * maxRowsPerPage;
        return processedData.slice(start, start + maxRowsPerPage);
    }, [processedData, currentPage, maxRowsPerPage]);

    const handleSort = (header: string) => {
        setSortConfig((prev) =>
            prev?.key === header ? (prev.direction === "asc" ? { key: header, direction: "desc" } : null) : { key: header, direction: "asc" }
        );
    };

    const handleFilterChange = (header: string, value: string) => {
        setFilters((prev) => ({ ...prev, [header]: value }));
        setCurrentPage(1);
    };

    const TitleComponent = (
        <div className="text-center text-accent text-[9px] p-2 font-medium">{title} Table</div>
    );

    const renderTable = (rows: Record<string, any>[]) => (
        <Table className="min-w-full text-[9px] ">
            <TableHeader>
                <TableRow className="bg-[#001f11]/70 sticky top-0 z-30">
                    {headers.map((header) => (
                        <TableHead key={header} className="text-left text-white font-semibold p-2">
                            <div onClick={() => handleSort(header)} className="flex items-center justify-between w-full cursor-pointer select-none hover:text-accent transition-all">
                                <span className="truncate">{header}</span>
                                <ArrowUpDown
                                    className={`w-3 h-3 ml-1 shrink-0 transition-transform ${sortConfig?.key === header
                                        ? sortConfig.direction === "asc"
                                            ? "rotate-180 text-accent"
                                            : "text-accent"
                                        : "text-gray-500"
                                        }`}
                                />
                            </div>
                            <input
                                type="text"
                                value={filters[header] || ""}
                                onChange={(e) => handleFilterChange(header, e.target.value)}
                                placeholder="filter..."
                                className="w-full text-[9px] mt-1 bg-transparent border-b border-gray-700 focus:border-accent outline-none text-gray-300 placeholder-gray-500"
                            />
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.length > 0 ? (
                    rows.map((row, idx) => {
                        const key = rowKey
                            ? typeof rowKey === "function"
                                ? rowKey(row, idx)
                                : row[rowKey] ?? idx
                            : idx;

                        return (
                            <Tooltip key={key}>
                                <TooltipTrigger asChild>
                                    <TableRow className={`text-white text-[9px] ${idx % 2 === 0 ? "bg-[#001f11]/90" : "bg-[#001f11]/50"} hover:bg-[#001f11] transition-colors cursor-default`}>
                                        {headers.map((header) => {
                                            const value = row[header];
                                            const isNumber = /\d/.test(String(value));
                                            return (
                                                <TableCell key={header} className={`${getColorClass(value)} ${isNumber ? "text-right" : "text-left"} px-2 py-2 max-w-[200px] truncate`}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TooltipTrigger>
                                <TooltipContent className="bg-gradient-to-br from-[#000d08] via-[#001a10] to-[#000f09] shadow-inner border border-green-800/50 border-gray-700 rounded-md p-2 text-[9px] shadow-lg min-w-[150px] max-w-xs whitespace-pre-wrap">
                                    <span className="block text-[9px] font-semibold border-b w-full text-accent uppercase mb-1 pb-1">Details</span>
                                    {headers.map((header) => {
                                        const value = String(row[header]);
                                        return (
                                            <div key={header} className="flex justify-between gap-2">
                                                <span className="text-gray-400">{header}:</span>
                                                <span className={`${getColorClass(value)} truncate max-w-[150px]`}>{value}</span>
                                            </div>
                                        );
                                    })}
                                </TooltipContent>
                            </Tooltip>
                        );
                    })
                ) : (
                    <TableRow>
                        <TableCell colSpan={headers.length} className="p-0 text-center">
                            <div className="flex justify-center items-center w-full">
                                <NoResults
                                    title="No Data Found"
                                    description="No records match your current search or filter criteria."
                                    searchTerm={search || undefined}
                                    className="py-6"
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );

    return (
        <TooltipProvider delayDuration={150}>
            <div className="overflow-x-auto rounded-sm backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 flex flex-col w-full border border-gray-800 bg-gradient-to-r from-emerald-500/20 to-green-800/30 border border-green-900/40 rounded-sm">
                {title && titlePosition === "top" && TitleComponent}

                {enableGlobalSearch && (
                    <div className="flex items-center justify-between px-2 py-2">
                        <div className="flex items-center bg-[#001f11]/70 rounded-sm px-1 py-1 w-full border border-gray-700 ">
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

                        {!isDialog && (
                            <Dialog>
                                <DialogTrigger asChild>
                                    <button className="ml-2 p-1 rounded-sm bg-[#001f11]/70 border border-gray-700 hover:bg-[#16223B] transition-colors">
                                        <Maximize className="w-3 h-3 text-gray-400" />
                                    </button>
                                </DialogTrigger>
                                <DialogContent className="min-w-lg w-auto max-w-[95vw] max-h-[95vh] p-4 bg-[#0A0F1C] rounded-sm overflow-auto">
                                    <DialogHeader>
                                        <DialogTitle className="text-accent text-[12px] mb-2">Expanded Table View</DialogTitle>
                                    </DialogHeader>
                                    <InnerDynamicTable
                                        headers={headers}
                                        data={data}
                                        rowKey={rowKey}
                                        title={title}
                                        titlePosition={titlePosition}
                                        enableGlobalSearch={true}
                                        rowsPerPageProps={rowsPerPage} // max rows in dialog
                                        mode={tableMode}
                                        onTableModeChange={setTableModeState}
                                    />
                                </DialogContent>
                            </Dialog>
                        )}

                        <DropdownMenu>
                            <Tooltip>
                                <TooltipTrigger asChild>
                                    <DropdownMenuTrigger asChild>
                                        <button className="ml-2 p-1 rounded-sm bg-[#001f11]/70 border border-gray-700 hover:bg-[#16223B] transition-colors">
                                            <Grid3X3 className="w-3 h-3 text-gray-400" />
                                        </button>
                                    </DropdownMenuTrigger>
                                </TooltipTrigger>
                                <TooltipContent side="bottom" className={classes}>
                                    Data Display Settings
                                </TooltipContent>
                            </Tooltip>

                            <DropdownMenuContent
                                side="bottom"
                                align="end"
                                className="text-[9px] w-40 bg-[#001f11] text-gray-200 border-gray-700"
                            >
                                <div className="w-full grid grid-cols-1 gap-2">
                                    <div className="grid grid-cols-2 text-[9px] text-gray-300 bg-[#001f11]/70 rounded-sm shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 px-3 py-2">
                                        <label className="flex items-center gap-1">
                                            <input
                                                type="radio"
                                                name="tableMode"
                                                value="all"
                                                checked={tableMode === "all"}
                                                onChange={() => setTableMode("all")}
                                                className="accent-indigo-500"
                                            />
                                            Scrollable
                                        </label>

                                        <label className="flex items-center gap-1">
                                            <input
                                                type="radio"
                                                name="tableMode"
                                                value="paginated"
                                                checked={tableMode === "paginated"}
                                                onChange={() => setTableMode("paginated")}
                                                className="accent-indigo-500"
                                            />
                                            Paginated
                                        </label>
                                    </div>
                                </div>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                )}

                <div className="flex-1 overflow-y-auto relative" style={{ maxHeight: (isDialog ? 10 : rowsPerPage) * 42 + 60 }}>
                    {renderTable(tableMode === 'all' ? processedData : paginatedData)}
                </div>

                {tableMode !== 'all' && processedData.length > maxRowsPerPage && (
                    <div className="flex justify-between items-center text-[10px] text-gray-300 px-3 py-2 border-t border-gray-800 bg-[#0B1220]/90">
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

                {title && titlePosition === "bottom" && TitleComponent}
            </div>
        </TooltipProvider>
    );
};

const InnerDynamicTable: React.FC<DynamicTableProps> = ({
    headers,
    data,
    rowKey,
    title,
    titlePosition = "bottom",
    rowsPerPageProps = 6,
    enableGlobalSearch = true,
    mode = 'paginated',
    onTableModeChange,
}) => {
    const [sortConfig, setSortConfig] = useState<{ key: string; direction: "asc" | "desc" } | null>(null);
    const [filters, setFilters] = useState<Record<string, string>>({});
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [search, setSearch] = useState<string>("");
    const [tableMode, setTableMode] = useState<"all" | "paginated">(mode);
    const [rowsPerPage, setRowsPerPage] = useState<number>(rowsPerPageProps);

    const maxRowsPerPage = rowsPerPage;


    const processedData = useMemo(() => {
        let tempData = [...data];

        if (search) {
            const lowerSearch = search.toLowerCase();
            tempData = tempData.filter((row) =>
                Object.values(row).some((val) => String(val).toLowerCase().includes(lowerSearch))
            );
        }

        tempData = tempData.filter((row) =>
            headers.every((header) => {
                const filterValue = filters[header]?.toLowerCase() || "";
                if (!filterValue) return true;
                const cellValue = String(row[header]).toLowerCase();
                return cellValue.includes(filterValue);
            })
        );

        if (sortConfig) {
            const { key, direction } = sortConfig;
            tempData.sort((a, b) => {
                const aVal = a[key];
                const bVal = b[key];
                const aNum = parseFloat(String(aVal).replace(/[^\d.-]/g, ""));
                const bNum = parseFloat(String(bVal).replace(/[^\d.-]/g, ""));
                if (!isNaN(aNum) && !isNaN(bNum)) return direction === "asc" ? aNum - bNum : bNum - aNum;
                return direction === "asc" ? String(aVal).localeCompare(String(bVal)) : String(bVal).localeCompare(String(aVal));
            });
        }

        return tempData;
    }, [data, filters, headers, sortConfig, search]);

    const totalPages = Math.ceil(processedData.length / maxRowsPerPage);
    const paginatedData = useMemo(() => {
        const start = (currentPage - 1) * maxRowsPerPage;
        return processedData.slice(start, start + maxRowsPerPage);
    }, [processedData, currentPage, maxRowsPerPage]);

    const handleSort = (header: string) => {
        setSortConfig((prev) =>
            prev?.key === header ? (prev.direction === "asc" ? { key: header, direction: "desc" } : null) : { key: header, direction: "asc" }
        );
    };

    const handleFilterChange = (header: string, value: string) => {
        setFilters((prev) => ({ ...prev, [header]: value }));
        setCurrentPage(1);
    };

    const TitleComponent = (
        <div className="text-center text-accent text-[9px] p-2 font-medium">{title} Table</div>
    );

    const renderTable = (rows: Record<string, any>[]) => (
        <Table className="min-w-full text-[9px]">
            <TableHeader>
                <TableRow className="bg-[#121A2E] sticky top-0 z-30">
                    {headers.map((header) => (
                        <TableHead key={header} className="text-left text-white font-semibold p-2">
                            <div onClick={() => handleSort(header)} className="flex items-center justify-between w-full cursor-pointer select-none hover:text-accent transition-all">
                                <span className="truncate">{header}</span>
                                <ArrowUpDown
                                    className={`w-3 h-3 ml-1 shrink-0 transition-transform ${sortConfig?.key === header
                                        ? sortConfig.direction === "asc"
                                            ? "rotate-180 text-accent"
                                            : "text-accent"
                                        : "text-gray-500"
                                        }`}
                                />
                            </div>
                            <input
                                type="text"
                                value={filters[header] || ""}
                                onChange={(e) => handleFilterChange(header, e.target.value)}
                                placeholder="filter..."
                                className="w-full text-[9px] mt-1 bg-transparent border-b border-gray-700 focus:border-accent outline-none text-gray-300 placeholder-gray-500"
                            />
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {rows.length > 0 ? (
                    rows.map((row, idx) => {
                        const key = rowKey
                            ? typeof rowKey === "function"
                                ? rowKey(row, idx)
                                : row[rowKey] ?? idx
                            : idx;

                        return (
                            <Tooltip key={key}>
                                <TooltipTrigger asChild>
                                    <TableRow className={`text-white text-[9px] ${idx % 2 === 0 ? "bg-[#16223B]/80" : "bg-[#10182A]/80"} hover:bg-[#1B2B47] transition-colors cursor-default`}>
                                        {headers.map((header) => {
                                            const value = row[header];
                                            const isNumber = /\d/.test(String(value));
                                            return (
                                                <TableCell key={header} className={`${getColorClass(value)} ${isNumber ? "text-right" : "text-left"} px-2 py-2 max-w-[200px] truncate`}>
                                                    {value}
                                                </TableCell>
                                            );
                                        })}
                                    </TableRow>
                                </TooltipTrigger>
                                <TooltipContent className="bg-[#0A0F1C]/95 border border-accent/30 text-gray-200 rounded-md p-2 text-[9px] shadow-lg min-w-[150px] max-w-xs whitespace-pre-wrap">
                                    <span className="block text-[9px] font-semibold border-b w-full text-accent uppercase mb-1 pb-1">Details</span>
                                    {headers.map((header) => {
                                        const value = String(row[header]);
                                        return (
                                            <div key={header} className="flex justify-between gap-2">
                                                <span className="text-gray-400">{header}:</span>
                                                <span className={`${getColorClass(value)} truncate max-w-[150px]`}>{value}</span>
                                            </div>
                                        );
                                    })}
                                </TooltipContent>
                            </Tooltip>
                        );
                    })
                ) : (
                    <TableRow>
                        <TableCell colSpan={headers.length} className="p-0 text-center">
                            <div className="flex justify-center items-center w-full">
                                <NoResults
                                    title="No Data Found"
                                    description="No records match your current search or filter criteria."
                                    searchTerm={search || undefined}
                                    className="py-6"
                                />
                            </div>
                        </TableCell>
                    </TableRow>
                )}
            </TableBody>
        </Table>
    );

    return (
        <TooltipProvider delayDuration={150}>
            <div className="grid grid-cols-3 gap-2">
                <div className="grid grid-cols-2 text-[9px] text-gray-300 bg-[#16223B]/80 rounded-sm shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 px-3 py-2">
                    <label className="flex items-center gap-1">
                        <input
                            type="radio"
                            name="tableMode"
                            value="all"
                            checked={tableMode === "all"}
                            onChange={() => setTableMode("all")}
                            className="accent-indigo-500"
                        />
                        Scrollable
                    </label>

                    <label className="flex items-center gap-1">
                        <input
                            type="radio"
                            name="tableMode"
                            value="paginated"
                            checked={tableMode === "paginated"}
                            onChange={() => setTableMode("paginated")}
                            className="accent-indigo-500"
                        />
                        Paginated
                    </label>
                </div>
            </div>
            <div className="overflow-x-auto rounded-sm backdrop-blur-md shadow-lg shadow-[#E3B341]/10 hover:shadow-[#E3B341]/20 flex flex-col w-full border border-gray-800">
                {title && titlePosition === "top" && TitleComponent}


                {enableGlobalSearch && (
                    <div className="flex items-center justify-between px-2 py-2">
                        <div className="flex items-center bg-[#10182A] rounded-sm px-1 py-1 w-full border border-gray-700">
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
                    </div>
                )}

                <div className="flex-1 overflow-y-auto relative" style={{ maxHeight: (rowsPerPage * 42) + 60 }}>
                    {renderTable(tableMode === 'all' ? processedData : paginatedData)}
                </div>

                {tableMode !== 'all' && processedData.length > maxRowsPerPage && (
                    <div className="flex justify-between items-center text-[10px] text-gray-300 px-3 py-2 border-t border-gray-800 bg-[#0B1220]/90">
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

                {title && titlePosition === "bottom" && TitleComponent}
            </div>
        </TooltipProvider>
    );
};

export default DynamicTable;
