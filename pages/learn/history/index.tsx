import Head from "next/head";
import Link from "next/link";

export default function HistoryIndex() {
  return (
    <>
      <Head>
        <title>Belajar • Sejarah Dunia</title>
      </Head>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="text-xs font-extrabold tracking-widest text-white/60">
            BELAJAR
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white">
            Sejarah Dunia
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
            Materi sejarah dunia dibuat model halaman
            Jadi enak dibaca pelan pelan
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Link
              href="/learn/history/british-empire/1"
              className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft transition hover:bg-white/10 active:scale-[0.99]"
            >
              <div className="text-xs font-extrabold tracking-widest text-white/60">
                BAB 1
              </div>
              <div className="mt-2 text-2xl font-black text-white">
                Kekaisaran Britania Raya
              </div>
              <div className="mt-2 text-sm text-white/70">
                Asal usul • Puncak wilayah • Sistem kolonial • Tokoh • Dampak
              </div>
              <div className="mt-4 text-xs font-extrabold tracking-widest text-white/60">
                MASUK HALAMAN 1
              </div>
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/learn"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black text-white/90 shadow-soft hover:bg-white/10 active:scale-[0.98]"
            >
              KEMBALI
            </Link>
            <Link
              href="/"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black text-white/90 shadow-soft hover:bg-white/10 active:scale-[0.98]"
            >
              HOME
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
