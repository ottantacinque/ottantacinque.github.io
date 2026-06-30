"use client";

import { useEffect, useMemo, useState } from "react";
import type { Item, TopGroup, SubFilter } from "@/lib/activities";
import { ExternalIcon } from "./icons";

type Entry = {
  item: Item;
  topLabel: string;
  topColor: string;
  subLabel: string;
  subColor: string;
};

const PREVIEW_LIMIT = 4; // 左カラムで折りたたまず表示する件数
const AUTO_MS = 3800;

export function ActivityBoard({
  tops,
  subFilters,
}: {
  tops: TopGroup[];
  subFilters: SubFilter[];
}) {
  const [filter, setFilter] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  // フィルタ適用後のトップ構成
  const viewTops = useMemo(() => {
    if (!filter) return tops;
    return tops
      .map((t) => ({ ...t, subs: t.subs.filter((s) => s.id === filter) }))
      .filter((t) => t.subs.length > 0);
  }, [tops, filter]);

  // 右カラム用のフラットなカード列
  const entries = useMemo<Entry[]>(() => {
    const out: Entry[] = [];
    for (const t of viewTops)
      for (const s of t.subs)
        for (const item of s.items)
          out.push({
            item,
            topLabel: t.label,
            topColor: t.color,
            subLabel: s.label,
            subColor: s.color,
          });
    return out;
  }, [viewTops]);

  const changeFilter = (id: string | null) => {
    setFilter(id);
    setIndex(0);
    setSelectedId(null);
  };

  // 自動で左右に流れる
  useEffect(() => {
    if (entries.length <= 1) return;
    const id = setInterval(
      () => setIndex((i) => (i + 1) % entries.length),
      AUTO_MS,
    );
    return () => clearInterval(id);
  }, [entries.length]);

  const current = entries[index] ?? null;

  const selectItem = (itemId: string) => {
    const pos = entries.findIndex((e) => e.item.id === itemId);
    if (pos >= 0) setIndex(pos);
    setSelectedId(itemId);
  };

  const toggleExpand = (key: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });

  return (
    <div>
      {/* 上部：分類フィルタ */}
      <div className="mb-6 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => changeFilter(null)}
          className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
            filter === null
              ? "border-accent bg-accent text-white"
              : "border-border text-muted hover:text-text"
          }`}
        >
          すべて
        </button>
        {subFilters.map((s) => {
          const active = filter === s.id;
          return (
            <button
              key={s.id}
              type="button"
              onClick={() => changeFilter(active ? null : s.id)}
              className="rounded-full border px-3 py-1 text-xs font-medium transition-colors"
              style={{
                borderColor: s.color,
                background: active ? s.color : "transparent",
                color: active ? "#fff" : s.color,
              }}
            >
              {s.label}
            </button>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
        {/* 左：一覧 */}
        <div className="min-w-0 space-y-6">
          {viewTops.map((t) => (
            <div key={t.id}>
              <h3 className="mb-3 flex items-center gap-2 text-sm font-bold">
                <span
                  className="h-3 w-3 rounded-full"
                  style={{ background: t.color }}
                />
                {t.label}
                <span className="text-xs font-medium text-muted">{t.total}</span>
              </h3>

              <div className="space-y-4 border-l-2 pl-4" style={{ borderColor: `${t.color}40` }}>
                {t.subs.map((s) => {
                  const key = `${t.id}:${s.id}`;
                  const isOpen = expanded.has(key);
                  const shown = isOpen ? s.items : s.items.slice(0, PREVIEW_LIMIT);
                  const rest = s.items.length - shown.length;
                  return (
                    <div key={s.id}>
                      <p
                        className="mb-1 text-[0.78rem] font-bold"
                        style={{ color: s.color }}
                      >
                        {s.label}
                        <span className="ml-1 font-medium text-muted">
                          {s.items.length}
                        </span>
                      </p>
                      <ul className="space-y-0.5">
                        {shown.map((item) => {
                          const active =
                            item.id === selectedId ||
                            current?.item.id === item.id;
                          return (
                            <li key={item.id}>
                              <button
                                type="button"
                                onClick={() => selectItem(item.id)}
                                className={`block w-full truncate rounded px-2 py-1 text-left text-[0.84rem] leading-6 transition-colors ${
                                  active
                                    ? "bg-accent-bg text-accent"
                                    : "text-text/80 hover:bg-surface-2 hover:text-text"
                                }`}
                                title={item.label}
                              >
                                {item.label}
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                      {s.items.length > PREVIEW_LIMIT && (
                        <button
                          type="button"
                          onClick={() => toggleExpand(key)}
                          className="mt-1 px-2 text-[0.76rem] font-medium text-muted hover:text-accent"
                        >
                          {isOpen ? "閉じる" : `他 ${rest} 件を表示`}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          ))}
        </div>

        {/* 右：カードを1件ずつ自動表示 */}
        <div className="min-w-0">
          <div className="relative overflow-hidden py-2">
            <div
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(${10 - index * 80}%)` }}
            >
              {entries.map((e, i) => (
                <div key={e.item.id} className="w-4/5 shrink-0 px-2">
                  <article
                    className={`flex flex-col overflow-hidden rounded-xl border bg-surface transition-all duration-500 ${
                      i === index
                        ? "border-border opacity-100 shadow-md"
                        : "border-border/60 opacity-50"
                    }`}
                  >
                  {/* Zenn 風の絵文字バナー（関連ビジュアル） */}
                  <div
                    className="flex h-28 items-center justify-center"
                    style={{
                      background: `radial-gradient(circle at 50% 40%, ${e.subColor}26, ${e.subColor}0d)`,
                    }}
                  >
                    <span className="text-5xl drop-shadow-sm">
                      {e.item.emoji ?? "🔖"}
                    </span>
                  </div>

                  <div className="flex min-h-[180px] flex-1 flex-col justify-between p-6">
                    <div>
                      <div className="mb-3 flex flex-wrap items-center gap-2">
                        <span
                          className="rounded-md px-2 py-0.5 text-[0.7rem] font-bold text-white"
                          style={{ background: e.topColor }}
                        >
                          {e.topLabel}
                        </span>
                        <span
                          className="rounded-md px-2 py-0.5 text-[0.7rem] font-bold"
                          style={{ background: `${e.subColor}1a`, color: e.subColor }}
                        >
                          {e.subLabel}
                        </span>
                        {e.item.category === "output" && e.item.weight > 0 && (
                          <span className="text-xs text-muted">♥ {e.item.weight}</span>
                        )}
                      </div>
                      <h4 className="text-lg font-bold leading-snug">
                        {e.item.label}
                      </h4>
                      {e.item.desc && (
                        <p className="mt-2 text-[0.85rem] leading-6 text-muted">
                          {e.item.desc}
                        </p>
                      )}
                    </div>

                    {e.item.url && (
                      <a
                        href={e.item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-4 inline-flex w-fit items-center gap-1.5 text-sm font-medium text-accent hover:underline"
                      >
                        開く
                        <ExternalIcon size={14} />
                      </a>
                    )}
                  </div>
                  </article>
                </div>
              ))}
            </div>

            {/* ナビゲーション */}
            {entries.length > 1 && (
              <>
                <button
                  type="button"
                  aria-label="前へ"
                  onClick={() =>
                    setIndex((i) => (i - 1 + entries.length) % entries.length)
                  }
                  className="absolute left-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface/80 text-muted backdrop-blur transition-colors hover:text-accent"
                >
                  ‹
                </button>
                <button
                  type="button"
                  aria-label="次へ"
                  onClick={() => setIndex((i) => (i + 1) % entries.length)}
                  className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-full border border-border bg-surface/80 text-muted backdrop-blur transition-colors hover:text-accent"
                >
                  ›
                </button>
              </>
            )}
          </div>

          {/* インジケータ */}
          {entries.length > 1 && (
            <div className="mt-3 text-center text-xs text-muted">
              {index + 1} / {entries.length}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
