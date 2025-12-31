
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, Send, Paperclip, Bot, User, MoreVertical, Sparkles, 
  CheckCircle, Clock, Mic, FileText, ExternalLink, Save, Share2, 
  Plus, UserPlus, Info, CheckCheck, Check, Search, Loader2, BookOpen, X,
  Crown, Zap, Star, ShieldCheck, ChevronLeft
} from 'lucide-react';
import { UserProfile, Message, ConsultationSession, ScreenType } from '../types';
import { GoogleGenAI, Type } from "@google/genai";

interface ChatAIScreenProps {
  user: UserProfile;
  onBack: () => void;
  onFinish: (session: ConsultationSession) => void;
  onNavigate?: (screen: ScreenType) => void;
}

const ChatAIScreen: React.FC<ChatAIScreenProps> = ({ user, onBack, onFinish, onNavigate }) => {
  // Logic for 3 Free Sessions using localStorage
  const [sessionsUsed, setSessionsUsed] = useState(() => {
    return parseInt(localStorage.getItem('ai_sessions_count') || '0');
  });

  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome-1',
      role: 'assistant',
      content: `مرحبًا ${user.legalName?.split(' ')[0] || ''} 👋\nأنا مساعدك القانوني الذكي، متخصص في الأنظمة السعودية.\n\nكيف يمكنني مساعدتك اليوم؟`,
      timestamp: new Date(),
      type: 'text'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const isPaywallActive = sessionsUsed >= 3;

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isTyping]);

  const handleSend = async (text: string) => {
    if (!text.trim()) return;

    // Check availability before sending
    if (isPaywallActive) {
      onNavigate?.(ScreenType.AI_SESSION_PAYMENT);
      return;
    }

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: text,
      timestamp: new Date(),
      metadata: { readStatus: 'sent' }
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [...messages, userMsg].map(m => ({
          role: m.role === 'user' ? 'user' : 'model',
          parts: [{ text: m.content || "" }]
        })),
        config: {
          systemInstruction: "أنت مساعد قانوني سعودي خبير. قدم استشارات دقيقة وموثوقة بناءً على الأنظمة السعودية. استخدم لغة مهنية وواضحة.",
        },
      });

      const aiText = response.text || "عذراً، لم أتمكن من المعالجة.";
      const aiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiText,
        timestamp: new Date()
      };

      setIsTyping(false);
      setMessages(prev => [...prev, aiMsg]);
      
      // Increment session count on successful first AI response of a session
      if (messages.length === 1) {
        const nextCount = sessionsUsed + 1;
        setSessionsUsed(nextCount);
        localStorage.setItem('ai_sessions_count', nextCount.toString());
      }
    } catch (error) {
      setIsTyping(false);
      console.error(error);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-bottom duration-500">
      
      {/* Header */}
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
              {!isPaywallActive && <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />}
            </div>
            <div>
              <h2 className="text-sm font-black text-slate-900 leading-tight">المساعد القانوني الذكي</h2>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">
                {isPaywallActive ? 'الباقة منتهية' : `${3 - sessionsUsed} جلسات مجانية متبقية`}
              </p>
            </div>
          </div>
          
          <button className="p-2 text-slate-400 hover:bg-slate-50 rounded-lg transition">
            <MoreVertical size={20} />
          </button>
        </div>

        {!isPaywallActive && (
          <div className="px-6 pb-3 space-y-1.5">
             <div className="flex justify-between text-[8px] font-black text-slate-400 uppercase tracking-widest">
                <span>الجلسات المجانية</span>
                <span>{sessionsUsed}/3</span>
             </div>
             <div className="w-full h-1 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 transition-all duration-1000" style={{ width: `${(sessionsUsed/3)*100}%` }} />
             </div>
          </div>
        )}
      </div>

      {/* Chat Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
            <div className={`flex gap-3 max-w-[88%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
              <div className="space-y-1.5">
                <div className={`p-4 rounded-3xl text-sm leading-relaxed whitespace-pre-wrap shadow-sm border ${
                  msg.role === 'user' 
                  ? 'bg-blue-100 text-slate-900 rounded-tr-none border-blue-200' 
                  : 'bg-white text-slate-800 rounded-tl-none border-slate-100'
                }`}>
                  {msg.content}
                </div>
              </div>
            </div>
          </div>
        ))}

        {isPaywallActive && (
          <div className="space-y-6 animate-in slide-in-from-bottom duration-700 pb-10">
             <div className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden text-center space-y-6">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl animate-pulse" />
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto shadow-lg backdrop-blur-md">
                   <Crown size={32} className="text-amber-300" />
                </div>
                <div className="space-y-2">
                   <h3 className="text-xl font-black">استمر في الحصول على استشارات قانونية</h3>
                   <p className="text-xs text-indigo-100 font-medium leading-relaxed">
                     لقد استهلكت جميع جلساتك المجانية. اختر الباقة الأنسب لمواصلة استخدام الذكاء الاصطناعي في حل مشكلاتك القانونية.
                   </p>
                </div>
                <button 
                  onClick={() => onNavigate?.(ScreenType.AI_SESSION_PAYMENT)}
                  className="w-full py-4 bg-white text-blue-600 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition"
                >
                   عرض الباقات والاشتراكات
                </button>
             </div>
          </div>
        )}

        {isTyping && (
          <div className="flex justify-start animate-in fade-in duration-300">
            <div className="flex gap-3">
              <div className="bg-white border border-slate-100 p-4 rounded-3xl rounded-tl-none flex gap-1 items-center shadow-sm">
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                <div className="w-1.5 h-1.5 bg-blue-400 rounded-full animate-bounce" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input Area */}
      <div className="p-4 bg-white border-t sticky bottom-0 z-40 pb-6">
        <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-[2rem] p-2 focus-within:border-blue-500 transition-all shadow-inner">
          <button className="p-3 text-slate-400 hover:text-blue-600 hover:bg-white rounded-full transition active:scale-90">
            <Paperclip size={22} />
          </button>
          <textarea
            rows={1}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="اكتب استفسارك القانوني..."
            className="flex-1 bg-transparent border-none py-3 px-2 text-sm font-medium outline-none resize-none max-h-32 min-h-[44px] placeholder:text-slate-400"
          />
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

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default ChatAIScreen;
