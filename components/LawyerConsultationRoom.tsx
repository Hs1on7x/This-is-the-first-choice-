
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, Send, Mic, Video, User, FileText, 
  Search, BookOpen, ExternalLink, Bot, CheckCircle2,
  Paperclip, MoreVertical, ShieldCheck, X, Sparkles, 
  History, Info, Edit3, Save, Download
} from 'lucide-react';
import { ConsultationSession, Message, UserProfile } from '../types';

interface LawyerConsultationRoomProps {
  session: ConsultationSession;
  onBack: () => void;
  onFinish: (summary: string) => void;
}

const LawyerConsultationRoom: React.FC<LawyerConsultationRoomProps> = ({ session, onBack, onFinish }) => {
  const [activeSideTab, setActiveSideTab] = useState<'files' | 'legal' | 'ai' | 'notes'>('notes');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'user', content: `مرحباً، أحتاج استشارة بخصوص ${session.specialty}.`, timestamp: new Date(Date.now() - 300000) }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [privateNotes, setPrivateNotes] = useState('');
  const [showSummaryModal, setShowSummaryModal] = useState(false);
  const [finalSummary, setFinalSummary] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const msg: Message = { id: Date.now().toString(), role: 'lawyer', content: inputValue, timestamp: new Date() };
    setMessages([...messages, msg]);
    setInputValue('');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-bottom duration-700 h-screen overflow-hidden">
      {/* Header for Lawyer */}
      <div className="bg-white border-b p-4 shadow-sm z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowRight size={20} /></button>
          <div className="relative">
             <div className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-indigo-600 shadow-inner"><User size={24} /></div>
             <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-900 leading-tight">{session.userName}</h1>
            <p className="text-[10px] text-indigo-600 font-bold uppercase tracking-widest">{session.specialty}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
           <div className="hidden md:flex flex-col items-center px-4 py-1 bg-red-50 text-red-600 rounded-xl border border-red-100">
              <span className="text-[8px] font-black uppercase">الوقت المنقضي</span>
              <span className="text-xs font-black font-mono">15:42</span>
           </div>
           <button 
             onClick={() => setShowSummaryModal(true)}
             className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl text-[10px] font-black shadow-xl shadow-indigo-100 hover:bg-indigo-700 active:scale-95 transition"
           >
             إنهاء وكتابة ملخص
           </button>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* SIDE TOOLS (Hidden on mobile, accessible via swipe/tab) */}
        <div className="hidden lg:flex w-80 bg-white border-l flex-col">
           <div className="flex p-1 bg-slate-50 border-b">
              {['notes', 'files', 'legal', 'ai'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveSideTab(tab as any)}
                  className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase transition-all ${activeSideTab === tab ? 'bg-white text-indigo-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                >
                  {tab === 'notes' ? <Edit3 size={14} className="mx-auto" /> : 
                   tab === 'files' ? <FileText size={14} className="mx-auto" /> : 
                   tab === 'legal' ? <BookOpen size={14} className="mx-auto" /> : <Bot size={14} className="mx-auto" />}
                </button>
              ))}
           </div>
           <div className="flex-1 overflow-y-auto p-5 space-y-6">
              {activeSideTab === 'notes' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ملاحظات خاصة (لا يراها العميل)</h3>
                   <textarea 
                     value={privateNotes}
                     onChange={e => setPrivateNotes(e.target.value)}
                     className="w-full h-80 bg-slate-50 border border-slate-100 rounded-2xl p-4 text-xs font-medium focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none transition resize-none shadow-inner"
                     placeholder="اكتب ملاحظاتك القانونية هنا..."
                   />
                   <button className="w-full py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black flex items-center justify-center gap-2 active:scale-95 transition">
                      <Save size={14} /> حفظ الملاحظة
                   </button>
                </div>
              )}

              {activeSideTab === 'files' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">مستندات العميل</h3>
                   <div className="space-y-3">
                      {['عقد_العمل.pdf', 'مراسلات_سابقة.zip'].map((f, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between group hover:border-indigo-200 transition cursor-pointer">
                           <div className="flex items-center gap-3">
                              <FileText size={18} className="text-indigo-400" />
                              <span className="text-[10px] font-bold text-slate-700">{f}</span>
                           </div>
                           <Download size={14} className="text-slate-300 group-hover:text-indigo-600" />
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {activeSideTab === 'legal' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                   <div className="relative group">
                      <input type="text" placeholder="البحث في الأنظمة..." className="w-full bg-slate-50 border border-slate-100 rounded-xl py-3 px-4 pr-10 text-[10px] font-medium outline-none" />
                      <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
                   </div>
                   <div className="space-y-3">
                      <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 space-y-2">
                         <div className="flex items-center gap-2 text-indigo-600">
                            <BookOpen size={14} />
                            <span className="text-[10px] font-black uppercase">نظام العمل السعودي</span>
                         </div>
                         <p className="text-[10px] text-slate-700 font-bold leading-relaxed">المادة 74: ينتهي عقد العمل في الحالات التالية...</p>
                         <button className="text-[9px] font-black text-indigo-600 uppercase hover:underline">عرض المادة كاملة</button>
                      </div>
                   </div>
                </div>
              )}

              {activeSideTab === 'ai' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                   <div className="p-5 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[2rem] text-white space-y-4 shadow-xl">
                      <div className="flex items-center gap-3">
                         <Bot size={24} className="text-indigo-400 animate-pulse" />
                         <h4 className="text-xs font-black uppercase tracking-widest">المساعد الذكي (AI)</h4>
                      </div>
                      <p className="text-[10px] text-slate-300 leading-relaxed font-medium">سأقوم بمساعدتك في صياغة بنود العقد أو تحليل ردود العميل قانونياً.</p>
                      <button className="w-full py-2.5 bg-indigo-600 text-white rounded-xl text-[9px] font-black hover:bg-indigo-700 active:scale-95 transition">تحليل المحادثة الحالية</button>
                   </div>
                   <div className="space-y-3">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">قوالب رد جاهزة</p>
                      {['طلب وثيقة الهوية', 'شرح إجراءات التقاضي', 'توضيح الرسوم القضائية'].map((t, i) => (
                        <button key={i} className="w-full text-right p-3 bg-white border border-slate-100 rounded-xl text-[10px] font-bold text-slate-600 hover:border-indigo-600 hover:text-indigo-600 transition">+ {t}</button>
                      ))}
                   </div>
                </div>
              )}
           </div>
        </div>

        {/* CHAT AREA */}
        <div className="flex-1 flex flex-col relative">
           <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6">
              <div className="flex justify-center my-4">
                 <div className="px-4 py-1.5 bg-slate-200/50 rounded-full text-[9px] font-black text-slate-500 flex items-center gap-2 uppercase tracking-widest">
                    <ShieldCheck size={12} /> جلسة مشفرة ومنتهية الأطراف
                 </div>
              </div>
              
              {messages.map((m) => (
                <div key={m.id} className={`flex ${m.role === 'lawyer' ? 'justify-start' : 'justify-end'} animate-in slide-in-from-bottom-2 duration-300`}>
                   <div className={`max-w-[80%] space-y-1 ${m.role === 'lawyer' ? 'text-right' : 'text-left'}`}>
                      <div className={`p-4 rounded-[1.8rem] shadow-sm text-sm leading-relaxed ${
                        m.role === 'lawyer' ? 'bg-indigo-600 text-white rounded-tl-none shadow-indigo-100' : 'bg-white border border-slate-100 text-slate-800 rounded-tr-none shadow-slate-100'
                      }`}>
                         {m.content}
                      </div>
                      <p className="text-[8px] font-bold text-slate-300 uppercase px-1">{m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                   </div>
                </div>
              ))}
           </div>

           {/* INPUT AREA */}
           <div className="p-4 bg-white border-t shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              <div className="flex items-end gap-2">
                 <div className="flex-1 bg-slate-50 border border-slate-100 rounded-[2rem] p-2 flex items-end">
                    <div className="flex gap-1 pb-1">
                       <button className="p-2.5 text-slate-400 hover:text-indigo-600 transition"><Paperclip size={20} /></button>
                       <button className="p-2.5 text-slate-400 hover:text-indigo-600 transition"><Mic size={20} /></button>
                    </div>
                    <textarea 
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      rows={1}
                      placeholder="اكتب رسالتك للعميل..."
                      className="flex-1 bg-transparent border-none py-3 px-3 text-sm font-medium outline-none resize-none max-h-32"
                    />
                 </div>
                 <button 
                   onClick={handleSend}
                   disabled={!inputValue.trim()}
                   className="w-12 h-12 bg-indigo-600 text-white rounded-2xl shadow-xl shadow-indigo-100 active:scale-95 transition flex items-center justify-center disabled:opacity-30"
                 >
                    <Send size={24} />
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* SUMMARY MODAL */}
      {showSummaryModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 space-y-8 shadow-2xl animate-in zoom-in duration-300">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shadow-inner"><Edit3 size={28} /></div>
                 <div>
                    <h3 className="text-xl font-black text-slate-900">ملخص الاستشارة</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">سيتم إرسال هذا التقرير للعميل</p>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">الرأي القانوني والخطوات التالية</label>
                    <textarea 
                      value={finalSummary}
                      onChange={e => setFinalSummary(e.target.value)}
                      rows={6}
                      placeholder="اكتب هنا التوصيات والنتائج التي توصلت إليها..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-[1.8rem] p-6 text-xs font-medium leading-relaxed focus:bg-white focus:ring-4 focus:ring-indigo-50 outline-none shadow-inner transition resize-none"
                    />
                 </div>

                 <div className="p-5 bg-blue-50/50 rounded-[1.8rem] border border-blue-100 flex gap-4">
                    <Info size={24} className="text-blue-600 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-blue-800 font-bold leading-relaxed">بمجرد الإرسال، سيتم إغلاق الجلسة وتحويل الأتعاب لمحفظتك بعد موافقة العميل.</p>
                 </div>

                 <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => onFinish(finalSummary)}
                      disabled={finalSummary.length < 20}
                      className="flex-[2] py-5 bg-indigo-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-indigo-100 active:scale-95 transition disabled:opacity-30"
                    >
                       إرسال التقرير وإنهاء الجلسة
                    </button>
                    <button onClick={() => setShowSummaryModal(false)} className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-sm hover:bg-slate-200 transition">إلغاء</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default LawyerConsultationRoom;
