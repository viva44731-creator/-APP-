
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MOCK_FAMILY } from '../services/mockData';
import { ChevronLeft, Plus, User, Shield, Eye, Settings } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { FamilyMember } from '../types';

const MemberCard: React.FC<{ member: FamilyMember }> = ({ member }) => {
  const { t } = useLanguage();
  
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl p-4 flex items-center justify-between mb-3 shadow-sm">
       <div className="flex items-center gap-4">
          <div className="relative">
             <img src={member.avatarUrl} alt={member.name} className="w-12 h-12 rounded-full border-2 border-slate-100 dark:border-slate-800" />
             {member.isOnline && (
                 <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-slate-900 rounded-full"></div>
             )}
          </div>
          <div>
             <div className="flex items-center gap-2">
                <h3 className="text-slate-900 dark:text-white font-medium text-sm">{member.name}</h3>
                <span className="text-xs text-slate-500">({member.relation})</span>
             </div>
             <div className="text-xs text-slate-400 mt-0.5">
                {member.isOnline 
                    ? <span className="text-green-600 dark:text-green-400">{t.family.online}</span> 
                    : <span className="text-slate-500 dark:text-slate-400">{t.family.offline}: {member.lastActive}</span>
                }
             </div>
             <div className="flex gap-1 mt-2">
                 <span className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-1.5 py-0.5 rounded border border-slate-200 dark:border-slate-700 flex items-center gap-1">
                    {member.role === 'ADMIN' ? <Shield size={10}/> : <Eye size={10}/>}
                    {member.role}
                 </span>
             </div>
          </div>
       </div>
       <div className="flex gap-2">
          <button className="p-2 text-slate-400 hover:text-slate-700 dark:hover:text-white bg-slate-50 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-lg transition">
             <Settings size={16} />
          </button>
       </div>
    </div>
  );
};

export const FamilyMembers: React.FC = () => {
  const navigate = useNavigate();
  const { t } = useLanguage();
  
  const admins = MOCK_FAMILY.filter(m => m.role === 'ADMIN');
  const members = MOCK_FAMILY.filter(m => m.role === 'MEMBER');
  const visitors = MOCK_FAMILY.filter(m => m.role === 'VISITOR');

  return (
    <div className="p-4 pb-24 md:pl-24 max-w-3xl mx-auto animate-fade-in min-h-screen">
       {/* Header */}
       <div className="flex items-center justify-between mb-8 mt-2">
        <div className="flex items-center gap-2">
            <button onClick={() => navigate('/settings')} className="p-1 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white">
                <ChevronLeft size={24} />
            </button>
            <div>
                <h1 className="text-xl font-bold text-slate-900 dark:text-white">{t.family.title}</h1>
                <p className="text-xs text-slate-500">{t.family.familyName} • {t.family.memberCount}: {MOCK_FAMILY.length}</p>
            </div>
        </div>
        <button className="p-2 bg-brand-600 text-white rounded-full hover:bg-brand-500 shadow-lg shadow-brand-500/30 dark:shadow-brand-900/20">
            <Plus size={20} />
        </button>
      </div>

      {/* Admins */}
      <div className="mb-6">
         <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-3 uppercase tracking-wider flex items-center gap-2">
            <Shield size={14} /> {t.family.admin}
         </h2>
         {admins.map(m => <MemberCard key={m.id} member={m} />)}
      </div>

      {/* Members */}
      <div className="mb-6">
         <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-3 uppercase tracking-wider flex items-center gap-2">
            <User size={14} /> {t.family.members}
         </h2>
         {members.map(m => <MemberCard key={m.id} member={m} />)}
      </div>

      {/* Visitors */}
      {visitors.length > 0 && (
          <div className="mb-6">
            <h2 className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-3 uppercase tracking-wider flex items-center gap-2">
                <Eye size={14} /> {t.family.visitors}
            </h2>
            {visitors.map(m => <MemberCard key={m.id} member={m} />)}
          </div>
      )}

      <button className="w-full py-4 border-2 border-dashed border-slate-300 dark:border-slate-800 rounded-xl text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 hover:border-slate-400 dark:hover:border-slate-600 hover:bg-slate-50 dark:hover:bg-slate-900/50 transition flex items-center justify-center gap-2">
         <Plus size={20} />
         {t.family.invite}
      </button>
    </div>
  );
};
