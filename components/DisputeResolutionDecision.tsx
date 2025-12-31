import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, Gavel, 
  MessageSquare, UserCheck, CreditCard, Lock, 
  Clock, List, AlertTriangle, FileText, Download, 
  Share2, Star, ChevronLeft, ChevronRight, 
  ArrowDownCircle, ExternalLink, Sparkles, Handshake,
  Calendar, Target
} from 'lucide-react';

interface DisputeResolutionDecisionProps {
  onBack: () => void;
  onGoToContract: () => void;
}

const DisputeResolutionDecision: React.FC<DisputeResolutionDecisionProps> = ({ onBack, onGoToContract }) => {
  const [progress, setProgress] = useState(30);
  const [isClosed, setIsClosed] = useState(false);
  const [rating, setRating] = useState(0);

  const disputeData = {
    id: '#DISP-2024-0001',
    status: 'محسوم',
    method: 'حل ودي - اتفاق الطرفين',
    date: '2025-01-10',
    decision: [
      "يلتزم المدعى عليه (شركة النجاح) بتسليم الموقع خلال 7 أيام من تاريخ هذا القرار",
      "دفع غرامة تأخير بقيمة 3,000 ريال للمدعي",
      "إكمال المشروع وفق المواصفات المتفق عليها",
      "يتنازل الطرفان عن أي مطالبات أخرى"
    ],
    parties: [
      { name: 'محمد أحمد', role: 'المدعي', agreed: true, time: '2025-01-10, 3:00 PM' },
      { name: 'شركة النجاح', role: 'المدعى عليه', agreed: true, time: '2025-01-10, 3:15 PM' }
    ],
    execution: [
      { label: 'إفراج Escrow', amount: 25000, from: 'Escrow', to: 'محمد أحمد', status: 'pending_delivery', icon: <Lock className="text-blue-500" size={14} /> },
      { label: 'دفع الغرامة', amount: 3000, from: 'شركة النجاح', to: 'محمد أحمد', status: 'processing', icon: <CreditCard className="text-amber-500" size={14} /> }
    ],
    timeline: [
      { date: 'Jan 10', label: 'صدور القرار', done: true },
      { date: 'Jan 17', label: 'موعد التسليم', pending: true, subtitle: '(متبقي: ٧ أيام)' },
      { date: 'Jan 20', label: 'فحص وتأكيد الجودة', pending: true },
      { date: 'Jan 22', label: 'إفراج Escrow', pending: true },
      { date: 'Jan 25', label: 'إغلاق النزاع نهائياً', pending: true }
    ],
    actions: {
      defendant: ["تسليم الموقع خلال ٧ أيام", "دفع الغرامة (٣,٠٠٠ ريال)"],
      claimant: ["فحص الموقع المسلّم", "تأكيد القبول أو الرفض"],
      platform: ["تجميد Escrow (مكتمل)", "انتظار التنفيذ", "إفراج Escrow بعد التأكيد"]
    }
  };

  // Simulate closure for demo
  const handleFinalize = () => {
    setProgress(100);
    setTimeout(() => setIsClosed(true), 1000);
  };

  if (isClosed) {
    return (
      <div className="flex-1 flex flex-col bg-white animate-in zoom-in duration-500 overflow-y-auto">
        <div className="p-8 text-center space-y-8 py-16">
          <div className="relative inline-block">
            <div className="w-32 h-32 bg-emerald-50 text-emerald-600 rounded-[3.5rem] flex items-center justify-center shadow-2xl shadow-emerald-100 animate-bounce">
              <CheckCircle2 size={72} />
            </div>
            <Sparkles className="absolute -top-4 -right-4 text-amber-500 animate-pulse" size={32} />
          </div>
          
          <div className="space-y-3">
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">تم إغلاق النزاع بنجاح!</h2>
            <p className="text-sm text-slate-500 font-medium px-8 leading-relaxed italic">"العدالة الناجزة هي غايتنا."</p>
          </div>

          <div className="bg-slate-50 rounded-[2.5rem] p-6 space-y-4 border border-slate-100 shadow-inner text-right">
             <div className="flex justify-between items-center border-b border-slate-200 pb-3">
               <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">تاريخ الإغلاق</span>
               <span className="text-xs font-bold text-slate-900">2025-01-25</span>
             </div>
             <div className="space-y-3">
               {['تم التسليم ✓', 'تم الدفع ✓', 'تم إفراج Escrow ✓', 'الطرفان راضيان ✓'].map((item, i) => (
                 <div key={i} className="flex items-center gap-3 text-xs font-black text-emerald-700">
                    <CheckCircle2 size={16} /> {item}
                 </div>
               ))}
             </div>
             <div className="pt-2">
                <span className="bg-emerald-100 text-emerald-600 text-[10px] font-black px-4 py-1 rounded-full uppercase">النتيجة: حل ناجح</span>
             </div>
          </div>

          <div className="space-y-6 pt-4">
             <div className="space-y-4">
               <h3 className="text-lg font-black text-slate-900">تقييم تجربة حل النزاع</h3>
               <div className="flex justify-center gap-3">
                 {[1,2,3,4,5].map(s => (
                   <button key={s} onClick={() => setRating(s)} className={`transition-all ${s <= rating ? 'scale-110 text-amber-400' : 'text-slate-200 hover:text-amber-200'}`}>
                     <Star size={40} fill={s <= rating ? "currentColor" : "none"} />
                   </button>
                 ))}
               </div>
               <textarea 
                 placeholder="ملاحظاتك حول شفافية وسرعة القرار..."
                 className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-5 text-sm outline-none focus:ring-4 focus:ring-blue-100 transition resize-none h-28"
               />
               <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 active:scale-95 transition">إرسال التقييم</button>
             </div>
             <button onClick={onBack} className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm active:scale-95 transition">العودة للرئيسية</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-bottom duration-500 overflow-y-auto pb-32">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-40 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight className="text-slate-700" />
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-900">قرار حسم النزاع</h1>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">{disputeData.id} • {disputeData.status}</p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-xl transition"><Share2 size={20} /></button>
      </div>

      <div className="p-6 space-y-8">
        
        {/* Resolution Method Badge */}
        <section className="flex flex-col items-center gap-4">
           <div className="px-6 py-3 bg-emerald-50 text-emerald-600 border border-emerald-100 rounded-full text-xs font-black uppercase tracking-widest flex items-center gap-2 shadow-sm animate-pulse">
              <CheckCircle2 size={16} /> {disputeData.method}
           </div>
           <p className="text-[10px] text-slate-400 font-medium text-center px-8">هذا القرار ملزم قانوناً بموجب اتفاقية فض النزاعات الرقمية الموقعة مسبقاً.</p>
        </section>

        {/* Final Decision Card */}
        <section className="space-y-4">
           <div className="flex items-center gap-3 px-2">
              <FileText className="text-blue-600" size={18} />
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">منطوق القرار النهائي</h3>
           </div>
           <div className="bg-white rounded-[2.5rem] border-[8px] border-slate-100 p-8 shadow-2xl relative overflow-hidden group">
              <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50/50 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 space-y-6">
                 <div className="flex justify-between items-center border-b border-slate-50 pb-4">
                    <span className="text-[10px] font-black text-slate-300 uppercase tracking-tighter">التاريخ: {disputeData.date}</span>
                    <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center text-white shadow-lg shadow-slate-200">
                       <Gavel size={20} />
                    </div>
                 </div>
                 <div className="space-y-4 font-serif leading-[1.8] text-slate-800 text-sm">
                    <p className="font-black text-blue-900">"بعد مراجعة جميع الوقائع والأدلة، تقرر ما يلي:"</p>
                    {disputeData.decision.map((point, i) => (
                      <div key={i} className="flex gap-3">
                         <span className="font-black text-blue-600">{i+1}.</span>
                         <p className="font-medium">{point}</p>
                      </div>
                    ))}
                 </div>
                 <div className="pt-6 flex justify-center">
                    <div className="flex flex-col items-center gap-1 opacity-20">
                       <ShieldCheck size={48} className="text-slate-900" />
                       <span className="text-[8px] font-black uppercase">الختم الرسمي للمنصة</span>
                    </div>
                 </div>
              </div>
           </div>
        </section>

        {/* Parties Agreement Grid */}
        <section className="space-y-4">
           <div className="flex items-center gap-3 px-2">
              <UserCheck className="text-emerald-500" size={18} />
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">المصادقة والتوقيع</h3>
           </div>
           <div className="grid grid-cols-1 gap-3">
              {disputeData.parties.map((p, i) => (
                <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group">
                   <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-105 transition-transform">
                         <Handshake size={24} />
                      </div>
                      <div>
                         <h4 className="text-xs font-black text-slate-900">{p.name} ({p.role})</h4>
                         <p className="text-[9px] text-emerald-600 font-bold flex items-center gap-1"><CheckCircle2 size={10} /> موافق ومصادق</p>
                      </div>
                   </div>
                   <div className="text-left">
                      <p className="text-[8px] font-black text-slate-300 uppercase leading-none mb-1">الختم الزمني</p>
                      <p className="text-[8px] font-bold text-slate-400">{p.time}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Financial Execution */}
        <section className="space-y-4">
           <div className="flex items-center gap-3 px-2">
              <CreditCard className="text-blue-500" size={18} />
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">إجراءات التنفيذ المالي</h3>
           </div>
           <div className="space-y-3">
              {disputeData.execution.map((ex, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4 relative overflow-hidden group">
                   <div className="flex justify-between items-center">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:bg-blue-50 transition-colors">
                            {ex.icon}
                         </div>
                         <h4 className="text-xs font-black text-slate-900">{ex.label}</h4>
                      </div>
                      <div className="text-right">
                         <p className="text-lg font-black text-blue-600">{ex.amount.toLocaleString()} <span className="text-[10px]">SAR</span></p>
                      </div>
                   </div>
                   <div className="grid grid-cols-2 gap-4 py-3 border-y border-slate-50">
                      <div>
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">من</p>
                         <p className="text-[10px] font-bold text-slate-700">{ex.from}</p>
                      </div>
                      <div className="text-left">
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest mb-1">إلى</p>
                         <p className="text-[10px] font-bold text-slate-700">{ex.to}</p>
                      </div>
                   </div>
                   <div className="flex justify-between items-center pt-1">
                      <span className={`text-[8px] font-black px-3 py-1 rounded-full uppercase ${
                        ex.status === 'processing' ? 'bg-amber-50 text-amber-600 animate-pulse' : 'bg-blue-50 text-blue-600'
                      }`}>
                         {ex.status === 'processing' ? '🔄 جارٍ التحويل' : '⏳ معلق (بعد التسليم)'}
                      </span>
                      <button className="text-[10px] font-black text-blue-600 flex items-center gap-1 hover:underline">
                         التفاصيل <ChevronLeft size={12} />
                      </button>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Monitoring & Compliance Progress */}
        <section className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl space-y-6 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-3xl" />
           <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-3">
                 <Sparkles className="text-blue-400 animate-spin-slow" size={24} />
                 <div>
                    <h3 className="font-black text-sm uppercase tracking-widest">متابعة تنفيذ القرار</h3>
                    <p className="text-[10px] text-slate-400 font-medium">حالة الامتثال: 🟡 جارٍ التنفيذ</p>
                 </div>
              </div>
              <span className="text-2xl font-black">{progress}%</span>
           </div>
           
           <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden relative z-10">
              <div className="h-full bg-blue-600 transition-all duration-1000 ease-out shadow-[0_0_15px_rgba(37,99,235,0.5)]" style={{ width: `${progress}%` }} />
           </div>

           <div className="space-y-4 pt-2 relative z-10">
              {[
                { label: 'صدور القرار واعتماده', done: true },
                { label: 'تسليم الموقع (الموعد: ١٧ يناير)', active: true },
                { label: 'تأكيد الجودة والإفراج المالي', pending: true },
                { label: 'إغلاق النزاع نهائياً', pending: true }
              ].map((step, i) => (
                <div key={i} className="flex items-center justify-between group">
                   <div className="flex items-center gap-3">
                      <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all ${
                        step.done ? 'bg-emerald-500 border-emerald-500 text-white' : 
                        step.active ? 'bg-blue-600 border-blue-600 text-white ring-4 ring-blue-500/20' : 'border-white/10'
                      }`}>
                         {step.done ? <CheckCircle2 size={12} /> : <div className={`w-1.5 h-1.5 rounded-full ${step.active ? 'bg-white' : 'bg-white/20'}`} />}
                      </div>
                      <span className={`text-[11px] font-black ${step.done ? 'text-slate-400 line-through' : step.active ? 'text-white' : 'text-slate-50'}`}>{step.label}</span>
                   </div>
                   {step.active && <Clock size={12} className="text-blue-400 animate-pulse" />}
                </div>
              ))}
           </div>
        </section>

        {/* Implementation Timeline */}
        <section className="space-y-4">
           <div className="flex items-center gap-3 px-2">
              <Calendar className="text-indigo-500" size={18} />
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">جدول المواعيد النهائية</h3>
           </div>
           <div className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm relative overflow-hidden">
              <div className="absolute top-10 bottom-10 right-9 w-0.5 bg-slate-50" />
              <div className="space-y-10 relative">
                 {disputeData.timeline.map((t, i) => (
                   <div key={i} className="flex items-start gap-5 pr-8 relative">
                      <div className={`absolute right-[-2.25rem] top-1 w-4 h-4 rounded-full border-4 border-white shadow-sm transition-all ${
                        t.done ? 'bg-emerald-500' : t.pending ? 'bg-slate-200' : 'bg-blue-600'
                      }`} />
                      <div className="space-y-1">
                         <div className="flex items-center gap-2">
                           <span className="text-[10px] font-black text-slate-300 uppercase">{t.date}</span>
                           {t.subtitle && <span className="text-[8px] font-black text-amber-500 uppercase">{t.subtitle}</span>}
                         </div>
                         <h4 className={`text-xs font-black ${t.done ? 'text-slate-400' : 'text-slate-900'}`}>{t.label}</h4>
                      </div>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Action Items Checklist */}
        <section className="space-y-4">
           <div className="flex items-center gap-3 px-2">
              <List className="text-amber-500" size={18} />
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">الإجراءات المطلوبة حالياً</h3>
           </div>
           
           <div className="bg-white rounded-3xl border border-slate-100 shadow-sm overflow-hidden divide-y divide-slate-50">
              <div className="p-5 space-y-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">من المدعى عليه (شركة النجاح)</p>
                 {disputeData.actions.defendant.map((act, i) => (
                   <div key={i} className="flex items-center gap-3 group">
                      <div className="w-5 h-5 rounded-lg border-2 border-slate-100 flex items-center justify-center shrink-0 group-hover:border-blue-200 transition-colors">
                         <div className="w-1.5 h-1.5 rounded-full bg-slate-100" />
                      </div>
                      <span className="text-xs font-bold text-slate-700">{act}</span>
                   </div>
                 ))}
              </div>
              <div className="p-5 space-y-4">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3">من المدعي (أنت)</p>
                 {disputeData.actions.claimant.map((act, i) => (
                   <div key={i} className="flex items-center gap-3 group">
                      <div className="w-5 h-5 rounded-lg border-2 border-slate-200 flex items-center justify-center shrink-0 bg-slate-50">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
                      </div>
                      <span className="text-xs font-bold text-slate-900">{act}</span>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Appeal Option Warning */}
        <section className="bg-amber-50 p-6 rounded-[2.5rem] border border-amber-100 space-y-4">
           <div className="flex items-center gap-3 text-amber-600">
              <AlertTriangle size={24} />
              <h3 className="font-black text-sm uppercase tracking-widest">الاعتراض على القرار</h3>
           </div>
           <p className="text-[10px] text-amber-800 font-medium leading-relaxed">
             يحق لك الاعتراض على هذا القرار خلال ٧ أيام عمل من تاريخ صدوره. يرجى ملاحظة أن الاعتراض قد يوقف إجراءات التنفيذ والتحويلات المالية تلقائياً.
           </p>
           <button className="w-full py-4 bg-white border border-amber-200 text-amber-600 rounded-2xl font-black text-xs hover:bg-amber-100 transition active:scale-95 shadow-sm">
              تقديم اعتراض رسمي
           </button>
        </section>

        {/* enforcement mechanism */}
        <section className="bg-white p-7 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
           <div className="flex items-center gap-4 border-b border-slate-50 pb-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                 <ShieldCheck size={28} />
              </div>
              <div>
                 <h3 className="font-black text-sm uppercase tracking-widest text-slate-900">آلية التنفيذ والالتزام</h3>
                 <p className="text-[9px] font-black text-emerald-600">جميع الأطراف ملتزمة ✓</p>
              </div>
           </div>
           <div className="space-y-4">
              {[
                'تنبيه تلقائي للنظام بعد ٣ أيام من التأخير',
                'تصعيد رسمي للمحكمة بعد ٧ أيام من عدم الالتزام',
                'إمكانية حظر حساب الطرف المخالف للمنصة',
              ].map((rule, i) => (
                <div key={i} className="flex gap-3">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 shrink-0 shadow-sm" />
                   <p className="text-[11px] text-slate-600 font-medium leading-relaxed">{rule}</p>
                </div>
              ))}
           </div>
        </section>

        {/* update contract status */}
        <section className="bg-slate-900 p-8 rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
           <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-[1.2rem] flex items-center justify-center backdrop-blur-md">
                 <FileText size={32} className="text-blue-400" />
              </div>
              <div className="space-y-1">
                 <h3 className="text-sm font-black uppercase tracking-widest text-blue-300">تحديث حالة العقد</h3>
                 <p className="text-[9px] text-slate-400 font-medium">العقد رقم #2024-001234</p>
              </div>
           </div>
           
           <div className="flex items-center justify-between py-4 border-y border-white/5 relative z-10">
              <div className="space-y-1">
                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">الحالة السابقة</span>
                 <div className="flex items-center gap-2 text-red-400 text-xs font-black">
                    <AlertTriangle size={14} /> متنازع عليه
                 </div>
              </div>
              <ChevronRight className="text-slate-700" />
              <div className="space-y-1 text-left">
                 <span className="text-[8px] font-black text-slate-500 uppercase tracking-widest">الحالة الحالية</span>
                 <div className="flex items-center gap-2 text-emerald-400 text-xs font-black">
                    نشط - تنفيذ القرار <CheckCircle2 size={14} />
                 </div>
              </div>
           </div>

           <div className="space-y-2 relative z-10">
              <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest mb-1">التعديلات المعتمدة:</p>
              <ul className="text-[11px] text-slate-400 space-y-1 pr-1 font-medium">
                 <li className="flex gap-3"><span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5" /> تمديد مدة المشروع: +٧ أيام</li>
                 <li className="flex gap-3"><span className="w-1 h-1 bg-blue-400 rounded-full mt-1.5" /> إضافة غرامة سابقة: ٣,٠٠٠ ريال</li>
              </ul>
           </div>

           <button onClick={onGoToContract} className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-xs shadow-xl active:scale-95 transition flex items-center justify-center gap-2 relative z-10">
              عرض نسخة العقد المحدثة <ExternalLink size={14} />
           </button>
        </section>

        {/* Documentation List */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">المستندات الرسمية</h3>
              <button className="text-[10px] font-black text-blue-600 flex items-center gap-1 uppercase hover:underline">
                 <Download size={14} /> تحميل الكل
              </button>
           </div>
           <div className="grid grid-cols-1 gap-2">
              {[
                { name: 'قرار_الحسم.pdf', date: '2025-01-10' },
                { name: 'اتفاق_الطرفين.pdf', date: '2025-01-10' },
                { name: 'تعديلات_العقد.pdf', date: '2025-01-11' },
                { name: 'إيصال_الغرامة.pdf', date: '2025-01-12' }
              ].map((doc, i) => (
                <div key={i} className="p-4 bg-white rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-blue-200 transition cursor-pointer shadow-sm">
                   <div className="flex items-center gap-3">
                      <FileText size={18} className="text-slate-400 group-hover:text-blue-600 transition" />
                      <div>
                         <p className="text-xs font-bold text-slate-700">{doc.name}</p>
                         <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">{doc.date}</p>
                      </div>
                   </div>
                   <Download size={14} className="text-slate-300 group-hover:text-blue-600" />
                </div>
              ))}
           </div>
        </section>

        {/* Finalize Action (Demo Only) */}
        <div className="pt-8 pb-12">
          <button 
            onClick={handleFinalize}
            className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-lg shadow-2xl shadow-emerald-100 active:scale-95 transition-all flex items-center justify-center gap-3 group relative overflow-hidden"
          >
             <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
             تأكيد إتمام جميع الشروط وإغلاق النزاع
          </button>
          <p className="text-center text-[9px] font-black text-slate-300 uppercase tracking-tighter mt-4">
             سيتم أرشفة النزاع نهائياً ولن يتم قبول أي اعتراضات إضافية بعد الإغلاق.
          </p>
        </div>
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 8s linear infinite; }
      `}</style>
    </div>
  );
};

export default DisputeResolutionDecision;