
import React, { useState } from 'react';
import { Camera, Upload, CheckCircle2, ShieldCheck, ArrowRight, FileText, Image as ImageIcon, CreditCard, Landmark, ScanFace, XCircle } from 'lucide-react';
import { KYCStatus } from '../types';

interface KYCVerificationProps {
  onComplete: (status: KYCStatus) => void;
  onBack: () => void;
}

const KYCVerification: React.FC<KYCVerificationProps> = ({ onComplete, onBack }) => {
  const [docType, setDocType] = useState<'id' | 'license' | 'passport'>('id');
  const [files, setFiles] = useState<{ front: boolean; back: boolean; selfie: boolean }>({ front: false, back: false, selfie: false });
  const [isVerifying, setIsVerifying] = useState(false);
  const [isDone, setIsDone] = useState(false);

  const simulateUpload = (side: 'front' | 'back' | 'selfie') => {
    setFiles(prev => ({ ...prev, [side]: true }));
  };

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulation of AI Scanning and OCR
    setTimeout(() => {
      setIsVerifying(false);
      setIsDone(true);
      setTimeout(() => onComplete('pending'), 2000);
    }, 2500);
  };

  if (isDone) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center p-8 text-center animate-in zoom-in duration-500">
        <div className="w-24 h-24 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-6 shadow-inner border border-blue-100">
          <ShieldCheck size={56} />
        </div>
        <h2 className="text-2xl font-bold text-slate-900 mb-2">تم إرسال طلبك بنجاح</h2>
        <p className="text-slate-500 mb-8">سنراجع مستنداتك خلال 24 ساعة القادمة. حالة حسابك الآن: <span className="font-bold text-amber-600">قيد المراجعة</span>.</p>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden mb-12">
          <div className="h-full bg-blue-500 animate-[progress_2s_ease-in-out]" />
        </div>
        <style>{`@keyframes progress { from { width: 0%; } to { width: 100%; } }`}</style>
      </div>
    );
  }

  const isReady = files.front && (docType === 'passport' ? true : files.back) && files.selfie;

  return (
    <div className="flex-1 flex flex-col animate-in slide-in-from-left duration-300 pb-20">
      <div className="p-4 bg-white border-b sticky top-0 z-10 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight className="text-slate-700" />
          </button>
          <span className="text-sm font-bold text-blue-600">الخطوة 2 من 2: التحقق من الهوية</span>
        </div>
        <span className="text-xs font-bold text-slate-400">100%</span>
      </div>

      <div className="p-6 flex-1 space-y-8 overflow-y-auto">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 bg-amber-50 text-amber-600 px-3 py-1 rounded-full text-[10px] font-bold mb-2">
            <div className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" /> غير مكتمل
          </div>
          <h1 className="text-2xl font-bold text-slate-900">التحقق من هويتك</h1>
          <p className="text-slate-500 text-sm">نحتاج للتحقق من هويتك لحماية حسابك وضمان الامتثال للأنظمة القانونية المعمول بها.</p>
        </div>

        {/* Step 1: Doc Type */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">١</span>
            نوع الوثيقة
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'id', label: 'بطاقة الهوية الوطنية', icon: <CreditCard size={18} /> },
              { id: 'license', label: 'رخصة القيادة', icon: <FileText size={18} /> },
              { id: 'passport', label: 'جواز السفر', icon: <Landmark size={18} /> },
            ].map((type) => (
              <button
                key={type.id}
                onClick={() => setDocType(type.id as any)}
                className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between ${docType === type.id ? 'border-blue-600 bg-blue-50' : 'border-slate-100 bg-white hover:border-slate-200'}`}
              >
                <div className="flex items-center gap-3">
                  <div className={`${docType === type.id ? 'text-blue-600' : 'text-slate-400'}`}>{type.icon}</div>
                  <span className={`font-bold text-sm ${docType === type.id ? 'text-blue-900' : 'text-slate-500'}`}>{type.label}</span>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${docType === type.id ? 'border-blue-600 bg-blue-600' : 'border-slate-200'}`}>
                  {docType === type.id && <CheckCircle2 size={12} className="text-white" />}
                </div>
              </button>
            ))}
          </div>
        </section>

        {/* Step 2: Upload Documents */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">٢</span>
            رفع صورة الوثيقة
          </h3>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <p className="text-xs font-bold text-slate-500 pr-1">الوجه الأمامي للوثيقة</p>
              <div 
                onClick={() => simulateUpload('front')}
                className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition ${files.front ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-slate-50 hover:border-blue-300'}`}
              >
                {files.front ? (
                  <div className="flex items-center gap-2 text-green-600 font-bold">
                    <CheckCircle2 size={24} /> <span>تم رفع الوجه الأمامي</span>
                  </div>
                ) : (
                  <>
                    <ImageIcon className="text-slate-300" size={32} />
                    <p className="text-xs text-slate-400">تأكد من وضوح البيانات والإضاءة</p>
                    <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg text-xs font-bold active:scale-95 transition"><Camera size={14} /> التقاط أو رفع</button>
                  </>
                )}
              </div>
            </div>

            {docType !== 'passport' && (
              <div className="space-y-2">
                <p className="text-xs font-bold text-slate-500 pr-1">الوجه الخلفي للوثيقة</p>
                <div 
                  onClick={() => simulateUpload('back')}
                  className={`border-2 border-dashed rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition ${files.back ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-slate-50 hover:border-blue-300'}`}
                >
                  {files.back ? (
                    <div className="flex items-center gap-2 text-green-600 font-bold">
                      <CheckCircle2 size={24} /> <span>تم رفع الوجه الخلفي</span>
                    </div>
                  ) : (
                    <>
                      <ImageIcon className="text-slate-300" size={32} />
                      <p className="text-xs text-slate-400">صورة واضحة للوجه الخلفي</p>
                      <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg text-xs font-bold active:scale-95 transition"><Camera size={14} /> التقاط أو رفع</button>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Step 3: Selfie */}
        <section className="space-y-4">
          <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-xs">٣</span>
            صورة شخصية (Selfie)
          </h3>
          <div 
            onClick={() => simulateUpload('selfie')}
            className={`border-2 border-dashed rounded-2xl p-8 flex flex-col items-center justify-center gap-4 cursor-pointer transition ${files.selfie ? 'border-green-500 bg-green-50' : 'border-slate-200 bg-slate-50 hover:border-blue-300'}`}
          >
            {files.selfie ? (
              <div className="flex flex-col items-center gap-2 text-green-600 font-bold">
                <CheckCircle2 size={32} />
                <span>تم التحقق من الوجه</span>
              </div>
            ) : (
              <>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center text-blue-600">
                  <ScanFace size={32} />
                </div>
                <div className="text-center">
                  <p className="text-sm font-bold text-slate-800">التقط صورة شخصية الآن</p>
                  <p className="text-[10px] text-slate-400 mt-1">بدون نظارات أو قبعة، في إضاءة جيدة</p>
                </div>
                <button className="bg-blue-600 text-white px-6 py-2 rounded-lg text-xs font-bold">بدء التحقق الحي</button>
              </>
            )}
          </div>
        </section>

        {/* Checklist */}
        <div className="p-4 bg-slate-50 rounded-2xl border border-slate-100 space-y-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">تأكد قبل الإرسال:</p>
          {[
            { label: 'الصورة واضحة وغير مهتزة', checked: true },
            { label: 'جميع البيانات والأسماء مقروءة', checked: true },
            { label: 'الوثيقة سارية المفعول', checked: true },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 text-xs text-slate-600 font-medium">
              <CheckCircle2 size={14} className="text-blue-500" /> {item.label}
            </div>
          ))}
        </div>
      </div>

      {/* Action Footer */}
      <div className="p-6 bg-white border-t fixed bottom-0 left-0 right-0 max-w-md mx-auto z-20">
        <div className="flex flex-col gap-3">
          <button
            onClick={handleVerify}
            disabled={!isReady || isVerifying}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition flex items-center justify-center gap-3 ${isReady && !isVerifying ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            {isVerifying ? (
              <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> جاري تحليل البيانات...</>
            ) : 'إرسال للمراجعة'}
          </button>
          <button onClick={() => onComplete('unverified')} className="text-slate-400 font-bold text-sm hover:text-slate-600">إكمال لاحقاً</button>
        </div>
      </div>
    </div>
  );
};

export default KYCVerification;
