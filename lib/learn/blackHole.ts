export type LearnSection = { heading: string; paragraphs: string[]; bullets?: string[] };
export type LearnPage = { page: number; title: string; sections: LearnSection[] };

const TOPICS: Array<{ title: string; sections: LearnSection[] }> = [
  { title: "Pengenalan Black Hole", sections: [
    { heading:"Apa itu black hole", paragraphs:[
      "Black hole adalah wilayah ruang-waktu dengan gravitasi sangat kuat sehingga cahaya pun sulit lepas.",
      "Yang disebut “lubang” bukan lubang fisik, tapi area dengan batas tertentu bernama event horizon."
    ], bullets:["Event horizon = batas balik","Gravitasi ekstrem = efek relativitas"] }
  ]},
  { title: "Event Horizon", sections: [
    { heading:"Batas tanpa kembali", paragraphs:[
      "Event horizon adalah radius di mana kecepatan lepas sama dengan kecepatan cahaya.",
      "Jika sesuatu melewati horizon, semua jalur ke masa depan mengarah ke pusat."
    ], bullets:["Bukan dinding","Efeknya tergantung massa black hole"] }
  ]},
  { title: "Singularity (Konsep)", sections: [
    { heading:"Apa yang dimaksud singularity", paragraphs:[
      "Dalam relativitas umum klasik, pusat black hole mengarah ke singularity: kepadatan dan kelengkungan tak terhingga.",
      "Banyak ilmuwan menduga teori gravitasi kuantum dibutuhkan untuk menggambarkan pusat sebenarnya."
    ], bullets:["Model klasik punya batas","Riset: gravitasi kuantum"] }
  ]},
  { title: "Schwarzschild Radius", sections: [
    { heading:"Radius Schwarzschild", paragraphs:[
      "Untuk black hole non-berputar, radius horizon ditentukan oleh massanya.",
      "Semakin besar massa, semakin besar radius horizon."
    ], bullets:["Massa naik •radius naik","Contoh: black hole bintang vs supermasif"] }
  ]},
  { title: "Jenis Black Hole", sections: [
    { heading:"Tiga kategori populer", paragraphs:[
      "Black hole bisa diklasifikasi dari massanya: stellar •intermediate •supermassive.",
      "Ada juga kandidat primordial black hole (masih hipotesis)."
    ], bullets:["Stellar: dari bintang masif","Supermassive: pusat galaksi"] }
  ]},
  { title: "Terbentuknya Black Hole Stellar", sections: [
    { heading:"Kelahiran dari bintang masif", paragraphs:[
      "Bintang masif yang kehabisan bahan bakar bisa kolaps karena gravitasi.",
      "Jika sisa massanya cukup besar, kolaps berlanjut jadi black hole."
    ], bullets:["Tahap: supernova •sisa inti","Batas massa tertentu"] }
  ]},
  { title: "Accretion Disk", sections: [
    { heading:"Piringan akresi", paragraphs:[
      "Gas dan debu yang mendekat bisa membentuk piringan karena momentum sudut.",
      "Gesekan membuat piringan panas dan memancarkan sinar-X."
    ], bullets:["Panas ekstrem","Sumber cahaya kuat di sekitar BH"] }
  ]},
  { title: "Jet Relativistik", sections: [
    { heading:"Semburan jet", paragraphs:[
      "Beberapa black hole menghasilkan jet partikel yang keluar sangat cepat dari kutubnya.",
      "Jet terkait medan magnet dan piringan akresi."
    ], bullets:["Arah kutub","Bisa panjang ribuan tahun cahaya"] }
  ]},
  { title: "Spaghettification", sections: [
    { heading:"Efek pasang surut", paragraphs:[
      "Dekat black hole, gaya gravitasi berbeda drastis antara kepala dan kaki.",
      "Benda bisa tertarik memanjang seperti mie: spaghettification."
    ], bullets:["Tidal force ekstrem","Lebih kuat pada BH kecil dekat horizon"] }
  ]},
  { title: "Time Dilation", sections: [
    { heading:"Waktu melambat", paragraphs:[
      "Menurut relativitas, jam dekat gravitasi kuat berjalan lebih lambat.",
      "Bagi pengamat jauh, benda tampak melambat saat mendekati horizon."
    ], bullets:["Efek relativitas","Bukan berarti benda berhenti “sebenarnya”"] }
  ]},
  { title: "Orbit dan Photon Sphere", sections: [
    { heading:"Orbit cahaya", paragraphs:[
      "Ada jarak tertentu di mana cahaya bisa mengorbit black hole (photon sphere).",
      "Orbit ini tidak stabil: sedikit gangguan bisa jatuh atau kabur."
    ], bullets:["Cahaya bisa mengorbit","Orbit tidak stabil"] }
  ]},
  { title: "Kerr Black Hole (Berputar)", sections: [
    { heading:"Spin itu penting", paragraphs:[
      "Black hole berputar dijelaskan oleh solusi Kerr.",
      "Spin memengaruhi horizon, orbit stabil, dan fenomena seperti ergosphere."
    ], bullets:["Spin mengubah geometri","Banyak BH nyata berputar"] }
  ]},
  { title: "Ergosphere", sections: [
    { heading:"Zona seret ruang", paragraphs:[
      "Pada black hole berputar, ruang-waktu ikut terseret (frame dragging).",
      "Di ergosphere, tidak mungkin diam relatif terhadap bintang jauh."
    ], bullets:["Frame dragging","Energi bisa diekstrak (teoretis)"] }
  ]},
  { title: "Bukti Black Hole: Gerak Bintang", sections: [
    { heading:"Contoh pusat galaksi", paragraphs:[
      "Di pusat Bima Sakti, bintang mengorbit objek tak terlihat bermassa besar.",
      "Orbit tersebut menunjukkan adanya objek supermasif yang sangat kompak."
    ], bullets:["Observasi orbit","Massa besar •ukuran kecil"] }
  ]},
  { title: "EHT dan Foto M87*", sections: [
    { heading:"Bayangan black hole", paragraphs:[
      "Event Horizon Telescope memotret bayangan M87* dan Sagittarius A*.",
      "Yang terlihat adalah cahaya dari piringan akresi yang dibelokkan gravitasi."
    ], bullets:["Shadow bukan BH itu sendiri","Gravitational lensing kuat"] }
  ]},
  { title: "Gelombang Gravitasi", sections: [
    { heading:"Tabrakan black hole", paragraphs:[
      "LIGO/Virgo mendeteksi gelombang gravitasi dari merger black hole.",
      "Sinyal “chirp” memberi informasi massa dan spin."
    ], bullets:["Bukti kuat BH biner","Era astronomi gelombang gravitasi"] }
  ]},
  { title: "Hawking Radiation (Konsep)", sections: [
    { heading:"BH bisa “menguap”", paragraphs:[
      "Secara kuantum, black hole dapat memancarkan radiasi sangat lemah (Hawking radiation).",
      "Untuk BH besar, efeknya kecil sekali sehingga sulit dideteksi."
    ], bullets:["Efek kuantum","Kecil untuk BH astrofisika"] }
  ]},
  { title: "Information Paradox", sections: [
    { heading:"Masalah informasi", paragraphs:[
      "Jika BH menguap, ke mana informasi tentang materi yang jatuh?",
      "Ini jadi salah satu masalah besar yang menghubungkan relativitas dan mekanika kuantum."
    ], bullets:["Riset aktif","Belum final"] }
  ]},
  { title: "BH dan Evolusi Galaksi", sections: [
    { heading:"Feedback ke galaksi", paragraphs:[
      "Black hole supermasif dapat memengaruhi pembentukan bintang lewat jet dan angin.",
      "Ada korelasi massa BH dengan sifat bulge galaksi."
    ], bullets:["Feedback memanaskan gas","Pengaruh skala galaksi"] }
  ]},
  { title: "Cara Deteksi Tidak Langsung", sections: [
    { heading:"Sinar-X dan lensa", paragraphs:[
      "Kita sering mendeteksi BH lewat sinar-X dari piringan akresi dan efek lensa gravitasi.",
      "Mikrolensa bisa mengungkap objek masif yang gelap."
    ], bullets:["X-ray binaries","Gravitational lensing"] }
  ]},
  { title: "Rangkuman & Latihan", sections: [
    { heading:"Ringkas", paragraphs:[
      "Black hole dipahami lewat relativitas, akresi, dan bukti observasi modern.",
      "Banyak fenomena dapat diuji: orbit bintang, EHT, gelombang gravitasi, sinar-X."
    ], bullets:[
      "Definisi: event horizon",
      "Fenomena: akresi •jet •time dilation",
      "Bukti: EHT •LIGO •orbit bintang",
      "Latihan: jelaskan perbedaan stellar vs supermassive"
    ] }
  ]},
];

export const BLACK_HOLE_PAGES: LearnPage[] = TOPICS.map((t, i) => ({ page: i + 1, title: t.title, sections: t.sections }));
export const BLACK_HOLE_TOTAL = BLACK_HOLE_PAGES.length;
export function getBlackHolePage(page: number) {
  return BLACK_HOLE_PAGES.find((x) => x.page === page) ?? null;
}
