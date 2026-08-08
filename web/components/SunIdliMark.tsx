export default function SunIdliMark({ className = "h-10 w-10" }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M50 30c-4 0-6-8-3-13"
        stroke="#E8A33D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M62 34c-2-5 2-11 8-12"
        stroke="#E8A33D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M38 34c2-5-2-11-8-12"
        stroke="#E8A33D"
        strokeWidth="3"
        strokeLinecap="round"
      />
      <path
        d="M50 32c-1-6 4-9 3-15"
        stroke="#8B3A2F"
        strokeWidth="2.5"
        strokeLinecap="round"
        opacity="0.7"
      />
      <ellipse cx="50" cy="58" rx="30" ry="22" fill="#F3E9D6" />
      <ellipse cx="50" cy="55" rx="30" ry="22" fill="#FFF8ED" />
      <ellipse cx="50" cy="55" rx="30" ry="22" stroke="#E8A33D" strokeWidth="1.5" opacity="0.4" />
      <line x1="8" y1="80" x2="92" y2="80" stroke="#E8A33D" strokeWidth="2" opacity="0.5" />
    </svg>
  );
}
