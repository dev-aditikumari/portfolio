import { profile } from "@/data/profile";

type BandProps = {
  words: string[];
  className: string;
  animation: string;
};

function Band({ words, className, animation }: BandProps) {
  const row = [...words, ...words, ...words, ...words];
  return (
    <div aria-hidden="true" className={`overflow-hidden py-2 ${className}`}>
      <div className={`flex w-max whitespace-nowrap ${animation}`}>
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0">
            {row.map((word, i) => (
              <li
                key={`${word}-${i}`}
                className="mx-3 rounded border border-white/80 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-white sm:text-sm"
              >
                {word}
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function Marquee() {
  return (
    <div className="relative my-10 overflow-hidden py-10">
      <Band words={profile.marqueeTop} className="-rotate-2 bg-royal" animation="animate-slide" />
      <div className="-mt-3">
        <Band words={profile.marqueeBottom} className="rotate-2 bg-brand" animation="animate-slideBack" />
      </div>
    </div>
  );
}
