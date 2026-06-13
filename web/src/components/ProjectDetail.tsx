"use client";

import { useState } from "react";
import { ProgressRing } from "./ProgressRing";
import { Tag } from "./Tag";
import { CalendarIcon, CloseIcon, PlusIcon } from "./icons";
import type { Project, ProjectEntry } from "./ProjectCard";

function formatDate(iso: string) {
  const [y, m, d] = iso.split("-");
  if (!y || !m || !d) return iso;
  return `${y}. ${Number(m)}. ${Number(d)}`;
}

/** 카드 상세보기 — 진행률 + 날짜별 기록 추가 */
export function ProjectDetail({
  project,
  defaultDate,
  onClose,
  onAddEntry,
}: {
  project: Project;
  defaultDate: string;
  onClose: () => void;
  onAddEntry: (entry: ProjectEntry) => void;
}) {
  const [date, setDate] = useState(defaultDate);
  const [text, setText] = useState("");

  const progress =
    project.totalItems === 0
      ? 0
      : (project.doneItems / project.totalItems) * 100;

  const entries = [...(project.entries ?? [])].sort((a, b) =>
    a.date < b.date ? 1 : -1,
  );

  function submit() {
    const trimmed = text.trim();
    if (!trimmed) return;
    onAddEntry({ id: crypto.randomUUID(), date, text: trimmed });
    setText("");
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 p-0 sm:items-center sm:p-6"
      onClick={onClose}
    >
      <div
        className="flex max-h-[88vh] w-full max-w-lg flex-col overflow-hidden rounded-t-3xl bg-paper shadow-2xl sm:rounded-3xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* 헤더 */}
        <div className="flex items-start justify-between gap-4 border-b border-line p-5">
          <div className="flex items-center gap-3">
            <span
              className="grid size-12 place-items-center rounded-xl bg-cream-soft text-2xl"
              aria-hidden
            >
              {project.emoji}
            </span>
            <div>
              <h2 className="text-lg font-bold leading-tight text-ink">
                {project.title}
              </h2>
              <div className="mt-1">
                <Tag tone={project.tone}>{project.category}</Tag>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <ProgressRing value={progress} />
            <button
              onClick={onClose}
              aria-label="닫기"
              className="grid size-8 place-items-center rounded-full text-muted transition-colors hover:bg-cream-soft hover:text-ink"
            >
              <CloseIcon size={18} />
            </button>
          </div>
        </div>

        {/* 본문 (스크롤) */}
        <div className="flex-1 overflow-y-auto p-5">
          <p className="mb-4 text-sm text-muted">
            {project.description ??
              `${project.doneItems} / ${project.totalItems} 단계 완료`}
          </p>

          {/* 기록 추가 폼 */}
          <div className="rounded-2xl border border-line bg-cream-soft/40 p-4">
            <label className="mb-2 flex items-center gap-2 text-sm font-semibold text-ink">
              <CalendarIcon size={16} />
              날짜 선택
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="mb-3 w-full rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink outline-none focus:border-blue"
            />
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="이 날의 기록을 남겨보세요…"
              rows={3}
              className="w-full resize-none rounded-xl border border-line bg-paper px-3 py-2 text-sm text-ink outline-none placeholder:text-muted/70 focus:border-blue"
            />
            <button
              onClick={submit}
              disabled={!text.trim()}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-xl bg-red py-2.5 text-sm font-semibold text-paper transition-opacity hover:opacity-90 disabled:opacity-40"
            >
              <PlusIcon size={16} />
              기록 추가
            </button>
          </div>

          {/* 기록 목록 */}
          <div className="mt-5">
            <h3 className="mb-2 text-sm font-semibold text-ink">
              기록 {entries.length > 0 && `(${entries.length})`}
            </h3>
            {entries.length === 0 ? (
              <p className="rounded-xl border border-dashed border-line py-8 text-center text-sm text-muted">
                아직 기록이 없어요. 위에서 첫 기록을 남겨보세요.
              </p>
            ) : (
              <ul className="flex flex-col gap-2">
                {entries.map((e) => (
                  <li
                    key={e.id}
                    className="rounded-xl border border-line bg-paper p-3"
                  >
                    <div className="mb-1 flex items-center gap-1.5 text-xs font-medium text-blue">
                      <CalendarIcon size={13} />
                      {formatDate(e.date)}
                    </div>
                    <p className="whitespace-pre-wrap text-sm text-ink">
                      {e.text}
                    </p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
