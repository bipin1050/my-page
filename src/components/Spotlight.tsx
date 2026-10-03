"use client";

import { useRef } from "react";
import { cn } from "@/lib/cn";

/** A card whose border and surface light up under the cursor. */
export function Spotlight({
  children,
  className,
  color = "167 139 250",
}: {
  children: React.ReactNode;
  className?: string;
  /** space-separated RGB */
  color?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const onMove = (e: React.PointerEvent) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };
  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      style={{ "--spot": color } as React.CSSProperties}
      className={cn(
        "card group/spot overflow-hidden",
        "before:pointer-events-none before:absolute before:inset-0 before:rounded-[inherit] before:opacity-0 before:transition-opacity before:duration-500 hover:before:opacity-100",
        "before:bg-[radial-gradient(420px_circle_at_var(--mx)_var(--my),rgb(var(--spot)/0.12),transparent_45%)]",
        "after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:p-px after:opacity-0 after:transition-opacity after:duration-500 hover:after:opacity-100",
        "after:bg-[radial-gradient(260px_circle_at_var(--mx)_var(--my),rgb(var(--spot)/0.55),transparent_60%)]",
        "after:[mask:linear-gradient(#000_0_0)_content-box_exclude,linear-gradient(#000_0_0)]",
        className,
      )}
    >
      {children}
    </div>
  );
}
