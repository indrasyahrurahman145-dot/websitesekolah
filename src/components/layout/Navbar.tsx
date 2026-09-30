import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  GraduationCap,
  Menu,
  X,
  ShieldCheck,
  UserCheck,
  FileSearch,
  ExternalLink
} from 'lucide-react';

interface NavbarProps {
  onOpenCheckStatus: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenCheckStatus }) => {
  const { profile, isAdminLoggedIn, currentView, setCurrentView } = useSchool();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { label: 'Beranda', href: '#beranda' },
    { label: 'Profil', href: '#profil' },
    { label: 'Kurikulum', href: '#kurikulum' },
    { label: 'PPDB Online', href: '#ppdb' },
    { label: 'Berita', href: '#berita' },
    { label: 'Agenda', href: '#agenda' },
    { label: 'Guru & Staf', href: '#guru' },
    { label: 'Fasilitas', href: '#fasilitas' },
    { label: 'Kontak', href: '#kontak' }
  ];

  const handleNavClick = (href: string) => {
    setMobileMenuOpen(false);
    if (currentView === 'admin') {
      setCurrentView('public');
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Banner Notice */}
      <div className="bg-slate-900 text-slate-300 text-xs py-2 px-4 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span className="font-medium text-slate-200">PPDB TA 2026/2027:</span>
            <span>Pendaftaran Daring Tahap 1 Telah Dibuka Resmi</span>
            <span className="hidden sm:inline text-slate-500">|</span>
            <span className="hidden sm:inline text-slate-400">NPSN: {profile.npsn} · Akreditasi {profile.accreditation}</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <button
              onClick={onOpenCheckStatus}
              className="text-emerald-400 hover:text-emerald-300 transition-colors flex items-center gap-1 font-medium cursor-pointer"
            >
              <FileSearch className="w-3.5 h-3.5" />
              <span>Cek Status PPDB</span>
            </button>
            <span className="text-slate-600">|</span>
            <button
              onClick={() => setCurrentView(currentView === 'admin' ? 'public' : 'admin')}
              className={`flex items-center gap-1 transition-colors cursor-pointer font-medium ${
                isAdminLoggedIn
                  ? 'text-amber-400 hover:text-amber-300'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {isAdminLoggedIn ? (
                <>
                  <UserCheck className="w-3.5 h-3.5" />
                  <span>Dashboard Admin (Aktif)</span>
                </>
              ) : (
                <>
                  <ShieldCheck className="w-3.5 h-3.5" />
                  <span>Login Administrator</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Navbar: Top Bar Contract */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/80 transition-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Zone 1: Single text element Brand Zone */}
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 text-white flex items-center justify-center shadow-sm shrink-0">
              <GraduationCap className="w-6 h-6" />
            </div>
            <a
              href="#beranda"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('#beranda');
              }}
              className="group flex flex-col text-left cursor-pointer"
            >
              <span className="text-lg font-bold tracking-tight text-slate-900 group-hover:text-emerald-700 transition-colors">
                {profile.shortName}
              </span>
              <span className="text-xs text-slate-500 font-medium tracking-wide">
                Smart & Character-Driven School
              </span>
            </a>
          </div>

          {/* Zone 2: 4-6 Clean text navigation links */}
          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-slate-600">
            {navLinks.slice(0, 7).map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className="hover:text-emerald-700 hover:underline underline-offset-8 decoration-2 decoration-emerald-600 transition-colors cursor-pointer"
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Zone 3: 1-2 Primary actions */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => handleNavClick('#ppdb')}
              className="px-4 py-2 text-xs font-semibold text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 active:scale-95 transition-all shadow-sm whitespace-nowrap cursor-pointer"
            >
              Daftar PPDB Online
            </button>
            <button
              onClick={() => setCurrentView(currentView === 'admin' ? 'public' : 'admin')}
              className={`px-3 py-2 text-xs font-medium border rounded-lg transition-colors whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                currentView === 'admin'
                  ? 'bg-slate-900 text-white border-slate-900 hover:bg-slate-800'
                  : 'bg-white text-slate-700 border-slate-300 hover:border-slate-400 hover:bg-slate-50'
              }`}
            >
              <span>{currentView === 'admin' ? 'Kembali ke Web' : 'Portal SIMS'}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Mobile hamburger */}
          <div className="flex sm:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              aria-label="Buka Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu dropdown */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-slate-200 bg-white px-4 pt-3 pb-6 shadow-lg animate-in slide-in-from-top duration-200">
            <div className="flex flex-col gap-2">
              {navLinks.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className="px-3 py-2 text-sm font-medium text-slate-700 hover:bg-emerald-50 hover:text-emerald-700 rounded-md transition-colors"
                >
                  {item.label}
                </a>
              ))}
              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenCheckStatus();
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-emerald-700 bg-emerald-50 rounded-md flex items-center justify-between"
                >
                  <span>Cek Status Seleksi PPDB</span>
                  <FileSearch className="w-4 h-4" />
                </button>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setCurrentView(currentView === 'admin' ? 'public' : 'admin');
                  }}
                  className="w-full text-left px-3 py-2 text-sm font-medium text-white bg-slate-900 rounded-md flex items-center justify-between"
                >
                  <span>{currentView === 'admin' ? 'Buka Halaman Web Publik' : 'Buka Dashboard Administrator'}</span>
                  <ShieldCheck className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </header>
    </>
  );
};
