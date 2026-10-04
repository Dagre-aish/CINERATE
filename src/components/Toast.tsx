import React from 'react';

interface ToastProps {
  message: string;
  type?: 'success' | 'info' | 'error';
  onClose: () => void;
}

export const Toast: React.FC<ToastProps> = ({ message, type = 'success', onClose }) => {
  return (
    <div className="fixed top-24 right-6 z-50 animate-bounce duration-300">
      <div className="bg-[#1c1b1d] border border-[#ffb4aa]/40 text-white px-4 py-3 rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.8)] flex items-center gap-3">
        <span className="material-symbols-outlined text-[20px] text-[#ffb95f]">
          {type === 'error' ? 'error' : 'check_circle'}
        </span>
        <span className="text-xs font-semibold text-[#e5e1e4]">{message}</span>
        <button
          type="button"
          onClick={onClose}
          className="text-[#70717f] hover:text-white ml-2 transition-colors"
        >
          <span className="material-symbols-outlined text-[16px]">close</span>
        </button>
      </div>
    </div>
  );
};
