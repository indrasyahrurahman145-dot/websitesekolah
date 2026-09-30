import React, { useState } from 'react';
import {
  Atom,
  Globe2,
  BookOpen,
  CheckCircle2,
  Sparkles,
  Award,
  Layers
} from 'lucide-react';

export const MajorsAndCurriculum: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'mipa' | 'ips' | 'ibb'>('mipa');

  const majorsData = {
    mipa: {
      name: 'MIPA (Matematika & Sains Alam)',
      tagline: 'Fokus Riset Eksperimental, Robotika, dan Bioteknologi Modern',
      icon: Atom,
      color: 'emerald',
      subjects: [
        'Fisika Lanjutan & Astrofisika Dasar',
        'Kimia Terapan & Analisis Instrumen',
        'Biologi Molekuler & Genetika',
        'Matematika Tingkat Lanjut & Kalkulus',
        'Informatika, Pemrograman Python & Robotika'
      ],
      careerProspects: 'Kedokteran, Teknik Biomedis, Ilmu Komputer/AI, Teknik Elektro, Aktuaria, Farmasi',
      laboratory: 'Lab Bioteknologi ISO, Lab Komputasi Workstation, Lab Fisika Eksperimen',
      alumniHighlight: '88% Lulusan MIPA diterima di Fakultas Kedokteran & Teknik PTN Favorit (UI, ITB, UGM).'
    },
    ips: {
      name: 'IPS (Ilmu Pengetahuan Sosial & Humaniora)',
      tagline: 'Mencetak Pemimpin Masa Depan, Analis Ekonomi Digital, dan Diplomat',
      icon: Globe2,
      color: 'blue',
      subjects: [
        'Ekonomi Makro & Pasar Modal Terapan',
        'Sosiologi Digital & Riset Etnografi',
        'Geografi Lingkungan & Geospasial GIS',
        'Sejarah Kritis & Hubungan Internasional',
        'Statistik Sosial & Riset Opini Publik'
      ],
      careerProspects: 'Hukum, Hubungan Internasional, Manajemen Bisnis, Ilmu Komunikasi, Ekonomi Pembangunan, Kebijakan Publik',
      laboratory: 'Galeri Investasi Bursa Efek Mini, Studio Debat & Diplomasi Model UN',
      alumniHighlight: 'Juara Nasional Debat Parlemen Remaja & Debat Hukum Konstitusi 2025.'
    },
    ibb: {
      name: 'IBB (Ilmu Bahasa & Budaya Global)',
      tagline: 'Kemahiran Multibahasa, Literasi Kritis, Diplomasi Budaya Nusantara',
      icon: BookOpen,
      color: 'amber',
      subjects: [
        'Bahasa & Sastra Indonesia Lanjutan',
        'Bahasa Inggris Akademik & Academic Writing',
        'Bahasa Jepang / Mandarin Pilihan Lanjutan',
        'Antropologi Budaya & Kearifan Lokal',
        'Jurnalistik Investigasi & Media Digital'
      ],
      careerProspects: 'Diplomasi Internasional, Linguistik Forensik, Penyiaran & Media Kreatif, Pariwisata Global, Sastra',
      laboratory: 'Laboratorium Bahasa Multimedia Berbasis AI Speech Recognition, Studio Podcast & Broadcasting',
      alumniHighlight: 'Penerima Beasiswa Pertukaran Pelajar Global Youth Forum ke Tokyo & Berlin.'
    }
  };

  const current = majorsData[activeTab];

  return (
    <section id="kurikulum" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            <span>Kurikulum & Peminatan</span>
            <span aria-hidden="true">·</span>
            <span>Struktur Akademik</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Pilihan Program Peminatan & Keunggulan Belajar
          </h2>
          <p className="text-sm text-slate-600 mt-2">
            Mengadopsi Kurikulum Merdeka yang fleksibel, membebaskan murid memilih mata pelajaran pilihan sesuai minat karir masa depan menuju perguruan tinggi terbaik.
          </p>
        </div>

        {/* Interactive Segmented Tabs */}
        <div className="flex flex-wrap gap-2 p-1.5 bg-slate-200/80 rounded-xl max-w-md mb-8">
          <button
            onClick={() => setActiveTab('mipa')}
            className={`flex-1 min-w-[100px] py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'mipa'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            MIPA (Sains)
          </button>
          <button
            onClick={() => setActiveTab('ips')}
            className={`flex-1 min-w-[100px] py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'ips'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            IPS (Sosial)
          </button>
          <button
            onClick={() => setActiveTab('ibb')}
            className={`flex-1 min-w-[100px] py-2 px-3 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
              activeTab === 'ibb'
                ? 'bg-white text-slate-900 shadow-sm'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            IBB (Bahasa)
          </button>
        </div>

        {/* Detail Card with Single-Elevation Depth */}
        <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            <div className="lg:col-span-7 space-y-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0">
                  <current.icon className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900">{current.name}</h3>
                  <p className="text-xs text-slate-500 font-medium">{current.tagline}</p>
                </div>
              </div>

              <div>
                <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider mb-3">
                  Mata Pelajaran Unggulan Pilihan:
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {current.subjects.map((sub, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs text-slate-700 bg-slate-50 p-2.5 rounded-lg border border-slate-100">
                      <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                      <span className="font-medium">{sub}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="text-xs text-slate-600">
                  <strong className="text-slate-900">Prospek Studi & Karir:</strong> {current.careerProspects}
                </div>
                <div className="text-xs text-slate-600">
                  <strong className="text-slate-900">Fasilitas Pendukung:</strong> {current.laboratory}
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 bg-slate-50 border border-slate-200 rounded-xl p-5 space-y-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-800">
                <Sparkles className="w-4 h-4 text-emerald-600" />
                <span>Program Pendampingan Intensif</span>
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                Setiap peminatan dilengkapi dengan kelas bimbingan khusus persiapan Seleksi Nasional Penerimaan Mahasiswa Baru (SNPMB):
              </p>
              <ul className="space-y-2 text-xs text-slate-700">
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>Klinik Pemantapan SNBP berbasis portofolio nilai rapor berkala sejak Kelas X.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>Try Out UTBK CBT mandiri 8 kali dalam satu tahun ajaran dengan analisis butir soal IRT.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 mt-1.5 shrink-0" />
                  <span>Bimbingan Olimpiade Sains Nasional (OSN) & Riset OPSI Puspresnas.</span>
                </li>
              </ul>

              <div className="p-3 bg-white rounded-lg border border-slate-200 text-xs text-emerald-900 flex items-start gap-2">
                <Award className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span>{current.alumniHighlight}</span>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Pillars of Kurikulum Merdeka */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Layers className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Pembelajaran Berdiferensiasi</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Materi disesuaikan dengan kecepatan, profil gaya belajar (visual, auditori, kinestetik), dan kesiapan belajar masing-masing peserta didik.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Proyek Penguatan P5</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Mengasah nalar kritis, gotong royong, dan kemandirian melalui proyek riil ramah lingkungan dan kewirausahaan berbasis kearifan budaya Nusantara.
            </p>
          </div>

          <div className="bg-white border border-slate-200 rounded-xl p-6">
            <div className="w-9 h-9 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center mb-3">
              <Award className="w-5 h-5" />
            </div>
            <h4 className="text-base font-bold text-slate-900 mb-1">Riset Ilmiah & STEM Inovatif</h4>
            <p className="text-xs text-slate-600 leading-relaxed">
              Peluang mengikuti kompetisi karya tulis ilmiah remaja dan olimpiade internasional dengan bimbingan akademisi perguruan tinggi mitra.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};
