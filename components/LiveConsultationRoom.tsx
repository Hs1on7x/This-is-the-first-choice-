
import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Mic, Video, VideoOff, MicOff, PhoneOff, 
  MessageSquare, MoreVertical, Paperclip, ShieldCheck, 
  ChevronDown, Maximize2, User
} from 'lucide-react';
import { ConsultationSession, Message } from '../types';

interface LiveConsultationRoomProps {
  session: ConsultationSession;
  onEnd: () => void;
}

const LiveConsultationRoom: React.FC<LiveConsultationRoomProps> = ({ session, onEnd }) => {
  const [view, setView] = useState<'chat' | 'video'>(session.type === 'video' ? 'video' : 'chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'lawyer',
      content: `أهلاً بك. أنا ${session.lawyerName || 'المحامي'}، يسعدني مساعدتك في استشارة ${session.specialty}. كيف يمكنني البدء؟`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, view]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, msg]);
    setInputValue('');
  };

  return (
    <div className="flex-1 flex flex-col bg-white overflow-hidden relative">
      {/* Header - Fixed Height */}
      <div className="h-16 border-b flex items-center justify-between px-4 bg-white z-30 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img src={session.lawyerAvatar} className="w-10 h-10 rounded-full border border-slate-100 object-cover" alt="Lawyer" />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <h2 className="text-xs font-black text-slate-900 leading-tight">{session.lawyerName}</h2>
            <p className="text-[9px] text-blue-600 font-bold uppercase tracking-widest">{session.specialty}</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
           {view === 'chat' && session.type === 'video' && (
             <button onClick={() => setView('video')} className="p-2 text-blue-600 bg-blue-50 rounded-xl">
                <Maximize2 size={18} />
             </button>
           )}
           <button className="p-2 text-slate-400"><MoreVertical size={20} /></button>
        </div>
      </div>

      {/* Main Content Area - Responsive Container */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {view === 'video' ? (
          <div className="flex-1 bg-slate-900 relative overflow-hidden animate-in fade-in duration-500">
            {/* Main Video View (Lawyer) */}
            <div className="absolute inset-0 flex items-center justify-center">
               <div className="text-center space-y-6 z-10">
                  <div className="relative inline-block">
                    <img src={session.lawyerAvatar} className="w-32 h-32 rounded-full border-4 border-white/20 shadow-2xl mx-auto object-cover" alt="Avatar" />
                    <div className="absolute -bottom-2 right-1/2 translate-x-1/2 bg-blue-600 text-white text-[8px] font-black px-3 py-1 rounded-full uppercase border-2 border-slate-900">Lawyer</div>
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-black text-white">{session.lawyerName}</h3>
                    <div className="flex items-center justify-center gap-2 text-green-400 text-[10px] font-bold uppercase tracking-widest">
                      <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> اتصال مباشر مشفر
                    </div>
                  </div>
               </div>
               {/* Background Blur Effect */}
               <img src={session.lawyerAvatar} className="absolute inset-0 w-full h-full object-cover opacity-20 blur-2xl scale-110" alt="BG" />
            </div>
            
            {/* User PIP (Small Preview) */}
            <div className="absolute top-4 left-4 w-24 h-36 bg-slate-800 rounded-2xl border-2 border-white/10 shadow-2xl overflow-hidden z-20 transition-all active:scale-95">
               {videoOn ? (
                 <div className="w-full h-full bg-slate-700 flex items-center justify-center">
                    <User size={32} className="text-slate-500" />
                 </div>
               ) : (
                 <div className="w-full h-full bg-slate-900 flex items-center justify-center">
                    <VideoOff size={24} className="text-slate-600" />
                 </div>
               )}
               <div className="absolute bottom-2 left-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[7px] font-black text-white uppercase">You</div>
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4 z-30">
              <button onClick={() => setAudioOn(!audioOn)} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition ${audioOn ? 'bg-white/10 text-white backdrop-blur-md border border-white/10' : 'bg-red-500 text-white shadow-lg shadow-red-200'}`}>
                {audioOn ? <Mic size={20} /> : <MicOff size={20} />}
              </button>
              <button onClick={onEnd} className="w-16 h-16 bg-red-600 text-white rounded-3xl flex items-center justify-center shadow-2xl shadow-red-500/40 active:scale-90 transition-all group">
                <PhoneOff size={28} className="group-hover:scale-110 transition" />
              </button>
              <button onClick={() => setVideoOn(!videoOn)} className={`w-12 h-12 rounded-2xl flex items-center justify-center transition ${videoOn ? 'bg-white/10 text-white backdrop-blur-md border border-white/10' : 'bg-red-500 text-white shadow-lg shadow-red-200'}`}>
                {videoOn ? <Video size={20} /> : <VideoOff size={20} />}
              </button>
              <button onClick={() => setView('chat')} className="w-12 h-12 bg-white/10 text-white backdrop-blur-md border border-white/10 rounded-2xl flex items-center justify-center">
                <MessageSquare size={20} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col animate-in slide-in-from-left duration-300">
            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
              <div className="flex justify-center mb-6">
                <div className="px-4 py-1.5 bg-white border border-slate-200 rounded-full text-[9px] font-black text-slate-400 flex items-center gap-2 uppercase tracking-widest shadow-sm">
                   <ShieldCheck size={12} className="text-blue-500" /> جلسة آمنة تماماً
                </div>
              </div>
              
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}>
                  <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="space-y-1">
                      <div className={`p-4 rounded-[1.5rem] text-sm leading-relaxed ${
                        msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none shadow-lg shadow-blue-100' 
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm'
                      }`}>
                        {msg.content}
                      </div>
                      <p className={`text-[8px] text-slate-300 font-bold uppercase ${msg.role === 'user' ? 'text-left' : 'text-right'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t pb-8">
              <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-[1.5rem] p-2 focus-within:border-blue-400 focus-within:bg-white transition-all shadow-inner">
                <button className="p-2 text-slate-400 hover:text-blue-600 transition"><Paperclip size={20} /></button>
                <textarea
                  rows={1}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="اكتب استفسارك هنا..."
                  className="flex-1 bg-transparent border-none py-2 px-2 text-sm font-medium outline-none resize-none max-h-32 placeholder:text-slate-400"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className={`p-3 rounded-xl transition shadow-lg ${inputValue.trim() ? 'bg-blue-600 text-white shadow-blue-100' : 'bg-slate-200 text-slate-400'}`}
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
            
            {/* End Button Floating (Only in Chat) */}
            <button 
              onClick={onEnd}
              className="absolute bottom-24 left-4 w-12 h-12 bg-red-600 text-white rounded-2xl shadow-xl shadow-red-200 flex items-center justify-center hover:bg-red-700 active:scale-90 transition-all"
            >
              <PhoneOff size={22} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveConsultationRoom;
