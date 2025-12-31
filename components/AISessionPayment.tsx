
import React, { useState } from 'react';
import { 
  ArrowRight, Crown, Zap, Star, ShieldCheck, 
  ChevronLeft, Info, CheckCircle2, Clock, Sparkles,
  Smartphone, CreditCard, Wallet, SmartphoneNfc, Check
} from 'lucide-react';
import { ScreenType, SubscriptionPlan } from '../types';

interface AISessionPaymentProps {
  sessionsUsed: number;
  onBack: () => void;
  onSelect: (plan: SubscriptionPlan) => void;
}

const AISessionPayment: React.FC<AISessionPaymentProps> = ({ sessionsUsed, onBack, onSelect }) => {
  const [view, setView] = useState<'packages' | 'subscriptions'>('packages');

  const packages: SubscriptionPlan[] = [
    { id: 'p1', type: 'package', name: 'الباقة الأساسية', price: 50, sessions: 5, durationDays: 30, description: '10 ريال لكل جلسة' },
    { id: 'p2', type: 'package', name: 'الباقة المتوسطة', price: 120, sessions: 15, durationDays: 60, description: 'وفر 20% - 8 ريال لكل جلسة', isPopular: true },
    { id: 'p3', type: 'package', name: 'الباقة الممتازة', price: 200, sessions: 30, durationDays: 90, description: 'وفر 33% - 6.67 ريال لكل جلسة' }
  ];

  const subscriptions: SubscriptionPlan[] = [
    { id: 's1', type: 'subscription', name: 'الاشتراك الشهري الأساسي', price: 99, sessions: 'unlimited', durationDays: 30, description: 'أفضل قيمة للمستخدمين النشطين' },
    { id: 's2', type: 'subscription', name: 'الاشتراك الشهري المتوسط', price: 199, sessions: 'unlimited', durationDays: 30, description: 'عقود غير محدودة + رسوم مخفضة (1%)', isPopular: true },
    { id: 's3', type: 'subscription', name: 'الاشتراك الشهري الممتاز', price: 399, sessions: 'unlimited', durationDays: 30, description: 'استشارات بشرية غير محدودة + محامي مخصص' }
  ];

  const currentList = view === 'packages' ? packages : subscriptions;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-500 overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-40 shadow-sm border-b">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight size={20} className="text-slate-700" />
          </button>
          <h1 className="text-lg font-black text-slate-900 tracking-tight">ترقية باقة AI</h1>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Usage Status */}
        <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-4">
           <div className="flex justify-between items-center px-1">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">حالة الاستخدام الحالية</h3>
              <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">مستنفد بالكامل</span>
           </div>
           <div className="space-y-3">
              <div className="flex justify-between text-[10px] font-bold text-slate-500">
                 <span>الجلسات المجانية المستخدمة</span>
                 <span>3 من 3 (100%)</span>
              </div>
              <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                 <div className="h-full bg-red-500" style={{ width: '100%' }} />
              </div>
           </div>
           <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-3">
              <Info size={18} className="text-amber-600 shrink-0" />
              <p className="text-[10px] text-amber-800 font-bold leading-relaxed">
                لقد استخدمت جميع الجلسات المجانية. اختر إحدى الباقات أدناه لمواصلة الحصول على استشارات قانونية ذكية فورية.
              </p>
           </div>
        </section>

        {/* View Toggle */}
        <div className="bg-white p-1.5 rounded-2xl shadow-sm border border-slate-100 flex">
           <button 
             onClick={() => setView('packages')}
             className={`flex-1 py-3 rounded-xl text-[11px] font-black transition-all ${view === 'packages' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}
           >
              باقات الجلسات
           </button>
           <button 
             onClick={() => setView('subscriptions')}
             className={`flex-1 py-3 rounded-xl text-[11px] font-black transition-all ${view === 'subscriptions' ? 'bg-blue-600 text-white shadow-lg' : 'text-slate-400'}`}
           >
              الاشتراكات الشهرية
           </button>
        </div>

        {/* Plans List */}
        <div className="space-y-4">
           {currentList.map((plan) => (
             <button
               key={plan.id}
               onClick={() => onSelect(plan)}
               className={`w-full p-6 bg-white border-2 rounded-[2.5rem] text-right flex flex-col gap-4 transition-all relative overflow-hidden group hover:shadow-xl active:scale-[0.98] ${
                 plan.isPopular ? 'border-blue-600 shadow-lg shadow-blue-50 ring-4 ring-blue-50' : 'border-slate-100'
               }`}
             >
                {plan.isPopular && (
                  <div className="absolute top-0 left-0 bg-blue-600 text-white px-5 py-1.5 rounded-br-[1.5rem] text-[8px] font-black uppercase tracking-widest">الأكثر طلباً</div>
                )}
                
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        plan.id === 'p1' || plan.id === 's1' ? 'bg-slate-100 text-slate-400' :
                        plan.id === 'p2' || plan.id === 's2' ? 'bg-blue-50 text-blue-600' : 'bg-amber-50 text-amber-500'
                      }`}>
                         {plan.type === 'subscription' ? <Crown size={24} /> : plan.isPopular ? <Zap size={24} /> : <Star size={24} />}
                      </div>
                      <div>
                         <h4 className="text-sm font-black text-slate-900">{plan.name}</h4>
                         <p className="text-[10px] text-slate-400 font-bold uppercase mt-0.5">{plan.description}</p>
                      </div>
                   </div>
                   <div className="text-left">
                      <p className="text-2xl font-black text-slate-900">{plan.price}</p>
                      <p className="text-[8px] font-black text-slate-400 uppercase">{plan.type === 'subscription' ? 'ريال / شهر' : 'ريال شامل'}</p>
                   </div>
                </div>

                <div className="flex items-center gap-4 pt-4 border-t border-slate-50">
                   <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase">
                      <Clock size={12} className="text-blue-500" /> صالح لمدة {plan.durationDays} يوم
                   </div>
                   <div className="flex items-center gap-1.5 text-[9px] font-black text-slate-500 uppercase">
                      <Sparkles size={12} className="text-amber-500" /> {plan.sessions === 'unlimited' ? 'جلسات غير محدودة' : `${plan.sessions} جلسات`}
                   </div>
                   <div className="mr-auto">
                      <ChevronLeft size={20} className="text-slate-200 group-hover:text-blue-600 transition-transform group-hover:-translate-x-1" />
                   </div>
                </div>
             </button>
           ))}
        </div>

        {/* Benefits Grid */}
        <section className="bg-slate-900 p-8 rounded-[3rem] text-white space-y-6 shadow-2xl relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600/10 rounded-full -mr-16 -mt-16 blur-3xl animate-pulse" />
           <h3 className="text-xs font-black uppercase tracking-widest text-blue-400 flex items-center gap-2">
              <ShieldCheck size={16} /> مميزات الباقات والاشتراكات
           </h3>
           <div className="grid grid-cols-1 gap-4 relative z-10">
              {[
                'استشارات قانونية ذكية متخصصة ٢٤/٧',
                'تحليل المستندات والعقود المرفوعة فوراً',
                'حفظ كامل لتاريخ المحادثات والقرارات',
                'دعم قانوني محدث وفقاً لأحدث الأنظمة السعودية'
              ].map((benefit, i) => (
                <div key={i} className="flex items-center gap-3 text-[10px] font-bold text-slate-300">
                   <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                   {benefit}
                </div>
              ))}
           </div>
        </section>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default AISessionPayment;
