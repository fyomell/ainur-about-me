import Link from "next/link";

export type DrawerItem = { label: string; href: string };

export function MenuButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      aria-label="Open menu"
      className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/85 shadow-soft hover:bg-white/10 active:scale-[0.98]"
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </button>
  );
}

export function Drawer({
  open,
  onClose,
  title = "MENU",
  items,
}: {
  open: boolean;
  onClose: () => void;
  title?: string;
  items: DrawerItem[];
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/55" onClick={onClose} />
      <aside className="absolute right-0 top-0 h-full w-[82%] max-w-sm border-l border-white/10 bg-slate-950/90 p-4 backdrop-blur">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/rofik-logo.svg" alt="ROFIK" className="h-7 w-auto" />
            <div className="text-sm font-extrabold tracking-wide">{title}</div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close menu"
            className="inline-flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-white/85 shadow-soft hover:bg-white/10 active:scale-[0.98]"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="mt-4 space-y-3">
          {items.map((it) => {
            const href = it.href;
            const isHash = href.startsWith("#");
            const isInternal = href.startsWith("/");
            if (isHash) {
              return (
                <a
                  key={href + it.label}
                  href={href}
                  onClick={onClose}
                  className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/85 hover:bg-white/10"
                >
                  {it.label}
                </a>
              );
            }
            if (isInternal) {
              return (
                <Link
                  key={href + it.label}
                  href={href}
                  onClick={onClose}
                  className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/85 hover:bg-white/10"
                >
                  {it.label}
                </Link>
              );
            }
            return (
              <a
                key={href + it.label}
                href={href}
                target="_blank"
                rel="noreferrer"
                onClick={onClose}
                className="block rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-bold text-white/85 hover:bg-white/10"
              >
                {it.label}
              </a>
            );
          })}
        </div>

        <div className="mt-6 rounded-2xl border border-white/10 bg-white/5 p-4 text-xs text-white/60">
          SPACE UI • CLEAN • MOBILE FRIENDLY
        </div>
      </aside>
    </div>
  );
}
