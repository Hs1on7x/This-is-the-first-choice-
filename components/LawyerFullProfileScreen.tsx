
import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, Star, ShieldCheck, MapPin, Clock, Briefcase, 
  TrendingUp, Sparkles, User, CheckCircle2, Info, ArrowUpRight, 
  X, Mail, Globe, Award, BookOpen, ChevronLeft, Download, 
  MessageSquare, Gavel, Calendar, DollarSign, Wallet, ShieldAlert,
  Target, Zap, Bot, Share2, Printer, Filter,
  Check, Video, FileText, RefreshCw, Send, Paperclip
} from 'lucide-react';
import { ScreenType } from '../types';

interface LawyerFullProfileScreenProps {
  lawyer: any;
  isPaid?: boolean;
  onBack: () => void;
  onNavigate?: (screen: ScreenType, data?: any) => void;
  onConfirmSelection: (lawyer: any) => void;
}

const LawyerFullProfileScreen: React.FC<LawyerFullProfileScreenProps> = ({ lawyer, isPaid, onBack, onNavigate, onConfirmSelection }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  const [isBooking, setIsBooking] = useState(false);

  // Safe access to lawyer data to prevent 'split' errors
  const lawyerName = lawyer?.name || 'المحامي';
  const firstName = useMemo(() => lawyerName.split(' ')[0] || 'المحامي', [lawyerName]);
  
  const tabs = [
    { id: 'overview', label: 'نظرة عامة' },
    { id: 'stats', label: 'القضايا والإحصائيات' },
    { id: 'reviews', label: 'التقييمات' },
    { id: 'ai_analysis', label: 'التحليل الذكي' },
    { id: 'prices', label: 'الأسعار' },
    { id: 'booking', label: 'التواصل' }
  ];

  if (!lawyer) return (
    <div className="flex-1 flex flex-col items-center justify-center bg-white p-10 space-y-4">
      <RefreshCw className="animate-spin text-blue-600" size={32} />
      <p className="font-bold text-slate-400">جاري تحميل ملف المحامي...</p>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-500 overflow-y-auto pb-32">
      {/* 1. Header Section */}
      <div className="bg-slate-900 pt-16 pb-12 px-6 text-center relative overflow-hidden rounded-b-[4rem] shadow-2xl">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <Globe size={400} className="absolute -bottom-20 -right-20 rotate-12 text-white" />
         </div>
         <button onClick={onBack} className="absolute top-6 right-6 p-2 bg-white/10 rounded-xl text-white hover:bg-white/20 transition">
            <ArrowRight size={24} />
         </button>
         
         <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="relative">
               <img src={lawyer.avatar} className="w-28 h-28 rounded-[2.5rem] border-4 border-white/20 shadow-2xl bg-white object-cover" alt={lawyerName} />
               <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-slate-900 flex items-center justify-center text-white shadow-xl">
                  <CheckCircle2 size={20} />
               </div>
            </div>
            <div className="space-y-1">
               <h2 className="text-2xl font-black text-white tracking-tight">{lawyerName}</h2>
               <div className="flex items-center justify-center gap-1.5 text-amber-400">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-black text-white">4.9/5</span>
                  <span className="text-[10px] text-slate-400 font-bold ml-1">(156 تقييم)</span>
               </div>
               <p className="text-[11px] font-black text-blue-400 uppercase tracking-[0.1em] mt-1">{lawyer.title || 'محامي ومستشار قانوني معتمد'}</p>
               <p className="text-[9px] text-slate-500 font-bold uppercase tracking-widest">رخصة المزاولة: {lawyer.license || '#12345'} • عضو الهيئة السعودية للمحامين</p>
            </div>
            <div className="flex gap-2">
               <span className="px-4 py-1.5 bg-blue-600/20 rounded-full text-[9px] font-black text-blue-400 border border-blue-500/20 backdrop-blur-md">✓ موثق</span>
               <span className="px-4 py-1.5 bg-amber-600/20 rounded-full text-[9px] font-black text-amber-400 border border-amber-500/20 backdrop-blur-md">🏆 محامي متميز</span>
               <span className="px-4 py-1.5 bg-emerald-600/20 rounded-full text-[9px] font-black text-emerald-400 border border-emerald-500/20 backdrop-blur-md">🟢 متاح الآن</span>
            </div>
         </div>
      </div>

      {/* 2. Sticky Tab Bar */}
      <div className="sticky top-0 z-40 bg-white border-b flex overflow-x-auto no-scrollbar shadow-sm">
         {tabs.map(t => (
           <button
             key={t.id}
             onClick={() => setActiveTab(t.id)}
             className={`px-6 py-4 text-[10px] font-black uppercase tracking-widest whitespace-nowrap transition-all border-b-4 ${
               activeTab === t.id ? 'border-blue-600 text-blue-600' : 'border-transparent text-slate-400'
             }`}
           >
              {t.label}
           </button>
         ))}
      </div>

      <div className="p-6 space-y-8">
         
         {/* TAB 1: OVERVIEW */}
         {activeTab === 'overview' && (
           <div className="space-y-8 animate-in fade-in">
              <section className="space-y-4">
                 <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2"><FileText size={16} className="text-blue-600" /> نبذة مختصرة</h3>
                 <p className="text-sm text-slate-600 leading-[2.2] font-medium text-justify">
                    "محامٍ ومستشار قانوني متخصص في قانون العمل والنزاعات التجارية مع أكثر من ١٢ سنة خبرة في المحاكم والتحكيم. حاصل على ماجستير في القانون التجاري من جامعة الملك سعود."
                 </p>
              </section>
              
              <section className="space-y-4">
                 <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2"><Target size={16} className="text-indigo-600" /> التخصصات الرئيسية</h3>
                 <div className="grid grid-cols-2 gap-4">
                    {[
                      { label: 'قانون العمل', val: 90, cases: 187, success: 94 },
                      { label: 'نزاعات تجارية', val: 60, cases: 47, success: 89 },
                      { label: 'العقود', val: 70, cases: 89, success: 95 },
                      { label: 'التحكيم', val: 50, cases: 23, success: 85 }
                    ].map((item, i) => (
                      <div key={i} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                         <h4 className="text-[10px] font-black text-slate-800 uppercase">{item.label}</h4>
                         <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600" style={{ width: `${item.val}%` }} />
                         </div>
                         <div className="flex justify-between items-center text-[8px] font-black text-slate-400">
                            <span>{item.cases} قضية</span>
                            <span className="text-emerald-600">نجاح: {item.success}%</span>
                         </div>
                      </div>
                    ))}
                 </div>
              </section>

              <section className="space-y-4">
                 <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2"><Award size={16} className="text-amber-500" /> المؤهلات والعضويات</h3>
                 <div className="bg-white p-6 rounded-[2.2rem] border border-slate-100 shadow-sm space-y-4">
                    <ul className="space-y-3">
                       <li className="text-xs font-bold text-slate-700 flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" /> ماجستير القانون التجاري - جامعة الملك سعود (2015)</li>
                       <li className="text-xs font-bold text-slate-700 flex gap-3"><div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" /> بكالوريوس القانون - جامعة الإمام (2010)</li>
                    </ul>
                    <div className="pt-4 border-t flex flex-wrap gap-2">
                       {['الهيئة السعودية للمحامين', 'غرفة الرياض التجارية'].map(m => (
                         <span key={m} className="px-3 py-1 bg-slate-50 rounded-lg text-[9px] font-black text-slate-400">{m}</span>
                       ))}
                    </div>
                 </div>
              </section>
           </div>
         )}

         {/* TAB 2: STATS */}
         {activeTab === 'stats' && (
           <div className="space-y-8 animate-in fade-in">
              <section className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-xl flex items-center justify-between overflow-hidden relative">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/20 rounded-full -mr-16 -mt-16 blur-2xl" />
                 <div className="space-y-1 relative z-10">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">إجمالي القضايا المكتملة</p>
                    <h4 className="text-5xl font-black">234</h4>
                 </div>
                 <div className="relative flex items-center justify-center">
                    <svg className="w-24 h-24 transform -rotate-90">
                       <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                       <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={251} strokeDashoffset={251 * (1 - 92 / 100)} className="text-blue-500" />
                    </svg>
                    <div className="absolute flex flex-col items-center">
                       <span className="text-lg font-black leading-none">92%</span>
                       <span className="text-[7px] font-black uppercase">نجاح</span>
                    </div>
                 </div>
              </section>

              <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                 <h3 className="font-black text-slate-900 text-sm">الأداء عبر الزمن (معدل النجاح السنوي)</h3>
                 <div className="h-48 flex items-end justify-between gap-4 px-2">
                    {[
                      { y: '2020', p: 88 }, { y: '2021', p: 90 }, { y: '2022', p: 93 }, { y: '2023', p: 94 }, { y: '2024', p: 92 }
                    ].map((d, i) => (
                      <div key={i} className="flex-1 flex flex-col items-center gap-2 group h-full justify-end">
                         <div className="w-full bg-blue-100 group-hover:bg-blue-600 rounded-t-lg transition-all duration-700 ease-out" style={{ height: `${d.p}%` }} />
                         <span className="text-[8px] font-black text-slate-400 mt-1">{d.y}</span>
                      </div>
                    ))}
                 </div>
                 <p className="text-center text-[10px] font-black text-emerald-600 flex items-center justify-center gap-1"><TrendingUp size={14} /> تحسن مستمر بنسبة +٦٪ سنوياً</p>
              </section>

              <section className="space-y-4">
                 <h3 className="font-black text-slate-900 text-sm px-2">توزيع النتائج القضائية</h3>
                 <div className="space-y-4">
                    {[
                      { label: 'لصالح العميل كاملاً', count: 156, p: 67, color: 'bg-emerald-500' },
                      { label: 'لصالح العميل جزئياً', count: 58, p: 25, color: 'bg-blue-500' },
                      { label: 'تسوية ودية', count: 15, p: 6, color: 'bg-amber-500' }
                    ].map((row, i) => (
                      <div key={i} className="space-y-2">
                         <div className="flex justify-between items-center text-[10px] font-black">
                            <span className="text-slate-600">{row.label}</span>
                            <span className="text-slate-900">{row.count} قضية</span>
                         </div>
                         <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                            <div className={`h-full ${row.color}`} style={{ width: `${row.p}%` }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </section>
           </div>
         )}

         {/* TAB 4: AI ANALYSIS */}
         {activeTab === 'ai_analysis' && (
           <div className="space-y-8 animate-in fade-in">
              <section className="bg-gradient-to-br from-indigo-600 to-blue-700 p-10 rounded-[3.5rem] text-white text-center space-y-6 shadow-2xl relative overflow-hidden">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse" />
                 <Bot size={48} className="mx-auto text-blue-200 animate-pulse" />
                 <div className="space-y-2">
                    <h3 className="text-xl font-black">تقييم AI الشامل</h3>
                    <div className="relative inline-flex items-center justify-center">
                       <svg className="w-32 h-32 transform -rotate-90">
                          <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                          <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={351.8} strokeDashoffset={351.8 * (1 - 96 / 100)} className="text-white" />
                       </svg>
                       <div className="absolute flex flex-col items-center">
                          <span className="text-4xl font-black leading-none">96</span>
                          <span className="text-[8px] font-black uppercase tracking-widest text-blue-200">ممتاز</span>
                       </div>
                    </div>
                 </div>
                 <p className="text-[10px] text-blue-100 font-bold uppercase tracking-widest bg-white/10 py-2 rounded-full border border-white/10">✨ تم التحليل بواسطة AI المتقدم • منذ ساعة</p>
              </section>

              <section className="bg-white p-7 rounded-[2.5rem] border border-blue-100 shadow-xl space-y-6">
                 <div className="flex items-center gap-3">
                    <Target size={24} className="text-blue-600" />
                    <h4 className="font-black text-sm uppercase">مطابقة حالتك</h4>
                 </div>
                 <div className="space-y-4">
                    <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100">
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-1">حالتك الحالية</p>
                       <p className="text-xs font-bold text-blue-900">"نزاع حول مستحقات عمل وفصل تعسفي"</p>
                    </div>
                    <div className="flex justify-between items-center px-1">
                       <span className="text-xs font-bold text-slate-600">مستوى المطابقة</span>
                       <span className="text-xl font-black text-blue-600">95%</span>
                    </div>
                    <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100 shadow-inner">
                       <div className="h-full bg-blue-600 shadow-[0_0_12px_rgba(37,99,235,0.4)]" style={{ width: '95%' }} />
                    </div>
                    <p className="text-xs text-slate-600 leading-[1.8] font-medium text-justify italic">
                       "بناءً على تحليل ٢٣٤ قضية سابقة للمحامي {firstName}، لديه خبرة استثنائية في قضايا مشابهة تماماً لحالتك."
                    </p>
                 </div>
              </section>

              <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                 <h4 className="font-black text-sm uppercase flex items-center gap-2"><Sparkles size={18} className="text-amber-500" /> توقعات الأداء</h4>
                 <div className="space-y-6">
                    {[
                      { label: 'احتمال النجاح الكامل', p: 87, sub: '🏆 أعلى من ٨٩٪ من المحامين' },
                      { label: 'المدة المتوقعة (الأرجح)', p: 45, sub: '⚡ أسرع بـ ٢٥٪ من المتوسط العام', isDays: true },
                      { label: 'نسبة استرداد القيمة', p: 92, sub: '💰 متوسط الاسترداد في قضاياك' }
                    ].map(m => (
                      <div key={m.label} className="space-y-2">
                         <div className="flex justify-between items-center text-[10px] font-black uppercase">
                            <span className="text-slate-600">{m.label}</span>
                            <span className="text-blue-600">{m.p}{m.isDays ? ' يوم' : '%'}</span>
                         </div>
                         <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                            <div className={`h-full bg-blue-600`} style={{ width: `${m.isDays ? 100 - (m.p / 1.2) : m.p}%` }} />
                         </div>
                         <p className="text-[9px] font-bold text-slate-400">{m.sub}</p>
                      </div>
                    ))}
                 </div>
              </section>
           </div>
         )}

         {/* TAB 5: PRICES */}
         {activeTab === 'prices' && (
           <div className="space-y-8 animate-in fade-in">
              <section className="space-y-4">
                 <h3 className="font-black text-slate-900 text-sm px-2 uppercase tracking-widest">أنواع الخدمات</h3>
                 <div className="grid grid-cols-1 gap-4">
                    {[
                      { id: 'text', label: 'استشارة نصية', price: 300, icon: <MessageSquare size={24} />, dur: '٣٠-٦٠ دقيقة', list: ['استشارة مفصلة', 'رأي قانوني مكتوب'] },
                      { id: 'video', label: 'استشارة مرئية', price: 400, icon: <Video size={24} />, dur: '٣٠-٦٠ دقيقة', list: ['مكالمة فيديو مباشرة', 'مراجعة مستندات'] },
                      { id: 'review', label: 'مراجعة عقد/مستند', price: 500, icon: <FileText size={24} />, dur: '٢٤-٤٨ ساعة', list: ['كشف مخاطر', 'تقرير مفصل'] }
                    ].map(serv => (
                      <div key={serv.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-5 group hover:border-blue-300 transition-all">
                         <div className="flex justify-between items-center">
                            <div className="flex items-center gap-4">
                               <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-inner group-hover:bg-blue-600 group-hover:text-white transition-all">{serv.icon}</div>
                               <div>
                                  <h4 className="font-black text-sm text-slate-900">{serv.label}</h4>
                                  <p className="text-[10px] text-slate-400 font-bold uppercase">{serv.dur}</p>
                               </div>
                            </div>
                            <div className="text-left">
                               <p className="text-xl font-black text-blue-600">{serv.price}</p>
                               <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">ريال/ساعة</p>
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-2">
                            {serv.list.map(l => (
                              <div key={l} className="flex items-center gap-2 text-[9px] font-black text-slate-500"><Check size={10} className="text-emerald-500" /> {l}</div>
                            ))}
                         </div>
                      </div>
                    ))}
                 </div>
              </section>

              <section className="space-y-4">
                 <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest px-2">📦 الباقات المميزة</h3>
                 <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
                    {[
                      { title: '🥉 الباقة الأساسية', price: 800, old: 900, save: 100, list: '3 استشارات نصية' },
                      { title: '🥈 الباقة المتقدمة', price: 1800, old: 2200, save: 400, list: '5 استشارات + مراجعة عقد' },
                    ].map((pkg, i) => (
                      <div key={i} className="min-w-[280px] bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                         <h4 className="font-black text-sm text-slate-900">{pkg.title}</h4>
                         <div className="space-y-1">
                            <div className="flex items-baseline gap-2">
                               <span className="text-2xl font-black text-blue-600">{pkg.price} ريال</span>
                               <span className="text-xs text-slate-300 font-bold line-through">{pkg.old}</span>
                            </div>
                            <p className="text-[9px] font-black text-emerald-600 uppercase">توفير {pkg.save} ريال</p>
                         </div>
                         <p className="text-[10px] text-slate-500 font-bold leading-relaxed">{pkg.list}</p>
                      </div>
                    ))}
                 </div>
              </section>
           </div>
         )}

         {/* TAB 6: CONTACT */}
         {activeTab === 'booking' && (
           <div className="space-y-8 animate-in fade-in">
              <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                 <div className="flex items-center justify-between">
                    <h3 className="font-black text-slate-900 text-sm flex items-center gap-2"><Calendar size={18} className="text-blue-600" /> الجدول الزمني</h3>
                    <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">عرض الأسبوع القادم</button>
                 </div>
                 
                 <div className="grid grid-cols-4 gap-2">
                    {[
                      { d: 'الأحد', h: '١٠:٠٠ ص', v: true }, { d: 'الأحد', h: '٠٢:٠٠ م', v: true },
                      { d: 'الأحد', h: '٠٤:٠٠ م', v: false }, { d: 'الاثنين', h: '٠٩:٠٠ ص', v: true }
                    ].map((slot, i) => (
                      <button 
                        key={i} 
                        disabled={!slot.v}
                        onClick={() => setSelectedSlot(`${slot.d}-${slot.h}`)}
                        className={`p-3 rounded-2xl flex flex-col items-center gap-1 border-2 transition-all ${
                          !slot.v ? 'bg-slate-50 border-slate-50 opacity-30' :
                          selectedSlot === `${slot.d}-${slot.h}` ? 'border-blue-600 bg-blue-600 text-white shadow-lg' : 'bg-slate-50 border-slate-50 hover:border-blue-600'
                        }`}
                      >
                         <span className="text-[8px] font-black uppercase">{slot.d}</span>
                         <span className="text-[9px] font-black">{slot.h}</span>
                      </button>
                    ))}
                 </div>
              </section>

              <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                 <h3 className="font-black text-slate-900 text-sm flex items-center gap-2 px-1">
                    <MessageSquare size={18} className="text-blue-600" /> إرسال رسالة مباشرة
                 </h3>
                 <div className="space-y-4">
                    <textarea 
                       placeholder="اكتب رسالتك للمحامي هنا..."
                       className="w-full h-32 bg-slate-50 border border-slate-100 rounded-[2rem] p-6 text-xs font-medium focus:bg-white focus:ring-4 focus:ring-blue-100 outline-none transition shadow-inner resize-none"
                    />
                    <div className="flex gap-2">
                       <button className="flex-1 py-4 bg-slate-900 text-white rounded-2xl font-black text-sm flex items-center justify-center gap-2 active:scale-95 transition shadow-xl"><Send size={18} /> إرسال الرسالة</button>
                       <button className="p-4 bg-slate-100 text-slate-400 rounded-2xl active:scale-95 transition"><Paperclip size={20} /></button>
                    </div>
                 </div>
              </section>
           </div>
         )}
      </div>

      {/* Floating Final Action Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/90 backdrop-blur-md border-t z-50 shadow-2xl flex gap-3">
         <button 
           onClick={() => { setIsBooking(true); setTimeout(() => { setIsBooking(false); onConfirmSelection(lawyer); }, 1500); }}
           disabled={isBooking}
           className="flex-[3] py-5 bg-blue-600 text-white rounded-[1.8rem] font-black text-lg shadow-xl shadow-blue-200 active:scale-95 transition flex items-center justify-center gap-3 relative overflow-hidden group"
         >
            {isBooking ? <RefreshCw size={24} className="animate-spin" /> : <>تأكيد الاختيار وحجز الجلسة <ChevronLeft size={24} /></>}
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
         </button>
         <button className="flex-1 py-5 bg-slate-50 text-slate-400 rounded-[1.8rem] font-black text-sm hover:bg-slate-200 transition flex items-center justify-center active:scale-95">
            <Download size={24} />
         </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default LawyerFullProfileScreen;
