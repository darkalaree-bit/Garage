
import React from 'react';

const ContactManager: React.FC = () => {
  const contactInfo = [
    {
      title: "Téléphone",
      value: "01 23 45 67 89",
      icon: "fa-phone",
      color: "bg-[#1b4332]/20 text-[#2d6a4f]",
      link: "tel:0123456789"
    },
    {
      title: "Instagram",
      value: "@garagedalex_officiel",
      icon: "fa-brands fa-instagram",
      color: "bg-[#582f0e]/20 text-[#7f4f24]",
      link: "https://instagram.com"
    },
    {
      title: "Adresse",
      value: "123 Rue de la Mécanique, Paris",
      icon: "fa-location-dot",
      color: "bg-[#1b4332]/20 text-[#2d6a4f]",
      link: "https://maps.google.com"
    },
    {
      title: "Email",
      value: "contact@garagedalex.fr",
      icon: "fa-envelope",
      color: "bg-[#582f0e]/20 text-[#7f4f24]",
      link: "mailto:contact@garagedalex.fr"
    }
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contactInfo.map((info, idx) => (
          <a 
            key={idx} 
            href={info.link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-white/95 backdrop-blur-sm p-8 rounded-[2rem] border-2 border-[#582f0e]/20 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all flex items-center group"
          >
            <div className={`w-16 h-16 ${info.color} rounded-2xl flex items-center justify-center text-2xl mr-6 transition-transform group-hover:scale-110 border border-[#582f0e]/10`}>
              <i className={`fas ${info.icon}`}></i>
            </div>
            <div>
              <h3 className="text-[10px] font-black text-[#582f0e] uppercase tracking-widest mb-1">{info.title}</h3>
              <p className="text-xl font-black text-[#1b4332] tracking-tight">{info.value}</p>
            </div>
            <div className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-[#582f0e]">
              <i className="fas fa-external-link-alt"></i>
            </div>
          </a>
        ))}
      </div>

      <div className="bg-[#1a0f0a]/60 backdrop-blur-md rounded-[3rem] p-10 text-[#f5f1e6] overflow-hidden relative border-4 border-[#582f0e] shadow-2xl">
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#1b4332]/10 rounded-full -mr-20 -mt-20 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div className="max-w-md">
            <h2 className="text-3xl font-black mb-4 text-[#f5f1e6] uppercase tracking-tight">Horaires de l'Atelier</h2>
            <p className="text-[#dda15e] mb-6 font-bold">Alex et son équipe vous accueillent avec la rigueur des grands artisans.</p>
            <div className="space-y-3">
              <div className="flex justify-between border-b border-[#582f0e]/30 pb-2">
                <span className="font-bold text-[#7f4f24] uppercase text-[10px] tracking-widest">Lundi - Vendredi</span>
                <span className="font-black text-[#f5f1e6]">08:00 - 18:00</span>
              </div>
              <div className="flex justify-between border-b border-[#582f0e]/30 pb-2">
                <span className="font-bold text-[#7f4f24] uppercase text-[10px] tracking-widest">Samedi</span>
                <span className="font-black text-[#f5f1e6]">09:00 - 12:00</span>
              </div>
              <div className="flex justify-between text-[#7f4f24]/50 pb-2">
                <span className="font-bold uppercase text-[10px] tracking-widest">Dimanche</span>
                <span className="font-black italic">Fermé</span>
              </div>
            </div>
          </div>
          <div className="bg-[#2d1a12] border-4 border-[#582f0e] p-8 rounded-[2.5rem] md:w-80 shadow-2xl">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-[#1b4332] text-white rounded-full flex items-center justify-center shadow-lg border border-[#2d6a4f]">
                <i className="fas fa-check"></i>
              </div>
              <span className="font-black text-[#f5f1e6] uppercase text-[10px] tracking-tighter">Urgence Dépannage</span>
            </div>
            <p className="text-xs text-[#7f4f24] mb-4 font-black uppercase">Service Remorquage 24/7</p>
            <p className="text-2xl font-black text-[#f5f1e6] tracking-tighter">01 88 99 00 11</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactManager;
