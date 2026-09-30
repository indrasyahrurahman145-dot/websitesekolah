export type PPDBStatus = 'menunggu' | 'diverifikasi' | 'diterima' | 'cadangan' | 'ditolak';

export type PPDBPathway = 'Zonasi' | 'Prestasi' | 'Afirmasi' | 'Mutasi Orang Tua';

export type MajorChoice = 'MIPA (Matematika & Ilmu Alam)' | 'IPS (Ilmu Pengetahuan Sosial)' | 'IBB (Ilmu Bahasa & Budaya)';

export interface SchoolProfile {
  name: string;
  shortName: string;
  npsn: string;
  accreditation: string;
  accreditationScore: number;
  establishedYear: number;
  curriculum: string;
  motto: string;
  tagline: string;
  principalName: string;
  principalNip: string;
  principalTitle: string;
  address: string;
  district: string;
  city: string;
  province: string;
  postalCode: string;
  phone: string;
  whatsapp: string;
  email: string;
  website: string;
  vision: string;
  missions: string[];
  stats: {
    totalStudents: number;
    totalTeachers: number;
    totalClasses: number;
    extracurriculars: number;
    achievements: number;
    collegeAcceptanceRate: number;
  };
}

export interface NewsItem {
  id: string;
  title: string;
  slug: string;
  category: 'Akademik' | 'Prestasi' | 'Kegiatan' | 'Info Sekolah' | 'PPDB';
  excerpt: string;
  content: string;
  date: string;
  author: string;
  authorRole: string;
  image: string;
  featured?: boolean;
  published: boolean;
  reads: number;
}

export interface PPDBApplicant {
  id: string;
  registrationNo: string;
  fullName: string;
  nisn: string;
  nik: string;
  birthPlace: string;
  birthDate: string;
  gender: 'Laki-laki' | 'Perempuan';
  originSchool: string;
  originSchoolCity: string;
  parentName: string;
  parentPhone: string;
  parentJob: string;
  email: string;
  address: string;
  pathway: PPDBPathway;
  distanceFromSchoolKm?: number;
  chosenMajor: MajorChoice;
  secondMajor: MajorChoice;
  averageScore: number;
  achievementNotes?: string;
  status: PPDBStatus;
  adminNotes?: string;
  submittedAt: string;
  verifiedAt?: string;
}

export interface Teacher {
  id: string;
  name: string;
  nip: string;
  role: string;
  subjects: string[];
  education: string;
  photo: string;
  email: string;
  phone: string;
  status: 'PNS' | 'PPPK' | 'Guru Tetap Yayasan';
  quote?: string;
}

export interface AcademicEvent {
  id: string;
  title: string;
  category: 'Ujian' | 'Libur' | 'Kegiatan' | 'Rapat' | 'PPDB' | 'Prestasi';
  startDate: string;
  endDate: string;
  location: string;
  description: string;
  targetAudience: string;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'Fasilitas' | 'Kegiatan' | 'Prestasi' | 'Ekstrakurikuler';
  imageUrl: string;
  date: string;
  description: string;
}

export interface SchoolFacility {
  id: string;
  name: string;
  category: string;
  description: string;
  capacity: string;
  imageUrl: string;
  features: string[];
}

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  category: 'Pertanyaan PPDB' | 'Aspirasi' | 'Kerjasama' | 'Informasi Akademik' | 'Lainnya';
  date: string;
  status: 'belum_dibaca' | 'sudah_dibaca' | 'dibalas';
  adminReply?: string;
}

export interface DownloadItem {
  id: string;
  title: string;
  category: 'Formulir' | 'Kurikulum' | 'Surat Edaran' | 'Tata Tertib' | 'Silabus';
  fileType: string;
  fileSize: string;
  downloadCount: number;
  date: string;
}
