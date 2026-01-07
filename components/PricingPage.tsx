
import React, { useState } from 'react';

interface QuoteModalProps { isOpen: boolean; onClose: () => void; selectedCategory: string; }
const QuoteModal: React.FC<QuoteModalProps> = ({ isOpen, onClose, selectedCategory }) => {
  const [formData, setFormData] = useState({ name: '', contact: '', vehicle: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  if (!isOpen) return null;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); setIsSubmitting(true);
    setTimeout(() => { setIsSubmitting(false); setIsSuccess(true); setTimeout(() => { setIsSuccess(false); onClose(); setFormData({ name: '', contact: '', vehicle: '', message: '' }); }, 3000); }, 1500);
  };
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="fixed inset-0 bg-[#1a0f0a]/90 backdrop-blur-md" onClick={onClose}></div>
      <div className="relative bg-[#2d1a12] w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10 animate-in zoom-in-95 border-4 border-[#582f0e]">
        <h3 className="text-2xl font-black text-[#f5f1e6] mb-6 uppercase tracking-tight">Devis de l'Atelier</h3>
        {isSuccess ? <div className="py-10 text-center text-[#f5f1e6] font-black uppercase tracking-widest">Demande transmise à Alex !</div> : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="bg-[#1a0f0a] p-3 rounded-xl border border-[#582f0e] text-[10px] font-black uppercase text-[#7f4f24] tracking-widest">{selectedCategory}</div>
            <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-[#1a0f0a] border-2 border-[#582f0e] rounded-xl px-4 py-3 outline-none text-[#f5f1e6] font-bold placeholder:text-[#7f4f24]/50" placeholder="Nom Complet" />
            <input required type="text" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className="w-full bg-[#1a0f0a] border-2 border-[#582f0e] rounded-xl px-4 py-3 outline-none text-[#f5f1e6] font-bold placeholder:text-[#7f4f24]/50" placeholder="Email / Téléphone" />
            <textarea value={formData.message} onChange={e => setFormData({...formData, message: e.target.value})} className="w-full bg-[#1a0f0a] border-2 border-[#582f0e] rounded-xl px-4 py-3 h-32 text-[#f5f1e6] font-bold placeholder:text-[#7f4f24]/50 resize-none" placeholder="Détails de l'intervention..."></textarea>
            <button type="submit" className="w-full bg-[#1b4332] text-white py-4 rounded-xl font-black uppercase tracking-widest shadow-xl border border-[#2d6a4f] hover:bg-[#2d6a4f] transition-all">Envoyer le Dossier</button>
          </form>
        )}
      </div>
    </div>
  );
};

const PricingPage: React.FC<{isAdmin: boolean}> = ({ isAdmin }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCat, setSelectedCat] = useState("");
  const categories = [
    { title: "Atelier Mécanique", items: [{ name: "Entretien Périodique", price: "dès 110€" }, { name: "Révision Complète Prestige", price: "249€" }, { name: "Système de Freinage", price: "sur devis" }] },
    { title: "Soins Esthétiques", items: [{ name: "Polissage Artisanal", price: "199€" }, { name: "Protection Céramique", price: "sur devis" }, { name: "Rénovation Intérieure Cuir", price: "dès 150€" }] },
    { title: "Expertise Technique", items: [{ name: "Analyse Électronique", price: "85€" }, { name: "Géométrie Laser", price: "120€" }, { name: "Banc de Puissance", price: "sur devis" }] }
  ];
  return (
    <div className="space-y-12">
      <div className="text-center max-w-2xl mx-auto"><h2 className="text-4xl font-black text-[#f5f1e6] mb-4 uppercase tracking-tighter drop-shadow-lg">Le Tarif de l'Excellence</h2><p className="text-[#dda15e] font-bold italic">Une tarification transparente pour un travail d'orfèvre.</p></div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {categories.map((cat, i) => (
          <div key={i} className="bg-white/95 backdrop-blur-sm border-4 border-[#582f0e] rounded-[2.5rem] overflow-hidden flex flex-col shadow-2xl hover:scale-[1.02] transition-transform">
            <div className="p-8 bg-[#1b4332] text-white font-black uppercase text-center tracking-[0.2em]">{cat.title}</div>
            <div className="p-8 flex-grow space-y-6">
              {cat.items.map((item, j) => (
                <div key={j} className="flex justify-between border-b border-[#582f0e]/10 pb-2"><span className="text-[#1b4332] font-black">{item.name}</span><span className="text-[#582f0e] font-black">{item.price}</span></div>
              ))}
            </div>
            <div className="p-8 pt-0">
              <button 
                onClick={() => { setSelectedCat(cat.title); setIsModalOpen(true); }} 
                className="w-full py-4 bg-transparent border-2 border-[#582f0e] text-[#582f0e] font-black uppercase text-xs tracking-widest rounded-2xl hover:bg-[#582f0e] hover:text-white transition-all"
              >
                Demander Devis
              </button>
            </div>
          </div>
        ))}
      </div>
      <QuoteModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} selectedCategory={selectedCat} />
    </div>
  );
};
export default PricingPage;
