"use client";

import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { toast } from "sonner";
import { getMessagesCollection, type Message } from "@/lib/firebase";
import { cn } from "@/lib/cn";
import { ArrowUpRight, Check } from "../icons";

type Status = "idle" | "sending" | "sent";

const empty: Message = { name: "", email: "", message: "" };

function Field({
  label,
  name,
  type = "text",
  value,
  onChange,
  textarea,
  autoComplete,
}: {
  label: string;
  name: keyof Message;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  textarea?: boolean;
  autoComplete?: string;
}) {
  const cls =
    "peer w-full rounded-2xl border border-white/10 bg-ink-950/60 px-5 pt-7 pb-3 text-[16px] text-snow placeholder-transparent transition-colors focus:border-aurora/60 focus:bg-ink-950 focus:outline-none";
  return (
    <label className="relative block">
      {textarea ? (
        <textarea
          name={name}
          value={value}
          onChange={onChange}
          placeholder={label}
          required
          rows={5}
          className={cn(cls, "resize-none")}
        />
      ) : (
        <input
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={label}
          required
          autoComplete={autoComplete}
          className={cls}
        />
      )}
      <span className="pointer-events-none absolute top-2.5 left-5 font-mono text-[10px] tracking-[0.18em] text-mist uppercase transition-all peer-placeholder-shown:top-[1.15rem] peer-placeholder-shown:font-sans peer-placeholder-shown:text-base peer-placeholder-shown:tracking-normal peer-placeholder-shown:normal-case peer-focus:top-2.5 peer-focus:font-mono peer-focus:text-[10px] peer-focus:tracking-[0.18em] peer-focus:text-aurora peer-focus:uppercase">
        {label}
      </span>
    </label>
  );
}

export function ContactForm() {
  const [form, setForm] = useState<Message>(empty);
  const [status, setStatus] = useState<Status>("idle");
  const [trap, setTrap] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "sending") return;
    setStatus("sending");
    try {
      // Bots fill the hidden field; humans never see it.
      if (!trap) {
        const { firestore, collection } = await getMessagesCollection();
        await firestore.addDoc(collection, {
          name: form.name.trim(),
          email: form.email.trim(),
          message: `${form.message.trim()} @ ${new Date().toLocaleString()}`,
        });
      }
      setForm(empty);
      setStatus("sent");
      toast.success("Got it, thanks! I'll get back to you soon.");
      setTimeout(() => setStatus("idle"), 4000);
    } catch (err) {
      console.error(err);
      setStatus("idle");
      toast.error("Hmm, that didn't go through. Try again, or just email me.");
    }
  };

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <Field label="Your name" name="name" value={form.name} onChange={onChange} autoComplete="name" />
        <Field label="Email" name="email" type="email" value={form.email} onChange={onChange} autoComplete="email" />
      </div>
      <Field label="Your message" name="message" value={form.message} onChange={onChange} textarea />
      <input
        type="text"
        name="company"
        tabIndex={-1}
        autoComplete="off"
        value={trap}
        onChange={(e) => setTrap(e.target.value)}
        className="hidden"
        aria-hidden
      />
      <button
        type="submit"
        disabled={status === "sending"}
        className="group relative flex h-14 w-full items-center justify-center overflow-hidden rounded-2xl bg-snow font-medium text-ink-950 transition hover:shadow-[0_0_48px_-8px] hover:shadow-alpenglow disabled:opacity-70"
      >
        <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-aurora via-alpenglow to-ember transition-transform duration-500 ease-out group-hover:translate-x-0" />
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={status}
            className="relative flex items-center gap-2"
            initial={{ y: 18, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -18, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {status === "idle" && (
              <>
                Send message{" "}
                <ArrowUpRight className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </>
            )}
            {status === "sending" && (
              <>
                <span className="size-4 animate-spin rounded-full border-2 border-ink-950/30 border-t-ink-950" /> Sending…
              </>
            )}
            {status === "sent" && (
              <>
                <Check /> Sent. Thank you!
              </>
            )}
          </motion.span>
        </AnimatePresence>
      </button>
    </form>
  );
}
