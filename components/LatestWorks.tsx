
import React, { useRef, useState } from 'react';

interface Work {
  id: string;
  title: string;
  description: string;
  image: string;
  beforeImage: string;
  tag: string;
  story: string;
  hours: string;
}

interface LatestWorksProps {
  isAdmin: boolean;
}

const LatestWorks: React.FC<LatestWorksProps> = ({ isAdmin }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [selectedWork, setSelectedWork] = useState<Work | null>(null);
  const [isAdding, setIsAdding] = useState(false);
  const [editingWork, setEditingWork] = useState<Work | null>(null);

  const [works, setWorks] = useState<Work[]>([
    {
      id: '1',
      title: "Restauration Légende Classique",
      description: "Remise à neuf complète d'une icône des années 60.",
      image: "https://drive.google.com/uc?id=15lejkyzlzD9ayRVaDAurILk9eEZlsGbN", 
      beforeImage: "https://drive.google.com/uc?id=1hVSe9pg4UR2aa1o-ab756AgvgSRM8oOC",
      tag: "Collection",
      hours: "450h",
      story: "Cette Mustang Shelby GT500 est arrivée au garage dans un état déchirant après une sortie de route. L'aile avant gauche était totalement enfoncée, le phare brisé et le pare-brise étoilé. Alex a entamé une reconstruction chirurgicale : redressage du châssis sur marbre, formage d'une nouvelle aile en tôle d'acier et une peinture 'Blue Guardsman' multicouche avec ses célèbres bandes blanches."
    },
    {
      id: '2',
      title: "Rénovation Complète Porsche 911",
      description: "Detailing complet et protection céramique longue durée.",
      image: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=80&w=1200",
      beforeImage: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=80&w=1200",
      tag: "Luxe",
      hours: "35h",
      story: "Marquée par des années de lavages aux rouleaux, la peinture 'Basalt Black' de cette 911 était couverte de micro-rayures. Après une décontamination minutieuse, nous avons effectué un polissage en 3 étapes (Cut, Polish, Finish) pour retrouver une profondeur de noir absolue."
    },
    {
      id: '3',
      title: "Performance Moteur Ferrari 488",
      description: "Optimisation et nettoyage cryogénique du bloc moteur.",
      image: "https://images.unsplash.com/photo-1592198084033-aade902d1aae?auto=format&fit=crop&q=80&w=1200",
      beforeImage: "https://images.unsplash.com/photo-1632733711679-52923aa048f5?auto=format&fit=crop&q=80&w=1200",
      tag: "Mécanique",
      hours: "15h",
      story: "Le propriétaire se plaignait de ratés à haut régime. Nous avons diagnostiqué un encrassement des injecteurs. En plus du remplacement, nous avons effectué un nettoyage cryogénique du compartiment moteur."
    }
  ]);

  const [newWork, setNewWork] = useState<Partial<Work>>({
    title: '', description: '', image: '', beforeImage: '', tag: 'Collection', story: '', hours: ''
  });

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  const handleAddWork = (e: React.FormEvent) => {
    e.preventDefault();
    const workToAdd = { ...newWork, id: Date.now().toString() } as Work;
    setWorks(prev => [...prev, workToAdd]);
    setIsAdding(false);
    setNewWork({ title: '', description: '', image: '', beforeImage: '', tag: 'Collection', story: '', hours: '' });
  };

  const handleUpdateWork = (e: React.FormEvent) => {
    e.preventDefault();
    if (editingWork) {
      setWorks(prev => prev.map(w => w.id === editingWork.id ? editingWork : w));
      setEditingWork(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end px-2">
        <div>
          <h2 className="text-3xl font-extrabold text-slate-900">Nos dernières prestations</h2>
          <p className="text-slate-900 mt-1 text-sm font-bold">Cliquez sur une réalisation pour découvrir son histoire.</p>
        </div>
        <div className="flex space-x-2">
          {isAdmin && (
            <button 
              onClick={() => setIsAdding(true)}
              className="bg-orange-600 text-white px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider shadow-lg shadow-orange-500/20 hover:scale-105 transition-transform mr-4 border border-orange-700"
            >
              + Ajouter une réalisation
            </button>
          )}
          <div className="hidden sm:flex space-x-2">
            <button onClick={() => scroll('left')} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-white flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
              <i className="fas fa-chevron-left text-xs"></i>
            </button>
            <button onClick={() => scroll('right')} className="w-10 h-10 rounded-full border-2 border-slate-900 bg-white flex items-center justify-center text-slate-900 hover:bg-slate-900 hover:text-white transition-all shadow-sm">
              <i className="fas fa-chevron-right text-xs"></i>
            </button>
          </div>
        </div>
      </div>

      <div ref={scrollRef} className="flex space-x-6 overflow-x-auto pb-8 snap-x snap-mandatory no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
        {works.map((work) => (
          <div key={work.id} className="min-w-[300px] md:min-w-[450px] snap-start bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 group cursor-pointer relative">
            <div className="h-64 md:h-80 overflow-hidden relative" onClick={() => setSelectedWork(work)}>
              <img src={work.image} alt={work.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm text-slate-900 px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest shadow-md border border-slate-200">
                {work.tag}
              </div>
            </div>
            {isAdmin && (
              <button 
                onClick={(e) => { e.stopPropagation(); setEditingWork(work); }}
                className="absolute top-4 right-4 z-10 bg-orange-600 text-white w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform"
              >
                <i className="fas fa-edit"></i>
              </button>
            )}
            <div className="p-6" onClick={() => setSelectedWork(work)}>
              <h3 className="text-xl font-black text-slate-900 mb-1">{work.title}</h3>
              <p className="text-slate-900 text-sm leading-relaxed font-bold">{work.description}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Modal Ajout/Modification */}
      {(isAdding || editingWork) && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => { setIsAdding(false); setEditingWork(null); }}></div>
          <form onSubmit={isAdding ? handleAddWork : handleUpdateWork} className="relative bg-white w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl p-8 animate-in zoom-in-95">
            <h3 className="text-2xl font-black text-slate-900 mb-6 uppercase tracking-tighter">{isAdding ? 'Ajouter une réalisation' : 'Modifier la réalisation'}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">Titre</label>
                <input required type="text" value={isAdding ? newWork.title : editingWork?.title} onChange={e => isAdding ? setNewWork({...newWork, title: e.target.value}) : setEditingWork({...editingWork!, title: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-slate-900 font-bold" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">Tag</label>
                <input type="text" value={isAdding ? newWork.tag : editingWork?.tag} onChange={e => isAdding ? setNewWork({...newWork, tag: e.target.value}) : setEditingWork({...editingWork!, tag: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-slate-900 font-bold" />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">Heures</label>
                <input type="text" value={isAdding ? newWork.hours : editingWork?.hours} onChange={e => isAdding ? setNewWork({...newWork, hours: e.target.value}) : setEditingWork({...editingWork!, hours: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-slate-900 font-bold" placeholder="Ex: 40h" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">URL Image Après (Principale)</label>
                <input type="text" value={isAdding ? newWork.image : editingWork?.image} onChange={e => isAdding ? setNewWork({...newWork, image: e.target.value}) : setEditingWork({...editingWork!, image: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-slate-900 font-bold" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">URL Image Avant</label>
                <input type="text" value={isAdding ? newWork.beforeImage : editingWork?.beforeImage} onChange={e => isAdding ? setNewWork({...newWork, beforeImage: e.target.value}) : setEditingWork({...editingWork!, beforeImage: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-slate-900 font-bold" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">Brève description</label>
                <input type="text" value={isAdding ? newWork.description : editingWork?.description} onChange={e => isAdding ? setNewWork({...newWork, description: e.target.value}) : setEditingWork({...editingWork!, description: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 text-slate-900 font-bold" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-xs font-bold text-slate-900 uppercase mb-1">L'histoire complète</label>
                <textarea required value={isAdding ? newWork.story : editingWork?.story} onChange={e => isAdding ? setNewWork({...newWork, story: e.target.value}) : setEditingWork({...editingWork!, story: e.target.value})} className="w-full bg-slate-50 border border-slate-300 rounded-xl px-4 py-2 h-32 resize-none text-slate-900 font-bold"></textarea>
              </div>
            </div>
            <div className="flex space-x-4 mt-8">
              <button type="button" onClick={() => { setIsAdding(false); setEditingWork(null); }} className="flex-1 py-3 bg-slate-100 text-slate-900 font-black rounded-xl border border-slate-200">Annuler</button>
              <button type="submit" className="flex-1 py-3 bg-orange-600 text-white font-black rounded-xl shadow-lg border border-orange-700">{isAdding ? 'Créer' : 'Mettre à jour'}</button>
            </div>
          </form>
        </div>
      )}

      {/* Modal Prestation Détails Client */}
      {selectedWork && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
          <div className="absolute inset-0 bg-slate-900/90 backdrop-blur-xl" onClick={() => setSelectedWork(null)}></div>
          <div className="relative bg-white w-full max-w-6xl max-h-[90vh] rounded-[2.5rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-300">
            <button onClick={() => setSelectedWork(null)} className="absolute top-6 right-6 z-20 w-12 h-12 bg-white text-slate-900 rounded-full flex items-center justify-center hover:bg-slate-100 transition-all shadow-md border border-slate-200"><i className="fas fa-times text-xl"></i></button>
            <div className="flex-grow overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="relative h-[250px] md:h-[400px]">
                  <img src={selectedWork.beforeImage} className="w-full h-full object-cover" alt="Avant" />
                  <div className="absolute top-4 left-4 bg-rose-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">ÉTAT INITIAL</div>
                </div>
                <div className="relative h-[250px] md:h-[400px]">
                  <img src={selectedWork.image} className="w-full h-full object-cover" alt="Après" />
                  <div className="absolute top-4 right-4 bg-emerald-600 text-white px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">RÉSULTAT FINAL</div>
                </div>
              </div>
              <div className="p-8 md:p-12">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                  <div>
                    <div className="flex items-center space-x-3 mb-3">
                        <span className="text-blue-700 font-black uppercase tracking-widest text-xs px-3 py-1 bg-blue-50 rounded-lg border border-blue-100">{selectedWork.tag}</span>
                        <span className="text-slate-900 text-xs font-black">• Travaux réalisés par Alex</span>
                    </div>
                    <h2 className="text-3xl md:text-5xl font-black text-slate-900 tracking-tighter uppercase">{selectedWork.title}</h2>
                  </div>
                  <div className="flex items-center space-x-4 bg-slate-50 px-8 py-5 rounded-[2rem] border-2 border-slate-200">
                    <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-xl shadow-lg"><i className="fas fa-hourglass-half"></i></div>
                    <div>
                      <p className="text-[10px] text-slate-900 font-black uppercase tracking-widest">Temps passé</p>
                      <p className="font-black text-slate-900 text-2xl">{selectedWork.hours}</p>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                    <div className="lg:col-span-2 space-y-6">
                        <h3 className="text-2xl font-black text-slate-900 flex items-center uppercase tracking-tighter">
                          <i className="fas fa-quote-left text-blue-600 mr-4 opacity-30 text-3xl"></i>
                          La petite histoire d'Alex
                        </h3>
                        <p className="text-slate-900 text-lg leading-relaxed font-bold italic">{selectedWork.story}</p>
                        <div className="pt-8 flex flex-wrap gap-3">
                            {["Expertise", "Passion", "Zéro Défaut", "Garantie 2 ans"].map(badge => (
                                <span key={badge} className="px-4 py-2 bg-slate-100 text-slate-900 rounded-full text-xs font-black border border-slate-200"><i className="fas fa-check-circle text-emerald-600 mr-2"></i>{badge}</span>
                            ))}
                        </div>
                    </div>
                    <div className="space-y-6">
                        <div className="bg-slate-50 rounded-3xl p-8 text-slate-900 relative overflow-hidden border-2 border-slate-200 shadow-sm">
                            <h4 className="text-lg font-black mb-4 uppercase tracking-tighter">Intervention type</h4>
                            <ul className="space-y-4 text-sm text-slate-900 font-bold">
                                <li className="flex items-start"><i className="fas fa-check text-emerald-600 mt-1 mr-3"></i>Diagnostic initial multipoints</li>
                                <li className="flex items-start"><i className="fas fa-check text-emerald-600 mt-1 mr-3"></i>Nettoyage complet intérieur/extérieur</li>
                                <li className="flex items-start"><i className="fas fa-check text-emerald-600 mt-1 mr-3"></i>Essai routier de validation</li>
                            </ul>
                        </div>
                        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-blue-700 transition-all shadow-xl shadow-blue-500/20">Prendre RDV pour ce service</button>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LatestWorks;
