set -e

mkdir -p lib/book
mkdir -p components/book

# =========================
# 1) lib/book/illustrations.ts (gambar SVG astronomi/history biar beda tiap halaman)
# =========================
cat > lib/book/illustrations.ts <<'EOT'
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
EOT

# =========================
# 2) lib/book/books.ts (ISI MATERI PANJANG PER HALAMAN DI SINI)
#    Tiap halaman: intro • 3 subjudul • ringkasan • kata kunci • latihan
# =========================
cat > lib/book/books.ts <<'EOT'
import { bookImage } from "./illustrations";

export type BookPage = {
  title: string;
  imageSeed: string;
  mode: "space" | "history";
  intro: string[];
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  summaryBullets: string[];
  keyTerms: string[];
  quiz: { q: string; a: string }[];
};

export type Book = {
  id: string;
  subjectLabel: string;
  bookTitle: string;
  pages: BookPage[];
};

function mkPage(args: {
  title: string;
  seed: string;
  mode: "space" | "history";
  intro: string[];
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  summaryBullets: string[];
  keyTerms: string[];
  quiz: { q: string; a: string }[];
}): BookPage {
  return {
    title: args.title,
    imageSeed: args.seed,
    mode: args.mode,
    intro: args.intro,
    sections: args.sections,
    summaryBullets: args.summaryBullets,
    keyTerms: args.keyTerms,
    quiz: args.quiz,
  };
}

/**
 * SOLAR SYSTEM (contoh 6 halaman dulu tapi tiap halaman panjang)
 * Kamu bisa nambah sampai 20+ halaman tinggal copy mkPage dan ganti topik
 */
const SOLAR_SYSTEM: BookPage[] = [
  mkPage({
    title: "Gambaran Umum Tata Surya",
    seed: "solar-1",
    mode: "space",
    intro: [
      "Tata surya adalah sistem yang terdiri dari Matahari sebagai pusat, lalu planet, satelit, asteroid, komet, dan debu antariksa yang mengorbit karena gravitasi.",
      "Supaya belajar terasa seperti buku sekolah, setiap halaman dibuat panjang: ada paragraf, subjudul, ringkasan, kata kunci, dan latihan.",
    ],
    sections: [
      {
        heading: "Apa yang jadi pusat tata surya",
        paragraphs: [
          "Matahari menyimpan hampir seluruh massa tata surya. Karena massanya besar, gravitasi Matahari mengatur gerak planet dan benda langit lain.",
          "Energi Matahari berasal dari fusi nuklir di inti. Energi ini mempengaruhi cuaca antariksa dan kondisi planet melalui cahaya serta partikel bermuatan.",
        ],
        bullets: ["•Massa dominan di Matahari", "•Sumber energi dari fusi", "•Gravitasi mengendalikan orbit"],
      },
      {
        heading: "Kenapa planet bisa mengorbit",
        paragraphs: [
          "Orbit terjadi karena keseimbangan antara kecepatan maju planet dan tarikan gravitasi. Jika terlalu lambat, benda jatuh ke Matahari. Jika terlalu cepat, benda bisa lepas.",
          "Bentuk orbit umumnya elips. Jarak terdekat disebut perihelion dan jarak terjauh disebut aphelion.",
        ],
      },
      {
        heading: "Objek lain selain planet",
        paragraphs: [
          "Asteroid banyak berada di Sabuk Asteroid antara Mars dan Jupiter. Komet biasanya berasal dari daerah luar seperti Sabuk Kuiper atau Awan Oort.",
          "Meteoroid yang masuk atmosfer dapat menjadi meteor. Bila sisa batuannya jatuh ke permukaan, disebut meteorit.",
        ],
      },
    ],
    summaryBullets: [
      "•Tata surya berpusat pada Matahari",
      "•Orbit terjadi karena keseimbangan kecepatan dan gravitasi",
      "•Selain planet ada asteroid • komet • meteoroid",
    ],
    keyTerms: ["•Gravitasi", "•Orbit elips", "•Perihelion", "•Aphelion", "•Sabuk Asteroid", "•Komet"],
    quiz: [
      { q: "Kenapa Matahari jadi pusat tata surya", a: "Karena massanya dominan sehingga gravitasinya paling kuat" },
      { q: "Apa beda meteor dan meteorit", a: "Meteor terlihat saat terbakar di atmosfer • meteorit adalah sisa yang jatuh ke permukaan" },
    ],
  }),
  mkPage({
    title: "Planet Batuan vs Planet Raksasa",
    seed: "solar-2",
    mode: "space",
    intro: [
      "Planet di tata surya sering dibagi menjadi planet batuan dan planet raksasa. Pembagian ini penting untuk memahami komposisi, atmosfer, dan cara terbentuknya.",
      "Planet batuan lebih padat, sedangkan planet raksasa punya lapisan gas atau es yang tebal. Perbedaan ini membuat cuaca dan medan magnetnya juga berbeda.",
    ],
    sections: [
      {
        heading: "Planet batuan",
        paragraphs: [
          "Merkurius, Venus, Bumi, dan Mars disebut planet batuan. Mereka punya permukaan padat dan inti logam yang mempengaruhi medan magnet serta aktivitas geologi.",
          "Atmosfer planet batuan sangat bervariasi. Venus sangat tebal dan panas, Bumi seimbang untuk kehidupan, Mars tipis dan dingin.",
        ],
        bullets: ["•Permukaan padat", "•Inti logam", "•Atmosfer bervariasi"],
      },
      {
        heading: "Planet raksasa gas dan es",
        paragraphs: [
          "Jupiter dan Saturnus disebut raksasa gas karena didominasi hidrogen dan helium. Uranus dan Neptunus sering disebut raksasa es karena banyak molekul seperti air • amonia • metana.",
          "Planet raksasa umumnya punya banyak satelit dan cincin. Gravitasi mereka besar sehingga berpengaruh pada orbit asteroid dan komet.",
        ],
      },
      {
        heading: "Dampak perbedaan komposisi",
        paragraphs: [
          "Komposisi mempengaruhi densitas, suhu, hingga dinamika atmosfer. Misalnya badai raksasa Jupiter bisa bertahan lama karena atmosfer tebal dan energi internal.",
          "Pada planet batuan, proses seperti gunung api, tektonik, dan erosi lebih jelas terlihat karena ada permukaan padat.",
        ],
      },
    ],
    summaryBullets: [
      "•Planet batuan: padat • inti logam",
      "•Planet raksasa: atmosfer tebal • banyak satelit",
      "•Komposisi mempengaruhi cuaca dan geologi",
    ],
    keyTerms: ["•Planet batuan", "•Raksasa gas", "•Raksasa es", "•Atmosfer", "•Densitas"],
    quiz: [
      { q: "Sebutkan planet batuan", a: "Merkurius • Venus • Bumi • Mars" },
      { q: "Kenapa Uranus dan Neptunus disebut raksasa es", a: "Karena kandungan molekul seperti air • amonia • metana lebih dominan dibanding raksasa gas" },
    ],
  }),
  mkPage({
    title: "Satelit Alam dan Cincin Planet",
    seed: "solar-3",
    mode: "space",
    intro: [
      "Banyak planet punya satelit alam. Satelit tidak hanya jadi “bulan”, tapi juga memberi petunjuk sejarah pembentukan planet.",
      "Cincin planet adalah partikel es dan batu kecil yang mengorbit. Cincin paling terkenal adalah milik Saturnus, tetapi planet lain juga punya.",
    ],
    sections: [
      {
        heading: "Kenapa satelit penting",
        paragraphs: [
          "Satelit bisa mempengaruhi pasang surut. Di Bumi, Bulan ikut mengatur pasang surut dan stabilitas kemiringan sumbu rotasi.",
          "Beberapa satelit punya aktivitas luar biasa. Ada yang dipanaskan gaya pasang surut, sehingga bisa punya gunung api atau lautan bawah permukaan.",
        ],
      },
      {
        heading: "Bagaimana cincin terbentuk",
        paragraphs: [
          "Cincin dapat berasal dari sisa pembentukan planet, atau pecahan satelit yang hancur karena gaya gravitasi kuat.",
          "Partikel cincin bergerak mengikuti hukum Kepler. Bagian dalam bergerak lebih cepat dibanding bagian luar.",
        ],
        bullets: ["•Bisa dari sisa awal", "•Bisa dari satelit pecah", "•Gerak mengikuti orbit elips kecil"],
      },
      {
        heading: "Contoh menarik",
        paragraphs: [
          "Saturnus punya sistem cincin kompleks yang terlihat jelas. Jupiter cincin tipis, Uranus dan Neptunus punya cincin gelap.",
          "Satelit juga beragam ukuran. Ada yang kecil seperti batu, ada yang besar hingga lebih besar dari planet kecil tertentu.",
        ],
      },
    ],
    summaryBullets: [
      "•Satelit mempengaruhi pasang surut dan stabilitas",
      "•Cincin terdiri dari partikel es dan batu",
      "•Cincin tidak hanya milik Saturnus",
    ],
    keyTerms: ["•Satelit alam", "•Pasang surut", "•Cincin planet", "•Hukum Kepler"],
    quiz: [
      { q: "Kenapa bagian cincin dalam bergerak lebih cepat", a: "Karena orbit lebih dekat ke planet sehingga periodenya lebih pendek" },
    ],
  }),
  mkPage({
    title: "Skala Jarak dan Waktu di Tata Surya",
    seed: "solar-4",
    mode: "space",
    intro: [
      "Tata surya punya jarak yang sangat besar, jadi dipakai satuan khusus agar mudah dibandingkan.",
      "Memahami skala membantu kita membayangkan: dari Bumi ke Matahari butuh jarak jauh, dan ke planet luar jauh lebih ekstrem.",
    ],
    sections: [
      {
        heading: "Satuan Astronomi",
        paragraphs: [
          "Satuan Astronomi atau AU adalah jarak rata-rata Bumi ke Matahari. Ini dipakai untuk menggambarkan jarak planet secara lebih ringkas.",
          "Dengan AU, kita bisa cepat membandingkan: Mars sedikit lebih jauh dari Bumi, sedangkan Neptunus puluhan AU dari Matahari.",
        ],
      },
      {
        heading: "Waktu tempuh cahaya",
        paragraphs: [
          "Cahaya dari Matahari ke Bumi butuh sekitar beberapa menit. Ke planet luar, waktunya lebih lama karena jarak bertambah.",
          "Konsep ini penting karena astronomi sering melihat objek bukan “sekarang”, tetapi “waktu lalu” sesuai waktu tempuh cahaya.",
        ],
      },
      {
        heading: "Orbit dan periode",
        paragraphs: [
          "Semakin jauh planet dari Matahari, semakin lama periodenya. Ini ringkasan dari hukum Kepler.",
          "Bumi membutuhkan sekitar satu tahun, sementara planet luar butuh bertahun-tahun hingga puluhan tahun untuk satu putaran.",
        ],
      },
    ],
    summaryBullets: [
      "•AU memudahkan perbandingan jarak",
      "•Cahaya butuh waktu tempuh",
      "•Planet jauh punya periode orbit lebih lama",
    ],
    keyTerms: ["•AU", "•Waktu tempuh cahaya", "•Periode orbit"],
    quiz: [
      { q: "Apa itu AU", a: "Jarak rata-rata Bumi ke Matahari" },
      { q: "Kenapa planet jauh lebih lama mengorbit", a: "Karena lintasan lebih besar dan kecepatan orbit lebih kecil" },
    ],
  }),
  mkPage({
    title: "Asteroid • Komet • Meteoroid",
    seed: "solar-5",
    mode: "space",
    intro: [
      "Benda kecil di tata surya sering jadi sisa pembentukan awal. Mereka penting karena menyimpan “jejak” komposisi awal.",
      "Asteroid dominan batuan, komet banyak es dan debu. Meteoroid adalah fragmen kecil yang bisa memasuki atmosfer planet.",
    ],
    sections: [
      {
        heading: "Asteroid dan sabuknya",
        paragraphs: [
          "Sabuk Asteroid adalah wilayah dengan banyak asteroid antara Mars dan Jupiter. Banyak asteroid tidak membentuk planet karena gangguan gravitasi Jupiter.",
          "Asteroid bisa jadi sumber meteoroid jika bertabrakan dan pecah.",
        ],
      },
      {
        heading: "Komet dan ekornya",
        paragraphs: [
          "Komet biasanya punya orbit sangat lonjong. Saat mendekati Matahari, es menguap dan membentuk koma serta ekor.",
          "Ekor komet mengarah menjauhi Matahari karena tekanan radiasi dan angin matahari.",
        ],
        bullets: ["•Orbit lonjong", "•Koma terbentuk saat dekat Matahari", "•Ekor menjauhi Matahari"],
      },
      {
        heading: "Meteor dan meteorit",
        paragraphs: [
          "Meteor adalah cahaya dari meteoroid yang terbakar di atmosfer. Meteorit adalah sisa yang berhasil mencapai permukaan.",
          "Dengan mempelajari meteorit, ilmuwan mendapat data tentang mineral awal tata surya.",
        ],
      },
    ],
    summaryBullets: [
      "•Asteroid dominan batuan",
      "•Komet kaya es dan debu",
      "•Meteor terlihat di atmosfer • meteorit jatuh ke permukaan",
    ],
    keyTerms: ["•Asteroid", "•Komet", "•Koma", "•Angin matahari", "•Meteor", "•Meteorit"],
    quiz: [
      { q: "Kenapa ekor komet menjauhi Matahari", a: "Karena tekanan radiasi dan angin matahari mendorong partikel menjauh" },
    ],
  }),
  mkPage({
    title: "Ringkasan Bab dan Latihan Besar",
    seed: "solar-6",
    mode: "space",
    intro: [
      "Sebelum lanjut ke bab lain, halaman ini merangkum inti konsep tata surya lalu memberi latihan lebih panjang seperti di buku sekolah.",
      "Kamu bisa pakai halaman ini sebagai review: baca ringkasannya, cek kata kunci, lalu jawab latihan.",
    ],
    sections: [
      {
        heading: "Ringkasan konsep utama",
        paragraphs: [
          "Matahari adalah pusat gravitasi tata surya. Planet mengorbit karena keseimbangan antara kecepatan dan gravitasi.",
          "Planet dibagi menjadi batuan dan raksasa. Selain planet ada satelit, cincin, asteroid, komet, dan meteoroid.",
        ],
      },
      {
        heading: "Cara belajar efektif",
        paragraphs: [
          "Buat catatan singkat per halaman menggunakan fitur Notes. Tandai halaman penting dengan Bookmark.",
          "Gunakan Flashcards untuk menghafal istilah seperti AU, perihelion, aphelion, dan lain-lain.",
        ],
        bullets: ["•Catat", "•Bookmark", "•Ulang lewat flashcards"],
      },
      {
        heading: "Latihan besar",
        paragraphs: [
          "Jawab pertanyaan berikut dengan kalimat lengkap. Jika ada yang bingung, kembali ke halaman yang membahas topiknya.",
          "Latihan ini dibuat panjang supaya terasa seperti evaluasi akhir bab.",
        ],
      },
    ],
    summaryBullets: [
      "•Pusat tata surya adalah Matahari",
      "•Planet batuan vs raksasa",
      "•Benda kecil: asteroid • komet • meteoroid",
    ],
    keyTerms: ["•Review", "•Latihan", "•Catatan", "•Bookmark", "•Flashcards"],
    quiz: [
      { q: "Jelaskan orbit dengan bahasa sederhana", a: "Orbit adalah gerak mengelilingi pusat karena gravitasi dan kecepatan seimbang" },
      { q: "Sebutkan 3 benda kecil di tata surya", a: "Asteroid • komet • meteoroid" },
      { q: "Apa manfaat AU", a: "Memudahkan membandingkan jarak planet dari Matahari" },
    ],
  }),
];

/**
 * BRITISH EMPIRE (contoh 6 halaman dulu tapi panjang)
 * Nanti kamu bisa tambah jadi 20+ tinggal copy mkPage
 */
const BRITISH_EMPIRE: BookPage[] = [
  mkPage({
    title: "Pengantar Kekaisaran Britania Raya",
    seed: "empire-1",
    mode: "history",
    intro: [
      "Kekaisaran Britania Raya adalah jaringan wilayah dan pengaruh global yang berkembang melalui perdagangan, armada laut, dan kolonialisme dalam berbagai periode.",
      "Untuk gaya buku sekolah, halaman ini dibuat lengkap: ada definisi, latar belakang, konsep penting, ringkasan, kata kunci, dan latihan.",
    ],
    sections: [
      {
        heading: "Definisi singkat",
        paragraphs: [
          "Secara umum, “British Empire” merujuk pada wilayah koloni, protektorat, dan dominion yang berada di bawah kekuasaan atau pengaruh Britania.",
          "Strukturnya berubah-ubah tergantung waktu. Ada wilayah yang dikelola langsung, ada yang semi-otonom, dan ada yang menjadi dominion dengan pemerintahan lokal.",
        ],
      },
      {
        heading: "Kenapa bisa meluas",
        paragraphs: [
          "Salah satu faktor kunci adalah kekuatan maritim. Armada laut yang kuat membantu mengamankan rute dagang serta pelabuhan strategis.",
          "Selain itu, jaringan dagang dan perusahaan seperti East India Company berperan besar di beberapa wilayah, terutama pada fase awal ekspansi.",
        ],
        bullets: ["•Armada laut", "•Rute dagang", "•Pelabuhan strategis", "•Perusahaan dagang"],
      },
      {
        heading: "Puncak dan perubahan",
        paragraphs: [
          "Puncak luas dan pengaruh sering dikaitkan dengan abad ke-19 hingga awal abad ke-20. Namun, periode puncak berbeda tergantung indikator yang dipakai.",
          "Setelah Perang Dunia II, dekolonisasi terjadi bertahap dan banyak wilayah kemudian terhubung melalui Commonwealth.",
        ],
      },
    ],
    summaryBullets: [
      "•Imperium berupa jaringan wilayah dan pengaruh",
      "•Kekuatan laut dan perdagangan menjadi penggerak",
      "•Dekolonisasi mengubah bentuk hubungan",
    ],
    keyTerms: ["•Koloni", "•Protektorat", "•Dominion", "•Maritim", "•Dekolonisasi", "•Commonwealth"],
    quiz: [
      { q: "Apa perbedaan koloni dan dominion", a: "Koloni dikelola langsung • dominion lebih otonom dengan pemerintahan lokal" },
      { q: "Sebutkan 2 faktor ekspansi", a: "Kekuatan laut • perdagangan global" },
    ],
  }),
  mkPage({
    title: "Asal Usul • Era Penjelajahan dan Perdagangan",
    seed: "empire-2",
    mode: "history",
    intro: [
      "Ekspansi Britania tidak muncul tiba-tiba. Ia bertahap dari aktivitas perdagangan, pelayaran, dan perebutan posisi strategis di rute dunia.",
      "Pada masa awal, motif ekonomi sangat kuat: mencari komoditas, jalur dagang, dan pelabuhan untuk logistik.",
    ],
    sections: [
      {
        heading: "Perdagangan sebagai fondasi",
        paragraphs: [
          "Pelabuhan dan pos dagang menjadi titik awal. Dari pos ini, pengaruh politik bisa tumbuh saat keamanan dan kepentingan ekonomi ingin dilindungi.",
          "Di beberapa tempat, hubungan awal berupa dagang, lalu berkembang menjadi dominasi karena ketimpangan kekuatan militer dan ekonomi.",
        ],
      },
      {
        heading: "Persaingan kekuatan Eropa",
        paragraphs: [
          "Ekspansi juga dipengaruhi persaingan dengan kekuatan lain. Kontrol laut menjadi penentu karena laut adalah jalur utama distribusi barang.",
          "Konflik dan perjanjian sering mengubah peta wilayah. Ini membuat kekaisaran berkembang tidak linear, tetapi naik-turun sesuai situasi geopolitik.",
        ],
      },
      {
        heading: "Perusahaan dagang dan kekuasaan",
        paragraphs: [
          "Perusahaan dagang kadang memiliki kewenangan besar, termasuk administrasi dan pasukan. Ini mempercepat perubahan dari dagang ke kontrol wilayah.",
          "Penting dicatat: cara pengelolaan wilayah sangat beragam dan berubah dari satu era ke era lain.",
        ],
      },
    ],
    summaryBullets: [
      "•Awal ekspansi: pos dagang dan pelabuhan",
      "•Kontrol laut menentukan rute ekonomi",
      "•Perusahaan dagang bisa menjadi alat ekspansi",
    ],
    keyTerms: ["•Pos dagang", "•Geopolitik", "•Rute maritim", "•Perjanjian", "•Perusahaan dagang"],
    quiz: [
      { q: "Kenapa kontrol laut penting", a: "Karena laut adalah jalur utama perdagangan dan logistik" },
    ],
  }),
  mkPage({
    title: "India • Peran Besar di Imperium",
    seed: "empire-3",
    mode: "history",
    intro: [
      "India sering dianggap pusat ekonomi dan administrasi penting dalam sejarah imperium Britania pada periode tertentu.",
      "Wilayah ini terkait perdagangan besar, administrasi kolonial, serta perubahan sosial-ekonomi yang kompleks.",
    ],
    sections: [
      {
        heading: "Kenapa India strategis",
        paragraphs: [
          "India memiliki populasi besar dan posisi strategis. Komoditas serta pasar menjadi alasan kuat keterlibatan Britania.",
          "Dari perspektif logistik, India juga terkait jalur laut dan akses ke wilayah Asia lainnya.",
        ],
      },
      {
        heading: "Administrasi dan perubahan",
        paragraphs: [
          "Kebijakan administrasi kolonial berubah dari waktu ke waktu. Struktur pemerintahan kolonial berinteraksi dengan struktur lokal yang sudah ada.",
          "Perubahan ekonomi termasuk pembangunan infrastruktur tertentu, tetapi juga dampak berat seperti eksploitasi sumber daya dan ketimpangan.",
        ],
      },
      {
        heading: "Dampak jangka panjang",
        paragraphs: [
          "Dampak imperium tidak hanya politik tetapi juga sosial, budaya, dan ekonomi. Banyak perdebatan historis membahas sisi positif-negatifnya.",
          "Dekolonisasi akhirnya mengubah hubungan menjadi format baru di era modern, termasuk hubungan negara-negara Persemakmuran.",
        ],
      },
    ],
    summaryBullets: [
      "•India punya posisi strategis dan ekonomi besar",
      "•Administrasi kolonial berubah-ubah",
      "•Dampaknya kompleks dan jangka panjang",
    ],
    keyTerms: ["•Administrasi kolonial", "•Komoditas", "•Infrastruktur", "•Eksploitasi", "•Dekolonisasi"],
    quiz: [
      { q: "Sebutkan 2 alasan India penting", a: "Populasi besar • posisi strategis di jalur Asia" },
    ],
  }),
  mkPage({
    title: "Royal Navy • Kekuatan Laut dan Pengaruh Global",
    seed: "empire-4",
    mode: "history",
    intro: [
      "Kekuatan laut adalah salah satu kunci dominasi Britania dalam periode tertentu. Armada laut menjaga rute dagang dan memproyeksikan kekuatan.",
      "Dengan armada, Britania bisa mengamankan pelabuhan, mengawal kapal dagang, dan menunjukkan kehadiran di wilayah jauh.",
    ],
    sections: [
      {
        heading: "Fungsi armada laut",
        paragraphs: [
          "Armada laut berfungsi sebagai pelindung rute dagang. Ini penting karena ekonomi global bergantung pada jalur laut yang aman.",
          "Selain itu, armada mendukung logistik militer dan komunikasi antarwilayah kekaisaran.",
        ],
      },
      {
        heading: "Pelabuhan strategis",
        paragraphs: [
          "Kontrol pelabuhan membantu pengisian logistik dan perbaikan kapal. Pelabuhan juga jadi titik pengawasan jalur penting.",
          "Dalam sejarah, pelabuhan dan selat tertentu memiliki nilai strategis tinggi karena menjadi “pintu” jalur perdagangan.",
        ],
      },
      {
        heading: "Efek ke politik internasional",
        paragraphs: [
          "Kekuatan laut mempengaruhi diplomasi dan perjanjian. Negara dengan armada kuat cenderung punya posisi tawar lebih besar.",
          "Namun, persaingan armada juga bisa mendorong konflik atau perlombaan senjata antarnegara.",
        ],
      },
    ],
    summaryBullets: [
      "•Armada menjaga rute dagang",
      "•Pelabuhan strategis menguatkan logistik",
      "•Kekuatan laut mempengaruhi diplomasi",
    ],
    keyTerms: ["•Royal Navy", "•Rute dagang", "•Pelabuhan strategis", "•Diplomasi"],
    quiz: [
      { q: "Kenapa pelabuhan strategis penting", a: "Untuk logistik • perbaikan kapal • pengawasan jalur" },
    ],
  }),
  mkPage({
    title: "Puncak Kekuasaan dan “Matahari Tak Pernah Terbenam”",
    seed: "empire-5",
    mode: "history",
    intro: [
      "Ungkapan “matahari tak pernah terbenam” menggambarkan luasnya wilayah kekaisaran hingga selalu ada bagian wilayah yang sedang siang.",
      "Di puncaknya, Britania punya pengaruh luas dalam ekonomi, politik, dan perdagangan global pada periode tertentu.",
    ],
    sections: [
      {
        heading: "Apa maksud ungkapan itu",
        paragraphs: [
          "Karena wilayah tersebar lintas benua dan zona waktu, secara kiasan matahari “selalu bersinar” di suatu wilayah Britania.",
          "Ini bukan berarti satu negara menguasai seluruh dunia, tetapi menggambarkan luas jaringan wilayahnya pada masa tertentu.",
        ],
      },
      {
        heading: "Ekonomi dan perdagangan global",
        paragraphs: [
          "Pengaruh ekonomi datang dari jaringan dagang, pelabuhan, dan hubungan pasar antarwilayah. Komoditas bergerak melintasi lautan.",
          "Namun, struktur ekonomi imperium juga memunculkan ketergantungan wilayah tertentu pada pusat ekonomi dan industri di Britania.",
        ],
      },
      {
        heading: "Kontroversi dan dampak",
        paragraphs: [
          "Sejarah imperium juga penuh kontroversi: eksploitasi, penindasan, dan konflik kolonial. Ini bagian penting untuk dipahami secara kritis.",
          "Belajar sejarah yang baik bukan sekadar hafal, tetapi memahami sebab-akibat serta dampak sosial-ekonomi di berbagai wilayah.",
        ],
      },
    ],
    summaryBullets: [
      "•Ungkapan menggambarkan wilayah lintas zona waktu",
      "•Perdagangan global memperkuat pengaruh",
      "•Dampak imperium kompleks dan perlu dipahami kritis",
    ],
    keyTerms: ["•Matahari tak terbenam", "•Zona waktu", "•Jaringan dagang", "•Dampak kolonial"],
    quiz: [
      { q: "Apa arti “matahari tak pernah terbenam”", a: "Wilayah tersebar luas sehingga selalu ada bagian yang sedang siang" },
    ],
  }),
  mkPage({
    title: "Dekolonisasi • Perubahan Menjadi Era Modern",
    seed: "empire-6",
    mode: "history",
    intro: [
      "Setelah Perang Dunia II, banyak wilayah mengalami gerakan kemerdekaan. Proses ini tidak seragam: ada yang cepat, ada yang bertahap.",
      "Pada era modern, hubungan antarnegara bekas imperium sering berubah menjadi kerja sama melalui perjanjian dan organisasi.",
    ],
    sections: [
      {
        heading: "Kenapa dekolonisasi terjadi",
        paragraphs: [
          "Faktor internal: munculnya nasionalisme dan tuntutan kedaulatan. Faktor eksternal: perubahan politik global dan melemahnya kekuatan kolonial.",
          "Selain itu, biaya mempertahankan wilayah luas juga meningkat, terutama setelah perang besar dan krisis ekonomi.",
        ],
      },
      {
        heading: "Transisi kekuasaan",
        paragraphs: [
          "Transisi bisa terjadi lewat perundingan atau konflik. Setiap wilayah punya konteks sejarah dan sosial yang berbeda.",
          "Buku sekolah biasanya menekankan bahwa dekolonisasi membentuk peta negara modern dan dinamika politik baru.",
        ],
      },
      {
        heading: "Jejak sejarah di masa kini",
        paragraphs: [
          "Jejak sejarah tampak pada bahasa, sistem hukum, serta hubungan dagang. Namun pengaruh ini juga diperdebatkan karena terkait warisan kolonial.",
          "Untuk belajar, penting menilai sumber sejarah, membandingkan perspektif, dan memahami kronologi.",
        ],
      },
    ],
    summaryBullets: [
      "•Dekolonisasi dipicu faktor internal dan eksternal",
      "•Transisi berbeda-beda tiap wilayah",
      "•Warisan sejarah masih terasa hingga sekarang",
    ],
    keyTerms: ["•Dekolonisasi", "•Nasionalisme", "•Perundingan", "•Warisan kolonial"],
    quiz: [
      { q: "Sebutkan 2 faktor dekolonisasi", a: "Nasionalisme lokal • perubahan politik global" },
    ],
  }),
];

export const BOOKS: Record<string, Book> = {
  "astronomy:solar-system": {
    id: "astronomy:solar-system",
    subjectLabel: "ASTRONOMI",
    bookTitle: "Bab Tata Surya",
    pages: SOLAR_SYSTEM,
  },
  "history:british-empire": {
    id: "history:british-empire",
    subjectLabel: "SEJARAH DUNIA",
    bookTitle: "Bab Kekaisaran Britania Raya",
    pages: BRITISH_EMPIRE,
  },
};

export function getBookImage(page: BookPage) {
  return bookImage(page.imageSeed, page.title, page.mode);
}
EOT

# =========================
# 3) components/book/BookPageView.tsx (renderer tampilan buku)
# =========================
cat > components/book/BookPageView.tsx <<'EOT'
import Head from "next/head";
import Link from "next/link";
import { Book, getBookImage } from "../../lib/book/books";

export default function BookPageView(props: { book: Book; pageIndex: number; basePath: string; homeLabel?: string }) {
  const { book, pageIndex, basePath } = props;
  const page = book.pages[pageIndex];
  const total = book.pages.length;

  const prev = pageIndex > 0 ? `${basePath}/${pageIndex}` : null;
  const next = pageIndex < total - 1 ? `${basePath}/${pageIndex + 2}` : null;

  return (
    <>
      <Head>
        <title>{book.subjectLabel} • {page.title} • {pageIndex + 1}/{total}</title>
      </Head>

      <main className="mx-auto max-w-5xl px-4 py-10">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="min-w-0">
              <div className="text-xs font-extrabold tracking-widest text-white/60">
                •{book.subjectLabel} •{book.bookTitle} •HALAMAN {pageIndex + 1}/{total}
              </div>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-white">{page.title}</h1>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link href="/learn" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                MENU BELAJAR
              </Link>
              <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                HOME
              </Link>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4">
            <div className="h-3 w-full rounded-full bg-white/10">
              <div className="h-3 rounded-full bg-white/45" style={{ width: `${Math.round(((pageIndex + 1) / total) * 100)}%` }} />
            </div>
            <div className="mt-2 text-xs font-extrabold tracking-widest text-white/60">
              •PROGRESS {Math.round(((pageIndex + 1) / total) * 100)}%
            </div>
          </div>

          {/* Image */}
          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/40">
            <img src={getBookImage(page)} alt={page.title} className="h-auto w-full" />
          </div>

          {/* Intro */}
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs font-extrabold tracking-widest text-white/60">PENJELASAN AWAL</div>
            <div className="mt-3 space-y-4 text-sm font-bold leading-relaxed text-white/80">
              {page.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>

          {/* Sections */}
          <div className="mt-6 space-y-4">
            {page.sections.map((s, idx) => (
              <div key={idx} className="rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="text-xs font-extrabold tracking-widest text-white/60">SUBJUDUL {idx + 1}</div>
                <h2 className="mt-2 text-xl font-black text-white">{s.heading}</h2>
                <div className="mt-3 space-y-4 text-sm font-bold leading-relaxed text-white/80">
                  {s.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
                </div>
                {s.bullets?.length ? (
                  <div className="mt-4 rounded-2xl border border-white/10 bg-slate-950/30 p-4 text-sm font-black text-white/85">
                    {s.bullets.map((b, i) => <div key={i}>{b}</div>)}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          {/* Summary + Key terms */}
          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-extrabold tracking-widest text-white/60">RINGKASAN</div>
              <div className="mt-3 space-y-2 text-sm font-black text-white/85">
                {page.summaryBullets.map((b, i) => <div key={i}>{b}</div>)}
              </div>
            </div>
            <div className="rounded-3xl border border-white/10 bg-white/5 p-5">
              <div className="text-xs font-extrabold tracking-widest text-white/60">KATA KUNCI</div>
              <div className="mt-3 flex flex-wrap gap-2">
                {page.keyTerms.map((k, i) => (
                  <span key={i} className="rounded-2xl border border-white/10 bg-white/5 px-3 py-2 text-xs font-black text-white/85">
                    {k}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Quiz */}
          <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5">
            <div className="text-xs font-extrabold tracking-widest text-white/60">LATIHAN</div>
            <div className="mt-4 space-y-3 text-sm font-black text-white/85">
              {page.quiz.map((qa, i) => (
                <details key={i} className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                  <summary className="cursor-pointer">•{qa.q}</summary>
                  <div className="mt-2 text-white/75">•{qa.a}</div>
                </details>
              ))}
            </div>
          </div>

          {/* Navigation */}
          <div className="mt-6 flex flex-wrap gap-2">
            {prev ? (
              <Link href={prev} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                PREV
              </Link>
            ) : null}
            {next ? (
              <Link href={next} className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
                NEXT
              </Link>
            ) : null}
          </div>
        </div>
      </main>
    </>
  );
}
EOT

# =========================
# 4) Replace halaman bab jadi render dari BOOKS
#    (Astronomi: solar-system)
# =========================
mkdir -p pages/learn/solar-system
cat > pages/learn/solar-system/'[page].tsx' <<'EOT'
import { GetStaticPaths, GetStaticProps } from "next";
import BookPageView from "../../../components/book/BookPageView";
import { BOOKS } from "../../../lib/book/books";

export const getStaticPaths: GetStaticPaths = async () => {
  const book = BOOKS["astronomy:solar-system"];
  const paths = book.pages.map((_, i) => ({ params: { page: String(i + 1) } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const p = parseInt(String(ctx.params?.page || "1"), 10);
  return { props: { page: Number.isFinite(p) ? p : 1 } };
};

export default function Page(props: { page: number }) {
  const book = BOOKS["astronomy:solar-system"];
  const pageIndex = Math.max(0, Math.min(book.pages.length - 1, props.page - 1));
  return <BookPageView book={book} pageIndex={pageIndex} basePath="/learn/solar-system" />;
}
EOT

# =========================
# 5) Replace halaman history british-empire
# =========================
mkdir -p pages/learn/history/british-empire
cat > pages/learn/history/british-empire/'[page].tsx' <<'EOT'
import { GetStaticPaths, GetStaticProps } from "next";
import BookPageView from "../../../../components/book/BookPageView";
import { BOOKS } from "../../../../lib/book/books";

export const getStaticPaths: GetStaticPaths = async () => {
  const book = BOOKS["history:british-empire"];
  const paths = book.pages.map((_, i) => ({ params: { page: String(i + 1) } }));
  return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async (ctx) => {
  const p = parseInt(String(ctx.params?.page || "1"), 10);
  return { props: { page: Number.isFinite(p) ? p : 1 } };
};

export default function Page(props: { page: number }) {
  const book = BOOKS["history:british-empire"];
  const pageIndex = Math.max(0, Math.min(book.pages.length - 1, props.page - 1));
  return <BookPageView book={book} pageIndex={pageIndex} basePath="/learn/history/british-empire" />;
}
EOT

echo "DONE"
echo "EDIT CONTENT DI: lib/book/books.ts"
echo "TAMBAH HALAMAN: copy mkPage(...) dan edit topik"
