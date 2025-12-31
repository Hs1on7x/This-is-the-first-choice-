
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, Send, Mic, Video, Users, Gavel, 
  CheckCircle2, AlertTriangle, ShieldCheck, Info,
  Search, FileText, Bot, Sparkles, ChevronLeft,
  X, Paperclip, Lock, History, User, MessageSquare, Handshake, ExternalLink,
  // Added missing List import
  List
} from 'lucide-react';
import { DisputeCase, Message, UserProfile } from '../types';

interface MediatorResolutionRoomProps {
  dispute: DisputeCase;
  onBack: () => void;
  onIssueDecision: (decisionData: any) => void;
}

const MediatorResolutionRoom: React.FC<MediatorResolutionRoomProps> = ({ dispute, onBack, onIssueDecision }) => {
  const [activeSideTab, setActiveSideTab] = useState<'evidence' | 'clauses' | 'settlement'>('settlement');
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', role: 'mediator', content: 'أهلاً بكم في جلسة فض النزاع الودية. أنا الوسيط المعين لحالتكم. يرجى التزام الهدوء والمهنية للوصول لحل يرضي الجميع.', timestamp: new Date(Date.now() - 600000) },
    { id: '2', role: 'claimant', content: 'نحن نصر على استرداد كامل الدفعة الأولى نظراً لعدم استلام أي مخرجات.', timestamp: new Date(Date.now() - 300000) }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [privateNotes, setPrivateNotes] = useState('');
  const [showSettlementModal, setShowSettlementModal] = useState(false);
  const [settlementDraft, setSettlementDraft] = useState('');

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const msg: Message = { id: Date.now().toString(), role: 'mediator', content: inputValue, timestamp: new Date() };
    setMessages([...messages, msg]);
    setInputValue('');
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-bottom duration-700 h-screen overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b p-4 shadow-sm z-30 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowRight size={20} /></button>
          <div className="relative">
             <div className="w-10 h-10 bg-slate-900 rounded-xl flex items-center justify-center text-white shadow-lg"><Gavel size={24} /></div>
             <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-blue-500 rounded-full border-2 border-white shadow-sm animate-pulse" />
          </div>
          <div>
            <h1 className="text-sm font-black text-slate-900 leading-tight truncate max-w-[150px]">{dispute.title}</h1>
            <p className="text-[9px] text-blue-600 font-bold uppercase tracking-widest">ID: {dispute.id} • وساطة جارية</p>
          </div>
        </div>
        <button 
          onClick={() => setShowSettlementModal(true)}
          className="px-6 py-2.5 bg-slate-900 text-white rounded-xl text-[10px] font-black shadow-xl active:scale-95 transition"
        >
          إصدار قرار/تسوية
        </button>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Triple-Party View Side Tab */}
        <div className="hidden lg:flex w-80 bg-white border-l flex-col">
           <div className="flex p-1 bg-slate-50 border-b">
              {['settlement', 'evidence', 'clauses'].map(tab => (
                <button 
                  key={tab} 
                  onClick={() => setActiveSideTab(tab as any)}
                  className={`flex-1 py-3 rounded-lg text-[10px] font-black uppercase transition-all ${activeSideTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
                >
                  {tab === 'settlement' ? <Handshake size={14} className="mx-auto" /> : 
                   tab === 'evidence' ? <FileText size={14} className="mx-auto" /> : <List size={14} className="mx-auto" />}
                </button>
              ))}
           </div>
           
           <div className="flex-1 overflow-y-auto p-5 space-y-8 no-scrollbar">
              {activeSideTab === 'settlement' && (
                <div className="space-y-6 animate-in fade-in duration-300">
                   <div className="p-6 bg-blue-600 rounded-[2rem] text-white space-y-4 shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full -mr-12 -mt-12 blur-2xl" />
                      <div className="flex items-center gap-3">
                         <Sparkles size={20} className="text-amber-400" />
                         <h4 className="text-xs font-black uppercase tracking-widest">توصية التسوية (AI)</h4>
                      </div>
                      <p className="text-[10px] text-blue-50 leading-relaxed font-medium">بناءً على الأدلة، نقترح تسوية بنسبة ٧٠٪ لصالح المدعي نظراً للتأخير الموثق.</p>
                      <button className="w-full py-2 bg-white text-blue-600 rounded-xl text-[9px] font-black active:scale-95 transition">عرض المسودة</button>
                   </div>
                   
                   <div className="space-y-4">
                      <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">حالة الأطراف</h4>
                      <div className="space-y-3">
                         <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm"><User size={16} /></div>
                               <span className="text-[10px] font-black text-slate-700">{dispute.claimantName}</span>
                            </div>
                            <span className="text-[8px] font-black text-emerald-600 uppercase">متصل</span>
                         </div>
                         <div className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between group">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-slate-400 shadow-sm"><User size={16} /></div>
                               <span className="text-[10px] font-black text-slate-700">{dispute.defendantName}</span>
                            </div>
                            <span className="text-[8px] font-black text-emerald-600 uppercase">متصل</span>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeSideTab === 'evidence' && (
                <div className="space-y-4 animate-in fade-in duration-300">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">ملفات الأدلة المرفوعة</h3>
                   <div className="space-y-3">
                      {dispute.evidence.map((ev, i) => (
                        <div key={i} className="p-4 bg-white border border-slate-100 rounded-2xl space-y-3 shadow-sm hover:border-blue-600 transition group">
                           <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                 <FileText size={18} className="text-blue-500" />
                                 <span className="text-[10px] font-bold text-slate-700 truncate max-w-[120px]">{ev.title}</span>
                              </div>
                              <ExternalLink size={12} className="text-slate-300 group-hover:text-blue-600" />
                           </div>
                           <div className="p-2 bg-slate-50 rounded-lg text-[8px] text-slate-500 leading-relaxed italic border-r-2 border-blue-400">
                              AI Insight: {ev.aiInsight}
                           </div>
                        </div>
                      ))}
                   </div>
                </div>
              )}
           </div>
        </div>

        {/* MULTI-PARTY CHAT AREA */}
        <div className="flex-1 flex flex-col relative">
           <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              <div className="flex justify-center my-4">
                 <div className="px-4 py-1.5 bg-slate-200/50 rounded-full text-[9px] font-black text-slate-500 flex items-center gap-2 uppercase tracking-widest">
                    <ShieldCheck size={12} /> غرفة حوار آمنة مسجلة قانونياً
                 </div>
              </div>

              {messages.map(m => (
                <div key={m.id} className={`flex ${m.role === 'mediator' ? 'justify-center' : m.role === 'claimant' ? 'justify-start' : 'justify-end'} animate-in fade-in duration-300`}>
                   <div className={`max-w-[75%] space-y-1 ${m.role === 'mediator' ? 'text-center' : m.role === 'claimant' ? 'text-right' : 'text-left'}`}>
                      {m.role !== 'mediator' && (
                        <span className="text-[9px] font-black text-slate-400 uppercase tracking-tighter px-2">
                           {m.role === 'claimant' ? 'المدعي' : 'المدعى عليه'}
                        </span>
                      )}
                      <div className={`p-4 rounded-[1.8rem] shadow-sm text-sm leading-relaxed ${
                        m.role === 'mediator' ? 'bg-slate-900 text-white' : 
                        m.role === 'claimant' ? 'bg-white border border-slate-100 text-slate-800 rounded-tr-none shadow-blue-50' : 
                        'bg-blue-50 border border-blue-100 text-blue-900 rounded-tl-none shadow-indigo-50'
                      }`}>
                         {m.content}
                      </div>
                      <p className="text-[8px] font-bold text-slate-300 uppercase px-1">{m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                   </div>
                </div>
              ))}
           </div>

           {/* INPUT AREA */}
           <div className="p-4 bg-white border-t space-y-4">
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
                 {['اقتراح حل وسط', 'طلب دليل إضافي', 'تنبيه مهني', 'سؤال للأطراف'].map((btn, i) => (
                   <button key={i} className="whitespace-nowrap bg-slate-50 text-slate-600 px-4 py-1.5 rounded-lg text-[10px] font-black uppercase border border-slate-100 hover:bg-blue-600 hover:text-white transition">+ {btn}</button>
                 ))}
              </div>
              <div className="flex items-end gap-2">
                 <div className="flex-1 bg-slate-50 border border-slate-100 rounded-[2rem] p-2 flex items-end">
                    <button className="p-2.5 text-slate-400 hover:text-blue-600 transition"><Paperclip size={20} /></button>
                    <textarea 
                      value={inputValue}
                      onChange={e => setInputValue(e.target.value)}
                      rows={1}
                      placeholder="اكتب توجيهاً للأطراف..."
                      className="flex-1 bg-transparent border-none py-3 px-3 text-sm font-medium outline-none resize-none max-h-32"
                    />
                 </div>
                 <button 
                   onClick={handleSend}
                   disabled={!inputValue.trim()}
                   className="w-12 h-12 bg-slate-900 text-white rounded-2xl shadow-xl active:scale-95 transition flex items-center justify-center disabled:opacity-30"
                 >
                    <Send size={24} />
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* SETTLEMENT / DECISION MODAL */}
      {showSettlementModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 space-y-8 shadow-2xl animate-in zoom-in duration-300">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-slate-100 text-slate-900 rounded-2xl flex items-center justify-center shadow-inner"><Gavel size={28} /></div>
                 <div>
                    <h3 className="text-xl font-black text-slate-900">إصدار القرار النهائي</h3>
                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">وثيقة ملزمة للأطراف</p>
                 </div>
              </div>

              <div className="space-y-4">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">نص القرار والحكم</label>
                    <textarea 
                      value={settlementDraft}
                      onChange={e => setSettlementDraft(e.target.value)}
                      rows={8}
                      placeholder="اكتب هنا نص الحكم النهائي والإجراءات المطلوبة من كل طرف..."
                      className="w-full bg-slate-50 border border-slate-100 rounded-[1.8rem] p-6 text-xs font-medium leading-relaxed focus:bg-white focus:ring-4 focus:ring-slate-100 outline-none shadow-inner transition resize-none"
                    />
                 </div>

                 <div className="p-5 bg-amber-50 rounded-[1.8rem] border border-amber-100 flex gap-4">
                    <AlertTriangle size={24} className="text-amber-500 shrink-0 mt-0.5" />
                    <p className="text-[10px] text-amber-800 font-bold leading-relaxed">بمجرد إصدار القرار، سيتم تفعيل التنفيذ المالي وتحديث حالة العقد تلقائياً.</p>
                 </div>

                 <div className="flex gap-3 pt-2">
                    <button 
                      onClick={() => onIssueDecision(settlementDraft)}
                      disabled={settlementDraft.length < 50}
                      className="flex-[2] py-5 bg-slate-900 text-white rounded-2xl font-black text-sm shadow-xl active:scale-95 transition disabled:opacity-30"
                    >
                       إصدار القرار والتوقيع
                    </button>
                    <button onClick={() => setShowSettlementModal(false)} className="flex-1 py-5 bg-slate-100 text-slate-400 rounded-2xl font-black text-sm hover:bg-slate-200 transition">إلغاء</button>
                 </div>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};

export default MediatorResolutionRoom;
