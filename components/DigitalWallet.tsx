
import React, { useState } from 'react';
// Fix: Added missing ShieldCheck and Clock imports from lucide-react
import { 
  ArrowRight, RefreshCw, Settings, Wallet, ArrowDownCircle, ArrowUpCircle, 
  Send, History, Lock, ChevronLeft, Search, Filter, Calendar, 
  Plus, CheckCircle2, AlertCircle, MoreVertical, CreditCard, Landmark, Smartphone, X,
  ShieldCheck, Clock
} from 'lucide-react';
import { WalletTransaction } from '../types';

interface DigitalWalletProps {
  onBack: () => void;
}

const DigitalWallet: React.FC<DigitalWalletProps> = ({ onBack }) => {
  const [balance] = useState(45250.00);
  const [activeModal, setActiveModal] = useState<'deposit' | 'withdraw' | null>(null);
  const [filter, setFilter] = useState('all');

  const pendingTransactions: any[] = [
    { id: 'p1', type: 'escrow', amount: 25000, desc: 'محجوز في Escrow - عقد #1234', status: 'reserved' },
    { id: 'p2', type: 'payment', amount: 10000, desc: 'دفعة قادمة - عقد #5678', date: '2025-01-05' }
  ];

  const transactions: WalletTransaction[] = [
    { id: 't1', type: 'deposit', amount: 50000, status: 'completed', date: '2024-12-30 10:00 AM', description: 'إيداع عبر تحويل بنكي' },
    { id: 't2', type: 'payment', amount: -25000, status: 'reserved', date: '2024-12-29 03:00 PM', description: 'دفع لعقد #1234 (Escrow)' },
    { id: 't3', type: 'withdrawal', amount: -5000, status: 'pending', date: '2024-12-28 11:00 AM', description: 'سحب لحساب البنك الأهلي' },
    { id: 't4', type: 'refund', amount: 1200, status: 'failed', date: '2024-12-27 09:30 AM', description: 'استرداد قيمة استشارة ملغاة' },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-emerald-500 bg-emerald-50';
      case 'pending': return 'text-blue-500 bg-blue-50';
      case 'reserved': return 'text-amber-500 bg-amber-50';
      case 'failed': return 'text-red-500 bg-red-50';
      default: return 'text-slate-400 bg-slate-50';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-700 overflow-y-auto pb-24">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-30 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight className="text-slate-700" />
          </button>
          <h1 className="text-lg font-black text-slate-900">محفظتي الرقمية</h1>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-slate-400 hover:text-blue-600 transition"><RefreshCw size={20} /></button>
          <button className="p-2 text-slate-400 hover:text-blue-600 transition"><Settings size={20} /></button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Balance Card */}
        <div className="bg-blue-600 p-8 rounded-[2.5rem] text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
              <Wallet size={300} className="absolute -bottom-20 -right-20 rotate-12" />
           </div>
           <div className="relative z-10 space-y-6">
              <div className="flex items-center justify-between">
                 <span className="text-xs font-black uppercase tracking-widest text-blue-100">الرصيد المتاح حالياً</span>
                 <ShieldCheck size={20} className="text-blue-200" />
              </div>
              <div className="flex items-baseline gap-3">
                 <span className="text-5xl font-black">{balance.toLocaleString('en-US', { minimumFractionDigits: 2 })}</span>
                 <span className="text-lg font-bold text-blue-200 uppercase">ريال</span>
              </div>
              <div className="flex items-center gap-2 pt-2 text-[10px] font-bold text-blue-100">
                 <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                 آخر تحديث: منذ دقيقتين
              </div>
           </div>
        </div>

        {/* Quick Actions Grid */}
        <div className="grid grid-cols-2 gap-4">
           <button onClick={() => setActiveModal('deposit')} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center gap-3 group active:scale-95 transition">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                 <ArrowDownCircle size={24} />
              </div>
              <span className="text-xs font-black text-slate-700">إيداع رصيد</span>
           </button>
           <button onClick={() => setActiveModal('withdraw')} className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center gap-3 group active:scale-95 transition">
              <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                 <ArrowUpCircle size={24} />
              </div>
              <span className="text-xs font-black text-slate-700">سحب للأرباح</span>
           </button>
           <button className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center gap-3 group active:scale-95 transition">
              <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                 <Send size={24} className="rotate-[-12deg]" />
              </div>
              <span className="text-xs font-black text-slate-700">تحويل مبلغ</span>
           </button>
           <button className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm flex flex-col items-center gap-3 group active:scale-95 transition">
              <div className="w-12 h-12 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:scale-110 transition">
                 <History size={24} />
              </div>
              <span className="text-xs font-black text-slate-700">سجل كامل</span>
           </button>
        </div>

        {/* Pending Transactions Section */}
        <section className="space-y-4">
           <h3 className="font-black text-slate-900 text-sm px-2 flex items-center gap-2">
              <Clock size={18} className="text-amber-500" /> معاملات معلقة ومحجوزة
           </h3>
           <div className="space-y-3">
              {pendingTransactions.map((pt) => (
                <div key={pt.id} className="bg-white p-5 rounded-[1.8rem] border-2 border-amber-100/50 shadow-sm flex items-center justify-between group hover:border-amber-400 transition cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className="w-10 h-10 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center">
                         {pt.type === 'escrow' ? <Lock size={20} /> : <Calendar size={20} />}
                      </div>
                      <div>
                         <p className="text-xs font-black text-slate-900">{pt.desc}</p>
                         <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">
                            {pt.type === 'escrow' ? 'محجوز حتى إتمام العقد' : `موعد الاستحقاق: ${pt.date}`}
                         </p>
                      </div>
                   </div>
                   <div className="text-left">
                      <p className="text-sm font-black text-amber-600">{pt.amount.toLocaleString()} ريال</p>
                      <ChevronLeft size={16} className="text-slate-200 group-hover:text-amber-500 mr-auto mt-1" />
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Transaction History */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="font-black text-slate-900 text-sm">آخر المعاملات المالية</h3>
              <button className="text-[10px] font-black text-blue-600 uppercase hover:underline">عرض الكل</button>
           </div>

           {/* Filter Bar */}
           <div className="flex gap-2 overflow-x-auto no-scrollbar scrollbar-hide pb-2">
              {['الكل', 'إيداع', 'سحب', 'دفعات', 'محجوز'].map((f) => (
                <button 
                  key={f} 
                  onClick={() => setFilter(f)}
                  className={`whitespace-nowrap px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                    filter === f ? 'bg-slate-900 text-white shadow-lg' : 'bg-white text-slate-400 border border-slate-100'
                  }`}
                >
                  {f}
                </button>
              ))}
           </div>

           <div className="space-y-3">
              {transactions.map((t) => (
                <div key={t.id} className="bg-white p-4 rounded-3xl border border-slate-50 shadow-sm flex items-center justify-between group hover:border-blue-100 transition cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                        t.type === 'deposit' ? 'bg-emerald-50 text-emerald-600' : 
                        t.type === 'withdrawal' ? 'bg-blue-50 text-blue-600' :
                        t.type === 'payment' ? 'bg-amber-50 text-amber-600' : 'bg-red-50 text-red-600'
                      }`}>
                         {t.type === 'deposit' ? <ArrowDownCircle size={22} /> : 
                          t.type === 'withdrawal' ? <ArrowUpCircle size={22} /> : 
                          t.type === 'payment' ? <Lock size={22} /> : <AlertCircle size={22} />}
                      </div>
                      <div>
                         <p className="text-xs font-black text-slate-900">{t.description}</p>
                         <p className="text-[9px] font-bold text-slate-400">{t.date}</p>
                      </div>
                   </div>
                   <div className="text-left space-y-1">
                      <p className={`text-sm font-black ${t.amount > 0 ? 'text-emerald-600' : 'text-slate-900'}`}>
                         {t.amount > 0 ? '+' : ''}{t.amount.toLocaleString()} <span className="text-[10px]">ريال</span>
                      </p>
                      <div className={`text-[8px] font-black px-2 py-0.5 rounded-full uppercase text-center ${getStatusColor(t.status)}`}>
                         {t.status === 'completed' ? 'مكتمل' : t.status === 'pending' ? 'قيد التنفيذ' : t.status === 'reserved' ? 'محجوز' : 'فشل'}
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>

      {/* Deposit Modal */}
      {activeModal === 'deposit' && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full rounded-t-[3rem] p-8 space-y-8 shadow-2xl animate-in slide-in-from-bottom duration-500">
              <div className="flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-900">إيداع في المحفظة</h3>
                 <button onClick={() => setActiveModal(null)} className="p-2 bg-slate-100 rounded-full text-slate-400"><X size={20} /></button>
              </div>

              <div className="space-y-6">
                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">المبلغ المُراد إيداعه</label>
                    <div className="relative">
                       <input type="number" placeholder="0.00" className="w-full bg-slate-50 border-none rounded-[1.5rem] p-6 text-center text-3xl font-black text-blue-600 focus:bg-blue-50/50 transition outline-none" />
                       <span className="absolute right-6 top-1/2 -translate-y-1/2 text-slate-300 font-black">SAR</span>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">طريقة الإيداع</p>
                    <div className="grid grid-cols-1 gap-3">
                       {['بطاقة ائتمان/مدى', 'تحويل بنكي مباشر', 'Apple Pay / STC Pay'].map((m, i) => (
                         <button key={i} className="flex items-center justify-between p-5 rounded-2xl border border-slate-100 hover:border-blue-600 hover:bg-blue-50/30 transition group">
                            <div className="flex items-center gap-4">
                               {i === 0 ? <CreditCard size={20} className="text-blue-500" /> : i === 1 ? <Landmark size={20} className="text-emerald-500" /> : <Smartphone size={20} className="text-slate-900" />}
                               <span className="text-xs font-bold text-slate-700">{m}</span>
                            </div>
                            <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-blue-600 transition" />
                         </button>
                       ))}
                    </div>
                 </div>

                 <button onClick={() => setActiveModal(null)} className="w-full py-5 bg-blue-600 text-white rounded-[1.8rem] font-black text-lg shadow-xl shadow-blue-100 active:scale-95 transition">تأكيد عملية الإيداع</button>
              </div>
           </div>
        </div>
      )}

      {/* Withdraw Modal */}
      {activeModal === 'withdraw' && (
        <div className="fixed inset-0 z-[100] flex items-end justify-center p-0 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-300">
           <div className="bg-white w-full rounded-t-[3rem] p-8 space-y-8 shadow-2xl animate-in slide-in-from-bottom duration-500">
              <div className="flex items-center justify-between">
                 <h3 className="text-xl font-black text-slate-900">سحب من المحفظة</h3>
                 <button onClick={() => setActiveModal(null)} className="p-2 bg-slate-100 rounded-full text-slate-400"><X size={20} /></button>
              </div>

              <div className="space-y-6">
                 <div className="p-5 bg-blue-50 rounded-3xl border border-blue-100 flex justify-between items-center">
                    <span className="text-xs font-bold text-blue-900">الرصيد القابل للسحب</span>
                    <span className="text-lg font-black text-blue-600">٤٥,٢٥٠ ريال</span>
                 </div>

                 <div className="space-y-2">
                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">مبلغ السحب</label>
                    <input type="number" placeholder="0.00" className="w-full bg-slate-50 border-none rounded-[1.5rem] p-6 text-center text-3xl font-black text-slate-900 outline-none" />
                 </div>

                 <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">الحساب البنكي</p>
                    <select className="w-full bg-slate-50 border-none rounded-[1.5rem] p-5 text-sm font-bold outline-none">
                       <option>البنك الأهلي السعودي - SA0012...</option>
                       <option>مصرف الراجحي - SA0098...</option>
                       <option>+ إضافة حساب بنكي جديد</option>
                    </select>
                 </div>

                 <div className="flex gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                    <div className="flex-1 space-y-1">
                       <p className="text-[8px] font-black text-slate-400 uppercase">الرسوم الإضافية</p>
                       <p className="text-xs font-black text-emerald-600">مجاني (٠ ريال)</p>
                    </div>
                    <div className="flex-1 space-y-1">
                       <p className="text-[8px] font-black text-slate-400 uppercase">وقت المعالجة</p>
                       <p className="text-xs font-black text-slate-900">١ - ٣ أيام عمل</p>
                    </div>
                 </div>

                 <button onClick={() => setActiveModal(null)} className="w-full py-5 bg-slate-900 text-white rounded-[1.8rem] font-black text-lg shadow-xl active:scale-95 transition">تأكيد طلب السحب</button>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default DigitalWallet;
