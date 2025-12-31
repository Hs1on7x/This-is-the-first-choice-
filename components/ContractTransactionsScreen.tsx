
import React from 'react';
import { ArrowRight, Download, FileText, Filter, MoreVertical, Landmark, CreditCard, ShieldCheck } from 'lucide-react';

interface ContractTransactionsScreenProps {
  contractName: string;
  onBack: () => void;
}

const ContractTransactionsScreen: React.FC<ContractTransactionsScreenProps> = ({ contractName, onBack }) => {
  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-300 overflow-y-auto pb-24">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-20 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowRight size={20} /></button>
          <h1 className="text-lg font-black text-slate-900 leading-tight">المعاملات المالية للعقد</h1>
        </div>
        <button className="p-2 text-blue-600"><Download size={20} /></button>
      </div>

      <div className="p-6 space-y-8">
        {/* Financial Summary Dashboard */}
        <section className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl space-y-8 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full -mr-16 -mt-16 blur-2xl" />
           <div className="flex justify-between items-center relative z-10 border-b border-white/10 pb-6">
              <div className="space-y-1">
                 <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">إجمالي قيمة العقد</p>
                 <h2 className="text-3xl font-black">٥٧,٥٠٠ <span className="text-xs font-bold text-blue-400 mr-1">SAR</span></h2>
              </div>
              <div className="w-14 h-14 bg-white/5 rounded-2xl flex items-center justify-center backdrop-blur-md border border-white/10 shadow-2xl group-hover:rotate-12 transition-transform duration-500">
                 <Landmark size={28} className="text-blue-400" />
              </div>
           </div>
           
           <div className="grid grid-cols-2 gap-8 relative z-10">
              <div className="space-y-1">
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">تم دفعه (٧٠٪)</p>
                 <p className="text-sm font-black text-emerald-400">٣٥,٠٠٠ ريال</p>
              </div>
              <div className="space-y-1 text-left">
                 <p className="text-[9px] font-black text-slate-500 uppercase tracking-widest">في الضمان</p>
                 <p className="text-sm font-black text-blue-400">٣٥,٠٠٠ ريال</p>
              </div>
           </div>
        </section>

        {/* Transaction History List */}
        <section className="space-y-5">
           <div className="flex justify-between items-center px-1">
              <h3 className="font-black text-slate-900 text-sm uppercase tracking-widest">السجل المالي الكامل</h3>
              <button className="p-2 text-slate-400"><Filter size={18} /></button>
           </div>

           <div className="space-y-3">
              {[
                /* Fixed syntax error: replaced Eastern Arabic numerals with standard ones */
                { label: 'دفع - الدفعة ١', amount: -23000, date: '١٥ يناير، ١٠:٣٠ ص', type: 'payment', status: 'completed' },
                { label: 'دفع - الدفعة ٢', amount: -17250, date: '١٥ فبراير، ٠٩:١٥ ص', type: 'payment', status: 'completed' },
                { label: 'رسوم الضمان (٢٪)', amount: -700, date: '١٥ فبراير، ٠٩:١٦ ص', type: 'fee', status: 'completed' }
              ].map((tx, idx) => (
                <div key={idx} className="bg-white p-5 rounded-3xl border border-slate-50 shadow-sm flex items-center justify-between group hover:border-blue-100 transition cursor-pointer">
                   <div className="flex items-center gap-4">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-inner ${tx.type === 'payment' ? 'bg-blue-50 text-blue-600' : 'bg-slate-50 text-slate-400'}`}>
                         {tx.type === 'payment' ? <CreditCard size={20} /> : <FileText size={20} />}
                      </div>
                      <div>
                         <p className="text-xs font-black text-slate-800">{tx.label}</p>
                         <p className="text-[9px] text-slate-400 font-bold mt-0.5 uppercase">{tx.date}</p>
                      </div>
                   </div>
                   <div className="text-left space-y-1">
                      <p className="text-sm font-black text-slate-900">{tx.amount.toLocaleString()} ريال</p>
                      <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">مكتمل</span>
                   </div>
                </div>
              ))}
           </div>
        </section>
      </div>

      {/* Sticky Footer Export */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t z-20 flex gap-3 shadow-2xl">
         <button className="flex-1 py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-sm active:scale-95 transition flex items-center justify-center gap-2">
            <Download size={18} /> تصدير الكشف كـ PDF
         </button>
         <button className="px-6 py-4 bg-slate-100 text-slate-600 rounded-[1.5rem] font-black text-sm hover:bg-slate-200 transition">تحميل الإيصالات</button>
      </div>
    </div>
  );
};

export default ContractTransactionsScreen;
