import { career } from "@/lib/data";
import { SectionHeading } from "./SectionHeading";

function WorkIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <rect x="2" y="7" width="20" height="14" rx="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

function EduIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" width={18} height={18}>
      <path d="M22 10 12 5 2 10l10 5 10-5Z" />
      <path d="M6 12v5c0 1 2.5 2.5 6 2.5s6-1.5 6-2.5v-5" />
    </svg>
  );
}

export function Career() {
  return (
    <section id="career" className="scroll-mt-20 border-t border-border py-14">
      <SectionHeading>経歴</SectionHeading>

      <ol className="relative">
        {career.map((item, i) => (
          <li key={item.org} className="group relative grid gap-4 pb-10 pl-12 last:pb-0 sm:grid-cols-[220px_1fr] sm:gap-8 sm:pl-14">
            {/* タイムラインの縦線 */}
            {i !== career.length - 1 && (
              <span className="absolute left-[18px] top-9 h-full w-px bg-border sm:left-[22px]" />
            )}
            {/* ノードの丸 */}
            <span className="absolute left-0 top-0 grid h-9 w-9 place-items-center rounded-full border border-border bg-surface text-accent sm:h-11 sm:w-11">
              {item.kind === "work" ? <WorkIcon /> : <EduIcon />}
            </span>

            <div className="pt-1.5">
              <h3 className="font-bold leading-tight">{item.org}</h3>
              <p className="mt-1 text-sm font-medium text-accent">{item.role}</p>
              <p className="mt-1 text-[0.78rem] tabular-nums text-muted">
                {item.period}
              </p>
            </div>

            <div className="relative overflow-hidden rounded-xl border border-border bg-gradient-to-br from-surface to-surface-2 p-5 shadow-sm transition-all duration-300 group-hover:-translate-y-0.5 group-hover:border-accent/40 group-hover:shadow-[0_10px_30px_-12px] group-hover:shadow-accent/40 sm:pt-3">
              {/* ホバーで現れる左アクセントバー */}
              <span className="absolute inset-y-0 left-0 w-1 origin-top scale-y-0 bg-accent transition-transform duration-300 group-hover:scale-y-100" />
              <p className="text-[0.9rem] leading-7 text-text/80 transition-colors group-hover:text-text">
                {item.desc}
              </p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
