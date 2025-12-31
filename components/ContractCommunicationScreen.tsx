
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, Send, Paperclip, Mic, Link as LinkIcon, 
  Smile, MoreVertical, FileText, Download, Play, 
  Pause, ChevronLeft, Search, UserPlus, Settings, 
  Info, Check, CheckCheck, X, File, Image as ImageIcon
} from 'lucide-react';
import { ContractDraft, UserProfile, Message } from '../types';

interface ContractCommunicationScreenProps {
  draft: ContractDraft;
  user: UserProfile;
  onBack: () => void;
}

const ContractCommunicationScreen: React.FC<ContractCommunicationScreenProps> = ({ draft, user, onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'm1', role: 'counterparty', content: 'السلام عليكم، متى يمكننا التوقيع على المسودة النهائية للعقد؟', 
      timestamp: new Date(Date.now() - 3600000), type: 'text',
      metadata: { readStatus: 'read' }
    },
    {
      id: 'm2', role: 'user', content: 'وعليكم السلام، أحتاج فقط لتوضيح نقطة معينة في البند الخامس قبل المتابعة.', 
      timestamp: new Date(Date.now() - 3000000), type: 'text',
      metadata: { readStatus: 'read' }
    },
    {
      id: 'm3', role: 'counterparty', content: 'أرفقت لك ملف عرض السعر المحدث لمراجعته.', 
      timestamp: new Date(Date.now() - 2000000), type: 'file',
      metadata: { 
        fileInfo: { name: 'عرض_السعر_المحدث.pdf', size: '2.5 MB', type: 'pdf' },
        readStatus: 'read'
      }
    },
    {
      id: 'm4', role: 'user', content: 'هل هذا التعديل يغطي تكاليف الشحن الدولي؟', 
      timestamp: new Date(Date.now() - 1000000), type: 'text',
      metadata: { 
        linkedClauseId: 'c5', 
        linkedClauseTitle: 'البند 5 - الدفع',
        readStatus: 'delivered' 
      }
    },
    {
      id: 'm5', role: 'counterparty', content: '', 
      timestamp: new Date(Date.now() - 500000), type: 'audio',
      metadata: { 
        audioDuration: '0:45',
        readStatus: 'sent'
      }
    }
  ]);

  const [inputValue, setInputValue] = useState('');
  const [showClausePicker, setShowClausePicker] = useState(false);
  const [selectedClause, setSelectedClause] = useState<{id: string, title: string} | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [viewingClause, setViewingClause] = useState<{id: string, title: string, content: string} | null>(null);

  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date(),
      type: 'text',
      metadata: { 
        linkedClauseId: selectedClause?.id,
        linkedClauseTitle: selectedClause?.title,
        readStatus: 'sent'
      }
    };
    setMessages([...messages, newMessage]);
    setInputValue('');
    setSelectedClause(null);
  };

  const clauses = [
    { id: 'c1', title: 'البند 1: التعريفات', content: 'يقصد بالمصطلحات التالية المعاني الموضحة أمام كل منها...' },
    { id: 'c3', title: 'البند 3: مدة العقد', content: 'يسري هذا العقد لمدة سنة واحدة تبدأ من تاريخ توقيع الأطراف عليه...' },
    { id: 'c5', title: 'البند 5: المقابل المالي', content: 'يلتزم الطرف الأول بدفع مبلغ ١٢,٠٠٠ ريال سعودي نظير الخدمات...' },
    { id: 'c8', title: 'البند 8: الإنهاء', content: 'يحق لأي من الطرفين إنهاء العقد بإخطار كتابي مدته ٣٠ يوماً...' }
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-500 h-screen overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm p-4">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
                 <ArrowRight className="text-slate-700" />
              </button>
              <div className="relative">
                 <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white font-black text-xs shadow-md">
                    أ س
                 </div>
                 <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white shadow-sm" />
              </div>
              <div>
                 <h1 className="text-sm font-black text-slate-900 leading-tight">عقد إيجار - شقة الرياض</h1>
                 <p className="text-[10px] text-emerald-600 font-bold flex items-center gap-1">
                    أحمد السعيد • متصل الآن
                 </p>
              </div>
           </div>
           <div className="flex gap-1">
              <button className="p-2 text-slate-400 hover:text-blue-600 transition"><Info size={20} /></button>
              <button className="p-2 text-slate-400 hover:text-blue-600 transition"><UserPlus size={20} /></button>
              <button className="p-2 text-slate-400 hover:text-blue-600 transition"><Settings size={20} /></button>
           </div>
        </div>

        {/* Mini Search Bar */}
        <div className="mt-3 relative group">
           <input 
             type="text" 
             placeholder="ابحث في المحادثة..."
             value={searchQuery}
             onChange={e => setSearchQuery(e.target.value)}
             className="w-full bg-slate-50 border-none rounded-xl py-2 px-4 pr-10 text-[10px] font-medium outline-none focus:ring-2 focus:ring-blue-100"
           />
           <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" size={14} />
        </div>
      </div>

      {/* Message Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {messages.map((m) => (
          <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} group animate-in slide-in-from-bottom-2 duration-300`}>
            <div className={`max-w-[85%] flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}>
               <div className="flex items-center gap-2 mb-1 px-1">
                  <span className="text-[9px] font-black text-slate-400">{m.role === 'user' ? 'أنت' : 'أحمد السعيد'}</span>
                  <span className="text-[8px] font-bold text-slate-300 uppercase">{m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
               </div>

               <div className={`p-4 rounded-[1.8rem] shadow-sm relative ${
                 m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-white border border-slate-100 text-slate-700 rounded-tl-none'
               }`}>
                  {/* File Content */}
                  {m.type === 'file' && m.metadata?.fileInfo && (
                    <div className="space-y-3 w-48">
                       <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${m.role === 'user' ? 'bg-white/20' : 'bg-red-50'}`}>
                             <FileText size={24} className={m.role === 'user' ? 'text-white' : 'text-red-500'} />
                          </div>
                          <div className="flex-1 overflow-hidden">
                             <p className={`text-[10px] font-black truncate ${m.role === 'user' ? 'text-white' : 'text-slate-900'}`}>{m.metadata.fileInfo.name}</p>
                             <p className={`text-[8px] font-bold uppercase opacity-60 ${m.role === 'user' ? 'text-blue-100' : 'text-slate-400'}`}>{m.metadata.fileInfo.size}</p>
                          </div>
                       </div>
                       <div className="flex gap-2">
                          <button className={`flex-1 py-1.5 rounded-lg text-[8px] font-black uppercase transition ${m.role === 'user' ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}>تحميل</button>
                          <button className={`flex-1 py-1.5 rounded-lg text-[8px] font-black uppercase transition ${m.role === 'user' ? 'bg-white/20 hover:bg-white/30 text-white' : 'bg-slate-100 hover:bg-slate-200 text-slate-600'}`}>عرض</button>
                       </div>
                    </div>
                  )}

                  {/* Audio Content */}
                  {m.type === 'audio' && (
                    <div className="flex items-center gap-4 py-1 min-w-[180px]">
                       <button className={`w-8 h-8 rounded-full flex items-center justify-center ${m.role === 'user' ? 'bg-white/20 text-white' : 'bg-blue-600 text-white'}`}>
                          <Play size={16} fill="currentColor" />
                       </button>
                       <div className="flex-1 flex items-center gap-1">
                          {[1,2,3,4,3,2,4,5,3,2,4,3,2].map((h, i) => (
                             <div key={i} className={`w-0.5 rounded-full transition-all ${m.role === 'user' ? 'bg-white/40' : 'bg-slate-200'}`} style={{ height: h * 4 }} />
                          ))}
                       </div>
                       <span className={`text-[9px] font-black ${m.role === 'user' ? 'text-white' : 'text-slate-400'}`}>{m.metadata?.audioDuration}</span>
                    </div>
                  )}

                  {/* Text Content */}
                  {m.type === 'text' && (
                    <p className="text-sm font-medium leading-relaxed">{m.content}</p>
                  )}

                  {/* Clause Link Badge */}
                  {m.metadata?.linkedClauseId && (
                    <button 
                      onClick={() => {
                        const c = clauses.find(x => x.id === m.metadata?.linkedClauseId);
                        if (c) setViewingClause(c);
                      }}
                      className={`mt-3 flex items-center gap-2 py-1.5 px-3 rounded-xl border transition-all active:scale-95 ${
                        m.role === 'user' ? 'bg-white/10 border-white/20 hover:bg-white/20' : 'bg-slate-50 border-slate-100 hover:border-blue-200'
                      }`}
                    >
                       <LinkIcon size={12} className={m.role === 'user' ? 'text-blue-100' : 'text-blue-600'} />
                       <span className={`text-[9px] font-black uppercase ${m.role === 'user' ? 'text-white' : 'text-slate-700'}`}>
                          مرتبط بـ: {m.metadata.linkedClauseTitle}
                       </span>
                       <ChevronLeft size={10} className={m.role === 'user' ? 'text-blue-200' : 'text-slate-300'} />
                    </button>
                  )}
               </div>

               {/* Status Row */}
               <div className="flex items-center gap-1 mt-1 px-1">
                  {m.role === 'user' && (
                    <span className="text-blue-600">
                       {m.metadata?.readStatus === 'read' ? <CheckCheck size={12} /> : 
                        m.metadata?.readStatus === 'delivered' ? <CheckCheck size={12} className="text-slate-300" /> : <Check size={12} className="text-slate-300" />}
                    </span>
                  )}
               </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions Bar */}
      <div className="bg-white px-4 py-2 flex items-center gap-4 overflow-x-auto no-scrollbar scrollbar-hide border-t border-slate-50">
         <button className="flex items-center gap-2 whitespace-nowrap bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase active:scale-95 transition">
            <LinkIcon size={12} /> مشاركة بند
         </button>
         <button className="flex items-center gap-2 whitespace-nowrap bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase active:scale-95 transition">
            <FileText size={12} /> مشاركة مستند
         </button>
         <button className="flex items-center gap-2 whitespace-nowrap bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg text-[9px] font-black uppercase active:scale-95 transition">
            <Play size={12} /> جدولة اجتماع
         </button>
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
         {/* Linked Clause Preview Above Input */}
         {selectedClause && (
           <div className="bg-blue-50 p-3 rounded-2xl border border-blue-100 flex items-center justify-between animate-in slide-in-from-bottom duration-300">
              <div className="flex items-center gap-2">
                 <div className="w-8 h-8 bg-blue-600 text-white rounded-xl flex items-center justify-center"><LinkIcon size={14} /></div>
                 <div>
                    <p className="text-[10px] font-black text-blue-900 uppercase">ربط بالبند</p>
                    <p className="text-[9px] text-blue-700 font-bold">{selectedClause.title}</p>
                 </div>
              </div>
              <button onClick={() => setSelectedClause(null)} className="p-1 text-blue-300 hover:text-blue-600 transition"><X size={16} /></button>
           </div>
         )}

         <div className="flex items-end gap-2">
            <div className="flex-1 bg-slate-50 border-none rounded-3xl p-2 focus-within:ring-2 focus-within:ring-blue-100 transition-all flex items-end">
               <div className="flex items-center pb-2 px-1">
                  <button onClick={() => setShowClausePicker(!showClausePicker)} className={`p-2 transition ${selectedClause ? 'text-blue-600' : 'text-slate-400 hover:text-blue-600'}`}>
                     <LinkIcon size={20} />
                  </button>
                  <button className="p-2 text-slate-400 hover:text-blue-600 transition">
                     <Smile size={20} />
                  </button>
               </div>
               <textarea 
                 value={inputValue}
                 onChange={e => setInputValue(e.target.value)}
                 rows={1}
                 placeholder="اكتب رسالة..."
                 className="flex-1 bg-transparent border-none py-2.5 px-2 text-sm font-medium outline-none resize-none max-h-32 min-h-[40px] custom-scrollbar"
               />
               <div className="flex items-center pb-2 px-1">
                  <button className="p-2 text-slate-400 hover:text-blue-600 transition">
                     <Paperclip size={20} />
                  </button>
               </div>
            </div>
            
            <button 
              onClick={inputValue.trim() ? handleSend : () => setIsRecording(!isRecording)}
              className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg transition active:scale-90 ${
                inputValue.trim() ? 'bg-blue-600 text-white shadow-blue-200' : isRecording ? 'bg-red-500 text-white animate-pulse' : 'bg-slate-900 text-white'
              }`}
            >
               {inputValue.trim() ? <Send size={22} /> : <Mic size={22} />}
            </button>
         </div>
      </div>

      {/* Clause Picker Overlay */}
      {showClausePicker && (
        <div className="absolute inset-x-0 bottom-[160px] mx-4 bg-white rounded-[2rem] border border-slate-100 shadow-2xl z-50 animate-in slide-in-from-bottom duration-300">
           <div className="p-4 border-b flex items-center justify-between">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">اختر بنداً للربط</h4>
              <button onClick={() => setShowClausePicker(false)}><X size={16} className="text-slate-300" /></button>
           </div>
           <div className="p-2 max-h-60 overflow-y-auto custom-scrollbar">
              {clauses.map(c => (
                <button
                  key={c.id}
                  onClick={() => { setSelectedClause({id: c.id, title: c.title}); setShowClausePicker(false); }}
                  className="w-full text-right p-3 hover:bg-slate-50 rounded-xl transition flex items-center justify-between group"
                >
                   <span className="text-[11px] font-black text-slate-700">{c.title}</span>
                   <ChevronLeft size={14} className="text-slate-200 group-hover:text-blue-600" />
                </button>
              ))}
           </div>
        </div>
      )}

      {/* Clause Viewer Modal */}
      {viewingClause && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-sm rounded-[2.5rem] flex flex-col shadow-2xl animate-in zoom-in duration-300 overflow-hidden">
              <div className="p-6 bg-blue-600 text-white flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <FileText size={24} />
                    <h3 className="text-lg font-black">{viewingClause.title}</h3>
                 </div>
                 <button onClick={() => setViewingClause(null)} className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition">
                    <X size={20} />
                 </button>
              </div>
              <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
                 <p className="text-sm font-serif leading-[2] text-slate-800 italic">"{viewingClause.content}"</p>
                 <div className="mt-8 p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-3">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                       <Info size={14} className="text-blue-600" /> ملاحظات الطرف الآخر
                    </p>
                    <p className="text-xs text-slate-600 font-medium">هذا البند تم الاتفاق عليه مبدئياً خلال جلسة التفاوض الأخيرة.</p>
                 </div>
              </div>
              <div className="p-6 border-t bg-slate-50">
                 <button 
                   onClick={() => setViewingClause(null)}
                   className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-sm active:scale-95 transition shadow-xl"
                 >
                    إغلاق المعاينة
                 </button>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default ContractCommunicationScreen;
