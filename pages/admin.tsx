import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Drawer, MenuButton, type DrawerItem } from "@/components/Drawer";
import { DEFAULT_TRACKS, LS_KEY, type Track } from "@/lib/music";

function load(): Track[] {
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return DEFAULT_TRACKS;
    const x = JSON.parse(raw) as Track[];
    return Array.isArray(x) ? x : DEFAULT_TRACKS;
  } catch {
    return DEFAULT_TRACKS;
  }
}

export default function Admin() {
  const [open, setOpen] = useState(false);
  const [tracks, setTracks] = useState<Track[]>(DEFAULT_TRACKS);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    setTracks(load());
  }, []);

  const items: DrawerItem[] = useMemo(
    () => [
      { label: "HOME", href: "/" },
      { label: "BELAJAR", href: "/learn" },
      { label: "CREATE CARD", href: "/card" },
      { label: "CONTACT", href: "/#contact" },
      { label: "ADMIN MUSIC", href: "/admin" },
    ],
    []
  );

  const save = (list: Track[]) => {
    setTracks(list);
    localStorage.setItem(LS_KEY, JSON.stringify(list));
    alert("Saved ✅");
  };

  const add = () => {
    if (!title.trim() || !url.trim()) return alert("Isi title + url dulu");
    const list = [{ title: title.trim(), url: url.trim() }, ...tracks];
    setTitle("");
    setUrl("");
    save(list);
  };

  const remove = (i: number) => {
    const list = tracks.filter((_, idx) => idx !== i);
    save(list.length ? list : DEFAULT_TRACKS);
  };

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/55 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <img src="/rofik-logo.svg" alt="ROFIK" className="h-7 w-auto sm:h-8" />
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-wide">ADMIN MUSIC</div>
              <div className="text-xs text-white/60">•ADD URL MP3 •LOCAL STORAGE</div>
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
          <div className="text-xs font-extrabold tracking-widest text-white/60">ADD TRACK</div>

          <div className="mt-4 grid gap-3 md:grid-cols-3">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm font-bold outline-none focus:border-sky-400/60"
              placeholder="Title"
            />
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm font-bold outline-none focus:border-sky-400/60 md:col-span-2"
              placeholder="https://...mp3"
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={add}
              className="rounded-2xl bg-sky-500/90 px-5 py-2.5 text-sm font-black text-slate-950 hover:bg-sky-400"
            >
              ADD
            </button>
            <button
              onClick={() => save(DEFAULT_TRACKS)}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-black hover:bg-white/10"
            >
              RESET DEFAULT
            </button>
          </div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/30 p-5">
            <div className="text-xs font-extrabold tracking-widest text-white/60">TRACKS</div>
            <div className="mt-4 space-y-2">
              {tracks.map((t, i) => (
                <div key={t.title + i} className="rounded-2xl border border-white/10 bg-white/5 p-4">
                  <div className="text-sm font-black">•{t.title}</div>
                  <div className="mt-1 break-all text-xs text-white/60">{t.url || "•NO URL"}</div>
                  <button
                    onClick={() => remove(i)}
                    className="mt-3 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-xs font-black hover:bg-white/10"
                  >
                    REMOVE
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 text-xs text-white/60">
            •CATATAN: ini belum secure (siapa aja bisa buka /admin). Nanti kalau kamu mau, kita bikin auth beneran.
          </div>
        </div>
      </section>
    </main>
  );
}
