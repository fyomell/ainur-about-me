set -e

mkdir -p lib
mkdir -p lib/learn
mkdir -p components
mkdir -p pages/learn
mkdir -p pages/tools
mkdir -p pages/go

# -------------------------
# lib/local.ts
# -------------------------
cat > lib/local.ts <<'EOT'
export function safeJsonParse<T>(raw: string | null, fallback: T): T {
  try {
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

export function lsGet<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  return safeJsonParse<T>(localStorage.getItem(key), fallback);
}

export function lsSet<T>(key: string, value: T) {
  if (typeof window === "undefined") return;
  localStorage.setItem(key, JSON.stringify(value));
}

export function lsDel(key: string) {
  if (typeof window === "undefined") return;
  localStorage.removeItem(key);
}
EOT

# -------------------------
# lib/learn/index.ts (index untuk search + progress)
# Silakan tambah list kalau bab kamu bertambah
# -------------------------
cat > lib/learn/index.ts <<'EOT'
export type LearnItem = {
  id: string;
  subject: "astronomy" | "history";
  title: string;
  route: string;
  totalHint?: number;
  keywords: string[];
};

export const LEARN_INDEX: LearnItem[] = [
  {
    id: "solar-system",
    subject: "astronomy",
    title: "Tata Surya",
    route: "/learn/solar-system/1",
    totalHint: 20,
    keywords: ["planet", "orbit", "matahari", "tata surya", "moon", "mars", "jupiter"],
  },
  {
    id: "big-bang",
    subject: "astronomy",
    title: "Big Bang",
    route: "/learn/big-bang/1",
    totalHint: 20,
    keywords: ["big bang", "alam semesta", "ekspansi", "inflasi", "redshift", "cmb"],
  },
  {
    id: "black-hole",
    subject: "astronomy",
    title: "Black Hole",
    route: "/learn/black-hole/1",
    totalHint: 20,
    keywords: ["black hole", "event horizon", "gravitasi", "singularitas", "hawking"],
  },
  {
    id: "three-stars",
    subject: "astronomy",
    title: "3 Bintang Sejajar",
    route: "/learn/three-stars/1",
    totalHint: 20,
    keywords: ["bintang", "sejajar", "konstelasi", "orion", "sabuk orion"],
  },
  {
    id: "british-empire",
    subject: "history",
    title: "Kekaisaran Britania Raya",
    route: "/learn/history/british-empire/1",
    totalHint: 60,
    keywords: ["british empire", "koloni", "imperium", "india", "royal navy", "commonwealth"],
  },
];
EOT

# -------------------------
# components/LearnFloatingPanel.tsx
# Floating panel otomatis di semua halaman /learn/*
# -------------------------
cat > components/LearnFloatingPanel.tsx <<'EOT'
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useMemo, useRef, useState } from "react";
import { lsGet, lsSet } from "../lib/local";

type Bookmark = {
  path: string;
  title: string;
  subject: "astronomy" | "history";
  chapter: string;
  page: number;
  savedAt: number;
};

function stripUrl(s: string) {
  return s.split("?")[0].split("#")[0];
}

function parseLearnPath(asPath: string) {
  const path = stripUrl(asPath);
  const parts = path.split("/").filter(Boolean); // ["learn", ...]
  let subject: "astronomy" | "history" = "astronomy";
  let chapter = "learn";
  let page = 1;

  // /learn/solar-system/3
  // /learn/history/british-empire/12
  if (parts[0] === "learn") {
    if (parts[1] === "history") {
      subject = "history";
      chapter = parts[2] || "history";
      const maybe = parseInt(parts[3] || "1", 10);
      page = Number.isFinite(maybe) ? maybe : 1;
    } else {
      subject = "astronomy";
      chapter = parts[1] || "learn";
      const maybe = parseInt(parts[2] || "1", 10);
      page = Number.isFinite(maybe) ? maybe : 1;
    }
  }

  return { path, subject, chapter, page };
}

function speakText(text: string) {
  if (typeof window === "undefined") return;
  if (!("speechSynthesis" in window)) return;

  window.speechSynthesis.cancel();
  const chunk = text.slice(0, 12000);
  const u = new SpeechSynthesisUtterance(chunk);
  u.rate = 1;
  u.pitch = 1;
  u.lang = "id-ID";
  window.speechSynthesis.speak(u);
}

export default function LearnFloatingPanel() {
  const router = useRouter();
  const isLearn = router.asPath.startsWith("/learn");
  const [open, setOpen] = useState(false);

  const meta = useMemo(() => parseLearnPath(router.asPath), [router.asPath]);

  const [fontSize, setFontSize] = useState<number>(16);
  const [focus, setFocus] = useState<boolean>(false);
  const [note, setNote] = useState<string>("");

  const noteKey = `learn:note:${meta.path}`;
  const focusKey = `learn:focus`;
  const fontKey = `learn:fontSize`;
  const bookmarksKey = `learn:bookmarks`;
  const progressKey = `learn:progress:${meta.subject}:${meta.chapter}`;

  const lastMainTextRef = useRef<string>("");

  useEffect(() => {
    if (!isLearn) return;

    setFontSize(lsGet<number>(fontKey, 16));
    setFocus(lsGet<boolean>(focusKey, false));
    setNote(lsGet<string>(noteKey, ""));

    // progress update
    const currentMax = lsGet<number>(progressKey, 0);
    if (meta.page > currentMax) lsSet<number>(progressKey, meta.page);

    // apply CSS variables
    const root = document.documentElement;
    root.style.setProperty("--learn-font-size", `${lsGet<number>(fontKey, 16)}px`);
    root.dataset.learnFocus = lsGet<boolean>(focusKey, false) ? "1" : "0";

    // capture main text for TTS
    const main = document.querySelector("main");
    const txt = (main?.textContent || "").replace(/\s+/g, " ").trim();
    lastMainTextRef.current = txt.slice(0, 20000);
  }, [isLearn, meta.path, meta.page, meta.subject, meta.chapter]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isLearn) return;
    document.documentElement.style.setProperty("--learn-font-size", `${fontSize}px`);
    lsSet<number>(fontKey, fontSize);
  }, [fontSize, isLearn]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isLearn) return;
    document.documentElement.dataset.learnFocus = focus ? "1" : "0";
    lsSet<boolean>(focusKey, focus);
  }, [focus, isLearn]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isLearn) return;
    lsSet<string>(noteKey, note);
  }, [note, isLearn, noteKey]);

  if (!isLearn) return null;

  const title =
    (typeof document !== "undefined" ? document.title : "") ||
    `${meta.subject.toUpperCase()} • ${meta.chapter}`;

  const isBookmarked = () => {
    const list = lsGet<Bookmark[]>(bookmarksKey, []);
    return list.some((b) => b.path === meta.path);
  };

  const toggleBookmark = () => {
    const list = lsGet<Bookmark[]>(bookmarksKey, []);
    const exists = list.find((b) => b.path === meta.path);
    if (exists) {
      lsSet<Bookmark[]>(
        bookmarksKey,
        list.filter((b) => b.path !== meta.path)
      );
      return;
    }
    const b: Bookmark = {
      path: meta.path,
      title,
      subject: meta.subject,
      chapter: meta.chapter,
      page: meta.page,
      savedAt: Date.now(),
    };
    lsSet<Bookmark[]>(bookmarksKey, [b, ...list].slice(0, 300));
  };

  const jumpTo = (p: number) => {
    const parts = meta.path.split("/").filter(Boolean);
    // rebuild path but replace last numeric segment
    const last = parts[parts.length - 1];
    if (/^\d+$/.test(last)) parts[parts.length - 1] = String(p);
    else parts.push(String(p));
    router.push("/" + parts.join("/"));
  };

  return (
    <>
      <style jsx global>{`
        :root {
          --learn-font-size: 16px;
        }
        /* apply font-size only on learn pages */
        body main {
          font-size: var(--learn-font-size);
          line-height: 1.8;
        }
        /* focus mode */
        html[data-learn-focus="1"] header,
        html[data-learn-focus="1"] nav,
        html[data-learn-focus="1"] aside {
          display: none !important;
        }
      `}</style>

      <button
        onClick={() => setOpen((v) => !v)}
        className="fixed bottom-5 left-5 z-[90] rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-white/90 shadow-soft backdrop-blur hover:bg-white/15 active:scale-[0.98]"
      >
        LEARN MENU
      </button>

      {open && (
        <div className="fixed bottom-20 left-5 z-[90] w-[min(92vw,420px)] rounded-3xl border border-white/10 bg-slate-950/80 p-4 shadow-soft backdrop-blur">
          <div className="text-xs font-extrabold tracking-widest text-white/60">
            •{meta.subject.toUpperCase()} •{meta.chapter.toUpperCase()} •PAGE {meta.page}
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <button
              onClick={toggleBookmark}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-black text-white/90 hover:bg-white/10"
            >
              {isBookmarked() ? "UNBOOKMARK" : "BOOKMARK"}
            </button>

            <button
              onClick={() => setFocus((v) => !v)}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-black text-white/90 hover:bg-white/10"
            >
              {focus ? "FOCUS ON" : "FOCUS OFF"}
            </button>

            <button
              onClick={() => speakText(lastMainTextRef.current || "")}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-black text-white/90 hover:bg-white/10"
            >
              TTS PLAY
            </button>

            <button
              onClick={() => typeof window !== "undefined" && window.speechSynthesis && window.speechSynthesis.cancel()}
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-black text-white/90 hover:bg-white/10"
            >
              TTS STOP
            </button>
          </div>

          <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="text-xs font-extrabold tracking-widest text-white/60">FONT SIZE</div>
            <input
              type="range"
              min={14}
              max={24}
              value={fontSize}
              onChange={(e) => setFontSize(parseInt(e.target.value, 10))}
              className="mt-2 w-full"
            />
            <div className="mt-1 text-xs font-bold text-white/70">•{fontSize}px</div>
          </div>

          <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="text-xs font-extrabold tracking-widest text-white/60">JUMP PAGE</div>
            <div className="mt-2 flex gap-2">
              <input
                type="number"
                min={1}
                value={meta.page}
                onChange={(e) => jumpTo(Math.max(1, parseInt(e.target.value || "1", 10)))}
                className="w-full rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-2 text-sm font-black text-white/90 outline-none"
              />
              <button
                onClick={() => jumpTo(meta.page + 1)}
                className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-sm font-black hover:bg-white/10"
              >
                NEXT
              </button>
            </div>
          </div>

          <div className="mt-3 rounded-2xl border border-white/10 bg-white/5 p-3">
            <div className="text-xs font-extrabold tracking-widest text-white/60">NOTES</div>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Tulis catatan kamu di sini"
              className="mt-2 h-24 w-full resize-none rounded-2xl border border-white/10 bg-slate-950/50 px-3 py-2 text-sm font-bold text-white/90 outline-none"
            />
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              href="/learn/search"
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-center text-sm font-black hover:bg-white/10"
            >
              SEARCH
            </Link>
            <Link
              href="/learn/bookmarks"
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-center text-sm font-black hover:bg-white/10"
            >
              BOOKMARKS
            </Link>
            <Link
              href="/learn/progress"
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-center text-sm font-black hover:bg-white/10"
            >
              PROGRESS
            </Link>
            <Link
              href="/learn/flashcards"
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-center text-sm font-black hover:bg-white/10"
            >
              FLASHCARDS
            </Link>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-2">
            <Link
              href="/tools"
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-center text-sm font-black hover:bg-white/10"
            >
              TOOLS
            </Link>
            <Link
              href="/"
              className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-center text-sm font-black hover:bg-white/10"
            >
              HOME
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
EOT

# -------------------------
# pages/learn/search.tsx
# -------------------------
cat > pages/learn/search.tsx <<'EOT'
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import { LEARN_INDEX } from "../../lib/learn";

export default function LearnSearch() {
  const [q, setQ] = useState("");

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return LEARN_INDEX;

    return LEARN_INDEX.filter((it) => {
      const hay = [it.title, ...it.keywords].join(" ").toLowerCase();
      return hay.includes(query);
    });
  }, [q]);

  return (
    <>
      <Head><title>Belajar • Search</title></Head>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="text-xs font-extrabold tracking-widest text-white/60">BELAJAR</div>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Search Materi</h1>

          <div className="mt-5 flex gap-2">
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Cari planet • big bang • empire • dll"
              className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-4 py-3 text-sm font-black text-white/90 outline-none"
            />
            <button
              onClick={() => setQ("")}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black hover:bg-white/10"
            >
              CLEAR
            </button>
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2">
            {results.map((it) => (
              <Link
                key={it.id}
                href={it.route}
                className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft hover:bg-white/10"
              >
                <div className="text-xs font-extrabold tracking-widest text-white/60">
                  •{it.subject.toUpperCase()}
                </div>
                <div className="mt-2 text-xl font-black text-white">{it.title}</div>
                <div className="mt-2 text-sm font-bold text-white/70">
                  •OPEN
                  {it.totalHint ? ` •TOTAL HINT ${it.totalHint}` : ""}
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/learn" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black hover:bg-white/10">KEMBALI</Link>
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black hover:bg-white/10">HOME</Link>
          </div>
        </div>
      </main>
    </>
  );
}
EOT

# -------------------------
# pages/learn/bookmarks.tsx
# -------------------------
cat > pages/learn/bookmarks.tsx <<'EOT'
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { lsGet, lsSet } from "../../lib/local";

type Bookmark = {
  path: string;
  title: string;
  subject: "astronomy" | "history";
  chapter: string;
  page: number;
  savedAt: number;
};

export default function LearnBookmarks() {
  const key = "learn:bookmarks";
  const [list, setList] = useState<Bookmark[]>([]);

  useEffect(() => {
    setList(lsGet<Bookmark[]>(key, []));
  }, []);

  const remove = (path: string) => {
    const next = list.filter((b) => b.path !== path);
    setList(next);
    lsSet(key, next);
  };

  return (
    <>
      <Head><title>Belajar • Bookmarks</title></Head>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="text-xs font-extrabold tracking-widest text-white/60">BELAJAR</div>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Bookmarks</h1>

          <div className="mt-6 grid gap-3">
            {list.length === 0 && (
              <div className="rounded-3xl border border-white/10 bg-white/5 p-5 text-sm font-bold text-white/70">
                •BELUM ADA BOOKMARK
              </div>
            )}

            {list.map((b) => (
              <div key={b.path} className="flex flex-wrap items-center justify-between gap-3 rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="min-w-0">
                  <div className="text-xs font-extrabold tracking-widest text-white/60">
                    •{b.subject.toUpperCase()} •{b.chapter.toUpperCase()} •PAGE {b.page}
                  </div>
                  <div className="mt-1 truncate text-lg font-black text-white">{b.title}</div>
                  <div className="mt-1 text-xs font-bold text-white/60">•{b.path}</div>
                </div>
                <div className="flex gap-2">
                  <Link href={b.path} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                    OPEN
                  </Link>
                  <button onClick={() => remove(b.path)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                    DELETE
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/learn" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black hover:bg-white/10">KEMBALI</Link>
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black hover:bg-white/10">HOME</Link>
          </div>
        </div>
      </main>
    </>
  );
}
EOT

# -------------------------
# pages/learn/progress.tsx
# -------------------------
cat > pages/learn/progress.tsx <<'EOT'
import Head from "next/head";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { LEARN_INDEX } from "../../lib/learn";
import { lsGet } from "../../lib/local";

export default function LearnProgress() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    setTick((x) => x + 1);
  }, []);

  const rows = useMemo(() => {
    return LEARN_INDEX.map((it) => {
      const key = `learn:progress:${it.subject}:${it.id}`;
      const maxPage = lsGet<number>(key, 0);
      const total = it.totalHint || 0;
      const pct = total ? Math.min(100, Math.round((maxPage / total) * 100)) : 0;
      return { ...it, maxPage, pct };
    });
  }, [tick]);

  return (
    <>
      <Head><title>Belajar • Progress</title></Head>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="text-xs font-extrabold tracking-widest text-white/60">BELAJAR</div>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Progress</h1>

          <div className="mt-6 grid gap-3">
            {rows.map((r) => (
              <div key={r.id} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <div className="text-xs font-extrabold tracking-widest text-white/60">•{r.subject.toUpperCase()}</div>
                    <div className="mt-1 text-xl font-black text-white">{r.title}</div>
                    <div className="mt-1 text-sm font-bold text-white/70">
                      •VISITED PAGE {r.maxPage}
                      {r.totalHint ? ` •TOTAL HINT ${r.totalHint}` : ""}
                    </div>
                  </div>
                  <Link href={r.route} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                    OPEN
                  </Link>
                </div>

                {r.totalHint ? (
                  <div className="mt-4">
                    <div className="h-3 w-full rounded-full bg-white/10">
                      <div className="h-3 rounded-full bg-white/45" style={{ width: `${r.pct}%` }} />
                    </div>
                    <div className="mt-2 text-xs font-extrabold tracking-widest text-white/60">•{r.pct}%</div>
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/learn" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black hover:bg-white/10">KEMBALI</Link>
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black hover:bg-white/10">HOME</Link>
          </div>
        </div>
      </main>
    </>
  );
}
EOT

# -------------------------
# pages/learn/flashcards.tsx
# -------------------------
cat > pages/learn/flashcards.tsx <<'EOT'
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { lsGet, lsSet } from "../../lib/local";

type Card = { front: string; back: string };
type Deck = { id: string; name: string; cards: Card[] };

const KEY = "learn:flashcards";

export default function Flashcards() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [deckName, setDeckName] = useState("");
  const [activeId, setActiveId] = useState<string>("");

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const [showBack, setShowBack] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const list = lsGet<Deck[]>(KEY, []);
    setDecks(list);
    setActiveId(list[0]?.id || "");
  }, []);

  const active = decks.find((d) => d.id === activeId) || null;
  const card = active?.cards[index] || null;

  const save = (next: Deck[]) => {
    setDecks(next);
    lsSet(KEY, next);
  };

  const addDeck = () => {
    const name = deckName.trim();
    if (!name) return;
    const d: Deck = { id: `deck-${Date.now()}`, name, cards: [] };
    const next = [d, ...decks];
    save(next);
    setDeckName("");
    setActiveId(d.id);
    setIndex(0);
  };

  const addCard = () => {
    if (!active) return;
    const f = front.trim();
    const b = back.trim();
    if (!f || !b) return;

    const next = decks.map((d) =>
      d.id === active.id ? { ...d, cards: [{ front: f, back: b }, ...d.cards] } : d
    );
    save(next);
    setFront("");
    setBack("");
    setIndex(0);
    setShowBack(false);
  };

  const delDeck = () => {
    if (!active) return;
    const next = decks.filter((d) => d.id !== active.id);
    save(next);
    setActiveId(next[0]?.id || "");
    setIndex(0);
    setShowBack(false);
  };

  const nextCard = () => {
    if (!active) return;
    if (active.cards.length === 0) return;
    setIndex((i) => (i + 1) % active.cards.length);
    setShowBack(false);
  };

  const prevCard = () => {
    if (!active) return;
    if (active.cards.length === 0) return;
    setIndex((i) => (i - 1 + active.cards.length) % active.cards.length);
    setShowBack(false);
  };

  return (
    <>
      <Head><title>Belajar • Flashcards</title></Head>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="text-xs font-extrabold tracking-widest text-white/60">BELAJAR</div>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Flashcards</h1>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-extrabold tracking-widest text-white/60">DECK</div>

              <div className="mt-3 flex gap-2">
                <input
                  value={deckName}
                  onChange={(e) => setDeckName(e.target.value)}
                  placeholder="Nama deck contoh Astronomi"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm font-black text-white/90 outline-none"
                />
                <button onClick={addDeck} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                  ADD
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {decks.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => { setActiveId(d.id); setIndex(0); setShowBack(false); }}
                    className={`w-full rounded-2xl border border-white/10 px-4 py-3 text-left text-sm font-black hover:bg-white/10 ${
                      d.id === activeId ? "bg-white/10" : "bg-white/5"
                    }`}
                  >
                    •{d.name} •{d.cards.length} CARD
                  </button>
                ))}
                {decks.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-bold text-white/70">
                    •BELUM ADA DECK
                  </div>
                ) : null}
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={delDeck} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                  DELETE DECK
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-extrabold tracking-widest text-white/60">CARD</div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                <div className="text-xs font-extrabold tracking-widest text-white/60">
                  {active ? `•${active.name.toUpperCase()}` : "•PILIH DECK"}
                </div>

                {active && active.cards.length > 0 && card ? (
                  <>
                    <div className="mt-3 text-lg font-black text-white">
                      {showBack ? card.back : card.front}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button onClick={() => setShowBack((v) => !v)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                        FLIP
                      </button>
                      <button onClick={prevCard} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                        PREV
                      </button>
                      <button onClick={nextCard} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                        NEXT
                      </button>
                    </div>
                    <div className="mt-3 text-xs font-bold text-white/60">
                      •{index + 1}/{active.cards.length}
                    </div>
                  </>
                ) : (
                  <div className="mt-3 text-sm font-bold text-white/70">•BELUM ADA CARD</div>
                )}
              </div>

              <div className="mt-4 grid gap-2">
                <input
                  value={front}
                  onChange={(e) => setFront(e.target.value)}
                  placeholder="Front contoh Apa itu Big Bang"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm font-black text-white/90 outline-none"
                />
                <input
                  value={back}
                  onChange={(e) => setBack(e.target.value)}
                  placeholder="Back contoh Teori asal usul alam semesta"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm font-black text-white/90 outline-none"
                />
                <button onClick={addCard} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                  ADD CARD
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/learn" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black hover:bg-white/10">KEMBALI</Link>
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black hover:bg-white/10">HOME</Link>
          </div>
        </div>
      </main>
    </>
  );
}
EOT

# -------------------------
# TOOLS PAGES
# -------------------------
cat > pages/tools/index.tsx <<'EOT'
import Head from "next/head";
import Link from "next/link";

const tools = [
  { href: "/tools/base64", title: "Base64 Encode Decode", desc: "Encode • Decode • UTF 8 safe" },
  { href: "/tools/encrypt", title: "Encrypt Decrypt AES", desc: "AES GCM • Password • Safe basic" },
  { href: "/tools/password", title: "Password Generator", desc: "Strong • Custom length • Copy" },
  { href: "/tools/qr", title: "QR Generator", desc: "Text • Link • Download image" },
  { href: "/tools/url", title: "URL Shortener", desc: "Shareable redirect link" },
];

export default function ToolsHome() {
  return (
    <>
      <Head><title>Tools</title></Head>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="text-xs font-extrabold tracking-widest text-white/60">TOOLS</div>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Toolbox</h1>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            {tools.map((t) => (
              <Link key={t.href} href={t.href} className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft hover:bg-white/10">
                <div className="text-xl font-black text-white">{t.title}</div>
                <div className="mt-2 text-sm font-bold text-white/70">•{t.desc}</div>
              </Link>
            ))}
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/learn" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black hover:bg-white/10">BELAJAR</Link>
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black hover:bg-white/10">HOME</Link>
          </div>
        </div>
      </main>
    </>
  );
}
EOT

cat > pages/tools/base64.tsx <<'EOT'
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";

function toBase64Utf8(s: string) {
  const bytes = new TextEncoder().encode(s);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}

function fromBase64Utf8(b64: string) {
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

export default function Base64Tool() {
  const [text, setText] = useState("");
  const [b64, setB64] = useState("");

  const decoded = useMemo(() => {
    try { return b64 ? fromBase64Utf8(b64.trim()) : ""; } catch { return "INVALID BASE64"; }
  }, [b64]);

  return (
    <>
      <Head><title>Tools • Base64</title></Head>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <h1 className="text-3xl font-black text-white">Base64 Encode Decode</h1>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-extrabold tracking-widest text-white/60">TEXT</div>
              <textarea value={text} onChange={(e) => setText(e.target.value)} className="mt-3 h-40 w-full rounded-2xl border border-white/10 bg-slate-950/40 p-3 text-sm font-bold text-white/90 outline-none" />
              <button
                onClick={() => setB64(text ? toBase64Utf8(text) : "")}
                className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10"
              >
                ENCODE
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-extrabold tracking-widest text-white/60">BASE64</div>
              <textarea value={b64} onChange={(e) => setB64(e.target.value)} className="mt-3 h-40 w-full rounded-2xl border border-white/10 bg-slate-950/40 p-3 text-sm font-bold text-white/90 outline-none" />
              <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/40 p-3 text-sm font-bold text-white/80">
                •DECODED
                <div className="mt-2 whitespace-pre-wrap">{decoded}</div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Link href="/tools" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">BACK</Link>
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">HOME</Link>
          </div>
        </div>
      </main>
    </>
  );
}
EOT

cat > pages/tools/password.tsx <<'EOT'
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";

function randInt(max: number) {
  const a = new Uint32Array(1);
  crypto.getRandomValues(a);
  return a[0] % max;
}

export default function PasswordTool() {
  const [len, setLen] = useState(16);
  const [num, setNum] = useState(true);
  const [sym, setSym] = useState(true);

  const pass = useMemo(() => {
    const letters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numbers = "0123456789";
    const symbols = "!@#$%^&*()-_=+[]{};:,.<>/?";
    let pool = letters;
    if (num) pool += numbers;
    if (sym) pool += symbols;

    let out = "";
    for (let i = 0; i < len; i++) out += pool[randInt(pool.length)];
    return out;
  }, [len, num, sym]);

  return (
    <>
      <Head><title>Tools • Password</title></Head>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <h1 className="text-3xl font-black text-white">Password Generator</h1>

          <div className="mt-6 rounded-3xl border border-white/10 bg-slate-950/40 p-5">
            <div className="text-xs font-extrabold tracking-widest text-white/60">RESULT</div>
            <div className="mt-2 break-all text-xl font-black text-white">{pass}</div>
            <button
              onClick={() => navigator.clipboard.writeText(pass)}
              className="mt-4 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10"
            >
              COPY
            </button>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-extrabold tracking-widest text-white/60">LENGTH</div>
              <input type="range" min={8} max={64} value={len} onChange={(e) => setLen(parseInt(e.target.value, 10))} className="mt-3 w-full" />
              <div className="mt-2 text-sm font-bold text-white/70">•{len}</div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5 space-y-3">
              <label className="flex items-center gap-2 text-sm font-black text-white/90">
                <input type="checkbox" checked={num} onChange={(e) => setNum(e.target.checked)} />
                •NUMBERS
              </label>
              <label className="flex items-center gap-2 text-sm font-black text-white/90">
                <input type="checkbox" checked={sym} onChange={(e) => setSym(e.target.checked)} />
                •SYMBOLS
              </label>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Link href="/tools" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">BACK</Link>
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">HOME</Link>
          </div>
        </div>
      </main>
    </>
  );
}
EOT

cat > pages/tools/encrypt.tsx <<'EOT'
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";

function bufToB64(buf: ArrayBuffer) {
  const bytes = new Uint8Array(buf);
  let bin = "";
  bytes.forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}

function b64ToBuf(b64: string) {
  const bin = atob(b64);
  const bytes = Uint8Array.from(bin, (c) => c.charCodeAt(0));
  return bytes.buffer;
}

async function deriveKey(password: string, salt: Uint8Array) {
  const enc = new TextEncoder();
  const baseKey = await crypto.subtle.importKey("raw", enc.encode(password), "PBKDF2", false, ["deriveKey"]);
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations: 120000, hash: "SHA-256" },
    baseKey,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"]
  );
}

export default function EncryptTool() {
  const [password, setPassword] = useState("");
  const [plain, setPlain] = useState("");
  const [cipher, setCipher] = useState("");

  const can = useMemo(() => password.trim().length >= 4, [password]);

  const encrypt = async () => {
    if (!can) return;
    const enc = new TextEncoder();
    const salt = crypto.getRandomValues(new Uint8Array(16));
    const iv = crypto.getRandomValues(new Uint8Array(12));
    const key = await deriveKey(password, salt);
    const ct = await crypto.subtle.encrypt({ name: "AES-GCM", iv }, key, enc.encode(plain));
    const pack = {
      v: 1,
      salt: bufToB64(salt.buffer),
      iv: bufToB64(iv.buffer),
      ct: bufToB64(ct),
    };
    setCipher(JSON.stringify(pack));
  };

  const decrypt = async () => {
    if (!can) return;
    try {
      const pack = JSON.parse(cipher);
      const salt = new Uint8Array(b64ToBuf(pack.salt));
      const iv = new Uint8Array(b64ToBuf(pack.iv));
      const ct = b64ToBuf(pack.ct);
      const key = await deriveKey(password, salt);
      const pt = await crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ct);
      const dec = new TextDecoder().decode(pt);
      setPlain(dec);
    } catch {
      setPlain("DECRYPT FAILED");
    }
  };

  return (
    <>
      <Head><title>Tools • Encrypt</title></Head>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <h1 className="text-3xl font-black text-white">Encrypt Decrypt AES</h1>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs font-extrabold tracking-widest text-white/60">PASSWORD</div>
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 4 char"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm font-black text-white/90 outline-none"
            />
            <div className="mt-2 text-xs font-bold text-white/60">•AES GCM •LOCAL ONLY</div>
          </div>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-extrabold tracking-widest text-white/60">PLAINTEXT</div>
              <textarea value={plain} onChange={(e) => setPlain(e.target.value)} className="mt-3 h-44 w-full rounded-2xl border border-white/10 bg-slate-950/40 p-3 text-sm font-bold text-white/90 outline-none" />
              <button onClick={encrypt} disabled={!can} className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10 disabled:opacity-50">
                ENCRYPT
              </button>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-extrabold tracking-widest text-white/60">CIPHERTEXT JSON</div>
              <textarea value={cipher} onChange={(e) => setCipher(e.target.value)} className="mt-3 h-44 w-full rounded-2xl border border-white/10 bg-slate-950/40 p-3 text-sm font-bold text-white/90 outline-none" />
              <button onClick={decrypt} disabled={!can} className="mt-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10 disabled:opacity-50">
                DECRYPT
              </button>
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Link href="/tools" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">BACK</Link>
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">HOME</Link>
          </div>
        </div>
      </main>
    </>
  );
}
EOT

cat > pages/tools/url.tsx <<'EOT'
import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";

function base64url(s: string) {
  const b64 = btoa(unescape(encodeURIComponent(s)));
  return b64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/g, "");
}

export default function UrlTool() {
  const [url, setUrl] = useState("");

  const out = useMemo(() => {
    const u = url.trim();
    if (!u) return "";
    const data = base64url(u);
    return `/go/${data}`;
  }, [url]);

  return (
    <>
      <Head><title>Tools • URL</title></Head>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <h1 className="text-3xl font-black text-white">URL Shortener</h1>
          <div className="mt-2 text-sm font-bold text-white/70">•SHAREABLE REDIRECT LINK</div>

          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs font-extrabold tracking-widest text-white/60">LONG URL</div>
            <input
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://example.com"
              className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm font-black text-white/90 outline-none"
            />

            <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/40 p-4">
              <div className="text-xs font-extrabold tracking-widest text-white/60">RESULT</div>
              <div className="mt-2 break-all text-sm font-black text-white/90">{out || "•ISI URL DULU"}</div>
              {out ? (
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => navigator.clipboard.writeText(window.location.origin + out)}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10"
                  >
                    COPY FULL LINK
                  </button>
                  <Link
                    href={out}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10"
                  >
                    TEST OPEN
                  </Link>
                </div>
              ) : null}
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Link href="/tools" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">BACK</Link>
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">HOME</Link>
          </div>
        </div>
      </main>
    </>
  );
}
EOT

cat > pages/go/'[data].tsx' <<'EOT'
import type { GetServerSideProps } from "next";

function b64urlToStr(s: string) {
  const b64 = s.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((s.length + 3) % 4);
  const raw = atob(b64);
  return decodeURIComponent(escape(raw));
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const data = String(ctx.params?.data || "");
  try {
    const url = b64urlToStr(data);
    if (!/^https?:\/\//i.test(url)) {
      return { redirect: { destination: "/", permanent: false } };
    }
    return { redirect: { destination: url, permanent: false } };
  } catch {
    return { redirect: { destination: "/", permanent: false } };
  }
};

export default function Go() {
  return null;
}
EOT

cat > pages/tools/qr.tsx <<'EOT'
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function QrTool() {
  const [text, setText] = useState("");
  const [img, setImg] = useState<string>("");

  useEffect(() => {
    let active = true;

    const run = async () => {
      if (!text.trim()) { setImg(""); return; }
      const QRCode = (await import("qrcode")).default;
      const url = await QRCode.toDataURL(text.trim(), { margin: 2, width: 900 });
      if (active) setImg(url);
    };

    run();
    return () => { active = false; };
  }, [text]);

  return (
    <>
      <Head><title>Tools • QR</title></Head>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <h1 className="text-3xl font-black text-white">QR Generator</h1>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-extrabold tracking-widest text-white/60">TEXT OR LINK</div>
              <textarea
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="https://t.me/punyakah"
                className="mt-3 h-40 w-full rounded-2xl border border-white/10 bg-slate-950/40 p-3 text-sm font-bold text-white/90 outline-none"
              />
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-extrabold tracking-widest text-white/60">QR IMAGE</div>
              {img ? (
                <>
                  <img src={img} alt="qr" className="mt-3 w-full rounded-2xl border border-white/10 bg-white/5" />
                  <a
                    href={img}
                    download="qr.png"
                    className="mt-3 inline-block rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10"
                  >
                    DOWNLOAD
                  </a>
                </>
              ) : (
                <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/40 p-4 text-sm font-bold text-white/70">
                  •ISI TEXT DULU
                </div>
              )}
            </div>
          </div>

          <div className="mt-6 flex gap-2">
            <Link href="/tools" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">BACK</Link>
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">HOME</Link>
          </div>
        </div>
      </main>
    </>
  );
}
EOT

# -------------------------
# AUTO INJECT LearnFloatingPanel ke _app
# Kalau gagal patch otomatis, gue kasih instruksi manual di bawah
# -------------------------
APP_TSX="pages/_app.tsx"
APP_JS="pages/_app.js"

if [ -f "$APP_TSX" ] || [ -f "$APP_JS" ]; then
  TARGET="$APP_TSX"
  [ -f "$APP_JS" ] && TARGET="$APP_JS"

  if ! grep -q "LearnFloatingPanel" "$TARGET"; then
    # add import line near top
    sed -i '1i import LearnFloatingPanel from "../components/LearnFloatingPanel";' "$TARGET" || true

    # replace single line return if found
    if grep -q 'return <Component' "$TARGET"; then
      sed -i 's/return <Component/return (<>\\n      <Component/g' "$TARGET" || true
      sed -i 's/\\/>;/ \\/>\\n      <LearnFloatingPanel \\/>\\n    <\\/>);/g' "$TARGET" || true
    fi
  fi
else
  # create _app.tsx only if not exist
  css_import=""
  if [ -f styles/globals.css ]; then
    css_import='import "../styles/globals.css";'
  elif [ -f app/globals.css ]; then
    css_import='import "../app/globals.css";'
  fi

  cat > pages/_app.tsx <<EOT
import type { AppProps } from "next/app";
$css_import
import LearnFloatingPanel from "../components/LearnFloatingPanel";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />
      <LearnFloatingPanel />
    </>
  );
}
EOT
fi

echo "DONE"
echo "IF PANEL NOT SHOWING"
echo "OPEN pages/_app.tsx or pages/_app.js"
echo "MAKE SURE <LearnFloatingPanel /> IS RENDERED"
