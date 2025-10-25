import WindowLayout from "../window-layout";
import { dummyIndicesData } from "@/data/indices.data";
import { ArrowUp, ArrowDown, Waypoints, TrendingUp, BarChart3, DollarSign } from "lucide-react";
import { useCurrency } from "@/hooks/use-currency";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

interface IndexData {
    name: string;
    price: number;
    symbol: string;
    changePercent: number;
    marketCap: number;
    volume: number;
    sparkline: number[];
}

interface EquityData {
    symbol: string;
    name: string;
    price: number;
    changePercent: number;
    marketCap: number;
    volume: number;
    sparkline: number[];
}

interface GlobalIndicesSummaryProps {
    selectedExchange: keyof typeof dummyIndicesData;
}


const GlobalIndicesCaraousel = ({ selectedExchange }: GlobalIndicesSummaryProps) => {
    const indices: IndexData[] = dummyIndicesData[selectedExchange] || [];
    const { formatPrice } = useCurrency();

    // Duplicate array for seamless loop
    const loopedIndices = [...indices, ...indices];

    // Helper function to format market cap and volume
    const formatLargeNumber = (num: number): string => {
        if (num >= 1e12) return `${(num / 1e12).toFixed(1)}T`;
        if (num >= 1e9) return `${(num / 1e9).toFixed(1)}B`;
        if (num >= 1e6) return `${(num / 1e6).toFixed(1)}M`;
        if (num >= 1e3) return `${(num / 1e3).toFixed(1)}K`;
        return num.toString();
    };

    // Helper function to render tooltip content
    const renderTooltipContent = (item: IndexData | EquityData, type: 'index' | 'equity') => (
        <div className="bg-[#0A0F1C] rounded-sm p-2 min-w-[150px] max-w-xs">
            <div className="flex items-center gap-2 mb-1">
                <span className="text-accent font-semibold text-[9px]">{item.symbol}</span>
                <span className="text-gray-400 text-[9px]">({type.toUpperCase()})</span>
            </div>

            <div className="space-y-1 text-[9px] border-t border-gray-700 pt-1">
                <div className="flex justify-between items-center">
                    <span className="text-gray-400 mr-1">Name:</span>
                    <span className="text-white font-medium">{item.name}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-400 mr-1">Price:</span>
                    <span className="text-white font-semibold">{formatPrice(item.price, selectedExchange)}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-400 mr-1">Change:</span>
                    <span className={`font-medium ${item.changePercent >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                        {item.changePercent >= 0 ? '+' : ''}{item.changePercent.toFixed(2)}%
                    </span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-400 mr-1">Market Cap:</span>
                    <span className="text-white">{formatLargeNumber(item.marketCap)}</span>
                </div>

                <div className="flex justify-between items-center">
                    <span className="text-gray-400 mr-1">Volume:</span>
                    <span className="text-white">{formatLargeNumber(item.volume)}</span>
                </div>
            </div>
        </div>
    );

    return (
        <WindowLayout title="Indices, Equities & Macros" icon={Waypoints} fit={true} showFilters={false}>
            <div className="flex flex-col overflow-hidden w-full gap-2">
                <div className="flex animate-scroll gap-4 w-max">
                    {loopedIndices.map((i, idx) => {
                        const isPositive = i.changePercent >= 0;
                        return (
                            <Tooltip key={`${i.name}-${idx}`}>
                                <TooltipTrigger asChild>
                                    <div className="flex-shrink-0 flex flex bg-gradient-to-r from-emerald-500/20 to-green-800/30 text-emerald-300 border border-green-900/40 hover:from-emerald-500/30 hover:to-green-700/40 transition rounded-sm px-2 py-1 min-w-[150px] shadow-lg cursor-pointer hover:bg-[#16223B]/90 transition-colors">
                                        <div className="flex justify-center gap-3 items-center">
                                            <span className="text-gray-300 text-[10px] font-medium">{i.symbol}</span>
                                            <div className="flex gap-2 items-start">
                                                <div className="text-white text-[10px] font-semibold">{formatPrice(i.price, selectedExchange)}</div>
                                                <div
                                                    className={`flex items-center gap-1 text-[10px] font-medium ${isPositive ? "text-green-400" : "text-red-400"
                                                        }`}
                                                >
                                                    {i.changePercent.toFixed(2)}%
                                                    {isPositive ? <ArrowUp size={12} /> : <ArrowDown size={12} />}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </TooltipTrigger>
                                <TooltipContent side="top" className="bg-transparent border border-accent/30 p-0">
                                    {renderTooltipContent(i, 'index')}
                                </TooltipContent>
                            </Tooltip>
                        );
                    })}
                </div>
            </div>

            <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-scroll {
          animation: scroll 60s linear infinite;
        }
      `}</style>
        </WindowLayout>
    );
};

export default GlobalIndicesCaraousel;
