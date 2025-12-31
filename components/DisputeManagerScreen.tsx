
import React, { useState } from 'react';
import { ArrowRight, Gavel, Plus, Search, ChevronLeft, Target, ShieldCheck, AlertCircle, FileText, MessageSquare, Briefcase } from 'lucide-react';
import { DisputeCase } from '../types';

interface DisputeManagerScreenProps {
  onBack: () => void;
  onNewDispute: () => void;
  onEvaluate: () => void;
}

const DisputeManagerScreen: React.FC<DisputeManagerScreenProps> = ({ onBack, onNewDispute, onEvaluate }) => {
  const [activeTab, setActiveTab] = useState<'all' | 'court' | 'arbitration'>('all');

  const cases: DisputeCase[] = [
    {
      id: 'CAS-901',
      title: 'نزاع عمالي - شركة الحلول المتكاملة',
      type: 'labor',
      status: 'court',
      successProbability: 82,
      lastUpdate: 'قبل يومين',
      nextStep: 'جلسة المرافعة الأولى (١٥ يونيو)',
      evidence: [
        { type: 'doc', title: 'عقد العمل الأصلي', aiInsight: 'البند الرابع يدعم موقفك في التعويض' },
        { type: 'chat', title: 'مراسلات واتساب', aiInsight: 'إقرار بالاستحقاق المالي من صاحب العمل' }
      ]
    }
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-300 overflow-y-auto pb-24">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-20 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
              <ArrowRight className="text-slate-700" />
            </button>
            <h1 className="text-lg font-black text-slate-900">إدارة النزاعات</h1>
          </div>
          <button 
            onClick={onNewDispute}
            className="w-10 h-10 bg-blue-600 text-white rounded-xl flex items-center justify-center shadow-lg shadow-blue-100 active:scale-90 transition"
          >
            <Plus size={24} />
          </button>
        </div>
        
        <div className="bg-slate-100 p-1 rounded-2xl flex">
          {['all', 'court', 'arbitration'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab as any)}
              className={`flex-1 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${activeTab === tab ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-400'}`}
            >
              {tab === 'all' ? 'الكل' : tab === 'court' ? 'المحاكم' : 'التحكيم'}
            </button>
          ))}
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Search */}
        <div className="relative group">
          <input 
            type="text" 
            placeholder="البحث في القضايا..."
            className="w-full bg-white border border-slate-100 rounded-2xl py-3 pr-11 pl-4 text-sm shadow-sm outline-none"
          />
          <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
        </div>

        {/* Case Evaluation Tool Banner */}
        <div className="p-5 bg-gradient-to-br from-slate-800 to-slate-900 rounded-[2.5rem] text-white shadow-xl relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
            <Target size={200} className="absolute -bottom-10 -left-10" />
          </div>
          <div className="relative z-10 space-y-3">
             <div className="flex items-center gap-2">
                <Target size={16} className="text-blue-400" />
                <span className="text-[9px] font-black uppercase tracking-widest text-blue-300">تقييم الموقف القانوني</span>
             </div>
             <h3 className="text-sm font-bold">هل موقفك في النزاع قوي؟</h3>
             <p className="text-[10px] text-slate-400 leading-relaxed font-medium">دع AI يحلل أدلتك ويحدد احتمالية نجاحك في المحكمة أو التحكيم.</p>
             <button 
               onClick={onEvaluate}
               className="bg-blue-600 text-white px-6 py-2 rounded-xl text-[10px] font-black shadow-lg shadow-blue-900/50 active:scale-95 transition"
             >
               بدء التقييم
             </button>
          </div>
        </div>

        {/* Cases List */}
        <div className="space-y-4">
          <h3 className="font-bold text-slate-900 text-sm px-1 flex items-center gap-2">
            <Gavel size={18} className="text-slate-400" /> قضاياك الحالية
          </h3>
          {cases.map((c) => (
            <div key={c.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm space-y-4 hover:border-blue-200 transition group cursor-pointer">
              <div className="flex items-start justify-between">
                <div className="flex gap-4">
                  <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition">
                    <Briefcase size={24} />
                  </div>
                  <div>
                    <h4 className="font-black text-slate-900 text-sm leading-tight">{c.title}</h4>
                    <p className="text-[9px] text-slate-400 mt-1 font-bold uppercase">{c.id} • {c.lastUpdate}</p>
                  </div>
                </div>
                <div className="text-left">
                  <div className="text-lg font-black text-blue-600">{c.successProbability}%</div>
                  <div className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">فرصة النجاح</div>
                </div>
              </div>

              <div className="bg-slate-50 p-4 rounded-2xl space-y-2">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">الخطوة القادمة:</p>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-700">
                  <Target size={14} className="text-blue-600" />
                  {c.nextStep}
                </div>
              </div>

              <div className="flex items-center justify-between pt-2">
                <div className="flex -space-x-2 rtl:space-x-reverse">
                  {c.evidence.map((_, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-slate-100 flex items-center justify-center text-slate-400">
                      <FileText size={14} />
                    </div>
                  ))}
                  <div className="w-8 h-8 rounded-full border-2 border-white bg-blue-600 text-white flex items-center justify-center text-[10px] font-black">
                    +{c.evidence.length}
                  </div>
                </div>
                <button className="flex items-center gap-1 text-[10px] font-black text-blue-600 group-hover:translate-x-[-4px] transition-transform">
                  تفاصيل الحالة <ChevronLeft size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Arbitration Banner */}
        <div className="p-6 bg-blue-600 rounded-3xl text-white shadow-xl shadow-blue-100 flex items-center justify-between">
           <div className="space-y-1">
              <h4 className="font-black text-sm">حل النزاعات ودياً؟</h4>
              <p className="text-[10px] opacity-80">اطلب محكماً معتمداً لإنهاء النزاع بسرعة وخصوصية.</p>
           </div>
           <button className="bg-white text-blue-600 p-2 rounded-xl active:scale-90 transition">
              <Plus size={24} />
           </button>
        </div>
      </div>
    </div>
  );
};

export default DisputeManagerScreen;
