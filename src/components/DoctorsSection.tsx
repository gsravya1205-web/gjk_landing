import React from 'react';
import { GraduationCap, Ribbon, Calendar } from 'lucide-react';
import { Translation } from '../data/translations';

interface DoctorsSectionProps {
  t: Translation;
  onDoctorClick?: (doctorName: string) => void;
}

export const DoctorsSection: React.FC<DoctorsSectionProps> = ({ t, onDoctorClick }) => {
  return (
    <section id="doctors" className="py-12 sm:py-20 lg:py-24 bg-gradient-to-b from-[#FAF6FA] via-[#FFFFFF] to-[#FAF6FA] relative">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 sm:mb-14 space-y-2">
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-extrabold text-[#2A102D] tracking-tight">
            {t.doctors.title}
          </h2>

          <p className="text-xs sm:text-base text-[#56335B] font-medium leading-relaxed">
            {t.doctors.subtitle}
          </p>
        </div>

        {/* Doctor Cards */}
        <div className={`w-full mx-auto ${t.doctors.list.length === 1 ? 'max-w-3xl' : 'grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10'}`}>
          {t.doctors.list.map((doctor) => (
            <div
              key={doctor.id}
              className="bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-8 border border-[#652D6C]/15 shadow-xl shadow-purple-950/5 relative overflow-hidden flex flex-col justify-between group transition-all duration-300 hover:shadow-2xl hover:border-[#652D6C]/25"
            >
              
              {/* Main Card Content */}
              <div className="flex flex-col sm:flex-row gap-5 sm:gap-7 items-center sm:items-start text-center sm:text-left">
                
                {/* Left Side: Avatar Box & Name Badge Pill */}
                <div className="flex flex-col items-center shrink-0 w-full sm:w-auto">
                  <div className="w-32 h-32 sm:w-44 sm:h-44 rounded-2xl p-[3px] bg-gradient-to-tr from-[#652D6C] via-[#8E3294] to-[#4D1F53] shadow-md overflow-hidden">
                    <img
                      src={doctor.photo}
                      alt={doctor.name}
                      className="w-full h-full object-cover object-top rounded-xl bg-white"
                      onError={(e) => {
                        (e.target as HTMLElement).setAttribute('src', '/dr-srujana.jpg');
                      }}
                    />
                  </div>

                  {/* Dark Purple Name Badge Pill Under Photo */}
                  <div className="mt-2.5 sm:mt-3.5 bg-[#602568] text-white px-4 sm:px-5 py-1 sm:py-1.5 rounded-full text-xs sm:text-sm font-extrabold shadow-sm tracking-wide text-center w-full max-w-[180px]">
                    {doctor.name}
                  </div>
                </div>

                {/* Right Side: Details & Qualifications */}
                <div className="space-y-3 sm:space-y-3.5 flex-1 w-full pt-1 sm:pt-0">
                  
                  {/* Doctor Name & Experience Badge */}
                  <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-2 sm:gap-3">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#2A102D] tracking-tight">
                      {doctor.name}
                    </h3>
                    {doctor.expBadge && (
                      <span className="inline-block px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-[#FAF3FB] border border-[#652D6C]/20 text-[#652D6C] text-[11px] sm:text-xs font-black uppercase tracking-wider shadow-sm shrink-0">
                        {doctor.expBadge}
                      </span>
                    )}
                  </div>

                  {/* Title / Designation */}
                  <p className="text-xs sm:text-sm lg:text-base font-bold text-[#652D6C]">
                    {doctor.title}
                  </p>

                  {/* Qualifications Pill Box */}
                  {doctor.qualifications && (
                    <div className="p-2.5 sm:p-3.5 rounded-xl sm:rounded-2xl bg-[#FAF3FB] border border-[#652D6C]/15 flex items-center justify-center sm:justify-start gap-2.5 sm:gap-3 text-left">
                      <GraduationCap className="w-4 h-4 sm:w-5 sm:h-5 text-[#8E3294] shrink-0" />
                      <p className="text-[11px] sm:text-sm font-bold text-[#2A102D] leading-snug">
                        {doctor.qualifications}
                      </p>
                    </div>
                  )}

                  {/* Bio Description - simple & concise */}
                  <p className="text-xs sm:text-sm text-[#56335B] font-medium leading-relaxed">
                    {doctor.bio}
                  </p>

                </div>

              </div>

              {/* Bottom Achievement Ribbon Badge & Action Button */}
              <div className="mt-5 sm:mt-6 pt-4 sm:pt-5 border-t border-[#652D6C]/10 flex flex-col sm:flex-row items-center justify-between gap-3 sm:gap-4">
                {doctor.achievementBadge ? (
                  <div className="flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm font-extrabold text-[#652D6C] text-center sm:text-left">
                    <Ribbon className="w-4 h-4 text-[#8E3294] shrink-0" />
                    <span>{doctor.achievementBadge}</span>
                  </div>
                ) : (
                  <div></div>
                )}

                {onDoctorClick && (
                  <button
                    onClick={() => onDoctorClick(doctor.name)}
                    className="w-full sm:w-auto sm:ml-auto bg-gradient-to-r from-[#7E2A85] to-[#602068] hover:from-[#6E2274] hover:to-[#501856] text-white px-5 sm:px-6 py-2.5 rounded-xl sm:rounded-2xl text-xs sm:text-sm font-bold flex items-center justify-center gap-2 shadow-md shadow-[#652D6C]/20 hover:shadow-lg hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer"
                  >
                    <span>{t.nav.bookAppointment}</span>
                    <Calendar className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};


