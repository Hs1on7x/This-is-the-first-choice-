
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, Download, Printer, 
  Search, ZoomIn, ZoomOut, ChevronDown, List, CreditCard, 
  Paperclip, Info, AlertTriangle, Sparkles, Bot, Clock, 
  // Added Users to imports
  Lock, Save, ChevronLeft, User, Users, FileText, Landmark, Check, X,
  ExternalLink, Eye, History
} from 'lucide-react';
import { ContractDraft } from '../types';

interface ContractFinalReviewProps {
  draft: ContractDraft;
  onBack: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
}

const ContractFinalReview: React.FC<ContractFinalReviewProps> = ({ draft, onBack, onNext, onSaveDraft }) => {
  const [checklist, setChecklist] = useState({
    readFull: false,
    understoodTerms: false,
    reviewedFinancials: false,
    verifiedAttachments: false,
    agreedEscrow: false,
    noObjections: false
  });

  const [password, setPassword] = useState('');
  const [isAiChecking, setIsAiChecking] = useState(true);
  const [aiScore, setAiScore] = useState(0);
  const [finalConsent, setFinalConsent] = useState(false);
  const [showSummary, setShowSummary] = useState<string | null>('parties');

  const checklistItems = [
    { id: 'readFull', label: 'قرأت العقد كاملاً' },
    { id: 'understoodTerms', label: 'فهمت جميع البنود' },
    { id: 'reviewedFinancials', label: 'راجعت الشروط المالية' },
    { id: 'verifiedAttachments', label: 'تحققت من المرفقات' },
    { id: 'agreedEscrow', label: 'موافق على شروط Escrow' },
    { id: 'noObjections', label: 'لا اعتراض على أي بند' }
  ];

  const checkedCount = Object.values(checklist).filter(Boolean).length;
  const progressPercent = (checkedCount / checklistItems.length) * 100;

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsAiChecking(false);
      setAiScore(95);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const isFormValid = checkedCount === checklistItems.length && finalConsent && password.length >= 4;

  const summaryCards = [
    {
      id: 'parties',
      title: 'أطراف العقد',
      icon: <Users size={18} />,
      content: (
        <div className="space-y-3 pt-2">
          {draft.parties.map((p, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-slate-50 rounded-2xl border border-slate-100">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-blue-600 shadow-sm">
                {i === 0 ? <User size={20} /> : <Landmark size={20} />}
              </div>
              <div>
                <p className="text-[10px] font-black text-blue-600 uppercase tracking-tighter">{p.role}</p>
                <p className="text-xs font-bold text-slate-800">{p.name}</p>
                <p className="text-[8px] font-bold text-slate-400 uppercase">{p.email || '1010XXXXXX'}</p>
              </div>
            </div>
          ))}
        </div>
      )
    },
    {
      id: 'subject',
      title: 'موضوع العقد',
      icon: <FileText size={18} />,
      content: (
        <div className="space-y-2 pt-2 text-[11px]">
          <div className="flex justify-between">
            <span className="text-slate-400">النوع:</span>
            <span className="font-bold text-slate-700">{draft.type}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">الوصف:</span>
            <span className="font-bold text-slate-700">تطوير منصة قانونية</span>
          </div>
          <div className="flex justify-between">
            <span className="text-slate-400">المدة:</span>
            <span className="font-bold text-slate-700">٣ أشهر</span>
          </div>
        </div>
      )
    },
    {
      id: 'financial',
      title: 'الشروط المالية',
      icon: <CreditCard size={18} />,
      content: (
        <div className="space-y-2 pt-2">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400">القيمة الإجمالية:</span>
            <span className="font-black text-slate-900">٥٠,٠٠٠ ريال</span>
          </div>
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-400 text-[10px]">الضريبة (١٥٪):</span>
            <span className="font-bold text-emerald-600">٧,٥٠٠ ريال</span>
          </div>
          <div className="pt-2 border-t border-slate-100 flex justify-between items-center">
            <span className="text-blue-600 font-black text-sm">الإجمالي المستحق</span>
            <span className="text-blue-600 font-black text-sm">٥٧,٥٠٠ ريال</span>
          </div>
          <div className="flex items-center gap-2 mt-2 bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">
            <ShieldCheck size={12} className="text-blue-600" />
            <span className="text-[9px] font-black text-blue-700 uppercase">نظام Escrow نشط</span>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-500 overflow-y-auto pb-48">
      {/* Sticky Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-40 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight className="text-slate-700" />
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-900">المراجعة النهائية</h1>
            <p className="text-[10px] text-amber-600 font-bold uppercase tracking-widest flex items-center gap-1">
               <AlertTriangle size={10} /> خطوة أخيرة قبل التوقيع
            </p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* PDF / Document Viewer Simulation */}
        <section className="space-y-3">
           <div className="flex items-center justify-between px-1">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <FileText size={14} /> نسخة العقد الرسمية
              </h3>
              <div className="flex gap-2">
                 <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 transition shadow-sm"><ZoomIn size={14} /></button>
                 <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 transition shadow-sm"><ZoomOut size={14} /></button>
                 <button className="p-1.5 bg-white border border-slate-200 rounded-lg text-slate-400 hover:text-blue-600 transition shadow-sm"><Download size={14} /></button>
              </div>
           </div>
           
           <div className="bg-white rounded-[2rem] border-[6px] border-slate-200 shadow-2xl overflow-hidden relative">
              <div className="h-[450px] overflow-y-auto custom-scrollbar p-10 font-serif leading-[2.2] text-slate-800 text-sm select-none relative">
                 <div className="absolute inset-0 bg-gradient-to-b from-white/0 via-white/0 to-white/20 pointer-events-none" />
                 <div className="text-center mb-12 border-b pb-8">
                    <h2 className="text-2xl font-black text-slate-900 mb-2">عقد {draft.type || 'خدمات'}</h2>
                    <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.2em]">وثيقة رقم #2024-001234</p>
                 </div>
                 
                 <div className="space-y-6">
                    <p><span className="font-black">الديباجة:</span> إنه في يوم الأحد الموافق ٢٠٢٤/١٢/٣٠م، تم الاتفاق والتعاقد بين كل من:</p>
                    <p><span className="font-bold">١. الطرف الأول:</span> {draft.parties[0]?.name}، ويشار إليه في هذا العقد بـ (المقاول/المنفذ).</p>
                    <p><span className="font-bold">٢. الطرف الثاني:</span> {draft.parties[1]?.name}، ويشار إليه في هذا العقد بـ (العميل/المستفيد).</p>
                    <p><span className="font-black text-base">البند الأول: موضوع العقد</span><br />
                    اتفق الطرفان على قيام الطرف الأول بتقديم خدمات تطوير المنصة القانونية الرقمية وفقاً للمعايير الفنية والتقنية الموضحة في الملحق رقم (١) المرفق بهذا العقد.</p>
                    <p><span className="font-black text-base">البند الثاني: القيمة والضمان المالي</span><br />
                    القيمة الإجمالية للعقد هي ٥٠,٠٠٠ ريال سعودي غير شاملة ضريبة القيمة المضافة. يتم حجز المبالغ عبر نظام "الضمان المالي" (Escrow) التابع للمنصة ولا يتم الإفراج عنها إلا بإتمام مراحل التسليم الموضحة.</p>
                    <p>...</p>
                    <p className="text-slate-300 text-xs italic text-center pb-12">-- نهاية معاينة الصفحة الأولى --</p>
                 </div>
              </div>
              <div className="bg-slate-50 border-t border-slate-100 p-3 text-center flex justify-center items-center gap-4">
                 <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">الصفحة ١ من ٥</span>
                 <div className="w-12 h-1 bg-blue-600 rounded-full" />
                 <div className="w-12 h-1 bg-slate-200 rounded-full" />
                 <div className="w-12 h-1 bg-slate-200 rounded-full" />
              </div>
           </div>
        </section>

        {/* Mandatory Checklist */}
        <section className="bg-blue-600 p-7 rounded-[2.5rem] text-white shadow-2xl space-y-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-48 h-48 bg-white/5 rounded-full -mr-24 -mt-24 blur-3xl" />
           <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                 <CheckCircle2 size={24} className="text-blue-200" />
                 <h3 className="font-black text-sm uppercase tracking-widest">قائمة المراجعة الإلزامية</h3>
              </div>
              <span className="text-[10px] font-black bg-white/20 px-3 py-1 rounded-full">{checkedCount}/6</span>
           </div>

           <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden relative z-10">
              <div className="h-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.5)] transition-all duration-700" style={{ width: `${progressPercent}%` }} />
           </div>

           <div className="grid grid-cols-1 md:grid-cols-2 gap-3 relative z-10">
              {checklistItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setChecklist(prev => ({ ...prev, [item.id]: !prev[item.id as keyof typeof checklist] }))}
                  className={`flex items-center gap-3 p-4 rounded-2xl transition-all border group ${
                    checklist[item.id as keyof typeof checklist] 
                    ? 'bg-white text-blue-600 border-white shadow-xl shadow-blue-900/30' 
                    : 'bg-white/5 border-white/10 text-blue-100 hover:bg-white/10'
                  }`}
                >
                   <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                     checklist[item.id as keyof typeof checklist] ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/20 group-hover:border-white/40'
                   }`}>
                      {checklist[item.id as keyof typeof checklist] && <Check size={14} />}
                   </div>
                   <span className="text-[11px] font-bold text-right leading-none">{item.label}</span>
                </button>
              ))}
           </div>
        </section>

        {/* AI Final Check Results */}
        <section className={`p-8 rounded-[3rem] text-white shadow-2xl space-y-6 relative overflow-hidden transition-all duration-1000 ${
           isAiChecking ? 'bg-indigo-600' : 'bg-slate-900'
        }`}>
           <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
           
           <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-white/10 rounded-[1.2rem] flex items-center justify-center backdrop-blur-xl shrink-0">
                    <Bot size={32} className={isAiChecking ? 'animate-bounce' : 'text-blue-400'} />
                 </div>
                 <div>
                    <h3 className="font-black text-sm uppercase tracking-widest">فحص الجودة بـ AI</h3>
                    <p className="text-[10px] text-slate-400 font-medium">{isAiChecking ? 'جاري التحقق من الصياغة...' : 'اكتمل التدقيق بنجاح'}</p>
                 </div>
              </div>
              {!isAiChecking && (
                <div className="text-right">
                   <span className="text-4xl font-black text-blue-400">{aiScore}</span>
                   <span className="text-[9px] font-black text-slate-500 uppercase block">/ ١٠٠</span>
                </div>
              )}
           </div>

           {isAiChecking ? (
             <div className="space-y-4 relative z-10 py-4">
                <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                   <div className="h-full bg-blue-400 animate-[loading_3s_linear_infinite]" />
                </div>
                <p className="text-center text-[10px] text-indigo-200 font-bold animate-pulse">يتم مطابقة البنود مع الأنظمة السعودية الحديثة...</p>
                <style>{`@keyframes loading { 0% { transform: translateX(100%); } 100% { transform: translateX(-100%); } }`}</style>
             </div>
           ) : (
             <div className="space-y-6 relative z-10 animate-in zoom-in duration-500">
                <div className="space-y-3">
                   <div className="flex items-center gap-2 text-emerald-400 font-black text-xs">
                      <CheckCircle2 size={16} /> العقد جاهز للتوقيع بنسبة عالية جداً
                   </div>
                   <ul className="text-[10px] text-slate-400 space-y-2.5 pr-1">
                      <li className="flex gap-3"><span className="w-1 h-1 bg-emerald-500 rounded-full mt-1.5 shrink-0" /> جميع الأركان القانونية متوفرة في العقد.</li>
                      <li className="flex gap-3"><span className="w-1 h-1 bg-emerald-500 rounded-full mt-1.5 shrink-0" /> توافق تام مع نظام المعاملات المدنية السعودي.</li>
                      <li className="flex gap-3"><span className="w-1 h-1 bg-emerald-500 rounded-full mt-1.5 shrink-0" /> حماية متكاملة للأطراف في بند "القوة القاهرة".</li>
                   </ul>
                </div>

                <div className="p-5 bg-blue-500/10 border border-blue-500/20 rounded-[1.8rem] space-y-3">
                   <div className="flex items-center gap-2 text-blue-300">
                      <Sparkles size={16} />
                      <p className="text-[10px] font-black uppercase">ملاحظة ذكية متبقية</p>
                   </div>
                   <p className="text-[10px] text-slate-200 leading-relaxed">
                     "يُنصح بإضافة <span className="font-black text-amber-300">رقم الهاتف الموثق</span> للطرف الثاني في بند المراسلات لضمان سرعة التبليغ الرسمي."
                   </p>
                   <div className="flex gap-2 pt-1">
                      <button className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-[9px] font-black shadow-lg active:scale-95 transition">إضافة الآن</button>
                      <button className="flex-1 py-2.5 bg-white/5 text-slate-400 rounded-xl text-[9px] font-black hover:bg-white/10 transition">تجاهل</button>
                   </div>
                </div>
             </div>
           )}
        </section>

        {/* Summary Info Cards */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-1">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ملخص البيانات الجوهرية</h3>
              <button className="text-[9px] font-black text-blue-600 uppercase hover:underline flex items-center gap-1">
                 عرض الكل <ChevronLeft size={10} />
              </button>
           </div>
           
           <div className="space-y-3">
              {summaryCards.map((card) => (
                <div key={card.id} className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden transition-all">
                  <button 
                    onClick={() => setShowSummary(showSummary === card.id ? null : card.id)}
                    className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition text-right"
                  >
                     <div className="flex items-center gap-4">
                        <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center transition-colors group-hover:text-blue-600">
                           {card.icon}
                        </div>
                        <h4 className="font-black text-slate-900 text-sm">{card.title}</h4>
                     </div>
                     <ChevronDown size={18} className={`text-slate-300 transition-transform ${showSummary === card.id ? 'rotate-180' : ''}`} />
                  </button>
                  {showSummary === card.id && (
                    <div className="px-5 pb-5 animate-in slide-in-from-top-2 duration-300">
                       {card.content}
                    </div>
                  )}
                </div>
              ))}

              {/* Attachments Card (Custom) */}
              <div className="bg-white rounded-3xl border border-slate-100 shadow-sm p-5 space-y-4">
                 <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                    <div className="flex items-center gap-4">
                       <div className="w-10 h-10 bg-slate-50 text-slate-400 rounded-xl flex items-center justify-center">
                          <Paperclip size={18} />
                       </div>
                       <h4 className="font-black text-slate-900 text-sm">المرفقات (٥)</h4>
                    </div>
                    <ExternalLink size={16} className="text-slate-300" />
                 </div>
                 <div className="space-y-2">
                    {['عرض_السعر.pdf', 'المواصفات_التقنية.docx'].map((file, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-slate-50 rounded-2xl group cursor-pointer hover:bg-blue-50 transition">
                         <div className="flex items-center gap-3">
                            <FileText size={16} className="text-slate-400 group-hover:text-blue-600" />
                            <span className="text-[10px] font-bold text-slate-700">{file}</span>
                         </div>
                         <Eye size={14} className="text-slate-300 group-hover:text-blue-600" />
                      </div>
                    ))}
                    <button className="w-full py-2 text-[10px] font-black text-blue-600 uppercase">عرض جميع المرفقات</button>
                 </div>
              </div>
           </div>
        </section>

        {/* Important Notices */}
        <section className="bg-amber-50 p-6 rounded-[2.5rem] border border-amber-100 space-y-4">
           <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle size={20} />
              <h4 className="font-black text-sm uppercase tracking-widest">تنبيهات قانونية هامة</h4>
           </div>
           <ul className="space-y-3 text-[10px] text-amber-900 font-medium leading-relaxed pr-1">
              <li className="flex gap-3"><span className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 shrink-0" /> بعد التوقيع، لا يمكن تعديل العقد إلا بموافقة صريحة من جميع الأطراف.</li>
              <li className="flex gap-3"><span className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 shrink-0" /> العقد ملزم قانونياً ويُسجل كوثيقة رسمية بموجب نظام التعاملات الإلكترونية.</li>
              <li className="flex gap-3"><span className="w-1 h-1 bg-amber-500 rounded-full mt-1.5 shrink-0" /> سيتم حفظ نسخة العقد في <span className="font-black">Blockchain</span> لضمان الحماية من التلاعب.</li>
           </ul>
        </section>

        {/* Changes History Summary */}
        <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                 <History size={18} className="text-blue-500" />
                 <h4 className="font-black text-slate-900 text-sm">ملخص التعديلات</h4>
              </div>
              <span className="text-[9px] font-black bg-blue-50 text-blue-600 px-2 py-0.5 rounded uppercase">٨ تعديلات متفق عليها</span>
           </div>
           <div className="space-y-3">
              <div className="flex gap-3 items-start p-3 bg-slate-50 rounded-2xl">
                 <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-[10px] font-black text-slate-400">٣</div>
                 <p className="text-[10px] text-slate-600 leading-relaxed">تغيير مبلغ العقد من ٤٥,٠٠٠ ريال إلى <span className="font-black text-slate-900 underline decoration-emerald-300">٥٠,٠٠٠ ريال</span>.</p>
              </div>
              <div className="flex gap-3 items-start p-3 bg-slate-50 rounded-2xl">
                 <div className="w-6 h-6 rounded-lg bg-white flex items-center justify-center text-[10px] font-black text-slate-400">٥</div>
                 <p className="text-[10px] text-slate-600 leading-relaxed">تعديل الجدول الزمني للتسليم ليكون ٣ أشهر بدلاً من شهرين.</p>
              </div>
              <button className="w-full text-center text-[9px] font-black text-blue-600 uppercase tracking-widest hover:underline">عرض سجل المفاوضات الكامل</button>
           </div>
        </section>

        {/* Final Signatures Status */}
        <section className="space-y-3">
           <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">✍️ حالة التوقيعات المطلوبة</h4>
           <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden">
              <table className="w-full text-right text-[11px]">
                 <thead className="bg-slate-50 border-b border-slate-100">
                    <tr>
                       <th className="p-4 font-black text-slate-400 uppercase">الطرف</th>
                       <th className="p-4 font-black text-slate-400 uppercase text-left">الحالة</th>
                    </tr>
                 </thead>
                 <tbody className="divide-y divide-slate-50">
                    <tr>
                       <td className="p-4 font-bold text-slate-900">أحمد السعيد (أنت)</td>
                       <td className="p-4 text-left"><span className="px-3 py-1 bg-amber-50 text-amber-600 rounded-lg font-black text-[9px] uppercase tracking-tighter shadow-sm border border-amber-100 inline-flex items-center gap-1"><Clock size={10} /> بانتظار توقيعك</span></td>
                    </tr>
                    <tr>
                       <td className="p-4 font-bold text-slate-900">شركة النجاح للتقنية</td>
                       <td className="p-4 text-left"><span className="px-3 py-1 bg-slate-50 text-slate-400 rounded-lg font-black text-[9px] uppercase tracking-tighter inline-flex items-center gap-1"><Clock size={10} /> بانتظار توقيعهم</span></td>
                    </tr>
                 </tbody>
              </table>
           </div>
        </section>

        {/* Final Confirmation & Password Input */}
        <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-xl space-y-8 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 blur-2xl" />
           <label className="flex items-start gap-4 cursor-pointer group relative z-10">
              <div className={`mt-1 w-7 h-7 rounded-xl border-2 flex items-center justify-center shrink-0 transition-all ${
                finalConsent ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-200' : 'border-slate-200 group-hover:border-blue-400'
              }`}>
                 <input type="checkbox" className="hidden" checked={finalConsent} onChange={e => setFinalConsent(e.target.checked)} />
                 {finalConsent && <Check size={18} />}
              </div>
              <div className="flex-1 space-y-1.5">
                 <p className="text-sm font-black text-slate-900">أقر بموجب هذا بأنني قرأت العقد كاملاً وأوافق على الالتزام بما ورد فيه</p>
                 <p className="text-[10px] text-slate-500 leading-relaxed font-medium">أدرك أن التوقيع الرقمي التالي هو توقيع ملزم قانوناً بموجب الأنظمة السعودية والاتفاقيات الرقمية الدولية.</p>
              </div>
           </label>

           <div className="space-y-3 relative z-10">
              <div className="flex justify-between items-center px-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Lock size={14} className="text-blue-500" /> أدخل كلمة المرور للتأكيد
                 </label>
                 <button className="text-[9px] font-black text-blue-600 hover:underline">نسيت كلمة المرور؟</button>
              </div>
              <div className="relative group">
                 <input 
                   type="password" 
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   placeholder="••••••••"
                   className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-center text-xl font-black focus:bg-white focus:border-blue-600 outline-none transition shadow-inner"
                 />
                 <div className="absolute left-6 top-1/2 -translate-y-1/2 flex items-center gap-2 opacity-0 group-focus-within:opacity-100 transition-opacity">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.2s]" />
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce [animation-delay:0.4s]" />
                 </div>
              </div>
           </div>
        </section>
      </div>

      {/* Action Buttons Footer */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] space-y-4">
         <div className="flex gap-3">
            <button 
              onClick={onNext}
              disabled={!isFormValid}
              className={`flex-[3] py-5 rounded-[1.8rem] font-black text-lg shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group ${
                isFormValid 
                ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' 
                : 'bg-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
               {isFormValid && <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />}
               المتابعة للتوقيع <ChevronLeft size={24} />
            </button>
            <button 
              onClick={onSaveDraft}
              className="flex-1 bg-slate-50 text-slate-400 rounded-[1.8rem] font-black text-[11px] hover:bg-slate-100 hover:text-blue-600 transition-all active:scale-95 border border-slate-100 flex flex-col items-center justify-center gap-1"
            >
               <Save size={18} />
               <span>حفظ لاحقاً</span>
            </button>
         </div>
         <button onClick={onBack} className="w-full text-center text-[10px] font-black text-slate-300 uppercase tracking-widest hover:text-blue-600 transition py-2">العودة لتعديل البنود</button>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default ContractFinalReview;
