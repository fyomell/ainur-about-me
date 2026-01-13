import Link from "next/link";

function Card({ title, desc, href }: { title: string; desc: string; href: string }) {
  return (
    <Link href={href} className="block rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur hover:bg-white/10">
      <div className="text-xs font-extrabold tracking-widest text-white/60">{title}</div>
      <div className="mt-2 text-lg font-black">{desc}</div>
      <div className="mt-3 text-sm font-bold text-sky-300">•OPEN</div>
    </Link>
  );
}

export default function LearnMenu() {
  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/55 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="text-sm font-extrabold">BELAJAR ASTRONOMI</div>
          <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
            HOME
          </Link>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-14 pt-8">
        <div className="grid gap-5 md:grid-cols-2">
          <Card title="BAB 1" desc="TATA SURYA" href="/learn/solar-system/1" />
          <Card title="BAB 2" desc="BIG BANG" href="/learn/big-bang/1" />
          <Card title="BAB 3" desc="BLACK HOLE" href="/learn/black-hole/1" />
          <Card title="BAB 4" desc="3 BINTANG SEJAJAR" href="/learn/three-stars/1" />
        </div>
      </section>
    </main>
  );
}
