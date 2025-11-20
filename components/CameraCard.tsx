
import React from 'react';
import { Camera, CameraStatus } from '../types';
import { AlertCircle, Battery, Signal, Moon } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';

interface CameraCardProps {
  camera: Camera;
  onClick: (id: string) => void;
}

export const CameraCard: React.FC<CameraCardProps> = ({ camera, onClick }) => {
  const isOffline = camera.status === CameraStatus.OFFLINE;
  const { t } = useLanguage();

  return (
    <div 
      onClick={() => onClick(camera.id)}
      className="relative group cursor-pointer bg-white dark:bg-slate-900 rounded-xl overflow-hidden border border-slate-200 dark:border-slate-800 hover:border-brand-500 dark:hover:border-brand-500 transition-all duration-300 shadow-md hover:shadow-lg"
    >
      {/* Header / Status Bar */}
      <div className="absolute top-0 left-0 right-0 p-3 flex justify-between items-center bg-gradient-to-b from-black/70 to-transparent z-10">
        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${isOffline ? 'bg-red-500' : 'bg-green-500'} animate-pulse`} />
          <span className="text-xs font-medium text-white shadow-sm">{camera.name}</span>
        </div>
        <div className="flex items-center gap-2 text-white/80">
          {camera.batteryLevel && (
            <div className="flex items-center gap-0.5 text-xs">
              <Battery size={14} className={camera.batteryLevel < 20 ? 'text-red-400' : 'text-green-400'} />
              <span>{camera.batteryLevel}%</span>
            </div>
          )}
          <Signal size={14} />
        </div>
      </div>

      {/* Thumbnail */}
      <div className="aspect-video w-full bg-slate-200 dark:bg-slate-800 relative">
        <img 
          src={camera.thumbnailUrl} 
          alt={camera.name} 
          className={`w-full h-full object-cover transition-opacity ${isOffline ? 'opacity-50 grayscale' : 'opacity-90 group-hover:opacity-100'}`}
        />
        
        {isOffline && (
          <div className="absolute inset-0 flex items-center justify-center flex-col text-slate-500 dark:text-slate-400">
            <AlertCircle size={32} className="mb-2" />
            <span className="text-sm">{t.camera.offline}</span>
          </div>
        )}

        {!isOffline && camera.status === CameraStatus.PRIVACY_MODE && (
           <div className="absolute inset-0 flex items-center justify-center flex-col text-brand-600 dark:text-brand-400 bg-white/90 dark:bg-slate-900/90 backdrop-blur-md">
           <Moon size={32} className="mb-2" />
           <span className="text-sm">{t.camera.privacy}</span>
         </div>
        )}
      </div>

      {/* Footer Info */}
      <div className="p-3 bg-white dark:bg-slate-900 flex justify-between items-center">
        <div className="flex flex-col">
            <span className="text-xs text-slate-500">{t.camera.lastEvent}</span>
            <span className="text-xs text-slate-700 dark:text-slate-300">{camera.lastEventTime || t.camera.none}</span>
        </div>
        <div className="text-xs px-2 py-1 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-700 group-hover:bg-brand-50 dark:group-hover:bg-brand-900/30 group-hover:text-brand-600 dark:group-hover:text-brand-400 group-hover:border-brand-200 dark:group-hover:border-brand-500/50 transition-colors">
            {t.camera.live}
        </div>
      </div>
    </div>
  );
};
