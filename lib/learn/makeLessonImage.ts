function hash(str: string) {
  // FNV-1a 32-bit
  let h = 2166136261;
  for (let i = 0; i < str.length; i++) {
    h ^= str.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function clamp(n: number, a: number, b: number) {
  return Math.max(a, Math.min(b, n));
}

export function makeLessonImage(topic: string, page: number, title?: string) {
  const w = 1200;
  const h = 520;
  const p = Number.isFinite(page) && page > 0 ? Math.floor(page) : 1;

  const seed = hash(`${topic}|${p}|${title ?? ""}`);
  const rnd = mulberry32(seed);

  const bgA = Math.floor(10 + rnd() * 20);
  const bgB = Math.floor(20 + rnd() * 40);

  const stars: string[] = [];
  const starCount = 90;

  for (let i = 0; i < starCount; i++) {
    const x = Math.floor(rnd() * w);
    const y = Math.floor(rnd() * h);
    const r = (rnd() * 1.8 + 0.35).toFixed(2);
    const o = (0.25 + rnd() * 0.7).toFixed(2);
    stars.push(`<circle cx="${x}" cy="${y}" r="${r}" fill="white" opacity="${o}"/>`);
  }

  // little dust/nebula blobs
  const blobs: string[] = [];
  const blobCount = 4;
  for (let i = 0; i < blobCount; i++) {
    const cx = Math.floor(rnd() * w);
    const cy = Math.floor(rnd() * h);
    const rr = Math.floor(140 + rnd() * 260);
    const op = (0.10 + rnd() * 0.18).toFixed(2);
    blobs.push(
      `<circle cx="${cx}" cy="${cy}" r="${rr}" fill="url(#neb${i})" opacity="${op}"/>`
    );
  }

  // main object per topic
  const t = topic.toLowerCase();
  let main = "";

  const variant = p % 6;

  if (t.includes("black")) {
    // black hole
    const cx = Math.floor(w * 0.62);
    const cy = Math.floor(h * 0.52);
    const R = 130 + (p % 5) * 6;
    const ringR = R + 70;

    main = `
      <circle cx="${cx}" cy="${cy}" r="${ringR}" fill="url(#disk)" opacity="0.9"/>
      <circle cx="${cx}" cy="${cy}" r="${R}" fill="#02030a"/>
      <circle cx="${cx}" cy="${cy}" r="${R + 6}" fill="none" stroke="rgba(255,255,255,0.10)" stroke-width="10"/>
      <path d="M ${cx - ringR} ${cy} A ${ringR} ${ringR} 0 0 1 ${cx + ringR} ${cy}" stroke="rgba(135,206,235,0.35)" stroke-width="14" fill="none"/>
    `;
  } else if (t.includes("bigbang") || t.includes("big-bang")) {
    // big bang burst
    const cx = Math.floor(w * 0.52);
    const cy = Math.floor(h * 0.52);
    const rays: string[] = [];
    for (let i = 0; i < 40; i++) {
      const ang = rnd() * Math.PI * 2;
      const r1 = 30 + rnd() * 80;
      const r2 = 260 + rnd() * 240;
      const x1 = cx + Math.cos(ang) * r1;
      const y1 = cy + Math.sin(ang) * r1;
      const x2 = cx + Math.cos(ang) * r2;
      const y2 = cy + Math.sin(ang) * r2;
      const op = (0.08 + rnd() * 0.22).toFixed(2);
      rays.push(`<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="rgba(255,255,255,${op})" stroke-width="2"/>`);
    }
    main = `
      <circle cx="${cx}" cy="${cy}" r="260" fill="url(#burst)"/>
      ${rays.join("")}
      <circle cx="${cx}" cy="${cy}" r="70" fill="rgba(255,255,255,0.10)"/>
    `;
  } else if (t.includes("three") || t.includes("orion") || t.includes("stars")) {
    // three aligned stars (Orion belt vibe)
    const cx = Math.floor(w * 0.52);
    const cy = Math.floor(h * 0.52);
    const angle = (-18 + (p % 9) * 4) * (Math.PI / 180);
    const spacing = 150;

    const pts = [-1, 0, 1].map((k) => {
      const x = cx + Math.cos(angle) * (k * spacing);
      const y = cy + Math.sin(angle) * (k * spacing);
      return { x, y };
    });

    const line = `<path d="M ${pts[0].x} ${pts[0].y} L ${pts[1].x} ${pts[1].y} L ${pts[2].x} ${pts[2].y}"
      stroke="rgba(135,206,235,0.25)" stroke-width="4" fill="none"/>`;

    const stars3 = pts
      .map((pnt, i) => {
        const rr = 18 + (i * 4) + (p % 3) * 2;
        const glow = rr * 3.4;
        return `
          <circle cx="${pnt.x}" cy="${pnt.y}" r="${glow}" fill="rgba(135,206,235,0.15)"/>
          <circle cx="${pnt.x}" cy="${pnt.y}" r="${rr}" fill="url(#starGlow)"/>
          <circle cx="${pnt.x}" cy="${pnt.y}" r="${rr - 7}" fill="rgba(255,255,255,0.85)"/>
        `;
      })
      .join("");

    main = `${line}${stars3}`;
  } else {
    // solar/astronomy generic: moon/planet/sun
    const cx = Math.floor(w * 0.68);
    const cy = Math.floor(h * 0.55);

    if (variant === 0) {
      // moon
      main = `
        <circle cx="${cx}" cy="${cy}" r="140" fill="url(#moon)"/>
        <circle cx="${cx + 45}" cy="${cy - 25}" r="120" fill="rgba(0,0,0,0.20)"/>
      `;
    } else if (variant === 1) {
      // ring planet
      main = `
        <ellipse cx="${cx}" cy="${cy}" rx="220" ry="70" fill="rgba(135,206,235,0.14)"/>
        <ellipse cx="${cx}" cy="${cy}" rx="220" ry="70" fill="none" stroke="rgba(255,255,255,0.15)" stroke-width="6"/>
        <circle cx="${cx}" cy="${cy}" r="130" fill="url(#planet)"/>
      `;
    } else if (variant === 2) {
      // sun-ish
      main = `
        <circle cx="${cx}" cy="${cy}" r="190" fill="rgba(255,180,70,0.10)"/>
        <circle cx="${cx}" cy="${cy}" r="130" fill="url(#sun)"/>
      `;
    } else {
      // planet + small moons
      main = `
        <circle cx="${cx}" cy="${cy}" r="135" fill="url(#planet2)"/>
        <circle cx="${cx - 210}" cy="${cy - 110}" r="18" fill="rgba(255,255,255,0.75)"/>
        <circle cx="${cx - 140}" cy="${cy - 170}" r="10" fill="rgba(255,255,255,0.55)"/>
        <circle cx="${cx - 260}" cy="${cy - 40}" r="8" fill="rgba(255,255,255,0.45)"/>
      `;
    }
  }

  const safeTitle = (title ?? "").replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  const label = `BAB • ${topic.toUpperCase()} • HALAMAN ${p}`;

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="${w}" height="${h}" viewBox="0 0 ${w} ${h}">
    <defs>
      <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="rgb(${bgA},${bgA + 10},${bgB + 40})"/>
        <stop offset="1" stop-color="rgb(${bgA + 5},${bgA + 6},${bgB + 10})"/>
      </linearGradient>

      ${Array.from({ length: 4 }).map((_, i) => `
        <radialGradient id="neb${i}">
          <stop offset="0" stop-color="rgba(135,206,235,0.70)"/>
          <stop offset="1" stop-color="rgba(10,12,30,0)"/>
        </radialGradient>
      `).join("")}

      <radialGradient id="moon">
        <stop offset="0" stop-color="rgba(240,240,255,0.95)"/>
        <stop offset="1" stop-color="rgba(160,170,220,0.85)"/>
      </radialGradient>

      <radialGradient id="planet">
        <stop offset="0" stop-color="rgba(160,220,255,0.95)"/>
        <stop offset="1" stop-color="rgba(60,120,220,0.90)"/>
      </radialGradient>

      <radialGradient id="planet2">
        <stop offset="0" stop-color="rgba(210,140,255,0.92)"/>
        <stop offset="1" stop-color="rgba(90,70,220,0.90)"/>
      </radialGradient>

      <radialGradient id="sun">
        <stop offset="0" stop-color="rgba(255,255,255,0.95)"/>
        <stop offset="1" stop-color="rgba(255,170,70,0.90)"/>
      </radialGradient>

      <radialGradient id="burst">
        <stop offset="0" stop-color="rgba(255,255,255,0.22)"/>
        <stop offset="1" stop-color="rgba(10,12,30,0)"/>
      </radialGradient>

      <radialGradient id="starGlow">
        <stop offset="0" stop-color="rgba(255,255,255,0.95)"/>
        <stop offset="1" stop-color="rgba(135,206,235,0.55)"/>
      </radialGradient>

      <radialGradient id="disk">
        <stop offset="0" stop-color="rgba(255,255,255,0)"/>
        <stop offset="0.55" stop-color="rgba(135,206,235,0.20)"/>
        <stop offset="1" stop-color="rgba(255,140,0,0.18)"/>
      </radialGradient>
    </defs>

    <rect width="${w}" height="${h}" fill="url(#bg)"/>
    ${blobs.join("")}
    ${stars.join("")}

    ${main}

    <rect x="28" y="${h - 82}" width="${w - 56}" height="54" rx="18" fill="rgba(0,0,0,0.35)" stroke="rgba(255,255,255,0.12)"/>
    <text x="52" y="${h - 50}" fill="rgba(255,255,255,0.85)" font-family="Arial, sans-serif" font-size="18" font-weight="800">${label}</text>
    <text x="52" y="${h - 30}" fill="rgba(255,255,255,0.55)" font-family="Arial, sans-serif" font-size="14" font-weight="700">${safeTitle}</text>
  </svg>
  `.trim();

  return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;
}
