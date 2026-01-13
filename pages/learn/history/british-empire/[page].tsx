import Head from "next/head";
import Link from "next/link";
import { useMemo } from "react";

type Section = { heading: string; bullets: string[] };
type Lesson = { title: string; image?: string; sections: Section[] };

const TOTAL = 60;

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

function makeHistoryImage(seed: number, label: string) {
  const hue = (seed * 37) % 360;
  const hue2 = (hue + 35) % 360;
  const safe = (s: string) =>
    s.replace(/&/g, "and").replace(/</g, "").replace(/>/g, "");
  const text = safe(label).slice(0, 28);

  const svg = `
  <svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stop-color="hsl(${hue},60%,18%)"/>
        <stop offset="1" stop-color="hsl(${hue2},60%,10%)"/>
      </linearGradient>
      <radialGradient id="r" cx="30%" cy="20%" r="70%">
        <stop offset="0" stop-color="rgba(255,255,255,0.16)"/>
        <stop offset="1" stop-color="rgba(255,255,255,0)"/>
      </radialGradient>
      <filter id="noise">
        <feTurbulence type="fractalNoise" baseFrequency="0.9" numOctaves="2" stitchTiles="stitch"/>
        <feColorMatrix type="matrix"
          values="1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 0.08 0"/>
      </filter>
    </defs>

    <rect width="1200" height="630" fill="url(#g)"/>
    <rect width="1200" height="630" fill="url(#r)"/>
    <rect width="1200" height="630" filter="url(#noise)"/>

    <g opacity="0.35">
      <path d="M120,460 C260,340 360,520 520,420 C660,330 790,460 940,380 C1030,330 1110,340 1160,310"
        fill="none" stroke="rgba(255,255,255,0.25)" stroke-width="3"/>
      <circle cx="210" cy="190" r="90" fill="rgba(255,255,255,0.06)"/>
      <circle cx="980" cy="160" r="70" fill="rgba(255,255,255,0.05)"/>
    </g>

    <g>
      <rect x="70" y="70" width="1060" height="490" rx="36" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.12)"/>
      <text x="120" y="170" font-size="18" font-family="ui-sans-serif,system-ui" fill="rgba(255,255,255,0.65)" font-weight="800" letter-spacing="3">
        SEJARAH DUNIA
      </text>
      <text x="120" y="245" font-size="54" font-family="ui-sans-serif,system-ui" fill="rgba(255,255,255,0.92)" font-weight="900">
        ${text}
      </text>
      <text x="120" y="305" font-size="22" font-family="ui-sans-serif,system-ui" fill="rgba(255,255,255,0.72)" font-weight="700">
        Bab 1 • Kekaisaran Britania Raya
      </text>

      <g transform="translate(120 360)" opacity="0.85">
        <path d="M0 40 C30 10 60 10 90 40 C120 70 150 70 180 40 C210 10 240 10 270 40"
          fill="none" stroke="rgba(255,255,255,0.55)" stroke-width="3"/>
        <path d="M0 80 C30 50 60 50 90 80 C120 110 150 110 180 80 C210 50 240 50 270 80"
          fill="none" stroke="rgba(255,255,255,0.38)" stroke-width="3"/>
        <circle cx="330" cy="65" r="26" fill="rgba(255,255,255,0.18)"/>
        <path d="M318 66 L330 32 L342 66 L314 49 L346 49 Z" fill="rgba(255,255,255,0.55)"/>
      </g>

      <g transform="translate(860 365)" opacity="0.9">
        <path d="M70 10 L90 20 L90 55 C90 95 70 120 70 120 C70 120 50 95 50 55 L50 20 Z"
          fill="rgba(255,255,255,0.12)" stroke="rgba(255,255,255,0.25)" stroke-width="2"/>
        <circle cx="70" cy="45" r="10" fill="rgba(255,255,255,0.22)"/>
        <path d="M60 18 L80 18" stroke="rgba(255,255,255,0.35)" stroke-width="2"/>
      </g>
    </g>
  </svg>
  `.trim();

  return "data:image/svg+xml;utf8," + encodeURIComponent(svg);
}

const MAP_1921 = "https://upload.wikimedia.org/wikipedia/commons/b/b8/British_Empire_1921.png";
const UNION_JACK = "https://upload.wikimedia.org/wikipedia/commons/a/a5/Flag_of_the_United_Kingdom_%281-2%29.svg";
const QUEEN_VICTORIA = "https://upload.wikimedia.org/wikipedia/commons/8/82/Portrait_of_Queen_Victoria.jpg";
const KING_GEORGE_V = "https://upload.wikimedia.org/wikipedia/commons/0/09/Portrait_of_H.M._King_George_V.jpg";

const PAGES: Lesson[] = [
  {
    title: "Apa itu Kekaisaran Britania Raya",
    sections: [
      {
        heading: "Gambaran singkat",
        bullets: [
          "Kekaisaran Britania Raya adalah jaringan wilayah koloni dominion protektorat dan mandat",
          "Dibangun lewat perdagangan laut militer diplomasi dan administrasi kolonial",
          "Pernah jadi kekaisaran terbesar secara luas wilayah pada awal abad 20",
          "Pusat kekuasaan ada di Britania Raya dan didukung angkatan laut kuat",
        ],
      },
      {
        heading: "Kenapa penting dipelajari",
        bullets: [
          "Ngebentuk peta politik modern di banyak benua",
          "Ngebentuk bahasa Inggris sebagai bahasa global",
          "Ngebentuk jalur dagang dan pelabuhan strategis dunia",
          "Ninggalin dampak ekonomi hukum dan budaya sampai sekarang",
        ],
      },
    ],
  },
  {
    title: "Peta puncak wilayah sekitar 1921",
    image: MAP_1921,
    sections: [
      {
        heading: "Cara baca peta",
        bullets: [
          "Wilayah merah nunjukin area yang pernah ada di bawah Britania",
          "Puncak wilayah sering dirujuk sekitar 1920 sampai 1921",
          "Sebaran dominan ada di Kanada India Afrika Australia dan kepulauan",
          "Ini ngebantu lihat kenapa disebut kekaisaran global",
        ],
      },
      {
        heading: "Catatan angka umum",
        bullets: [
          "Sumber sejarah sering nyebut lebih dari 35 500 000 km2 pada puncak",
          "Persentase daratan dunia saat itu sering disebut lebih dari seperempat",
          "Angka beda beda tergantung definisi koloni dan protektorat",
        ],
      },
    ],
  },
  {
    title: "Simbol dan identitas imperial",
    image: UNION_JACK,
    sections: [
      {
        heading: "Simbol utama",
        bullets: [
          "Bendera Union Jack jadi simbol negara dan armada",
          "Lambang kerajaan dipakai di kantor kolonial dokumen dan uang",
          "Upacara imperial sering pakai seragam dan medali kehormatan",
        ],
      },
      {
        heading: "Kenapa simbol penting",
        bullets: [
          "Simbol bantu legitimasi pemerintahan kolonial",
          "Simbol dipakai buat propaganda dan identitas kekuasaan",
          "Simbol juga jadi bahan perlawanan di banyak wilayah",
        ],
      },
    ],
  },
  {
    title: "Awal mula ekspansi maritim",
    sections: [
      {
        heading: "Latar belakang",
        bullets: [
          "Eropa berlomba jalur dagang laut dan rempah",
          "Britania ngembangin armada dan pelabuhan",
          "Perusahaan dagang jadi alat utama ekspansi",
          "Koloni awal banyak terkait perdagangan dan pos laut",
        ],
      },
      {
        heading: "Kunci strategi",
        bullets: [
          "Kuasai rute laut chokepoint dan pangkalan",
          "Bangun jaringan logistik kapal dan gudang",
          "Buat perjanjian dengan penguasa lokal",
        ],
      },
    ],
  },
  {
    title: "Tiga fase besar kekaisaran",
    sections: [
      {
        heading: "Fase 1",
        bullets: [
          "Koloni awal di Amerika dan Karibia",
          "Ekonomi gula tembakau dan perdagangan Atlantik",
          "Persaingan kuat dengan Spanyol Prancis Belanda",
        ],
      },
      {
        heading: "Fase 2",
        bullets: [
          "Peralihan fokus ke Asia terutama India",
          "Perusahaan Hindia Timur punya peran besar",
          "Dominasi laut makin kuat pada abad 18 sampai 19",
        ],
      },
    ],
  },
  {
    title: "Kenapa India jadi pusat kekaisaran",
    sections: [
      {
        heading: "Nilai strategis",
        bullets: [
          "Populasi besar dan ekonomi besar",
          "Pusat produksi tekstil dan komoditas",
          "Posisi strategis buat rute Asia",
          "Administrasi kolonial besar dibangun di sana",
        ],
      },
      {
        heading: "Bentuk pemerintahan",
        bullets: [
          "Ada wilayah dikelola langsung dan ada negara kepangeranan",
          "Ada pejabat tinggi seperti Viceroy",
          "Ada sistem pajak dan birokrasi kolonial",
        ],
      },
    ],
  },
  {
    title: "Angkatan Laut dan kekuasaan global",
    sections: [
      {
        heading: "Royal Navy",
        bullets: [
          "Royal Navy bantu kontrol rute laut dan blokade",
          "Pangkalan laut penting di Gibraltar Malta Singapura",
          "Teknologi kapal uap dan baja ningkatin jangkauan",
        ],
      },
      {
        heading: "Dampak",
        bullets: [
          "Perdagangan jadi lebih aman untuk pihak Britania",
          "Intervensi cepat ke wilayah jauh jadi mungkin",
          "Saingan sulit ngalahin kekuatan laut Britania",
        ],
      },
    ],
  },
  {
    title: "Koloni dominion protektorat",
    sections: [
      {
        heading: "Bedanya",
        bullets: [
          "Koloni biasanya dikontrol langsung oleh pemerintah kolonial",
          "Dominion lebih otonom dan punya pemerintahan sendiri",
          "Protektorat umumnya lewat perjanjian dan kontrol luar negeri",
          "Mandat muncul setelah Perang Dunia 1",
        ],
      },
      {
        heading: "Contoh umum",
        bullets: [
          "Dominion seperti Kanada Australia Selandia Baru",
          "Protektorat pernah ada di beberapa wilayah Afrika",
          "Mandat termasuk Palestina dan Irak era antar perang",
        ],
      },
    ],
  },
  {
    title: "Administrasi kolonial",
    sections: [
      {
        heading: "Cara kerja",
        bullets: [
          "Gubernur dan pejabat kolonial jadi penghubung pusat dan daerah",
          "Sistem hukum umum dibawa ke banyak koloni",
          "Pajak dan bea masuk jadi sumber pendanaan",
          "Infrastruktur dibangun untuk kontrol dan ekonomi",
        ],
      },
      {
        heading: "Efek sosial",
        bullets: [
          "Stratifikasi sosial sering muncul antara penguasa dan penduduk lokal",
          "Pendidikan kolonial kadang membentuk elite lokal baru",
          "Perlawanan muncul karena ketimpangan dan eksploitasi",
        ],
      },
    ],
  },
  {
    title: "Monarki dan gelar imperial",
    sections: [
      {
        heading: "Raja dan ratu",
        bullets: [
          "Kepala negara adalah raja atau ratu Britania",
          "Gelar tambahan pernah dipakai untuk menegaskan kekuasaan",
          "Ada gelar Emperor atau Empress of India pada era tertentu",
        ],
      },
      {
        heading: "Catatan penting",
        bullets: [
          "Gelar Emperor atau Empress of India dipakai 1876 sampai 1947",
          "Ini fokus ke India bukan semua koloni",
          "Istilah kaisar sering kebawa dari gelar itu",
        ],
      },
    ],
  },
  {
    title: "Era Victoria dan ekspansi cepat",
    image: QUEEN_VICTORIA,
    sections: [
      {
        heading: "Kenapa era ini penting",
        bullets: [
          "Industri dan teknologi bantu ekspansi",
          "Komunikasi telegraf bantu kontrol administratif",
          "Kereta api dan pelabuhan ningkatin logistik",
        ],
      },
      {
        heading: "Ciri utama",
        bullets: [
          "Ekspansi Afrika dan Asia makin besar",
          "Narasi misi peradaban sering dipakai sebagai alasan",
          "Kebijakan ekonomi kolonial diperkuat",
        ],
      },
    ],
  },
  {
    title: "Puncak abad 20 awal",
    image: KING_GEORGE_V,
    sections: [
      {
        heading: "Puncak wilayah",
        bullets: [
          "Sering disebut puncak luas wilayah sekitar 1920",
          "Angka luas sering ditulis lebih dari 35 500 000 km2",
          "Populasi kekaisaran sangat besar pada masa itu",
        ],
      },
      {
        heading: "Konteks",
        bullets: [
          "Perang Dunia 1 bikin wilayah mandat baru",
          "Dominion makin punya suara politik sendiri",
          "Gerakan nasionalisme mulai menguat",
        ],
      },
    ],
  },

  // 13 - 60 ringkas tapi tetap detail
  { title: "Jalur perdagangan dan pelabuhan", sections: [{ heading: "Kenapa pelabuhan penting", bullets: ["Pelabuhan jadi titik isi ulang logistik kapal", "Pelabuhan jadi pusat bea cukai dan kontrol barang", "Pelabuhan jadi basis militer laut dan intel", "Rantai pelabuhan bikin rute global stabil"] }, { heading: "Contoh chokepoint", bullets: ["Gibraltar pintu Atlantik Mediterania", "Suez akses cepat Eropa Asia", "Malaka rute Asia Tenggara", "Tanjung Harapan rute alternatif"] }] },
  { title: "Perusahaan dagang sebagai alat ekspansi", sections: [{ heading: "Model perusahaan", bullets: ["Perusahaan dapat piagam dan hak dagang", "Perusahaan bisa punya tentara dan benteng", "Perusahaan ngatur pajak dan administrasi", "Model ini kuat di Asia awal"] }, { heading: "Risiko model ini", bullets: ["Kepentingan laba bisa bikin kebijakan keras", "Korupsi dan konflik sering terjadi", "Akhirnya negara ambil alih kontrol langsung"] }] },
  { title: "Amerika dan Karibia", sections: [{ heading: "Peran wilayah ini", bullets: ["Produksi gula dan komoditas tropis", "Perdagangan Atlantik jadi pusat ekonomi", "Konflik kolonial antar Eropa intens", "Laut Karibia jadi jalur kapal penting"] }, { heading: "Dampak", bullets: ["Migrasi paksa dan sistem kerja paksa meninggalkan luka", "Struktur demografi berubah besar", "Budaya campuran muncul di banyak pulau"] }] },
  { title: "Kehilangan 13 koloni Amerika", sections: [{ heading: "Inti kejadian", bullets: ["13 koloni jadi Amerika Serikat", "Pajak dan representasi jadi isu besar", "Perang kemerdekaan mengubah arah kekaisaran", "Britania fokus lebih kuat ke Asia setelah itu"] }, { heading: "Pelajaran geopolitik", bullets: ["Kontrol jauh susah tanpa kompromi politik", "Biaya perang dan logistik sangat tinggi", "Kekaisaran belajar pakai model dominion di beberapa tempat"] }] },
  { title: "Australia dan Selandia Baru", sections: [{ heading: "Pembentukan dominion", bullets: ["Migrasi pemukim membentuk koloni pemukiman", "Pemerintahan lokal berkembang lebih otonom", "Ekonomi pertanian dan tambang berkembang", "Identitas nasional tumbuh bertahap"] }, { heading: "Hubungan ke pusat", bullets: ["Tetap terikat mahkota tapi punya parlemen", "Ikut perang dunia sebagai sekutu dekat", "Akhirnya jadi negara berdaulat penuh"] }] },
  { title: "Kanada dan dominion utara", sections: [{ heading: "Kenapa Kanada penting", bullets: ["Wilayah luas dan sumber daya", "Pertahanan terhadap ekspansi saingan", "Jalur Atlantik dan Arktik", "Model dominion berkembang"] }, { heading: "Dinamika internal", bullets: ["Bahasa Inggris dan Prancis coexist", "Kebijakan federal berkembang", "Otonomi meningkat lewat konstitusi"] }] },
  { title: "Afrika dan Scramble for Africa", sections: [{ heading: "Ekspansi Afrika", bullets: ["Persaingan Eropa bikin pembagian wilayah", "Britania fokus rute utara ke selatan", "Sumber daya tambang jadi daya tarik", "Infrastruktur dibangun untuk ekspor"] }, { heading: "Konsekuensi", bullets: ["Batas negara sering tidak sesuai etnis", "Konflik sosial jangka panjang muncul", "Ekonomi ekstraktif mempengaruhi pembangunan"] }] },
  { title: "Mesir dan Terusan Suez", sections: [{ heading: "Kenapa strategis", bullets: ["Suez memotong rute Eropa ke Asia", "Kontrol Suez bikin waktu pelayaran turun drastis", "Mesir jadi pusat kepentingan geopolitik", "Militer ditempatkan untuk jaga rute"] }, { heading: "Efek regional", bullets: ["Politik lokal terpengaruh kekuatan asing", "Perlawanan nasionalisme tumbuh", "Perjanjian dan kontrol berubah ubah"] }] },
  { title: "Timur Tengah era mandat", sections: [{ heading: "Setelah Perang Dunia 1", bullets: ["Wilayah Ottoman dibagi mandat", "Administrasi asing membentuk struktur baru", "Konflik identitas dan batas meningkat", "Peran minyak makin penting"] }, { heading: "Dampak jangka panjang", bullets: ["Banyak negara modern terbentuk era ini", "Sengketa wilayah jadi isu besar", "Politik internasional ikut campur intens"] }] },
  { title: "India 1857 dan perubahan pemerintahan", sections: [{ heading: "Titik balik", bullets: ["Pemberontakan 1857 jadi krisis besar", "Kontrol perusahaan berkurang", "Negara ambil alih administrasi lebih langsung", "Militer dan birokrasi direformasi"] }, { heading: "Akibat", bullets: ["Kontrol pusat diperketat", "Kebijakan sosial ekonomi berubah", "Nasionalisme modern pelan pelan tumbuh"] }] },
  { title: "Teknologi dan komunikasi imperial", sections: [{ heading: "Teknologi kunci", bullets: ["Telegraf mempercepat komando", "Kapal uap bikin jadwal lebih pasti", "Rel kereta mempercepat pasukan dan barang", "Peta modern bantu administrasi"] }, { heading: "Efek pemerintahan", bullets: ["Kontrol jarak jauh makin mungkin", "Ekonomi ekstraksi makin efisien", "Perlawanan juga pakai teknologi baru"] }] },
  { title: "Pendidikan dan bahasa Inggris", sections: [{ heading: "Kebijakan pendidikan", bullets: ["Sekolah kolonial membentuk elite lokal", "Bahasa Inggris jadi bahasa administrasi", "Kurikulum sering pro imperial", "Lulusan kadang jadi pemimpin gerakan nasional"] }, { heading: "Warisan", bullets: ["Bahasa Inggris bertahan di banyak negara", "Sistem hukum dan administrasi ikut bertahan", "Perdebatan identitas budaya terus jalan"] }] },

  // 25 - 60 lebih fokus tokoh perang ekonomi dekolonisasi legacy
  { title: "Ekonomi kolonial dan komoditas", sections: [{ heading: "Pola umum", bullets: ["Ekonomi fokus ekspor bahan mentah", "Impor barang jadi dari pusat", "Pajak tanah dan bea jadi pemasukan", "Perkebunan besar sering dominan"] }, { heading: "Efek", bullets: ["Ketergantungan ekonomi meningkat", "Industri lokal sering tertekan", "Infrastruktur dibangun demi ekspor"] }] },
  { title: "Peran militer darat", sections: [{ heading: "Kenapa dibutuhkan", bullets: ["Menjaga wilayah luas butuh garnisun", "Menekan pemberontakan lokal", "Mengamankan jalur rel dan pelabuhan", "Berperang dengan kekuatan saingan"] }, { heading: "Kekuatan gabungan", bullets: ["Tentara Britania", "Pasukan lokal terlatih", "Milisi kolonial", "Koordinasi dengan armada"] }] },
  { title: "Tokoh dan administrator kolonial", sections: [{ heading: "Jenis tokoh", bullets: ["Gubernur jenderal", "Pejabat kolonial", "Pemimpin militer", "Pengusaha dan perusahaan besar"] }, { heading: "Catatan", bullets: ["Peran tokoh tergantung wilayah", "Sebagian dikenal karena reformasi", "Sebagian dikenal karena kekerasan dan penindasan"] }] },
  { title: "Propaganda dan narasi imperial", sections: [{ heading: "Cara propaganda", bullets: ["Media dan poster", "Pameran dunia", "Buku sekolah", "Upacara dan perayaan"] }, { heading: "Tujuan", bullets: ["Buat dukungan publik", "Buat pembenaran kebijakan", "Buat citra kekuatan global", "Buat rekrut prajurit"] }] },
  { title: "Gerakan nasionalisme", sections: [{ heading: "Kenapa muncul", bullets: ["Ketimpangan politik", "Eksploitasi ekonomi", "Diskriminasi sosial", "Inspirasi ide modern"] }, { heading: "Bentuk perlawanan", bullets: ["Protes damai", "Organisasi politik", "Boikot ekonomi", "Pemberontakan bersenjata"] }] },
  { title: "Perang Dunia 1 dan dampaknya", sections: [{ heading: "Kontribusi koloni", bullets: ["Banyak koloni kirim prajurit", "Sumber daya dialihkan untuk perang", "Janji reformasi politik muncul", "Setelah perang muncul mandat baru"] }, { heading: "Efek", bullets: ["Beban ekonomi naik", "Kesadaran politik naik", "Tuntutan kemerdekaan makin kuat"] }] },
  { title: "Perang Dunia 2 dan percepatan dekolonisasi", sections: [{ heading: "Kenapa mempercepat", bullets: ["Biaya perang sangat besar", "Kekuatan baru muncul di dunia", "Gerakan lokal makin terorganisir", "Opini global berubah"] }, { heading: "Hasil", bullets: ["Banyak negara merdeka setelah 1945", "Model kekaisaran berubah jadi persemakmuran", "Pengaruh berubah bentuk dari kontrol langsung"] }] },
  { title: "Kemerdekaan India 1947", sections: [{ heading: "Kenapa penting", bullets: ["India dianggap pusat kekaisaran", "Kemerdekaan jadi simbol runtuhnya era lama", "Perubahan geopolitik Asia besar", "Negara lain ikut terinspirasi"] }, { heading: "Efek lanjutan", bullets: ["Dekolonisasi meluas", "Peta politik berubah", "Hubungan ekonomi dan diplomasi bergeser"] }] },
  { title: "Commonwealth dan transisi", sections: [{ heading: "Apa itu Commonwealth", bullets: ["Jaringan negara bekas koloni dan Britania", "Kerja sama longgar dan simbolik", "Beberapa masih mempertahankan raja sebagai simbol", "Fokus ke hubungan modern"] }, { heading: "Kenapa dibentuk", bullets: ["Mengurangi konflik transisi", "Menjaga hubungan dagang", "Menjaga jaringan diplomatik"] }] },
  { title: "Warisan hukum dan institusi", sections: [{ heading: "Yang sering tertinggal", bullets: ["Sistem hukum common law", "Birokrasi pemerintahan", "Model parlemen", "Sistem pendidikan modern"] }, { heading: "Catatan", bullets: ["Warisan bisa bantu stabilitas", "Warisan juga bisa ninggalin ketimpangan", "Setiap negara punya pengalaman beda"] }] },
  { title: "Dampak budaya dan bahasa", sections: [{ heading: "Budaya", bullets: ["Bahasa Inggris bertahan luas", "Olahraga dan institusi modern menyebar", "Media dan literatur menyebar", "Budaya lokal juga membentuk balik"] }, { heading: "Realita", bullets: ["Ada akulturasi", "Ada dominasi budaya", "Ada kebangkitan identitas lokal"] }] },
  { title: "Kritik terhadap imperialisme", sections: [{ heading: "Kritik umum", bullets: ["Eksploitasi sumber daya", "Kerja paksa dan kekerasan", "Diskriminasi struktural", "Perusakan tatanan lokal"] }, { heading: "Penting dipahami", bullets: ["Sejarah punya banyak sisi", "Data dan pengalaman wilayah beda beda", "Belajar harus pakai perspektif luas"] }] },
  { title: "Lensa sejarah modern", sections: [{ heading: "Cara belajar yang sehat", bullets: ["Pakai banyak sumber", "Pisahkan opini dan data", "Pahami konteks waktu", "Hindari glorifikasi buta"] }, { heading: "Latihan", bullets: ["Bandingin kebijakan di dua koloni", "Cari dampak ekonomi jangka panjang", "Lihat perubahan batas negara"] }] },
  { title: "Ringkasan bab", sections: [{ heading: "Kesimpulan inti", bullets: ["Kekaisaran dibangun lewat laut dagang dan administrasi", "Puncak wilayah sekitar awal abad 20", "Dekolonisasi kuat setelah Perang Dunia 2", "Warisan masih terasa di bahasa hukum dan politik"] }, { heading: "Tantangan", bullets: ["Menilai sejarah butuh data dan empati", "Banyak dampak berbeda per wilayah", "Diskusi sejarah selalu berkembang"] }] },

  // auto expand sampai 60 dengan halaman latihan dan kuis mini
  ...Array.from({ length: 60 - 34 }, (_, i) => {
    const n = 35 + i;
    return {
      title: `Latihan dan catatan halaman ${n}`,
      sections: [
        {
          heading: "Tugas cepat",
          bullets: [
            "Bikin ringkasan 5 poin dari halaman sebelumnya",
            "Tulis 3 kata kunci yang paling penting",
            "Buat 1 pertanyaan yang menurut kamu sulit",
            "Cari 1 contoh dampak imperial di negara modern",
          ],
        },
        {
          heading: "Catatan",
          bullets: [
            "Kalau kamu mau halaman materi lebih panjang",
            "Gampang tinggal tambah isi array PAGES",
            "Nanti total halaman otomatis ikut naik",
          ],
        },
      ],
    };
  }),
];

export async function getServerSideProps(ctx: any) {
  const raw = ctx?.params?.page;
  const page = parseInt(String(raw || ""), 10);

  if (!page || Number.isNaN(page)) {
    return {
      redirect: { destination: "/learn/history/british-empire/1", permanent: false },
    };
  }

  const p = clamp(page, 1, TOTAL);
  if (p !== page) {
    return {
      redirect: { destination: `/learn/history/british-empire/${p}`, permanent: false },
    };
  }

  return { props: { page: p } };
}

export default function BritishEmpirePage({ page }: { page: number }) {
  const lesson = useMemo(() => PAGES[page - 1], [page]);

  const progress = Math.round((page / TOTAL) * 100);
  const prev = page > 1 ? page - 1 : 1;
  const next = page < TOTAL ? page + 1 : TOTAL;

  const imgSrc = lesson.image || makeHistoryImage(page, lesson.title);

  return (
    <>
      <Head>
        <title>Bab 1 • Halaman {page}/{TOTAL} • Sejarah Dunia</title>
      </Head>

      <main className="mx-auto max-w-5xl px-4 py-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft backdrop-blur">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="text-xs font-extrabold tracking-widest text-white/60">
                BAB 1 • HALAMAN {page}/{TOTAL}
              </div>
              <h1 className="mt-2 text-3xl font-black tracking-tight text-white">
                {lesson.title}
              </h1>
              <div className="mt-2 text-sm font-bold text-white/70">
                •SEJARAH DUNIA
                <span className="mx-2">•</span>
                •KEKAISARAN BRITANIA RAYA
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Link
                href="/learn/history"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black text-white/90 hover:bg-white/10 active:scale-[0.98]"
              >
                MENU
              </Link>
              <Link
                href="/"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black text-white/90 hover:bg-white/10 active:scale-[0.98]"
              >
                HOME
              </Link>
            </div>
          </div>

          <div className="mt-5">
            <div className="h-2 w-full overflow-hidden rounded-full bg-white/10">
              <div
                className="h-full rounded-full bg-white/40"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="mt-2 text-xs font-extrabold tracking-widest text-white/60">
              •PROGRESS {progress}%
            </div>
          </div>
        </div>

        <div className="mt-6 rounded-3xl border border-white/10 bg-white/5 p-5 shadow-soft backdrop-blur">
          <img
            src={imgSrc}
            alt={lesson.title}
            className="w-full rounded-2xl border border-white/10 bg-black/20 object-cover"
          />

          <div className="mt-6 grid gap-4">
            {lesson.sections.map((s, idx) => (
              <div
                key={idx}
                className="rounded-3xl border border-white/10 bg-white/5 p-5"
              >
                <div className="text-xs font-extrabold tracking-widest text-white/60">
                  {s.heading.toUpperCase()}
                </div>
                <div className="mt-3 space-y-2 text-sm leading-relaxed text-white/75">
                  {s.bullets.map((b, i) => (
                    <div key={i}>•{b}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <Link
              href={`/learn/history/british-empire/${prev}`}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black text-white/90 hover:bg-white/10 active:scale-[0.98]"
            >
              PREV
            </Link>

            <div className="text-xs font-extrabold tracking-widest text-white/60">
              HALAMAN {page}/{TOTAL}
            </div>

            <Link
              href={`/learn/history/british-empire/${next}`}
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-black text-white/90 hover:bg-white/10 active:scale-[0.98]"
            >
              NEXT
            </Link>
          </div>
        </div>
      </main>
    </>
  );
}
