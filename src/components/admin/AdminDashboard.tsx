import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import {
  PPDBApplicant,
  NewsItem,
  Teacher,
  AcademicEvent,
  GalleryItem,
  PPDBStatus
} from '../../types';
import {
  GraduationCap,
  LayoutDashboard,
  Users,
  Newspaper,
  Calendar,
  Image,
  Inbox,
  Settings,
  LogOut,
  ExternalLink,
  Search,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  Clock,
  AlertCircle,
  FileSpreadsheet,
  Printer,
  ChevronRight,
  Eye,
  Send,
  Save,
  RotateCcw,
  Sparkles,
  Lock,
  ArrowLeft
} from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const {
    profile,
    news,
    applicants,
    teachers,
    events,
    gallery,
    messages,
    isAdminLoggedIn,
    adminUser,
    loginAdmin,
    logoutAdmin,
    setCurrentView,
    updateProfile,
    addNews,
    updateNews,
    deleteNews,
    updateApplicantStatus,
    deleteApplicant,
    addTeacher,
    updateTeacher,
    deleteTeacher,
    addEvent,
    deleteEvent,
    addGalleryItem,
    deleteGalleryItem,
    replyMessage,
    markMessageRead,
    deleteMessage,
    resetToDefaults
  } = useSchool();

  // Active Menu
  const [activeTab, setActiveTab] = useState<
    'overview' | 'ppdb' | 'news' | 'teachers' | 'events' | 'gallery' | 'inbox' | 'settings'
  >('overview');

  // Login form state
  const [loginEmail, setLoginEmail] = useState('admin@sman1nusantara.sch.id');
  const [loginPassword, setLoginPassword] = useState('admin123');

  // Modals state
  const [selectedApplicant, setSelectedApplicant] = useState<PPDBApplicant | null>(null);
  const [applicantStatusToUpdate, setApplicantStatusToUpdate] = useState<PPDBStatus>('diterima');
  const [applicantAdminNote, setApplicantAdminNote] = useState('');

  // News modal state
  const [showNewsModal, setShowNewsModal] = useState(false);
  const [editingNews, setEditingNews] = useState<NewsItem | null>(null);
  const [newsForm, setNewsForm] = useState({
    title: '',
    category: 'Akademik' as NewsItem['category'],
    excerpt: '',
    content: '',
    author: 'Tim Humas SMAN 1 Nusantara',
    authorRole: 'Humas Sekolah',
    image: '',
    published: true
  });

  // Teacher modal state
  const [showTeacherModal, setShowTeacherModal] = useState(false);
  const [editingTeacher, setEditingTeacher] = useState<Teacher | null>(null);
  const [teacherForm, setTeacherForm] = useState({
    name: '',
    nip: '',
    role: '',
    subjectsStr: '',
    education: '',
    photo: '',
    email: '',
    phone: '',
    status: 'PNS' as Teacher['status'],
    quote: ''
  });

  // Event modal state
  const [showEventModal, setShowEventModal] = useState(false);
  const [eventForm, setEventForm] = useState({
    title: '',
    category: 'Kegiatan' as AcademicEvent['category'],
    startDate: '',
    endDate: '',
    location: '',
    description: '',
    targetAudience: 'Seluruh Siswa & Dewan Guru'
  });

  // Gallery modal state
  const [showGalleryModal, setShowGalleryModal] = useState(false);
  const [galleryForm, setGalleryForm] = useState({
    title: '',
    category: 'Fasilitas' as GalleryItem['category'],
    imageUrl: '',
    date: 'Oktober 2026',
    description: ''
  });

  // Reply message modal
  const [replyingMessage, setReplyingMessage] = useState<any | null>(null);
  const [replyText, setReplyText] = useState('');

  // Settings form state
  const [settingsForm, setSettingsForm] = useState({ ...profile });
  const [settingsSavedToast, setSettingsSavedToast] = useState(false);

  // PPDB filtering
  const [ppdbSearch, setPpdbSearch] = useState('');
  const [ppdbFilterStatus, setPpdbFilterStatus] = useState<string>('all');
  const [ppdbFilterPathway, setPpdbFilterPathway] = useState<string>('all');

  // Handle Login
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginAdmin(loginEmail, loginPassword);
  };

  // If not logged in, show Login Screen
  if (!isAdminLoggedIn) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-8 shadow-2xl border border-slate-200">
          <div className="text-center mb-8">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-600 to-teal-800 text-white rounded-2xl flex items-center justify-center mx-auto shadow-md mb-4">
              <GraduationCap className="w-8 h-8" />
            </div>
            <h1 className="text-xl font-bold text-slate-900 tracking-tight">
              Portal SIMS Administrator
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              Sistem Informasi Manajemen Terpadu {profile.shortName}
            </p>
          </div>

          <form onSubmit={handleLoginSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Alamat Email Administrator
              </label>
              <input
                type="email"
                required
                value={loginEmail}
                onChange={(e) => setLoginEmail(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Kata Sandi (Password)
              </label>
              <input
                type="password"
                required
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold transition-all cursor-pointer shadow-sm flex items-center justify-center gap-2"
            >
              <Lock className="w-3.5 h-3.5" />
              <span>Masuk ke Dashboard</span>
            </button>
          </form>

          {/* Quick Demo Login button */}
          <div className="mt-6 pt-6 border-t border-slate-200 space-y-3">
            <button
              onClick={() => loginAdmin('admin@sman1nusantara.sch.id', 'demo')}
              className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg text-xs font-semibold transition-colors flex items-center justify-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              <span>Masuk Cepat Demo (1-Click Login)</span>
            </button>

            <button
              onClick={() => setCurrentView('public')}
              className="w-full text-center text-xs text-slate-500 hover:text-slate-800 transition-colors flex items-center justify-center gap-1 cursor-pointer"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Kembali ke Website Publik</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Filtered applicants
  const filteredApplicants = applicants.filter((app) => {
    const q = ppdbSearch.toLowerCase();
    const matchesSearch =
      app.fullName.toLowerCase().includes(q) ||
      app.registrationNo.toLowerCase().includes(q) ||
      app.nisn.toLowerCase().includes(q) ||
      app.originSchool.toLowerCase().includes(q);
    const matchesStatus = ppdbFilterStatus === 'all' || app.status === ppdbFilterStatus;
    const matchesPathway = ppdbFilterPathway === 'all' || app.pathway === ppdbFilterPathway;
    return matchesSearch && matchesStatus && matchesPathway;
  });

  // Export PPDB to CSV
  const handleExportCSV = () => {
    const headers = ['No Registrasi', 'Nama Lengkap', 'NISN', 'Jalur', 'Pilihan 1', 'Nilai Rata-rata', 'Status', 'Asal Sekolah', 'No HP'];
    const rows = applicants.map((a) => [
      a.registrationNo,
      `"${a.fullName}"`,
      a.nisn,
      a.pathway,
      `"${a.chosenMajor}"`,
      a.averageScore,
      a.status,
      `"${a.originSchool}"`,
      a.parentPhone
    ]);
    const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `rekap_ppdb_${profile.shortName.toLowerCase().replace(/ /g, '_')}_2026.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Status Badge helper
  const renderStatusBadge = (status: PPDBStatus) => {
    switch (status) {
      case 'diterima':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-emerald-100 text-emerald-800">
            <CheckCircle className="w-3 h-3 text-emerald-600" />
            <span>Diterima</span>
          </span>
        );
      case 'diverifikasi':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-blue-100 text-blue-800">
            <Clock className="w-3 h-3 text-blue-600" />
            <span>Diverifikasi</span>
          </span>
        );
      case 'cadangan':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-amber-100 text-amber-800">
            <Clock className="w-3 h-3 text-amber-600" />
            <span>Cadangan</span>
          </span>
        );
      case 'ditolak':
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-rose-100 text-rose-800">
            <AlertCircle className="w-3 h-3 text-rose-600" />
            <span>Ditolak</span>
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded text-[11px] font-semibold bg-slate-100 text-slate-700">
            <Clock className="w-3 h-3 text-slate-500" />
            <span>Menunggu</span>
          </span>
        );
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30 px-4 sm:px-6 h-16 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg bg-emerald-700 text-white flex items-center justify-center">
            <GraduationCap className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold font-mono text-emerald-800">SIMS v2.4</span>
              <span className="text-slate-300">/</span>
              <span className="text-xs font-semibold text-slate-900">{profile.shortName}</span>
            </div>
            <div className="text-[11px] text-slate-500">Dasbor Administrator Terpadu</div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => setCurrentView('public')}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>Lihat Website Publik</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>

          <button
            onClick={resetToDefaults}
            title="Reset Data ke Default"
            className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded-lg transition-colors cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <div className="h-5 w-[1px] bg-slate-200" />

          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold text-xs">
              AD
            </div>
            <div className="hidden sm:block text-left text-xs">
              <div className="font-semibold text-slate-900">{adminUser?.name || 'Administrator'}</div>
              <div className="text-[10px] text-slate-500">Super Admin SIMS</div>
            </div>
          </div>

          <button
            onClick={logoutAdmin}
            className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors cursor-pointer ml-1"
            title="Keluar / Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Layout: Sidebar + Main Content Viewport */}
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <aside className="w-64 bg-slate-900 text-slate-300 border-r border-slate-800 flex flex-col shrink-0">
          <div className="p-4 space-y-1">
            <div className="text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
              Menu Utama
            </div>

            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>Ringkasan Dasbor</span>
            </button>

            <button
              onClick={() => setActiveTab('ppdb')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'ppdb'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Users className="w-4 h-4" />
                <span>Pendaftar PPDB</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                {applicants.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('news')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'news'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Newspaper className="w-4 h-4" />
                <span>Warta & Berita</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                {news.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('teachers')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'teachers'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="w-4 h-4" />
                <span>Data Guru & Staf</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                {teachers.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('events')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'events'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Calendar className="w-4 h-4" />
                <span>Agenda Akademik</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                {events.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('gallery')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'gallery'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Image className="w-4 h-4" />
                <span>Galeri & Foto</span>
              </div>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                {gallery.length}
              </span>
            </button>

            <button
              onClick={() => setActiveTab('inbox')}
              className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'inbox'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <div className="flex items-center gap-3">
                <Inbox className="w-4 h-4" />
                <span>Kotak Pesan Publik</span>
              </div>
              {messages.filter((m) => m.status === 'belum_dibaca').length > 0 && (
                <span className="font-mono text-[10px] px-1.5 py-0.2 bg-emerald-500 text-white rounded font-bold">
                  {messages.filter((m) => m.status === 'belum_dibaca').length}
                </span>
              )}
            </button>

            <div className="pt-4 mt-4 border-t border-slate-800 text-[10px] font-bold text-slate-500 uppercase tracking-wider px-3 mb-2">
              Sistem
            </div>

            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
                activeTab === 'settings'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              <Settings className="w-4 h-4" />
              <span>Pengaturan Sekolah</span>
            </button>
          </div>

          <div className="mt-auto p-4 border-t border-slate-800 text-[11px] text-slate-500">
            <div>NPSN: <span className="font-mono text-slate-400">{profile.npsn}</span></div>
            <div>Akreditasi: <span className="text-slate-400">{profile.accreditation}</span></div>
          </div>
        </aside>

        {/* Content Viewport */}
        <main className="flex-1 overflow-y-auto p-6 sm:p-8">
          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-8 max-w-7xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Ringkasan Operasional Sekolah
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pantauan berkala calon siswa PPDB, artikel warta, direktori guru, dan pesan masuk.
                </p>
              </div>

              {/* 4 Primary Metric Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-medium">Total Pendaftar PPDB</span>
                    <Users className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                    {applicants.length}
                  </div>
                  <div className="text-[11px] text-emerald-700 mt-2 flex items-center gap-1 font-medium">
                    <span>{applicants.filter((a) => a.status === 'diterima').length} siswa lolos verifikasi</span>
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-medium">Tenaga Pendidik (Guru)</span>
                    <GraduationCap className="w-4 h-4 text-blue-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                    {teachers.length}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-2">
                    {teachers.filter((t) => t.status === 'PNS').length} PNS · {teachers.filter((t) => t.status === 'PPPK').length} PPPK
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-medium">Warta & Berita Terbit</span>
                    <Newspaper className="w-4 h-4 text-amber-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                    {news.length}
                  </div>
                  <div className="text-[11px] text-slate-500 mt-2">
                    {news.reduce((acc, curr) => acc + curr.reads, 0)} total tayangan pembaca
                  </div>
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-5 shadow-2xs">
                  <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                    <span className="font-medium">Pesan Masuk Publik</span>
                    <Inbox className="w-4 h-4 text-purple-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
                    {messages.length}
                  </div>
                  <div className="text-[11px] text-purple-700 mt-2 font-medium">
                    {messages.filter((m) => m.status === 'belum_dibaca').length} pesan perlu direspons
                  </div>
                </div>
              </div>

              {/* Status Breakdown & Quick Applicants */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                <div className="lg:col-span-8 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-900">
                        Pendaftar PPDB Terbaru
                      </h3>
                      <p className="text-[11px] text-slate-500">Daftar calon siswa yang baru mengirimkan formulir online.</p>
                    </div>
                    <button
                      onClick={() => setActiveTab('ppdb')}
                      className="text-xs text-emerald-700 hover:text-emerald-800 font-semibold cursor-pointer"
                    >
                      Kelola Semua &rarr;
                    </button>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-50 border-b border-slate-200 text-slate-500">
                        <tr>
                          <th className="py-2.5 px-3 font-semibold">No. Reg</th>
                          <th className="py-2.5 px-3 font-semibold">Nama Siswa</th>
                          <th className="py-2.5 px-3 font-semibold">Jalur</th>
                          <th className="py-2.5 px-3 font-semibold">Pilihan Jurusan</th>
                          <th className="py-2.5 px-3 font-semibold">Nilai</th>
                          <th className="py-2.5 px-3 font-semibold">Status</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {applicants.slice(0, 5).map((app) => (
                          <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                            <td className="py-2.5 px-3 font-mono font-medium text-slate-900">{app.registrationNo}</td>
                            <td className="py-2.5 px-3 font-medium text-slate-800">{app.fullName}</td>
                            <td className="py-2.5 px-3 text-slate-600">{app.pathway}</td>
                            <td className="py-2.5 px-3 text-slate-600 truncate max-w-[160px]">{app.chosenMajor}</td>
                            <td className="py-2.5 px-3 font-mono tabular-nums font-bold text-slate-900">{app.averageScore.toFixed(1)}</td>
                            <td className="py-2.5 px-3">{renderStatusBadge(app.status)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>

                <div className="lg:col-span-4 bg-white border border-slate-200 rounded-xl p-6 shadow-2xs space-y-4">
                  <h3 className="text-sm font-bold text-slate-900">
                    Statistik Kuota PPDB 2026
                  </h3>
                  <div className="space-y-3 text-xs">
                    <div>
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span>Jalur Zonasi (Target: 180)</span>
                        <span className="font-mono font-bold text-slate-900">
                          {applicants.filter((a) => a.pathway === 'Zonasi').length} pendaftar
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-emerald-600 rounded-full"
                          style={{
                            width: `${Math.min(100, (applicants.filter((a) => a.pathway === 'Zonasi').length / 180) * 100)}%`
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span>Jalur Prestasi (Target: 108)</span>
                        <span className="font-mono font-bold text-slate-900">
                          {applicants.filter((a) => a.pathway === 'Prestasi').length} pendaftar
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-amber-500 rounded-full"
                          style={{
                            width: `${Math.min(100, (applicants.filter((a) => a.pathway === 'Prestasi').length / 108) * 100)}%`
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span>Jalur Afirmasi (Target: 54)</span>
                        <span className="font-mono font-bold text-slate-900">
                          {applicants.filter((a) => a.pathway === 'Afirmasi').length} pendaftar
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{
                            width: `${Math.min(100, (applicants.filter((a) => a.pathway === 'Afirmasi').length / 54) * 100)}%`
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <div className="flex justify-between text-slate-600 mb-1">
                        <span>Jalur Mutasi Tugas (Target: 18)</span>
                        <span className="font-mono font-bold text-slate-900">
                          {applicants.filter((a) => a.pathway === 'Mutasi Orang Tua').length} pendaftar
                        </span>
                      </div>
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-purple-500 rounded-full"
                          style={{
                            width: `${Math.min(100, (applicants.filter((a) => a.pathway === 'Mutasi Orang Tua').length / 18) * 100)}%`
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100">
                    <button
                      onClick={handleExportCSV}
                      className="w-full py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold flex items-center justify-center gap-2 transition-colors cursor-pointer"
                    >
                      <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700" />
                      <span>Ekspor Data PPDB (.CSV)</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: MANAJEMEN PPDB */}
          {activeTab === 'ppdb' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Manajemen Calon Peserta Didik Baru (PPDB)
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Verifikasi berkas, pemeringkatan nilai, dan penetapan status kelulusan.
                  </p>
                </div>

                <button
                  onClick={handleExportCSV}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5" />
                  <span>Unduh Rekap CSV</span>
                </button>
              </div>

              {/* Filters Row */}
              <div className="bg-white border border-slate-200 rounded-xl p-4 flex flex-wrap items-center justify-between gap-4">
                <div className="relative flex-1 min-w-[240px]">
                  <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                  <input
                    type="text"
                    value={ppdbSearch}
                    onChange={(e) => setPpdbSearch(e.target.value)}
                    placeholder="Cari nama siswa, NISN, atau no registrasi..."
                    className="w-full text-xs pl-9 pr-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-3">
                  <select
                    value={ppdbFilterStatus}
                    onChange={(e) => setPpdbFilterStatus(e.target.value)}
                    className="text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">Semua Status Seleksi</option>
                    <option value="menunggu">Menunggu</option>
                    <option value="diverifikasi">Diverifikasi</option>
                    <option value="diterima">Diterima</option>
                    <option value="cadangan">Cadangan</option>
                    <option value="ditolak">Ditolak</option>
                  </select>

                  <select
                    value={ppdbFilterPathway}
                    onChange={(e) => setPpdbFilterPathway(e.target.value)}
                    className="text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="all">Semua Jalur</option>
                    <option value="Zonasi">Zonasi</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="Afirmasi">Afirmasi</option>
                    <option value="Mutasi Orang Tua">Mutasi Tugas</option>
                  </select>
                </div>
              </div>

              {/* Applicants Table */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-2xs">
                <div className="overflow-x-auto">
                  <table className="w-full text-xs text-left">
                    <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                      <tr>
                        <th className="py-3 px-4">No. Registrasi</th>
                        <th className="py-3 px-4">Nama Lengkap & NISN</th>
                        <th className="py-3 px-4">Asal SMP</th>
                        <th className="py-3 px-4">Jalur</th>
                        <th className="py-3 px-4">Pilihan Jurusan</th>
                        <th className="py-3 px-4">Nilai</th>
                        <th className="py-3 px-4">Status</th>
                        <th className="py-3 px-4 text-right">Aksi</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredApplicants.length === 0 ? (
                        <tr>
                          <td colSpan={8} className="py-8 text-center text-slate-500">
                            Tidak ada data pendaftar yang sesuai kriteria pencarian.
                          </td>
                        </tr>
                      ) : (
                        filteredApplicants.map((app) => (
                          <tr key={app.id} className="hover:bg-slate-50/70 transition-colors">
                            <td className="py-3 px-4 font-mono font-bold text-slate-900">{app.registrationNo}</td>
                            <td className="py-3 px-4">
                              <div className="font-semibold text-slate-900">{app.fullName}</div>
                              <div className="text-[11px] font-mono text-slate-400">NISN: {app.nisn}</div>
                            </td>
                            <td className="py-3 px-4 text-slate-700">{app.originSchool}</td>
                            <td className="py-3 px-4">
                              <span className="px-2 py-0.5 bg-slate-100 border border-slate-200 rounded font-medium text-slate-700">
                                {app.pathway}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-slate-700 truncate max-w-[180px]">{app.chosenMajor}</td>
                            <td className="py-3 px-4 font-mono font-bold tabular-nums text-slate-900">{app.averageScore.toFixed(1)}</td>
                            <td className="py-3 px-4">{renderStatusBadge(app.status)}</td>
                            <td className="py-3 px-4 text-right">
                              <button
                                onClick={() => {
                                  setSelectedApplicant(app);
                                  setApplicantStatusToUpdate(app.status);
                                  setApplicantAdminNote(app.adminNotes || '');
                                }}
                                className="px-3 py-1.5 bg-slate-900 hover:bg-slate-800 text-white rounded text-[11px] font-semibold transition-colors cursor-pointer inline-flex items-center gap-1"
                              >
                                <Eye className="w-3 h-3" />
                                <span>Verifikasi</span>
                              </button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: MANAJEMEN BERITA */}
          {activeTab === 'news' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Manajemen Berita & Artikel Sekolah
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Publikasikan pengumuman penting, liputan kegiatan, dan dokumentasi prestasi.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingNews(null);
                    setNewsForm({
                      title: '',
                      category: 'Akademik',
                      excerpt: '',
                      content: '',
                      author: adminUser?.name || 'Tim Humas',
                      authorRole: 'Humas SMAN 1 Nusantara',
                      image: news[0]?.image || '',
                      published: true
                    });
                    setShowNewsModal(true);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Berita Baru</span>
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item) => (
                  <div key={item.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden p-5 flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between text-[11px] text-slate-500 mb-2">
                        <span className="font-semibold text-emerald-700">{item.category}</span>
                        <span>{item.date}</span>
                      </div>
                      <h3 className="text-sm font-bold text-slate-900 line-clamp-2 mb-2 leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs text-slate-600 line-clamp-3 leading-relaxed mb-4">
                        {item.excerpt}
                      </p>
                    </div>

                    <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
                      <span className="text-[11px] text-slate-400 font-mono">
                        {item.reads} dibaca · {item.published ? 'Terbit' : 'Draf'}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={() => {
                            setEditingNews(item);
                            setNewsForm({
                              title: item.title,
                              category: item.category,
                              excerpt: item.excerpt,
                              content: item.content,
                              author: item.author,
                              authorRole: item.authorRole,
                              image: item.image,
                              published: item.published
                            });
                            setShowNewsModal(true);
                          }}
                          className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                          title="Edit Berita"
                        >
                          <Edit2 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          onClick={() => {
                            if (confirm('Hapus berita ini?')) {
                              deleteNews(item.id);
                            }
                          }}
                          className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                          title="Hapus Berita"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 4: MANAJEMEN GURU */}
          {activeTab === 'teachers' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Manajemen Pendidik & Tenaga Kependidikan
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Data NIP, pengampu mata pelajaran, kualifikasi ijazah, dan kontak resmi guru.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEditingTeacher(null);
                    setTeacherForm({
                      name: '',
                      nip: '',
                      role: 'Guru Mata Pelajaran',
                      subjectsStr: '',
                      education: 'S1 Pendidikan',
                      photo: teachers[0]?.photo || '',
                      email: '',
                      phone: '',
                      status: 'PNS',
                      quote: ''
                    });
                    setShowTeacherModal(true);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Guru / Staf</span>
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Nama Lengkap</th>
                      <th className="py-3 px-4">NIP & Status</th>
                      <th className="py-3 px-4">Jabatan / Peran</th>
                      <th className="py-3 px-4">Mata Pelajaran</th>
                      <th className="py-3 px-4">Pendidikan</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {teachers.map((t) => (
                      <tr key={t.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-900">{t.name}</td>
                        <td className="py-3 px-4">
                          <div className="font-mono text-slate-700">{t.nip}</div>
                          <span className="text-[10px] text-slate-500 font-mono">{t.status}</span>
                        </td>
                        <td className="py-3 px-4 text-emerald-800 font-medium">{t.role}</td>
                        <td className="py-3 px-4 text-slate-600">{t.subjects.join(', ')}</td>
                        <td className="py-3 px-4 text-slate-500 truncate max-w-[160px]">{t.education}</td>
                        <td className="py-3 px-4 text-right space-x-1">
                          <button
                            onClick={() => {
                              setEditingTeacher(t);
                              setTeacherForm({
                                name: t.name,
                                nip: t.nip,
                                role: t.role,
                                subjectsStr: t.subjects.join(', '),
                                education: t.education,
                                photo: t.photo,
                                email: t.email,
                                phone: t.phone,
                                status: t.status,
                                quote: t.quote || ''
                              });
                              setShowTeacherModal(true);
                            }}
                            className="p-1.5 text-slate-600 hover:text-emerald-700 hover:bg-slate-100 rounded transition-colors cursor-pointer"
                          >
                            <Edit2 className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => {
                              if (confirm(`Hapus data ${t.name}?`)) {
                                deleteTeacher(t.id);
                              }
                            }}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 5: MANAJEMEN AGENDA */}
          {activeTab === 'events' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Kalender Akademik & Agenda Kegiatan
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Atur jadwal ujian, peringatan hari besar, rapat dinas, dan libur semester.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setEventForm({
                      title: '',
                      category: 'Kegiatan',
                      startDate: '2026-10-15',
                      endDate: '2026-10-16',
                      location: 'Kampus SMAN 1 Nusantara',
                      description: '',
                      targetAudience: 'Seluruh Siswa'
                    });
                    setShowEventModal(true);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Kegiatan Agenda</span>
                </button>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl overflow-hidden">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 font-semibold">
                    <tr>
                      <th className="py-3 px-4">Nama Kegiatan</th>
                      <th className="py-3 px-4">Kategori</th>
                      <th className="py-3 px-4">Tanggal Pelaksanaan</th>
                      <th className="py-3 px-4">Lokasi</th>
                      <th className="py-3 px-4">Sasaran Peserta</th>
                      <th className="py-3 px-4 text-right">Aksi</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {events.map((ev) => (
                      <tr key={ev.id} className="hover:bg-slate-50/70 transition-colors">
                        <td className="py-3 px-4 font-semibold text-slate-900">{ev.title}</td>
                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 bg-emerald-50 text-emerald-800 rounded font-medium border border-emerald-100">
                            {ev.category}
                          </span>
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-700">
                          {ev.startDate} {ev.endDate && ev.endDate !== ev.startDate ? `s/d ${ev.endDate}` : ''}
                        </td>
                        <td className="py-3 px-4 text-slate-600">{ev.location}</td>
                        <td className="py-3 px-4 text-slate-500">{ev.targetAudience}</td>
                        <td className="py-3 px-4 text-right">
                          <button
                            onClick={() => {
                              if (confirm(`Hapus agenda "${ev.title}"?`)) {
                                deleteEvent(ev.id);
                              }
                            }}
                            className="p-1.5 text-rose-500 hover:text-rose-700 hover:bg-rose-50 rounded transition-colors cursor-pointer"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 6: MANAJEMEN GALERI */}
          {activeTab === 'gallery' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Galeri Dokumentasi Kampus
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Kelola foto dokumentasi fasilitas, prestasi siswa, dan momen sekolah.
                  </p>
                </div>

                <button
                  onClick={() => {
                    setGalleryForm({
                      title: '',
                      category: 'Kegiatan',
                      imageUrl: gallery[0]?.imageUrl || '',
                      date: 'Oktober 2026',
                      description: ''
                    });
                    setShowGalleryModal(true);
                  }}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer self-start sm:self-auto"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Tambah Foto Galeri</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
                {gallery.map((g) => (
                  <div key={g.id} className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between">
                    <div className="h-44 bg-slate-100 relative">
                      <img src={g.imageUrl} alt={g.title} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                      <span className="absolute bottom-2 left-2 px-2 py-0.5 bg-black/60 text-white rounded text-[10px]">
                        {g.category}
                      </span>
                    </div>
                    <div className="p-4 space-y-2">
                      <h4 className="text-xs font-bold text-slate-900 line-clamp-2">{g.title}</h4>
                      <p className="text-[11px] text-slate-500 line-clamp-2">{g.description}</p>
                      <div className="pt-2 border-t border-slate-100 flex items-center justify-between text-[11px]">
                        <span className="text-slate-400">{g.date}</span>
                        <button
                          onClick={() => {
                            if (confirm('Hapus foto ini dari galeri?')) {
                              deleteGalleryItem(g.id);
                            }
                          }}
                          className="text-rose-600 hover:text-rose-800 cursor-pointer font-medium"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 7: KOTAK PESAN */}
          {activeTab === 'inbox' && (
            <div className="space-y-6 max-w-7xl mx-auto">
              <div>
                <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                  Kotak Masuk Pesan & Aspirasi Publik
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Pertanyaan dari calon siswa, orang tua murid, dan permohonan kemitraan.
                </p>
              </div>

              <div className="space-y-4">
                {messages.length === 0 ? (
                  <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-xs text-slate-500">
                    Belum ada pesan yang masuk.
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div
                      key={msg.id}
                      className={`bg-white border rounded-xl p-5 transition-all space-y-3 ${
                        msg.status === 'belum_dibaca' ? 'border-emerald-500 shadow-xs' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold text-slate-900">{msg.name}</span>
                          <span className="text-slate-400">·</span>
                          <span className="text-xs text-slate-600">{msg.email}</span>
                          <span className="text-slate-400">·</span>
                          <span className="text-xs font-mono text-slate-500">{msg.phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-xs">
                          <span className="font-mono text-slate-400 text-[11px]">{msg.date}</span>
                          <span
                            className={`px-2 py-0.5 rounded text-[11px] font-semibold ${
                              msg.status === 'belum_dibaca'
                                ? 'bg-rose-100 text-rose-800'
                                : msg.status === 'dibalas'
                                ? 'bg-emerald-100 text-emerald-800'
                                : 'bg-slate-100 text-slate-700'
                            }`}
                          >
                            {msg.status === 'belum_dibaca' ? 'Belum Dibaca' : msg.status === 'dibalas' ? 'Telah Dibalas' : 'Sudah Dibaca'}
                          </span>
                        </div>
                      </div>

                      <div className="text-xs">
                        <div className="font-bold text-slate-900 mb-1">
                          [{msg.category}] {msg.subject}
                        </div>
                        <p className="text-slate-700 leading-relaxed bg-slate-50 p-3 rounded-lg border border-slate-100">
                          {msg.message}
                        </p>
                      </div>

                      {msg.adminReply && (
                        <div className="text-xs bg-emerald-50 border border-emerald-200 rounded-lg p-3 text-emerald-950">
                          <strong className="block mb-1 text-emerald-800">Tanggapan Resmi Admin:</strong>
                          <p>{msg.adminReply}</p>
                        </div>
                      )}

                      <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => {
                              setReplyingMessage(msg);
                              setReplyText(msg.adminReply || '');
                            }}
                            className="px-3 py-1 bg-emerald-600 hover:bg-emerald-700 text-white rounded text-xs font-semibold flex items-center gap-1 cursor-pointer"
                          >
                            <Send className="w-3 h-3" />
                            <span>Tanggapi / Balas</span>
                          </button>
                          {msg.status === 'belum_dibaca' && (
                            <button
                              onClick={() => markMessageRead(msg.id)}
                              className="px-3 py-1 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded text-xs font-semibold cursor-pointer"
                            >
                              Tandai Sudah Dibaca
                            </button>
                          )}
                        </div>

                        <button
                          onClick={() => {
                            if (confirm('Hapus pesan ini?')) {
                              deleteMessage(msg.id);
                            }
                          }}
                          className="text-rose-600 hover:text-rose-800 cursor-pointer font-medium"
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}

          {/* TAB 8: PENGATURAN SEKOLAH */}
          {activeTab === 'settings' && (
            <div className="space-y-6 max-w-4xl mx-auto">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold text-slate-900 tracking-tight">
                    Pengaturan Identitas & Profil Sekolah
                  </h2>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Ubah informasi dasar satuan pendidikan, akreditasi, data pimpinan, dan visi misi.
                  </p>
                </div>

                {settingsSavedToast && (
                  <span className="text-xs font-semibold text-emerald-700 bg-emerald-100 px-3 py-1.5 rounded-lg border border-emerald-300 animate-in fade-in">
                    Perubahan Profil Berhasil Disimpan!
                  </span>
                )}
              </div>

              <div className="bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 space-y-6 shadow-2xs">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap Satuan Pendidikan</label>
                    <input
                      type="text"
                      value={settingsForm.name}
                      onChange={(e) => setSettingsForm({ ...settingsForm, name: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nama Pendek / Singkatan</label>
                    <input
                      type="text"
                      value={settingsForm.shortName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, shortName: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">NPSN (Nomor Pokok Sekolah)</label>
                    <input
                      type="text"
                      value={settingsForm.npsn}
                      onChange={(e) => setSettingsForm({ ...settingsForm, npsn: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Status Akreditasi</label>
                    <input
                      type="text"
                      value={settingsForm.accreditation}
                      onChange={(e) => setSettingsForm({ ...settingsForm, accreditation: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nilai Skor Akreditasi BAN-SM</label>
                    <input
                      type="number"
                      value={settingsForm.accreditationScore}
                      onChange={(e) => setSettingsForm({ ...settingsForm, accreditationScore: parseInt(e.target.value, 10) || 0 })}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Nama Kepala Sekolah</label>
                    <input
                      type="text"
                      value={settingsForm.principalName}
                      onChange={(e) => setSettingsForm({ ...settingsForm, principalName: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">NIP Kepala Sekolah</label>
                    <input
                      type="text"
                      value={settingsForm.principalNip}
                      onChange={(e) => setSettingsForm({ ...settingsForm, principalNip: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-lg font-mono focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="text-xs space-y-4">
                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Motto Sekolah</label>
                    <input
                      type="text"
                      value={settingsForm.motto}
                      onChange={(e) => setSettingsForm({ ...settingsForm, motto: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div>
                    <label className="block font-semibold text-slate-700 mb-1">Visi Sekolah</label>
                    <textarea
                      rows={2}
                      value={settingsForm.vision}
                      onChange={(e) => setSettingsForm({ ...settingsForm, vision: e.target.value })}
                      className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Telepon Resmi</label>
                      <input
                        type="text"
                        value={settingsForm.phone}
                        onChange={(e) => setSettingsForm({ ...settingsForm, phone: e.target.value })}
                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block font-semibold text-slate-700 mb-1">Nomor WhatsApp Helpdesk</label>
                      <input
                        type="text"
                        value={settingsForm.whatsapp}
                        onChange={(e) => setSettingsForm({ ...settingsForm, whatsapp: e.target.value })}
                        className="w-full px-3.5 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="pt-4 border-t border-slate-200 flex justify-end">
                  <button
                    onClick={() => {
                      updateProfile(settingsForm);
                      setSettingsSavedToast(true);
                      setTimeout(() => setSettingsSavedToast(false), 3000);
                    }}
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Save className="w-4 h-4" />
                    <span>Simpan Perubahan Identitas</span>
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* APPLICANT DETAIL / VERIFICATION MODAL */}
      {selectedApplicant && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-4 border-b border-slate-200">
              <div>
                <span className="text-[11px] font-mono text-slate-500">DOSSIER CALON SISWA</span>
                <h3 className="text-lg font-bold text-slate-900">{selectedApplicant.fullName}</h3>
                <p className="text-xs font-mono text-emerald-700">No. Reg: {selectedApplicant.registrationNo}</p>
              </div>
              <button
                onClick={() => setSelectedApplicant(null)}
                className="text-slate-400 hover:text-slate-700 text-sm font-semibold cursor-pointer"
              >
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block">NISN / NIK:</span>
                <strong className="text-slate-800 font-mono">{selectedApplicant.nisn} / {selectedApplicant.nik}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Tempat, Tgl Lahir:</span>
                <strong className="text-slate-800">{selectedApplicant.birthPlace}, {selectedApplicant.birthDate} ({selectedApplicant.gender})</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Asal Sekolah:</span>
                <strong className="text-slate-800">{selectedApplicant.originSchool} ({selectedApplicant.originSchoolCity})</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Orang Tua / Wali:</span>
                <strong className="text-slate-800">{selectedApplicant.parentName} ({selectedApplicant.parentJob})</strong>
              </div>
              <div>
                <span className="text-slate-400 block">No WhatsApp Orang Tua:</span>
                <strong className="text-slate-800 font-mono">{selectedApplicant.parentPhone}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Jalur Seleksi:</span>
                <strong className="text-emerald-700">{selectedApplicant.pathway}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Peminatan Pilihan 1:</span>
                <strong className="text-slate-800">{selectedApplicant.chosenMajor}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Peminatan Pilihan 2:</span>
                <strong className="text-slate-800">{selectedApplicant.secondMajor}</strong>
              </div>
              <div>
                <span className="text-slate-400 block">Nilai Rapor Rata-rata:</span>
                <span className="text-base font-bold font-mono text-slate-900">{selectedApplicant.averageScore.toFixed(1)}</span>
              </div>
              <div>
                <span className="text-slate-400 block">Waktu Submit Formulir:</span>
                <span className="font-mono text-slate-600">{selectedApplicant.submittedAt}</span>
              </div>
            </div>

            {selectedApplicant.achievementNotes && (
              <div className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-200">
                <span className="text-slate-500 font-semibold block mb-1">Catatan Dokumen / Piagam Siswa:</span>
                <p className="text-slate-800">{selectedApplicant.achievementNotes}</p>
              </div>
            )}

            {/* Status Update Form */}
            <div className="pt-4 border-t border-slate-200 space-y-4">
              <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                Ubah Status Hasil Seleksi PPDB:
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Pilih Status Baru:</label>
                  <select
                    value={applicantStatusToUpdate}
                    onChange={(e) => setApplicantStatusToUpdate(e.target.value as PPDBStatus)}
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  >
                    <option value="menunggu">Menunggu Verifikasi</option>
                    <option value="diverifikasi">Diverifikasi (Sedang Pemeringkatan)</option>
                    <option value="diterima">Diterima (Lolos Seleksi)</option>
                    <option value="cadangan">Peserta Cadangan</option>
                    <option value="ditolak">Ditolak (Tidak Memenuhi Syarat)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">Catatan Verifikator untuk Siswa:</label>
                  <input
                    type="text"
                    value={applicantAdminNote}
                    onChange={(e) => setApplicantAdminNote(e.target.value)}
                    placeholder="Contoh: Berkas asli sah, harap lapor diri tgl 23 Okt..."
                    className="w-full text-xs px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <button
                  onClick={() => {
                    if (confirm('Hapus berkas pendaftar ini dari sistem?')) {
                      deleteApplicant(selectedApplicant.id);
                      setSelectedApplicant(null);
                    }
                  }}
                  className="text-xs text-rose-600 hover:text-rose-800 font-semibold cursor-pointer"
                >
                  Hapus Pendaftar Ini
                </button>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setSelectedApplicant(null)}
                    className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Batal
                  </button>
                  <button
                    onClick={() => {
                      updateApplicantStatus(selectedApplicant.id, applicantStatusToUpdate, applicantAdminNote);
                      setSelectedApplicant(null);
                    }}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Simpan Perubahan Status
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* NEWS CREATE / EDIT MODAL */}
      {showNewsModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingNews ? 'Edit Berita Sekolah' : 'Buat Berita / Pengumuman Baru'}
              </h3>
              <button onClick={() => setShowNewsModal(false)} className="text-slate-400 hover:text-slate-700 text-sm font-semibold cursor-pointer">
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul Berita *</label>
                <input
                  type="text"
                  required
                  value={newsForm.title}
                  onChange={(e) => setNewsForm({ ...newsForm, title: e.target.value })}
                  placeholder="Masukkan judul berita yang menarik dan informatif..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori Berita *</label>
                  <select
                    value={newsForm.category}
                    onChange={(e) => setNewsForm({ ...newsForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                  >
                    <option value="Akademik">Akademik</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Info Sekolah">Info Sekolah</option>
                    <option value="PPDB">PPDB</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Penulis / Sumber *</label>
                  <input
                    type="text"
                    value={newsForm.author}
                    onChange={(e) => setNewsForm({ ...newsForm, author: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Ringkasan Singkat (Excerpt) *</label>
                <textarea
                  rows={2}
                  required
                  value={newsForm.excerpt}
                  onChange={(e) => setNewsForm({ ...newsForm, excerpt: e.target.value })}
                  placeholder="Ringkasan 1-2 kalimat untuk preview di kartu berita..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Konten Berita Lengkap *</label>
                <textarea
                  rows={6}
                  required
                  value={newsForm.content}
                  onChange={(e) => setNewsForm({ ...newsForm, content: e.target.value })}
                  placeholder="Tuliskan berita lengkap..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setShowNewsModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (!newsForm.title || !newsForm.content) return;
                  if (editingNews) {
                    updateNews(editingNews.id, newsForm);
                  } else {
                    addNews({
                      ...newsForm,
                      slug: newsForm.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
                      date: new Date().toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })
                    });
                  }
                  setShowNewsModal(false);
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Simpan & Terbitkan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TEACHER MODAL */}
      {showTeacherModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                {editingTeacher ? 'Edit Data Pendidik' : 'Tambah Guru / Staf Baru'}
              </h3>
              <button onClick={() => setShowTeacherModal(false)} className="text-slate-400 hover:text-slate-700 text-sm font-semibold cursor-pointer">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Lengkap & Gelar *</label>
                <input
                  type="text"
                  required
                  value={teacherForm.name}
                  onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                  placeholder="Contoh: Siti Aisyah, S.Pd., M.Si."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">NIP (Nomor Induk Pegawai) *</label>
                  <input
                    type="text"
                    required
                    value={teacherForm.nip}
                    onChange={(e) => setTeacherForm({ ...teacherForm, nip: e.target.value })}
                    placeholder="19870512 201201 2 001"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg font-mono text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Status Kepegawaian *</label>
                  <select
                    value={teacherForm.status}
                    onChange={(e) => setTeacherForm({ ...teacherForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="PNS">PNS</option>
                    <option value="PPPK">PPPK</option>
                    <option value="Guru Tetap Yayasan">Guru Tetap</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Jabatan / Peran di Sekolah *</label>
                <input
                  type="text"
                  required
                  value={teacherForm.role}
                  onChange={(e) => setTeacherForm({ ...teacherForm, role: e.target.value })}
                  placeholder="Contoh: Guru Kimia Lanjutan & Pembina PMR"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Mata Pelajaran (Pisahkan dengan koma) *</label>
                <input
                  type="text"
                  required
                  value={teacherForm.subjectsStr}
                  onChange={(e) => setTeacherForm({ ...teacherForm, subjectsStr: e.target.value })}
                  placeholder="Contoh: Kimia Organik, Kimia Fisik"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Riwayat Pendidikan Formal *</label>
                <input
                  type="text"
                  required
                  value={teacherForm.education}
                  onChange={(e) => setTeacherForm({ ...teacherForm, education: e.target.value })}
                  placeholder="Contoh: S2 Kimia Terapan ITB, S1 Pendidikan Kimia UPI"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Email Resmi</label>
                  <input
                    type="email"
                    value={teacherForm.email}
                    onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                    placeholder="nama.guru@sman1nusantara.sch.id"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Nomor Telepon / WA</label>
                  <input
                    type="text"
                    value={teacherForm.phone}
                    onChange={(e) => setTeacherForm({ ...teacherForm, phone: e.target.value })}
                    placeholder="0812-xxxx-xxxx"
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Kutipan / Motto Mengajar</label>
                <input
                  type="text"
                  value={teacherForm.quote}
                  onChange={(e) => setTeacherForm({ ...teacherForm, quote: e.target.value })}
                  placeholder="Kata motivasi untuk peserta didik..."
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setShowTeacherModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (!teacherForm.name || !teacherForm.nip) return;
                  const subjects = teacherForm.subjectsStr
                    .split(',')
                    .map((s) => s.trim())
                    .filter(Boolean);

                  if (editingTeacher) {
                    updateTeacher(editingTeacher.id, {
                      ...teacherForm,
                      subjects
                    });
                  } else {
                    addTeacher({
                      name: teacherForm.name,
                      nip: teacherForm.nip,
                      role: teacherForm.role,
                      subjects,
                      education: teacherForm.education,
                      photo: teacherForm.photo || teachers[0]?.photo || '',
                      email: teacherForm.email || 'guru@sman1nusantara.sch.id',
                      phone: teacherForm.phone || '0812-0000-0000',
                      status: teacherForm.status,
                      quote: teacherForm.quote
                    });
                  }
                  setShowTeacherModal(false);
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Simpan Data Guru
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EVENT MODAL */}
      {showEventModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Tambah Agenda Baru</h3>
              <button onClick={() => setShowEventModal(false)} className="text-slate-400 hover:text-slate-700 text-sm font-semibold cursor-pointer">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Nama Agenda / Kegiatan *</label>
                <input
                  type="text"
                  required
                  value={eventForm.title}
                  onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori Agenda *</label>
                  <select
                    value={eventForm.category}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Ujian">Ujian / Asesmen</option>
                    <option value="PPDB">PPDB</option>
                    <option value="Libur">Libur</option>
                    <option value="Rapat">Rapat</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Lokasi Kegiatan *</label>
                  <input
                    type="text"
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tanggal Mulai *</label>
                  <input
                    type="date"
                    required
                    value={eventForm.startDate}
                    onChange={(e) => setEventForm({ ...eventForm, startDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Tanggal Berakhir</label>
                  <input
                    type="date"
                    value={eventForm.endDate}
                    onChange={(e) => setEventForm({ ...eventForm, endDate: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi Singkat *</label>
                <textarea
                  rows={2}
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setShowEventModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (!eventForm.title || !eventForm.startDate) return;
                  addEvent(eventForm);
                  setShowEventModal(false);
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Simpan Agenda
              </button>
            </div>
          </div>
        </div>
      )}

      {/* GALLERY MODAL */}
      {showGalleryModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">Tambah Foto ke Galeri</h3>
              <button onClick={() => setShowGalleryModal(false)} className="text-slate-400 hover:text-slate-700 text-sm font-semibold cursor-pointer">
                ✕
              </button>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Judul / Keterangan Foto *</label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  placeholder="Contoh: Upacara Peringatan Hari Sumpah Pemuda"
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Kategori *</label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  >
                    <option value="Kegiatan">Kegiatan</option>
                    <option value="Fasilitas">Fasilitas</option>
                    <option value="Prestasi">Prestasi</option>
                    <option value="Ekstrakurikuler">Ekstrakurikuler</option>
                  </select>
                </div>
                <div>
                  <label className="block font-semibold text-slate-700 mb-1">Bulan & Tahun *</label>
                  <input
                    type="text"
                    value={galleryForm.date}
                    onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Deskripsi Singkat</label>
                <textarea
                  rows={2}
                  value={galleryForm.description}
                  onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                  className="w-full px-3 py-2 border border-slate-300 rounded-lg text-xs"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setShowGalleryModal(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (!galleryForm.title) return;
                  addGalleryItem(galleryForm);
                  setShowGalleryModal(false);
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Simpan ke Galeri
              </button>
            </div>
          </div>
        </div>
      )}

      {/* REPLY MESSAGE MODAL */}
      {replyingMessage && (
        <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                Balas Pesan dari {replyingMessage.name}
              </h3>
              <button onClick={() => setReplyingMessage(null)} className="text-slate-400 hover:text-slate-700 text-sm font-semibold cursor-pointer">
                ✕
              </button>
            </div>

            <div className="text-xs bg-slate-50 p-3 rounded-lg border border-slate-200 space-y-1">
              <div className="font-semibold text-slate-900">{replyingMessage.subject}</div>
              <p className="text-slate-600 italic">"{replyingMessage.message}"</p>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Tulis Tanggapan Resmi Sekolah:
              </label>
              <textarea
                rows={4}
                required
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Tuliskan jawaban atau petunjuk resmi di sini..."
                className="w-full text-xs px-3.5 py-2.5 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
              />
            </div>

            <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
              <button
                onClick={() => setReplyingMessage(null)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-lg text-xs font-semibold cursor-pointer"
              >
                Batal
              </button>
              <button
                onClick={() => {
                  if (!replyText.trim()) return;
                  replyMessage(replyingMessage.id, replyText);
                  setReplyingMessage(null);
                }}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold cursor-pointer"
              >
                Kirim Balasan Resmi
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
