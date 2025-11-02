"use client";

import Link from "next/link";
import { useCallback } from "react";
import { ChatKitPanel, type FactAction } from "@/components/ChatKitPanel";
import { useColorScheme } from "@/hooks/useColorScheme";
import { WORKFLOW_ID } from "@/lib/config";

const isWorkflowConfigured = Boolean(
  WORKFLOW_ID && !WORKFLOW_ID.startsWith("wf_replace")
);

function StatusBadge({ label, tone }: { label: string; tone: "ok" | "warning" }) {
  const palette =
    tone === "ok"
      ? "bg-emerald-100 text-emerald-700 border-emerald-200 dark:bg-emerald-400/10 dark:text-emerald-200 dark:border-emerald-400/40"
      : "bg-amber-100 text-amber-700 border-amber-200 dark:bg-amber-400/10 dark:text-amber-100 dark:border-amber-400/40";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs font-semibold ${palette}`}
    >
      <span className="size-1.5 rounded-full bg-current opacity-70" aria-hidden />
      {label}
    </span>
  );
}

export default function App() {
  const { scheme, setScheme } = useColorScheme();

  const handleWidgetAction = useCallback(async (action: FactAction) => {
    if (process.env.NODE_ENV !== "production") {
      console.info("[ChatKitPanel] widget action", action);
    }
  }, []);

  const handleResponseEnd = useCallback(() => {
    if (process.env.NODE_ENV !== "production") {
      console.debug("[ChatKitPanel] response end");
    }
  }, []);

  return (
    <main className="flex min-h-screen flex-col bg-slate-100 px-6 py-10 dark:bg-slate-950">
      <div className="mx-auto flex w-full max-w-6xl flex-1 flex-col gap-8">
        <header className="flex flex-col gap-3 rounded-2xl border border-slate-200 bg-white/95 p-6 shadow-sm backdrop-blur dark:border-slate-800 dark:bg-slate-900/80">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-slate-500 dark:text-slate-400">
                Analytics Agent Starter
              </p>
              <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-slate-50">
                Chat with your spreadsheets
              </h1>
            </div>
            <StatusBadge
              tone={isWorkflowConfigured ? "ok" : "warning"}
              label={
                isWorkflowConfigured
                  ? "Workflow configured"
                  : "Set NEXT_PUBLIC_CHATKIT_WORKFLOW_ID"
              }
            />
          </div>
          <p className="text-sm leading-relaxed text-slate-600 dark:text-slate-300">
            Upload Excel workbooks under the <Link href="/data" className="font-semibold text-slate-900 underline-offset-4 hover:underline dark:text-slate-100">/data dashboard</Link> and ask questions here. SQL answers run automatically against DuckDB and chart responses render inline so you can iterate quickly.
          </p>
        </header>
        <div className="flex flex-1 flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm dark:border-slate-800 dark:bg-slate-900">
          <ChatKitPanel
            theme={scheme}
            onWidgetAction={handleWidgetAction}
            onResponseEnd={handleResponseEnd}
            onThemeRequest={setScheme}
          />
        </div>
      </div>
    </main>
  );
}
