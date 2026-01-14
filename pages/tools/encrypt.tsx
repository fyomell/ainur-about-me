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
