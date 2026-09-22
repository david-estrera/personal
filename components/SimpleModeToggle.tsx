"use client";

import { useEffect, useState } from "react";
import { useSimpleMode } from "@/lib/simple-mode";

type Props = {
  variant?: "chip" | "nav";
};

export default function SimpleModeToggle({ variant = "chip" }: Props) {
  const { simple, setSimple } = useSimpleMode();
  const [introActive, setIntroActive] = useState(true);

  useEffect(() => {
    if (variant !== "chip") return;

    const update = () => {
      const intro = document.getElementById("laptop-intro");
      if (!intro) {
        setIntroActive(false);
        return;
      }
      // Match Navbar: hide chip once the header takes over
      const threshold = Math.max(
        0,
        intro.offsetHeight - window.innerHeight * 0.2
      );
      setIntroActive(window.scrollY < threshold);
    };

    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, [variant]);

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

  // Floating chip: only during the 3D intro (nav is hidden then)
  if (variant === "chip" && (simple || !introActive)) return null;

  const isNav = variant === "nav";

  return (
    <div
      className={
        isNav
          ? "inline-flex items-center"
          : "fixed z-50 flex flex-col items-end gap-1 top-[max(0.75rem,env(safe-area-inset-top))] right-[max(0.75rem,env(safe-area-inset-right))] sm:top-5 sm:right-5"
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
        aria-label={
          simple ? "Simple mode on — tap for 3D" : "3D mode on — tap for Simple"
        }
        title={
          simple
            ? "Simple mode (faster). Tap for 3D intro."
            : "3D intro on. Tap for simple mode (faster)."
        }
        onClick={onToggle}
        className={`relative inline-grid min-h-[44px] cursor-pointer touch-manipulation grid-cols-2 items-center rounded-full border p-1 transition-colors active:scale-[0.98] ${
          isNav
            ? "w-[7.25rem] sm:w-[8rem] border-line bg-zinc-900/40"
            : "w-[8.25rem] border-zinc-700/80 bg-[#0c0c0e]/95 shadow-lg backdrop-blur-md"
        }`}
      >
        <span
          aria-hidden
          className={`absolute top-1 bottom-1 w-[calc(50%-4px)] rounded-full transition-all duration-200 ease-out ${
            simple
              ? "left-[calc(50%+2px)] bg-emerald-600"
              : "left-1 bg-zinc-100"
          }`}
        />
        <span
          className={`relative z-10 text-center text-xs font-semibold transition-colors ${
            simple ? "text-zinc-400" : "text-zinc-900"
          }`}
        >
          3D
        </span>
        <span
          className={`relative z-10 text-center text-xs font-semibold transition-colors ${
            simple ? "text-white" : "text-zinc-400"
          }`}
        >
          Simple
        </span>
      </button>
    </div>
  );
}
