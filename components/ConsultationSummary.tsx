
import React, { useState } from 'react';
import { Star, CheckCircle2, FileText, Download, Scale, Share2, Printer, Sparkles, ChevronLeft, Heart } from 'lucide-react';
import { ConsultationSession } from '../types';

interface ConsultationSummaryProps {
  session: ConsultationSession;
  onDone: () => void;
  onAction: (action: 'contract' | 'dispute' | 'lawyer') => void;
}

const ConsultationSummary: React.FC<ConsultationSummaryProps> = ({ session, onDone, onAction }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = () => {
    setIsSubmitting(true);
    // Simulate API call
    setTimeout(() => {
      onDone(); // Navigate back to dashboard
    }, 1500);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-500 overflow-y-auto pb-8">
      {/* Success Header */}
      <div className="p-10 bg-indigo-600 text-white text-center relative overflow-hidden rounded-b-[3.5rem] shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <Scale size={300} className="absolute -bottom-20 -right-20 rotate-12" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-4">
          <div className="w-20 h-20 bg-white/20 backdrop-blur-md rounded-3xl flex items-center justify-center border border-white/30 shadow-2xl animate-in zoom-in duration-700">
            <CheckCircle2 size={48} className="text-white" />
          </div>
          <h1 className="text-2xl font-black tracking-tight">اكتملت الجلسة بنجاح</h1>
          <p className="text-indigo-100 text-xs font-medium max-w-[200px] mx-auto opacity-80 leading-relaxed">
            شكراً لثقتك في منصتنا. نأمل أن تكون الاستشارة قد حققت توقعاتك.
          </p>
        </div>
      </div>

      <div className="p-6 space-y-8 -mt-6">
        {/* Rating Section */}
        <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-slate-200/50 border border-white space-y-8 text-center animate-in slide-in-from-bottom duration-500">
          <div className="space-y-2">
            <h2 className="text-xl font-black text-slate-900">كيف تقيّم المحامي؟</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">تقييمك يساعدنا على تحسين جودة الخدمة</p>
          </div>
          
          <div className="flex justify-center gap-3">
            {[1, 2, 3, 4, 5].map((s) => (
              <button 
                key={s} 
                onClick={() => setRating(s)}
                className={`transition-all duration-300 transform ${s <= rating ? 'scale-125 text-amber-400' : 'text-slate-200 hover:text-slate-300'}`}
              >
                <Star size={44} fill={s <= rating ? 'currentColor' : 'none'} strokeWidth={2} />
              </button>
            ))}
          </div>

          <div className="space-y-4 text-right">
             <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">رأيك الشخصي (اختياري)</label>
             <textarea 
               value={comment}
               onChange={e => setComment(e.target.value)}
               placeholder="اكتب هنا تجربتك مع المحامي..."
               className="w-full h-32 bg-slate-50 border border-slate-100 rounded-[1.8rem] p-5 text-sm font-medium focus:bg-white focus:ring-4 focus:ring-indigo-100 outline-none transition shadow-inner resize-none"
             />
          </div>
        </div>

        {/* Lawyer Info Summary */}
        <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex items-center justify-between">
           <div className="flex items-center gap-4">
              <img src={session.lawyerAvatar} className="w-12 h-12 rounded-2xl object-cover border border-slate-50" alt="L" />
              <div>
                 <h4 className="text-sm font-black text-slate-900">{session.lawyerName}</h4>
                 <p className="text-[9px] font-bold text-slate-400">{session.specialty}</p>
              </div>
           </div>
           <div className="bg-emerald-50 text-emerald-600 p-2 rounded-xl">
              <Heart size={20} fill="currentColor" />
           </div>
        </div>

        {/* Recommendation Step */}
        <div className="p-6 bg-slate-900 rounded-[2.5rem] text-white space-y-4 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-blue-600/20 rounded-full blur-2xl" />
           <div className="flex items-center gap-3">
              <Sparkles className="text-blue-400" size={20} />
              <h4 className="text-xs font-black uppercase tracking-widest text-blue-300">الخطوة القادمة المقترحة</h4>
           </div>
           <p className="text-[11px] text-slate-300 font-medium leading-relaxed pr-1">
             بناءً على نتائج الجلسة، يقترح المساعد الذكي البدء في صياغة "عقد تسوية" لحفظ حقوقك القانونية.
           </p>
           <button 
             onClick={() => onAction('contract')}
             className="w-full py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs shadow-lg active:scale-95 transition"
           >
             بدء صياغة العقد المقترح
           </button>
        </div>
      </div>

      {/* Final Action Button */}
      <div className="p-6 bg-transparent">
         <button 
           onClick={handleSubmit}
           disabled={isSubmitting || rating === 0}
           className={`w-full py-5 rounded-[2rem] font-black text-lg shadow-2xl transition-all flex items-center justify-center gap-3 relative overflow-hidden ${
             rating > 0 ? 'bg-indigo-600 text-white shadow-indigo-200 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'
           }`}
         >
            {isSubmitting ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <>إرسال والعودة للرئيسية <ChevronLeft size={24} /></>
            )}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
         </button>
      </div>
    </div>
  );
};

export default ConsultationSummary;
