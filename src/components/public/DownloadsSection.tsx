import React, { useState } from 'react';
import { useSchool } from '../../context/SchoolContext';
import { FileText, Download, CheckCircle2 } from 'lucide-react';

export const DownloadsSection: React.FC = () => {
  const { downloads } = useSchool();
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  const handleDownload = (id: string, title: string) => {
    setDownloadingId(id);
    setTimeout(() => {
      setDownloadingId(null);
      // Simulate file download
      const element = document.createElement('a');
      const file = new Blob([`Dokumen Resmi ${title}\nSMA Negeri 1 Nusantara\nTahun Ajaran 2026/2027`], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${title.toLowerCase().replace(/[^a-z0-9]/g, '_')}.txt`;
      document.body.appendChild(element);
      element.click();
      document.body.removeChild(element);
    }, 600);
  };

  return (
    <section id="unduhan" className="py-20 bg-slate-50 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            <span>Pusat Dokumen & Regulasi</span>
            <span aria-hidden="true">·</span>
            <span>Layanan Administrasi</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Unduhan Dokumen & Panduan Resmi
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            Unduh petunjuk teknis PPDB, formulir permohonan surat keterangan, dan kalender pendidikan.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {downloads.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-slate-200 rounded-xl p-5 hover:border-slate-300 hover:shadow-xs transition-all flex items-center justify-between gap-4"
            >
              <div className="flex items-start gap-3.5 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-emerald-50 text-emerald-700 flex items-center justify-center shrink-0 border border-emerald-100">
                  <FileText className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 font-medium mb-1">
                    <span className="text-emerald-700 font-semibold">{item.category}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{item.fileType}</span>
                    <span aria-hidden="true">·</span>
                    <span className="font-mono">{item.fileSize}</span>
                  </div>
                  <h3 className="text-xs sm:text-sm font-bold text-slate-900 truncate">
                    {item.title}
                  </h3>
                  <div className="text-[11px] text-slate-400 mt-1 font-mono">
                    Diperbarui: {item.date} · {item.downloadCount} kali diunduh
                  </div>
                </div>
              </div>

              <button
                onClick={() => handleDownload(item.id, item.title)}
                disabled={downloadingId === item.id}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-all shrink-0 cursor-pointer disabled:opacity-50"
              >
                {downloadingId === item.id ? (
                  <>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                    <span>Mengunduh...</span>
                  </>
                ) : (
                  <>
                    <Download className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Unduh</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
