
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, Upload, FileText, ImageIcon, File, 
  Trash2, Eye, Sparkles, CheckCircle2, ShieldCheck, 
  Clock, Info, Search, Paperclip, ChevronLeft, 
  Plus, AlertCircle, Loader2
} from 'lucide-react';
import { ContractDraft, ContractFile } from '../types';

interface ContractDocumentsScreenProps {
  draft: ContractDraft;
  onBack: () => void;
  onNext: (documents: ContractFile[]) => void;
  onSaveDraft: () => void;
}

const ContractDocumentsScreen: React.FC<ContractDocumentsScreenProps> = ({ draft, onBack, onNext, onSaveDraft }) => {
  const [files, setFiles] = useState<ContractFile[]>(draft.documents || []);
  const [activeCategory, setActiveCategory] = useState<'all' | 'images' | 'docs' | 'quotes' | 'chats'>('all');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const categories = [
    { id: 'all', label: 'الكل' },
    { id: 'images', label: 'صور' },
    { id: 'docs', label: 'مستندات' },
    { id: 'quotes', label: 'عروض أسعار' },
    { id: 'chats', label: 'مراسلات' },
  ];

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = e.target.files;
    if (uploadedFiles) {
      addFiles(Array.from(uploadedFiles));
    }
  };

  const addFiles = (newFiles: File[]) => {
    const processedFiles: ContractFile[] = newFiles.map(file => {
      const extension = file.name.split('.').pop()?.toLowerCase();
      let type: any = 'others';
      let category: any = 'docs';

      if (['jpg', 'jpeg', 'png'].includes(extension || '')) {
        type = 'image';
        category = 'images';
      } else if (['pdf'].includes(extension || '')) {
        type = 'pdf';
      } else if (['doc', 'docx'].includes(extension || '')) {
        type = 'word';
      } else if (['xls', 'xlsx'].includes(extension || '')) {
        type = 'excel';
        category = 'quotes';
      }

      return {
        id: Math.random().toString(36).substr(2, 9),
        name: file.name,
        size: `${(file.size / 1024 / 1024).toFixed(2)} MB`,
        type,
        category,
        hash: Array.from(crypto.getRandomValues(new Uint8Array(8))).map(b => b.toString(16).padStart(2, '0')).join(''),
        timestamp: new Date().toLocaleString('ar-SA'),
        status: 'uploading'
      };
    });

    setFiles(prev => [...prev, ...processedFiles]);

    // Simulate upload and analysis process
    processedFiles.forEach(f => {
      setTimeout(() => {
        setFiles(prev => prev.map(item => item.id === f.id ? { ...item, status: 'analyzing' } : item));
        
        setTimeout(() => {
          setFiles(prev => prev.map(item => item.id === f.id ? { 
            ...item, 
            status: 'done',
            aiAnalysis: {
              summary: 'تم تحليل المستند بنجاح ومطابقته مع سياق العقد.',
              extractedInfo: [
                'عرض سعر بقيمة ٥٠,٠٠٠ ريال',
                'تاريخ المفعول: ٢٠٢٥/٠١/١٥',
                'متطلبات التسليم: خلال ٣٠ يوم'
              ]
            }
          } : item));
        }, 2000);
      }, 1500);
    });
  };

  const removeFile = (id: string) => {
    setFiles(prev => prev.filter(f => f.id !== id));
  };

  const filteredFiles = activeCategory === 'all' 
    ? files 
    : files.filter(f => f.category === activeCategory);

  const getFileIcon = (type: string) => {
    switch (type) {
      case 'image': return <ImageIcon size={20} className="text-blue-500" />;
      case 'pdf': return <FileText size={20} className="text-red-500" />;
      case 'word': return <File size={20} className="text-blue-700" />;
      case 'excel': return <File size={20} className="text-emerald-600" />;
      default: return <Paperclip size={20} className="text-slate-400" />;
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-300 pb-28">
      {/* Progress Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-30 shadow-sm">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
             <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
                <ArrowRight className="text-slate-700" />
             </button>
             <h1 className="text-lg font-black text-slate-900">المستندات والأدلة</h1>
          </div>
          <span className="text-xs font-bold text-blue-600">الخطوة ٣ من ٥</span>
        </div>
        <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
          <div className="w-3/5 h-full bg-blue-600 rounded-full transition-all duration-1000" />
        </div>
      </div>

      <div className="p-6 flex-1 space-y-6 overflow-y-auto">
        <div className="space-y-1">
           <h2 className="text-2xl font-black text-slate-900 leading-tight">عزز موقفك بالأدلة</h2>
           <p className="text-sm text-slate-500 font-medium">أرفق أي مستندات تدعم العقد وتضمن حقوق الأطراف.</p>
        </div>

        {/* Upload Zone */}
        <div 
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
          onDragLeave={() => setIsDragging(false)}
          onDrop={(e) => { e.preventDefault(); setIsDragging(false); addFiles(Array.from(e.dataTransfer.files)); }}
          className={`relative border-2 border-dashed rounded-[2rem] p-10 flex flex-col items-center justify-center gap-4 transition-all cursor-pointer ${
            isDragging ? 'border-blue-600 bg-blue-50 scale-[1.02]' : 'border-slate-200 bg-white hover:border-blue-300 hover:bg-slate-50'
          }`}
        >
          <input type="file" multiple className="hidden" ref={fileInputRef} onChange={handleFileUpload} />
          <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center shadow-inner">
            <Upload size={32} />
          </div>
          <div className="text-center">
            <p className="text-sm font-black text-slate-900">اسحب الملفات وأفلتها هنا</p>
            <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mt-1">أو تصفح الملفات من جهازك</p>
          </div>
          <div className="flex gap-4 pt-2">
            <span className="text-[8px] font-black text-slate-400 bg-slate-100 px-2 py-1 rounded">PDF, DOC, XLS</span>
            <span className="text-[8px] font-black text-slate-400 bg-slate-100 px-2 py-1 rounded">JPG, PNG</span>
            <span className="text-[8px] font-black text-slate-400 bg-slate-100 px-2 py-1 rounded">MAX 10MB</span>
          </div>
        </div>

        {/* Categories / Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id as any)}
              className={`whitespace-nowrap px-6 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                activeCategory === cat.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'bg-white text-slate-400 border border-slate-100'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Files List */}
        <div className="space-y-4">
          {filteredFiles.length === 0 ? (
            <div className="text-center py-10 space-y-3 opacity-30">
               <FileText size={48} className="mx-auto text-slate-300" />
               <p className="text-xs font-bold text-slate-400">لا توجد ملفات مرفوعة حالياً</p>
            </div>
          ) : (
            filteredFiles.map((file) => (
              <div key={file.id} className="bg-white p-4 rounded-3xl border border-slate-100 shadow-sm space-y-4 animate-in slide-in-from-bottom duration-500 overflow-hidden">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
                      {getFileIcon(file.type)}
                    </div>
                    <div>
                      <h4 className="text-xs font-black text-slate-900 truncate max-w-[150px]">{file.name}</h4>
                      <p className="text-[9px] text-slate-400 font-bold uppercase">{file.size} • {file.timestamp.split(' ')[0]}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {file.status === 'uploading' || file.status === 'analyzing' ? (
                      <Loader2 size={18} className="text-blue-500 animate-spin" />
                    ) : (
                      <div className="flex gap-2">
                        <button className="p-2 hover:bg-blue-50 text-blue-600 rounded-lg transition"><Eye size={16} /></button>
                        <button onClick={() => removeFile(file.id)} className="p-2 hover:bg-red-50 text-red-400 rounded-lg transition"><Trash2 size={16} /></button>
                      </div>
                    )}
                  </div>
                </div>

                {/* Metadata Row */}
                <div className="flex items-center justify-between bg-slate-50 p-2 rounded-xl border border-slate-100/50">
                   <div className="flex items-center gap-1.5">
                      <ShieldCheck size={12} className="text-emerald-500" />
                      <span className="text-[8px] font-mono text-slate-400 uppercase">HASH: {file.hash}</span>
                   </div>
                   <div className="flex items-center gap-1">
                      <Clock size={10} className="text-slate-300" />
                      <span className="text-[8px] font-bold text-slate-400">{file.timestamp.split(' ')[1]} {file.timestamp.split(' ')[2]}</span>
                   </div>
                </div>

                {/* AI Analysis Result */}
                {file.status === 'analyzing' && (
                  <div className="p-3 bg-blue-50 rounded-2xl border border-blue-100 animate-pulse flex items-center gap-3">
                    <Sparkles size={14} className="text-blue-600" />
                    <span className="text-[10px] font-black text-blue-900">جاري تحليل المرفق ذكياً...</span>
                  </div>
                )}
                {file.status === 'done' && file.aiAnalysis && (
                  <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-3 animate-in fade-in duration-500">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-emerald-700">
                        <CheckCircle2 size={14} />
                        <span className="text-[10px] font-black">تم تحليل المستند</span>
                      </div>
                      <span className="text-[8px] font-black text-emerald-600 bg-white px-2 py-0.5 rounded-full uppercase">ذكاء اصطناعي</span>
                    </div>
                    <p className="text-[10px] text-emerald-800 font-medium leading-relaxed">{file.aiAnalysis.summary}</p>
                    <div className="flex flex-wrap gap-2">
                      {file.aiAnalysis.extractedInfo.map((info, idx) => (
                        <span key={idx} className="bg-white/60 px-2 py-1 rounded-lg text-[8px] font-bold text-emerald-700 border border-emerald-100/50">{info}</span>
                      ))}
                    </div>
                    <button className="w-full py-2 bg-emerald-600 text-white rounded-xl text-[9px] font-black shadow-lg shadow-emerald-200 active:scale-95 transition">
                      تحديث بيانات العقد تلقائياً
                    </button>
                  </div>
                )}
              </div>
            ))
          )}
        </div>

        {/* Security Info */}
        <div className="p-5 bg-slate-900 rounded-[2rem] text-white shadow-xl flex gap-4">
           <div className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center shrink-0">
             <ShieldCheck size={24} className="text-blue-400" />
           </div>
           <div className="space-y-1">
              <p className="text-xs font-black uppercase tracking-widest text-blue-300">نظام حماية البيانات</p>
              <p className="text-[9px] text-slate-400 leading-relaxed">
                جميع المرفقات تُشفر في السحابة الأمنة ويتم توليد بصمة رقمية (SHA-256) لكل ملف لضمان سلامته وعدم التلاعب به مستقبلاً.
              </p>
           </div>
        </div>
      </div>

      {/* Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white border-t z-40 shadow-xl">
        <div className="flex gap-3">
          <button
            onClick={() => onNext(files)}
            className="flex-[3] py-4 bg-blue-600 text-white rounded-[1.5rem] font-black text-lg shadow-xl shadow-blue-200 active:scale-95 transition"
          >
            التالي: مراجعة وصياغة
          </button>
          <button 
            onClick={onSaveDraft}
            className="flex-1 bg-slate-50 text-slate-500 rounded-[1.5rem] font-bold text-[10px] hover:bg-slate-100 transition active:scale-95"
          >
            حفظ كمسودة
          </button>
        </div>
      </div>
    </div>
  );
};

export default ContractDocumentsScreen;
