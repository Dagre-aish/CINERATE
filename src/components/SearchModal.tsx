import React, { useState, useEffect } from 'react';
import { Movie } from '../types/cinema';

interface SearchModalProps {
  allMovies: Movie[];
  onClose: () => void;
  onSelectMovie: (movie: Movie) => void;
  onRateMovie: (movie: Movie) => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({
  allMovies,
  onClose,
  onSelectMovie,
  onRateMovie,
}) => {
  const [query, setQuery] = useState('');

  // Keyboard shortcut ESC to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  const searchResults = query.trim()
    ? allMovies.filter(
        (m) =>
          m.title.toLowerCase().includes(query.toLowerCase()) ||
          m.director.toLowerCase().includes(query.toLowerCase()) ||
          m.genres.some((g) => g.toLowerCase().includes(query.toLowerCase()))
      )
    : allMovies.slice(0, 5);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 pt-20 bg-black/80 backdrop-blur-md">
      <div className="bg-[#1c1b1d] border border-[#353437] rounded-2xl max-w-xl w-full overflow-hidden shadow-2xl relative text-left">
        {/* Search Input Bar */}
        <div className="p-4 border-b border-[#2a2a2c] flex items-center gap-3 bg-[#131315]">
          <span className="material-symbols-outlined text-[#e50914] text-[22px]">
            search
          </span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search movies, directors, genres, or awards..."
            autoFocus
            className="flex-1 bg-transparent text-sm text-white placeholder-[#70717f] outline-none"
          />
          <kbd className="text-[11px] bg-[#2a2a2c] text-[#c5c5d5] px-2 py-0.5 rounded font-mono">
            ESC
          </kbd>
        </div>

        {/* Results List */}
        <div className="max-h-96 overflow-y-auto p-2 space-y-1">
          <div className="px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-[#70717f]">
            {query.trim() ? `Search Results (${searchResults.length})` : 'Popular Recommendations'}
          </div>

          {searchResults.length === 0 ? (
            <div className="py-8 text-center text-xs text-[#c5c5d5]">
              No films found for "{query}". Try another title or director name.
            </div>
          ) : (
            searchResults.map((m) => (
              <div
                key={m.id}
                onClick={() => {
                  onSelectMovie(m);
                  onClose();
                }}
                className="flex items-center justify-between p-2.5 rounded-xl hover:bg-[#2a2a2c] transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <img
                    src={m.posterUrl}
                    alt={m.title}
                    className="w-9 h-13 rounded object-cover ring-1 ring-white/10 shrink-0"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-semibold text-white group-hover:text-[#ffb4aa] transition-colors truncate">
                      {m.title} <span className="text-[#70717f]">({m.year})</span>
                    </div>
                    <div className="text-[11px] text-[#c5c5d5] truncate">
                      Dir. {m.director} • {m.genres.join(', ')}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <span className="text-xs text-[#ffb95f] font-bold flex items-center gap-0.5">
                    <span
                      className="material-symbols-outlined text-[13px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      star
                    </span>
                    {(m.audienceScore / 10).toFixed(1)}
                  </span>
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onClose();
                      onRateMovie(m);
                    }}
                    className="px-2.5 py-1 bg-[#e50914] text-white hover:bg-[#c0000c] text-[11px] font-semibold rounded transition-colors"
                  >
                    Rate
                  </button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
