import React from 'react';

interface FilterBarProps {
  activeCategory: string;
  setActiveCategory: (cat: string) => void;
  selectedGenre: string;
  setSelectedGenre: (genre: string) => void;
  selectedScore: string;
  setSelectedScore: (score: string) => void;
  selectedYear: string;
  setSelectedYear: (year: string) => void;
  viewLayout: 'grid' | 'list';
  setViewLayout: (layout: 'grid' | 'list') => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  activeCategory,
  setActiveCategory,
  selectedGenre,
  setSelectedGenre,
  selectedScore,
  setSelectedScore,
  selectedYear,
  setSelectedYear,
  viewLayout,
  setViewLayout,
}) => {
  const categories = [
    { id: 'trending', label: 'Trending Now' },
    { id: 'in-theaters', label: 'In Theaters' },
    { id: 'top-rated', label: 'Top Rated All-Time' },
    { id: 'most-discussed', label: 'Most Discussed' },
    { id: 'indie-gems', label: 'Indie & Festival Gems' },
    { id: 'nominees-2024', label: '2024 Award Nominees' },
  ];

  return (
    <section className="w-full bg-[#0e0e10] sticky top-20 z-30 border-y border-[#201f21] shadow-md">
      <div className="max-w-[1440px] mx-auto px-4 md:px-12 py-3 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Primary Category Pills */}
        <div className="flex items-center gap-1 overflow-x-auto w-full md:w-auto no-scrollbar py-1">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => setActiveCategory(cat.id)}
              className={`whitespace-nowrap px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                activeCategory === cat.id
                  ? 'bg-[#e50914] text-white shadow-[0_0_12px_rgba(229,9,20,0.35)]'
                  : 'text-[#e9bcb6] hover:text-white hover:bg-[#201f21]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Filters & Layout View Toggles */}
        <div className="flex items-center justify-between md:justify-end gap-2.5 w-full md:w-auto">
          {/* Genre Dropdown */}
          <div className="relative">
            <select
              value={selectedGenre}
              onChange={(e) => setSelectedGenre(e.target.value)}
              className="appearance-none bg-[#201f21] text-[#e5e1e4] text-xs pl-3 pr-8 py-1.5 rounded-lg border border-[#2a2a2c] outline-none cursor-pointer hover:bg-[#2a2a2c] transition-colors"
            >
              <option value="all">Genre: All</option>
              <option value="Sci-Fi">Sci-Fi</option>
              <option value="Drama">Drama</option>
              <option value="Crime">Crime</option>
              <option value="Thriller">Thriller</option>
              <option value="Animation">Animation</option>
              <option value="Romance">Romance</option>
              <option value="Historical Drama">Historical Drama</option>
            </select>
            <span className="material-symbols-outlined text-[16px] text-[#e9bcb6] absolute right-2 top-2 pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Score Dropdown */}
          <div className="relative">
            <select
              value={selectedScore}
              onChange={(e) => setSelectedScore(e.target.value)}
              className="appearance-none bg-[#201f21] text-[#e5e1e4] text-xs pl-3 pr-8 py-1.5 rounded-lg border border-[#2a2a2c] outline-none cursor-pointer hover:bg-[#2a2a2c] transition-colors"
            >
              <option value="all">Score: Any Score</option>
              <option value="8.0">Score: 8.0+ Min</option>
              <option value="9.0">Score: 9.0+ Masterpieces</option>
              <option value="7.0">Score: 7.0+ Recommended</option>
            </select>
            <span className="material-symbols-outlined text-[16px] text-[#e9bcb6] absolute right-2 top-2 pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Year Dropdown */}
          <div className="relative hidden sm:block">
            <select
              value={selectedYear}
              onChange={(e) => setSelectedYear(e.target.value)}
              className="appearance-none bg-[#201f21] text-[#e5e1e4] text-xs pl-3 pr-8 py-1.5 rounded-lg border border-[#2a2a2c] outline-none cursor-pointer hover:bg-[#2a2a2c] transition-colors"
            >
              <option value="all">Year: 2023 - 2024</option>
              <option value="2024">2024 Releases</option>
              <option value="2023">2023 Releases</option>
              <option value="classic">Classic Era</option>
            </select>
            <span className="material-symbols-outlined text-[16px] text-[#e9bcb6] absolute right-2 top-2 pointer-events-none">
              expand_more
            </span>
          </div>

          {/* Grid / List Display Switcher */}
          <div className="flex items-center bg-[#201f21] p-0.5 rounded-lg border border-[#2a2a2c]">
            <button
              type="button"
              aria-label="Grid layout view"
              onClick={() => setViewLayout('grid')}
              className={`p-1 rounded transition-colors ${
                viewLayout === 'grid'
                  ? 'text-[#e50914] bg-[#353437]'
                  : 'text-[#e9bcb6] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">grid_view</span>
            </button>
            <button
              type="button"
              aria-label="List layout view"
              onClick={() => setViewLayout('list')}
              className={`p-1 rounded transition-colors ${
                viewLayout === 'list'
                  ? 'text-[#e50914] bg-[#353437]'
                  : 'text-[#e9bcb6] hover:text-white'
              }`}
            >
              <span className="material-symbols-outlined text-[18px]">view_agenda</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
