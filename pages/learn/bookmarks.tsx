import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { lsGet, lsSet } from "../../lib/local";

type Bookmark = {
  path: string;
  title: string;
  subject: "astronomy" | "history";
  chapter: string;
  page: number;
  savedAt: number;
};

export default function LearnBookmarks() {
  const key = "learn:bookmarks";
  const [list, setList] = useState<Bookmark[]>([]);

  useEffect(() => {
    setList(lsGet<Bookmark[]>(key, []));
  }, []);

  const remove = (path: string) => {
    const next = list.filter((b) => b.path !== path);
    setList(next);
    lsSet(key, next);
  };

  return (
    <>
      <Head><title>Belajar • Bookmarks</title></Head>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="text-xs font-extrabold tracking-widest text-white/60">BELAJAR</div>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Bookmarks</h1>

          <div className="mt-6 grid gap-3">
            {list.length === 0 && (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm font-bold text-white/70">
                •BELUM ADA BOOKMARK
              </div>
            )}

            {list.map((b) => (
              <div key={b.path} className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="min-w-0">
                  <div className="text-xs font-extrabold tracking-widest text-white/60">
                    •{b.subject.toUpperCase()} •{b.chapter.toUpperCase()} •PAGE {b.page}
                  </div>
                  <div className="mt-1 truncate text-lg font-black text-white">{b.title}</div>
                  <div className="mt-1 text-xs font-bold text-white/60">•{b.path}</div>
                </div>
                <div className="flex gap-2">
                  <Link href={b.path} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                    OPEN
                  </Link>
                  <button onClick={() => remove(b.path)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                    DELETE
                  </button>
                </div>
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
