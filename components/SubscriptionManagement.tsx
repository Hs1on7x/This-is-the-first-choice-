
import React, { useState } from 'react';
import { 
  ArrowRight, Crown, ShieldCheck, CreditCard, 
  ChevronLeft, History, RefreshCw, X, AlertTriangle, 
  Settings, Download, FileText, CheckCircle2, ChevronRight,
  MoreVertical, Calendar
} from 'lucide-react';

interface SubscriptionManagementProps {
  onBack: () => void;
  onNavigate: (screen: any) => void;
}

const SubscriptionManagement: React.FC<SubscriptionManagementProps> = ({ onBack, onNavigate }) => {
  const [autoRenew, setAutoRenew] = useState(true);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const subInfo = {
    planName: 'باقة الاشتراك المتوسطة',
    price: 199,
    status: 'active',
    startDate: '2024-12-01',
    expiryDate: '2025-01-01',
    card: 'Visa •••• 1234',
    cardExpiry: '12/25'
  };

  const invoices = [
    { id: 'INV-101', date: '2024-12-01', amount: 199, status: 'paid' },
    { id: 'INV-098', date: '2024-11-01', amount: 199, status: 'paid' },
    { id: 'INV-085', date: '2024-10-01', amount: 199, status: 'paid' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-right duration-500 overflow-y-auto pb-24">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-40 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight size={20} className="text-slate-700" />
          </button>
          <h1 className="text-lg font-black text-slate-900 tracking-tight">إدارة الاشتراك</h1>
        </div>
        <button className="p-2 text-slate-400"><MoreVertical size={20} /></button>
      </div>

      <div className="p-6 space-y-8">
        {/* Active Plan Card */}
        <section className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full -mr-24 -mt-24 blur-3xl animate-pulse" />
           <div className="relative z-10 space-y-6">
              <div className="flex justify-between items-center">
                 <div className="w-14 h-14 bg-blue-600 rounded-[1.5rem] flex items-center justify-center shadow-lg group-hover:rotate-6 transition-transform">
                    <Crown size={32} />
                 </div>
                 <div className="text-left">
                    <span className="px-4 py-1.5 bg-emerald-500/20 text-emerald-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-emerald-500/20">🟢 اشتراك نشط</span>
                 </div>
              </div>
              <div className="space-y-1">
                 <h2 className="text-2xl font-black">{subInfo.planName}</h2>
                 <p className="text-sm font-bold text-slate-400">{subInfo.price} ريال / شهرياً</p>
              </div>
              <div className="grid grid-cols-2 gap-6 pt-6 border-t border-white/10">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">تاريخ البدء</p>
                    <p className="text-xs font-bold">{subInfo.startDate}</p>
                 </div>
                 <div className="space-y-1 text-left">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">موعد التجديد</p>
                    <p className="text-xs font-bold text-blue-400">{subInfo.expiryDate}</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Auto Renew Toggle */}
        <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner"><RefreshCw size={24} /></div>
              <div>
                 <h4 className="text-sm font-black text-slate-900 uppercase tracking-tight">التجديد التلقائي</h4>
                 <p className="text-[10px] text-slate-400 font-medium">خصم المبلغ تلقائياً كل شهر</p>
              </div>
           </div>
           <button 
             onClick={() => setAutoRenew(!autoRenew)}
             className={`w-14 h-7 rounded-full transition-all relative ${autoRenew ? 'bg-blue-600 shadow-lg' : 'bg-slate-300'}`}
           >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${autoRenew ? 'right-8' : 'right-1'}`} />
           </button>
        </section>

        {/* Payment Method */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">طريقة الدفع الحالية</h3>
           <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center"><CreditCard size={24} /></div>
                 <div>
                    <h4 className="text-xs font-black text-slate-900">{subInfo.card}</h4>
                    <p className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">تنتهي في {subInfo.cardExpiry}</p>
                 </div>
              </div>
              <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">تغيير</button>
           </div>
        </section>

        {/* Invoices List */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">سجل المدفوعات والفواتير</h3>
              <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">عرض الكل</button>
           </div>
           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
              {invoices.map((inv) => (
                <div key={inv.id} className="p-5 flex items-center justify-between group hover:bg-slate-50 transition cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:text-blue-600 group-hover:bg-white transition shadow-inner"><FileText size={18} /></div>
                      <div>
                         <p className="text-xs font-black text-slate-900">{inv.date}</p>
                         <p className="text-[9px] text-slate-400 font-bold uppercase">{inv.id}</p>
                      </div>
                   </div>
                   <div className="flex items-center gap-4">
                      <div className="text-left">
                         <p className="text-xs font-black text-slate-900">{inv.amount} ريال</p>
                         <span className="text-[8px] font-black text-emerald-600 uppercase">✓ مدفوع</span>
                      </div>
                      <Download size={16} className="text-slate-200 group-hover:text-blue-600 transition" />
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Danger Zone Actions */}
        <section className="grid grid-cols-2 gap-4">
           <button className="p-6 bg-white border border-slate-100 rounded-[2.5rem] flex flex-col items-center gap-3 active:scale-95 transition hover:border-blue-600 group shadow-sm">
              <Settings size={24} className="text-slate-400 group-hover:text-blue-600 transition" />
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">تغيير الباقة</span>
           </button>
           <button 
             onClick={() => setShowCancelModal(true)}
             className="p-6 bg-white border border-slate-100 rounded-[2.5rem] flex flex-col items-center gap-3 active:scale-95 transition hover:bg-red-50 hover:border-red-200 group shadow-sm"
           >
              <X size={24} className="text-slate-400 group-hover:text-red-500 transition" />
              <span className="text-[10px] font-black text-slate-700 uppercase tracking-widest">إلغاء الاشتراك</span>
           </button>
        </section>
      </div>

      {/* MODAL: Cancel Confirmation */}
      {showCancelModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 space-y-8 shadow-2xl animate-in zoom-in duration-300 text-center">
              <div className="w-20 h-20 bg-red-50 text-red-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
                 <AlertTriangle size={40} />
              </div>
              <div className="space-y-3">
                 <h3 className="text-xl font-black text-slate-900">تأكيد إلغاء الاشتراك؟</h3>
                 <p className="text-xs text-slate-500 leading-relaxed font-medium">
                   • سيستمر اشتراكك مفعلاً حتى <span className="font-black text-slate-900">{subInfo.expiryDate}</span>.<br/>
                   • لن يتم تجديد الاشتراك تلقائياً بعد ذلك التاريخ.<br/>
                   • يمكنك إعادة الاشتراك في أي وقت لاستعادة الميزات.
                 </p>
              </div>
              <div className="flex flex-col gap-3">
                 <button 
                   onClick={() => { setShowCancelModal(false); setAutoRenew(false); }}
                   className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-sm active:scale-95 transition shadow-xl shadow-red-200"
                 >
                   نعم، إلغاء التجديد التلقائي
                 </button>
                 <button onClick={() => setShowCancelModal(false)} className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm">التراجع والعودة</button>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default SubscriptionManagement;
