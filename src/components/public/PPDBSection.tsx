import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  PPDBPathway,
  MajorChoice,
  PPDBApplicant
} from '../../types';
import {
  CheckCircle,
  FileText,
  UserCheck,
  Building,
  GraduationCap,
  Printer,
  Search,
  AlertCircle,
  Clock,
  MapPin,
  Award,
  HeartHandshake,
  RotateCcw
} from 'lucide-react';

interface PPDBSectionProps {
  initialSearchQuery?: string;
  onClearInitialSearch?: () => void;
}

export const PPDBSection: React.FC<PPDBSectionProps> = ({ initialSearchQuery = '', onClearInitialSearch }) => {
  const { profile, applicants, submitApplicant } = useSchool();

  const [activeTab, setActiveTab] = useState<'info' | 'daftar' | 'status'>('info');

  // Registration Form State
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState({
    fullName: '',
    nisn: '',
    nik: '',
    birthPlace: '',
    birthDate: '',
    gender: 'Laki-laki' as 'Laki-laki' | 'Perempuan',
    originSchool: '',
    originSchoolCity: 'Jakarta Selatan',
    parentName: '',
    parentPhone: '',
    parentJob: '',
    email: '',
    address: '',
    pathway: 'Zonasi' as PPDBPathway,
    distanceFromSchoolKm: 1.5,
    chosenMajor: 'MIPA (Matematika & Ilmu Alam)' as MajorChoice,
    secondMajor: 'IPS (Ilmu Pengetahuan Sosial)' as MajorChoice,
    averageScore: 90.0,
    achievementNotes: ''
  });

  const [submittedApplicant, setSubmittedApplicant] = useState<PPDBApplicant | null>(null);

  // Check Status State
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [searchedApplicant, setSearchedApplicant] = useState<PPDBApplicant | null>(null);
  const [searchAttempted, setSearchAttempted] = useState(false);

  // Trigger search if initialSearchQuery is provided from props
  React.useEffect(() => {
    if (initialSearchQuery) {
      setActiveTab('status');
      setSearchQuery(initialSearchQuery);
      handleSearch(initialSearchQuery);
      if (onClearInitialSearch) {
        onClearInitialSearch();
      }
    }
  }, [initialSearchQuery]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'averageScore' || name === 'distanceFromSchoolKm' ? parseFloat(value) || 0 : value
    }));
  };

  const handleNextStep = (e: React.FormEvent) => {
    e.preventDefault();
    if (step < 3) {
      setStep(step + 1);
    } else {
      // Submit registration
      const newApp = submitApplicant({
        ...formData
      });
      setSubmittedApplicant(newApp);
      setStep(4);
    }
  };

  const handleResetForm = () => {
    setSubmittedApplicant(null);
    setStep(1);
    setFormData({
      fullName: '',
      nisn: '',
      nik: '',
      birthPlace: '',
      birthDate: '',
      gender: 'Laki-laki',
      originSchool: '',
      originSchoolCity: 'Jakarta Selatan',
      parentName: '',
      parentPhone: '',
      parentJob: '',
      email: '',
      address: '',
      pathway: 'Zonasi',
      distanceFromSchoolKm: 1.5,
      chosenMajor: 'MIPA (Matematika & Ilmu Alam)',
      secondMajor: 'IPS (Ilmu Pengetahuan Sosial)',
      averageScore: 90.0,
      achievementNotes: ''
    });
  };

  const handleSearch = (queryOverride?: string) => {
    const query = (queryOverride !== undefined ? queryOverride : searchQuery).trim().toLowerCase();
    if (!query) {
      setSearchedApplicant(null);
      setSearchAttempted(false);
      return;
    }

    const found = applicants.find(
      (app) =>
        app.registrationNo.toLowerCase() === query ||
        app.nisn.toLowerCase() === query ||
        app.fullName.toLowerCase().includes(query)
    );

    setSearchedApplicant(found || null);
    setSearchAttempted(true);
  };

  const getStatusBadge = (status: PPDBApplicant['status']) => {
    switch (status) {
      case 'diterima':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
            <CheckCircle className="w-3.5 h-3.5 text-emerald-600" />
            <span>LOLOS SELEKSI (DITERIMA)</span>
          </span>
        );
      case 'diverifikasi':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-blue-100 text-blue-800 border border-blue-300">
            <Clock className="w-3.5 h-3.5 text-blue-600" />
            <span>BERKAS TERVERIFIKASI (PROSES PEMERINGKATAN)</span>
          </span>
        );
      case 'cadangan':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-amber-100 text-amber-800 border border-amber-300">
            <Clock className="w-3.5 h-3.5 text-amber-600" />
            <span>PESERTA CADANGAN / WAITING LIST</span>
          </span>
        );
      case 'ditolak':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-rose-100 text-rose-800 border border-rose-300">
            <AlertCircle className="w-3.5 h-3.5 text-rose-600" />
            <span>TIDAK LOLOS SELEKSI</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold bg-slate-100 text-slate-800 border border-slate-300">
            <Clock className="w-3.5 h-3.5 text-slate-500" />
            <span>MENUNGGU VERIFIKASI BERKAS</span>
          </span>
        );
    }
  };

  return (
    <section id="ppdb" className="py-20 bg-white border-b border-slate-200 scroll-mt-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
              <span>Layanan Penerimaan Terpadu</span>
              <span aria-hidden="true">·</span>
              <span>Tahun Ajaran 2026/2027</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              PPDB Online {profile.shortName}
            </h2>
            <p className="text-sm text-slate-600 mt-1 max-w-xl">
              Pendaftaran resmi daring yang transparan, akuntabel, dan bebas pungutan biaya (0 Rupiah).
            </p>
          </div>

          {/* Interactive Navigation Tabs */}
          <div className="flex items-center gap-1 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            <button
              onClick={() => setActiveTab('info')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'info'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Informasi & Jalur
            </button>
            <button
              onClick={() => setActiveTab('daftar')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'daftar'
                  ? 'bg-emerald-600 text-white shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Formulir Pendaftaran
            </button>
            <button
              onClick={() => setActiveTab('status')}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                activeTab === 'status'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Cek Status Seleksi
            </button>
          </div>
        </div>

        {/* Tab 1: Informasi Jalur & Ketentuan */}
        {activeTab === 'info' && (
          <div className="space-y-10">
            {/* 4 Pathways Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-emerald-100 text-emerald-700 flex items-center justify-center mb-3">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-emerald-700 font-semibold mb-1">KUOTA 50% (180 Siswa)</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Jalur Zonasi</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Berdasarkan jarak radius domisili resmi Kartu Keluarga calon siswa dengan titik koordinat kampus sekolah.
                </p>
                <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
                  Syarat: KK terbit minimal 1 tahun sebelum tanggal pendaftaran.
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                  <Award className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-amber-700 font-semibold mb-1">KUOTA 30% (108 Siswa)</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Jalur Prestasi</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Seleksi berdasarkan akumulasi nilai rapor semester 1-5 dan portofolio prestasi olimpiade sains, olahraga, seni, atau tahfidz.
                </p>
                <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
                  Tingkat: Kota, Provinsi, Nasional, & Internasional.
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-blue-100 text-blue-700 flex items-center justify-center mb-3">
                  <HeartHandshake className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-blue-700 font-semibold mb-1">KUOTA 15% (54 Siswa)</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Jalur Afirmasi</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Dikhususkan bagi keluarga ekonomi tidak mampu pemegang KJP Plus, PIP/KIP, atau terdata resmi dalam DTKS Kemensos.
                </p>
                <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
                  Fasilitas: Bantuan seragam, perlengkapan belajar & bebas biaya komite.
                </div>
              </div>

              <div className="bg-slate-50 border border-slate-200 rounded-xl p-6">
                <div className="w-10 h-10 rounded-lg bg-purple-100 text-purple-700 flex items-center justify-center mb-3">
                  <Building className="w-5 h-5" />
                </div>
                <div className="text-xs font-mono text-purple-700 font-semibold mb-1">KUOTA 5% (18 Siswa)</div>
                <h3 className="text-base font-bold text-slate-900 mb-2">Jalur Mutasi Orang Tua</h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-4">
                  Bagi anak dari aparatur sipil negara, TNI/Polri, BUMN, atau karyawan swasta yang dipindahtugaskan dinas antar daerah.
                </p>
                <div className="text-xs text-slate-500 pt-3 border-t border-slate-200">
                  Syarat: SK Perpindahan tugas instansi maksimal 1 tahun terakhir.
                </div>
              </div>
            </div>

            {/* Steps & Schedule Banner */}
            <div className="bg-slate-900 text-white rounded-2xl p-6 sm:p-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="border-l-2 border-emerald-500 pl-4">
                  <span className="text-xs text-emerald-400 font-mono font-bold">TAHAP 01</span>
                  <h4 className="text-sm font-bold text-white mt-1">Pengisian Daring</h4>
                  <p className="text-xs text-slate-300 mt-1">Mengisi data diri, nilai rapor, dan unggah pindaian dokumen sah.</p>
                  <span className="text-[11px] text-slate-400 mt-2 block font-mono">1 – 15 Okt 2026</span>
                </div>

                <div className="border-l-2 border-emerald-500 pl-4">
                  <span className="text-xs text-emerald-400 font-mono font-bold">TAHAP 02</span>
                  <h4 className="text-sm font-bold text-white mt-1">Verifikasi Berkas</h4>
                  <p className="text-xs text-slate-300 mt-1">Pemeriksaan keabsahan dokumen oleh tim verifikator panitia sekolah.</p>
                  <span className="text-[11px] text-slate-400 mt-2 block font-mono">16 – 19 Okt 2026</span>
                </div>

                <div className="border-l-2 border-emerald-500 pl-4">
                  <span className="text-xs text-emerald-400 font-mono font-bold">TAHAP 03</span>
                  <h4 className="text-sm font-bold text-white mt-1">Pengumuman Hasil</h4>
                  <p className="text-xs text-slate-300 mt-1">Publikasi hasil pemeringkatan resmi di portal ini secara real-time.</p>
                  <span className="text-[11px] text-slate-400 mt-2 block font-mono">22 Okt 2026</span>
                </div>

                <div className="border-l-2 border-emerald-500 pl-4">
                  <span className="text-xs text-emerald-400 font-mono font-bold">TAHAP 04</span>
                  <h4 className="text-sm font-bold text-white mt-1">Lapor Diri / Ulang</h4>
                  <p className="text-xs text-slate-300 mt-1">Penyerahan berkas fisik asli dan pengukuran kelengkapan seragam sekolah.</p>
                  <span className="text-[11px] text-slate-400 mt-2 block font-mono">23 – 25 Okt 2026</span>
                </div>
              </div>

              <div className="mt-8 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4">
                <div className="text-xs text-slate-300">
                  Butuh bantuan pengisian atau panduan teknis? Hubungi Sekretariat PPDB di <strong className="text-white">{profile.phone}</strong> atau WhatsApp Helpdesk <strong className="text-emerald-400">{profile.whatsapp}</strong>.
                </div>
                <button
                  onClick={() => setActiveTab('daftar')}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer"
                >
                  Mulai Formulir Sekarang
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Formulir Pendaftaran Online */}
        {activeTab === 'daftar' && (
          <div className="max-w-3xl mx-auto">
            {submittedApplicant && step === 4 ? (
              /* Success & Official Proof Card */
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-4 flex items-center gap-3 text-emerald-900 text-xs sm:text-sm">
                  <CheckCircle className="w-5 h-5 text-emerald-700 shrink-0" />
                  <div>
                    <strong>Pendaftaran Berhasil Dikirimkan!</strong> Simpan atau cetak Kartu Tanda Bukti Pendaftaran berikut sebagai dokumen resmi untuk verifikasi.
                  </div>
                </div>

                {/* Printable Official Proof Card */}
                <div id="print-area" className="bg-white border-2 border-slate-800 rounded-2xl p-6 sm:p-8 shadow-sm">
                  <div className="border-b-2 border-slate-800 pb-4 mb-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-slate-900 text-white rounded-xl flex items-center justify-center">
                          <GraduationCap className="w-7 h-7" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold text-slate-900 uppercase tracking-tight">{profile.name}</h3>
                          <p className="text-xs text-slate-600">Panitia Penerimaan Peserta Didik Baru (PPDB) TA 2026/2027</p>
                          <p className="text-[11px] text-slate-500">{profile.address}, {profile.city} · NPSN: {profile.npsn}</p>
                        </div>
                      </div>
                      <div className="text-right hidden sm:block">
                        <div className="text-[10px] text-slate-500 uppercase tracking-wider font-mono">Lembar Bukti Registrasi</div>
                        <div className="text-xs font-mono font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 mt-1">
                          ONLINE VERIFIED
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center py-2 bg-slate-100 rounded-lg mb-6 border border-slate-200">
                    <span className="text-xs font-semibold text-slate-600 uppercase tracking-wider block">KARTU TANDA BUKTI PENDAFTARAN PPDB</span>
                    <span className="text-xl font-mono font-bold text-slate-900 tracking-wider">
                      {submittedApplicant.registrationNo}
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                    <div className="space-y-2">
                      <div>
                        <span className="text-slate-500 block">Nama Calon Siswa:</span>
                        <strong className="text-slate-900 text-sm">{submittedApplicant.fullName}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">NISN / NIK:</span>
                        <span className="font-mono text-slate-800">{submittedApplicant.nisn} / {submittedApplicant.nik}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Tempat, Tanggal Lahir:</span>
                        <span className="text-slate-800">{submittedApplicant.birthPlace}, {submittedApplicant.birthDate}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Jenis Kelamin:</span>
                        <span className="text-slate-800">{submittedApplicant.gender}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Asal Sekolah:</span>
                        <strong className="text-slate-800">{submittedApplicant.originSchool} ({submittedApplicant.originSchoolCity})</strong>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div>
                        <span className="text-slate-500 block">Jalur Seleksi:</span>
                        <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded font-semibold text-slate-800">
                          {submittedApplicant.pathway}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Peminatan Pilihan 1:</span>
                        <strong className="text-emerald-700">{submittedApplicant.chosenMajor}</strong>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Peminatan Pilihan 2:</span>
                        <span className="text-slate-700">{submittedApplicant.secondMajor}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Nilai Rapor Rata-rata:</span>
                        <span className="font-mono font-bold text-slate-900">{submittedApplicant.averageScore.toFixed(1)}</span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Waktu Submit:</span>
                        <span className="font-mono text-slate-600">{submittedApplicant.submittedAt} WIB</span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
                    <div className="text-slate-500 text-[11px] leading-relaxed">
                      * Harap cetak bukti pendaftaran ini dan bawa bersama berkas pindaian asli saat verifikasi faktual.<br />
                      * Pantau pengumuman status secara berkala melalui menu "Cek Status Seleksi" menggunakan No. Registrasi di atas.
                    </div>
                    {/* Simulated barcode */}
                    <div className="text-center font-mono text-[10px] text-slate-600 bg-slate-50 p-2 rounded border border-slate-200 shrink-0">
                      <div className="tracking-[4px] font-bold text-slate-900">||| | |||| | ||| || ||||</div>
                      <span>{submittedApplicant.registrationNo}</span>
                    </div>
                  </div>
                </div>

                {/* Print & Action Buttons */}
                <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                  <button
                    onClick={() => window.print()}
                    className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer"
                  >
                    <Printer className="w-4 h-4" />
                    <span>Cetak / Simpan Kartu PDF</span>
                  </button>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => {
                        setSearchQuery(submittedApplicant.registrationNo);
                        handleSearch(submittedApplicant.registrationNo);
                        setActiveTab('status');
                      }}
                      className="px-4 py-2.5 bg-emerald-50 hover:bg-emerald-100 text-emerald-800 border border-emerald-200 rounded-lg text-xs font-semibold transition-all cursor-pointer"
                    >
                      Cek Status Registrasi Ini
                    </button>
                    <button
                      onClick={handleResetForm}
                      className="px-4 py-2.5 bg-white hover:bg-slate-50 text-slate-700 border border-slate-300 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Daftar Siswa Baru Lain</span>
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              /* Step-by-Step Registration Form */
              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
                {/* Step indicator */}
                <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-200">
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 1 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      1
                    </div>
                    <span className={`text-xs font-medium ${step >= 1 ? 'text-slate-900' : 'text-slate-400'}`}>
                      Data Pribadi
                    </span>
                  </div>
                  <span className="text-slate-300">——</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 2 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      2
                    </div>
                    <span className={`text-xs font-medium ${step >= 2 ? 'text-slate-900' : 'text-slate-400'}`}>
                      Kontak & Orang Tua
                    </span>
                  </div>
                  <span className="text-slate-300">——</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold ${step >= 3 ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'}`}>
                      3
                    </div>
                    <span className={`text-xs font-medium ${step >= 3 ? 'text-slate-900' : 'text-slate-400'}`}>
                      Jalur & Jurusan
                    </span>
                  </div>
                </div>

                <form onSubmit={handleNextStep} className="space-y-6">
                  {/* Step 1: Data Diri */}
                  {step === 1 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <FileText className="w-4 h-4 text-emerald-600" />
                        <span>Langkah 1: Data Identitas Calon Siswa</span>
                      </h3>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Nama Lengkap Calon Siswa (Sesuai Ijazah SMP/Akta) *
                        </label>
                        <input
                          type="text"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          placeholder="Contoh: Muhammad Rizky Pratama"
                          className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                        />
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            NISN (10 Digit Angka) *
                          </label>
                          <input
                            type="text"
                            name="nisn"
                            required
                            maxLength={10}
                            value={formData.nisn}
                            onChange={handleInputChange}
                            placeholder="Contoh: 0089123456"
                            className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            NIK (Sesuai Kartu Keluarga, 16 Digit) *
                          </label>
                          <input
                            type="text"
                            name="nik"
                            required
                            maxLength={16}
                            value={formData.nik}
                            onChange={handleInputChange}
                            placeholder="Contoh: 3174051203090001"
                            className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Tempat Lahir *
                          </label>
                          <input
                            type="text"
                            name="birthPlace"
                            required
                            value={formData.birthPlace}
                            onChange={handleInputChange}
                            placeholder="Contoh: Jakarta"
                            className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Tanggal Lahir *
                          </label>
                          <input
                            type="date"
                            name="birthDate"
                            required
                            value={formData.birthDate}
                            onChange={handleInputChange}
                            className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Jenis Kelamin *
                          </label>
                          <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            <option value="Laki-laki">Laki-laki</option>
                            <option value="Perempuan">Perempuan</option>
                          </select>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Asal Sekolah (SMP/MTs) *
                          </label>
                          <input
                            type="text"
                            name="originSchool"
                            required
                            value={formData.originSchool}
                            onChange={handleInputChange}
                            placeholder="Contoh: SMP Negeri 41 Jakarta"
                            className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Kabupaten/Kota Asal Sekolah *
                          </label>
                          <input
                            type="text"
                            name="originSchoolCity"
                            required
                            value={formData.originSchoolCity}
                            onChange={handleInputChange}
                            placeholder="Contoh: Kota Jakarta Selatan"
                            className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Kontak & Orang Tua */}
                  {step === 2 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <UserCheck className="w-4 h-4 text-emerald-600" />
                        <span>Langkah 2: Data Orang Tua / Wali & Kontak</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Nama Lengkap Orang Tua / Wali *
                          </label>
                          <input
                            type="text"
                            name="parentName"
                            required
                            value={formData.parentName}
                            onChange={handleInputChange}
                            placeholder="Contoh: Budi Santoso"
                            className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Pekerjaan Orang Tua / Wali *
                          </label>
                          <input
                            type="text"
                            name="parentJob"
                            required
                            value={formData.parentJob}
                            onChange={handleInputChange}
                            placeholder="Contoh: PNS / Wiraswasta / Karyawan"
                            className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Nomor WhatsApp / HP Orang Tua (Aktif) *
                          </label>
                          <input
                            type="tel"
                            name="parentPhone"
                            required
                            value={formData.parentPhone}
                            onChange={handleInputChange}
                            placeholder="Contoh: 081287654321"
                            className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Alamat Email (Untuk Pemberitahuan) *
                          </label>
                          <input
                            type="email"
                            name="email"
                            required
                            value={formData.email}
                            onChange={handleInputChange}
                            placeholder="Contoh: orangtua@gmail.com"
                            className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Alamat Domisili Lengkap Sesuai KK *
                        </label>
                        <textarea
                          name="address"
                          required
                          rows={2}
                          value={formData.address}
                          onChange={handleInputChange}
                          placeholder="Jalan, No Rumah, RT/RW, Kelurahan, Kecamatan, Kota"
                          className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Perkiraan Jarak Rumah ke Kampus Sekolah (KM) *
                        </label>
                        <input
                          type="number"
                          step="0.1"
                          name="distanceFromSchoolKm"
                          required
                          value={formData.distanceFromSchoolKm}
                          onChange={handleInputChange}
                          className="w-full sm:w-48 text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                        />
                        <span className="text-[11px] text-slate-500 mt-1 block">
                          Untuk jalur zonasi, radius dihitung berdasarkan alamat di Kartu Keluarga.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Jalur & Pilihan Jurusan */}
                  {step === 3 && (
                    <div className="space-y-4 animate-in fade-in duration-200">
                      <h3 className="text-sm font-bold text-slate-900 uppercase tracking-wider flex items-center gap-2">
                        <GraduationCap className="w-4 h-4 text-emerald-600" />
                        <span>Langkah 3: Jalur Seleksi & Pilihan Peminatan</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Pilih Jalur Pendaftaran *
                          </label>
                          <select
                            name="pathway"
                            value={formData.pathway}
                            onChange={handleInputChange}
                            className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            <option value="Zonasi">Jalur Zonasi (Domisili)</option>
                            <option value="Prestasi">Jalur Prestasi (Nilai & Piagam)</option>
                            <option value="Afirmasi">Jalur Afirmasi (KJP/PIP/DTKS)</option>
                            <option value="Mutasi Orang Tua">Jalur Mutasi Tugas Orang Tua</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Rata-rata Nilai Rapor Semester 1-5 *
                          </label>
                          <input
                            type="number"
                            step="0.1"
                            max="100"
                            min="0"
                            name="averageScore"
                            required
                            value={formData.averageScore}
                            onChange={handleInputChange}
                            placeholder="Contoh: 91.5"
                            className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Peminatan Pilihan Pertama (Prioritas 1) *
                          </label>
                          <select
                            name="chosenMajor"
                            value={formData.chosenMajor}
                            onChange={handleInputChange}
                            className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            <option value="MIPA (Matematika & Ilmu Alam)">MIPA (Matematika & Ilmu Alam)</option>
                            <option value="IPS (Ilmu Pengetahuan Sosial)">IPS (Ilmu Pengetahuan Sosial)</option>
                            <option value="IBB (Ilmu Bahasa & Budaya)">IBB (Ilmu Bahasa & Budaya)</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-700 mb-1">
                            Peminatan Pilihan Kedua (Prioritas 2) *
                          </label>
                          <select
                            name="secondMajor"
                            value={formData.secondMajor}
                            onChange={handleInputChange}
                            className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                          >
                            <option value="IPS (Ilmu Pengetahuan Sosial)">IPS (Ilmu Pengetahuan Sosial)</option>
                            <option value="MIPA (Matematika & Ilmu Alam)">MIPA (Matematika & Ilmu Alam)</option>
                            <option value="IBB (Ilmu Bahasa & Budaya)">IBB (Ilmu Bahasa & Budaya)</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-slate-700 mb-1">
                          Catatan Piagam / Prestasi / Dokumen Tambahan (Opsional)
                        </label>
                        <textarea
                          name="achievementNotes"
                          rows={2}
                          value={formData.achievementNotes}
                          onChange={handleInputChange}
                          placeholder="Sebutkan juara lomba/olimpiade atau no. KJP/PIP jika mendaftar jalur afirmasi/prestasi..."
                          className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                        />
                      </div>

                      <div className="bg-slate-50 border border-slate-200 rounded-lg p-3 text-[11px] text-slate-600 leading-relaxed">
                        Dengan menekan tombol <strong>Kirim Pendaftaran Resmi</strong>, saya menyatakan bahwa seluruh data yang diisi adalah benar dan sah sesuai dokumen negara asli.
                      </div>
                    </div>
                  )}

                  {/* Form Step Buttons */}
                  <div className="pt-6 border-t border-slate-200 flex items-center justify-between">
                    {step > 1 ? (
                      <button
                        type="button"
                        onClick={() => setStep(step - 1)}
                        className="px-4 py-2 text-xs font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
                      >
                        Kembali
                      </button>
                    ) : (
                      <div />
                    )}

                    <button
                      type="submit"
                      className="px-6 py-2.5 text-xs font-semibold text-white bg-emerald-600 hover:bg-emerald-700 active:scale-95 rounded-lg shadow-sm transition-all cursor-pointer"
                    >
                      {step === 3 ? 'Kirim Pendaftaran Resmi' : 'Lanjutkan Langkah Berikutnya'}
                    </button>
                  </div>
                </form>
              </div>
            )}
          </div>
        )}

        {/* Tab 3: Cek Status Seleksi PPDB */}
        {activeTab === 'status' && (
          <div className="max-w-2xl mx-auto space-y-8">
            <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8">
              <h3 className="text-base font-bold text-slate-900 mb-2">
                Pencarian Status Verifikasi & Hasil Seleksi
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Masukkan <strong>Nomor Registrasi PPDB</strong> (contoh: <code className="font-mono text-emerald-700">PPDB-2026-001</code>), <strong>NISN</strong>, atau <strong>Nama Lengkap</strong> yang telah didaftarkan.
              </p>

              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    placeholder="Masukkan Nomor Registrasi / NISN..."
                    className="w-full text-xs pl-10 pr-4 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 font-mono"
                  />
                </div>
                <button
                  onClick={() => handleSearch()}
                  className="px-5 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer shrink-0"
                >
                  Cari Data
                </button>
              </div>

              {/* Quick sample chips for effortless evaluation */}
              <div className="mt-4 pt-4 border-t border-slate-100">
                <div className="text-[11px] text-slate-500 mb-2 font-medium">Contoh Data Registrasi Cepat:</div>
                <div className="flex flex-wrap gap-1.5">
                  {applicants.slice(0, 4).map((app) => (
                    <button
                      key={app.id}
                      onClick={() => {
                        setSearchQuery(app.registrationNo);
                        handleSearch(app.registrationNo);
                      }}
                      className="text-[11px] px-2.5 py-1 bg-slate-100 hover:bg-emerald-50 hover:text-emerald-800 text-slate-700 rounded-md border border-slate-200 transition-colors font-mono cursor-pointer"
                    >
                      {app.registrationNo} ({app.fullName.split(' ')[0]})
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Search Results Display */}
            {searchAttempted && searchedApplicant && (
              <div className="bg-white border-2 border-emerald-500 rounded-2xl p-6 sm:p-8 shadow-sm animate-in fade-in duration-200">
                <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-200">
                  <div>
                    <span className="text-[11px] font-mono text-slate-500 block">NOMOR REGISTRASI:</span>
                    <span className="text-lg font-mono font-bold text-slate-900">{searchedApplicant.registrationNo}</span>
                  </div>
                  <div>{getStatusBadge(searchedApplicant.status)}</div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <span className="text-slate-500 block">Nama Lengkap:</span>
                    <strong className="text-slate-900 text-sm">{searchedApplicant.fullName}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">NISN / Asal Sekolah:</span>
                    <span className="text-slate-800">{searchedApplicant.nisn} · {searchedApplicant.originSchool}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Jalur Seleksi:</span>
                    <span className="text-slate-800 font-semibold">{searchedApplicant.pathway}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Peminatan Diterima / Pilihan:</span>
                    <strong className="text-emerald-700">{searchedApplicant.chosenMajor}</strong>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Rata-rata Nilai Rapor:</span>
                    <span className="font-mono font-bold text-slate-900">{searchedApplicant.averageScore.toFixed(1)}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block">Tanggal Pengajuan:</span>
                    <span className="text-slate-700 font-mono">{searchedApplicant.submittedAt} WIB</span>
                  </div>
                </div>

                {/* Admin Verification Notes */}
                <div className="mt-5 p-4 bg-slate-50 border border-slate-200 rounded-xl">
                  <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block mb-1">
                    Catatan Resmi Tim Panitia PPDB:
                  </span>
                  <p className="text-xs text-slate-700 leading-relaxed">
                    {searchedApplicant.adminNotes || 'Dokumen sedang dalam proses sinkronisasi dan verifikasi administratif.'}
                  </p>
                  {searchedApplicant.verifiedAt && (
                    <span className="text-[10px] text-slate-400 font-mono mt-2 block">
                      Diverifikasi pada: {searchedApplicant.verifiedAt} WIB
                    </span>
                  )}
                </div>

                {searchedApplicant.status === 'diterima' && (
                  <div className="mt-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-900 flex items-center justify-between gap-3">
                    <span>
                      Selamat! Anda dinyatakan Lolos Seleksi. Harap hadir saat proses Lapor Diri membawa berkas fisik asli.
                    </span>
                    <button
                      onClick={() => {
                        setSubmittedApplicant(searchedApplicant);
                        setStep(4);
                        setActiveTab('daftar');
                      }}
                      className="px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded text-xs font-semibold whitespace-nowrap cursor-pointer"
                    >
                      Buka Kartu Bukti
                    </button>
                  </div>
                )}
              </div>
            )}

            {searchAttempted && !searchedApplicant && (
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-6 text-center text-xs text-rose-800">
                <AlertCircle className="w-8 h-8 text-rose-500 mx-auto mb-2" />
                <strong className="block text-sm">Data Registrasi Tidak Ditemukan</strong>
                <p className="mt-1 text-slate-600">
                  Pastikan Nomor Registrasi atau NISN yang Anda masukkan sudah benar. Jika baru saja mendaftar, mohon tunggu beberapa saat.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};
