import React from 'react';
import { Movie } from '../types/cinema';

interface MovieDetailsModalProps {
  movie: Movie;
  onClose: () => void;
  onRateMovie: (movie: Movie) => void;
  onToggleWatchlist: (movie: Movie) => void;
  isWatchlisted: boolean;
  onOpenTrailer: (movie: Movie) => void;
}

export const MovieDetailsModal: React.FC<MovieDetailsModalProps> = ({
  movie,
  onClose,
  onRateMovie,
  onToggleWatchlist,
  isWatchlisted,
  onOpenTrailer,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#1c1b1d] border border-[#353437] rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-[0_25px_70px_rgba(0,0,0,0.9)] relative my-8 text-left">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-[#c5c5d5] hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>

        {/* Content Layout */}
        <div className="flex flex-col sm:flex-row gap-5">
          {/* Poster */}
          <div className="w-full sm:w-48 aspect-[2/3] rounded-xl overflow-hidden bg-[#2a2a2c] shrink-0 ring-1 ring-white/10 shadow-lg relative">
            <img
              src={movie.posterUrl}
              alt={movie.title}
              className="w-full h-full object-cover"
            />
            {movie.badge && (
              <span className="absolute top-2 left-2 bg-[#0e0e10]/90 text-[#ffb95f] text-[10px] font-bold px-2 py-0.5 rounded backdrop-blur-md">
                {movie.badge}
              </span>
            )}
          </div>

          {/* Details */}
          <div className="flex-1 min-w-0 space-y-3">
            <div>
              <div className="flex items-center gap-2 text-xs text-[#c5c5d5]">
                <span>{movie.year}</span>
                <span>•</span>
                <span>{movie.runtime}</span>
                <span>•</span>
                <span className="text-[#ffb4aa] font-semibold">Dir. {movie.director}</span>
              </div>
              <h3 className="font-serif text-2xl font-bold text-white mt-1">
                {movie.title}
              </h3>
              <p className="text-xs text-[#ffb95f] font-medium mt-0.5">
                {movie.genres.join(' • ')}
              </p>
            </div>

            {/* Score Strip */}
            <div className="flex items-center gap-3 p-2.5 bg-[#131315] rounded-xl border border-[#2a2a2c]">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[#ffb95f] text-[18px]">
                  workspace_premium
                </span>
                <div>
                  <div className="text-xs font-bold text-[#ffb95f]">{movie.criticScore}%</div>
                  <div className="text-[10px] text-[#70717f]">Critic Score</div>
                </div>
              </div>

              <div className="h-6 w-[1px] bg-[#2a2a2c]" />

              <div className="flex items-center gap-1.5">
                <span
                  className="material-symbols-outlined text-[#e50914] text-[18px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  favorite
                </span>
                <div>
                  <div className="text-xs font-bold text-white">{movie.audienceScore}%</div>
                  <div className="text-[10px] text-[#70717f]">Audience Score</div>
                </div>
              </div>

              {movie.weekendGross && (
                <>
                  <div className="h-6 w-[1px] bg-[#2a2a2c]" />
                  <div>
                    <div className="text-xs font-bold text-[#e5e1e4]">{movie.weekendGross}</div>
                    <div className="text-[10px] text-[#70717f]">Box Office</div>
                  </div>
                </>
              )}
            </div>

            {/* Synopsis */}
            <div>
              <h4 className="text-[11px] font-semibold uppercase tracking-wider text-[#c5c5d5] mb-1">
                Synopsis
              </h4>
              <p className="text-xs text-[#e9bcb6] leading-relaxed">{movie.synopsis}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onRateMovie(movie);
                }}
                className="px-4 py-2 bg-[#e50914] text-white hover:bg-[#c0000c] text-xs font-semibold rounded-lg transition-all shadow-[0_0_16px_rgba(229,9,20,0.35)] flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">star</span>
                <span>Rate Film</span>
              </button>

              <button
                type="button"
                onClick={() => onToggleWatchlist(movie)}
                className={`px-3 py-2 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors ${
                  isWatchlisted
                    ? 'bg-[#e50914]/20 border border-[#e50914] text-[#ffb4aa]'
                    : 'bg-[#201f21] text-white hover:bg-[#2a2a2c] border border-[#2a2a2c]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[16px]"
                  style={{ fontVariationSettings: isWatchlisted ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {isWatchlisted ? 'bookmark_added' : 'bookmark_add'}
                </span>
                <span>{isWatchlisted ? 'In Watchlist' : 'Watchlist'}</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  onClose();
                  onOpenTrailer(movie);
                }}
                className="px-3 py-2 bg-[#201f21] text-white hover:text-[#ffb4aa] text-xs font-semibold rounded-lg transition-colors border border-[#2a2a2c] flex items-center gap-1"
              >
                <span className="material-symbols-outlined text-[16px]">play_arrow</span>
                <span>Trailer</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
