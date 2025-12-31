
import React, { useState } from 'react';
import { 
  Bell, MessageSquare, User, Scale, Plus, Sparkles, Gavel, 
  LayoutDashboard, Briefcase, Wallet, Settings, Landmark, 
  ShieldCheck, X, FileText, CheckCircle2, AlertTriangle, 
  Info, Clock, ChevronLeft, ArrowUpRight, CheckSquare, 
  LayoutGrid, Search, MoreVertical, RefreshCw, History, ShieldAlert
} from 'lucide-react';
import { UserProfile, ScreenType, AccountType } from '../types';

interface DashboardProps {
  user: UserProfile;
  onLogout: () => void;
  onNavigate: (screen: ScreenType) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onNavigate }) => {
  const [isBannerVisible, setIsBannerVisible] = useState(user.kycStatus !== 'verified');
  const isCompany = user.accountType === AccountType.COMPANY;

  // Quick Action Cards
  const quickActions = [
    { 
      label: 'عقد جديد', 
      desc: 'أنشئ وأدِر عقودك', 
      icon: <FileText size={28} />, 
      color: 'bg-blue-600', 
      screen: ScreenType.CONTRACT_SELECT_TYPE 
    },
    { 
      label: 'استشر AI', 
      desc: 'احصل على استشارة فورية', 
      icon: <Sparkles size={28} />, 
      color: 'bg-indigo-600', 
      badge: 'مجاني',
      screen: ScreenType.CHAT_AI 
    },
    { 
      label: 'استشر محامي', 
      desc: 'تحدث مع متخصص', 
      icon: <User size={28} />, 
      color: 'bg-emerald-600', 
      badge: 'من 100 ريال',
      screen: ScreenType.REQUEST_HUMAN_CONSULT 
    },
    { 
      label: 'فتح نزاع', 
      desc: 'حل نزاع قانوني', 
      icon: <Gavel size={28} />, 
      color: 'bg-red-600', 
      screen: ScreenType.OPEN_DISPUTE 
    },
  ];

  // Stats Data
  const stats = [
    { label: 'عقد نشط', value: '12', icon: <FileText size={14} />, link: 'العقود', screen: ScreenType.MONITORING },
    { label: 'استشارة', value: '05', icon: <MessageSquare size={14} />, link: 'الكل' },
    { label: 'في الضمان', value: '25K', icon: <Wallet size={14} />, link: 'المحفظة', screen: ScreenType.WALLET },
    { label: 'نزاع مفتوح', value: '01', icon: <Gavel size={14} />, link: 'الإدارة', screen: ScreenType.DISPUTE_MANAGER },
  ];

  // Recent Activity
  const recentActivities = [
    { title: 'تم توقيع عقد إيجار', time: 'منذ ساعتين', status: 'مكتمل', type: 'contract' },
    { title: 'استشارة قانونية ذكية', time: 'منذ ٥ ساعات', status: 'مكتمل', type: 'consult' },
    { title: 'دفعة محجوزة في الضمان', time: 'أمس', status: 'معلق', type: 'payment' },
    { title: 'تم إنشاء مسودة عقد عمل', time: 'أمس', status: 'مسودة', type: 'contract' },
    { title: 'تنبيه نزاع وارد', time: 'منذ يومين', status: 'نشط', type: 'dispute' },
  ];

  // AI Alerts
  const aiAlerts = [
    { id: 1, text: '⚠️ عقد الإيجار ينتهي خلال ٣٠ يوم', action: 'تجديد العقد', type: 'warning' },
    { id: 2, text: '💡 لديك ٣ عقود تحتاج مراجعة', action: 'مراجعة الآن', type: 'info' },
    { id: 3, text: '🔔 موعد دفعة استحقاق بعد ٥ أيام', action: 'عرض التفاصيل', type: 'payment' },
  ];

  // Pending Actions
  const pendingActions = [
    { id: 'pa1', text: 'وقّع على عقد عمل - محمد أحمد', link: 'توقيع' },
    { id: 'pa2', text: 'راجع تعديلات عقد الشراكة التقنية', link: 'مراجعة' },
    { id: 'pa3', text: 'أكمل الدفع لعقد التوريد السنوي', link: 'دفع' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-700 pb-28 overflow-y-auto">
      
      {/* 1. Top Bar */}
      <div className="bg-white p-4 pb-4 flex items-center justify-between sticky top-0 z-40 shadow-sm border-b">
        {/* Left: Logo & User */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Scale size={24} />
          </div>
          <div>
            <h2 className="font-black text-slate-900 text-sm leading-tight">
              {isCompany ? 'شركة الحلول التقنية' : (user.legalName || 'محمد بن عبدالله')}
            </h2>
            <p className="text-[9px] text-blue-600 font-bold uppercase tracking-widest">عضو بلاتيني</p>
          </div>
        </div>

        {/* Right: Actions & Profile */}
        <div className="flex items-center gap-1">
          <button className="p-2.5 text-slate-400 hover:text-blue-600 transition relative">
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
          </button>
          <button className="p-2.5 text-slate-400 hover:text-blue-600 transition">
            <MessageSquare size={20} />
          </button>
          <button onClick={onLogout} className="ml-1 w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center group hover:border-blue-300 transition">
            <User size={18} className="text-slate-400 group-hover:text-blue-600" />
          </button>
        </div>
      </div>

      <div className="p-5 space-y-6">
        
        {/* 2. Verification Banner */}
        {isBannerVisible && (
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-3xl flex items-center justify-between animate-in slide-in-from-top duration-500">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-xs font-black text-amber-900">حسابك غير موثّق</h4>
                <p className="text-[10px] text-amber-700 font-medium">أكمل التحقق لفتح جميع ميزات العقود الذكية</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onNavigate(ScreenType.KYC_VERIFICATION)}
                className="bg-amber-600 text-white px-4 py-2 rounded-xl text-[10px] font-black shadow-lg shadow-amber-200 active:scale-95 transition"
              >
                وثّق الآن
              </button>
              <button onClick={() => setIsBannerVisible(false)} className="p-1 text-amber-300 hover:text-amber-500 transition">
                <X size={18} />
              </button>
            </div>
          </div>
        )}

        {/* 3. Quick Actions Grid */}
        <section className="space-y-4">
          <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">إجراءات سريعة</h3>
          <div className="grid grid-cols-2 gap-4">
            {quickActions.map((action, idx) => (
              <button 
                key={idx}
                onClick={() => onNavigate(action.screen)}
                className="bg-white p-5 rounded-[2.2rem] shadow-sm border border-slate-50 flex flex-col gap-4 hover:shadow-xl hover:border-blue-100 transition-all active:scale-95 text-right group relative overflow-hidden"
              >
                {action.badge && (
                  <span className="absolute top-4 left-4 bg-blue-50 text-blue-600 text-[8px] font-black px-2 py-0.5 rounded-full uppercase">
                    {action.badge}
                  </span>
                )}
                <div className={`${action.color} text-white w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition duration-300`}>
                  {action.icon}
                </div>
                <div>
                  <h4 className="font-black text-slate-900 text-sm leading-tight">{action.label}</h4>
                  <p className="text-[9px] text-slate-400 mt-1 font-medium leading-tight">{action.desc}</p>
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 4. Overview Section - Stats */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-1">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">نظرة عامة على النشاط</h3>
              {/* Fix: Added RefreshCw to imports */}
              <button className="text-[9px] font-black text-blue-600 uppercase flex items-center gap-1 hover:underline">
                 تحديث البيانات <RefreshCw size={10} />
              </button>
           </div>
           <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  onClick={() => stat.screen && onNavigate(stat.screen)}
                  className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-2 hover:border-blue-200 transition cursor-pointer group"
                >
                   <div className="flex items-center justify-between">
                      <div className="w-7 h-7 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                         {stat.icon}
                      </div>
                      <span className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</span>
                   </div>
                   <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{stat.label}</span>
                      <span className="text-[8px] font-black text-blue-500 uppercase hover:underline">{stat.link}</span>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* 5. Recent Activity */}
        <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-5">
           <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                 {/* Fix: Added History to imports to prevent conflict with global History interface */}
                 <History size={18} className="text-blue-600" /> النشاطات الأخيرة
              </h3>
              <button className="text-[9px] font-black text-slate-400 hover:text-blue-600 uppercase tracking-widest">عرض الكل</button>
           </div>
           <div className="space-y-4">
              {recentActivities.map((act, i) => (
                <div key={i} className="flex items-center justify-between group cursor-pointer">
                   <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        act.type === 'contract' ? 'bg-blue-50 text-blue-600' :
                        act.type === 'consult' ? 'bg-indigo-50 text-indigo-600' :
                        act.type === 'payment' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                      }`}>
                         {act.type === 'contract' ? <FileText size={18} /> :
                          act.type === 'consult' ? <MessageSquare size={18} /> :
                          /* Fix: Added ShieldAlert to imports */
                          act.type === 'payment' ? <Wallet size={18} /> : <ShieldAlert size={18} />}
                      </div>
                      <div>
                         <h5 className="text-[11px] font-black text-slate-800 leading-tight">{act.title}</h5>
                         <p className="text-[9px] text-slate-400 font-bold flex items-center gap-1 mt-0.5">
                            <Clock size={8} /> {act.time}
                         </p>
                      </div>
                   </div>
                   <div className="flex flex-col items-end gap-1">
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${
                        act.status === 'مكتمل' ? 'bg-emerald-50 text-emerald-600' :
                        act.status === 'معلق' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                         {act.status}
                      </span>
                      <ChevronLeft size={14} className="text-slate-200 group-hover:text-blue-600 transition-transform group-hover:-translate-x-1" />
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* 6. AI Alerts */}
        <section className="space-y-3">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
              <Sparkles size={14} className="text-amber-500" /> تنبيهات المساعد الذكي
           </h3>
           <div className="space-y-3">
              {aiAlerts.map(alert => (
                <div key={alert.id} className="bg-white p-5 rounded-3xl border-2 border-transparent hover:border-blue-100 transition-all shadow-sm flex flex-col gap-4 relative overflow-hidden group">
                   <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                        alert.type === 'warning' ? 'bg-red-50 text-red-500' :
                        alert.type === 'payment' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                         {alert.type === 'warning' ? <AlertTriangle size={20} /> : <Info size={20} />}
                      </div>
                      <div className="flex-1">
                         <p className="text-xs font-black text-slate-800 leading-relaxed">{alert.text}</p>
                         <button className="mt-3 bg-slate-900 text-white px-5 py-2 rounded-xl text-[9px] font-black uppercase shadow-lg active:scale-95 transition-all">
                            {alert.action}
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* 7. Pending Actions */}
        <section className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
           <div className="flex items-center justify-between mb-6 relative z-10">
              <div className="flex items-center gap-3">
                 <CheckSquare className="text-blue-400" size={24} />
                 <h3 className="font-black text-sm uppercase tracking-widest">إجراءات معلقة</h3>
              </div>
              <span className="text-[10px] font-black bg-white/10 px-3 py-1 rounded-full uppercase">٣ مهام</span>
           </div>
           
           <div className="space-y-3 relative z-10">
              {pendingActions.map((pa) => (
                <div key={pa.id} className="flex items-center justify-between p-4 bg-white/5 border border-white/5 rounded-2xl group hover:bg-white/10 transition cursor-pointer">
                   <div className="flex items-center gap-3">
                      <div className="w-5 h-5 rounded border border-white/20 flex items-center justify-center group-hover:border-blue-400 transition">
                         <div className="w-2 h-2 rounded-sm bg-blue-400 opacity-0 group-hover:opacity-100 transition" />
                      </div>
                      <span className="text-xs font-bold text-slate-200">{pa.text}</span>
                   </div>
                   <span className="text-[9px] font-black text-blue-400 uppercase tracking-widest underline underline-offset-4">{pa.link}</span>
                </div>
              ))}
           </div>
        </section>
      </div>

      {/* 8. Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md border-t border-slate-100 px-8 py-4 flex items-center justify-between z-50">
        <button 
          onClick={() => onNavigate(ScreenType.DASHBOARD)} 
          className="flex flex-col items-center gap-1 text-blue-600 font-black"
        >
          <LayoutDashboard size={22} />
          <span className="text-[8px] uppercase tracking-widest">الرئيسية</span>
        </button>
        <button 
          onClick={() => onNavigate(ScreenType.MONITORING)}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition"
        >
          <Briefcase size={22} />
          <span className="text-[8px] uppercase tracking-widest">{isCompany ? 'الحوكمة' : 'عقودي'}</span>
        </button>
        <button 
          onClick={() => onNavigate(ScreenType.WALLET)}
          className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition"
        >
          <Wallet size={22} />
          <span className="text-[8px] uppercase tracking-widest">المالية</span>
        </button>
        <button className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition">
          <Settings size={22} />
          <span className="text-[8px] uppercase tracking-widest">الإعدادات</span>
        </button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
      `}</style>
    </div>
  );
};

export default Dashboard;
