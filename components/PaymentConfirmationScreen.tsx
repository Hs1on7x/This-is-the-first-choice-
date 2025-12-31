
import React, { useState } from 'react';
import { ArrowRight, Lock, ShieldCheck, Check, CreditCard, Landmark, Smartphone, SmartphoneNfc } from 'lucide-react';

interface PaymentConfirmationScreenProps {
  amount: number;
  onBack: () => void;
  onConfirm: () => void;
}

const PaymentConfirmationScreen: React.FC<PaymentConfirmationScreenProps> = ({ amount, onBack, onConfirm }) => {
  const [password, setPassword] = useState('');
  const [method, setMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handleConfirm = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onConfirm();
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-bottom duration-500 overflow-y-auto pb-24">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-30 shadow-sm flex items-center justify-between">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowRight size={20} /></button>
        <h1 className="text-lg font-black text-slate-900">تأكيد الدفع</h1>
        <div className="w-10" />
      </div>

      <div className="p-6 space-y-8">
        {/* Confirmation Summary */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-4 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-blue-50 rounded-full -mr-12 -mt-12 opacity-50" />
           <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">إجمالي الدفع عبر الضمان</p>
           <h2 className="text-5xl font-black text-slate-900">{amount.toLocaleString()} <span className="text-lg font-bold text-blue-600">SAR</span></h2>
           <div className="flex items-center justify-center gap-2 py-2">
              <span className="text-[9px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">آمن ومشفر SSL</span>
           </div>
        </section>

        {/* Payment Methods */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">وسيلة الدفع</h3>
           <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'card', label: 'بطاقة مدى / ائتمان', icon: <CreditCard />, info: '**** 4321' },
                { id: 'apple', label: 'Apple Pay', icon: <SmartphoneNfc />, info: 'الدفع السريع' }
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setMethod(m.id)}
                  className={`p-5 rounded-2xl border-2 flex items-center justify-between transition-all ${method === m.id ? 'border-blue-600 bg-blue-50' : 'border-white bg-white hover:border-slate-100'}`}
                >
                   <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-xl ${method === m.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}>{m.icon}</div>
                      <div className="text-right">
                         <p className="text-xs font-black text-slate-800">{m.label}</p>
                         <p className="text-[10px] text-slate-400">{m.info}</p>
                      </div>
                   </div>
                   <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === m.id ? 'bg-blue-600 border-blue-600' : 'border-slate-200'}`}>
                      {method === m.id && <Check size={12} className="text-white" />}
                   </div>
                </button>
              ))}
           </div>
        </section>

        {/* Password Security */}
        <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
           <div className="flex justify-between items-center px-1">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">كلمة مرور التطبيق</label>
              <button className="text-[9px] font-black text-blue-600 underline">نسيت كلمة المرور؟</button>
           </div>
           <div className="relative group">
              <input 
                type="password" 
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-center text-2xl font-black focus:bg-white focus:border-blue-600 outline-none transition shadow-inner"
              />
              <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-blue-600 transition" size={20} />
           </div>
        </section>
      </div>

      {/* Floating Confirm Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t z-40">
         <button 
           onClick={handleConfirm}
           disabled={password.length < 4 || isProcessing}
           className={`w-full py-5 rounded-[1.8rem] font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-3 ${password.length >= 4 && !isProcessing ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' : 'bg-slate-100 text-slate-300'}`}
         >
            {isProcessing ? (
               <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
               <>تأكيد ودفع {amount.toLocaleString()} ريال <ShieldCheck size={20} /></>
            )}
         </button>
      </div>
    </div>
  );
};

export default PaymentConfirmationScreen;
