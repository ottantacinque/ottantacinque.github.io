"use client";

import { useSyncExternalStore } from "react";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon } from "./icons";

const emptySubscribe = () => () => {};

// SSR では false、クライアントマウント後に true を返す（effect で setState せずに済む）
function useMounted() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false,
  );
}

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useMounted();
  const isDark = resolvedTheme === "dark";

  return (
    <button
      type="button"
      aria-label="テーマを切り替え"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="fixed right-4 top-4 z-50 grid h-10 w-10 place-items-center rounded-full border border-border bg-surface text-text shadow-sm backdrop-blur transition-colors hover:bg-surface-2 sm:right-6 sm:top-6"
    >
      {/* マウント前はサーバー出力と一致させるため固定要素を描画し、
          ハイドレーション不整合を防ぐ */}
      {!mounted ? (
        <span className="h-[18px] w-[18px]" />
      ) : isDark ? (
        <SunIcon size={18} />
      ) : (
        <MoonIcon size={18} />
      )}
    </button>
  );
}
