
import React, { useState } from 'react';
import { 
  ArrowRight, FileText, Download, Printer, Share2, 
  MessageSquare, Gavel, ShieldCheck, Clock, CheckCircle2, 
  ChevronLeft, ExternalLink, Paperclip, CreditCard, 
  History, Info, Bell, MoreVertical, Link as LinkIcon, Lock,
  Check, X, Sparkles, Star, AlertTriangle, Target
} from 'lucide-react';
import { ScreenType } from '../types';

interface ContractStatusDashboardProps {
  onBack: () => void;
  onOpenDispute: () => void;
  onNavigate?: (screen: ScreenType, data?: any) => void;
}

const ContractStatusDashboard: React.FC<ContractStatusDashboardProps> = ({ onBack, onOpenDispute, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'docs' | 'finance' | 'signatures' | 'activity'>('finance');

  const contractInfo = {
    name: "عقد خدمات - تطوير موقع",
    id: "#2024-001234",
    status: "Active",
    statusAr: "نشط وقيد التنفيذ",
    statusColor: "bg-emerald-500",
    type: "عقد تقديم خدمات",
    date: "2024-12-30",
    duration: "3 أشهر",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    totalValue: 57500
  };

  const installments = [
    { id: '1', label: 'الدفعة الأولى: عند البدء', amount: 20000, status: 'paid', date: '١٥ يناير', escrow: true },
    { id: '2', label: 'الدفعة الثانية: إتمام ٥٠٪', amount: 15000, status: 'due_now', date: '١٥ فبراير', escrow: true },
    { id: '3', label: 'الدفعة الثالثة: التسليم', amount: 15000, status: 'pending', date: 'عند الإغلاق', escrow: true }
  ];

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: contractInfo.name,
          text: `راجع حالة العقد رقم ${contractInfo.id} عبر منصة واثق.`,
          url: window.location.href,
        });
      } catch (err) { console.log(err); }
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-500 overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-30 shadow-sm border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
              <ArrowRight className="text-slate-700" />
            </button>
            <div>
              <h1 className="text-sm font-black text-slate-900 leading-tight">{contractInfo.name}</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">رقم العقد: {contractInfo.id}</p>
            </div>
          </div>
          <button className="p-2 text-slate-400"><MoreVertical size={20} /></button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Large Status Badge */}
        <div className="flex flex-col items-center gap-4">
          <div className={`${contractInfo.statusColor} text-white px-10 py-4 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-100 animate-pulse text-center`}>
             {contractInfo.statusAr}
          </div>
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
             <ShieldCheck size={14} />
             <span className="text-[10px] font-black uppercase">عقد موثق قانونياً</span>
          </div>
        </div>

        {/* Tabs Bar */}
        <section className="space-y-4">
           <div className="flex gap-1 bg-white p-1 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto no-scrollbar scrollbar-hide">
              {[
                { id: 'info', label: 'معلومات' },
                { id: 'finance', label: 'المالية' },
                { id: 'docs', label: 'مستندات' },
                { id: 'signatures', label: 'توقيعات' },
                { id: 'activity', label: 'نشاطات' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`flex-1 px-4 py-3 rounded-xl text-[9px] font-black uppercase transition-all whitespace-nowrap ${activeTab === t.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400'}`}
                >
                  {t.label}
                </button>
              ))}
           </div>

           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 animate-in slide-in-from-bottom duration-300">
              {activeTab === 'info' && (
                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                         <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">نوع العقد</span>
                         <p className="text-xs font-bold text-slate-900">{contractInfo.type}</p>
                      </div>
                      <div className="space-y-1">
                         <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">تاريخ التوثيق</span>
                         <p className="text-xs font-bold text-slate-900">{contractInfo.date}</p>
                      </div>
                      <div className="space-y-1">
                         <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">البداية</span>
                         <p className="text-xs font-bold text-slate-900">{contractInfo.startDate}</p>
                      </div>
                      <div className="space-y-1">
                         <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">الانتهاء</span>
                         <p className="text-xs font-bold text-slate-900">{contractInfo.endDate}</p>
                      </div>
                   </div>
                   <div className="pt-4 border-t border-slate-50 space-y-4">
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">الأطراف المتعاقدة</span>
                      <div className="space-y-3">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-[10px] font-black">أ س</div>
                            <p className="text-xs font-bold text-slate-900">أحمد السعيد (أنت)</p>
                         </div>
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-[10px] font-black">ش ن</div>
                            <p className="text-xs font-bold text-slate-900">شركة النجاح للتقنية</p>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'finance' && (
                <div className="space-y-8 animate-in fade-in duration-500">
                   <div className="flex items-center justify-between border-b border-slate-50 pb-4">
                      <div className="flex items-center gap-3">
                         <CreditCard className="text-blue-600" size={18} />
                         <h3 className="font-black text-slate-900 text-sm">حالة المدفوعات</h3>
                      </div>
                      <button onClick={() => onNavigate?.(ScreenType.CONTRACT_TRANSACTIONS)} className="text-[9px] font-black text-blue-600 uppercase hover:underline">السجل المالي</button>
                   </div>

                   <div className="space-y-8 relative pr-4">
                      <div className="absolute top-2 bottom-2 right-1.5 w-0.5 bg-slate-100" />
                      {installments.map((inst) => (
                        <div key={inst.id} className="relative pr-8">
                           <div className={`absolute right-[-2.25rem] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm z-10 ${
                             inst.status === 'paid' ? 'bg-emerald-500' : inst.status === 'due_now' ? 'bg-blue-600 animate-pulse' : 'bg-slate-200'
                           }`} />
                           <div className={`p-5 rounded-3xl border transition-all ${
                             inst.status === 'due_now' ? 'bg-white border-blue-600 shadow-xl shadow-blue-50' : 'bg-slate-50 border-transparent opacity-80'
                           }`}>
                              <div className="flex justify-between items-center mb-2">
                                 <h4 className="text-xs font-black text-slate-800">{inst.label}</h4>
                                 <span className="text-[10px] font-black text-blue-600">{inst.amount.toLocaleString()} ريال</span>
                              </div>
                              <div className="flex justify-between items-center">
                                 <span className="text-[9px] font-bold text-slate-400">{inst.status === 'paid' ? 'مدفوعة' : `موعد: ${inst.date}`}</span>
                                 {inst.status === 'due_now' && (
                                   <button 
                                     onClick={() => onNavigate?.(ScreenType.PAYMENT_DETAILS, inst)}
                                     className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-black uppercase shadow-lg shadow-blue-100"
                                   >
                                     ادفع الآن
                                   </button>
                                 )}
                                 {inst.status === 'paid' && inst.escrow && (
                                   <button 
                                     onClick={() => onNavigate?.(ScreenType.ESCROW_DETAILS)}
                                     className="text-blue-600 text-[10px] font-black underline"
                                   >
                                     إدارة الضمان
                                   </button>
                                 )}
                              </div>
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {activeTab === 'docs' && (
                <div className="space-y-4">
                   <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
                      <div className="flex items-center gap-3">
                         <FileText size={20} className="text-blue-600" />
                         <div>
                            <p className="text-xs font-black text-slate-900">contract_signed.pdf</p>
                            <p className="text-[8px] font-bold text-slate-400 uppercase">العقد الموقع رقمياً</p>
                         </div>
                      </div>
                      <Download size={16} className="text-slate-300 group-hover:text-blue-600" />
                   </div>
                </div>
              )}
              
              {activeTab === 'signatures' && (
                <div className="space-y-4">
                   <div className="p-5 bg-white border-2 border-emerald-100 rounded-[2rem] flex items-center gap-4 relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-1 h-full bg-emerald-500" />
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shadow-inner"><CheckCircle2 size={28} /></div>
                      <div>
                         <p className="text-sm font-black text-slate-900">أحمد السعيد (أنت)</p>
                         <p className="text-[9px] font-bold text-emerald-600 uppercase">تم التوقيع والمصادقة ✓</p>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="space-y-6">
                   {[
                     { t: 'اليوم، 14:32', msg: 'تم إيداع الدفعة الأولى في الضمان (Escrow)', icon: <CreditCard className="text-emerald-500" /> },
                     { t: 'أمس، 10:00', msg: 'أحمد السعيد وقّع العقد رقمياً', icon: <CheckCircle2 className="text-blue-500" /> }
                   ].map((act, i) => (
                     <div key={i} className="flex gap-4">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                           {act.icon}
                        </div>
                        <div className="space-y-0.5">
                           <p className="text-[9px] font-black text-slate-300 uppercase">{act.t}</p>
                           <p className="text-xs font-bold text-slate-700">{act.msg}</p>
                        </div>
                     </div>
                   ))}
                </div>
              )}
           </div>
        </section>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-3 gap-3">
           <button onClick={handlePrint} className="flex flex-col items-center gap-2 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm hover:bg-slate-50 transition active:scale-95">
              <Printer size={20} className="text-slate-600" />
              <span className="text-[10px] font-black uppercase">طباعة</span>
           </button>
           <button onClick={handleShare} className="flex flex-col items-center gap-2 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm hover:bg-slate-50 transition active:scale-95">
              <Share2 size={20} className="text-blue-600" />
              <span className="text-[10px] font-black uppercase">مشاركة</span>
           </button>
           <button onClick={onOpenDispute} className="flex flex-col items-center gap-2 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm hover:bg-red-50 transition active:scale-95">
              <Gavel size={20} className="text-red-500" />
              <span className="text-[10px] font-black uppercase">نزاع</span>
           </button>
        </div>
      </div>

      {/* Primary Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/90 backdrop-blur-md border-t z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] flex gap-3">
         <button 
           onClick={() => onNavigate?.(ScreenType.CHAT_AI)}
           className="flex-[3] py-5 bg-blue-600 text-white rounded-[1.8rem] font-black text-sm shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3 relative overflow-hidden group"
         >
            <MessageSquare size={20} /> المحادثة المباشرة
         </button>
         <button className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-[1.8rem] font-black text-sm hover:bg-slate-200 active:scale-95 transition-all flex items-center justify-center">
            <Download size={20} />
         </button>
      </div>
    </div>
  );
};

export default ContractStatusDashboard;
