import React, { useState } from 'react';
import { Review } from '../types/cinema';

interface ReviewsSectionProps {
  reviews: Review[];
  onUpvoteReview: (reviewId: string) => void;
  userUpvoted: Set<string>;
  onOpenReviewModal: () => void;
  onOpenComments: (review: Review) => void;
  onShareReview: (review: Review) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  reviews,
  onUpvoteReview,
  userUpvoted,
  onOpenReviewModal,
  onOpenComments,
  onShareReview,
}) => {
  const [filterMode, setFilterMode] = useState<'top' | 'controversial'>('top');
  const [activeChartPoint, setActiveChartPoint] = useState<{
    score: number;
    density: string;
    count: string;
  } | null>(null);

  const displayReviews = [...reviews].sort((a, b) => {
    if (filterMode === 'top') return b.score - a.score;
    // Controversial sorts by high debate / comments count
    return b.commentsCount - a.commentsCount;
  });

  return (
    <div className="lg:col-span-8 space-y-6" id="debates-section">
      {/* Section Header with Aggregate Curve Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
        <div>
          <span className="text-[11px] uppercase tracking-wider text-[#ffb4aa] font-semibold">
            Critical Discourse
          </span>
          <h2 className="font-serif text-2xl sm:text-3xl font-bold text-[#e5e1e4]">
            Community &amp; Verified Critic Debates
          </h2>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenReviewModal}
            className="text-xs bg-[#e50914] text-white px-2.5 py-1.5 rounded-lg hover:bg-[#c0000c] transition-colors font-semibold flex items-center gap-1 shadow-sm mr-1"
          >
            <span className="material-symbols-outlined text-[15px]">edit_square</span>
            <span>Write Review</span>
          </button>

          <span className="text-xs text-[#e9bcb6]">Filter by:</span>
          <button
            type="button"
            onClick={() => setFilterMode('top')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
              filterMode === 'top'
                ? 'bg-[#201f21] text-white border border-[#353437]'
                : 'bg-[#1c1b1d] text-[#c5c5d5] hover:text-white'
            }`}
          >
            Top Rated
          </button>
          <button
            type="button"
            onClick={() => setFilterMode('controversial')}
            className={`px-2.5 py-1 rounded-md text-xs font-semibold transition-all ${
              filterMode === 'controversial'
                ? 'bg-[#201f21] text-white border border-[#353437]'
                : 'bg-[#1c1b1d] text-[#c5c5d5] hover:text-white'
            }`}
          >
            Controversial
          </button>
        </div>
      </div>

      {/* Rating Breakdown Histogram SVG Card */}
      <div className="bg-[#201f21] p-4 sm:p-5 rounded-xl space-y-2 shadow-md border border-white/5 relative">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h4 className="text-base font-semibold text-[#e5e1e4]">
              Platform Rating Frequency (This Month)
            </h4>
            <p className="text-xs text-[#c5c5d5]">
              Over 380,000 ratings logged across 1,420 contemporary releases
            </p>
          </div>
          <div className="flex items-center gap-3 pt-1 sm:pt-0">
            <span className="flex items-center gap-1 text-xs text-[#ffb95f]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#ffb95f]" /> 8-10 Score Density (34%)
            </span>
            <span className="flex items-center gap-1 text-xs text-[#e50914]">
              <span className="w-2.5 h-2.5 rounded-full bg-[#e50914]" /> 1-4 Score Density (11%)
            </span>
          </div>
        </div>

        {/* Dynamic Tooltip on Hover */}
        {activeChartPoint && (
          <div className="bg-[#353437] text-white text-xs px-3 py-1.5 rounded-lg border border-[#ffb95f]/30 shadow-xl inline-flex items-center gap-2 transition-all">
            <span className="font-bold text-[#ffb95f]">Score {activeChartPoint.score}/10:</span>
            <span>{activeChartPoint.count} ratings</span>
            <span className="text-[#c5c5d5]">({activeChartPoint.density})</span>
          </div>
        )}

        {/* Clean Minimalist Inline SVG Distribution Chart */}
        <div className="w-full pt-2">
          <svg className="w-full h-20 overflow-visible" preserveAspectRatio="none" viewBox="0 0 500 80">
            <defs>
              <linearGradient id="scoreDistGrad" x1="0%" x2="100%" y1="0%" y2="0%">
                <stop offset="0%" stopColor="#93000a" stopOpacity="0.75" />
                <stop offset="40%" stopColor="#ffb4aa" stopOpacity="0.8" />
                <stop offset="70%" stopColor="#ffb95f" stopOpacity="0.9" />
                <stop offset="100%" stopColor="#ee9800" stopOpacity="1" />
              </linearGradient>
            </defs>
            {/* Sparkline fill area */}
            <path
              d="M 0,75 Q 50,70 100,65 T 200,50 T 300,30 T 400,10 T 500,25 L 500,80 L 0,80 Z"
              fill="url(#scoreDistGrad)"
              opacity="0.25"
            />
            {/* Smooth Curve Stroke */}
            <path
              d="M 0,75 Q 50,70 100,65 T 200,50 T 300,30 T 400,10 T 500,25"
              fill="none"
              stroke="url(#scoreDistGrad)"
              strokeLinecap="round"
              strokeWidth="3"
            />
            {/* Score markers with interactive hit targets */}
            <circle
              cx="100"
              cy="65"
              fill="#ffb4aa"
              r="4"
              className="cursor-pointer hover:r-6 transition-all"
              onMouseEnter={() =>
                setActiveChartPoint({ score: 2, count: '14,200', density: '3.7%' })
              }
              onMouseLeave={() => setActiveChartPoint(null)}
            />
            <circle
              cx="200"
              cy="50"
              fill="#ffb4aa"
              r="4"
              className="cursor-pointer hover:r-6 transition-all"
              onMouseEnter={() =>
                setActiveChartPoint({ score: 4, count: '28,100', density: '7.3%' })
              }
              onMouseLeave={() => setActiveChartPoint(null)}
            />
            <circle
              cx="300"
              cy="30"
              fill="#ffb95f"
              r="5"
              className="cursor-pointer hover:r-7 transition-all"
              onMouseEnter={() =>
                setActiveChartPoint({ score: 6, count: '64,800', density: '17.0%' })
              }
              onMouseLeave={() => setActiveChartPoint(null)}
            />
            <circle
              cx="400"
              cy="10"
              fill="#ee9800"
              r="6"
              className="cursor-pointer hover:r-8 transition-all"
              onMouseEnter={() =>
                setActiveChartPoint({ score: 8, count: '131,200', density: '34.5%' })
              }
              onMouseLeave={() => setActiveChartPoint(null)}
            />
            <circle
              cx="500"
              cy="25"
              fill="#ee9800"
              r="5"
              className="cursor-pointer hover:r-7 transition-all"
              onMouseEnter={() =>
                setActiveChartPoint({ score: 10, count: '48,500', density: '12.7%' })
              }
              onMouseLeave={() => setActiveChartPoint(null)}
            />
          </svg>
          <div className="flex justify-between text-[11px] text-[#70717f] pt-1">
            <span>Score 1</span>
            <span>Score 3</span>
            <span>Score 5</span>
            <span>Score 7</span>
            <span className="text-[#ffb95f] font-semibold">Score 8 (Median: 7.4)</span>
            <span>Score 10</span>
          </div>
        </div>
      </div>

      {/* Review Cards Stream */}
      <div className="space-y-4">
        {displayReviews.map((review) => {
          const isUpvoted = userUpvoted.has(review.id);
          const currentVotes = review.upvotes + (isUpvoted ? 1 : 0);

          return (
            <article
              key={review.id}
              className="bg-[#201f21] p-4 sm:p-5 rounded-xl space-y-2.5 shadow-md transition-all hover:bg-[#2a2a2c] border border-white/5"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-full overflow-hidden bg-[#2a2a2c] shrink-0 ring-1 ring-white/10">
                    <img
                      className="w-full h-full object-cover"
                      alt={review.authorName}
                      src={review.authorAvatar}
                    />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-semibold text-[#e5e1e4]">
                        {review.authorName}
                      </span>
                      {review.isVerifiedCritic ? (
                        <span className="flex items-center gap-0.5 px-1.5 py-0.5 rounded bg-[#2a2a2c] text-[#ffb4aa] text-[11px] font-semibold">
                          <span
                            className="material-symbols-outlined text-[13px]"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            verified
                          </span>
                          <span>Verified Critic</span>
                        </span>
                      ) : (
                        <span className="px-1.5 py-0.5 rounded bg-[#353437] text-[#c5c5d5] text-[11px]">
                          Patron Cinephile
                        </span>
                      )}
                    </div>
                    <span className="text-xs text-[#c5c5d5]">{review.authorRole}</span>
                  </div>
                </div>

                {/* Score Pill */}
                <div className="flex items-center gap-1 bg-[#0e0e10] px-2.5 py-1 rounded text-[#ffb95f] font-bold text-xs">
                  <span
                    className="material-symbols-outlined text-[16px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span>{review.score.toFixed(1)} / 10</span>
                </div>
              </div>

              {/* Film Title Reference */}
              <div className="flex items-center gap-2 pt-1 text-xs text-[#ffb4aa]">
                <span className="material-symbols-outlined text-[16px]">movie</span>
                <span className="font-semibold text-[#e5e1e4]">
                  Review of:{' '}
                  <span className="text-[#ffb4aa] hover:underline cursor-pointer font-bold">
                    {review.movieTitle} ({review.movieYear})
                  </span>
                </span>
              </div>

              {/* Body */}
              <p className="text-xs sm:text-sm text-[#e9bcb6] leading-relaxed">
                {review.content}
              </p>

              {/* Interaction Footer */}
              <div className="flex items-center justify-between pt-2 border-t border-[#353437]/60 text-[#c5c5d5] text-xs">
                <div className="flex items-center gap-4">
                  <button
                    type="button"
                    onClick={() => onUpvoteReview(review.id)}
                    className={`flex items-center gap-1.5 transition-colors ${
                      isUpvoted ? 'text-[#e50914] font-semibold' : 'hover:text-[#ffb4aa]'
                    }`}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: isUpvoted ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      thumb_up
                    </span>
                    <span>{currentVotes} Upvotes</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onOpenComments(review)}
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      chat_bubble_outline
                    </span>
                    <span>{review.commentsCount} Comments</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => onShareReview(review)}
                    className="flex items-center gap-1 hover:text-white transition-colors"
                    title="Share Review"
                  >
                    <span className="material-symbols-outlined text-[18px]">share</span>
                  </button>
                </div>

                <span className="text-[11px] text-[#70717f]">{review.timestamp}</span>
              </div>
            </article>
          );
        })}
      </div>
    </div>
  );
};
