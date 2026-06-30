import { bookInputs } from "@/lib/inputs";
import { SectionHeading } from "./SectionHeading";

export function Inputs() {
  if (bookInputs.length === 0) return null;

  return (
    <section id="inputs" className="scroll-mt-20 border-t border-border py-14">
      <div className="mb-7 flex items-center justify-between gap-3">
        <SectionHeading>読んだ本・記事 / Inputs</SectionHeading>
        {/* ステマ規制（景品表示法）対応のアフィリエイト表記 */}
        <span className="shrink-0 rounded-md bg-surface-2 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-muted">
          広告 / PR
        </span>
      </div>

      <ul className="grid gap-4 sm:grid-cols-2">
        {bookInputs.map((book) => (
          <li
            key={book.id}
            className="flex gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm transition-colors hover:border-accent/40"
          >
            {book.cover && (
              // 表紙画像（外部ホスト直リンクのため next/image ではなく img を使用）
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={book.cover}
                alt={book.title}
                loading="lazy"
                className="h-28 w-20 shrink-0 self-start rounded-md object-contain shadow-sm"
              />
            )}

            <div className="flex min-w-0 flex-1 flex-col">
              <h3 className="line-clamp-2 text-[0.95rem] font-bold leading-snug">
                {book.title}
              </h3>
              {book.publisher && (
                <p className="mt-1 text-xs text-muted">{book.publisher}</p>
              )}
              {book.note && (
                <p className="mt-1 line-clamp-2 text-[0.82rem] leading-6 text-muted">
                  {book.note}
                </p>
              )}

              <div className="mt-auto flex flex-wrap gap-2 pt-3">
                {book.stores.map((s) => (
                  <a
                    key={s.name}
                    href={s.url}
                    target="_blank"
                    rel="nofollow sponsored noopener noreferrer"
                    className="rounded-md px-2.5 py-1 text-[0.72rem] font-bold text-white transition-opacity hover:opacity-85"
                    style={{ background: s.color }}
                  >
                    {s.label}
                  </a>
                ))}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
