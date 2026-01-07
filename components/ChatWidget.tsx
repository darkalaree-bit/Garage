
import React, { useState, useEffect, useRef } from 'react';
import { ChatMessage } from '../types';
import { getChatResponse } from '../services/geminiService';

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { id: '1', role: 'model', text: 'Bienvenue à l\'Atelier d\'Alex. Que puis-je faire pour votre mécanique aujourd\'hui ?', timestamp: new Date() }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAdminMode, setIsAdminMode] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;
    const userMsg: ChatMessage = { id: Date.now().toString(), role: isAdminMode ? 'admin' : 'user', text: input, timestamp: new Date() };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    if (!isAdminMode) {
      setIsLoading(true);
      const history = messages.filter(m => m.role === 'user' || m.role === 'model').map(m => ({ role: m.role as 'user' | 'model', parts: [{ text: m.text }] }));
      const responseText = await getChatResponse(history, input);
      setMessages(prev => [...prev, { id: Date.now().toString(), role: 'model', text: responseText, timestamp: new Date() }]);
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex flex-col items-end">
      {isOpen && (
        <div className="w-full max-w-[90vw] sm:w-[400px] h-[550px] bg-[#f5f1e6] rounded-[2.5rem] shadow-2xl flex flex-col border-4 border-[#582f0e] mb-4 overflow-hidden animate-in slide-in-from-bottom-4">
          <div className="bg-[#1b4332] text-white p-6 flex justify-between items-center border-b-2 border-[#582f0e]">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#582f0e] rounded-full flex items-center justify-center border-2 border-[#7f4f24] shadow-lg"><i className="fas fa-wrench"></i></div>
              <div>
                <h4 className="font-black text-sm uppercase tracking-widest text-[#7f4f24]">Assistant Alex</h4>
                <p className="text-[10px] font-bold uppercase text-white/70">Conseil Technique</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:rotate-90 transition-transform"><i className="fas fa-times"></i></button>
          </div>

          <div ref={scrollRef} className="flex-grow overflow-y-auto p-6 space-y-4 bg-white/40">
            {messages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.role === 'user' || msg.role === 'admin' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-2xl text-sm font-bold border ${
                  msg.role === 'admin' ? 'bg-[#582f0e]/10 border-[#582f0e] text-[#1b4332]' : 
                  msg.role === 'user' ? 'bg-[#1b4332] text-white border-transparent shadow-lg' : 
                  'bg-white border-[#7f4f24]/30 text-[#1b4332] shadow-sm'
                }`}>
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                </div>
              </div>
            ))}
            {isLoading && <div className="text-xs font-black text-[#582f0e] animate-pulse">Alex analyse votre demande...</div>}
          </div>

          <div className="p-4 bg-white/80 border-t-2 border-[#582f0e]/20">
            <div className="flex space-x-2">
              <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleSend()} placeholder="Message pour l'atelier..." className="flex-grow bg-[#f5f1e6] border-2 border-[#7f4f24]/40 rounded-xl px-4 py-2.5 text-sm font-bold text-[#1b4332] outline-none" />
              <button onClick={handleSend} className="bg-[#1b4332] text-white w-12 h-12 rounded-xl flex items-center justify-center hover:bg-[#2d6a4f] shadow-lg"><i className="fas fa-paper-plane"></i></button>
            </div>
          </div>
        </div>
      )}
      <button onClick={() => setIsOpen(!isOpen)} className="w-16 h-16 bg-[#1b4332] text-white rounded-full shadow-2xl flex items-center justify-center hover:scale-110 active:scale-95 transition-all border-4 border-[#582f0e]">
        <i className={`fas ${isOpen ? 'fa-times' : 'fa-comment-alt'} text-2xl`}></i>
      </button>
    </div>
  );
};

export default ChatWidget;
