
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, Send, Mic, Video, VideoOff, MicOff, PhoneOff, MessageSquare, MoreVertical, Paperclip, Clock, ShieldCheck, User, Scale } from 'lucide-react';
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
      content: `أهلاً بك. أنا ${session.lawyerName || 'المحامي'}، يسعدني خدمتك اليوم. لقد قرأت تفاصيل طلبك المتعلق بـ ${session.specialty}، تفضل بطرح أسئلتك.`,
      timestamp: new Date()
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [timeLeft, setTimeLeft] = useState(1800); // 30 minutes
  const [videoOn, setVideoOn] = useState(true);
  const [audioOn, setAudioOn] = useState(true);
  
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

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
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-bottom duration-700">
      {/* Header */}
      <div className="p-4 bg-white border-b flex items-center justify-between sticky top-0 z-20 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="relative">
            <img 
              src={session.lawyerAvatar} 
              className="w-10 h-10 rounded-xl border border-slate-100 object-cover" 
              alt="Lawyer" 
            />
            <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-slate-900">{session.lawyerName}</h2>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{session.specialty}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center px-3 py-1 bg-red-50 text-red-600 rounded-lg">
            <span className="text-[8px] font-black uppercase">الوقت المتبقي</span>
            <span className="text-xs font-black font-mono leading-none">{formatTime(timeLeft)}</span>
          </div>
          <button className="p-2 text-slate-400 hover:text-slate-600 transition">
            <MoreVertical size={20} />
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden relative">
        {view === 'video' ? (
          <div className="flex-1 bg-slate-900 relative">
            {/* Lawyer Video View */}
            <div className="absolute inset-0 flex items-center justify-center">
              <img src={session.lawyerAvatar} className="w-full h-full object-cover opacity-50 blur-lg scale-110" alt="BG" />
              <div className="z-10 text-center space-y-4">
                <img src={session.lawyerAvatar} className="w-32 h-32 rounded-3xl border-4 border-white/20 shadow-2xl mx-auto" alt="Avatar" />
                <div className="space-y-1">
                  <h3 className="text-xl font-bold">{session.lawyerName}</h3>
                  <div className="flex items-center justify-center gap-2 text-green-400 text-xs font-bold">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" /> متصل بجودة عالية
                  </div>
                </div>
              </div>
            </div>
            
            {/* User PIP View */}
            <div className="absolute top-4 left-4 w-28 h-40 bg-slate-800 rounded-2xl border-2 border-white/20 shadow-2xl overflow-hidden">
               <div className="w-full h-full flex items-center justify-center bg-slate-700">
                  {videoOn ? <User size={40} className="text-slate-500" /> : <VideoOff size={32} className="text-slate-600" />}
               </div>
               <div className="absolute bottom-2 right-2 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[8px] font-bold">أنت</div>
            </div>

            {/* Video Controls Overlay */}
            <div className="absolute bottom-8 left-0 right-0 flex items-center justify-center gap-4 z-20">
              <button onClick={() => setAudioOn(!audioOn)} className={`w-14 h-14 rounded-full flex items-center justify-center transition ${audioOn ? 'bg-white/10 text-white backdrop-blur-md' : 'bg-red-500 text-white shadow-lg'}`}>
                {audioOn ? <Mic size={24} /> : <MicOff size={24} />}
              </button>
              <button onClick={onEnd} className="w-16 h-16 bg-red-600 text-white rounded-full flex items-center justify-center shadow-2xl shadow-red-500/20 transition active:scale-90">
                <PhoneOff size={32} />
              </button>
              <button onClick={() => setVideoOn(!videoOn)} className={`w-14 h-14 rounded-full flex items-center justify-center transition ${videoOn ? 'bg-white/10 text-white backdrop-blur-md' : 'bg-red-500 text-white shadow-lg'}`}>
                {videoOn ? <Video size={24} /> : <VideoOff size={24} />}
              </button>
              <button onClick={() => setView('chat')} className="w-14 h-14 bg-white/10 text-white backdrop-blur-md rounded-full flex items-center justify-center">
                <MessageSquare size={24} />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col">
            {/* Chat Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4">
              <div className="flex justify-center my-4">
                <div className="px-4 py-1.5 bg-slate-200/50 backdrop-blur rounded-full text-[10px] font-bold text-slate-500 flex items-center gap-2">
                   <ShieldCheck size={12} /> محادثة مشفرة ومنتهية الأطراف
                </div>
              </div>
              
              {messages.map((msg) => (
                <div 
                  key={msg.id}
                  className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-in slide-in-from-bottom-2 duration-300`}
                >
                  <div className={`flex gap-3 max-w-[80%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className="w-8 h-8 rounded-lg shrink-0 overflow-hidden shadow-sm">
                      <img src={msg.role === 'user' ? 'https://api.dicebear.com/7.x/avataaars/svg?seed=User1' : session.lawyerAvatar} alt="Role" />
                    </div>
                    <div className="space-y-1">
                      <div className={`p-4 rounded-2xl text-sm leading-relaxed ${
                        msg.role === 'user' 
                        ? 'bg-blue-600 text-white rounded-tr-none shadow-md' 
                        : 'bg-white text-slate-800 rounded-tl-none border border-slate-100 shadow-sm'
                      }`}>
                        {msg.content}
                      </div>
                      <p className={`text-[9px] text-slate-400 px-1 font-medium ${msg.role === 'user' ? 'text-left' : 'text-right'}`}>
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Chat Input */}
            <div className="p-4 bg-white border-t space-y-4">
              {session.type === 'video' && (
                <button onClick={() => setView('video')} className="w-full py-2 bg-blue-50 text-blue-600 rounded-xl text-xs font-bold flex items-center justify-center gap-2 active:scale-95 transition">
                   <Video size={16} /> العودة لمكالمة الفيديو
                </button>
              )}
              <div className="flex items-end gap-2 bg-slate-50 border border-slate-200 rounded-2xl p-2 focus-within:border-blue-500 transition-all">
                <button className="p-2 text-slate-400 hover:text-blue-600 transition">
                  <Paperclip size={20} />
                </button>
                <textarea
                  rows={1}
                  value={inputValue}
                  onChange={e => setInputValue(e.target.value)}
                  placeholder="اكتب رسالتك للمحامي..."
                  className="flex-1 bg-transparent border-none py-2 px-2 text-sm outline-none resize-none max-h-32"
                />
                <button 
                  onClick={handleSend}
                  disabled={!inputValue.trim()}
                  className="p-3 bg-blue-600 text-white rounded-xl shadow-lg shadow-blue-100 disabled:opacity-50 transition"
                >
                  <Send size={20} />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Floating Action Button for Emergency Close (Hidden in Video View) */}
      {view === 'chat' && (
        <button 
          onClick={onEnd}
          className="fixed bottom-28 left-6 w-14 h-14 bg-red-600 text-white rounded-2xl shadow-xl shadow-red-200 flex items-center justify-center hover:bg-red-700 transition active:scale-90 z-30"
        >
          <PhoneOff size={24} />
        </button>
      )}
    </div>
  );
};

export default LiveConsultationRoom;
