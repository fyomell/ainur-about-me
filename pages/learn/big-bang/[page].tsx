import { makeLessonImage } from "@/lib/learn/makeLessonImage";
import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { BIG_BANG_TOTAL, getBigBangPage, type LearnPage } from "@/lib/learn/bigBang";

export default function BigBangLesson({ lesson }: { lesson: LearnPage }) {
  const page = lesson.page;
  const total = BIG_BANG_TOTAL;
  const prev = page > 1 ? `/learn/big-bang/${page - 1}` : null;
  const next = page < total ? `/learn/big-bang/${page + 1}` : null;
  const progress = Math.round((page / total) * 100);

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/55 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <img src="/rofik-logo.svg" alt="ROFIK" className="h-7 w-auto sm:h-8" />
            <div className="min-w-0 leading-tight">
              <div className="truncate text-sm font-extrabold tracking-wide">
                BAB 2 • BIG BANG • HALAMAN {page}/{total}
              </div>
              <div className="text-xs text-white/60">•DETAIL •RINCI •TANPA BAHAS AGAMA</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link
              href="/learn"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/85 hover:bg-white/10"
            >
              MENU
            </Link>
            <Link
              href="/"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/85 hover:bg-white/10"
            >
              HOME
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 pb-3">
          <div className="h-2 w-full rounded-full border border-white/10 bg-slate-950/40">
            <div className="h-full rounded-full bg-sky-500/80" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 text-xs text-white/60">•PROGRESS {progress}%</div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-14 pt-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="text-xs font-extrabold tracking-widest text-white/60">
            BAB 2 • HALAMAN {page}/{total}
          </div>
          <h1 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">{lesson.title}</h1>

          <img src={lesson.image} alt="Big Bang" className="mt-5 w-full rounded-2xl border border-white/10" />

          <div className="mt-6 space-y-6">
            {lesson.sections.map((s) => (
              <div key={s.heading} className="rounded-3xl border border-white/10 bg-slate-950/30 p-5">
                <div className="text-xs font-extrabold tracking-widest text-white/60">{s.heading}</div>
                <div className="mt-3 space-y-3 text-sm leading-relaxed text-white/80">
                  {s.paragraphs.map((p, i) => (
                    <p key={i}>{p}</p>
                  ))}
                </div>

                {s.bullets?.length ? (
                  <div className="mt-4 space-y-2 text-sm text-white/80">
                    {s.bullets.map((b) => (
                      <div key={b}>
                        <span className="mr-2 text-sky-300">•</span>
                        <span className="font-semibold">{b}</span>
                      </div>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-2">
              {prev ? (
                <Link
                  href={prev}
                  className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black text-white/85 hover:bg-white/10"
                >
                  PREV
                </Link>
              ) : (
                <span className="inline-flex items-center justify-center rounded-2xl bg-white/5 px-5 py-3 text-sm font-black text-white/30">
                  PREV
                </span>
              )}

              {next ? (
                <Link
                  href={next}
                  className="inline-flex items-center justify-center rounded-2xl bg-sky-500/90 px-5 py-3 text-sm font-black text-slate-950 shadow-soft hover:bg-sky-400"
                >
                  NEXT
                </Link>
              ) : (
                <span className="inline-flex items-center justify-center rounded-2xl bg-white/5 px-5 py-3 text-sm font-black text-white/30">
                  NEXT
                </span>
              )}
            </div>

            <div className="text-xs text-white/60">•LOMPAT HALAMAN: /1 /2 /3 ... /{total}</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Array.from({ length: BIG_BANG_TOTAL }, (_, i) => ({
    params: { page: String(i + 1) },
  }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const p = Number(ctx.params?.page);
  const lesson = getBigBangPage(p);
  if (!lesson) return { notFound: true };
  return { props: { lesson } };
};
