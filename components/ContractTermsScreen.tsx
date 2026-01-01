
import React, { useState, useMemo } from 'react';
import { ArrowRight, MapPin, Search, CheckCircle2, AlertTriangle, FileText, ChevronLeft, ShieldCheck, RefreshCw, Landmark, Home } from 'lucide-react';
import { ContractDraft } from '../types';

interface ContractTermsScreenProps {
  draft: ContractDraft;
  onBack: () => void;
  onNext: (terms: any) => void;
}

const ContractTermsScreen: React.FC<ContractTermsScreenProps> = ({ draft, onBack, onNext }) => {
  const [address, setAddress] = useState({
    city: 'الرياض',
    district: '',
    street: '',
    buildingNo: '',
    deedNo: '',
  });

  const [geoStatus, setGeoStatus] = useState<'idle' | 'searching' | 'found' | 'error'>('idle');
  const [matchRate, setMatchRate] = useState(0);
  const [deedVerified, setDeedVerified] = useState(false);
  const [isVerifyingDeed, setIsVerifyingDeed] = useState(false);

  const handleGeoSearch = () => {
    setGeoStatus('searching');
    setTimeout(() => {
      setGeoStatus('found');
      setMatchRate(95);
    }, 2000);
  };

  const handleDeedVerify = () => {
    if (!address.deedNo) return;
    setIsVerifyingDeed(true);
    setTimeout(() => {
      setIsVerifyingDeed(false);
      setDeedVerified(true);
    }, 1500);
  };

  const canContinue = useMemo(() => {
    if (draft.type.includes('عقاري') || draft.type.includes('إيجار')) {
      return address.district && address.street && geoStatus === 'found' && (deedVerified || !address.deedNo);
    }
    return true;
  }, [address, geoStatus, deedVerified, draft.type]);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-300 pb-28">
      <div className="p-4 bg-white border-b sticky top-0 z-30 shadow-sm flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowRight size={20} /></button>
        <h1 className="text-lg font-black text-slate-900 tracking-tight">تفاصيل {draft.type}</h1>
      </div>

      <div className="p-6 flex-1 space-y-8 overflow-y-auto">
        <div className="space-y-1">
           <h2 className="text-2xl font-black text-slate-900 leading-tight">وصف نطاق العقد</h2>
           <p className="text-sm text-slate-500 font-medium">سيقوم المساعد بالتحقق من دقة البيانات جغرافياً ونظامياً.</p>
        </div>

        {/* 📍 Geographic Verification Section */}
        <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
           <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
              <MapPin size={16} className="text-blue-600" /> التحقق الجغرافي للعنوان
           </h3>
           
           <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="المدينة" value={address.city} onChange={e => setAddress({...address, city: e.target.value})} className="bg-slate-50 rounded-xl p-3 text-xs font-bold outline-none border border-transparent focus:border-blue-200" />
              <input type="text" placeholder="الحي" value={address.district} onChange={e => setAddress({...address, district: e.target.value})} className="bg-slate-50 rounded-xl p-3 text-xs font-bold outline-none border border-transparent focus:border-blue-200" />
           </div>
           <div className="grid grid-cols-2 gap-4">
              <input type="text" placeholder="الشارع" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="bg-slate-50 rounded-xl p-3 text-xs font-bold outline-none border border-transparent focus:border-blue-200" />
              <input type="text" placeholder="رقم المبنى" value={address.buildingNo} onChange={e => setAddress({...address, buildingNo: e.target.value})} className="bg-slate-50 rounded-xl p-3 text-xs font-bold outline-none border border-transparent focus:border-blue-200" />
           </div>

           <button 
             onClick={handleGeoSearch}
             className="w-full py-4 bg-slate-900 text-white rounded-2xl font-black text-xs shadow-xl active:scale-95 transition flex items-center justify-center gap-3"
           >
              {geoStatus === 'searching' ? <RefreshCw size={18} className="animate-spin" /> : <Search size={18} />}
              <span>🔍 البحث على الخريطة والتحقق</span>
           </button>

           {geoStatus === 'found' && (
             <div className="space-y-4 animate-in slide-in-from-top duration-500">
                <div className="aspect-video w-full bg-slate-100 rounded-3xl relative overflow-hidden border-2 border-slate-50 shadow-inner">
                   <div className="absolute inset-0 bg-[url('https://api.mapbox.com/styles/v1/mapbox/streets-v11/static/46.7385,24.7742,15/600x300?access_token=pk.placeholder')] bg-cover bg-center opacity-60" />
                   <div className="absolute inset-0 flex items-center justify-center">
                      <MapPin size={40} className="text-red-600 animate-bounce" fill="currentColor" />
                   </div>
                </div>
                <div className="p-4 bg-emerald-50 rounded-[1.5rem] border border-emerald-100 space-y-3">
                   <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-emerald-800">
                      <span>مطابقة العنوان الجغرافي</span>
                      <span>{matchRate}% ✓</span>
                   </div>
                   <div className="w-full h-1.5 bg-emerald-100 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500" style={{ width: `${matchRate}%` }} />
                   </div>
                </div>
             </div>
           )}
        </section>

        {/* 📄 Deed Verification Section (For Real Estate) */}
        {(draft.type.includes('عقاري') || draft.type.includes('إيجار')) && (
          <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
             <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                <FileText size={16} className="text-blue-600" /> التحقق من الصك الإلكتروني
             </h3>
             <div className="flex gap-2">
                <div className="flex-1 relative group">
                   <input 
                     type="text" 
                     value={address.deedNo}
                     onChange={e => setAddress({...address, deedNo: e.target.value})}
                     placeholder="رقم الصك (١٢ رقم)" 
                     className="w-full bg-slate-50 border-none rounded-xl p-4 pr-10 text-xs font-black outline-none border border-transparent focus:border-blue-200" 
                   />
                   <ShieldCheck size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300" />
                </div>
                <button 
                  onClick={handleDeedVerify}
                  disabled={isVerifyingDeed}
                  className="px-6 py-4 bg-blue-600 text-white rounded-xl font-black text-[10px] uppercase shadow-lg active:scale-95 transition"
                >
                   {isVerifyingDeed ? <RefreshCw size={14} className="animate-spin" /> : 'تحقق'}
                </button>
             </div>
             {deedVerified && (
               <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center gap-3 animate-in zoom-in">
                  <ShieldCheck size={20} className="text-blue-600" />
                  <div>
                     <p className="text-[10px] font-black text-blue-900 uppercase">الصك موجود ونشط ✓</p>
                     <p className="text-[9px] text-blue-700 font-bold mt-0.5">مطابقة العنوان مع الصك: ١٠٠٪</p>
                  </div>
               </div>
             )}
          </section>
        )}
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t z-20 shadow-2xl">
        <button
          onClick={() => onNext(address)}
          disabled={!canContinue}
          className={`w-full py-5 rounded-[1.8rem] font-black text-lg shadow-xl transition-all ${canContinue ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
        >
          التالي: رفع المستندات والأدلة
        </button>
      </div>
    </div>
  );
};

export default ContractTermsScreen;
