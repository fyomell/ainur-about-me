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
