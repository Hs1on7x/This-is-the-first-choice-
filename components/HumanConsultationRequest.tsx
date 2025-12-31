
import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Phone, Video, FileText, ChevronLeft } from 'lucide-react';

interface HumanConsultationRequestProps {
  onBack: () => void;
  onSelectDirect: (details: any) => void;
}

const HumanConsultationRequest: React.FC<HumanConsultationRequestProps> = ({ onBack, onSelectDirect }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: 'text' as any,
    specialty: '',
    title: '',
    description: '',
  });

  const consultTypes = [
    { id: 'text', label: 'استشارة نصية', icon: <MessageCircle />, price: 150, duration: '30 دقيقة' },
    { id: 'audio', label: 'مكالمة صوتية', icon: <Phone />, price: 200, duration: '30 دقيقة' },
    { id: 'video', label: 'مكالمة فيديو', icon: <Video />, price: 300, duration: '30 دقيقة' },
    { id: 'review', label: 'مراجعة مستند', icon: <FileText />, price: 500, duration: 'يوم عمل' },
  ];

  const specialties = ['قانون العمل', 'القانون التجاري', 'العقارات', 'الأحوال الشخصية', 'القانون الجنائي', 'الملكية الفكرية'];

  const nextStep = () => setStep(step + 1);
  const prevStep = () => step > 1 ? setStep(step - 1) : onBack();

  const handleFinish = () => {
    const details = {
      ...formData,
      price: consultTypes.find(t => t.id === formData.type)?.price
    };
    onSelectDirect(details);
  };

  return (
    <div className="flex-1 flex flex-col bg-white animate-in slide-in-from-left duration-300">
      <div className="p-4 bg-white border-b flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={prevStep} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight className="text-slate-700" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">طلب استشارة جديدة</h1>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">اختر نوع الاستشارة</h2>
              <p className="text-slate-500 text-sm">حدد الطريقة التي تود التواصل بها مع الخبير</p>
            </div>
            <div className="grid grid-cols-1 gap-3">
              {consultTypes.map((type) => (
                <button
                  key={type.id}
                  onClick={() => { setFormData({ ...formData, type: type.id }); nextStep(); }}
                  className={`p-4 rounded-2xl border-2 transition-all flex items-center justify-between text-right group ${formData.type === type.id ? 'border-blue-600 bg-blue-50' : 'border-slate-50 bg-slate-50 hover:border-slate-200'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center transition ${formData.type === type.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white text-slate-400 border border-slate-100'}`}>
                      {type.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-slate-900 text-sm">{type.label}</h3>
                      <p className="text-[10px] text-slate-400">{type.duration}</p>
                    </div>
                  </div>
                  <div className="text-left">
                    <p className="text-sm font-black text-blue-600">{type.price} ريال</p>
                    <ChevronLeft size={16} className="text-slate-300 mr-auto" />
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">التخصص المطلوب</h2>
              <p className="text-slate-500 text-sm">لنقوم بتوجيه طلبك للمحامي المتخصص الأنسب</p>
            </div>
            <div className="grid grid-cols-2 gap-3">
              {specialties.map((spec) => (
                <button
                  key={spec}
                  onClick={() => { setFormData({ ...formData, specialty: spec }); nextStep(); }}
                  className={`p-4 rounded-2xl border-2 text-sm font-bold transition-all text-center ${formData.specialty === spec ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-50 bg-slate-50 text-slate-600'}`}
                >
                  {spec}
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6 animate-in fade-in duration-500 pb-20">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">تفاصيل الحالة</h2>
              <p className="text-slate-500 text-sm">اشرح مشكلتك بوضوح ليقوم AI باختيار المحامي الأمثل</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 px-1">عنوان المشكلة</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="مثال: خصم غير قانوني من الراتب"
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 px-1">وصف الحالة بالتفصيل</label>
                <textarea 
                  rows={6}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="اكتب هنا التفاصيل المتعلقة بمشكلتك..."
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none resize-none shadow-inner"
                />
              </div>
            </div>
            <button 
              onClick={handleFinish}
              disabled={!formData.title || formData.description.length < 10}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-200 active:scale-95 transition disabled:bg-slate-200"
            >
              متابعة للدفع وتأكيد الحجز
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HumanConsultationRequest;
