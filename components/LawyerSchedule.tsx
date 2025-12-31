
import React, { useState } from 'react';
import { 
  ArrowRight, Calendar as CalendarIcon, Clock, 
  Plus, ChevronRight, ChevronLeft, Save, 
  CheckCircle2, AlertTriangle, Coffee, Info, X,
  // Added missing CreditCard import
  CreditCard
} from 'lucide-react';

interface LawyerScheduleProps {
  onBack: () => void;
}

const LawyerSchedule: React.FC<LawyerScheduleProps> = ({ onBack }) => {
  const [selectedDay, setSelectedDay] = useState(2); // Tuesday
  const days = ['أحد', 'اثنين', 'ثلاثاء', 'أربعاء', 'خميس', 'جمعة', 'سبت'];
  
  const [prices, setPrices] = useState({
    text: 150,
    audio: 200,
    video: 250,
    review: 400
  });

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-500 overflow-y-auto pb-24">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-30 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowRight size={20} /></button>
          <h1 className="text-lg font-black text-slate-900">إدارة الجدول والأسعار</h1>
        </div>
        <button className="p-3 bg-indigo-600 text-white rounded-xl shadow-lg shadow-indigo-100 active:scale-95 transition"><Save size={18} /></button>
      </div>

      <div className="p-6 space-y-8">
        {/* Availability Calendar Header */}
        <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
           <div className="flex items-center justify-between px-2">
              <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
                 <CalendarIcon size={16} className="text-indigo-600" /> ساعات العمل الأسبوعية
              </h3>
              <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full uppercase">نشط</span>
           </div>

           <div className="flex justify-between gap-1">
              {days.map((d, i) => (
                <button 
                  key={i} 
                  onClick={() => setSelectedDay(i)}
                  className={`flex-1 flex flex-col items-center gap-2 py-4 rounded-2xl transition-all ${selectedDay === i ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100 scale-105' : 'bg-slate-50 text-slate-400 hover:bg-slate-100'}`}
                >
                   <span className="text-[8px] font-black uppercase tracking-tighter">{d}</span>
                   <div className={`w-1.5 h-1.5 rounded-full ${selectedDay === i ? 'bg-white' : 'bg-slate-200'}`} />
                </button>
              ))}
           </div>

           <div className="space-y-4 pt-4 border-t border-slate-50 animate-in slide-in-from-right">
              <div className="flex items-center justify-between px-2">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">فترات التوفر ليوم الـ {days[selectedDay]}</p>
                 <button className="p-1.5 text-indigo-600 hover:bg-indigo-50 rounded-lg transition"><Plus size={16} /></button>
              </div>
              <div className="grid grid-cols-1 gap-3">
                 {[
                   { from: '09:00 ص', to: '12:00 م', status: 'available' },
                   { from: '04:00 م', to: '08:00 م', status: 'available' }
                 ].map((slot, i) => (
                   <div key={i} className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-transparent hover:border-indigo-100 transition group">
                      <div className="flex items-center gap-5">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-indigo-600 shadow-sm"><Clock size={20} /></div>
                         <div className="flex items-center gap-3">
                            <span className="text-xs font-black text-slate-800">{slot.from}</span>
                            <ChevronLeft size={14} className="text-slate-300" />
                            <span className="text-xs font-black text-slate-800">{slot.to}</span>
                         </div>
                      </div>
                      <button className="p-2 text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition"><X size={16} /></button>
                   </div>
                 ))}
              </div>
           </div>
        </section>

        {/* Pricing Management */}
        <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
           <h3 className="font-black text-slate-900 text-sm px-2 flex items-center gap-2">
              <CreditCard size={18} className="text-indigo-600" /> تسعير الاستشارات (ريال)
           </h3>
           <div className="grid grid-cols-2 gap-4">
              {[
                { id: 'text', label: 'استشارة نصية', icon: '💬' },
                { id: 'audio', label: 'مكالمة صوتية', icon: '📞' },
                { id: 'video', label: 'مكالمة فيديو', icon: '📹' },
                { id: 'review', label: 'مراجعة مستند', icon: '📄' }
              ].map(type => (
                <div key={type.id} className="space-y-1.5">
                   <label className="text-[9px] font-black text-slate-400 uppercase tracking-widest pr-2">{type.icon} {type.label}</label>
                   <div className="relative">
                      <input 
                        type="number" 
                        value={prices[type.id as keyof typeof prices]} 
                        onChange={e => setPrices({...prices, [type.id]: parseInt(e.target.value) || 0})}
                        className="w-full bg-slate-50 border-2 border-transparent rounded-[1.2rem] p-4 pr-10 text-sm font-black text-indigo-600 focus:bg-white focus:border-indigo-600 outline-none transition"
                      />
                   </div>
                </div>
              ))}
           </div>
           <div className="p-4 bg-indigo-50 rounded-2xl border border-indigo-100 flex gap-3">
              <Info size={18} className="text-indigo-600 shrink-0" />
              <p className="text-[10px] text-indigo-800 font-bold leading-relaxed">يتم خصم ١٠٪ كرسوم تشغيل للمنصة من القيمة الإجمالية لكل استشارة.</p>
           </div>
        </section>

        {/* Vacation Mode */}
        <section className="bg-slate-900 p-8 rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl" />
           <div className="flex items-center justify-between relative z-10">
              <div className="flex items-center gap-4">
                 <div className="w-14 h-14 bg-white/10 rounded-[1.2rem] flex items-center justify-center backdrop-blur-md shadow-2xl border border-white/5"><Coffee size={28} className="text-amber-400" /></div>
                 <div>
                    <h3 className="font-black text-sm uppercase tracking-widest">وضعية الإجازة</h3>
                    <p className="text-[10px] text-slate-400 font-medium">إخفاء ملفك مؤقتاً من نتائج البحث</p>
                 </div>
              </div>
              <button className="w-14 h-7 bg-slate-700 rounded-full relative p-1 transition-all">
                 <div className="w-5 h-5 bg-slate-500 rounded-full" />
              </button>
           </div>
        </section>
      </div>
    </div>
  );
};

export default LawyerSchedule;
