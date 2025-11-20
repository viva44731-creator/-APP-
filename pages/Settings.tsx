
import React, { useState } from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Globe, ChevronRight, Shield, Cloud, LogOut, Users, User, Bell, Smartphone, HelpCircle, Info, Lock, Moon, Sun, ChevronLeft, Check, Clock, Volume2, Speaker, Vibrate } from 'lucide-react';

export const Settings: React.FC = () => {
  const { language, setLanguage, t } = useLanguage();
  const { theme, setTheme } = useTheme();
  const navigate = useNavigate();
  const [activeSubPage, setActiveSubPage] = useState<string | null>(null);

  // --- Notification Settings State ---
  const [notifyConfig, setNotifyConfig] = useState({
      pushEnabled: true,
      types: {
        motion: true,
        sound: true,
        people: true,
        system: false
      },
      schedule: {
        enabled: false,
        start: '22:00',
        end: '07:00'
      },
      feedback: {
        sound: true,
        vibration: true
      }
  });

  const handleToggleNotify = () => setNotifyConfig(p => ({ ...p, pushEnabled: !p.pushEnabled }));
  
  const handleTypeToggle = (key: keyof typeof notifyConfig.types) => {
      setNotifyConfig(p => ({ ...p, types: { ...p.types, [key]: !p.types[key] } }));
  };

  const handleScheduleToggle = () => {
      setNotifyConfig(p => ({ ...p, schedule: { ...p.schedule, enabled: !p.schedule.enabled } }));
  };

  const handleScheduleChange = (key: 'start' | 'end', val: string) => {
      setNotifyConfig(p => ({ ...p, schedule: { ...p.schedule, [key]: val } }));
  };
  
  const handleFeedbackToggle = (key: keyof typeof notifyConfig.feedback) => {
      setNotifyConfig(p => ({ ...p, feedback: { ...p.feedback, [key]: !p.feedback[key] } }));
  };

  const SectionHeader: React.FC<{title: string}> = ({title}) => (
      <div className="px-4 pt-6 pb-2">
          <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider">{title}</h2>
      </div>
  );

  const SettingItem: React.FC<{icon: React.ElementType, label: string, value?: string, onClick?: () => void, color?: string}> = ({icon: Icon, label, value, onClick, color}) => (
      <div onClick={onClick} className="px-4 py-3.5 bg-white dark:bg-slate-900 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors border-b border-slate-100 dark:border-slate-800 last:border-0">
          <div className="flex items-center gap-3">
              <Icon size={20} className={color || "text-slate-400"} />
              <span className="text-sm text-slate-900 dark:text-slate-200">{label}</span>
          </div>
          <div className="flex items-center gap-2">
              {value && <span className="text-xs text-slate-500">{value}</span>}
              <ChevronRight size={16} className="text-slate-400 dark:text-slate-600" />
          </div>
      </div>
  );

  // --- Sub-Page: Notification Settings ---
  if (activeSubPage === 'NOTIFICATIONS') {
    return (
      <div className="pb-24 md:pl-24 max-w-3xl mx-auto animate-fade-in">
          {/* Header */}
          <div className="flex items-center gap-2 p-4 md:pt-10 mb-2">
              <button onClick={() => setActiveSubPage(null)} className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                  <ChevronLeft size={24} />
              </button>
              <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t.settings.notifyPage.title}</h1>
              </div>
          </div>

          <div className="space-y-6">
              {/* Master Switch */}
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mx-4 rounded-xl p-4 flex items-center justify-between shadow-lg">
                  <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${notifyConfig.pushEnabled ? 'bg-brand-100 dark:bg-brand-600/20 text-brand-600 dark:text-brand-500' : 'bg-slate-100 dark:bg-slate-800 text-slate-500'}`}>
                          <Bell size={24} />
                      </div>
                      <div>
                          <h3 className="font-bold text-slate-900 dark:text-white">{t.settings.notifyPage.masterSwitch}</h3>
                          <p className="text-xs text-slate-500">{notifyConfig.pushEnabled ? 'On' : 'Off'}</p>
                      </div>
                  </div>
                  <div 
                      onClick={handleToggleNotify}
                      className={`relative inline-flex h-7 w-12 items-center rounded-full cursor-pointer transition-colors duration-300 ${notifyConfig.pushEnabled ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                  >
                      <span className={`inline-block h-5 w-5 transform rounded-full bg-white transition duration-300 ${notifyConfig.pushEnabled ? 'translate-x-6' : 'translate-x-1'}`} />
                  </div>
              </div>

              {notifyConfig.pushEnabled && (
                <>
                    {/* Notification Types */}
                    <div>
                        <SectionHeader title={t.settings.notifyPage.types} />
                        <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mx-4 rounded-xl overflow-hidden">
                            {([
                                { k: 'motion', label: t.settings.notifyPage.typeMotion },
                                { k: 'sound', label: t.settings.notifyPage.typeSound },
                                { k: 'people', label: t.settings.notifyPage.typePerson },
                                { k: 'system', label: t.settings.notifyPage.typeSystem }
                            ] as const).map((item) => (
                                <div key={item.k} onClick={() => handleTypeToggle(item.k)} className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800 last:border-0 cursor-pointer hover:bg-slate-50 dark:hover:bg-slate-800/50">
                                    <span className="text-sm text-slate-900 dark:text-slate-200">{item.label}</span>
                                    <div className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${notifyConfig.types[item.k] ? 'bg-brand-600 border-brand-600' : 'border-slate-300 dark:border-slate-600'}`}>
                                        {notifyConfig.types[item.k] && <Check size={14} className="text-white" />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Schedule / DND */}
                    <div>
                         <SectionHeader title={t.settings.notifyPage.schedule} />
                         <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mx-4 rounded-xl p-4">
                             <div className="flex items-center justify-between mb-4">
                                 <div className="flex items-center gap-3">
                                    <Clock size={20} className="text-slate-400" />
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-slate-900 dark:text-slate-200">{t.settings.notifyPage.schedule}</span>
                                        <span className="text-xs text-slate-500">{t.settings.notifyPage.scheduleDesc}</span>
                                    </div>
                                 </div>
                                 <div 
                                      onClick={handleScheduleToggle}
                                      className={`relative inline-flex h-6 w-10 items-center rounded-full cursor-pointer transition-colors ${notifyConfig.schedule.enabled ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                                  >
                                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notifyConfig.schedule.enabled ? 'translate-x-5' : 'translate-x-1'}`} />
                                  </div>
                             </div>
                             
                             {notifyConfig.schedule.enabled && (
                                 <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-100 dark:border-slate-800">
                                     <div>
                                         <label className="text-xs text-slate-500 mb-1 block">{t.settings.notifyPage.from}</label>
                                         <input 
                                            type="time" 
                                            value={notifyConfig.schedule.start} 
                                            onChange={(e) => handleScheduleChange('start', e.target.value)}
                                            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white text-sm w-full outline-none focus:border-brand-500"
                                         />
                                     </div>
                                     <div>
                                         <label className="text-xs text-slate-500 mb-1 block">{t.settings.notifyPage.to}</label>
                                         <input 
                                            type="time" 
                                            value={notifyConfig.schedule.end}
                                            onChange={(e) => handleScheduleChange('end', e.target.value)}
                                            className="bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-700 rounded-lg px-3 py-2 text-slate-900 dark:text-white text-sm w-full outline-none focus:border-brand-500"
                                         />
                                     </div>
                                 </div>
                             )}
                         </div>
                    </div>

                    {/* Sound & Vibration */}
                    <div>
                         <SectionHeader title={t.settings.notifyPage.feedback} />
                         <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 mx-4 rounded-xl overflow-hidden">
                             <div className="flex items-center justify-between p-4 border-b border-slate-100 dark:border-slate-800">
                                 <div className="flex items-center gap-3">
                                     <Speaker size={18} className="text-slate-400"/>
                                     <span className="text-sm text-slate-900 dark:text-slate-200">{t.settings.notifyPage.sound}</span>
                                 </div>
                                 <div 
                                      onClick={() => handleFeedbackToggle('sound')}
                                      className={`relative inline-flex h-6 w-10 items-center rounded-full cursor-pointer transition-colors ${notifyConfig.feedback.sound ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                                  >
                                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notifyConfig.feedback.sound ? 'translate-x-5' : 'translate-x-1'}`} />
                                  </div>
                             </div>
                             <div className="flex items-center justify-between p-4">
                                 <div className="flex items-center gap-3">
                                     <Vibrate size={18} className="text-slate-400"/>
                                     <span className="text-sm text-slate-900 dark:text-slate-200">{t.settings.notifyPage.vibration}</span>
                                 </div>
                                 <div 
                                      onClick={() => handleFeedbackToggle('vibration')}
                                      className={`relative inline-flex h-6 w-10 items-center rounded-full cursor-pointer transition-colors ${notifyConfig.feedback.vibration ? 'bg-brand-600' : 'bg-slate-300 dark:bg-slate-700'}`}
                                  >
                                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${notifyConfig.feedback.vibration ? 'translate-x-5' : 'translate-x-1'}`} />
                                  </div>
                             </div>
                         </div>
                    </div>
                </>
              )}
          </div>
      </div>
    );
  }

  // --- Sub-Page: Theme Settings ---
  if (activeSubPage === 'THEME') {
    return (
      <div className="pb-24 md:pl-24 max-w-3xl mx-auto animate-fade-in">
          {/* Header */}
          <div className="flex items-center gap-2 p-4 md:pt-10 mb-2">
              <button onClick={() => setActiveSubPage(null)} className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
                  <ChevronLeft size={24} />
              </button>
              <div>
                  <h1 className="text-2xl font-bold text-slate-900 dark:text-white">{t.settings.theme}</h1>
              </div>
          </div>

          <div className="space-y-4 mx-4">
             <div 
                onClick={() => setTheme('light')}
                className={`bg-white dark:bg-slate-900 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-colors ${theme === 'light' ? 'border-brand-500 ring-1 ring-brand-500' : 'border-slate-200 dark:border-slate-800 hover:border-brand-200 dark:hover:border-slate-700'}`}
             >
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-100 rounded-full text-slate-600">
                       <Sun size={24} />
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">{t.settings.themeLight}</span>
                 </div>
                 {theme === 'light' && <Check size={20} className="text-brand-500" />}
             </div>

             <div 
                onClick={() => setTheme('dark')}
                className={`bg-white dark:bg-slate-900 border rounded-xl p-4 flex items-center justify-between cursor-pointer transition-colors ${theme === 'dark' ? 'border-brand-500 ring-1 ring-brand-500' : 'border-slate-200 dark:border-slate-800 hover:border-brand-200 dark:hover:border-slate-700'}`}
             >
                 <div className="flex items-center gap-4">
                    <div className="p-3 bg-slate-800 rounded-full text-slate-300">
                       <Moon size={24} />
                    </div>
                    <span className="font-medium text-slate-900 dark:text-white">{t.settings.themeDark}</span>
                 </div>
                 {theme === 'dark' && <Check size={20} className="text-brand-500" />}
             </div>
          </div>
      </div>
    );
  }


  // --- Main Render ---
  return (
    <div className="pb-24 md:pl-24 max-w-3xl mx-auto animate-fade-in">
      <div className="p-4 md:pt-10">
          <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">{t.settings.title}</h1>
          <p className="text-slate-500 dark:text-slate-400 text-sm">{t.settings.description}</p>
      </div>

      <div className="space-y-1">
          <SectionHeader title={t.settings.account} />
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 mx-4">
              <SettingItem icon={User} label={t.settings.personalInfo} value="Zhang San" color="text-brand-500" />
              <SettingItem icon={Lock} label={t.settings.changePassword} color="text-brand-500" />
              <SettingItem icon={Users} label={t.settings.familyManagement} onClick={() => navigate('/family')} color="text-brand-500" />
          </div>

          <SectionHeader title={t.settings.system} />
          <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 mx-4">
              <SettingItem 
                icon={Bell} 
                label={t.settings.notifications} 
                onClick={() => setActiveSubPage('NOTIFICATIONS')}
                value={notifyConfig.pushEnabled ? 'On' : 'Off'}
              />
              <SettingItem icon={Shield} label={t.settings.privacy} onClick={() => navigate('/privacy')} />
              <SettingItem 
                icon={theme === 'dark' ? Moon : Sun} 
                label={t.settings.theme} 
                value={theme === 'dark' ? t.settings.themeDark : t.settings.themeLight}
                onClick={() => setActiveSubPage('THEME')}
              />
              <div className="px-4 py-3.5 bg-white dark:bg-slate-900 flex items-center justify-between border-b border-slate-200 dark:border-slate-800">
                  <div className="flex items-center gap-3">
                      <Globe size={20} className="text-slate-400" />
                      <span className="text-sm text-slate-900 dark:text-slate-200">{t.settings.language}</span>
                  </div>
                  <div className="flex gap-1">
                      <button 
                          onClick={(e) => {e.stopPropagation(); setLanguage('en');}}
                          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${language === 'en' ? 'bg-brand-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}
                      >
                          EN
                      </button>
                      <button 
                          onClick={(e) => {e.stopPropagation(); setLanguage('zh');}}
                          className={`px-2 py-1 rounded text-xs font-medium transition-colors ${language === 'zh' ? 'bg-brand-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'}`}
                      >
                          中文
                      </button>
                  </div>
              </div>
          </div>

           <SectionHeader title={t.settings.help} />
           <div className="rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 mx-4">
              <SettingItem icon={HelpCircle} label={t.settings.faq} />
              <SettingItem icon={Smartphone} label={t.settings.contactSupport} />
              <SettingItem icon={Info} label={t.settings.about} value={t.settings.version} />
           </div>
      </div>

       <div className="p-6 mt-4">
           <button className="w-full py-3 rounded-xl border border-alert-red/30 text-alert-red hover:bg-alert-red/10 transition flex items-center justify-center gap-2 text-sm font-medium">
               <LogOut size={18} />
               {t.settings.signOut}
           </button>
       </div>
    </div>
  );
};
