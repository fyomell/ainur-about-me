export type LearnSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type LearnPage = {
  page: number;
  title: string;
  image: string;
  sections: LearnSection[];
};

const IMG = "/learn/big-bang/big-bang.svg";

export const BIG_BANG_PAGES: LearnPage[] = [
  {
    page: 1,
    title: "Apa Itu Big Bang",
    image: IMG,
    sections: [
      {
        heading: "Inti ide Big Bang",
        paragraphs: [
          "Big Bang adalah model ilmiah yang menjelaskan bahwa alam semesta dulu jauh lebih panas dan padat lalu mengembang dan mendingin sampai jadi seperti sekarang.",
          "Ini bukan cerita tentang ledakan di ruang kosong. Model ini lebih tepat disebut: ruang itu sendiri mengembang.",
        ],
        bullets: [
          "Mengembang berarti jarak antar galaksi membesar",
          "Mendingin berarti radiasi awal menjadi lebih lemah dan lebih panjang gelombangnya",
        ],
      },
      {
        heading: "3 bukti utama",
        paragraphs: [
          "Model Big Bang kuat karena didukung banyak pengamatan yang konsisten satu sama lain.",
        ],
        bullets: [
          "Redshift galaksi yang menunjukkan ekspansi",
          "Radiasi latar gelombang mikro kosmik (CMB)",
          "Kelimpahan unsur ringan seperti hidrogen dan helium",
        ],
      },
    ],
  },

  {
    page: 2,
    title: "Ekspansi Alam Semesta dan Redshift",
    image: IMG,
    sections: [
      {
        heading: "Redshift itu apa",
        paragraphs: [
          "Saat galaksi menjauh, cahaya yang kita terima jadi bergeser ke panjang gelombang lebih panjang. Ini disebut redshift.",
          "Semakin jauh galaksi, biasanya redshift makin besar, tanda ekspansi berjalan lama.",
        ],
      },
      {
        heading: "Hukum Hubble",
        paragraphs: [
          "Hukum Hubble menyatakan kecepatan menjauh kira-kira sebanding dengan jarak.",
          "Ini yang membuat kita menyimpulkan alam semesta sedang mengembang dalam skala besar.",
        ],
        bullets: [
          "Galaksi jauh bergerak menjauh lebih cepat",
          "Ekspansi bukan karena kita pusat. Semua pengamat akan melihat pola serupa",
        ],
      },
    ],
  },

  {
    page: 3,
    title: "CMB: Jejak Cahaya Tertua",
    image: IMG,
    sections: [
      {
        heading: "CMB itu apa",
        paragraphs: [
          "CMB adalah radiasi sisa dari alam semesta muda saat ia cukup dingin untuk membentuk atom netral.",
          "CMB datang dari semua arah dan hampir seragam, tapi punya variasi kecil yang penting.",
        ],
      },
      {
        heading: "Kenapa CMB penting",
        paragraphs: [
          "Pola bintik kecil pada CMB menyimpan informasi tentang kepadatan awal dan bahan penyusun alam semesta.",
          "Dari CMB kita bisa mengukur banyak parameter kosmologi dengan presisi tinggi.",
        ],
        bullets: [
          "Bukti alam semesta pernah sangat panas",
          "Peta CMB mendukung model ekspansi",
        ],
      },
    ],
  },

  {
    page: 4,
    title: "Unsur Ringan dan Nukleosintesis Big Bang",
    image: IMG,
    sections: [
      {
        heading: "Nukleosintesis Big Bang",
        paragraphs: [
          "Saat alam semesta masih sangat panas, proton dan neutron bisa bergabung membentuk inti ringan.",
          "Proses ini terjadi sangat awal dan berhenti ketika alam semesta mendingin terlalu cepat.",
        ],
      },
      {
        heading: "Hasil utama",
        paragraphs: [
          "Model memprediksi kelimpahan hidrogen dan helium yang cocok dengan pengamatan.",
          "Sedikit litium juga diprediksi, walau ada beberapa ketegangan kecil pada nilai litium yang diamati.",
        ],
        bullets: [
          "Hidrogen paling banyak",
          "Helium sekitar seperempat massa baryonik",
          "Deuterium sangat sensitif terhadap kepadatan baryon",
        ],
      },
    ],
  },

  {
    page: 5,
    title: "Era Radiasi dan Era Materi",
    image: IMG,
    sections: [
      {
        heading: "Dominasi radiasi",
        paragraphs: [
          "Di alam semesta muda, energi radiasi lebih dominan daripada materi.",
          "Ketika mengembang, radiasi melemah lebih cepat daripada materi, lalu terjadi transisi.",
        ],
      },
      {
        heading: "Dominasi materi",
        paragraphs: [
          "Setelah cukup waktu, materi menjadi dominan sehingga gravitasi materi mulai membentuk struktur lebih kuat.",
          "Struktur seperti galaksi terbentuk jauh setelah fase ini dimulai.",
        ],
        bullets: [
          "Radiasi turun cepat karena redshift",
          "Materi jadi penting untuk pembentukan struktur",
        ],
      },
    ],
  },

  {
    page: 6,
    title: "Inflasi Kosmik",
    image: IMG,
    sections: [
      {
        heading: "Apa itu inflasi",
        paragraphs: [
          "Inflasi adalah fase ekspansi sangat cepat pada waktu sangat awal.",
          "Inflasi membantu menjelaskan mengapa alam semesta terlihat sangat datar dan seragam dalam skala besar.",
        ],
      },
      {
        heading: "Masalah yang diselesaikan",
        paragraphs: [
          "Tanpa inflasi, sulit menjelaskan keseragaman temperatur CMB di arah yang sangat jauh.",
          "Inflasi juga memberi asal untuk fluktuasi kecil yang menjadi bibit galaksi.",
        ],
        bullets: [
          "Horizon problem",
          "Flatness problem",
          "Asal fluktuasi awal",
        ],
      },
    ],
  },

  {
    page: 7,
    title: "Plasma Partikel dan Pendinginan",
    image: IMG,
    sections: [
      {
        heading: "Alam semesta seperti sup",
        paragraphs: [
          "Pada awalnya alam semesta berisi plasma: partikel bermuatan dan foton yang sering bertumbukan.",
          "Saat mengembang, suhu turun dan interaksi berubah.",
        ],
      },
      {
        heading: "Kenapa pendinginan penting",
        paragraphs: [
          "Pendinginan menentukan kapan atom terbentuk, kapan cahaya bisa bebas bergerak, dan kapan struktur bisa tumbuh efektif.",
        ],
        bullets: [
          "Semakin mengembang, suhu turun",
          "Transisi fisika terjadi pada ambang suhu tertentu",
        ],
      },
    ],
  },

  {
    page: 8,
    title: "Kenapa Materi Lebih Banyak dari Antimateri",
    image: IMG,
    sections: [
      {
        heading: "Masalah asimetri materi",
        paragraphs: [
          "Jika materi dan antimateri tercipta sama banyak, keduanya akan saling musnah dan tersisa radiasi saja.",
          "Fakta bahwa ada banyak materi berarti ada mekanisme yang membuat ketidakseimbangan kecil.",
        ],
      },
      {
        heading: "Baryogenesis",
        paragraphs: [
          "Baryogenesis adalah istilah umum untuk proses yang menghasilkan kelebihan materi.",
          "Ini masih area riset aktif dan belum sepenuhnya dipahami.",
        ],
        bullets: [
          "Perlu pelanggaran simetri tertentu",
          "Perlu kondisi alam semesta awal yang tepat",
        ],
      },
    ],
  },

  {
    page: 9,
    title: "Rekombinasi dan Permukaan Hamburan Terakhir",
    image: IMG,
    sections: [
      {
        heading: "Rekombinasi",
        paragraphs: [
          "Ketika suhu cukup rendah, elektron bergabung dengan inti membentuk atom netral. Ini disebut rekombinasi.",
          "Setelah itu, foton tidak lagi sering bertumbukan dan mulai bergerak bebas.",
        ],
      },
      {
        heading: "CMB lahir",
        paragraphs: [
          "CMB yang kita lihat sekarang adalah foton yang lepas pada era ini dan kemudian ter-redshift menjadi gelombang mikro.",
        ],
        bullets: [
          "Sebelumnya: alam semesta buram",
          "Sesudahnya: alam semesta transparan",
        ],
      },
    ],
  },

  {
    page: 10,
    title: "Dark Ages",
    image: IMG,
    sections: [
      {
        heading: "Kenapa disebut Dark Ages",
        paragraphs: [
          "Setelah rekombinasi, belum ada bintang. Alam semesta berisi gas netral dan gelap dalam cahaya tampak.",
          "Tetapi proses gravitasi sudah mulai mengumpulkan materi ke daerah padat.",
        ],
      },
      {
        heading: "Apa yang terjadi di balik layar",
        paragraphs: [
          "Fluktuasi kepadatan tumbuh perlahan membentuk calon struktur.",
          "Peran materi gelap sangat besar karena ia mulai mengumpul lebih awal.",
        ],
      },
    ],
  },

  {
    page: 11,
    title: "Bintang Pertama: Populasi III",
    image: IMG,
    sections: [
      {
        heading: "Bintang pertama itu seperti apa",
        paragraphs: [
          "Bintang pertama diduga sangat masif dan terbentuk dari gas hampir murni hidrogen dan helium.",
          "Tanpa unsur berat, proses pendinginan gas berbeda sehingga bintang bisa lebih besar.",
        ],
      },
      {
        heading: "Dampak bintang pertama",
        paragraphs: [
          "Bintang masif cepat mati sebagai supernova, menyebarkan unsur berat pertama ke lingkungan.",
          "Ini membuka jalan untuk generasi bintang dan planet berikutnya.",
        ],
        bullets: [
          "Menghasilkan unsur berat awal",
          "Memicu pembentukan galaksi lebih kompleks",
        ],
      },
    ],
  },

  {
    page: 12,
    title: "Reionisasi",
    image: IMG,
    sections: [
      {
        heading: "Apa itu reionisasi",
        paragraphs: [
          "Radiasi ultraviolet dari bintang dan galaksi awal mengionisasi kembali gas hidrogen.",
          "Ini mengubah keadaan medium antargalaksi.",
        ],
      },
      {
        heading: "Kenapa penting",
        paragraphs: [
          "Reionisasi memengaruhi bagaimana cahaya dari objek jauh merambat.",
          "Jejaknya bisa dilihat dari spektrum quasar dan dari CMB.",
        ],
      },
    ],
  },

  {
    page: 13,
    title: "Materi Gelap dan Pembentukan Struktur",
    image: IMG,
    sections: [
      {
        heading: "Apa itu materi gelap",
        paragraphs: [
          "Materi gelap adalah komponen yang bergravitasi tetapi tidak memancarkan cahaya seperti materi biasa.",
          "Ia dibutuhkan untuk menjelaskan gerak bintang di galaksi dan pola struktur besar.",
        ],
      },
      {
        heading: "Perannya di kosmologi",
        paragraphs: [
          "Materi gelap membentuk “kerangka” gravitasi yang membantu gas jatuh dan membentuk galaksi.",
          "Tanpa materi gelap, struktur besar sulit terbentuk secepat yang diamati.",
        ],
        bullets: [
          "Terlihat lewat efek gravitasi",
          "Kunci pertumbuhan struktur",
        ],
      },
    ],
  },

  {
    page: 14,
    title: "Galaksi dan Struktur Skala Besar",
    image: IMG,
    sections: [
      {
        heading: "Jaring kosmik",
        paragraphs: [
          "Dalam skala sangat besar, galaksi membentuk pola seperti jaring: filamen, simpul, dan void.",
          "Ini adalah hasil pertumbuhan fluktuasi kepadatan awal.",
        ],
      },
      {
        heading: "Cluster dan supercluster",
        paragraphs: [
          "Galaksi berkumpul menjadi gugus, lalu supergugus, dipisahkan oleh ruang kosong besar.",
          "Pola ini cocok dengan simulasi yang memakai materi gelap dan ekspansi kosmik.",
        ],
      },
    ],
  },

  {
    page: 15,
    title: "Energi Gelap dan Ekspansi yang Makin Cepat",
    image: IMG,
    sections: [
      {
        heading: "Penemuan akselerasi",
        paragraphs: [
          "Pengamatan supernova tipe Ia menunjukkan ekspansi alam semesta tidak melambat, tetapi makin cepat.",
          "Ini memunculkan konsep energi gelap sebagai komponen dominan saat ini.",
        ],
      },
      {
        heading: "Apa yang kita tahu",
        paragraphs: [
          "Energi gelap masih misterius. Ia bisa berupa konstanta kosmologis atau sesuatu yang berubah seiring waktu.",
        ],
        bullets: [
          "Efeknya terlihat pada skala kosmik",
          "Memengaruhi masa depan ekspansi",
        ],
      },
    ],
  },

  {
    page: 16,
    title: "Cara Kita Menguji Model Big Bang",
    image: IMG,
    sections: [
      {
        heading: "Supernova",
        paragraphs: [
          "Supernova tipe Ia dipakai sebagai “standard candle” untuk mengukur jarak kosmik.",
          "Data jarak vs redshift menguji sejarah ekspansi.",
        ],
      },
      {
        heading: "BAO dan lensa gravitasi",
        paragraphs: [
          "BAO adalah pola statistik pada sebaran galaksi yang jadi penggaris kosmik.",
          "Lensa gravitasi memetakan distribusi massa termasuk materi gelap.",
        ],
        bullets: [
          "Bukti saling menguatkan",
          "Beberapa hasil masih ada ketegangan kecil",
        ],
      },
    ],
  },

  {
    page: 17,
    title: "Timeline Singkat Big Bang",
    image: IMG,
    sections: [
      {
        heading: "Urutan besar",
        paragraphs: [
          "Alam semesta awal: sangat panas dan padat.",
          "Lalu mengembang, mendingin, membentuk unsur ringan, atom, CMB, bintang pertama, galaksi, sampai era modern.",
        ],
        bullets: [
          "Awal panas",
          "Pendinginan",
          "Atom terbentuk",
          "Bintang dan galaksi",
          "Ekspansi dipercepat",
        ],
      },
      {
        heading: "Kenapa timeline berguna",
        paragraphs: [
          "Timeline membantu menyusun proses fisika yang terjadi pada suhu dan waktu berbeda.",
          "Setiap tahap punya bukti observasi yang bisa diuji.",
        ],
      },
    ],
  },

  {
    page: 18,
    title: "Tantangan dan Pertanyaan Terbuka",
    image: IMG,
    sections: [
      {
        heading: "H0 tension",
        paragraphs: [
          "Ada perbedaan kecil antara nilai laju ekspansi yang diukur dari alam semesta awal dan alam semesta dekat.",
          "Ini bisa berarti sistematik pengukuran atau petunjuk fisika baru.",
        ],
      },
      {
        heading: "Inflasi dan materi gelap",
        paragraphs: [
          "Inflasi kuat menjelaskan banyak hal, tapi detail mekanismenya belum pasti.",
          "Partikel materi gelap juga belum ditemukan langsung.",
        ],
        bullets: [
          "Riset masih aktif",
          "Data baru terus mempersempit model",
        ],
      },
    ],
  },

  {
    page: 19,
    title: "Apa yang Big Bang Tidak Jawab",
    image: IMG,
    sections: [
      {
        heading: "Batas model",
        paragraphs: [
          "Model Big Bang menjelaskan evolusi alam semesta dari kondisi sangat awal hingga sekarang berdasarkan data.",
          "Namun ada batas: pada kondisi ekstrem, kita butuh teori gravitasi kuantum yang belum lengkap.",
        ],
      },
      {
        heading: "Fokus ilmiah",
        paragraphs: [
          "Dalam sains, model dinilai dari kemampuan memprediksi dan cocok dengan data.",
          "Jika data baru muncul, model bisa diperbarui atau diganti.",
        ],
        bullets: [
          "Model = alat prediksi",
          "Selalu terbuka untuk revisi",
        ],
      },
    ],
  },

  {
    page: 20,
    title: "Simulasi Komputer dalam Kosmologi",
    image: IMG,
    sections: [
      {
        heading: "Kenapa pakai simulasi",
        paragraphs: [
          "Skala kosmik terlalu besar untuk diuji di lab. Simulasi membantu menghubungkan teori dengan pengamatan.",
          "Dengan parameter tertentu, simulasi menghasilkan struktur mirip jaring kosmik yang kita amati.",
        ],
      },
      {
        heading: "Apa yang disimulasikan",
        paragraphs: [
          "Interaksi gravitasi, materi gelap, gas, pembentukan bintang, dan umpan balik supernova.",
          "Hasilnya dibandingkan dengan survei galaksi.",
        ],
      },
    ],
  },

  {
    page: 21,
    title: "Rangkuman Bab 2 dan Latihan",
    image: IMG,
    sections: [
      {
        heading: "Rangkuman",
        paragraphs: [
          "Big Bang menjelaskan alam semesta yang mengembang dan mendingin, didukung oleh redshift, CMB, dan unsur ringan.",
          "Banyak detail makin kuat, tetapi beberapa pertanyaan besar masih diteliti: inflasi, materi gelap, energi gelap, dan H0 tension.",
        ],
        bullets: [
          "Bukti: redshift •CMB •unsur ringan",
          "Tahap: atom •CMB •dark ages •bintang pertama •galaksi",
          "Riset: materi gelap •energi gelap •inflasi",
        ],
      },
      {
        heading: "Latihan cepat",
        paragraphs: [
          "Coba jawab dengan bullet:",
        ],
        bullets: [
          "Apa itu redshift",
          "Kenapa CMB penting",
          "Sebutkan 2 pertanyaan terbuka di kosmologi",
        ],
      },
    ],
  },
];

export const BIG_BANG_TOTAL = BIG_BANG_PAGES.length;

export function getBigBangPage(page: number) {
  return BIG_BANG_PAGES.find((p) => p.page === page) ?? null;
}
