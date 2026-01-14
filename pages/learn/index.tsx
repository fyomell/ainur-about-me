import Head from "next/head";
import Link from "next/link";

export default function LearnHome() {
  return (
    <>
      <Head>
        <title>Belajar</title>
      </Head>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="text-xs font-extrabold tracking-widest text-white/60">
            MENU BELAJAR
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white">
            Pilih Mata Pelajaran
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
            Pilih mapel dulu biar Astronomi dan Sejarah Dunia kepisah rapi
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <Link
              href="/learn/astronomy"
              className="group rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft transition hover:bg-white/10 active:scale-[0.99]"
            >
              <div className="text-xs font-extrabold tracking-widest text-white/60">
                MAPEL
              </div>
              <div className="mt-2 text-2xl font-black text-white">
                Astronomi
              </div>
              <div className="mt-2 text-sm text-white/70">
                Bab Tata Surya
                Bab Big Bang
                Bab Black Hole
              </div>
              <div className="mt-4 text-xs font-extrabold tracking-widest text-white/60">
                KLIK UNTUK MASUK
              </div>
            </Link>

            <Link
              href="/learn/history"
              className="group rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft transition hover:bg-white/10 active:scale-[0.99]"
            >
              <div className="text-xs font-extrabold tracking-widest text-white/60">
                MAPEL
              </div>
              <div className="mt-2 text-2xl font-black text-white">
                Sejarah Dunia
              </div>
              <div className="mt-2 text-sm text-white/70">
                Bab Kekaisaran Britania Raya
              </div>
              <div className="mt-4 text-xs font-extrabold tracking-widest text-white/60">
                KLIK UNTUK MASUK
              </div>
            </Link>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <Link
              href="/"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black text-white/90 shadow-soft hover:bg-white/10 active:scale-[0.98]"
            >
              HOME
            </Link>
          </div>
        </div>
      
      <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft">
        <div className="text-xs font-extrabold tracking-widest text-white/60">BAB PRIVAT</div>
        <div className="mt-2 text-lg font-black text-white">TENTANG BUKU</div>
        <div className="mt-1 text-sm font-black text-white/80">A World Without Islam</div>
        <div className="mt-2 text-sm leading-relaxed text-white/70">
          Bab ini butuh jawaban pertanyaan sebelum bisa dibuka.
        </div>
        <Link href="/learn/private/1" className="mt-4 inline-flex rounded-2xl border border-white/10 bg-white/10 px-4 py-2 text-sm font-black text-white/90 hover:bg-white/15">
          BUKA BAB PRIVAT
        </Link>
      </div>

</main>
    </>
  );
}
