
import React, { useState } from 'react';
import { 
  Bell, MessageSquare, User, Scale, Sparkles, Gavel, 
  Wallet, ShieldCheck, X, FileText, CheckCircle2, AlertTriangle, 
  Info, Clock, ChevronLeft, CheckSquare, RefreshCw, History, ShieldAlert,
  ChevronDown, LogOut, Settings, HelpCircle
} from 'lucide-react';
import { UserProfile, ScreenType, AccountType } from '../types';

interface DashboardProps {
  user: UserProfile;
  onLogout: () => void;
  onNavigate: (screen: ScreenType, data?: any) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ user, onLogout, onNavigate }) => {
  const [isBannerVisible, setIsBannerVisible] = useState(user.kycStatus !== 'verified');
  const [showProfileMenu, setShowProfileMenu] = useState(false);
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
      label: 'النزاعات', 
      desc: 'حل نزاع قانوني', 
      icon: <Gavel size={28} />, 
      color: 'bg-red-600', 
      screen: ScreenType.DISPUTE_MANAGER 
    },
  ];

  // Stats Data
  const stats = [
    { label: 'عقد نشط', value: '12', icon: <FileText size={14} />, link: 'عرض الكل', screen: ScreenType.MONITORING },
    { label: 'الاستشارات', value: '08', icon: <MessageSquare size={14} />, link: 'عرض الكل', screen: ScreenType.CHAT_AI },
    { label: 'في الضمان', value: '25K', icon: <Wallet size={14} />, link: 'المحفظة', screen: ScreenType.WALLET },
    { label: 'نزاع مفتوح', value: '01', icon: <Gavel size={14} />, link: 'إدارة النزاعات', screen: ScreenType.DISPUTE_MANAGER },
  ];

  // Recent Activity
  const recentActivities = [
    { title: 'تم توقيع عقد إيجار', time: 'منذ ساعتين', status: 'مكتمل', type: 'contract', screen: ScreenType.CONTRACT_STATUS },
    { title: 'استشارة مكتملة', time: 'منذ ٥ ساعات', status: 'مكتمل', type: 'consult', screen: ScreenType.CHAT_AI },
    { title: 'دفعة جديدة في الضمان', time: 'أمس', status: 'معلق', type: 'payment', screen: ScreenType.ESCROW_MANAGEMENT },
    { title: 'عقد في انتظار التوقيع', time: 'أمس', status: 'بانتظار التوقيع', type: 'contract', screen: ScreenType.CONTRACT_FINAL_REVIEW },
    { title: 'إشعار نزاع جديد', time: 'منذ يومين', status: 'نشط', type: 'dispute', screen: ScreenType.DISPUTE_RESOLUTION_DECISION },
  ];

  // AI Alerts
  const aiAlerts = [
    { id: 1, text: '⚠️ عقد الإيجار ينتهي خلال ٣٠ يوم', action: 'تجديد العقد', type: 'warning', screen: ScreenType.CONTRACT_STATUS },
    { id: 2, text: '💡 لديك ٣ عقود تحتاج مراجعة', action: 'مراجعة', type: 'info', screen: ScreenType.MONITORING },
    { id: 3, text: '🔔 موعد دفعة بعد ٥ أيام', action: 'عرض التفاصيل', type: 'payment', screen: ScreenType.PAYMENT_DETAILS },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-700 pb-28 overflow-y-auto">
      
      {/* 1. Top Bar */}
      <div className="bg-white p-4 flex items-center justify-between sticky top-0 z-40 shadow-sm border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Scale size={24} />
          </div>
          <div>
            <h2 className="font-black text-slate-900 text-sm leading-tight">
              {isCompany ? 'شركة الحلول التقنية' : (user.legalName || 'محمد بن عبدالله')}
            </h2>
            <p className="text-[9px] text-blue-600 font-bold uppercase tracking-widest">مستخدم موثق</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button 
            onClick={() => onNavigate(ScreenType.NOTIFICATIONS)}
            className="p-2.5 text-slate-400 hover:text-blue-600 transition relative"
          >
            <Bell size={20} />
            <span className="absolute top-2.5 right-2.5 w-4 h-4 bg-red-500 text-white text-[8px] font-black rounded-full border-2 border-white flex items-center justify-center">٣</span>
          </button>
          
          <div className="relative">
            <button 
              onClick={() => setShowProfileMenu(!showProfileMenu)}
              className="ml-1 w-9 h-9 rounded-full bg-slate-100 border border-slate-200 overflow-hidden flex items-center justify-center group hover:border-blue-300 transition"
            >
              <User size={18} className="text-slate-400 group-hover:text-blue-600" />
            </button>
            
            {showProfileMenu && (
              <div className="absolute left-0 mt-2 w-48 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in duration-200">
                <div className="p-3 border-b border-slate-50 mb-1">
                  <p className="text-xs font-black text-slate-900">{user.legalName || 'محمد بن عبدالله'}</p>
                  <p className="text-[9px] text-slate-400 truncate">{user.emailOrPhone}</p>
                </div>
                <button 
                  onClick={() => { onNavigate(ScreenType.SETTINGS); setShowProfileMenu(false); }}
                  className="w-full text-right px-3 py-2 hover:bg-slate-50 rounded-lg text-[10px] font-bold text-slate-600 flex items-center gap-2"
                >
                  <Settings size={14} /> الإعدادات
                </button>
                <button 
                  onClick={() => { onNavigate(ScreenType.HELP_SUPPORT); setShowProfileMenu(false); }}
                  className="w-full text-right px-3 py-2 hover:bg-slate-50 rounded-lg text-[10px] font-bold text-slate-600 flex items-center gap-2"
                >
                  <HelpCircle size={14} /> المساعدة
                </button>
                <button onClick={onLogout} className="w-full text-right px-3 py-2 hover:bg-red-50 rounded-lg text-[10px] font-bold text-red-600 flex items-center gap-2 mt-1">
                  <LogOut size={14} /> تسجيل الخروج
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="p-5 space-y-6">
        
        {/* 2. Verification Banner */}
        {isBannerVisible && (
          <div className="bg-amber-50 border border-amber-100 p-4 rounded-3xl flex items-center justify-between animate-in slide-in-from-top duration-500 shadow-sm">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center shrink-0">
                <ShieldCheck size={20} />
              </div>
              <div>
                <h4 className="text-xs font-black text-amber-900">حسابك غير موثّق</h4>
                <p className="text-[10px] text-amber-700 font-medium">أكمل التحقق لفتح جميع الميزات</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={() => onNavigate(ScreenType.KYC_VERIFICATION)}
                className="bg-amber-600 text-white px-4 py-2 rounded-xl text-[10px] font-black shadow-lg active:scale-95 transition"
              >
                أكمل الآن
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
                <div className="flex items-center text-blue-600 text-[9px] font-black gap-1 group-hover:gap-2 transition-all">
                  ابدأ الآن <ChevronLeft size={10} />
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* 4. Stats Overview */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">نظرة عامة</h3>
           <div className="grid grid-cols-2 gap-3">
              {stats.map((stat, i) => (
                <button 
                  key={i} 
                  onClick={() => onNavigate(stat.screen)}
                  className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex flex-col gap-2 hover:border-blue-200 transition text-right group active:scale-[0.98]"
                >
                   <div className="flex items-center justify-between">
                      <div className="w-7 h-7 bg-slate-50 text-slate-400 rounded-lg flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                         {stat.icon}
                      </div>
                      <span className="text-2xl font-black text-slate-900 tracking-tighter">{stat.value}</span>
                   </div>
                   <div className="flex items-center justify-between">
                      <span className="text-[10px] font-bold text-slate-400 uppercase">{stat.label}</span>
                      <span className="text-[8px] font-black text-blue-500 uppercase hover:underline">
                        {stat.link}
                      </span>
                   </div>
                </button>
              ))}
           </div>
        </section>

        {/* 5. Recent Activity */}
        <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-5">
           <div className="flex items-center justify-between border-b border-slate-50 pb-3">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                 <History size={18} className="text-blue-600" /> النشاطات الأخيرة
              </h3>
           </div>
           <div className="space-y-4">
              {recentActivities.map((act, i) => (
                <div 
                  key={i} 
                  onClick={() => onNavigate(act.screen)}
                  className="flex items-center justify-between group cursor-pointer hover:bg-slate-50 p-2 -m-2 rounded-xl transition"
                >
                   <div className="flex items-center gap-3">
                      <div className={`w-9 h-9 rounded-xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        act.type === 'contract' ? 'bg-blue-50 text-blue-600' :
                        act.type === 'consult' ? 'bg-indigo-50 text-indigo-600' :
                        act.type === 'payment' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                      }`}>
                         {act.type === 'contract' ? <FileText size={18} /> :
                          act.type === 'consult' ? <CheckCircle2 size={18} /> :
                          act.type === 'payment' ? <Wallet size={18} /> : <ShieldAlert size={18} />}
                      </div>
                      <div>
                         <h5 className="text-[11px] font-black text-slate-800 leading-tight">{act.title}</h5>
                         <p className="text-[9px] text-slate-400 font-bold flex items-center gap-1 mt-0.5">
                            <Clock size={10} /> {act.time}
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
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* 6. AI Alerts */}
        <section className="space-y-3">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
              <Sparkles size={14} className="text-amber-500" /> تنبيهات ذكية
           </h3>
           <div className="space-y-3">
              {aiAlerts.map(alert => (
                <div 
                  key={alert.id} 
                  onClick={() => onNavigate(alert.screen)}
                  className="bg-white p-5 rounded-3xl border-2 border-transparent hover:border-blue-100 transition-all shadow-sm flex flex-col gap-4 relative overflow-hidden group cursor-pointer"
                >
                   <div className="flex items-start gap-4">
                      <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${
                        alert.type === 'warning' ? 'bg-red-50 text-red-500' :
                        alert.type === 'payment' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                      }`}>
                         {alert.type === 'warning' ? <AlertTriangle size={20} /> : <Info size={20} />}
                      </div>
                      <div className="flex-1">
                         <p className="text-xs font-black text-slate-800 leading-relaxed">{alert.text}</p>
                         <button 
                            onClick={(e) => { e.stopPropagation(); onNavigate(alert.screen); }}
                            className="mt-3 bg-slate-900 text-white px-5 py-2 rounded-xl text-[9px] font-black uppercase shadow-lg active:scale-95 transition-all"
                         >
                            {alert.action}
                         </button>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md border-t border-slate-100 px-6 py-4 flex items-center justify-between z-50 shadow-2xl">
        <button onClick={() => onNavigate(ScreenType.DASHBOARD)} className="flex flex-col items-center gap-1 text-blue-600 font-black">
          <Scale size={22} /><span className="text-[8px] uppercase tracking-widest">الرئيسية</span>
        </button>
        <button onClick={() => onNavigate(ScreenType.MONITORING)} className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition">
          <FileText size={22} /><span className="text-[8px] uppercase tracking-widest">العقود</span>
        </button>
        <button onClick={() => onNavigate(ScreenType.CHAT_AI)} className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition">
          <MessageSquare size={22} /><span className="text-[8px] uppercase tracking-widest">الاستشارات</span>
        </button>
        <button onClick={() => onNavigate(ScreenType.WALLET)} className="flex flex-col items-center gap-1 text-slate-400 hover:text-blue-600 transition">
          <Wallet size={22} /><span className="text-[8px] uppercase tracking-widest">المحفظة</span>
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
