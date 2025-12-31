
import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, Lock, ShieldCheck, Check, CreditCard, 
  Landmark, Smartphone, SmartphoneNfc, Wallet,
  ChevronLeft, RefreshCw, X, AlertTriangle, Info,
  Bot, CheckCircle2
} from 'lucide-react';
import { SubscriptionPlan, ScreenType } from '../types';

interface AISessionConfirmationProps {
  plan: SubscriptionPlan;
  walletBalance: number;
  onBack: () => void;
  onSuccess: (plan: SubscriptionPlan) => void;
  onChargeWallet: () => void;
}

const AISessionConfirmation: React.FC<AISessionConfirmationProps> = ({ plan, walletBalance, onBack, onSuccess, onChargeWallet }) => {
  const [method, setMethod] = useState<'card' | 'apple' | 'wallet'>('card');
  const [agreed, setAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const isBalanceEnough = walletBalance >= plan.price;

  const handlePayment = () => {
    if (method === 'wallet' && !isBalanceEnough) {
      onChargeWallet();
      return;
    }
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess(plan);
    }, 2500);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-bottom duration-500 overflow-y-auto pb-32">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-40 shadow-sm flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
          <ArrowRight size={20} className="text-slate-700" />
        </button>
        <h1 className="text-lg font-black text-slate-900 tracking-tight">تأكيد الشراء</h1>
        <div className="w-10" />
      </div>

      <div className="p-6 space-y-8">
        {/* Selection Summary */}
        <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl space-y-6 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-40" />
           <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">المبلغ المستحق للدفع</p>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
                {plan.price.toLocaleString()} <span className="text-lg font-bold text-blue-600 uppercase">SAR</span>
              </h2>
           </div>

           <div className="p-5 bg-slate-50 rounded-3xl space-y-3 relative z-10 border border-slate-100 shadow-inner">
              <div className="flex justify-between items-center text-xs font-bold">
                 <span className="text-slate-400">الباقة المختارة:</span>
                 <span className="text-slate-900">{plan.name}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold">
                 <span className="text-slate-400">التفاصيل:</span>
                 <span className="text-blue-600">{plan.sessions === 'unlimited' ? 'جلسات غير محدودة' : `${plan.sessions} جلسة`}</span>
              </div>
              <div className="flex justify-between items-center text-xs font-bold">
                 <span className="text-slate-400">المدة:</span>
                 <span className="text-slate-900">{plan.durationDays} يوم</span>
              </div>
           </div>
        </section>

        {/* Payment Methods */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">اختر وسيلة الدفع</h3>
           <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'card', label: 'بطاقة ائتمان / مدى', icon: <CreditCard />, info: 'دفع آمن ومباشر' },
                { id: 'apple', label: 'Apple Pay / STC Pay', icon: <SmartphoneNfc />, info: 'الدفع السريع بلمسة واحدة' },
                { id: 'wallet', label: 'المحفظة الرقمية', icon: <Wallet />, info: `الرصيد المتاح: ${walletBalance} ريال` }
              ].map((m) => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id as any)}
                  className={`p-5 rounded-[1.8rem] border-2 flex items-center justify-between transition-all group ${
                    method === m.id ? 'border-blue-600 bg-blue-50 shadow-lg shadow-blue-50' : 'border-white bg-white hover:border-slate-100'
                  }`}
                >
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-all ${
                        method === m.id ? 'bg-blue-600 text-white shadow-md' : 'bg-slate-50 text-slate-400'
                      }`}>
                         {m.icon}
                      </div>
                      <div className="text-right">
                         <p className="text-xs font-black text-slate-800">{m.label}</p>
                         <p className={`text-[9px] font-bold uppercase ${method === 'wallet' && m.id === 'wallet' && !isBalanceEnough ? 'text-red-500' : 'text-slate-400'}`}>
                            {m.info}
                         </p>
                      </div>
                   </div>
                   <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                     method === m.id ? 'border-blue-600 bg-blue-600 scale-110' : 'border-slate-200'
                   }`}>
                      {method === m.id && <Check size={12} className="text-white" />}
                   </div>
                </button>
              ))}
           </div>
        </section>

        {/* Insufficient Balance Alert */}
        {method === 'wallet' && !isBalanceEnough && (
          <div className="p-5 bg-red-50 rounded-[2rem] border border-red-100 flex gap-4 animate-in slide-in-from-top duration-300">
             <AlertTriangle size={24} className="text-red-500 shrink-0" />
             <div className="space-y-1">
                <h4 className="text-xs font-black text-red-900">رصيد غير كافي</h4>
                <p className="text-[10px] text-red-700 font-medium">رصيد محفظتك الحالي أقل من قيمة الباقة. يرجى شحن المحفظة للمتابعة.</p>
                <button onClick={onChargeWallet} className="text-[10px] font-black text-red-600 underline underline-offset-4 mt-2">شحن المحفظة الآن</button>
             </div>
          </div>
        )}

        {/* Subscription Disclaimer */}
        {plan.type === 'subscription' && (
          <div className="p-6 bg-slate-900 rounded-[2.5rem] text-white space-y-4 shadow-xl relative overflow-hidden">
             <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl" />
             <div className="flex items-center gap-4 relative z-10">
                <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg"><RefreshCw size={24} /></div>
                <div>
                   <h4 className="text-sm font-black uppercase tracking-tight">التجديد التلقائي مفعّل</h4>
                   <p className="text-[10px] text-slate-400 font-medium">سيتم خصم المبلغ شهرياً لضمان استمرارية الخدمة.</p>
                </div>
             </div>
             <p className="text-[10px] text-slate-300 leading-relaxed font-medium relative z-10 pr-2">
                • يمكنك إلغاء التجديد التلقائي في أي وقت من الإعدادات.<br/>
                • سيتم إرسال إشعار تذكير قبل ٣ أيام من موعد الخصم القادم.
             </p>
          </div>
        )}

        {/* Checkbox Agreement */}
        <label className="flex items-start gap-4 p-2 cursor-pointer group">
           <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
             agreed ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'border-slate-300 group-hover:border-blue-400'
           }`}>
              <input type="checkbox" className="hidden" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
              {agreed && <Check size={16} />}
           </div>
           <span className="text-[11px] text-slate-600 font-bold leading-relaxed">
             أوافق على <button className="text-blue-600 underline">شروط الاشتراك</button> وسياسة الاسترداد الخاصة بالمنصة القانونية.
           </span>
        </label>
      </div>

      {/* STICKY BOTTOM ACTION */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t z-50 shadow-2xl space-y-4">
         <button 
           onClick={handlePayment}
           disabled={!agreed || isProcessing || (method === 'wallet' && !isBalanceEnough)}
           className={`w-full py-5 rounded-[1.8rem] font-black text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group ${
             agreed && !isProcessing && !(method === 'wallet' && !isBalanceEnough)
             ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' 
             : 'bg-slate-100 text-slate-300 cursor-not-allowed'
           }`}
         >
            {isProcessing ? (
              <>
                 <RefreshCw size={20} className="animate-spin" />
                 <span>جاري معالجة الدفع...</span>
              </>
            ) : (
              <>{plan.type === 'subscription' ? 'اشترك الآن وفعل الميزات' : 'دفع وتفعيل الباقة'} <ChevronLeft size={24} /></>
            )}
            {!isProcessing && agreed && <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />}
         </button>
         <div className="flex items-center justify-center gap-4 text-[8px] font-black text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-1"><ShieldCheck size={10} className="text-emerald-500" /> دفع آمن 256-bit</span>
            <span className="flex items-center gap-1"><Bot size={10} className="text-blue-500" /> تنشيط فوري</span>
         </div>
      </div>
    </div>
  );
};

export default AISessionConfirmation;
