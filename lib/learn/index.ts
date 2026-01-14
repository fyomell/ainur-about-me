export type LearnItem = {
  id: string;
  subject: "astronomy" | "history";
  title: string;
  route: string;
  totalHint?: number;
  keywords: string[];
};

export const LEARN_INDEX: LearnItem[] = [
  {
    id: "solar-system",
    subject: "astronomy",
    title: "Tata Surya",
    route: "/learn/solar-system/1",
    totalHint: 20,
    keywords: ["planet", "orbit", "matahari", "tata surya", "moon", "mars", "jupiter"],
  },
  {
    id: "big-bang",
    subject: "astronomy",
    title: "Big Bang",
    route: "/learn/big-bang/1",
    totalHint: 20,
    keywords: ["big bang", "alam semesta", "ekspansi", "inflasi", "redshift", "cmb"],
  },
  {
    id: "black-hole",
    subject: "astronomy",
    title: "Black Hole",
    route: "/learn/black-hole/1",
    totalHint: 20,
    keywords: ["black hole", "event horizon", "gravitasi", "singularitas", "hawking"],
  },
  {
    id: "three-stars",
    subject: "astronomy",
    title: "3 Bintang Sejajar",
    route: "/learn/three-stars/1",
    totalHint: 20,
    keywords: ["bintang", "sejajar", "konstelasi", "orion", "sabuk orion"],
  },
  {
    id: "british-empire",
    subject: "history",
    title: "Kekaisaran Britania Raya",
    route: "/learn/history/british-empire/1",
    totalHint: 60,
    keywords: ["british empire", "koloni", "imperium", "india", "royal navy", "commonwealth"],
  },
];
