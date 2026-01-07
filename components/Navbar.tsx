
import React, { useState } from 'react';

interface NavbarProps {
  activeTab: 'home' | 'calendar' | 'contacts' | 'tarifs';
  setActiveTab: (tab: 'home' | 'calendar' | 'contacts' | 'tarifs') => void;
  isAdmin: boolean;
  setIsAdmin: (val: boolean) => void;
}

const Navbar: React.FC<NavbarProps> = ({ activeTab, setActiveTab, isAdmin, setIsAdmin }) => {
  const [showLogin, setShowLogin] = useState(false);
  const [credentials, setCredentials] = useState({ user: '', pass: '' });
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (credentials.user === 'alex' && credentials.pass === '1234') {
      setIsAdmin(true);
      setShowLogin(false);
      setCredentials({ user: '', pass: '' });
      setError('');
    } else {
      setError('Identifiants incorrects');
    }
  };

  return (
    <nav className="bg-[#1a0f0a]/80 backdrop-blur-md border-b-2 border-[#582f0e]/40 sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-7xl h-20 flex items-center justify-between">
        <div className="flex items-center space-x-2 cursor-pointer" onClick={() => setActiveTab('home')}>
          <div className="bg-[#1b4332] text-white p-2 rounded-lg shadow-lg border border-[#2d6a4f]">
            <i className="fas fa-car-side text-xl"></i>
          </div>
          <span className="text-2xl font-black text-[#f5f1e6] tracking-tighter uppercase">Garage d'<span className="text-[#7f4f24]">Alex</span></span>
        </div>
        
        <div className="hidden lg:flex space-x-8 font-black uppercase tracking-widest text-xs">
          {['home', 'tarifs', 'calendar', 'contacts'].map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`transition-all py-2 border-b-2 ${activeTab === tab ? 'text-[#f5f1e6] border-[#7f4f24]' : 'text-[#7f4f24] hover:text-[#f5f1e6] border-transparent'}`}
            >
              {tab === 'home' ? 'Accueil' : tab === 'tarifs' ? 'Tarifs' : tab === 'calendar' ? 'Rendez-vous' : 'Contact'}
            </button>
          ))}
        </div>

        <div className="flex items-center space-x-4">
          {isAdmin ? (
            <div className="flex items-center space-x-3">
              <span className="hidden sm:inline text-[10px] font-black text-[#f5f1e6] bg-[#582f0e] px-3 py-1.5 rounded-full border border-[#7f4f24] uppercase tracking-tighter">Maître d'Atelier</span>
              <button 
                onClick={() => setIsAdmin(false)}
                className="bg-white/10 text-[#f5f1e6] px-4 py-2 rounded-xl text-xs font-black uppercase border-2 border-[#582f0e] hover:bg-white/20 transition-all"
              >
                Quitter
              </button>
            </div>
          ) : (
            <button 
              onClick={() => setShowLogin(true)}
              className="bg-[#1b4332] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest hover:bg-[#2d6a4f] transition-all shadow-lg border border-[#582f0e]/50"
            >
              Accès Atelier
            </button>
          )}
        </div>
      </div>

      {/* Login Modal - Centrée parfaitement */}
      {showLogin && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 overflow-y-auto">
          <div className="fixed inset-0 bg-[#1a0f0a]/90 backdrop-blur-md" onClick={() => setShowLogin(false)}></div>
          <form onSubmit={handleLogin} className="relative bg-[#2d1a12] w-full max-w-sm rounded-[2.5rem] shadow-[0_35px_60px_-15px_rgba(0,0,0,0.6)] p-10 animate-in zoom-in-95 duration-300 border-4 border-[#582f0e]">
            <div className="absolute top-6 right-6 text-[#7f4f24] cursor-pointer hover:text-[#f5f1e6] transition-colors" onClick={() => setShowLogin(false)}>
                <i className="fas fa-times"></i>
            </div>
            <h3 className="text-2xl font-black text-[#f5f1e6] mb-2 uppercase tracking-tight">Authentification</h3>
            <p className="text-[#7f4f24] text-xs font-black uppercase mb-8">Espace Technique Alex</p>
            
            <div className="space-y-4">
              <div className="relative">
                <i className="fas fa-user absolute left-4 top-1/2 -translate-y-1/2 text-[#7f4f24]"></i>
                <input 
                  type="text" 
                  value={credentials.user}
                  onChange={e => setCredentials({...credentials, user: e.target.value})}
                  className="w-full bg-[#1a0f0a] border-2 border-[#582f0e] rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#1b4332] text-[#f5f1e6] font-bold"
                  placeholder="Identifiant"
                />
              </div>
              <div className="relative">
                <i className="fas fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-[#7f4f24]"></i>
                <input 
                  type="password" 
                  value={credentials.pass}
                  onChange={e => setCredentials({...credentials, pass: e.target.value})}
                  className="w-full bg-[#1a0f0a] border-2 border-[#582f0e] rounded-xl pl-12 pr-4 py-3 outline-none focus:ring-2 focus:ring-[#1b4332] text-[#f5f1e6] font-bold"
                  placeholder="Mot de passe"
                />
              </div>
              {error && <p className="text-rose-500 text-[10px] font-black text-center uppercase tracking-widest mt-2">{error}</p>}
            </div>

            <button type="submit" className="w-full bg-[#1b4332] text-white py-4 rounded-xl font-black uppercase tracking-widest mt-8 hover:bg-[#2d6a4f] shadow-2xl transition-all border border-[#2d6a4f]">
              Prendre son Poste
            </button>
          </form>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
