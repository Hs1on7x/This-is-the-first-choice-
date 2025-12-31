
import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, ShieldCheck, User, MessageSquare, Share2, 
  CheckCircle2, Star, Clock, FileText, History, 
  TrendingUp, AlertTriangle, ChevronLeft, MapPin, 
  Mail, Phone, Building2, Gavel, Sparkles, Bot, 
  Award, Target, Search, Filter, Calendar, BarChart3
} from 'lucide-react';
import { ContractParty, ScreenType } from '../types';

interface PartyLegalProfileScreenProps {
  party: ContractParty;
  onBack: () => void;
  onAddAsParty: (party: ContractParty) => void;
  onNavigate: (screen: ScreenType, data?: any) => void;
}

const PartyLegalProfileScreen: React.FC<PartyLegalProfileScreenProps> = ({ party, onBack, onAddAsParty, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'legal' | 'contracts' | 'ai' | 'reviews'>('overview');

  const tabs = [
    { id: 'overview', label: 'نظرة عامة' },
    { id: 'legal', label: 'السجل القانوني' },
    { id: 'contracts', label: 'العقود السابقة' },
    { id: 'ai', label: 'التحليل الذكي' },
    { id: 'reviews', label: 'التقييمات' },
  ];

  const stats = {
    total: 23,
    completed: 18,
    active: 4,
    disputed: 1,
    completionRate: 87,
    lastActive: 'منذ ١٥ يوم'
  };

  const aiScore = 87;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-500 overflow-y-auto pb-32">
      {/* 1. Header Section */}
      <div className="bg-slate-900 pt-16 pb-12 px-6 text-center relative overflow-hidden rounded-b-[4rem] shadow-2xl">
         <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <GlobeBackground />
         </div>
         <button onClick={onBack} className="absolute top-6 right-6 p-2 bg-white/10 rounded-xl text-white hover:bg-white/20 transition">
            <ArrowRight size={24} />
         </button>
         
         <div className="relative z-10 flex flex-col items-center gap-4">
            <div className="relative">
               <div className="w-28 h-28 rounded-[2.5rem] border-4 border-white/20 shadow-2xl bg-white overflow-hidden">
                  <img src={party.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${party.name}`} className="w-full h-full object-cover" alt={party.name} />
               </div>
               <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-emerald-500 rounded-2xl border-4 border-slate-900 flex items-center justify-center text-white shadow-xl">
                  <CheckCircle2 size={20} />
               </div>
            </div>
            <div className="space-y-1">
               <h2 className="text-2xl font-black text-white tracking-tight">{party.name}</h2>
               <div className="flex items-center justify-center gap-2">
                  <span className="px-3 py-0.5 bg-blue-600/20 text-blue-400 rounded-full text-[9px] font-black uppercase border border-blue-500/20">✓ موثق</span>
                  <span className="px-3 py-0.5 bg-slate-700/50 text-slate-300 rounded-full text-[9px] font-black uppercase border border-white/5">فرد</span>
               </div>
               <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">الدور: {party.role || 'مستأجر'}</p>
            </div>
            
            <div className="flex gap-3 mt-2">
               <button 
                 onClick={() => onAddAsParty(party)}
                 className="px-6 py-3 bg-blue-600 text-white rounded-2xl font-black text-xs shadow-xl active:scale-95 transition"
               >
                 إضافة كطرف في العقد
               </button>
               <button className="p-3 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition"><MessageSquare size={18} /></button>
               <button className="p-3 bg-white/10 text-white rounded-2xl hover:bg-white/20 transition"><Share2 size={18} /></button>
            </div>
         </div>
      </div>

      {/* 2. Sticky Tab Bar */}
      <div className="sticky top-0 z-40 bg-white border-b flex overflow-x-auto no-scrollbar shadow-sm">
         {tabs.map(t => (
           <button
             key={t.id}
             onClick={() => setActiveTab(t.id as any)}
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
           <div className="space-y-6 animate-in slide-in-from-bottom">
              {/* Quick Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                 <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                       <BarChart3 className="text-blue-600" size={20} />
                       <span className="text-xl font-black text-slate-900">{stats.total}</span>
                    </div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">إجمالي العقود</p>
                 </div>
                 <div className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-3">
                    <div className="flex items-center justify-between">
                       <TrendingUp className="text-emerald-600" size={20} />
                       <span className="text-xl font-black text-slate-900">{stats.completionRate}%</span>
                    </div>
                    <p className="text-[9px] font-black text-slate-400 uppercase tracking-widest">معدل الإتمام</p>
                 </div>
              </div>

              {/* Verification Info */}
              <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                 <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                    <ShieldCheck size={16} className="text-blue-600" /> معلومات التحقق
                 </h3>
                 <div className="grid grid-cols-1 gap-3">
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl">
                       <span className="text-[10px] font-bold text-slate-500">حالة KYC</span>
                       <span className="text-[10px] font-black text-emerald-600">✓ موثق (15/01/2024)</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-slate-50 rounded-2xl">
                       <span className="text-[10px] font-bold text-slate-500">نوع الوثيقة</span>
                       <span className="text-[10px] font-black text-slate-700">بطاقة الهوية الوطنية</span>
                    </div>
                 </div>
              </section>

              {/* Ratings Summary */}
              <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
                 <div className="flex items-center justify-between">
                    <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">التقييم العام</h3>
                    <div className="flex items-center gap-1 text-amber-500 font-black">
                       <Star size={16} fill="currentColor" />
                       <span className="text-sm">4.6/5</span>
                    </div>
                 </div>
                 <div className="space-y-4">
                    {[
                      { label: 'الالتزام بالمواعيد', val: 92 },
                      { label: 'التواصل', val: 95 },
                      { label: 'الوفاء بالالتزامات', val: 88 }
                    ].map(item => (
                      <div key={item.label} className="space-y-1.5">
                         <div className="flex justify-between text-[8px] font-black uppercase text-slate-400">
                            <span>{item.label}</span>
                            <span>{item.val}%</span>
                         </div>
                         <div className="w-full h-1.5 bg-slate-50 rounded-full overflow-hidden">
                            <div className="h-full bg-blue-600" style={{ width: `${item.val}%` }} />
                         </div>
                      </div>
                    ))}
                 </div>
              </section>
           </div>
         )}

         {/* TAB 2: LEGAL PROFILE */}
         {activeTab === 'legal' && (
           <div className="space-y-8 animate-in slide-in-from-bottom">
              <section className="space-y-4">
                 <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest px-2">🆔 معلومات الهوية</h3>
                 <div className="bg-white p-6 rounded-[2.2rem] border border-slate-100 shadow-sm grid grid-cols-1 gap-4">
                    {[
                      { label: 'الاسم الكامل', val: party.name },
                      { label: 'رقم الهوية', val: '1***5678' },
                      { label: 'تاريخ الميلاد', val: '1990/05/12' },
                      { label: 'الجنسية', val: 'سعودي' },
                      { label: 'الحالة المدنية', val: 'متزوج' }
                    ].map(item => (
                      <div key={item.label} className="flex justify-between border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                         <span className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</span>
                         <span className="text-[10px] font-black text-slate-800">{item.val}</span>
                      </div>
                    ))}
                 </div>
              </section>

              <section className="space-y-4">
                 <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest px-2">📍 العنوان القانوني</h3>
                 <div className="bg-white p-6 rounded-[2.2rem] border border-slate-100 shadow-sm grid grid-cols-1 gap-4">
                    {[
                      { label: 'المدينة', val: 'الرياض' },
                      { label: 'الحي', val: 'حي النرجس' },
                      { label: 'الشارع', val: 'شارع الملك فهد الفرعي' },
                      { label: 'الرمز البريدي', val: '12345' }
                    ].map(item => (
                      <div key={item.label} className="flex justify-between border-b border-slate-50 pb-2 last:border-0 last:pb-0">
                         <span className="text-[10px] font-bold text-slate-400 uppercase">{item.label}</span>
                         <span className="text-[10px] font-black text-slate-800">{item.val}</span>
                      </div>
                    ))}
                 </div>
              </section>
           </div>
         )}

         {/* TAB 3: CONTRACTS HISTORY */}
         {activeTab === 'contracts' && (
           <div className="space-y-6 animate-in slide-in-from-bottom">
              <div className="flex gap-2">
                 <div className="flex-1 relative">
                    <input type="text" placeholder="ابحث في العقود..." className="w-full bg-white border border-slate-100 rounded-2xl p-3 pr-10 text-[10px] font-bold outline-none" />
                    <Search className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-300" size={16} />
                 </div>
                 <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400"><Filter size={18} /></button>
              </div>

              <div className="space-y-4">
                 {[
                   { title: 'عقد إيجار - شقة', id: '#2024-001234', role: 'مالك', value: '24,000', status: 'مكتمل', date: '2023-01' },
                   { title: 'عقد خدمات - تطوير موقع', id: '#2024-000567', role: 'العميل', value: '45,000', status: 'جاري', date: '2024-10', progress: 65 }
                 ].map((c, i) => (
                   <div key={i} className="bg-white p-6 rounded-[2.2rem] border border-slate-100 shadow-sm space-y-4 group hover:border-blue-600 transition">
                      <div className="flex justify-between items-start">
                         <div>
                            <h4 className="font-black text-sm text-slate-900 group-hover:text-blue-600 transition">{c.title}</h4>
                            <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest">{c.id}</p>
                         </div>
                         <span className={`px-3 py-0.5 rounded-full text-[8px] font-black uppercase ${c.status === 'مكتمل' ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
                            {c.status}
                         </span>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-50">
                         <div>
                            <p className="text-[8px] font-black text-slate-400 uppercase">القيمة</p>
                            <p className="text-xs font-black text-slate-700">{c.value} ريال</p>
                         </div>
                         <div className="text-left">
                            <p className="text-[8px] font-black text-slate-400 uppercase">الدور</p>
                            <p className="text-xs font-black text-slate-700">{c.role}</p>
                         </div>
                      </div>
                      <button className="w-full py-2 bg-slate-50 text-slate-500 rounded-xl text-[9px] font-black uppercase hover:bg-blue-600 hover:text-white transition">عرض التفاصيل</button>
                   </div>
                 ))}
              </div>
           </div>
         )}

         {/* TAB 4: AI ANALYSIS */}
         {activeTab === 'ai' && (
           <div className="space-y-8 animate-in slide-in-from-bottom">
              <section className="bg-gradient-to-br from-indigo-900 to-slate-900 p-10 rounded-[3.5rem] text-white text-center space-y-8 shadow-2xl relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-3xl group-hover:scale-125 transition-transform" />
                 <Bot size={48} className="mx-auto text-blue-400 animate-pulse" />
                 <div className="space-y-2">
                    <h3 className="text-xl font-black">تقييم الأداء الذكي</h3>
                    <div className="relative inline-flex items-center justify-center">
                       <svg className="w-32 h-32 transform -rotate-90">
                          <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-white/10" />
                          <circle cx="64" cy="64" r="56" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={351.8} strokeDashoffset={351.8 * (1 - aiScore / 100)} className="text-blue-500" />
                       </svg>
                       <div className="absolute flex flex-col items-center">
                          <span className="text-4xl font-black leading-none">{aiScore}</span>
                          <span className="text-[8px] font-black uppercase tracking-widest text-blue-300">ممتاز</span>
                       </div>
                    </div>
                 </div>
                 <p className="text-[9px] text-blue-200 font-bold uppercase tracking-widest bg-white/5 py-2 rounded-full border border-white/5">✓ آمن للتعامل - مخاطر منخفضة جداً</p>
              </section>

              <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                 <h4 className="font-black text-sm uppercase flex items-center gap-2"><Target size={18} className="text-blue-600" /> تحليل المخاطر الاستباقي</h4>
                 <div className="space-y-4">
                    <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-2">
                       <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-emerald-800">الالتزام بالعقود</span>
                          <span className="text-[10px] font-black text-emerald-600">أداء مستقر</span>
                       </div>
                       <p className="text-[10px] text-emerald-700 leading-relaxed font-medium">يتم إكمال ٨٧٪ من العقود بنجاح، وهو أعلى من المتوسط العام (٧٥٪).</p>
                    </div>
                    <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 space-y-2">
                       <div className="flex justify-between items-center">
                          <span className="text-xs font-black text-amber-800">الوفاء المالي</span>
                          <span className="text-[10px] font-black text-amber-600">نقطة انتباه</span>
                       </div>
                       <p className="text-[10px] text-amber-700 leading-relaxed font-medium">سجل دفع جيد، ولكن لوحظ تأخيرات بسيطة (أقل من يومين) في ١٢٪ من الحالات.</p>
                    </div>
                 </div>
              </section>

              <div className="p-6 bg-blue-600 rounded-[2.5rem] text-white space-y-4 shadow-xl shadow-blue-200 relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-24 h-24 bg-white/10 rounded-full blur-2xl group-hover:scale-125 transition-transform" />
                 <div className="flex items-center gap-3">
                    <Sparkles className="text-amber-300" size={20} />
                    <h4 className="text-xs font-black uppercase tracking-widest text-blue-100">توقعات AI للعقد الحالي</h4>
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1">
                       <p className="text-[8px] font-black text-blue-200 uppercase">توقع الالتزام</p>
                       <p className="text-lg font-black">٨٩٪</p>
                    </div>
                    <div className="space-y-1 text-left">
                       <p className="text-[8px] font-black text-blue-200 uppercase">مستوى الثقة</p>
                       <p className="text-lg font-black">٨٥٪</p>
                    </div>
                 </div>
              </div>
           </div>
         )}

         {/* TAB 5: REVIEWS */}
         {activeTab === 'reviews' && (
           <div className="space-y-8 animate-in slide-in-from-bottom">
              <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                 <div className="flex items-center gap-3">
                    <MessageSquare size={20} className="text-blue-600" />
                    <h4 className="font-black text-sm uppercase tracking-widest">آراء المتعاملين</h4>
                 </div>
                 <div className="space-y-5">
                    {[
                      { user: 'أحمد محمد', rating: 5, date: 'منذ ٢ شهر', text: 'طرف موثوق ومتعاون جداً. التزم بجميع الشروط وكان التواصل ممتازاً طوال فترة العقد.' },
                      { user: 'سارة خالد', rating: 4, date: 'منذ ٤ أشهر', text: 'تجربة جيدة بشكل عام، احترافية عالية في التعامل.' }
                    ].map((rev, i) => (
                      <div key={i} className="space-y-3 p-5 bg-slate-50 rounded-3xl border border-slate-100/50">
                         <div className="flex justify-between items-center">
                            <div className="flex items-center gap-3">
                               <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-blue-600 shadow-sm font-black text-[10px]">{rev.user[0]}</div>
                               <div>
                                  <p className="text-xs font-black text-slate-900">{rev.user}</p>
                                  <p className="text-[8px] font-bold text-slate-400 uppercase">{rev.date}</p>
                               </div>
                            </div>
                            <div className="flex text-amber-400">
                               {[...Array(5)].map((_, j) => <Star key={j} size={10} fill={j < rev.rating ? "currentColor" : "none"} />)}
                            </div>
                         </div>
                         <p className="text-[10px] text-slate-600 leading-relaxed font-medium italic">"{rev.text}"</p>
                      </div>
                    ))}
                 </div>
              </section>

              <div className="p-6 bg-slate-900 rounded-[2.5rem] text-white space-y-4 shadow-xl">
                 <div className="flex items-center gap-3 text-blue-400">
                    <Bot size={20} />
                    <h4 className="text-[10px] font-black uppercase tracking-widest">تحليل المشاعر (AI Sentiment)</h4>
                 </div>
                 <div className="flex items-center justify-between">
                    <div className="flex-1 space-y-1">
                       <div className="flex justify-between text-[8px] font-black text-slate-500 uppercase px-1">
                          <span>إيجابي</span>
                          <span>٩٢٪</span>
                       </div>
                       <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                          <div className="h-full bg-emerald-500" style={{ width: '92%' }} />
                       </div>
                    </div>
                 </div>
                 <p className="text-[10px] text-slate-400 font-medium leading-relaxed">الكلمات الأكثر تكراراً: <span className="text-white font-black">"موثوق"</span>، <span className="text-white font-black">"متعاون"</span>، <span className="text-white font-black">"مهني"</span>.</p>
              </div>
           </div>
         )}
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes rotate-bg { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: rotate-bg 20s linear infinite; }
      `}</style>
    </div>
  );
};

const GlobeBackground = () => (
  <svg viewBox="0 0 100 100" className="w-full h-full animate-spin-slow opacity-20">
    <circle cx="50" cy="50" r="45" fill="none" stroke="white" strokeWidth="0.2" />
    <ellipse cx="50" cy="50" rx="45" ry="15" fill="none" stroke="white" strokeWidth="0.1" />
    <ellipse cx="50" cy="50" rx="15" ry="45" fill="none" stroke="white" strokeWidth="0.1" />
    <line x1="5" y1="50" x2="95" y2="50" stroke="white" strokeWidth="0.1" />
    <line x1="50" y1="5" x2="50" y2="95" stroke="white" strokeWidth="0.1" />
  </svg>
);

export default PartyLegalProfileScreen;
