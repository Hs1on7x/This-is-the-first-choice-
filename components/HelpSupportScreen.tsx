
import React, { useState } from 'react';
import { 
  ArrowRight, Search, MessageSquare, Phone, 
  Mail, HelpCircle, ChevronDown, Plus, 
  ExternalLink, FileText, Bot, Sparkles, Send
} from 'lucide-react';

interface HelpSupportScreenProps {
  onBack: () => void;
}

const HelpSupportScreen: React.FC<HelpSupportScreenProps> = ({ onBack }) => {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  const faqs = [
    { q: 'كيف يعمل نظام الضمان المالي (Escrow)؟', a: 'يتم حجز المبالغ في حساب وسيط بنكي ولا يتم تحريرها للطرف الثاني إلا بعد تأكيد استلام العمل أو مرور فترة الاعتراض المحددة.' },
    { q: 'هل العقود الموقعة عبر المنصة معتمدة في المحاكم؟', a: 'نعم، جميع العقود موقعة إلكترونياً بموجب نظام التعاملات الإلكترونية السعودي ومعززة ببصمة رقمية على الـ Blockchain.' },
    { q: 'ماذا أفعل في حالة نشوء نزاع مع الطرف الآخر؟', a: 'يمكنك فتح نزاع رسمي عبر لوحة تحكم العقد، سيقوم النظام تلقائياً بتجميد المبالغ وتعيين وسيط متخصص لحل الخلاف.' }
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-500 overflow-y-auto pb-24">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-30 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowRight size={20} /></button>
          <h1 className="text-lg font-black text-slate-900">مركز المساعدة</h1>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Search Helper */}
        <div className="relative group">
           <input type="text" placeholder="كيف يمكننا مساعدتك اليوم؟" className="w-full bg-white border border-slate-100 rounded-[1.5rem] py-4 pr-12 pl-4 text-sm font-medium focus:ring-4 focus:ring-blue-100 outline-none shadow-sm transition" />
           <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition" size={20} />
        </div>

        {/* Contact Channels Grid */}
        <section className="grid grid-cols-2 gap-4">
           <button className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center gap-3 active:scale-95 transition group">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition shadow-inner"><MessageSquare size={24} /></div>
              <span className="text-xs font-black text-slate-700">محادثة حية</span>
           </button>
           <button className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center gap-3 active:scale-95 transition group">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:bg-indigo-600 group-hover:text-white transition shadow-inner"><Plus size={24} /></div>
              <span className="text-xs font-black text-slate-700">فتح تذكرة</span>
           </button>
        </section>

        {/* AI Helper Callout */}
        <div className="bg-slate-900 p-8 rounded-[3rem] text-white space-y-4 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl animate-pulse" />
           <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-[1.2rem] flex items-center justify-center backdrop-blur-md border border-white/5"><Sparkles size={28} className="text-blue-400" /></div>
              <h3 className="text-sm font-black uppercase tracking-widest text-blue-300">مساعد الدعم الذكي</h3>
           </div>
           <p className="text-[11px] text-slate-400 leading-relaxed font-medium relative z-10">يمكن لـ AI الإجابة على استفساراتك التقنية حول المنصة وشرح الإجراءات القانونية فوراً.</p>
           <button className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-xs active:scale-95 transition relative z-10">بدء الدردشة مع المساعد</button>
        </div>

        {/* FAQs */}
        <section className="space-y-4">
           <h3 className="font-black text-slate-900 text-sm px-2 flex items-center gap-2">
              <HelpCircle size={18} className="text-blue-600" /> الأسئلة الشائعة
           </h3>
           <div className="space-y-3">
              {faqs.map((faq, i) => (
                <div key={i} className="bg-white rounded-[1.8rem] border border-slate-100 shadow-sm overflow-hidden">
                   <button 
                     onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                     className="w-full p-5 flex items-center justify-between text-right hover:bg-slate-50 transition"
                   >
                      <span className="text-xs font-black text-slate-700">{faq.q}</span>
                      <ChevronDown size={18} className={`text-slate-300 transition-transform ${activeFaq === i ? 'rotate-180 text-blue-600' : ''}`} />
                   </button>
                   {activeFaq === i && (
                     <div className="px-5 pb-5 animate-in slide-in-from-top-2 duration-300">
                        <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{faq.a}</p>
                     </div>
                   )}
                </div>
              ))}
           </div>
        </section>

        {/* External Links */}
        <section className="bg-white p-6 rounded-[2rem] border border-slate-100 space-y-4">
           <div className="flex items-center gap-3 border-b border-slate-50 pb-3">
              <FileText size={18} className="text-slate-400" />
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">روابط هامة</h4>
           </div>
           <div className="space-y-3">
              {['سياسة الخصوصية والأمان', 'مركز المعاملات الإلكترونية', 'الأنظمة واللوائح السعودية'].map((link, i) => (
                <button key={i} className="w-full flex items-center justify-between p-2 hover:translate-x-[-4px] transition-transform">
                   <span className="text-[11px] font-black text-slate-600">{link}</span>
                   <ExternalLink size={14} className="text-slate-300" />
                </button>
              ))}
           </div>
        </section>
      </div>
    </div>
  );
};

export default HelpSupportScreen;
