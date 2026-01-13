type Theme = "solar" | "bigbang" | "blackhole";

function lcg(seed: number) {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}

const THEMES: Record<Theme, { bg1: string; bg2: string; accent1: string; accent2: string; title: string }> = {
  solar: { bg1: "#0b1633", bg2: "#020617", accent1: "#60a5fa", accent2: "#fbbf24", title: "SOLAR SYSTEM" },
  bigbang: { bg1: "#2a0b3d", bg2: "#020617", accent1: "#a78bfa", accent2: "#34d399", title: "BIG BANG" },
  blackhole: { bg1: "#081018", bg2: "#020617", accent1: "#22c55e", accent2: "#60a5fa", title: "BLACK HOLE" },
};

export function makeLessonImage(theme: Theme, page: number, heading?: string) {
  const t = THEMES[theme];
  const r = lcg(page * 999 + theme.length * 777);
  const stars = Array.from({ length: 70 }, () => {
    const x = Math.floor(r() * 1200);
    const y = Math.floor(r() * 520);
    const rad = (r() * 1.5 + 0.6).toFixed(2);
    const op = (r() * 0.6 + 0.25).toFixed(2);
    return `<circle cx="${x}" cy="${y}" r="${rad}" fill="#fff" opacity="${op}"/>`;
  }).join("");

  const center = (() => {
    if (theme === "solar") {
      return `
        <defs>
          <radialGradient id="sun" cx="40%" cy="35%" r="70%">
            <stop offset="0%" stop-color="${t.accent2}" stop-opacity="1"/>
            <stop offset="55%" stop-color="#fb923c" stop-opacity=".95"/>
            <stop offset="100%" stop-color="#7c2d12" stop-opacity=".3"/>
          </radialGradient>
        </defs>
        <circle cx="900" cy="260" r="92" fill="url(#sun)" opacity=".95"/>
        <circle cx="900" cy="260" r="150" fill="none" stroke="${t.accent1}" stroke-opacity=".25" stroke-width="2"/>
        <circle cx="900" cy="260" r="210" fill="none" stroke="${t.accent1}" stroke-opacity=".18" stroke-width="2"/>
        <circle cx="900" cy="260" r="260" fill="none" stroke="${t.accent1}" stroke-opacity=".12" stroke-width="2"/>
      `;
    }
    if (theme === "bigbang") {
      const bursts = Array.from({ length: 9 }, (_, i) => {
        const rr = 60 + i * 45;
        return `<circle cx="900" cy="260" r="${rr}" fill="none" stroke="${i % 2 ? t.accent1 : t.accent2}" stroke-opacity="${(0.28 - i*0.02).toFixed(2)}" stroke-width="3"/>`;
      }).join("");
      return `
        <defs>
          <radialGradient id="boom" cx="55%" cy="50%" r="65%">
            <stop offset="0%" stop-color="${t.accent2}" stop-opacity="1"/>
            <stop offset="35%" stop-color="${t.accent1}" stop-opacity=".9"/>
            <stop offset="100%" stop-color="#020617" stop-opacity="0"/>
          </radialGradient>
        </defs>
        <circle cx="900" cy="260" r="210" fill="url(#boom)" opacity=".85"/>
        ${bursts}
      `;
    }
    // blackhole
    return `
      <defs>
        <radialGradient id="disk" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stop-color="#000" stop-opacity="1"/>
          <stop offset="35%" stop-color="#000" stop-opacity="1"/>
          <stop offset="60%" stop-color="${t.accent2}" stop-opacity=".65"/>
          <stop offset="100%" stop-color="${t.accent1}" stop-opacity="0"/>
        </radialGradient>
        <filter id="glow"><feGaussianBlur stdDeviation="8" result="b"/><feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge></filter>
      </defs>
      <ellipse cx="900" cy="260" rx="230" ry="85" fill="url(#disk)" filter="url(#glow)" opacity=".9"/>
      <circle cx="900" cy="260" r="78" fill="#000"/>
      <circle cx="900" cy="260" r="130" fill="none" stroke="${t.accent2}" stroke-opacity=".18" stroke-width="2"/>
      <circle cx="900" cy="260" r="175" fill="none" stroke="${t.accent1}" stroke-opacity=".12" stroke-width="2"/>
    `;
  })();

  const h = (heading ?? t.title).slice(0, 34).toUpperCase();

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 520">
    <defs>
      <radialGradient id="bg" cx="25%" cy="25%" r="95%">
        <stop offset="0%" stop-color="${t.bg1}"/>
        <stop offset="70%" stop-color="${t.bg2}"/>
        <stop offset="100%" stop-color="#020617"/>
      </radialGradient>
      <linearGradient id="line" x1="0" y1="0" x2="1" y2="0">
        <stop offset="0%" stop-color="${t.accent1}" stop-opacity=".9"/>
        <stop offset="100%" stop-color="${t.accent2}" stop-opacity=".9"/>
      </linearGradient>
      <style>
        .t{font:900 22px system-ui,Segoe UI,Arial;fill:rgba(255,255,255,.9)}
        .s{font:700 14px system-ui,Segoe UI,Arial;fill:rgba(255,255,255,.65)}
        .p{fill:rgba(255,255,255,.10)}
      </style>
    </defs>

    <rect width="1200" height="520" fill="url(#bg)"/>
    <g opacity=".9">${stars}</g>

    <text x="70" y="78" class="t">${t.title} • PAGE ${page}</text>
    <text x="70" y="106" class="s">${h}</text>

    <rect x="70" y="140" width="1060" height="320" rx="26" class="p"/>
    <rect x="90" y="170" width="560" height="10" rx="6" fill="url(#line)" opacity=".7"/>
    <text x="90" y="210" class="s">•AUTO GENERATED IMAGE •DIFFERENT PER PAGE</text>
    <text x="90" y="238" class="s">•SPACE THEME •CLEAN UI</text>

    <g>${center}</g>
  </svg>
  `.trim();

  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}
