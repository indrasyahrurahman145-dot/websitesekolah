import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { GalleryItem } from '../../types';
import { Check, X, Maximize2 } from 'lucide-react';

export const FacilitiesAndGallery: React.FC = () => {
  const { facilities, gallery } = useSchool();
  const [selectedGalleryCategory, setSelectedGalleryCategory] = useState<string>('Semua');
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

  const galleryCategories = ['Semua', 'Fasilitas', 'Kegiatan', 'Prestasi', 'Ekstrakurikuler'];

  const filteredGallery = gallery.filter((item) => {
    return selectedGalleryCategory === 'Semua' || item.category === selectedGalleryCategory;
  });

  return (
    <section id="fasilitas" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            <span>Infrastruktur & Lingkungan</span>
            <span aria-hidden="true">·</span>
            <span>Kampus Ramah Lingkungan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Fasilitas Pembelajaran Standar Nasional
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Mendukung ekosistem riset, olahraga, seni budaya, dan teknologi digital masa depan secara terintegrasi.
          </p>
        </div>

        {/* Facilities Spotlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-20">
          {facilities.map((fac) => (
            <div
              key={fac.id}
              className="bg-slate-50 border border-slate-200 rounded-2xl overflow-hidden hover:border-slate-300 transition-all flex flex-col sm:flex-row"
            >
              <div className="sm:w-1/2 h-52 sm:h-auto bg-slate-200 relative shrink-0">
                <img
                  src={fac.imageUrl}
                  alt={fac.name}
                  className="w-full h-full object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold mb-1">
                    <span>{fac.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="text-slate-500 font-normal">{fac.capacity}</span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 leading-snug">
                    {fac.name}
                  </h3>

                  <p className="text-xs text-slate-600 mt-2 leading-relaxed">
                    {fac.description}
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-200">
                  <div className="text-[11px] font-semibold text-slate-700 mb-2">Fitur Utama:</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 text-xs text-slate-600">
                    {fac.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[11px]">
                        <Check className="w-3 h-3 text-emerald-600 shrink-0" />
                        <span className="truncate">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Gallery Sub-section */}
        <div id="galeri" className="pt-8 border-t border-slate-200">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-8">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-slate-900 tracking-tight">
                Galeri Dokumentasi & Kegiatan
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Potret dinamika belajar, pembinaan kepemimpinan, dan torehan prestasi siswa.
              </p>
            </div>

            {/* Filter buttons */}
            <div className="flex flex-wrap items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 self-start sm:self-auto">
              {galleryCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedGalleryCategory(cat)}
                  className={`px-3 py-1.5 text-xs font-semibold rounded-lg transition-all cursor-pointer whitespace-nowrap ${
                    selectedGalleryCategory === cat
                      ? 'bg-white text-slate-900 shadow-sm'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                onClick={() => setPreviewItem(item)}
                className="group relative bg-slate-100 rounded-xl overflow-hidden border border-slate-200 cursor-pointer h-64"
              >
                <img
                  src={item.imageUrl}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent opacity-90 group-hover:opacity-100 transition-opacity" />

                <div className="absolute bottom-3 left-3 right-3 text-white">
                  <div className="flex items-center justify-between text-[10px] text-emerald-300 font-medium mb-1">
                    <span>{item.category}</span>
                    <span>{item.date}</span>
                  </div>
                  <h4 className="text-xs font-bold line-clamp-2 leading-snug">
                    {item.title}
                  </h4>
                </div>

                <div className="absolute top-3 right-3 w-7 h-7 rounded-full bg-slate-900/60 text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Lightbox Modal */}
        {previewItem && (
          <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-white rounded-2xl max-w-2xl w-full overflow-hidden border border-slate-200 shadow-2xl relative">
              <button
                onClick={() => setPreviewItem(null)}
                className="absolute right-4 top-4 z-10 w-9 h-9 rounded-full bg-slate-900/70 hover:bg-slate-900 text-white flex items-center justify-center transition-colors cursor-pointer"
                aria-label="Tutup"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="max-h-[60vh] bg-slate-900">
                <img
                  src={previewItem.imageUrl}
                  alt={previewItem.title}
                  className="w-full h-full object-contain max-h-[60vh] mx-auto"
                  referrerPolicy="no-referrer"
                />
              </div>

              <div className="p-6">
                <div className="flex items-center gap-2 text-xs text-emerald-700 font-semibold mb-1">
                  <span>{previewItem.category}</span>
                  <span aria-hidden="true">·</span>
                  <span className="text-slate-500 font-normal">{previewItem.date}</span>
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {previewItem.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {previewItem.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};
