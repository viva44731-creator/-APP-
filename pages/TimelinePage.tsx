
import React, { useState } from 'react';
import { generateMockEvents } from '../services/mockData';
import { SecurityEvent, EventType } from '../types';
import { Calendar, Filter, PlayCircle, User, AlertTriangle, Baby, Dog, Volume2, UserX, Activity } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

export const TimelinePage: React.FC = () => {
  const [events] = useState<SecurityEvent[]>(generateMockEvents());
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');
  const { t } = useLanguage();

  // Helper for icons
  const getEventIcon = (type: EventType) => {
    switch (type) {
      case EventType.PERSON_DETECTED: return <User size={18} className="text-blue-500" />;
      case EventType.BABY_CRYING: return <Baby size={18} className="text-pink-500" />;
      case EventType.ELDERLY_FALL: return <Activity size={18} className="text-red-500" />;
      case EventType.PET_ACTIVITY: return <Dog size={18} className="text-orange-500" />;
      case EventType.STRANGER_DETECTED: return <UserX size={18} className="text-purple-500" />;
      case EventType.SOUND: return <Volume2 size={18} className="text-yellow-500" />;
      default: return <AlertTriangle size={18} className="text-slate-500" />;
    }
  };

  const filteredEvents = selectedFilter === 'ALL' 
    ? events 
    : events.filter(e => e.type === selectedFilter);

  return (
    <div className="p-4 pb-24 md:pl-24 max-w-3xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6 mt-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Calendar className="text-brand-600 dark:text-brand-500" /> Timeline
        </h1>
        <button className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
           <Filter size={20} />
        </button>
      </div>

      {/* Date Selector (Mock) */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-2 scrollbar-hide">
         {[0, 1, 2, 3, 4].map(i => (
             <button key={i} className={`flex flex-col items-center min-w-[60px] p-2 rounded-xl border transition ${i === 0 ? 'bg-brand-600 text-white border-brand-600 shadow-lg shadow-brand-500/30' : 'bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-500 hover:border-brand-400'}`}>
                 <span className="text-xs font-medium">Nov</span>
                 <span className="text-lg font-bold">{19 - i}</span>
             </button>
         ))}
      </div>

      {/* Timeline */}
      <div className="relative pl-4 border-l border-slate-200 dark:border-slate-800 space-y-8">
         {filteredEvents.map((event, idx) => (
             <div key={event.id} className="relative">
                 {/* Dot */}
                 <div className="absolute -left-[21px] top-1 w-3 h-3 rounded-full bg-white dark:bg-slate-950 border-2 border-brand-500"></div>
                 
                 {/* Card */}
                 <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow">
                     <div className="flex justify-between items-start mb-2">
                         <div className="flex items-center gap-2">
                             <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">{event.timestamp.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                             <span className="px-2 py-0.5 rounded text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-500 border border-slate-200 dark:border-slate-700">
                                 {event.cameraName}
                             </span>
                         </div>
                         {getEventIcon(event.type)}
                     </div>
                     
                     <div className="flex gap-3">
                         <div className="relative w-24 h-16 bg-slate-100 dark:bg-slate-800 rounded-lg overflow-hidden shrink-0 group cursor-pointer">
                             <img src={event.thumbnailUrl} alt="Event" className="w-full h-full object-cover" />
                             <div className="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                 <PlayCircle className="text-white" size={20} />
                             </div>
                         </div>
                         <div className="flex-1">
                             <h3 className="text-sm font-medium text-slate-900 dark:text-white mb-1">{event.type.replace('_', ' ')}</h3>
                             <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">{event.description}</p>
                         </div>
                     </div>
                 </div>
             </div>
         ))}
      </div>
    </div>
  );
};
