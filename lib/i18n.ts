export type LangCode = "id" | "ms" | "en" | "ja" | "zh" | "sg";

export const LANGS: { code: LangCode; label: string }[] = [
  { code: "id", label: "Indonesia" },
  { code: "ms", label: "Malaysia" },
  { code: "en", label: "English" },
  { code: "ja", label: "日本語" },
  { code: "zh", label: "中文" },
  { code: "sg", label: "Singapore" },
];

type Strings = {
  menuBelajar: string;
  menuAbout: string;
  menuTools: string;
  menuContact: string;
  menuHome: string;

  btnContactMe: string;
  btnBelajar: string;
  btnSeeProfile: string;

  heroTagline: string;
  heroSubtitle: string;

  supporters: string;
  favSubjects: string;
  goals: string;
  projects: string;
  achievements: string;
  courses: string;
  schoolRanks: string;
  contact: string;

  open: string;
  copy: string;
  send: string;

  toolsSoon: string;
};

const T: Record<LangCode, Strings> = {
  id: {
    menuBelajar: "Belajar",
    menuAbout: "Tentang",
    menuTools: "Tools",
    menuContact: "Kontak",
    menuHome: "Home",

    btnContactMe: "KONTAK SAYA",
    btnBelajar: "BELAJAR ASTRONOMI",
    btnSeeProfile: "LIHAT PROFIL",

    heroTagline: "SPACE VIBES • CLEAN UI • BULLET FORMAT • FAST CONTACT",
    heroSubtitle: "Website About Me dengan tema astronomi dan tampilan modern",

    supporters: "PENDUKUNG",
    favSubjects: "MAPEL FAVORIT",
    goals: "TUJUAN SAYA",
    projects: "PROYEK",
    achievements: "PENCAPAIAN",
    courses: "SERTIFIKAT LES",
    schoolRanks: "PERINGKAT SD",
    contact: "KONTAK",

    open: "Buka",
    copy: "Salin",
    send: "Kirim",

    toolsSoon: "•SEGERA HADIR\n•NEXT: QUIZ ASTRONOMI",
  },

  ms: {
    menuBelajar: "Belajar",
    menuAbout: "Tentang",
    menuTools: "Tools",
    menuContact: "Kontak",
    menuHome: "Home",

    btnContactMe: "HUBUNGI SAYA",
    btnBelajar: "BELAJAR ASTRONOMI",
    btnSeeProfile: "LIHAT PROFIL",

    heroTagline: "SPACE VIBES • CLEAN UI • BULLET FORMAT • FAST CONTACT",
    heroSubtitle: "Laman About Me bertema astronomi dengan susun atur moden",

    supporters: "PENYOKONG",
    favSubjects: "SUBJEK KEGEMARAN",
    goals: "MATLAMAT SAYA",
    projects: "PROJEK",
    achievements: "PENCAPAIAN",
    courses: "KURSUS",
    schoolRanks: "KEDUDUKAN SEKOLAH RENDAH",
    contact: "KONTAK",

    open: "Buka",
    copy: "Salin",
    send: "Hantar",

    toolsSoon: "•AKAN DATANG\n•SETELAH INI: QUIZ ASTRONOMI",
  },

  en: {
    menuBelajar: "Belajar",
    menuAbout: "About",
    menuTools: "Tools",
    menuContact: "Contact",
    menuHome: "Home",

    btnContactMe: "CONTACT ME",
    btnBelajar: "LEARN ASTRONOMY",
    btnSeeProfile: "SEE PROFILE",

    heroTagline: "SPACE VIBES • CLEAN UI • BULLET FORMAT • FAST CONTACT",
    heroSubtitle: "A modern About Me page with an astronomy theme",

    supporters: "SUPPORTERS",
    favSubjects: "FAVORITE SUBJECTS",
    goals: "MY GOALS",
    projects: "PROJECTS",
    achievements: "ACHIEVEMENTS",
    courses: "COURSES",
    schoolRanks: "ELEMENTARY RANKS",
    contact: "CONTACT",

    open: "Open",
    copy: "Copy",
    send: "Send",

    toolsSoon: "•COMING SOON\n•NEXT: ASTRONOMY QUIZ",
  },

  ja: {
    menuBelajar: "学ぶ",
    menuAbout: "紹介",
    menuTools: "ツール",
    menuContact: "連絡",
    menuHome: "ホーム",

    btnContactMe: "連絡する",
    btnBelajar: "天文学を学ぶ",
    btnSeeProfile: "プロフィール",

    heroTagline: "SPACE VIBES • CLEAN UI • BULLET FORMAT • FAST CONTACT",
    heroSubtitle: "天文学テーマのシンプルな自己紹介サイト",

    supporters: "サポーター",
    favSubjects: "好きな科目",
    goals: "目標",
    projects: "プロジェクト",
    achievements: "実績",
    courses: "講座",
    schoolRanks: "小学校の順位",
    contact: "連絡先",

    open: "開く",
    copy: "コピー",
    send: "送信",

    toolsSoon: "•準備中\n•次: 天文学クイズ",
  },

  zh: {
    menuBelajar: "学习",
    menuAbout: "关于",
    menuTools: "工具",
    menuContact: "联系",
    menuHome: "主页",

    btnContactMe: "联系我",
    btnBelajar: "学习天文学",
    btnSeeProfile: "查看资料",

    heroTagline: "SPACE VIBES • CLEAN UI • BULLET FORMAT • FAST CONTACT",
    heroSubtitle: "天文学主题的个人简介网站",

    supporters: "支持者",
    favSubjects: "喜欢的科目",
    goals: "我的目标",
    projects: "项目",
    achievements: "成就",
    courses: "课程",
    schoolRanks: "小学排名",
    contact: "联系",

    open: "打开",
    copy: "复制",
    send: "发送",

    toolsSoon: "•即将上线\n•下一步: 天文学测验",
  },

  sg: {
    menuBelajar: "Belajar",
    menuAbout: "About",
    menuTools: "Tools",
    menuContact: "Contact",
    menuHome: "Home",

    btnContactMe: "CONTACT ME",
    btnBelajar: "BELAJAR ASTRONOMY",
    btnSeeProfile: "SEE PROFILE",

    heroTagline: "SPACE VIBES • CLEAN UI • BULLET FORMAT • FAST CONTACT",
    heroSubtitle: "Astronomy themed About Me • simple • steady",

    supporters: "SUPPORTERS",
    favSubjects: "FAV SUBJECTS",
    goals: "MY GOALS",
    projects: "PROJECTS",
    achievements: "ACHIEVEMENTS",
    courses: "COURSES",
    schoolRanks: "PRIMARY RANKS",
    contact: "CONTACT",

    open: "Open",
    copy: "Copy",
    send: "Send",

    toolsSoon: "•COMING SOON AH\n•NEXT: ASTRONOMY QUIZ",
  },
};

export function getStrings(lang: LangCode): Strings {
  return T[lang] ?? T.id;
}
