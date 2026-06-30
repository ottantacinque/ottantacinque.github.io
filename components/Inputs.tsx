import { inputItems } from "@/lib/activities";
import { SectionHeading } from "./SectionHeading";

export function Inputs() {
  if (inputItems.length === 0) return null;

  return (
    <section id="inputs" className="scroll-mt-20 border-t border-border py-14">
      <SectionHeading>読んだ本・記事 / Inputs</SectionHeading>

      <ul className="grid gap-4 sm:grid-cols-2">
        {inputItems.map((item) => {
          const inner = (
            <div className="flex h-full items-start gap-4 rounded-xl border border-border bg-surface p-5 shadow-sm">
              <span className="shrink-0 text-3xl drop-shadow-sm">
                {item.emoji ?? "📖"}
              </span>
              <div className="min-w-0">
                <h3 className="font-bold leading-snug">{item.label}</h3>
                {item.desc && (
                  <p className="mt-1 text-[0.85rem] leading-6 text-muted">
                    {item.desc}
                  </p>
                )}
              </div>
            </div>
          );

          return (
            <li key={item.id}>
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${item.label} を開く`}
                  className="block h-full rounded-xl transition-all duration-300 hover:-translate-y-0.5 [&>div]:transition-colors [&>div]:hover:border-accent/40"
                >
                  {inner}
                </a>
              ) : (
                inner
              )}
            </li>
          );
        })}
      </ul>
    </section>
  );
}
