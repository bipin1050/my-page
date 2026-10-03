"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowLeft, Search } from "@/components/icons";
import { getMessagesCollection, type Message } from "@/lib/firebase";

type Row = Message & { id: string; body: string; sentAt: string; time: number };

// Messages are stored as "<text> @ <locale date>"; split that back apart.
function parse(id: string, m: Message): Row {
  const at = m.message.lastIndexOf(" @ ");
  const body = at === -1 ? m.message : m.message.slice(0, at);
  const sentAt = at === -1 ? "" : m.message.slice(at + 3);
  const time = Date.parse(sentAt);
  return { ...m, id, body, sentAt, time: Number.isNaN(time) ? 0 : time };
}

export function MessageList() {
  const [rows, setRows] = useState<Row[] | null>(null);
  const [error, setError] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    (async () => {
      try {
        const { firestore, collection } = await getMessagesCollection();
        const snap = await firestore.getDocs(collection);
        setRows(snap.docs.map((d) => parse(d.id, d.data() as Message)).sort((a, b) => b.time - a.time));
      } catch (err) {
        console.error("Error getting messages:", err);
        setError(true);
      }
    })();
  }, []);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!rows || !q) return rows;
    return rows.filter((r) => `${r.name} ${r.email} ${r.body}`.toLowerCase().includes(q));
  }, [rows, query]);

  return (
    <main className="mx-auto max-w-4xl px-5 py-12 sm:py-16">
      <Link href="/" className="inline-flex items-center gap-2 text-sm text-mist hover:text-snow">
        <ArrowLeft width={16} height={16} /> Home
      </Link>
      <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="eyebrow">Summit register</p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            Messages {rows && <span className="text-mist">({rows.length})</span>}
          </h1>
        </div>
        <label className="relative block sm:w-72">
          <Search className="absolute top-1/2 left-3.5 -translate-y-1/2 text-dusk" width={16} height={16} />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Filter messages"
            className="w-full rounded-full border border-white/10 bg-ink-900 py-2.5 pr-4 pl-10 text-sm focus:border-aurora/60 focus:outline-none"
          />
        </label>
      </div>

      <div className="mt-10 space-y-3">
        {error && <p className="card p-6 text-mist">Couldn&rsquo;t load messages.</p>}
        {!rows && !error && Array.from({ length: 4 }, (_, i) => <div key={i} className="card h-28 animate-pulse" />)}
        {shown?.length === 0 && <p className="card p-6 text-mist">Nothing here yet.</p>}
        {shown?.map((m) => (
          <article key={m.id} className="card p-6">
            <header className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
              <h2 className="font-semibold">{m.name}</h2>
              <a href={`mailto:${m.email}`} className="text-sm text-aurora hover:underline">
                {m.email}
              </a>
              {m.sentAt && <time className="font-mono text-xs text-dusk sm:ml-auto">{m.sentAt}</time>}
            </header>
            <p className="mt-3 whitespace-pre-wrap text-snow/85">{m.body}</p>
          </article>
        ))}
      </div>
    </main>
  );
}
