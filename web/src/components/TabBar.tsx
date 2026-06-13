"use client";

import type { ComponentType } from "react";
import { BoardIcon, BookIcon, CalendarIcon, GearIcon } from "./icons";

export type TabKey = "board" | "journal" | "calendar" | "settings";
type Tone = "red" | "blue" | "cream" | "brown";

type TabDef = {
  key: TabKey;
  label: string;
  tone: Tone;
  Icon: ComponentType<{ size?: number; className?: string }>;
};

/** 저널서클의 좌측 세로 책갈피를 가로로 펼친 상단 탭 */
const TABS: TabDef[] = [
  { key: "board", label: "보드", tone: "red", Icon: BoardIcon },
  { key: "journal", label: "일기", tone: "blue", Icon: BookIcon },
  { key: "calendar", label: "일정", tone: "cream", Icon: CalendarIcon },
  { key: "settings", label: "설정", tone: "brown", Icon: GearIcon },
];

const activeTab: Record<Tone, string> = {
  red: "bg-red-soft text-red",
  blue: "bg-blue-soft text-blue",
  cream: "bg-cream-soft text-brown",
  brown: "bg-brown-soft text-brown",
};

export function TabBar({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (key: TabKey) => void;
}) {
  return (
    <div className="flex items-end gap-1.5 border-b border-line">
      {TABS.map(({ key, label, tone, Icon }) => {
        const isActive = key === active;
        return (
          <button
            key={key}
            onClick={() => onChange(key)}
            aria-pressed={isActive}
            className={`flex items-center gap-1.5 rounded-t-xl px-4 py-2.5 text-sm font-semibold transition-all
              ${
                isActive
                  ? `${activeTab[tone]} -mb-px border-x border-t border-line`
                  : "text-muted hover:bg-cream-soft/60 hover:text-ink"
              }`}
          >
            <Icon size={17} />
            {label}
          </button>
        );
      })}
    </div>
  );
}
