
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Calendar, ChevronDown, Play, Pause, SkipBack, SkipForward, FastForward, Camera, Download, Tag, Search, Video } from 'lucide-react';

export const Playback: React.FC = () => {
  const { t } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <div className="p-4 pb-24 md:pl-24 max-w-4xl mx-auto animate-fade-in flex flex-col h-screen md:h-auto">
      <div className="flex justify-between items-center mb-4 mt-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
            {t.playback.title} <Search size={18} className="text-slate-500" />
        </h1>
        <button className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
           <Download size={20} />
        </button>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-2 gap-4 mb-4">
         <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 flex justify-between items-center cursor-pointer hover:border-brand-500 dark:hover:border-slate-600 transition shadow-sm">
             <span className="text-xs text-slate-500">{t.playback.selectCamera}</span>
             <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-white font-medium">
                 Living Room <ChevronDown size={14} />
             </div>
         </div>
         <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-3 flex justify-between items-center cursor-pointer hover:border-brand-500 dark:hover:border-slate-600 transition shadow-sm">
             <span className="text-xs text-slate-500">{t.playback.selectDate}</span>
             <div className="flex items-center gap-2 text-sm text-slate-900 dark:text-white font-medium">
                 2025-11-19 <Calendar size={14} />
             </div>
         </div>
      </div>

      {/* Timeline Visualization */}
      <div className="flex-1 flex flex-col gap-4">
          <div className="flex gap-4 h-64">
             {/* Vertical Timeline Strip */}
             <div className="w-16 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 flex flex-col items-center py-4 relative overflow-hidden shrink-0 shadow-sm">
                 <div className="text-[10px] text-slate-500 mb-4">00:00</div>
                 <div className="flex-1 w-1 bg-slate-100 dark:bg-slate-800 relative">
                     {/* Event Markers */}
                     <div className="absolute top-[10%] w-2 h-8 bg-red-500 -left-0.5 rounded-sm" />
                     <div className="absolute top-[60%] w-2 h-4 bg-green-500 -left-0.5 rounded-sm" />
                     <div className="absolute top-[65%] w-2 h-2 bg-yellow-500 -left-0.5 rounded-sm" />
                 </div>
                 <div className="text-[10px] text-slate-500 mt-4">24:00</div>
             </div>

             {/* Event List for selected day */}
             <div className="flex-1 bg-white dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-800 p-4 overflow-y-auto shadow-sm custom-scrollbar">
                 <h3 className="text-xs text-slate-500 uppercase mb-3">Events</h3>
                 <div className="space-y-3">
                     <div className="flex gap-3 items-start group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 -mx-2 rounded-lg transition">
                         <span className="text-xs text-slate-400 w-10 mt-0.5 font-mono">14:30</span>
                         <div>
                             <div className="text-sm text-slate-900 dark:text-white font-medium group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">Person Detected</div>
                             <div className="text-xs text-slate-500">Living Room • 12s clip</div>
                         </div>
                     </div>
                      <div className="flex gap-3 items-start group cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50 p-2 -mx-2 rounded-lg transition">
                         <span className="text-xs text-slate-400 w-10 mt-0.5 font-mono">15:45</span>
                         <div>
                             <div className="text-sm text-slate-900 dark:text-white font-medium group-hover:text-brand-600 dark:group-hover:text-brand-400 transition">Sound Anomaly</div>
                             <div className="text-xs text-slate-500">Glass break detected</div>
                         </div>
                     </div>
                 </div>
             </div>
          </div>
          
          {/* Video Player Area */}
          <div className="bg-black rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 relative aspect-video shadow-2xl">
             <div className="absolute inset-0 flex items-center justify-center">
                 <div className="text-center">
                    <Video size={48} className="text-slate-700 mx-auto mb-2" />
                    <p className="text-slate-600 text-sm">Playback Paused</p>
                 </div>
             </div>
             
             {/* Overlay UI */}
             <div className="absolute top-4 right-4 bg-black/60 backdrop-blur px-2 py-1 rounded text-xs text-white font-mono">
                 14:30:45
             </div>
          </div>

          {/* Controls */}
          <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-4 shadow-sm">
              <div className="flex items-center justify-center gap-6 mb-4">
                  <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition"><SkipBack size={20}/></button>
                  <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition"><FastForward size={20} className="rotate-180"/></button>
                  <button 
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="w-12 h-12 bg-brand-600 rounded-full text-white flex items-center justify-center hover:bg-brand-500 shadow-lg shadow-brand-500/30 transition transform active:scale-95"
                  >
                      {isPlaying ? <Pause size={24} fill="currentColor"/> : <Play size={24} fill="currentColor" className="ml-1"/>}
                  </button>
                  <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition"><FastForward size={20}/></button>
                  <button className="text-slate-400 hover:text-slate-900 dark:hover:text-white transition"><SkipForward size={20}/></button>
              </div>
              
              {/* Progress Bar */}
              <div className="w-full h-1.5 bg-slate-100 dark:bg-slate-800 rounded-full mb-4 relative group cursor-pointer">
                  <div className="w-[60%] h-full bg-brand-500 rounded-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white border border-slate-200 dark:border-transparent rounded-full shadow opacity-0 group-hover:opacity-100 transition-opacity" />
                  </div>
              </div>

              <div className="flex justify-between items-center border-t border-slate-100 dark:border-slate-800 pt-4">
                  <div className="flex gap-4">
                      <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-brand-600 dark:hover:text-white transition">
                          <Camera size={18} />
                          <span className="text-[10px]">{t.playback.snapshot}</span>
                      </button>
                      <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-brand-600 dark:hover:text-white transition">
                          <Download size={18} />
                          <span className="text-[10px]">{t.playback.export}</span>
                      </button>
                      <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-brand-600 dark:hover:text-white transition">
                          <Tag size={18} />
                          <span className="text-[10px]">{t.playback.mark}</span>
                      </button>
                  </div>
                  <button className="flex items-center gap-1 text-xs font-mono text-brand-600 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 px-2 py-1 rounded border border-brand-200 dark:border-brand-500/20">
                      1.0x
                  </button>
              </div>
          </div>
      </div>
    </div>
  );
};
