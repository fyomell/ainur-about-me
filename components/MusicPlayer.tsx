import { useEffect, useMemo, useRef, useState } from "react";
import { DEFAULT_TRACKS, LS_KEY, type Track } from "@/lib/music";

function loadTracks(): Track[] {
  if (typeof window === "undefined") return DEFAULT_TRACKS;
  try {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return DEFAULT_TRACKS;
    const data = JSON.parse(raw) as Track[];
    if (!Array.isArray(data)) return DEFAULT_TRACKS;
    return data.length ? data : DEFAULT_TRACKS;
  } catch {
    return DEFAULT_TRACKS;
  }
}

export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const [open, setOpen] = useState(false);
  const [tracks, setTracks] = useState<Track[]>(DEFAULT_TRACKS);
  const [idx, setIdx] = useState(0);
  const [playing, setPlaying] = useState(false);

  useEffect(() => {
    setTracks(loadTracks());
    const onStorage = () => setTracks(loadTracks());
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const current = useMemo(() => tracks[idx] ?? tracks[0], [tracks, idx]);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.pause();
    setPlaying(false);
    if (current?.url) audioRef.current.src = current.url;
  }, [current?.url]);

  const toggle = async () => {
    const a = audioRef.current;
    if (!a) return;
    if (!current?.url) {
      setOpen(true);
      return;
    }
    if (playing) {
      a.pause();
      setPlaying(false);
    } else {
      try {
        await a.play();
        setPlaying(true);
      } catch {
        setOpen(true);
      }
    }
  };

  const next = () => setIdx((x) => (x + 1) % Math.max(tracks.length, 1));
  const prev = () => setIdx((x) => (x - 1 + Math.max(tracks.length, 1)) % Math.max(tracks.length, 1));

  return (
    <>
      <audio ref={(el) => (audioRef.current = el)} preload="none" />
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-5 right-5 z-40 rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-white/90 shadow-soft backdrop-blur hover:bg-white/15 active:scale-[0.98]"
      >
        MUSIC
      </button>

      {open ? (
        <div className="fixed inset-0 z-50">
          <div className="absolute inset-0 bg-black/60" onClick={() => setOpen(false)} />
          <div className="absolute bottom-0 left-0 right-0 mx-auto max-w-2xl rounded-t-3xl border-t border-white/10 bg-slate-950/90 p-5 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="text-sm font-extrabold tracking-wide">MUSIC PLAYER</div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold hover:bg-white/10"
              >
                CLOSE
              </button>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-extrabold tracking-widest text-white/60">NOW PLAYING</div>
              <div className="mt-2 text-lg font-black">{current?.title || "NO TRACK"}</div>
              <div className="mt-3 flex gap-2">
                <button
                  onClick={prev}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10"
                >
                  PREV
                </button>
                <button
                  onClick={toggle}
                  className="rounded-2xl bg-sky-500/90 px-4 py-2 text-sm font-black text-slate-950 hover:bg-sky-400"
                >
                  {playing ? "PAUSE" : "PLAY"}
                </button>
                <button
                  onClick={next}
                  className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10"
                >
                  NEXT
                </button>
              </div>
              <div className="mt-3 text-xs text-white/60">
                •KAMU BISA TAMBAH TRACK DI /admin •PAKE URL MP3
              </div>
            </div>

            <div className="mt-4 rounded-3xl border border-white/10 bg-white/5 p-4">
              <div className="text-xs font-extrabold tracking-widest text-white/60">PLAYLIST</div>
              <div className="mt-3 space-y-2">
                {tracks.map((t, i) => (
                  <button
                    key={t.title + i}
                    onClick={() => setIdx(i)}
                    className={`w-full rounded-2xl border border-white/10 px-4 py-3 text-left text-sm font-bold hover:bg-white/10 ${
                      i === idx ? "bg-white/10" : "bg-white/5"
                    }`}
                  >
                    •{t.title || "UNTITLED"} {t.url ? "" : "•NO URL YET"}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}
