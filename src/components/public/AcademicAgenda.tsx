import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Calendar, MapPin, Users, Tag } from 'lucide-react';

export const AcademicAgenda: React.FC = () => {
  const { events } = useSchool();
  const [filterCategory, setFilterCategory] = useState<string>('Semua');

  const categories = ['Semua', 'Ujian', 'Kegiatan', 'PPDB', 'Libur', 'Rapat'];

  const filteredEvents = events.filter((ev) => {
    return filterCategory === 'Semua' || ev.category === filterCategory;
  });

  const formatEventDate = (dateStr: string) => {
    try {
      const parts = dateStr.split('-');
      if (parts.length === 3) {
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
        const day = parts[2];
        const month = months[parseInt(parts[1], 10) - 1];
        const year = parts[0];
        return { day, month, year };
      }
      return { day: '01', month: 'Okt', year: '2026' };
    } catch {
      return { day: '01', month: 'Okt', year: '2026' };
    }
  };

  return (
    <section id="agenda" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
              <span>Kalender Akademik</span>
              <span aria-hidden="true">·</span>
              <span>Semester Ganjil 2026/2027</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
              Agenda & Kegiatan Penting Sekolah
            </h2>
            <p className="text-sm text-slate-600 mt-1">
              Jadwal asesmen sumatif, kegiatan kokurikuler, dan libur pendidikan resmi.
            </p>
          </div>

          {/* Interactive Filter Controls */}
          <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start md:self-auto">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                  filterCategory === cat
                    ? 'bg-white text-slate-900 shadow-sm'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredEvents.map((ev) => {
            const startDate = formatEventDate(ev.startDate);
            const endDate = ev.endDate && ev.endDate !== ev.startDate ? formatEventDate(ev.endDate) : null;

            return (
              <div
                key={ev.id}
                className="bg-slate-50 border border-slate-200 hover:border-slate-300 rounded-xl p-5 transition-all flex items-start gap-4"
              >
                {/* Date Block */}
                <div className="w-16 h-18 rounded-lg bg-white border border-slate-200 shadow-2xs flex flex-col items-center justify-center shrink-0 text-center">
                  <span className="text-[10px] font-bold text-emerald-700 uppercase tracking-wider">
                    {startDate.month}
                  </span>
                  <span className="text-xl font-bold font-mono text-slate-900 leading-none">
                    {startDate.day}
                  </span>
                  <span className="text-[9px] text-slate-400 font-mono mt-0.5">
                    {startDate.year}
                  </span>
                </div>

                {/* Event Info */}
                <div className="space-y-2 flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium">
                    <span className="text-emerald-700 font-semibold">{ev.category}</span>
                    {endDate && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>s/d {endDate.day} {endDate.month}</span>
                      </>
                    )}
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug">
                    {ev.title}
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
                    {ev.description}
                  </p>

                  <div className="pt-2 border-t border-slate-200/80 space-y-1 text-[11px] text-slate-500">
                    <div className="flex items-center gap-1.5 truncate">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{ev.location}</span>
                    </div>
                    <div className="flex items-center gap-1.5 truncate">
                      <Users className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                      <span className="truncate">{ev.targetAudience}</span>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
