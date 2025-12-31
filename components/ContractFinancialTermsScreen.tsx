
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowRight, DollarSign, CreditCard, Calendar, 
  Plus, Trash2, ShieldCheck, Info, AlertTriangle, 
  CheckCircle2, Sparkles, ChevronDown, Lock,
  Wallet, Landmark, Smartphone, Save, ChevronLeft,
  Target, Calculator, HelpCircle, X, FileText, Check,
  User
} from 'lucide-react';
import { ContractDraft, FinancialTerms, Installment } from '../types';

interface ContractFinancialTermsScreenProps {
  draft: ContractDraft;
  onBack: () => void;
  onNext: (financials: FinancialTerms) => void;
}

const ContractFinancialTermsScreen: React.FC<ContractFinancialTermsScreenProps> = ({ draft, onBack, onNext }) => {
  const [financials, setFinancials] = useState<FinancialTerms>({
    totalAmount: 50000,
    currency: 'SAR',
    paymentMethod: 'installments',
    installments: [
      { id: '1', amount: 25000, dueDate: '2025-01-01', condition: 'عند التوقيع', status: 'pending' },
      { id: '2', amount: 25000, dueDate: '2025-02-01', condition: 'بعد 30 يوم', status: 'pending' }
    ],
    vatApplicable: true,
    escrowEnabled: true,
    escrowConditions: ['موافقة الطرف المستفيد', 'إتمام التسليم/الخدمة'],
    latePenaltyEnabled: true,
    penaltyType: 'percentage',
    penaltyValue: 0.1,
    penaltyCap: 5000,
    acceptedPaymentMethods: ['بطاقة ائتمان/مدى', 'تحويل بنكي', 'Apple Pay / STC Pay'],
    payer: 'auto'
  });

  // Auto-set payer based on contract type
  useEffect(() => {
    const type = draft.type;
    let defaultPayer: any = 'party1';
    if (type.includes('إيجار')) defaultPayer = 'party2'; // Tenant pays
    if (type.includes('خدمات')) defaultPayer = 'party1'; // Client pays
    if (type.includes('عمل')) defaultPayer = 'party1'; // Employer pays
    if (type.includes('توريد')) defaultPayer = 'party2'; // Buyer pays
    
    setFinancials(prev => ({ ...prev, payer: defaultPayer }));
  }, [draft.type]);

  const calculations = useMemo(() => {
    const base = financials.totalAmount || 0;
    const vat = financials.vatApplicable ? base * 0.15 : 0;
    const escrowFee = financials.escrowEnabled ? (base + vat) * 0.02 : 0;
    const total = base + vat + escrowFee;
    
    const installmentSum = financials.installments.reduce((acc, curr) => acc + curr.amount, 0);
    const isInstallmentsBalanced = financials.paymentMethod === 'single' || installmentSum === base;

    return { base, vat, escrowFee, total, installmentSum, isInstallmentsBalanced };
  }, [financials]);

  const amountToWords = (amount: number) => {
    if (!amount) return "صفر ريال سعودي";
    return `${amount.toLocaleString('ar-SA')} ريال سعودي فقط لا غير`;
  };

  const addInstallment = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setFinancials({
      ...financials,
      installments: [...financials.installments, { id: newId, amount: 0, dueDate: '', condition: '', status: 'pending' }]
    });
  };

  const updateInstallment = (id: string, field: keyof Installment, value: any) => {
    setFinancials({
      ...financials,
      installments: financials.installments.map(i => i.id === id ? { ...i, [field]: value } : i)
    });
  };

  const removeInstallment = (id: string) => {
    if (financials.installments.length <= 1) return;
    setFinancials({
      ...financials,
      installments: financials.installments.filter(i => i.id !== id)
    });
  };

  const isFormValid = financials.totalAmount > 0 && calculations.isInstallmentsBalanced;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-300 pb-64 overflow-y-auto custom-scrollbar">
      <div className="p-4 bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
             <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
                <ArrowRight className="text-slate-700" />
             </button>
             <h1 className="text-lg font-black text-slate-900">الشروط المالية</h1>
          </div>
          <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">الخطوة ٥ من ٦</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="w-[83%] h-full bg-blue-600 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
        </div>
      </div>

      <div className="p-6 space-y-8">
        <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
           <div className="flex items-center gap-3 mb-2 px-1">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                 <Calculator size={22} />
              </div>
              <h3 className="font-black text-slate-900 text-sm">القيمة الإجمالية للعقد</h3>
           </div>

           <div className="flex gap-3">
              <div className="flex-1 relative group">
                 <input 
                   type="number" 
                   value={financials.totalAmount}
                   onChange={e => setFinancials({...financials, totalAmount: parseFloat(e.target.value) || 0})}
                   className="w-full bg-slate-50 border-2 border-transparent rounded-[1.5rem] py-5 px-6 text-3xl font-black text-blue-600 focus:bg-white focus:border-blue-600 transition shadow-inner"
                   placeholder="0.00"
                 />
                 <span className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-300 font-black text-lg">SAR</span>
              </div>
           </div>

           <div className="space-y-3 pt-4 border-t border-slate-50">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">من يدفع قيمة العقد؟</p>
              <div className="grid grid-cols-2 gap-3">
                 {[
                   { id: 'party1', label: 'الطرف الأول (أنت)' },
                   { id: 'party2', label: 'الطرف الثاني' },
                   { id: 'split', label: 'الطرفان (نصفين)' },
                   { id: 'auto', label: 'تلقائي (حسب العقد)' }
                 ].map(opt => (
                   <button
                     key={opt.id}
                     onClick={() => setFinancials({...financials, payer: opt.id as any})}
                     className={`p-3 rounded-xl border-2 transition-all text-xs font-bold text-center ${financials.payer === opt.id ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm' : 'border-slate-50 bg-white text-slate-400'}`}
                   >
                     {opt.label}
                   </button>
                 ))}
              </div>
           </div>

           <div className="p-5 bg-blue-50/50 rounded-[1.5rem] border border-blue-100/50">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <FileText size={12} /> المبلغ بالحروف
              </p>
              <p className="text-xs font-bold text-blue-800 leading-relaxed italic">
                 " {amountToWords(financials.totalAmount)} "
              </p>
           </div>
        </section>

        <section className="space-y-4">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">آلية سداد المبلغ</h3>
           <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'single', label: 'دفعة واحدة', icon: <CreditCard />, desc: 'سداد كامل المبلغ في تاريخ محدد' },
                { id: 'installments', label: 'دفعات مجدولة', icon: <Calendar />, desc: 'تقسيم المبلغ على تواريخ زمنية' },
                { id: 'conditional', label: 'دفع مشروط', icon: <Target />, desc: 'الدفع عند تحقيق شروط إنجاز' }
              ].map(method => (
                <button
                  key={method.id}
                  onClick={() => setFinancials({...financials, paymentMethod: method.id as any})}
                  className={`p-5 rounded-[2rem] border-2 transition-all flex items-center gap-5 text-right relative group ${
                    financials.paymentMethod === method.id 
                    ? 'border-blue-600 bg-blue-50/50 shadow-xl shadow-blue-100 ring-4 ring-blue-600/5' 
                    : 'border-white bg-white hover:border-slate-100'
                  }`}
                >
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${
                     financials.paymentMethod === method.id ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400'
                   }`}>
                      {method.icon}
                   </div>
                   <div className="flex-1">
                      <h4 className="font-black text-sm text-slate-900">{method.label}</h4>
                      <p className="text-[10px] text-slate-400 font-medium mt-0.5">{method.desc}</p>
                   </div>
                </button>
              ))}
           </div>
        </section>

        <section className={`p-7 rounded-[3rem] border-2 transition-all space-y-6 relative overflow-hidden ${financials.escrowEnabled ? 'bg-slate-900 border-blue-600 text-white shadow-2xl' : 'bg-white border-slate-100 text-slate-900 shadow-sm'}`}>
           <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                 <div className={`w-14 h-14 rounded-[1.2rem] flex items-center justify-center transition-all ${financials.escrowEnabled ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}>
                    <Lock size={28} />
                 </div>
                 <div>
                    <h3 className="font-black text-sm">نظام الضمان (Escrow)</h3>
                    <p className="text-[10px] font-medium text-slate-400">حجز المبلغ في محفظة آمنة لضمان الحقوق.</p>
                 </div>
              </div>
              <button 
                onClick={() => setFinancials({...financials, escrowEnabled: !financials.escrowEnabled})}
                className={`w-14 h-7 rounded-full transition-all relative ${financials.escrowEnabled ? 'bg-blue-600 shadow-lg' : 'bg-slate-300'}`}
              >
                 <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${financials.escrowEnabled ? 'right-8' : 'right-1'}`} />
              </button>
           </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/90 backdrop-blur-lg border-t z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] space-y-6">
        <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white space-y-4 shadow-2xl relative overflow-hidden">
           <div className="space-y-2.5 relative z-10">
              <div className="flex justify-between text-xs font-medium">
                 <span className="text-slate-400">القيمة الأساسية:</span>
                 <span className="font-bold">{calculations.base.toLocaleString()} {financials.currency}</span>
              </div>
              <div className="flex justify-between text-xs font-medium">
                 <span className="text-slate-400">الضريبة (15%):</span>
                 <span className="text-emerald-400 font-bold">+{calculations.vat.toLocaleString()}</span>
              </div>
              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                 <span className="text-[10px] font-black uppercase text-blue-400">إجمالي القيمة المستحقة</span>
                 <div className="text-right">
                    <span className="text-2xl font-black">{calculations.total.toLocaleString()}</span>
                    <span className="text-xs font-bold text-slate-400 mr-1">{financials.currency}</span>
                 </div>
              </div>
           </div>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => onNext(financials)}
            disabled={!isFormValid}
            className={`flex-[3] py-5 rounded-[1.8rem] font-black text-lg shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 ${
              isFormValid 
              ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' 
              : 'bg-slate-100 text-slate-300 cursor-not-allowed'
            }`}
          >
            التالي: مراجعة العقد النهائية <ChevronLeft size={24} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractFinancialTermsScreen;
