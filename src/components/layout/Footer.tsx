import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Globe,
  Award
} from 'lucide-react';

export const Footer: React.FC = () => {
  const { profile, setCurrentView } = useSchool();

  return (
    <footer className="bg-slate-950 text-slate-400 border-t border-slate-800">
      {/* Upper Footer: Main Information */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Identity & Accreditation */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-white font-bold text-base tracking-tight">{profile.name}</h3>
                <p className="text-xs text-emerald-400 font-medium">{profile.motto}</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400">
              Satuan pendidikan menengah atas negeri rujukan nasional berkomitmen mencetak generasi unggul, berakhlak mulia, cerdas bernalar kritis, dan berdaya saing global melalui Kurikulum Merdeka.
            </p>
            <div className="pt-2 border-t border-slate-800/80 space-y-1.5 text-xs">
              <div className="flex items-center gap-2 text-slate-300">
                <Award className="w-4 h-4 text-amber-400 shrink-0" />
                <span>Akreditasi: <strong>{profile.accreditation} (Nilai {profile.accreditationScore})</strong></span>
              </div>
              <div className="flex items-center gap-2 text-slate-300">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>NPSN: <strong className="font-mono">{profile.npsn}</strong></span>
              </div>
            </div>
          </div>

          {/* Col 2: Kontak & Lokasi */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Kontak & Lokasi
            </h4>
            <ul className="space-y-3 text-xs leading-relaxed">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>{profile.address}, {profile.district}, {profile.city}, {profile.province} {profile.postalCode}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{profile.phone} / WA: {profile.whatsapp}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{profile.email}</span>
              </li>
              <li className="flex items-start gap-2.5">
                <Clock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <span>Senin – Jumat: 06.45 – 15.30 WIB<br />Pelayanan TU & PPDB: 08.00 – 14.30 WIB</span>
              </li>
            </ul>
          </div>

          {/* Col 3: Layanan Daring */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Layanan & Akademik
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#ppdb" className="hover:text-emerald-400 transition-colors">
                  Pendaftaran PPDB Daring 2026/2027
                </a>
              </li>
              <li>
                <a href="#kurikulum" className="hover:text-emerald-400 transition-colors">
                  Peminatan MIPA, IPS, & Budaya
                </a>
              </li>
              <li>
                <a href="#guru" className="hover:text-emerald-400 transition-colors">
                  Direktori Tenaga Pendidik & Staf
                </a>
              </li>
              <li>
                <a href="#agenda" className="hover:text-emerald-400 transition-colors">
                  Kalender Akademik Semester Aktif
                </a>
              </li>
              <li>
                <a href="#unduhan" className="hover:text-emerald-400 transition-colors">
                  Unduhan Panduan & Formulir Resmi
                </a>
              </li>
              <li>
                <a href="#galeri" className="hover:text-emerald-400 transition-colors">
                  Dokumentasi Fasilitas & Kampus Hijau
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Tautan Eksternal & Administrator */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold text-white uppercase tracking-wider">
              Portal Terpadu
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Sistem Informasi Manajemen Sekolah (SIMS) terintegrasi untuk guru, pegawai tata usaha, dan panitia PPDB online.
            </p>
            <div className="pt-2">
              <button
                onClick={() => {
                  setCurrentView('admin');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-emerald-950 text-emerald-400 hover:text-emerald-300 border border-slate-800 hover:border-emerald-800 rounded-lg text-xs font-semibold transition-all cursor-pointer"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>Masuk Dashboard SIMS Sekolah</span>
              </button>
            </div>
            <div className="pt-3 text-[11px] text-slate-500 space-y-1">
              <div className="flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5" />
                <span>Kemendikbudristek RI · Dapodik Online</span>
              </div>
              <p>Dinas Pendidikan Provinsi DKI Jakarta</p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950 px-4 sm:px-6 lg:px-8 py-6 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© {new Date().getFullYear()} {profile.name}. Hak Cipta Dilindungi Undang-Undang.</p>
          <div className="flex items-center gap-6">
            <span className="hover:text-slate-400 transition-colors">Kebijakan Privasi Data Siswa</span>
            <span>·</span>
            <span className="hover:text-slate-400 transition-colors">Standar Pelayanan Publik</span>
            <span>·</span>
            <span className="hover:text-slate-400 transition-colors">Keterbukaan Informasi Publik</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
