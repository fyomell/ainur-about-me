import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { lsGet, lsSet } from "../../lib/local";

type Card = { front: string; back: string };
type Deck = { id: string; name: string; cards: Card[] };

const KEY = "learn:flashcards";

export default function Flashcards() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [deckName, setDeckName] = useState("");
  const [activeId, setActiveId] = useState<string>("");

  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const [showBack, setShowBack] = useState(false);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const list = lsGet<Deck[]>(KEY, []);
    setDecks(list);
    setActiveId(list[0]?.id || "");
  }, []);

  const active = decks.find((d) => d.id === activeId) || null;
  const card = active?.cards[index] || null;

  const save = (next: Deck[]) => {
    setDecks(next);
    lsSet(KEY, next);
  };

  const addDeck = () => {
    const name = deckName.trim();
    if (!name) return;
    const d: Deck = { id: `deck-${Date.now()}`, name, cards: [] };
    const next = [d, ...decks];
    save(next);
    setDeckName("");
    setActiveId(d.id);
    setIndex(0);
  };

  const addCard = () => {
    if (!active) return;
    const f = front.trim();
    const b = back.trim();
    if (!f || !b) return;

    const next = decks.map((d) =>
      d.id === active.id ? { ...d, cards: [{ front: f, back: b }, ...d.cards] } : d
    );
    save(next);
    setFront("");
    setBack("");
    setIndex(0);
    setShowBack(false);
  };

  const delDeck = () => {
    if (!active) return;
    const next = decks.filter((d) => d.id !== active.id);
    save(next);
    setActiveId(next[0]?.id || "");
    setIndex(0);
    setShowBack(false);
  };

  const nextCard = () => {
    if (!active) return;
    if (active.cards.length === 0) return;
    setIndex((i) => (i + 1) % active.cards.length);
    setShowBack(false);
  };

  const prevCard = () => {
    if (!active) return;
    if (active.cards.length === 0) return;
    setIndex((i) => (i - 1 + active.cards.length) % active.cards.length);
    setShowBack(false);
  };

  return (
    <>
      <Head><title>Belajar • Flashcards</title></Head>
      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="text-xs font-extrabold tracking-widest text-white/60">BELAJAR</div>
          <h1 className="mt-2 text-3xl font-black tracking-tight text-white">Flashcards</h1>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-extrabold tracking-widest text-white/60">DECK</div>

              <div className="mt-3 flex gap-2">
                <input
                  value={deckName}
                  onChange={(e) => setDeckName(e.target.value)}
                  placeholder="Nama deck contoh Astronomi"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm font-black text-white/90 outline-none"
                />
                <button onClick={addDeck} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                  ADD
                </button>
              </div>

              <div className="mt-4 space-y-2">
                {decks.map((d) => (
                  <button
                    key={d.id}
                    onClick={() => { setActiveId(d.id); setIndex(0); setShowBack(false); }}
                    className={`w-full rounded-2xl border border-white/10 px-4 py-3 text-left text-sm font-black hover:bg-white/10 ${
                      d.id === activeId ? "bg-white/10" : "bg-white/5"
                    }`}
                  >
                    •{d.name} •{d.cards.length} CARD
                  </button>
                ))}
                {decks.length === 0 ? (
                  <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm font-bold text-white/70">
                    •BELUM ADA DECK
                  </div>
                ) : null}
              </div>

              <div className="mt-4 flex gap-2">
                <button onClick={delDeck} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                  DELETE DECK
                </button>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-extrabold tracking-widest text-white/60">CARD</div>

              <div className="mt-4 rounded-3xl border border-white/10 bg-slate-950/40 p-5">
                <div className="text-xs font-extrabold tracking-widest text-white/60">
                  {active ? `•${active.name.toUpperCase()}` : "•PILIH DECK"}
                </div>

                {active && active.cards.length > 0 && card ? (
                  <>
                    <div className="mt-3 text-lg font-black text-white">
                      {showBack ? card.back : card.front}
                    </div>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button onClick={() => setShowBack((v) => !v)} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                        FLIP
                      </button>
                      <button onClick={prevCard} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                        PREV
                      </button>
                      <button onClick={nextCard} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                        NEXT
                      </button>
                    </div>
                    <div className="mt-3 text-xs font-bold text-white/60">
                      •{index + 1}/{active.cards.length}
                    </div>
                  </>
                ) : (
                  <div className="mt-3 text-sm font-bold text-white/70">•BELUM ADA CARD</div>
                )}
              </div>

              <div className="mt-4 grid gap-2">
                <input
                  value={front}
                  onChange={(e) => setFront(e.target.value)}
                  placeholder="Front contoh Apa itu Big Bang"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm font-black text-white/90 outline-none"
                />
                <input
                  value={back}
                  onChange={(e) => setBack(e.target.value)}
                  placeholder="Back contoh Teori asal usul alam semesta"
                  className="w-full rounded-2xl border border-white/10 bg-slate-950/40 px-3 py-2 text-sm font-black text-white/90 outline-none"
                />
                <button onClick={addCard} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                  ADD CARD
                </button>
              </div>
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-2">
            <Link href="/learn" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black hover:bg-white/10">KEMBALI</Link>
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black hover:bg-white/10">HOME</Link>
          </div>
        </div>
      </main>
    </>
  );
}
