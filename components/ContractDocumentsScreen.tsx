
import React, { useState, useMemo, useRef } from 'react';
import { ArrowRight, Upload, FileText, CheckCircle2, AlertTriangle, ChevronLeft, ShieldCheck, Info, Users, Eye, Download, X, Bot, Sparkles, ImageIcon, Trash2 } from 'lucide-react';
import { ContractDraft, ContractFile, ContractParty } from '../types';

interface ContractDocumentsScreenProps {
  draft: ContractDraft;
  onBack: () => void;
  onNext: (documents: ContractFile[]) => void;
  onSaveDraft: () => void;
}

const ContractDocumentsScreen: React.FC<ContractDocumentsScreenProps> = ({ draft, onBack, onNext, onSaveDraft }) => {
  const [files, setFiles] = useState<ContractFile[]>([]);
  const [showCounterpartyDocs, setShowCounterpartyDocs] = useState(true);
  const [isUploading, setIsUploading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Requirements checklist based on roles (Scenario logic)
  const requiredDocs = useMemo(() => {
    const list: { role: string, items: string[] }[] = [];
    const userRole = draft.parties.find(p => p.isUser)?.specificRole || 'طرف أول';
    const cpRole = draft.parties.find(p => !p.isUser)?.specificRole || 'طرف ثاني';

    if (draft.type.includes('إيجار') || draft.type.includes('عقاري')) {
       list.push({ role: `للمؤجر (${cpRole}):`, items: ['صك الملكية الإلكتروني', 'صورة الهوية الوطنية', 'صور العقار'] });
       list.push({ role: `للمستأجر (${userRole}):`, items: ['صورة الهوية الوطنية', 'كشف حساب (اختياري)'] });
    } else {
       list.push({ role: 'المستندات العامة:', items: ['الهوية الوطنية / السجل التجاري'] });
    }
    return list;
  }, [draft.type, draft.parties]);

  // Mock Counterparty Files (Requirement Screen 13)
  const counterPartyFiles: ContractFile[] = useMemo(() => [
    {
      id: 'cp-1',
      name: 'صك ملكية رقم 12345.pdf',
      size: '1.2 MB',
      type: 'pdf',
      category: 'docs',
      hash: 'sha256-a1b2c3d4...',
      timestamp: '2024-12-30 10:00 AM',
      status: 'done',
      uploadedBy: 'counterparty',
      isShared: true,
      aiAnalysis: {
        summary: 'تم التحقق من صحة الصك رقم 1234567890.',
        extractedInfo: ['العنوان: الرياض، حي العليا، طريق الملك فهد', 'المالك: محمد أحمد السعيد', 'الصك ساري المفعول'],
        isMatch: true,
        verificationDetails: 'العنوان في الصك يطابق العنوان الجغرافي المدخل بنسبة ١٠٠٪.'
      }
    },
    {
      id: 'cp-2',
      name: 'صور العقار السكني.zip',
      size: '8.4 MB',
      type: 'image',
      category: 'images',
      hash: 'sha256-x9y8z7...',
      timestamp: '2024-12-30 10:05 AM',
      status: 'done',
      uploadedBy: 'counterparty',
      isShared: true,
      aiAnalysis: {
        summary: 'الصور تظهر عقاراً سكنياً بحالة ممتازة ومطابقة لموقع العقد.',
        extractedInfo: ['٥ صور مرفقة', 'الموقع يطابق العنوان الجغرافي'],
        isMatch: true
      }
    }
  ], []);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploaded = e.target.files;
    if (uploaded && uploaded.length > 0) {
      setIsUploading(true);
      const newFiles: ContractFile[] = Array.from(uploaded).map((file: File) => ({
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        type: file.type.includes('pdf') ? 'pdf' : 'image',
        category: 'docs',
        hash: 'pending...',
        timestamp: new Date().toLocaleString(),
        status: 'uploading',
        isShared: true
      }));
      setFiles([...files, ...newFiles]);
      
      setTimeout(() => {
        setFiles(prev => prev.map(f => f.status === 'uploading' ? { ...f, status: 'done', aiAnalysis: { summary: 'تم تحليل المستند ومطابقته.', extractedInfo: ['تم استخراج البيانات بنجاح'], isMatch: true } } : f));
        setIsUploading(false);
      }, 2000);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-right duration-500 overflow-y-auto pb-32">
      <div className="p-4 bg-white border-b sticky top-0 z-30 shadow-sm flex items-center gap-3">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowRight size={20} /></button>
        <h1 className="text-lg font-black text-slate-900 tracking-tight">المستندات والأدلة</h1>
      </div>

      <div className="p-6 space-y-8">
        <div className="space-y-1">
           <h2 className="text-2xl font-black text-slate-900 leading-tight">عزز الثقة والشفافية</h2>
           <p className="text-sm text-slate-500 font-medium">أرفق مستنداتك وراجع وثائق الطرف الآخر لضمان سلامة العقد.</p>
        </div>

        {/* 📋 Requirements Checklist */}
        <section className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
           <h3 className="text-xs font-black text-slate-900 uppercase tracking-widest flex items-center gap-2 px-1">
              <FileText size={16} className="text-blue-600" /> المستندات المطلوبة حسب الدور
           </h3>
           <div className="space-y-6">
              {requiredDocs.map((group, i) => (
                <div key={i} className="space-y-3">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">{group.role}</p>
                   <div className="grid grid-cols-1 gap-2">
                      {group.items.map((item, j) => (
                        <div key={j} className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                           <div className="w-5 h-5 rounded-md border-2 border-slate-200 bg-white" />
                           <span className="text-[11px] font-bold text-slate-600">{item}</span>
                        </div>
                      ))}
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* 📤 My Documents Upload */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest">رفع مستنداتك</h3>
              <button onClick={() => fileInputRef.current?.click()} className="text-[10px] font-black text-blue-600 flex items-center gap-1 uppercase hover:underline">
                 <Upload size={14} /> إضافة مستند
              </button>
           </div>
           
           <input type="file" ref={fileInputRef} onChange={handleFileUpload} multiple className="hidden" />
           
           <div 
             onClick={() => fileInputRef.current?.click()}
             className="border-2 border-dashed rounded-[2.5rem] p-10 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer bg-white border-slate-200 hover:border-blue-300"
           >
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shadow-inner">
                <Upload size={32} />
              </div>
              <div className="text-center">
                <p className="text-sm font-black text-slate-900">انقر أو اسحب الملفات هنا</p>
                <p className="text-[10px] text-slate-400 font-bold uppercase mt-1">PDF, JPG, PNG (بحد أقصى ٢٠ ميجابايت)</p>
              </div>
           </div>

           {files.length > 0 && (
             <div className="space-y-3">
                {files.map(f => (
                  <div key={f.id} className="bg-white p-5 rounded-[2.2rem] border border-slate-100 shadow-sm flex items-center justify-between animate-in slide-in-from-right">
                     <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-blue-600">
                           {f.type === 'pdf' ? <FileText size={24} /> : <ImageIcon size={24} />}
                        </div>
                        <div>
                           <h4 className="text-xs font-black text-slate-900 truncate max-w-[120px]">{f.name}</h4>
                           <p className="text-[8px] text-slate-400 font-bold uppercase">{f.size} • {f.status === 'done' ? 'تم الرفع' : 'جاري الرفع...'}</p>
                        </div>
                     </div>
                     <button onClick={() => setFiles(files.filter(x => x.id !== f.id))} className="p-2 text-slate-300 hover:text-red-500"><Trash2 size={18} /></button>
                  </div>
                ))}
             </div>
           )}
        </section>

        {/* 👁️ Counterparty Documents (Screen 13 Key Feature) */}
        <section className="space-y-4 pt-4 border-t border-slate-100">
           <div className="flex items-center justify-between px-2">
              <h3 className="text-sm font-black text-slate-900 flex items-center gap-2">
                 <Users size={18} className="text-blue-600" /> مستندات الطرف الآخر
              </h3>
              <button 
                onClick={() => setShowCounterpartyDocs(!showCounterpartyDocs)}
                className={`w-12 h-6 rounded-full transition-all relative ${showCounterpartyDocs ? 'bg-blue-600 shadow-md' : 'bg-slate-300'}`}
              >
                 <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${showCounterpartyDocs ? 'right-7' : 'right-1'}`} />
              </button>
           </div>
           
           {showCounterpartyDocs && (
             <div className="space-y-5 animate-in slide-in-from-top duration-500">
                <div className="p-5 bg-amber-50 rounded-[2rem] border border-amber-100 flex gap-4">
                   <AlertTriangle className="text-amber-600 shrink-0" size={24} />
                   <div className="space-y-1">
                      <p className="text-xs font-black text-amber-900 uppercase">مراجعة أمنية</p>
                      <p className="text-[10px] text-amber-800 leading-relaxed font-medium">
                        يمكنك مراجعة مستندات المؤجر للتأكد من ملكية العقار ومطابقة البيانات الجغرافية قبل المتابعة.
                      </p>
                   </div>
                </div>

                {counterPartyFiles.map(cpFile => (
                  <div key={cpFile.id} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-xl overflow-hidden group">
                     <div className="p-6 space-y-4">
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-4">
                              <div className="w-12 h-12 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center shadow-inner">
                                 {cpFile.type === 'pdf' ? <FileText size={28} /> : <ImageIcon size={28} />}
                              </div>
                              <div>
                                 <h4 className="text-sm font-black text-slate-900 leading-tight">{cpFile.name}</h4>
                                 <p className="text-[9px] text-slate-400 font-bold uppercase mt-0.5">رفعه: {draft.parties.find(p => !p.isUser)?.name || 'الطرف الآخر'}</p>
                              </div>
                           </div>
                           <button className="p-3 bg-slate-50 text-slate-400 rounded-xl hover:text-blue-600 transition shadow-sm"><Download size={20} /></button>
                        </div>

                        {cpFile.aiAnalysis && (
                          <div className="p-5 bg-slate-900 rounded-3xl text-white space-y-4 shadow-2xl relative overflow-hidden">
                             <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl animate-pulse" />
                             <div className="flex items-center justify-between relative z-10">
                                <div className="flex items-center gap-2 text-blue-400">
                                   <Sparkles size={16} />
                                   <h5 className="text-[9px] font-black uppercase tracking-widest">تحليل AI الفوري</h5>
                                </div>
                                <span className="bg-emerald-500 text-white text-[8px] font-black px-2 py-0.5 rounded-full uppercase">مطابق ✓</span>
                             </div>
                             <div className="space-y-3 relative z-10">
                                <p className="text-xs font-bold text-slate-200 italic leading-relaxed">"{cpFile.aiAnalysis.summary}"</p>
                                <div className="flex flex-wrap gap-2">
                                   {cpFile.aiAnalysis.extractedInfo.map((info, idx) => (
                                     <span key={idx} className="bg-white/10 px-3 py-1 rounded-lg text-[9px] font-bold text-blue-200 border border-white/5">{info}</span>
                                   ))}
                                </div>
                                {cpFile.aiAnalysis.verificationDetails && (
                                   <p className="text-[9px] text-emerald-400 font-black border-t border-white/10 pt-2 flex items-center gap-2">
                                      <CheckCircle2 size={12} /> {cpFile.aiAnalysis.verificationDetails}
                                   </p>
                                )}
                             </div>
                          </div>
                        )}

                        <div className="flex gap-2">
                           <button className="flex-1 py-3 bg-white border border-slate-100 rounded-xl font-black text-[10px] uppercase text-slate-600 flex items-center justify-center gap-2 hover:bg-slate-50 transition active:scale-95 shadow-sm">
                              <Eye size={16} /> عرض المستند
                           </button>
                           <button className="flex-1 py-3 bg-emerald-600 text-white rounded-xl font-black text-[10px] uppercase shadow-lg shadow-emerald-100 flex items-center justify-center gap-2 active:scale-95 transition">
                              <ShieldCheck size={16} /> تأكيد المطابقة
                           </button>
                        </div>
                     </div>
                  </div>
                ))}
             </div>
           )}
        </section>

        {/* ✅ Final Status Tracker */}
        <section className="p-6 rounded-[2.5rem] bg-emerald-50 border border-emerald-100 space-y-4 shadow-inner">
           <h4 className="text-xs font-black text-emerald-900 uppercase tracking-widest flex items-center gap-2 px-1">
              <ShieldCheck size={18} /> حالة التحقق النهائية
           </h4>
           <div className="space-y-2">
              <div className="flex items-center gap-3 text-xs font-bold text-emerald-700">
                 <div className={`w-5 h-5 rounded-full flex items-center justify-center ${files.length > 0 ? 'bg-emerald-500 text-white' : 'bg-white border border-emerald-200'}`}>
                    {files.length > 0 && <CheckCircle2 size={14} />}
                 </div>
                 تم رفع مستنداتي (الهوية، كشف الحساب)
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-emerald-700">
                 <div className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-500 text-white">
                    <CheckCircle2 size={14} />
                 </div>
                 تم مراجعة مستندات الطرف الثاني (صك الملكية)
              </div>
              <div className="flex items-center gap-3 text-xs font-bold text-emerald-700">
                 <div className="w-5 h-5 rounded-full flex items-center justify-center bg-emerald-500 text-white">
                    <CheckCircle2 size={14} />
                 </div>
                 العنوان في الصك مطابق للعنوان الجغرافي
              </div>
           </div>
        </section>
      </div>

      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t z-50 shadow-2xl flex gap-3">
         <button 
           onClick={() => onNext(files)}
           disabled={files.length === 0}
           className={`flex-[3] py-5 rounded-[1.8rem] font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${files.length > 0 ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
         >
            التالي: الصياغة بالذكاء الاصطناعي <ChevronLeft size={24} />
         </button>
      </div>
    </div>
  );
};

export default ContractDocumentsScreen;
