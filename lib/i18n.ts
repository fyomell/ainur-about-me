export type LangCode = "id" | "ms" | "en" | "ja" | "zh" | "sg";

export const LANGS: { code: LangCode; label: string }[] = [
  { code: "id", label: "Indonesia" },
  { code: "ms", label: "Malaysia" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
  { code: "sg", label: "Singapore" },
];

type Text = {
  belajar: string;
  createCard: string;
  contact: string;
  tagline: string;
  quoteLabel: string;
};

const T: Record<LangCode, Text> = {
  id: { belajar: "Belajar", createCard: "Create Card", contact: "Kontak", tagline: "SPACE VIBES • CLEAN UI • BULLET FORMAT • FAST CONTACT", quoteLabel: "KATA MOTIVASI" },
  ms: { belajar: "Belajar", createCard: "Create Card", contact: "Kontak", tagline: "SPACE VIBES • CLEAN UI • FORMAT BULLET • HUBUNGI CEPAT", quoteLabel: "KATA MOTIVASI" },
  en: { belajar: "Learn", createCard: "Create Card", contact: "Contact", tagline: "SPACE VIBES • CLEAN UI • BULLET FORMAT • FAST CONTACT", quoteLabel: "MOTIVATION" },
  ja: { belajar: "学ぶ", createCard: "カード作成", contact: "連絡", tagline: "SPACE VIBES • CLEAN UI • BULLET • FAST CONTACT", quoteLabel: "モチベ" },
  zh: { belajar: "学习", createCard: "制作卡片", contact: "联系", tagline: "SPACE VIBES • CLEAN UI • BULLET • FAST CONTACT", quoteLabel: "励志" },
  sg: { belajar: "Belajar", createCard: "Create Card", contact: "Contact", tagline: "SPACE VIBES • CLEAN UI • BULLET • FAST CONTACT", quoteLabel: "MOTIVATION LA" },
};

export function getText(lang: LangCode): Text {
  return T[lang] ?? T.id;
}
