import ScrollButton from "@/components/ScrollButton";
import CopyButton from "@/components/CopyButton";
import { profile } from "@/lib/profile";

function Card({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
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
  const websiteUrl = profile.contact.website.startsWith("http")
    ? profile.contact.website
    : `https://${profile.contact.website}`;

  return (
    <main className="min-h-screen">
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-120px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute bottom-[-160px] right-[-120px] h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="leading-tight">
            <div className="text-sm font-extrabold tracking-wide">{profile.name}</div>
            <div className="text-xs text-white/60">ABOUT ME</div>
          </div>

          <nav className="flex items-center gap-2">
            <a href="#about" className="rounded-xl px-3 py-2 text-xs font-semibold text-white/70 hover:bg-white/5 hover:text-white">
              About
            </a>
            <a href="#contact" className="rounded-xl px-3 py-2 text-xs font-semibold text-white/70 hover:bg-white/5 hover:text-white">
              Contact
            </a>
            <ScrollButton targetId="contact">CONTACT ME</ScrollButton>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-10 pt-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
          <h1 className="text-3xl font-black tracking-tight md:text-4xl">{profile.name}</h1>
          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/70">
            NAME • CLASS • AGE • SUPPORTERS • SUBJECTS • GOALS • PROJECTS • ACHIEVEMENTS
          </p>

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
            <ScrollButton targetId="about">SEE MY PROFILE</ScrollButton>
            <a
              href={`mailto:${profile.contact.email}`}
              className="inline-flex items-center justify-center rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-bold text-white/90 shadow-soft transition hover:bg-white/10 active:scale-[0.98]"
            >
              EMAIL ME
            </a>
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
