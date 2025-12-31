
import React, { useState } from 'react';
// Fix: Added missing Sparkles import from lucide-react
import { Star, CheckCircle2, FileText, Download, ArrowRight, Scale, ExternalLink, MessageCircle, Info, ChevronDown, List, BookOpen, UserPlus, AlertTriangle, ChevronLeft, Gavel, Share2, Printer, Sparkles } from 'lucide-react';
import { ConsultationSession } from '../types';

interface ConsultationSummaryProps {
  session: ConsultationSession;
  onDone: () => void;
  onAction: (action: 'contract' | 'dispute' | 'lawyer') => void;
}

const ConsultationSummary: React.FC<ConsultationSummaryProps> = ({ session, onDone, onAction }) => {
  const [rating, setRating] = useState(0);
  const [expandedSections, setExpandedSections] = useState<string[]>(['summary', 'analysis']);

  const toggleSection = (id: string) => {
    setExpandedSections(prev => 
      prev.includes(id) ? prev.filter(s => s !== id) : [...prev, id]
    );
  };

  const summary = session.summaryData || {
    executiveSummary: "استشارة قانونية شاملة بخصوص نزاع عمالي وإنهاء عقد من طرف واحد.",
    facts: ["عقد عمل لمدة ٣ سنوات", "إنهاء العلاقة بدون إنذار مسبق", "مطالبة بمستحقات مالية"],
    parties: [{ name: "المستخدم", role: "موظف" }, { name: "شركة الحلول", role: "صاحب العمل" }],
    analysis: [
      { law: "نظام العمل السعودي", article: "المادة ٧٧", text: "استحقاق التعويض عن إنهاء العقد لسبب غير مشروع." }
    ],
    recommendations: [
      { title: "صياغة عقد تسوية", action: "contract", type: 'contract' },
      { title: "فتح نزاع رسمي", action: "dispute", type: 'dispute' }
    ]
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in zoom-in duration-500 pb-20">
      {/* Header (Screen 9) */}
      <div className="p-8 bg-blue-600 text-white text-center relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
          <Scale size={240} className="absolute -bottom-10 -right-10 rotate-12" />
        </div>
        <div className="relative z-10 flex flex-col items-center gap-3">
          <div className="px-4 py-1 bg-white/20 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest border border-white/30">
            ✓ استشارة مكتملة
          </div>
          <h1 className="text-xl font-black">تقرير الاستشارة القانونية</h1>
          <p className="text-blue-100 text-[10px] font-medium">
            بتاريخ {new Date().toLocaleDateString('ar-SA')} • {session.lawyerName ? `المحامي: ${session.lawyerName}` : 'بواسطة المساعد الذكي'}
          </p>
        </div>
      </div>

      <div className="flex-1 p-5 space-y-6 -mt-4 bg-slate-50 rounded-t-[2.5rem] relative z-20 overflow-y-auto">
        
        {/* Topic & Executive Summary */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <div>
             <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">الموضوع</h4>
             <h2 className="text-lg font-bold text-slate-900">{summary.executiveSummary.split('.')[0]}</h2>
          </div>
          <div className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100/50 flex gap-3">
            <Info size={20} className="text-blue-600 shrink-0" />
            <p className="text-xs text-slate-700 leading-relaxed font-medium">
              {summary.executiveSummary}
            </p>
          </div>
        </div>

        {/* Facts (Screen 9 Section) */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <button 
            onClick={() => toggleSection('facts')}
            className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-indigo-50 text-indigo-600 rounded-lg flex items-center justify-center">
                <List size={18} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">الوقائع المجمّعة</h3>
            </div>
            <ChevronDown size={18} className={`text-slate-400 transition-transform ${expandedSections.includes('facts') ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.includes('facts') && (
            <div className="px-5 pb-5 space-y-4 animate-in slide-in-from-top duration-300">
              <ul className="space-y-3">
                {summary.facts.map((fact, i) => (
                  <li key={i} className="flex gap-3 text-sm text-slate-600">
                    <div className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-2 shrink-0" />
                    {fact}
                  </li>
                ))}
              </ul>
              <div className="pt-4 border-t border-slate-50">
                 <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">الأطراف:</p>
                 <div className="flex flex-wrap gap-2">
                    {summary.parties.map((p, i) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 rounded-lg text-xs font-bold text-slate-700">
                         {p.name} ({p.role})
                      </span>
                    ))}
                 </div>
              </div>
            </div>
          )}
        </div>

        {/* Analysis & Legal Articles (Screen 9 Section) */}
        <div className="bg-white rounded-3xl shadow-sm border border-slate-100 overflow-hidden">
          <button 
            onClick={() => toggleSection('analysis')}
            className="w-full p-5 flex items-center justify-between hover:bg-slate-50 transition"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen size={18} />
              </div>
              <h3 className="font-bold text-slate-900 text-sm">التحليل والرأي القانوني</h3>
            </div>
            <ChevronDown size={18} className={`text-slate-400 transition-transform ${expandedSections.includes('analysis') ? 'rotate-180' : ''}`} />
          </button>
          {expandedSections.includes('analysis') && (
            <div className="px-5 pb-5 space-y-4 animate-in slide-in-from-top duration-300">
              <p className="text-sm font-bold text-slate-800">الأنظمة ذات الصلة:</p>
              {summary.analysis.map((item, i) => (
                <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-200 group relative">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-black text-blue-700">{item.law}</span>
                    <span className="text-[10px] font-bold text-slate-400">{item.article}</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed italic">"{item.text}"</p>
                  <button className="absolute -bottom-2 -left-2 bg-white shadow-sm border p-1 rounded-lg opacity-0 group-hover:opacity-100 transition">
                     <ExternalLink size={12} className="text-blue-600" />
                  </button>
                </div>
              ))}
              <div className="pt-2 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                <p className="text-xs font-bold text-emerald-900 leading-relaxed">
                   الرأي: بناءً على الأنظمة المذكورة، يحق لك المطالبة بالتعويض وتصفية كافة مستحقاتك المالية نظراً لعدم وجود سبب مشروع للإنهاء.
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Recommendations (Screen 9 Section) */}
        <section className="space-y-4">
          <h3 className="font-bold text-slate-900 text-sm px-1 flex items-center gap-2">
            <Sparkles size={16} className="text-amber-500" /> الخطوات المقترحة
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {summary.recommendations.map((rec, i) => (
              <button 
                key={i}
                onClick={() => onAction(rec.type)}
                className="flex items-center justify-between p-4 bg-white border border-slate-100 rounded-3xl group hover:border-blue-600 transition shadow-sm active:scale-95"
              >
                <div className="flex items-center gap-4 text-right">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center text-white shadow-lg ${
                    rec.type === 'contract' ? 'bg-blue-600 shadow-blue-100' :
                    rec.type === 'dispute' ? 'bg-slate-800 shadow-slate-100' :
                    'bg-indigo-600 shadow-indigo-100'
                  }`}>
                    {rec.type === 'contract' ? <FileText size={20} /> : 
                     rec.type === 'dispute' ? <Gavel size={20} /> : <UserPlus size={20} />}
                  </div>
                  <div>
                    <p className="text-xs font-black text-slate-900">{rec.title}</p>
                    <p className="text-[9px] text-slate-400">تنفيذ الإجراء فوراً</p>
                  </div>
                </div>
                <ChevronLeft size={18} className="text-slate-300 group-hover:text-blue-600 transition" />
              </button>
            ))}
          </div>
        </section>

        {/* Rating Section */}
        {session.lawyerName && (
          <div className="text-center space-y-4 pt-6 border-t border-slate-200">
            <h3 className="font-bold text-slate-900">كيف كانت تجربتك؟</h3>
            <div className="flex justify-center gap-2">
              {[1, 2, 3, 4, 5].map((s) => (
                <button 
                  key={s} 
                  onClick={() => setRating(s)}
                  className={`transition-all duration-300 ${s <= rating ? 'scale-110' : 'opacity-30 hover:opacity-50'}`}
                >
                  <Star size={32} fill={s <= rating ? '#f59e0b' : 'none'} className={s <= rating ? 'text-amber-500' : 'text-slate-400'} />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Footer Actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-4 bg-white/80 backdrop-blur-md border-t flex gap-3 z-30">
        <button 
          onClick={onDone}
          className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-bold text-sm shadow-xl transition active:scale-95"
        >
          العودة للرئيسية
        </button>
        <div className="flex gap-2">
           <button className="p-4 bg-slate-100 text-slate-700 rounded-2xl transition hover:bg-slate-200 active:scale-95">
              <Share2 size={20} />
           </button>
           <button className="p-4 bg-slate-100 text-slate-700 rounded-2xl transition hover:bg-slate-200 active:scale-95">
              <Printer size={20} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default ConsultationSummary;
