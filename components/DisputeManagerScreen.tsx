
import React, { useState } from 'react';
/* Added missing Sparkles import from lucide-react */
import { ArrowRight, Gavel, Plus, Search, ChevronLeft, Target, ShieldCheck, AlertCircle, FileText, MessageSquare, Briefcase, Filter, Download, Sparkles } from 'lucide-react';
import { DisputeCase, ScreenType } from '../types';

interface DisputeManagerScreenProps {
  onBack: () => void;
  onNewDispute: () => void;
  onEvaluate: () => void;
  onNavigate?: (screen: ScreenType, data?: any) => void;
}

const DisputeManagerScreen: React.FC<DisputeManagerScreenProps> = ({ onBack, onNewDispute, onEvaluate, onNavigate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'court' | 'arbitration'>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const cases: DisputeCase[] = [
    {
      id: 'CAS-901',
      title: 'نزاع عمالي - شركة الحلول المتكاملة',
      type: 'labor',
      status: 'court',
      claimantName: 'أنت',
      defendantName: 'شركة الحلول المتكاملة',
      successProbability: 82,
      lastUpdate: 'قبل يومين',
      nextStep: 'جلسة المرافعة الأولى (١٥ يونيو)',
      evidence: [
        { type: 'doc', title: 'عقد العمل الأصلي', aiInsight: 'البند الرابع يدعم موقفك في التعويض' },
        { type: 'chat', title: 'مراسلات واتساب', aiInsight: 'إقرار بالاستحقاق المالي من صاحب العمل' }
      ]
    },
    {
      id: 'CAS-102',
      title: 'خلاف توريد - مؤسسة فهد التجارية',
      type: 'commercial',
      status: 'arbitration',
      claimantName: 'أنت',
      defendantName: 'مؤسسة فهد التجارية',
      successProbability: 65,
      lastUpdate: 'منذ ٣ ساعات',
      nextStep: 'انتظار رد الطرف الثاني على مقترح الصلح',
      evidence: [
        { type: 'file', title: 'فاتورة الشراء رقم ١٠١', aiInsight: 'التاريخ يثبت التأخير في التوريد' }
      ]
    }
  ];

  const filteredCases = cases.filter(c => 
    c.title.includes(searchQuery) && (activeTab === 'all' || c.status === activeTab)
  );

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-300 overflow-y-auto pb-24">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
              <ArrowRight className="text-slate-700" />
            </button>
            <div>
              <h1 className="text-lg font-black text-slate-900">إدارة النزاعات</h1>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">تتبع وتسوية القضايا القانونية</p>
            </div>
          </div>
          <button 
            onClick={onNewDispute}
            className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 active:scale-90 transition"
          >
            <Plus size={24} />
          </button>
        </div>
        
        <div className="bg-slate-100 p-1 rounded-2xl flex">
          {[
            { id: 'all', label: 'الكل' },
            { id: 'court', label: 'المحاكم' },
            { id: 'arbitration', label: 'التحكيم' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === tab.id ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="flex gap-2">
           <div className="flex-1 relative group">
              <input 
                type="text" 
                placeholder="البحث برقم القضية أو اسم الخصم..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white border border-slate-100 rounded-2xl py-3 pr-11 pl-4 text-sm shadow-sm outline-none focus:ring-2 focus:ring-blue-100 transition-all"
              />
              <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition" size={18} />
           </div>
           <button className="p-3 bg-white border border-slate-100 rounded-2xl text-slate-400 active:scale-95 transition"><Filter size={20} /></button>
        </div>

        {/* Case Evaluation Tool Banner */}
        <div className="p-6 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <Target size={200} className="absolute -bottom-10 -left-10 rotate-12" />
          </div>
          <div className="relative z-10 space-y-4">
             <div className="flex items-center gap-2">
                <div className="p-2 bg-blue-500/20 rounded-lg backdrop-blur-md">
                   <Target size={16} className="text-blue-400" />
                </div>
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-300">تقييم الموقف القانوني الاستباقي</span>
             </div>
             <div className="space-y-1">
                <h3 className="text-lg font-black">هل ترغب في معرفة احتمالية كسب قضيتك؟</h3>
                <p className="text-[10px] text-slate-400 leading-relaxed font-medium">يقوم المحلل الذكي بدراسة أدلتك ومقارنتها بسوابق قضائية مماثلة لإعطائك تقريراً دقيقاً.</p>
             </div>
             <button 
               onClick={onEvaluate}
               className="w-full py-3 bg-blue-600 text-white rounded-2xl font-black text-xs shadow-lg shadow-blue-900/50 active:scale-95 transition flex items-center justify-center gap-2"
             >
               <Sparkles size={16} /> بدء التقييم الذكي مجاناً
             </button>
          </div>
        </div>

        {/* Cases List */}
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
             <h3 className="font-black text-slate-900 text-sm flex items-center gap-2">
               <Gavel size={18} className="text-blue-600" /> قضاياك النشطة ({filteredCases.length})
             </h3>
             <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">تحميل السجل (PDF)</button>
          </div>

          {filteredCases.length > 0 ? (
            filteredCases.map((c) => (
              <div 
                key={c.id} 
                onClick={() => onNavigate?.(ScreenType.DISPUTE_RESOLUTION_DECISION, c)}
                className="bg-white p-6 rounded-[2.2rem] border border-slate-100 shadow-sm space-y-5 hover:border-blue-300 hover:shadow-xl transition-all group cursor-pointer active:scale-[0.99]"
              >
                <div className="flex items-start justify-between">
                  <div className="flex gap-4">
                    <div className="w-14 h-14 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-inner">
                      <Briefcase size={28} />
                    </div>
                    <div>
                      <h4 className="font-black text-slate-900 text-sm leading-tight group-hover:text-blue-600 transition">{c.title}</h4>
                      <div className="flex items-center gap-2 mt-1.5">
                         <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase ${
                           c.status === 'court' ? 'bg-indigo-50 text-indigo-600' : 'bg-amber-50 text-amber-600'
                         }`}>
                           {c.status === 'court' ? 'محكمة ناجزة' : 'تحكيم إلكتروني'}
                         </span>
                         <p className="text-[9px] text-slate-300 font-bold uppercase tracking-tighter">{c.id} • {c.lastUpdate}</p>
                      </div>
                    </div>
                  </div>
                  <div className="text-left bg-slate-50 p-2 rounded-2xl border border-slate-100 min-w-[70px]">
                    <div className="text-xl font-black text-blue-600 leading-none">{c.successProbability}%</div>
                    <div className="text-[7px] font-black text-slate-400 uppercase tracking-widest mt-1">فرصة النجاح</div>
                  </div>
                </div>

                <div className="bg-slate-50/50 p-4 rounded-2xl space-y-2 border border-slate-100 shadow-inner">
                  <div className="flex justify-between items-center">
                    <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">الخطوة القادمة:</p>
                    <span className="text-[8px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded-full">تحديث تلقائي</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs font-black text-slate-700">
                    <Target size={14} className="text-red-500" />
                    {c.nextStep}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-1">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-2 rtl:space-x-reverse">
                      {c.evidence.map((ev, i) => (
                        <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-white flex items-center justify-center text-blue-500 shadow-sm ring-1 ring-slate-100">
                          <FileText size={14} />
                        </div>
                      ))}
                    </div>
                    <span className="text-[9px] font-black text-slate-400 uppercase">+{c.evidence.length} مستندات إثبات</span>
                  </div>
                  <button className="flex items-center gap-1.5 text-[10px] font-black text-blue-600 group-hover:translate-x-[-4px] transition-transform">
                    عرض كافة التفاصيل <ChevronLeft size={16} />
                  </button>
                </div>
              </div>
            ))
          ) : (
             <div className="text-center py-20 opacity-30 flex flex-col items-center gap-4">
                <Search size={48} className="text-slate-300" />
                <p className="text-sm font-bold text-slate-400">لا توجد نتائج بحث مطابقة</p>
             </div>
          )}
        </div>

        {/* Mediation Request Footer Banner */}
        <div className="p-8 bg-blue-600 rounded-[2.5rem] text-white shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl group-hover:scale-110 transition-transform" />
           <div className="space-y-1 relative z-10">
              <h4 className="font-black text-lg">طلب تسوية ودية</h4>
              <p className="text-[10px] text-blue-100 leading-relaxed font-medium">هل تفضل حل النزاع بعيداً عن القضاء؟ تواصل مع وسيط معتمد الآن.</p>
           </div>
           <button 
             onClick={onNewDispute}
             className="bg-white text-blue-600 px-8 py-3 rounded-2xl font-black text-xs shadow-xl active:scale-95 transition relative z-10 hover:bg-blue-50"
           >
              طلب وساطة فورية
           </button>
        </div>
      </div>
    </div>
  );
};

export default DisputeManagerScreen;
