"use client";

import { Html } from "@react-three/drei";
import PortfolioDesktopContent from "./PortfolioDesktopContent";

type Props = {
  active: boolean;
  width: number;
  height: number;
};

/** Compact 3D preview on the laptop panel (before immersive takeover) */
export default function ScreenDesktop({ active, width, height }: Props) {
  if (!active) return null;

  const pxW = Math.round(width * 140);
  const pxH = Math.round(height * 140);

  return (
    <Html
      transform
      distanceFactor={1.65}
      position={[0, 0, 0.002]}
      zIndexRange={[50, 0]}
      style={{
        width: `${pxW}px`,
        height: `${pxH}px`,
        pointerEvents: "none",
        userSelect: "none",
      }}
    >
      <div
        className="h-full w-full overflow-hidden rounded-[2px] bg-[#0a0b0c] text-zinc-100"
        style={{
          fontFamily: "var(--font-work-sans), system-ui, sans-serif",
          fontSize: "11px",
          lineHeight: 1.45,
          transform: "scale(0.92)",
          transformOrigin: "top center",
        }}
      >
        <PortfolioDesktopContent playTypewriter={false} />
      </div>
    </Html>
  );
}
