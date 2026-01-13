import Link from "next/link";

export default function LearnHome() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/55 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img src="/rofik-logo.svg" alt="ROFIK" className="h-7 w-auto sm:h-8" />
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-wide">LEARN ASTRONOMY</div>
              <div className="text-xs text-white/60">CHAPTERS</div>
            </div>
          </div>

          <Link
            href="/"
            className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/85 hover:bg-white/10"
          >
            HOME
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-14 pt-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <h1 className="text-3xl font-black tracking-tight">LEARNING MENU</h1>
          <p className="mt-2 text-sm text-white/70">•CHAPTER 1 AVAILABLE</p>

          <Link
            href="/learn/solar-system/1"
            className="mt-6 block rounded-3xl border border-white/10 bg-slate-950/30 p-5 shadow-soft hover:bg-slate-950/40"
          >
            <div className="text-xs font-extrabold tracking-widest text-white/60">CHAPTER 1</div>
            <div className="mt-2 text-xl font-black">SOLAR SYSTEM</div>
            <div className="mt-2 text-sm text-white/70">•MULTI PAGES •WITH IMAGE</div>

            <img
              src="/learn/solar-system/solar-system.svg"
              alt="Solar System"
              className="mt-4 w-full rounded-2xl border border-white/10"
            />

            <div className="mt-4 inline-flex rounded-2xl bg-sky-500/90 px-4 py-2 text-sm font-black text-slate-950">
              START
            </div>
          </Link>
        </div>
      </section>
    </main>
  );
}
