
import React from 'react';

interface HeroProps {
  onGoToCalendar: () => void;
  onGoToPricing: () => void;
}

const Hero: React.FC<HeroProps> = ({ onGoToCalendar, onGoToPricing }) => {
  return (
    <div className="relative rounded-[3rem] overflow-hidden bg-[#1b4332] border-4 border-[#582f0e] text-white shadow-2xl">
      {/* L'image est maintenant plus visible (opacity-70) */}
      <div className="absolute right-0 top-0 bottom-0 w-3/5 opacity-70 hidden md:block">
        <img 
          src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&q=80&w=2000" 
          alt="Vintage Car Workshop" 
          className="w-full h-full object-cover"
        />
        {/* Gradient ajusté pour laisser passer l'image */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#1b4332] via-[#1b4332]/60 to-transparent"></div>
      </div>
      
      <div className="relative px-10 py-20 md:px-20 md:py-32 max-w-3xl z-10">
        <span className="inline-block px-5 py-2 bg-[#582f0e] text-white rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-8 shadow-xl border border-[#7f4f24]">
          Atelier de Prestige & Tradition
        </span>
        <h1 className="text-5xl md:text-7xl font-black mb-8 leading-[1.1] text-white uppercase tracking-tighter drop-shadow-md">
          L'art de la <span className="text-[#7f4f24]">Mécanique</span> Noble
        </h1>
        <p className="text-xl text-[#f5f1e6] mb-10 leading-relaxed max-w-xl font-bold italic drop-shadow">
          Alex vous accueille dans un cadre authentique où chaque coup de clé est une signature. Restauration, entretien et passion au cœur de notre atelier.
        </p>
        <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6">
          <button 
            onClick={onGoToCalendar}
            className="bg-[#582f0e] text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-[#7f4f24] transition-all shadow-2xl flex items-center justify-center text-sm border-2 border-[#7f4f24]"
          >
            Prendre Date
            <i className="fas fa-calendar-check ml-3"></i>
          </button>
          <button 
            onClick={onGoToPricing}
            className="bg-white/10 backdrop-blur-md border-2 border-white/30 text-white px-10 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-white/20 transition-all text-sm"
          >
            Nos Services
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hero;
