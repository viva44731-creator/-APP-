
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Lock, Shield, Clock, Eye, EyeOff, FileText, Key, ChevronRight, Database, Activity, Search } from 'lucide-react';
import { MOCK_PRIVACY_LOGS } from '../services/mockData';

export const Privacy: React.FC = () => {
  const { t } = useLanguage();

  return (
    <div className="p-4 pb-24 md:pl-24 max-w-3xl mx-auto animate-fade-in">
      <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-6 mt-2 flex items-center gap-2">
        <Lock className="text-brand-600 dark:text-brand-500" /> {t.privacy.title}
      </h1>

      {/* Privacy Mode Toggle */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 mb-6 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-4">
           <div className="p-3 bg-slate-100 dark:bg-slate-800 rounded-full text-slate-500 dark:text-slate-400">
              <Lock size={24} />
           </div>
           <div>
              <h3 className="text-slate-900 dark:text-white font-medium">{t.privacy.mode}</h3>
              <button className="text-brand-600 dark:text-brand-400 text-sm font-medium mt-1 flex items-center gap-1">
                  {t.privacy.modeDesc}
              </button>
           </div>
        </div>
        <div className="relative inline-flex h-6 w-11 items-center rounded-full bg-slate-300 dark:bg-slate-700 cursor-pointer transition-colors hover:bg-slate-400 dark:hover:bg-slate-600">
            <span className="translate-x-1 inline-block h-4 w-4 transform rounded-full bg-white transition" />
        </div>
      </div>

      {/* Schedule */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 mb-6 flex items-center justify-between shadow-sm">
         <div>
            <h3 className="text-slate-900 dark:text-slate-200 text-sm font-medium mb-1">{t.privacy.schedule}</h3>
            <p className="text-xs text-slate-500">{t.privacy.scheduleDesc}</p>
         </div>
         <button className="text-xs bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white border border-slate-200 dark:border-slate-700 transition-colors">
             {t.family.edit}
         </button>
      </div>

      {/* Privacy Zones */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mb-6 shadow-sm">
         <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-800/30">
            <h3 className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
               <EyeOff size={18} className="text-brand-600 dark:text-brand-400"/> {t.privacy.zones}
            </h3>
         </div>
         <div className="divide-y divide-slate-100 dark:divide-slate-800">
             <div className="p-4 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Living Room Camera</span>
                 </div>
                 <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">✓ {t.privacy.enableZone}</span>
                    <button className="text-[10px] text-slate-500 hover:text-slate-900 dark:hover:text-white underline">{t.privacy.setZone}</button>
                 </div>
             </div>
             <div className="p-4 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-slate-400 dark:bg-slate-600" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">Bedroom Camera</span>
                 </div>
                  <div className="flex flex-col items-end gap-1">
                    <span className="text-xs text-slate-500 flex items-center gap-1">○ {t.privacy.disableZone}</span>
                    <button className="text-[10px] text-slate-500 hover:text-slate-900 dark:hover:text-white underline">{t.privacy.setZone}</button>
                 </div>
             </div>
         </div>
      </div>

      {/* Data Management */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 mb-6 shadow-sm">
          <h3 className="font-medium text-slate-900 dark:text-white flex items-center gap-2 mb-4">
              <Database size={18} className="text-brand-600 dark:text-brand-400"/> {t.privacy.dataMgmt}
          </h3>
          <ul className="space-y-3 mb-4">
              <li className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600"></span> {t.privacy.retention}
              </li>
              <li className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-400 dark:bg-slate-600"></span> {t.privacy.local}
              </li>
              <li className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2">
                   <span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {t.privacy.autoDel}
              </li>
          </ul>
          <button className="w-full py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-xs text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors">
              Modify Storage Settings
          </button>
      </div>

      {/* Audit Logs */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl overflow-hidden mb-6 shadow-sm">
          <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex justify-between items-center">
             <h3 className="font-medium text-slate-900 dark:text-white flex items-center gap-2">
                 <Activity size={18} className="text-brand-600 dark:text-brand-400"/> {t.privacy.audit}
             </h3>
             <span className="text-xs text-slate-500">{t.privacy.logs}: 12</span>
          </div>
          <div className="p-2">
             {MOCK_PRIVACY_LOGS.map(log => (
                 <div key={log.id} className="flex items-center justify-between p-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 rounded-lg transition">
                     <div className="flex flex-col">
                         <span className="text-sm text-slate-700 dark:text-slate-200">{log.action}</span>
                         <span className="text-xs text-slate-500">{log.user} • {log.detail}</span>
                     </div>
                     <span className="text-xs text-slate-500 dark:text-slate-600">{log.timestamp}</span>
                 </div>
             ))}
             <button className="w-full mt-2 text-xs text-brand-600 dark:text-brand-500 py-2 flex items-center justify-center gap-1">
                 <Search size={12} /> View Full Logs
             </button>
          </div>
      </div>

      {/* Encryption & Links */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
         <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
             <h3 className="font-medium text-slate-900 dark:text-white text-sm mb-3 flex items-center gap-2">
                 <Key size={16} className="text-brand-600 dark:text-brand-400"/> {t.privacy.encryption}
             </h3>
             <ul className="space-y-2">
                 <li className="text-xs text-slate-600 dark:text-slate-400">✓ {t.privacy.transmission}</li>
                 <li className="text-xs text-slate-600 dark:text-slate-400">✓ {t.privacy.storage}</li>
                 <li className="text-xs text-slate-600 dark:text-slate-400">✓ {t.privacy.e2e}</li>
             </ul>
         </div>
         <div className="flex flex-col gap-3">
             <button className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm">
                 <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                     <FileText size={16} /> {t.privacy.policy}
                 </div>
                 <ChevronRight size={16} className="text-slate-400 dark:text-slate-600" />
             </button>
             <button className="flex-1 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-slate-800 transition shadow-sm">
                 <div className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                     <Shield size={16} /> {t.privacy.terms}
                 </div>
                 <ChevronRight size={16} className="text-slate-400 dark:text-slate-600" />
             </button>
         </div>
      </div>
    </div>
  );
};
