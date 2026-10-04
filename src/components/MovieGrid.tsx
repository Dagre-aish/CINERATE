import React from 'react';
import { Movie } from '../types/cinema';

interface MovieGridProps {
  movies: Movie[];
  onRateMovie: (movie: Movie) => void;
  onToggleWatchlist: (movie: Movie) => void;
  isWatchlisted: (movieId: string) => boolean;
  onOpenDetails: (movie: Movie) => void;
  viewLayout: 'grid' | 'list';
}

export const MovieGrid: React.FC<MovieGridProps> = ({
  movies,
  onRateMovie,
  onToggleWatchlist,
  isWatchlisted,
  onOpenDetails,
  viewLayout,
}) => {
  if (movies.length === 0) {
    return (
      <div className="w-full max-w-[1440px] mx-auto px-4 md:px-12 py-16 text-center">
        <span className="material-symbols-outlined text-4xl text-[#70717f] mb-2">
          movie_off
        </span>
        <h3 className="font-serif text-lg font-semibold text-white">No movies match this filter</h3>
        <p className="text-xs text-[#c5c5d5] mt-1">Try resetting your genre or score criteria.</p>
      </div>
    );
  }

  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 md:px-12 py-10">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-2 mb-6">
        <div>
          <div className="flex items-center gap-1.5 text-[#ffb4aa] text-[11px] uppercase tracking-widest font-semibold mb-1">
            <span className="material-symbols-outlined text-[16px]">bolt</span>
            <span>Current Box-Office & Festival Buzz</span>
          </div>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#e5e1e4] tracking-tight">
            Trending Films This Week
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-xs text-[#c5c5d5]">Real-time aggregate scores updated hourly</span>
          <button
            type="button"
            className="text-xs text-[#ffb4aa] hover:text-white transition-colors flex items-center gap-1 font-semibold"
          >
            <span>View 100 More</span>
            <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
          </button>
        </div>
      </div>

      {/* Grid or List Layout */}
      {viewLayout === 'grid' ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {movies.map((movie) => {
            const inWatchlist = isWatchlisted(movie.id);
            return (
              <div
                key={movie.id}
                className="group relative flex flex-col bg-[#201f21] rounded-lg overflow-hidden shadow-lg transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl border border-white/5"
              >
                {/* 2:3 Poster Frame */}
                <div
                  className="relative w-full aspect-[2/3] overflow-hidden bg-[#2a2a2c] cursor-pointer"
                  onClick={() => onOpenDetails(movie)}
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-transparent to-black/40 pointer-events-none" />

                  {/* Top-Left Rating Pill */}
                  <div className="absolute top-2 left-2 flex items-center gap-1">
                    <span className="bg-[#0e0e10]/90 backdrop-blur-md text-[#ffb95f] text-[11px] px-2 py-0.5 rounded font-bold flex items-center gap-1">
                      <span
                        className="material-symbols-outlined text-[13px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span>{(movie.audienceScore / 10).toFixed(1)}</span>
                    </span>
                  </div>

                  {/* Top-Right Watchlist Toggle */}
                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onToggleWatchlist(movie);
                    }}
                    className={`absolute top-2 right-2 p-1.5 rounded-full backdrop-blur-md transition-colors ${
                      inWatchlist
                        ? 'bg-[#e50914] text-white'
                        : 'bg-[#0e0e10]/80 text-[#e5e1e4] hover:text-[#e50914]'
                    }`}
                    title={inWatchlist ? 'Remove from Watchlist' : 'Add to Watchlist'}
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: inWatchlist ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      bookmark
                    </span>
                  </button>

                  {/* Hover Slide-up Quick-Rate Bar */}
                  <div className="absolute inset-x-0 bottom-0 p-2.5 bg-gradient-to-t from-[#0e0e10] via-[#0e0e10]/95 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex flex-col gap-1.5 z-10">
                    <div className="flex items-center justify-between text-[11px] text-[#c5c5d5]">
                      <span>Quick Rate</span>
                      <span className="text-[#ffb95f] font-semibold">★★★★★</span>
                    </div>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRateMovie(movie);
                      }}
                      className="w-full py-1.5 bg-[#e50914] text-white text-[11px] font-semibold rounded hover:bg-[#c0000c] transition-colors flex items-center justify-center gap-1 active:scale-95 shadow-sm"
                    >
                      <span className="material-symbols-outlined text-[14px]">star_rate</span>
                      <span>Log Rating</span>
                    </button>
                  </div>
                </div>

                {/* Metadata */}
                <div className="p-3 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-[#c5c5d5] text-[11px] mb-1">
                      <span>{movie.year}</span>
                      <span>{movie.runtime}</span>
                    </div>
                    <h3
                      onClick={() => onOpenDetails(movie)}
                      className="font-serif text-[15px] font-semibold text-[#e5e1e4] line-clamp-1 group-hover:text-[#ffb4aa] transition-colors cursor-pointer"
                    >
                      {movie.title}
                    </h3>
                    <span className="text-[12px] text-[#c5c5d5] block mt-0.5 truncate">
                      {movie.genres.join(' • ')}
                    </span>
                  </div>

                  <div className="mt-2 pt-1.5 flex items-center justify-between border-t border-[#353437]/60 text-[11px]">
                    <span className="text-[#e9bcb6] font-medium truncate">
                      {movie.tagline || 'CineScore'}
                    </span>
                    <span className="text-[#ffb95f] font-semibold whitespace-nowrap ml-1">
                      {movie.badge || `${movie.criticScore}% Critics`}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="space-y-3">
          {movies.map((movie) => {
            const inWatchlist = isWatchlisted(movie.id);
            return (
              <div
                key={movie.id}
                className="bg-[#201f21] hover:bg-[#2a2a2c] rounded-xl p-3 sm:p-4 border border-white/5 flex items-center gap-4 transition-all"
              >
                <div
                  className="w-16 h-24 sm:w-20 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-[#2a2a2c] cursor-pointer"
                  onClick={() => onOpenDetails(movie)}
                >
                  <img
                    src={movie.posterUrl}
                    alt={movie.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-xs text-[#c5c5d5] mb-1">
                    <span>{movie.year}</span>
                    <span>•</span>
                    <span>{movie.runtime}</span>
                    <span>•</span>
                    <span>Dir. {movie.director}</span>
                  </div>
                  <h3
                    onClick={() => onOpenDetails(movie)}
                    className="font-serif text-lg font-bold text-white hover:text-[#ffb4aa] transition-colors cursor-pointer truncate"
                  >
                    {movie.title}
                  </h3>
                  <p className="text-xs text-[#e9bcb6] line-clamp-1 mt-0.5 hidden sm:block">
                    {movie.synopsis}
                  </p>
                  <div className="flex items-center gap-3 mt-2 text-xs">
                    <span className="text-[#ffb95f] font-bold flex items-center gap-1">
                      <span
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span>{(movie.audienceScore / 10).toFixed(1)} Community</span>
                    </span>
                    <span>•</span>
                    <span className="text-[#e5e1e4] font-semibold">
                      {movie.criticScore}% Critics
                    </span>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-2">
                  <button
                    type="button"
                    onClick={() => onToggleWatchlist(movie)}
                    className={`p-2 rounded-lg text-xs font-semibold flex items-center gap-1 transition-colors ${
                      inWatchlist
                        ? 'bg-[#e50914] text-white'
                        : 'bg-[#1c1b1d] text-[#e5e1e4] hover:bg-[#353437]'
                    }`}
                    title="Watchlist"
                  >
                    <span
                      className="material-symbols-outlined text-[16px]"
                      style={{ fontVariationSettings: inWatchlist ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      bookmark
                    </span>
                    <span className="hidden sm:inline">
                      {inWatchlist ? 'Watchlisted' : 'Watchlist'}
                    </span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onRateMovie(movie)}
                    className="px-3 py-2 rounded-lg bg-[#e50914] hover:bg-[#c0000c] text-white text-xs font-semibold flex items-center gap-1 transition-colors whitespace-nowrap shadow-sm"
                  >
                    <span className="material-symbols-outlined text-[16px]">star_rate</span>
                    <span>Log Rating</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
};
