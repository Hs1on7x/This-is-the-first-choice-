
import React, { useState } from 'react';
import { ArrowRight, User, UserPlus, Mail, Phone, Building2, CheckCircle2, Search, X, ShieldCheck, CreditCard, ChevronLeft, Plus } from 'lucide-react';
import { ContractDraft, UserProfile, ContractParty } from '../types';

interface ContractPartiesSetupProps {
  draft: ContractDraft;
  user: UserProfile;
  onBack: () => void;
  onNext: (parties: ContractParty[]) => void;
}

const ContractPartiesSetup: React.FC<ContractPartiesSetupProps> = ({ draft, user, onBack, onNext }) => {
  const [parties, setParties] = useState<ContractParty[]>([
    { id: 'user', name: user.legalName || 'أنت', role: 'الطرف الأول', status: 'registered', isUser: true }
  ]);
  const [showAdd, setShowAdd] = useState(false);
  const [newParty, setNewParty] = useState({ name: '', email: '', role: 'الطرف الثاني' });
  const [searchQuery, setSearchQuery] = useState('');

  const addParty = () => {
    if (!newParty.name) return;
    const p: ContractParty = {
      id: Math.random().toString(36).substr(2, 9),
      name: newParty.name,
      email: newParty.email,
      role: newParty.role,
      status: 'pending',
      isUser: false
    };
    setParties([...parties, p]);
    setShowAdd(false);
    setNewParty({ name: '', email: '', role: 'الطرف الثاني' });
    setSearchQuery('');
  };

  const removeParty = (id: string) => {
    if (id === 'user') return;
    setParties(parties.filter(p => p.id !== id));
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-300 pb-20">
      {/* Progress Header (Screen 11) */}
      <div className="p-4 bg-white border-b sticky top-0 z-10 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
             <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
                <ArrowRight className="text-slate-700" />
             </button>
             <h1 className="text-lg font-black text-slate-900">أطراف العلاقة</h1>
          </div>
          <span className="text-xs font-bold text-blue-600">الخطوة ١ من ٥</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="w-1/5 h-full bg-blue-600 rounded-full transition-all duration-1000" />
        </div>
      </div>

      <div className="p-6 flex-1 space-y-8 overflow-y-auto">
        <div className="space-y-1">
           <h2 className="text-2xl font-black text-slate-900 leading-tight">من هم أطراف العقد؟</h2>
           <p className="text-sm text-slate-500">أضف الأطراف وحدد أدوارهم القانونية لبدء صياغة البنود.</p>
        </div>

        {/* Party List (Screen 11 Display) */}
        <div className="space-y-4">
          {parties.map((p) => (
            <div key={p.id} className="bg-white p-5 rounded-3xl border border-slate-100 shadow-sm flex items-center justify-between group animate-in slide-in-from-right duration-500">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center transition ${p.isUser ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                  {p.isUser ? <User size={24} /> : <UserPlus size={24} />}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-slate-900 text-sm">{p.name}</h4>
                    {p.status === 'registered' && <CheckCircle2 size={12} className="text-green-500" />}
                  </div>
                  <div className="flex items-center gap-1 mt-0.5">
                     <span className="text-[9px] font-black text-blue-600 bg-blue-50 px-2 py-0.5 rounded uppercase">{p.role}</span>
                     {p.status === 'pending' && <span className="text-[9px] font-bold text-amber-500 bg-amber-50 px-2 py-0.5 rounded uppercase">بانتظار الدعوة</span>}
                  </div>
                </div>
              </div>
              {!p.isUser && (
                <button onClick={() => removeParty(p.id)} className="p-2 text-slate-300 hover:text-red-500 transition active:scale-90">
                  <X size={18} />
                </button>
              )}
            </div>
          ))}

          {/* Add Form / Invitation (Screen 11 Action) */}
          {!showAdd ? (
            <button 
              onClick={() => setShowAdd(true)}
              className="w-full py-8 border-2 border-dashed border-slate-200 rounded-3xl text-slate-400 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/50 transition flex flex-col items-center gap-3 active:scale-95"
            >
              <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                 <Plus size={24} />
              </div>
              <span className="text-sm font-black">إضافة طرف آخر للعقد</span>
            </button>
          ) : (
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-blue-600 shadow-2xl shadow-blue-100 animate-in zoom-in duration-300 space-y-5">
              <div className="flex items-center justify-between">
                 <h3 className="font-black text-blue-900 text-sm">إضافة طرف جديد</h3>
                 <button onClick={() => setShowAdd(false)} className="text-slate-300 hover:text-slate-500"><X size={20} /></button>
              </div>
              
              <div className="space-y-4">
                <div className="relative group">
                   <input 
                     type="text" 
                     placeholder="ابحث بالاسم، البريد أو الهاتف..."
                     value={searchQuery}
                     onChange={(e) => {
                       setSearchQuery(e.target.value);
                       setNewParty({...newParty, name: e.target.value});
                     }}
                     className="w-full bg-slate-50 border-none rounded-2xl p-4 pr-12 text-sm focus:ring-4 focus:ring-blue-100 transition shadow-inner"
                   />
                   <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                </div>

                {searchQuery.length > 3 && (
                   <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 flex items-center justify-between animate-in fade-in duration-300">
                      <div className="flex items-center gap-3">
                         <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-slate-300"><User size={20} /></div>
                         <div>
                            <p className="text-xs font-bold text-slate-900">"{searchQuery}" غير مسجل</p>
                            <p className="text-[10px] text-slate-400">سيتم إرسال دعوة رسمية</p>
                         </div>
                      </div>
                      <button onClick={addParty} className="bg-blue-600 text-white px-4 py-1.5 rounded-lg text-[10px] font-black uppercase">دعوة</button>
                   </div>
                )}

                <div className="grid grid-cols-2 gap-3">
                   <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">الدور</label>
                      <select 
                        value={newParty.role}
                        onChange={(e) => setNewParty({...newParty, role: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-xl p-3 text-xs font-bold"
                      >
                        <option>الطرف الثاني</option>
                        <option>مستأجر</option>
                        <option>مؤجر</option>
                        <option>موظف</option>
                        <option>صاحب عمل</option>
                      </select>
                   </div>
                   <div className="space-y-1">
                      <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">البريد (اختياري)</label>
                      <input 
                        type="email" 
                        placeholder="name@mail.com"
                        value={newParty.email}
                        onChange={(e) => setNewParty({...newParty, email: e.target.value})}
                        className="w-full bg-slate-50 border-none rounded-xl p-3 text-xs font-bold"
                      />
                   </div>
                </div>

                <button 
                  onClick={addParty} 
                  disabled={!newParty.name}
                  className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-200 active:scale-95 transition disabled:bg-slate-200 disabled:text-slate-400"
                >
                  إضافة الطرف للعقد
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Security Alert (Screen 11 Footer Info) */}
        <div className="p-5 bg-blue-50/50 rounded-3xl border border-blue-100 flex gap-4">
          <ShieldCheck className="text-blue-600 shrink-0" size={24} />
          <div className="space-y-1">
             <p className="text-xs font-black text-blue-900">نظام توثيق الأطراف</p>
             <p className="text-[10px] text-blue-700 leading-relaxed font-medium">
               جميع الأطراف المضافة سيتطلب منهم توثيق هويتهم (KYC) قبل البدء بمرحلة التوقيع الرقمي لضمان الامتثال القانوني الكامل.
             </p>
          </div>
        </div>
      </div>

      {/* Primary Action Button */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t z-20 shadow-xl">
        <button
          onClick={() => onNext(parties)}
          disabled={parties.length < 2 || showAdd}
          className={`w-full py-4 rounded-3xl font-black text-lg shadow-xl transition-all ${parties.length >= 2 && !showAdd ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          التالي: بيانات العقد
        </button>
      </div>
    </div>
  );
};

export default ContractPartiesSetup;
