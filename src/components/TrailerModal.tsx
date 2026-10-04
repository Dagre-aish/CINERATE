import React from 'react';
import { Movie } from '../types/cinema';

interface TrailerModalProps {
  movie: Movie;
  onClose: () => void;
  onRateMovie: (movie: Movie) => void;
}

export const TrailerModal: React.FC<TrailerModalProps> = ({
  movie,
  onClose,
  onRateMovie,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
      <div className="bg-[#1c1b1d] border border-[#353437] rounded-2xl max-w-4xl w-full overflow-hidden shadow-[0_25px_70px_rgba(0,0,0,0.9)] relative text-left">
        {/* Top Header */}
        <div className="p-4 sm:p-5 flex items-center justify-between border-b border-[#2a2a2c] bg-[#131315]">
          <div className="flex items-center gap-3">
            <span className="w-2.5 h-2.5 rounded-full bg-[#e50914] animate-pulse" />
            <div>
              <h3 className="font-serif text-lg font-bold text-white flex items-center gap-2">
                <span>{movie.title}</span>
                <span className="text-xs text-[#c5c5d5] font-normal">Official 4K Presentation</span>
              </h3>
              <div className="text-[11px] text-[#ffb95f] flex items-center gap-1.5 font-medium">
                <span>IMAX 70mm Sync Sound</span>
                <span>•</span>
                <span>Dolby Atmos 7.1.4</span>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#c5c5d5] hover:text-white hover:bg-[#2a2a2c] transition-colors"
          >
            <span className="material-symbols-outlined text-[24px]">close</span>
          </button>
        </div>

        {/* Video Player Mockup / Embed */}
        <div className="relative aspect-video w-full bg-black flex items-center justify-center overflow-hidden group">
          {/* Movie backdrop in motion */}
          <img
            src={movie.backdropUrl || movie.posterUrl}
            alt={movie.title}
            className="w-full h-full object-cover opacity-60 scale-105 filter contrast-125"
          />

          {/* Central Play / Pause Graphic Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/30 flex flex-col justify-between p-6">
            <div className="flex justify-between items-start text-xs text-white">
              <span className="bg-[#e50914] px-2 py-0.5 rounded font-bold uppercase tracking-wider text-[10px]">
                Official Theatrical Trailer
              </span>
              <span className="bg-black/60 px-2 py-0.5 rounded backdrop-blur-sm text-[11px] text-[#c5c5d5]">
                4K UHD 60FPS
              </span>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#e50914] text-white flex items-center justify-center mx-auto shadow-[0_0_30px_rgba(229,9,20,0.6)] cursor-pointer hover:scale-110 transition-transform">
                <span
                  className="material-symbols-outlined text-[36px]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  play_arrow
                </span>
              </div>
              <p className="text-xs text-white/90 mt-3 font-serif tracking-wide drop-shadow">
                "Prometheus who gave fire to humanity..."
              </p>
            </div>

            {/* Video Controls Scrim */}
            <div className="flex items-center justify-between text-xs text-[#c5c5d5] pt-2">
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-white">
                  volume_up
                </span>
                <div className="w-32 sm:w-64 h-1 bg-white/30 rounded-full overflow-hidden">
                  <div className="w-1/3 h-full bg-[#e50914]" />
                </div>
                <span className="tabular-nums text-[11px]">01:14 / 03:08</span>
              </div>
              <div className="flex items-center gap-3">
                <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-white">
                  subtitles
                </span>
                <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-white">
                  settings
                </span>
                <span className="material-symbols-outlined text-[20px] cursor-pointer hover:text-white">
                  fullscreen
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Trailer Details Strip */}
        <div className="p-4 sm:p-5 bg-[#131315] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#ffb4aa] font-semibold">Directed by {movie.director}</span>
              <span className="text-[#70717f]">•</span>
              <span className="text-[#c5c5d5]">{movie.genres.join(', ')}</span>
            </div>
            <p className="text-xs text-[#e9bcb6] line-clamp-1 max-w-xl">{movie.synopsis}</p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={() => {
                onClose();
                onRateMovie(movie);
              }}
              className="px-4 py-2 bg-[#e50914] text-white hover:bg-[#c0000c] text-xs font-semibold rounded-lg transition-all shadow-md flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">star</span>
              <span>Rate Movie Now</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
