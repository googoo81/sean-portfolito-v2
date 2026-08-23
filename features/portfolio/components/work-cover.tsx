import type { Project } from "@/features/portfolio/types";
import { cn } from "@/lib/format";

type WorkCoverProps = {
  project: Project;
  className?: string;
};

export function WorkCover({ project, className }: WorkCoverProps) {
  return (
    <div className={cn("relative h-full min-h-[22rem] overflow-hidden", className)}>
      {project.theme === "variway" ? (
        <VariwayCover name={project.shortName} />
      ) : null}
      {project.theme === "meta" ? <MetaCover name={project.shortName} /> : null}
      {project.theme === "sparta" ? (
        <SpartaCover name={project.shortName} />
      ) : null}
    </div>
  );
}

function VariwayCover({ name }: { name: string }) {
  return (
    <div className="cover-scale absolute inset-0 bg-cover-variway text-[#2a1d16]">
      <p className="font-display absolute top-5 left-5 text-[11px] tracking-[0.28em] uppercase">
        Taste × Style
      </p>
      <p className="font-display absolute right-5 bottom-[28%] left-5 text-[clamp(3.4rem,8vw,7.5rem)] leading-[0.82] font-extrabold tracking-tight">
        {name}
      </p>
      <div className="absolute inset-x-0 bottom-0 flex h-[22%]">
        <span className="flex-1 bg-[#c9a58a]" />
        <span className="flex-1 bg-[#8f3f32]" />
        <span className="flex-1 bg-[#1c1917]" />
        <span className="flex-1 bg-[#efe4d6]" />
      </div>
    </div>
  );
}

function MetaCover({ name }: { name: string }) {
  return (
    <div className="cover-scale absolute inset-0 bg-cover-meta text-[#f3efe6]">
      <div
        className="absolute inset-y-0 left-0 w-6"
        style={{
          backgroundImage:
            "radial-gradient(circle at 0 12px, var(--background) 6px, transparent 7px)",
          backgroundSize: "24px 24px",
        }}
      />
      <p className="font-display absolute top-6 right-6 text-[11px] tracking-[0.28em] uppercase">
        Scroll → Ticket
      </p>
      <p className="font-display absolute right-8 bottom-10 left-10 text-[clamp(2.4rem,6vw,5.4rem)] leading-[0.88] font-bold tracking-tight">
        {name}
      </p>
      <p className="absolute bottom-6 left-10 text-[11px] tracking-[0.18em] text-[#f3efe6]/60 uppercase">
        7 cards / Instagram
      </p>
    </div>
  );
}

function SpartaCover({ name }: { name: string }) {
  const segments = ["대학생", "직무 전환", "1인 창업"];

  return (
    <div className="cover-scale absolute inset-0 bg-cover-sparta text-[#1c211c]">
      <div className="absolute inset-0 grid grid-cols-3">
        {segments.map((segment) => (
          <div
            key={segment}
            className="flex items-end border-r border-[#1c211c]/15 p-4 last:border-r-0"
          >
            <span className="text-sm tracking-tight">{segment}</span>
          </div>
        ))}
      </div>
      <p className="font-display absolute top-6 left-5 z-10 text-[11px] tracking-[0.28em] uppercase">
        One brand
      </p>
      <p className="font-display absolute right-5 bottom-16 left-5 z-10 text-[clamp(2.6rem,6vw,5.8rem)] leading-[0.86] font-extrabold tracking-tight">
        {name}
      </p>
    </div>
  );
}
