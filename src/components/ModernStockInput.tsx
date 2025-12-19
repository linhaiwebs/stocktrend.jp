import { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SearchResult } from '../hooks/useStockSearch';

interface ModernStockInputProps {
  value: string;
  onChange: (value: string) => void;
  onStockSelect?: (code: string, name: string) => void;
  search: (query: string) => SearchResult[];
  isLoading?: boolean;
}

export default function ModernStockInput({ value, onChange, onStockSelect, search, isLoading = false }: ModernStockInputProps) {
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [currentPage, setCurrentPage] = useState(0);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const ITEMS_PER_PAGE = 5;

  useEffect(() => {
    if (value.trim().length > 0) {
      const results = search(value);
      setSearchResults(results);
      setShowDropdown(results.length > 0);
      setCurrentPage(0);
    } else {
      setSearchResults([]);
      setShowDropdown(false);
      setCurrentPage(0);
    }
  }, [value, search]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setShowDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const totalPages = Math.ceil(searchResults.length / ITEMS_PER_PAGE);
  const startIndex = currentPage * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentResults = searchResults.slice(startIndex, endIndex);

  const handleStockClick = (stock: SearchResult) => {
    const displayValue = `${stock.code} ${stock.name}`;
    onChange(displayValue);
    setShowDropdown(false);

    if (onStockSelect) {
      onStockSelect(stock.code, stock.name);
    }
  };

  const handleInputFocus = () => {
    if (searchResults.length > 0) {
      setShowDropdown(true);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage(prev => Math.max(0, prev - 1));
  };

  const handleNextPage = () => {
    setCurrentPage(prev => Math.min(totalPages - 1, prev + 1));
  };

  return (
    <div className="relative w-full animate-fadeIn z-[100]" style={{ animationDelay: '0.1s' }}>
      <div className="relative">
        <div className="relative" style={{
          clipPath: 'polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)',
        }}>
          <input
            ref={inputRef}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            onFocus={handleInputFocus}
            placeholder="例: 7203 / トヨタ / ソニー"
            className="w-full px-5 py-4 text-base font-medium focus:outline-none placeholder-gray-400 transition-all duration-300"
            style={{
              height: '60px',
              background: 'linear-gradient(135deg, #FFFFFF 0%, #F0F0F0 100%)',
              color: '#000000',
              border: '2px solid transparent',
              backgroundClip: 'padding-box',
              position: 'relative',
            }}
            disabled={isLoading}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background: 'linear-gradient(135deg, #FF0080, #7928CA, #0070F3)',
              clipPath: 'polygon(2% 0%, 98% 0%, 100% 2%, 100% 98%, 98% 100%, 2% 100%, 0% 98%, 0% 2%)',
              WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
              WebkitMaskComposite: 'xor',
              maskComposite: 'exclude',
              padding: '2px',
            }}
          />
        </div>
      </div>

      {showDropdown && currentResults.length > 0 && (
        <div
          ref={dropdownRef}
          className="absolute z-[99999] w-full mt-3 shadow-2xl overflow-hidden animate-fadeIn"
          style={{
            background: 'linear-gradient(135deg, #FFFFFF 0%, #F8F8F8 100%)',
            clipPath: 'polygon(1% 0%, 99% 0%, 100% 1%, 100% 99%, 99% 100%, 1% 100%, 0% 99%, 0% 1%)',
            border: '2px solid transparent',
            backgroundImage: 'linear-gradient(white, white), linear-gradient(135deg, #FF0080, #7928CA, #0070F3)',
            backgroundOrigin: 'border-box',
            backgroundClip: 'padding-box, border-box',
          }}
        >
          <div className="max-h-80 overflow-y-auto">
            {currentResults.map((stock, index) => (
              <button
                key={`${stock.code}-${index}`}
                onClick={() => handleStockClick(stock)}
                className="w-full px-5 py-2.5 text-left hover:bg-gray-50 transition-all duration-150 border-b border-gray-100 last:border-b-0"
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 flex-1 min-w-0">
                    <div className="font-semibold text-gray-900 whitespace-nowrap">{stock.code}</div>
                    <div className="text-sm text-gray-600 truncate" title={stock.name}>
                      {stock.name.length > 6 ? `${stock.name.slice(0, 6)}...` : stock.name}
                    </div>
                  </div>
                  <div className="text-xs text-gray-600 bg-gray-100 px-3 py-1 rounded-full font-medium whitespace-nowrap">
                    {stock.market}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-between px-5 py-3 bg-gray-50 border-t border-gray-200">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 0}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                <ChevronLeft className="w-4 h-4" />
                前へ
              </button>

              <div className="text-sm font-semibold text-gray-700">
                {currentPage + 1} / {totalPages}
              </div>

              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages - 1}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-full hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
              >
                次へ
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>
      )}

      {isLoading && (
        <div className="absolute left-0 right-0 top-full mt-2 text-center text-sm text-gray-300">
          読み込み中...
        </div>
      )}
    </div>
  );
}
