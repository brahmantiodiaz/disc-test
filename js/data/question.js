data.questions = [
  {
    id: 1,
    statements: [
      "Mudah setuju dengan orang lain",
      "Mudah percaya pada orang lain",
      "Berani mengambil risiko",
      "Menghormati dan toleran",
    ],
    mapping: {
      most: { 1: "S", 2: "I", 3: "D", 4: "C" },
      least: { 1: "D", 2: "C", 3: "S", 4: "I" },
    },
  },
  {
    id: 2,
    statements: [
      "Tenang, sabar, dan pendiam",
      "Visioner dan optimistis",
      "Suka menjadi pusat perhatian",
      "Menjaga keharmonisan",
    ],
    mapping: {
      most: { 1: "C", 2: "D", 3: "I", 4: "S" },
      least: { 1: "I", 2: "S", 3: "C", 4: "D" },
    },
  },
  {
    id: 3,
    statements: [
      "Menyemangati orang lain",
      "Berusaha sempurna",
      "Senang menjadi bagian tim",
      "Menghindari konflik",
    ],
    mapping: {
      most: { 1: "I", 2: "C", 3: "S", 4: "*" },
      least: { 1: "C", 2: "I", 3: "D", 4: "D" },
    },
  },
  {
    id: 4,
    statements: [
      "Menjadi contoh bagi orang lain",
      "Menyimpan perasaan sendiri",
      "Terbuka menyampaikan pendapat",
      "Berani berbeda pendapat",
    ],
    mapping: {
      most: { 1: "C", 2: "S", 3: "I", 4: "D" },
      least: { 1: "D", 2: "I", 3: "C", 4: "S" },
    },
  },
  {
    id: 5,
    statements: [
      "Aktif dan suka berbicara",
      "Cepat bertindak dan tekun",
      "Menjaga kestabilan",
      "Mengikuti aturan dengan baik",
    ],
    mapping: {
      most: { 1: "I", 2: "D", 3: "S", 4: "C" },
      least: { 1: "C", 2: "S", 3: "D", 4: "I" },
    },
  },
  {
    id: 6,
    statements: [
      "Mengatur waktu dengan efisien",
      "Cenderung terburu-buru",
      "Peduli hubungan sosial",
      "Menyelesaikan yang dimulai",
    ],
    mapping: {
      most: { 1: "C", 2: "D", 3: "I", 4: "S" },
      least: { 1: "I", 2: "S", 3: "C", 4: "D" },
    },
  },
  {
    id: 7,
    statements: [
      "Tidak nyaman dengan perubahan mendadak",
      "Selalu ingin berkembang",
      "Menarik diri saat tertekan",
      "Berani menghadapi konflik",
    ],
    mapping: {
      most: { 1: "S", 2: "C", 3: "*", 4: "D" },
      least: { 1: "D", 2: "S", 3: "I", 4: "C" },
    },
  },
  {
    id: 8,
    statements: [
      "Agresif dalam mencapai tujuan",
      "Pendengar yang baik",
      "Analitis",
      "Mampu mendelegasikan",
    ],
    mapping: {
      most: { 1: "D", 2: "S", 3: "C", 4: "I" },
      least: { 1: "S", 2: "D", 3: "I", 4: "C" },
    },
  },
  {
    id: 9,
    statements: [
      "Fokus pada hasil",
      "Mengutamakan akurasi",
      "Membuat suasana menyenangkan",
      "Suka bekerja sama",
    ],
    mapping: {
      most: { 1: "D", 2: "C", 3: "I", 4: "S" },
      least: { 1: "S", 2: "I", 3: "C", 4: "D" },
    },
  },
  {
    id: 10,
    statements: [
      "Bertindak spontan",
      "Membeli karena dorongan",
      "Mampu menunggu",
      "Berusaha mencapai tujuan",
    ],
    mapping: {
      most: { 1: "*", 2: "I", 3: "S", 4: "D" },
      least: { 1: "C", 2: "S", 3: "D", 4: "I" },
    },
  },
  {
    id: 11,
    statements: [
      "Ramah dan mudah bergaul",
      "Kreatif dan bosan rutinitas",
      "Mendorong perubahan",
      "Menyukai hal praktis",
    ],
    mapping: {
      most: { 1: "I", 2: "*", 3: "D", 4: "S" },
      least: { 1: "C", 2: "S", 3: "C", 4: "D" },
    },
  },
  {
    id: 12,
    statements: [
      "Menghindari konfrontasi",
      "Sangat detail",
      "Sering berubah di akhir",
      "Diam tapi keras kepala",
    ],
    mapping: {
      most: { 1: "S", 2: "C", 3: "I", 4: "D" },
      least: { 1: "D", 2: "I", 3: "C", 4: "S" },
    },
  },
  {
    id: 13,
    statements: [
      "Selalu ingin maju",
      "Mudah merasa cukup",
      "Ekspresif",
      "Rendah hati",
    ],
    mapping: {
      most: { 1: "D", 2: "S", 3: "I", 4: "C" },
      least: { 1: "S", 2: "D", 3: "C", 4: "I" },
    },
  },
  {
    id: 14,
    statements: [
      "Tenang dan pendiam",
      "Ceria dan santai",
      "Ramah dan menyenangkan",
      "Berani",
    ],
    mapping: {
      most: { 1: "C", 2: "I", 3: "S", 4: "D" },
      least: { 1: "I", 2: "C", 3: "D", 4: "S" },
    },
  },
  {
    id: 15,
    statements: [
      "Menikmati waktu dengan teman",
      "Merencanakan masa depan",
      "Mencari pengalaman baru",
      "Termotivasi hasil",
    ],
    mapping: {
      most: { 1: "S", 2: "C", 3: "I", 4: "D" },
      least: { 1: "D", 2: "I", 3: "C", 4: "S" },
    },
  },
  {
    id: 16,
    statements: [
      "Aturan perlu diuji",
      "Aturan menciptakan keadilan",
      "Aturan membatasi",
      "Aturan memberi keamanan",
    ],
    mapping: {
      most: { 1: "D", 2: "C", 3: "I", 4: "S" },
      least: { 1: "S", 2: "I", 3: "C", 4: "D" },
    },
  },
  {
    id: 17,
    statements: [
      "Pendidikan dan budaya",
      "Prestasi dan hasil",
      "Keamanan",
      "Interaksi sosial",
    ],
    mapping: {
      most: { 1: "C", 2: "D", 3: "S", 4: "I" },
      least: { 1: "D", 2: "S", 3: "I", 4: "C" },
    },
  },
  {
    id: 18,
    statements: [
      "Memimpin secara langsung",
      "Antusias dan mudah bergaul",
      "Konsisten dan dapat diterima",
      "Waspada dan hati-hati",
    ],
    mapping: {
      most: { 1: "D", 2: "I", 3: "S", 4: "C" },
      least: { 1: "C", 2: "S", 3: "I", 4: "D" },
    },
  },
  {
    id: 19,
    statements: [
      "Pantang menyerah",
      "Mengikuti arahan",
      "Ceria dan ekspresif",
      "Rapi dan teratur",
    ],
    mapping: {
      most: { 1: "D", 2: "S", 3: "I", 4: "C" },
      least: { 1: "S", 2: "D", 3: "C", 4: "I" },
    },
  },
  {
    id: 20,
    statements: ["Memimpin", "Melaksanakan", "Meyakinkan", "Mencari fakta"],
    mapping: {
      most: { 1: "D", 2: "S", 3: "I", 4: "C" },
      least: { 1: "C", 2: "D", 3: "S", 4: "I" },
    },
  },
  {
    id: 21,
    statements: [
      "Memprioritaskan orang lain",
      "Kompetitif",
      "Optimis",
      "Logis dan sistematis",
    ],
    mapping: {
      most: { 1: "S", 2: "D", 3: "I", 4: "C" },
      least: { 1: "D", 2: "S", 3: "C", 4: "I" },
    },
  },
  {
    id: 22,
    statements: [
      "Mudah menyenangkan orang",
      "Santai dan energik",
      "Berani",
      "Tenang",
    ],
    mapping: {
      most: { 1: "S", 2: "I", 3: "D", 4: "C" },
      least: { 1: "D", 2: "C", 3: "S", 4: "I" },
    },
  },
  {
    id: 23,
    statements: [
      "Ingin berkuasa",
      "Mencari peluang baru",
      "Menghindari konflik",
      "Butuh arahan jelas",
    ],
    mapping: {
      most: { 1: "D", 2: "I", 3: "S", 4: "C" },
      least: { 1: "S", 2: "C", 3: "D", 4: "I" },
    },
  },
  {
    id: 24,
    statements: [
      "Dapat dipercaya",
      "Kreatif",
      "Berorientasi hasil",
      "Akurat dan standar tinggi",
    ],
    mapping: {
      most: { 1: "S", 2: "I", 3: "D", 4: "C" },
      least: { 1: "D", 2: "C", 3: "S", 4: "I" },
    },
  },
];
