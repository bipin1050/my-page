"use client";

import { useState } from "react";
import { toast } from "sonner";
import { profile } from "@/content/site";
import { Check, Copy } from "./icons";

export function CopyEmail() {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      toast.success("Email copied!");
      setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${profile.email}`;
    }
  };
  return (
    <button
      onClick={copy}
      className="grid size-9 shrink-0 place-items-center rounded-full border border-white/10 text-mist transition hover:border-white/30 hover:text-snow"
      aria-label={copied ? "Email copied" : "Copy email address"}
    >
      {copied ? <Check width={16} height={16} className="text-emerald-300" /> : <Copy width={16} height={16} />}
    </button>
  );
}
