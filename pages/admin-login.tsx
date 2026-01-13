import { useState } from "react";
import Link from "next/link";

export default function AdminLogin() {
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");

  const submit = async () => {
    setErr("");
    const r = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });
    if (r.ok) {
      window.location.href = "/admin";
      return;
    }
    const j = await r.json().catch(() => ({}));
    if (j?.error === "ADMIN_PASSWORD_NOT_SET") setErr("ADMIN_PASSWORD belum diset di Vercel");
    else setErr("Password salah");
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
        <div className="text-xs font-extrabold tracking-widest text-white/60">ADMIN LOGIN</div>
        <div className="mt-2 text-2xl font-black">MASUK ADMIN</div>

        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="mt-5 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm font-bold outline-none focus:border-sky-400/60"
        />

        {err ? <div className="mt-3 text-sm font-bold text-red-300">•{err}</div> : null}

        <div className="mt-4 flex gap-2">
          <button
            onClick={submit}
            className="rounded-2xl bg-sky-500/90 px-5 py-3 text-sm font-black text-slate-950 hover:bg-sky-400"
          >
            LOGIN
          </button>
          <Link
            href="/"
            className="rounded-2xl border border-white/10 bg-white/5 px-5 py-3 text-sm font-black hover:bg-white/10"
          >
            HOME
          </Link>
        </div>

        <div className="mt-4 text-xs text-white/60">
          •BIAR PRIVAT •SET ENV VAR: ADMIN_PASSWORD DI VERCEL
        </div>
      </div>
    </main>
  );
}
