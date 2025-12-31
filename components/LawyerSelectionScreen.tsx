
import React, { useState, useMemo } from 'react';
import { 
  Search, SlidersHorizontal, Star, ArrowRight, ShieldCheck, 
  MapPin, Clock, Briefcase, TrendingUp, Bot, ChevronLeft, Sparkles
} from 'lucide-react';

interface LawyerSelectionScreenProps {
  consultationDetails: any;
  onBack: () => void;
  onSelectLawyer: (lawyer: any) => void;
}

const LawyerSelectionScreen: React.FC<LawyerSelectionScreenProps> = ({ consultationDetails, onBack, onSelectLawyer }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const lawyers = [
    {
      id: 'L1',
      name: 'د. محمد القحطاني',
      title: 'محامي ومستشار قانوني معتمد',
      rating: 4.9,
      reviews: 156,
      license: '#12345',
      specialties: ['قانون العمل', 'النزاعات التجارية'],
      experience: 12,
      city: 'الرياض',
      availability: 'متاح الآن',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=محمد',
      aiMatch: 98,
      aiInsight: `المحامي محمد خبير في "${consultationDetails?.specialty || 'هذا التخصص'}"، ولديه سجل حافل في قضايا مشابهة لعنوانك "${consultationDetails?.title || 'موضوعك'}".`,
      stats: { completed: 234, successRate: 96, satisfaction: 98, avgDuration: 45 }
    },
    {
      id: 'L2',
      name: 'أ. سارة العتيبي',
      title: 'محامية متخصصة في القضايا العمالية',
      rating: 4.8,
      reviews: 89,
      license: '#67890',
      specialties: ['قانون العمل', 'التعويضات'],
      experience: 8,
      city: 'جدة',
      availability: 'متاحة الآن',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=سارة',
      aiMatch: 85,
      aiInsight: `توصية AI: سارة بارعة في صياغة ردود لمثل حالتك: "${consultationDetails?.title || 'هذا الموضوع'}"، خصوصاً في منطقة مكة المكرمة.`,
      stats: { completed: 167, successRate: 89, satisfaction: 96, avgDuration: 40 }
    }
  ];

  const filteredLawyers = useMemo(() => {
    return lawyers.filter(l => 
      l.name.includes(searchQuery) || 
      l.specialties.some(s => s.includes(searchQuery)) ||
      l.city.includes(searchQuery)
    );
  }, [searchQuery]);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-300 overflow-y-auto pb-24">
      <div className="p-4 bg-white border-b sticky top-0 z-30 shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
              <ArrowRight className="text-slate-700" />
            </button>
            <div>
              <h1 className="text-lg font-black text-slate-900 leading-tight">اختر محاميك المفضل</h1>
              <p className="text-[10px] text-emerald-600 font-bold uppercase tracking-widest">تم الدفع بنجاح ✓ اختر خبيراً لبدء الجلسة</p>
            </div>
          </div>
          <button 
            onClick={() => setShowFilters(!showFilters)}
            className={`p-2.5 rounded-xl transition ${showFilters ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'}`}
          >
            <SlidersHorizontal size={20} />
          </button>
        </div>

        <div className="relative group">
          <input 
            type="text" 
            placeholder="ابحث بالاسم، المدينة، أو التخصص..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pr-11 pl-4 text-sm focus:ring-4 focus:ring-blue-100 transition-all outline-none"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition" size={18} />
        </div>
      </div>

      <div className="p-5 space-y-6">
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-5 rounded-[2rem] text-white shadow-xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
           <div className="flex gap-4 relative z-10">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                 <Bot size={24} className="text-amber-300" />
              </div>
              <div>
                 <h4 className="text-xs font-black uppercase tracking-widest text-indigo-100">تحليل AI لحالتك</h4>
                 <p className="text-[10px] text-white leading-relaxed font-medium mt-1">
                   لقد قمت بفرز المحامين بناءً على موضوعك: <span className="underline italic">"{consultationDetails?.title}"</span>. النتائج مرتبة حسب الأكثر خبرة في هذا المجال.
                 </p>
              </div>
           </div>
        </div>

        {filteredLawyers.map((lawyer) => (
          <div key={lawyer.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden hover:border-blue-300 transition-all">
            <div className="p-6 space-y-6">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img src={lawyer.avatar} alt={lawyer.name} className="w-16 h-16 rounded-2xl bg-slate-50 border border-slate-100" />
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-base">{lawyer.name}</h4>
                    <div className="flex items-center gap-2 text-amber-500 font-bold text-xs mt-0.5">
                       <Star size={14} fill="currentColor" />
                       <span>{lawyer.rating}</span>
                       <span className="text-slate-300 font-medium">({lawyer.reviews} تقييم)</span>
                    </div>
                  </div>
                </div>
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-inner"><ShieldCheck size={24} /></div>
              </div>

              <div className="bg-slate-900 rounded-[1.8rem] p-5 space-y-3 relative overflow-hidden">
                 <div className="flex items-center justify-between relative z-10">
                    <div className="flex items-center gap-2 text-blue-400">
                       <Sparkles size={16} />
                       <h5 className="text-[9px] font-black uppercase tracking-widest">توصية مخصصة</h5>
                    </div>
                    <span className="text-xl font-black text-white">{lawyer.aiMatch}%</span>
                 </div>
                 <p className="text-[10px] text-slate-300 leading-relaxed italic relative z-10">"{lawyer.aiInsight}"</p>
              </div>

              <div className="grid grid-cols-2 gap-y-3 gap-x-4">
                 <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                    <Briefcase size={14} className="text-slate-300" /> {lawyer.specialties[0]}
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                    <MapPin size={14} className="text-slate-300" /> {lawyer.city}
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold text-slate-600">
                    <TrendingUp size={14} className="text-slate-300" /> {lawyer.experience} سنة خبرة
                 </div>
                 <div className="flex items-center gap-2 text-[10px] font-bold text-blue-600">
                    <Clock size={14} className="text-blue-300" /> {lawyer.availability}
                 </div>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-100 flex gap-3">
               <button onClick={() => onSelectLawyer(lawyer)} className="flex-1 py-3.5 bg-white border border-slate-200 text-slate-700 rounded-2xl font-black text-xs hover:bg-slate-100 transition active:scale-95 shadow-sm">الملف الكامل</button>
               <button onClick={() => onSelectLawyer(lawyer)} className="flex-[1.5] py-3.5 bg-blue-600 text-white rounded-2xl font-black text-xs shadow-xl active:scale-95 transition">تأكيد الاختيار وبدء الجلسة</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LawyerSelectionScreen;
