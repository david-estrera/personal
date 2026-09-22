"use client";

import PortfolioDesktopContent from "./PortfolioDesktopContent";

type Props = {
  /** 0–1 how much the immersive screen has taken over */
  amount: number;
};

/**
 * Full interactive laptop screen — fades in as the 3D lid finishes opening.
 * Native scroll + real links/buttons.
 */
export default function ImmersiveScreen({ amount }: Props) {
  const visible = amount > 0.02;
  const interactive = amount > 0.45;

  if (!visible) return null;

  return (
    <div
      className="fixed inset-0 z-20 flex items-center justify-center p-2 sm:p-4 md:p-8"
      style={{
        opacity: amount,
        pointerEvents: interactive ? "auto" : "none",
        background: `rgba(40, 36, 32, ${amount * 0.35})`,
      }}
      aria-hidden={!interactive}
    >
      <div
        className="relative w-full max-w-6xl h-[min(92vh,960px)] flex flex-col overflow-hidden"
        style={{
          background: "#0a0b0c",
          borderRadius: 14,
          transform: `translateY(${(1 - amount) * 24}px) scale(${0.88 + amount * 0.12})`,
          boxShadow: `
            0 0 0 8px #3a3f46,
            0 0 0 11px #1e2226,
            0 25px 60px rgba(0,0,0,0.4)
          `,
        }}
        onWheel={(e) => {
          if (interactive) e.stopPropagation();
        }}
        onTouchMove={(e) => {
          if (interactive) e.stopPropagation();
        }}
      >
        <div
          className="flex-1 overflow-y-auto overscroll-contain text-zinc-100"
          style={{
            fontFamily: "var(--font-work-sans), system-ui, sans-serif",
            WebkitOverflowScrolling: "touch",
          }}
        >
          <PortfolioDesktopContent immersive playTypewriter={amount > 0.5} />
        </div>
      </div>
    </div>
  );
}
