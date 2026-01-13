import Head from "next/head";
import Link from "next/link";

const chapters = [
  {
    title: "Bab 1",
    name: "Tata Surya",
    href: "/learn/solar-system/1",
    desc: "Planet • Orbit • Matahari • Struktur tata surya",
  },
  {
    title: "Bab 2",
    name: "Big Bang",
    href: "/learn/big-bang/1",
    desc: "Asal usul alam semesta • Ekspansi • Bukti ilmiah",
  },
  {
    title: "Bab 3",
    name: "Black Hole",
    href: "/learn/black-hole/1",
    desc: "Event horizon • Gravitasi • Relativitas • Jenis black hole",
  },
];

export default function AstronomyIndex() {
  return (
    <>
      <Head>
        <title>Belajar • Astronomi</title>
      </Head>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="text-xs font-extrabold tracking-widest text-white/60">
            BELAJAR
          </div>
          <h1 className="mt-3 text-3xl font-black tracking-tight text-white">
            Astronomi
          </h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
            Pilih bab Astronomi
          </p>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {chapters.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft transition hover:bg-white/10 active:scale-[0.99]"
              >
                <div className="text-xs font-extrabold tracking-widest text-white/60">
                  {c.title}
                </div>
                <div className="mt-2 text-2xl font-black text-white">
                  {c.name}
                </div>
                <div className="mt-2 text-sm text-white/70">{c.desc}</div>
              </Link>
            ))}
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
