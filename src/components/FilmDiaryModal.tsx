import React, { useState } from 'react';
import { UserDiaryEntry, UserProfile } from '../types/cinema';

interface FilmDiaryModalProps {
  user: UserProfile;
  diaryEntries: UserDiaryEntry[];
  onClose: () => void;
  onOpenRateModal: () => void;
}

export const FilmDiaryModal: React.FC<FilmDiaryModalProps> = ({
  user,
  diaryEntries,
  onClose,
  onOpenRateModal,
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string>('all');

  const filteredEntries = diaryEntries.filter((entry) => {
    const matchesSearch =
      entry.movieTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (entry.review && entry.review.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesTag =
      selectedTag === 'all' || (entry.tags && entry.tags.includes(selectedTag));

    return matchesSearch && matchesTag;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#1c1b1d] border border-[#353437] rounded-2xl max-w-3xl w-full p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative my-8 text-left max-h-[85vh] flex flex-col">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-[#c5c5d5] hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>

        {/* Modal Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-[#2a2a2c] mb-4">
          <div className="flex items-center gap-3">
            <img
              src={user.avatar}
              alt={user.name}
              className="w-12 h-12 rounded-full object-cover ring-2 ring-[#ffb95f]"
            />
            <div>
              <h3 className="font-serif text-xl font-bold text-white flex items-center gap-2">
                <span>{user.name}’s Film Diary</span>
                <span className="text-[10px] bg-[#e50914]/25 text-[#ffb4aa] px-2 py-0.5 rounded font-semibold uppercase">
                  {user.tier}
                </span>
              </h3>
              <p className="text-xs text-[#c5c5d5]">
                {diaryEntries.length} logged titles · {user.avgScore.toFixed(1)} avg score given
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              onClose();
              onOpenRateModal();
            }}
            className="px-3.5 py-1.5 bg-[#e50914] text-white hover:bg-[#c0000c] text-xs font-semibold rounded-lg transition-all flex items-center gap-1 shadow-sm self-start sm:self-auto"
          >
            <span className="material-symbols-outlined text-[16px]">add</span>
            <span>Log Another Film</span>
          </button>
        </div>

        {/* Filter & Search Bar */}
        <div className="flex flex-col sm:flex-row items-center gap-3 mb-4">
          <div className="relative flex-1 w-full">
            <span className="material-symbols-outlined absolute left-3 top-2 text-[18px] text-[#70717f]">
              search
            </span>
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search your logged diary & reviews..."
              className="w-full bg-[#131315] text-[#e5e1e4] text-xs pl-9 pr-3 py-2 rounded-lg border border-[#2a2a2c] focus:border-[#e50914] focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto no-scrollbar py-1">
            {['all', 'Masterpiece', 'Cinematography', 'Sound Design', '70mm IMAX'].map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setSelectedTag(tag)}
                className={`text-[11px] px-2.5 py-1 rounded-full whitespace-nowrap transition-colors ${
                  selectedTag === tag
                    ? 'bg-[#ffb4aa] text-[#131315] font-semibold'
                    : 'bg-[#131315] text-[#c5c5d5] hover:text-white border border-[#2a2a2c]'
                }`}
              >
                {tag === 'all' ? 'All Entries' : tag}
              </button>
            ))}
          </div>
        </div>

        {/* Entries List */}
        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {filteredEntries.length === 0 ? (
            <div className="py-12 text-center text-[#c5c5d5]">
              <span className="material-symbols-outlined text-4xl text-[#70717f] mb-1">
                history_edu
              </span>
              <p className="text-sm font-semibold text-white">No diary entries found</p>
              <p className="text-xs text-[#70717f] mt-1">Try logging a film or adjusting your search.</p>
            </div>
          ) : (
            filteredEntries.map((entry) => (
              <div
                key={entry.id}
                className="p-3.5 bg-[#131315] rounded-xl border border-[#2a2a2c] hover:border-[#353437] transition-all flex items-start gap-3.5"
              >
                <img
                  src={entry.posterUrl}
                  alt={entry.movieTitle}
                  className="w-14 h-20 rounded object-cover ring-1 ring-white/10 shrink-0"
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <h4 className="font-serif text-sm font-bold text-white truncate">
                      {entry.movieTitle}{' '}
                      <span className="text-[#70717f] font-normal">({entry.movieYear})</span>
                    </h4>

                    <div className="flex items-center gap-1 bg-[#201f21] px-2 py-0.5 rounded text-[#ffb95f] font-bold text-xs shrink-0">
                      <span
                        className="material-symbols-outlined text-[14px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        star
                      </span>
                      <span>{entry.score.toFixed(1)}/10</span>
                    </div>
                  </div>

                  <div className="text-[11px] text-[#70717f] mt-0.5">Logged on {entry.loggedDate}</div>

                  {entry.review && (
                    <p className="text-xs text-[#e9bcb6] mt-2 line-clamp-2 leading-relaxed bg-[#1c1b1d]/70 p-2 rounded border border-white/5 italic">
                      "{entry.review}"
                    </p>
                  )}

                  {entry.tags && entry.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-2">
                      {entry.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[10px] px-2 py-0.5 rounded bg-[#201f21] text-[#c5c5d5]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
