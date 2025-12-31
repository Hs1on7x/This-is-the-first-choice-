
import React, { useState } from 'react';
import { 
  ArrowRight, FileText, Upload, CheckCircle2, MessageSquare, 
  ChevronLeft, History, ShieldCheck, User, Bot, AlertCircle,
  Plus, Search, ExternalLink, X, Info
} from 'lucide-react';

interface DisputeEvidenceExchangeProps {
  onBack: () => void;
  onFinish: () => void;
}

const DisputeEvidenceExchange: React.FC<DisputeEvidenceExchangeProps> = ({ onBack, onFinish }) => {
  const [evidence, setEvidence] = useState([
    { id: '1', party: 'أنت', title: 'إيصال التحويل البنكي', type: 'image', date: 'منذ ساعة', status: 'verified' },
    { id: '2', party: 'الطرف الثاني', title: 'تقرير تسليم الأعمال', type: 'pdf', date: 'منذ ٣٠ دقيقة', status: 'pending' }
  ]);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-right duration-500 overflow-y-auto pb-32">
      <div className="p-4 bg-white border-b sticky top-0 z-30 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowRight size={20} /></button>
          <div>
            <h1 className="text-lg font-black text-slate-900">تبادل الأدلة والبراهين</h1>
            <p className="text-[10px] text-red-600 font-bold uppercase tracking-widest">مرحلة عرض الحجج</p>
          </div>
        </div>
        <button className="p-2 text-blue-600"><Search size={20} /></button>
      </div>

      <div className="p-6 space-y-8">
        {/* Status Tracker */}
        <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse" />
           <div className="flex items-center justify-between relative z-10 mb-6">
              <h3 className="text-xs font-black uppercase tracking-widest text-blue-400">حالة التبادل</h3>
              <span className="text-[10px] font-black bg-blue-500/20 px-3 py-1 rounded-full text-blue-100">نشط الآن</span>
           </div>
           <div className="space-y-4 relative z-10">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center border border-white/5 shadow-2xl">
                    <History size={24} className="text-blue-300" />
                 </div>
                 <div>
                    <p className="text-[9px] font-black text-slate-500 uppercase">إجمالي المستندات</p>
                    <p className="text-xl font-black">٨ ملفات إثبات</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Evidence List */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                 <FileText size={18} className="text-blue-600" /> ملفات وبراهين الأطراف
              </h3>
              <button className="text-[10px] font-black text-blue-600 flex items-center gap-1 uppercase hover:underline">
                 <Plus size={14} /> إضافة دليل
              </button>
           </div>
           <div className="space-y-3">
              {evidence.map(ev => (
                <div key={ev.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 group hover:border-blue-200 transition-all cursor-pointer">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${ev.party === 'أنت' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                            <User size={20} />
                         </div>
                         <div>
                            <h4 className="text-xs font-black text-slate-900">{ev.title}</h4>
                            <p className="text-[9px] text-slate-400 font-bold uppercase">{ev.party} • {ev.date}</p>
                         </div>
                      </div>
                      <div className={`px-2 py-0.5 rounded text-[8px] font-black uppercase ${ev.status === 'verified' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'}`}>
                         {ev.status === 'verified' ? 'موثق ✓' : 'قيد المراجعة'}
                      </div>
                   </div>
                   <div className="flex items-center justify-between pt-1 border-t border-slate-50 mt-2">
                      <button className="flex items-center gap-1.5 text-[9px] font-black text-blue-600 group-hover:translate-x-[-4px] transition-transform">
                         عرض الدليل القانوني <ExternalLink size={12} />
                      </button>
                      <button className="p-1.5 text-slate-300 hover:text-red-500"><X size={14} /></button>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Arguments Area */}
        <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
           <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
              <MessageSquare size={18} className="text-blue-600" /> الحجج والبراهين الكتابية
           </h3>
           <div className="space-y-4">
              <div className="p-5 bg-slate-50 rounded-2xl border-r-4 border-blue-600 space-y-2">
                 <p className="text-[9px] font-black text-blue-600 uppercase">حجتك القانونية (أنت)</p>
                 <p className="text-xs text-slate-700 leading-relaxed font-medium italic">"لم يتم توريد المعدات في الموعد المحدد (١ يناير) مما تسبب بخسائر تشغيلية قدرت بـ ٥٠٠٠ ريال."</p>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl border-r-4 border-slate-300 space-y-2">
                 <p className="text-[9px] font-black text-slate-500 uppercase">رد الخصم (الطرف الثاني)</p>
                 <p className="text-xs text-slate-400 leading-relaxed font-medium italic">"التأخير كان نتيجة عطل مفاجئ في الميناء، وهو ما يعتبر قوة قاهرة بموجب البند رقم ٩."</p>
              </div>
           </div>
           <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl text-[10px] font-black text-slate-400 hover:border-blue-600 hover:text-blue-600 transition">إضافة دفع/رد جديد</button>
        </section>

        {/* AI Final Assessment before Mediator */}
        <div className="p-6 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[3rem] text-white shadow-2xl space-y-6 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-3xl" />
           <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 group-hover:rotate-12 transition-transform duration-500 shrink-0">
                 <Bot size={32} className="text-blue-100" />
              </div>
              <div className="space-y-1">
                 <h4 className="text-sm font-black uppercase tracking-tight">مساعد الوساطة (AI)</h4>
                 <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest">توجيه: اطلب إثباتاً للعطل الفني المذكور</p>
              </div>
           </div>
           <div className="p-5 bg-white/10 rounded-[1.8rem] border border-white/10 text-xs font-medium text-blue-50 leading-relaxed relative z-10">
              "بناءً على تضارب الحجج، أنصحك بطلب 'شهادة تعطل حركة الميناء' من الطرف الثاني لبيان مدى انطباق شرط القوة القاهرة."
           </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t z-50 shadow-2xl">
         <button 
           onClick={onFinish}
           className="w-full py-5 bg-blue-600 text-white rounded-[1.8rem] font-black text-lg shadow-xl shadow-blue-200 active:scale-95 transition-all flex items-center justify-center gap-3"
         >
            المطالبة بحسم النزاع وإصدار القرار <ChevronLeft size={24} />
         </button>
      </div>
    </div>
  );
};

export default DisputeEvidenceExchange;
