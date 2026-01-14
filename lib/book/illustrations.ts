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
  const stars = Array.from({ length: 55 }).map((_, i) => {
    const x = rand(seed + "sx" + i, 1200);
    const y = rand(seed + "sy" + i, 640);
    const s = (rand(seed + "ss" + i, 14) + 6) / 10;
    const o = (rand(seed + "so" + i, 60) + 20) / 100;
    return `<circle cx="${x}" cy="${y}" r="${s}" fill="white" opacity="${o}"/>`;
  }).join("");

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

  // HISTORY MODE
  const svg = `
<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="640" viewBox="0 0 1200 640">
  <defs>
    <linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0" stop-color="hsl(${r},60%,10%)"/>
      <stop offset="1" stop-color="hsl(${(r+30)%360},65%,7%)"/>
    </linearGradient>
    <radialGradient id="glow2" cx="40%" cy="40%" r="70%">
      <stop offset="0" stop-color="white" stop-opacity="0.16"/>
      <stop offset="1" stop-color="white" stop-opacity="0"/>
    </radialGradient>
    <radialGradient id="globe" cx="35%" cy="35%" r="75%">
      <stop offset="0" stop-color="hsl(${(r+20)%360},35%,45%)"/>
      <stop offset="1" stop-color="hsl(${(r+10)%360},35%,18%)"/>
    </radialGradient>
  </defs>

  <rect width="1200" height="640" fill="url(#bg2)"/>
  <rect width="1200" height="640" fill="url(#glow2)"/>
  ${stars}

  <circle cx="850" cy="280" r="170" fill="url(#globe)" opacity="0.95"/>
  <path d="M780 240 C820 190, 900 190, 940 235 C905 255, 865 285, 830 310 C800 295, 785 265, 780 240 Z"
        fill="rgba(255,70,70,0.35)"/>
  <path d="M820 350 C860 330, 920 340, 950 370 C925 395, 880 410, 840 395 C825 382, 818 368, 820 350 Z"
        fill="rgba(255,70,70,0.25)"/>

  <text x="50" y="590" font-family="Arial, sans-serif" font-size="40" fill="white" opacity="0.85" font-weight="900">${title}</text>
  <text x="50" y="628" font-family="Arial, sans-serif" font-size="18" fill="white" opacity="0.55" font-weight="700">•WORLD HISTORY •BOOK PAGE STYLE</text>
</svg>`;
  return enc(svg);
}
