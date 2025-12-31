
import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, DollarSign, Lock, ShieldCheck, 
  CreditCard, Smartphone, Wallet, ChevronLeft, 
  CheckCircle2, Info, FileText, User, 
  RefreshCw, SmartphoneNfc, Check
} from 'lucide-react';
import { ContractDraft, ScreenType } from '../types';

interface PaymentBeforeSignatureProps {
  draft: ContractDraft;
  onBack: () => void;
  onSuccess: () => void;
}

const PaymentBeforeSignature: React.FC<PaymentBeforeSignatureProps> = ({ draft, onBack, onSuccess }) => {
  const [method, setMethod] = useState<'card' | 'apple' | 'wallet'>('card');
  const [agreed, setAgreed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const stats = useMemo(() => {
    const value = draft.financials?.totalAmount || 0;
    const fee = value * 0.02; // 2% Platform Fee
    const total = value + fee;
    return { value, fee, total };
  }, [draft]);

  const payerName = useMemo(() => {
    const payerType = draft.financials?.payer || 'party1';
    if (payerType === 'party1') return draft.parties[0]?.name || 'أنت';
    if (payerType === 'party2') return draft.parties[1]?.name || 'الطرف الثاني';
    if (payerType === 'split') return 'كلا الطرفين بالتساوي';
    return 'تلقائي حسب النظام';
  }, [draft]);

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2500);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-bottom duration-500 overflow-y-auto pb-32">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-40 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight size={20} />
          </button>
          <h1 className="text-lg font-black text-slate-900 tracking-tight">دفع قيمة العقد</h1>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Contract Brief Card */}
        <section className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
           <div className="flex items-center gap-3 border-b border-slate-50 pb-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                 <FileText size={20} />
              </div>
              <div>
                 <h3 className="text-sm font-black text-slate-900">{draft.type}</h3>
                 <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">رقم العقد: #2024-001234</p>
              </div>
           </div>
           <div className="space-y-2">
              <div className="flex justify-between text-[10px] font-bold text-slate-500">
                 <span>الأطراف:</span>
                 <div className="text-left text-slate-800">
                    <p>{draft.parties[0]?.name} (طرف أول)</p>
                    <p>{draft.parties[1]?.name} (طرف ثاني)</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Amount Breakdown */}
        <section className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-xl space-y-6 text-center relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-40" />
           <div className="space-y-1">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">إجمالي المبلغ المطلوب للدفع</p>
              <h2 className="text-5xl font-black text-slate-900 tracking-tighter">
                {stats.total.toLocaleString()} <span className="text-lg font-bold text-blue-600">SAR</span>
              </h2>
           </div>

           <div className="space-y-3 pt-4 border-t border-slate-50">
              <div className="flex justify-between text-xs font-medium">
                 <span className="text-slate-400">القيمة المتفق عليها:</span>
                 <span className="font-bold text-slate-800">{stats.value.toLocaleString()} ريال</span>
              </div>
              <div className="flex justify-between text-xs font-medium">
                 <span className="text-slate-400">رسوم المنصة والضمان (2%):</span>
                 <span className="font-black text-emerald-600">+{stats.fee.toLocaleString()} ريال</span>
              </div>
              <div className="pt-3 border-t border-slate-50 flex items-center justify-between">
                 <span className="text-[10px] font-black text-slate-400 uppercase">الطرف الدافع المكلّف:</span>
                 <div className="flex items-center gap-2 text-[11px] font-black text-blue-600 bg-blue-50 px-3 py-1 rounded-full">
                    <User size={12} /> {payerName}
                 </div>
              </div>
           </div>
        </section>

        {/* Payment Methods */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">اختر وسيلة الدفع</h3>
           <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'card', label: 'بطاقة ائتمان / مدى', icon: <CreditCard />, info: 'دفع آمن عبر بوابة مدى' },
                { id: 'apple', label: 'Apple Pay / STC Pay', icon: <SmartphoneNfc />, info: 'الدفع السريع بلمسة واحدة' },
                { id: 'wallet', label: 'رصيد المحفظة', icon: <Wallet />, info: 'الرصيد المتاح: 25,000 ريال' }
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
                         <p className="text-[9px] text-slate-400 font-bold uppercase">{m.info}</p>
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

        {/* Escrow Disclaimer */}
        <section className="bg-slate-900 p-6 rounded-[2rem] text-white space-y-4 shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/10 rounded-full blur-2xl" />
           <div className="flex items-center gap-4 relative z-10">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg"><Lock size={24} /></div>
              <div>
                 <h4 className="text-sm font-black uppercase tracking-tight">نظام الحماية الذكي (Escrow)</h4>
                 <p className="text-[10px] text-slate-400 font-medium">أموالك في أمان تام حتى اكتمال شروط العقد.</p>
              </div>
           </div>
           <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-3 relative z-10">
              <p className="text-[10px] text-slate-300 leading-relaxed font-medium">
                سيتم حجز المبلغ في محفظة الضمان (Escrow). لن يتم تحويله للطرف المستفيد إلا بعد:
              </p>
              <ul className="space-y-2">
                 <li className="flex items-center gap-2 text-[9px] font-bold text-blue-200"><CheckCircle2 size={12} /> إتمام التوقيع الرقمي من كافة الأطراف.</li>
                 <li className="flex items-center gap-2 text-[9px] font-bold text-blue-200"><CheckCircle2 size={12} /> تأكيد استلام الخدمة أو المنتج (للعقود المشروطة).</li>
              </ul>
           </div>
        </section>

        <label className="flex items-start gap-4 p-2 cursor-pointer group">
           <div className={`mt-1 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 transition-all ${
             agreed ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'border-slate-300 group-hover:border-blue-400'
           }`}>
              <input type="checkbox" className="hidden" checked={agreed} onChange={e => setAgreed(e.target.checked)} />
              {agreed && <Check size={16} />}
           </div>
           <span className="text-[11px] text-slate-600 font-bold leading-relaxed">
             أوافق على استقطاع رسوم المنصة (2%) وإيداع القيمة الإجمالية في محفظة الضمان (Escrow) لصالح الأطراف المتعاقدة.
           </span>
        </label>
      </div>

      {/* STICKY BOTTOM ACTION */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t z-50 shadow-2xl space-y-4">
         <button 
           onClick={handlePayment}
           disabled={!agreed || isProcessing}
           className={`w-full py-5 rounded-[1.8rem] font-black text-lg shadow-xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group ${
             agreed && !isProcessing 
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
              <>دفع وإيداع في محفظة الضمان <ChevronLeft size={24} /></>
            )}
         </button>
         <div className="flex items-center justify-center gap-4 text-[8px] font-black text-slate-400 uppercase tracking-widest">
            <span className="flex items-center gap-1"><ShieldCheck size={10} className="text-emerald-500" /> دفع آمن ومشفر</span>
            <span className="flex items-center gap-1"><Check size={10} className="text-blue-500" /> مرخص من SAMA</span>
         </div>
      </div>
    </div>
  );
};

export default PaymentBeforeSignature;
