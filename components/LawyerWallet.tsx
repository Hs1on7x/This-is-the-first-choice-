
import React, { useState } from 'react';
import { 
  ArrowRight, Wallet, TrendingUp, ArrowDownCircle, ArrowUpCircle, 
  History, ShieldCheck, ChevronLeft, CreditCard, Landmark, 
  CheckCircle2, Clock, Info, ExternalLink, RefreshCw, Filter, MoreVertical
} from 'lucide-react';
import { WalletTransaction } from '../types';

interface LawyerWalletProps {
  onBack: () => void;
}

const LawyerWallet: React.FC<LawyerWalletProps> = ({ onBack }) => {
  const [balance] = useState(8450.00);
  const [pendingWithdrawal, setPendingWithdrawal] = useState(false);

  const transactions: WalletTransaction[] = [
    { id: 't1', type: 'earnings', amount: 225, status: 'completed', date: 'اليوم، 10:30 ص', description: 'أتعاب استشارة - أحمد السعيد' },
    { id: 't2', type: 'earnings', amount: 135, status: 'completed', date: 'أمس، 04:00 م', description: 'أتعاب استشارة - نوره العتيبي' },
    { id: 't3', type: 'withdrawal', amount: -2000, status: 'pending', date: '30 ديسمبر، 2024', description: 'سحب رصيد لحساب مصرف الراجحي' },
    { id: 't4', type: 'earnings', amount: 450, status: 'completed', date: '28 ديسمبر، 2024', description: 'مراجعة عقد - شركة الأفق' },
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-500 overflow-y-auto pb-24">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-30 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowRight size={20} /></button>
          <h1 className="text-lg font-black text-slate-900">المحفظة والأرباح</h1>
        </div>
        <button className="p-2 text-slate-400"><RefreshCw size={20} /></button>
      </div>

      <div className="p-6 space-y-8">
        {/* Professional Earnings Card */}
        <section className="bg-indigo-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <Wallet size={300} className="absolute -bottom-20 -right-20 rotate-12" />
           </div>
           <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                 <span className="text-[10px] font-black uppercase tracking-widest text-indigo-100">الرصيد القابل للسحب</span>
                 <ShieldCheck size={20} className="text-indigo-200" />
              </div>
              <div className="flex items-baseline gap-3">
                 <span className="text-5xl font-black">{balance.toLocaleString()}</span>
                 <span className="text-lg font-bold text-indigo-200 uppercase">SAR</span>
              </div>
              <div className="flex items-center gap-4 pt-2">
                 <div className="flex items-center gap-1.5 text-[9px] font-black bg-white/10 px-3 py-1 rounded-full uppercase border border-white/5 shadow-inner">
                    <TrendingUp size={12} className="text-emerald-400" /> +١٢٪ هذا الشهر
                 </div>
                 <div className="flex items-center gap-1.5 text-[9px] font-black bg-white/10 px-3 py-1 rounded-full uppercase border border-white/5 shadow-inner">
                    <Clock size={12} className="text-amber-300" /> ٨٥٠ ريال معلق
                 </div>
              </div>
           </div>
        </section>

        {/* Withdrawal Action */}
        <button 
          onClick={() => setPendingWithdrawal(true)}
          className="w-full p-8 bg-white border-2 border-slate-100 rounded-[2.5rem] shadow-xl flex flex-col items-center gap-4 group hover:border-indigo-600 transition-all active:scale-[0.98] relative overflow-hidden"
        >
           <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-50 rounded-full -mr-16 -mt-16 opacity-40 group-hover:scale-125 transition-transform" />
           <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-[1.5rem] flex items-center justify-center shadow-inner group-hover:bg-indigo-600 group-hover:text-white transition-all duration-500">
              <ArrowUpCircle size={32} />
           </div>
           <div className="text-center">
              <h4 className="font-black text-slate-900 text-sm uppercase tracking-widest">سحب الأرباح الآن</h4>
              <p className="text-[10px] text-slate-400 font-bold mt-1 uppercase tracking-tighter">إيداع مباشر في حسابك البنكي</p>
           </div>
        </button>

        {/* Stats Section */}
        <section className="grid grid-cols-2 gap-4">
           <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
              <div className="w-10 h-10 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shadow-inner"><TrendingUp size={20} /></div>
              <div className="space-y-0.5">
                 <p className="text-lg font-black text-slate-900">١٢,٤٠٠</p>
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">إجمالي الأرباح</p>
              </div>
           </div>
           <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-inner"><History size={20} /></div>
              <div className="space-y-0.5">
                 <p className="text-lg font-black text-slate-900">٤٥</p>
                 <p className="text-[8px] font-black text-slate-400 uppercase tracking-widest">استشارة منجزة</p>
              </div>
           </div>
        </section>

        {/* Recent Transactions */}
        <section className="space-y-5">
           <div className="flex items-center justify-between px-2">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">سجل المعاملات</h3>
              <button className="p-2 text-slate-400"><Filter size={18} /></button>
           </div>
           <div className="space-y-3">
              {transactions.map(t => (
                <div key={t.id} className="bg-white p-5 rounded-3xl border border-slate-50 shadow-sm flex items-center justify-between group hover:border-indigo-100 transition cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-transform group-hover:scale-110 ${
                        t.type === 'earnings' ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-500'
                      }`}>
                         {t.type === 'earnings' ? <ArrowDownCircle size={22} /> : <ArrowUpCircle size={22} />}
                      </div>
                      <div>
                         <p className="text-xs font-black text-slate-800 leading-tight">{t.description}</p>
                         <p className="text-[9px] text-slate-400 font-bold mt-1 uppercase">{t.date}</p>
                      </div>
                   </div>
                   <div className="text-left space-y-1">
                      <p className={`text-sm font-black ${t.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                         {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString()} <span className="text-[9px]">SAR</span>
                      </p>
                      <span className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase text-center ${
                        t.status === 'completed' ? 'text-emerald-600 bg-emerald-50' : 'text-blue-600 bg-blue-50 animate-pulse'
                      }`}>
                         {t.status === 'completed' ? 'مكتمل' : 'قيد التنفيذ'}
                      </span>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Withdrawal Modal Simulation */}
        {pendingWithdrawal && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
             <div className="bg-white w-full max-w-sm rounded-[3rem] p-10 flex flex-col items-center space-y-8 shadow-2xl animate-in zoom-in duration-500">
                <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-[2.5rem] flex items-center justify-center shadow-inner animate-in zoom-in duration-700">
                   <CheckCircle2 size={56} />
                </div>
                <div className="text-center space-y-3">
                   <h3 className="text-2xl font-black text-slate-900 tracking-tight">طلب سحب ناجح!</h3>
                   <p className="text-xs text-slate-500 font-medium leading-relaxed">سيتم تحويل مبلغ <span className="font-black text-indigo-600">٢,٠٠٠ ريال</span> لحسابك البنكي خلال ٢٤ ساعة عمل.</p>
                </div>
                <button onClick={() => setPendingWithdrawal(false)} className="w-full py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-sm active:scale-95 transition">فهمت ذلك</button>
             </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default LawyerWallet;
