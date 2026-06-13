type ProgressRingProps = {
  /** 0~100 */
  value: number;
  size?: number;
  stroke?: number;
  className?: string;
};

/** 달성률 링 게이지 */
export function ProgressRing({
  value,
  size = 56,
  stroke = 6,
  className,
}: ProgressRingProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const r = (size - stroke) / 2;
  const circumference = 2 * Math.PI * r;
  const offset = circumference - (clamped / 100) * circumference;

  return (
    <div
      className={`relative inline-grid place-items-center ${className ?? ""}`}
      style={{ width: size, height: size }}
    >
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-line)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke="var(--color-blue)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
      </svg>
      <span className="absolute text-xs font-semibold text-ink">
        {Math.round(clamped)}
      </span>
    </div>
  );
}
