
import React, { useState, useEffect, useMemo } from 'react';
import { 
  ArrowRight, FileText, Clock, CreditCard, Sparkles, AlertCircle, 
  Home, Landmark, Briefcase, Users, Box, Hammer, MapPin, 
  Plus, Trash2, Info, ChevronDown, CheckCircle2, DollarSign, ChevronLeft
} from 'lucide-react';
import { ContractDraft, AccountType } from '../types';

interface ContractTermsScreenProps {
  draft: ContractDraft;
  onBack: () => void;
  onNext: (terms: any) => void;
}

const ContractTermsScreen: React.FC<ContractTermsScreenProps> = ({ draft, onBack, onNext }) => {
  const [formData, setFormData] = useState<any>({
    currency: 'SAR',
    // Real Estate defaults
    propertyType: 'apartment',
    facilities: [],
    paymentMethod: 'monthly',
    // Services/Supply defaults
    items: [{ id: '1', name: '', qty: 1, price: 0 }],
    milestones: [{ id: '1', title: '', date: '' }],
    // Labor defaults
    contractMode: 'fixed',
    allowances: [],
    workingDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu'],
    // General
    subject: '',
    startDate: '',
    duration: '',
    amount: 0,
    specialConditions: ''
  });

  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);

  // Auto-calculate logic
  const totalPrice = useMemo(() => {
    if (draft.type === 'عقد توريد' || draft.type === 'عقد خدمات') {
      return formData.items.reduce((acc: number, item: any) => acc + (item.qty * item.price), 0);
    }
    return formData.amount || 0;
  }, [formData.items, formData.amount, draft.type]);

  useEffect(() => {
    // Dynamic AI Suggestions based on type
    const suggestions: Record<string, string[]> = {
      'عقد عقاري': [
        'نقترح إضافة بند يحدد مسؤولية الصيانة الدورية للعقار.',
        'القيمة الإيجارية المتوسطة في هذا الحي هي ٤٥,٠٠٠ ريال.',
        'تأكد من إدراج رقم الصك الإلكتروني لضمان التوثيق عبر منصة إيجار.'
      ],
      'عقد عمل': [
        'بناءً على نظام العمل، الحد الأدنى للإجازة السنوية هو ٢١ يوماً.',
        'يجب ذكر فترة التجربة بوضوح (بحد أقصى ٩٠ يوماً).',
        'نقترح إضافة بند عدم المنافسة إذا كانت الوظيفة قيادية.'
      ],
      'عقد توريد': [
        'يُفضل تحديد الغرامة اليومية عند تأخير التوريد.',
        'تأكد من تحديد مكان التسليم (Incoterms) بوضوح.',
        'نقترح تقسيم الدفعات بناءً على وصول الشحنات.'
      ]
    };
    setAiSuggestions(suggestions[draft.type || ''] || [
      'تأكد من تحديد القانون الواجب التطبيق وآلية فض النزاعات.',
      'نقترح إضافة بند السرية (Non-Disclosure) لحماية بياناتك.'
    ]);
  }, [draft.type]);

  const updateItem = (id: string, field: string, value: any) => {
    setFormData((prev: any) => ({
      ...prev,
      items: prev.items.map((item: any) => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addItem = () => setFormData((prev: any) => ({
    ...prev,
    items: [...prev.items, { id: Math.random().toString(), name: '', qty: 1, price: 0 }]
  }));

  const removeItem = (id: string) => setFormData((prev: any) => ({
    ...prev,
    items: prev.items.filter((i: any) => i.id !== id)
  }));

  const canContinue = useMemo(() => {
    if (draft.type === 'عقد عمل') return formData.subject && formData.startDate;
    if (draft.type === 'عقد عقاري') return formData.city && formData.amount > 0;
    return formData.subject?.length > 5;
  }, [formData, draft.type]);

  const renderRealEstateForm = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <section className="space-y-4">
        <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
          <MapPin size={14} /> معلومات العقار
        </h3>
        <div className="grid grid-cols-2 gap-3">
          {['شقة', 'فيلا', 'أرض', 'محل تجاري'].map(type => (
            <button
              key={type}
              type="button"
              onClick={() => setFormData({...formData, propertyType: type})}
              className={`p-3 rounded-xl border text-[10px] font-bold transition-all ${formData.propertyType === type ? 'border-blue-600 bg-blue-50 text-blue-900 shadow-sm' : 'bg-white text-slate-500'}`}
            >
              {type}
            </button>
          ))}
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input 
            type="text" 
            placeholder="المدينة"
            value={formData.city}
            onChange={e => setFormData({...formData, city: e.target.value})}
            className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-blue-100"
          />
          <input 
            type="text" 
            placeholder="الحي"
            value={formData.district}
            onChange={e => setFormData({...formData, district: e.target.value})}
            className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-blue-100"
          />
        </div>
        <textarea 
          placeholder="وصف العقار ومواصفاته..."
          className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-blue-100 resize-none h-20"
        />
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <input type="number" placeholder="المساحة (م²)" className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none" />
            <span className="absolute left-3 top-3 text-[8px] text-slate-400 font-bold uppercase">M²</span>
          </div>
          <input type="text" placeholder="رقم الصك الإلكتروني" className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none" />
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
          <CreditCard size={14} /> الشروط المالية
        </h3>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <input 
              type="number" 
              placeholder="القيمة"
              value={formData.amount}
              onChange={e => setFormData({...formData, amount: parseFloat(e.target.value)})}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none"
            />
            <DollarSign className="absolute left-3 top-3 text-slate-300" size={14} />
          </div>
          <select className="bg-white border border-slate-200 rounded-xl px-4 text-xs font-bold outline-none">
            <option>SAR</option>
            <option>USD</option>
          </select>
        </div>
        <div className="grid grid-cols-3 gap-2">
          {['شهري', 'سنوي', 'دفعات'].map(method => (
            <button
              key={method}
              type="button"
              onClick={() => setFormData({...formData, paymentMethod: method})}
              className={`py-2 rounded-lg text-[10px] font-bold border ${formData.paymentMethod === method ? 'bg-blue-600 text-white' : 'bg-white text-slate-400'}`}
            >
              {method}
            </button>
          ))}
        </div>
      </section>
    </div>
  );

  const renderLaborForm = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <section className="space-y-4">
        <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
          <Briefcase size={14} /> تفاصيل الوظيفة
        </h3>
        <input 
          type="text" 
          placeholder="المسمى الوظيفي (مثال: مدير تقني)"
          value={formData.subject}
          onChange={e => setFormData({...formData, subject: e.target.value})}
          className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none focus:ring-2 focus:ring-blue-100"
        />
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={() => setFormData({...formData, contractMode: 'fixed'})}
            className={`p-3 rounded-xl border text-[10px] font-bold ${formData.contractMode === 'fixed' ? 'border-blue-600 bg-blue-50 text-blue-900' : 'bg-white'}`}
          >
            محدد المدة
          </button>
          <button
            type="button"
            onClick={() => setFormData({...formData, contractMode: 'open'})}
            className={`p-3 rounded-xl border text-[10px] font-bold ${formData.contractMode === 'open' ? 'border-blue-600 bg-blue-50 text-blue-900' : 'bg-white'}`}
          >
            غير محدد
          </button>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <div className="space-y-1">
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest pr-1">تاريخ المباشرة</label>
            <input 
              type="date"
              value={formData.startDate}
              onChange={e => setFormData({...formData, startDate: e.target.value})}
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none"
            />
          </div>
          <div className="space-y-1">
            <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest pr-1">ساعات العمل</label>
            <input 
              type="text"
              placeholder="٠٩:٠٠ - ١٧:٠٠"
              className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none"
            />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
          <DollarSign size={14} /> الراتب والمزايا
        </h3>
        <div className="relative">
          <input 
            type="number" 
            placeholder="الراتب الأساسي"
            value={formData.amount}
            onChange={e => setFormData({...formData, amount: parseFloat(e.target.value)})}
            className="w-full bg-white border border-slate-200 rounded-xl p-3 text-xs outline-none"
          />
          <span className="absolute left-3 top-3 text-[10px] font-black text-slate-300">SAR</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {['تأمين طبي', 'سكن', 'مواصلات', 'تذاكر طيران'].map(perk => (
            <button
              key={perk}
              type="button"
              className="px-3 py-1.5 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-600 border border-slate-200"
            >
              + {perk}
            </button>
          ))}
        </div>
      </section>
    </div>
  );

  const renderSupplyForm = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <section className="space-y-4">
        <h3 className="text-xs font-black text-blue-600 uppercase tracking-widest flex items-center gap-2">
          <Box size={14} /> قائمة المنتجات والتوريد
        </h3>
        <div className="space-y-3">
          {formData.items.map((item: any) => (
            <div key={item.id} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm space-y-3 animate-in slide-in-from-right duration-300">
              <div className="flex items-center justify-between">
                <input 
                  type="text" 
                  placeholder="اسم المنتج"
                  value={item.name}
                  onChange={e => updateItem(item.id, 'name', e.target.value)}
                  className="flex-1 bg-transparent text-sm font-bold outline-none placeholder:font-normal"
                />
                {formData.items.length > 1 && (
                  <button onClick={() => removeItem(item.id)} className="text-red-400 p-1 hover:bg-red-50 rounded-lg transition">
                    <Trash2 size={16} />
                  </button>
                )}
              </div>
              <div className="grid grid-cols-3 gap-2">
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">الكمية</label>
                  <input 
                    type="number" 
                    value={item.qty}
                    onChange={e => updateItem(item.id, 'qty', parseInt(e.target.value) || 0)}
                    className="w-full bg-slate-50 rounded-lg p-2 text-xs font-bold outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">السعر</label>
                  <input 
                    type="number" 
                    value={item.price}
                    onChange={e => updateItem(item.id, 'price', parseFloat(e.target.value) || 0)}
                    className="w-full bg-slate-50 rounded-lg p-2 text-xs font-bold outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-[8px] font-black text-slate-400 uppercase tracking-widest">الإجمالي</label>
                  <div className="w-full bg-blue-50 text-blue-700 rounded-lg p-2 text-xs font-black">
                    {(item.qty * item.price).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          ))}
          <button 
            onClick={addItem}
            className="w-full py-3 border-2 border-dashed border-slate-200 rounded-2xl text-slate-400 text-xs font-bold hover:border-blue-300 hover:text-blue-600 transition flex items-center justify-center gap-2"
          >
            <Plus size={16} /> إضافة منتج جديد
          </button>
        </div>
      </section>

      <section className="p-4 bg-slate-900 rounded-3xl text-white shadow-xl">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-[10px] font-black uppercase tracking-widest text-slate-400">القيمة الإجمالية للعقد</p>
            <h4 className="text-2xl font-black">{totalPrice.toLocaleString()} <span className="text-sm font-bold">SAR</span></h4>
          </div>
          <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
            <CreditCard size={24} />
          </div>
        </div>
      </section>
    </div>
  );

  const renderDefaultForm = () => (
    <div className="space-y-6 animate-in fade-in duration-500">
      <section className="space-y-2">
        <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">موضوع العقد والغرض منه</label>
        <div className="relative">
          <input 
            type="text" 
            value={formData.subject}
            onChange={e => setFormData({...formData, subject: e.target.value})}
            placeholder="أدخل موضوع العقد بوضوح..."
            className="w-full bg-white border border-slate-200 rounded-2xl p-4 pr-12 text-sm focus:ring-4 focus:ring-blue-100 transition outline-none shadow-sm"
          />
          <FileText className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={20} />
        </div>
      </section>

      <div className="grid grid-cols-2 gap-4">
        <section className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">مدة العقد</label>
          <div className="relative">
            <input 
              type="text" 
              placeholder="مثال: سنة"
              className="w-full bg-white border border-slate-200 rounded-2xl p-4 pr-11 text-sm outline-none"
            />
            <Clock className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          </div>
        </section>
        <section className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">القيمة</label>
          <div className="relative">
            <input 
              type="number" 
              placeholder="المبلغ"
              className="w-full bg-white border border-slate-200 rounded-2xl p-4 pr-11 text-sm outline-none"
            />
            <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-300" size={18} />
          </div>
        </section>
      </div>
    </div>
  );

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-300 pb-28">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
             <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
                <ArrowRight className="text-slate-700" />
             </button>
             <h1 className="text-lg font-black text-slate-900">تفاصيل {draft.type}</h1>
          </div>
          <span className="text-xs font-bold text-blue-600">الخطوة ٢ من ٥</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="w-2/5 h-full bg-blue-600 rounded-full transition-all duration-1000" />
        </div>
      </div>

      <div className="p-6 flex-1 space-y-8 overflow-y-auto">
        <div className="space-y-1">
           <h2 className="text-2xl font-black text-slate-900 leading-tight">صِف نطاق العلاقة</h2>
           <p className="text-sm text-slate-500 font-medium">أدخل البيانات الأساسية ليتمكن المساعد من توليد بنود دقيقة.</p>
        </div>

        {/* Dynamic Form Content */}
        {draft.type === 'عقد عقاري' && renderRealEstateForm()}
        {draft.type === 'عقد عمل' && renderLaborForm()}
        {(draft.type === 'عقد توريد' || draft.type === 'عقد خدمات') && renderSupplyForm()}
        {draft.type !== 'عقد عقاري' && draft.type !== 'عقد عمل' && draft.type !== 'عقد توريد' && draft.type !== 'عقد خدمات' && renderDefaultForm()}

        {/* AI Suggestions Panel */}
        <section className="space-y-4">
          <div className="flex items-center gap-2 px-1">
            <Sparkles size={16} className="text-amber-500" />
            <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest">اقتراحات المساعد الذكي</h3>
          </div>
          <div className="space-y-3">
            {aiSuggestions.map((suggestion, idx) => (
              <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-100 shadow-sm flex gap-3 group hover:border-blue-200 transition cursor-default">
                <div className="w-8 h-8 rounded-lg bg-blue-50 flex items-center justify-center shrink-0 text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition">
                  <Info size={16} />
                </div>
                <p className="text-[10px] text-slate-600 leading-relaxed font-medium">{suggestion}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Special Conditions */}
        <section className="space-y-2">
          <label className="text-xs font-black text-slate-400 uppercase tracking-widest px-1">شروط أو ملاحظات إضافية</label>
          <textarea 
            rows={4}
            value={formData.specialConditions}
            onChange={e => setFormData({...formData, specialConditions: e.target.value})}
            placeholder="أضف أي متطلبات خاصة ترغب بذكرها في العقد..."
            className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-xs font-medium focus:ring-4 focus:ring-blue-100 transition outline-none resize-none shadow-sm placeholder:font-normal"
          />
        </section>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t z-40 shadow-[0_-10px_30px_-15px_rgba(0,0,0,0.1)]">
        <div className="flex gap-3">
          <button
            onClick={() => onNext({...formData, totalAmount: totalPrice})}
            disabled={!canContinue}
            className={`flex-[3] py-4 rounded-[1.5rem] font-black text-lg shadow-xl transition-all ${canContinue ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
          >
            التالي: رفع المستندات والأدلة
          </button>
          <button className="flex-1 bg-slate-50 text-slate-500 rounded-[1.5rem] font-bold text-[10px] flex items-center justify-center hover:bg-slate-100 transition active:scale-95">
            حفظ مسودة
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractTermsScreen;
