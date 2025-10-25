import React from 'react';
import { Search, Filter, AlertCircle } from 'lucide-react';

interface NoResultsProps {
  title?: string;
  description?: string;
  searchTerm?: string;
  showSearchIcon?: boolean;
  showFilterIcon?: boolean;
  className?: string;
}

export const NoResults: React.FC<NoResultsProps> = ({
  title = "No Results Found",
  description = "No data matches your current search or filter criteria.",
  searchTerm,
  showSearchIcon = true,
  showFilterIcon = true,
  className = ""
}) => {
  return (
    <div className={`flex flex-col items-center justify-center py-8 px-4 text-center ${className}`}>
      <div className="flex items-center gap-2 mb-3">
        {showSearchIcon && <Search className="w-3 h-3 text-gray-400" />}
        {showFilterIcon && <Filter className="w-3 h-3 text-gray-400" />}
        <AlertCircle className="w-3 h-3 text-gray-400" />
      </div>
      
      <h3 className="text-white font-semibold text-[10px] mb-2">{title}</h3>
      
      <p className="text-gray-400 text-[9px] mb-3 max-w-sm">
        {description}
      </p>
      
      {searchTerm && (
        <div className="bg-[#16223B]/50 border border-gray-700 rounded-lg px-2 py-1">
          <span className="text-gray-300 text-[9px]">
            Search term: <span className="text-accent font-medium">"{searchTerm}"</span>
          </span>
        </div>
      )}
      
      <div className="mt-4 text-gray-500 text-[9px]">
        Try adjusting your search terms or filters
      </div>
    </div>
  );
};

export default NoResults;
