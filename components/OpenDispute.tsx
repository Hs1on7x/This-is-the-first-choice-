
import React, { useState } from 'react';
import { 
  ArrowRight, AlertTriangle, Gavel, Search, FileText, 
  Plus, Check, ChevronLeft, ShieldAlert, Sparkles,
  Bot, Clock, UserPlus, Scale, History, CheckCircle2,
  ChevronRight, ArrowUpRight
} from 'lucide-react';

interface OpenDisputeProps {
  onBack: () => void;
  onNext: (data: any, skipToDecision?: boolean) => void;
}

const OpenDispute: React.FC<OpenDisputeProps> = ({ onBack, onNext }) => {
  const [step, setStep] = useState(1);
  const [disputeType, setDisputeType] = useState<'contract' | 'general' | null>(null);
  const [selectedContract, setSelectedContract] = useState<any>(null);
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);

  // قائمة عقود تجريبية لاختيار المسار المسجل
  const myContracts = [
    { id: 'CON-123', title: 'عقد تطوير متجر إلكتروني', party: 'شركة الحلول المتكاملة', amount: '١٥,٠٠٠ ريال' },
    { id: 'CON-901', title: 'اتفاقية تقديم خدمات استشارية', party: 'فهد محمد', amount: '٥,٠٠٠ ريال' },
  ];

  const handleContractSelect = (contract: any) => {
    setSelectedContract(contract);
    setIsEvaluating(true);
    
    // محاكاة تحكيم تلقائي للعقود المسجلة
    const disputeData = {
      id: `#DISP-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'contract',
      subject: `نزاع حول: ${contract.title}`,
      description: 'تم استيراد الوقائع من تاريخ العقد والضمان (Escrow) المسجل.',
      status: 'active'
    };

    setTimeout(() => {
      setIsEvaluating(false);
      onNext(disputeData, true); // True تعني الانتقال مباشرة للقرار
    }, 2500);
  };

  const handleGeneralSubmit = () => {
    setIsEvaluating(true);
    const disputeData = {
      id: `#DISP-${Math.floor(1000 + Math.random() * 9000)}`,
      type: 'general',
      subject: subject,
      description: description,
      status: 'active'
    };
    setTimeout(() => {
      setIsEvaluating(false);
      onNext(disputeData, false); // False تعني إكمال المسار التقليدي (براهين)
    }, 2000);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-300 overflow-y-auto pb-32">
      <div className="p-4 bg-white border-b sticky top-0 z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={() => step > 1 ? setStep(1) : onBack()} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight className="text-slate-700" />
          </button>
          <h1 className="text-lg font-black text-slate-900">إجراءات النزاع</h1>
        </div>
        {isEvaluating && <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />}
      </div>

      <div className="p-6 space-y-8">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in">
             <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-900 leading-tight">كيف تود بدء النزاع؟</h2>
                <p className="text-sm text-slate-500 font-medium">اختر المسار الأنسب لحالتك القانونية.</p>
             </div>
             <div className="grid grid-cols-1 gap-4">
                <button onClick={() => { setDisputeType('contract'); setStep(2); }} className="p-6 bg-white border-2 border-slate-100 rounded-[2.5rem] text-right flex items-center gap-5 hover:border-blue-600 transition shadow-sm group">
                   <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shadow-inner shrink-0">
                      <FileText size={28} />
                   </div>
                   <div className="flex-1">
                      <h4 className="font-black text-slate-900">نزاع مرتبط بعقد مسجل</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">تحكيم تلقائي بناءً على بنود العقد والـ Smart Contracts</p>
                   </div>
                   <ChevronLeft size={20} className="text-slate-200 group-hover:text-blue-600" />
                </button>
                <button onClick={() => { setDisputeType('general'); setStep(2); }} className="p-6 bg-white border-2 border-slate-100 rounded-[2.5rem] text-right flex items-center gap-5 hover:border-red-600 transition shadow-sm group">
                   <div className="w-14 h-14 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center group-hover:bg-red-600 group-hover:text-white transition shadow-inner shrink-0">
                      <Gavel size={28} />
                   </div>
                   <div className="flex-1">
                      <h4 className="font-black text-slate-900">نزاع عام (خارج المنصة)</h4>
                      <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase">يتطلب تقديم أدلة وبراهين ودعوة الخصم يدوياً</p>
                   </div>
                   <ChevronLeft size={20} className="text-slate-200 group-hover:text-red-600" />
                </button>
             </div>
          </div>
        )}

        {step === 2 && disputeType === 'contract' && (
          <div className="space-y-6 animate-in slide-in-from-right">
             <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-900">اختر العقد المعني</h2>
                <p className="text-sm text-slate-500">سيتم استخدام بنود هذا العقد كمرجع للتحكيم التلقائي.</p>
             </div>
             <div className="space-y-3">
                {myContracts.map((c) => (
                  <button 
                    key={c.id} 
                    onClick={() => handleContractSelect(c)}
                    disabled={isEvaluating}
                    className="w-full p-5 bg-white border border-slate-100 rounded-[2rem] text-right flex items-center justify-between hover:border-blue-600 transition group shadow-sm active:scale-98"
                  >
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shadow-inner">
                         <FileText size={22} />
                      </div>
                      <div>
                         <h4 className="font-black text-slate-900 text-sm">{c.title}</h4>
                         <p className="text-[9px] text-slate-400 font-bold uppercase">{c.id} • {c.party}</p>
                      </div>
                    </div>
                    <ArrowUpRight size={18} className="text-slate-200 group-hover:text-blue-600" />
                  </button>
                ))}
             </div>
             {isEvaluating && (
               <div className="p-6 bg-blue-600 rounded-[2.5rem] text-white space-y-4 shadow-2xl animate-pulse">
                  <div className="flex items-center gap-3">
                    <Bot size={24} />
                    <h4 className="text-sm font-black uppercase">جاري التحكيم التلقائي...</h4>
                  </div>
                  <p className="text-[10px] text-blue-100 leading-relaxed">أقوم الآن بمراجعة شروط العقد، تاريخ الدفعات في الضمان، والمراسلات الموثقة لإصدار قرار الحسم.</p>
               </div>
             )}
          </div>
        )}

        {step === 2 && disputeType === 'general' && (
          <div className="space-y-6 animate-in slide-in-from-right">
             <div className="space-y-1">
                <h2 className="text-2xl font-black text-slate-900">تفاصيل النزاع العام</h2>
                <p className="text-sm text-slate-500">سيقوم الذكاء الاصطناعي بتحليل الموقف قبل بدء المواجهة.</p>
             </div>
             <div className="space-y-4">
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">موضوع النزاع</label>
                   <input 
                     type="text" 
                     value={subject}
                     onChange={e => setSubject(e.target.value)}
                     className="w-full bg-white border-2 border-slate-100 rounded-2xl p-5 text-sm font-black focus:border-blue-600 outline-none transition shadow-inner"
                     placeholder="مثال: مطالبة مالية لخدمة غير مكتملة"
                   />
                </div>
                <div className="space-y-2">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">شرح الوقائع</label>
                   <textarea 
                     rows={6}
                     value={description}
                     onChange={e => setDescription(e.target.value)}
                     className="w-full bg-white border-2 border-slate-100 rounded-[2rem] p-6 text-xs font-medium leading-relaxed focus:border-blue-600 outline-none transition shadow-inner resize-none"
                     placeholder="اذكر التفاصيل، التواريخ، والمبالغ..."
                   />
                </div>
                <button 
                  onClick={handleGeneralSubmit}
                  disabled={!subject || description.length < 20 || isEvaluating}
                  className="w-full py-5 bg-blue-600 text-white rounded-[1.8rem] font-black text-lg shadow-xl shadow-blue-200 active:scale-95 transition flex items-center justify-center gap-3 overflow-hidden"
                >
                   {isEvaluating ? (
                     <><div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" /> التحليل القانوني...</>
                   ) : (
                     <><Sparkles size={24} /> بدء تقييم الموقف</>
                   )}
                </button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OpenDispute;
