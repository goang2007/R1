import { ProgressRing } from "./ProgressRing";
import { Tag } from "./Tag";

export type ProjectEntry = {
  id: string;
  date: string; // YYYY-MM-DD
  text: string;
};

export type Project = {
  id: string;
  emoji: string;
  title: string;
  category: string;
  tone: "cream" | "blue" | "red" | "brown";
  doneItems: number;
  totalItems: number;
  description?: string;
  entries?: ProjectEntry[];
};

export function ProjectCard({
  project,
  onClick,
}: {
  project: Project;
  onClick?: () => void;
}) {
  const progress =
    project.totalItems === 0
      ? 0
      : (project.doneItems / project.totalItems) * 100;
  const entryCount = project.entries?.length ?? 0;

  return (
    <button
      type="button"
      onClick={onClick}
      className="group flex w-full flex-col gap-4 rounded-2xl border border-line bg-paper p-5 text-left transition-shadow hover:shadow-[0_8px_30px_rgba(0,0,0,0.06)]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <span
            className="grid size-11 place-items-center rounded-xl bg-cream-soft text-xl"
            aria-hidden
          >
            {project.emoji}
          </span>
          <div>
            <h3 className="font-semibold leading-tight text-ink">
              {project.title}
            </h3>
            <div className="mt-1">
              <Tag tone={project.tone}>{project.category}</Tag>
            </div>
          </div>
        </div>
        <ProgressRing value={progress} />
      </div>

      <div className="flex items-center justify-between text-sm text-muted">
        <span>
          {project.doneItems} / {project.totalItems} 단계 완료
        </span>
        {entryCount > 0 && (
          <span className="text-xs text-muted/80">기록 {entryCount}</span>
        )}
      </div>
    </button>
  );
}
