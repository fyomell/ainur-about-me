import type { GetServerSideProps } from "next";
import Link from "next/link";
import { makeLessonImage } from "@/lib/learn/makeLessonImage";

type Lesson = {
  page: number;
  title: string;
  blocks: { heading: string; text: string[] }[];
};

const TOTAL = 22;

const LESSONS: Lesson[] = [
  {
    page: 1,
    title: "Apa itu 3 bintang sejajar",
    blocks: [
      { heading: "Intinya", text: [
        "•Tiga bintang sejajar paling terkenal adalah Sabuk Orion",
        "•Disebut juga Orion’s Belt",
        "•Tampak jelas dengan mata telanjang di langit malam"
      ]},
      { heading: "Kenapa spesial", text: [
        "•Gampang ditemukan",
        "•Jadi patokan untuk mencari rasi bintang lain",
        "•Dekat area nebula dan pembentukan bintang"
      ]}
    ]
  },
  {
    page: 2,
    title: "Mengenal rasi Orion",
    blocks: [
      { heading: "Orion itu apa", text: [
        "•Orion adalah rasi bintang besar dan mudah dikenali",
        "•Bentuknya seperti manusia pemburu kalau dilihat pola bintangnya",
        "•Sabuk Orion berada di bagian tengah rasi"
      ]},
      { heading: "Bagian penting", text: [
        "•Sabuk Orion: tiga bintang sejajar",
        "•Betelgeuse: bintang merah terang",
        "•Rigel: bintang biru sangat terang"
      ]}
    ]
  },
  {
    page: 3,
    title: "Nama 3 bintang sabuk Orion",
    blocks: [
      { heading: "Tiga bintangnya", text: [
        "•Alnitak",
        "•Alnilam",
        "•Mintaka"
      ]},
      { heading: "Urutan di langit", text: [
        "•Mereka berbaris hampir lurus",
        "•Di foto bisa kelihatan kemiringannya",
        "•Tiap bintang punya sifat berbeda"
      ]}
    ]
  },
  {
    page: 4,
    title: "Alnitak",
    blocks: [
      { heading: "Fakta cepat", text: [
        "•Bintang paling timur di sabuk",
        "•Sangat terang dan panas",
        "•Termasuk bintang masif"
      ]},
      { heading: "Dekat nebula", text: [
        "•Dekat Horsehead Nebula",
        "•Dekat Flame Nebula",
        "•Wilayahnya kaya gas dan debu"
      ]}
    ]
  },
  {
    page: 5,
    title: "Alnilam",
    blocks: [
      { heading: "Fakta cepat", text: [
        "•Bintang tengah sabuk",
        "•Sangat terang",
        "•Termasuk supergiant biru"
      ]},
      { heading: "Kenapa menarik", text: [
        "•Salah satu bintang paling terang di Orion",
        "•Jaraknya sangat jauh dibanding beberapa bintang terang lain",
        "•Energi yang dipancarkan sangat besar"
      ]}
    ]
  },
  {
    page: 6,
    title: "Mintaka",
    blocks: [
      { heading: "Fakta cepat", text: [
        "•Bintang paling barat di sabuk",
        "•Sistem bintang ganda atau lebih",
        "•Terlihat jelas di langit yang cerah"
      ]},
      { heading: "Detail penting", text: [
        "•Bintang masif umumnya hidup lebih singkat",
        "•Tapi sinarnya kuat",
        "•Cocok buat latihan observasi"
      ]}
    ]
  },
  {
    page: 7,
    title: "Jarak dan skala cahaya",
    blocks: [
      { heading: "Tahun cahaya", text: [
        "•Jarak bintang sering diukur pakai tahun cahaya",
        "•1 tahun cahaya adalah jarak cahaya dalam 1 tahun",
        "•Ini bukan satuan waktu tapi satuan jarak"
      ]},
      { heading: "Kenapa beda jauh", text: [
        "•Tiap bintang punya posisi ruang berbeda",
        "•Barisan terlihat sejajar dari sudut pandang kita",
        "•Padahal jaraknya tidak sama"
      ]}
    ]
  },
  {
    page: 8,
    title: "Warna bintang dan suhu",
    blocks: [
      { heading: "Hubungan warna dan suhu", text: [
        "•Biru biasanya lebih panas",
        "•Putih panas",
        "•Kuning sedang",
        "•Merah lebih dingin"
      ]},
      { heading: "Sabuk Orion", text: [
        "•Sabuk Orion didominasi bintang biru",
        "•Artinya suhu permukaannya tinggi",
        "•Biasanya juga massanya besar"
      ]}
    ]
  },
  {
    page: 9,
    title: "Bintang masif hidupnya singkat",
    blocks: [
      { heading: "Kenapa singkat", text: [
        "•Bintang masif membakar bahan bakar jauh lebih cepat",
        "•Energi yang dikeluarkan besar",
        "•Jadi umur totalnya lebih pendek"
      ]},
      { heading: "Akhir hidup", text: [
        "•Bisa jadi supernova",
        "•Bisa berakhir jadi bintang neutron",
        "•Atau jadi black hole tergantung massanya"
      ]}
    ]
  },
  {
    page: 10,
    title: "Wilayah Orion kaya nebula",
    blocks: [
      { heading: "Apa itu nebula", text: [
        "•Awan gas dan debu di ruang angkasa",
        "•Tempat lahir bintang baru",
        "•Atau sisa ledakan bintang"
      ]},
      { heading: "Di sekitar sabuk", text: [
        "•Ada banyak objek deep-sky",
        "•Cocok untuk astrofoto",
        "•Dengan binokular pun bisa kelihatan samar"
      ]}
    ]
  },
  {
    page: 11,
    title: "Cara menemukan Orion dari Indonesia",
    blocks: [
      { heading: "Langkah cepat", text: [
        "•Cari tiga bintang sejajar yang terang",
        "•Itu biasanya sabuk Orion",
        "•Setelah ketemu sabuk, kamu bisa cari Betelgeuse dan Rigel"
      ]},
      { heading: "Kondisi ideal", text: [
        "•Langit gelap",
        "•Jauh dari lampu kota",
        "•Cuaca cerah tanpa awan tebal"
      ]}
    ]
  },
  {
    page: 12,
    title: "Musim terbaik dan arah pandang",
    blocks: [
      { heading: "Kapan mudah terlihat", text: [
        "•Biasanya lebih mudah di malam tertentu tergantung bulan",
        "•Langit musim hujan sering tertutup awan",
        "•Langit musim kemarau sering lebih bersih"
      ]},
      { heading: "Arah", text: [
        "•Coba lihat ke area langit yang tinggi saat malam",
        "•Gunakan aplikasi peta bintang jika perlu",
        "•Tapi latihan mata telanjang dulu juga bagus"
      ]}
    ]
  },
  {
    page: 13,
    title: "Observasi dengan mata telanjang",
    blocks: [
      { heading: "Yang bisa kamu lihat", text: [
        "•Tiga bintang sabuk",
        "•Bintang terang lain di Orion",
        "•Kadang samar seperti kabut di bawah sabuk"
      ]},
      { heading: "Tips", text: [
        "•Biarkan mata adaptasi gelap 10–15 menit",
        "•Kurangi cahaya HP",
        "•Gunakan mode night"
      ]}
    ]
  },
  {
    page: 14,
    title: "Observasi dengan binokular",
    blocks: [
      { heading: "Kelebihan binokular", text: [
        "•Lebih ringan daripada teleskop",
        "•Mudah dipakai pemula",
        "•Objek deep-sky jadi lebih terlihat"
      ]},
      { heading: "Yang bisa dicoba", text: [
        "•Cari area nebula",
        "•Lihat perbedaan terang bintang",
        "•Latihan fokus dan stabilisasi"
      ]}
    ]
  },
  {
    page: 15,
    title: "Astrofoto pakai HP",
    blocks: [
      { heading: "Bisa gak", text: [
        "•Bisa",
        "•Hasilnya tergantung HP dan langit",
        "•Tripod sangat membantu"
      ]},
      { heading: "Setting saran", text: [
        "•Mode malam",
        "•ISO sedang",
        "•Shutter lebih lama kalau stabil",
        "•Ambil beberapa foto lalu pilih yang terbaik"
      ]}
    ]
  },
  {
    page: 16,
    title: "Konstelasi vs asterisme",
    blocks: [
      { heading: "Konstelasi", text: [
        "•Wilayah resmi di langit",
        "•Punya batas dan nama resmi"
      ]},
      { heading: "Asterisme", text: [
        "•Pola bintang terkenal tapi bukan wilayah resmi",
        "•Contoh: Sabuk Orion sering disebut pola yang mudah dikenali"
      ]}
    ]
  },
  {
    page: 17,
    title: "Gerak bintang dari waktu ke waktu",
    blocks: [
      { heading: "Proper motion", text: [
        "•Bintang bergerak sangat pelan relatif ke kita",
        "•Dalam ribuan tahun pola bisa berubah",
        "•Sekarang tampak sejajar tapi bisa berubah di masa jauh"
      ]},
      { heading: "Kenapa kita gak sadar", text: [
        "•Skalanya sangat besar",
        "•Perubahannya butuh waktu sangat lama"
      ]}
    ]
  },
  {
    page: 18,
    title: "Mengukur terang bintang",
    blocks: [
      { heading: "Magnitudo", text: [
        "•Angka kecil berarti lebih terang",
        "•Angka besar berarti lebih redup",
        "•Bintang sabuk Orion termasuk terang"
      ]},
      { heading: "Latihan", text: [
        "•Bandingkan terang Alnitak vs Alnilam vs Mintaka",
        "•Coba di beberapa malam",
        "•Catat hasilnya"
      ]}
    ]
  },
  {
    page: 19,
    title: "Polusi cahaya",
    blocks: [
      { heading: "Masalah utama", text: [
        "•Lampu kota bikin langit terlihat pucat",
        "•Bintang redup jadi hilang",
        "•Nebula sulit terlihat"
      ]},
      { heading: "Solusi", text: [
        "•Cari tempat lebih gelap",
        "•Matikan lampu sekitar",
        "•Observasi saat bulan tidak terlalu terang"
      ]}
    ]
  },
  {
    page: 20,
    title: "Keamanan observasi",
    blocks: [
      { heading: "Yang harus dihindari", text: [
        "•Jangan lihat matahari langsung",
        "•Jangan pakai teleskop ke arah matahari tanpa filter",
        "•Hati-hati di tempat gelap"
      ]},
      { heading: "Saran aman", text: [
        "•Bawa teman",
        "•Bawa senter kecil",
        "•Pilih lokasi aman"
      ]}
    ]
  },
  {
    page: 21,
    title: "Quiz cepat",
    blocks: [
      { heading: "Pertanyaan", text: [
        "•Apa nama 3 bintang sabuk Orion",
        "•Kenapa bintang biru lebih panas",
        "•Apa itu tahun cahaya"
      ]},
      { heading: "Bonus", text: [
        "•Coba cari Orion tanpa aplikasi dulu",
        "•Baru verifikasi pakai aplikasi peta bintang"
      ]}
    ]
  },
  {
    page: 22,
    title: "Ringkasan bab 4",
    blocks: [
      { heading: "Ringkas", text: [
        "•Tiga bintang sejajar paling terkenal adalah sabuk Orion",
        "•Namanya Alnitak •Alnilam •Mintaka",
        "•Mudah jadi patokan belajar langit malam",
        "•Cocok untuk observasi dan astrofoto"
      ]},
      { heading: "Next", text: [
        "•Kalau mau aku bisa bikin bab 5",
        "•Misal galaksi •nebula •exoplanet"
      ]}
    ]
  }
];

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const raw = String(ctx.params?.page ?? "1");
  const page = Math.max(1, Math.min(TOTAL, parseInt(raw, 10) || 1));
  return { props: { page } };
};

export default function ThreeStarsPage({ page }: { page: number }) {
  const lesson = LESSONS.find((x) => x.page === page) ?? LESSONS[0];
  const progress = Math.round((page / TOTAL) * 100);

  return (
    <main className="min-h-screen">
      <header className="sticky top-0 z-30 border-b border-white/10 bg-slate-950/55 backdrop-blur">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3 min-w-0">
            <img src="/rofik-logo.svg" className="h-7 w-auto shrink-0" alt="ROFIK" />
            <div className="min-w-0">
              <div className="truncate text-sm font-extrabold">BAB 4</div>
              <div className="text-xs text-white/60">•3 BINTANG SEJAJAR •DETAIL •RINCI</div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link href="/learn" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
              MENU
            </Link>
            <Link href="/" className="rounded-2xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-black hover:bg-white/10">
              HOME
            </Link>
          </div>
        </div>

        <div className="mx-auto max-w-5xl px-4 pb-3">
          <div className="h-3 w-full rounded-full bg-white/10">
            <div className="h-3 rounded-full bg-sky-400/80" style={{ width: `${progress}%` }} />
          </div>
          <div className="mt-2 text-xs font-extrabold text-white/60">•PROGRESS {progress}%</div>
        </div>
      </header>

      <section className="mx-auto max-w-5xl px-4 pb-14 pt-8">
        <div className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-soft backdrop-blur">
          <div className="text-xs font-extrabold tracking-widest text-white/60">
            BAB 4 • HALAMAN {page}/{TOTAL}
          </div>
          <h1 className="mt-2 text-3xl font-black tracking-tight">{lesson.title}</h1>

          <div className="mt-6 overflow-hidden rounded-3xl border border-white/10 bg-slate-950/30">
            <img
              key={"three-stars-" + page}
              src={makeLessonImage("three-stars", page, lesson.title)}
              alt={lesson.title}
              className="h-auto w-full"
            />
          </div>

          <div className="mt-6 space-y-4">
            {lesson.blocks.map((b) => (
              <div key={b.heading} className="rounded-3xl border border-white/10 bg-slate-950/30 p-5">
                <div className="text-xs font-extrabold tracking-widest text-white/60">{b.heading.toUpperCase()}</div>
                <div className="mt-3 space-y-2 text-sm text-white/80">
                  {b.text.map((x) => (
                    <div key={x}>{x}</div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <Link
              href={`/learn/three-stars/${Math.max(1, page - 1)}`}
              className="rounded-2xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm font-black hover:bg-white/10"
            >
              PREV
            </Link>

            <Link
              href={`/learn/three-stars/${Math.min(TOTAL, page + 1)}`}
              className="rounded-2xl bg-sky-500/90 px-5 py-2.5 text-sm font-black text-slate-950 hover:bg-sky-400"
            >
              NEXT
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
