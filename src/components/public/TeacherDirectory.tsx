import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Teacher } from '../../types';
import { Search, GraduationCap, Mail, Phone, Quote, X } from 'lucide-react';

export const TeacherDirectory: React.FC = () => {
  const { teachers } = useSchool();
  const [search, setSearch] = useState('');
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);

  const filteredTeachers = teachers.filter((t) => {
    const q = search.toLowerCase();
    const matchesName = t.name.toLowerCase().includes(q);
    const matchesRole = t.role.toLowerCase().includes(q);
    const matchesSubject = t.subjects.some((s) => s.toLowerCase().includes(q));
    return matchesName || matchesRole || matchesSubject;
  });

  return (
    <section id="guru" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
              <span>Civitas Akademika</span>
              <span aria-hidden="true">·</span>
              <span>Tenaga Pendidik Profesional</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Direktori Guru & Staf Kependidikan
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Didukung pendidik berpengalaman lulusan magister perguruan tinggi terbaik dengan sertifikasi profesi nasional.
            </p>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari nama guru atau mata pelajaran..."
              className="w-full text-xs pl-9 pr-3 py-2 bg-white border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        {/* Teachers Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTeachers.map((teacher) => (
            <div
              key={teacher.id}
              onClick={() => setSelectedTeacher(teacher)}
              className="bg-white border border-slate-200 hover:border-slate-300 hover:shadow-md rounded-2xl p-5 transition-all flex flex-col justify-between group cursor-pointer"
            >
              <div>
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                    <img
                      src={teacher.photo}
                      alt={teacher.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  <div className="min-w-0 flex-1">
                    <h3 className="text-sm font-bold text-slate-900 group-hover:text-emerald-700 transition-colors leading-snug">
                      {teacher.name}
                    </h3>
                    <p className="text-xs text-emerald-700 font-medium mt-0.5">{teacher.role}</p>
                    <p className="text-[11px] font-mono text-slate-400 mt-0.5">NIP: {teacher.nip}</p>
                  </div>
                </div>

                <div className="space-y-2 text-xs">
                  <div>
                    <span className="text-slate-500 block text-[11px]">Mata Pelajaran:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {teacher.subjects.map((subj, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-0.5 bg-slate-100 text-slate-700 rounded text-[11px] font-medium"
                        >
                          {subj}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2 text-slate-600 text-[11px] flex items-center gap-1.5">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span className="truncate">{teacher.education}</span>
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                <span className="font-mono text-[11px]">{teacher.status}</span>
                <span className="text-emerald-700 font-medium group-hover:underline">Lihat Profil Lengkap</span>
              </div>
            </div>
          ))}
        </div>

        {/* Teacher Detail Modal */}
        {selectedTeacher && (
          <div className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-lg w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative">
              <button
                onClick={() => setSelectedTeacher(null)}
                className="absolute right-4 top-4 p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="flex items-center gap-4 mb-6">
                <div className="w-20 h-20 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-200">
                  <img
                    src={selectedTeacher.photo}
                    alt={selectedTeacher.name}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div>
                  <h3 className="text-base font-bold text-slate-900">{selectedTeacher.name}</h3>
                  <p className="text-xs text-emerald-700 font-medium">{selectedTeacher.role}</p>
                  <p className="text-xs font-mono text-slate-500 mt-0.5">NIP: {selectedTeacher.nip}</p>
                  <span className="inline-block mt-1 px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] font-mono rounded">
                    Status: {selectedTeacher.status}
                  </span>
                </div>
              </div>

              <div className="space-y-4 text-xs">
                <div>
                  <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px] mb-1">
                    Riwayat Pendidikan Formal:
                  </span>
                  <p className="text-slate-800 bg-slate-50 p-2.5 rounded-lg border border-slate-200">
                    {selectedTeacher.education}
                  </p>
                </div>

                <div>
                  <span className="text-slate-500 font-semibold block uppercase tracking-wider text-[10px] mb-1">
                    Mata Pelajaran yang Diampu:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {selectedTeacher.subjects.map((sub, i) => (
                      <span key={i} className="px-2.5 py-1 bg-emerald-50 text-emerald-800 rounded font-medium border border-emerald-100">
                        {sub}
                      </span>
                    ))}
                  </div>
                </div>

                {selectedTeacher.quote && (
                  <div className="p-3 bg-slate-50 border border-slate-200 rounded-lg italic text-slate-700 flex items-start gap-2">
                    <Quote className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>"{selectedTeacher.quote}"</span>
                  </div>
                )}

                <div className="pt-2 border-t border-slate-200 flex flex-col gap-1.5 text-slate-600 text-[11px]">
                  <div className="flex items-center gap-2">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedTeacher.email}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{selectedTeacher.phone}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-200 flex justify-end">
                <button
                  onClick={() => setSelectedTeacher(null)}
                  className="px-4 py-2 bg-slate-900 text-white rounded-lg text-xs font-semibold hover:bg-slate-800 transition-colors cursor-pointer"
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
