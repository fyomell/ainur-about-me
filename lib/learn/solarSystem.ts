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

const IMG = "/learn/solar-system/solar-system.svg";

export const SOLAR_SYSTEM_PAGES: LearnPage[] = [
  {
    page: 1,
    title: "Pengenalan Tata Surya",
    image: IMG,
    sections: [
      {
        heading: "Apa itu Tata Surya",
        paragraphs: [
          "Tata Surya adalah sistem benda langit yang terikat gravitasi oleh Matahari. Di dalamnya ada planet, satelit, asteroid, komet, debu, dan gas.",
          "Kunci utamanya adalah gravitasi: semakin besar massanya, semakin kuat daya tariknya.",
        ],
        bullets: [
          "Matahari adalah pusat massa terbesar",
          "Planet mengorbit Matahari pada jalur elips",
          "Satelit mengorbit planet",
        ],
      },
      {
        heading: "Anggota utama",
        paragraphs: ["Delapan planet terbagi jadi planet batuan (dalam) dan planet raksasa (luar)."],
        bullets: [
          "Planet dalam: Merkurius • Venus • Bumi • Mars",
          "Planet luar: Jupiter • Saturnus • Uranus • Neptunus",
          "Ada juga planet katai: Pluto • Ceres • Haumea • Makemake • Eris",
        ],
      },
      {
        heading: "Kenapa belajar ini penting",
        paragraphs: [
          "Belajar tata surya bikin kamu paham skala, waktu, dan proses fisika yang besar banget.",
          "Ini dasar buat astronomi lanjutan: bintang, galaksi, kosmologi.",
        ],
      },
    ],
  },

  {
    page: 2,
    title: "Skala dan Jarak di Tata Surya",
    image: IMG,
    sections: [
      {
        heading: "Satuan jarak yang dipakai",
        paragraphs: [
          "Jarak antar planet sangat besar. Karena itu dipakai satuan AU (Astronomical Unit).",
          "1 AU kira-kira jarak rata-rata Bumi ke Matahari.",
        ],
        bullets: ["Bumi ≈ 1 AU", "Jupiter ≈ 5.2 AU", "Neptunus ≈ 30 AU"],
      },
      {
        heading: "Skala yang bikin kaget",
        paragraphs: [
          "Kalau Matahari sebesar bola basket, Bumi cuma sebesar butir merica dan jaraknya bisa puluhan meter.",
          "Karena jarak jauh, sinyal radio dari wahana antariksa butuh waktu untuk sampai ke Bumi.",
        ],
        bullets: ["Cahaya dari Matahari ke Bumi ≈ 8 menit", "Ke Neptunus bisa beberapa jam"],
      },
      {
        heading: "Kecepatan orbit",
        paragraphs: [
          "Planet yang lebih dekat ke Matahari bergerak lebih cepat karena gravitasi lebih kuat.",
          "Ini nyambung ke Hukum Kepler.",
        ],
      },
    ],
  },

  {
    page: 3,
    title: "Matahari: Mesin Utama Tata Surya",
    image: IMG,
    sections: [
      {
        heading: "Peran Matahari",
        paragraphs: [
          "Matahari menyumbang hampir semua energi dan massa sistem.",
          "Cahaya dan panas Matahari mengatur iklim, cuaca antariksa, dan kondisi planet.",
        ],
        bullets: ["Sumber energi: fusi nuklir", "Menghasilkan angin surya", "Mengendalikan orbit dengan gravitasi"],
      },
      {
        heading: "Fusi nuklir",
        paragraphs: [
          "Di inti Matahari, hidrogen bergabung menjadi helium. Proses ini melepaskan energi besar.",
          "Energi merambat keluar lalu dipancarkan sebagai cahaya.",
        ],
      },
      {
        heading: "Aktivitas Matahari",
        paragraphs: [
          "Bintik Matahari, flare, dan CME bisa mengganggu satelit dan komunikasi.",
          "Aurora di Bumi muncul karena partikel Matahari bertemu medan magnet Bumi.",
        ],
      },
    ],
  },

  {
    page: 4,
    title: "Terbentuknya Tata Surya",
    image: IMG,
    sections: [
      {
        heading: "Nebula dan cakram protoplanet",
        paragraphs: [
          "Tata Surya terbentuk dari awan gas dan debu yang runtuh karena gravitasi.",
          "Saat runtuh, ia berputar dan membentuk cakram. Matahari terbentuk di pusatnya.",
        ],
      },
      {
        heading: "Akresi",
        paragraphs: [
          "Debu menempel jadi kerikil, jadi batu, jadi planetesimal, lalu protoplanet.",
          "Di bagian dalam yang panas, bahan batuan dominan. Di luar yang dingin, es dan gas lebih mudah terkumpul.",
        ],
      },
      {
        heading: "Sisa-sisa pembentukan",
        paragraphs: [
          "Asteroid dan komet adalah 'sisa' awal tata surya.",
          "Mereka jadi petunjuk penting tentang sejarah awal.",
        ],
      },
    ],
  },

  {
    page: 5,
    title: "Planet Batuan vs Planet Raksasa",
    image: IMG,
    sections: [
      {
        heading: "Planet batuan",
        paragraphs: [
          "Planet batuan punya permukaan padat, inti logam, dan ukuran lebih kecil.",
          "Atmosfernya bervariasi: tipis sampai tebal.",
        ],
        bullets: ["Merkurius • Venus • Bumi • Mars"],
      },
      {
        heading: "Planet raksasa",
        paragraphs: [
          "Jupiter dan Saturnus disebut raksasa gas. Uranus dan Neptunus sering disebut raksasa es.",
          "Mereka punya banyak satelit dan sistem cincin.",
        ],
        bullets: ["Jupiter • Saturnus (gas)", "Uranus • Neptunus (es)"],
      },
      {
        heading: "Apa bedanya pada gravitasi",
        paragraphs: [
          "Planet raksasa punya gravitasi besar, memengaruhi orbit benda kecil dan jalur komet.",
          "Jupiter khususnya sangat dominan di tata surya luar.",
        ],
      },
    ],
  },

  {
    page: 6,
    title: "Merkurius",
    image: IMG,
    sections: [
      {
        heading: "Ciri utama",
        paragraphs: [
          "Merkurius adalah planet terdekat dari Matahari dan paling kecil di antara planet besar.",
          "Suhu permukaannya ekstrem karena atmosfer sangat tipis.",
        ],
        bullets: ["Siang sangat panas", "Malam sangat dingin", "Banyak kawah seperti Bulan"],
      },
      {
        heading: "Orbit dan rotasi",
        paragraphs: [
          "Orbit Merkurius sangat elips dibandingkan planet lain.",
          "Ia punya resonansi rotasi unik: berputar 3 kali tiap 2 kali mengorbit.",
        ],
      },
      {
        heading: "Kenapa menarik",
        paragraphs: [
          "Merkurius membantu kita belajar tentang planet batuan dekat bintang.",
          "Data dari misi ruang angkasa dipakai untuk peta permukaan dan komposisi.",
        ],
      },
    ],
  },

  {
    page: 7,
    title: "Venus",
    image: IMG,
    sections: [
      {
        heading: "Kembar Bumi yang panas",
        paragraphs: [
          "Venus mirip ukuran Bumi, tapi kondisi permukaannya sangat berbeda.",
          "Efek rumah kaca ekstrem membuatnya jadi planet terpanas.",
        ],
        bullets: ["Atmosfer tebal CO2", "Awan asam sulfat", "Tekanan udara sangat tinggi"],
      },
      {
        heading: "Rotasi aneh",
        paragraphs: [
          "Venus berotasi sangat lambat dan arah rotasinya terbalik dibanding banyak planet.",
          "Matahari di Venus seolah terbit dari barat dan terbenam di timur.",
        ],
      },
      {
        heading: "Pelajaran penting",
        paragraphs: [
          "Venus adalah contoh kuat bagaimana atmosfer bisa mengubah total nasib planet.",
          "Ini penting buat studi iklim dan planet mirip Bumi di luar tata surya.",
        ],
      },
    ],
  },

  {
    page: 8,
    title: "Bumi",
    image: IMG,
    sections: [
      {
        heading: "Kenapa Bumi unik",
        paragraphs: [
          "Bumi punya air cair stabil di permukaan, atmosfer yang melindungi, dan medan magnet kuat.",
          "Kombinasi ini mendukung kehidupan.",
        ],
        bullets: ["Air cair", "Atmosfer nitrogen-oksigen", "Lempeng tektonik"],
      },
      {
        heading: "Atmosfer dan pelindung",
        paragraphs: [
          "Atmosfer membakar meteor kecil dan menahan suhu tetap stabil.",
          "Lapisan ozon membantu melindungi dari radiasi UV berbahaya.",
        ],
      },
      {
        heading: "Medan magnet",
        paragraphs: [
          "Medan magnet berasal dari inti Bumi yang cair dan berputar.",
          "Ini membelokkan angin surya dan membantu menjaga atmosfer.",
        ],
      },
    ],
  },

  {
    page: 9,
    title: "Bulan (Satelit Bumi)",
    image: IMG,
    sections: [
      {
        heading: "Dampak Bulan ke Bumi",
        paragraphs: [
          "Bulan memengaruhi pasang surut air laut.",
          "Ia juga membantu menstabilkan kemiringan sumbu Bumi sehingga iklim lebih stabil.",
        ],
      },
      {
        heading: "Permukaan Bulan",
        paragraphs: [
          "Bulan punya banyak kawah karena hampir tidak ada atmosfer.",
          "Area gelap disebut maria, bekas aliran lava purba.",
        ],
      },
      {
        heading: "Asal-usul Bulan",
        paragraphs: [
          "Teori populer: tabrakan besar antara Bumi muda dengan benda seukuran Mars menghasilkan material yang membentuk Bulan.",
        ],
      },
    ],
  },

  {
    page: 10,
    title: "Mars",
    image: IMG,
    sections: [
      {
        heading: "Planet merah",
        paragraphs: [
          "Mars dikenal karena warna merah akibat oksida besi di tanahnya.",
          "Atmosfernya tipis, didominasi CO2.",
        ],
        bullets: ["Suhu dingin", "Badai debu", "Jejak air di masa lalu"],
      },
      {
        heading: "Air dan kemungkinan kehidupan",
        paragraphs: [
          "Bukti menunjukkan Mars pernah punya air mengalir.",
          "Penelitian mencari tanda mikroba purba dan kondisi layak huni dulu.",
        ],
      },
      {
        heading: "Eksplorasi",
        paragraphs: [
          "Rover dan lander mempelajari batuan, tanah, dan atmosfer.",
          "Mars jadi target utama misi manusia di masa depan.",
        ],
      },
    ],
  },

  {
    page: 11,
    title: "Sabuk Asteroid",
    image: IMG,
    sections: [
      {
        heading: "Letak dan isi",
        paragraphs: [
          "Sabuk asteroid berada di antara Mars dan Jupiter.",
          "Isinya asteroid dari batuan dan logam dengan ukuran beragam.",
        ],
      },
      {
        heading: "Kenapa tidak jadi planet",
        paragraphs: [
          "Gravitasi Jupiter mengganggu proses penggabungan jadi planet.",
          "Akibatnya benda-benda tetap kecil dan terpisah.",
        ],
      },
      {
        heading: "Ceres",
        paragraphs: [
          "Ceres adalah planet katai di sabuk asteroid.",
          "Menjadi objek penting karena menunjukkan kemungkinan es dan aktivitas geologi.",
        ],
      },
    ],
  },

  {
    page: 12,
    title: "Jupiter",
    image: IMG,
    sections: [
      {
        heading: "Raksasa terbesar",
        paragraphs: [
          "Jupiter adalah planet terbesar. Komposisinya dominan hidrogen dan helium.",
          "Ia punya badai raksasa seperti Great Red Spot.",
        ],
        bullets: ["Gravitasi sangat kuat", "Banyak satelit", "Radiasi magnetosfer kuat"],
      },
      {
        heading: "Satelit penting",
        paragraphs: [
          "Io sangat vulkanik.",
          "Europa diduga punya samudra bawah es dan jadi kandidat lokasi yang mungkin mendukung kehidupan.",
          "Ganymede dan Callisto juga sangat menarik untuk studi geologi es.",
        ],
      },
      {
        heading: "Peran Jupiter",
        paragraphs: [
          "Jupiter memengaruhi jalur komet dan asteroid. Kadang seperti 'pelindung', tapi juga bisa mengganggu orbit benda kecil.",
        ],
      },
    ],
  },

  {
    page: 13,
    title: "Saturnus",
    image: IMG,
    sections: [
      {
        heading: "Cincin yang ikonik",
        paragraphs: [
          "Saturnus terkenal karena cincin besar yang tersusun dari es dan debu.",
          "Cincin punya struktur kompleks: celah, gelombang, dan partikel berukuran beragam.",
        ],
      },
      {
        heading: "Satelit penting",
        paragraphs: [
          "Titan punya atmosfer tebal dan danau metana, sangat unik.",
          "Enceladus punya geyser es yang menyembur, indikasi samudra bawah permukaan.",
        ],
      },
      {
        heading: "Kenapa Saturnus menarik",
        paragraphs: [
          "Saturnus mengajarkan kita tentang dinamika cincin, gravitasi, dan kimia atmosfer planet raksasa.",
        ],
      },
    ],
  },

  {
    page: 14,
    title: "Uranus",
    image: IMG,
    sections: [
      {
        heading: "Planet 'miring'",
        paragraphs: [
          "Uranus punya kemiringan sumbu ekstrem, seolah berguling saat mengorbit.",
          "Ini membuat musim di Uranus sangat panjang dan unik.",
        ],
        bullets: ["Raksasa es", "Warna kebiruan karena metana", "Punya cincin tipis"],
      },
      {
        heading: "Atmosfer dan cuaca",
        paragraphs: [
          "Walau terlihat tenang, Uranus juga punya badai dan awan.",
          "Struktur atmosfernya masih aktif dipelajari.",
        ],
      },
      {
        heading: "Eksplorasi",
        paragraphs: [
          "Data Uranus masih terbatas dibanding Jupiter/Saturnus.",
          "Misi masa depan penting untuk memahami raksasa es.",
        ],
      },
    ],
  },

  {
    page: 15,
    title: "Neptunus",
    image: IMG,
    sections: [
      {
        heading: "Planet terjauh (dari 8 planet)",
        paragraphs: [
          "Neptunus adalah planet terjauh dari Matahari di kelompok 8 planet.",
          "Ia juga raksasa es dengan warna biru pekat karena metana dan aerosol.",
        ],
      },
      {
        heading: "Angin super cepat",
        paragraphs: [
          "Neptunus punya angin atmosfer yang sangat cepat.",
          "Badai gelap pernah diamati dan berubah dari waktu ke waktu.",
        ],
      },
      {
        heading: "Satelit Triton",
        paragraphs: [
          "Triton mengorbit berlawanan arah (retrograde), indikasi kemungkinan objek tangkapan.",
          "Ada bukti aktivitas geologi dan kemungkinan cryovolcano.",
        ],
      },
    ],
  },

  {
    page: 16,
    title: "Planet Katai",
    image: IMG,
    sections: [
      {
        heading: "Apa itu planet katai",
        paragraphs: [
          "Planet katai mengorbit Matahari dan berbentuk hampir bulat, tapi belum 'membersihkan' orbitnya dari benda lain.",
          "Contoh terkenal: Pluto.",
        ],
      },
      {
        heading: "Pluto dan Kuiper Belt",
        paragraphs: [
          "Pluto berada di Kuiper Belt, wilayah penuh objek es di luar Neptunus.",
          "Kuiper Belt adalah sumber banyak komet periode pendek.",
        ],
      },
      {
        heading: "Kenapa penting",
        paragraphs: [
          "Planet katai membantu kita memahami batas definisi planet dan sejarah awal tata surya luar.",
        ],
      },
    ],
  },

  {
    page: 17,
    title: "Komet",
    image: IMG,
    sections: [
      {
        heading: "Komet itu apa",
        paragraphs: [
          "Komet adalah benda kaya es dan debu yang mengorbit Matahari.",
          "Saat mendekat ke Matahari, es menguap membentuk koma dan ekor.",
        ],
        bullets: ["Ekor selalu menjauhi Matahari karena angin surya", "Sumber utama: Kuiper Belt dan Oort Cloud"],
      },
      {
        heading: "Jenis orbit",
        paragraphs: [
          "Komet periode pendek biasanya dari Kuiper Belt.",
          "Komet periode panjang diduga dari Oort Cloud yang sangat jauh.",
        ],
      },
      {
        heading: "Nilai ilmiah",
        paragraphs: [
          "Komet membawa material purba. Studi komet membantu memahami komposisi awal tata surya.",
        ],
      },
    ],
  },

  {
    page: 18,
    title: "Meteor • Meteoroid • Meteorit",
    image: IMG,
    sections: [
      {
        heading: "Bedanya apa",
        paragraphs: [
          "Meteoroid adalah batu kecil di ruang angkasa.",
          "Meteor adalah kilatan cahaya saat masuk atmosfer.",
          "Meteorit adalah sisa yang berhasil jatuh ke permukaan.",
        ],
      },
      {
        heading: "Hujan meteor",
        paragraphs: [
          "Hujan meteor terjadi ketika Bumi melewati jejak debu komet.",
          "Contoh: Perseid dan Geminid.",
        ],
      },
      {
        heading: "Kenapa meteorit penting",
        paragraphs: [
          "Meteorit memberi sampel fisik dari luar angkasa yang bisa dianalisis di lab.",
        ],
      },
    ],
  },

  {
    page: 19,
    title: "Angin Surya dan Heliosfer",
    image: IMG,
    sections: [
      {
        heading: "Angin surya",
        paragraphs: [
          "Angin surya adalah aliran partikel bermuatan dari Matahari.",
          "Ia memengaruhi magnetosfer planet dan menghasilkan cuaca antariksa.",
        ],
      },
      {
        heading: "Heliosfer",
        paragraphs: [
          "Heliosfer adalah 'gelembung' pengaruh angin surya yang menyelimuti tata surya.",
          "Batas luarnya disebut heliopause, tempat angin surya melemah dan bertemu medium antarbintang.",
        ],
      },
      {
        heading: "Dampak ke teknologi",
        paragraphs: [
          "Badai geomagnetik bisa ganggu GPS, komunikasi radio, dan jaringan listrik.",
          "Karena itu monitoring Matahari penting.",
        ],
      },
    ],
  },

  {
    page: 20,
    title: "Cara Mengamati Tata Surya + Rangkuman",
    image: IMG,
    sections: [
      {
        heading: "Observasi simpel dari Bumi",
        paragraphs: [
          "Kamu bisa mulai dari mata telanjang, lalu pakai binokular, lalu teleskop kecil.",
          "Catat posisi planet di langit dari hari ke hari untuk melihat pola geraknya.",
        ],
        bullets: ["Gunakan aplikasi peta langit", "Pilih lokasi minim polusi cahaya", "Mulai dari Bulan dan Jupiter"],
      },
      {
        heading: "Misi antariksa",
        paragraphs: [
          "Wahana antariksa memberi data detail: kamera, spektrometer, radar, dan pengukur partikel.",
          "Dengan misi, kita bisa memetakan permukaan dan menguji teori pembentukan.",
        ],
      },
      {
        heading: "Rangkuman bab",
        paragraphs: [
          "Tata Surya adalah sistem gravitasi yang dipimpin Matahari, berisi planet, satelit, asteroid, komet, dan material kecil.",
          "Memahami perbedaan planet, jarak, dan proses pembentukan adalah fondasi untuk astronomi lanjut.",
        ],
        bullets: [
          "Planet dalam: batuan",
          "Planet luar: raksasa gas dan es",
          "Benda kecil: sabuk asteroid, Kuiper Belt, komet",
        ],
      },
    ],
  },
];

export const SOLAR_SYSTEM_TOTAL = SOLAR_SYSTEM_PAGES.length;

export function getSolarSystemPage(page: number) {
  return SOLAR_SYSTEM_PAGES.find((p) => p.page === page) ?? null;
}
