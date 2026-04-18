"use client";

export default function Logo({ size = "md" }: { size?: "sm" | "md" | "lg" }) {
  const s = size === "sm" ? 32 : size === "lg" ? 56 : 40;
  const fs = size === "sm" ? "text-sm" : size === "lg" ? "text-xl" : "text-base";
  const sub = size === "sm" ? "text-[8px]" : size === "lg" ? "text-xs" : "text-[10px]";

  return (
    <div className="flex items-center gap-2">
      <svg width={s} height={s} viewBox="0 0 60 60">
        <defs>
          <linearGradient id="logoBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F4A7BB" />
            <stop offset="100%" stopColor="#A7D1F4" />
          </linearGradient>
        </defs>
        <circle cx="30" cy="30" r="28" fill="url(#logoBg)" opacity="0.2" />
        <circle cx="30" cy="30" r="22" fill="url(#logoBg)" opacity="0.4" />
        <text x="30" y="36" textAnchor="middle" fontSize="24">👶</text>
        <path d="M15 18 Q30 4 45 18" fill="none" stroke="#C4B1D4" strokeWidth="2" strokeLinecap="round" />
        <circle cx="18" cy="12" r="2" fill="#F4D7A7" />
        <circle cx="42" cy="12" r="2" fill="#A7F4D1" />
        <circle cx="30" cy="8" r="1.5" fill="#A7D1F4" />
      </svg>
      <div>
        <div className={`font-display font-bold ${fs} text-rose-dark leading-none tracking-tight`}>
          Ti Bijou
        </div>
        <div className={`font-display font-medium ${sub} text-bleu-ciel tracking-[3px] leading-none`}>
          HAÏTI
        </div>
      </div>
    </div>
  );
}
