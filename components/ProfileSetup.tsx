
import React, { useState } from 'react';
import { AlertCircle, ChevronLeft, Scale, Briefcase, Gavel, Home, Users, Landmark } from 'lucide-react';
import { AccountType } from '../types';

interface ProfileSetupProps {
  accountType: AccountType;
  onComplete: (data: any) => void;
  onSkip: () => void;
}

const ProfileSetup: React.FC<ProfileSetupProps> = ({ accountType, onComplete, onSkip }) => {
  const [formData, setFormData] = useState({
    legalName: '',
    country: 'المملكة العربية السعودية',
    city: '',
    companyName: '',
    crNumber: '',
    foundationDate: '',
    interests: [] as string[]
  });

  const toggleInterest = (id: string) => {
    setFormData(prev => ({
      ...prev,
      interests: prev.interests.includes(id) 
        ? prev.interests.filter(i => i !== id)
        : [...prev.interests, id]
    }));
  };

  const interests = [
    { id: 'contracts', label: 'إدارة العقود', icon: <Scale size={20} /> },
    { id: 'consulting', label: 'الاستشارات القانونية', icon: <Gavel size={20} /> },
    { id: 'disputes', label: 'حل النزاعات', icon: <Landmark size={20} /> },
    { id: 'realestate', label: 'إدارة العقارات', icon: <Home size={20} /> },
    { id: 'work', label: 'علاقات العمل', icon: <Users size={20} /> },
    { id: 'partnership', label: 'الشراكات التجارية', icon: <Briefcase size={20} /> },
  ];

  const canContinue = formData.legalName.length >= 10 && formData.city && (accountType === AccountType.INDIVIDUAL || (formData.companyName && formData.crNumber));

  return (
    <div className="flex-1 flex flex-col animate-in fade-in duration-500">
      {/* Progress */}
      <div className="p-4 bg-white border-b sticky top-0 z-10">
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-blue-600">الخطوة 1 من 2: الملف القانوني</span>
          <span className="text-xs font-bold text-slate-400">50%</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="w-1/2 h-full bg-blue-600 rounded-full" />
        </div>
      </div>

      <div className="p-6 flex-1 space-y-8 pb-32">
        <div className="space-y-1">
          <h1 className="text-2xl font-bold text-slate-900">أكمل ملفك القانوني</h1>
          <p className="text-slate-500">هذه المعلومات ستظهر في جميع العقود والمستندات الرسمية</p>
        </div>

        {/* Info Warning */}
        <div className="p-4 bg-amber-50 rounded-2xl border border-amber-100 flex gap-4">
          <AlertCircle className="text-amber-500 shrink-0" size={24} />
          <div className="space-y-1">
            <p className="text-sm font-bold text-amber-900">تنبيه هام</p>
            <p className="text-xs text-amber-800 leading-relaxed">
              هذه المعلومات ستكون مرجعك القانوني الدائم. يمكنك تعديلها لاحقاً لكن التعديلات تتطلب إعادة توثيق رسمية.
            </p>
          </div>
        </div>

        <div className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-bold text-slate-700">الاسم الكامل (كما يظهر في الهوية)</label>
            <input 
              type="text" 
              value={formData.legalName}
              onChange={(e) => setFormData({...formData, legalName: e.target.value})}
              placeholder="مثال: محمد بن عبدالله بن عبدالعزيز آل سعود"
              className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 focus:ring-2 focus:ring-blue-100 transition"
            />
            <p className="text-[10px] text-slate-400">يجب أن يطابق الاسم في وثائق الهوية الرسمية</p>
          </div>

          {accountType === AccountType.COMPANY && (
            <div className="space-y-4 pt-4 border-t animate-in slide-in-from-top duration-300">
              <h3 className="font-bold text-blue-900">بيانات الشركة</h3>
              <div className="grid grid-cols-1 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700">الاسم التجاري</label>
                  <input 
                    type="text" 
                    value={formData.companyName}
                    onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                    placeholder="شركة ..."
                    className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">رقم السجل التجاري</label>
                    <input 
                      type="text" 
                      value={formData.crNumber}
                      onChange={(e) => setFormData({...formData, crNumber: e.target.value})}
                      placeholder="1010XXXXXX"
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700">تاريخ التأسيس</label>
                    <input 
                      type="date" 
                      value={formData.foundationDate}
                      onChange={(e) => setFormData({...formData, foundationDate: e.target.value})}
                      className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4 text-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">الدولة</label>
              <select 
                value={formData.country}
                onChange={(e) => setFormData({...formData, country: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4"
              >
                <option>المملكة العربية السعودية</option>
                <option>الإمارات العربية المتحدة</option>
                <option>الكويت</option>
                <option>قطر</option>
                <option>مصر</option>
              </select>
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-slate-700">المدينة</label>
              <select 
                value={formData.city}
                onChange={(e) => setFormData({...formData, city: e.target.value})}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-4"
              >
                <option value="">اختر المدينة</option>
                <option>الرياض</option>
                <option>جدة</option>
                <option>الدمام</option>
                <option>المدينة المنورة</option>
              </select>
            </div>
          </div>

          <div className="space-y-4 pt-4 border-t">
            <label className="text-sm font-bold text-slate-700">ما هي اهتماماتك الرئيسية؟ (اختر واحداً أو أكثر)</label>
            <div className="grid grid-cols-2 gap-3">
              {interests.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => toggleInterest(item.id)}
                  className={`flex items-center gap-3 p-3 rounded-xl border transition-all text-right ${formData.interests.includes(item.id) ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm' : 'border-slate-100 bg-slate-50 text-slate-500 hover:border-slate-200'}`}
                >
                  <span className={formData.interests.includes(item.id) ? 'text-blue-600' : 'text-slate-400'}>
                    {item.icon}
                  </span>
                  <span className="text-xs font-bold leading-tight">{item.label}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating Actions */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-gradient-to-t from-white via-white to-transparent pt-12">
        <div className="space-y-4">
          <button
            onClick={() => onComplete(formData)}
            disabled={!canContinue}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-xl transition-all ${canContinue ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            التالي
          </button>
          <button
            onClick={onSkip}
            className="w-full py-2 text-slate-400 font-bold hover:text-slate-600 transition"
          >
            تخطي الآن
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileSetup;
