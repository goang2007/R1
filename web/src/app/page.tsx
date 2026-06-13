"use client";

import { useState } from "react";
import { YearSpine } from "@/components/YearSpine";
import {
  ProjectCard,
  type Project,
  type ProjectEntry,
} from "@/components/ProjectCard";
import { ProjectDetail } from "@/components/ProjectDetail";
import { TabBar, type TabKey } from "@/components/TabBar";
import { CalendarIcon, PlusIcon } from "@/components/icons";

type SpineTone = "cream" | "blue" | "red" | "brown";

const YEARS: { year: number; tone: SpineTone }[] = [
  { year: 2024, tone: "cream" },
  { year: 2025, tone: "blue" },
  { year: 2026, tone: "red" },
];

const SAMPLE: Record<number, Project[]> = {
  2024: [
    {
      id: "a",
      emoji: "📚",
      title: "책 12권 읽기",
      category: "독서",
      tone: "brown",
      doneItems: 12,
      totalItems: 12,
    },
  ],
  2025: [
    {
      id: "b",
      emoji: "🏃",
      title: "하프 마라톤 완주",
      category: "운동",
      tone: "blue",
      doneItems: 6,
      totalItems: 8,
    },
    {
      id: "c",
      emoji: "✈️",
      title: "혼자 여행 3번",
      category: "여행",
      tone: "cream",
      doneItems: 2,
      totalItems: 3,
    },
  ],
  2026: [
    {
      id: "d",
      emoji: "🎨",
      title: "디자인 포트폴리오",
      category: "사이드",
      tone: "red",
      doneItems: 3,
      totalItems: 10,
      description: "올해 안에 포트폴리오 사이트 완성하기. 매주 한 섹션씩.",
      entries: [
        { id: "d1", date: "2026-03-12", text: "메인 와이어프레임 완성" },
        { id: "d2", date: "2026-05-02", text: "프로젝트 카드 3개 정리" },
      ],
    },
    {
      id: "e",
      emoji: "🇯🇵",
      title: "일본어 N3",
      category: "공부",
      tone: "blue",
      doneItems: 4,
      totalItems: 6,
    },
    {
      id: "f",
      emoji: "🌱",
      title: "매일 일기 쓰기",
      category: "습관",
      tone: "cream",
      doneItems: 120,
      totalItems: 365,
    },
  ],
};

function overallProgress(projects: Project[]) {
  if (projects.length === 0) return 0;
  const sum = projects.reduce(
    (acc, p) =>
      acc + (p.totalItems === 0 ? 0 : (p.doneItems / p.totalItems) * 100),
    0,
  );
  return Math.round(sum / projects.length);
}

function Placeholder({ label }: { label: string }) {
  return (
    <div className="grid place-items-center rounded-2xl border border-dashed border-line py-24 text-center">
      <div>
        <p className="text-lg font-semibold text-ink">{label}</p>
        <p className="mt-1 text-sm text-muted">곧 만들어질 화면이에요.</p>
      </div>
    </div>
  );
}

export default function Home() {
  const [selectedYear, setSelectedYear] = useState(2026);
  const [tab, setTab] = useState<TabKey>("board");
  const [data, setData] = useState<Record<number, Project[]>>(SAMPLE);
  const [openId, setOpenId] = useState<string | null>(null);

  const projects = data[selectedYear] ?? [];
  const overall = overallProgress(projects);
  const openProject = projects.find((p) => p.id === openId) ?? null;
  const today = "2026-06-12";

  function addEntry(projectId: string, entry: ProjectEntry) {
    setData((prev) => ({
      ...prev,
      [selectedYear]: (prev[selectedYear] ?? []).map((p) =>
        p.id === projectId
          ? { ...p, entries: [...(p.entries ?? []), entry] }
          : p,
      ),
    }));
  }

  return (
    <div className="flex min-h-screen">
      {/* 왼쪽 연도 책장 */}
      <nav className="flex flex-col gap-2 py-8 pr-2">
        {YEARS.map((y) => (
          <YearSpine
            key={y.year}
            year={y.year}
            tone={y.tone}
            active={y.year === selectedYear}
            onClick={() => setSelectedYear(y.year)}
          />
        ))}
      </nav>

      {/* 메인 영역 */}
      <main className="flex-1 px-6 py-7 sm:px-10">
        {/* 브랜드 + 상단 책갈피 탭 */}
        <div className="mb-6">
          <div className="mb-3 flex items-center justify-between">
            <span className="text-2xl font-extrabold tracking-tight text-red">
              pillyo
            </span>
            <button className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm font-medium text-muted transition-colors hover:border-blue hover:text-blue">
              <CalendarIcon size={16} />
              일정
            </button>
          </div>
          <TabBar active={tab} onChange={setTab} />
        </div>

        {tab === "board" && (
          <>
            <header className="mb-8 flex items-end justify-between">
              <div>
                <p className="text-sm text-muted">{selectedYear}년</p>
                <h1 className="mt-1 text-3xl font-bold tracking-tight text-ink">
                  올해의 나
                </h1>
              </div>
              <div className="text-right">
                <p className="text-sm text-muted">전체 달성</p>
                <p className="text-3xl font-bold text-red">{overall}%</p>
              </div>
            </header>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard
                  key={p.id}
                  project={p}
                  onClick={() => setOpenId(p.id)}
                />
              ))}

              {/* 추가 버튼 */}
              <button className="flex min-h-32 flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-line text-muted transition-colors hover:border-red hover:text-red">
                <PlusIcon size={24} />
                <span className="text-sm font-medium">프로젝트 추가</span>
              </button>
            </div>
          </>
        )}

        {tab === "journal" && <Placeholder label="일기" />}
        {tab === "calendar" && <Placeholder label="일정 / 캘린더" />}
        {tab === "settings" && <Placeholder label="설정" />}
      </main>

      {openProject && (
        <ProjectDetail
          project={openProject}
          defaultDate={today}
          onClose={() => setOpenId(null)}
          onAddEntry={(entry) => addEntry(openProject.id, entry)}
        />
      )}
    </div>
  );
}
