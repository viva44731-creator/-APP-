
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { MOCK_CAMERAS, MOCK_IOT_DEVICES } from '../services/mockData';
import { Plus, Signal, Battery, HardDrive, MoreHorizontal, Power, Lock, Lightbulb, Camera as CameraIcon, Wifi, WifiOff } from 'lucide-react';

export const Devices: React.FC = () => {
  const { t } = useLanguage();

  const getSignalColor = (strength?: string) => {
    switch(strength) {
      case 'STRONG': return 'text-green-600 dark:text-green-500';
      case 'MEDIUM': return 'text-yellow-600 dark:text-yellow-500';
      case 'WEAK': return 'text-orange-600 dark:text-orange-500';
      case 'NONE': return 'text-red-600 dark:text-red-500';
      default: return 'text-slate-500';
    }
  };

  const getSignalIcon = (strength?: string) => {
    if (strength === 'NONE') return <WifiOff size={14} />;
    return <Wifi size={14} />;
  };

  const getSignalText = (strength?: string) => {
    switch(strength) {
      case 'STRONG': return t.devices.strong;
      case 'MEDIUM': return t.devices.medium;
      case 'WEAK': return t.devices.weak;
      case 'NONE': return t.devices.none;
      default: return t.devices.none;
    }
  };

  return (
    <div className="p-4 pb-24 md:pl-24 max-w-3xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6 mt-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          {t.devices.title} <Plus size={20} className="ml-2 text-brand-600 dark:text-brand-500 bg-brand-100 dark:bg-brand-900/30 rounded-full p-0.5" />
        </h1>
      </div>

      {/* Cameras Section */}
      <div className="mb-6">
         <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-3 uppercase tracking-wider flex items-center gap-2">
           <CameraIcon size={16} /> {t.devices.cameras} ({MOCK_CAMERAS.length})
         </h2>
         <div className="space-y-3">
            {MOCK_CAMERAS.map(cam => (
              <div key={cam.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex flex-col gap-3 shadow-sm">
                  <div className="flex justify-between items-start">
                     <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${cam.status === 'ONLINE' ? 'bg-green-500' : 'bg-red-500'}`} />
                        <div>
                            <h3 className="font-bold text-slate-900 dark:text-white">{cam.name}</h3>
                            <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                <span>{t.devices.model}: {cam.model}</span>
                                <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                <span>{cam.status === 'ONLINE' ? t.home.online : t.home.offline}</span>
                            </div>
                        </div>
                     </div>
                     <button className="text-slate-400 hover:text-slate-700 dark:hover:text-white"><MoreHorizontal size={20}/></button>
                  </div>

                  <div className="grid grid-cols-3 gap-2 bg-slate-50 dark:bg-slate-950/50 rounded-lg p-3 border border-slate-100 dark:border-slate-800/50">
                      <div className="flex flex-col items-center justify-center border-r border-slate-200 dark:border-slate-800/50">
                          <div className={`flex items-center gap-1 text-xs mb-1 ${getSignalColor(cam.signalStrength)}`}>
                             {getSignalIcon(cam.signalStrength)} {getSignalText(cam.signalStrength)}
                          </div>
                          <span className="text-[10px] text-slate-500">{t.devices.signal}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center border-r border-slate-200 dark:border-slate-800/50">
                          <div className="flex items-center gap-1 text-xs mb-1 text-slate-700 dark:text-slate-300">
                             <HardDrive size={14} /> {cam.storageUsed || '0'}/{cam.storageTotal || '0'}
                          </div>
                          <span className="text-[10px] text-slate-500">{t.devices.storage}</span>
                      </div>
                      <div className="flex flex-col items-center justify-center">
                           <div className={`flex items-center gap-1 text-xs mb-1 ${!cam.batteryLevel ? 'text-slate-400 dark:text-slate-600' : (cam.batteryLevel < 20 ? 'text-red-500 dark:text-red-400' : 'text-green-600 dark:text-green-400')}`}>
                             <Battery size={14} /> {cam.batteryLevel ? `${cam.batteryLevel}%` : '--'}
                          </div>
                          <span className="text-[10px] text-slate-500">{t.devices.battery}</span>
                      </div>
                  </div>

                  <div className="flex gap-2 mt-1">
                      <button className="flex-1 py-1.5 bg-brand-50 dark:bg-brand-600/10 text-brand-600 dark:text-brand-400 rounded text-xs font-medium hover:bg-brand-100 dark:hover:bg-brand-600 hover:text-brand-700 dark:hover:text-white transition">
                          {t.devices.view}
                      </button>
                      <button className="flex-1 py-1.5 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 rounded text-xs font-medium hover:bg-slate-200 dark:hover:bg-slate-700 transition">
                          {t.devices.setup}
                      </button>
                  </div>
              </div>
            ))}
         </div>
      </div>

      {/* Other Devices */}
      <div className="mb-8">
         <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-3 uppercase tracking-wider flex items-center gap-2">
           <Power size={16} /> {t.devices.otherDevices} ({MOCK_IOT_DEVICES.length})
         </h2>
         <div className="space-y-3">
             {MOCK_IOT_DEVICES.map(device => (
                 <div key={device.id} className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
                     <div className="flex justify-between items-center">
                         <div className="flex items-center gap-3">
                             <div className="p-2 bg-slate-100 dark:bg-slate-800 rounded-lg text-brand-600 dark:text-brand-400">
                                 {device.type === 'LOCK' ? <Lock size={20}/> : <Lightbulb size={20}/>}
                             </div>
                             <div>
                                 <h3 className="font-bold text-slate-900 dark:text-white">{device.name}</h3>
                                 <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                                     <span className="text-green-600 dark:text-green-400">{t.home.online}</span>
                                     {device.batteryLevel && (
                                         <>
                                         <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                         <span>{t.devices.battery}: {device.batteryLevel}%</span>
                                         </>
                                     )}
                                      {device.powerStatus && (
                                         <>
                                         <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full"></span>
                                         <span>{t.devices.power}: {device.powerStatus}</span>
                                         </>
                                     )}
                                 </div>
                             </div>
                         </div>
                         <div className="flex gap-2">
                              <button className="text-xs px-3 py-1.5 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded text-slate-600 dark:text-slate-300 transition">{t.devices.setup}</button>
                              <button className="text-slate-400 hover:text-slate-700 dark:hover:text-white"><MoreHorizontal size={20}/></button>
                         </div>
                     </div>
                 </div>
             ))}
         </div>
      </div>

      <button className="w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition flex items-center justify-center gap-2">
         <Plus size={20} />
         {t.devices.addDevice}
      </button>
    </div>
  );
};
