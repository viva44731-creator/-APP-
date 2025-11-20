
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { Bell, Plus, Trash2, Edit2, Volume2, Activity, UserX, Smartphone, MessageSquare, PhoneCall } from 'lucide-react';
import { MOCK_RULES } from '../services/mockData';

export const Alerts: React.FC = () => {
  const { t } = useLanguage();
  const [rules] = useState(MOCK_RULES);

  const getIcon = (name: string) => {
      if (name.includes('Stranger')) return <UserX size={20} className="text-orange-500 dark:text-alert-orange"/>;
      if (name.includes('Sound')) return <Volume2 size={20} className="text-brand-600 dark:text-brand-400"/>;
      return <Activity size={20} className="text-red-500 dark:text-alert-red"/>;
  };

  return (
    <div className="p-4 pb-24 md:pl-24 max-w-3xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6 mt-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
           <Bell className="text-yellow-500 dark:text-alert-yellow" /> {t.alerts.title}
        </h1>
      </div>

      <div className="space-y-4">
         {rules.map(rule => (
             <div key={rule.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 relative overflow-hidden hover:border-slate-300 dark:hover:border-slate-600 transition-colors group shadow-sm">
                 {/* Status Indicator */}
                 <div className={`absolute left-0 top-0 bottom-0 w-1 ${rule.isEnabled ? 'bg-brand-500' : 'bg-slate-300 dark:bg-slate-700'}`} />
                 
                 <div className="pl-3">
                    <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg">
                                {getIcon(rule.name)}
                            </div>
                            <div>
                                <h3 className="font-bold text-slate-900 dark:text-white">{rule.name}</h3>
                                <p className="text-xs text-slate-500">{t.alerts.rule} {rule.id}</p>
                            </div>
                        </div>
                        <div className="flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"><Edit2 size={16}/></button>
                            <button className="p-2 text-slate-400 hover:text-red-500 dark:hover:text-red-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"><Trash2 size={16}/></button>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-y-2 gap-x-4 text-sm">
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 uppercase">{t.alerts.trigger}</span>
                            <span className="text-slate-700 dark:text-slate-300">{rule.trigger}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 uppercase">{t.alerts.sensitivity}</span>
                            <span className="text-slate-700 dark:text-slate-300">{rule.sensitivity}</span>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 uppercase">{t.alerts.time}</span>
                            <span className="text-slate-700 dark:text-slate-300">{rule.timeRange}</span>
                        </div>
                         <div className="flex flex-col">
                            <span className="text-[10px] text-slate-500 uppercase">{t.alerts.action}</span>
                            <span className="text-slate-700 dark:text-slate-300">{rule.action}</span>
                        </div>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2">
                        <span className="text-xs text-slate-500">{t.alerts.notify}:</span>
                        <div className="flex gap-2">
                            {rule.notification.includes('APP') && <span className="px-2 py-0.5 rounded bg-blue-100 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 text-[10px] border border-blue-200 dark:border-blue-500/20 flex items-center gap-1"><Smartphone size={10}/> {t.alerts.app}</span>}
                            {rule.notification.includes('SMS') && <span className="px-2 py-0.5 rounded bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-400 text-[10px] border border-green-200 dark:border-green-500/20 flex items-center gap-1"><MessageSquare size={10}/> {t.alerts.sms}</span>}
                            {rule.notification.includes('CALL') && <span className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-400 text-[10px] border border-red-200 dark:border-red-500/20 flex items-center gap-1"><PhoneCall size={10}/> {t.alerts.call}</span>}
                        </div>
                    </div>
                 </div>
             </div>
         ))}
      </div>

      <button className="w-full mt-6 py-4 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition flex items-center justify-center gap-2">
         <Plus size={20} />
         {t.alerts.newRule}
      </button>
    </div>
  );
};
