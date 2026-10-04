import React from 'react';
import { UserProfile } from '../types/cinema';

interface UserStatsBannerProps {
  user: UserProfile;
  onOpenDiary: () => void;
}

export const UserStatsBanner: React.FC<UserStatsBannerProps> = ({ user, onOpenDiary }) => {
  return (
    <section className="w-full max-w-[1440px] mx-auto px-4 md:px-12 pb-12">
      <div className="relative overflow-hidden rounded-2xl bg-[#2a2a2c]/80 p-6 md:p-8 shadow-xl backdrop-blur-xl border border-white/5">
        {/* Ambient Glow Behind Stats */}
        <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-[#e50914]/15 blur-[100px] pointer-events-none" />
        <div className="absolute -left-20 -top-20 w-80 h-80 rounded-full bg-[#ffb95f]/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-6">
          {/* Welcome Greeting & Micro Avatar Info */}
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative shrink-0">
              <img
                alt={user.name}
                className="w-16 h-16 rounded-full object-cover shadow-lg ring-2 ring-[#ffb95f]/40"
                src={user.avatar}
              />
              <span className="absolute bottom-0 right-0 w-4 h-4 rounded-full bg-[#ffb95f] ring-2 ring-[#2a2a2c] flex items-center justify-center text-[10px] text-[#2a1700] font-bold">
                ✓
              </span>
            </div>

            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-[#e5e1e4]">
                  Welcome back, {user.name.split(' ')[0]}
                </h3>
                <span className="px-2 py-0.5 rounded bg-[#e50914]/25 text-[#ffb4aa] text-[10px] font-semibold uppercase tracking-wider">
                  {user.tier}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#e9bcb6] mt-1">
                You have logged <span className="text-white font-semibold">{user.filmsLogged} films</span>{' '}
                and published <span className="text-white font-semibold">{user.reviewsCount} reviews</span>{' '}
                this calendar year.
              </p>
            </div>
          </div>

          {/* Compact Bento Metrics Strip */}
          <div className="grid grid-cols-3 gap-3 w-full lg:w-auto">
            <div className="bg-[#201f21] px-4 py-3 rounded-xl text-center border border-white/5">
              <span className="block font-serif text-xl text-[#ffb95f] font-bold">
                {user.avgScore.toFixed(1)}
              </span>
              <span className="text-[11px] text-[#c5c5d5]">Avg Score Given</span>
            </div>
            <div className="bg-[#201f21] px-4 py-3 rounded-xl text-center border border-white/5">
              <span className="block font-serif text-base text-white font-bold truncate">
                {user.topDirector}
              </span>
              <span className="text-[11px] text-[#c5c5d5]">Top Director</span>
            </div>
            <div className="bg-[#201f21] px-4 py-3 rounded-xl text-center border border-white/5">
              <span className="block font-serif text-base text-[#ffb4aa] font-bold truncate">
                {user.favoriteGenre}
              </span>
              <span className="text-[11px] text-[#c5c5d5]">Favorite Genre</span>
            </div>
          </div>

          {/* CTA Button */}
          <div className="w-full lg:w-auto flex justify-end">
            <button
              type="button"
              onClick={onOpenDiary}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-[#353437] text-white hover:bg-[#e50914] transition-all text-xs font-semibold shadow-md active:scale-95"
            >
              <span className="material-symbols-outlined text-[20px]">calendar_month</span>
              <span>View Your Film Diary &amp; Ratings</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
