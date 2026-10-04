import React, { useState } from 'react';
import { Movie } from '../types/cinema';

interface HeroSpotlightProps {
  movie: Movie;
  onRateMovie: (movie: Movie, quickScore?: number) => void;
  onToggleWatchlist: (movie: Movie) => void;
  isWatchlisted: boolean;
  onOpenTrailer: (movie: Movie) => void;
  onScrollToReviews: () => void;
}

export const HeroSpotlight: React.FC<HeroSpotlightProps> = ({
  movie,
  onRateMovie,
  onToggleWatchlist,
  isWatchlisted,
  onOpenTrailer,
  onScrollToReviews,
}) => {
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);
  const [selectedQuickScore, setSelectedQuickScore] = useState<number>(10);
  const [hasRated, setHasRated] = useState<boolean>(false);

  const scoreLabels: Record<number, string> = {
    1: '1/10 Unwatchable',
    2: '2/10 Dreadful',
    3: '3/10 Poor',
    4: '4/10 Subpar',
    5: '5/10 Mediocre',
    6: '6/10 Decent',
    7: '7/10 Good',
    8: '8/10 Great',
    9: '9/10 Superb',
    10: '10/10 Masterpiece',
  };

  const handleQuickStarClick = (score: number) => {
    setSelectedQuickScore(score);
    setHasRated(true);
    onRateMovie(movie, score);
  };

  return (
    <section className="relative w-full -mt-20 overflow-hidden bg-[#0e0e10]">
      {/* Atmospheric Ambient Backdrops */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-screen scale-105 transition-transform duration-1000 ease-out"
        style={{
          backgroundImage: `url('${movie.backdropUrl || movie.posterUrl}')`,
        }}
      />

      {/* Multi-layered Cinematic Vignette & Crimson Rim Lighting */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#131315] via-[#131315]/85 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-[#131315] via-[#131315]/70 to-transparent w-full md:w-3/4" />
      <div className="absolute -top-32 right-1/4 w-96 h-96 rounded-full bg-[#e50914]/20 blur-[130px] pointer-events-none" />

      {/* Spotlight Content Container */}
      <div className="relative max-w-[1440px] mx-auto px-4 md:px-12 pt-36 pb-10 flex flex-col justify-end min-h-[720px]">
        {/* Top Badges & Meta */}
        <div className="flex flex-wrap items-center gap-2 mb-2">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#e50914] text-white text-[11px] tracking-wider uppercase font-semibold">
            <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
            <span>Premiere of the Week</span>
          </span>
          <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded bg-[#2a2a2c] text-[#ffb95f] text-[11px] font-semibold">
            <span
              className="material-symbols-outlined text-[15px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              stars
            </span>
            <span>IMAX Exclusive</span>
          </span>
          <span className="text-[#c5c5d5] text-xs flex items-center gap-1.5 ml-1">
            <span>Biography</span>
            <span>•</span>
            <span>Drama</span>
            <span>•</span>
            <span>History</span>
            <span>•</span>
            <span className="text-[#e5e1e4] font-medium">{movie.runtime}</span>
          </span>
        </div>

        {/* Grand Title & Director Callout */}
        <div className="max-w-3xl mb-4">
          <h1 className="font-serif text-4xl sm:text-6xl font-bold tracking-tight text-[#e5e1e4] leading-none drop-shadow-md">
            {movie.title}{' '}
            <span className="font-serif text-2xl sm:text-3xl text-[#70717f] font-normal">
              ({movie.year})
            </span>
          </h1>
          <p className="mt-2 text-xs tracking-widest uppercase text-[#ffb4aa] font-semibold flex items-center gap-2">
            <span>Directed by {movie.director}</span>
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#e50914]" />
            <span className="text-[#e9bcb6] font-normal">{movie.tagline}</span>
          </p>
        </div>

        {/* Dual Score Badges & Synopses Bento */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-end">
          {/* Left Column: Scores & Synopsis */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* CineRate Critic Score Badge */}
              <div className="flex items-center gap-2 bg-[#2a2a2c]/90 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg group transition-all hover:bg-[#353437]">
                <div className="w-11 h-11 rounded-lg bg-[#201f21] flex items-center justify-center text-[#ffb95f]">
                  <span className="material-symbols-outlined text-[26px]">workspace_premium</span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-xl text-[#ffb95f] font-bold">
                      {movie.criticScore}%
                    </span>
                    <span className="text-[11px] text-[#e9bcb6] uppercase">Critic Metascore</span>
                  </div>
                  <span className="text-xs text-[#c5c5d5]">
                    Based on {movie.criticCount} Certified Reviews
                  </span>
                </div>
              </div>

              {/* Audience Score Badge */}
              <div className="flex items-center gap-2 bg-[#2a2a2c]/90 backdrop-blur-md px-4 py-2.5 rounded-xl shadow-lg group transition-all hover:bg-[#353437]">
                <div className="w-11 h-11 rounded-lg bg-[#201f21] flex items-center justify-center text-[#e50914]">
                  <span
                    className="material-symbols-outlined text-[26px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    favorite
                  </span>
                </div>
                <div className="flex flex-col">
                  <div className="flex items-baseline gap-1">
                    <span className="font-serif text-xl text-[#e5e1e4] font-bold">
                      {movie.audienceScore}%
                    </span>
                    <div className="flex text-[#ffb95f] text-[14px] ml-1">
                      <span
                        className="material-symbols-outlined text-[15px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-[15px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-[15px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-[15px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span
                        className="material-symbols-outlined text-[15px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star_half
                      </span>
                    </div>
                  </div>
                  <span className="text-xs text-[#c5c5d5]">
                    {movie.userRatingCount?.toLocaleString()} Verified User Ratings
                  </span>
                </div>
              </div>
            </div>

            {/* Synopsis Excerpt */}
            <p className="text-sm sm:text-base text-[#e9bcb6] max-w-2xl leading-relaxed">
              {movie.synopsis}
            </p>

            {/* Interactive Action Deck */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              {/* Rate Button with Dynamic Hover Star Popout */}
              <div className="relative group/rate">
                <button
                  type="button"
                  onClick={() => onRateMovie(movie)}
                  className={`flex items-center gap-1.5 px-4 py-3 rounded transition-all shadow-[0_0_28px_rgba(229,9,20,0.35)] text-xs font-semibold active:scale-95 ${
                    hasRated
                      ? 'bg-[#ffb95f] text-[#2a1700] hover:bg-[#ffddb8]'
                      : 'bg-[#e50914] text-white hover:bg-[#c0000c]'
                  }`}
                >
                  <span
                    className="material-symbols-outlined text-[20px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span>{hasRated ? `Rated ${selectedQuickScore}/10 ★` : 'Rate This Film'}</span>
                  <span className="material-symbols-outlined text-[18px]">expand_less</span>
                </button>

                {/* Floating 10-Star Quick Selector */}
                <div className="absolute bottom-full left-0 mb-3 hidden group-hover/rate:flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-[#353437] shadow-2xl backdrop-blur-xl z-30 pointer-events-auto transition-opacity duration-200 border border-white/10">
                  <span className="text-[11px] text-[#e9bcb6] pr-2 border-r border-[#2a2a2c] font-semibold whitespace-nowrap">
                    Your Score:
                  </span>
                  <div className="flex items-center gap-0.5 text-[#e9bcb6]">
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => {
                      const activeScore = hoveredScore !== null ? hoveredScore : selectedQuickScore;
                      const isFilled = num <= activeScore;
                      return (
                        <button
                          key={num}
                          type="button"
                          onMouseEnter={() => setHoveredScore(num)}
                          onMouseLeave={() => setHoveredScore(null)}
                          onClick={() => handleQuickStarClick(num)}
                          className="p-0.5 hover:scale-125 transition-transform"
                          title={`${num}/10`}
                        >
                          <span
                            className={`material-symbols-outlined text-[20px] ${
                              isFilled ? 'text-[#ffb95f]' : 'text-[#70717f]'
                            }`}
                            style={{
                              fontVariationSettings: isFilled ? "'FILL' 1" : "'FILL' 0",
                            }}
                          >
                            star
                          </span>
                        </button>
                      );
                    })}
                  </div>
                  <span className="text-xs text-[#ffb95f] ml-1 font-bold whitespace-nowrap">
                    {scoreLabels[hoveredScore !== null ? hoveredScore : selectedQuickScore]}
                  </span>
                </div>
              </div>

              {/* Watchlist Button */}
              <button
                type="button"
                onClick={() => onToggleWatchlist(movie)}
                className={`flex items-center gap-1.5 px-4 py-3 rounded text-xs font-semibold transition-colors ${
                  isWatchlisted
                    ? 'bg-[#ffb4aa]/20 border border-[#ffb4aa] text-[#ffb4aa]'
                    : 'bg-[#2a2a2c] text-[#e5e1e4] hover:bg-[#353437]'
                }`}
              >
                <span
                  className="material-symbols-outlined text-[20px]"
                  style={{ fontVariationSettings: isWatchlisted ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {isWatchlisted ? 'bookmark_added' : 'bookmark_add'}
                </span>
                <span>{isWatchlisted ? 'In Watchlist' : 'Watchlist'}</span>
              </button>

              {/* Trailer CTA */}
              <button
                type="button"
                onClick={() => onOpenTrailer(movie)}
                className="flex items-center gap-1.5 px-4 py-3 rounded bg-[#0e0e10]/80 text-[#e5e1e4] hover:text-[#ffb4aa] transition-colors text-xs font-semibold backdrop-blur-sm"
              >
                <span className="w-6 h-6 rounded-full bg-[#e50914] text-white flex items-center justify-center">
                  <span
                    className="material-symbols-outlined text-[15px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    play_arrow
                  </span>
                </span>
                <span>Watch Official Trailer</span>
                <span className="px-1.5 py-0.5 rounded bg-[#201f21] text-[#ffb95f] text-[10px] tracking-wider uppercase font-bold">
                  4K
                </span>
              </button>

              {/* Read Reviews Link */}
              <button
                type="button"
                onClick={onScrollToReviews}
                className="flex items-center gap-1 text-xs text-[#e9bcb6] hover:text-white transition-colors ml-2 py-2"
              >
                <span className="material-symbols-outlined text-[18px]">speaker_notes</span>
                <span>Read Reviews (240+)</span>
              </button>
            </div>
          </div>

          {/* Right Column: Micro Feature Strip (Key Crew & Awards) */}
          <div className="lg:col-span-4 flex flex-col justify-end">
            <div className="bg-[#201f21]/70 backdrop-blur-md p-4 rounded-xl space-y-2 border border-white/5">
              <div className="flex items-center justify-between text-[11px] text-[#e9bcb6]">
                <span className="tracking-wider uppercase">Academy Award Recognition</span>
                <span className="text-[#ffb95f] font-bold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">emoji_events</span>
                  <span>7 Wins / 13 Noms</span>
                </span>
              </div>

              <div className="grid grid-cols-3 gap-2 pt-1 text-left">
                <div>
                  <span className="block text-[11px] text-[#c5c5d5]">Cinematography</span>
                  <span className="text-xs text-[#e5e1e4] font-medium truncate block">
                    Hoyte van Hoytema
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-[#c5c5d5]">Original Score</span>
                  <span className="text-xs text-[#e5e1e4] font-medium truncate block">
                    Ludwig Göransson
                  </span>
                </div>
                <div>
                  <span className="block text-[11px] text-[#c5c5d5]">Lead Actor</span>
                  <span className="text-xs text-[#e5e1e4] font-medium truncate block">
                    Cillian Murphy
                  </span>
                </div>
              </div>

              {/* Mini Soundbite Quote */}
              {movie.featuredQuote && (
                <div className="pt-2 mt-2 border-t border-[#2a2a2c]/60 flex items-center gap-2">
                  <div className="w-7 h-7 rounded-full overflow-hidden shrink-0 bg-[#2a2a2c]">
                    <img
                      className="w-full h-full object-cover"
                      alt={movie.featuredQuote.critic}
                      src={movie.featuredQuote.avatar}
                    />
                  </div>
                  <p className="text-xs italic text-[#c5c5d5] line-clamp-1">
                    {movie.featuredQuote.text} —{' '}
                    <span className="text-[#e5e1e4] not-italic font-medium">
                      {movie.featuredQuote.critic}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
