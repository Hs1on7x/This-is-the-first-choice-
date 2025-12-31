import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Lock, CheckCircle2, AlertTriangle, Clock, 
  History, ShieldCheck, ChevronLeft, MoreVertical, 
  MessageSquare, ExternalLink, Calendar, Paperclip, Check, X, Bot, ShieldAlert,
  ArrowUpRight, Download, Info, Landmark, Eye, RefreshCw, FileText, Search, ZoomIn, ZoomOut
} from 'lucide-react';
import { EscrowAccount } from '../types';

interface EscrowManagementDashboardProps {
  onBack: () => void;
  onOpenDispute: () => void;
}

const EscrowManagementDashboard: React.FC<EscrowManagementDashboardProps> = ({ onBack, onOpenDispute }) => {
  const [escrow, setEscrow] = useState<EscrowAccount>({
    id: 'ESC-2024-991',
    contractId: 'CON-1234',
    contractName: 'تطوير تطبيق الهوية الرقمية',
    amount: 25000,
    status: 'reserved',
    reservedAt: '2024-12-30',
    expectedReleaseAt: '2025-01-06',
    durationDays: 7,
    progress: 60
  });

  // Action States for Modals
  const [confirmReleaseModal, setConfirmReleaseModal] = useState(false);
  const [extendModal, setExtendModal] = useState(false);
  const [rejectModal, setRejectModal] = useState(false);
  const [previewModal, setPreviewModal] = useState(false);
  
  const [password, setPassword] = useState('');
  const [rejectReason, setRejectReason] = useState('');
  const [extensionDays, setExtensionDays] = useState(7);
  const [isProcessing, setIsProcessing] = useState(false);

  // Countdown Logic (4 days 12 hours 35 minutes)
  const [timeLeft, setTimeLeft] = useState({ d: 4, h: 12, m: 35, s: 48 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.s > 0) return { ...prev, s: prev.s - 1 };
        if (prev.m > 0) return { ...prev, m: prev.m - 1, s: 59 };
        if (prev.h > 0) return { ...prev, h: prev.h - 1, m: 59, s: 59 };
        if (prev.d > 0) return { ...prev, d: prev.d - 1, h: 23, m: 59, s: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleAction = async (actionType: 'approve' | 'reject' | 'extend') => {
    setIsProcessing(true);
    // Simulate Network/Blockchain Lag
    await new Promise(resolve => setTimeout(resolve, 2000));
    setIsProcessing(false);
    
    // Close and Reset
    setConfirmReleaseModal(false);
    setRejectModal(false);
    setExtendModal(false);
    setPassword('');
    setRejectReason('');

    alert(`تم تنفيذ العملية: ${
      actionType === 'approve' ? 'الموافقة والإفراج المالي' : 
      actionType === 'reject' ? 'رفض الطلب وإخطار الطرف الآخر' : 
      'تمديد فترة الحجز بنجاح'
    }`);
    
    if (actionType === 'approve') onBack();
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-500 overflow-y-auto pb-32">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-40 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight className="text-slate-700" />
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-900 leading-tight">إدارة الضمان المالي</h1>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">{escrow.amount.toLocaleString()} ريال محجوز</p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-slate-600 transition">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="p-6 space-y-8">
        {/* Main Status Hero Card */}
        <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-48 h-48 bg-blue-600/10 rounded-full -mr-24 -mt-24 blur-3xl animate-pulse" />
           <div className="relative z-10 flex flex-col items-center space-y-6">
              <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center shadow-[0_0_30px_rgba(37,99,235,0.4)] transition-transform group-hover:scale-110 duration-500">
                 <Lock size={32} />
              </div>
              <div className="text-center space-y-1">
                 <h2 className="text-4xl font-black">{escrow.amount.toLocaleString()} <span className="text-sm font-bold opacity-60">ريال</span></h2>
                 <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-500/10 text-amber-400 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-500/20">
                    <Clock size={12} className="animate-spin-slow" /> محجوز في النظام
                 </div>
              </div>
              <div className="grid grid-cols-2 gap-8 w-full pt-6 border-t border-white/10">
                 <div className="space-y-1">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">تاريخ الحجز</p>
                    <p className="text-sm font-bold">2024-12-30</p>
                 </div>
                 <div className="space-y-1 text-left">
                    <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">الإفراج المتوقع</p>
                    <p className="text-sm font-bold text-blue-400">2025-01-06</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Release Conditions Progress */}
        <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
           <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                 <h3 className="font-black text-slate-900 text-sm">شروط الإفراج</h3>
                 <span className="bg-blue-50 text-blue-600 text-[8px] px-2 py-0.5 rounded font-black uppercase tracking-tighter">Blockchain Escrow</span>
              </div>
              <span className="text-[10px] font-black text-blue-600 uppercase">٦٠٪ مكتمل</span>
           </div>

           <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
              <div className="w-[60%] h-full bg-blue-600 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)] transition-all duration-1000" />
           </div>

           <div className="space-y-4">
              {[
                { label: 'تم التوقيع على العقد رقمياً', done: true },
                { label: 'تم إيداع كامل المبلغ في محفظة الضمان', done: true },
                { label: 'تأكيد استلام المخرجات/الخدمة', done: false, active: true },
                { label: 'مرور ٧ أيام بدون اعتراض (٣ أيام متبقية)', done: false },
              ].map((step, idx) => (
                <div key={idx} className="flex items-center justify-between group">
                   <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                        step.done ? 'bg-emerald-500 border-emerald-500 text-white shadow-lg' : 
                        step.active ? 'bg-white border-blue-600 text-blue-600 animate-pulse ring-4 ring-blue-50' : 'border-slate-100 bg-slate-50'
                      }`}>
                         {step.done ? <Check size={14} /> : <div className={`w-1.5 h-1.5 rounded-full ${step.active ? 'bg-blue-600' : 'bg-slate-200'}`} />}
                      </div>
                      <span className={`text-xs font-bold transition-colors ${step.done ? 'text-slate-400 line-through' : step.active ? 'text-slate-900' : 'text-slate-400'}`}>{step.label}</span>
                   </div>
                   {step.active && <Bot size={14} className="text-blue-500" />}
                </div>
              ))}
           </div>
        </section>

        {/* Action Buttons */}
        <section className="space-y-4">
           <div className="flex items-center gap-2 px-1">
              <ShieldCheck size={16} className="text-blue-600" />
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">إجراءاتك المتاحة</h4>
           </div>
           
           <div className="grid grid-cols-1 gap-4">
              <button 
                onClick={() => setConfirmReleaseModal(true)}
                className="w-full p-6 bg-white border-2 border-slate-100 rounded-[2rem] flex items-center justify-between group active:scale-[0.98] hover:border-blue-600 transition-all shadow-sm"
              >
                 <div className="flex items-center gap-4 text-right">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all shadow-inner"><CheckCircle2 size={24} /></div>
                    <div>
                       <h5 className="text-sm font-black text-slate-900 group-hover:text-blue-600 transition">طلب الإفراج المبكر</h5>
                       <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">إذا استلمت العمل المتفق عليه</p>
                    </div>
                 </div>
                 <ChevronLeft size={20} className="text-slate-200 group-hover:text-blue-600 transition-transform group-hover:-translate-x-1" />
              </button>
              
              <div className="grid grid-cols-2 gap-4">
                 <button 
                   onClick={onOpenDispute}
                   className="p-5 bg-white border border-slate-100 text-red-500 rounded-[2rem] flex flex-col gap-3 items-center justify-center hover:bg-red-50 hover:border-red-200 transition shadow-sm active:scale-95 group"
                 >
                    <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"><ShieldAlert size={24} /></div>
                    <span className="text-[10px] font-black uppercase tracking-tighter">فتح نزاع رسمي</span>
                 </button>
                 <button 
                   onClick={() => setExtendModal(true)}
                   className="p-5 bg-white border border-slate-100 text-slate-600 rounded-[2rem] flex flex-col gap-3 items-center justify-center hover:bg-slate-50 hover:border-slate-200 transition shadow-sm active:scale-95 group"
                 >
                    <div className="w-10 h-10 bg-slate-50 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform"><Calendar size={24} /></div>
                    <span className="text-[10px] font-black uppercase tracking-tighter">تمديد الفترة</span>
                 </button>
              </div>
           </div>
        </section>

        {/* Timeline Visual */}
        <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
           <h3 className="font-black text-slate-900 text-sm flex items-center gap-2 px-1">
              <History size={16} className="text-blue-600" /> الجدول الزمني للضمان
           </h3>
           <div className="relative py-12 px-4">
              <div className="absolute top-1/2 left-0 right-0 h-1.5 bg-slate-50 -translate-y-1/2 rounded-full" />
              <div className="absolute top-1/2 right-0 w-[60%] h-1.5 bg-blue-600 -translate-y-1/2 rounded-full shadow-[0_0_8px_rgba(37,99,235,0.4)]" />
              
              <div className="absolute top-1/2 right-0 -translate-y-1/2 translate-x-1/2 flex flex-col items-center gap-2">
                 <div className="w-5 h-5 bg-blue-600 rounded-full border-[5px] border-white shadow-lg ring-1 ring-slate-100" />
                 <div className="absolute -top-8 text-center whitespace-nowrap">
                    <span className="text-[8px] font-black text-slate-400 uppercase block">30 Dec</span>
                    <span className="text-[9px] font-bold text-slate-900">الحجز</span>
                 </div>
              </div>

              <div className="absolute top-1/2 right-[60%] -translate-y-1/2 translate-x-1/2 flex flex-col items-center gap-2">
                 <div className="w-7 h-7 bg-blue-600 text-white rounded-full border-4 border-white shadow-2xl flex items-center justify-center scale-125 animate-bounce-slow">
                    <Clock size={12} />
                 </div>
                 <div className="absolute -top-10 text-center whitespace-nowrap bg-blue-600 text-white px-2 py-0.5 rounded-lg shadow-xl shadow-blue-200">
                    <span className="text-[9px] font-black uppercase">اليوم (02 Jan)</span>
                 </div>
              </div>

              <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 flex flex-col items-center gap-2">
                 <div className="w-5 h-5 bg-white rounded-full border-2 border-slate-200 shadow-sm" />
                 <div className="absolute -top-8 text-center whitespace-nowrap">
                    <span className="text-[8px] font-black text-slate-400 uppercase block">06 Jan</span>
                    <span className="text-[9px] font-bold text-slate-400">الإفراج</span>
                 </div>
              </div>
           </div>
        </section>

        {/* Incoming Release Request Alert Card */}
        <section className="bg-blue-600 p-8 rounded-[3rem] text-white shadow-2xl space-y-6 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-125 transition-transform duration-700" />
           <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 shadow-2xl">
                 <MessageSquare size={28} className="text-blue-100" />
              </div>
              <div className="space-y-1">
                 <div className="flex items-center gap-2">
                    <h4 className="text-sm font-black uppercase tracking-tight">طلب إفراج جديد</h4>
                    <span className="bg-amber-400 text-slate-900 text-[8px] font-black px-2 py-0.5 rounded-full animate-pulse uppercase">عاجل</span>
                 </div>
                 <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest">من: أحمد السعيد (المستفيد)</p>
              </div>
           </div>
           
           <div className="p-5 bg-white/10 rounded-[1.8rem] border border-white/10 text-xs font-medium text-blue-50 leading-relaxed italic relative z-10">
             "تم إتمام تطوير الموقع بالكامل وفقاً للملحق الفني رقم ١، يرجى مراجعة المرفقات وتأكيد الاستلام للإفراج عن الدفعة الأولى."
           </div>
           
           <div className="flex gap-2 relative z-10 overflow-x-auto no-scrollbar pb-1">
              <button 
                onClick={() => setPreviewModal(true)}
                className="flex items-center gap-2 whitespace-nowrap bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-bold hover:bg-white/10 transition active:scale-95"
              >
                 <Paperclip size={14} className="text-blue-200" />
                 <span>تقرير_التسليم.pdf</span>
              </button>
              <button 
                onClick={() => setPreviewModal(true)}
                className="flex items-center gap-2 whitespace-nowrap bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-bold hover:bg-white/10 transition active:scale-95"
              >
                 <Eye size={14} className="text-blue-200" />
                 <span>معاينة العمل</span>
              </button>
           </div>
           
           <div className="flex gap-3 pt-2 relative z-10">
              <button 
                onClick={() => setConfirmReleaseModal(true)}
                className="flex-[2] py-4 bg-white text-blue-600 rounded-2xl font-black text-xs shadow-xl active:scale-95 transition flex items-center justify-center gap-2"
              >
                 <CheckCircle2 size={16} /> الموافقة والإفراج
              </button>
              <button 
                onClick={() => setRejectModal(true)}
                className="flex-1 py-4 bg-blue-500/50 text-white border border-white/20 rounded-2xl font-black text-xs hover:bg-red-500/20 active:scale-95 transition"
              >
                 الرفض
              </button>
           </div>
        </section>

        {/* Auto Release Timer Card */}
        <section className="text-center space-y-6 pb-12">
           <div className="flex flex-col items-center gap-2">
              <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em]">الإفراج التلقائي (العد التنازلي)</p>
              <div className="text-3xl font-black text-slate-800 font-mono tracking-tighter tabular-nums drop-shadow-sm flex items-center gap-4">
                 <div className="flex flex-col">
                    <span className="text-blue-600">{timeLeft.d}</span>
                    <span className="text-[8px] font-black text-slate-300 uppercase -mt-2">يوم</span>
                 </div>
                 <span className="text-slate-200">:</span>
                 <div className="flex flex-col">
                    <span className="text-blue-600">{timeLeft.h.toString().padStart(2, '0')}</span>
                    <span className="text-[8px] font-black text-slate-300 uppercase -mt-2">ساعة</span>
                 </div>
                 <span className="text-slate-200">:</span>
                 <div className="flex flex-col">
                    <span className="text-blue-600">{timeLeft.m.toString().padStart(2, '0')}</span>
                    <span className="text-[8px] font-black text-slate-300 uppercase -mt-2">دقيقة</span>
                 </div>
              </div>
           </div>
           <div className="p-5 bg-slate-100 rounded-[2rem] border border-slate-200 inline-flex items-start gap-4 text-right max-w-[340px] mx-auto shadow-inner">
              <Info size={24} className="text-slate-400 shrink-0 mt-0.5" />
              <p className="text-[10px] text-slate-500 leading-relaxed font-medium">
                 سيقوم النظام بـ <span className="font-black text-slate-700 underline underline-offset-4 decoration-blue-300">تحويل المبلغ تلقائياً</span> للمستفيد عند انتهاء الوقت، ما لم تقم بفتح نزاع رسمي أو طلب تمديد الفترة يدوياً.
              </p>
           </div>
        </section>
      </div>

      {/* MODAL: Preview Document / Work */}
      {previewModal && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/90 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-lg rounded-[2.5rem] flex flex-col shadow-2xl animate-in zoom-in duration-500 overflow-hidden max-h-[90vh]">
              <div className="p-6 bg-blue-600 text-white flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-white/10 rounded-xl flex items-center justify-center backdrop-blur-md">
                       <FileText size={24} />
                    </div>
                    <div>
                       <h3 className="text-lg font-black leading-tight">تقرير_التسليم.pdf</h3>
                       <p className="text-[10px] text-blue-100 font-bold uppercase">معاينة المستند المرفق</p>
                    </div>
                 </div>
                 <button onClick={() => setPreviewModal(false)} className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition">
                    <X size={24} />
                 </button>
              </div>
              
              <div className="flex-1 overflow-y-auto p-10 bg-slate-100 relative">
                 <div className="max-w-md mx-auto bg-white shadow-2xl rounded-sm p-12 min-h-[500px] font-serif space-y-8 select-none">
                    <div className="text-center border-b pb-8">
                       <h2 className="text-xl font-black text-slate-900">محضر تسليم أعمال المشروع</h2>
                       <p className="text-[10px] text-slate-400 mt-2 font-mono">ID: REF-DEL-2024-0992</p>
                    </div>
                    <div className="space-y-4 text-xs leading-relaxed text-slate-700">
                       <p>بهذا المحضر يقر الطرف الثاني (أحمد السعيد) بأنه قد أتم جميع المهام الموكلة إليه في المرحلة الأولى من العقد رقم #2024-001234 والتي تشمل:</p>
                       <ul className="list-disc pr-6 space-y-2 font-bold">
                          <li>تحليل المتطلبات وتجهيز بيئة العمل.</li>
                          <li>تصميم واجهات المستخدم الأولية (Wireframes).</li>
                          <li>بناء هيكل قاعدة البيانات السحابية.</li>
                          <li>تسليم كود المصدر عبر المستودع الخاص بالعميل.</li>
                       </ul>
                       <p className="pt-4 italic">يرجى من العميل مراجعة ما تم تسليمه خلال المدة القانونية المحددة.</p>
                    </div>
                    <div className="pt-20 text-center opacity-30">
                       <ShieldCheck size={64} className="mx-auto" />
                       <p className="text-[8px] font-black uppercase mt-2">Certified Digital Review Layer</p>
                    </div>
                 </div>
              </div>

              <div className="p-6 bg-white border-t flex gap-4">
                 <div className="flex gap-2">
                    <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-blue-600 transition"><ZoomIn size={20} /></button>
                    <button className="p-4 bg-slate-50 text-slate-400 rounded-2xl hover:text-blue-600 transition"><ZoomOut size={20} /></button>
                 </div>
                 <button 
                   onClick={() => { setPreviewModal(false); setConfirmReleaseModal(true); }}
                   className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 active:scale-95 transition"
                 >
                    الموافقة والإفراج المباشر
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* MODAL: Confirm Approval with Password */}
      {confirmReleaseModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 space-y-8 shadow-2xl relative overflow-hidden animate-in zoom-in duration-300 border border-white/20">
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full -mr-16 -mt-16 blur-2xl opacity-60" />
              
              <div className="flex justify-between items-center relative z-10">
                 <div className="w-16 h-16 bg-emerald-50 text-emerald-600 rounded-[1.8rem] flex items-center justify-center shadow-inner">
                    <CheckCircle2 size={36} />
                 </div>
                 <button onClick={() => setConfirmReleaseModal(false)} className="p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-red-500 transition"><X size={20} /></button>
              </div>
              
              <div className="space-y-2 relative z-10">
                 <h3 className="text-2xl font-black text-slate-900 tracking-tight leading-tight">تأكيد إتمام العمل والإفراج المالي</h3>
                 <p className="text-xs text-slate-500 leading-relaxed font-medium">
                   بإتمام هذه الخطوة، أنت تقر باستلام العمل كاملاً وتفوض المنصة بتحويل <span className="font-black text-blue-600 text-sm">٢٥,٠٠٠ ريال</span> فوراً لحساب المستفيد.
                 </p>
              </div>
              
              <div className="space-y-5 relative z-10">
                 <div className="space-y-1.5">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">أدخل كلمة المرور للتأكيد</label>
                    <div className="relative group">
                       <input 
                          type="password" 
                          value={password}
                          onChange={e => setPassword(e.target.value)}
                          className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-center text-xl font-black focus:bg-white focus:border-blue-600 outline-none transition shadow-inner"
                          placeholder="••••"
                       />
                       <Lock size={16} className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-blue-600 transition" />
                    </div>
                 </div>

                 <button 
                   onClick={() => handleAction('approve')}
                   disabled={password.length < 4 || isProcessing}
                   className="w-full py-5 bg-blue-600 text-white rounded-[1.5rem] font-black text-base shadow-xl shadow-blue-200 active:scale-95 transition-all flex items-center justify-center gap-3 relative overflow-hidden"
                 >
                    {isProcessing ? (
                      <RefreshCw size={20} className="animate-spin" />
                    ) : (
                      <>تأكيد الإفراج الفوري <ArrowUpRight size={20} /></>
                    )}
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* MODAL: Period Extension */}
      {extendModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 space-y-8 shadow-2xl relative overflow-hidden animate-in zoom-in duration-300">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 text-slate-600 rounded-2xl flex items-center justify-center"><Calendar size={24} /></div>
                    <h3 className="text-xl font-black text-slate-900">تمديد فترة الحجز</h3>
                 </div>
                 <button onClick={() => setExtendModal(false)} className="p-2 text-slate-300 hover:text-slate-500 transition"><X size={20} /></button>
              </div>

              <div className="space-y-6">
                 <div className="space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">عدد أيام التمديد الإضافية</p>
                    <div className="grid grid-cols-3 gap-3">
                       {[3, 7, 14].map(days => (
                         <button 
                           key={days} 
                           onClick={() => setExtensionDays(days)}
                           className={`py-4 rounded-2xl border-2 font-black text-sm transition-all ${extensionDays === days ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-slate-50 border-transparent text-slate-500'}`}
                         >
                           {days} أيام
                         </button>
                       ))}
                    </div>
                 </div>

                 <div className="p-5 bg-amber-50 rounded-[1.8rem] border border-amber-100 flex gap-4">
                    <AlertTriangle size={24} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-amber-800 font-bold leading-relaxed">تنبيه: التمديد سيقوم بتأخير استحقاق الطرف الآخر. سيتم إخطارهم بهذا التغيير وتوثيقه في السجل.</p>
                 </div>

                 <button 
                    onClick={() => handleAction('extend')}
                    disabled={isProcessing}
                    className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-sm shadow-xl active:scale-95 transition"
                 >
                    {isProcessing ? <RefreshCw size={20} className="animate-spin mx-auto" /> : 'تحديث الجدول الزمني'}
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* MODAL: Rejection Reason */}
      {rejectModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 space-y-8 shadow-2xl relative overflow-hidden animate-in zoom-in duration-300">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center"><X size={24} /></div>
                    <h3 className="text-xl font-black text-slate-900">رفض طلب الإفراج</h3>
                 </div>
                 <button onClick={() => setRejectModal(false)} className="p-2 text-slate-300 hover:text-slate-500 transition"><X size={20} /></button>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">سبب الرفض (إلزامي للطرف الآخر)</label>
                    <textarea 
                       value={rejectReason}
                       onChange={e => setRejectReason(e.target.value)}
                       rows={4}
                       placeholder="مثال: لم يتم تسليم الملفات المصدرية المذكورة في الملحق..."
                       className="w-full bg-slate-50 border border-slate-100 rounded-[1.8rem] p-5 text-xs font-medium focus:bg-white focus:ring-4 focus:ring-red-50 outline-none transition shadow-inner resize-none"
                    />
                 </div>

                 <button 
                    onClick={() => handleAction('reject')}
                    disabled={rejectReason.length < 10 || isProcessing}
                    className="w-full py-5 bg-red-600 text-white rounded-[1.5rem] font-black text-sm shadow-xl active:scale-95 transition disabled:bg-slate-200"
                 >
                    {isProcessing ? <RefreshCw size={20} className="animate-spin mx-auto" /> : 'إرسال الرفض الرسمي'}
                 </button>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .animate-spin-slow { animation: spin 4s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        @keyframes bounce-slow { 0%, 100% { transform: translate(50%, -50%) translateY(0); } 50% { transform: translate(50%, -50%) translateY(-5px); } }
        .animate-bounce-slow { animation: bounce-slow 2.5s ease-in-out infinite; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default EscrowManagementDashboard;