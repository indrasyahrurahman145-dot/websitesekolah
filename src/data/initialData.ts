import {
  SchoolProfile,
  NewsItem,
  PPDBApplicant,
  Teacher,
  AcademicEvent,
  GalleryItem,
  SchoolFacility,
  ContactMessage,
  DownloadItem
} from '../types';

import heroCampusImg from '../assets/images/hero_school_campus_1790741476813.jpg';
import principalImg from '../assets/images/principal_headshot_1790741491996.jpg';
import stemLabImg from '../assets/images/school_stem_lab_1790741505111.jpg';
import extracurricularImg from '../assets/images/school_extracurricular_1790741518608.jpg';

export const initialSchoolProfile: SchoolProfile = {
  name: 'SMA Negeri 1 Nusantara',
  shortName: 'SMAN 1 Nusantara',
  npsn: '20108392',
  accreditation: 'A (Unggul)',
  accreditationScore: 98,
  establishedYear: 1984,
  curriculum: 'Kurikulum Merdeka Mandiri Berbagi',
  motto: 'Adiluhung, Berkarakter, Berdaya Saing Global',
  tagline: 'Mencetak Generasi Berintegritas, Inovatif, dan Berwawasan Kebangsaan Menuju Indonesia Emas',
  principalName: 'Drs. H. Bambang Suryono, M.Pd.',
  principalNip: '19740512 199903 1 002',
  principalTitle: 'Kepala Sekolah Penggerak Angkatan I',
  address: 'Jl. Merdeka Pendidikan No. 45, Kompleks Edukasi Terpadu',
  district: 'Cilandak',
  city: 'Kota Jakarta Selatan',
  province: 'DKI Jakarta',
  postalCode: '12430',
  phone: '(021) 7812-4091',
  whatsapp: '+62 812-9840-2026',
  email: 'info@sman1nusantara.sch.id',
  website: 'https://sman1nusantara.sch.id',
  vision: 'Terwujudnya insan pembelajar yang berakhlak mulia, cerdas bernalar kritis, mandiri, dan berprestasi unggul di tingkat internasional berakar pada budaya Nusantara.',
  missions: [
    'Menyelenggarakan proses pembelajaran berbasis Kurikulum Merdeka yang interaktif, berdiferensiasi, dan berorientasi teknologi masa depan.',
    'Menanamkan nilai-nilai luhur Pancasila dan kearifan lokal melalui penguatan Profil Pelajar Pancasila yang aplikatif.',
    'Mengembangkan potensi talenta akademik dan non-akademik siswa melalui riset ilmiah remaja, olimpiade sains, serta ekstrakurikuler terpadu.',
    'Membangun jejaring kolaborasi global dengan perguruan tinggi terkemuka dalam dan luar negeri serta dunia industri.',
    'Mewujudkan tata kelola satuan pendidikan yang akuntabel, transparan, dan berbasis teknologi informasi digital (Smart School).'
  ],
  stats: {
    totalStudents: 1048,
    totalTeachers: 68,
    totalClasses: 30,
    extracurriculars: 28,
    achievements: 184,
    collegeAcceptanceRate: 94.2
  }
};

export const initialNews: NewsItem[] = [
  {
    id: 'news-1',
    title: 'Pembukaan Pendaftaran PPDB Tahun Ajaran 2026/2027 Resmi Dimulai',
    slug: 'pembukaan-ppdb-2026-2027',
    category: 'PPDB',
    excerpt: 'Pendaftaran Peserta Didik Baru (PPDB) SMAN 1 Nusantara resmi dibuka melalui 4 jalur: Zonasi, Prestasi, Afirmasi, dan Mutasi Orang Tua dengan kuota 360 siswa.',
    content: `Panitia Penerimaan Peserta Didik Baru (PPDB) SMA Negeri 1 Nusantara secara resmi mengumumkan pembukaan pendaftaran calon peserta didik baru untuk Tahun Ajaran 2026/2027. Seluruh rangkaian pendaftaran dilaksanakan secara daring terpadu melalui portal resmi ini guna menjamin transparansi, keadilan, dan akuntabilitas seleksi.

Kepala Sekolah Drs. H. Bambang Suryono, M.Pd. menyampaikan bahwa daya tampung tahun ini adalah sebanyak 10 rombongan belajar dengan total kuota 360 siswa. Proporsi alokasi jalur penerimaan terdiri dari:
1. Jalur Zonasi (50% kuota)
2. Jalur Prestasi Akademik & Non-Akademik (30% kuota)
3. Jalur Afirmasi / KETM (15% kuota)
4. Jalur Perpindahan Tugas Orang Tua / Wali (5% kuota)

Calon pendaftar diimbau untuk mempersiapkan dokumen pindaian asli seperti Kartu Keluarga, Rapor SMP Semester 1-5, NISN terverifikasi, dan sertifikat prestasi yang telah dilegalisir. Informasi bantuan teknis tersedia melalui WhatsApp Helpdesk PPDB setiap hari kerja pukul 08.00 - 15.00 WIB.`,
    date: '28 September 2026',
    author: 'Tim Humas & PPDB',
    authorRole: 'Humas SMAN 1 Nusantara',
    image: heroCampusImg,
    featured: true,
    published: true,
    reads: 1420
  },
  {
    id: 'news-2',
    title: 'Tim Robotik SMAN 1 Nusantara Raih Medali Emas di Asean Youth STEM Expo',
    slug: 'medali-emas-robotik-asean-stem',
    category: 'Prestasi',
    excerpt: 'Karya inovasi robot pendeteksi kualitas air waduk bertenaga surya berhasil memukau dewan juri internasional dalam kompetisi di Bangkok, Thailand.',
    content: `Prestasi membanggakan kembali dipersembahkan oleh siswa-siswi SMA Negeri 1 Nusantara di kancah internasional. Tim Robotika "Nusantara Techno Squad" yang beranggotakan Muhammad Rayhan (XI MIPA 1) dan Nayla Anindya (XI MIPA 2) berhasil meraih Medali Emas pada kategori Applied Environmental Tech di ASEAN Youth STEM Olympiad 2026 yang diselenggarakan di Bangkok.

Inovasi yang mereka bawa bernama "AeroHydro Smart Probe", sebuah robot terapung otonom yang mampu menganalisis parameter pH, dissolved oxygen, serta cemaran mikroplastik secara real-time dan mengirimkan datanya ke cloud server melalui jaringan LoRaWAN.

Pembimbing ekstrakurikuler Robotika, Bapak Hendra Wijaya, M.Kom., mengapresiasi kerja keras para siswa yang telah melakukan riset intensif di laboratorium sekolah selama 6 bulan terakhir. Sekolah memberikan apresiasi penuh berupa beasiswa pembinaan prestasi.`,
    date: '24 September 2026',
    author: 'Hendra Wijaya, M.Kom.',
    authorRole: 'Pembina Robotika & Guru TIK',
    image: stemLabImg,
    featured: true,
    published: true,
    reads: 890
  },
  {
    id: 'news-3',
    title: 'Implementasi Pembelajaran Berdiferensiasi dan Proyek Penguatan Pelajar Pancasila (P5)',
    slug: 'pembelajaran-berdiferensiasi-p5',
    category: 'Akademik',
    excerpt: 'Gelar Karya P5 bertema "Kearifan Lokal dan Gaya Hidup Berkelanjutan" tampil semarak menampilkan produk wirausaha ramah lingkungan kreasi siswa.',
    content: `Sebagai Sekolah Penggerak rujukan nasional, SMA Negeri 1 Nusantara terus memperkuat implementasi Kurikulum Merdeka melalui pembelajaran berdiferensiasi dan Proyek Penguatan Profil Pelajar Pancasila (P5).

Selama sepekan, seluruh siswa kelas X dan XI berpartisipasi dalam pameran Gelar Karya P5 dengan tema "Gaya Hidup Berkelanjutan". Siswa memamerkan produk olahan pangan berbahan baku lokal bernilai gizi tinggi, instalasi komposter pintar, serta karya seni daur ulang bernilai ekonomis.

Kegiatan ini dibuka oleh Pengawas Pembina Dinas Pendidikan Provinsi yang menyampaikan apresiasi atas kemandirian siswa dalam mengorganisasikan festival ini secara terpadu. Melalui kegiatan ini, siswa diasah karakter kolaborasi, nalar kritis, dan kepedulian lingkungannya.`,
    date: '18 September 2026',
    author: 'Siti Rahmawati, S.Pd.',
    authorRole: 'Koordinator Kurikulum',
    image: extracurricularImg,
    featured: false,
    published: true,
    reads: 640
  },
  {
    id: 'news-4',
    title: 'Kunjungan Edukatif & Penandatanganan MoU dengan Fakultas Teknik Universitas Indonesia',
    slug: 'mou-fakultas-teknik-ui',
    category: 'Info Sekolah',
    excerpt: 'Kerjasama strategis penguatan riset ilmiah remaja dan program pendampingan intensif seleksi masuk perguruan tinggi negeri bagi siswa berprestasi.',
    content: `SMA Negeri 1 Nusantara menyepakati nota kesepahaman (MoU) kemitraan pendidikan dengan Fakultas Teknik Universitas Indonesia (FTUI). Kerja sama ini mencakup program kunjungan laboratorium berkala, dosen tamu dalam kuliah umum sains lanjutan, serta bimbingan karya tulis ilmiah untuk siswa kelas akselerasi dan riset.

Dengan adanya kemitraan ini, siswa SMAN 1 Nusantara akan mendapatkan akses mentorship langsung dari para akademisi dan mahasiswa berprestasi, sekaligus memperbesar peluang tembus jalur SNBP (Seleksi Nasional Berdasarkan Prestasi) ke program studi unggulan.`,
    date: '12 September 2026',
    author: 'Drs. H. Bambang Suryono, M.Pd.',
    authorRole: 'Kepala Sekolah',
    image: heroCampusImg,
    featured: false,
    published: true,
    reads: 512
  }
];

export const initialPPDBApplicants: PPDBApplicant[] = [
  {
    id: 'ppdb-1',
    registrationNo: 'PPDB-2026-001',
    fullName: 'Aditya Pratama Putra',
    nisn: '0089123451',
    nik: '3174051203090001',
    birthPlace: 'Jakarta',
    birthDate: '2010-04-12',
    gender: 'Laki-laki',
    originSchool: 'SMP Negeri 41 Jakarta',
    originSchoolCity: 'Jakarta Selatan',
    parentName: 'Rudi Hartono',
    parentPhone: '081287654321',
    parentJob: 'Pegawai BUMN',
    email: 'aditya.pratama@gmail.com',
    address: 'Jl. Margasatwa Barat No. 18, Ragunan',
    pathway: 'Zonasi',
    distanceFromSchoolKm: 1.2,
    chosenMajor: 'MIPA (Matematika & Ilmu Alam)',
    secondMajor: 'IPS (Ilmu Pengetahuan Sosial)',
    averageScore: 91.8,
    status: 'diterima',
    adminNotes: 'Dokumen KK & Nilai Rapor lengkap dan sesuai domisili zonasi primer.',
    submittedAt: '2026-09-20 08:30',
    verifiedAt: '2026-09-21 10:15'
  },
  {
    id: 'ppdb-2',
    registrationNo: 'PPDB-2026-002',
    fullName: 'Farah Alya Azzahra',
    nisn: '0087456123',
    nik: '3174094508100002',
    birthPlace: 'Bandung',
    birthDate: '2010-08-15',
    gender: 'Perempuan',
    originSchool: 'SMP Labschool Kebayoran',
    originSchoolCity: 'Jakarta Selatan',
    parentName: 'Dr. Irwan Santoso, Sp.A',
    parentPhone: '081399887766',
    parentJob: 'Dokter Spesialis Anak',
    email: 'farah.azzahra@gmail.com',
    address: 'Jl. KH Ahmad Dahlan No. 12, Gandaria',
    pathway: 'Prestasi',
    distanceFromSchoolKm: 4.8,
    chosenMajor: 'MIPA (Matematika & Ilmu Alam)',
    secondMajor: 'IBB (Ilmu Bahasa & Budaya)',
    averageScore: 95.4,
    achievementNotes: 'Juara 1 OSN Matematika Tingkat Kota Jakarta Selatan 2025, Medali Perak Olimpiade Sains Indonesia.',
    status: 'diterima',
    adminNotes: 'Sertifikat OSN resmi terverifikasi Puspresnas Kemendikbudristek.',
    submittedAt: '2026-09-20 09:12',
    verifiedAt: '2026-09-21 11:30'
  },
  {
    id: 'ppdb-3',
    registrationNo: 'PPDB-2026-003',
    fullName: 'Muhammad Bintang Ramadhan',
    nisn: '0086543219',
    nik: '3174021909090003',
    birthPlace: 'Surabaya',
    birthDate: '2009-09-19',
    gender: 'Laki-laki',
    originSchool: 'SMP Negeri 115 Jakarta',
    originSchoolCity: 'Jakarta Selatan',
    parentName: 'Agus Setiawan',
    parentPhone: '081512348765',
    parentJob: 'Wiraswasta',
    email: 'bintang.ramadhan@yahoo.com',
    address: 'Jl. Tebet Barat Dalam VII No. 3',
    pathway: 'Prestasi',
    distanceFromSchoolKm: 6.2,
    chosenMajor: 'IPS (Ilmu Pengetahuan Sosial)',
    secondMajor: 'IBB (Ilmu Bahasa & Budaya)',
    averageScore: 89.2,
    achievementNotes: 'Juara 2 Debat Bahasa Inggris Tingkat Provinsi DKI Jakarta.',
    status: 'diverifikasi',
    adminNotes: 'Sedang dalam tahap pemeringkatan kuota jalur prestasi non-akademik.',
    submittedAt: '2026-09-22 14:20',
    verifiedAt: '2026-09-23 09:00'
  },
  {
    id: 'ppdb-4',
    registrationNo: 'PPDB-2026-004',
    fullName: 'Siti Nurhaliza',
    nisn: '0081239874',
    nik: '3174036111090004',
    birthPlace: 'Jakarta',
    birthDate: '2009-11-21',
    gender: 'Perempuan',
    originSchool: 'SMP Negeri 85 Jakarta',
    originSchoolCity: 'Jakarta Selatan',
    parentName: 'Kuswanto',
    parentPhone: '087865432109',
    parentJob: 'Pedagang',
    email: 'sitinurhaliza.21@gmail.com',
    address: 'Jl. Fatmawati Gang Melati No. 4, Cilandak',
    pathway: 'Afirmasi',
    distanceFromSchoolKm: 0.9,
    chosenMajor: 'MIPA (Matematika & Ilmu Alam)',
    secondMajor: 'IPS (Ilmu Pengetahuan Sosial)',
    averageScore: 88.5,
    status: 'diterima',
    adminNotes: 'Terdaftar penerima KJP Plus Aktif & DTKS Kemensos. Berhak fasilitas seragam & buku gratis.',
    submittedAt: '2026-09-22 16:45',
    verifiedAt: '2026-09-23 13:20'
  },
  {
    id: 'ppdb-5',
    registrationNo: 'PPDB-2026-005',
    fullName: 'Kevin Alamsyah Wijaya',
    nisn: '0083214567',
    nik: '3174061502100005',
    birthPlace: 'Semarang',
    birthDate: '2010-02-15',
    gender: 'Laki-laki',
    originSchool: 'SMP Pangudi Luhur',
    originSchoolCity: 'Jakarta Selatan',
    parentName: 'Hendrik Wijaya',
    parentPhone: '081211223344',
    parentJob: 'Karyawan Swasta',
    email: 'kevin.alamsyah@gmail.com',
    address: 'Jl. Kemang Raya No. 89, Bangka',
    pathway: 'Mutasi Orang Tua',
    distanceFromSchoolKm: 3.5,
    chosenMajor: 'IPS (Ilmu Pengetahuan Sosial)',
    secondMajor: 'MIPA (Matematika & Ilmu Alam)',
    averageScore: 87.0,
    status: 'menunggu',
    adminNotes: 'Menunggu kelengkapan SK Pindah Tugas Instansi Induk dari orang tua.',
    submittedAt: '2026-09-24 10:05'
  },
  {
    id: 'ppdb-6',
    registrationNo: 'PPDB-2026-006',
    fullName: 'Zahra Cantika Putri',
    nisn: '0085678901',
    nik: '3174085407100006',
    birthPlace: 'Jakarta',
    birthDate: '2010-07-14',
    gender: 'Perempuan',
    originSchool: 'SMP Negeri 19 Jakarta',
    originSchoolCity: 'Jakarta Selatan',
    parentName: 'Bambang Trihatmojo',
    parentPhone: '081678901234',
    parentJob: 'PNS Pemprov DKI',
    email: 'zahra.cantika@gmail.com',
    address: 'Jl. Bumi No. 34, Kebayoran Baru',
    pathway: 'Zonasi',
    distanceFromSchoolKm: 2.1,
    chosenMajor: 'IBB (Ilmu Bahasa & Budaya)',
    secondMajor: 'IPS (Ilmu Pengetahuan Sosial)',
    averageScore: 90.3,
    status: 'cadangan',
    adminNotes: 'Cadangan urutan ke-2 untuk peminatan Bahasa dan Budaya.',
    submittedAt: '2026-09-25 11:40',
    verifiedAt: '2026-09-26 14:00'
  }
];

export const initialTeachers: Teacher[] = [
  {
    id: 't-1',
    name: 'Drs. H. Bambang Suryono, M.Pd.',
    nip: '19740512 199903 1 002',
    role: 'Kepala Sekolah & Guru Fisika Lanjutan',
    subjects: ['Fisika Modern', 'Fisika Kuantum Inti'],
    education: 'S2 Magister Manajemen Pendidikan UNJ, S1 Pendidikan Fisika UPI',
    photo: principalImg,
    email: 'bambang.suryono@sman1nusantara.sch.id',
    phone: '0812-9840-001',
    status: 'PNS',
    quote: 'Mendidik bukan hanya mentransfer rumus dan teori, melainkan menyalakan api rasa ingin tahu dan membangun budi pekerti luhur.'
  },
  {
    id: 't-2',
    name: 'Dra. Hj. Sri Endang Wahyuni, M.Si.',
    nip: '19760814 200212 2 001',
    role: 'Wakil Kepala Sekolah Bidang Kurikulum',
    subjects: ['Biologi Molekuler', 'Bioteknologi'],
    education: 'S2 Biologi Terapan ITB, S1 Pendidikan Biologi UNY',
    photo: stemLabImg,
    email: 'sri.endang@sman1nusantara.sch.id',
    phone: '0813-8899-002',
    status: 'PNS',
    quote: 'Eksplorasi ilmu sains membuka kekaguman kita akan keteraturan dan keagungan alam semesta.'
  },
  {
    id: 't-3',
    name: 'Hendra Wijaya, M.Kom.',
    nip: '19850320 201001 1 015',
    role: 'Wakil Kepala Sekolah Bidang Humas & TIK',
    subjects: ['Informatika', 'Kecerdasan Buatan (AI Dasar)', 'Robotika'],
    education: 'S2 Ilmu Komputer UI, S1 Teknik Informatika ITS',
    photo: stemLabImg,
    email: 'hendra.wijaya@sman1nusantara.sch.id',
    phone: '0817-6655-003',
    status: 'PNS',
    quote: 'Generasi muda Indonesia harus menjadi pencipta teknologi masa depan, bukan sekadar konsumen pasif.'
  },
  {
    id: 't-4',
    name: 'Ratna Kusuma Dewi, S.Pd., M.Ed.',
    nip: '19881105 201402 2 004',
    role: 'Koordinator Bahasa & Program Internasional',
    subjects: ['Bahasa Inggris Akademik', 'Literature & Public Speaking'],
    education: 'Master of Education University of Melbourne, S1 Pendidikan Bahasa Inggris UNJ',
    photo: extracurricularImg,
    email: 'ratna.kusuma@sman1nusantara.sch.id',
    phone: '0818-4433-004',
    status: 'PNS',
    quote: 'Language is the passport to the world; speak with empathy, think with clarity.'
  },
  {
    id: 't-5',
    name: 'Ahmad Fauzi, S.Pd.',
    nip: '19920117 201903 1 008',
    role: 'Guru Matematika & Pembina Tim OSN',
    subjects: ['Matematika Tingkat Lanjut', 'Kalkulus & Aljabar'],
    education: 'S1 Pendidikan Matematika UGM Yogyakarta',
    photo: stemLabImg,
    email: 'ahmad.fauzi@sman1nusantara.sch.id',
    phone: '0819-2211-005',
    status: 'PPPK',
    quote: 'Matematika melatih cara berpikir logis, terstruktur, dan tahan uji dalam memecahkan masalah kompleks.'
  },
  {
    id: 't-6',
    name: 'Dewi Lestari, S.Sos., M.Si.',
    nip: '19870928 201201 2 006',
    role: 'Guru Sosiologi & Pembina Ekstrakurikuler Debat',
    subjects: ['Sosiologi Modern', 'Riset Sosial Kemasyarakatan'],
    education: 'S2 Sosiologi Pembangunan UI, S1 Sosiologi Unpad',
    photo: extracurricularImg,
    email: 'dewi.lestari@sman1nusantara.sch.id',
    phone: '0812-7766-006',
    status: 'PNS',
    quote: 'Kepekaan sosial adalah pondasi kepemimpinan yang berakar pada nurani kebangsaan.'
  }
];

export const initialAcademicEvents: AcademicEvent[] = [
  {
    id: 'ev-1',
    title: 'Masa Pendaftaran & Verifikasi Berkas PPDB Tahap 1',
    category: 'PPDB',
    startDate: '2026-10-01',
    endDate: '2026-10-15',
    location: 'Sistem Daring Terpadu & Aula SMAN 1 Nusantara',
    description: 'Penerimaan berkas pendaftaran calon peserta didik baru untuk semua jalur seleksi secara daring.',
    targetAudience: 'Calon Siswa Baru & Orang Tua / Wali'
  },
  {
    id: 'ev-2',
    title: 'Penilaian Tengah Semester (PTS) Ganjil TA 2026/2027',
    category: 'Ujian',
    startDate: '2026-10-19',
    endDate: '2026-10-24',
    location: 'Ruang Kelas & Sistem Computer Based Test (CBT)',
    description: 'Evaluasi asesmen sumatif tengah semester untuk seluruh jenjang kelas X, XI, dan XII.',
    targetAudience: 'Seluruh Siswa Kelas X, XI, dan XII'
  },
  {
    id: 'ev-3',
    title: 'Nusantara Science & Innovation Fair 2026',
    category: 'Kegiatan',
    startDate: '2026-11-06',
    endDate: '2026-11-07',
    location: 'Gedung Olahraga & Laboratorium Sains Terpadu',
    description: 'Pameran karya riset ilmiah remaja, kompetisi robotika antarsekolah se-Jabodetabek, dan lokakarya sains.',
    targetAudience: 'Siswa, Civitas Akademika & Masyarakat Umum'
  },
  {
    id: 'ev-4',
    title: 'Peringatan Hari Guru Nasional & Peluncuran Buku Antologi Karya Siswa',
    category: 'Kegiatan',
    startDate: '2026-11-25',
    endDate: '2026-11-25',
    location: 'Plaza Lapangan Utama Upacara',
    description: 'Upacara bendera peringatan Hari Guru Nasional dirangkaikan dengan pentas apresiasi seni dan launching buku.',
    targetAudience: 'Guru, Staf TU, dan Seluruh Siswa'
  },
  {
    id: 'ev-5',
    title: 'Rapat Pleno Dewan Guru & Evaluasi Kurikulum',
    category: 'Rapat',
    startDate: '2026-12-04',
    endDate: '2026-12-04',
    location: 'Ruang Multimedia & Rapat Lantai 3',
    description: 'Rapat koordinasi dewan pendidik terkait penetapan capaian pembelajaran dan persiapan Penilaian Akhir Semester.',
    targetAudience: 'Dewan Guru & Manajemen Sekolah'
  },
  {
    id: 'ev-6',
    title: 'Libur Akhir Semester Ganjil TA 2026/2027',
    category: 'Libur',
    startDate: '2026-12-21',
    endDate: '2027-01-02',
    location: '-',
    description: 'Libur resmi akhir semester ganjil bagi peserta didik sesuai Kalender Pendidikan Dinas Provinsi DKI Jakarta.',
    targetAudience: 'Seluruh Civitas Akademika'
  }
];

export const initialFacilities: SchoolFacility[] = [
  {
    id: 'fac-1',
    name: 'Laboratorium Sains & Bioteknologi Terpadu',
    category: 'Akademik & Riset',
    description: 'Laboratorium modern bersertifikasi ISO dengan mikroskop elektron digital, laminar air flow, dan reagen standar riset olimpiade.',
    capacity: '40 Siswa / Sesi',
    imageUrl: stemLabImg,
    features: ['Mikroskop Digital 4K', 'Peralatan Ekstraksi DNA Sederhana', 'Fume Hood Kimia Aman', 'AC & Smart Board Projector']
  },
  {
    id: 'fac-2',
    name: 'Laboratorium Komputer & Inovasi Robotika (Makerspace)',
    category: 'Teknologi & STEM',
    description: 'Ruang rekayasa komputasi dilengkapi 45 PC Core i7 workstation, printer 3D, sensor Arduino/Raspberry Pi, dan area uji robot.',
    capacity: '45 Siswa / Sesi',
    imageUrl: stemLabImg,
    features: ['High-speed Fiber Optic 1 Gbps', '3D Printer Creality & Filament', 'Sensor Kit & Solder Station', 'Dual Monitor Workstation']
  },
  {
    id: 'fac-3',
    name: 'Perpustakaan Digital "Graha Pustaka Cendekia"',
    category: 'Literasi & Sumber Belajar',
    description: 'Koleksi 18.000+ eksemplar buku fisik dan akses ke ribuan e-book, jurnal internasional Scopus/EBSCO, serta ruang diskusi senyap.',
    capacity: '120 Pengunjung',
    imageUrl: heroCampusImg,
    features: ['Self-Borrowing RFID Kiosk', 'Bilik Diskusi Kedap Suara', 'Koneksi E-Journal Internasional', 'Area Baca Lesehan Berkarpet']
  },
  {
    id: 'fac-4',
    name: 'Gelanggang Olahraga & Lapangan Multi-Fungsi',
    category: 'Olahraga & Kesehatan',
    description: 'Fasilitas lapangan olahraga outdoor dan indoor berstandar nasional untuk basket, futsal, bulu tangkis, dan lintasan atletik pendek.',
    capacity: '800 Penonton',
    imageUrl: extracurricularImg,
    features: ['Lantai Interlock Futsal Standar', 'Ring Basket Hidrolik', 'Tribun Penonton Beratap', 'Lampu Sorot Malam Hari']
  }
];

export const initialGallery: GalleryItem[] = [
  {
    id: 'gal-1',
    title: 'Gedung Utama Kampus Hijau SMAN 1 Nusantara',
    category: 'Fasilitas',
    imageUrl: heroCampusImg,
    date: 'September 2026',
    description: 'Suasana asri lingkungan sekolah adiwiyata mandiri dengan pepohonan rindang dan taman terbuka hijau.'
  },
  {
    id: 'gal-2',
    title: 'Siswa Melakukan Pengujian Robot Otonom di Lab',
    category: 'Kegiatan',
    imageUrl: stemLabImg,
    date: 'September 2026',
    description: 'Sesi kolaborasi siswa kelas peminatan teknologi rekayasa merakit prototipe inovasi masa depan.'
  },
  {
    id: 'gal-3',
    title: 'Aktivitas Ekstrakurikuler dan Pengembangan Karakter Siswa',
    category: 'Ekstrakurikuler',
    imageUrl: extracurricularImg,
    date: 'Agustus 2026',
    description: 'Semangat sportivitas dan kreativitas seni tari serta olahraga para siswa di halaman tengah sekolah.'
  },
  {
    id: 'gal-4',
    title: 'Penerimaan Penghargaan Sekolah Ramah Anak & Adiwiyata',
    category: 'Prestasi',
    imageUrl: heroCampusImg,
    date: 'Juli 2026',
    description: 'Penyerahan piagam apresiasi dari Kementerian Lingkungan Hidup dan Kehutanan atas komitmen kelestarian kampus hijau.'
  }
];

export const initialContactMessages: ContactMessage[] = [
  {
    id: 'msg-1',
    name: 'Budi Santoso',
    email: 'budi.santoso@gmail.com',
    phone: '081234567890',
    category: 'Pertanyaan PPDB',
    subject: 'Pertanyaan Syarat Jalur Prestasi Tahfidz Al-Qur\'an',
    message: 'Selamat siang Bapak/Ibu Panitia PPDB, apakah sertifikat hafalan Qur\'an 5 juz dari LPTQ resmi bisa dimasukkan sebagai portofolio jalur prestasi non-akademik? Mohon infonya.',
    date: '2026-09-28 14:15',
    status: 'dibalas',
    adminReply: 'Selamat siang Bapak Budi. Benar sekali, sertifikat tahfidz minimal 3 juz yang diterbitkan LPTQ / Kementerian Agama diakui dalam seleksi Jalur Prestasi Keagamaan. Silakan lampirkan scan aslinya saat mendaftar online.'
  },
  {
    id: 'msg-2',
    name: 'Ibu Ratna Juwita',
    email: 'ratna.juwita@gmail.com',
    phone: '085712349988',
    category: 'Informasi Akademik',
    subject: 'Jadwal Konsultasi Peminatan Masuk PTN Kelas XII',
    message: 'Mohon info jadwal bimbingan konseling dan pemetaan nilai rapor untuk persiapan SNBP anak saya kelas XII MIPA 2.',
    date: '2026-09-29 09:30',
    status: 'belum_dibaca'
  }
];

export const initialDownloads: DownloadItem[] = [
  {
    id: 'dl-1',
    title: 'Petunjuk Teknis (Juknis) PPDB Online TA 2026/2027',
    category: 'Formulir',
    fileType: 'PDF',
    fileSize: '2.4 MB',
    downloadCount: 1540,
    date: '2026-09-20'
  },
  {
    id: 'dl-2',
    title: 'Kalender Pendidikan Resmi Semester Ganjil & Genap 2026/2027',
    category: 'Kurikulum',
    fileType: 'PDF',
    fileSize: '1.8 MB',
    downloadCount: 980,
    date: '2026-08-15'
  },
  {
    id: 'dl-3',
    title: 'Buku Panduan Tata Tertib & Kode Etik Peserta Didik',
    category: 'Tata Tertib',
    fileType: 'PDF',
    fileSize: '3.1 MB',
    downloadCount: 720,
    date: '2026-07-10'
  },
  {
    id: 'dl-4',
    title: 'Formulir Permohonan Surat Keterangan Siswa Aktif & Rekomendasi Beasiswa',
    category: 'Formulir',
    fileType: 'DOCX',
    fileSize: '450 KB',
    downloadCount: 460,
    date: '2026-08-01'
  }
];
