"use client";

import { useEffect, useState } from "react";
import { profile } from "@/content/site";

const fmt = new Intl.DateTimeFormat("en-US", {
  timeZone: profile.timeZone,
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

const hourFmt = new Intl.DateTimeFormat("en-US", { timeZone: profile.timeZone, hour: "numeric", hour12: false });

function mood(hour: number) {
  if (hour < 5) return "Probably asleep — or debugging.";
  if (hour < 9) return "Morning chiya, first commit.";
  if (hour < 13) return "Deep-work hours.";
  if (hour < 18) return "Shipping things.";
  if (hour < 22) return "Winding down, still curious.";
  return "Late-night side projects.";
}

export function LocalTime() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  const hour = now ? Number(hourFmt.format(now)) % 24 : 12;
  return (
    <div>
      <div className="font-mono text-4xl tracking-tight text-snow tabular-nums sm:text-5xl" suppressHydrationWarning>
        {now ? fmt.format(now) : "--:--:--"}
      </div>
      <p className="mt-2 text-sm text-mist">{now ? mood(hour) : " "}</p>
    </div>
  );
}
