"use client";

import { useSimpleMode } from "@/lib/simple-mode";

type Props = {
  variant?: "chip" | "nav";
};

export default function SimpleModeToggle({ variant = "chip" }: Props) {
  const { simple, setSimple } = useSimpleMode();

  const onToggle = () => {
    const next = !simple;
    setSimple(next);
    if (next) {
      requestAnimationFrame(() => {
        document.getElementById("home")?.scrollIntoView({ behavior: "auto" });
      });
    } else {
      window.scrollTo(0, 0);
    }
  };

  if (variant === "chip" && simple) return null;

  const isNav = variant === "nav";

  return (
    <div
      className={
        isNav
          ? "inline-flex items-center"
          : "fixed top-4 right-4 z-50 flex flex-col items-end gap-1 sm:top-5 sm:right-5"
      }
    >
      {!isNav && (
        <span className="text-[10px] uppercase tracking-[0.14em] text-zinc-500">
          Load mode
        </span>
      )}
      <button
        type="button"
        role="switch"
        aria-checked={simple}
        aria-label={simple ? "Simple mode on — click for 3D" : "3D mode on — click for Simple"}
        title={
          simple
            ? "Simple mode (faster). Click for 3D intro."
            : "3D intro on. Click for simple mode (faster)."
        }
        onClick={onToggle}
        className={`relative inline-grid h-9 cursor-pointer grid-cols-2 items-center rounded-full border p-0.5 transition-colors ${
          isNav
            ? "w-[7.25rem] border-line bg-zinc-900/40"
            : "w-[7.5rem] border-zinc-700/80 bg-[#0c0c0e]/90 shadow-lg backdrop-blur-md"
        }`}
      >
        <span
          aria-hidden
          className={`absolute top-0.5 bottom-0.5 w-[calc(50%-2px)] rounded-full transition-all duration-200 ease-out ${
            simple
              ? "left-[calc(50%+1px)] bg-emerald-600"
              : "left-0.5 bg-zinc-100"
          }`}
        />
        <span
          className={`relative z-10 text-center text-[11px] font-semibold transition-colors ${
            simple ? "text-zinc-400" : "text-zinc-900"
          }`}
        >
          3D
        </span>
        <span
          className={`relative z-10 text-center text-[11px] font-semibold transition-colors ${
            simple ? "text-white" : "text-zinc-400"
          }`}
        >
          Simple
        </span>
      </button>
    </div>
  );
}
