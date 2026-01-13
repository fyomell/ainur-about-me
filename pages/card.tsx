import { useEffect, useMemo, useRef, useState } from "react";
import Link from "next/link";
import { Drawer, MenuButton, type DrawerItem } from "@/components/Drawer";

type CardData = {
  name: string;
  age?: string;
  title?: string;
  image?: string;
};

const LS_CARD = "rofik_card";

export default function CreateCard() {
  const [open, setOpen] = useState(false);
  const fileRef = useRef<HTMLInputElement | null>(null);

  const [data, setData] = useState<CardData>({
    name: "AINUR ROFIK",
    title: "ASTRONOMY THEME",
    age: "",
    image: "",
  });

  useEffect(() => {
    try {
      const raw = localStorage.getItem(LS_CARD);
      if (raw) setData(JSON.parse(raw));
    } catch {}
  }, []);

  const items: DrawerItem[] = useMemo(
    () => [
      { label: "HOME", href: "/" },
      { label: "BELAJAR", href: "/learn" },
      { label: "CREATE CARD", href: "/card" },
      { label: "CONTACT", href: "/#contact" },
      { label: "ADMIN MUSIC", href: "/admin" },
    ],
    []
  );

  const save = () => {
    localStorage.setItem(LS_CARD, JSON.stringify(data));
    alert("Saved ✅");
  };

  const reset = () => {
    localStorage.removeItem(LS_CARD);
    setData({ name: "AINUR ROFIK", title: "ASTRONOMY THEME", age: "", image: "" });
  };

  const onPickFile = (f?: File | null) => {
    if (!f) return;
    const url = URL.createObjectURL(f);
    setData((d) => ({ ...d, image: url }));
  };

  const previewImage =
    data.image?.trim() ||
    "https://cataas.com/cat?width=400&height=400";

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/55 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <img src="/rofik-logo.svg" alt="ROFIK" className="h-7 w-auto sm:h-8" />
            <div className="leading-tight">
              <div className="text-sm font-extrabold tracking-wide">CREATE CARD ME</div>
              <div className="text-xs text-white/60">•NAME •OPTIONAL AGE •IMAGE</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <div className="sm:hidden">
              <MenuButton onClick={() => setOpen(true)} />
            </div>
            <Link
              href="/"
              className="hidden rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-bold text-white/85 hover:bg-white/10 sm:inline-flex"
            >
              HOME
            </Link>
          </div>
        </div>
      </header>

      <Drawer open={open} onClose={() => setOpen(false)} items={items} />

      <section className="mx-auto max-w-5xl px-4 pb-14 pt-10">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
            <div className="text-xs font-extrabold tracking-widest text-white/60">FORM</div>

            <div className="mt-4 space-y-4">
              <div>
                <div className="text-xs font-bold text-white/70">NAMA</div>
                <input
                  value={data.name}
                  onChange={(e) => setData((d) => ({ ...d, name: e.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm font-bold outline-none focus:border-sky-400/60"
                  placeholder="Nama"
                />
              </div>

              <div>
                <div className="text-xs font-bold text-white/70">UMUR (OPSIONAL)</div>
                <input
                  value={data.age ?? ""}
                  onChange={(e) => setData((d) => ({ ...d, age: e.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm font-bold outline-none focus:border-sky-400/60"
                  placeholder="Kosongin kalau privasi"
                />
              </div>

              <div>
                <div className="text-xs font-bold text-white/70">TITLE (OPSIONAL)</div>
                <input
                  value={data.title ?? ""}
                  onChange={(e) => setData((d) => ({ ...d, title: e.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm font-bold outline-none focus:border-sky-400/60"
                  placeholder="Contoh: ASTRONOMY THEME"
                />
              </div>

              <div>
                <div className="text-xs font-bold text-white/70">IMAGE URL (JPG/PNG) (OPSIONAL)</div>
                <input
                  value={data.image ?? ""}
                  onChange={(e) => setData((d) => ({ ...d, image: e.target.value }))}
                  className="mt-2 w-full rounded-2xl border border-white/10 bg-slate-950/30 px-4 py-3 text-sm font-bold outline-none focus:border-sky-400/60"
                  placeholder="https://...jpg / png (boleh kosong)"
                />
                <div className="mt-3 flex flex-wrap gap-2">
                  <button
                    onClick={() => fileRef.current?.click()}
                    className="rounded-2xl bg-sky-500/90 px-4 py-2 text-sm font-black text-slate-950 hover:bg-sky-400"
                  >
                    ADD IMAGE (GALLERY)
                  </button>
                  <button
                    onClick={save}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10"
                  >
                    SAVE
                  </button>
                  <button
                    onClick={reset}
                    className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10"
                  >
                    RESET
                  </button>
                </div>

                <input
                  ref={fileRef}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => onPickFile(e.target.files?.[0])}
                />
              </div>

              <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-xs text-white/60">
                •TIPS: kalau URL kosong, otomatis pakai gambar random cat
              </div>
            </div>
          </div>

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
            <div className="text-xs font-extrabold tracking-widest text-white/60">PREVIEW CARD</div>

            <div className="mt-4 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40">
              <div className="p-5">
                <div className="flex items-center gap-4">
                  <img
                    src={previewImage}
                    alt="Card Avatar"
                    className="h-20 w-20 rounded-3xl border border-white/10 object-cover"
                  />
                  <div className="min-w-0">
                    <div className="text-xs font-extrabold tracking-widest text-white/60">
                      {data.title?.trim() ? data.title : "ABOUT CARD"}
                    </div>
                    <div className="mt-2 truncate text-2xl font-black">{data.name || "NO NAME"}</div>
                    {data.age?.trim() ? (
                      <div className="mt-1 text-sm font-bold text-white/70">•AGE {data.age}</div>
                    ) : (
                      <div className="mt-1 text-sm font-bold text-white/50">•AGE HIDDEN</div>
                    )}
                  </div>
                </div>

                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-extrabold tracking-widest text-white/60">STYLE</div>
                    <div className="mt-2 text-sm font-bold text-white/80">•SPACE •CLEAN •MOBILE</div>
                  </div>
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                    <div className="text-xs font-extrabold tracking-widest text-white/60">FEATURE</div>
                    <div className="mt-2 text-sm font-bold text-white/80">•IMAGE •SAVE •FAST</div>
                  </div>
                </div>

                <div className="mt-5 text-xs text-white/55">
                  •NANTI BISA DIKEMBANGIN: EXPORT PNG •QR CONTACT •TEMA WARNA
                </div>
              </div>
            </div>

            <div className="mt-4 text-xs text-white/60">
              •BISA AKSES: /card
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
