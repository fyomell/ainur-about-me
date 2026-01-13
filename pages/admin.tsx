import type { GetServerSideProps } from "next";
import { useEffect, useState } from "react";
import Link from "next/link";
import { DEFAULT_TRACKS, LS_KEY, type Track } from "@/lib/music";

function hasAdminCookie(cookieHeader: string | undefined) {
  const c = cookieHeader || "";
  return c.split(";").some((x) => x.trim() === "rofik_admin=1");
}

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  if (!hasAdminCookie(req.headers.cookie)) {
    return { redirect: { destination: "/admin-login", permanent: false } };
  }
  return { props: {} };
};

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
  const [tracks, setTracks] = useState<Track[]>(DEFAULT_TRACKS);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");

  useEffect(() => {
    setTracks(load());
  }, []);

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

  const logout = async () => {
    await fetch("/api/admin/logout");
    window.location.href = "/";
  };

  const onPickAudio = (file?: File | null) => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    const name = file.name.replace(/\.(mp3|wav|m4a|ogg|aac)$/i, "");
    setTitle(name);
    setUrl(objectUrl);
    alert("Audio dari HP siap dipakai •Klik ADD •Catatan: ini bisa hilang kalau refresh (objectURL)");
  };

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/55 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <img src="/rofik-logo.svg" alt="ROFIK" className="h-7 w-auto sm:h-8" />
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-wide">ADMIN MUSIC</div>
              <div className="text-xs text-white/60">•ADD URL MP3 •ATAU PICK DARI HP</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={logout}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10"
            >
              LOGOUT
            </button>
            <Link
              href="/"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10"
            >
              HOME
            </Link>
          </div>
        </div>
      </header>

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
              placeholder="URL MP3 / atau hasil pick file"
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            <button
              onClick={add}
              className="rounded-2xl bg-sky-500/90 px-5 py-2.5 text-sm font-black text-slate-950 hover:bg-sky-400"
            >
              ADD
            </button>

            <label className="cursor-pointer rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-black hover:bg-white/10">
              PICK AUDIO (HP)
              <input
                type="file"
                accept="audio/*"
                className="hidden"
                onChange={(e) => onPickAudio(e.target.files?.[0])}
              />
            </label>

            <button
              onClick={() => save(DEFAULT_TRACKS)}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-black hover:bg-white/10"
            >
              RESET DEFAULT
            </button>
          </div>

          <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-xs text-white/60">
            •UPLOAD LANGSUNG DARI HP (PICK AUDIO) ITU BISA PLAY •TAPI OBJECTURL BISA HILANG KALAU REFRESH<br/>
            •BIAR PERMANEN DI VERCEL: TARUH MP3 DI public/music LALU PUSH GITHUB •PAKE URL: /music/nama.mp3
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

        </div>
      </section>
    </main>
  );
}
