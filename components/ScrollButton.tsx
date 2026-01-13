"use client";

type Props = {
  targetId: string;
  children: React.ReactNode;
};

export default function ScrollButton({ targetId, children }: Props) {
  function go() {
    const el = document.getElementById(targetId);
    el?.scrollIntoView({ behavior: "smooth", block: "start" });
  }

  return (
    <button
      onClick={go}
      className="inline-flex items-center justify-center rounded-2xl bg-sky-500/90 px-5 py-2.5 text-sm font-bold text-slate-950 shadow-soft transition hover:bg-sky-400 active:scale-[0.98]"
      type="button"
    >
      {children}
    </button>
  );
}
