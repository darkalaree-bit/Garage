
import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AvailabilityCalendar from './components/AvailabilityCalendar';
import ChatWidget from './components/ChatWidget';
import ContactManager from './components/ContactManager';
import PricingPage from './components/PricingPage';
import LatestWorks from './components/LatestWorks';
import { Appointment } from './types';

interface ExpertService {
  id: string;
  title: string;
  description: string;
  image: string;
  tag: string;
  color: string;
}

const App: React.FC = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState<'home' | 'calendar' | 'contacts' | 'tarifs'>('home');
  
  const [services, setServices] = useState<ExpertService[]>([
    { 
      id: '1', 
      title: "Entretien Artisanal", 
      description: "Soins méticuleux et mécanique de précision pour vos véhicules de collection.", 
      image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=800",
      tag: "Tradition",
      color: "bg-[#1b4332]"
    },
    { 
      id: '2', 
      title: "Restauration d'Élite", 
      description: "Carrosserie façonnée à la main et peintures d'exception dans notre atelier boisé.", 
      image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80&w=800",
      tag: "Héritage",
      color: "bg-[#582f0e]"
    },
    { 
      id: '3', 
      title: "Diagnostic Avancé", 
      description: "Le mariage parfait entre technologie moderne et savoir-faire traditionnel.", 
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=800",
      tag: "Précision",
      color: "bg-[#2d6a4f]"
    }
  ]);

  const [editingService, setEditingService] = useState<ExpertService | null>(null);

  const [appointments] = useState<Appointment[]>([
    { id: '1', customerName: 'Jean Dupont', vehicleModel: 'Peugeot 308', service: 'Révision', date: '2023-10-25', timeSlot: 'morning' },
    { id: '4', customerName: 'Sophie Germain', vehicleModel: 'Fiat 500', service: 'Vidange', date: '2023-10-27', timeSlot: 'morning' },
  ]);

  const handleUpdateService = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingService) {
      setServices(prev => prev.map(s => s.id === editingService.id ? editingService : s));
      setEditingService(null);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} isAdmin={isAdmin} setIsAdmin={setIsAdmin} />
      
      <main className="flex-grow container mx-auto px-4 py-8 max-w-7xl">
        {activeTab === 'home' && (
          <div className="space-y-16">
            <Hero 
              onGoToCalendar={() => setActiveTab('calendar')} 
              onGoToPricing={() => setActiveTab('tarifs')}
            />
            
            <div className="flex flex-col space-y-8">
              <div className="flex justify-between items-center px-2">
                <h2 className="text-3xl font-black text-[#f5f1e6] uppercase tracking-tighter drop-shadow-lg">L'Espace Atelier</h2>
                {isAdmin && (
                  <span className="text-xs font-bold text-[#f5f1e6] bg-[#582f0e] px-4 py-2 rounded-full border border-[#7f4f24] uppercase shadow-xl tracking-widest">
                    Expertise Alex Active
                  </span>
                )}
              </div>
              <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {services.map(service => (
                  <div key={service.id} className="group bg-white/95 backdrop-blur-sm rounded-[2rem] shadow-2xl border border-[#582f0e]/30 overflow-hidden hover:scale-[1.02] transition-all duration-300 relative">
                    <div className="h-48 overflow-hidden relative">
                      <img src={service.image} alt={service.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                      <div className={`absolute top-4 left-4 ${service.color} text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg`}>
                        {service.tag}
                      </div>
                      {isAdmin && (
                        <button onClick={() => setEditingService(service)} className="absolute top-4 right-4 bg-orange-700 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform">
                          <i className="fas fa-edit"></i>
                        </button>
                      )}
                    </div>
                    <div className="p-8">
                      <h3 className="text-xl font-black mb-3 text-[#1b4332] uppercase tracking-tight">{service.title}</h3>
                      <p className="text-slate-800 text-sm leading-relaxed mb-6 font-medium">
                        {service.description}
                      </p>
                      <div className="flex items-center text-[#582f0e] font-black text-sm cursor-pointer group-hover:translate-x-1 transition-transform uppercase tracking-wider">
                        Savoir-faire artisanal <i className="fas fa-arrow-right ml-2 text-xs"></i>
                      </div>
                    </div>
                  </div>
                ))}
              </section>
            </div>

            <LatestWorks isAdmin={isAdmin} />
          </div>
        )}

        {activeTab === 'calendar' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-[#f5f1e6] uppercase tracking-tighter drop-shadow-lg">Agenda de l'Atelier</h2>
            <p className="text-[#dda15e] mb-8 font-bold">Réservez votre place sous l'oeil expert d'Alex.</p>
            <AvailabilityCalendar appointments={appointments} />
          </div>
        )}

        {activeTab === 'contacts' && (
          <div className="space-y-6">
            <h2 className="text-3xl font-black text-[#f5f1e6] uppercase tracking-tighter drop-shadow-lg">L'Atelier d'Alex</h2>
            <p className="text-[#dda15e] mb-8 font-bold">Le point de rendez-vous des passionnés de mécanique noble.</p>
            <ContactManager />
          </div>
        )}

        {activeTab === 'tarifs' && (
          <div className="space-y-6">
            <PricingPage isAdmin={isAdmin} />
          </div>
        )}
      </main>

      {/* Modal Edition Service - Centrage Amélioré */}
      {editingService && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="fixed inset-0 bg-[#1a0f0a]/90 backdrop-blur-md" onClick={() => setEditingService(null)}></div>
          <form onSubmit={handleUpdateService} className="relative bg-[#2d1a12] w-full max-w-lg rounded-[2.5rem] shadow-2xl p-10 animate-in zoom-in-95 border-4 border-[#582f0e]">
            <h3 className="text-2xl font-black text-[#f5f1e6] mb-6 flex items-center uppercase tracking-tight">
              <i className="fas fa-cog text-[#7f4f24] mr-3"></i> Paramètres Atelier
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-[10px] font-black text-[#7f4f24] uppercase mb-1 tracking-widest">Dénomination</label>
                <input type="text" value={editingService.title} onChange={e => setEditingService({...editingService, title: e.target.value})} className="w-full bg-[#1a0f0a] border-2 border-[#582f0e] rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-[#1b4332] text-[#f5f1e6] font-bold" />
              </div>
              <div>
                <label className="block text-[10px] font-black text-[#7f4f24] uppercase mb-1 tracking-widest">Description Technique</label>
                <textarea value={editingService.description} onChange={e => setEditingService({...editingService, description: e.target.value})} className="w-full bg-[#1a0f0a] border-2 border-[#582f0e] rounded-xl px-4 py-3 h-32 outline-none focus:ring-2 focus:ring-[#1b4332] resize-none text-[#f5f1e6] font-bold"></textarea>
              </div>
            </div>
            <div className="flex space-x-4 mt-10">
              <button type="button" onClick={() => setEditingService(null)} className="flex-1 py-4 bg-transparent text-[#7f4f24] font-black uppercase text-xs rounded-xl border-2 border-[#582f0e] hover:bg-white/5 transition-all">Annuler</button>
              <button type="submit" className="flex-1 py-4 bg-[#1b4332] text-white font-black uppercase text-xs rounded-xl shadow-lg hover:bg-[#2d6a4f] transition-all">Sauvegarder</button>
            </div>
          </form>
        </div>
      )}

      <ChatWidget />

      <footer className="bg-[#1a0f0a] text-white py-12 mt-12 border-t-4 border-[#582f0e]">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center border-b border-[#582f0e]/30 pb-8 mb-8">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="bg-[#582f0e] text-white p-2 rounded-lg border border-[#7f4f24]">
                <i className="fas fa-car-side text-xl"></i>
              </div>
              <span className="text-2xl font-black tracking-tighter uppercase text-[#f5f1e6]">Garage d'<span className="text-[#7f4f24]">Alex</span></span>
            </div>
            <div className="flex space-x-6 text-[#7f4f24]">
              <a href="#" className="hover:text-white transition-colors"><i className="fab fa-instagram text-2xl"></i></a>
              <a href="#" className="hover:text-white transition-colors"><i className="fab fa-facebook text-2xl"></i></a>
            </div>
          </div>
          <p className="text-center text-[10px] font-black text-[#7f4f24] uppercase tracking-[0.3em]">Atelier artisanal de prestige • 2024</p>
        </div>
      </footer>
    </div>
  );
};

export default App;
