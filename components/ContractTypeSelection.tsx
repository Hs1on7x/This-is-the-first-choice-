
import React, { useState } from 'react';
import { ArrowRight, Search, Home, Briefcase, Users, Landmark, Scale, Hammer, Box, Edit3, Sparkles, ChevronLeft } from 'lucide-react';

interface ContractTypeSelectionProps {
  onBack: () => void;
  onSelect: (type: string) => void;
}

const ContractTypeSelection: React.FC<ContractTypeSelectionProps> = ({ onBack, onSelect }) => {
  const [search, setSearch] = useState('');

  const contractTypes = [
    { id: 'realestate', label: 'عقد عقاري', description: 'عقود الإيجار، البيع، والتطوير العقاري', icon: <Home />, color: 'bg-blue-600' },
    { id: 'services', label: 'عقد خدمات', description: 'تقديم خدمات احترافية أو تقنية محددة', icon: <Hammer />, color: 'bg-indigo-600' },
    { id: 'labor', label: 'عقد عمل', description: 'تنظيم علاقة العمل بين صاحب العمل والموظف', icon: <Briefcase />, color: 'bg-slate-800' },
    { id: 'consulting', label: 'عقد استشارات', description: 'خدمات استشارية قانونية أو إدارية', icon: <Scale />, color: 'bg-blue-400' },
    { id: 'partnership', label: 'عقد شراكة', description: 'تأسيس شراكة تجارية أو مهنية بين طرفين', icon: <Users />, color: 'bg-emerald-600' },
    { id: 'supply', label: 'عقد توريد', description: 'توريد سلع أو منتجات تجارية بانتظام', icon: <Box />, color: 'bg-amber-600' },
    { id: 'construction', label: 'عقد مقاولة', description: 'تنفيذ أعمال إنشائية أو هندسية معمارية', icon: <Landmark />, color: 'bg-slate-700' },
    { id: 'custom', label: 'عقد مخصص', description: 'أنشئ مسودة عقد فريدة من الصفر', icon: <Edit3 />, color: 'bg-red-500' },
  ];

  const filtered = contractTypes.filter(t => t.label.includes(search) || t.description.includes(search));

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-300">
      {/* Header (Screen 10) */}
      <div className="p-4 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight className="text-slate-700" />
          </button>
          <div>
             <h1 className="text-lg font-black text-slate-900">إنشاء علاقة قانونية</h1>
             <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">اختر نوع العقد</p>
          </div>
        </div>
        
        <div className="relative group">
          <input 
            type="text" 
            placeholder="ابحث عن نوع العقد..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-3 pr-11 pl-4 text-sm focus:ring-4 focus:ring-blue-100 transition-all outline-none"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition" size={18} />
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        
        {/* AI Suggestion Banner */}
        <div className="bg-gradient-to-br from-indigo-600 to-blue-700 p-5 rounded-3xl text-white shadow-xl shadow-blue-100 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl" />
           <div className="relative z-10 flex items-center justify-between">
              <div className="space-y-2">
                 <div className="flex items-center gap-2">
                    <Sparkles size={16} className="text-amber-300" />
                    <span className="text-[10px] font-black uppercase tracking-widest">مساعدة AI</span>
                 </div>
                 <h3 className="text-sm font-bold">غير متأكد أي نوع عقد تحتاج؟</h3>
                 <button className="bg-white text-blue-600 px-4 py-1.5 rounded-lg text-xs font-black active:scale-95 transition">استشر المساعد</button>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                 <Scale size={32} />
              </div>
           </div>
        </div>

        {/* Grid (Screen 10 Cards) */}
        <div className="grid grid-cols-1 gap-4">
          {filtered.map((type) => (
            <button
              key={type.id}
              onClick={() => onSelect(type.label)}
              className="bg-white p-5 rounded-3xl shadow-sm border border-slate-50 flex items-center gap-4 hover:shadow-xl hover:border-blue-200 transition-all text-right group active:scale-[0.98]"
            >
              <div className={`${type.color} text-white w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg group-hover:rotate-6 transition duration-300 shrink-0`}>
                {/* Fix: cast type.icon to React.ReactElement<any> to allow 'size' prop in cloneElement */}
                {React.cloneElement(type.icon as React.ReactElement<any>, { size: 28 })}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-black text-slate-900 text-sm">{type.label}</h3>
                  <span className="bg-blue-50 text-blue-600 text-[8px] px-2 py-0.5 rounded font-black uppercase">قالب معتمد</span>
                </div>
                <p className="text-[10px] text-slate-400 font-medium leading-relaxed">{type.description}</p>
              </div>
              <ChevronLeft className="text-slate-200 group-hover:text-blue-600 group-hover:-translate-x-1 transition-all" size={18} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContractTypeSelection;
