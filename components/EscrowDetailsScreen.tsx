
import React from 'react';
import { ArrowRight, Lock, CheckCircle2, History, Clock, ChevronLeft, ShieldCheck, Info, X, AlertTriangle } from 'lucide-react';
import { EscrowAccount } from '../types';

interface EscrowDetailsScreenProps {
  escrow: EscrowAccount;
  onBack: () => void;
  onOpenDispute: () => void;
}

const EscrowDetailsScreen: React.FC<EscrowDetailsScreenProps> = ({ escrow, onBack, onOpenDispute }) => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-300 overflow-y-auto pb-32">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-10 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowRight size={20} /></button>
          <h1 className="text-lg font-black text-slate-900 tracking-tight">إدارة الضمان #ESC-001</h1>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Status Card */}
        <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden text-center space-y-6">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-2xl" />
           <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-lg shadow-blue-500/20">
              <Lock size={32} />
           </div>
           <div className="space-y-1">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">المبلغ المحجوز حالياً</p>
              <h2 className="text-4xl font-black">{escrow.amount.toLocaleString()} <span className="text-sm font-medium">SAR</span></h2>
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-500/10 text-emerald-400 rounded-full text-[9px] font-black uppercase mt-2">
                 🟢 محجوز بنجاح (نشط)
              </div>
           </div>
        </section>

        {/* Release Conditions Progress */}
        <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
           <div className="flex items-center justify-between px-1">
              <h3 className="font-black text-slate-900 text-sm">شروط الإفراج</h3>
              <span className="text-[10px] font-black text-blue-600 uppercase">٨٣٪ مكتمل</span>
           </div>

           <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[83%] h-full bg-blue-600 rounded-full transition-all duration-1000" />
           </div>

           <div className="space-y-4">
              {[
                { label: 'تم التوقيع على العقد', status: '✅ completed' },
                { label: 'تم إيداع الدفعة الأولى', status: '✅ completed' },
                { label: 'مرور ٧ أيام حجز', status: '✅ completed' },
                { label: 'تأكيد الاستلام النهائي', status: '⏳ pending' },
              ].map((step, i) => (
                <div key={i} className="flex items-center justify-between group">
                   <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${step.status.includes('completed') ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-100 bg-slate-50'}`}>
                         {step.status.includes('completed') ? <CheckCircle2 size={14} /> : <div className="w-1.5 h-1.5 rounded-full bg-slate-200" />}
                      </div>
                      <span className={`text-xs font-bold ${step.status.includes('completed') ? 'text-slate-400 line-through' : 'text-slate-900'}`}>{step.label}</span>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* History Log */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">سجل الأحداث</h3>
           <div className="space-y-3">
              {[
                { time: '١٠:٣٠ ص', event: 'تم حجز المبلغ في الضمان', date: '١٥ يناير' },
                { time: '١٠:٣١ ص', event: 'إشعار الطرف المستفيد بالحجز', date: '١٥ يناير' },
                { time: '٠٢:٠٠ م', event: 'طلب إفراج مبكر من المستفيد', date: '٢٠ يناير' }
              ].map((log, i) => (
                <div key={i} className="bg-white p-4 rounded-2xl border border-slate-50 shadow-sm flex items-center gap-4 group hover:border-blue-100 transition">
                   <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center text-slate-300 group-hover:text-blue-500 transition"><History size={18} /></div>
                   <div className="flex-1">
                      <p className="text-xs font-bold text-slate-800">{log.event}</p>
                      <p className="text-[9px] text-slate-400 font-medium uppercase mt-0.5">{log.date} • {log.time}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Dispute Action */}
        <div className="p-6 bg-red-50 rounded-[2.5rem] border border-red-100 flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-red-100 text-red-600 rounded-2xl flex items-center justify-center shadow-inner"><AlertTriangle size={24} /></div>
              <div>
                 <h4 className="text-sm font-black text-red-900">هل تواجه مشكلة؟</h4>
                 <p className="text-[10px] text-red-600 font-medium">افتح نزاعاً لتجميد الحساب فوراً.</p>
              </div>
           </div>
           <button onClick={onOpenDispute} className="p-3 bg-red-600 text-white rounded-xl active:scale-90 transition"><ArrowRight className="rotate-180" size={20} /></button>
        </div>
      </div>

      {/* Primary Actions Footer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t shadow-2xl z-20 flex gap-3">
         <button className="flex-1 py-4 bg-blue-600 text-white rounded-[1.5rem] font-black text-sm active:scale-95 transition">موافقة على الإفراج</button>
         <button className="px-6 py-4 bg-slate-100 text-slate-600 rounded-[1.5rem] font-black text-sm hover:bg-red-50 hover:text-red-500 transition">رفض الإفراج</button>
      </div>
    </div>
  );
};

export default EscrowDetailsScreen;
