import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  ArrowRight,
  FileCheck2,
  Award,
  BookOpenCheck,
  Building2,
  Users2
} from 'lucide-react';
import heroCampusImg from '../../assets/images/hero_school_campus_1790741476813.jpg';

interface HeroProps {
  onOpenCheckStatus: () => void;
  onNavigateToPPDB: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOpenCheckStatus, onNavigateToPPDB }) => {
  const { profile } = useSchool();

  return (
    <section id="beranda" className="relative bg-slate-900 text-white overflow-hidden">
      {/* Background Image with Scrim */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroCampusImg}
          alt="Gedung Kampus Hijau SMAN 1 Nusantara"
          className="w-full h-full object-cover object-center scale-105 transition-transform duration-1000"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-900/85 to-slate-950/70" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-24 pb-20 sm:pb-28">
        <div className="max-w-3xl">
          {/* Unboxed Metadata Trust Kicker */}
          <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-emerald-400 font-medium tracking-wide mb-4">
            <span>Sekolah Menengah Atas Negeri Rujukan</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span>NPSN {profile.npsn}</span>
            <span aria-hidden="true" className="text-slate-500">·</span>
            <span className="text-amber-300">Akreditasi {profile.accreditation} (Nilai {profile.accreditationScore})</span>
          </div>

          {/* Primary Headline with Balance */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight mb-6">
            Membangun Karakter Luhur, Menumbuhkan Prestasi Global di {profile.shortName}
          </h1>

          {/* Body Prose */}
          <p className="text-base sm:text-lg text-slate-300 leading-relaxed mb-8 max-w-2xl font-normal">
            Satuan pendidikan unggulan berbasis Kurikulum Merdeka yang memadukan keunggulan sains & teknologi modern, riset ilmiah, serta integritas budi pekerti luhur Nusantara.
          </p>

          {/* Interactive CTAs */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 mb-12">
            <button
              onClick={onNavigateToPPDB}
              className="px-6 py-3.5 text-sm font-semibold text-white bg-emerald-600 hover:bg-emerald-500 active:scale-95 rounded-lg shadow-lg shadow-emerald-950/30 transition-all flex items-center justify-center gap-2 cursor-pointer group"
            >
              <span>Daftar PPDB Online 2026/2027</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button
              onClick={onOpenCheckStatus}
              className="px-6 py-3.5 text-sm font-medium text-slate-200 bg-slate-800/80 hover:bg-slate-700/80 hover:text-white border border-slate-700/80 rounded-lg backdrop-blur-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <FileCheck2 className="w-4 h-4 text-emerald-400" />
              <span>Cek Status Seleksi Berkas</span>
            </button>
          </div>

          {/* Key Facts / Quantitative Rigor */}
          <div className="pt-8 border-t border-slate-800/80 grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                {profile.stats.totalStudents}
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <Users2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Peserta Didik Aktif</span>
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                {profile.stats.totalTeachers}
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <BookOpenCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Pendidik Tersertifikasi</span>
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                {profile.stats.achievements}+
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>Prestasi Nasional & Int.</span>
              </div>
            </div>

            <div>
              <div className="text-2xl sm:text-3xl font-bold text-white font-mono tabular-nums">
                {profile.stats.collegeAcceptanceRate}%
              </div>
              <div className="text-xs text-slate-400 mt-1 flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>Lolos PTN Favorit</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
