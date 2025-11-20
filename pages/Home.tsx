
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_CAMERAS, generateMockEvents } from '../services/mockData';
import { CameraStatus, SecurityEvent } from '../types';
import { useLanguage } from '../contexts/LanguageContext';
import { Bell, Shield, Phone, Settings as SettingsIcon, Video, AlertTriangle, ChevronRight, Activity, Users, Lock, Heart, Baby } from 'lucide-react';

export const Home: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  const [events] = useState<SecurityEvent[]>(generateMockEvents());
  const onlineCameraCount = MOCK_CAMERAS.filter(c => c.status === CameraStatus.ONLINE).length;

  return (
    <div className="p-4 pb-24 md:pl-24 max-w-3xl mx-auto animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center mb-6 mt-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">{t.home.title}</h1>
        <button onClick={() => navigate('/alerts')} className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors relative shadow-sm">
          <Bell size={20} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-alert-red rounded-full border-2 border-white dark:border-slate-900 animate-pulse"></span>
        </button>
      </div>

      {/* Today's Status Card */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-6 shadow-sm">
        <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-4 uppercase tracking-wider">{t.home.todayStatus}</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex flex-col items-center justify-center p-2">
             <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-500/20 flex items-center justify-center mb-2">
               <Video size={20} className="text-green-600 dark:text-green-400" />
             </div>
             <span className="text-xl font-bold text-slate-900 dark:text-white">{onlineCameraCount}</span>
             <span className="text-[10px] text-slate-500 dark:text-slate-400 text-center">{t.home.onlineCameras}</span>
          </div>
          <div className="flex flex-col items-center justify-center p-2 border-l border-r border-slate-100 dark:border-slate-800">
             <div className="w-10 h-10 rounded-full bg-yellow-100 dark:bg-alert-yellow/20 flex items-center justify-center mb-2">
               <AlertTriangle size={20} className="text-yellow-600 dark:text-alert-yellow" />
             </div>
             <span className="text-xl font-bold text-slate-900 dark:text-white">1</span>
             <span className="text-[10px] text-slate-500 dark:text-slate-400 text-center">{t.home.newAlerts}</span>
          </div>
           <div className="flex flex-col items-center justify-center p-2">
             <div className="w-10 h-10 rounded-full bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center mb-2">
               <Users size={20} className="text-brand-600 dark:text-brand-400" />
             </div>
             <span className="text-xl font-bold text-slate-900 dark:text-white">2</span>
             <span className="text-[10px] text-slate-500 dark:text-slate-400 text-center">{t.home.familyOnline}</span>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mb-6">
        <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-3 uppercase tracking-wider">{t.home.quickActions}</h2>
        <div className="grid grid-cols-4 gap-3">
           <button className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-brand-600 text-white flex items-center justify-center shadow-lg shadow-brand-500/30 dark:shadow-brand-900/30 hover:bg-brand-500 transition transform group-hover:scale-105">
                 <Shield size={24} />
              </div>
              <span className="text-[10px] text-slate-600 dark:text-slate-300 font-medium">{t.home.enableAll}</span>
           </button>
           <button onClick={() => navigate('/privacy')} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-600 dark:hover:text-white transition shadow-sm transform group-hover:scale-105">
                 <Lock size={24} />
              </div>
              <span className="text-[10px] text-slate-600 dark:text-slate-300 font-medium">{t.home.privacyMode}</span>
           </button>
           <button className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-600 dark:hover:text-white transition shadow-sm transform group-hover:scale-105">
                 <Phone size={24} />
              </div>
              <span className="text-[10px] text-slate-600 dark:text-slate-300 font-medium">{t.home.help}</span>
           </button>
           <button onClick={() => navigate('/settings')} className="flex flex-col items-center gap-2 group">
              <div className="w-14 h-14 rounded-2xl bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 flex items-center justify-center border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 hover:text-brand-600 dark:hover:text-white transition shadow-sm transform group-hover:scale-105">
                 <SettingsIcon size={24} />
              </div>
              <span className="text-[10px] text-slate-600 dark:text-slate-300 font-medium">{t.home.settings}</span>
           </button>
        </div>
      </div>

      {/* Family Care Section */}
      <div className="mb-8">
        <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-3 uppercase tracking-wider">{t.care.title}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Elderly Care */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
             <div className="absolute top-0 right-0 p-3 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition text-rose-500">
                <Heart size={80} />
             </div>
             <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-rose-100 dark:bg-rose-500/20 flex items-center justify-center text-rose-500 dark:text-rose-400">
                      <Activity size={20} />
                   </div>
                   <div>
                      <h3 className="text-slate-900 dark:text-white font-medium">{t.care.elderly}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                         <span className="w-2 h-2 rounded-full bg-green-500"></span>
                         <span className="text-xs text-slate-500 dark:text-slate-400">{t.care.statusNormal}</span>
                      </div>
                   </div>
                </div>
                <button className="p-2 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400 hover:text-rose-600 dark:hover:text-white hover:bg-rose-100 dark:hover:bg-rose-500 transition border border-slate-200 dark:border-slate-700">
                   <Phone size={18} />
                </button>
             </div>
             <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-950/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                   <span className="text-slate-600 dark:text-slate-400">{t.care.fallDetect}</span>
                   <span className="text-green-600 dark:text-green-400 font-medium">ON</span>
                </div>
                <div className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-950/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                   <span className="text-slate-600 dark:text-slate-400">{t.care.inactivity}</span>
                   <span className="text-slate-700 dark:text-slate-300">2h Limit</span>
                </div>
             </div>
          </div>

          {/* Child Care */}
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-4 relative overflow-hidden group shadow-sm hover:shadow-md transition-shadow">
             <div className="absolute top-0 right-0 p-3 opacity-5 dark:opacity-10 group-hover:opacity-10 dark:group-hover:opacity-20 transition text-blue-500">
                <Baby size={80} />
             </div>
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-500 dark:text-blue-400">
                      <Baby size={20} />
                   </div>
                   <div>
                      <h3 className="text-slate-900 dark:text-white font-medium">{t.care.child}</h3>
                      <div className="flex items-center gap-1.5 mt-1">
                         <span className="w-2 h-2 rounded-full bg-green-500"></span>
                         <span className="text-xs text-slate-500 dark:text-slate-400">{t.care.safeZone}</span>
                      </div>
                   </div>
                </div>
                <button className="px-3 py-1.5 bg-slate-100 dark:bg-slate-800 rounded-full text-xs text-slate-600 dark:text-slate-300 hover:bg-blue-100 dark:hover:bg-blue-600 hover:text-blue-600 dark:hover:text-white transition border border-slate-200 dark:border-slate-700">
                   {t.care.nanny}
                </button>
             </div>
              <div className="space-y-2 relative z-10">
                <div className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-950/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                   <span className="text-slate-600 dark:text-slate-400">{t.care.cryDetect}</span>
                   <span className="text-green-600 dark:text-green-400 font-medium">ON</span>
                </div>
                 <div className="flex items-center justify-between text-xs bg-slate-50 dark:bg-slate-950/50 p-2 rounded-lg border border-slate-100 dark:border-slate-800">
                   <span className="text-slate-600 dark:text-slate-400">{t.care.lastSleep}</span>
                   <span className="text-slate-700 dark:text-slate-300">45m ago</span>
                </div>
             </div>
          </div>
        </div>
      </div>

      {/* Camera List */}
      <div className="mb-8">
         <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-3 uppercase tracking-wider">{t.home.cameraList}</h2>
         <div className="space-y-4">
            {MOCK_CAMERAS.map(cam => (
              <div key={cam.id} className="bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-md transition-shadow">
                 <div className="flex items-center p-3 gap-4">
                    {/* Thumbnail */}
                    <div className="relative w-24 h-16 bg-slate-100 dark:bg-slate-950 rounded-lg overflow-hidden shrink-0">
                       <img src={cam.thumbnailUrl} alt={cam.name} className={`w-full h-full object-cover ${cam.status === CameraStatus.OFFLINE ? 'grayscale opacity-50' : ''}`} />
                       {cam.status === CameraStatus.ONLINE && (
                         <div className="absolute top-1 right-1 w-2 h-2 bg-green-500 rounded-full shadow-sm animate-pulse"></div>
                       )}
                    </div>
                    
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                       <div className="flex items-center gap-2 mb-1">
                         <h3 className="text-slate-900 dark:text-white font-medium truncate">{cam.name}</h3>
                         {cam.status === CameraStatus.OFFLINE && (
                           <span className="text-[10px] bg-red-100 dark:bg-red-500/20 text-red-600 dark:text-red-400 px-1.5 py-0.5 rounded">{t.home.offline}</span>
                         )}
                       </div>
                       <p className="text-xs text-slate-500 dark:text-slate-500 flex items-center gap-1">
                         <Activity size={12} />
                         {t.home.updateTime} {cam.lastEventTime || 'Now'}
                       </p>
                    </div>

                    {/* Actions */}
                    <div className="flex gap-2">
                       <button 
                         onClick={() => navigate(`/live/${cam.id}`)}
                         className="px-3 py-1.5 bg-brand-50 dark:bg-brand-600/10 text-brand-600 dark:text-brand-400 text-xs font-medium rounded hover:bg-brand-100 dark:hover:bg-brand-600 hover:text-brand-700 dark:hover:text-white transition"
                       >
                         {t.home.view}
                       </button>
                    </div>
                 </div>
              </div>
            ))}
         </div>
      </div>

      {/* Recent Alerts */}
      <div>
        <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-3 uppercase tracking-wider">{t.home.recentAlerts}</h2>
        <div className="bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
           {events.slice(0, 3).map((event, idx) => (
             <div key={event.id} className={`p-4 flex items-start gap-3 ${idx !== 2 ? 'border-b border-slate-100 dark:border-slate-800' : ''} hover:bg-slate-50 dark:hover:bg-slate-800/50 transition-colors`}>
                <div className="mt-0.5">
                   <div className="w-2 h-2 rounded-full bg-brand-500 mt-1.5"></div>
                </div>
                <div>
                   <div className="text-xs text-slate-500 mb-0.5">{event.timestamp.toLocaleString()}</div>
                   <div className="text-sm text-slate-900 dark:text-white font-medium mb-0.5">{event.type.replace('_', ' ')}</div>
                   <div className="text-xs text-slate-600 dark:text-slate-400">{event.description}</div>
                </div>
             </div>
           ))}
           <button onClick={() => navigate('/playback')} className="w-full py-3 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-1 border-t border-slate-100 dark:border-slate-800">
              {t.home.more} <ChevronRight size={12} />
           </button>
        </div>
      </div>

    </div>
  );
};
