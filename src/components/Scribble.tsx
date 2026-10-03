import { cn } from "@/lib/cn";

/** A little handwritten margin note with a hand-drawn arrow. */
export function Scribble({
  children,
  className,
  arrow = "down-left",
}: {
  children: React.ReactNode;
  className?: string;
  arrow?: "down-left" | "down-right";
}) {
  return (
    <span
      className={cn(
        "pointer-events-none flex items-start gap-1 font-hand text-[1.35rem] leading-none text-ember/90 select-none",
        className,
      )}
    >
      {arrow === "down-left" && <Arrow className="mt-2 -scale-x-100" />}
      <span className="-rotate-3">{children}</span>
      {arrow === "down-right" && <Arrow className="mt-2" />}
    </span>
  );
}

function Arrow({ className }: { className?: string }) {
  return (
    <svg width="34" height="30" viewBox="0 0 34 30" fill="none" className={className} aria-hidden>
      <path d="M3 3c9 1.5 19 4 23 11.5 1.6 3 2 6.2 1.6 10.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <path
        d="M22.4 20.8c1.9 1.6 3.4 3.3 5 5 1.1-2.4 2.3-4.4 4-6.4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
