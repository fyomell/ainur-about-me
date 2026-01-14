import Head from "next/head";
import Link from "next/link";
import { Book, getBookImage } from "../../lib/book/books";

export default function BookPageView(props: { book: Book; pageIndex: number; basePath: string; homeLabel?: string }) {
  const { book, pageIndex, basePath } = props;
  const page = book.pages[pageIndex];
  const mode = book.id.startsWith("history:") ? "history" : "space";
  const total = book.pages.length;

  const prev = pageIndex > 0 ? `${basePath}/${pageIndex}` : null;
  const next = pageIndex < total - 1 ? `${basePath}/${pageIndex + 2}` : null;

  return (
    <>
      <Head>
        <title>{book.subjectLabel} • {page.title} • {pageIndex + 1}/{total}</title>
      </Head>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs font-extrabold tracking-widest text-white/60">
                •{book.subjectLabel} •{book.bookTitle} •HALAMAN {pageIndex + 1}/{total}
              </div>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-white">{page.title}</h1>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link href="/learn" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                MENU BELAJAR
              </Link>
              <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                HOME
              </Link>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-3 w-full rounded-full bg-white/10">
              <div className="h-3 rounded-full bg-white/45" style={{ width: `${Math.round(((pageIndex + 1) / total) * 100)}%` }} />
            </div>
            <div className="mt-2 text-xs font-extrabold tracking-widest text-white/60">
              •PROGRESS {Math.round(((pageIndex + 1) / total) * 100)}%
            </div>
          </div>

          {/* Image */}
          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40">
            <img src={getBookImage(page, mode)} alt={page.title} className="h-auto w-full" />
          </div>

          {/* Intro */}
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs font-extrabold tracking-widest text-white/60">PENJELASAN AWAL</div>
            <div className="mt-3 space-y-4 text-sm font-bold leading-relaxed text-white/80">
              {page.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          {/* Sections */}
          <div className="mt-6 space-y-4">
            {page.sections.map((s, idx) => (
              <div key={idx} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-extrabold tracking-widest text-white/60">SUBJUDUL {idx + 1}</div>
                <h2 className="mt-2 text-xl font-black text-white">{s.heading}</h2>
                <div className="mt-3 space-y-4 text-sm font-bold leading-relaxed text-white/80">
                  {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                {s.bullets?.length ? (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-sm font-black text-white/85">
                    {s.bullets.map((b, i) => <div key={i}>{b}</div>)}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {/* Summary + Key terms */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-extrabold tracking-widest text-white/60">RINGKASAN</div>
              <div className="mt-3 space-y-2 text-sm font-black text-white/85">
                {page.summaryBullets.map((b, i) => <div key={i}>{b}</div>)}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-extrabold tracking-widest text-white/60">KATA KUNCI</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {page.keyTerms.map((k, i) => (
                  <span key={i} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-white/85">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quiz */}
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs font-extrabold tracking-widest text-white/60">LATIHAN</div>
            <div className="mt-4 space-y-3 text-sm font-black text-white/85">
              {page.quiz.map((qa, i) => (
                <details key={i} className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                  <summary className="cursor-pointer">•{qa.q}</summary>
                  <div className="mt-2 text-white/75">•{qa.a}</div>
                </details>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex flex-wrap gap-2">
            {prev ? (
              <Link href={prev} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                PREV
              </Link>
            ) : null}
            {next ? (
              <Link href={next} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                NEXT
              </Link>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}
