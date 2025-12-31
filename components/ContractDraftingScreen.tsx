
import React, { useState, useEffect } from 'react';
import { ArrowRight, Bot, ShieldCheck, Download, Printer, Share2, Sparkles, FileText, CheckCircle2 } from 'lucide-react';
import { ContractDraft } from '../types';
import { GoogleGenAI } from "@google/genai";

interface ContractDraftingScreenProps {
  draft: ContractDraft;
  onBack: () => void;
  onFinish: () => void;
}

const ContractDraftingScreen: React.FC<ContractDraftingScreenProps> = ({ draft, onBack, onFinish }) => {
  const [isGenerating, setIsGenerating] = useState(true);
  const [contractText, setContractText] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    generateContract();
  }, []);

  const cleanContractText = (text: string) => {
    // Removes markdown symbols like **, *, #, __, etc.
    return text.replace(/\*\*|\*|#+|__|~~/g, '').trim();
  };

  const generateContract = async () => {
    setIsGenerating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `أنت خبير صياغة عقود قانونية سعودية. قم بصياغة عقد احترافي من نوع "${draft.type}" باللغة العربية الفصحى القانونية.
الأطراف:
${draft.parties.map(p => `- ${p.name} (${p.role})`).join('\n')}

المعطيات:
- الموضوع: ${draft.terms?.subject}
- المدة: ${draft.terms?.duration}
- القيمة: ${draft.terms?.amount || 'غير محددة'}
- شروط خاصة: ${draft.terms?.specialConditions || 'لا يوجد'}

المتطلبات الهامة:
1. التزم بنظام المعاملات المدنية السعودي الجديد.
2. لا تستخدم أي رموز تنسيق مثل النجوم (*) أو الهاش (#) أو الجداول. فقط نص نقي وواضح.
3. ابدأ العقد بالديباجة الرسمية ثم البنود المرقمة بوضوح.`,
      });
      
      const raw = response.text || "حدث خطأ في توليد النص.";
      setContractText(cleanContractText(raw));
    } catch (e) {
      console.error(e);
      setError("واجهنا مشكلة في الاتصال بالمساعد الذكي. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-bottom duration-500 overflow-hidden">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-20 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight className="text-slate-700" />
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-900">مسودة العقد النهائية</h1>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">صياغة قانونية نظيفة ورسمية</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6">
        {isGenerating ? (
          <div className="flex-1 flex flex-col items-center justify-center py-20 space-y-8">
             <div className="relative">
                <div className="w-24 h-24 border-4 border-blue-100 border-t-blue-600 rounded-full animate-spin" />
                <div className="absolute inset-0 flex items-center justify-center text-blue-600">
                   <Bot size={40} className="animate-pulse" />
                </div>
             </div>
             <div className="text-center space-y-2 animate-in fade-in duration-1000">
                <h3 className="text-xl font-black text-slate-900">جاري صياغة النص الرسمي...</h3>
                <p className="text-sm text-slate-400 font-medium">إزالة الرموز الفنية وضبط الصياغة اللغوية</p>
             </div>
          </div>
        ) : error ? (
          <div className="bg-red-50 p-6 rounded-3xl border border-red-100 text-center space-y-4">
             <p className="text-sm text-red-600 font-bold">{error}</p>
             <button onClick={generateContract} className="px-6 py-2 bg-red-600 text-white rounded-xl text-xs font-black">إعادة المحاولة</button>
          </div>
        ) : (
          <div className="space-y-6 animate-in zoom-in duration-500">
             <div className="flex items-center justify-between bg-emerald-50 p-4 rounded-2xl border border-emerald-100">
                <div className="flex items-center gap-3">
                   <CheckCircle2 size={18} className="text-emerald-600" />
                   <span className="text-xs font-bold text-emerald-900">جاهز للتوقيع الرسمي</span>
                </div>
                <div className="flex items-center gap-2">
                   <ShieldCheck size={16} className="text-emerald-600" />
                   <span className="text-[10px] font-black text-emerald-700 uppercase">خالٍ من رموز التنسيق</span>
                </div>
             </div>

             <div className="bg-white p-10 rounded-[2rem] shadow-xl border border-slate-100 font-serif leading-[2] text-slate-800 text-sm min-h-[500px] whitespace-pre-wrap select-text text-justify">
                <div className="text-center border-b pb-10 mb-10">
                   <h2 className="text-3xl font-black text-slate-900 mb-2">عقد {draft.type}</h2>
                   <p className="text-[10px] text-slate-400 font-black uppercase tracking-[0.3em]">وثيقة رقمية موثقة: {draft.id}</p>
                </div>
                {contractText}
                <div className="mt-20 pt-10 border-t border-slate-100 grid grid-cols-2 gap-10 text-center">
                   <div className="space-y-24">
                      <p className="font-black border-b border-slate-900 pb-3">الطرف الأول</p>
                      <p className="text-[9px] text-slate-300 font-bold">توقيع رقمي مشفر</p>
                   </div>
                   <div className="space-y-24">
                      <p className="font-black border-b border-slate-900 pb-3">الطرف الثاني</p>
                      <p className="text-[9px] text-slate-300 font-bold">توقيع رقمي مشفر</p>
                   </div>
                </div>
             </div>

             <div className="grid grid-cols-3 gap-3">
                <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm active:scale-95 transition hover:bg-slate-50">
                   <Download size={20} className="text-blue-600" />
                   <span className="text-[10px] font-black">تحميل PDF</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm active:scale-95 transition hover:bg-slate-50">
                   <Printer size={20} className="text-slate-600" />
                   <span className="text-[10px] font-black">طباعة</span>
                </button>
                <button className="flex flex-col items-center gap-2 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm active:scale-95 transition hover:bg-slate-50">
                   <Share2 size={20} className="text-indigo-600" />
                   <span className="text-[10px] font-black">مشاركة</span>
                </button>
             </div>
          </div>
        )}
      </div>

      {!isGenerating && !error && (
        <div className="p-6 bg-white border-t flex gap-3 z-30">
           <button 
             onClick={onFinish}
             className="flex-1 py-5 bg-blue-600 text-white rounded-3xl font-black text-lg shadow-xl shadow-blue-200 active:scale-95 transition"
           >
             بدء مراسم التوقيع الرقمي
           </button>
           <button onClick={generateContract} className="p-4 bg-slate-900 text-amber-400 rounded-3xl active:scale-95 transition shadow-lg">
              <Sparkles size={28} />
           </button>
        </div>
      )}
    </div>
  );
};

export default ContractDraftingScreen;
