
import React from 'react';
import { ArrowRight, DollarSign, Clock, ShieldCheck, Info, ChevronLeft, CreditCard, Lock } from 'lucide-react';
import { Installment, ScreenType } from '../types';

interface PaymentDetailsScreenProps {
  installment: Installment;
  onBack: () => void;
  onPay: () => void;
}

const PaymentDetailsScreen: React.FC<PaymentDetailsScreenProps> = ({ installment, onBack, onPay }) => {
  const vat = installment.amount * 0.15;
  const total = installment.amount + vat;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-300">
      {/* Header */}
      <div className="p-4 bg-white border-b flex items-center justify-between sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowRight size={20} /></button>
          <h1 className="text-lg font-black text-slate-900">تفاصيل الدفعة المستحقة</h1>
        </div>
      </div>

      <div className="p-6 space-y-6 overflow-y-auto pb-32">
        {/* Value Card */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6 text-center">
           <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-inner">
              <DollarSign size={32} />
           </div>
           <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">المبلغ الإجمالي المستحق</p>
              <h2 className="text-4xl font-black text-slate-900">{total.toLocaleString()} <span className="text-sm font-bold text-blue-600">SAR</span></h2>
           </div>
           <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
              <div className="text-right">
                 <p className="text-[9px] font-black text-slate-400 uppercase">المبلغ الأساسي</p>
                 <p className="text-sm font-bold text-slate-700">{installment.amount.toLocaleString()} ريال</p>
              </div>
              <div className="text-left border-r border-slate-100 pr-4">
                 <p className="text-[9px] font-black text-slate-400 uppercase">الضريبة (١٥٪)</p>
                 <p className="text-sm font-bold text-emerald-600">+{vat.toLocaleString()} ريال</p>
              </div>
           </div>
        </section>

        {/* Due Info */}
        <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <Clock size={18} className="text-amber-500" />
                 <span className="text-xs font-black text-slate-900">تاريخ الاستحقاق</span>
              </div>
              <span className="text-[10px] font-black bg-amber-50 text-amber-600 px-3 py-1 rounded-full uppercase">مستحقة اليوم</span>
           </div>
           <p className="text-sm font-bold text-slate-700 pr-7">{installment.dueDate}</p>
           <div className="pt-4 border-t border-slate-50">
              <div className="flex items-center gap-3 mb-2">
                 <Info size={18} className="text-blue-600" />
                 <span className="text-xs font-black text-slate-900">الشرط المرتبط</span>
              </div>
              <p className="text-xs text-slate-500 font-medium pr-7 leading-relaxed italic">"{installment.condition}"</p>
           </div>
        </section>

        {/* Escrow Banner */}
        <section className="bg-slate-900 p-6 rounded-[2rem] text-white space-y-4 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-full -mr-12 -mt-12 blur-2xl" />
           <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg"><Lock size={24} /></div>
              <div>
                 <h3 className="text-sm font-black uppercase">نظام الضمان (Escrow)</h3>
                 <p className="text-[10px] text-slate-400 font-medium">سيتم حجز المبلغ لمدة ٧ أيام لضمان التنفيذ.</p>
              </div>
           </div>
           <ul className="space-y-2 relative z-10">
              {['تأكيد الاستلام من قبلك', 'مرور ٧ أيام بدون نزاع'].map((cond, i) => (
                <li key={i} className="flex items-center gap-2 text-[10px] font-bold text-slate-300">
                   <ShieldCheck size={12} className="text-blue-400" /> {cond}
                </li>
              ))}
           </ul>
        </section>
      </div>

      {/* Footer Action */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t shadow-2xl z-20">
         <button 
           onClick={onPay}
           className="w-full py-5 bg-blue-600 text-white rounded-[1.8rem] font-black text-lg shadow-xl shadow-blue-200 active:scale-95 transition flex items-center justify-center gap-3"
         >
            دفع المستحق الآن <ChevronLeft size={24} />
         </button>
      </div>
    </div>
  );
};

export default PaymentDetailsScreen;
