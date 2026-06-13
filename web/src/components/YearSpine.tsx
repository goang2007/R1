"use client";

type SpineTone = "cream" | "blue" | "red" | "brown";

const activeBg: Record<SpineTone, string> = {
  cream: "bg-cream",
  blue: "bg-blue",
  red: "bg-red",
  brown: "bg-brown",
};

const activeText: Record<SpineTone, string> = {
  cream: "text-brown",
  blue: "text-paper",
  red: "text-paper",
  brown: "text-paper",
};

/** 왼쪽 책장의 연도 책등(spine) */
export function YearSpine({
  year,
  tone,
  active,
  onClick,
}: {
  year: number;
  tone: SpineTone;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`flex h-28 w-12 items-center justify-center rounded-r-xl border-y border-r border-line transition-all
        ${
          active
            ? `${activeBg[tone]} ${activeText[tone]} w-14 shadow-sm`
            : "bg-paper text-muted hover:bg-cream-soft"
        }`}
      aria-pressed={active}
    >
      <span className="text-sm font-semibold [writing-mode:vertical-rl]">
        {year}
      </span>
    </button>
  );
}
