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
