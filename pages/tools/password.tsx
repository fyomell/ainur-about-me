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
