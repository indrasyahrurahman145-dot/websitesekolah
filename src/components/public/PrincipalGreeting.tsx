import React from 'react';
import { useSchool } from '../../context/SchoolContext';
import { Check, Quote, GraduationCap } from 'lucide-react';
import principalImg from '../../assets/images/principal_headshot_1790741491996.jpg';

export const PrincipalGreeting: React.FC = () => {
  const { profile } = useSchool();

  return (
    <section id="profil" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-12">
          <div className="flex items-center gap-2 text-xs font-semibold text-emerald-700 uppercase tracking-wider mb-2">
            <span>Profil Satuan Pendidikan</span>
            <span aria-hidden="true">·</span>
            <span>Visi & Amanah Pendidikan</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight">
            Sambutan Kepala Sekolah & Landasan Filosofis
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Principal Headshot Column */}
          <div className="lg:col-span-4">
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-4 text-center">
              <div className="relative mx-auto w-48 h-48 sm:w-56 sm:h-56 rounded-xl overflow-hidden shadow-sm mb-4">
                <img
                  src={principalImg}
                  alt={profile.principalName}
                  className="w-full h-full object-cover object-center"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="text-lg font-bold text-slate-900">{profile.principalName}</h3>
              <p className="text-xs text-emerald-700 font-medium mt-0.5">{profile.principalTitle}</p>
              <div className="text-xs text-slate-500 font-mono mt-1">NIP: {profile.principalNip}</div>
              <div className="mt-4 pt-3 border-t border-slate-200 text-xs text-slate-600 italic">
                "{profile.motto}"
              </div>
            </div>
          </div>

          {/* Letter / Sambutan Body */}
          <div className="lg:col-span-8 space-y-6">
            <div className="relative pl-6 border-l-2 border-emerald-600">
              <Quote className="absolute -left-3 -top-2 w-6 h-6 text-emerald-600 bg-white" />
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-normal">
                <em>Assalamu'alaikum Warahmatullahi Wabarakatuh, Salam Sejahtera untuk kita semua.</em>
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mt-3">
                Selamat datang di portal resmi <strong>{profile.name}</strong>. Pendidikan bukan sekadar proses pengisian wadah pengetahuan, melainkan penyalaan api semangat riset, budi pekerti, dan kepemimpinan dalam sanubari setiap anak bangsa.
              </p>
              <p className="text-sm sm:text-base text-slate-700 leading-relaxed mt-3">
                Melalui penerapan <strong>{profile.curriculum}</strong>, kami memastikan setiap peserta didik mendapatkan ruang eksplorasi minat dan bakat secara komprehensif. Mulai dari penguatan sains eksperimental, pemanfaatan kecerdasan buatan etis, hingga pelestarian seni budaya Nusantara, kami berkomitmen mendampingi putra-putri Anda menembus perguruan tinggi terbaik dunia dan menjadi agen perubahan bangsa.
              </p>
            </div>

            {/* Visi & Misi Box */}
            <div className="bg-slate-50 border border-slate-200 rounded-xl p-6 mt-8">
              <div className="flex items-center gap-2 mb-3">
                <GraduationCap className="w-5 h-5 text-emerald-700" />
                <h4 className="text-base font-bold text-slate-900">Visi Sekolah</h4>
              </div>
              <p className="text-sm text-slate-800 font-medium leading-relaxed mb-6 italic bg-white p-4 rounded-lg border border-slate-200">
                "{profile.vision}"
              </p>

              <h4 className="text-sm font-bold text-slate-900 mb-3">Misi Unggulan Satuan Pendidikan</h4>
              <ul className="space-y-2.5">
                {profile.missions.map((mission, idx) => (
                  <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-700 leading-relaxed">
                    <span className="w-5 h-5 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5" />
                    </span>
                    <span>{mission}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
