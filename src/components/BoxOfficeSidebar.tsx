import React from 'react';
import { Movie } from '../types/cinema';

interface BoxOfficeSidebarProps {
  movies: Movie[];
  onToggleWatchlist: (movie: Movie) => void;
  isWatchlisted: (movieId: string) => boolean;
  onOpenDetails: (movie: Movie) => void;
  onOpenNeoNoirCollection: () => void;
  onOpenFullCharts: () => void;
}

export const BoxOfficeSidebar: React.FC<BoxOfficeSidebarProps> = ({
  movies,
  onToggleWatchlist,
  isWatchlisted,
  onOpenDetails,
  onOpenNeoNoirCollection,
  onOpenFullCharts,
}) => {
  return (
    <div className="lg:col-span-4 space-y-6">
      {/* Box Office Ranking List */}
      <div className="bg-[#201f21] p-4 sm:p-5 rounded-xl shadow-md border border-white/5">
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-[#ffb95f] font-semibold">
              Weekly Charts
            </span>
            <h3 className="font-serif text-lg font-bold text-[#e5e1e4]">Top Box Office</h3>
          </div>
          <span className="text-xs text-[#c5c5d5]">Weekend Gross</span>
        </div>

        <div className="space-y-2.5">
          {movies.map((movie) => {
            const inWatchlist = isWatchlisted(movie.id);
            const rankStr = movie.boxOfficeRank
              ? movie.boxOfficeRank.toString().padStart(2, '0')
              : '01';

            return (
              <div
                key={movie.id}
                className="flex items-center gap-3 p-2 rounded-lg bg-[#2a2a2c]/60 hover:bg-[#2a2a2c] transition-colors group"
              >
                <span
                  className={`font-serif text-lg font-bold w-6 text-center ${
                    movie.boxOfficeRank === 1 ? 'text-[#ffb4aa]' : 'text-[#c5c5d5]'
                  }`}
                >
                  {rankStr}
                </span>

                <div
                  className="w-10 h-14 rounded overflow-hidden shrink-0 bg-[#0e0e10] cursor-pointer"
                  onClick={() => onOpenDetails(movie)}
                >
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    alt={movie.title}
                    src={movie.posterUrl}
                    referrerPolicy="no-referrer"
                  />
                </div>

                <div className="flex-1 min-w-0">
                  <h4
                    onClick={() => onOpenDetails(movie)}
                    className="text-xs font-semibold text-[#e5e1e4] truncate group-hover:text-[#ffb4aa] transition-colors cursor-pointer"
                  >
                    {movie.title}
                  </h4>
                  <div className="flex items-center gap-2 text-[#c5c5d5] text-[11px]">
                    <span>{movie.weekendGross}</span>
                    <span>•</span>
                    <span className="text-[#ffb95f] font-semibold flex items-center gap-0.5">
                      <span
                        className="material-symbols-outlined text-[12px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span>{(movie.audienceScore / 10).toFixed(1)}</span>
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onToggleWatchlist(movie)}
                  className={`p-1.5 rounded transition-colors ${
                    inWatchlist
                      ? 'bg-[#e50914] text-white'
                      : 'bg-[#201f21] text-[#e9bcb6] hover:text-white hover:bg-[#353437]'
                  }`}
                  title={inWatchlist ? 'Watchlisted' : 'Bookmark'}
                >
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: inWatchlist ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {inWatchlist ? 'bookmark' : 'bookmark_border'}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        <button
          type="button"
          onClick={onOpenFullCharts}
          className="block w-full text-center mt-4 pt-2.5 border-t border-[#353437]/60 text-xs text-[#ffb4aa] hover:text-white transition-colors font-medium cursor-pointer"
        >
          Explore Full Global Box Office Charts →
        </button>
      </div>

      {/* Curated Editorial List Spotlight Card */}
      <div className="relative bg-[#201f21] rounded-xl overflow-hidden p-5 shadow-md group border border-white/5">
        <div
          className="absolute inset-0 bg-cover bg-center opacity-25 group-hover:scale-105 transition-transform duration-700"
          style={{
            backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDeTEJCq04hnz-moIfBGiSZNlgLRkGbD7Tqqy-jJkVQinUHrI5xtP0JXKR_qwNOUbOqy0dyCEEQLy6oeCEkxPGf22KRSzFLE2poapTlZ_LtAbu5T8k15GFfCN9lf6EGYMsaNl5FZNBZ81lhbjsLadfn6jUPMD_Ihlysoj7tTLvRUwrj19kAmkrHWGlryTqO632jXnVLzJOrUhDe-mbC_6FFkspr_qvDBQxt3lEJmSArPW3ncf3GWKHkug')`,
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0e0e10] via-[#201f21]/90 to-transparent" />

        <div className="relative z-10 space-y-2">
          <span className="inline-block px-2 py-0.5 rounded bg-[#ffb95f]/20 text-[#ffb95f] text-[10px] font-semibold tracking-wider uppercase">
            Curated by CineRate Editorial
          </span>

          <h4 className="font-serif text-lg font-bold text-[#e5e1e4] leading-tight">
            The 24 Greatest Neo-Noir Masterpieces of All Time
          </h4>

          <p className="text-xs text-[#e9bcb6] leading-relaxed">
            From <em className="italic text-white">Chinatown</em> and{' '}
            <em className="italic text-white">Blade Runner</em> to{' '}
            <em className="italic text-white">Memories of Murder</em>. A definitive deep-dive into
            existential despair and rain-slicked cynicism.
          </p>

          <div className="pt-2 flex items-center justify-between">
            <span className="text-[11px] text-[#c5c5d5]">24 Films • 18k Saves</span>
            <button
              type="button"
              onClick={onOpenNeoNoirCollection}
              className="px-3 py-1.5 rounded bg-[#353437] text-white hover:bg-[#e50914] text-xs transition-all font-semibold"
            >
              Explore Collection
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
