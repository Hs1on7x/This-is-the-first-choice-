
import React, { useState } from 'react';
import { ArrowRight, MessageCircle, Phone, Video, FileText, CheckCircle2, CreditCard, ChevronLeft, Scale } from 'lucide-react';
import { ScreenType, ConsultationSession } from '../types';

interface HumanConsultationRequestProps {
  onBack: () => void;
  onSubmit: (session: ConsultationSession) => void;
}

const HumanConsultationRequest: React.FC<HumanConsultationRequestProps> = ({ onBack, onSubmit }) => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    type: 'text' as any,
    specialty: '',
    title: '',
    description: '',
    urgency: 'normal'
  });

  const consultTypes = [
    { id: 'text', label: 'استشارة نصية', icon: <MessageCircle />, price: '150 ريال', duration: '30 دقيقة' },
    { id: 'audio', label: 'مكالمة صوتية', icon: <Phone />, price: '200 ريال', duration: '30 دقيقة' },
    { id: 'video', label: 'مكالمة فيديو', icon: <Video />, price: '250 ريال', duration: '30 دقيقة' },
    { id: 'review', label: 'مراجعة مستند', icon: <FileText />, price: '300 ريال', duration: 'يوم عمل' },
  ];

  const specialties = ['قانون العمل', 'القانون التجاري', 'العقارات', 'الأحوال الشخصية', 'القانون الجنائي', 'الملكية الفكرية'];

  const nextStep = () => setStep(step + 1);
  const prevStep = () => step > 1 ? setStep(step - 1) : onBack();

  const handleFinish = () => {
    const session: ConsultationSession = {
      id: Math.random().toString(36).substr(2, 9),
      type: formData.type,
      specialty: formData.specialty,
      status: 'requesting'
    };
    onSubmit(session);
  };

  return (
    <div className="flex-1 flex flex-col bg-white animate-in slide-in-from-left duration-300">
      {/* Header */}
      <div className="p-4 bg-white border-b flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <button onClick={prevStep} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight className="text-slate-700" />
          </button>
          <h1 className="text-lg font-bold text-slate-900">طلب استشارة</h1>
        </div>
        <div className="flex gap-1">
          {[1, 2, 3, 4].map(s => (
            <div key={s} className={`h-1.5 w-6 rounded-full ${s <= step ? 'bg-blue-600' : 'bg-slate-100'}`} />
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-8">
        {step === 1 && (
          <div className="space-y-6 animate-in fade-in duration-500">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">اختر نوع الاستشارة</h2>
              <p className="text-slate-500 text-sm">حدد الوسيلة التي تفضلها للتواصل مع المحامي</p>
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
                    <p className="text-sm font-black text-blue-600">{type.price}</p>
                    <ChevronLeft size={16} className="text-slate-300 mr-auto mt-1" />
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
              <p className="text-slate-500 text-sm">لنقوم بتوجيه طلبك للمحامي المتخصص المناسب</p>
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
              <p className="text-slate-500 text-sm">اشرح مشكلتك بوضوح ليتمكن المحامي من مساعدتك</p>
            </div>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 px-1">عنوان الاستشارة</label>
                <input 
                  type="text" 
                  value={formData.title}
                  onChange={e => setFormData({...formData, title: e.target.value})}
                  placeholder="مثال: استفسار حول مكافأة نهاية الخدمة"
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 px-1">وصف الحالة بالتفصيل</label>
                <textarea 
                  rows={6}
                  value={formData.description}
                  onChange={e => setFormData({...formData, description: e.target.value})}
                  placeholder="اكتب هنا كل ما يتعلق بحالتك القانونية..."
                  className="w-full bg-slate-50 border-none rounded-2xl p-4 text-sm focus:ring-2 focus:ring-blue-100 outline-none resize-none"
                />
              </div>
              <div className="space-y-2">
                <label className="text-xs font-bold text-slate-600 px-1">مدى الاستعجال</label>
                <div className="flex gap-2">
                  {['عادي', 'عاجل (رسوم إضافية)'].map((u, i) => (
                    <button 
                      key={i}
                      type="button"
                      onClick={() => setFormData({...formData, urgency: i === 0 ? 'normal' : 'urgent'})}
                      className={`flex-1 py-3 rounded-xl text-xs font-bold transition ${formData.urgency === (i === 0 ? 'normal' : 'urgent') ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <button 
              onClick={nextStep}
              disabled={!formData.title || formData.description.length < 10}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-lg shadow-lg disabled:bg-slate-200 disabled:text-slate-400 transition"
            >
              استمرار
            </button>
          </div>
        )}

        {step === 4 && (
          <div className="space-y-6 animate-in zoom-in duration-500 pb-20">
            <div className="space-y-1">
              <h2 className="text-xl font-bold text-slate-900">الدفع والتأكيد</h2>
              <p className="text-slate-500 text-sm">راجع تفاصيل طلبك قبل الإرسال</p>
            </div>
            
            <div className="bg-slate-50 rounded-3xl p-6 space-y-4">
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-slate-400 text-xs font-bold">نوع الاستشارة</span>
                <span className="text-slate-900 font-bold">{consultTypes.find(t => t.id === formData.type)?.label}</span>
              </div>
              <div className="flex justify-between items-center pb-4 border-b border-slate-200">
                <span className="text-slate-400 text-xs font-bold">التخصص</span>
                <span className="text-slate-900 font-bold">{formData.specialty}</span>
              </div>
              <div className="flex justify-between items-center pt-2">
                <span className="text-slate-900 text-lg font-black">الإجمالي</span>
                <span className="text-blue-600 text-xl font-black">{consultTypes.find(t => t.id === formData.type)?.price}</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">اختر طريقة الدفع</p>
              <div className="grid grid-cols-1 gap-2">
                <button className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-600 transition group">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-black text-white rounded flex items-center justify-center font-bold text-[10px]"> Pay</div>
                    <span className="text-sm font-bold text-slate-800">Apple Pay</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-slate-200 group-hover:border-blue-600 group-hover:bg-blue-600 flex items-center justify-center transition">
                    <CheckCircle2 size={12} className="text-white opacity-0 group-hover:opacity-100" />
                  </div>
                </button>
                <button className="flex items-center justify-between p-4 bg-white border border-slate-200 rounded-2xl hover:border-blue-600 transition group">
                  <div className="flex items-center gap-3">
                    <CreditCard size={20} className="text-slate-400" />
                    <span className="text-sm font-bold text-slate-800">بطاقة ائتمانية</span>
                  </div>
                  <div className="w-5 h-5 rounded-full border-2 border-slate-200" />
                </button>
              </div>
            </div>

            <button 
              onClick={handleFinish}
              className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-lg shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition"
            >
              دفع وإرسال الطلب
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default HumanConsultationRequest;
