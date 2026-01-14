import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import PrivateGate from "../../../components/PrivateGate";
import { PRIVATE_BOOK_TITLE, PRIVATE_PAGES } from "../../../lib/book/private_book";
import { bookImage } from "../../../lib/book/illustrations";

export default function PrivatePage() {
  const router = useRouter();
  const p = Array.isArray(router.query.page) ? router.query.page[0] : router.query.page;
  const pageNum = Math.max(1, parseInt(String(p || "1"), 10) || 1);

  const total = PRIVATE_PAGES.length;
  const idx = Math.min(total - 1, pageNum - 1);
  const page = PRIVATE_PAGES[idx];

  const progress = Math.round(((idx + 1) / total) * 100);
  const img = bookImage(page.imageSeed, page.title, "history");

  const prev = idx > 0 ? idx : null;
  const next = idx < total - 1 ? idx + 2 : null;

  return (
    <>
      <Head>
        <title>{page.title} • Bab Privat</title>
      </Head>

      <PrivateGate>
        <main className="mx-auto max-w-5xl px-4 pb-16 pt-8">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-extrabold tracking-widest text-white/60">BAB PRIVAT</div>
              <div className="mt-1 text-sm font-bold text-white/70">{PRIVATE_BOOK_TITLE}</div>
            </div>

            <div className="flex gap-2">
              <Link href="/learn" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black text-white/80">
                MENU BELAJAR
              </Link>
              <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black text-white/80">
                HOME
              </Link>
            </div>
          </div>

          <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft">
            <div className="flex items-center justify-between gap-3 text-xs font-extrabold tracking-widest text-white/60">
              <div>HALAMAN {idx + 1}/{total}</div>
              <div>PROGRESS {progress}%</div>
            </div>
            <div className="mt-3 h-3 w-full rounded-full bg-white/10">
              <div className="h-3 rounded-full bg-white/35" style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="mt-5 rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
            <h1 className="text-3xl font-black text-white">{page.title}</h1>

            <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-black/20">
              <img src={img} alt={page.title} className="h-auto w-full" />
            </div>

            <div className="mt-5 space-y-4 text-white/80">
              {page.intro.map((t, i) => (
                <p key={i} className="leading-relaxed">{t}</p>
              ))}
            </div>

            <div className="mt-6 space-y-5">
              {page.sections.map((sec, i) => (
                <div key={i} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                  <div className="text-xs font-extrabold tracking-widest text-white/60">{sec.heading.toUpperCase()}</div>
                  <div className="mt-3 space-y-3 text-white/80">
                    {sec.paragraphs.map((pp, j) => (
                      <p key={j} className="leading-relaxed">{pp}</p>
                    ))}
                    {sec.bullets && (
                      <div className="mt-3 space-y-1 text-sm font-bold text-white/80">
                        {sec.bullets.map((b, k) => (
                          <div key={k}>{b}</div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-extrabold tracking-widest text-white/60">RINGKASAN</div>
                <div className="mt-3 space-y-1 text-sm font-bold text-white/80">
                  {page.summaryBullets.map((x, i) => <div key={i}>{x}</div>)}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-extrabold tracking-widest text-white/60">ISTILAH KUNCI</div>
                <div className="mt-3 space-y-1 text-sm font-bold text-white/80">
                  {page.keyTerms.map((x, i) => <div key={i}>{x}</div>)}
                </div>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-extrabold tracking-widest text-white/60">KUIS CEPAT</div>
                <div className="mt-3 space-y-3 text-sm text-white/80">
                  {page.quiz.map((q, i) => (
                    <div key={i} className="rounded-2xl border border-white/10 bg-white/5 p-3">
                      <div className="font-black">{q.q}</div>
                      <div className="mt-1 text-white/75">{q.a}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              {prev ? (
                <Link href={`/learn/private/${prev}`} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black text-white/80">
                  SEBELUMNYA
                </Link>
              ) : (
                <Link href="/learn/private" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black text-white/80">
                  AWAL BAB
                </Link>
              )}

              {next ? (
                <Link href={`/learn/private/${next}`} className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-white/90 hover:bg-white/15">
                  LANJUT
                </Link>
              ) : (
                <Link href="/learn" className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-white/90 hover:bg-white/15">
                  SELESAI • KEMBALI
                </Link>
              )}
            </div>
          </div>
        </main>
      </PrivateGate>
    </>
  );
}
