import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LEARN_INDEX } from "../../lib/learn";
import { lsGet } from "../../lib/local";

export default function LearnProgress() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setTick((x) => x + 1);
  }, []);

  const rows = useMemo(() => {
    return LEARN_INDEX.map((it) => {
      const key = `learn:progress:${it.subject}:${it.id}`;
      const maxPage = lsGet<number>(key, 0);
      const total = it.totalHint || 0;
      const pct = total ? Math.min(100, Math.round((maxPage / total) * 100)) : 0;
      return { ...it, maxPage, pct };
    });
  }, [tick]);

  return (
    <>
      <Head><title>Belajar • Progress</title></Head>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="text-xs font-extrabold tracking-widest text-white/60">BELAJAR</div>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Progress</h1>

          <div className="mt-6 grid gap-3">
            {rows.map((r) => (
              <div key={r.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-extrabold tracking-widest text-white/60">•{r.subject.toUpperCase()}</div>
                    <div className="mt-1 text-xl font-black text-white">{r.title}</div>
                    <div className="mt-1 text-sm font-bold text-white/70">
                      •VISITED PAGE {r.maxPage}
                      {r.totalHint ? ` •TOTAL HINT ${r.totalHint}` : ""}
                    </div>
                  </div>
                  <Link href={r.route} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                    OPEN
                  </Link>
                </div>

                {r.totalHint ? (
                  <div className="mt-4">
                    <div className="h-3 w-full rounded-full bg-white/10">
                      <div className="h-3 rounded-full bg-white/45" style={{ width: `${r.pct}%` }} />
                    </div>
                    <div className="mt-2 text-xs font-extrabold tracking-widest text-white/60">•{r.pct}%</div>
                  </div>
                ) : null}
              </div>
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
