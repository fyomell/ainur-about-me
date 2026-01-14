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
