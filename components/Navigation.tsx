
import React from 'react';
import { Home, HardDrive, User, Bell, BarChart2 } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useLanguage } from '../contexts/LanguageContext';

export const Navigation: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { t } = useLanguage();

  const navItems = [
    { path: '/', icon: Home, label: t.nav.devices }, // Home dashboard
    { path: '/devices', icon: HardDrive, label: t.nav.devices }, // Device Management
    { path: '/analytics', icon: BarChart2, label: t.nav.analytics },
    { path: '/alerts', icon: Bell, label: t.nav.alerts },
    { path: '/settings', icon: User, label: t.nav.me },
  ];

  const getLabel = (path: string) => {
    if (path === '/') return 'Home';
    const item = navItems.find(i => i.path === path);
    return item?.label;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800 pb-safe h-16 md:h-screen md:w-20 md:border-r md:border-t-0 md:top-0 md:flex md:flex-col md:items-center md:pt-8 z-50 transition-colors duration-300">
      <div className="flex justify-around items-center h-full w-full md:flex-col md:justify-start md:gap-8">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center gap-1 w-full md:w-auto transition-colors duration-200 ${
                isActive ? 'text-brand-600 dark:text-brand-500' : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-200'
              }`}
            >
              <item.icon size={isActive ? 26 : 24} strokeWidth={isActive ? 2.5 : 2} />
              <span className="text-[10px] font-medium md:hidden">{item.path === '/' ? (useLanguage().language === 'zh' ? '首页' : 'Home') : item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
