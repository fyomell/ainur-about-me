export type PrivatePage = {
  title: string;
  imageSeed: string;
  intro: string[];
  sections: { heading: string; paragraphs: string[]; bullets?: string[] }[];
  summaryBullets: string[];
  keyTerms: string[];
  quiz: { q: string; a: string }[];
};

export const PRIVATE_BOOK_TITLE = "A World Without Islam • Graham E. Fuller";

export const PRIVATE_PAGES: PrivatePage[] = [
  {
    title: "Tentang Buku dan Tujuannya",
    imageSeed: "private-1",
    intro: [
      "Bab ini membahas buku “A World Without Islam” karya Graham E. Fuller. Fokusnya bukan mengutip isi buku mentah mentah, tetapi merangkum gagasan utamanya dengan gaya seperti buku sekolah.",
      "Inti yang sering dibahas dari buku ini adalah pertanyaan besar: kalau Islam “hilang” dari sejarah, apakah masalah konflik dunia otomatis hilang? Penulis mengajak pembaca melihat bahwa banyak konflik punya akar politik, ekonomi, kolonialisme, dan perebutan kekuasaan."
    ],
    sections: [
      {
        heading: "Siapa penulisnya",
        paragraphs: [
          "Graham E. Fuller dikenal sebagai analis kebijakan dan penulis yang sering membahas geopolitik. Dalam buku ini, ia mencoba memisahkan antara label agama dengan faktor faktor negara, kekuasaan, dan sejarah.",
          "Ia memakai gaya argumentasi yang provokatif: bukan untuk menghina agama, tetapi untuk menguji asumsi umum yang sering menyederhanakan masalah global menjadi “karena Islam”."
        ],
        bullets: [
          "•Buku berbentuk analisis politik dan sejarah",
          "•Tujuan utama: menguji asumsi penyebab konflik",
          "•Mengajak pembaca berpikir pakai konteks"
        ]
      },
      {
        heading: "Apa yang dibahas",
        paragraphs: [
          "Buku ini mendorong pembaca melihat bahwa banyak hal yang tampak “isu agama” sering kali juga merupakan isu kekuasaan, identitas, dan kepentingan negara.",
          "Dengan kata lain, agama dapat menjadi simbol, tetapi akar masalahnya sering berupa perebutan sumber daya, dominasi politik, atau dampak sejarah panjang."
        ]
      }
    ],
    summaryBullets: [
      "•Bab ini ringkasan buku versi buku sekolah",
      "•Fokus pada sejarah dan geopolitik",
      "•Menghindari pembahasan yang mengarah ke debat teologi"
    ],
    keyTerms: ["•Geopolitik", "•Kolonialisme", "•Identitas", "•Kebijakan luar negeri", "•Konflik modern"],
    quiz: [
      { q: "Apa tujuan utama buku ini?", a: "Menguji asumsi bahwa konflik dunia hanya karena faktor agama dan menyorot faktor sejarah serta politik." },
      { q: "Apakah bab ini membahas teologi?", a: "Tidak. Ini ringkasan analisis sejarah dan geopolitik." }
    ]
  },

  {
    title: "Ide Utama: Konflik Tidak Sederhana",
    imageSeed: "private-2",
    intro: [
      "Di banyak diskusi publik, konflik di berbagai wilayah sering disimpulkan cepat sebagai konflik agama. Buku ini menantang cara pikir itu.",
      "Penulis menekankan bahwa konflik biasanya adalah campuran dari sejarah penjajahan, persaingan negara, perebutan wilayah, ketimpangan ekonomi, dan propaganda politik."
    ],
    sections: [
      {
        heading: "Kenapa orang suka menyederhanakan",
        paragraphs: [
          "Otak manusia suka jawaban cepat. Label agama terasa mudah karena langsung memberi identitas: siapa lawan, siapa kawan. Padahal realitas politik jauh lebih rumit.",
          "Penyederhanaan juga bisa dipakai untuk propaganda: membentuk opini publik agar mendukung kebijakan tertentu."
        ],
        bullets: ["•Label cepat itu nyaman", "•Propaganda butuh cerita simpel", "•Realita konflik biasanya berlapis"]
      },
      {
        heading: "Cara berpikir yang disarankan",
        paragraphs: [
          "Kalau mau paham konflik, tanyakan: siapa yang pegang kekuasaan, siapa yang diuntungkan, siapa yang dirugikan, dan bagaimana sejarahnya membentuk kondisi sekarang.",
          "Dengan pola pikir ini, kita belajar membedakan simbol dan akar masalah."
        ]
      }
    ],
    summaryBullets: [
      "•Konflik = sejarah + politik + ekonomi + identitas",
      "•Label agama sering jadi narasi mudah",
      "•Analisis perlu lihat kepentingan dan sejarah"
    ],
    keyTerms: ["•Narasi", "•Propaganda", "•Kepentingan", "•Kekuasaan", "•Analisis konteks"],
    quiz: [
      { q: "Mengapa label agama sering dipakai?", a: "Karena mudah dipahami publik dan sering efektif untuk propaganda." },
      { q: "Apa pertanyaan analisis yang penting?", a: "Siapa untung, siapa rugi, dan apa konteks sejarahnya." }
    ]
  },

  {
    title: "Sejarah Panjang: Kolonialisme dan Dampaknya",
    imageSeed: "private-3",
    intro: [
      "Banyak wilayah yang hari ini menjadi pusat konflik pernah mengalami penjajahan. Dampaknya tidak hilang begitu saja setelah kemerdekaan.",
      "Penarikan batas negara, pembentukan pemerintahan, dan pembagian sumber daya sering dibuat dengan kepentingan kekuatan besar, bukan kebutuhan lokal."
    ],
    sections: [
      {
        heading: "Batas negara dan luka sejarah",
        paragraphs: [
          "Ketika batas negara dibuat tanpa memperhatikan suku, bahasa, dan kondisi lokal, gesekan bisa muncul. Masalah ini kadang muncul puluhan tahun kemudian.",
          "Konflik bisa meletus saat ada perebutan sumber daya, saat krisis ekonomi, atau saat pemimpin memanfaatkan identitas untuk menguatkan dukungan."
        ],
        bullets: ["•Batas negara bukan selalu alami", "•Masalah bisa muncul belakangan", "•Identitas bisa dipakai politik"]
      },
      {
        heading: "Warisan ekonomi dan ketimpangan",
        paragraphs: [
          "Kolonialisme juga meninggalkan struktur ekonomi: siapa yang punya akses pendidikan, siapa yang memegang bisnis, dan siapa yang tertinggal.",
          "Ketimpangan membuat masyarakat mudah terpecah, apalagi jika dipanaskan oleh propaganda."
        ]
      }
    ],
    summaryBullets: [
      "•Kolonialisme meninggalkan batas dan struktur",
      "•Ketimpangan memperbesar konflik",
      "•Identitas sering dipakai sebagai alat politik"
    ],
    keyTerms: ["•Batas negara", "•Ketimpangan", "•Warisan kolonial", "•Propaganda", "•Struktur ekonomi"],
    quiz: [
      { q: "Apa salah satu dampak kolonialisme yang sering muncul?", a: "Batas negara dan ketimpangan yang memicu konflik jangka panjang." },
      { q: "Kenapa ketimpangan berbahaya?", a: "Karena membuat masyarakat mudah diprovokasi dan terpecah." }
    ]
  },

  {
    title: "Identitas Politik dan Nasionalisme",
    imageSeed: "private-4",
    intro: [
      "Buku ini juga menyorot bagaimana identitas dipakai dalam politik. Identitas bisa berupa bangsa, etnis, bahasa, atau agama.",
      "Dalam situasi krisis, identitas sering dijadikan simbol pemersatu, namun juga bisa dipakai untuk membelah masyarakat."
    ],
    sections: [
      {
        heading: "Nasionalisme bisa positif",
        paragraphs: [
          "Nasionalisme dapat jadi semangat membangun negara: memperkuat pendidikan, sains, ekonomi, dan persatuan.",
          "Tetapi nasionalisme juga bisa jadi agresif jika dipakai untuk menganggap kelompok lain sebagai musuh."
        ]
      },
      {
        heading: "Kenapa simbol penting",
        paragraphs: [
          "Simbol seperti bendera, slogan, atau identitas tertentu punya kekuatan emosional. Politik sering mengandalkan emosi untuk menggerakkan massa.",
          "Karena itu, analisis buku ini menekankan perlunya berpikir tenang dan melihat data serta sejarah."
        ],
        bullets: ["•Simbol menggerakkan emosi", "•Emosi mudah dimanipulasi", "•Data dan sejarah membantu menilai"]
      }
    ],
    summaryBullets: [
      "•Identitas bisa menyatukan dan memecah",
      "•Simbol kuat untuk mobilisasi politik",
      "•Perlu analisis tenang dan kontekstual"
    ],
    keyTerms: ["•Identitas", "•Nasionalisme", "•Mobilisasi", "•Simbol", "•Emosi politik"],
    quiz: [
      { q: "Identitas dipakai untuk apa dalam politik?", a: "Untuk mobilisasi dukungan dan membangun narasi." },
      { q: "Apa risiko politik berbasis emosi?", a: "Mudah dimanipulasi dan bisa memecah masyarakat." }
    ]
  },

  {
    title: "Media dan Cara Publik Melihat Dunia",
    imageSeed: "private-5",
    intro: [
      "Cara publik memahami konflik sering dipengaruhi media. Media memilih judul, gambar, dan potongan cerita yang paling menarik perhatian.",
      "Akibatnya, konflik rumit bisa terlihat seperti cerita hitam putih: baik vs jahat, padahal faktanya lebih kompleks."
    ],
    sections: [
      {
        heading: "Framing dan stereotip",
        paragraphs: [
          "Framing adalah cara menyusun cerita agar terlihat tertentu. Framing bisa membesar besarkan sisi tertentu dan mengecilkan sisi lain.",
          "Kalau framing selalu sama, stereotip terbentuk. Stereotip membuat orang malas memeriksa konteks."
        ],
        bullets: ["•Framing mempengaruhi opini", "•Stereotip terbentuk lewat pengulangan", "•Konteks sering hilang"]
      },
      {
        heading: "Cara belajar yang lebih sehat",
        paragraphs: [
          "Coba bandingkan sumber. Baca latar sejarah. Cari faktor ekonomi dan politik, bukan hanya label identitas.",
          "Dengan begitu, kamu tidak mudah terjebak narasi yang dibuat supaya emosi kamu naik."
        ]
      }
    ],
    summaryBullets: [
      "•Media bisa menyederhanakan konflik",
      "•Framing membentuk stereotip",
      "•Belajar sehat = bandingkan sumber dan cari konteks"
    ],
    keyTerms: ["•Framing", "•Stereotip", "•Opini publik", "•Narasi", "•Literasi media"],
    quiz: [
      { q: "Apa itu framing?", a: "Cara media menyusun cerita agar terlihat dengan sudut pandang tertentu." },
      { q: "Cara melawan stereotip?", a: "Bandingkan sumber dan pelajari konteks sejarah serta politik." }
    ]
  },

  {
    title: "Poin Penting dan Kritik yang Perlu Diingat",
    imageSeed: "private-6",
    intro: [
      "Tidak semua pembaca setuju dengan buku ini. Ada yang menganggap argumennya kuat, ada juga yang menilai beberapa bagian terlalu menyapu rata atau kurang menyorot faktor tertentu.",
      "Hal yang penting: kamu boleh setuju atau tidak, tapi latihan berpikir kritisnya itu yang berharga."
    ],
    sections: [
      {
        heading: "Apa manfaat membaca buku ini",
        paragraphs: [
          "Manfaat utama adalah melatih cara pandang yang lebih luas: konflik tidak bisa dijelaskan dengan satu sebab saja.",
          "Ini membantu kamu melihat peran sejarah panjang, kebijakan luar negeri, ekonomi, dan perebutan kekuasaan."
        ],
        bullets: ["•Melatih berpikir kritis", "•Menghindari jawaban instan", "•Melihat faktor sejarah dan politik"]
      },
      {
        heading: "Apa yang perlu diwaspadai",
        paragraphs: [
          "Dalam buku apa pun, selalu ada sudut pandang penulis. Karena itu, sebaiknya tetap baca dari beberapa perspektif lain untuk menyeimbangkan.",
          "Kalau kamu menemukan klaim yang terasa besar, coba cek sumber lain, data lain, dan versi sejarah dari berbagai pihak."
        ],
        bullets: ["•Setiap buku punya perspektif", "•Cek sumber lain untuk menyeimbangkan", "•Jangan telan mentah mentah"]
      }
    ],
    summaryBullets: [
      "•Buku ini latihan berpikir kritis",
      "•Konteks sejarah dan politik itu penting",
      "•Tetap perlu baca perspektif lain"
    ],
    keyTerms: ["•Berpikir kritis", "•Perspektif", "•Bias", "•Validasi sumber", "•Analisis"],
    quiz: [
      { q: "Apa manfaat utama bab ini?", a: "Melatih berpikir kritis dan melihat konflik dari banyak faktor." },
      { q: "Apa saran penting saat membaca buku analisis?", a: "Bandingkan dengan sumber lain dan jangan telan mentah mentah." }
    ]
  }
];
