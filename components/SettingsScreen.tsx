
import React from 'react';
import { 
  ArrowRight, User, Lock, Bell, ShieldCheck, 
  Globe, CreditCard, HelpCircle, ChevronLeft, 
  Camera, LogOut, ChevronRight, Crown
} from 'lucide-react';
import { UserProfile, ScreenType } from '../types';

interface SettingsScreenProps {
  user: UserProfile;
  onBack: () => void;
  onLogout: () => void;
  onNavigate: (screen: ScreenType) => void;
}

const SettingsScreen: React.FC<SettingsScreenProps> = ({ user, onBack, onLogout, onNavigate }) => {
  const settingsGroups = [
    {
      title: 'الملف الشخصي',
      items: [
        { label: 'تعديل البيانات الشخصية', icon: <User size={18} />, color: 'text-blue-600' },
        { label: 'توثيق الحساب (KYC)', icon: <ShieldCheck size={18} />, color: 'text-emerald-600', status: user.kycStatus === 'verified' ? 'موثق' : 'غير موثق' },
        { label: 'إدارة الاشتراك', icon: <Crown size={18} />, color: 'text-amber-500', action: () => onNavigate(ScreenType.SUBSCRIPTION_MANAGEMENT) },
        { label: 'طرق الدفع والبطاقات', icon: <CreditCard size={18} />, color: 'text-indigo-600' }
      ]
    },
    {
      title: 'الأمان والخصوصية',
      items: [
        { label: 'تغيير كلمة المرور', icon: <Lock size={18} />, color: 'text-slate-700' },
        { label: 'إعدادات الإشعارات', icon: <Bell size={18} />, color: 'text-indigo-600' },
        { label: 'اللغة (العربية)', icon: <Globe size={18} />, color: 'text-blue-400' }
      ]
    },
    {
      title: 'الدعم والقانون',
      items: [
        { label: 'المساعدة والدعم الفني', icon: <HelpCircle size={18} />, color: 'text-slate-400' },
        { label: 'الشروط والأحكام', icon: <ShieldCheck size={18} />, color: 'text-slate-400' }
      ]
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-right duration-500 overflow-y-auto pb-24">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-30 shadow-sm flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowRight size={20} /></button>
        <h1 className="text-lg font-black text-slate-900">إعدادات الحساب</h1>
        <div className="w-10" />
      </div>

      {/* Profile Summary Card */}
      <div className="p-6 bg-white border-b flex flex-col items-center gap-4">
         <div className="relative group">
            <div className="w-24 h-24 bg-slate-100 rounded-[2.5rem] flex items-center justify-center text-slate-300 border-4 border-white shadow-xl">
               <User size={48} />
            </div>
            <button className="absolute bottom-0 left-0 bg-blue-600 text-white p-2.5 rounded-2xl shadow-xl active:scale-95 transition border-4 border-white">
               <Camera size={18} />
            </button>
         </div>
         <div className="text-center">
            <h2 className="text-lg font-black text-slate-900 leading-tight">{user.legalName || 'مستخدم جديد'}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">{user.emailOrPhone}</p>
         </div>
      </div>

      <div className="p-6 space-y-10">
         {settingsGroups.map((group, i) => (
           <div key={i} className="space-y-4">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">{group.title}</h3>
              <div className="bg-white rounded-[2rem] border border-slate-100 shadow-sm overflow-hidden">
                 {group.items.map((item, j) => (
                   <button key={j} onClick={item.action} className="w-full flex items-center justify-between p-5 border-b last:border-0 hover:bg-slate-50 transition group">
                      <div className="flex items-center gap-4">
                         <div className={`w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center transition-colors group-hover:bg-white shadow-inner ${item.color}`}>
                            {item.icon}
                         </div>
                         <span className="text-xs font-black text-slate-700">{item.label}</span>
                      </div>
                      <div className="flex items-center gap-3">
                         {item.status && <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">{item.status}</span>}
                         <ChevronLeft size={16} className="text-slate-200 group-hover:text-blue-600 transition" />
                      </div>
                   </button>
                 ))}
              </div>
           </div>
         ))}

         <button 
           onClick={onLogout}
           className="w-full py-5 bg-red-50 text-red-600 rounded-[2rem] font-black text-sm active:scale-95 transition flex items-center justify-center gap-3"
         >
            <LogOut size={20} /> تسجيل الخروج
         </button>
      </div>
    </div>
  );
};

export default SettingsScreen;
