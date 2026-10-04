import React from 'react';

interface EditorialModalProps {
  onClose: () => void;
}

export const EditorialModal: React.FC<EditorialModalProps> = ({ onClose }) => {
  const neoNoirFilms = [
    {
      title: 'Chinatown',
      year: 1974,
      director: 'Roman Polanski',
      lead: 'Jack Nicholson, Faye Dunaway',
      rating: 9.3,
      blurb: 'The zenith of modern American noir. A Los Angeles detective is drawn into a labyrinth of municipal corruption and personal decay.',
    },
    {
      title: 'Blade Runner 2049',
      year: 2017,
      director: 'Denis Villeneuve',
      lead: 'Ryan Gosling, Harrison Ford',
      rating: 9.1,
      blurb: 'Roger Deakins’ rain-soaked, amber-tinted sci-fi noir that expands upon existential questions of human essence.',
    },
    {
      title: 'Memories of Murder',
      year: 2003,
      director: 'Bong Joon-ho',
      lead: 'Song Kang-ho, Kim Sang-kyung',
      rating: 9.2,
      blurb: 'Bong Joon-ho dissects police desperation and societal apathy in 1980s rural Korea with devastating clinical precision.',
    },
    {
      title: 'Drive',
      year: 2011,
      director: 'Nicolas Winding Refn',
      lead: 'Ryan Gosling, Carey Mulligan',
      rating: 8.8,
      blurb: 'Hyper-stylized synthwave neo-noir set against nocturnal Los Angeles freeways and unforgiving criminal violence.',
    },
    {
      title: 'Nightcrawler',
      year: 2014,
      director: 'Dan Gilroy',
      lead: 'Jake Gyllenhaal, Rene Russo',
      rating: 8.9,
      blurb: 'A predatory freelance videographer prowls the nocturnal crime scenes of Los Angeles, turning human misery into local ratings.',
    },
    {
      title: 'Taxi Driver',
      year: 1976,
      director: 'Martin Scorsese',
      lead: 'Robert De Niro, Jodie Foster',
      rating: 9.4,
      blurb: 'Scorsese and Schrader’s fever dream of an alienated, insomnia-ridden NYC veteran descending into vigilante retribution.',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-[#1c1b1d] border border-[#353437] rounded-2xl max-w-2xl w-full p-6 sm:p-7 shadow-[0_20px_60px_rgba(0,0,0,0.85)] relative my-8 text-left max-h-[85vh] flex flex-col">
        <button
          type="button"
          onClick={onClose}
          className="absolute top-5 right-5 text-[#c5c5d5] hover:text-white transition-colors"
        >
          <span className="material-symbols-outlined text-[22px]">close</span>
        </button>

        <div className="pb-4 border-b border-[#2a2a2c] mb-4">
          <span className="text-[10px] font-semibold text-[#ffb95f] uppercase tracking-wider bg-[#ffb95f]/15 px-2.5 py-0.5 rounded-full inline-block mb-1.5">
            Curated by CineRate Editorial
          </span>
          <h3 className="font-serif text-2xl font-bold text-white">
            The 24 Greatest Neo-Noir Masterpieces of All Time
          </h3>
          <p className="text-xs text-[#c5c5d5] mt-1">
            A definitive deep-dive into existential despair, moral ambiguity, and rain-slicked cynicism.
          </p>
        </div>

        <div className="flex-1 overflow-y-auto space-y-3 pr-1">
          {neoNoirFilms.map((film, idx) => (
            <div
              key={film.title}
              className="p-3.5 bg-[#131315] rounded-xl border border-[#2a2a2c] hover:border-[#353437] transition-all"
            >
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-sm font-bold text-[#ffb4aa] w-5">
                    {idx + 1}.
                  </span>
                  <h4 className="font-serif text-sm font-bold text-white">
                    {film.title} <span className="text-[#70717f] font-normal">({film.year})</span>
                  </h4>
                </div>
                <div className="flex items-center gap-1 bg-[#201f21] px-2 py-0.5 rounded text-[#ffb95f] font-bold text-xs">
                  <span
                    className="material-symbols-outlined text-[13px]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    star
                  </span>
                  <span>{film.rating}</span>
                </div>
              </div>

              <div className="text-[11px] text-[#c5c5d5] mt-1">
                Dir. {film.director} • Starring {film.lead}
              </div>

              <p className="text-xs text-[#e9bcb6] mt-2 leading-relaxed bg-[#1c1b1d]/60 p-2 rounded">
                {film.blurb}
              </p>
            </div>
          ))}
        </div>

        <div className="pt-4 border-t border-[#2a2a2c] flex justify-between items-center text-xs text-[#c5c5d5]">
          <span>Saved to 18,420 cinephile lists</span>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-[#e50914] text-white hover:bg-[#c0000c] rounded-lg font-semibold transition-colors"
          >
            Close Collection
          </button>
        </div>
      </div>
    </div>
  );
};
