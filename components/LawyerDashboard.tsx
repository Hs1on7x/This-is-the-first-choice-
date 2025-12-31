
import React, { useState } from 'react';
import { 
  Bell, MessageSquare, User, Scale, Sparkles, Gavel, 
  Wallet, Clock, CheckCircle2, ChevronLeft, Plus, 
  Star, Calendar, TrendingUp, Filter, Users, Search, 
  History, Info, LogOut
} from 'lucide-react';
import { UserProfile, ScreenType, ConsultationSession } from '../types';

interface LawyerDashboardProps {
  lawyer: UserProfile;
  onLogout: () => void;
  onNavigate: (screen: ScreenType, data?: any) => void;
}

const LawyerDashboard: React.FC<LawyerDashboardProps> = ({ lawyer, onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'pending' | 'active' | 'completed'>('pending');

  const pendingRequests: ConsultationSession[] = [
    { id: 'req-1', type: 'text', specialty: 'قانون العمل', status: 'requesting', userName: 'أحمد السعيد', price: 150 },
    { id: 'req-2', type: 'video', specialty: 'القانون التجاري', status: 'requesting', userName: 'شركة الحلول', price: 250 },
  ];

  const activeSessions: ConsultationSession[] = [
    { id: 'sess-1', type: 'audio', specialty: 'العقارات', status: 'live', userName: 'نوره العتيبي', lawyerName: lawyer.legalName }
  ];

  const stats = [
    { label: 'استشارات اليوم', value: '05', icon: <Calendar size={14} />, color: 'text-blue-600' },
    { label: 'التقييم العام', value: '4.9', icon: <Star size={14} />, color: 'text-amber-500' },
    { label: 'أرباح الشهر', value: '12K', icon: <TrendingUp size={14} />, color: 'text-emerald-600' },
    { label: 'إجمالي العملاء', value: '128', icon: <Users size={14} />, color: 'text-indigo-600' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-700 pb-28 overflow-y-auto">
      {/* Header */}
      <div className="bg-white p-4 flex items-center justify-between sticky top-0 z-40 shadow-sm border-b">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Scale size={24} />
          </div>
          <div>
            <h2 className="font-black text-slate-900 text-sm leading-tight">{lawyer.legalName}</h2>
            <p className="text-[9px] text-indigo-600 font-bold uppercase tracking-widest">محامي ممارس • متصل</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2.5 text-slate-400 hover:text-indigo-600 relative"><Bell size={20} /><span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white" /></button>
          <button onClick={onLogout} className="p-2.5 text-slate-400 hover:text-red-600 transition"><LogOut size={20} /></button>
        </div>
      </div>

      <div className="p-5 space-y-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
           {stats.map((s, i) => (
             <div key={i} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
                <div className="flex items-center justify-between">
                   <div className={`w-8 h-8 bg-slate-50 ${s.color} rounded-lg flex items-center justify-center`}>{s.icon}</div>
                   <span className="text-xl font-black text-slate-900">{s.value}</span>
                </div>
                <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">{s.label}</p>
             </div>
           ))}
        </div>

        {/* Availability Switch */}
        <section className="bg-indigo-600 p-6 rounded-[2.5rem] text-white flex items-center justify-between shadow-xl shadow-indigo-100">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md"><Clock size={24} /></div>
              <div>
                 <h4 className="text-sm font-black uppercase">وضعية التوفر</h4>
                 <p className="text-[10px] text-indigo-100">استقبال طلبات الاستشارة الفورية</p>
              </div>
           </div>
           <div className="w-14 h-7 bg-white/20 rounded-full relative p-1 cursor-pointer">
              <div className="w-5 h-5 bg-white rounded-full shadow-lg ml-auto" />
           </div>
        </section>

        {/* Requests Management */}
        <section className="space-y-4">
           <div className="flex p-1 bg-white rounded-2xl shadow-sm border border-slate-100">
              {['pending', 'active', 'completed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === tab ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-400'}`}
                >
                  {tab === 'pending' ? 'طلبات جديدة' : tab === 'active' ? 'جلسات نشطة' : 'الأرشيف'}
                </button>
              ))}
           </div>

           <div className="space-y-4 min-h-[300px]">
              {activeTab === 'pending' && pendingRequests.map(req => (
                <div key={req.id} className="bg-white p-6 rounded-[2.2rem] border border-slate-100 shadow-sm space-y-4 animate-in slide-in-from-bottom">
                   <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center"><User size={24} /></div>
                         <div>
                            <h4 className="font-black text-slate-900 text-sm">{req.userName}</h4>
                            <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">{req.specialty}</p>
                         </div>
                      </div>
                      <div className="text-left">
                         <p className="text-sm font-black text-slate-900">{req.price} ريال</p>
                         <p className="text-[8px] font-black text-slate-300 uppercase">استشارة {req.type === 'text' ? 'نصية' : 'فيديو'}</p>
                      </div>
                   </div>
                   <div className="flex gap-3 pt-2">
                      <button 
                        onClick={() => onNavigate(ScreenType.LAWYER_CONSULT_ROOM, req)}
                        className="flex-[2] py-4 bg-indigo-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-indigo-100 active:scale-95 transition"
                      >
                         قبول وبدء الجلسة
                      </button>
                      <button className="flex-1 py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-xs hover:bg-red-50 hover:text-red-500 transition">رفض</button>
                   </div>
                </div>
              ))}

              {activeTab === 'active' && activeSessions.map(sess => (
                <div key={sess.id} className="bg-indigo-50 border-2 border-indigo-100 p-6 rounded-[2.2rem] flex items-center justify-between group cursor-pointer active:scale-98 transition-all" onClick={() => onNavigate(ScreenType.LAWYER_CONSULT_ROOM, sess)}>
                   <div className="flex items-center gap-4">
                      <div className="relative">
                         <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-indigo-600 shadow-sm border border-indigo-100"><User size={28} /></div>
                         <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white animate-pulse" />
                      </div>
                      <div>
                         <h4 className="font-black text-slate-900 text-sm">{sess.userName}</h4>
                         <p className="text-[9px] font-black text-indigo-600 uppercase tracking-widest">مكالمة {sess.type === 'audio' ? 'صوتية' : 'فيديو'} جارية</p>
                      </div>
                   </div>
                   <ChevronLeft className="text-indigo-300 group-hover:text-indigo-600 group-hover:-translate-x-1 transition-all" />
                </div>
              ))}
           </div>
        </section>

        {/* Calendar Preview */}
        <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
           <div className="flex items-center justify-between">
              <h3 className="font-black text-slate-900 text-sm">مواعيد الغد</h3>
              <button onClick={() => onNavigate(ScreenType.LAWYER_SCHEDULE)} className="text-[9px] font-black text-indigo-600 uppercase hover:underline">إدارة الجدول</button>
           </div>
           <div className="space-y-3">
              {[
                { time: '09:00 ص', title: 'جلسة مراجعة عقد توريد', client: 'شركة الأفق' },
                { time: '11:30 ص', title: 'استشارة أحوال شخصية', client: 'سارة خالد' }
              ].map((apt, i) => (
                <div key={i} className="flex gap-4 p-4 bg-slate-50 rounded-2xl group hover:bg-indigo-50 transition">
                   <div className="text-[10px] font-black text-slate-400 whitespace-nowrap group-hover:text-indigo-600 transition">{apt.time}</div>
                   <div className="space-y-0.5">
                      <p className="text-xs font-black text-slate-800">{apt.title}</p>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">{apt.client}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>

      {/* Bottom Navbar for Lawyer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 backdrop-blur-md border-t border-slate-100 px-6 py-4 flex items-center justify-between z-50 shadow-2xl">
        <button onClick={() => onNavigate(ScreenType.LAWYER_DASHBOARD)} className="flex flex-col items-center gap-1 text-indigo-600 font-black">
          <Scale size={22} /><span className="text-[8px] uppercase tracking-widest">الرئيسية</span>
        </button>
        <button onClick={() => onNavigate(ScreenType.LAWYER_SCHEDULE)} className="flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-600">
          <Calendar size={22} /><span className="text-[8px] uppercase tracking-widest">الجدول</span>
        </button>
        <button onClick={() => onNavigate(ScreenType.LAWYER_WALLET)} className="flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-600">
          <Wallet size={22} /><span className="text-[8px] uppercase tracking-widest">المحفظة</span>
        </button>
        <button onClick={() => onNavigate(ScreenType.SETTINGS)} className="flex flex-col items-center gap-1 text-slate-400 hover:text-indigo-600">
          <User size={22} /><span className="text-[8px] uppercase tracking-widest">الملف</span>
        </button>
      </div>
    </div>
  );
};

export default LawyerDashboard;
