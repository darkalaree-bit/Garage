
import React, { useMemo } from 'react';
import { Appointment, DayStatus, AvailabilityStatus } from '../types';

interface AvailabilityCalendarProps {
  appointments: Appointment[];
}

const AvailabilityCalendar: React.FC<AvailabilityCalendarProps> = ({ appointments }) => {
  const baseDate = new Date();
  const calendarDays = useMemo(() => {
    const days: DayStatus[] = [];
    for (let i = 0; i < 14; i++) {
      const d = new Date(baseDate);
      d.setDate(baseDate.getDate() + i);
      const dateString = d.toISOString().split('T')[0];
      const dayOfWeek = d.getDay();
      let morningStatus: AvailabilityStatus = 'free';
      let afternoonStatus: AvailabilityStatus = 'free';
      let count = (dayOfWeek === 3) ? 12 : (dayOfWeek === 5 || dayOfWeek === 2) ? 4 : 0;
      morningStatus = (dayOfWeek === 3 || dayOfWeek === 0) ? 'full' : (dayOfWeek === 5) ? 'busy' : 'free';
      afternoonStatus = (dayOfWeek === 3 || dayOfWeek === 0) ? 'full' : (dayOfWeek === 2) ? 'busy' : 'free';
      days.push({ date: dateString, morningStatus, afternoonStatus, count });
    }
    return days;
  }, [appointments]);

  const getStatusColor = (status: AvailabilityStatus) => {
    switch (status) {
      case 'full': return 'bg-rose-800';
      case 'busy': return 'bg-[#582f0e]';
      case 'free': return 'bg-[#2d6a4f]';
    }
  };

  return (
    <div className="bg-white/95 backdrop-blur-md rounded-[2.5rem] border-4 border-[#582f0e] shadow-2xl overflow-hidden">
      <div className="grid grid-cols-7 border-b-2 border-[#582f0e]/20 bg-[#1b4332] text-[#f5f1e6]">
        {['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'].map(day => (
          <div key={day} className="py-4 text-center text-[10px] font-black uppercase tracking-[0.2em]">{day}</div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {calendarDays.map((day) => {
          const dateObj = new Date(day.date);
          const isToday = day.date === new Date().toISOString().split('T')[0];
          const isSunday = dateObj.getDay() === 0;
          return (
            <div key={day.date} className={`border-r border-b border-[#582f0e]/10 p-4 min-h-[140px] flex flex-col ${isToday ? 'bg-[#f5f1e6]' : ''}`}>
              <span className={`text-xl font-black ${isToday ? 'text-[#582f0e]' : 'text-[#1b4332]'}`}>{dateObj.getDate()}</span>
              {!isSunday ? (
                <div className="mt-auto space-y-3">
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className={`h-full ${getStatusColor(day.morningStatus)} w-full`}></div></div>
                  <div className="h-2 rounded-full bg-slate-100 overflow-hidden"><div className={`h-full ${getStatusColor(day.afternoonStatus)} w-full`}></div></div>
                  <div className="text-[9px] font-black text-[#1b4332] uppercase text-right">{day.count} RDV</div>
                </div>
              ) : <div className="mt-auto text-center py-1 bg-slate-100 rounded text-[9px] font-black uppercase text-slate-400">Fermé</div>}
            </div>
          );
        })}
      </div>
      <div className="p-6 bg-[#f5f1e6]/50 flex gap-6 border-t-2 border-[#582f0e]/10">
        <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-[#2d6a4f]"></div><span className="text-[10px] font-black uppercase text-[#1b4332]">Libre</span></div>
        <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-[#582f0e]"></div><span className="text-[10px] font-black uppercase text-[#1b4332]">Chargé</span></div>
        <div className="flex items-center space-x-2"><div className="w-3 h-3 rounded-full bg-rose-800"></div><span className="text-[10px] font-black uppercase text-[#1b4332]">Complet</span></div>
      </div>
    </div>
  );
};

export default AvailabilityCalendar;
