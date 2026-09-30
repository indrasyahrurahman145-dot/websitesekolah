import React, { useState } from 'react';
import { SchoolProvider, useSchool } from './context/SchoolContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { Hero } from './components/public/Hero';
import { PrincipalGreeting } from './components/public/PrincipalGreeting';
import { MajorsAndCurriculum } from './components/public/MajorsAndCurriculum';
import { PPDBSection } from './components/public/PPDBSection';
import { NewsSection } from './components/public/NewsSection';
import { AcademicAgenda } from './components/public/AcademicAgenda';
import { TeacherDirectory } from './components/public/TeacherDirectory';
import { FacilitiesAndGallery } from './components/public/FacilitiesAndGallery';
import { DownloadsSection } from './components/public/DownloadsSection';
import { ContactSection } from './components/public/ContactSection';
import { AdminDashboard } from './components/admin/AdminDashboard';
import { ShieldCheck, ArrowUp } from 'lucide-react';

const SchoolPortalContent: React.FC = () => {
  const { currentView, setCurrentView } = useSchool();
  const [initialSearchQuery, setInitialSearchQuery] = useState('');
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Monitor scroll for back-to-top button
  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleOpenCheckStatus = () => {
    if (currentView === 'admin') {
      setCurrentView('public');
    }
    setTimeout(() => {
      const ppdbEl = document.getElementById('ppdb');
      if (ppdbEl) {
        ppdbEl.scrollIntoView({ behavior: 'smooth' });
        // Set sample query
        setInitialSearchQuery('PPDB-2026-001');
      }
    }, 100);
  };

  const handleNavigateToPPDB = () => {
    if (currentView === 'admin') {
      setCurrentView('public');
    }
    setTimeout(() => {
      const ppdbEl = document.getElementById('ppdb');
      ppdbEl?.scrollIntoView({ behavior: 'smooth' });
    }, 100);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (currentView === 'admin') {
    return <AdminDashboard />;
  }

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 selection:bg-emerald-600 selection:text-white">
      {/* Public Navigation */}
      <Navbar onOpenCheckStatus={handleOpenCheckStatus} />

      {/* Main Public Content */}
      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onOpenCheckStatus={handleOpenCheckStatus}
          onNavigateToPPDB={handleNavigateToPPDB}
        />

        {/* 2. Sambutan Kepala Sekolah & Landasan Filosofis */}
        <PrincipalGreeting />

        {/* 3. Program Peminatan & Kurikulum Merdeka */}
        <MajorsAndCurriculum />

        {/* 4. Layanan PPDB Online 2026/2027 & Cek Status */}
        <PPDBSection
          initialSearchQuery={initialSearchQuery}
          onClearInitialSearch={() => setInitialSearchQuery('')}
        />

        {/* 5. Berita & Pengumuman Sekolah */}
        <NewsSection />

        {/* 6. Kalender Akademik & Agenda Kegiatan */}
        <AcademicAgenda />

        {/* 7. Direktori Guru & Tenaga Kependidikan */}
        <TeacherDirectory />

        {/* 8. Fasilitas Kampus & Galeri Foto */}
        <FacilitiesAndGallery />

        {/* 9. Unduhan Dokumen Resmi & Panduan */}
        <DownloadsSection />

        {/* 10. Kontak, Lokasi & Formulir Aspirasi */}
        <ContactSection />
      </main>

      {/* Public Footer */}
      <Footer />

      {/* Floating Action: Quick Admin Access & Scroll to Top */}
      <div className="fixed bottom-6 right-6 z-40 flex flex-col items-end gap-2">
        {showScrollTop && (
          <button
            onClick={scrollToTop}
            aria-label="Kembali ke atas"
            className="w-10 h-10 rounded-full bg-white text-slate-700 hover:text-emerald-700 shadow-md border border-slate-200 flex items-center justify-center transition-all hover:scale-105 cursor-pointer"
          >
            <ArrowUp className="w-5 h-5" />
          </button>
        )}

        <button
          onClick={() => {
            setCurrentView('admin');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="group flex items-center gap-2 px-4 py-2.5 bg-slate-900 hover:bg-emerald-950 text-white rounded-full shadow-xl border border-slate-700 hover:border-emerald-600 transition-all cursor-pointer text-xs font-semibold"
        >
          <ShieldCheck className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
          <span className="hidden sm:inline">Dasbor Administrator SIMS</span>
          <span className="sm:hidden">SIMS</span>
        </button>
      </div>
    </div>
  );
};

export default function App() {
  return (
    <SchoolProvider>
      <SchoolPortalContent />
    </SchoolProvider>
  );
}
