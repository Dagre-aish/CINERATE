/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Movie, Review, UserDiaryEntry, UserProfile } from './types/cinema';
import {
  CURRENT_USER,
  OPPENHEIMER_MOVIE,
  TRENDING_MOVIES,
  BOX_OFFICE_MOVIES,
  INITIAL_REVIEWS,
  INITIAL_DIARY_ENTRIES,
} from './data/moviesData';
import { Navigation } from './components/Navigation';
import { SignInScreen } from './components/SignInScreen';
import { HeroSpotlight } from './components/HeroSpotlight';
import { FilterBar } from './components/FilterBar';
import { MovieGrid } from './components/MovieGrid';
import { ReviewsSection } from './components/ReviewsSection';
import { BoxOfficeSidebar } from './components/BoxOfficeSidebar';
import { UserStatsBanner } from './components/UserStatsBanner';
import { RatingModal } from './components/RatingModal';
import { TrailerModal } from './components/TrailerModal';
import { MovieDetailsModal } from './components/MovieDetailsModal';
import { FilmDiaryModal } from './components/FilmDiaryModal';
import { SearchModal } from './components/SearchModal';
import { EditorialModal } from './components/EditorialModal';
import { CommentsModal } from './components/CommentsModal';
import { ScreenSwitcher } from './components/ScreenSwitcher';
import { Toast } from './components/Toast';

export default function App() {
  // Screen 1: 'signin' | Screen 2: 'rating'
  const [currentScreen, setCurrentScreen] = useState<'signin' | 'rating'>('signin');

  // User Profile
  const [currentUser, setCurrentUser] = useState<UserProfile>(CURRENT_USER);

  // Watchlist & Diary
  const [watchlist, setWatchlist] = useState<Set<string>>(
    new Set(['oppenheimer', 'past-lives'])
  );
  const [diaryEntries, setDiaryEntries] = useState<UserDiaryEntry[]>(INITIAL_DIARY_ENTRIES);
  const [reviews, setReviews] = useState<Review[]>(INITIAL_REVIEWS);
  const [userUpvoted, setUserUpvoted] = useState<Set<string>>(new Set(['rev-1']));

  // Navigation & Filtering
  const [activeTab, setActiveTab] = useState<string>('discover');
  const [activeCategory, setActiveCategory] = useState<string>('trending');
  const [selectedGenre, setSelectedGenre] = useState<string>('all');
  const [selectedScore, setSelectedScore] = useState<string>('all');
  const [selectedYear, setSelectedYear] = useState<string>('all');
  const [viewLayout, setViewLayout] = useState<'grid' | 'list'>('grid');

  // Modals
  const [ratingMovie, setRatingMovie] = useState<Movie | null>(null);
  const [initialRatingScore, setInitialRatingScore] = useState<number>(9);
  const [isRatingModalOpen, setIsRatingModalOpen] = useState(false);

  const [trailerMovie, setTrailerMovie] = useState<Movie | null>(null);
  const [detailsMovie, setDetailsMovie] = useState<Movie | null>(null);

  const [isDiaryModalOpen, setIsDiaryModalOpen] = useState(false);
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isEditorialModalOpen, setIsEditorialModalOpen] = useState(false);
  const [commentsReview, setCommentsReview] = useState<Review | null>(null);

  // Toast
  const [toast, setToast] = useState<{ message: string; visible: boolean }>({
    message: '',
    visible: false,
  });

  const showToast = (message: string) => {
    setToast({ message, visible: true });
    setTimeout(() => {
      setToast((prev) => ({ ...prev, visible: false }));
    }, 3200);
  };

  // Aggregated list of all movies in the catalog
  const allMoviesList: Movie[] = [
    OPPENHEIMER_MOVIE,
    ...TRENDING_MOVIES,
    ...BOX_OFFICE_MOVIES,
  ];

  // Cmd+K global listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsSearchModalOpen(true);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Filter trending list based on selected controls
  const filteredTrendingMovies = TRENDING_MOVIES.filter((m) => {
    // Genre
    if (selectedGenre !== 'all' && !m.genres.includes(selectedGenre)) {
      return false;
    }
    // Score
    if (selectedScore !== 'all') {
      const minScore = parseFloat(selectedScore) * 10;
      if (m.audienceScore < minScore && m.criticScore < minScore) {
        return false;
      }
    }
    // Year
    if (selectedYear === '2024' && m.year !== 2024) return false;
    if (selectedYear === '2023' && m.year !== 2023) return false;
    if (selectedYear === 'classic' && m.year >= 2000) return false;

    return true;
  });

  // Watchlist Toggle
  const handleToggleWatchlist = (movie: Movie) => {
    const newWatchlist = new Set(watchlist);
    if (newWatchlist.has(movie.id)) {
      newWatchlist.delete(movie.id);
      showToast(`Removed "${movie.title}" from your Watchlist`);
    } else {
      newWatchlist.add(movie.id);
      showToast(`Added "${movie.title}" to your Watchlist`);
    }
    setWatchlist(newWatchlist);
  };

  // Rate Movie Action
  const handleOpenRateMovie = (movie?: Movie, quickScore?: number) => {
    setRatingMovie(movie || OPPENHEIMER_MOVIE);
    setInitialRatingScore(quickScore || 9);
    setIsRatingModalOpen(true);
  };

  // Submit Rating Entry
  const handleSubmitRating = (entry: UserDiaryEntry) => {
    setDiaryEntries([entry, ...diaryEntries]);
    setCurrentUser((prev) => ({
      ...prev,
      filmsLogged: prev.filmsLogged + 1,
      reviewsCount: entry.review ? prev.reviewsCount + 1 : prev.reviewsCount,
      avgScore: Number(
        ((prev.avgScore * prev.filmsLogged + entry.score) / (prev.filmsLogged + 1)).toFixed(1)
      ),
    }));

    // If review written, also append to Community Debates
    if (entry.review) {
      const newCommunityReview: Review = {
        id: `rev-${Date.now()}`,
        movieId: entry.movieId,
        movieTitle: entry.movieTitle,
        movieYear: entry.movieYear,
        authorName: currentUser.name,
        authorRole: `${currentUser.tier} • Logged ${currentUser.filmsLogged + 1} films`,
        authorAvatar: currentUser.avatar,
        isVerifiedCritic: false,
        score: entry.score,
        content: `"${entry.review}"`,
        upvotes: 1,
        commentsCount: 0,
        timestamp: 'Just now',
      };
      setReviews([newCommunityReview, ...reviews]);
    }

    setIsRatingModalOpen(false);
    showToast(`Logged "${entry.movieTitle}" (${entry.score}/10) to your Film Diary!`);
  };

  // Upvote Review
  const handleUpvoteReview = (reviewId: string) => {
    const newUpvoted = new Set(userUpvoted);
    if (newUpvoted.has(reviewId)) {
      newUpvoted.delete(reviewId);
    } else {
      newUpvoted.add(reviewId);
      showToast('Review upvoted!');
    }
    setUserUpvoted(newUpvoted);
  };

  // Share Review
  const handleShareReview = (review: Review) => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(
        `Read ${review.authorName}'s review of ${review.movieTitle} on CineRate: ${review.content}`
      );
    }
    showToast('Review link copied to clipboard!');
  };

  // Smooth scroll to reviews
  const handleScrollToReviews = () => {
    const el = document.getElementById('debates-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#131315] text-[#e5e1e4] font-sans relative selection:bg-[#e50914] selection:text-white">
      {/* Toast Notification */}
      {toast.visible && (
        <Toast message={toast.message} onClose={() => setToast({ message: '', visible: false })} />
      )}

      {/* Screen 1: CineRate - Sign In (Scrolling Background) */}
      {currentScreen === 'signin' && (
        <SignInScreen
          onSignInSuccess={() => {
            setCurrentScreen('rating');
            showToast('Signed in as Marcus Vance (PRO Cinephile)');
          }}
          onExploreAsGuest={() => {
            setCurrentScreen('rating');
            showToast('Browsing CineRate as Guest Cinephile');
          }}
        />
      )}

      {/* Screen 2: CineRate - Movie Rating */}
      {currentScreen === 'rating' && (
        <>
          {/* Top Bar Contract (Brand - Nav Links - Actions) */}
          <Navigation
            currentUser={currentUser}
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onOpenRateModal={() => handleOpenRateMovie()}
            onOpenSearch={() => setIsSearchModalOpen(true)}
            onOpenDiary={() => setIsDiaryModalOpen(true)}
            onSignOut={() => {
              setCurrentScreen('signin');
              showToast('Signed out from CineRate');
            }}
            watchlistCount={watchlist.size}
          />

          <main className="w-full pt-20 bg-[#131315] relative z-10 min-h-screen pb-16">
            {/* If user clicked Watchlist tab, show watchlist view */}
            {activeTab === 'watchlist' ? (
              <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-12">
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <span className="text-[11px] uppercase tracking-wider text-[#ffb4aa] font-semibold">
                      Your Curated Queue
                    </span>
                    <h1 className="font-serif text-3xl font-bold text-white">Your Watchlist</h1>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveTab('discover')}
                    className="text-xs text-[#ffb4aa] hover:text-white flex items-center gap-1"
                  >
                    <span>Back to Discover</span>
                    <span className="material-symbols-outlined text-[16px]">arrow_forward</span>
                  </button>
                </div>

                {watchlist.size === 0 ? (
                  <div className="py-20 text-center text-[#c5c5d5]">
                    <span className="material-symbols-outlined text-5xl text-[#70717f] mb-2">
                      bookmark_border
                    </span>
                    <p className="text-base font-semibold text-white">Your watchlist is empty</p>
                    <p className="text-xs text-[#70717f] mt-1">
                      Bookmark movies from trending releases or box office charts.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
                    {allMoviesList
                      .filter((m) => watchlist.has(m.id))
                      .map((movie) => (
                        <div
                          key={movie.id}
                          className="bg-[#201f21] rounded-lg overflow-hidden border border-white/5 p-2 flex flex-col justify-between"
                        >
                          <div
                            className="aspect-[2/3] rounded overflow-hidden bg-[#2a2a2c] cursor-pointer"
                            onClick={() => setDetailsMovie(movie)}
                          >
                            <img
                              src={movie.posterUrl}
                              alt={movie.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform"
                            />
                          </div>
                          <div className="pt-2">
                            <h4 className="font-serif text-xs font-semibold text-white truncate">
                              {movie.title}
                            </h4>
                            <div className="flex items-center justify-between text-[11px] text-[#ffb95f] mt-1">
                              <span>★ {(movie.audienceScore / 10).toFixed(1)}</span>
                              <button
                                type="button"
                                onClick={() => handleToggleWatchlist(movie)}
                                className="text-[#e50914] text-[10px] hover:underline"
                              >
                                Remove
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                {/* HERO SPOTLIGHT: Oppenheimer Premiere */}
                <HeroSpotlight
                  movie={OPPENHEIMER_MOVIE}
                  onRateMovie={(movie, score) => handleOpenRateMovie(movie, score)}
                  onToggleWatchlist={handleToggleWatchlist}
                  isWatchlisted={watchlist.has(OPPENHEIMER_MOVIE.id)}
                  onOpenTrailer={(movie) => {
                    setTrailerMovie(movie);
                  }}
                  onScrollToReviews={handleScrollToReviews}
                />

                {/* QUICK-FILTER & CATEGORY BAR */}
                <FilterBar
                  activeCategory={activeCategory}
                  setActiveCategory={setActiveCategory}
                  selectedGenre={selectedGenre}
                  setSelectedGenre={setSelectedGenre}
                  selectedScore={selectedScore}
                  setSelectedScore={setSelectedScore}
                  selectedYear={selectedYear}
                  setSelectedYear={setSelectedYear}
                  viewLayout={viewLayout}
                  setViewLayout={setViewLayout}
                />

                {/* TRENDING FILMS THIS WEEK (Poster Grid & Quick Rate) */}
                <MovieGrid
                  movies={filteredTrendingMovies}
                  onRateMovie={(movie) => handleOpenRateMovie(movie)}
                  onToggleWatchlist={handleToggleWatchlist}
                  isWatchlisted={(id) => watchlist.has(id)}
                  onOpenDetails={(movie) => setDetailsMovie(movie)}
                  viewLayout={viewLayout}
                />

                {/* TWO-COLUMN SECTION: Reviews & Debates vs Top 10 Box Office */}
                <section className="w-full max-w-[1440px] mx-auto px-4 md:px-12 py-10">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left 8 Cols: Critical Discourse & Platform Score Curve */}
                    <ReviewsSection
                      reviews={reviews}
                      onUpvoteReview={handleUpvoteReview}
                      userUpvoted={userUpvoted}
                      onOpenReviewModal={() => handleOpenRateMovie()}
                      onOpenComments={(review) => setCommentsReview(review)}
                      onShareReview={handleShareReview}
                    />

                    {/* Right 4 Cols: Weekly Charts Top Box Office & Curated Collections */}
                    <BoxOfficeSidebar
                      movies={BOX_OFFICE_MOVIES}
                      onToggleWatchlist={handleToggleWatchlist}
                      isWatchlisted={(id) => watchlist.has(id)}
                      onOpenDetails={(movie) => setDetailsMovie(movie)}
                      onOpenNeoNoirCollection={() => setIsEditorialModalOpen(true)}
                      onOpenFullCharts={() => {
                        setActiveTab('in-theaters');
                        showToast('Viewing Full Box Office & Festival Grosses');
                      }}
                    />
                  </div>
                </section>

                {/* USER CINERATING STATS TEASER BANNER (Marcus Vance) */}
                <UserStatsBanner
                  user={currentUser}
                  onOpenDiary={() => setIsDiaryModalOpen(true)}
                />
              </>
            )}
          </main>

          {/* Prestigious Editorial Footer */}
          <footer className="w-full bg-[#0e0e10] border-t border-[#201f21] relative z-10">
            <div className="max-w-[1440px] mx-auto px-4 md:px-12 pt-12 pb-8">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 mb-12">
                <div className="lg:col-span-2 space-y-3">
                  <div className="flex items-center gap-2">
                    <img
                      alt="CineRate Logo"
                      className="h-7 w-auto object-contain"
                      src="https://lh3.googleusercontent.com/aida/AEtjO1UxqscHtMbnDNW0xOAx_V0AK-MYhX9un2zsw55_djRRZJUg4nqTf0x3ZBl209HFGasC5Gi8QckcDJsVmnTlomxxe-IBxhn_MhXRajHB2FSlMjMqKjZcJkCjCqms7fvzoUrr_L9ud-usQBhy1HK4zLtATyDHflVWudkUdihYuulHLWRFoT-3IY1ZlpB_Y8bDsYRAushTOZ0eKnXR9RWe-52ut7_d5mToVq1-j5wGZBWDU0wQTQPrOgyhwBwb"
                    />
                    <span className="font-serif text-xl text-[#e5e1e4] font-bold tracking-tight">
                      Cine<span className="text-[#e50914]">Rate</span>
                    </span>
                  </div>
                  <p className="text-xs text-[#e9bcb6] max-w-sm leading-relaxed">
                    The definitive home for cinema lovers and critics. Deep catalog analysis,
                    refined reviews, and curated discourse.
                  </p>
                  <div className="flex items-center gap-4 text-[#e9bcb6] pt-1">
                    <button
                      type="button"
                      onClick={() => showToast('Subscribed to CineRate RSS feeds')}
                      className="hover:text-[#ffb4aa] transition-colors"
                      title="RSS Feeds"
                    >
                      <span className="material-symbols-outlined text-[20px]">rss_feed</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('community');
                        handleScrollToReviews();
                      }}
                      className="hover:text-[#ffb4aa] transition-colors"
                      title="Debate Forums"
                    >
                      <span className="material-symbols-outlined text-[20px]">forum</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('in-theaters');
                        showToast('Viewing Theatrical Screening Schedules');
                      }}
                      className="hover:text-[#ffb4aa] transition-colors"
                      title="Global Theaters"
                    >
                      <span className="material-symbols-outlined text-[20px]">theaters</span>
                    </button>
                  </div>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                    Explore
                  </h3>
                  <ul className="space-y-2 text-xs text-[#e9bcb6]">
                    <li>
                      <button
                        type="button"
                        onClick={() => {
                          setSelectedScore('9.0');
                          showToast('Filtered for Top 250 Masterpieces');
                        }}
                        className="hover:text-white transition-colors"
                      >
                        Top 250 Movies
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => setActiveCategory('trending')}
                        className="hover:text-white transition-colors"
                      >
                        Most Anticipated
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => setActiveCategory('in-theaters')}
                        className="hover:text-white transition-colors"
                      >
                        Box Office
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => setActiveCategory('nominees-2024')}
                        className="hover:text-white transition-colors"
                      >
                        Film Festivals
                      </button>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                    Community
                  </h3>
                  <ul className="space-y-2 text-xs text-[#e9bcb6]">
                    <li>
                      <button
                        type="button"
                        onClick={handleScrollToReviews}
                        className="hover:text-white transition-colors"
                      >
                        Critic Reviews
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => setIsEditorialModalOpen(true)}
                        className="hover:text-white transition-colors"
                      >
                        Member Lists
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={handleScrollToReviews}
                        className="hover:text-white transition-colors"
                      >
                        Discussion Forums
                      </button>
                    </li>
                    <li>
                      <button
                        type="button"
                        onClick={() => showToast('CineRate 2026 Awards nominations opening soon')}
                        className="hover:text-white transition-colors"
                      >
                        CineRate Awards
                      </button>
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                    Apps &amp; API
                  </h3>
                  <ul className="space-y-2 text-xs text-[#e9bcb6]">
                    <li className="hover:text-white transition-colors cursor-pointer">
                      iOS Application
                    </li>
                    <li className="hover:text-white transition-colors cursor-pointer">
                      Android Application
                    </li>
                    <li className="hover:text-white transition-colors cursor-pointer">
                      Developer API Docs
                    </li>
                    <li className="hover:text-white transition-colors cursor-pointer">
                      TV OS Sync
                    </li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
                    Company
                  </h3>
                  <ul className="space-y-2 text-xs text-[#e9bcb6]">
                    <li className="hover:text-white transition-colors cursor-pointer">
                      About CineRate
                    </li>
                    <li className="hover:text-white transition-colors cursor-pointer">
                      Editorial Guidelines
                    </li>
                    <li className="hover:text-white transition-colors cursor-pointer">
                      Press &amp; Media Kit
                    </li>
                    <li className="hover:text-white transition-colors cursor-pointer">
                      Privacy &amp; Terms
                    </li>
                  </ul>
                </div>
              </div>

              <div className="pt-6 border-t border-[#201f21] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#70717f]">
                <p>© 2026 CineRate Media Inc. Crafted for discerning cinephiles worldwide.</p>
                <div className="flex items-center gap-6">
                  <span className="hover:text-[#e5e1e4] cursor-pointer">Privacy Policy</span>
                  <span className="hover:text-[#e5e1e4] cursor-pointer">Terms of Service</span>
                  <span className="hover:text-[#e5e1e4] cursor-pointer">Cookie Preferences</span>
                </div>
              </div>
            </div>
          </footer>
        </>
      )}

      {/* Floating Prototype Screen Switcher */}
      <ScreenSwitcher
        currentScreen={currentScreen}
        onSwitchScreen={(screen) => {
          setCurrentScreen(screen);
          showToast(
            screen === 'signin'
              ? 'Switched to Screen 1: Sign In (Scrolling Background)'
              : 'Switched to Screen 2: Movie Rating'
          );
        }}
      />

      {/* MODALS */}
      {/* 1. Log / Rate Movie Modal */}
      {isRatingModalOpen && (
        <RatingModal
          movie={ratingMovie}
          initialScore={initialRatingScore}
          availableMovies={allMoviesList}
          onClose={() => setIsRatingModalOpen(false)}
          onSubmitRating={handleSubmitRating}
        />
      )}

      {/* 2. Official Trailer Modal */}
      {trailerMovie && (
        <TrailerModal
          movie={trailerMovie}
          onClose={() => setTrailerMovie(null)}
          onRateMovie={(m) => handleOpenRateMovie(m)}
        />
      )}

      {/* 3. Movie Details Modal */}
      {detailsMovie && (
        <MovieDetailsModal
          movie={detailsMovie}
          onClose={() => setDetailsMovie(null)}
          onRateMovie={(m) => handleOpenRateMovie(m)}
          onToggleWatchlist={handleToggleWatchlist}
          isWatchlisted={watchlist.has(detailsMovie.id)}
          onOpenTrailer={(m) => setTrailerMovie(m)}
        />
      )}

      {/* 4. User Film Diary Modal */}
      {isDiaryModalOpen && (
        <FilmDiaryModal
          user={currentUser}
          diaryEntries={diaryEntries}
          onClose={() => setIsDiaryModalOpen(false)}
          onOpenRateModal={() => handleOpenRateMovie()}
        />
      )}

      {/* 5. Global Search Modal (Cmd+K) */}
      {isSearchModalOpen && (
        <SearchModal
          allMovies={allMoviesList}
          onClose={() => setIsSearchModalOpen(false)}
          onSelectMovie={(m) => setDetailsMovie(m)}
          onRateMovie={(m) => handleOpenRateMovie(m)}
        />
      )}

      {/* 6. Neo-Noir Curated Editorial Modal */}
      {isEditorialModalOpen && (
        <EditorialModal onClose={() => setIsEditorialModalOpen(false)} />
      )}

      {/* 7. Comments Debate Modal */}
      {commentsReview && (
        <CommentsModal
          review={commentsReview}
          onClose={() => setCommentsReview(null)}
        />
      )}
    </div>
  );
}
