import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import { LEARN_INDEX } from "../../lib/learn";

export default function LearnSearch() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return LEARN_INDEX;

    return LEARN_INDEX.filter((it) => {
      const hay = [it.title, ...it.keywords].join(" ").toLowerCase();
      return hay.includes(query);
    });
  }, [q]);

  return (
    <>
      <Head><title>Belajar • Search</title></Head>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="text-xs font-extrabold tracking-widest text-white/60">BELAJAR</div>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Search Materi</h1>

          <div className="mt-5 flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari planet • big bang • empire • dll"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm font-black text-white/90 outline-none"
            />
            <button
              onClick={() => setQ("")}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black hover:bg-white/10"
            >
              CLEAR
            </button>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {results.map((it) => (
              <Link
                key={it.id}
                href={it.route}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft hover:bg-white/10"
              >
                <div className="text-xs font-extrabold tracking-widest text-white/60">
                  •{it.subject.toUpperCase()}
                </div>
                <div className="mt-2 text-xl font-black text-white">{it.title}</div>
                <div className="mt-2 text-sm font-bold text-white/70">
                  •OPEN
                  {it.totalHint ? ` •TOTAL HINT ${it.totalHint}` : ""}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/learn" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black hover:bg-white/10">KEMBALI</Link>
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black hover:bg-white/10">HOME</Link>
          </div>
        </div>
      </main>
    </>
  );
}
