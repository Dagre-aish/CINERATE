import React, { useState } from 'react';
import { UserProfile } from '../types/cinema';

interface NavigationProps {
  currentUser: UserProfile;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenRateModal: () => void;
  onOpenSearch: () => void;
  onOpenDiary: () => void;
  onSignOut: () => void;
  watchlistCount: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  currentUser,
  activeTab,
  setActiveTab,
  onOpenRateModal,
  onOpenSearch,
  onOpenDiary,
  onSignOut,
  watchlistCount,
}) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const notifications = [
    {
      id: 'notif-1',
      title: 'Elena Rostova liked your review',
      time: '2h ago',
      desc: 'On Oppenheimer: "Masterclass in subjective biographical structure."',
      icon: 'favorite',
      iconColor: 'text-[#e50914]',
    },
    {
      id: 'notif-2',
      title: 'Dune: Part Two crosses $700M worldwide',
      time: '5h ago',
      desc: 'New box office milestone reached this weekend.',
      icon: 'trending_up',
      iconColor: 'text-[#ffb95f]',
    },
    {
      id: 'notif-3',
      title: 'New discussion in Community',
      time: '1d ago',
      desc: 'Is 2023 the greatest cinema year since 2007?',
      icon: 'forum',
      iconColor: 'text-[#ffb4aa]',
    },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-40 bg-[#0e0e10]/85 backdrop-blur-xl border-b border-[#201f21] shadow-[0_1px_8px_rgba(0,0,0,0.5)]">
      <div className="h-20 max-w-[1440px] mx-auto px-4 md:px-12 flex items-center justify-between gap-6">
        {/* Brand & Nav Links */}
        <div className="flex items-center gap-6">
          <button
            type="button"
            onClick={() => setActiveTab('discover')}
            className="flex items-center gap-2 group text-left"
          >
            <img
              alt="CineRate Brand Logo"
              className="h-8 w-auto object-contain"
              src="https://lh3.googleusercontent.com/aida/AEtjO1UxqscHtMbnDNW0xOAx_V0AK-MYhX9un2zsw55_djRRZJUg4nqTf0x3ZBl209HFGasC5Gi8QckcDJsVmnTlomxxe-IBxhn_MhXRajHB2FSlMjMqKjZcJkCjCqms7fvzoUrr_L9ud-usQBhy1HK4zLtATyDHflVWudkUdihYuulHLWRFoT-3IY1ZlpB_Y8bDsYRAushTOZ0eKnXR9RWe-52ut7_d5mToVq1-j5wGZBWDU0wQTQPrOgyhwBwb"
            />
            <span className="font-serif text-xl font-bold tracking-tight text-[#e5e1e4] group-hover:text-[#ffb4aa] transition-colors">
              Cine<span className="text-[#e50914]">Rate</span>
            </span>
          </button>

          <nav className="hidden xl:flex items-center gap-3">
            {[
              { id: 'discover', label: 'Discover' },
              { id: 'top-rated', label: 'Top Rated' },
              { id: 'in-theaters', label: 'In Theaters' },
              { id: 'watchlist', label: `Watchlist ${watchlistCount > 0 ? `(${watchlistCount})` : ''}` },
              { id: 'awards-and-lists', label: 'Awards & Lists' },
              { id: 'community', label: 'Community' },
            ].map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setActiveTab(item.id)}
                className={`text-xs font-semibold px-2.5 py-1.5 rounded-lg transition-all ${
                  activeTab === item.id
                    ? 'bg-[#2a2a2c] text-[#e5e1e4]'
                    : 'text-[#e9bcb6]/80 hover:text-[#e5e1e4] hover:bg-[#201f21]'
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Global Search Bar (Trigger Cmd+K) */}
        <div className="flex-1 max-w-md hidden lg:block">
          <button
            type="button"
            onClick={onOpenSearch}
            className="relative flex items-center w-full bg-[#1c1b1d] hover:bg-[#201f21] text-[#e5e1e4] text-xs pl-10 pr-20 py-2 rounded-lg border border-[#2a2a2c] transition-all cursor-pointer text-left"
          >
            <span className="material-symbols-outlined absolute left-2.5 text-[#e9bcb6]/60 text-[20px]">
              search
            </span>
            <span className="text-[#e9bcb6]/60">Search movies, directors, actors...</span>
            <div className="absolute right-2.5 flex items-center gap-1 pointer-events-none">
              <kbd className="text-[11px] bg-[#2a2a2c] text-[#e9bcb6] px-1.5 py-0.5 rounded font-mono">
                Cmd
              </kbd>
              <kbd className="text-[11px] bg-[#2a2a2c] text-[#e9bcb6] px-1.5 py-0.5 rounded font-mono">
                K
              </kbd>
            </div>
          </button>
        </div>

        {/* Action Controls & User Menu */}
        <div className="flex items-center gap-3 md:gap-4">
          <button
            type="button"
            onClick={onOpenRateModal}
            className="inline-flex items-center gap-1.5 bg-[#e50914] text-white hover:bg-[#c0000c] transition-all text-xs font-semibold px-3.5 py-2 rounded shadow-[0_0_24px_rgba(229,9,20,0.35)] active:scale-95"
          >
            <span className="material-symbols-outlined text-[18px]">add</span>
            <span>Rate Movie</span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowNotifications(!showNotifications);
                setShowProfileMenu(false);
              }}
              aria-label="Notifications"
              className="relative p-2 rounded-lg text-[#e9bcb6] hover:text-[#e5e1e4] hover:bg-[#2a2a2c] transition-colors"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#e50914] ring-2 ring-[#0e0e10]" />
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-[#1c1b1d] border border-[#353437] rounded-xl shadow-2xl p-3 z-50 text-left">
                <div className="flex items-center justify-between pb-2 border-b border-[#2a2a2c] mb-2">
                  <span className="text-xs font-bold text-white uppercase tracking-wider">
                    Notifications
                  </span>
                  <span className="text-[10px] text-[#ffb4aa] cursor-pointer hover:underline">
                    Mark all read
                  </span>
                </div>
                <div className="space-y-2">
                  {notifications.map((n) => (
                    <div
                      key={n.id}
                      className="p-2 rounded-lg bg-[#131315] hover:bg-[#201f21] transition-colors cursor-pointer"
                    >
                      <div className="flex items-start gap-2">
                        <span
                          className={`material-symbols-outlined text-[18px] mt-0.5 ${n.iconColor}`}
                        >
                          {n.icon}
                        </span>
                        <div className="flex-1 min-w-0">
                          <div className="text-xs font-semibold text-[#e5e1e4] leading-tight">
                            {n.title}
                          </div>
                          <div className="text-[11px] text-[#c5c5d5] line-clamp-1 mt-0.5">
                            {n.desc}
                          </div>
                          <div className="text-[10px] text-[#70717f] mt-1">{n.time}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="relative">
            <button
              type="button"
              onClick={() => {
                setShowProfileMenu(!showProfileMenu);
                setShowNotifications(false);
              }}
              className="flex items-center gap-1.5 pl-1 cursor-pointer group"
            >
              <div className="relative">
                <img
                  alt="Profile"
                  className="w-8 h-8 rounded-full object-cover ring-1 ring-[#5e3f3b]"
                  src={currentUser.avatar}
                />
                <span className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-[#ffb95f] ring-1 ring-[#0e0e10]" />
              </div>
              <span className="material-symbols-outlined text-[#e9bcb6] group-hover:text-white text-[18px] transition-colors">
                expand_more
              </span>
            </button>

            {showProfileMenu && (
              <div className="absolute right-0 mt-2 w-64 bg-[#1c1b1d] border border-[#353437] rounded-xl shadow-2xl p-2 z-50 text-left">
                <div className="p-2 border-b border-[#2a2a2c] mb-1">
                  <div className="text-xs font-bold text-white">{currentUser.name}</div>
                  <div className="text-[11px] text-[#c5c5d5] flex items-center justify-between">
                    <span>{currentUser.handle}</span>
                    <span className="text-[10px] font-semibold text-[#ffb95f]">
                      {currentUser.tier}
                    </span>
                  </div>
                </div>

                <div className="space-y-0.5">
                  <button
                    type="button"
                    onClick={() => {
                      onOpenDiary();
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-2.5 py-1.5 text-xs text-[#e5e1e4] hover:bg-[#2a2a2c] rounded-lg transition-colors flex items-center gap-2 text-left"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#ffb95f]">
                      calendar_month
                    </span>
                    <span>Film Diary & Ratings ({currentUser.filmsLogged})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('watchlist');
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-2.5 py-1.5 text-xs text-[#e5e1e4] hover:bg-[#2a2a2c] rounded-lg transition-colors flex items-center gap-2 text-left"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#ffb4aa]">
                      bookmark
                    </span>
                    <span>Watchlist ({watchlistCount})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('community');
                      setShowProfileMenu(false);
                    }}
                    className="w-full px-2.5 py-1.5 text-xs text-[#e5e1e4] hover:bg-[#2a2a2c] rounded-lg transition-colors flex items-center gap-2 text-left"
                  >
                    <span className="material-symbols-outlined text-[16px] text-[#c5c5d5]">
                      rate_review
                    </span>
                    <span>My Written Reviews ({currentUser.reviewsCount})</span>
                  </button>

                  <div className="border-t border-[#2a2a2c] my-1" />

                  <button
                    type="button"
                    onClick={() => {
                      setShowProfileMenu(false);
                      onSignOut();
                    }}
                    className="w-full px-2.5 py-1.5 text-xs text-[#ffb4ab] hover:bg-[#93000a]/20 rounded-lg transition-colors flex items-center gap-2 text-left"
                  >
                    <span className="material-symbols-outlined text-[16px]">logout</span>
                    <span>Sign Out to Sign In Screen</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
