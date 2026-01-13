import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import CopyButton from "@/components/CopyButton";
import MusicPlayer from "@/components/MusicPlayer";
import { Drawer, MenuButton, type DrawerItem } from "@/components/Drawer";
import { profile } from "@/lib/profile";
import { pickQuote } from "@/lib/quotes";
import { LANGS, getText, type LangCode } from "@/lib/i18n";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
      <div className="text-xs font-extrabold tracking-widest text-white/60">{title}</div>
      <div className="mt-4">{children}</div>
    </div>
  );
}

function BulletList({ items }: { items: string[] }) {
  return (
    <div className="space-y-2">
      {items.map((x) => (
        <div key={x} className="text-sm text-white/80">
          <span className="mr-2 text-sky-300">•</span>
          <span className="font-semibold tracking-wide">{x}</span>
        </div>
      ))}
    </div>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);
  const [quote, setQuote] = useState(pickQuote());

  const [lang, setLang] = useState<LangCode>("id");
  useEffect(() => {
    const saved = localStorage.getItem("lang") as LangCode | null;
    if (saved) setLang(saved);
  }, []);
  useEffect(() => {
    localStorage.setItem("lang", lang);
  }, [lang]);

  useEffect(() => {
    const t = setInterval(() => setQuote(pickQuote()), 9000);
    return () => clearInterval(t);
  }, []);

  const t = useMemo(() => getText(lang), [lang]);

  const items: DrawerItem[] = useMemo(
    () => [
      { label: "HOME", href: "/" },
      { label: t.belajar.toUpperCase(), href: "/learn" },
      { label: t.createCard.toUpperCase(), href: "/card" },
      { label: t.contact.toUpperCase(), href: "/#contact" },
    ],
    [t]
  );

  const websiteUrl = profile.contact.website.startsWith("http")
    ? profile.contact.website
    : `https://${profile.contact.website}`;

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/55 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <img src="/rofik-logo.svg" alt="ROFIK" className="h-7 w-auto shrink-0 sm:h-8" />
            <div className="min-w-0 leading-tight">
              <div className="truncate text-sm font-extrabold tracking-wide">{profile.name}</div>
              <div className="hidden text-xs text-white/60 sm:block">ASTRONOMY THEME</div>
            </div>
          </div>

          <div className="hidden items-center gap-2 sm:flex">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as LangCode)}
              className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-bold text-white/80 outline-none hover:bg-white/10"
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code} className="text-slate-950">
                  {l.label}
                </option>
              ))}
            </select>

            <Link href="/learn" className="rounded-xl px-3 py-2 text-xs font-semibold text-white/70 hover:bg-white/5 hover:text-white">
              {t.belajar}
            </Link>
            <Link href="/card" className="rounded-xl px-3 py-2 text-xs font-semibold text-white/70 hover:bg-white/5 hover:text-white">
              {t.createCard}
            </Link>
            <a href="#contact" className="inline-flex items-center justify-center rounded-2xl bg-sky-500/90 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-soft transition hover:bg-sky-400 active:scale-[0.98]">
              {t.contact.toUpperCase()}
            </a>
          </div>

          <div className="sm:hidden flex items-center gap-2">
            <select
              value={lang}
              onChange={(e) => setLang(e.target.value as LangCode)}
              className="rounded-xl border border-white/10 bg-white/5 px-2 py-2 text-xs font-bold text-white/80 outline-none hover:bg-white/10"
            >
              {LANGS.map((l) => (
                <option key={l.code} value={l.code} className="text-slate-950">
                  {l.label}
                </option>
              ))}
            </select>
            <MenuButton onClick={() => setOpen(true)} />
          </div>
        </div>
      </header>

      <Drawer open={open} onClose={() => setOpen(false)} items={items} />

      <section className="mx-auto max-w-5xl px-4 pb-10 pt-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">{profile.name}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">{t.tagline}</p>

              <div className="mt-3 rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm font-bold text-white/80">
                •{t.quoteLabel} • {quote.replace(/^•/,"")}
              </div>
            </div>
            <img src="/rofik-logo.svg" alt="ROFIK" className="h-10 w-auto opacity-90" />
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <Link href="/learn" className="inline-flex items-center justify-center rounded-2xl bg-sky-500/90 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-soft transition hover:bg-sky-400 active:scale-[0.98]">
              {t.belajar.toUpperCase()}
            </Link>
            <Link href="/card" className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-white/90 shadow-soft transition hover:bg-white/10 active:scale-[0.98]">
              {t.createCard.toUpperCase()}
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-5xl space-y-6 px-4 pb-14" id="about">
        <div className="grid gap-6 md:grid-cols-2">
          <Card title="SUPPORTERS">
            <BulletList items={profile.supporters} />
          </Card>

          <Card title="FAVORITE SUBJECTS">
            <BulletList items={profile.favoriteSubjects} />
          </Card>

          <Card title="MY GOALS">
            <BulletList items={profile.goals} />
          </Card>

          <Card title="PROJECTS">
            <BulletList items={profile.projects} />
          </Card>
        </div>

        <Card title="ACHIEVEMENTS">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
              <div className="text-xs font-extrabold tracking-widest text-white/60">COURSES</div>
              <div className="mt-3">
                <BulletList items={profile.achievements.courses} />
              </div>
            </div>

            <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
              <div className="text-xs font-extrabold tracking-widest text-white/60">SCHOOL RANKS</div>
              <div className="mt-3">
                <BulletList items={profile.achievements.schoolRanks} />
              </div>
            </div>
          </div>
        </Card>

        <div id="contact" className="scroll-mt-24">
          <Card title="CONTACT">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                <div className="text-xs font-extrabold tracking-widest text-white/60">TELEGRAM</div>
                <div className="mt-2 text-sm font-bold">{profile.contact.telegram}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={`https://t.me/${profile.contact.telegram.replace("@", "")}`}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15"
                  >
                    Open
                  </a>
                  <CopyButton value={profile.contact.telegram} label="Copy" />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                <div className="text-xs font-extrabold tracking-widest text-white/60">E-MAIL</div>
                <div className="mt-2 text-sm font-bold">{profile.contact.email}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={`mailto:${profile.contact.email}`}
                    className="inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15"
                  >
                    Send
                  </a>
                  <CopyButton value={profile.contact.email} label="Copy" />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                <div className="text-xs font-extrabold tracking-widest text-white/60">WEBSITE</div>
                <div className="mt-2 text-sm font-bold">{profile.contact.website}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <a
                    href={websiteUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-white/10 px-4 py-2 text-sm font-semibold hover:bg-white/15"
                  >
                    Open
                  </a>
                  <CopyButton value={websiteUrl} label="Copy" />
                </div>
              </div>
            </div>
          </Card>
        </div>

        <footer className="pb-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </section>

      <MusicPlayer />
    </main>
  );
}
