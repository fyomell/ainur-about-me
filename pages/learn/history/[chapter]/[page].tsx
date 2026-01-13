import type { GetServerSideProps } from "next";
import Head from "next/head";
import Link from "next/link";
import { getChapter } from "@/lib/learn/chapters";
import { makeLessonImage } from "@/lib/learn/makeLessonImage";

type Props = { chapterKey: string; page: number };

export const getServerSideProps: GetServerSideProps<Props> = async (ctx) => {
  const chapterKey = String(ctx.params?.chapter || "");
  const raw = String(ctx.params?.page || "1");
  const page = Math.max(1, parseInt(raw, 10) || 1);

  const chapter = getChapter("history", chapterKey);
  if (!chapter) {
    return { redirect: { destination: "/learn/history", permanent: false } };
  }

  const max = chapter.pages.length;
  const p = Math.min(max, page);

  if (p !== page) {
    return {
      redirect: { destination: `/learn/history/${chapterKey}/${p}`, permanent: false },
    };
  }

  return { props: { chapterKey, page: p } };
};

export default function HistoryReader({ chapterKey, page }: Props) {
  const chapter = getChapter("history", chapterKey)!;
  const total = chapter.pages.length;
  const data = chapter.pages[page - 1];

  const progress = Math.round((page / total) * 100);
  const prev = page > 1 ? page - 1 : 1;
  const next = page < total ? page + 1 : total;

  const imgSrc = data.image || makeLessonImage(`history-${chapterKey}`, page, data.title);

  return (
    <>
      <Head>
        <title>{chapter.title} • {data.title} • {page}/{total}</title>
      </Head>

      <main className="min-h-screen">
        <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/55 backdrop-blur">
          <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
            <div className="min-w-0">
              <div className="text-xs font-extrabold tracking-widest text-white/60">SEJARAH DUNIA</div>
              <div className="truncate text-sm font-black">{chapter.title}</div>
              <div className="truncate text-xs text-white/60">HALAMAN {page}/{total}</div>
            </div>
            <div className="flex gap-2">
              <Link href="/learn/history" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                MENU
              </Link>
              <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                HOME
              </Link>
            </div>
          </div>

          <div className="mx-auto max-w-5xl px-4 pb-3">
            <div className="h-3 w-full rounded-full bg-white/10">
              <div className="h-3 rounded-full bg-white/45" style={{ width: `${progress}%` }} />
            </div>
            <div className="mt-2 text-xs font-extrabold text-white/60">•PROGRESS {progress}%</div>
          </div>
        </header>

        <section className="mx-auto max-w-5xl px-4 pb-14 pt-8">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
            <div className="text-xs font-extrabold tracking-widest text-white/60">
              {chapter.desc}
            </div>
            <h1 className="mt-2 text-3xl font-black tracking-tight">{data.title}</h1>

            <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/30">
              <img key={`${chapterKey}-${page}`} src={imgSrc} alt={data.title} className="h-auto w-full" />
            </div>

            <div className="mt-6 space-y-4">
              {data.blocks.map((b) => (
                <div key={b.heading} className="rounded-3xl border border-white/10 bg-slate-950/30 p-5">
                  <div className="text-xs font-extrabold tracking-widest text-white/60">{b.heading.toUpperCase()}</div>
                  <div className="mt-3 space-y-2 text-sm text-white/80">
                    {b.bullets.map((x) => (
                      <div key={x}>•{x}</div>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 flex items-center justify-between gap-3">
              <Link href={`/learn/history/${chapterKey}/${prev}`} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-black hover:bg-white/10">
                PREV
              </Link>
              <Link href={`/learn/history/${chapterKey}/${next}`} className="rounded-2xl bg-white/15 px-5 py-2.5 text-sm font-black hover:bg-white/20">
                NEXT
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
