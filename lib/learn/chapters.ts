export type SubjectKey = "astronomy" | "history";
export type LearnBlock = { heading: string; bullets: string[] };
export type LearnPage = { title: string; blocks: LearnBlock[]; image?: string };
export type LearnChapter = {
  subject: SubjectKey;
  key: string;
  title: string;
  desc: string;
  pages: LearnPage[];
};

type Topic = { title: string; bullets: string[] };

function checkpointPage(n: number, label: string): LearnPage {
  return {
    title: `Checkpoint ${n} • ${label}`,
    blocks: [
      {
        heading: "Ringkas cepat",
        bullets: [
          "Tulis 5 poin yang paling kamu ingat",
          "Tulis 3 istilah yang kamu baru paham",
          "Tulis 1 hal yang masih bikin bingung",
        ],
      },
      {
        heading: "Mini quiz",
        bullets: [
          "Jelaskan inti materi dengan 3 kalimat",
          "Kasih 2 contoh nyata dari materi",
          "Buat 1 pertanyaan buat diri sendiri",
        ],
      },
    ],
  };
}

function buildPages(intro: LearnPage, topics: Topic[], outroTitle: string): LearnPage[] {
  const pages: LearnPage[] = [];
  pages.push(intro);

  let cp = 1;
  topics.forEach((t, idx) => {
    pages.push({
      title: t.title,
      blocks: [
        { heading: "Materi", bullets: t.bullets },
        {
          heading: "Catatan belajar",
          bullets: [
            "Baca pelan lalu ulangi poin penting",
            "Cari contoh di sekitar atau di internet",
            "Tulis ringkasan biar nempel di otak",
          ],
        },
      ],
    });

    if ((idx + 1) % 5 === 0 && idx !== topics.length - 1) {
      pages.push(checkpointPage(cp++, "Latihan"));
    }
  });

  pages.push({
    title: outroTitle,
    blocks: [
      {
        heading: "Kesimpulan",
        bullets: [
          "Ulangi materi inti dan istilah penting",
          "Coba jelasin ke orang lain biar makin paham",
          "Kalau mau lebih panjang tinggal tambah topik",
        ],
      },
      {
        heading: "Tantangan",
        bullets: [
          "Buat catatan 1 halaman versi kamu",
          "Buat 10 pertanyaan dari bab ini",
          "Cari 1 video lalu bandingkan dengan materi",
        ],
      },
    ],
  });

  return pages;
}

/* =========================
   ASTRONOMI • 8 BAB BARU
========================= */

export const ASTRO_CHAPTERS: LearnChapter[] = [
  {
    subject: "astronomy",
    key: "milky-way",
    title: "Galaksi Bima Sakti",
    desc: "Struktur • pusat galaksi • lengan • dark matter • local group",
    pages: buildPages(
      {
        title: "Pendahuluan Bima Sakti",
        blocks: [
          { heading: "Gambaran", bullets: [
            "Bima Sakti adalah galaksi tempat tata surya berada",
            "Bentuknya spiral berbatang dalam model modern",
            "Kita melihatnya sebagai pita cahaya di langit malam",
          ]},
          { heading: "Target bab", bullets: [
            "Paham struktur galaksi",
            "Paham posisi matahari di galaksi",
            "Paham cara manusia memetakan galaksi",
          ]},
        ],
      },
      [
        { title: "Struktur spiral dan batang", bullets: [
          "Galaksi spiral punya piringan dan lengan",
          "Batang adalah struktur memanjang di pusat",
          "Bintang gas dan debu mengikuti pola gravitasi",
        ]},
        { title: "Piringan tipis dan piringan tebal", bullets: [
          "Piringan tipis banyak bintang muda dan gas",
          "Piringan tebal banyak bintang lebih tua",
          "Ketebalan terkait sejarah tabrakan galaksi kecil",
        ]},
        { title: "Lengan galaksi", bullets: [
          "Lengan adalah area padat tempat banyak pembentukan bintang",
          "Nebula sering berada di wilayah lengan",
          "Nama lengan beda beda tergantung pemetaan",
        ]},
        { title: "Pusat galaksi", bullets: [
          "Pusat galaksi sangat padat bintang dan debu",
          "Ada sumber radio kuat di area pusat",
          "Observasi inframerah membantu menembus debu",
        ]},
        { title: "Sagittarius A*", bullets: [
          "Sgr A* adalah kandidat black hole supermasif di pusat",
          "Benda masif mengikat orbit bintang dekat pusat",
          "Studi orbit bintang bantu ukur massa pusat",
        ]},
        { title: "Halo galaksi", bullets: [
          "Halo berisi bintang tua dan gugus bola",
          "Halo juga terkait dark matter",
          "Halo ukurannya jauh lebih besar dari piringan",
        ]},
        { title: "Dark matter dan kurva rotasi", bullets: [
          "Kecepatan rotasi bintang tidak turun seperti dugaan sederhana",
          "Ini mengarah ke konsep dark matter",
          "Dark matter tidak memancarkan cahaya",
        ]},
        { title: "Gugus bola", bullets: [
          "Gugus bola adalah kumpulan bintang tua",
          "Biasanya berada di halo",
          "Dipakai untuk mempelajari umur galaksi",
        ]},
        { title: "Posisi matahari", bullets: [
          "Matahari tidak di pusat galaksi",
          "Posisinya di salah satu area piringan",
          "Jarak dan posisi dipetakan dari berbagai metode",
        ]},
        { title: "Gas debu dan pembentukan bintang", bullets: [
          "Awan molekul adalah tempat bintang lahir",
          "Wilayah padat memicu runtuh gravitasi",
          "Nebula emisi sering muncul di area ini",
        ]},
        { title: "Satelit Bima Sakti", bullets: [
          "Ada galaksi kerdil yang mengorbit Bima Sakti",
          "Interaksi bisa memicu aliran bintang",
          "Contoh interaksi terlihat dari struktur halo",
        ]},
        { title: "Local Group", bullets: [
          "Bima Sakti bagian dari kelompok galaksi lokal",
          "Andromeda adalah tetangga besar",
          "Banyak galaksi kerdil juga ada di group ini",
        ]},
        { title: "Tumbukan masa depan dengan Andromeda", bullets: [
          "Model menunjukkan kemungkinan tabrakan jauh di masa depan",
          "Tabrakan galaksi bukan tabrakan bintang satu satu",
          "Struktur galaksi bisa berubah total",
        ]},
        { title: "Cara memetakan galaksi", bullets: [
          "Radio untuk gas hidrogen",
          "Inframerah untuk menembus debu",
          "Paralaks untuk jarak bintang dekat",
        ]},
        { title: "Observasi untuk pemula", bullets: [
          "Cari pita bima sakti di langit gelap",
          "Gunakan aplikasi peta bintang untuk verifikasi",
          "Foto langit malam bisa menangkap pita bima sakti",
        ]},
      ],
      "Akhir Bab • Bima Sakti"
    ),
  },

  {
    subject: "astronomy",
    key: "stars",
    title: "Bintang",
    desc: "Lahir • hidup • mati • supernova • neutron star",
    pages: buildPages(
      {
        title: "Pendahuluan Bintang",
        blocks: [
          { heading: "Gambaran", bullets: [
            "Bintang adalah bola plasma yang memancarkan cahaya",
            "Energi utama berasal dari fusi di inti",
            "Massa bintang menentukan nasib akhirnya",
          ]},
          { heading: "Target bab", bullets: [
            "Paham siklus hidup bintang",
            "Paham jenis bintang penting",
            "Paham cara mengukur terang dan jarak",
          ]},
        ],
      },
      [
        { title: "Awan molekul dan kelahiran bintang", bullets: [
          "Bintang lahir dari gas dan debu yang runtuh",
          "Runtuh terjadi saat gravitasi menang melawan tekanan",
          "Inti padat memanas membentuk protobintang",
        ]},
        { title: "Protobintang", bullets: [
          "Protobintang belum stabil fusi penuh",
          "Materi jatuh membentuk piringan akresi",
          "Jet bisa muncul dari kutub protobintang",
        ]},
        { title: "Deret utama", bullets: [
          "Fase terlama dalam hidup bintang",
          "Fusi hidrogen menjadi helium dominan",
          "Massa besar lebih terang tapi lebih cepat habis",
        ]},
        { title: "Diagram HR", bullets: [
          "HR memetakan terang vs suhu",
          "Deret utama adalah pita utama di diagram",
          "Bintang raksasa dan katai punya posisi khas",
        ]},
        { title: "Raksasa merah", bullets: [
          "Terjadi saat hidrogen inti habis",
          "Lapisan luar mengembang besar",
          "Bintang lebih dingin di permukaan tapi sangat besar",
        ]},
        { title: "Supernova", bullets: [
          "Ledakan akhir bintang masif",
          "Melepaskan unsur berat ke ruang antar bintang",
          "Bisa membentuk bintang neutron atau black hole",
        ]},
        { title: "Bintang neutron", bullets: [
          "Sisa inti super padat",
          "Medan magnet bisa sangat kuat",
          "Bisa terlihat sebagai pulsar",
        ]},
        { title: "Katai putih", bullets: [
          "Sisa bintang mirip matahari",
          "Tidak ada fusi besar lagi",
          "Mendingin perlahan dalam waktu sangat lama",
        ]},
        { title: "Spektrum dan kelas bintang", bullets: [
          "Warna berkaitan dengan suhu",
          "Kelas spektral dari panas ke dingin",
          "Spektrum juga menunjukkan komposisi",
        ]},
        { title: "Magnitudo dan kecerlangan", bullets: [
          "Magnitudo kecil artinya lebih terang",
          "Ada magnitudo semu dan mutlak",
          "Jarak mempengaruhi terang yang terlihat",
        ]},
        { title: "Mengukur jarak bintang", bullets: [
          "Paralaks untuk bintang dekat",
          "Standar candle untuk jarak lebih jauh",
          "Pergabungan metode untuk peta galaksi",
        ]},
        { title: "Bintang ganda dan sistem banyak bintang", bullets: [
          "Banyak bintang berada dalam sistem ganda",
          "Orbit membantu ukur massa bintang",
          "Interaksi bisa memicu nova",
        ]},
        { title: "Variabel bintang", bullets: [
          "Terang berubah karena pulsa atau orbit",
          "Cepheid penting untuk ukur jarak galaksi",
          "Variabel juga bantu paham struktur bintang",
        ]},
        { title: "Gugus terbuka dan gugus bola", bullets: [
          "Gugus terbuka berisi bintang muda",
          "Gugus bola berisi bintang tua",
          "Gugus jadi laboratorium umur bintang",
        ]},
        { title: "Unsur kimia dari bintang", bullets: [
          "Bintang membentuk unsur lewat fusi",
          "Supernova menyebar unsur berat",
          "Ini bahan pembentuk planet dan kehidupan",
        ]},
        { title: "Observasi bintang untuk pemula", bullets: [
          "Cari rasi bintang terang",
          "Bandingkan warna bintang merah dan biru",
          "Coba catat perubahan terang bintang variabel",
        ]},
      ],
      "Akhir Bab • Bintang"
    ),
  },

  {
    subject: "astronomy",
    key: "nebula",
    title: "Nebula dan Tempat Lahir Bintang",
    desc: "Jenis nebula • pembentukan bintang • contoh objek langit",
    pages: buildPages(
      {
        title: "Pendahuluan Nebula",
        blocks: [
          { heading: "Gambaran", bullets: [
            "Nebula adalah awan gas dan debu di ruang angkasa",
            "Ada nebula lahir bintang dan ada nebula sisa kematian bintang",
            "Banyak nebula terlihat indah dalam foto langit",
          ]},
          { heading: "Target bab", bullets: [
            "Kenal jenis jenis nebula",
            "Paham hubungan nebula dan bintang",
            "Paham cara observasi dasar",
          ]},
        ],
      },
      [
        { title: "Nebula emisi", bullets: [
          "Memancarkan cahaya karena gas terionisasi",
          "Sering merah karena hidrogen",
          "Dekat bintang muda panas",
        ]},
        { title: "Nebula refleksi", bullets: [
          "Tidak memancarkan sendiri",
          "Memantulkan cahaya bintang",
          "Sering tampak kebiruan",
        ]},
        { title: "Nebula gelap", bullets: [
          "Awan debu menghalangi cahaya di belakangnya",
          "Terlihat sebagai siluet gelap",
          "Sering jadi lokasi awal pembentukan bintang",
        ]},
        { title: "Nebula planetari", bullets: [
          "Bukan planet",
          "Sisa selubung bintang mirip matahari",
          "Membentuk struktur cincin atau gelembung",
        ]},
        { title: "Sisa supernova", bullets: [
          "Sisa ledakan bintang masif",
          "Mengandung unsur berat",
          "Gelombang kejut mempengaruhi awan sekitar",
        ]},
        { title: "Awan molekul raksasa", bullets: [
          "Sangat dingin dan padat",
          "Mengandung molekul dan debu",
          "Tempat utama lahir bintang",
        ]},
        { title: "HII region", bullets: [
          "Wilayah hidrogen terionisasi",
          "Dipicu bintang muda panas",
          "Salah satu tanda pembentukan bintang aktif",
        ]},
        { title: "Orion Nebula", bullets: [
          "Contoh nebula pembentukan bintang terkenal",
          "Bisa diamati dengan binokular di langit gelap",
          "Penuh bintang muda dan gas bercahaya",
        ]},
        { title: "Horsehead dan Flame", bullets: [
          "Contoh nebula gelap dan emisi",
          "Kontras karena debu pekat",
          "Sering jadi target astrofoto",
        ]},
        { title: "Pillars of creation konsep", bullets: [
          "Pilar adalah struktur gas padat",
          "Bintang baru dapat terbentuk di dalamnya",
          "Radiasi bintang memahat bentuk pilar",
        ]},
        { title: "Bok globule", bullets: [
          "Gumpalan debu kecil padat",
          "Bisa jadi embrio bintang",
          "Sulit dilihat tanpa langit bagus",
        ]},
        { title: "Spektroskopi nebula", bullets: [
          "Spektrum menunjukkan unsur dan suhu",
          "Garis emisi menunjukkan ionisasi",
          "Data ini bantu model fisika nebula",
        ]},
        { title: "Kenapa warna nebula berbeda", bullets: [
          "Unsur beda memberi garis beda",
          "Suhu dan radiasi mempengaruhi emisi",
          "Debu membuat warna dan kontras berubah",
        ]},
        { title: "Observasi nebula", bullets: [
          "Cari langit gelap jauh dari lampu",
          "Gunakan binokular dulu",
          "Filter tertentu membantu beberapa nebula",
        ]},
      ],
      "Akhir Bab • Nebula"
    ),
  },

  {
    subject: "astronomy",
    key: "exoplanets",
    title: "Eksoplanet",
    desc: "Transit • radial velocity • zona laik huni • atmosfer",
    pages: buildPages(
      {
        title: "Pendahuluan Eksoplanet",
        blocks: [
          { heading: "Gambaran", bullets: [
            "Eksoplanet adalah planet di luar tata surya",
            "Deteksi dilakukan dengan teknik tidak langsung dan langsung",
            "Misi ruang angkasa mempercepat penemuan",
          ]},
          { heading: "Target bab", bullets: [
            "Paham cara deteksi eksoplanet",
            "Kenal jenis eksoplanet umum",
            "Paham konsep zona laik huni",
          ]},
        ],
      },
      [
        { title: "Metode transit", bullets: [
          "Planet lewat depan bintang menurunkan cahaya sedikit",
          "Pola penurunan berulang memberi periode orbit",
          "Transit bisa beri ukuran planet",
        ]},
        { title: "Radial velocity", bullets: [
          "Planet menarik bintang membuat goyangan kecil",
          "Goyangan terlihat dari pergeseran spektrum",
          "Bisa bantu ukur massa minimum planet",
        ]},
        { title: "Direct imaging", bullets: [
          "Memotret planet langsung sangat sulit",
          "Butuh menutupi cahaya bintang",
          "Lebih mudah untuk planet jauh dari bintangnya",
        ]},
        { title: "Microlensing", bullets: [
          "Gravitasi membelokkan cahaya seperti lensa",
          "Event jarang tapi bisa deteksi planet",
          "Cocok untuk planet pada jarak tertentu",
        ]},
        { title: "Astrometry", bullets: [
          "Mengukur posisi bintang sangat presisi",
          "Goyangan posisi bisa tunjuk ada planet",
          "Butuh instrumen sangat akurat",
        ]},
        { title: "Jenis eksoplanet umum", bullets: [
          "Hot Jupiter planet gas dekat bintang",
          "Super Earth lebih besar dari bumi",
          "Mini Neptune planet gas kecil",
        ]},
        { title: "Zona laik huni", bullets: [
          "Zona jarak yang memungkinkan air cair",
          "Tergantung tipe bintang",
          "Atmosfer planet sangat mempengaruhi",
        ]},
        { title: "Atmosfer eksoplanet", bullets: [
          "Transit spectroscopy bisa baca atmosfer",
          "Bisa cari uap air atau gas tertentu",
          "Interpretasi butuh hati hati",
        ]},
        { title: "False positive", bullets: [
          "Bintang ganda bisa meniru sinyal planet",
          "Butuh verifikasi multi metode",
          "Data statistik harus disaring",
        ]},
        { title: "Misi Kepler dan TESS", bullets: [
          "Kepler fokus statistik planet",
          "TESS cari planet dekat yang mudah dipelajari",
          "Banyak target untuk teleskop besar",
        ]},
        { title: "Biosignature konsep", bullets: [
          "Biosignature adalah tanda proses biologis",
          "Harus dibedakan dari proses non biologis",
          "Butuh data atmosfer dan konteks planet",
        ]},
        { title: "Masa depan riset eksoplanet", bullets: [
          "Teleskop lebih sensitif",
          "Studi atmosfer makin detail",
          "Target utama planet mirip bumi",
        ]},
        { title: "Latihan pemahaman", bullets: [
          "Bandingkan transit vs radial velocity",
          "Tulis kelebihan dan kekurangan",
          "Coba cari 1 eksoplanet terkenal dan catat datanya",
        ]},
      ],
      "Akhir Bab • Eksoplanet"
    ),
  },

  {
    subject: "astronomy",
    key: "telescopes",
    title: "Teleskop dan Observasi",
    desc: "Aperture • mount • eyepiece • seeing • astrofoto",
    pages: buildPages(
      {
        title: "Pendahuluan Teleskop",
        blocks: [
          { heading: "Gambaran", bullets: [
            "Aperture lebih penting dari zoom",
            "Mount menentukan stabil atau tidak",
            "Langit gelap adalah upgrade paling besar",
          ]},
          { heading: "Target bab", bullets: [
            "Pilih alat sesuai kebutuhan",
            "Paham dasar pengamatan",
            "Paham dasar foto langit",
          ]},
        ],
      },
      [
        { title: "Aperture dan cahaya", bullets: [
          "Aperture besar menangkap lebih banyak cahaya",
          "Objek redup jadi lebih terlihat",
          "Resolusi juga meningkat",
        ]},
        { title: "Focal length dan magnifikasi", bullets: [
          "Magnifikasi bukan segalanya",
          "Terlalu besar bikin gambar buram karena seeing",
          "Keseimbangan aperture dan eyepiece penting",
        ]},
        { title: "Refractor", bullets: [
          "Pakai lensa",
          "Gambar tajam dan perawatan mudah",
          "Harga naik cepat untuk aperture besar",
        ]},
        { title: "Reflector", bullets: [
          "Pakai cermin",
          "Aperture besar lebih murah",
          "Butuh collimation sesekali",
        ]},
        { title: "Catadioptric", bullets: [
          "Gabungan lensa dan cermin",
          "Ukuran ringkas",
          "Cocok untuk planet dan bulan",
        ]},
        { title: "Mount altaz dan equatorial", bullets: [
          "Altaz mudah untuk pemula",
          "Equatorial enak untuk tracking langit",
          "Tracking bantu astrofoto",
        ]},
        { title: "Eyepiece", bullets: [
          "Eyepiece menentukan perbesaran",
          "Kualitas eyepiece berpengaruh besar",
          "Bawa beberapa focal length",
        ]},
        { title: "Seeing dan transparansi", bullets: [
          "Seeing adalah kestabilan atmosfer",
          "Transparansi adalah kejernihan langit",
          "Keduanya menentukan kualitas observasi",
        ]},
        { title: "Polusi cahaya", bullets: [
          "Lampu kota bikin langit pucat",
          "Nebula dan galaksi sulit terlihat",
          "Cari lokasi gelap untuk hasil maksimal",
        ]},
        { title: "Star hopping", bullets: [
          "Teknik loncat bintang dari pola mudah",
          "Pakai peta langit",
          "Latihan bikin makin cepat",
        ]},
        { title: "Astrofoto pakai HP", bullets: [
          "Tripod wajib",
          "Mode malam membantu",
          "Ambil banyak foto lalu pilih terbaik",
        ]},
        { title: "Kebiasaan observasi", bullets: [
          "Buat catatan tanggal waktu cuaca",
          "Catat objek dan hasil",
          "Nanti kamu bisa lihat progress",
        ]},
      ],
      "Akhir Bab • Teleskop"
    ),
  },

  {
    subject: "astronomy",
    key: "moon",
    title: "Bulan",
    desc: "Fase • orbit • kawah • pasang surut • misi",
    pages: buildPages(
      {
        title: "Pendahuluan Bulan",
        blocks: [
          { heading: "Gambaran", bullets: [
            "Bulan adalah satelit alami bumi",
            "Bulan mempengaruhi pasang surut",
            "Permukaannya penuh kawah dan maria",
          ]},
          { heading: "Target bab", bullets: [
            "Paham fase bulan",
            "Paham fitur permukaan",
            "Paham dasar eksplorasi bulan",
          ]},
        ],
      },
      [
        { title: "Orbit bulan", bullets: [
          "Bulan mengorbit bumi dan ikut mengelilingi matahari",
          "Orbitnya tidak bulat sempurna",
          "Kemiringan orbit mempengaruhi gerhana",
        ]},
        { title: "Fase bulan", bullets: [
          "Fase terjadi karena posisi relatif matahari bumi bulan",
          "Bulan baru sampai purnama lalu kembali",
          "Fase bisa diprediksi dengan kalender",
        ]},
        { title: "Libration", bullets: [
          "Libration membuat kita melihat lebih dari setengah permukaan",
          "Terjadi karena orbit dan rotasi",
          "Ini efek geometris",
        ]},
        { title: "Kawah dan maria", bullets: [
          "Kawah berasal dari tumbukan",
          "Maria adalah dataran gelap lava purba",
          "Kontras mudah terlihat saat terminator",
        ]},
        { title: "Regolith", bullets: [
          "Regolith adalah debu halus permukaan",
          "Terbentuk dari tumbukan berulang",
          "Mempengaruhi pendaratan dan jejak",
        ]},
        { title: "Pasang surut", bullets: [
          "Gaya gravitasi bulan menarik lautan",
          "Matahari juga ikut mempengaruhi",
          "Pasang purnama dan pasang perbani beda kuat",
        ]},
        { title: "Gerhana bulan singkat", bullets: [
          "Gerhana bulan terjadi saat bulan masuk bayang bumi",
          "Warna merah karena atmosfer bumi",
          "Lebih aman dilihat daripada gerhana matahari",
        ]},
        { title: "Misi Apollo", bullets: [
          "Apollo mendaratkan manusia di bulan",
          "Membawa sampel batuan",
          "Memberi data geologi penting",
        ]},
        { title: "Misi modern", bullets: [
          "Banyak negara mengirim orbiter dan lander",
          "Fokus pada kutub dan es",
          "Data bantu rencana misi masa depan",
        ]},
        { title: "Observasi bulan", bullets: [
          "Bulan mudah difoto pakai HP plus zoom wajar",
          "Teleskop kecil sudah cukup",
          "Detail terbaik terlihat dekat terminator",
        ]},
      ],
      "Akhir Bab • Bulan"
    ),
  },

  {
    subject: "astronomy",
    key: "solar-eclipses",
    title: "Gerhana Matahari",
    desc: "Total • parsial • cincin • aman • fenomena corona",
    pages: buildPages(
      {
        title: "Pendahuluan Gerhana Matahari",
        blocks: [
          { heading: "Gambaran", bullets: [
            "Gerhana matahari terjadi saat bulan menutupi matahari",
            "Ada gerhana total parsial dan cincin",
            "Keamanan observasi adalah nomor satu",
          ]},
          { heading: "Target bab", bullets: [
            "Paham jenis gerhana",
            "Paham konsep umbra penumbra",
            "Paham cara aman melihat",
          ]},
        ],
      },
      [
        { title: "Umbra dan penumbra", bullets: [
          "Umbra adalah bayangan inti paling gelap",
          "Penumbra adalah bayangan samar di luar umbra",
          "Lokasi pengamat menentukan jenis gerhana",
        ]},
        { title: "Gerhana total", bullets: [
          "Matahari tertutup penuh untuk waktu singkat",
          "Corona bisa terlihat saat totalitas",
          "Langit bisa berubah gelap sementara",
        ]},
        { title: "Gerhana parsial", bullets: [
          "Hanya sebagian matahari tertutup",
          "Masih berbahaya dilihat langsung",
          "Harus pakai filter aman",
        ]},
        { title: "Gerhana cincin", bullets: [
          "Bulan terlihat lebih kecil dari matahari",
          "Muncul cincin terang",
          "Tetap wajib pakai filter aman",
        ]},
        { title: "Cara aman observasi", bullets: [
          "Pakai kacamata filter gerhana standar",
          "Jangan pakai kaca gelap biasa",
          "Jangan arahkan teleskop tanpa filter",
        ]},
        { title: "Pinhole projection", bullets: [
          "Metode aman tanpa melihat langsung",
          "Lubang kecil memproyeksikan matahari ke layar",
          "Cocok untuk pemula",
        ]},
        { title: "Siklus gerhana", bullets: [
          "Gerhana tidak terjadi setiap bulan",
          "Karena kemiringan orbit bulan",
          "Ada pola siklus jangka panjang",
        ]},
        { title: "Latihan", bullets: [
          "Buat checklist alat aman",
          "Cari video gerhana total dan catat fenomenanya",
          "Pelajari perbedaan total dan cincin",
        ]},
      ],
      "Akhir Bab • Gerhana Matahari"
    ),
  },

  {
    subject: "astronomy",
    key: "planets",
    title: "Planet Detail",
    desc: "Merkurius sampai Neptunus • atmosfer • cincin • misi",
    pages: buildPages(
      {
        title: "Pendahuluan Planet",
        blocks: [
          { heading: "Gambaran", bullets: [
            "Planet terbagi planet batuan dan planet raksasa",
            "Atmosfer dan medan magnet beda tiap planet",
            "Misi ruang angkasa membantu data detail",
          ]},
          { heading: "Target bab", bullets: [
            "Kenal ciri tiap planet",
            "Paham perbandingan atmosfer",
            "Paham konsep cincin dan satelit",
          ]},
        ],
      },
      [
        { title: "Merkurius", bullets: [
          "Planet terdekat matahari",
          "Suhu ekstrem siang dan malam",
          "Permukaan penuh kawah",
        ]},
        { title: "Venus", bullets: [
          "Atmosfer sangat tebal",
          "Efek rumah kaca kuat",
          "Permukaan sangat panas",
        ]},
        { title: "Bumi", bullets: [
          "Air cair melimpah",
          "Atmosfer mendukung kehidupan",
          "Medan magnet melindungi dari angin matahari",
        ]},
        { title: "Mars", bullets: [
          "Atmosfer tipis",
          "Ada jejak sungai purba",
          "Target utama eksplorasi manusia masa depan",
        ]},
        { title: "Sabuk asteroid", bullets: [
          "Banyak benda kecil mengorbit antara Mars dan Jupiter",
          "Sisa material pembentukan tata surya",
          "Ada asteroid besar seperti Ceres",
        ]},
        { title: "Jupiter", bullets: [
          "Planet terbesar",
          "Punya badai besar dan banyak satelit",
          "Medan magnet kuat",
        ]},
        { title: "Saturnus", bullets: [
          "Cincin paling terkenal",
          "Massa besar tapi densitas rendah",
          "Bulan Titan punya atmosfer tebal",
        ]},
        { title: "Uranus", bullets: [
          "Sumbu rotasi miring ekstrem",
          "Warna biru kehijauan karena gas tertentu",
          "Memiliki cincin tipis",
        ]},
        { title: "Neptunus", bullets: [
          "Angin sangat kencang",
          "Warna biru pekat",
          "Bulan Triton unik dan dingin",
        ]},
        { title: "Dwarf planet", bullets: [
          "Pluto dan kawan kawan di sabuk Kuiper",
          "Ukuran lebih kecil dari planet utama",
          "Tetap penting untuk studi tata surya luar",
        ]},
        { title: "Kuiper belt dan Oort cloud", bullets: [
          "Kuiper belt berisi objek es jauh",
          "Oort cloud hipotetis lebih jauh lagi",
          "Kometa panjang mungkin berasal dari sana",
        ]},
        { title: "Misi planet", bullets: [
          "Flyby dan orbiter memberi peta",
          "Lander dan rover memberi data permukaan",
          "Data membantu banding planetologi",
        ]},
      ],
      "Akhir Bab • Planet Detail"
    ),
  },
];

export const HISTORY_CHAPTERS: LearnChapter[] = [
  {
    subject: "history",
    key: "roman-empire",
    title: "Kekaisaran Romawi",
    desc: "Republik ke kekaisaran • puncak • tokoh • runtuh barat",
    pages: buildPages(
      {
        title: "Pendahuluan Romawi",
        blocks: [
          { heading: "Gambaran", bullets: [
            "Romawi berkembang dari kota menjadi kekaisaran besar",
            "Pengaruhnya besar pada hukum politik dan budaya Eropa",
            "Transisi republik ke kekaisaran adalah titik utama",
          ]},
          { heading: "Target bab", bullets: [
            "Paham timeline besar Romawi",
            "Kenal tokoh penting",
            "Paham kenapa runtuhnya Romawi barat",
          ]},
        ],
      },
      [
        { title: "Republik Romawi", bullets: [
          "Sistem senat dan pejabat terpilih",
          "Konflik kelas patrician dan plebeian",
          "Ekspansi lewat perang dan aliansi",
        ]},
        { title: "Perang Punisia", bullets: [
          "Konflik besar melawan Kartago",
          "Menguatkan dominasi Romawi di Mediterania",
          "Membuka jalur ekspansi lebih luas",
        ]},
        { title: "Julius Caesar", bullets: [
          "Tokoh militer dan politik penting",
          "Perang saudara mengguncang republik",
          "Krisis ini membuka jalan kekaisaran",
        ]},
        { title: "Augustus", bullets: [
          "Membangun sistem kekaisaran awal",
          "Stabilitas dikenal sebagai Pax Romana awal",
          "Reformasi administrasi dan militer",
        ]},
        { title: "Pax Romana", bullets: [
          "Periode stabil relatif panjang",
          "Perdagangan dan kota berkembang",
          "Infrastruktur jalan dan aqueduct meningkat",
        ]},
        { title: "Tentara Romawi", bullets: [
          "Legiun disiplin dan terorganisir",
          "Benteng dan jalan mendukung logistik",
          "Militer juga berpengaruh politik",
        ]},
        { title: "Provinsi dan administrasi", bullets: [
          "Wilayah dibagi provinsi",
          "Pajak dan hukum menyatukan sistem",
          "Elit lokal sering dilibatkan",
        ]},
        { title: "Krisis abad ketiga", bullets: [
          "Instabilitas politik dan ekonomi",
          "Pergantian kaisar cepat",
          "Tekanan dari luar dan dalam meningkat",
        ]},
        { title: "Constantine dan perubahan besar", bullets: [
          "Reformasi pemerintahan",
          "Ibu kota pindah ke Konstantinopel",
          "Agama dan politik berubah besar",
        ]},
        { title: "Pembagian timur dan barat", bullets: [
          "Administrasi terpisah untuk efisiensi",
          "Wilayah timur cenderung lebih stabil",
          "Wilayah barat lebih rentan tekanan",
        ]},
        { title: "Runtuhnya Romawi barat", bullets: [
          "Tekanan migrasi dan invasi meningkat",
          "Krisis ekonomi dan militer",
          "Otoritas pusat melemah",
        ]},
        { title: "Warisan Romawi", bullets: [
          "Hukum dan konsep kewarganegaraan",
          "Arsitektur dan teknik",
          "Bahasa Latin mempengaruhi bahasa modern",
        ]},
      ],
      "Akhir Bab • Romawi"
    ),
  },

  {
    subject: "history",
    key: "ww1",
    title: "Perang Dunia 1",
    desc: "Sebab • aliansi • parit • teknologi • perjanjian",
    pages: buildPages(
      {
        title: "Pendahuluan PD 1",
        blocks: [
          { heading: "Gambaran", bullets: [
            "Perang besar yang mengubah politik Eropa",
            "Aliansi dan nasionalisme berperan besar",
            "Teknologi perang berkembang cepat",
          ]},
          { heading: "Target bab", bullets: [
            "Paham sebab dan pemicu",
            "Kenal front perang utama",
            "Paham dampak setelah perang",
          ]},
        ],
      },
      [
        { title: "Sebab jangka panjang", bullets: [
          "Persaingan kekuatan besar",
          "Perlombaan militer",
          "Nasionalisme dan konflik wilayah",
        ]},
        { title: "Pemicu", bullets: [
          "Krisis politik memicu mobilisasi",
          "Aliansi membuat konflik melebar",
          "Keputusan cepat memicu perang total",
        ]},
        { title: "Aliansi", bullets: [
          "Blok besar saling berhadapan",
          "Negara masuk perang bertahap",
          "Kepentingan nasional memandu strategi",
        ]},
        { title: "Front barat", bullets: [
          "Perang parit panjang",
          "Pertahanan kuat dan maju lambat",
          "Kerugian besar karena teknologi baru",
        ]},
        { title: "Front timur", bullets: [
          "Medan luas dan pergerakan lebih dinamis",
          "Logistik jadi tantangan besar",
          "Dampak politik internal meningkat",
        ]},
        { title: "Teknologi perang", bullets: [
          "Artileri berat meningkat",
          "Tank mulai muncul",
          "Pesawat mulai dipakai untuk pengintaian",
        ]},
        { title: "Perang di laut", bullets: [
          "Blokade ekonomi",
          "Kapal selam",
          "Kontrol jalur suplai",
        ]},
        { title: "Masuknya Amerika", bullets: [
          "Faktor ekonomi dan politik",
          "Memperkuat salah satu blok",
          "Membantu mendorong akhir perang",
        ]},
        { title: "Akhir perang", bullets: [
          "Kelelahan ekonomi dan sosial",
          "Perubahan politik besar",
          "Gencatan senjata mengakhiri pertempuran",
        ]},
        { title: "Perjanjian dan dampak", bullets: [
          "Perjanjian damai mengubah peta",
          "Beban ekonomi memicu krisis baru",
          "Lahir organisasi internasional",
        ]},
      ],
      "Akhir Bab • PD 1"
    ),
  },

  {
    subject: "history",
    key: "ww2",
    title: "Perang Dunia 2",
    desc: "Latar • Eropa • Pasifik • tokoh • dampak global",
    pages: buildPages(
      {
        title: "Pendahuluan PD 2",
        blocks: [
          { heading: "Gambaran", bullets: [
            "Konflik global terbesar abad 20",
            "Terjadi di Eropa Afrika Asia dan Pasifik",
            "Mengubah peta dunia dan lahir tatanan baru",
          ]},
          { heading: "Target bab", bullets: [
            "Paham latar dan fase utama",
            "Kenal peristiwa penting",
            "Paham dampak setelah perang",
          ]},
        ],
      },
      [
        { title: "Latar belakang antar perang", bullets: [
          "Krisis ekonomi dan ketidakstabilan politik",
          "Muncul ideologi ekstrem",
          "Kegagalan perdamaian jangka panjang",
        ]},
        { title: "Ekspansi awal di Eropa", bullets: [
          "Invasi cepat di beberapa wilayah",
          "Strategi blitzkrieg konsep gerak cepat",
          "Pertahanan negara kecil sulit bertahan",
        ]},
        { title: "Pertempuran Britania", bullets: [
          "Pertempuran udara besar",
          "Radar dan pertahanan udara penting",
          "Mempengaruhi rencana invasi",
        ]},
        { title: "Front timur", bullets: [
          "Skala pertempuran sangat besar",
          "Iklim dan logistik mempengaruhi",
          "Pertempuran kota menjadi simbol ketahanan",
        ]},
        { title: "Afrika Utara", bullets: [
          "Kontrol jalur laut dan suplai",
          "Gurun jadi tantangan",
          "Pergantian momentum beberapa kali",
        ]},
        { title: "Holocaust dan kejahatan perang", bullets: [
          "Terjadi genosida dan kekerasan sistematis",
          "Ini jadi dasar pembahasan hak asasi modern",
          "Penting dipelajari dengan hormat dan serius",
        ]},
        { title: "Pasifik dan Pearl Harbor", bullets: [
          "Konflik meluas ke samudra Pasifik",
          "Pertempuran laut dan udara dominan",
          "Pulau demi pulau jadi strategi",
        ]},
        { title: "Midway dan titik balik", bullets: [
          "Pertempuran laut menentukan momentum",
          "Intel dan strategi berperan besar",
          "Keseimbangan kekuatan berubah",
        ]},
        { title: "D Day dan pembebasan Eropa", bullets: [
          "Operasi pendaratan besar",
          "Membuka front baru",
          "Mendorong tekanan dari dua arah",
        ]},
        { title: "Teknologi perang", bullets: [
          "Roket dan radar berkembang",
          "Produksi massal senjata",
          "Sains dipakai untuk strategi",
        ]},
        { title: "Akhir perang di Eropa", bullets: [
          "Ibu kota jatuh dan menyerah",
          "Negara dibagi zona pengaruh",
          "Konferensi pasca perang membentuk aturan baru",
        ]},
        { title: "Akhir perang di Pasifik", bullets: [
          "Pertempuran intens di pulau penting",
          "Akhir perang terjadi setelah keputusan besar",
          "Dunia masuk era baru keamanan global",
        ]},
        { title: "Lahirnya PBB", bullets: [
          "Tujuan mencegah perang besar lagi",
          "Kerja sama internasional diperkuat",
          "Hak asasi makin dibahas",
        ]},
        { title: "Dampak besar", bullets: [
          "Dekolonisasi dipercepat di banyak wilayah",
          "Ekonomi dunia disusun ulang",
          "Muncul perang dingin sebagai fase baru",
        ]},
      ],
      "Akhir Bab • PD 2"
    ),
  },

  {
    subject: "history",
    key: "cold-war",
    title: "Perang Dingin",
    desc: "USA vs USSR • nuklir • space race • proxy war • runtuh USSR",
    pages: buildPages(
      {
        title: "Pendahuluan Perang Dingin",
        blocks: [
          { heading: "Gambaran", bullets: [
            "Konflik ideologi dan pengaruh tanpa perang langsung besar",
            "Dunia terbagi blok dan aliansi",
            "Perlombaan teknologi dan senjata nuklir",
          ]},
          { heading: "Target bab", bullets: [
            "Paham konsep deterrence",
            "Kenal krisis utama",
            "Paham akhir perang dingin",
          ]},
        ],
      },
      [
        { title: "Dunia pasca PD 2", bullets: [
          "Kekuatan baru muncul",
          "Wilayah dibagi pengaruh",
          "Tegangan meningkat",
        ]},
        { title: "NATO dan Warsaw Pact", bullets: [
          "Aliansi militer membentuk blok",
          "Pertahanan kolektif",
          "Membuat krisis lokal bisa membesar",
        ]},
        { title: "Deterrence nuklir", bullets: [
          "Ide mencegah serangan lewat ancaman balasan",
          "Perlombaan senjata meningkat",
          "Risiko salah hitung selalu ada",
        ]},
        { title: "Space race", bullets: [
          "Prestasi teknologi jadi simbol kekuatan",
          "Satelit dan misi manusia diluncurkan",
          "Mendorong inovasi sains",
        ]},
        { title: "Krisis misil Kuba", bullets: [
          "Krisis paling dekat ke perang besar",
          "Negosiasi dan kompromi penting",
          "Menjadi pelajaran manajemen krisis",
        ]},
        { title: "Perang Korea dan Vietnam", bullets: [
          "Contoh konflik proxy",
          "Dukungan blok mempengaruhi",
          "Dampak sosial dan politik besar",
        ]},
        { title: "Détente", bullets: [
          "Upaya meredakan ketegangan",
          "Perjanjian kontrol senjata",
          "Namun konflik proxy tetap terjadi",
        ]},
        { title: "Akhir perang dingin", bullets: [
          "Krisis ekonomi dan politik internal",
          "Reformasi dan perubahan struktur",
          "Simbol runtuhnya tembok Berlin",
        ]},
        { title: "Warisan", bullets: [
          "Teknologi dan internet berkembang",
          "Peta politik Eropa berubah",
          "Isu keamanan global berlanjut",
        ]},
      ],
      "Akhir Bab • Perang Dingin"
    ),
  },

  {
    subject: "history",
    key: "industrial-revolution",
    title: "Revolusi Industri",
    desc: "Mesin uap • pabrik • urbanisasi • pekerja • teknologi",
    pages: buildPages(
      {
        title: "Pendahuluan Revolusi Industri",
        blocks: [
          { heading: "Gambaran", bullets: [
            "Perubahan besar dari produksi manual ke mesin",
            "Pabrik dan kota tumbuh cepat",
            "Dampak sosial ekonomi sangat luas",
          ]},
          { heading: "Target bab", bullets: [
            "Paham kenapa terjadi",
            "Kenal inovasi utama",
            "Paham dampak sosial",
          ]},
        ],
      },
      [
        { title: "Mesin uap", bullets: [
          "Mengubah transportasi dan pabrik",
          "Mengurangi ketergantungan tenaga manusia",
          "Mendorong produksi massal",
        ]},
        { title: "Tekstil dan pabrik", bullets: [
          "Tekstil jadi sektor awal yang besar",
          "Pabrik memusatkan tenaga kerja",
          "Produktivitas meningkat drastis",
        ]},
        { title: "Batu bara dan besi", bullets: [
          "Energi utama banyak industri",
          "Besi dan baja untuk mesin dan rel",
          "Tambang berkembang pesat",
        ]},
        { title: "Rel kereta dan kapal", bullets: [
          "Distribusi barang makin cepat",
          "Pasar melebar",
          "Kota baru tumbuh di jalur rel",
        ]},
        { title: "Urbanisasi", bullets: [
          "Orang pindah ke kota untuk kerja",
          "Kepadatan meningkat",
          "Masalah kesehatan publik muncul",
        ]},
        { title: "Kondisi kerja", bullets: [
          "Jam kerja panjang pada awal",
          "Keselamatan kerja rendah",
          "Muncul tuntutan reformasi",
        ]},
        { title: "Serikat pekerja", bullets: [
          "Organisasi untuk melindungi hak",
          "Negosiasi upah dan jam kerja",
          "Menjadi kekuatan politik",
        ]},
        { title: "Gelombang inovasi berikutnya", bullets: [
          "Listrik dan mesin baru",
          "Komunikasi modern berkembang",
          "Produksi makin otomatis",
        ]},
        { title: "Dampak global", bullets: [
          "Perdagangan global meningkat",
          "Imperialisme ekonomi menguat",
          "Kesenjangan sosial jadi isu besar",
        ]},
      ],
      "Akhir Bab • Revolusi Industri"
    ),
  },

  {
    subject: "history",
    key: "mongol-empire",
    title: "Kekaisaran Mongol",
    desc: "Genghis Khan • ekspansi • jalur sutra • Pax Mongolica",
    pages: buildPages(
      {
        title: "Pendahuluan Mongol",
        blocks: [
          { heading: "Gambaran", bullets: [
            "Kekaisaran darat sangat luas dalam waktu singkat",
            "Mengubah jalur perdagangan Eurasia",
            "Mempengaruhi budaya dan politik banyak wilayah",
          ]},
          { heading: "Target bab", bullets: [
            "Paham asal steppe",
            "Kenal strategi dan organisasi",
            "Paham dampak dan warisan",
          ]},
        ],
      },
      [
        { title: "Steppe dan gaya hidup", bullets: [
          "Masyarakat nomaden dan berkuda",
          "Mobilitas tinggi",
          "Strategi perang cepat",
        ]},
        { title: "Temujin menjadi Genghis Khan", bullets: [
          "Menyatukan suku yang terpecah",
          "Membangun hukum dan disiplin",
          "Menciptakan struktur militer efektif",
        ]},
        { title: "Taktik militer", bullets: [
          "Pemanah berkuda",
          "Manuver cepat dan tipuan",
          "Intel dan koordinasi kuat",
        ]},
        { title: "Ekspansi ke Asia dan Eropa", bullets: [
          "Menaklukkan wilayah luas",
          "Membentuk jaringan kekuasaan",
          "Mengubah peta politik Eurasia",
        ]},
        { title: "Pax Mongolica", bullets: [
          "Perdagangan lintas benua lebih aman",
          "Jalur sutra aktif",
          "Pertukaran ide dan teknologi meningkat",
        ]},
        { title: "Pembagian khanate", bullets: [
          "Wilayah besar dibagi beberapa khanate",
          "Koordinasi berubah dari pusat",
          "Dinasti lokal terbentuk",
        ]},
        { title: "Warisan", bullets: [
          "Pengaruh pada perdagangan dan diplomasi",
          "Pertukaran budaya dan teknologi",
          "Narasi sejarah berbeda di tiap wilayah",
        ]},
      ],
      "Akhir Bab • Mongol"
    ),
  },

  {
    subject: "history",
    key: "ottoman-empire",
    title: "Kekaisaran Ottoman",
    desc: "Asal • puncak • reformasi • runtuh • warisan",
    pages: buildPages(
      {
        title: "Pendahuluan Ottoman",
        blocks: [
          { heading: "Gambaran", bullets: [
            "Ottoman adalah kekaisaran besar di Eropa dan Asia dan Afrika",
            "Menguasai jalur dagang dan wilayah strategis",
            "Berperan besar dalam sejarah Mediterania",
          ]},
          { heading: "Target bab", bullets: [
            "Paham timeline besar",
            "Kenal puncak kekuasaan",
            "Paham penyebab kemunduran",
          ]},
        ],
      },
      [
        { title: "Asal Ottoman", bullets: [
          "Bermula dari kerajaan kecil di Anatolia",
          "Ekspansi bertahap",
          "Memanfaatkan posisi strategis",
        ]},
        { title: "Konstantinopel 1453", bullets: [
          "Menjadi titik balik besar",
          "Kota jadi pusat baru kekuasaan",
          "Mengubah jalur politik regional",
        ]},
        { title: "Suleiman dan era puncak", bullets: [
          "Administrasi dan hukum diperkuat",
          "Ekspansi wilayah besar",
          "Budaya dan arsitektur berkembang",
        ]},
        { title: "Sistem administrasi", bullets: [
          "Birokrasi dan pajak",
          "Millet system untuk komunitas",
          "Militer punya peran penting",
        ]},
        { title: "Janissary", bullets: [
          "Unit elit militer",
          "Berpengaruh politik",
          "Perubahan struktur seiring waktu",
        ]},
        { title: "Reformasi Tanzimat", bullets: [
          "Upaya modernisasi negara",
          "Reformasi hukum dan militer",
          "Respon terhadap tekanan global",
        ]},
        { title: "Perang Dunia 1 dan runtuh", bullets: [
          "Terlibat dalam konflik besar",
          "Wilayah pecah setelah perang",
          "Muncul negara negara baru",
        ]},
        { title: "Warisan Ottoman", bullets: [
          "Pengaruh budaya dan kuliner",
          "Arsitektur masjid dan kota",
          "Jejak politik di kawasan modern",
        ]},
      ],
      "Akhir Bab • Ottoman"
    ),
  },

  {
    subject: "history",
    key: "modern-japan",
    title: "Sejarah Jepang Modern",
    desc: "Meiji • modernisasi • perang • ekonomi • budaya",
    pages: buildPages(
      {
        title: "Pendahuluan Jepang Modern",
        blocks: [
          { heading: "Gambaran", bullets: [
            "Jepang berubah cepat dari feodal ke negara industri",
            "Modernisasi mempengaruhi militer dan ekonomi",
            "Jepang jadi kekuatan besar di Asia",
          ]},
          { heading: "Target bab", bullets: [
            "Paham Restorasi Meiji",
            "Paham jalur perang dan pemulihan",
            "Paham ekonomi modern Jepang",
          ]},
        ],
      },
      [
        { title: "Akhir era Tokugawa", bullets: [
          "Sistem feodal dan isolasi relatif",
          "Tekanan asing meningkat",
          "Perubahan internal mulai terjadi",
        ]},
        { title: "Restorasi Meiji", bullets: [
          "Reformasi besar pemerintahan",
          "Modernisasi militer dan industri",
          "Pendidikan dan teknologi berkembang",
        ]},
        { title: "Industrialisasi cepat", bullets: [
          "Pabrik dan infrastruktur dibangun",
          "Teknologi diadopsi dan disesuaikan",
          "Kekuatan ekonomi meningkat",
        ]},
        { title: "Ekspansi dan konflik", bullets: [
          "Persaingan regional meningkat",
          "Perang membawa perubahan politik",
          "Dampak sosial besar",
        ]},
        { title: "Perang Dunia 2 dan akhir perang", bullets: [
          "Konflik besar di Pasifik",
          "Akhir perang membawa perubahan sistem",
          "Reformasi pasca perang membentuk Jepang modern",
        ]},
        { title: "Pemulihan ekonomi", bullets: [
          "Industri fokus teknologi dan manufaktur",
          "Ekspor meningkat",
          "Lahir era pertumbuhan cepat",
        ]},
        { title: "Budaya modern", bullets: [
          "Perpaduan tradisi dan modern",
          "Budaya populer menyebar global",
          "Teknologi jadi identitas kuat",
        ]},
      ],
      "Akhir Bab • Jepang Modern"
    ),
  },
];

export function getChapter(subject: SubjectKey, key: string) {
  const list = subject === "astronomy" ? ASTRO_CHAPTERS : HISTORY_CHAPTERS;
  return list.find((c) => c.key === key) || null;
}
