import React, { useState } from 'react';
import { Movie, UserDiaryEntry } from '../types/cinema';

interface RatingModalProps {
  movie: Movie | null;
  initialScore?: number;
  availableMovies: Movie[];
  onClose: () => void;
  onSubmitRating: (entry: UserDiaryEntry) => void;
}

export const RatingModal: React.FC<RatingModalProps> = ({
  movie: selectedMovieProp,
  initialScore = 9,
  availableMovies,
  onClose,
  onSubmitRating,
}) => {
  const [selectedMovie, setSelectedMovie] = useState<Movie>(
    selectedMovieProp || availableMovies[0]
  );
  const [score, setScore] = useState<number>(initialScore);
  const [hoveredScore, setHoveredScore] = useState<number | null>(null);
  const [reviewText, setReviewText] = useState<string>('');
  const [hasSpoiler, setHasSpoiler] = useState<boolean>(false);
  const [format, setFormat] = useState<string>('70mm IMAX');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Masterpiece', 'Cinematography']);
  const [watchedDate, setWatchedDate] = useState<string>(
    new Date().toISOString().split('T')[0]
  );

  const tagsList = [
    'Masterpiece',
    'Cinematography',
    'Sound Design',
    'Screenplay',
    'Acting Tour-de-Force',
    'Directorial Vision',
    'Emotional Resonance',
    'Must Rewatch',
  ];

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

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newEntry: UserDiaryEntry = {
      id: `diary-${Date.now()}`,
      movieId: selectedMovie.id,
      movieTitle: selectedMovie.title,
      movieYear: selectedMovie.year,
      posterUrl: selectedMovie.posterUrl,
      score,
      review: reviewText || undefined,
      loggedDate: new Date(watchedDate).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }),
      tags: selectedTags,
    };
    onSubmitRating(newEntry);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#1c1b1d] border border-[#353437] rounded-2xl max-w-lg w-full p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative my-8 text-left">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-[#c5c5d5] hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-2 mb-4">
          <span className="material-symbols-outlined text-[#e50914] text-[20px]">
            rate_review
          </span>
          <h3 className="font-serif text-xl font-bold text-white">Log &amp; Rate Film</h3>
        </div>

        {/* Movie Selector Card */}
        <div className="flex items-center gap-3 p-3 bg-[#131315] rounded-xl border border-[#2a2a2c] mb-5">
          <img
            src={selectedMovie.posterUrl}
            alt={selectedMovie.title}
            className="w-12 h-18 rounded object-cover ring-1 ring-white/10 shrink-0"
          />
          <div className="flex-1 min-w-0">
            <label className="text-[10px] text-[#70717f] uppercase tracking-wider block font-semibold">
              Selected Film
            </label>
            <select
              value={selectedMovie.id}
              onChange={(e) => {
                const found = availableMovies.find((m) => m.id === e.target.value);
                if (found) setSelectedMovie(found);
              }}
              className="w-full bg-transparent text-sm font-serif font-bold text-white outline-none cursor-pointer truncate"
            >
              {availableMovies.map((m) => (
                <option key={m.id} value={m.id} className="bg-[#1c1b1d] text-white">
                  {m.title} ({m.year}) - Dir. {m.director}
                </option>
              ))}
            </select>
            <div className="text-[11px] text-[#c5c5d5]">
              {selectedMovie.runtime} • {selectedMovie.genres.join(', ')}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Interactive 10-Star Rating Bar */}
          <div>
            <div className="flex items-center justify-between mb-1.5">
              <label className="text-xs font-semibold text-[#e5e1e4] uppercase tracking-wider">
                CineRate Score (1 - 10)
              </label>
              <span className="text-xs font-bold text-[#ffb95f]">
                {scoreLabels[hoveredScore !== null ? hoveredScore : score]}
              </span>
            </div>

            <div className="flex items-center justify-between p-3 bg-[#131315] rounded-xl border border-[#2a2a2c]">
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((starVal) => {
                  const activeVal = hoveredScore !== null ? hoveredScore : score;
                  const isFilled = starVal <= activeVal;
                  return (
                    <button
                      key={starVal}
                      type="button"
                      onMouseEnter={() => setHoveredScore(starVal)}
                      onMouseLeave={() => setHoveredScore(null)}
                      onClick={() => setScore(starVal)}
                      className="p-0.5 hover:scale-125 transition-transform"
                    >
                      <span
                        className={`material-symbols-outlined text-[24px] ${
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

              <span className="font-serif text-lg font-bold text-white tabular-nums px-2 py-0.5 bg-[#201f21] rounded border border-white/5">
                {score}/10
              </span>
            </div>
          </div>

          {/* Viewing Details: Date & Format */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-medium text-[#c5c5d5] mb-1 uppercase tracking-wider">
                Date Watched
              </label>
              <input
                type="date"
                value={watchedDate}
                onChange={(e) => setWatchedDate(e.target.value)}
                className="w-full bg-[#131315] text-[#e5e1e4] text-xs px-3 py-2 rounded-lg border border-[#2a2a2c] focus:border-[#e50914] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-[11px] font-medium text-[#c5c5d5] mb-1 uppercase tracking-wider">
                Viewing Format
              </label>
              <select
                value={format}
                onChange={(e) => setFormat(e.target.value)}
                className="w-full bg-[#131315] text-[#e5e1e4] text-xs px-3 py-2 rounded-lg border border-[#2a2a2c] focus:border-[#e50914] focus:outline-none cursor-pointer"
              >
                <option value="70mm IMAX">70mm IMAX</option>
                <option value="35mm Film">35mm Projection</option>
                <option value="Dolby Cinema">Dolby Cinema</option>
                <option value="Standard Theatrical">Standard Theatrical</option>
                <option value="4K UHD Blu-ray">4K UHD Blu-ray</option>
                <option value="Streaming">Home Cinema Stream</option>
              </select>
            </div>
          </div>

          {/* Written Critique */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-[11px] font-medium text-[#c5c5d5] uppercase tracking-wider">
                Your Written Review (Optional)
              </label>
              <span className="text-[10px] text-[#70717f]">{reviewText.length}/500</span>
            </div>
            <textarea
              rows={3}
              maxLength={500}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="What made this cinematic experience exceptional or flawed? Discuss directing, score, framing..."
              className="w-full bg-[#131315] text-[#e5e1e4] text-xs p-3 rounded-lg border border-[#2a2a2c] focus:border-[#e50914] focus:outline-none focus:ring-1 focus:ring-[#e50914] transition-all resize-none placeholder:text-[#70717f]"
            />
          </div>

          {/* Tags */}
          <div>
            <label className="block text-[11px] font-medium text-[#c5c5d5] mb-1.5 uppercase tracking-wider">
              Cinephile Tags
            </label>
            <div className="flex flex-wrap gap-1.5">
              {tagsList.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                  <button
                    key={tag}
                    type="button"
                    onClick={() => handleTagToggle(tag)}
                    className={`text-[11px] px-2.5 py-1 rounded-full transition-all ${
                      isSelected
                        ? 'bg-[#ffb4aa]/20 border border-[#ffb4aa] text-[#ffb4aa] font-semibold'
                        : 'bg-[#131315] border border-[#2a2a2c] text-[#c5c5d5] hover:text-white'
                    }`}
                  >
                    {tag}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Spoilers & Public check */}
          <div className="flex items-center justify-between pt-1">
            <label className="flex items-center gap-2 text-xs text-[#c5c5d5] cursor-pointer">
              <input
                type="checkbox"
                checked={hasSpoiler}
                onChange={(e) => setHasSpoiler(e.target.checked)}
                className="rounded border-[#2a2a2c] bg-[#131315] text-[#e50914] focus:ring-[#e50914]"
              />
              <span>Review contains plot spoilers</span>
            </label>
          </div>

          {/* Modal Actions */}
          <div className="flex items-center justify-end gap-3 pt-3 border-t border-[#2a2a2c]">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-[#c5c5d5] hover:text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#e50914] hover:bg-[#c0000c] text-white text-xs font-semibold rounded-lg transition-all shadow-[0_0_20px_rgba(229,9,20,0.35)] active:scale-95 flex items-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">save</span>
              <span>Publish to Film Diary</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
