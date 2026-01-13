import CopyButton from "@/components/CopyButton";
import ScrollButton from "@/components/ScrollButton";
import Chip from "@/components/Chip";
import Section from "@/components/Section";
import { profile } from "@/lib/profile";

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

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-1 rounded-2xl border border-white/10 bg-white/5 p-4 shadow-soft">
      <div className="text-xs font-extrabold tracking-widest text-white/60">
        {label}
      </div>
      <div className="text-base font-bold tracking-wide">{value}</div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="min-h-screen">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute left-1/2 top-[-120px] h-[420px] w-[420px] -translate-x-1/2 rounded-full bg-sky-500/15 blur-3xl" />
        <div className="absolute bottom-[-160px] right-[-120px] h-[520px] w-[520px] rounded-full bg-fuchsia-500/10 blur-3xl" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-20 border-b border-white/10 bg-slate-950/70 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 animate-floaty rounded-2xl border border-white/10 bg-white/5 shadow-soft" />
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-wide">
                {profile.name}
              </div>
              <div className="text-xs text-white/60">ABOUT ME</div>
            </div>
          </div>

          <nav className="flex items-center gap-2">
            <a
              href="#about"
              className="rounded-xl px-3 py-2 text-xs font-semibold text-white/70 hover:bg-white/5 hover:text-white"
            >
              About
            </a>
            <a
              href="#contact"
              className="rounded-xl px-3 py-2 text-xs font-semibold text-white/70 hover:bg-white/5 hover:text-white"
            >
              Contact
            </a>
            <ScrollButton targetId="contact">CONTACT ME</ScrollButton>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-5xl px-4 pb-10 pt-10">
        <div className="grid gap-6 md:grid-cols-5">
          <div className="md:col-span-3">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
              <div className="flex flex-wrap gap-2">
                <Chip>Next.js</Chip>
                <Chip>TypeScript</Chip>
                <Chip>Tailwind CSS</Chip>
                <Chip>Clean UI</Chip>
              </div>

              <h1 className="mt-5 text-3xl font-black tracking-tight md:text-4xl">
                {profile.name}
              </h1>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-white/70">
                A simple personal About Me website with a modern layout, smooth scroll,
                and interactive buttons.
              </p>

              <div className="mt-6 grid gap-3 sm:grid-cols-3">
                <InfoRow label="CLASS" value={profile.class} />
                <InfoRow label="AGE" value={profile.age} />
                <InfoRow label="LOVERS" value={profile.lovers} />
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
          </div>

          <div className="md:col-span-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
              <div className="text-xs font-extrabold tracking-widest text-white/60">
                QUICK FACTS
              </div>

              <div className="mt-4 space-y-4 text-sm text-white/75">
                <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                  <div className="text-xs font-extrabold tracking-widest text-white/60">
                    SUPPORTERS
                  </div>
                  <div className="mt-3">
                    <BulletList items={profile.supporters} />
                  </div>
                </div>

                <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                  <div className="text-xs font-extrabold tracking-widest text-white/60">
                    FAVORITE SUBJECTS
                  </div>
                  <div className="mt-3">
                    <BulletList items={profile.favoriteSubjects} />
                  </div>
                </div>
              </div>

              <div className="mt-6 text-xs text-white/50">
                Tip: edit your profile in <span className="font-semibold">lib/profile.ts</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-5xl space-y-10 px-4 pb-14">
        <Section
          id="about"
          title="ABOUT ME"
          subtitle="All content translated to English and formatted with • bullets"
        >
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
              <div className="space-y-3 text-sm text-white/80">
                <div>
                  <span className="font-extrabold tracking-wide">NAME:</span>{" "}
                  <span className="font-semibold">{profile.name}</span>
                </div>
                <div>
                  <span className="font-extrabold tracking-wide">CLASS:</span>{" "}
                  <span className="font-semibold">{profile.class}</span>
                </div>
                <div>
                  <span className="font-extrabold tracking-wide">AGE:</span>{" "}
                  <span className="font-semibold">{profile.age}</span>
                </div>
                <div>
                  <span className="font-extrabold tracking-wide">LOVERS:</span>{" "}
                  <span className="font-semibold">{profile.lovers}</span>
                </div>

                <div className="pt-2">
                  <div className="font-extrabold tracking-wide">SUPPORTERS:</div>
                  <div className="mt-3">
                    <BulletList items={profile.supporters} />
                  </div>
                </div>

                <div className="pt-2">
                  <div className="font-extrabold tracking-wide">
                    FAVORITE SUBJECTS:
                  </div>
                  <div className="mt-3">
                    <BulletList items={profile.favoriteSubjects} />
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
              <div className="text-xs font-extrabold tracking-widest text-white/60">
                STYLE NOTES
              </div>
              <ul className="mt-4 list-inside list-disc space-y-2 text-sm text-white/70">
                <li>Modern gradient glow background</li>
                <li>Card layout with soft shadows</li>
                <li>Smooth scroll button</li>
                <li>Copy-to-clipboard button</li>
              </ul>

              <div className="mt-6 rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                <div className="text-xs font-extrabold tracking-widest text-white/60">
                  YOUR FORMAT EXAMPLE
                </div>
                <div className="mt-3 text-sm font-semibold leading-relaxed text-white/80">
                  NAME: {profile.name} <br />
                  CLASS: {profile.class} <br />
                  AGE: {profile.age} <br />
                  LOVERS: {profile.lovers} <br />
                  SUPPORTERS: <br />
                  •{profile.supporters.join(" •")} <br />
                  <br />
                  FAVORITE SUBJECTS: <br />
                  •{profile.favoriteSubjects.join(" •")}
                </div>
              </div>
            </div>
          </div>
        </Section>

        <Section
          id="contact"
          title="CONTACT"
          subtitle="Tap the buttons to quickly reach me"
        >
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft">
            <div className="grid gap-4 md:grid-cols-3">
              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                <div className="text-xs font-extrabold tracking-widest text-white/60">
                  TELEGRAM
                </div>
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
                <div className="text-xs font-extrabold tracking-widest text-white/60">
                  E-MAIL
                </div>
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
                <div className="text-xs font-extrabold tracking-widest text-white/60">
                  MY WEBSITE
                </div>
                <div className="mt-2 text-sm font-bold">{profile.contact.website}</div>
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    type="button"
                    className="cursor-not-allowed rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-white/40"
                    aria-disabled="true"
                    title="Coming soon"
                  >
                    Coming soon
                  </button>
                  <CopyButton value="MY WEBSITE: COMING SOON" label="Copy text" />
                </div>
              </div>
            </div>

            <div className="mt-6 flex flex-col items-start justify-between gap-3 border-t border-white/10 pt-6 sm:flex-row sm:items-center">
              <div className="text-sm text-white/60">
                Built with Next.js • TypeScript • Tailwind CSS
              </div>
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
          </div>
        </Section>

        <footer className="pb-6 text-center text-xs text-white/40">
          © {new Date().getFullYear()} {profile.name}
        </footer>
      </section>
    </main>
  );
}
