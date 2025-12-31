
import React, { useState, useEffect } from 'react';
import { ArrowRight, Target, ShieldCheck, Sparkles, Bot, Clock, ChevronLeft, Scale, AlertTriangle, CheckCircle2 } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

interface DisputeEvaluationScreenProps {
  onBack: () => void;
  onNext: () => void;
}

const DisputeEvaluationScreen: React.FC<DisputeEvaluationScreenProps> = ({ onBack, onNext }) => {
  const [score, setScore] = useState(78);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 2000);
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 bg-white space-y-6">
         <div className="w-20 h-20 border-4 border-blue-50 border-t-blue-600 rounded-full animate-spin" />
         <p className="text-sm font-black text-slate-900 animate-pulse">جاري تحليل موقفك القانوني...</p>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in zoom-in duration-500 overflow-y-auto pb-32">
      <div className="p-4 bg-white border-b sticky top-0 z-30 flex items-center gap-3 shadow-sm">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowRight size={20} /></button>
        <h1 className="text-lg font-black text-slate-900 tracking-tight">تقرير الموقف القانوني</h1>
      </div>

      <div className="p-6 space-y-8">
        <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white text-center relative overflow-hidden shadow-2xl">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse" />
           <div className="relative z-10 space-y-4">
              <div className="inline-flex flex-col items-center">
                 <span className="text-5xl font-black text-blue-400">{score}%</span>
                 <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">فرصة نجاح الموقف</span>
              </div>
              <div className="pt-4 border-t border-white/10">
                 <p className="text-xs text-slate-300 leading-relaxed font-medium italic">"موقفك القانوني قوي في المطالبة بالتعويض نظراً لوجود أدلة كتابية على خرق شروط العقد الأساسية."</p>
              </div>
           </div>
        </section>

        <div className="grid grid-cols-1 gap-4">
           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-emerald-600">
                 <CheckCircle2 size={18} />
                 <h4 className="font-black text-sm">نقاط القوة</h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                 <li>• وجود إقرار كتابي من الطرف الآخر بالتأخير.</li>
                 <li>• الوثيقة المرفوعة تحمل بصمة رقمية صحيحة.</li>
              </ul>
           </div>
           <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
              <div className="flex items-center gap-2 text-red-600">
                 <AlertTriangle size={18} />
                 <h4 className="font-black text-sm">المخاطر المحتملة</h4>
              </div>
              <ul className="space-y-2 text-xs text-slate-700">
                 <li>• قد يدعي الطرف الآخر "القوة القاهرة" لتبرير التأخير.</li>
              </ul>
           </div>
        </div>

        <div className="bg-blue-600 p-8 rounded-[3rem] text-white shadow-xl flex flex-col gap-6">
           <div className="flex items-center gap-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md shadow-2xl border border-white/10 shrink-0">
                 <Scale size={32} className="text-white" />
              </div>
              <div className="space-y-1">
                 <h4 className="text-sm font-black uppercase tracking-tight">الخطوة القادمة</h4>
                 <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest">دعوة الطرف الآخر لبدء المواجهة</p>
              </div>
           </div>
           <p className="text-xs font-medium leading-relaxed">بناءً على هذا التقييم، ننصحك بالمتابعة لإضافة "الطرف الآخر" وفتح غرفة "تبادل الأدلة" الرسمية.</p>
           <button 
             onClick={onNext}
             className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition"
           >
              المتابعة لإضافة الطرف الآخر
           </button>
        </div>
      </div>
    </div>
  );
};

export default DisputeEvaluationScreen;
