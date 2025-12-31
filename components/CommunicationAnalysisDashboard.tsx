
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Sparkles, CheckCircle2, AlertTriangle, 
  RefreshCw, Download, ChevronLeft, Clock, MessageSquare, 
  FileEdit, PlusCircle, ArrowUpRight, CheckSquare, Square, 
  Bot, Loader2, List
} from 'lucide-react';
import { ContractDraft, AnalysisReport } from '../types';

interface CommunicationAnalysisDashboardProps {
  draft: ContractDraft;
  onBack: () => void;
  onOpenEditor: () => void;
}

const CommunicationAnalysisDashboard: React.FC<CommunicationAnalysisDashboardProps> = ({ draft, onBack, onOpenEditor }) => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [report, setReport] = useState<AnalysisReport | null>(null);

  // Initial Mock Data Load
  useEffect(() => {
    handleAnalyze();
  }, []);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    // Simulate complex NLP processing
    setTimeout(() => {
      setReport({
        id: 'rep-101',
        contractName: "عقد إيجار - شقة الرياض",
        period: "آخر 30 يوم",
        stats: {
          messages: 127,
          agreements: 8,
          disputes: 3,
          amendments: 5
        },
        detectedAgreements: [
          {
            id: 'ag-1',
            date: '2024-12-28',
            content: 'زيادة مبلغ الإيجار السنوي إلى 12,000 ريال بدلاً من 10,000 ريال.',
            source: [
              { role: 'الطرف الثاني', text: 'أوافق على مبلغ 12,000 ريال للسنة الأولى.' },
              { role: 'أنت', text: 'تمام، متفقين. سأقوم بتحديث البند في المسودة.' }
            ]
          },
          {
            id: 'ag-2',
            date: '2024-12-27',
            content: 'تأجيل تاريخ بدء العقد إلى 1 يناير 2025.',
            source: [{ role: 'الطرف الثاني', text: 'يفضل أن يبدأ العقد من بداية السنة الميلادية.' }]
          }
        ],
        detectedDisputes: [
          {
            id: 'ds-1',
            date: '2024-12-29',
            title: 'مدة العقد الإجمالية',
            status: 'unresolved',
            parties: [
              { role: 'الطرف الأول (أنت)', stance: 'سنة واحدة قابلة للتجديد.' },
              { role: 'الطرف الثاني', stance: 'سنتان كحد أدنى لضمان الاستقرار.' }
            ]
          }
        ],
        suggestedAmendments: [
          {
            id: 'am-1',
            clauseId: 'c3',
            clauseTitle: 'البند 3 - المقابل المالي',
            from: '10,000 ريال',
            to: '12,000 ريال',
            reason: 'اتفاق في المحادثة بتاريخ 28 ديسمبر.'
          },
          {
            id: 'am-2',
            clauseId: 'new-1',
            clauseTitle: 'بند جديد: تأمين ضد التأخير',
            from: 'غير موجود',
            to: 'بند يحدد غرامة 50 ريال عن كل يوم تأخير في الصيانة.',
            reason: 'ذُكر في المحادثة 3 مرات من طرفك.'
          }
        ],
        actionItems: [
          { id: 'act-1', text: 'تحديث البند 3 بناءً على الاتفاق السعري', done: false },
          { id: 'act-2', text: 'حل الخلاف حول المدة (مقترح AI متاح)', done: false },
          { id: 'act-3', text: 'إضافة بند التأمين ضد التأخير', done: false },
          { id: 'act-4', text: 'مراجعة التاريخ المتفق عليه (1 يناير)', done: true }
        ],
        timeline: [
          { date: '25 ديسمبر', event: 'بدأت المفاوضات الأولية' },
          { date: '27 ديسمبر', event: 'اتفاق على تاريخ البدء' },
          { date: '28 ديسمبر', event: 'اتفاق على السعر الجديد' },
          { date: '29 ديسمبر', event: 'خلاف على مدة العقد' },
          { date: '30 ديسمبر', event: 'اقتراح حل وسط من AI' }
        ]
      });
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-500 overflow-y-auto pb-24">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-30 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight className="text-slate-700" />
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-900">تحليل المراسلات الذكي</h1>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">
              {report?.contractName} • {report?.period}
            </p>
          </div>
        </div>
        <button 
          onClick={handleAnalyze}
          disabled={isAnalyzing}
          className="p-2 text-slate-400 hover:text-blue-600 transition disabled:opacity-50"
        >
          {isAnalyzing ? <Loader2 size={20} className="animate-spin" /> : <RefreshCw size={20} />}
        </button>
      </div>

      <div className="p-5 space-y-6">
        {isAnalyzing ? (
          <div className="flex flex-col items-center justify-center py-20 space-y-4">
             <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center animate-pulse">
                <Bot size={32} />
             </div>
             <div className="text-center space-y-1">
                <h3 className="text-sm font-black text-slate-900">جاري مسح المراسلات...</h3>
                <p className="text-[10px] text-slate-400 font-medium">استخراج الكيانات، تحديد النوايا، ورصد الاتفاقات</p>
             </div>
          </div>
        ) : report ? (
          <div className="space-y-6 animate-in zoom-in duration-500">
            {/* Overview Card */}
            <div className="bg-slate-900 p-6 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
               <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 mb-4 flex items-center gap-2">
                 <Sparkles size={14} /> ملخص التحليل الذكي
               </h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-1">
                     <span className="text-2xl font-black">{report.stats.messages}</span>
                     <p className="text-[9px] font-bold text-slate-400 uppercase">إجمالي الرسائل</p>
                  </div>
                  <div className="space-y-1 text-emerald-400">
                     <span className="text-2xl font-black">{report.stats.agreements}</span>
                     <p className="text-[9px] font-bold text-slate-400 uppercase">نقاط اتفاق</p>
                  </div>
                  <div className="space-y-1 text-amber-400">
                     <span className="text-2xl font-black">{report.stats.disputes}</span>
                     <p className="text-[9px] font-bold text-slate-400 uppercase">خلافات معلقة</p>
                  </div>
                  <div className="space-y-1 text-blue-400">
                     <span className="text-2xl font-black">{report.stats.amendments}</span>
                     <p className="text-[9px] font-bold text-slate-400 uppercase">تعديلات مقترحة</p>
                  </div>
               </div>
            </div>

            {/* Agreements Section */}
            <section className="space-y-4">
               <h3 className="font-bold text-slate-900 text-sm px-1 flex items-center gap-2">
                  <CheckCircle2 size={18} className="text-emerald-500" /> الاتفاقات المكتشفة
               </h3>
               {report.detectedAgreements.map(ag => (
                 <div key={ag.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                    <div className="flex items-center justify-between">
                       <span className="text-[9px] font-black text-slate-300 uppercase flex items-center gap-1">
                          <Clock size={10} /> {ag.date}
                       </span>
                       <span className="bg-emerald-50 text-emerald-600 text-[8px] px-2 py-0.5 rounded font-black uppercase">اتفاق مؤكد</span>
                    </div>
                    <p className="text-xs font-black text-slate-800 leading-relaxed">{ag.content}</p>
                    <div className="space-y-2 p-3 bg-slate-50 rounded-2xl border border-slate-100/50">
                       {ag.source.map((src, i) => (
                         <div key={i} className="flex gap-2 text-[10px] text-slate-500">
                            <span className="font-black shrink-0">[{src.role}]:</span>
                            <span className="italic">"{src.text}"</span>
                         </div>
                       ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                       <button onClick={onOpenEditor} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black shadow-lg shadow-blue-100 active:scale-95 transition">تحديث العقد</button>
                       <button className="px-5 py-2.5 bg-slate-100 text-slate-400 rounded-xl text-[10px] font-black hover:bg-slate-200 transition">تجاهل</button>
                    </div>
                 </div>
               ))}
            </section>

            {/* Disputes Section */}
            <section className="space-y-4">
               <h3 className="font-bold text-slate-900 text-sm px-1 flex items-center gap-2">
                  <AlertTriangle size={18} className="text-amber-500" /> نقاط الخلاف الحالية
               </h3>
               {report.detectedDisputes.map(ds => (
                 <div key={ds.id} className="bg-white p-5 rounded-3xl border border-amber-100 shadow-sm space-y-4 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-1 h-full bg-amber-400" />
                    <div className="flex items-center justify-between">
                       <h4 className="text-xs font-black text-slate-900">{ds.title}</h4>
                       <span className="text-[8px] font-black text-amber-600 uppercase">لم يُحل بعد</span>
                    </div>
                    <div className="grid grid-cols-1 gap-2">
                       {ds.parties.map((p, i) => (
                         <div key={i} className="flex flex-col gap-1">
                            <span className="text-[8px] font-black text-slate-400 uppercase">{p.role}</span>
                            <p className="text-[10px] text-slate-700 font-bold italic">"{p.stance}"</p>
                         </div>
                       ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                       <button className="flex-1 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black flex items-center justify-center gap-2 active:scale-95 transition">
                          <Sparkles size={14} className="text-amber-400" /> اقتراح حل وسط
                       </button>
                       <button className="px-5 py-2.5 border border-slate-200 text-slate-500 rounded-xl text-[10px] font-black hover:bg-slate-50 transition">فتح نقاش</button>
                    </div>
                 </div>
               ))}
            </section>

            {/* Amendments Section */}
            <section className="space-y-4">
               <h3 className="font-bold text-slate-900 text-sm px-1 flex items-center gap-2">
                  <FileEdit size={18} className="text-blue-500" /> تعديلات مقترحة على العقد
               </h3>
               {report.suggestedAmendments.map(am => (
                 <div key={am.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4 group hover:border-blue-200 transition">
                    <div className="flex items-center justify-between">
                       <h4 className="text-[10px] font-black text-blue-900 uppercase tracking-widest">{am.clauseTitle}</h4>
                       <PlusCircle size={16} className="text-blue-600 opacity-0 group-hover:opacity-100 transition" />
                    </div>
                    <div className="flex items-center gap-3">
                       <div className="flex-1 p-2 bg-red-50 rounded-lg border border-red-100/50">
                          <p className="text-[8px] font-black text-red-400 uppercase mb-1">من</p>
                          <p className="text-[10px] text-red-700 font-bold line-through">{am.from}</p>
                       </div>
                       <ArrowRight size={14} className="text-slate-300 rotate-180" />
                       <div className="flex-1 p-2 bg-emerald-50 rounded-lg border border-emerald-100/50">
                          <p className="text-[8px] font-black text-emerald-400 uppercase mb-1">إلى</p>
                          <p className="text-[10px] text-emerald-700 font-black">{am.to}</p>
                       </div>
                    </div>
                    <p className="text-[10px] text-slate-500"><span className="font-black text-slate-900">السبب:</span> {am.reason}</p>
                    <button onClick={onOpenEditor} className="w-full py-2.5 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black hover:bg-blue-600 hover:text-white transition">تطبيق التعديل</button>
                 </div>
               ))}
            </section>

            {/* Action Items */}
            <section className="space-y-4">
               <h3 className="font-bold text-slate-900 text-sm px-1 flex items-center gap-2">
                  <CheckSquare size={18} className="text-indigo-500" /> الإجراءات المطلوبة
               </h3>
               <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                  {report.actionItems.map(item => (
                    <div key={item.id} className="flex items-center gap-3 group cursor-pointer">
                       {item.done ? (
                         <CheckCircle2 size={18} className="text-emerald-500" />
                       ) : (
                         <Square size={18} className="text-slate-300 group-hover:text-blue-500 transition" />
                       )}
                       <span className={`text-xs font-bold ${item.done ? 'text-slate-300 line-through' : 'text-slate-700'}`}>
                          {item.text}
                       </span>
                    </div>
                  ))}
               </div>
            </section>

            {/* Timeline View */}
            <section className="space-y-4">
               <h3 className="font-bold text-slate-900 text-sm px-1">📅 الجدول الزمني للتفاوض</h3>
               <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm relative overflow-hidden">
                  <div className="absolute top-8 bottom-8 right-8 w-0.5 bg-slate-100" />
                  <div className="space-y-8 relative">
                     {report.timeline.map((t, i) => (
                       <div key={i} className="flex items-start gap-4 pr-10 relative">
                          <div className={`absolute right-[-2.4rem] top-1.5 w-3 h-3 rounded-full border-2 border-white shadow-sm transition-all duration-500 ${
                            i === report.timeline.length - 1 ? 'bg-blue-600 scale-125' : 'bg-slate-300'
                          }`} />
                          <div className="space-y-0.5">
                             <p className="text-[9px] font-black text-slate-300 uppercase">{t.date}</p>
                             <p className="text-xs font-black text-slate-800">{t.event}</p>
                          </div>
                       </div>
                     ))}
                  </div>
               </div>
            </section>

            {/* Export Report */}
            <button className="w-full py-5 bg-slate-900 text-white rounded-3xl font-black text-lg shadow-xl active:scale-95 transition flex items-center justify-center gap-3">
               <Download size={24} /> تصدير تقرير التحليل الكامل
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 opacity-30">
             <MessageSquare size={64} className="text-slate-300" />
             <p className="text-sm font-bold text-slate-400 mt-4">لا توجد بيانات تحليل حالياً</p>
          </div>
        )}
      </div>

      <style>{`
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default CommunicationAnalysisDashboard;
