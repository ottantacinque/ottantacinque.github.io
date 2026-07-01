"use client";

import { useState } from "react";
import type { Book, InputTag } from "@/lib/inputs";
import { SectionHeading } from "./SectionHeading";

export function Inputs({
  books,
  tags,
  years,
}: {
  books: Book[];
  tags: InputTag[];
  years: number[];
}) {
  const [activeTag, setActiveTag] = useState<string | null>(null);
  const [activeYear, setActiveYear] = useState<number | null>(null);

  if (books.length === 0) return null;

  const shown = books.filter(
    (b) =>
      (activeTag === null || b.tag.label === activeTag) &&
      (activeYear === null || b.year === activeYear),
  );

  return (
    <section id="inputs" className="scroll-mt-20 border-t border-border py-14">
      <div className="mb-6 flex items-center justify-between gap-3">
        <SectionHeading>読んだ本・記事 / Inputs</SectionHeading>
        {/* ステマ規制（景品表示法）対応のアフィリエイト表記 */}
        <span className="shrink-0 rounded-md bg-surface-2 px-2 py-0.5 text-[0.65rem] font-medium uppercase tracking-wider text-muted">
          広告 / PR
        </span>
      </div>

      {/* 年で絞り込み */}
      {years.length > 1 && (
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span className="mr-1 w-8 shrink-0 text-xs font-medium text-muted">
            年
          </span>
          <button
            type="button"
            onClick={() => setActiveYear(null)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activeYear === null
                ? "border-accent bg-accent text-white"
                : "border-border text-muted hover:text-text"
            }`}
          >
            すべて
          </button>
          {years.map((y) => (
            <button
              key={y}
              type="button"
              onClick={() => setActiveYear(activeYear === y ? null : y)}
              className={`rounded-full border px-3 py-1 text-xs font-medium tabular-nums transition-colors ${
                activeYear === y
                  ? "border-accent bg-accent text-white"
                  : "border-border text-muted hover:text-text"
              }`}
            >
              {y}
            </button>
          ))}
        </div>
      )}

      {/* タグで絞り込み */}
      {tags.length > 1 && (
        <div className="mb-6 flex flex-wrap items-center gap-2">
          <span className="mr-1 w-8 shrink-0 text-xs font-medium text-muted">
            タグ
          </span>
          <button
            type="button"
            onClick={() => setActiveTag(null)}
            className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
              activeTag === null
                ? "border-accent bg-accent text-white"
                : "border-border text-muted hover:text-text"
            }`}
          >
            すべて
          </button>
          {tags.map((t) => {
            const on = activeTag === t.label;
            return (
              <button
                key={t.label}
                type="button"
                onClick={() => setActiveTag(on ? null : t.label)}
                className="rounded-full border px-3 py-1 text-xs font-medium transition-colors"
                style={{
                  borderColor: t.color,
                  background: on ? t.color : "transparent",
                  color: on ? "#fff" : t.color,
                }}
              >
                {t.label}
              </button>
            );
          })}
        </div>
      )}

      <ul className="grid gap-4 sm:grid-cols-2">
        {shown.map((book) => {
          // カード全体のクリック先（Amazon 優先、無ければ先頭ストア）
          const primary =
            book.stores.find((s) => s.name === "amazon") ?? book.stores[0];
          return (
            <li
              key={book.id}
              className="relative flex gap-4 rounded-xl border border-border bg-surface p-4 shadow-sm transition-all hover:-translate-y-0.5 hover:border-accent/40 hover:shadow-md"
            >
              {/* カード全体を覆う Amazon リンク（stretched link） */}
              {primary && (
                <a
                  href={primary.url}
                  target="_blank"
                  rel="nofollow sponsored noopener noreferrer"
                  aria-label={`${book.title} を ${primary.label} で見る`}
                  className="absolute inset-0 z-0 rounded-xl"
                />
              )}

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
                <div className="mb-1.5 flex flex-wrap items-center gap-2">
                  <span
                    className="rounded-md px-2 py-0.5 text-[0.68rem] font-bold"
                    style={{
                      background: `${book.tag.color}1a`,
                      color: book.tag.color,
                    }}
                  >
                    {book.tag.label}
                  </span>
                  <span className="text-[0.68rem] font-medium tabular-nums text-muted">
                    {book.year}
                  </span>
                </div>
                <h3 className="line-clamp-2 text-[0.95rem] font-bold leading-snug">
                  {book.title}
                </h3>
                {book.publisher && (
                  <p className="mt-1 text-xs text-muted">{book.publisher}</p>
                )}

                {/* ストアボタンは overlay より前面（z-10）で個別に動作 */}
                <div className="relative z-10 mt-auto flex w-fit flex-wrap gap-2 pt-3">
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
          );
        })}
      </ul>
    </section>
  );
}
