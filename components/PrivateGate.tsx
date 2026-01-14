import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";

const KEY = "rofik_private_gate_v1";

function readGate(): boolean {
  try {
    return localStorage.getItem(KEY) === "ok";
  } catch {
    return false;
  }
}

function writeGate(ok: boolean) {
  try {
    localStorage.setItem(KEY, ok ? "ok" : "no");
  } catch {}
}

export default function PrivateGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false);
  const [passed, setPassed] = useState(false);

  const [islam, setIslam] = useState(false);
  const [iman, setIman] = useState(false);
  const [santri, setSantri] = useState(false);
  const [mistis, setMistis] = useState(false);

  useEffect(() => {
    const ok = readGate();
    setPassed(ok);
    setReady(true);
  }, []);

  const canEnter = useMemo(() => islam && iman && santri && mistis, [islam, iman, santri, mistis]);

  function submit() {
    if (!canEnter) return;
    setPassed(true);
    writeGate(true);
  }

  function reset() {
    setPassed(false);
    writeGate(false);
    setIslam(false);
    setIman(false);
    setSantri(false);
    setMistis(false);
  }

  if (!ready) return null;

  return (
    <>
      {children}

      {!passed && (
        <div className="fixed inset-0 z-[999] flex items-center justify-center bg-black/60 p-4 backdrop-blur">
          <div className="w-full max-w-lg rounded-3xl border border-white/10 bg-slate-950/80 p-5 shadow-soft">
            <div className="text-xs font-extrabold tracking-widest text-white/60">BAB PRIVAT</div>
            <div className="mt-2 text-xl font-black text-white">AKSES TERKUNCI</div>
            <p className="mt-2 text-sm leading-relaxed text-white/75">
              Jawaban kamu tidak dikirim ke server. Disimpan lokal di HP kamu.
              Untuk masuk, jawab <b>IYA</b> semuanya.
            </p>

            <div className="mt-4 space-y-3 text-sm text-white/85">
              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <input type="checkbox" className="h-5 w-5" checked={islam} onChange={(e) => setIslam(e.target.checked)} />
                Apakah kamu islam?
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <input type="checkbox" className="h-5 w-5" checked={iman} onChange={(e) => setIman(e.target.checked)} />
                Apakah iman mu kuat?
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <input type="checkbox" className="h-5 w-5" checked={santri} onChange={(e) => setSantri(e.target.checked)} />
                Apakah kamu santri?
              </label>

              <label className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                <input type="checkbox" className="h-5 w-5" checked={mistis} onChange={(e) => setMistis(e.target.checked)} />
                Apakah kamu dari golongan orang yang suka mistis?
              </label>
            </div>

            <div className="mt-5 flex flex-wrap gap-3">
              <button
                onClick={submit}
                disabled={!canEnter}
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-white/90 disabled:opacity-40"
              >
                MASUK BAB PRIVAT
              </button>

              <button
                onClick={reset}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black text-white/70"
              >
                RESET
              </button>

              <Link
                href="/learn"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black text-white/70"
              >
                KEMBALI
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
