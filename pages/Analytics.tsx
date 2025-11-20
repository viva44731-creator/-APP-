
import React from 'react';
import { useLanguage } from '../contexts/LanguageContext';
import { BarChart2, Download, Calendar, AlertTriangle, User, Zap, Activity, FileText } from 'lucide-react';

export const Analytics: React.FC = () => {
  const { t } = useLanguage();

  // Mock chart data
  const weeklyData = [4, 7, 3, 9, 12, 5, 6];
  const maxVal = Math.max(...weeklyData);

  return (
    <div className="p-4 pb-24 md:pl-24 max-w-3xl mx-auto animate-fade-in">
      <div className="flex justify-between items-center mb-6 mt-2">
        <h1 className="text-2xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
          {t.analytics.title} <BarChart2 size={20} className="text-brand-600 dark:text-brand-500" />
        </h1>
        <button className="p-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition">
           <Download size={20} />
        </button>
      </div>

      {/* Filter */}
      <div className="flex items-center justify-between bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-3 mb-6 shadow-sm">
          <span className="text-sm text-slate-500 dark:text-slate-400 pl-1">{t.analytics.timeRange}</span>
          <div className="flex items-center gap-2 text-slate-700 dark:text-white font-medium bg-slate-100 dark:bg-slate-800 px-3 py-1.5 rounded-lg cursor-pointer hover:bg-slate-200 dark:hover:bg-slate-700 transition">
              {t.analytics.last7days} <Calendar size={14} />
          </div>
      </div>

      {/* Security Overview */}
      <div className="mb-6">
          <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-3 uppercase tracking-wider">{t.analytics.overview}</h2>
          <div className="grid grid-cols-2 gap-3">
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
                  <div className="text-xs text-slate-500 mb-1">{t.analytics.totalAlerts}</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">12</div>
                  <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
                      <div className="bg-brand-600 dark:bg-brand-500 w-[60%] h-full rounded-full"></div>
                  </div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
                  <div className="text-xs text-slate-500 mb-1">{t.analytics.personDetect}</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">8</div>
                   <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
                      <div className="bg-blue-500 w-[40%] h-full rounded-full"></div>
                  </div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
                  <div className="text-xs text-slate-500 mb-1">{t.analytics.abnormal}</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">3</div>
                   <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
                      <div className="bg-orange-500 dark:bg-alert-orange w-[20%] h-full rounded-full"></div>
                  </div>
              </div>
              <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 shadow-sm">
                  <div className="text-xs text-slate-500 mb-1">{t.analytics.deviceErr}</div>
                  <div className="text-2xl font-bold text-slate-900 dark:text-white">1</div>
                   <div className="w-full bg-slate-100 dark:bg-slate-800 h-1 rounded-full mt-3 overflow-hidden">
                      <div className="bg-red-500 w-[10%] h-full rounded-full"></div>
                  </div>
              </div>
          </div>
      </div>

      {/* Chart: Alert Trends */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 mb-6 shadow-sm">
          <h2 className="text-slate-900 dark:text-white font-medium mb-6 flex items-center gap-2">
              <Activity size={18} className="text-brand-600 dark:text-brand-500"/> {t.analytics.trends}
          </h2>
          
          <div className="flex items-end justify-between h-32 gap-2 px-2">
              {weeklyData.map((val, idx) => {
                  const height = `${(val / maxVal) * 100}%`;
                  return (
                      <div key={idx} className="flex flex-col items-center gap-2 flex-1 group">
                          <div className="w-full bg-slate-100 dark:bg-slate-800 rounded-t-md relative group-hover:bg-slate-200 dark:group-hover:bg-slate-700 transition-all" style={{height}}>
                               <div className="bg-brand-600 absolute bottom-0 left-0 right-0 top-2 opacity-20 rounded-t-md"></div>
                               <div className="bg-brand-500 absolute bottom-0 left-1 right-1 top-0 rounded-t-sm"></div>
                               
                               {/* Tooltip */}
                               <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-800 dark:bg-white text-white dark:text-slate-900 text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity shadow">
                                   {val}
                               </div>
                          </div>
                          <span className="text-[10px] text-slate-500">{['M','T','W','T','F','S','S'][idx]}</span>
                      </div>
                  )
              })}
          </div>
      </div>

      {/* Activity Heatmap (Simplified) */}
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-5 mb-6 shadow-sm">
           <h2 className="text-slate-900 dark:text-white font-medium mb-4 flex items-center gap-2">
              <Zap size={18} className="text-yellow-500"/> {t.analytics.activity}
          </h2>
          <div className="space-y-3">
              <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-20">00:00-06:00</span>
                  <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="bg-brand-500/30 w-[10%] h-full"></div>
                  </div>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-mono">2</span>
              </div>
              <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-20">06:00-12:00</span>
                  <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="bg-brand-500 w-[80%] h-full"></div>
                  </div>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-mono">18</span>
              </div>
              <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-20">12:00-18:00</span>
                  <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="bg-brand-500 w-[60%] h-full"></div>
                  </div>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-mono">14</span>
              </div>
              <div className="flex items-center gap-3">
                  <span className="text-xs text-slate-500 w-20">18:00-24:00</span>
                   <div className="flex-1 h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                      <div className="bg-brand-500 w-[70%] h-full"></div>
                  </div>
                  <span className="text-xs text-slate-700 dark:text-slate-300 font-mono">16</span>
              </div>
          </div>
      </div>

      <div className="flex gap-3">
          <button className="flex-1 py-3 bg-brand-600 hover:bg-brand-500 text-white rounded-xl font-medium text-sm transition flex items-center justify-center gap-2 shadow-lg shadow-brand-500/20">
              <FileText size={16} /> {t.analytics.generateReport}
          </button>
           <button className="flex-1 py-3 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 rounded-xl font-medium text-sm transition flex items-center justify-center gap-2">
              <Download size={16} /> {t.analytics.exportPdf}
          </button>
      </div>
    </div>
  );
};
