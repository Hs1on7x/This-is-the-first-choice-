import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, Send, Paperclip, Bot, User, MoreVertical, Sparkles, 
  CheckCircle, Clock, Mic, FileText, BookOpen, ExternalLink, 
  Plus, Gavel, UserPlus, Share2, History, Trash2, Info, CheckCheck, Check,
  Search, Loader2, X, Save, MessageSquare
} from 'lucide-react';
import { UserProfile, Message, ConsultationSession, ScreenType } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

interface ChatAIScreenProps {
  user: UserProfile;
  onBack: () => void;
  onFinish: (session: ConsultationSession) => void;
  onNavigate?: (screen: any) => void;
}

const ChatAIScreen: React.FC<ChatAIScreenProps> = ({ user, onBack, onFinish, onNavigate }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `مرحبًا ${user.legalName?.split(' ')[0] || ''} 👋\nأنا مساعدك القانوني الذكي، متخصص في الأنظمة السعودية.\n\nكيف يمكنني مساعدتك اليوم؟\n\nيمكنني مساعدتك في:\n• استشارات قانونية عامة\n• مراجعة عقود وتدقيقها\n• شرح الأنظمة واللوائح\n• توجيهك للإجراء القانوني المناسب`,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [isAnalyzingFile, setIsAnalyzingFile] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [showMenu, setShowMenu] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Timer for session
  useEffect(() => {
    const interval = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping, isSearching, isAnalyzingFile]);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleSend = async (text: string, overrideRole: 'user' | 'assistant' = 'user') => {
    if (!text.trim()) return;

    const msgId = Date.now().toString();
    const userMsg: Message = {
      id: msgId,
      role: overrideRole,
      content: text,
      timestamp: new Date(),
      metadata: { readStatus: 'sent' }
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    
    if (overrideRole === 'user') {
      // Mark as read after a short delay
      setTimeout(() => {
        setMessages(prev => prev.map(m => m.id === msgId ? { ...m, metadata: { ...m.metadata, readStatus: 'read' } } : m));
      }, 1000);
      
      processAIResponse([...messages, userMsg]);
    }
  };

  const processAIResponse = async (history: Message[]) => {
    setIsTyping(true);
    // Simulate initial delay/thinking
    await new Promise(resolve => setTimeout(resolve, 1000));

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: history.map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content || "" }]
        })),
        config: {
          systemInstruction: `أنت مساعد قانوني خبير ومحايد في الأنظمة السعودية.
          - قدم إجابات دقيقة بناءً على نظام العمل، نظام الشركات، نظام المعاملات المدنية، وغيرها.
          - استخدم لغة عربية فصحى قانونية واضحة.
          - إذا سأل المستخدم عن شيء يحتاج توضيح، اطرح أسئلة محددة.
          - إذا كانت الحالة معقدة، انصح بالتحويل لمحامٍ بشري.
          - قم بتضمين مراجع لمواد النظام إذا لزم الأمر.`,
        },
      });

      const aiText = response.text || "عذراً، لم أتمكن من معالجة طلبك حالياً.";
      
      // Determine if we need specialized UI components (mock logic for demo)
      let aiMsg: Message = {
        id: Date.now().toString(),
        role: 'assistant',
        content: aiText,
        timestamp: new Date(),
        type: 'text'
      };

      // Simulated Logic: If text contains "المادة", add a Reference Card
      if (aiText.includes("المادة")) {
        aiMsg.metadata = {
          linkedClauseTitle: "نظام العمل السعودي",
          linkedClauseId: "Art74"
        };
      }

      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);

    } catch (error) {
      console.error("AI Error:", error);
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: 'err-' + Date.now(),
        role: 'assistant',
        content: "واجهت مشكلة في الاتصال بالذكاء الاصطناعي. يرجى المحاولة مرة أخرى.",
        timestamp: new Date(),
        type: 'text'
      }]);
    }
  };

  const handleFileUpload = () => {
    fileInputRef.current?.click();
  };

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsAnalyzingFile(true);
      setTimeout(() => {
        setIsAnalyzingFile(false);
        const fileMsg: Message = {
          id: 'file-' + Date.now(),
          role: 'assistant',
          content: `✅ تم تحليل مستند: ${file.name}\n\nوجدت 3 نقاط تحتاج انتباهك:\n1. البند المالي غير محدد بدقة.\n2. فترة الإخطار قصيرة جداً.\n3. يفتقد العقد لبند حماية البيانات.`,
          timestamp: new Date(),
          type: 'card'
        };
        setMessages(prev => [...prev, fileMsg]);
      }, 3000);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-bottom duration-500 relative">
      
      {/* 1. Header */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
              <ArrowRight className="text-slate-700" />
            </button>
            <div className="relative">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg">
                <Bot size={24} />
              </div>
              <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 leading-tight">المساعد القانوني الذكي</h2>
              <p className="text-[10px] text-green-600 font-bold uppercase tracking-widest">متصل الآن</p>
            </div>
          </div>
          <div className="relative">
            <button 
              onClick={() => setShowMenu(!showMenu)}
              className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition"
            >
              <MoreVertical size={20} />
            </button>
            
            {showMenu && (
              <div className="absolute left-0 mt-2 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 p-2 z-50 animate-in fade-in zoom-in duration-200">
                <button className="w-full text-right px-4 py-3 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-3">
                  {/* Added missing import for Save icon */}
                  <Save size={16} className="text-blue-600" /> حفظ المحادثة
                </button>
                <button className="w-full text-right px-4 py-3 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-3">
                  <Share2 size={16} className="text-indigo-600" /> مشاركة الاستشارة
                </button>
                <button onClick={() => setMessages([messages[0]])} className="w-full text-right px-4 py-3 hover:bg-slate-50 rounded-xl text-xs font-bold text-slate-700 flex items-center gap-3 border-t">
                  <Plus size={16} className="text-emerald-600" /> محادثة جديدة
                </button>
                <button 
                  onClick={() => onNavigate?.(ScreenType.REQUEST_HUMAN_CONSULT)}
                  className="w-full text-right px-4 py-3 hover:bg-slate-50 rounded-xl text-xs font-black text-blue-600 flex items-center gap-3"
                >
                  <UserPlus size={16} /> تحويل لاستشارة بشرية
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Session Stats Bar */}
        <div className="px-6 pb-2 flex justify-between items-center text-[8px] font-black text-slate-400 uppercase tracking-[0.2em]">
          <div className="flex items-center gap-4">
            <span className="flex items-center gap-1"><Clock size={10} /> مدة الجلسة: {formatTime(sessionTime)}</span>
            {/* Added missing import for MessageSquare icon */}
            <span className="flex items-center gap-1"><MessageSquare size={10} /> {messages.length} رسائل</span>
          </div>
          <span className="text-blue-600 bg-blue-50 px-2 py-0.5 rounded">v3.5 Pro</span>
        </div>
      </div>

      {/* 2. Chat Area */}
      <div 
        ref={scrollRef}
        className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth custom-scrollbar"
      >
        {messages.map((msg, idx) => (
          <div 
            key={msg.id}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}
          >
            <div className={`flex gap-3 max-w-[88%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              {msg.role !== 'user' && (
                <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600 shadow-sm self-end mb-4">
                  <Bot size={16} />
                </div>
              )}
              
              <div className="space-y-1.5 w-full">
                {/* Message Bubble */}
                <div className={`p-4 rounded-3xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm border ${
                  msg.role === 'user' 
                  ? 'bg-blue-100 text-slate-900 rounded-tr-none border-blue-200' 
                  : 'bg-white text-slate-800 rounded-tl-none border-slate-100'
                }`}>
                  {msg.content}
                  
                  {/* Reference Card Integration */}
                  {msg.metadata?.linkedClauseId && (
                    <div className="mt-4 bg-slate-50 rounded-2xl border border-slate-100 p-4 space-y-3">
                       <div className="flex items-center gap-2 text-blue-700">
                          <BookOpen size={16} />
                          <span className="text-[10px] font-black uppercase tracking-widest">{msg.metadata.linkedClauseTitle}</span>
                       </div>
                       <p className="text-[11px] font-bold text-slate-700 italic border-r-2 border-blue-400 pr-3">
                          المادة 74: ينتهي عقد العمل في الحالات التالية: إذا اتفق الطرفان على إنهائه، بشرط أن تكون موافقة العامل كتابية...
                       </p>
                       <button className="w-full py-2 bg-white text-blue-600 rounded-xl text-[9px] font-black uppercase border border-blue-100 hover:bg-blue-50 transition flex items-center justify-center gap-1">
                          اقرأ المزيد <ExternalLink size={10} />
                       </button>
                    </div>
                  )}

                  {/* Action Buttons Integration (Simulated for Demo) */}
                  {msg.id === messages[messages.length-1].id && msg.role === 'assistant' && msg.content.includes("حقوقك") && (
                    <div className="mt-4 grid grid-cols-1 gap-2">
                       <button onClick={() => onNavigate?.(ScreenType.CONTRACT_SELECT_TYPE)} className="flex items-center justify-between p-3 bg-blue-600 text-white rounded-2xl text-[10px] font-black uppercase hover:bg-blue-700 transition">
                          إنشاء عقد عمل جديد <Plus size={14} />
                       </button>
                       <button onClick={() => onNavigate?.(ScreenType.OPEN_DISPUTE)} className="flex items-center justify-between p-3 bg-red-600 text-white rounded-2xl text-[10px] font-black uppercase hover:bg-red-700 transition">
                          فتح نزاع رسمي <Gavel size={14} />
                       </button>
                       <button onClick={() => onNavigate?.(ScreenType.REQUEST_HUMAN_CONSULT)} className="flex items-center justify-between p-3 bg-white border border-blue-200 text-blue-600 rounded-2xl text-[10px] font-black uppercase hover:bg-blue-50 transition">
                          تحدث مع محامٍ متخصص <UserPlus size={14} />
                       </button>
                    </div>
                  )}
                </div>

                {/* Status & Timestamp */}
                <div className={`flex items-center gap-2 px-1 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <span className="text-[8px] font-bold text-slate-300 uppercase">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                  {msg.role === 'user' && (
                    <span className="text-blue-400">
                      {msg.metadata?.readStatus === 'read' ? <CheckCheck size={12} /> : <Check size={12} />}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Dynamic Capability Indicators */}
        {isTyping && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="flex gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-50 border border-blue-100 flex items-center justify-center text-blue-600 shadow-sm">
                <Bot size={16} />
              </div>
              <div className="bg-white border border-slate-100 p-4 rounded-3xl rounded-tl-none flex flex-col gap-2">
                <div className="flex gap-1 items-center">
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                  <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
                </div>
                <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest animate-pulse">المساعد القانوني يكتب...</p>
              </div>
            </div>
          </div>
        )}

        {isSearching && (
           <div className="bg-indigo-50 border border-indigo-100 p-4 rounded-2xl flex items-center gap-4 animate-in slide-in-from-left duration-300">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm">
                 <Search size={20} className="animate-spin" />
              </div>
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-indigo-900 uppercase">جارٍ البحث في المكتبة النظامية...</p>
                 <ul className="text-[8px] text-indigo-600 font-bold flex gap-2">
                    <li className="flex items-center gap-1">• نظام العمل</li>
                    <li className="flex items-center gap-1">• نظام المحاكم</li>
                 </ul>
              </div>
           </div>
        )}

        {isAnalyzingFile && (
           <div className="bg-emerald-50 border border-emerald-100 p-4 rounded-2xl flex items-center gap-4 animate-in slide-in-from-left duration-300">
              <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-emerald-600 shadow-sm">
                 <Loader2 size={20} className="animate-spin" />
              </div>
              <div className="space-y-1 flex-1">
                 <p className="text-[10px] font-black text-emerald-900 uppercase">جارٍ تحليل المستند بالذكاء الاصطناعي...</p>
                 <div className="w-full h-1 bg-white/50 rounded-full overflow-hidden">
                    <div className="h-full bg-emerald-500 animate-[progress_3s_linear]" />
                 </div>
              </div>
              <button onClick={() => setIsAnalyzingFile(false)} className="text-emerald-300 hover:text-red-500"><X size={16} /></button>
           </div>
        )}

        {/* Quick Suggestions Chips (Initial State) */}
        {messages.length === 1 && !isTyping && (
          <div className="flex flex-wrap gap-2 pt-4">
             {[
               { t: "مشكلة في العمل", icon: <History size={12} /> },
               { t: "عقد إيجار", icon: <FileText size={12} /> },
               { t: "نزاع تجاري", icon: <Gavel size={12} /> },
               { t: "تأسيس شركة", icon: <BookOpen size={12} /> },
               { t: "قضية عمالية", icon: <User size={12} /> }
             ].map((chip, i) => (
               <button 
                key={i}
                onClick={() => handleSend(chip.t)}
                className="bg-white border border-slate-200 px-4 py-2 rounded-full text-xs font-bold text-slate-600 hover:border-blue-400 hover:text-blue-600 hover:bg-blue-50 transition active:scale-95 flex items-center gap-2 shadow-sm"
               >
                 {chip.icon} {chip.t}
               </button>
             ))}
          </div>
        )}
      </div>

      {/* 3. Input Area */}
      <div className="p-4 bg-white border-t sticky bottom-0 z-40 pb-6">
        
        {/* Quick Reply Buttons (Dynamic Contextual) */}
        {messages.length > 2 && messages[messages.length-1].role === 'assistant' && (
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-3 animate-in slide-in-from-bottom duration-500">
             {["مكتوب", "شفهي", "لا يوجد عقد", "أحتاج توضيح"].map((reply, i) => (
               <button 
                key={i} 
                onClick={() => handleSend(reply)}
                className="whitespace-nowrap bg-blue-50 text-blue-700 px-6 py-2 rounded-xl text-[10px] font-black uppercase border border-blue-100 hover:bg-blue-600 hover:text-white transition active:scale-95"
               >
                 {reply}
               </button>
             ))}
          </div>
        )}

        <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-[2rem] p-2 focus-within:border-blue-500 focus-within:ring-4 focus-within:ring-blue-100 transition-all shadow-inner">
          <input 
            type="file" 
            ref={fileInputRef} 
            onChange={onFileChange} 
            className="hidden" 
            accept=".pdf,.doc,.docx,.jpg,.png" 
          />
          <button 
            onClick={handleFileUpload}
            className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-full transition active:scale-90"
          >
            <Paperclip size={22} />
          </button>
          
          <textarea
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(inputValue);
              }
            }}
            placeholder="اكتب استفسارك القانوني..."
            className="flex-1 bg-transparent border-none py-3 px-2 text-sm font-medium outline-none resize-none max-h-32 min-h-[44px] placeholder:text-slate-400"
          />
          
          <div className="flex items-center gap-1 p-1">
            <button className="p-2 text-slate-400 hover:text-blue-600 transition active:scale-90">
              <Mic size={22} />
            </button>
            <button 
              onClick={() => handleSend(inputValue)}
              disabled={!inputValue.trim() || isTyping}
              className={`p-3 rounded-2xl transition-all shadow-lg active:scale-95 ${
                inputValue.trim() && !isTyping ? 'bg-blue-600 text-white shadow-blue-200' : 'bg-slate-200 text-slate-400'
              }`}
            >
              <Send size={22} />
            </button>
          </div>
        </div>
        
        {/* Verification / Security Badge */}
        <div className="mt-3 flex justify-center gap-6 text-[8px] font-black text-slate-300 uppercase tracking-widest">
           <span className="flex items-center gap-1"><CheckCircle size={10} className="text-emerald-500" /> تشفير كامل</span>
           <span className="flex items-center gap-1"><Sparkles size={10} className="text-amber-500" /> تحليل ذكي نشط</span>
           <span className="flex items-center gap-1"><Info size={10} className="text-blue-400" /> متوافق مع الأنظمة</span>
        </div>
      </div>

      {/* Floating Action Button (Transfer to Lawyer) */}
      {messages.length > 5 && (
        <button 
          onClick={() => onNavigate?.(ScreenType.REQUEST_HUMAN_CONSULT)}
          className="fixed bottom-32 left-6 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-left duration-500 z-50 border border-white/10 active:scale-95 transition"
        >
           <UserPlus size={18} className="text-blue-400" />
           <span className="text-[10px] font-black uppercase tracking-widest">تحدث مع محامٍ</span>
        </button>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes progress { from { width: 0%; } to { width: 100%; } }
      `}</style>
    </div>
  );
};

export default ChatAIScreen;