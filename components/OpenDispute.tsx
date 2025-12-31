
import React, { useState } from 'react';
import { 
  ArrowRight, AlertTriangle, CheckCircle2, ChevronLeft, 
  ChevronDown, Gavel, Search, Users, Calendar, 
  DollarSign, FileText, Paperclip, Sparkles, Bot, 
  Trash2, Plus, Info, Lock, Save, ShieldAlert, Check,
  List, History, X, ShieldCheck, UserPlus, Target
} from 'lucide-react';

interface OpenDisputeProps {
  onBack: () => void;
  onConsult: () => void;
  onSubmit: () => void;
}

const OpenDispute: React.FC<OpenDisputeProps> = ({ onBack, onConsult, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [acceptedWarning, setAcceptedWarning] = useState(false);
  const [selectedContract, setSelectedContract] = useState('1234');
  const [category, setCategory] = useState('');
  const [subject, setSubject] = useState('');
  const [description, setDescription] = useState('');
  const [isFinancial, setIsFinancial] = useState(false);
  const [amount, setAmount] = useState('');
  const [timelineEvents, setTimelineEvents] = useState([{ id: Date.now().toString(), date: '', event: '' }]);
  const [selectedClauses, setSelectedClauses] = useState<string[]>([]);
  const [evidenceFiles, setEvidenceFiles] = useState<string[]>([]);
  const [finalConfirm, setFinalConfirm] = useState(false);
  const [password, setPassword] = useState('');

  const contracts = [
    { id: '1234', name: 'عقد خدمات - تطوير موقع', code: '#2024-001234' },
    { id: '1100', name: 'عقد إيجار - شقة الرياض', code: '#2024-001100' }
  ];

  const categories = [
    'عدم تنفيذ الالتزامات', 'جودة الخدمة/المنتج', 'تأخير في التسليم', 
    'عدم الدفع', 'خرق شروط العقد', 'سوء فهم البنود', 'إنهاء غير قانوني', 'أخرى'
  ];

  const contractClauses = [
    { id: '5', title: 'البند 5: الجدول الزمني' },
    { id: '7', title: 'البند 7: جودة العمل' },
    { id: '9', title: 'البند 9: الغرامات' },
    { id: '12', title: 'البند 12: إنهاء العقد' }
  ];

  const toggleClause = (id: string) => {
    setSelectedClauses(prev => prev.includes(id) ? prev.filter(c => c !== id) : [...prev, id]);
  };

  const addEvent = () => setTimelineEvents([...timelineEvents, { id: Date.now().toString(), date: '', event: '' }]);
  
  const removeEvent = (id: string) => {
    if (timelineEvents.length <= 1) return;
    setTimelineEvents(timelineEvents.filter(e => e.id !== id));
  };

  const updateEvent = (id: string, field: 'date' | 'event', val: string) => {
    setTimelineEvents(prev => prev.map(e => e.id === id ? { ...e, [field]: val } : e));
  };

  const simulateUpload = () => {
    const fileName = `دليل_إثبات_${evidenceFiles.length + 1}.pdf`;
    setEvidenceFiles([...evidenceFiles, fileName]);
  };

  const isStep1Valid = acceptedWarning && selectedContract;
  const isStep2Valid = category && subject.length > 5 && description.length >= 10; // Simplified for demo
  const isStep3Valid = selectedClauses.length > 0 && timelineEvents.some(e => e.date && e.event);
  const isFinalValid = isStep1Valid && isStep2Valid && isStep3Valid && finalConfirm && password.length >= 4;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-300 overflow-y-auto pb-48">
      {/* Header Wizard Nav */}
      <div className="bg-white p-4 sticky top-0 z-40 shadow-sm border-b">
        <div className="flex items-center justify-between mb-4 px-1">
           <div className="flex items-center gap-3">
              <button onClick={() => step > 1 ? setStep(step - 1) : onBack()} className="p-2 hover:bg-slate-100 rounded-full transition">
                 <ArrowRight className="text-slate-700" />
              </button>
              <div>
                 <h1 className="text-lg font-black text-slate-900 leading-tight">فتح نزاع قانوني</h1>
                 <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">المرحلة {step} من ٣</p>
              </div>
           </div>
           <div className="flex gap-1.5">
              {[1, 2, 3].map(s => (
                <div key={s} className={`w-10 h-1.5 rounded-full transition-all duration-700 ${s <= step ? 'bg-blue-600 shadow-sm shadow-blue-200' : 'bg-slate-100'}`} />
              ))}
           </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {step === 1 && (
          <div className="space-y-8 animate-in fade-in duration-500">
             {/* Critical Warnings Card */}
             <section className="bg-red-50 p-7 rounded-[2.5rem] border border-red-100 space-y-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-red-100/50 rounded-full -mr-16 -mt-16 blur-2xl" />
                <div className="flex items-center gap-4 text-red-600 relative z-10">
                   <ShieldAlert size={32} className="animate-pulse" />
                   <h3 className="font-black text-sm uppercase tracking-widest">تنبيهات جوهرية قبل البدء</h3>
                </div>
                <div className="space-y-4 relative z-10">
                   <div className="p-5 bg-white/60 rounded-3xl border border-white flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 shadow-sm" />
                      <p className="text-[11px] text-red-900 font-bold leading-relaxed">فتح النزاع سيقوم بـ <span className="underline decoration-red-400 underline-offset-4 font-black">تجميد المبالغ المالية</span> في نظام Escrow فوراً لحين الحل.</p>
                   </div>
                   <div className="p-5 bg-white/60 rounded-3xl border border-white flex gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-500 mt-2 shrink-0 shadow-sm" />
                      <p className="text-[11px] text-red-900 font-bold leading-relaxed">سيتم إخطار الطرف الآخر رسمياً ببدء إجراءات فض النزاع وتزويده بصورة من هذا الطلب.</p>
                   </div>
                </div>
                <label className="flex items-center gap-4 cursor-pointer group relative z-10 pt-2">
                   <div className={`w-7 h-7 rounded-xl border-2 flex items-center justify-center transition-all shadow-sm ${acceptedWarning ? 'bg-red-600 border-red-600 text-white' : 'border-red-200 bg-white group-hover:border-red-400'}`}>
                      <input type="checkbox" className="hidden" checked={acceptedWarning} onChange={e => setAcceptedWarning(e.target.checked)} />
                      {acceptedWarning && <Check size={18} />}
                   </div>
                   <span className="text-xs font-black text-red-900">أقر بفهمي للتبعات القانونية والمالية لهذا الإجراء</span>
                </label>
             </section>

             {/* Contract List Selection */}
             <section className="space-y-4">
                <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 flex items-center gap-2">
                   <FileText size={14} className="text-blue-500" /> اختر العقد موضوع النزاع
                </h3>
                <div className="grid grid-cols-1 gap-3">
                   {contracts.map(c => (
                     <button
                       key={c.id}
                       onClick={() => setSelectedContract(c.id)}
                       className={`p-6 rounded-[2.2rem] border-2 text-right transition-all flex items-center gap-5 group relative ${selectedContract === c.id ? 'border-blue-600 bg-white shadow-2xl ring-4 ring-blue-50' : 'border-white bg-white hover:border-slate-100 shadow-sm'}`}
                     >
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${selectedContract === c.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-200' : 'bg-slate-50 text-slate-400'}`}>
                           <FileText size={28} />
                        </div>
                        <div className="flex-1 overflow-hidden">
                           <h4 className="text-sm font-black text-slate-900 leading-tight truncate">{c.name}</h4>
                           <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-widest">{c.code}</p>
                        </div>
                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${selectedContract === c.id ? 'bg-blue-600 border-blue-600 scale-110' : 'border-slate-100'}`}>
                           {selectedContract === c.id && <Check size={14} className="text-white" />}
                        </div>
                     </button>
                   ))}
                   <button className="text-[10px] font-black text-blue-600 uppercase hover:underline text-center py-4 flex items-center justify-center gap-2">
                      <Plus size={14} /> نزاع عام غير مرتبط بعقد مسجل
                   </button>
                </div>
             </section>

             {/* Consultation Callout */}
             <div className="bg-indigo-600 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full -mr-24 -mt-24 blur-3xl group-hover:scale-125 transition-transform duration-1000" />
                <div className="flex flex-col md:flex-row gap-6 relative z-10">
                   <div className="w-16 h-16 bg-white/20 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md shrink-0 border border-white/5 shadow-2xl group-hover:rotate-12 transition-transform">
                      <Bot size={36} className="text-amber-300" />
                   </div>
                   <div className="space-y-4">
                      <div className="space-y-1">
                         <h4 className="text-xs font-black uppercase tracking-widest text-indigo-100">تحتاج لتقييم الموقف?</h4>
                         <p className="text-[11px] text-white/80 leading-relaxed font-medium">استشر محامياً متخصصاً قبل المتابعة لزيادة احتمالية نجاحك في كسب النزاع وصياغة المطالب بدقة نظامية.</p>
                      </div>
                      <button onClick={onConsult} className="bg-white text-indigo-600 px-8 py-3 rounded-xl text-[10px] font-black shadow-xl shadow-indigo-900/40 active:scale-95 transition-all hover:translate-y-[-2px]">
                         تحدث مع محامٍ الآن
                      </button>
                   </div>
                </div>
             </div>

             <button 
               onClick={() => setStep(2)}
               disabled={!isStep1Valid}
               className={`w-full py-5 rounded-[1.8rem] font-black text-lg shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 ${isStep1Valid ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
             >
                المتابعة لتفاصيل الحالة <ChevronLeft size={24} />
             </button>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-8 animate-in fade-in duration-500">
             <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8">
                <div className="space-y-2 px-1">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <List size={14} className="text-blue-500" /> تصنيف النزاع
                   </label>
                   <div className="grid grid-cols-2 gap-2">
                      {categories.slice(0, 4).map(cat => (
                        <button key={cat} onClick={() => setCategory(cat)} className={`p-4 rounded-2xl border text-[10px] font-black text-center transition-all ${category === cat ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-50 border-transparent text-slate-500 hover:border-blue-200 hover:bg-white'}`}>
                           {cat}
                        </button>
                      ))}
                      <div className="col-span-2 relative group">
                         <select 
                           onChange={(e) => setCategory(e.target.value)} 
                           className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-4 pr-10 text-[11px] font-black outline-none focus:bg-white focus:border-blue-600 shadow-inner transition appearance-none"
                         >
                            <option value="">أخرى (اختر من القائمة الكاملة)...</option>
                            {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                         </select>
                         <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none group-focus-within:text-blue-600 transition" size={16} />
                      </div>
                   </div>
                </div>

                <div className="space-y-2 px-1">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <FileText size={14} className="text-blue-500" /> موضوع النزاع الرئيسي
                   </label>
                   <input 
                     type="text" 
                     placeholder="مثال: تأخير في تسليم المخرجات التقنية"
                     value={subject}
                     onChange={e => setSubject(e.target.value)}
                     className="w-full bg-slate-50 border border-slate-100 rounded-2xl p-5 text-sm font-black focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none shadow-inner transition"
                   />
                </div>

                <div className="space-y-2 px-1">
                   <div className="flex justify-between items-center mb-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                         <FileText size={14} className="text-blue-500" /> شرح الوقائع والادعاءات
                      </label>
                      <span className={`text-[9px] font-black px-2 py-0.5 rounded-full uppercase ${description.length < 100 ? 'text-amber-500 bg-amber-50' : 'text-emerald-500 bg-emerald-50'}`}>
                         {description.length} / ١٠٠ حرف
                      </span>
                   </div>
                   <textarea 
                     rows={6}
                     value={description}
                     onChange={e => setDescription(e.target.value)}
                     placeholder="اشرح بوضوح: ما الذي حدث؟ متى حدث؟ وما هو البند الذي تم خرقه؟ وما هي مطالبك المباشرة؟"
                     className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] p-6 text-xs font-medium leading-[2] focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none shadow-inner transition resize-none placeholder:text-slate-300"
                   />
                </div>

                <div className={`p-6 rounded-[2.5rem] border-2 transition-all space-y-6 relative overflow-hidden ${isFinancial ? 'bg-slate-900 border-blue-600 text-white shadow-2xl' : 'bg-slate-50 border-transparent text-slate-900 shadow-inner'}`}>
                   <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-4">
                         <div className={`w-14 h-14 rounded-[1.2rem] flex items-center justify-center transition-all duration-500 ${isFinancial ? 'bg-blue-600 text-white shadow-xl shadow-blue-900' : 'bg-white text-slate-300'}`}>
                            <DollarSign size={28} />
                         </div>
                         <div>
                            <h3 className="font-black text-sm">المطالبة المالية</h3>
                            <p className="text-[10px] text-slate-400 font-medium">هل يتضمن النزاع مستحقات أو غرامات مالية؟</p>
                         </div>
                      </div>
                      <button 
                        onClick={() => setIsFinancial(!isFinancial)}
                        className={`w-14 h-7 rounded-full transition-all relative ${isFinancial ? 'bg-blue-600 shadow-lg' : 'bg-slate-200'}`}
                      >
                         <div className={`absolute top-1 w-5 h-5 bg-white rounded-full transition-all duration-300 ${isFinancial ? 'right-8' : 'right-1'}`} />
                      </button>
                   </div>
                   
                   {isFinancial && (
                     <div className="space-y-6 pt-4 border-t border-white/5 animate-in slide-in-from-top duration-500 relative z-10">
                        <div className="space-y-2">
                           <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest px-2">إجمالي المبلغ المطالب به (SAR)</label>
                           <div className="relative group">
                              <input 
                                type="number" 
                                value={amount}
                                onChange={e => setAmount(e.target.value)}
                                className="w-full bg-white/5 border border-white/10 rounded-2xl p-5 text-3xl font-black text-blue-400 text-center outline-none focus:border-blue-500 transition shadow-inner"
                                placeholder="0.00"
                              />
                              <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-500 font-black">ريال</span>
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                           <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                              <p className="text-[8px] font-black text-slate-500 uppercase">قيمة العقد الأصلية</p>
                              <p className="text-xs font-black">٢٨,٧٥٠ ريال</p>
                           </div>
                           <div className="p-4 bg-white/5 rounded-2xl border border-white/5 space-y-1">
                              <p className="text-[8px] font-black text-amber-400 uppercase">غرامات التأخير (+)</p>
                              <p className="text-xs font-black text-amber-300">+٥,٠٠٠ ريال</p>
                           </div>
                        </div>
                     </div>
                   )}
                </div>
             </section>

             <button 
               onClick={() => setStep(3)}
               disabled={!isStep2Valid}
               className={`w-full py-5 rounded-[1.8rem] font-black text-lg shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 ${isStep2Valid ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
             >
                التالي: الأدلة والبنود <ChevronLeft size={24} />
             </button>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-8 animate-in fade-in duration-500 pb-20">
             {/* Clauses Mapping Wizard */}
             <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between px-1">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <List size={14} className="text-blue-500" /> البنود المرتبطة بالنزاع
                   </h3>
                   <button className="text-[9px] font-black text-blue-600 uppercase hover:underline">عرض العقد كاملاً</button>
                </div>
                <div className="grid grid-cols-1 gap-2">
                   {contractClauses.map(clause => (
                     <button
                       key={clause.id}
                       onClick={() => toggleClause(clause.id)}
                       className={`p-5 rounded-2xl border-2 text-right flex items-center justify-between transition-all group active:scale-[0.98] ${selectedClauses.includes(clause.id) ? 'bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-slate-50 border-transparent text-slate-700 hover:border-blue-200 hover:bg-white'}`}
                     >
                        <span className="text-xs font-black">{clause.title}</span>
                        <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${selectedClauses.includes(clause.id) ? 'bg-white text-blue-600 border-white' : 'border-slate-200 group-hover:border-blue-200'}`}>
                           {selectedClauses.includes(clause.id) && <Check size={16} />}
                        </div>
                     </button>
                   ))}
                </div>
                {selectedClauses.includes('9') && (
                   <div className="p-5 bg-amber-50 rounded-3xl border border-amber-100 flex gap-4 animate-in zoom-in duration-500 shadow-sm">
                      <Sparkles size={24} className="text-amber-500 shrink-0 mt-0.5" />
                      <div className="space-y-1">
                         <h5 className="text-[10px] font-black text-amber-900 uppercase">اقتراح AI: الغرامات المستحقة</h5>
                         <p className="text-[11px] text-amber-800 font-medium leading-relaxed">
                            بناءً على "البند 9" وتاريخ اليوم، يحق لك المطالبة بـ <span className="font-black">٥,٠٠٠ ريال</span> كغرامة تأخير ناتجة عن تجاوز موعد التسليم بـ ١٠ أيام.
                         </p>
                      </div>
                   </div>
                )}
             </section>

             {/* Event Timeline Builder */}
             <section className="space-y-4">
                <div className="flex justify-between items-center px-3">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <History size={14} className="text-blue-500" /> الجدول الزمني للوقائع
                   </h3>
                   <button onClick={addEvent} className="text-[9px] font-black text-blue-600 uppercase flex items-center gap-1 bg-white px-3 py-1 rounded-full shadow-sm border border-slate-100 active:scale-95 transition-transform">
                      <Plus size={12} /> إضافة حدث جديد
                   </button>
                </div>
                <div className="space-y-3">
                   {timelineEvents.map((event, idx) => (
                     <div key={event.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4 relative animate-in slide-in-from-right duration-300">
                        {timelineEvents.length > 1 && (
                           <button onClick={() => removeEvent(event.id)} className="absolute top-4 left-4 p-2 text-slate-300 hover:text-red-500 transition active:scale-90"><Trash2 size={16} /></button>
                        )}
                        <div className="grid grid-cols-1 gap-4">
                           <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-400 uppercase pr-1 tracking-widest">تاريخ وقوع الحدث</label>
                              <div className="relative">
                                 <input 
                                   type="date" 
                                   value={event.date}
                                   onChange={e => updateEvent(event.id, 'date', e.target.value)}
                                   className="w-full bg-slate-50 border-none rounded-xl p-3 text-[11px] font-bold outline-none focus:ring-2 focus:ring-blue-100 shadow-inner appearance-none"
                                 />
                                 <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-300 pointer-events-none" size={14} />
                              </div>
                           </div>
                           <div className="space-y-1.5">
                              <label className="text-[8px] font-black text-slate-400 uppercase pr-1 tracking-widest">ماذا حدث؟ (وصف مختصر)</label>
                              <input 
                                type="text" 
                                placeholder="مثال: الموعد المحدد للتسليم النهائي..."
                                value={event.event}
                                onChange={e => updateEvent(event.id, 'event', e.target.value)}
                                className="w-full bg-slate-50 border-none rounded-xl p-3 text-[11px] font-bold outline-none focus:ring-2 focus:ring-blue-100 shadow-inner"
                              />
                           </div>
                        </div>
                     </div>
                   ))}
                </div>
             </section>

             {/* Evidence Upload Area */}
             <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center justify-between px-1">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <Paperclip size={14} className="text-blue-500" /> ملفات الإثبات والأدلة
                   </h3>
                   <span className="text-[8px] font-black text-slate-300 uppercase">Max: 50MB</span>
                </div>
                
                <div 
                  onClick={simulateUpload}
                  className="p-12 border-2 border-dashed border-slate-200 bg-slate-50/50 rounded-[2.5rem] flex flex-col items-center gap-4 hover:border-blue-300 hover:bg-blue-50 transition cursor-pointer group active:scale-[0.98] shadow-inner"
                >
                   <div className="w-16 h-16 bg-white text-blue-600 rounded-3xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-500">
                      <Plus size={36} />
                   </div>
                   <div className="text-center space-y-1">
                      <p className="text-sm font-black text-slate-900">أرفق الأدلة الداعمة</p>
                      <p className="text-[10px] text-slate-400 font-medium px-4">صور محادثات، إيميلات، فواتير، أو أي مستندات تدعم موقفك.</p>
                   </div>
                </div>

                {evidenceFiles.length > 0 && (
                   <div className="grid grid-cols-1 gap-2 pt-2">
                      {evidenceFiles.map((f, i) => (
                        <div key={i} className="flex items-center justify-between p-4 bg-emerald-50 border border-emerald-100 rounded-2xl animate-in slide-in-from-bottom duration-300">
                           <div className="flex items-center gap-3">
                              <CheckCircle2 size={16} className="text-emerald-500 shadow-sm" />
                              <span className="text-[11px] font-bold text-emerald-800 truncate max-w-[180px]">{f}</span>
                           </div>
                           <button onClick={(e) => { e.stopPropagation(); setEvidenceFiles(prev => prev.filter((_, idx) => idx !== i)); }} className="p-1.5 text-emerald-300 hover:text-red-500 transition active:scale-90"><X size={16} /></button>
                        </div>
                      ))}
                   </div>
                )}
             </section>

             {/* Desired Outcome */}
             <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2 px-1">
                   {/* Added missing Target import and usage */}
                   <Target size={14} className="text-blue-500" /> المطالب والحل المنشود
                </label>
                <textarea 
                  rows={4}
                  placeholder="ما هو الحل العادل بالنسبة لك؟ (مثال: استرداد كامل المبلغ، أو تعويض مالي، أو إتمام العمل خلال فترة محددة)"
                  className="w-full bg-slate-50 border border-slate-100 rounded-[1.8rem] p-6 text-xs font-medium leading-relaxed focus:bg-white focus:ring-4 focus:ring-blue-50 outline-none shadow-inner transition resize-none placeholder:text-slate-300"
                />
             </section>

             {/* Final Legal Declaration & Submission */}
             <section className="bg-slate-900 p-8 rounded-[3rem] border-2 border-blue-600/30 text-white shadow-2xl space-y-8 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full -mr-24 -mt-24 blur-3xl animate-pulse" />
                
                <div className="space-y-6 relative z-10">
                   <div className="flex items-center gap-4 text-white border-b border-white/5 pb-5">
                      <ShieldCheck size={28} className="text-blue-400" />
                      <h4 className="font-black text-sm uppercase tracking-widest">إقرار ومصادقة البيانات</h4>
                   </div>
                   
                   <label className="flex items-start gap-4 cursor-pointer group">
                      <div className={`mt-1 w-7 h-7 rounded-xl border-2 flex items-center justify-center shrink-0 transition-all shadow-lg ${
                        finalConfirm ? 'bg-blue-600 border-blue-600 text-white' : 'border-white/10 bg-white/5 group-hover:border-blue-400'
                      }`}>
                         <input type="checkbox" className="hidden" checked={finalConfirm} onChange={e => setFinalConfirm(e.target.checked)} />
                         {finalConfirm && <Check size={18} />}
                      </div>
                      <div className="flex-1 space-y-3 text-[10px] text-slate-400 font-bold leading-relaxed">
                         <p>• أقر بصحة جميع المعلومات والأدلة المقدمة في هذا الطلب وتحت مسؤوليتي الكاملة.</p>
                         <p>• أفهم أن تعمد تقديم بيانات كاذبة قد يترتب عليه مسؤولية قانونية وتعليق الحساب.</p>
                         <p>• أوافق على معالجة النزاع من خلال الأنظمة التقنية التابعة للمنصة والتحكيم الذكي.</p>
                      </div>
                   </label>

                   <div className="space-y-3 pt-6 border-t border-white/5">
                      <div className="flex justify-between items-center px-1">
                         <label className="text-[10px] font-black text-slate-500 uppercase tracking-widest flex items-center gap-2">
                            <Lock size={14} className="text-blue-500" /> كلمة المرور لتوقيع الطلب
                         </label>
                      </div>
                      <div className="relative group">
                         <input 
                           type="password" 
                           value={password}
                           onChange={e => setPassword(e.target.value)}
                           className="w-full bg-white/5 border border-white/10 rounded-[1.5rem] p-5 text-center text-2xl font-black text-white focus:bg-white/10 focus:border-blue-600 outline-none transition shadow-inner"
                           placeholder="••••••••"
                         />
                         <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-white/10 group-focus-within:text-blue-600 transition" size={24} />
                      </div>
                   </div>
                </div>
             </section>

             {/* Final Actions */}
             <div className="flex gap-3 sticky bottom-6 z-50 bg-white/90 backdrop-blur-md p-4 rounded-[2rem] border border-slate-100 shadow-2xl shadow-slate-900/10">
                <button 
                  onClick={onSubmit}
                  disabled={!isFinalValid}
                  className={`flex-[3] py-5 rounded-[1.5rem] font-black text-lg shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group ${
                    isFinalValid 
                    ? 'bg-blue-600 text-white shadow-blue-100 active:scale-95' 
                    : 'bg-slate-100 text-slate-300 cursor-not-allowed'
                  }`}
                >
                   {isFinalValid && <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />}
                   تقديم طلب النزاع <Gavel size={24} />
                </button>
                <button className="flex-1 bg-slate-50 text-slate-400 rounded-[1.5rem] font-black text-[11px] hover:bg-slate-100 hover:text-blue-600 transition-all active:scale-95 flex flex-col items-center justify-center gap-1 border border-slate-100">
                   <Save size={18} />
                   <span>مسودة</span>
                </button>
             </div>
          </div>
        )}
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default OpenDispute;
