
import React, { useEffect, useState } from 'react';
import { Clock, ShieldCheck, X, AlertCircle } from 'lucide-react';
import { ConsultationSession } from '../types';

interface WaitingRoomProps {
  session: ConsultationSession;
  onMatched: (lawyer: { name: string; avatar: string }) => void;
  onCancel: () => void;
}

const WaitingRoom: React.FC<WaitingRoomProps> = ({ session, onMatched, onCancel }) => {
  const [dots, setDots] = useState('');
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    const dotInterval = setInterval(() => {
      setDots(prev => (prev.length >= 3 ? '' : prev + '.'));
    }, 500);

    const timeInterval = setInterval(() => {
      setSeconds(s => s + 1);
    }, 1000);

    // Simulate match after 5 seconds
    const matchTimeout = setTimeout(() => {
      onMatched({
        name: 'د. خالد العمري',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Lawyer1'
      });
    }, 5000);

    return () => {
      clearInterval(dotInterval);
      clearInterval(timeInterval);
      clearTimeout(matchTimeout);
    };
  }, []);

  return (
    <div className="flex-1 flex flex-col bg-slate-900 text-white items-center justify-center p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute -top-20 -right-20 w-80 h-80 bg-blue-600 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-indigo-600 rounded-full blur-3xl" />
      </div>

      <button 
        onClick={onCancel}
        className="absolute top-6 right-6 p-2 bg-white/10 rounded-full hover:bg-white/20 transition"
      >
        <X size={20} />
      </button>

      <div className="flex-1 flex flex-col items-center justify-center space-y-12 z-10">
        {/* Animated Loader */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-blue-600/20 border-t-blue-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Clock size={40} className="text-blue-400 animate-pulse" />
          </div>
        </div>

        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black">جاري البحث عن محامٍ{dots}</h2>
          <p className="text-slate-400 text-sm max-w-[280px] leading-relaxed mx-auto">
            نقوم حالياً بإرسال طلبك لنخبة من المحامين المتخصصين في <span className="text-blue-400 font-bold">{session.specialty}</span>
          </p>
        </div>

        <div className="w-full bg-white/5 border border-white/10 rounded-3xl p-6 space-y-4 backdrop-blur-md">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center text-blue-400">
              <ShieldCheck size={24} />
            </div>
            <div>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">طلب آمن وموثق</p>
              <p className="text-sm font-bold">جميع المحامين لدينا معتمدون</p>
            </div>
          </div>
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase">
            <span>الوقت المنقضي: {Math.floor(seconds / 60)}:{(seconds % 60).toString().padStart(2, '0')}</span>
            <span>الموقع: الرياض، المملكة العربية السعودية</span>
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center gap-2 text-amber-400 bg-amber-400/10 px-4 py-2 rounded-full border border-amber-400/20 animate-pulse">
        <AlertCircle size={14} />
        <span className="text-[10px] font-bold">يرجى عدم إغلاق هذه الصفحة لضمان بقائك في الطابور</span>
      </div>
    </div>
  );
};

export default WaitingRoom;
