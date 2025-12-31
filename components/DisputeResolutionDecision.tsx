
import React, { useState, useEffect, useRef } from 'react';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, Gavel, 
  CreditCard, Lock, Clock, AlertTriangle, FileText, 
  Download, Star, ChevronLeft, Sparkles, RefreshCw,
  Fingerprint, PenTool, Globe, ShieldAlert, X, Scan,
  Check
} from 'lucide-react';
import { DisputeCase } from '../types';

interface DisputeResolutionDecisionProps {
  dispute: DisputeCase;
  onBack: () => void;
  onGoToContract: () => void;
}

type Step = 'decision' | 'biometric' | 'signature' | 'blockchain' | 'success';

const DisputeResolutionDecision: React.FC<DisputeResolutionDecisionProps> = ({ dispute, onBack, onGoToContract }) => {
  const [currentStep, setCurrentStep] = useState<Step>('decision');
  const [executionProgress, setExecutionProgress] = useState(45);
  const [showAppealModal, setShowAppealModal] = useState(false);
  const [isBiometricVerifying, setIsBiometricVerifying] = useState(false);
  const [blockchainProgress, setBlockchainProgress] = useState(0);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  const disputeId = dispute?.id || '#DISP-2025-8842';
  const disputeSubject = dispute?.subject || 'نزاع حول مخرجات تقنية';

  // منطوق الحكم المستند إلى البيانات
  const decisionPoints = [
    `إثبات تقصير الطرف الثاني في تنفيذ: ${disputeSubject}`,
    "إلزام الطرف الثاني بإعادة جدولة الدفعات (جدول مالي جديد)",
    "الإفراج الفوري عن مبلغ ٢,٥٠٠ ريال من الضمان للطرف الأول كتعويض",
    "تحديث بند 'الصيانة' في العقد الأصلي ليكون ملزماً خلال ٤٨ ساعة"
  ];

  // تفعيل مراسم الإغلاق
  const startClosingCeremony = () => {
    setCurrentStep('biometric');
  };

  const handleBiometric = () => {
    setIsBiometricVerifying(true);
    setTimeout(() => {
      setIsBiometricVerifying(false);
      setCurrentStep('signature');
    }, 2000);
  };

  const handleBlockchainCommit = () => {
    setCurrentStep('blockchain');
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setBlockchainProgress(progress);
      if (progress >= 100) {
        clearInterval(interval);
        setTimeout(() => setCurrentStep('success'), 800);
      }
    }, 300);
  };

  // توقيع الكانفس
  const startDrawing = (e: any) => {
    setIsDrawing(true);
    const ctx = canvasRef.current?.getContext('2d');
    const rect = canvasRef.current?.getBoundingClientRect();
    if (ctx && rect) {
      ctx.beginPath();
      ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
    }
  };
  const draw = (e: any) => {
    if (!isDrawing) return;
    const ctx = canvasRef.current?.getContext('2d');
    const rect = canvasRef.current?.getBoundingClientRect();
    if (ctx && rect) {
      ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
      ctx.stroke();
    }
  };

  if (currentStep === 'success') {
    return (
      <div className="flex-1 flex flex-col bg-white animate-in zoom-in duration-500 overflow-y-auto p-8 text-center justify-center">
        <div className="relative inline-block mb-8">
          <div className="w-32 h-32 bg-emerald-50 text-emerald-600 rounded-[3.5rem] flex items-center justify-center shadow-2xl animate-bounce mx-auto">
            <CheckCircle2 size={72} />
          </div>
          <Sparkles className="absolute -top-4 -right-4 text-amber-500 animate-pulse" size={32} />
        </div>
        
        <h2 className="text-3xl font-black text-slate-900 mb-3">تم حسم وإغلاق النزاع!</h2>
        <p className="text-sm text-slate-500 font-medium px-4 leading-relaxed mb-8 italic">
          "تم توثيق القرار في سجلات البلوكتشين، وتحديث بنود العقد المالي وإصدار أوامر الدفع التلقائية."
        </p>

        <div className="bg-slate-50 rounded-[2.5rem] p-6 space-y-4 border border-slate-100 shadow-inner mb-8 text-right">
           <div className="flex justify-between items-center border-b border-slate-200 pb-3">
             <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">البصمة الرقمية (TX)</span>
             <span className="text-[10px] font-mono text-blue-600">0x3f2...e1b4</span>
           </div>
           <div className="space-y-3">
             {['تم تحديث جدول الدفعات ✓', 'تم تفعيل تعويض التأخير ✓', 'أرشفة الوثيقة في Blockchain ✓'].map((item, i) => (
               <div key={i} className="flex items-center gap-3 text-xs font-black text-emerald-700">
                  <CheckCircle2 size={16} /> {item}
               </div>
             ))}
           </div>
        </div>

        <div className="space-y-6">
           <h3 className="text-lg font-black text-slate-900">تقييم تجربة الحسم الذكي</h3>
           <div className="flex justify-center gap-3">
             {[1,2,3,4,5].map(s => (
               <button key={s} onClick={() => setRating(s)} className={`transition-all ${s <= rating ? 'scale-125 text-amber-400' : 'text-slate-200'}`}>
                 <Star size={40} fill={s <= rating ? "currentColor" : "none"} />
               </button>
             ))}
           </div>
           <textarea 
             value={comment}
             onChange={e => setComment(e.target.value)}
             placeholder="رأيك يساعدنا في تحسين العدالة الذكية..."
             className="w-full bg-slate-50 border border-slate-200 rounded-3xl p-5 text-sm outline-none resize-none h-24"
           />
           <button onClick={onBack} className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl active:scale-95 transition">إرسال والعودة للرئيسية</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-bottom duration-500 overflow-y-auto pb-32">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-40 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowRight size={20} /></button>
          <div>
            <h1 className="text-lg font-black text-slate-900">قرار حسم النزاع</h1>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">{disputeId} • قرار ملزم</p>
          </div>
        </div>
        <button className="p-2 text-slate-400 hover:text-blue-600 transition"><Download size={20} /></button>
      </div>

      {currentStep === 'decision' && (
        <div className="p-6 space-y-8 animate-in fade-in">
          {/* Official Decision Card */}
          <section className="space-y-4">
             <div className="flex items-center gap-3 px-2">
                <Gavel className="text-blue-600" size={18} />
                <h3 className="font-black text-slate-900 text-xs uppercase tracking-widest">منطوق القرار النهائي</h3>
             </div>
             <div className="bg-white rounded-[2.5rem] border-[8px] border-slate-100 p-8 shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-40 h-40 bg-blue-50/50 rounded-full blur-3xl" />
                <div className="relative z-10 space-y-6">
                   <div className="space-y-4 font-serif leading-[1.8] text-slate-800 text-sm">
                      <p className="font-black text-blue-900 italic">"بناءً على الأدلة الرقمية وبنود العقد المسجلة، تقرر الآتي:"</p>
                      {decisionPoints.map((point, i) => (
                        <div key={i} className="flex gap-3">
                           <span className="font-black text-blue-600">{i+1}.</span>
                           <p className="font-medium">{point}</p>
                        </div>
                      ))}
                   </div>
                </div>
             </div>
          </section>

          {/* Automatic Execution Status (The Financial Part) */}
          <section className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl space-y-6 relative overflow-hidden">
             <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                   <Sparkles className="text-blue-400 animate-pulse" size={24} />
                   <div>
                      <h3 className="font-black text-sm uppercase tracking-widest">التنفيذ التلقائي (Smart Order)</h3>
                      <p className="text-[10px] text-slate-400">جاري تحديث الالتزامات المالية</p>
                   </div>
                </div>
                <span className="text-2xl font-black">{executionProgress}%</span>
             </div>
             
             <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 transition-all duration-1000 ease-out" style={{ width: `${executionProgress}%` }} />
             </div>

             <div className="space-y-4 pt-2">
                {[
                  { label: 'تحديث جدول الدفعات المالي', done: true, desc: 'إضافة دفعة تعويض بقيمة ٢٥٠٠ ريال' },
                  { label: 'إعادة جدولة تواريخ الاستحقاق', active: true, desc: 'تعديل موعد الدفعة القادمة لـ ١٥ فبراير' },
                  { label: 'تفعيل بصمة Blockchain للقرار', pending: true, desc: 'بانتظار الإغلاق النهائي' }
                ].map((step, i) => (
                  <div key={i} className="flex items-start gap-3">
                     <div className={`mt-1 w-5 h-5 rounded-full border-2 flex items-center justify-center ${step.done ? 'bg-emerald-500 border-emerald-500' : step.active ? 'bg-blue-600 border-blue-600 animate-pulse' : 'border-white/10'}`}>
                        {/* Fix: Check was used but not imported from lucide-react */}
                        {step.done && <Check size={12} />}
                     </div>
                     <div>
                        <p className={`text-[11px] font-black ${step.done ? 'text-slate-400 line-through' : 'text-white'}`}>{step.label}</p>
                        <p className="text-[9px] text-slate-500 font-medium">{step.desc}</p>
                     </div>
                  </div>
                ))}
             </div>
          </section>

          {/* Appeal Section (حق الاعتراض) */}
          <section className="space-y-4">
             <div className="p-6 bg-amber-50 rounded-[2.5rem] border border-amber-100 space-y-4">
                <div className="flex items-center gap-3 text-amber-600">
                   <ShieldAlert size={24} />
                   <h3 className="font-black text-sm uppercase tracking-widest">حق الاعتراض القانوني</h3>
                </div>
                <p className="text-[10px] text-amber-800 font-medium leading-relaxed">
                  يحق لك الاعتراض على هذا القرار وتصعيده لمركز التحكيم البشري خلال ٧ أيام عمل من تاريخه.
                </p>
                <button 
                  onClick={() => setShowAppealModal(true)}
                  className="w-full py-4 bg-white border border-amber-200 text-amber-600 rounded-2xl font-black text-xs hover:bg-amber-100 transition active:scale-95 shadow-sm"
                >
                   تقديم طلب اعتراض رسمي
                </button>
             </div>
          </section>

          <div className="pt-8">
            <button 
              onClick={startClosingCeremony}
              className="w-full py-5 bg-emerald-600 text-white rounded-[2rem] font-black text-lg shadow-2xl active:scale-95 transition-all flex items-center justify-center gap-3"
            >
               تأكيد القرار وإغلاق النزاع ✓
            </button>
          </div>
        </div>
      )}

      {/* Ceremony Modals */}
      {currentStep === 'biometric' && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white space-y-8 animate-in zoom-in">
           <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 border-blue-50 ${isBiometricVerifying ? 'animate-pulse bg-blue-50' : 'bg-slate-50'}`}>
              {isBiometricVerifying ? <Scan size={64} className="text-blue-600" /> : <Fingerprint size={64} className="text-slate-400" />}
           </div>
           <div className="text-center space-y-2">
              <h3 className="text-2xl font-black text-slate-900">تأكيد الهوية البيومترية</h3>
              <p className="text-sm text-slate-500 font-medium">الرجاء استخدام بصمة الإصبع أو الوجه لتفويض إغلاق النزاع</p>
           </div>
           <button 
             onClick={handleBiometric}
             disabled={isBiometricVerifying}
             className="w-full py-5 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl"
           >
              {isBiometricVerifying ? 'جاري التحقق...' : 'بدء المسح الحي'}
           </button>
        </div>
      )}

      {currentStep === 'signature' && (
        <div className="flex-1 flex flex-col p-8 bg-white space-y-8 animate-in slide-in-from-left">
           <div className="space-y-2">
              <h3 className="text-2xl font-black text-slate-900">توقيع المصادقة النهائية</h3>
              <p className="text-sm text-slate-500">وقع في المربع أدناه لإتمام التوثيق القانوني</p>
           </div>
           <div className="w-full aspect-[4/2] bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 relative">
              <canvas 
                ref={canvasRef}
                onMouseDown={startDrawing}
                onMouseMove={draw}
                onMouseUp={() => setIsDrawing(false)}
                className="w-full h-full cursor-crosshair"
              />
           </div>
           <button onClick={handleBlockchainCommit} className="w-full py-5 bg-slate-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-3">
              <ShieldCheck size={20} /> تشفير وتسجيل القرار في Blockchain
           </button>
        </div>
      )}

      {currentStep === 'blockchain' && (
        <div className="flex-1 flex flex-col items-center justify-center p-8 bg-slate-900 space-y-10 animate-in fade-in">
           <div className="relative">
              <div className="w-32 h-32 border-4 border-blue-500/20 border-t-blue-400 rounded-full animate-spin" />
              <div className="absolute inset-0 flex items-center justify-center text-blue-400">
                 <Globe size={40} className="animate-pulse" />
              </div>
           </div>
           <div className="text-center space-y-4">
              <h3 className="text-xl font-black text-white">جاري التوثيق في البلوكتشين...</h3>
              <div className="w-64 h-1.5 bg-white/10 rounded-full overflow-hidden mx-auto">
                 <div className="h-full bg-blue-500 transition-all" style={{ width: `${blockchainProgress}%` }} />
              </div>
              <p className="text-[10px] text-slate-500 font-mono">ENCRYPTING RESOLUTION DATA: {blockchainProgress}%</p>
           </div>
        </div>
      )}

      {/* Appeal Modal */}
      {showAppealModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 space-y-6 shadow-2xl animate-in zoom-in duration-300 text-center">
              <div className="w-20 h-20 bg-red-50 text-red-600 rounded-full flex items-center justify-center mx-auto"><AlertTriangle size={40} /></div>
              <h3 className="text-xl font-black text-slate-900">تأكيد طلب الاعتراض؟</h3>
              <p className="text-xs text-slate-500 leading-relaxed">بتقديم الاعتراض، سيتم تجميد كافة مبالغ الضمان المرتبطة بالعقد فوراً وتحويل ملف القضية إلى هيئة تحكيم بشرية للمراجعة اليدوية.</p>
              <div className="flex flex-col gap-3 pt-4">
                 <button onClick={() => { alert('تم تسجيل طلب الاعتراض بنجاح'); setShowAppealModal(false); onBack(); }} className="w-full py-4 bg-red-600 text-white rounded-2xl font-black text-sm active:scale-95 transition">نعم، تقديم اعتراض رسمي</button>
                 <button onClick={() => setShowAppealModal(false)} className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-black text-sm">إلغاء</button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default DisputeResolutionDecision;
