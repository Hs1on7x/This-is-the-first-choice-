
import React, { useState, useEffect } from 'react';
/* Added Bot to imports */
import { 
  ArrowRight, ShieldAlert, CheckCircle2, AlertTriangle, 
  Search, Info, ChevronDown, List, BookOpen, 
  Download, Sparkles, Loader2, Gauge, FileText, 
  Settings, RefreshCw, ChevronLeft, ArrowUpRight, Bot
} from 'lucide-react';
import { ContractDraft, ContractRisk, MissingClause, ClauseAnalysis } from '../types';

interface AIContractRiskAnalysisScreenProps {
  draft: ContractDraft;
  onBack: () => void;
  onNext: () => void;
}

const AIContractRiskAnalysisScreen: React.FC<AIContractRiskAnalysisScreenProps> = ({ draft, onBack, onNext }) => {
  const [analyzing, setAnalyzing] = useState(true);
  const [activeTab, setActiveTab] = useState<'risks' | 'missing' | 'compliance' | 'clauses'>('risks');
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => {
      setAnalyzing(false);
      setScore(85);
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  const risks: ContractRisk[] = [
    { 
      id: 'r1', severity: 'high', title: 'غموض قانوني: المسؤولية عن التأخير', description: 'بند التسليم لا يحدد بوضوح من يتحمل تكلفة التأخير في حالة القوة القاهرة الصغرى.', clause: 'البند 8 - التسليم', impact: 'قد يؤدي لنزاع قضائي حول التعويضات المالية.', recommendation: "أضف: 'يتحمل المورد تكاليف التأخير الناتجة عن أخطاء لوجستية داخلية'.", type: 'غموض قانوني'
    },
    { 
      id: 'r2', severity: 'medium', title: 'بند مفقود: حماية البيانات', description: 'لا يوجد بند صريح يحدد كيفية التعامل مع البيانات الحساسة للطرفين.', clause: 'عام', impact: 'مخاطر تسرب المعلومات التجارية.', recommendation: 'إدراج ملحق حماية البيانات (DPA).', type: 'بند مفقود'
    },
    { 
      id: 'r3', severity: 'low', title: 'صياغة ضعيفة في بند التبليغ', description: 'استخدام صياغة مرنة قد تؤخر وصول الإشعارات الرسمية.', clause: 'البند 12 - التبليغ', impact: 'تأخر في اتخاذ الإجراءات القانونية.', recommendation: "استبدل 'يمكن' بـ 'يجب' لضمان الإلزام.", type: 'صياغة ضعيفة'
    }
  ];

  const missingClauses: MissingClause[] = [
    { label: 'تعريف الأطراف', status: 'present', importance: 'ضروري', description: 'تم التعرف على جميع أطراف العقد وبياناتهم.' },
    { label: 'نطاق العمل (SOW)', status: 'present', importance: 'ضروري', description: 'الأهداف والمهام واضحة ومفصلة.' },
    { label: 'بند السرية (NDA)', status: 'absent', importance: 'مهم', description: 'ضروري لحماية أسرار العمل التجارية.' },
    { label: 'حل النزاعات', status: 'warning', importance: 'ضروري', description: 'آلية فض النزاع الحالية (المحاكم) قد تكون بطيئة، يفضل التحكيم.' },
    { label: 'القوة القاهرة', status: 'absent', importance: 'مستحسن', description: 'لحماية الأطراف من ظروف خارجة عن الإرادة.' },
    { label: 'الملكية الفكرية', status: 'absent', importance: 'مهم', description: 'غير مشمول في المسودة الحالية.' },
  ];

  const clauseAnalysis: ClauseAnalysis[] = [
    { id: 'c1', title: 'البند 1: تعريف الأطراف', status: 'good', details: ['الصياغة واضحة', 'يحتوي على الأرقام الضريبية والسجلات التجارية', 'متوافق مع نظام المعاملات المدنية'] },
    { id: 'c3', title: 'البند 3: المقابل المالي', status: 'warning', details: ['القيمة محددة بدقة', 'طريقة الدفع غير واضحة للطرف الثاني', 'يفتقد بند عن غرامات التأخير في الدفع'], recommendation: "أضف: 'في حالة التأخير في السداد لمدة تزيد عن ١٠ أيام، يحق للطرف الثاني...'" },
    { id: 'c8', title: 'البند 8: إنهاء العقد', status: 'critical', details: ['فترة الإخطار قصيرة جداً (٣ أيام)', 'لا يوضح تبعات الإنهاء المبكر'], recommendation: "تعديل فترة الإخطار لتكون ٣٠ يوماً على الأقل للامتثال للمعايير المهنية." }
  ];

  if (analyzing) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center bg-white p-8 space-y-8 animate-in fade-in duration-500">
        <div className="relative">
          <div className="w-32 h-32 border-[6px] border-slate-50 border-t-blue-600 rounded-full animate-spin shadow-inner" />
          <div className="absolute inset-0 flex items-center justify-center">
             <Bot size={40} className="text-blue-600 animate-pulse" />
          </div>
        </div>
        <div className="text-center space-y-6 max-w-[280px]">
          <h2 className="text-xl font-black text-slate-900 leading-tight">جارٍ تحليل العقد...</h2>
          <div className="space-y-3">
             {[
               { icon: <CheckCircle2 size={14} />, text: 'فحص الصياغة القانونية...', color: 'text-emerald-600' },
               { icon: <CheckCircle2 size={14} />, text: 'كشف المخاطر...', color: 'text-amber-600' },
               { icon: <CheckCircle2 size={14} />, text: 'التحقق من الاكتمال...', color: 'text-blue-600' },
               { icon: <RefreshCw size={14} className="animate-spin" />, text: 'ربط البنود بالأنظمة...', color: 'text-slate-400' },
             ].map((item, idx) => (
               <div key={idx} className={`flex items-center gap-3 text-xs font-bold ${item.color} animate-in slide-in-from-right duration-500`} style={{ animationDelay: `${idx * 500}ms` }}>
                  <div className="shrink-0">{item.icon}</div>
                  <span className="truncate">{item.text}</span>
               </div>
             ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-300 overflow-y-auto pb-48">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-30 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight className="text-slate-700" />
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-900">تحليل العقد</h1>
            <p className="text-[10px] text-slate-400 font-bold uppercase">تحليل ذكي شامل للمخاطر والاكتمال</p>
          </div>
        </div>
        <button className="flex items-center gap-2 px-3 py-1.5 bg-slate-50 rounded-xl text-slate-600 hover:text-blue-600 transition">
          <Download size={16} />
          <span className="text-[10px] font-black uppercase">PDF</span>
        </button>
      </div>

      <div className="p-6 space-y-6">
        {/* Overall Score Card */}
        <div className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-slate-100 flex items-center gap-6 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-40 h-40 bg-blue-50/50 rounded-full -mr-20 -mt-20 blur-3xl transition-transform group-hover:scale-110" />
           <div className="relative shrink-0 flex items-center justify-center">
              <svg className="w-28 h-28 transform -rotate-90">
                <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="10" fill="transparent" className="text-slate-100" />
                <circle cx="56" cy="56" r="48" stroke="currentColor" strokeWidth="10" fill="transparent" strokeDasharray={301.6} strokeDashoffset={301.6 * (1 - score / 100)} className="text-blue-600 transition-all duration-1000 ease-out" />
              </svg>
              <div className="absolute flex flex-col items-center">
                 <span className="text-3xl font-black text-slate-900">{score}</span>
                 <span className="text-[8px] font-black text-slate-400 uppercase tracking-tighter">/ 100</span>
              </div>
           </div>
           <div className="space-y-1 relative z-10">
              <h3 className="text-lg font-black text-slate-900 tracking-tight">التقييم الإجمالي</h3>
              <div className="flex items-center gap-2 text-emerald-600 font-black text-xs">
                 <CheckCircle2 size={14} /> جيد - العقد جاهز تقريباً
              </div>
              <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                تم رصد <span className="text-blue-600 font-black">٣</span> نقاط تحتاج انتباه و <span className="text-red-500 font-black">١</span> تحذير حرِج.
              </p>
           </div>
        </div>

        {/* Tabs Bar */}
        <div className="flex gap-1 bg-white p-1 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto scrollbar-hide no-scrollbar sticky top-16 z-20">
          {[
            { id: 'risks', label: 'كشف المخاطر' },
            { id: 'missing', label: 'البنود الناقصة' },
            { id: 'compliance', label: 'الربط بالأنظمة' },
            { id: 'clauses', label: 'تحليل البنود' }
          ].map(t => (
            <button
              key={t.id}
              onClick={() => setActiveTab(t.id as any)}
              className={`flex-1 px-4 py-2.5 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${activeTab === t.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-400 hover:bg-slate-50'}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="space-y-4 min-h-[400px]">
          {/* Tab 1: Risk Detection */}
          {activeTab === 'risks' && (
            <div className="space-y-4 animate-in slide-in-from-bottom duration-300">
               {risks.map((risk) => (
                 <div key={risk.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 relative overflow-hidden group hover:border-blue-200 transition-all">
                    <div className={`absolute top-0 right-0 w-1.5 h-full ${risk.severity === 'high' ? 'bg-red-500' : risk.severity === 'medium' ? 'bg-amber-500' : 'bg-blue-500'}`} />
                    <div className="flex items-start justify-between">
                       <div className="space-y-1">
                          <div className="flex items-center gap-2">
                             <span className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${
                               risk.severity === 'high' ? 'bg-red-50 text-red-600' : risk.severity === 'medium' ? 'bg-amber-50 text-amber-600' : 'bg-blue-50 text-blue-600'
                             }`}>
                               {risk.type}
                             </span>
                             <span className="text-[10px] font-bold text-slate-400">{risk.clause}</span>
                          </div>
                          <h4 className="font-black text-slate-900 text-sm leading-tight group-hover:text-blue-600 transition">{risk.title}</h4>
                       </div>
                    </div>
                    <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{risk.description}</p>
                    <div className="grid grid-cols-1 gap-2 p-4 bg-slate-50 rounded-2xl border border-slate-100/50">
                       <div className="flex gap-2">
                          <ShieldAlert size={14} className="text-amber-500 shrink-0 mt-0.5" />
                          <p className="text-[10px] text-slate-600"><span className="font-black text-slate-900">التأثير المحتمل:</span> {risk.impact}</p>
                       </div>
                       <div className="flex gap-2">
                          <Sparkles size={14} className="text-blue-600 shrink-0 mt-0.5" />
                          <p className="text-[10px] text-blue-800"><span className="font-black text-blue-900">التوصية:</span> {risk.recommendation}</p>
                       </div>
                    </div>
                    <div className="flex gap-2 pt-2">
                       <button className="flex-1 py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black hover:bg-blue-700 active:scale-95 transition shadow-lg shadow-blue-100">تطبيق التوصية</button>
                       <button className="px-5 py-3 border border-slate-100 rounded-xl text-[10px] font-black text-slate-400 hover:bg-slate-50 hover:text-slate-600 transition">تجاهل</button>
                    </div>
                 </div>
               ))}
            </div>
          )}

          {/* Tab 2: Missing Clauses */}
          {activeTab === 'missing' && (
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-4 space-y-2 animate-in slide-in-from-bottom duration-300">
               <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2 mb-4">قائمة التحقق الذكية</h4>
               {missingClauses.map((c, i) => (
                 <div key={i} className="flex items-center justify-between p-4 rounded-2xl hover:bg-slate-50 transition border border-transparent hover:border-slate-100 group">
                    <div className="flex items-center gap-4">
                       <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-lg ${
                         c.status === 'absent' ? 'bg-red-50 text-red-500' : c.status === 'warning' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-500'
                       }`}>
                          {c.status === 'absent' ? <AlertTriangle size={20} /> : c.status === 'warning' ? <Info size={20} /> : <CheckCircle2 size={20} />}
                       </div>
                       <div>
                          <p className="text-sm font-black text-slate-900">{c.label}</p>
                          <p className={`text-[8px] font-black uppercase tracking-wider ${c.importance === 'ضروري' ? 'text-red-500' : 'text-slate-400'}`}>الأهمية: {c.importance}</p>
                          <p className="text-[10px] text-slate-500 mt-1 max-w-[180px] font-medium leading-tight">{c.description}</p>
                       </div>
                    </div>
                    {c.status !== 'present' && (
                      <button className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100 opacity-0 group-hover:opacity-100 transition active:scale-95">
                         <Sparkles size={18} />
                      </button>
                    )}
                 </div>
               ))}
               <button className="w-full py-4 mt-4 bg-slate-900 text-white rounded-2xl font-black text-xs shadow-xl active:scale-95 transition">إضافة جميع البنود الناقصة بـ AI</button>
            </div>
          )}

          {/* Tab 3: Legal Compliance */}
          {activeTab === 'compliance' && (
            <div className="space-y-6 animate-in slide-in-from-bottom duration-300">
               {/* Compliance Score Summary */}
               <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-6 shadow-2xl relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-48 h-48 bg-blue-500/20 rounded-full -mr-24 -mt-24 blur-3xl" />
                  <div className="flex items-center justify-between relative z-10">
                     <div className="space-y-1">
                        <h4 className="text-xs font-black uppercase tracking-widest text-blue-400">نسبة الامتثال للأنظمة</h4>
                        <p className="text-[10px] text-slate-400 font-medium">تم تطبيق ٨ من أصل ٩ مواد نظامية مرجعية.</p>
                     </div>
                     <span className="text-4xl font-black text-white">٩٠٪</span>
                  </div>
                  <div className="w-full h-3 bg-white/10 rounded-full overflow-hidden relative z-10">
                     <div className="w-[90%] h-full bg-blue-500 shadow-[0_0_15px_rgba(59,130,246,0.5)]" />
                  </div>
               </div>
               
               {/* Reference Laws */}
               <div className="space-y-4">
                  <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">📖 الأنظمة المرجعية والربط</h4>
                  {[
                    { name: 'نظام العمل السعودي', articles: [{ num: '74', title: 'إنهاء العقد', status: 'linked' }, { num: '80', title: 'فصل الموظف', status: 'linked' }, { num: '50', title: 'فترة التجربة', status: 'missing' }] },
                    { name: 'نظام المعاملات المدنية', articles: [{ num: '107', title: 'التعويض عن الضرر', status: 'linked' }] }
                  ].map((law, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                       <div className="flex items-center justify-between border-b border-slate-50 pb-3">
                          <div className="flex items-center gap-3 text-blue-600">
                             <BookOpen size={20} />
                             <h5 className="font-black text-sm text-slate-900">{law.name}</h5>
                          </div>
                          <span className="text-[9px] font-black text-slate-400 uppercase">{law.articles.length} مواد</span>
                       </div>
                       <div className="space-y-3">
                          {law.articles.map((art, j) => (
                             <div key={j} className="flex items-center justify-between group">
                                <div className="flex items-center gap-3">
                                   <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-black ${
                                     art.status === 'linked' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'
                                   }`}>
                                      {art.num}
                                   </div>
                                   <div>
                                      <p className="text-xs font-bold text-slate-800 leading-none">{art.title}</p>
                                      <p className="text-[8px] font-black text-slate-400 uppercase mt-1">المادة {art.num}</p>
                                   </div>
                                </div>
                                <div className="flex items-center gap-2">
                                   <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded ${
                                      art.status === 'linked' ? 'text-emerald-500' : 'text-red-500'
                                   }`}>
                                      {art.status === 'linked' ? '✓ مرتبط بالبند 3' : '⚠️ غير مشمول'}
                                   </span>
                                   <button className="p-1.5 hover:bg-slate-50 rounded-lg transition text-slate-300 hover:text-blue-600">
                                      <ArrowUpRight size={14} />
                                   </button>
                                </div>
                             </div>
                          ))}
                       </div>
                    </div>
                  ))}
               </div>
            </div>
          )}

          {/* Tab 4: Clause Analysis */}
          {activeTab === 'clauses' && (
            <div className="space-y-4 animate-in slide-in-from-bottom duration-300">
               {clauseAnalysis.map((c) => (
                 <div key={c.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                       <h4 className="text-sm font-black text-slate-900">{c.title}</h4>
                       <div className={`flex items-center gap-2 px-3 py-1 rounded-full text-[9px] font-black uppercase ${
                         c.status === 'good' ? 'bg-emerald-50 text-emerald-600' : c.status === 'warning' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                       }`}>
                          <div className={`w-1.5 h-1.5 rounded-full ${
                             c.status === 'good' ? 'bg-emerald-500' : c.status === 'warning' ? 'bg-amber-500' : 'bg-red-500'
                          }`} />
                          {c.status === 'good' ? 'حالة جيدة' : c.status === 'warning' ? 'يحتاج تحسين' : 'حرِج'}
                       </div>
                    </div>
                    <div className="space-y-2">
                       {c.details.map((detail, idx) => (
                         <div key={idx} className="flex gap-2 text-[10px] text-slate-600 font-medium">
                            <CheckCircle2 size={12} className={idx === 0 ? "text-blue-500" : "text-slate-300"} />
                            <span>{detail}</span>
                         </div>
                       ))}
                    </div>
                    {c.recommendation && (
                      <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100/50 space-y-3">
                         <p className="text-[10px] text-blue-800 font-bold leading-relaxed italic">
                           " {c.recommendation} "
                         </p>
                         <button className="w-full py-2.5 bg-blue-600 text-white rounded-xl text-[9px] font-black active:scale-95 transition shadow-lg shadow-blue-100">تطبيق التعديل المقترح</button>
                      </div>
                    )}
                 </div>
               ))}
            </div>
          )}
        </div>

        {/* Action Summary Footer Bar */}
        <div className="bg-white p-6 rounded-[2.5rem] border border-slate-200 flex flex-col gap-4 shadow-xl">
           <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0">
                 <Settings size={24} className="animate-spin-slow" />
              </div>
              <div className="space-y-1 flex-1">
                 <h4 className="text-xs font-black uppercase tracking-widest text-slate-900">الإجراءات المقترحة (٤)</h4>
                 <p className="text-[10px] text-slate-400 font-medium leading-relaxed">
                    إضافة ٣ بنود ناقصة، تحسين ٢ بند، ومراجعة تحذير واحد حرِج لضمان الحماية القصوى.
                 </p>
              </div>
           </div>
           <div className="flex gap-2">
              <button 
                onClick={() => alert('تم تطبيق جميع التوصيات الذكية')}
                className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl text-xs font-black shadow-xl shadow-blue-100 active:scale-95 transition"
              >
                تطبيق جميع التوصيات تلقائياً
              </button>
              <button className="flex-1 py-4 bg-slate-100 text-slate-600 rounded-2xl text-[10px] font-black hover:bg-slate-200 transition">مراجعة يدوية</button>
           </div>
        </div>
      </div>

      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-gradient-to-t from-white via-white to-transparent pt-12 z-40">
         <div className="flex gap-3">
            <button 
              onClick={onNext}
              className="flex-[3] py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-lg shadow-2xl active:scale-95 transition flex items-center justify-center gap-3"
            >
              التالي: بدء التفاوض <ChevronLeft size={24} />
            </button>
            <button 
              onClick={onBack}
              className="flex-1 bg-white border border-slate-200 text-slate-500 rounded-[1.5rem] font-black text-xs hover:bg-slate-50 transition"
            >
              العودة للتحرير
            </button>
         </div>
      </div>

      <style>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default AIContractRiskAnalysisScreen;
