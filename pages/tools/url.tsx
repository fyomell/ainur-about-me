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
