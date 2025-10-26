'use client';
import { useState, useMemo } from 'react';
import {
  ArrowUpDown,
  Search,
  Twitter,
  MessageSquare,
  BarChart3,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import WindowLayout from '@/components/window-layout';
import { NoResults } from '@/components/ui/no-results';

interface SentimentData {
  ticker: string;
  twitter: number; // 0-100
  reddit: number;
  stocktwits: number;
}

const dummySentiments: SentimentData[] = [
  { ticker: 'AAPL', twitter: 78, reddit: 65, stocktwits: 82 },
  { ticker: 'TSLA', twitter: 55, reddit: 47, stocktwits: 52 },
  { ticker: 'NVDA', twitter: 92, reddit: 88, stocktwits: 94 },
  { ticker: 'AMZN', twitter: 67, reddit: 71, stocktwits: 69 },
  { ticker: 'META', twitter: 44, reddit: 50, stocktwits: 46 },
  { ticker: 'MSFT', twitter: 82, reddit: 76, stocktwits: 84 },
  { ticker: 'NFLX', twitter: 73, reddit: 68, stocktwits: 79 },
  { ticker: 'GOOGL', twitter: 85, reddit: 83, stocktwits: 88 },
  { ticker: 'BABA', twitter: 40, reddit: 44, stocktwits: 39 },
  { ticker: 'AMD', twitter: 76, reddit: 81, stocktwits: 80 },
];

const SocialSentimentBoard = ({ itemsPerPage = 4 }: { itemsPerPage?: number }) => {
  const [search, setSearch] = useState('');
  const [sortKey, setSortKey] = useState<'ticker' | 'score'>('score');
  const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');
  const [page, setPage] = useState(1);
  const [currentPage, setCurrentPage] = useState<number>(1);


  const processed = useMemo(() => {
    let list = dummySentiments.map((d) => ({
      ...d,
      score: Math.round((d.twitter + d.reddit + d.stocktwits) / 3),
    }));

    if (search) {
      list = list.filter((i) => i.ticker.toLowerCase().includes(search.toLowerCase()));
    }

    list.sort((a, b) => {
      const cmp =
        sortKey === 'score'
          ? a.score - b.score
          : a.ticker.localeCompare(b.ticker);
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return list;
  }, [search, sortKey, sortDir]);

  const totalPages = Math.ceil(processed.length / itemsPerPage);
  const paginatedData = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return processed.slice(start, start + itemsPerPage);
  }, [processed, currentPage, itemsPerPage]);

  const toggleSort = (key: 'ticker' | 'score') => {
    if (sortKey === key) {
      setSortDir((prev) => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDir('desc');
    }
  };

  const sentimentColor = (score: number) => {
    if (score >= 70) return 'bg-green-500';
    if (score >= 50) return 'bg-yellow-400';
    return 'bg-red-500';
  };

  return (
    <WindowLayout title="Social Sentiment" icon={BarChart3} fit={true}>
      {/* 🔍 Search Bar */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-3 gap-2">
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
          <button onClick={() => toggleSort("ticker")} className="flex items-center gap-1 hover:text-accent rounded-sm px-2 py-1 bg-[#001f11]/70 border border-gray-700">
            Ticker <ArrowUpDown className="w-3 h-3" />
          </button>
          <button onClick={() => toggleSort("score")} className="flex items-center gap-1 hover:text-accent rounded-sm px-2 py-1 bg-[#001f11]/70 border border-gray-700">
            Score <ArrowUpDown className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* 💬 Sentiment Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {paginatedData.length > 0 ? (
          paginatedData.map((item) => (
            <div
              key={item.ticker}
              className="rounded-lg border border-gray-800 p-3 bg-gradient-to-r from-emerald-500/20 to-green-800/30 border border-green-900/40 hover:bg-[#16223B]/80 transition-all"
            >
              <div className="flex justify-between items-center mb-2">
                <span className="text-white text-[10px] font-semibold">{item.ticker}</span>
                <span
                  className={`text-[9px] text-black font-semibold px-2 py-0.5 rounded-full ${sentimentColor(
                    item.score
                  )}`}
                >
                  {item.score}%
                </span>
              </div>

              <div className="space-y-2">
                <div className="flex items-center gap-2 text-gray-400 text-[10px]">
                  <Twitter className="w-3 h-3 text-sky-400" />
                  <Progress value={item.twitter} className="flex-1 h-2 bg-gray-800" />
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-[10px]">
                  <MessageSquare className="w-3 h-3 text-orange-400" />
                  <Progress value={item.reddit} className="flex-1 h-2 bg-gray-800" />
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-[10px]">
                  <BarChart3 className="w-3 h-3 text-emerald-400" />
                  <Progress value={item.stocktwits} className="flex-1 h-2 bg-gray-800" />
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2">
            <NoResults
              title="No Sentiment Data Found"
              description="No sentiment data matches your current search criteria."
              searchTerm={search || undefined}
              showFilterIcon={false}
              className="py-8"
            />
          </div>
        )}
      </div>

      {/* 📄 Pagination */}
      {processed.length > itemsPerPage && (
        <div className="flex justify-between items-center text-[10px] text-gray-300 px-3 py-2 border-t border-gray-800 bg-[#0B1220]/90 mt-3">
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

    </WindowLayout>
  );
};

export default SocialSentimentBoard;
