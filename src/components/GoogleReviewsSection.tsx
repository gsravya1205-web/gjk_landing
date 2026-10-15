import React from 'react';
import { Star, CheckCircle, ExternalLink, MessageSquareHeart, Quote } from 'lucide-react';
import { Translation } from '../data/translations';

interface GoogleReviewsSectionProps {
  t: Translation;
  onBookClick?: () => void;
}

export const GoogleReviewsSection: React.FC<GoogleReviewsSectionProps> = ({ t, onBookClick }) => {
  const reviews = t.reviews;
  if (!reviews) return null;

  const googleReviewsUrl = "https://www.google.com/maps/search/?api=1&query=Vizag+IVF+Centre+Gajuwaka+Visakhapatnam";

  // Google multi-colored G SVG icon
  const GoogleGIcon = () => (
    <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      />
      <path
        fill="#34A853"
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      />
      <path
        fill="#FBBC05"
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
      />
      <path
        fill="#EA4335"
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
      />
    </svg>
  );

  return (
    <section id="reviews" className="py-10 sm:py-16 lg:py-20 bg-gradient-to-b from-[#FFFFFF] via-[#FAF6FA] to-[#FAF6FA] relative overflow-hidden">
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-10 right-0 w-80 h-80 bg-[#652D6C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#9A389F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-6 sm:mb-10 space-y-2">
          
          {/* Badge Pill with Google Icon */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#652D6C]/20 shadow-xs text-xs sm:text-sm font-extrabold text-[#652D6C]">
            <GoogleGIcon />
            <span>{reviews.badge}</span>
          </div>

          <h2 className="text-xl sm:text-3xl lg:text-4xl font-extrabold text-[#2A102D] tracking-tight">
            {reviews.title}
          </h2>

          <p className="text-xs sm:text-sm lg:text-base text-[#56335B] font-medium leading-relaxed max-w-2xl mx-auto">
            {reviews.subtitle}
          </p>

          {/* Aggregate Rating Banner */}
          <div className="pt-1.5 flex items-center justify-center gap-3 sm:gap-4 flex-wrap">
            <div className="inline-flex items-center gap-2 bg-white px-3 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-yellow-400/40 shadow-xs">
              <span className="text-xs sm:text-sm font-black text-[#2A102D]">{reviews.ratingText}</span>
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <span className="text-[10px] sm:text-xs font-bold text-[#652D6C] pl-1 border-l border-gray-200">
                {reviews.ratingCount}
              </span>
            </div>

            <a
              href={googleReviewsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-bold text-[#652D6C] hover:text-[#9A389F] hover:underline underline-offset-4 transition-colors"
            >
              <span>{reviews.viewOnGoogle}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Reviews Grid - Highly responsive for all screen sizes (mobile 320px+ to desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {reviews.items.map((item, idx) => (
            <div
              key={idx}
              className="bg-white rounded-2xl p-4 sm:p-5 border border-[#652D6C]/15 shadow-sm hover:shadow-xl hover:border-[#652D6C]/30 transition-all duration-300 flex flex-col justify-between group relative"
            >
              {/* Decorative Subtle Quote Icon */}
              <Quote className="w-5 h-5 sm:w-6 sm:h-6 text-purple-100 absolute top-4 right-4 pointer-events-none group-hover:text-purple-200 transition-colors" />

              <div>
                {/* Top Row: Stars & Verified Badge */}
                <div className="flex items-center justify-between gap-1.5 mb-2.5">
                  <div className="flex items-center gap-0.5">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    ))}
                  </div>

                  <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full shrink-0">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Google Verified</span>
                  </span>
                </div>

                {/* Treatment Pill */}
                {item.treatment && (
                  <div className="mb-2">
                    <span className="inline-block text-[10px] sm:text-[11px] font-bold text-[#652D6C] bg-[#FAF3FB] border border-[#652D6C]/15 px-2.5 py-0.5 rounded-full">
                      {item.treatment}
                    </span>
                  </div>
                )}

                {/* Review Text */}
                <p className="text-xs sm:text-[13px] text-[#4A264E] font-normal leading-relaxed mb-3 sm:mb-4">
                  "{item.review}"
                </p>
              </div>

              {/* Author Footer */}
              <div className="pt-2.5 sm:pt-3 border-t border-[#652D6C]/10 flex items-center gap-2.5">
                {/* Initials Avatar */}
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#652D6C] to-[#9A389F] text-white flex items-center justify-center font-black text-xs shrink-0 shadow-xs">
                  {item.name.charAt(0)}
                </div>

                {/* Author Details */}
                <div className="min-w-0 flex-1">
                  <h4 className="text-xs sm:text-sm font-extrabold text-[#2A102D] truncate">
                    {item.name}
                  </h4>
                  <div className="flex items-center justify-between text-[10px] sm:text-[11px] text-[#7E5784] font-medium">
                    <span className="truncate">{item.location}</span>
                    <span className="shrink-0 opacity-75">{item.timeAgo}</span>
                  </div>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom Reassuring Booking CTA Card */}
        <div className="mt-6 sm:mt-8 bg-gradient-to-r from-[#4A164E] via-[#652D6C] to-[#8F2D95] rounded-2xl p-4 sm:p-5 text-white shadow-md border border-yellow-300/30 flex flex-col sm:flex-row items-center justify-between gap-3.5 sm:gap-4">
          <div className="flex items-center gap-3 text-left w-full sm:w-auto">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-white/10 flex items-center justify-center shrink-0">
              <MessageSquareHeart className="w-5 h-5 text-yellow-300" />
            </div>
            <div>
              <h3 className="text-xs sm:text-sm font-extrabold text-white">
                Start Your Own Miracle Story Today
              </h3>
              <p className="text-[11px] sm:text-xs text-purple-200 font-medium">
                Book a confidential, free consultation with our senior fertility experts in Gajuwaka.
              </p>
            </div>
          </div>

          <button
            onClick={onBookClick}
            className="w-full sm:w-auto px-4 sm:px-5 py-2 sm:py-2.5 rounded-full text-xs sm:text-sm font-black bg-yellow-400 text-[#4D1F53] hover:bg-yellow-300 transition-all shadow-md shrink-0 cursor-pointer active:scale-95 text-center"
          >
            {t.nav.bookAppointment}
          </button>
        </div>

      </div>
    </section>
  );
};
