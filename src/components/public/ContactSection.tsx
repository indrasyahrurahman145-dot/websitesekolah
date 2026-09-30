import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { MapPin, Phone, Mail, Clock, Send, CheckCircle2 } from 'lucide-react';

export const ContactSection: React.FC = () => {
  const { profile, sendMessage } = useSchool();
  const [sentSuccess, setSentSuccess] = useState(false);
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'Pertanyaan PPDB' as const,
    subject: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage({
      name: form.name,
      email: form.email,
      phone: form.phone,
      category: form.category,
      subject: form.subject,
      message: form.message
    });
    setSentSuccess(true);
    setForm({
      name: '',
      email: '',
      phone: '',
      category: 'Pertanyaan PPDB',
      subject: '',
      message: ''
    });
    setTimeout(() => {
      setSentSuccess(false);
    }, 5000);
  };

  return (
    <section id="kontak" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: School Contact & Location */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
                <span>Sekretariat & Hubungan Masyarakat</span>
                <span aria-hidden="true">·</span>
                <span>Layanan Satu Pintu</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
                Hubungi Kami & Layanan Informasi
              </h2>
              <p className="text-sm text-slate-600 mt-2 leading-relaxed">
                Kami siap melayani kebutuhan informasi akademis, layanan mutasi siswa, konsultasi PPDB daring, dan kerjasama pendidikan.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <div className="flex items-start gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <MapPin className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Alamat Kampus</h4>
                  <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                    {profile.address}, {profile.district}, {profile.city}, {profile.province} {profile.postalCode}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <Phone className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Telepon & WhatsApp</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Telepon Kantor: {profile.phone}<br />
                    Helpdesk WhatsApp: {profile.whatsapp}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <Mail className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Email Resmi</h4>
                  <p className="text-xs text-slate-600 mt-1">{profile.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3.5 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <Clock className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider">Jam Pelayanan Pelajar & Tamu</h4>
                  <p className="text-xs text-slate-600 mt-1">
                    Senin – Kamis: 07.00 – 15.30 WIB<br />
                    Jumat: 07.00 – 15.00 WIB (Istirahat Sholat Jumat: 11.30 – 13.00 WIB)
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Message Form */}
          <div className="lg:col-span-7">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6 sm:p-8">
              <h3 className="text-base font-bold text-slate-900 mb-1">
                Kirim Pesan, Pertanyaan, atau Aspirasi
              </h3>
              <p className="text-xs text-slate-600 mb-6">
                Pesan yang Anda kirim akan langsung diteruskan ke dasbor tim tata usaha dan panitia sekolah.
              </p>

              {sentSuccess && (
                <div className="mb-6 p-4 bg-emerald-100 border border-emerald-300 text-emerald-900 rounded-xl text-xs flex items-center gap-2.5 animate-in fade-in">
                  <CheckCircle2 className="w-5 h-5 text-emerald-700 shrink-0" />
                  <span>
                    <strong>Pesan Terkirim Berhasil!</strong> Tim sekretariat sekolah akan meninjau dan merespons via email atau WhatsApp.
                  </span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nama Lengkap Anda *
                    </label>
                    <input
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      placeholder="Contoh: Dra. Maya Indira"
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Alamat Email *
                    </label>
                    <input
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      placeholder="emailanda@gmail.com"
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Nomor Telepon / WhatsApp *
                    </label>
                    <input
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      placeholder="Contoh: 081234567890"
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Kategori Pesan *
                    </label>
                    <select
                      value={form.category}
                      onChange={(e) => setForm({ ...form, category: e.target.value as any })}
                      className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                    >
                      <option value="Pertanyaan PPDB">Pertanyaan PPDB Online</option>
                      <option value="Informasi Akademik">Informasi Akademik & Nilai</option>
                      <option value="Aspirasi">Aspirasi & Masukan</option>
                      <option value="Kerjasama">Kemitraan & Kerjasama</option>
                      <option value="Lainnya">Lainnya</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Subjek / Judul Pesan *
                  </label>
                  <input
                    type="text"
                    required
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    placeholder="Contoh: Permohonan Legalisir Ijazah & Rapor"
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Isi Pesan / Pertanyaan *
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="Tuliskan secara rinci pesan atau pertanyaan Anda di sini..."
                    className="w-full text-xs px-3.5 py-2.5 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>

                <div className="pt-2">
                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer shadow-sm"
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Kirim Pesan Sekarang</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
