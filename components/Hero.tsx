import Image from "next/image";
import { profile, socials } from "@/lib/data";
import { Icon } from "./icons";

export function Hero() {
  return (
    <section id="top" className="pt-14 pb-12 sm:pt-20 sm:pb-16">
      <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:gap-11">
        <div className="shrink-0">
          <Image
            src={profile.photo}
            alt={profile.nameJa}
            width={160}
            height={160}
            priority
            className="h-32 w-32 rounded-full border border-border object-cover object-top shadow-md sm:h-40 sm:w-40"
          />
        </div>

        <div className="flex-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
              {profile.nameJa}
            </h1>
            <p className="text-sm font-medium text-muted">{profile.nameEn}</p>
          </div>

          <p className="mt-3 text-base font-medium text-accent">{profile.role}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {profile.tags.map((tag) => (
              <span
                key={tag}
                className="rounded-md bg-surface-2 px-2.5 py-1 text-[0.7rem] font-medium uppercase tracking-wider text-muted"
              >
                {tag}
              </span>
            ))}
          </div>

          <p className="mt-5 max-w-2xl text-[0.95rem] leading-8 text-text/80">
            {profile.intro}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-1">
            {socials.map((s) =>
              // Zenn は「アイコン + ラベル」（枠なし）
              s.key === "zenn" ? (
                <a
                  key={s.key}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={s.label}
                  className="inline-flex h-10 items-center gap-1.5 rounded-lg px-2.5 text-sm font-medium text-muted transition-colors hover:bg-accent-bg hover:text-accent"
                >
                  <Icon name={s.key} size={18} />
                  Zenn
                </a>
              ) : (
                // Kaggle を含むその他は公式ロゴのアイコンのみ（枠なし）
                <a
                  key={s.key}
                  href={s.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  title={s.label}
                  className="grid h-10 w-10 place-items-center rounded-lg text-muted transition-colors hover:bg-accent-bg hover:text-accent"
                >
                  {/* Kaggle のロゴは細身で小さく見えるため大きめに */}
                  <Icon name={s.key} size={s.key === "kaggle" ? 34 : 20} />
                </a>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
