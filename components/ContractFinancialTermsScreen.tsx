
import React, { useState, useMemo, useEffect } from 'react';
import { 
  ArrowRight, DollarSign, CreditCard, Calendar, 
  Plus, Trash2, ShieldCheck, Info, AlertTriangle, 
  CheckCircle2, Sparkles, ChevronDown, Lock,
  Wallet, Landmark, Smartphone, Save, ChevronLeft,
  Target, Calculator, HelpCircle, X, FileText, Check
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
      { id: '1', amount: 25000, dueDate: '2025-01-01', condition: 'عند التوقيع' },
      { id: '2', amount: 25000, dueDate: '2025-02-01', condition: 'بعد 30 يوم' }
    ],
    vatApplicable: true,
    escrowEnabled: true,
    escrowConditions: ['موافقة الطرف المستفيد', 'إتمام التسليم/الخدمة'],
    latePenaltyEnabled: true,
    penaltyType: 'percentage',
    penaltyValue: 0.1,
    penaltyCap: 5000,
    acceptedPaymentMethods: ['بطاقة ائتمان/مدى', 'تحويل بنكي', 'Apple Pay / STC Pay']
  });

  const [showEscrowInfo, setShowEscrowInfo] = useState(true);

  // Auto-calculations
  const calculations = useMemo(() => {
    const base = financials.totalAmount || 0;
    const vat = financials.vatApplicable ? base * 0.15 : 0;
    const escrowFee = financials.escrowEnabled ? (base + vat) * 0.02 : 0;
    const total = base + vat + escrowFee;
    
    const installmentSum = financials.installments.reduce((acc, curr) => acc + curr.amount, 0);
    const isInstallmentsBalanced = financials.paymentMethod === 'single' || installmentSum === base;

    return { base, vat, escrowFee, total, installmentSum, isInstallmentsBalanced };
  }, [financials]);

  // Mock function for Arabic Numbers to Words (Simplified)
  const amountToWords = (amount: number) => {
    if (!amount) return "صفر ريال سعودي";
    if (amount === 50000) return "خمسون ألف ريال سعودي";
    if (amount === 12000) return "اثنا عشر ألف ريال سعودي";
    return `${amount.toLocaleString('ar-SA')} ريال سعودي فقط لا غير`;
  };

  const addInstallment = () => {
    const newId = Math.random().toString(36).substr(2, 9);
    setFinancials({
      ...financials,
      installments: [...financials.installments, { id: newId, amount: 0, dueDate: '', condition: '' }]
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

  const toggleEscrowCondition = (cond: string) => {
    setFinancials({
      ...financials,
      escrowConditions: financials.escrowConditions.includes(cond)
        ? financials.escrowConditions.filter(c => c !== cond)
        : [...financials.escrowConditions, cond]
    });
  };

  const togglePaymentMethod = (method: string) => {
    setFinancials({
      ...financials,
      acceptedPaymentMethods: financials.acceptedPaymentMethods.includes(method)
        ? financials.acceptedPaymentMethods.filter(m => m !== method)
        : [...financials.acceptedPaymentMethods, method]
    });
  };

  const isFormValid = useMemo(() => {
    return (
      financials.totalAmount > 0 &&
      calculations.isInstallmentsBalanced &&
      financials.acceptedPaymentMethods.length > 0
    );
  }, [financials, calculations]);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-300 pb-64 overflow-y-auto custom-scrollbar">
      {/* Step Progress Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
             <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
                <ArrowRight className="text-slate-700" />
             </button>
             <h1 className="text-lg font-black text-slate-900">الشروط المالية</h1>
          </div>
          <div className="flex flex-col items-end">
             <span className="text-[10px] font-black text-blue-600 uppercase tracking-widest">الخطوة ٥ من ٦</span>
             <span className="text-[8px] font-bold text-slate-400">المرحلة: الدفع والضمان</span>
          </div>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="w-[83%] h-full bg-blue-600 rounded-full transition-all duration-1000 shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
        </div>
      </div>

      <div className="p-6 space-y-8">
        <div className="space-y-1">
           <h2 className="text-2xl font-black text-slate-900 leading-tight">حدد الالتزامات المالية</h2>
           <p className="text-sm text-slate-500 font-medium">قم بضبط القيمة، آلية السداد، والضمانات البنكية الذكية.</p>
        </div>

        {/* 1. Contract Value Section */}
        <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
           <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-3">
                 <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                    <Calculator size={22} />
                 </div>
                 <h3 className="font-black text-slate-900 text-sm">القيمة الإجمالية للعقد</h3>
              </div>
              <HelpCircle size={16} className="text-slate-300" />
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
              <select 
                value={financials.currency}
                onChange={e => setFinancials({...financials, currency: e.target.value})}
                className="bg-slate-50 border-2 border-transparent rounded-[1.5rem] px-5 font-black text-xs text-slate-700 focus:bg-white focus:border-blue-600 transition"
              >
                 <option>SAR</option>
                 <option>USD</option>
                 <option>EUR</option>
                 <option>GBP</option>
              </select>
           </div>

           <div className="p-5 bg-blue-50/50 rounded-[1.5rem] border border-blue-100/50 relative overflow-hidden group">
              <div className="absolute top-0 right-0 w-16 h-16 bg-blue-100/30 rounded-full -mr-8 -mt-8 blur-xl" />
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                 <FileText size={12} /> المبلغ بالحروف (رسمي)
              </p>
              <p className="text-xs font-bold text-blue-800 leading-relaxed italic pr-1">
                 " {amountToWords(financials.totalAmount)} "
              </p>
           </div>
        </section>

        {/* AI Suggestion Box */}
        <div className="bg-indigo-600 p-5 rounded-[2rem] text-white shadow-xl relative overflow-hidden group active:scale-[0.98] transition cursor-pointer">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-125 transition-transform" />
           <div className="flex gap-4 relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shrink-0">
                 <Sparkles size={24} className="text-amber-300" />
              </div>
              <div className="space-y-1">
                 <h4 className="text-xs font-black uppercase tracking-widest text-indigo-200">اقتراح المساعد الذكي</h4>
                 <p className="text-[10px] text-white/90 leading-relaxed font-medium">
                    بناءً على عقود الخدمات المشابهة، نقترح تفعيل <span className="font-black text-amber-300">نظام Escrow</span> وتقسيم الدفعات إلى (٢٠٪ عند البدء، ٨٠٪ عند التسليم النهائي).
                 </p>
              </div>
           </div>
        </div>

        {/* 2. Payment Method Selection */}
        <section className="space-y-4">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">آلية سداد المبلغ</h3>
           <div className="grid grid-cols-1 gap-3">
              {[
                { id: 'single', label: 'دفعة واحدة', icon: <CreditCard />, desc: 'سداد المبلغ كاملاً في تاريخ استحقاق محدد' },
                { id: 'installments', label: 'دفعات مجدولة', icon: <Calendar />, desc: 'تقسيم المبلغ على تواريخ زمنية ثابتة' },
                { id: 'conditional', label: 'دفع مشروط (Milestones)', icon: <Target />, desc: 'الدفع عند تحقيق شروط إنجاز محددة' }
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
                   <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                     financials.paymentMethod === method.id ? 'border-blue-600 bg-blue-600 scale-110' : 'border-slate-200'
                   }`}>
                      {/* Fix: added missing Check component */}
                      {financials.paymentMethod === method.id && <Check size={14} className="text-white" />}
                   </div>
                </button>
              ))}
           </div>
        </section>

        {/* 3. Dynamic Installment/Milestone Table */}
        {financials.paymentMethod !== 'single' && (
          <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-5 animate-in zoom-in duration-500">
             <div className="flex items-center justify-between px-1">
                <h3 className="font-black text-slate-900 text-sm">
                   {financials.paymentMethod === 'installments' ? 'جدول الدفعات الزمنية' : 'شروط دفع المراحل (Milestones)'}
                </h3>
                <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase transition-colors ${
                  calculations.isInstallmentsBalanced ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600 animate-pulse'
                }`}>
                   {calculations.isInstallmentsBalanced ? '✓ المجموع مطابق' : `⚠️ العجز: ${Math.abs(financials.totalAmount - calculations.installmentSum).toLocaleString()}`}
                </div>
             </div>

             <div className="space-y-4">
                {financials.installments.map((inst, idx) => (
                  <div key={inst.id} className="p-5 bg-slate-50 rounded-[1.8rem] border border-slate-100 space-y-4 relative group hover:bg-white hover:border-blue-200 transition-all">
                     <div className="flex items-center justify-between">
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">البند المالي {idx + 1}</span>
                        <button onClick={() => removeInstallment(inst.id)} className="p-1.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition"><Trash2 size={14} /></button>
                     </div>
                     <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                           <label className="text-[8px] font-black text-slate-400 uppercase pr-1">المبلغ المستحق</label>
                           <div className="relative">
                              <input 
                                type="number" 
                                value={inst.amount}
                                onChange={e => updateInstallment(inst.id, 'amount', parseFloat(e.target.value) || 0)}
                                className="w-full bg-white border-2 border-transparent rounded-xl p-3 text-xs font-black text-blue-600 focus:border-blue-600 outline-none transition"
                              />
                              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[10px] text-slate-300 font-bold">SAR</span>
                           </div>
                        </div>
                        <div className="space-y-1.5">
                           <label className="text-[8px] font-black text-slate-400 uppercase pr-1">تاريخ الاستحقاق</label>
                           <input 
                             type="date" 
                             value={inst.dueDate}
                             onChange={e => updateInstallment(inst.id, 'dueDate', e.target.value)}
                             className="w-full bg-white border-2 border-transparent rounded-xl p-3 text-[10px] font-bold focus:border-blue-600 outline-none transition"
                           />
                        </div>
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-[8px] font-black text-slate-400 uppercase pr-1">شرط الإفراج أو الوصف</label>
                        <input 
                          type="text" 
                          placeholder={financials.paymentMethod === 'conditional' ? "مثال: عند تسليم مسودة التصميم" : "وصف اختياري للدفع"}
                          value={inst.condition}
                          onChange={e => updateInstallment(inst.id, 'condition', e.target.value)}
                          className="w-full bg-white border-2 border-transparent rounded-xl p-3 text-[10px] font-medium focus:border-blue-600 outline-none transition"
                        />
                     </div>
                  </div>
                ))}
                <button 
                  onClick={addInstallment}
                  className="w-full py-5 border-2 border-dashed border-slate-200 rounded-[1.8rem] text-slate-400 text-xs font-black hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50/30 transition-all flex items-center justify-center gap-2 group active:scale-[0.98]"
                >
                  <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition-transform">
                    <Plus size={18} />
                  </div>
                  إضافة دفعة أو مرحلة جديدة
                </button>
             </div>
          </section>
        )}

        {/* 4. Tax (VAT) Section */}
        <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm flex items-center justify-between group hover:border-emerald-200 transition">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-emerald-50 text-emerald-600 rounded-[1.2rem] flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                 <Landmark size={28} />
              </div>
              <div>
                 <h3 className="font-black text-sm text-slate-900">ضريبة القيمة المضافة (VAT)</h3>
                 <p className="text-[10px] text-slate-400 font-medium">تطبيق نسبة ١٥٪ إضافية على مبلغ العقد.</p>
              </div>
           </div>
           <button 
             onClick={() => setFinancials({...financials, vatApplicable: !financials.vatApplicable})}
             className={`w-14 h-7 rounded-full transition-all relative ${financials.vatApplicable ? 'bg-emerald-600' : 'bg-slate-200'}`}
           >
              <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${financials.vatApplicable ? 'right-8' : 'right-1'}`} />
           </button>
        </section>

        {/* 5. Smart Escrow System */}
        <section className={`p-7 rounded-[3rem] border-2 transition-all space-y-6 relative overflow-hidden ${financials.escrowEnabled ? 'bg-slate-900 border-blue-600 text-white shadow-2xl' : 'bg-white border-slate-100 text-slate-900 shadow-sm'}`}>
           {financials.escrowEnabled && <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse" />}
           
           <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                 <div className={`w-14 h-14 rounded-[1.2rem] flex items-center justify-center transition-all ${financials.escrowEnabled ? 'bg-blue-600 text-white shadow-[0_0_20px_rgba(37,99,235,0.4)]' : 'bg-slate-50 text-slate-400'}`}>
                    <Lock size={28} />
                 </div>
                 <div>
                    <h3 className="font-black text-sm">نظام الضمان المالي (Smart Escrow)</h3>
                    <p className={`text-[10px] font-medium ${financials.escrowEnabled ? 'text-slate-400' : 'text-slate-400'}`}>حجز المبالغ في محفظة آمنة لحين إتمام العمل.</p>
                 </div>
              </div>
              <button 
                onClick={() => setFinancials({...financials, escrowEnabled: !financials.escrowEnabled})}
                className={`w-14 h-7 rounded-full transition-all relative ${financials.escrowEnabled ? 'bg-blue-600 shadow-lg' : 'bg-slate-300'}`}
              >
                 <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${financials.escrowEnabled ? 'right-8' : 'right-1'}`} />
              </button>
           </div>

           {financials.escrowEnabled ? (
             <div className="space-y-6 animate-in slide-in-from-top duration-500 relative z-10">
                {showEscrowInfo && (
                   <div className="p-5 bg-white/5 rounded-[1.8rem] border border-white/10 flex gap-4 relative">
                      <button onClick={() => setShowEscrowInfo(false)} className="absolute top-3 left-3 text-white/30 hover:text-white transition"><X size={14} /></button>
                      <Info size={24} className="text-blue-400 shrink-0 mt-1" />
                      <div className="space-y-2">
                         <p className="text-xs font-black text-blue-300">كيف يحميك الضمان؟</p>
                         <ul className="text-[10px] text-slate-300 space-y-1.5 font-medium pr-1">
                            <li className="flex gap-2"><span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5" /> يُودع المبلغ في حساب وسيط بنكي مؤمن.</li>
                            <li className="flex gap-2"><span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5" /> لا يُفرج عن المبلغ إلا بموافقة الطرفين أو التحقق من الإنجاز.</li>
                            <li className="flex gap-2"><span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5" /> رسوم الخدمة: ٢٪ تُضاف على الإجمالي.</li>
                         </ul>
                      </div>
                   </div>
                )}

                <div className="space-y-3">
                   <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 px-1">شروط تحرير المبالغ</p>
                   {[
                     'موافقة الطرف المستفيد يدوياً',
                     'إتمام التسليم/الخدمة (Smart Validation)',
                     'مرور فترة زمنية متفق عليها (أيام)',
                     'تحقق شرط مخصص في العقد'
                   ].map((cond, idx) => (
                     <button
                       key={idx}
                       onClick={() => toggleEscrowCondition(cond)}
                       className={`w-full p-5 rounded-2xl border text-right flex items-center justify-between transition-all active:scale-[0.98] ${
                         financials.escrowConditions.includes(cond) 
                         ? 'bg-blue-600 border-blue-500 shadow-xl' 
                         : 'bg-white/5 border-white/10 text-slate-400'
                       }`}
                     >
                        <span className="text-xs font-bold">{cond}</span>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${financials.escrowConditions.includes(cond) ? 'border-white bg-white text-blue-600' : 'border-white/10'}`}>
                           {financials.escrowConditions.includes(cond) && <CheckCircle2 size={14} />}
                        </div>
                     </button>
                   ))}
                </div>
             </div>
           ) : (
             <div className="p-5 bg-blue-50/50 rounded-[1.8rem] border border-blue-100 flex gap-4 group cursor-pointer hover:bg-blue-50 transition" onClick={() => setFinancials({...financials, escrowEnabled: true})}>
                <ShieldCheck size={24} className="text-blue-600 group-hover:scale-110 transition-transform" />
                <p className="text-[11px] text-blue-800 font-bold leading-relaxed">
                   نقترح بشدة تفعيل نظام الضمان (Escrow) لضمان جدية الطرف الآخر وحماية استثماراتك في هذا العقد.
                </p>
             </div>
           )}
        </section>

        {/* 6. Delayed Performance Penalties */}
        <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6 group hover:border-amber-200 transition">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-amber-50 text-amber-500 rounded-[1.2rem] flex items-center justify-center shadow-inner group-hover:rotate-6 transition-transform">
                    <AlertTriangle size={28} />
                 </div>
                 <div>
                    <h3 className="font-black text-sm text-slate-900">غرامات وشروط التأخير</h3>
                    <p className="text-[10px] text-slate-400 font-medium">حماية العقد من تأخيرات الطرف الثاني في التنفيذ.</p>
                 </div>
              </div>
              <button 
                onClick={() => setFinancials({...financials, latePenaltyEnabled: !financials.latePenaltyEnabled})}
                className={`w-14 h-7 rounded-full transition-all relative ${financials.latePenaltyEnabled ? 'bg-amber-500' : 'bg-slate-200'}`}
              >
                 <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all ${financials.latePenaltyEnabled ? 'right-8' : 'right-1'}`} />
              </button>
           </div>

           {financials.latePenaltyEnabled && (
             <div className="space-y-6 animate-in slide-in-from-top duration-500">
                <div className="grid grid-cols-2 gap-3 p-1 bg-slate-50 rounded-2xl">
                   <button 
                     onClick={() => setFinancials({...financials, penaltyType: 'percentage'})}
                     className={`py-3 rounded-xl text-[11px] font-black transition-all ${financials.penaltyType === 'percentage' ? 'bg-white text-amber-600 shadow-sm border border-amber-100' : 'text-slate-400 hover:text-slate-600'}`}
                   >
                      نسبة مئوية يومياً
                   </button>
                   <button 
                     onClick={() => setFinancials({...financials, penaltyType: 'fixed'})}
                     className={`py-3 rounded-xl text-[11px] font-black transition-all ${financials.penaltyType === 'fixed' ? 'bg-white text-amber-600 shadow-sm border border-amber-100' : 'text-slate-400 hover:text-slate-600'}`}
                   >
                      مبلغ ثابت يومياً
                   </button>
                </div>

                <div className="grid grid-cols-2 gap-4">
                   <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase pr-1 tracking-widest">القيمة</label>
                      <div className="relative">
                         <input 
                           type="number" 
                           value={financials.penaltyValue}
                           onChange={e => setFinancials({...financials, penaltyValue: parseFloat(e.target.value) || 0})}
                           className="w-full bg-slate-50 border-2 border-transparent rounded-[1.2rem] p-4 text-sm font-black text-amber-900 focus:bg-white focus:border-amber-400 transition outline-none"
                         />
                         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-300 font-bold">{financials.penaltyType === 'percentage' ? '%' : 'SAR'}</span>
                      </div>
                   </div>
                   <div className="space-y-1.5">
                      <label className="text-[9px] font-black text-slate-400 uppercase pr-1 tracking-widest">الحد الأقصى (Cap)</label>
                      <div className="relative">
                         <input 
                           type="number" 
                           value={financials.penaltyCap}
                           onChange={e => setFinancials({...financials, penaltyCap: parseFloat(e.target.value) || 0})}
                           className="w-full bg-slate-50 border-2 border-transparent rounded-[1.2rem] p-4 text-sm font-black text-amber-900 focus:bg-white focus:border-amber-400 transition outline-none"
                         />
                         <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] text-slate-300 font-bold">SAR</span>
                      </div>
                   </div>
                </div>
             </div>
           )}
        </section>

        {/* 7. Accepted Payment Channels */}
        <section className="space-y-4 pb-12">
           <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">وسائل السداد المقبولة</h3>
           <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'card', label: 'بطاقة ائتمان/مدى', icon: <CreditCard size={18} /> },
                { id: 'bank', label: 'تحويل بنكي', icon: <Landmark size={18} /> },
                { id: 'mobile', label: 'Apple Pay / STC Pay', icon: <Smartphone size={18} /> },
                { id: 'wallet', label: 'المحفظة الإلكترونية', icon: <Wallet size={18} /> }
              ].map(p => (
                <button
                  key={p.id}
                  onClick={() => togglePaymentMethod(p.label)}
                  className={`p-5 rounded-[1.8rem] border-2 flex items-center justify-between transition-all group active:scale-[0.98] ${
                    financials.acceptedPaymentMethods.includes(p.label) 
                    ? 'bg-blue-50 border-blue-600 text-blue-900 shadow-lg shadow-blue-100' 
                    : 'bg-white border-slate-100 text-slate-400 hover:border-slate-200'
                  }`}
                >
                   <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-xl transition-all ${financials.acceptedPaymentMethods.includes(p.label) ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-300 group-hover:text-blue-400'}`}>
                         {p.icon}
                      </div>
                      <span className="text-[11px] font-black">{p.label.split('/')[0]}</span>
                   </div>
                   <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                     financials.acceptedPaymentMethods.includes(p.label) ? 'bg-blue-600 border-blue-600 scale-110' : 'border-slate-200'
                   }`}>
                      {/* Fix: added missing Check component */}
                      {financials.acceptedPaymentMethods.includes(p.label) && <Check size={12} className="text-white" />}
                   </div>
                </button>
              ))}
           </div>
        </section>
      </div>

      {/* STICKY BOTTOM SUMMARY & ACTIONS */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/90 backdrop-blur-lg border-t z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] space-y-6">
        {/* Dynamic Detailed Financial Card */}
        <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white space-y-4 animate-in slide-in-from-bottom duration-700 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
           <div className="flex items-center justify-between border-b border-white/10 pb-3 relative z-10">
              <div className="flex items-center gap-3">
                 <Sparkles size={18} className="text-amber-400 animate-pulse" />
                 <h4 className="text-xs font-black uppercase tracking-widest text-blue-400">الملخص المالي النهائي</h4>
              </div>
              <span className="text-[8px] font-bold text-slate-500 uppercase">تحديث لحظي</span>
           </div>
           
           <div className="space-y-2.5 relative z-10">
              <div className="flex justify-between text-xs font-medium">
                 <span className="text-slate-400">القيمة الأساسية للعقد</span>
                 <span className="font-bold">{calculations.base.toLocaleString()} {financials.currency}</span>
              </div>
              {financials.vatApplicable && (
                <div className="flex justify-between text-xs font-medium">
                   <div className="flex items-center gap-2">
                      <span className="text-slate-400">الضريبة (١٥٪)</span>
                      <span className="text-[8px] font-black bg-emerald-600/20 text-emerald-400 px-2 py-0.5 rounded-full">نشط</span>
                   </div>
                   <span className="text-emerald-400 font-bold">+{calculations.vat.toLocaleString()}</span>
                </div>
              )}
              {financials.escrowEnabled && (
                <div className="flex justify-between text-xs font-medium">
                   <div className="flex items-center gap-2">
                      <span className="text-slate-400">رسوم حماية Escrow (٢٪)</span>
                      <span className="text-[8px] font-black bg-blue-600/20 text-blue-400 px-2 py-0.5 rounded-full">نشط</span>
                   </div>
                   <span className="text-blue-400 font-bold">+{calculations.escrowFee.toLocaleString()}</span>
                </div>
              )}
              
              <div className="pt-4 border-t border-white/10 flex justify-between items-center">
                 <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-tighter text-blue-400 block">إجمالي القيمة المستحقة</span>
                    <p className="text-[8px] text-slate-500 font-bold uppercase tracking-widest">{amountToWords(calculations.total)}</p>
                 </div>
                 <div className="text-right">
                    <span className="text-2xl font-black">{calculations.total.toLocaleString()}</span>
                    <span className="text-xs font-bold text-slate-400 mr-1">{financials.currency}</span>
                 </div>
              </div>
           </div>

           <div className="flex gap-2 pt-2 relative z-10 overflow-x-auto no-scrollbar scrollbar-hide">
              <span className="whitespace-nowrap px-3 py-1 bg-white/5 rounded-xl text-[9px] font-black text-slate-300 uppercase border border-white/5">طريقة الدفع: {financials.paymentMethod === 'single' ? 'دفعة واحدة' : 'مجدولة'}</span>
              <span className="whitespace-nowrap px-3 py-1 bg-white/5 rounded-xl text-[9px] font-black text-slate-300 uppercase border border-white/5">المراحل: {financials.installments.length}</span>
           </div>
        </div>

        {/* Primary Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={() => onNext(financials)}
            disabled={!isFormValid}
            className={`flex-[3] py-5 rounded-[1.8rem] font-black text-lg shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group ${
              isFormValid 
              ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' 
              : 'bg-slate-100 text-slate-300 cursor-not-allowed'
            }`}
          >
            {isFormValid && <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />}
            التالي: مراجعة العقد النهائية <ChevronLeft size={24} />
          </button>
          
          <button 
            className="flex-1 bg-slate-50 text-slate-400 rounded-[1.8rem] font-black text-[11px] hover:bg-slate-100 hover:text-blue-600 transition-all active:scale-95 flex flex-col items-center justify-center gap-1.5 border border-slate-100"
          >
            <Save size={18} /> 
            <span>حفظ مسودة</span>
          </button>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ContractFinancialTermsScreen;
