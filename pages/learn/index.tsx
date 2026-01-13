import { useMemo, useState } from "react";
import Link from "next/link";
import { Drawer, MenuButton, type DrawerItem } from "@/components/Drawer";
import { makeLessonImage } from "@/lib/learn/makeLessonImage";

export default function BelajarHome() {
  const [open, setOpen] = useState(false);

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
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <img src="/rofik-logo.svg" alt="ROFIK" className="h-7 w-auto sm:h-8" />
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-wide">BELAJAR ASTRONOMI</div>
              <div className="text-xs text-white/60">•CHAPTERS •MULTI PAGE</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="sm:hidden">
              <MenuButton onClick={() => setOpen(true)} />
            </div>
            <Link
              href="/"
              className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/85 hover:bg-white/10 sm:inline-flex"
            >
              HOME
            </Link>
          </div>
        </div>
      </header>

      <Drawer open={open} onClose={() => setOpen(false)} items={items} />

      <section className="mx-auto max-w-5xl px-4 pb-14 pt-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <h1 className="text-3xl font-black tracking-tight">MENU BELAJAR</h1>
          <p className="mt-2 text-sm text-white/70">•PILIH BAB •TIAP HALAMAN ADA GAMBAR BERBEDA</p>

          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <Link
              href="/learn/solar-system/1"
              className="group block rounded-3xl border border-white/10 bg-slate-950/30 p-5 shadow-soft hover:bg-slate-950/40"
            >
              <div className="text-xs font-extrabold tracking-widest text-white/60">BAB 1</div>
              <div className="mt-2 text-xl font-black">TATA SURYA</div>
              <div className="mt-2 text-sm text-white/70">•20 HALAMAN •DETAIL</div>
              <img
                src={makeLessonImage("solar", 1, "TATA SURYA")}
                alt="Solar System"
                className="mt-4 w-full rounded-2xl border border-white/10"
              />
              <div className="mt-4 inline-flex rounded-2xl bg-sky-500/90 px-4 py-2 text-sm font-black text-slate-950 transition group-hover:bg-sky-400">
                START
              </div>
            </Link>

            <Link
              href="/learn/big-bang/1"
              className="group block rounded-3xl border border-white/10 bg-slate-950/30 p-5 shadow-soft hover:bg-slate-950/40"
            >
              <div className="text-xs font-extrabold tracking-widest text-white/60">BAB 2</div>
              <div className="mt-2 text-xl font-black">BIG BANG</div>
              <div className="mt-2 text-sm text-white/70">•21 HALAMAN •BUKTI</div>
              <img
                src={makeLessonImage("bigbang", 1, "BIG BANG")}
                alt="Big Bang"
                className="mt-4 w-full rounded-2xl border border-white/10"
              />
              <div className="mt-4 inline-flex rounded-2xl bg-sky-500/90 px-4 py-2 text-sm font-black text-slate-950 transition group-hover:bg-sky-400">
                START
              </div>
            </Link>

            <Link
              href="/learn/black-hole/1"
              className="group block rounded-3xl border border-white/10 bg-slate-950/30 p-5 shadow-soft hover:bg-slate-950/40 md:col-span-2"
            >
              <div className="text-xs font-extrabold tracking-widest text-white/60">BAB 3</div>
              <div className="mt-2 text-xl font-black">BLACK HOLE</div>
              <div className="mt-2 text-sm text-white/70">•21 HALAMAN •EHT •LIGO •AKRESI</div>
              <img
                src={makeLessonImage("blackhole", 1, "BLACK HOLE")}
                alt="Black Hole"
                className="mt-4 w-full rounded-2xl border border-white/10"
              />
              <div className="mt-4 inline-flex rounded-2xl bg-sky-500/90 px-4 py-2 text-sm font-black text-slate-950 transition group-hover:bg-sky-400">
                START
              </div>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
