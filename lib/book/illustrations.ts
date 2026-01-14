function hash(seed: string) {
  let h = 2166136261;
  for (let i = 0; i < seed.length; i++) {
    h ^= seed.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return (h >>> 0);
}

function rand(seed: string, n: number) {
  const h = hash(seed);
  return (h % n);
}

function enc(svg: string) {
  return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svg);
}

export function bookImage(seed: string, title: string, mode: "space" | "history") {
  const r = rand(seed, 360);
  const r2 = rand(seed + "x", 360);

  const stars = Array.from({ length: 55 })
    .map((_, i) => {
      const x = rand(seed + "sx" + i, 1200);
      const y = rand(seed + "sy" + i, 640);
      const s = (rand(seed + "ss" + i, 14) + 6) / 10;
      const o = (rand(seed + "so" + i, 60) + 20) / 100;
      return `<circle cx="${x}" cy="${y}" r="${s}" fill="white" opacity="${o}"/>`;
    })
    .join("");

  // =========================
  // SPACE MODE (ASTRONOMY)
  // =========================
  if (mode === "space") {
    const planetX = 220 + rand(seed + "p", 700);
    const planetY = 170 + rand(seed + "py", 280);
    const planetR = 85 + rand(seed + "pr", 70);
    const moonX = planetX + 140;
    const moonY = planetY - 70;
    const moonR = 22 + rand(seed + "mr", 18);

    const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="640" viewBox="0 0 1200 640">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${r},70%,12%)"/>
      <stop offset="1" stop-color="hsl(${r2},75%,8%)"/>
    </linearGradient>
    <radialGradient id="glow" cx="50%" cy="40%" r="70%">
      <stop offset="0" stop-color="white" stop-opacity="0.22"/>
      <stop offset="1" stop-color="white" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="planet" cx="35%" cy="35%" r="75%">
      <stop offset="0" stop-color="hsl(${(r+40)%360},80%,55%)"/>
      <stop offset="1" stop-color="hsl(${(r+15)%360},80%,25%)"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="640" fill="url(#bg)"/>
  <rect width="1200" height="640" fill="url(#glow)"/>
  ${stars}

  <circle cx="${planetX}" cy="${planetY}" r="${planetR}" fill="url(#planet)" opacity="0.95"/>
  <circle cx="${moonX}" cy="${moonY}" r="${moonR}" fill="white" opacity="0.85"/>
  <circle cx="${moonX}" cy="${moonY}" r="${moonR+10}" fill="none" stroke="white" opacity="0.10" stroke-width="2"/>

  <text x="50" y="590" font-family="Arial, sans-serif" font-size="40" fill="white" opacity="0.85" font-weight="900">${title}</text>
  <text x="50" y="628" font-family="Arial, sans-serif" font-size="18" fill="white" opacity="0.55" font-weight="700">•ASTRONOMY THEME •BOOK PAGE STYLE</text>
</svg>`;
    return enc(svg);
  }

  // =========================
  // HISTORY MODE (WORLD HISTORY)
  // Tema: peta kuno + kompas + mahkota + rute pelayaran
  // =========================
  const hueA = 205; // navy
  const hueB = 28;  // parchment/brown
  const ocean = `hsl(${hueA},60%,10%)`;
  const ink = `rgba(255,255,255,0.78)`;
  const inkSoft = `rgba(255,255,255,0.45)`;
  const paper = `rgba(245, 231, 198, 0.92)`;
  const paper2 = `rgba(229, 206, 160, 0.92)`;

  // posisi kompas beda2 tiap halaman
  const cx = 220 + rand(seed + "cx", 700);
  const cy = 150 + rand(seed + "cy", 320);

  // rute pelayaran random
  const routeY = 240 + rand(seed + "ry", 220);
  const routeY2 = 260 + rand(seed + "ry2", 240);

  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="640" viewBox="0 0 1200 640">
  <defs>
    <linearGradient id="bgH" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${ocean}"/>
      <stop offset="1" stop-color="hsl(${hueA},55%,7%)"/>
    </linearGradient>

    <linearGradient id="paperG" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="${paper}"/>
      <stop offset="1" stop-color="${paper2}"/>
    </linearGradient>

    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="18" stdDeviation="18" flood-color="rgba(0,0,0,0.45)"/>
    </filter>

    <pattern id="grid" width="42" height="42" patternUnits="userSpaceOnUse">
      <path d="M42 0H0V42" fill="none" stroke="rgba(0,0,0,0.10)" stroke-width="2"/>
    </pattern>
  </defs>

  <rect width="1200" height="640" fill="url(#bgH)"/>
  ${stars}

  <!-- “bendera” watermark halus -->
  <g opacity="0.10">
    <path d="M-120 80 L220 -60 L1320 520 L980 660 Z" fill="rgba(255,255,255,0.35)"/>
    <path d="M-120 560 L220 700 L1320 120 L980 -20 Z" fill="rgba(255,70,70,0.25)"/>
  </g>

  <!-- kertas peta -->
  <g filter="url(#shadow)">
    <rect x="80" y="110" width="1040" height="430" rx="40" fill="url(#paperG)"/>
    <rect x="80" y="110" width="1040" height="430" rx="40" fill="url(#grid)" opacity="0.65"/>
    <rect x="110" y="140" width="980" height="370" rx="32" fill="rgba(0,0,0,0.05)" opacity="0.35"/>
  </g>

  <!-- “peta dunia” simpel (silhouette style) -->
  <g opacity="0.55" fill="rgba(0,0,0,0.28)">
    <path d="M220 260 C260 220, 320 215, 355 240 C385 262, 370 310, 330 330 C285 352, 230 330, 215 300 C205 282, 206 270, 220 260 Z"/>
    <path d="M420 245 C470 215, 560 215, 610 255 C660 295, 640 360, 580 385 C520 410, 455 390, 430 350 C405 312, 392 268, 420 245 Z"/>
    <path d="M720 240 C770 215, 835 225, 875 260 C915 296, 905 350, 860 380 C815 410, 760 395, 735 360 C710 325, 690 270, 720 240 Z"/>
    <path d="M780 390 C820 370, 875 380, 900 410 C925 440, 900 480, 850 492 C800 505, 770 475, 768 445 C766 420, 767 402, 780 390 Z"/>
  </g>

  <!-- rute pelayaran -->
  <path d="M160 ${routeY} C340 ${routeY-90}, 520 ${routeY+80}, 720 ${routeY-20} S1020 ${routeY+40}, 1070 ${routeY-30}"
        fill="none" stroke="rgba(0,0,0,0.35)" stroke-width="4" stroke-dasharray="10 12"/>
  <path d="M170 ${routeY2} C360 ${routeY2+70}, 560 ${routeY2-60}, 770 ${routeY2+10} S1020 ${routeY2-10}, 1080 ${routeY2+30}"
        fill="none" stroke="rgba(0,0,0,0.25)" stroke-width="3" stroke-dasharray="8 12"/>

  <!-- Kompas -->
  <g transform="translate(${cx}, ${cy})" opacity="0.78">
    <circle cx="0" cy="0" r="58" fill="rgba(0,0,0,0.18)"/>
    <circle cx="0" cy="0" r="52" fill="rgba(255,255,255,0.35)"/>
    <path d="M0 -48 L10 0 L0 48 L-10 0 Z" fill="rgba(255,70,70,0.45)"/>
    <path d="M-48 0 L0 10 L48 0 L0 -10 Z" fill="rgba(0,0,0,0.25)"/>
    <text x="-8" y="-62" font-family="Arial" font-size="18" fill="rgba(0,0,0,0.45)" font-weight="900">N</text>
  </g>

  <!-- Mahkota kecil -->
  <g transform="translate(110, 165)" opacity="0.85">
    <path d="M0 34 L90 34 L84 8 L63 24 L45 6 L27 24 L6 8 Z" fill="rgba(0,0,0,0.28)"/>
    <circle cx="6" cy="8" r="5" fill="rgba(255,70,70,0.45)"/>
    <circle cx="45" cy="6" r="5" fill="rgba(255,70,70,0.45)"/>
    <circle cx="84" cy="8" r="5" fill="rgba(255,70,70,0.45)"/>
  </g>

  <text x="50" y="590" font-family="Arial, sans-serif" font-size="40" fill="${ink}" font-weight="900">${title}</text>
  <text x="50" y="628" font-family="Arial, sans-serif" font-size="18" fill="${inkSoft}" font-weight="800">•WORLD HISTORY •BOOK PAGE STYLE</text>
</svg>`;
  return enc(svg);
}
