/* 공용 라인 아이콘 — stroke 기반, currentColor 사용 */

type IconProps = {
  size?: number;
  className?: string;
};

function base(size: number, className?: string) {
  return {
    width: size,
    height: size,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className,
  };
}

/** 보드(대시보드) */
export function BoardIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size, className)} aria-hidden>
      <rect x="3" y="3" width="7" height="9" rx="1.5" />
      <rect x="14" y="3" width="7" height="5" rx="1.5" />
      <rect x="14" y="12" width="7" height="9" rx="1.5" />
      <rect x="3" y="16" width="7" height="5" rx="1.5" />
    </svg>
  );
}

/** 일기(저널) */
export function BookIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size, className)} aria-hidden>
      <path d="M4 4.5A2.5 2.5 0 0 1 6.5 2H20v17H6.5A2.5 2.5 0 0 0 4 21.5z" />
      <path d="M4 21.5A2.5 2.5 0 0 1 6.5 19H20" />
    </svg>
  );
}

/** 일정(캘린더) */
export function CalendarIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size, className)} aria-hidden>
      <rect x="3" y="4.5" width="18" height="16" rx="2.5" />
      <path d="M3 9h18M8 2.5v4M16 2.5v4" />
      <circle cx="8" cy="13.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="13.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="16" cy="13.5" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="8" cy="17" r="0.6" fill="currentColor" stroke="none" />
      <circle cx="12" cy="17" r="0.6" fill="currentColor" stroke="none" />
    </svg>
  );
}

/** 설정 */
export function GearIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size, className)} aria-hidden>
      <circle cx="12" cy="12" r="3" />
      <path d="M12 2.5v2.2M12 19.3v2.2M21.5 12h-2.2M4.7 12H2.5M18.7 5.3l-1.6 1.6M6.9 17.1l-1.6 1.6M18.7 18.7l-1.6-1.6M6.9 6.9 5.3 5.3" />
    </svg>
  );
}

/** 추가 */
export function PlusIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size, className)} aria-hidden>
      <path d="M12 5v14M5 12h14" />
    </svg>
  );
}

/** 닫기 */
export function CloseIcon({ size = 18, className }: IconProps) {
  return (
    <svg {...base(size, className)} aria-hidden>
      <path d="M6 6l12 12M18 6 6 18" />
    </svg>
  );
}
