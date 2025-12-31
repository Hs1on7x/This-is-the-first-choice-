
import React, { useState, useEffect } from 'react';
import { 
  ArrowRight, Save, Download, Share2, Printer, Edit3, 
  Sparkles, MessageSquare, AlertTriangle, BookOpen, 
  CheckCircle2, Info, ChevronRight, ChevronLeft, 
  Bold, Italic, Underline, List, AlignRight, AlignCenter,
  Plus
} from 'lucide-react';
import { ContractDraft } from '../types';

interface SmartContractEditorScreenProps {
  draft: ContractDraft;
  onBack: () => void;
  onNext: (finalText: string) => void;
  onSaveDraft: () => void;
}

const SmartContractEditorScreen: React.FC<SmartContractEditorScreenProps> = ({ draft, onBack, onNext, onSaveDraft }) => {
  const [content, setContent] = useState(draft.generatedText || '');
  const [aiPanelOpen, setAiPanelOpen] = useState(true);
  const [activeSuggestion, setActiveSuggestion] = useState<number | null>(null);

  const suggestions = [
    { id: 1, type: 'refinement', text: 'يفضل استخدام مصطلح "يلتزم" بدلاً من "يجب" في البند الثاني لتعزيز القوة الإلزامية.', clause: 'البند الثاني' },
    { id: 2, type: 'missing', text: 'لم يتم رصد بند صريح عن "القوة القاهرة". هل ترغب في إضافته تلقائياً؟', clause: 'عام' },
    { id: 3, type: 'law', text: 'بناءً على نظام المعاملات المدنية، المادة ١٠٧ تدعم صياغتك في بند التعويض.', clause: 'بند التعويض' }
  ];

  const handleApplySuggestion = (s: any) => {
    // Logic to update text would go here
    setActiveSuggestion(null);
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-300 overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="p-4 flex items-center justify-between">
           <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
                 <ArrowRight className="text-slate-700" />
              </button>
              <div>
                 <h1 className="text-sm font-black text-slate-900 leading-tight truncate max-w-[150px]">
                   {draft.type} - {draft.parties[1]?.name}
                 </h1>
                 <p className="text-[8px] text-slate-400 font-bold uppercase tracking-widest mt-0.5">رقم العقد: #2024-00{draft.id?.slice(0, 4)} • مسودة</p>
              </div>
           </div>
           <div className="flex gap-1">
              <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-blue-600 transition"><Share2 size={16} /></button>
              <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-blue-600 transition"><Download size={16} /></button>
              <button className="p-2 bg-slate-50 text-slate-400 rounded-lg hover:text-blue-600 transition"><Printer size={16} /></button>
           </div>
        </div>
      </div>

      {/* Editor Layout */}
      <div className="flex-1 flex overflow-hidden relative">
        {/* Main Editor Panel */}
        <div className={`flex-1 flex flex-col transition-all duration-300 ${aiPanelOpen ? 'lg:pl-80' : ''}`}>
           {/* Toolbar */}
           <div className="bg-white border-b px-4 py-2 flex items-center gap-4 overflow-x-auto scrollbar-hide">
              <div className="flex items-center gap-1 border-l pl-3">
                 <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><Bold size={16} /></button>
                 <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><Italic size={16} /></button>
                 <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><Underline size={16} /></button>
              </div>
              <div className="flex items-center gap-1 border-l pl-3">
                 <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><List size={16} /></button>
                 <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><AlignRight size={16} /></button>
                 <button className="p-1.5 hover:bg-slate-100 rounded text-slate-600"><AlignCenter size={16} /></button>
              </div>
              <div className="flex items-center gap-2">
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">تلقائي</span>
                 <div className="w-8 h-4 bg-blue-100 rounded-full relative">
                    <div className="absolute right-0.5 top-0.5 w-3 h-3 bg-blue-600 rounded-full" />
                 </div>
              </div>
           </div>

           {/* Editing Area */}
           <div className="flex-1 overflow-y-auto p-6 bg-slate-100/30">
              <div className="max-w-3xl mx-auto bg-white min-h-screen shadow-2xl rounded-sm p-12 font-serif text-sm leading-[2] text-slate-800 outline-none whitespace-pre-wrap select-text border-x border-slate-200"
                   contentEditable 
                   onInput={(e) => setContent(e.currentTarget.textContent || '')}
                   suppressContentEditableWarning={true}>
                 {content}
              </div>
           </div>
        </div>

        {/* AI Assistant Sidebar (Mobile needs special treatment, making it slide-in or toggleable) */}
        <div className={`fixed lg:static top-0 bottom-0 left-0 w-80 bg-white border-r z-40 transition-transform duration-300 ${aiPanelOpen ? 'translate-x-0' : '-translate-x-full lg:-mr-80'}`}>
           <div className="h-full flex flex-col">
              <div className="p-4 border-b flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <Sparkles size={18} className="text-amber-500" />
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">المساعد الذكي</h3>
                 </div>
                 <button onClick={() => setAiPanelOpen(false)} className="lg:hidden text-slate-400"><ChevronRight size={20} /></button>
              </div>

              <div className="flex-1 overflow-y-auto p-4 space-y-6">
                 {/* Suggestions Section */}
                 <section className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">اقتراحات فورية</h4>
                    {suggestions.map((s) => (
                      <div key={s.id} className="p-4 bg-blue-50/50 rounded-2xl border border-blue-100 space-y-2 hover:bg-blue-50 transition cursor-default group">
                         <div className="flex items-center justify-between">
                            <span className="text-[8px] font-black text-blue-600 bg-white px-2 py-0.5 rounded-full uppercase">{s.clause}</span>
                            <Sparkles size={12} className="text-amber-500 opacity-0 group-hover:opacity-100 transition" />
                         </div>
                         <p className="text-[10px] text-slate-700 leading-relaxed font-medium">{s.text}</p>
                         <div className="flex gap-2 pt-1">
                            <button onClick={() => handleApplySuggestion(s)} className="text-[9px] font-black text-blue-600 hover:underline">تطبيق</button>
                            <button className="text-[9px] font-black text-slate-400 hover:underline">تجاهل</button>
                         </div>
                      </div>
                    ))}
                 </section>

                 {/* Missing Clauses */}
                 <section className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1 flex items-center gap-2">
                       <AlertTriangle size={12} className="text-amber-500" /> بنود مفقودة
                    </h4>
                    <div className="space-y-2">
                       {['بند السرية', 'بند القوة القاهرة', 'بند حل النزاعات'].map((clause, i) => (
                          <div key={i} className="flex items-center justify-between p-3 bg-white border border-slate-100 rounded-xl group hover:border-blue-200 cursor-pointer transition">
                             <div className="flex items-center gap-2">
                                <div className="w-4 h-4 rounded border-2 border-slate-200 group-hover:border-blue-600 transition" />
                                <span className="text-[10px] font-bold text-slate-600">{clause}</span>
                             </div>
                             <Plus size={14} className="text-slate-200 group-hover:text-blue-600" />
                          </div>
                       ))}
                    </div>
                 </section>

                 {/* Legal References */}
                 <section className="space-y-3">
                    <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">المراجع القانونية</h4>
                    <div className="p-4 bg-slate-900 rounded-2xl text-white space-y-3">
                       <div className="flex items-center gap-2 text-blue-400">
                          <BookOpen size={14} />
                          <span className="text-[10px] font-black uppercase">نظام المعاملات المدنية</span>
                       </div>
                       <p className="text-[9px] text-slate-400 leading-relaxed font-medium italic">"المادة ١٠٧: يحق للمتضرر المطالبة بالتعويض الجابر للضرر..."</p>
                       <button className="w-full py-1.5 bg-white/10 rounded-lg text-[9px] font-black hover:bg-white/20 transition">عرض المادة كاملة</button>
                    </div>
                 </section>

                 {/* Mini Chat */}
                 <section className="space-y-3 pt-4 border-t">
                    <div className="flex items-center gap-2 px-1">
                       <MessageSquare size={14} className="text-slate-400" />
                       <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">اسأل المساعد</h4>
                    </div>
                    <div className="relative">
                       <input 
                         type="text" 
                         placeholder="كيف أصيغ بند الإنهاء؟"
                         className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-[10px] font-medium outline-none focus:ring-2 focus:ring-blue-100"
                       />
                       <button className="absolute left-3 top-1/2 -translate-y-1/2 text-blue-600"><ChevronLeft size={16} /></button>
                    </div>
                 </section>
              </div>

              {/* Connected Users / Collaboration */}
              <div className="p-4 bg-slate-50 border-t flex items-center justify-between">
                 <div className="flex items-center gap-2">
                    <div className="relative">
                       <div className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 text-[10px] font-black border border-white">
                          ع
                       </div>
                       <div className="absolute -bottom-0.5 -right-0.5 w-2 h-2 bg-green-500 rounded-full border-2 border-slate-50" />
                    </div>
                    <span className="text-[9px] font-black text-slate-500">الطرف الثاني يشاهد</span>
                 </div>
                 <span className="text-[8px] font-bold text-slate-400">v1.2 (تلقائي)</span>
              </div>
           </div>
        </div>

        {/* Floating Toggle for Sidebar (Mobile) */}
        {!aiPanelOpen && (
          <button 
            onClick={() => setAiPanelOpen(true)}
            className="fixed bottom-32 left-6 w-12 h-12 bg-blue-600 text-white rounded-2xl shadow-xl flex items-center justify-center z-50 animate-in slide-in-from-left duration-300"
          >
            <Sparkles size={20} />
          </button>
        )}
      </div>

      {/* Footer Actions */}
      <div className="p-6 bg-white border-t sticky bottom-0 z-30 shadow-2xl flex gap-3">
         <button 
           onClick={() => onNext(content)}
           className="flex-[3] py-4 bg-blue-600 text-white rounded-3xl font-black text-lg shadow-xl shadow-blue-200 active:scale-95 transition"
         >
           التالي: تحليل المخاطر
         </button>
         <button 
           onClick={onSaveDraft}
           className="flex-1 bg-slate-100 text-slate-500 rounded-3xl font-bold text-xs hover:bg-slate-200 transition"
         >
           حفظ كمسودة
         </button>
      </div>

      {/* Auto-save Status */}
      <div className="absolute bottom-[100px] right-6 px-3 py-1.5 bg-white/90 backdrop-blur-md rounded-full border border-slate-100 shadow-sm flex items-center gap-2 animate-in fade-in duration-1000">
         <div className="w-1.5 h-1.5 bg-green-500 rounded-full" />
         <span className="text-[8px] font-black text-slate-400 uppercase tracking-widest">تم الحفظ تلقائياً</span>
      </div>
    </div>
  );
};

export default SmartContractEditorScreen;
