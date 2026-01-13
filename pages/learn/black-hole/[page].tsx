import type { GetStaticPaths, GetStaticProps } from "next";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Drawer, MenuButton, type DrawerItem } from "@/components/Drawer";
import { BLACK_HOLE_TOTAL, getBlackHolePage, type LearnPage } from "@/lib/learn/blackHole";
import { makeLessonImage } from "@/lib/learn/makeLessonImage";

export default function BlackHoleLesson({ lesson }: { lesson: LearnPage }) {
  const [open, setOpen] = useState(false);

  const page = lesson.page;
  const total = BLACK_HOLE_TOTAL;
  const prev = page > 1 ? `/learn/black-hole/${page - 1}` : null;
  const next = page < total ? `/learn/black-hole/${page + 1}` : null;
  const progress = Math.round((page / total) * 100);

  const items: DrawerItem[] = useMemo(
    () => [
      { label: "HOME", href: "/" },
      { label: "BELAJAR", href: "/learn" },
      { label: "BAB 1 • TATA SURYA", href: "/learn/solar-system/1" },
      { label: "BAB 2 • BIG BANG", href: "/learn/big-bang/1" },
      { label: "BAB 3 • BLACK HOLE", href: "/learn/black-hole/1" },
      { label: "CREATE CARD", href: "/card" },
      { label: "CONTACT", href: "/#contact" },
      { label: "ADMIN MUSIC", href: "/admin" },
    ],
    []
  );

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/55 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 items-center gap-3">
            <div className="sm:hidden">
              <MenuButton onClick={() => setOpen(true)} />
            </div>
            <img src="/rofik-logo.svg" alt="ROFIK" className="hidden h-7 w-auto sm:block sm:h-8" />
            <div className="min-w-0 leading-tight">
              <div className="truncate text-sm font-extrabold tracking-wide">
                BAB 3 • BLACK HOLE • HALAMAN {page}/{total}
              </div>
              <div className="text-xs text-white/60">•DETAIL •RINCI</div>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <Link href="/learn" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold hover:bg-white/10">
              MENU
            </Link>
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold hover:bg-white/10">
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

      <Drawer open={open} onClose={() => setOpen(false)} items={items} />

      <section className="mx-auto max-w-5xl px-4 pb-14 pt-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="text-xs font-extrabold tracking-widest text-white/60">
            BAB 3 • HALAMAN {page}/{total}
          </div>
          <h1 className="mt-2 text-2xl font-black tracking-tight md:text-3xl">{lesson.title}</h1>

          <img
            src={makeLessonImage("blackhole", page, lesson.title)}
            alt="Black Hole"
            className="mt-5 w-full rounded-2xl border border-white/10"
          />

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
                <Link href={prev} className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black hover:bg-white/10">
                  PREV
                </Link>
              ) : (
                <span className="rounded-2xl bg-white/5 px-5 py-3 text-sm font-black text-white/30">PREV</span>
              )}

              {next ? (
                <Link href={next} className="rounded-2xl bg-sky-500/90 px-5 py-3 text-sm font-black text-slate-950 hover:bg-sky-400">
                  NEXT
                </Link>
              ) : (
                <span className="rounded-2xl bg-white/5 px-5 py-3 text-sm font-black text-white/30">NEXT</span>
              )}
            </div>

            <div className="text-xs text-white/60">•LOMPAT: /1 /2 /3 ... /{total}</div>
          </div>
        </div>
      </section>
    </main>
  );
}

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = Array.from({ length: BLACK_HOLE_TOTAL }, (_, i) => ({ params: { page: String(i + 1) } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const p = Number(ctx.params?.page);
  const lesson = getBlackHolePage(p);
  if (!lesson) return { notFound: true };
  return { props: { lesson } };
};
