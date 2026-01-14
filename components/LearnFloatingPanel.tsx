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
