import React from 'react';

interface IllustrationProps {
  className?: string;
  badge?: string;
}

export const TraditionalWeddingIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-48", badge }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-amber-100 to-amber-200 border-2 border-amber-300 shadow-inner flex flex-col items-center justify-center p-3 select-none ${className}`}>
      {badge && (
        <span className="absolute top-2 left-2 z-10 px-2.5 py-1 bg-amber-700 text-amber-50 text-xs font-bold rounded-full shadow">
          {badge}
        </span>
      )}
      <svg viewBox="0 0 400 240" className="w-full h-full max-h-56" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Sky & Hanok Roof */}
        <path d="M 40 50 Q 200 20 360 50 L 370 70 Q 200 45 30 70 Z" fill="#2d3748" />
        <path d="M 60 70 L 340 70 L 330 85 L 70 85 Z" fill="#718096" />
        
        {/* Hanok Pillars & Wooden Frame */}
        <rect x="75" y="85" width="16" height="135" fill="#8d5b4c" rx="3" />
        <rect x="309" y="85" width="16" height="135" fill="#8d5b4c" rx="3" />
        <rect x="60" y="80" width="280" height="12" fill="#a06857" rx="2" />
        <rect x="91" y="92" width="218" height="100" fill="#fef3c7" opacity="0.6" rx="4" />
        
        {/* Traditional Lanterns (Cheongsachorong) */}
        <g transform="translate(85, 90)">
          <line x1="0" y1="0" x2="0" y2="15" stroke="#78350f" strokeWidth="2" />
          <rect x="-8" y="15" width="16" height="14" fill="#ef4444" rx="2" />
          <rect x="-8" y="29" width="16" height="14" fill="#3b82f6" rx="2" />
          <line x1="-4" y1="43" x2="-4" y2="52" stroke="#eab308" strokeWidth="1.5" />
          <line x1="0" y1="43" x2="0" y2="55" stroke="#eab308" strokeWidth="1.5" />
          <line x1="4" y1="43" x2="4" y2="52" stroke="#eab308" strokeWidth="1.5" />
        </g>
        <g transform="translate(315, 90)">
          <line x1="0" y1="0" x2="0" y2="15" stroke="#78350f" strokeWidth="2" />
          <rect x="-8" y="15" width="16" height="14" fill="#ef4444" rx="2" />
          <rect x="-8" y="29" width="16" height="14" fill="#3b82f6" rx="2" />
          <line x1="-4" y1="43" x2="-4" y2="52" stroke="#eab308" strokeWidth="1.5" />
          <line x1="0" y1="43" x2="0" y2="55" stroke="#eab308" strokeWidth="1.5" />
          <line x1="4" y1="43" x2="4" y2="52" stroke="#eab308" strokeWidth="1.5" />
        </g>

        {/* Courtyard Ground */}
        <path d="M 0 190 Q 200 180 400 190 L 400 240 L 0 240 Z" fill="#d97706" opacity="0.25" />
        <ellipse cx="200" cy="210" rx="140" ry="25" fill="#fcd34d" opacity="0.5" />

        {/* Wedding Ritual Table (초례상) */}
        <g transform="translate(160, 160)">
          <rect x="0" y="10" width="80" height="25" fill="#92400e" rx="4" />
          <rect x="6" y="35" width="10" height="30" fill="#78350f" rx="2" />
          <rect x="64" y="35" width="10" height="30" fill="#78350f" rx="2" />
          {/* Wooden Geese (기러기) */}
          <ellipse cx="25" cy="5" rx="8" ry="5" fill="#b45309" />
          <path d="M 30 5 Q 36 2 34 8" stroke="#78350f" strokeWidth="2" fill="none" />
          {/* Pine Branch in Vase */}
          <rect x="52" y="3" width="8" height="10" fill="#047857" rx="2" />
          <circle cx="56" cy="-2" r="6" fill="#15803d" />
        </g>

        {/* Traditional Groom (신랑 - 사모관대) */}
        <g transform="translate(115, 105)">
          {/* Hat (Samo) */}
          <rect x="12" y="0" width="26" height="18" fill="#1e293b" rx="4" />
          <ellipse cx="25" cy="18" rx="18" ry="4" fill="#0f172a" />
          <rect x="0" y="8" width="12" height="6" fill="#1e293b" rx="2" />
          <rect x="38" y="8" width="12" height="6" fill="#1e293b" rx="2" />
          {/* Face */}
          <circle cx="25" cy="27" r="12" fill="#fed7aa" />
          <ellipse cx="21" cy="26" rx="1.5" ry="2" fill="#1e293b" />
          <ellipse cx="29" cy="26" rx="1.5" ry="2" fill="#1e293b" />
          <path d="M 22 32 Q 25 35 28 32" stroke="#b45309" strokeWidth="1.5" fill="none" />
          {/* Blue Official Robe (Dallyeong) */}
          <path d="M 10 39 L 40 39 L 48 100 L 2 100 Z" fill="#1d4ed8" />
          {/* Chest Insignia (Hyungbae) */}
          <rect x="18" y="47" width="14" height="14" fill="#fde047" rx="2" />
          <rect x="20" y="49" width="10" height="10" fill="#dc2626" rx="1" />
          {/* White collar */}
          <path d="M 21 39 L 25 46 L 29 39" stroke="#ffffff" strokeWidth="2.5" fill="none" />
        </g>

        {/* Traditional Bride (신부 - 활옷 & 족두리 & 연지곤지) */}
        <g transform="translate(235, 105)">
          {/* Jokduri Headdress */}
          <path d="M 16 2 L 34 2 L 30 16 L 20 16 Z" fill="#0f172a" />
          <circle cx="25" cy="2" r="4" fill="#dc2626" />
          <circle cx="25" cy="6" r="2" fill="#eab308" />
          {/* Hair */}
          <circle cx="25" cy="22" r="14" fill="#18181b" />
          {/* Face */}
          <circle cx="25" cy="27" r="11" fill="#ffedd5" />
          {/* Yeonji-gonji (Red Cheek Dots & Forehead Dot) */}
          <circle cx="25" cy="21" r="1.5" fill="#ef4444" />
          <circle cx="18" cy="28" r="2" fill="#ef4444" />
          <circle cx="32" cy="28" r="2" fill="#ef4444" />
          {/* Eyes & Smile */}
          <path d="M 19 25 Q 22 23 23 25" stroke="#18181b" strokeWidth="1.5" fill="none" />
          <path d="M 27 25 Q 28 23 31 25" stroke="#18181b" strokeWidth="1.5" fill="none" />
          <path d="M 23 33 Q 25 35 27 33" stroke="#e11d48" strokeWidth="1.5" fill="none" />
          {/* Red Hwarot / Wonsam Robe */}
          <path d="M 10 39 L 40 39 L 48 100 L 2 100 Z" fill="#dc2626" />
          {/* Striped multi-colored sleeves (Saekdong) */}
          <path d="M 2 48 L 10 48 L 8 70 L 0 70 Z" fill="#3b82f6" />
          <path d="M 0 70 L 8 70 L 6 85 L -2 85 Z" fill="#eab308" />
          <path d="M 40 48 L 48 48 L 50 70 L 42 70 Z" fill="#3b82f6" />
          <path d="M 42 70 L 50 70 L 52 85 L 44 85 Z" fill="#eab308" />
          {/* Hands covered with Hansam (white cloth) */}
          <rect x="18" y="55" width="14" height="24" fill="#ffffff" rx="3" />
        </g>
      </svg>
      <div className="text-center mt-1">
        <span className="text-xs font-bold text-amber-900 bg-amber-200/90 px-2 py-0.5 rounded-full">
          집 마당 전통 혼례 (사모관대와 활옷)
        </span>
      </div>
    </div>
  );
};

export const ModernWeddingIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-48", badge }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-sky-50 via-rose-50 to-pink-100 border-2 border-pink-200 shadow-inner flex flex-col items-center justify-center p-3 select-none ${className}`}>
      {badge && (
        <span className="absolute top-2 left-2 z-10 px-2.5 py-1 bg-pink-600 text-white text-xs font-bold rounded-full shadow">
          {badge}
        </span>
      )}
      <svg viewBox="0 0 400 240" className="w-full h-full max-h-56" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Wedding Hall Background with Flowers & Arch */}
        <path d="M 70 200 C 70 80 330 80 330 200" stroke="#f472b6" strokeWidth="12" strokeDasharray="6 6" fill="none" opacity="0.4" />
        <path d="M 80 200 C 80 90 320 90 320 200" stroke="#fb7185" strokeWidth="6" fill="none" opacity="0.5" />
        
        {/* Flower decorations on Arch */}
        <circle cx="120" cy="110" r="10" fill="#f43f5e" />
        <circle cx="132" cy="115" r="7" fill="#fb7185" />
        <circle cx="200" cy="85" r="12" fill="#ec4899" />
        <circle cx="215" cy="88" r="8" fill="#fda4af" />
        <circle cx="280" cy="110" r="10" fill="#f43f5e" />
        <circle cx="268" cy="115" r="7" fill="#fb7185" />

        {/* Chandelier / Sparkles */}
        <g transform="translate(190, 15)">
          <path d="M 10 0 L 10 15 M 0 15 L 20 15 L 10 30 Z" fill="#fde047" stroke="#eab308" strokeWidth="1.5" />
          <circle cx="2" cy="20" r="2" fill="#fbbf24" />
          <circle cx="18" cy="20" r="2" fill="#fbbf24" />
          <circle cx="10" cy="34" r="3" fill="#fef08a" />
        </g>

        {/* Stage / Carpet */}
        <path d="M 20 210 L 380 210 L 350 240 L 50 240 Z" fill="#fda4af" opacity="0.4" />
        <path d="M 150 180 L 250 180 L 270 240 L 130 240 Z" fill="#f43f5e" opacity="0.3" />

        {/* Modern Groom (신랑 - 턱시도 & 나비넥타이) */}
        <g transform="translate(130, 95)">
          {/* Hair & Head */}
          <path d="M 14 15 Q 25 5 36 15 L 36 23 L 14 23 Z" fill="#1e293b" />
          <circle cx="25" cy="27" r="12" fill="#fed7aa" />
          <ellipse cx="21" cy="26" rx="1.5" ry="2" fill="#1e293b" />
          <ellipse cx="29" cy="26" rx="1.5" ry="2" fill="#1e293b" />
          <path d="M 22 32 Q 25 35 28 32" stroke="#b45309" strokeWidth="1.5" fill="none" />
          {/* Tuxedo Suit */}
          <path d="M 8 40 L 42 40 L 46 110 L 4 110 Z" fill="#1e293b" />
          {/* White Shirt & Bowtie */}
          <polygon points="18,40 32,40 25,65" fill="#ffffff" />
          <path d="M 22 43 L 28 47 M 28 43 L 22 47" stroke="#000000" strokeWidth="2" />
          <circle cx="25" cy="45" r="2" fill="#000000" />
        </g>

        {/* Modern Bride (신부 - 하얀 웨딩드레스 & 부케 & 베일) */}
        <g transform="translate(225, 90)">
          {/* Veil (면사포) */}
          <path d="M 8 18 Q 25 5 42 18 Q 50 60 48 100 Q 25 110 2 100 Z" fill="#ffffff" opacity="0.45" />
          {/* Tiara */}
          <polygon points="20,13 25,8 30,13 27,15 23,15" fill="#f59e0b" />
          <circle cx="25" cy="9" r="1.5" fill="#ffffff" />
          {/* Hair */}
          <circle cx="25" cy="23" r="13" fill="#332211" />
          <circle cx="25" cy="12" r="5" fill="#332211" />
          {/* Face */}
          <circle cx="25" cy="27" r="11" fill="#ffedd5" />
          <ellipse cx="21" cy="26" rx="1.5" ry="2" fill="#1e293b" />
          <ellipse cx="29" cy="26" rx="1.5" ry="2" fill="#1e293b" />
          <circle cx="17" cy="28" r="2" fill="#fda4af" />
          <circle cx="33" cy="28" r="2" fill="#fda4af" />
          <path d="M 22 33 Q 25 36 28 33" stroke="#e11d48" strokeWidth="1.5" fill="none" />
          {/* White Wedding Dress */}
          <path d="M 12 40 Q 25 43 38 40 L 52 115 L -2 115 Z" fill="#ffffff" stroke="#fbcfe8" strokeWidth="2" />
          <path d="M 16 65 Q 25 70 34 65" stroke="#f472b6" strokeWidth="1" fill="none" />
          <path d="M 10 90 Q 25 96 40 90" stroke="#f472b6" strokeWidth="1" fill="none" />
          {/* Bouquet of Flowers (부케) */}
          <g transform="translate(17, 60)">
            <circle cx="6" cy="6" r="6" fill="#f43f5e" />
            <circle cx="12" cy="4" r="5" fill="#fb7185" />
            <circle cx="10" cy="10" r="5" fill="#fbcfe8" />
            <circle cx="4" cy="10" r="4" fill="#a7f3d0" />
          </g>
        </g>

        {/* Clapping Guests / Hearts */}
        <g transform="translate(60, 160)">
          <circle cx="10" cy="10" r="8" fill="#94a3b8" />
          <path d="M 2 25 C 2 18 18 18 18 25" fill="#64748b" />
        </g>
        <g transform="translate(325, 160)">
          <circle cx="10" cy="10" r="8" fill="#94a3b8" />
          <path d="M 2 25 C 2 18 18 18 18 25" fill="#64748b" />
        </g>
        <path d="M 200 45 Q 205 38 210 45 Q 205 52 200 56 Q 195 52 190 45 Q 195 38 200 45" fill="#f43f5e" opacity="0.6" />
      </svg>
      <div className="text-center mt-1">
        <span className="text-xs font-bold text-pink-900 bg-pink-200/90 px-2 py-0.5 rounded-full">
          현대 예식장 (턱시도와 하얀 웨딩드레스)
        </span>
      </div>
    </div>
  );
};

export const TraditionalChuseokIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-48", badge }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-indigo-900 via-indigo-950 to-slate-900 border-2 border-indigo-700 shadow-inner flex flex-col items-center justify-center p-3 select-none text-white ${className}`}>
      {badge && (
        <span className="absolute top-2 left-2 z-10 px-2.5 py-1 bg-amber-500 text-slate-900 text-xs font-bold rounded-full shadow">
          {badge}
        </span>
      )}
      <svg viewBox="0 0 400 240" className="w-full h-full max-h-56" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Harvest Full Moon (보름달) */}
        <circle cx="310" cy="65" r="42" fill="#fef08a" />
        <circle cx="310" cy="65" r="46" fill="#fde047" opacity="0.3" />
        <circle cx="310" cy="65" r="54" fill="#fde047" opacity="0.15" />
        <circle cx="300" cy="55" r="8" fill="#fef9c3" opacity="0.5" />
        
        {/* Stars */}
        <circle cx="50" cy="30" r="2" fill="#ffffff" opacity="0.8" />
        <circle cx="120" cy="45" r="1.5" fill="#ffffff" opacity="0.7" />
        <circle cx="210" cy="25" r="2" fill="#ffffff" opacity="0.8" />
        <circle cx="180" cy="70" r="1.5" fill="#ffffff" opacity="0.5" />

        {/* Hanok Eaves Roof */}
        <path d="M 0 50 Q 150 70 280 40 L 290 60 Q 140 85 0 75 Z" fill="#1e293b" />

        {/* Floor Mat (돗자리) */}
        <ellipse cx="190" cy="180" rx="140" ry="38" fill="#d97706" opacity="0.4" />
        <ellipse cx="190" cy="180" rx="125" ry="30" fill="#f59e0b" opacity="0.3" />

        {/* Steamer & Songpyeon with Pine Needles (시루와 송편) */}
        <g transform="translate(160, 160)">
          <ellipse cx="30" cy="15" rx="32" ry="12" fill="#78350f" />
          <rect x="-2" y="15" width="64" height="14" fill="#92400e" rx="4" />
          <ellipse cx="30" cy="29" rx="32" ry="10" fill="#78350f" />
          {/* Green songpyeon & white songpyeon */}
          <path d="M 12 14 Q 18 8 24 14 Z" fill="#10b981" />
          <path d="M 26 13 Q 32 7 38 13 Z" fill="#ffffff" />
          <path d="M 40 14 Q 46 8 52 14 Z" fill="#fde047" />
          {/* Pine needles (솔잎) */}
          <line x1="8" y1="16" x2="20" y2="12" stroke="#059669" strokeWidth="1.5" />
          <line x1="32" y1="16" x2="48" y2="14" stroke="#059669" strokeWidth="1.5" />
        </g>

        {/* Family Member 1 (Grandmother making songpyeon) */}
        <g transform="translate(80, 120)">
          <circle cx="25" cy="20" r="11" fill="#fed7aa" />
          <circle cx="25" cy="13" r="5" fill="#cbd5e1" />
          <ellipse cx="21" cy="20" rx="1.5" ry="1.5" fill="#1e293b" />
          <ellipse cx="29" cy="20" rx="1.5" ry="1.5" fill="#1e293b" />
          <path d="M 10 32 L 40 32 L 48 70 L 2 70 Z" fill="#0284c7" />
          <path d="M 2 70 L 48 70 L 42 78 L 8 78 Z" fill="#1e40af" />
        </g>

        {/* Family Member 2 (Child in Hanbok) */}
        <g transform="translate(250, 125)">
          <circle cx="22" cy="18" r="10" fill="#fed7aa" />
          <path d="M 12 12 Q 22 6 32 12 Z" fill="#18181b" />
          <ellipse cx="19" cy="18" rx="1.5" ry="1.5" fill="#1e293b" />
          <ellipse cx="26" cy="18" rx="1.5" ry="1.5" fill="#1e293b" />
          <path d="M 8 29 L 36 29 L 42 65 L 2 65 Z" fill="#f43f5e" />
          {/* Saekdong sleeves */}
          <rect x="2" y="32" width="7" height="6" fill="#eab308" />
          <rect x="35" y="32" width="7" height="6" fill="#eab308" />
        </g>
      </svg>
      <div className="text-center mt-1">
        <span className="text-xs font-bold text-amber-200 bg-indigo-950/80 px-2 py-0.5 rounded-full border border-amber-400/30">
          옛날 추석 (달맞이와 온 가족이 모여 빚는 송편)
        </span>
      </div>
    </div>
  );
};

export const ModernChuseokIllustration: React.FC<IllustrationProps> = ({ className = "w-full h-48", badge }) => {
  return (
    <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-b from-orange-50 via-amber-50 to-orange-100 border-2 border-orange-200 shadow-inner flex flex-col items-center justify-center p-3 select-none ${className}`}>
      {badge && (
        <span className="absolute top-2 left-2 z-10 px-2.5 py-1 bg-orange-600 text-white text-xs font-bold rounded-full shadow">
          {badge}
        </span>
      )}
      <svg viewBox="0 0 400 240" className="w-full h-full max-h-56" fill="none" xmlns="http://www.w3.org/2000/svg">
        {/* Modern Living Room Window & View */}
        <rect x="80" y="25" width="240" height="90" fill="#bae6fd" rx="8" />
        <line x1="200" y1="25" x2="200" y2="115" stroke="#ffffff" strokeWidth="4" />
        <line x1="80" y1="70" x2="320" y2="70" stroke="#ffffff" strokeWidth="4" />
        
        {/* City buildings in window */}
        <rect x="100" y="55" width="25" height="60" fill="#7dd3fc" />
        <rect x="140" y="45" width="30" height="70" fill="#38bdf8" />
        <rect x="220" y="50" width="28" height="65" fill="#38bdf8" />
        <rect x="270" y="60" width="30" height="55" fill="#7dd3fc" />

        {/* Modern Dining Table & Chairs */}
        <rect x="70" y="145" width="260" height="20" fill="#b45309" rx="4" />
        <rect x="90" y="165" width="16" height="50" fill="#92400e" rx="2" />
        <rect x="294" y="165" width="16" height="50" fill="#92400e" rx="2" />

        {/* Chuseok Gift Box & Modern Plated Songpyeon */}
        <g transform="translate(100, 120)">
          {/* Fruit Gift Box (사과/배 선물 세트) */}
          <rect x="0" y="5" width="45" height="24" fill="#ea580c" rx="3" />
          <rect x="18" y="5" width="8" height="24" fill="#fbbf24" />
          <text x="5" y="20" fill="#ffffff" fontSize="9" fontWeight="bold">선물세트</text>
        </g>

        {/* Delicious Songpyeon Plate */}
        <g transform="translate(180, 130)">
          <ellipse cx="25" cy="12" rx="30" ry="8" fill="#ffffff" stroke="#cbd5e1" strokeWidth="2" />
          <circle cx="12" cy="9" r="6" fill="#10b981" />
          <circle cx="22" cy="8" r="6" fill="#fde047" />
          <circle cx="32" cy="9" r="6" fill="#f43f5e" />
          <circle cx="38" cy="10" r="5" fill="#ffffff" stroke="#e2e8f0" />
        </g>

        {/* Travel Luggage (귀성길 / 연휴 여행 가방) */}
        <g transform="translate(265, 125)">
          <rect x="5" y="0" width="28" height="35" fill="#3b82f6" rx="4" />
          <path d="M 12 0 L 12 -6 L 26 -6 L 26 0" stroke="#1d4ed8" strokeWidth="2" fill="none" />
          <line x1="5" y1="12" x2="33" y2="12" stroke="#1d4ed8" strokeWidth="2" />
        </g>

        {/* Cheerful Modern Family Together */}
        <g transform="translate(130, 85)">
          <circle cx="20" cy="18" r="10" fill="#fed7aa" />
          <circle cx="16" cy="17" r="1.5" fill="#1e293b" />
          <circle cx="24" cy="17" r="1.5" fill="#1e293b" />
          <path d="M 18 22 Q 20 24 22 22" stroke="#ea580c" strokeWidth="1.5" fill="none" />
          <path d="M 6 29 L 34 29 L 38 60 L 2 60 Z" fill="#10b981" />
        </g>
        <g transform="translate(220, 85)">
          <circle cx="20" cy="18" r="10" fill="#fed7aa" />
          <circle cx="16" cy="17" r="1.5" fill="#1e293b" />
          <circle cx="24" cy="17" r="1.5" fill="#1e293b" />
          <path d="M 18 22 Q 20 24 22 22" stroke="#ea580c" strokeWidth="1.5" fill="none" />
          <path d="M 6 29 L 34 29 L 38 60 L 2 60 Z" fill="#6366f1" />
        </g>
      </svg>
      <div className="text-center mt-1">
        <span className="text-xs font-bold text-orange-950 bg-orange-200/90 px-2 py-0.5 rounded-full">
          오늘날 추석 (선물 세트, 떡집 송편, 가족 모임과 여행)
        </span>
      </div>
    </div>
  );
};
