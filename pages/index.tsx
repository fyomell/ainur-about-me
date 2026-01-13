import { useEffect, useState } from "react";
import CopyButton from "@/components/CopyButton";
import { profile } from "@/lib/profile";

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

function IconButton({
  onClick,
  label,
  children,
}: {
  onClick: () => void;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/85 shadow-soft hover:bg-white/10 active:scale-[0.98]"
    >
      {children}
    </button>
  );
}

function DrawerLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) {
  return (
    <a
      href={href}
      onClick={onClick}
      className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/85 hover:bg-white/10"
    >
      {children}
    </a>
  );
}

export default function Home() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const websiteUrl = profile.contact.website.startsWith("http")
    ? profile.contact.website
    : `https://${profile.contact.website}`;

  return (
    <main className="min-h-screen">
      {/* Header */}
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/55 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          {/* Left */}
          <div className="flex min-w-0 flex-1 items-center gap-3">
            <img src="/rofik-logo.svg" alt="ROFIK" className="h-7 w-auto shrink-0 sm:h-8" />
            <div className="min-w-0 leading-tight">
              <div className="truncate text-sm font-extrabold tracking-wide">{profile.name}</div>
              <div className="hidden text-xs text-white/60 sm:block">ASTRONOMY THEME</div>
            </div>
          </div>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-2 sm:flex">
            <a
              href="#about"
              className="rounded-xl px-3 py-2 text-xs font-semibold text-white/70 hover:bg-white/5 hover:text-white"
            >
              About
            </a>
            <a
              href="#tools"
              className="rounded-xl px-3 py-2 text-xs font-semibold text-white/70 hover:bg-white/5 hover:text-white"
            >
              Tools
            </a>
            <a
              href="#contact"
              className="rounded-xl px-3 py-2 text-xs font-semibold text-white/70 hover:bg-white/5 hover:text-white"
            >
              Contact
            </a>
            <a
              href="#contact"
              className="inline-flex items-center justify-center rounded-2xl bg-sky-500/90 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-soft transition hover:bg-sky-400 active:scale-[0.98]"
            >
              CONTACT ME
            </a>
          </nav>

          {/* Mobile button */}
          <div className="sm:hidden">
            <IconButton onClick={() => setOpen(true)} label="Open menu">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </IconButton>
          </div>
        </div>
      </header>

      {/* Drawer */}
      {open ? (
        <div className="fixed inset-0 z-40">
          <div
            className="absolute inset-0 bg-black/55"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute right-0 top-0 h-full w-[82%] max-w-sm border-l border-white/10 bg-slate-950/90 p-4 backdrop-blur">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/rofik-logo.svg" alt="ROFIK" className="h-7 w-auto" />
                <div className="text-sm font-extrabold tracking-wide">MENU</div>
              </div>
              <IconButton onClick={() => setOpen(false)} label="Close menu">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </IconButton>
            </div>

            <div className="mt-4 space-y-3">
              <DrawerLink href="#about" onClick={() => setOpen(false)}>ABOUT</DrawerLink>
              <DrawerLink href="#tools" onClick={() => setOpen(false)}>TOOLS</DrawerLink>
              <DrawerLink href="#contact" onClick={() => setOpen(false)}>CONTACT</DrawerLink>

              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex w-full items-center justify-center rounded-2xl bg-sky-500/90 px-5 py-3 text-sm font-black text-slate-950 shadow-soft transition hover:bg-sky-400 active:scale-[0.98]"
              >
                CONTACT ME
              </a>
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
              SPACE UI • CLEAN • MOBILE FRIENDLY
            </div>
          </aside>
        </div>
      ) : null}

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pb-10 pt-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h1 className="text-3xl font-black tracking-tight md:text-4xl">{profile.name}</h1>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
                SPACE VIBES • CLEAN UI • BULLET FORMAT • FAST CONTACT
              </p>
            </div>

            <img src="/rofik-logo.svg" alt="ROFIK" className="h-10 w-auto opacity-90" />
          </div>

          <div className="mt-6 grid gap-3 sm:grid-cols-2 md:grid-cols-3">
            <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
              <div className="text-xs font-extrabold tracking-widest text-white/60">CLASS</div>
              <div className="mt-2 text-base font-bold">{profile.class}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
              <div className="text-xs font-extrabold tracking-widest text-white/60">AGE</div>
              <div className="mt-2 text-base font-bold">{profile.age}</div>
            </div>
            <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
              <div className="text-xs font-extrabold tracking-widest text-white/60">WEBSITE</div>
              <div className="mt-2 text-base font-bold">{profile.contact.website}</div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap items-center gap-3">
            <a
              href="#about"
              className="inline-flex items-center justify-center rounded-2xl bg-sky-500/90 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-soft transition hover:bg-sky-400 active:scale-[0.98]"
            >
              SEE MY PROFILE
            </a>
            <a
              href={`mailto:${profile.contact.email}`}
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-white/90 shadow-soft transition hover:bg-white/10 active:scale-[0.98]"
            >
              EMAIL ME
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
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

        {/* Tools */}
        <div id="tools" className="scroll-mt-24">
          <Card title="TOOLS">
            <div className="text-sm text-white/70">
              •TIKTOK TOOL PLACEHOLDER
              <br />
              •I CAN ADD A LEGAL LINK PREVIEW TOOL
              <br />
              •I CANNOT BUILD A DIRECT VIDEO OR MUSIC DOWNLOADER
            </div>
          </Card>
        </div>

        {/* Contact */}
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

            <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
              <div className="text-sm text-white/60">Built with Next.js • TypeScript • Tailwind CSS</div>
              <a
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: "smooth" });
                }}
                className="rounded-xl px-4 py-2 text-sm font-semibold text-white/80 hover:bg-white/5"
              >
                Back to top ↑
              </a>
            </div>
          </Card>
        </div>

        <footer className="pb-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </section>
    </main>
  );
}
