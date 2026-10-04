import React from 'react';

interface ScreenSwitcherProps {
  currentScreen: 'signin' | 'rating';
  onSwitchScreen: (screen: 'signin' | 'rating') => void;
}

export const ScreenSwitcher: React.FC<ScreenSwitcherProps> = ({ currentScreen, onSwitchScreen }) => {
  return (
    <aside aria-label="Prototype Navigation" className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 bg-[#1c1b1d]/90 backdrop-blur-xl border border-[#353437] px-3 py-1.5 rounded-full shadow-2xl flex items-center gap-1.5 transition-all">
      <div className="flex items-center gap-1 text-[11px] font-semibold text-[#c5c5d5] px-2 py-0.5 border-r border-[#353437]/70 mr-1">
        <span className="material-symbols-outlined text-[14px] text-[#e50914]">layers</span>
        <span className="hidden sm:inline">PROTOTYPE SCREENS:</span>
      </div>

      <button
        type="button"
        onClick={() => onSwitchScreen('signin')}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
          currentScreen === 'signin'
            ? 'bg-[#e50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.4)]'
            : 'text-[#e5e1e4] hover:text-white hover:bg-[#2a2a2c]'
        }`}
      >
        <span className="material-symbols-outlined text-[14px]">login</span>
        <span>1. Sign In (Scrolling BG)</span>
      </button>

      <button
        type="button"
        onClick={() => onSwitchScreen('rating')}
        className={`px-3 py-1 rounded-full text-xs font-medium transition-all flex items-center gap-1.5 ${
          currentScreen === 'rating'
            ? 'bg-[#e50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.4)]'
            : 'text-[#e5e1e4] hover:text-white hover:bg-[#2a2a2c]'
        }`}
      >
        <span className="material-symbols-outlined text-[14px]">star</span>
        <span>2. Movie Rating</span>
      </button>
    </aside>
  );
};
