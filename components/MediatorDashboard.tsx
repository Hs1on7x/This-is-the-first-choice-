
import React, { useState } from 'react';
import { 
  ArrowRight, Gavel, Scale, History, Clock, 
  MessageSquare, User, ShieldCheck, ChevronLeft,
  Filter, Search, LayoutGrid, List, AlertTriangle, 
  Target, Globe, ExternalLink, Bot, Bell, LogOut
} from 'lucide-react';
import { UserProfile, ScreenType, DisputeCase } from '../types';

interface MediatorDashboardProps {
  mediator: UserProfile;
  onLogout: () => void;
  onNavigate: (screen: ScreenType, data?: any) => void;
}

const MediatorDashboard: React.FC<MediatorDashboardProps> = ({ mediator, onLogout, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'assigned' | 'active' | 'closed'>('assigned');

  const disputes: DisputeCase[] = [
    { 
      id: 'DISP-101', title: 'خلاف عقد توريد - شركة الرؤية', claimantName: 'محمد أحمد', defendantName: 'شركة الرؤية',
      status: 'mediator_assigned', successProbability: 65, lastUpdate: 'منذ ساعتين', nextStep: 'جلسة الاستماع الأولى',
      // Added missing type and evidence
      type: 'commercial', evidence: []
    },
    { 
      id: 'DISP-102', title: 'نزاع إيجاري - عقارات العاصمة', claimantName: 'سارة العبدالله', defendantName: 'مكتب عقارات',
      status: 'court', successProbability: 40, lastUpdate: 'يوم أمس', nextStep: 'مراجعة الأدلة النهائية',
      // Added missing type and evidence
      type: 'realestate', evidence: []
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-700 pb-28 overflow-y-auto">
      {/* Header */}
      <div className="bg-white p-4 border-b sticky top-0 z-40 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg">
            <Gavel size={24} />
          </div>
          <div>
            <h2 className="font-black text-slate-900 text-sm leading-tight">الوسيط: {mediator.legalName}</h2>
            <p className="text-[9px] text-blue-600 font-bold uppercase tracking-widest">محكم معتمد • مركز الصلح</p>
          </div>
        </div>
        <div className="flex items-center gap-1">
          <button className="p-2.5 text-slate-400 hover:text-slate-900 relative"><Bell size={20} /><span className="absolute top-3 right-3 w-2 h-2 bg-red-500 rounded-full border-2 border-white" /></button>
          <button onClick={onLogout} className="p-2.5 text-slate-400 hover:text-red-600 transition"><LogOut size={20} /></button>
        </div>
      </div>

      <div className="p-5 space-y-8">
        {/* Mediator Performance Stats */}
        <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-2xl animate-pulse" />
           <div className="relative z-10 flex items-center justify-between border-b border-white/10 pb-6 mb-6">
              <div>
                 <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-1">نسبة التسوية الودية</h3>
                 <p className="text-4xl font-black">٨٢٪</p>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center backdrop-blur-xl border border-white/5 shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                 <ShieldCheck size={36} className="text-blue-400" />
              </div>
           </div>
           <div className="grid grid-cols-2 gap-8 relative z-10">
              <div className="space-y-1">
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">نزاعات قيد الحل</p>
                 <p className="text-sm font-bold">١٤ قضية</p>
              </div>
              <div className="space-y-1 text-left">
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">متوسط وقت الحسم</p>
                 <p className="text-sm font-bold text-blue-400">٤ أيام</p>
              </div>
           </div>
        </section>

        {/* Assigned Disputes List */}
        <section className="space-y-4">
           <div className="flex p-1 bg-white rounded-2xl shadow-sm border border-slate-100">
              {['assigned', 'active', 'closed'].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab as any)}
                  className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === tab ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400'}`}
                >
                  {tab === 'assigned' ? 'موكلة حديثاً' : tab === 'active' ? 'قيد المعالجة' : 'قرارات صادرة'}
                </button>
              ))}
           </div>

           <div className="space-y-4 min-h-[300px]">
              {disputes.map(dispute => (
                <div 
                  key={dispute.id} 
                  className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-5 hover:border-slate-300 transition-all cursor-pointer group"
                  onClick={() => onNavigate(ScreenType.MEDIATOR_RESOLUTION_ROOM, dispute)}
                >
                   <div className="flex items-start justify-between">
                      <div className="flex items-center gap-4">
                         <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-slate-900 group-hover:text-white transition-all shadow-inner"><Gavel size={24} /></div>
                         <div>
                            <h4 className="font-black text-slate-900 text-sm leading-tight truncate max-w-[150px]">{dispute.title}</h4>
                            <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase tracking-widest">ID: {dispute.id} • {dispute.lastUpdate}</p>
                         </div>
                      </div>
                      <span className="text-[8px] font-black bg-blue-50 text-blue-600 px-3 py-1 rounded-full uppercase tracking-tighter">قضية جديدة</span>
                   </div>
                   
                   <div className="grid grid-cols-2 gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                      <div>
                         <p className="text-[8px] font-black text-slate-400 uppercase mb-1">المدعي</p>
                         <p className="text-[10px] font-black text-slate-800">{dispute.claimantName}</p>
                      </div>
                      <div className="text-left border-r border-slate-200 pr-3">
                         <p className="text-[8px] font-black text-slate-400 uppercase mb-1">المدعى عليه</p>
                         <p className="text-[10px] font-black text-slate-800">{dispute.defendantName}</p>
                      </div>
                   </div>

                   <div className="flex items-center justify-between pt-1">
                      <div className="flex items-center gap-2">
                         <Target size={14} className="text-amber-500" />
                         <span className="text-[9px] font-black text-slate-500 uppercase">الخطوة القادمة: {dispute.nextStep}</span>
                      </div>
                      <button className="flex items-center gap-1 text-[10px] font-black text-slate-900 group-hover:translate-x-[-4px] transition-transform">
                         بدء الجلسة <ChevronLeft size={14} className="text-blue-600" />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* AI Settlement Predictions Callout */}
        <div className="bg-blue-600 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse" />
           <div className="flex gap-4 relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-[1.2rem] flex items-center justify-center backdrop-blur-md border border-white/10 shadow-2xl group-hover:rotate-12 transition-transform duration-500 shrink-0">
                 <Bot size={32} className="text-blue-100" />
              </div>
              <div className="space-y-4">
                 <div className="space-y-1">
                    <h4 className="text-sm font-black uppercase tracking-tight">تحليل الاتجاهات الذكي</h4>
                    <p className="text-[11px] text-blue-100 leading-relaxed font-medium">سأقوم بمساعدتك في رصد البنود التي يسهل التنازل عنها وتقريب وجهات النظر بناءً على سوابق الصلح.</p>
                 </div>
                 <button className="bg-white text-blue-600 px-8 py-3 rounded-xl text-[10px] font-black shadow-xl active:scale-95 transition-all">تفعيل مساعد الوساطة</button>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MediatorDashboard;
