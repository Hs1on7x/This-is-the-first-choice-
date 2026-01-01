
import React, { useState, useMemo } from 'react';
import { ArrowRight, User, UserPlus, Search, X, CheckCircle2, Star, AlertCircle, ChevronLeft } from 'lucide-react';
import { ContractDraft, UserProfile, ContractParty, ScreenType } from '../types';

interface ContractPartiesSetupProps {
  draft: ContractDraft;
  user: UserProfile;
  onBack: () => void;
  onNext: (parties: ContractParty[]) => void;
  onNavigate: (screen: ScreenType, data?: any) => void;
}

const ContractPartiesSetup: React.FC<ContractPartiesSetupProps> = ({ draft, user, onBack, onNext, onNavigate }) => {
  // Roles mapping based on contract type scenario
  const rolesByContract: Record<string, string[]> = {
    'عقد عقاري': ['مالك/مؤجر', 'مستأجر'],
    'عقد إيجار عقاري': ['مالك/مؤجر', 'مستأجر'],
    'عقد خدمات': ['مقدم الخدمة', 'العميل'],
    'عقد عمل': ['صاحب العمل', 'موظف'],
    'عقد توريد': ['المورد (البائع)', 'المشتري'],
    'عقد شراكة': ['شريك'],
    'عقد مقاولة': ['المقاول', 'صاحب المشروع'],
    'عقد استشارات': ['المستشار', 'طالب الاستشارة'],
  };

  const currentTypeRoles = rolesByContract[draft.type] || ['طرف أول', 'طرف ثاني'];

  const [parties, setParties] = useState<ContractParty[]>(
    draft.parties.length > 0 ? draft.parties : [
      { id: 'user', name: user.legalName || 'أنت', role: 'الطرف الأول', specificRole: '', status: 'registered', isUser: true }
    ]
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [showAdd, setShowAdd] = useState(false);
  const [manualEntry, setManualEntry] = useState({ name: '', phone: '', specificRole: '' });

  // Auto-pairing logic for two-party contracts
  const handleRoleSelection = (partyId: string, role: string) => {
    setParties(prev => {
      const updated = prev.map(p => p.id === partyId ? { ...p, specificRole: role } : p);
      
      // If exactly 2 parties and opposite roles exist
      if (updated.length === 2 && currentTypeRoles.length === 2) {
        const otherParty = updated.find(p => p.id !== partyId);
        const oppositeRole = currentTypeRoles.find(r => r !== role);
        if (otherParty && oppositeRole && !otherParty.specificRole) {
           return updated.map(p => p.id !== partyId ? { ...p, specificRole: oppositeRole } : p);
        }
      }
      return updated;
    });
  };

  const validation = useMemo(() => {
    if (parties.length < 2) return { valid: false, msg: 'يجب إضافة طرفين على الأقل للمتابعة.' };
    const missingRole = parties.some(p => !p.specificRole);
    if (missingRole) return { valid: false, msg: 'يرجى تحديد دور كل طرف في العقد.' };
    
    // Integrity check (not same roles)
    if (currentTypeRoles.length === 2 && parties.length === 2) {
      if (parties[0].specificRole === parties[1].specificRole) {
        return { valid: false, msg: 'لا يمكن أن يحمل الطرفان نفس الدور القانوني.' };
      }
    }
    
    return { valid: true, msg: 'الأدوار متكاملة وجاهزة للمرحلة التالية ✓' };
  }, [parties, currentTypeRoles]);

  const mockSearchResult: ContractParty | null = searchQuery.includes('محمد') ? {
    id: 'p-882',
    name: 'محمد أحمد السعيد',
    role: 'الطرف الثاني',
    specificRole: '',
    status: 'registered',
    isUser: false,
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=محمد',
    rating: 4.6,
    completionRate: 87,
    contractCount: 23
  } : null;

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-300 pb-28">
      <div className="p-4 bg-white border-b sticky top-0 z-30 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowRight size={20} /></button>
          <h1 className="text-lg font-black text-slate-900 tracking-tight">أطراف العقد</h1>
        </div>
      </div>

      <div className="p-6 flex-1 space-y-8 overflow-y-auto">
        <div className="space-y-1">
           <h2 className="text-2xl font-black text-slate-900 leading-tight">من هم أطراف العقد؟</h2>
           <p className="text-sm text-slate-500 font-medium">حدد أدوار الأطراف لضمان صياغة حقوقية دقيقة.</p>
        </div>

        <div className="space-y-4">
          {parties.map((p) => (
            <div key={p.id} className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-5 animate-in slide-in-from-right relative group">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition overflow-hidden shadow-inner ${p.isUser ? 'bg-blue-600 text-white' : 'bg-slate-50 text-slate-400'}`}>
                    {p.avatar ? <img src={p.avatar} className="w-full h-full object-cover" /> : <User size={28} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-black text-slate-900 text-sm">{p.name}</h4>
                      {p.status === 'registered' && <CheckCircle2 size={12} className="text-green-500" />}
                    </div>
                    <span className="text-[9px] font-black text-slate-400 bg-slate-50 px-2 py-0.5 rounded uppercase tracking-widest">{p.role} {p.isUser && '(أنت)'}</span>
                  </div>
                </div>
                {!p.isUser && (
                  <button onClick={() => setParties(parties.filter(x => x.id !== p.id))} className="p-2 text-slate-300 hover:text-red-500 transition"><X size={20} /></button>
                )}
              </div>

              {/* Role Selection */}
              <div className="space-y-3 pt-3 border-t border-slate-50">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">اختر الدور في العقد:</p>
                <div className="flex flex-wrap gap-2">
                  {currentTypeRoles.map(role => (
                    <button
                      key={role}
                      onClick={() => handleRoleSelection(p.id, role)}
                      className={`px-4 py-2 rounded-xl text-[11px] font-bold border-2 transition-all ${p.specificRole === role ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'bg-white border-slate-100 text-slate-500'}`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          ))}

          {!showAdd ? (
            <button 
              onClick={() => setShowAdd(true)}
              className="w-full py-10 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-slate-400 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/30 transition-all flex flex-col items-center gap-3 active:scale-[0.98]"
            >
              <UserPlus size={32} />
              <span className="text-sm font-black">إضافة طرف ثانٍ</span>
            </button>
          ) : (
            <div className="bg-white p-6 rounded-[2.5rem] border-2 border-blue-600 shadow-2xl space-y-6 animate-in zoom-in">
              <div className="flex items-center justify-between">
                 <h3 className="font-black text-blue-900 text-sm">البحث بالبريد أو الهاتف</h3>
                 <button onClick={() => setShowAdd(false)} className="text-slate-300"><X size={20} /></button>
              </div>
              
              <div className="space-y-4">
                <div className="relative">
                   <input 
                     type="text" 
                     placeholder="بحث..."
                     value={searchQuery}
                     onChange={(e) => setSearchQuery(e.target.value)}
                     className="w-full bg-slate-50 border-none rounded-2xl p-4 pr-12 text-sm font-medium focus:ring-4 focus:ring-blue-100 transition shadow-inner"
                   />
                   <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                </div>

                {mockSearchResult && (
                  <div className="p-5 bg-blue-50/50 border border-blue-100 rounded-[2rem] space-y-5 animate-in slide-in-from-top">
                     <div className="flex items-center gap-4">
                        <img src={mockSearchResult.avatar} className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm" alt="P" />
                        <div className="flex-1">
                           <div className="flex items-center gap-2">
                              <h4 className="font-black text-slate-900 text-sm">{mockSearchResult.name}</h4>
                              <CheckCircle2 size={12} className="text-emerald-500" />
                           </div>
                           <div className="flex items-center gap-3 mt-1">
                              <div className="flex items-center gap-1 text-amber-500 font-black text-[10px]">
                                 <Star size={10} fill="currentColor" /> {mockSearchResult.rating}
                              </div>
                              <span className="text-[10px] font-black text-slate-400 uppercase tracking-tighter">موثق ✓</span>
                           </div>
                        </div>
                     </div>
                     <button 
                       onClick={() => { setParties([...parties, { ...mockSearchResult }]); setShowAdd(false); setSearchQuery(''); }}
                       className="w-full py-3 bg-blue-600 text-white rounded-xl text-[10px] font-black uppercase shadow-lg active:scale-95 transition"
                     >
                        إضافة كطرف
                     </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Validation Feedback */}
        <div className={`p-6 rounded-[2rem] border flex gap-4 transition-all duration-500 shadow-sm ${validation.valid ? 'bg-emerald-50 border-emerald-100 text-emerald-900' : 'bg-blue-50 border-blue-100 text-blue-900'}`}>
          <div className="shrink-0">
             {validation.valid ? <CheckCircle2 size={24} className="text-emerald-600" /> : <AlertCircle size={24} className="text-blue-600" />}
          </div>
          <div className="space-y-1">
             <p className="text-xs font-black uppercase tracking-widest">نظام تكامل الأدوار</p>
             <p className="text-[11px] leading-relaxed font-bold">{validation.msg}</p>
          </div>
        </div>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t z-20 shadow-2xl">
        <button
          onClick={() => onNext(parties)}
          disabled={!validation.valid}
          className={`w-full py-5 rounded-[1.8rem] font-black text-lg shadow-xl transition-all ${validation.valid ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          التالي: بيانات {draft.type}
        </button>
      </div>
    </div>
  );
};

export default ContractPartiesSetup;
