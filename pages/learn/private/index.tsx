import Head from "next/head";
import Link from "next/link";
import PrivateGate from "../../../components/PrivateGate";

export default function PrivateIndex() {
  return (
    <>
      <Head>
        <title>Bab Privat</title>
      </Head>

      <PrivateGate>
        <main className="mx-auto max-w-5xl px-4 pb-16 pt-10">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
            <div className="text-xs font-extrabold tracking-widest text-white/60">BAB PRIVAT</div>
            <h1 className="mt-3 text-3xl font-black text-white">TENTANG BUKU</h1>
            <p className="mt-2 text-white/75">
              A World Without Islam • Graham E. Fuller
            </p>

            <div className="mt-5 flex flex-wrap gap-3">
              <Link
                href="/learn/private/1"
                className="rounded-2xl border border-white/10 bg-white/10 px-4 py-3 text-sm font-black text-white/90 hover:bg-white/15"
              >
                MULAI BACA
              </Link>
              <Link
                href="/learn"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-black text-white/70"
              >
                MENU BELAJAR
              </Link>
            </div>
          </div>
        </main>
      </PrivateGate>
    </>
  );
}
