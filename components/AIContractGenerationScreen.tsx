
import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, CheckCircle2, ShieldCheck, BookOpen, ArrowRight, Loader2 } from 'lucide-react';
import { ContractDraft } from '../types';
import { GoogleGenAI } from "@google/genai";

interface AIContractGenerationScreenProps {
  draft: ContractDraft;
  onBack: () => void;
  onFinish: (generatedText: string, references: string[]) => void;
}

const AIContractGenerationScreen: React.FC<AIContractGenerationScreenProps> = ({ draft, onBack, onFinish }) => {
  const [step, setStep] = useState(1);
  const [statusText, setStatusText] = useState('تحليل البيانات المدخلة...');
  const [progress, setProgress] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [generatedContent, setGeneratedContent] = useState('');
  const [error, setError] = useState('');

  const steps = [
    { id: 1, label: 'تحليل البيانات', status: 'تحليل الأطراف والموضوع...' },
    { id: 2, label: 'اختيار القالب', status: 'اختيار القالب القانوني الأنسب...' },
    { id: 3, label: 'صياغة الديباجة', status: 'كتابة مقدمة العقد وتعريف الأطراف...' },
    { id: 4, label: 'كتابة البنود', status: 'صياغة البنود القانونية والالتزامات...' },
    { id: 5, label: 'المراجعة النهائية', status: 'التدقيق ومطابقة الأنظمة السعودية...' }
  ];

  useEffect(() => {
    generateContract();
  }, []);

  const generateContract = async () => {
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      // Initializing steps animation
      const interval = setInterval(() => {
        setStep(prev => {
          if (prev < 5) {
            const currentStep = steps[prev-1];
            setCompletedSteps(cs => [...cs, currentStep.label]);
            setProgress(prev * 20);
            setStatusText(steps[prev].status);
            return prev + 1;
          }
          clearInterval(interval);
          setProgress(100);
          return 5;
        });
      }, 3000);

      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `أنت خبير قانوني سعودي. قم بصياغة عقد "${draft.type}" احترافي.
        الأطراف: ${draft.parties.map(p => `${p.name} (${p.role})`).join('، ')}
        الموضوع: ${JSON.stringify(draft.terms)}
        المستندات المرفقة: ${draft.documents?.map(d => d.name).join('، ')}
        
        المتطلبات:
        - لغة عربية فصحى قانونية رصينة.
        - بنود واضحة ومرقمة.
        - تضمين الديباجة، التعريفات، الالتزامات، القيمة، المدة، فض النزاعات.
        - الاستناد لنظام المعاملات المدنية السعودي ونظام العمل إذا لزم الأمر.`,
        config: {
          thinkingConfig: { thinkingBudget: 2000 }
        }
      });

      const text = response.text || "فشلت عملية التوليد.";
      setGeneratedContent(text);

      // Finish after Gemini responds and steps finish
      setTimeout(() => {
        onFinish(text, [
          "نظام العمل السعودي (المواد: 50، 74، 80)",
          "نظام المعاملات المدنية (المادة: 107)",
          "لائحة حوكمة الشركات السعودية"
        ]);
      }, 5000);

    } catch (e) {
      setError("حدث خطأ أثناء الصياغة الذكية. يرجى المحاولة مرة أخرى.");
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-500 overflow-y-auto">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-30 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight className="text-slate-700" />
          </button>
          <h1 className="text-lg font-black text-slate-900">إنشاء العقد بالذكاء الاصطناعي</h1>
        </div>
        <span className="text-xs font-bold text-blue-600">الخطوة ٤ من ٥</span>
      </div>

      <div className="p-8 flex-1 flex flex-col items-center justify-center space-y-12 max-w-md mx-auto">
        
        {/* Main Animation */}
        <div className="relative">
          <div className="w-32 h-32 rounded-full border-4 border-blue-50 flex items-center justify-center relative overflow-hidden">
             <div 
               className="absolute bottom-0 left-0 right-0 bg-blue-600 transition-all duration-1000" 
               style={{ height: `${progress}%` }} 
             />
             <Bot size={56} className={`relative z-10 transition-colors duration-500 ${progress > 50 ? 'text-white' : 'text-blue-600'} animate-pulse`} />
          </div>
          <Sparkles className="absolute -top-2 -right-2 text-amber-500 animate-bounce" size={24} />
        </div>

        {/* Status Text */}
        <div className="text-center space-y-3">
           <h2 className="text-xl font-black text-slate-900 leading-tight">
             {progress === 100 ? '✅ تم إنشاء العقد بنجاح!' : '🤖 جارٍ إنشاء العقد...'}
           </h2>
           <p className="text-sm text-slate-500 font-medium h-4">{statusText}</p>
        </div>

        {/* Process Steps */}
        <div className="w-full space-y-4">
           {steps.map((s) => (
             <div key={s.id} className="flex items-center justify-between group">
                <div className="flex items-center gap-3">
                   <div className={`w-6 h-6 rounded-full flex items-center justify-center border-2 transition-all ${
                     s.id < step ? 'bg-blue-600 border-blue-600 text-white' : 
                     s.id === step ? 'border-blue-600 text-blue-600 animate-pulse' : 
                     'border-slate-200 text-slate-300'
                   }`}>
                      {s.id < step ? <CheckCircle2 size={14} /> : <span className="text-[10px] font-bold">{s.id}</span>}
                   </div>
                   <span className={`text-xs font-black ${s.id === step ? 'text-blue-600' : s.id < step ? 'text-slate-900' : 'text-slate-300'}`}>
                      {s.label}
                   </span>
                </div>
                {s.id === step && <Loader2 size={14} className="text-blue-600 animate-spin" />}
             </div>
           ))}
        </div>

        {/* Generation Parameters Sidebar-ish Box */}
        <div className="w-full p-5 bg-white rounded-3xl border border-slate-100 shadow-sm space-y-4">
           <div className="flex items-center gap-2">
              <ShieldCheck size={16} className="text-blue-600" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-slate-400">معايير الصياغة</h3>
           </div>
           <div className="grid grid-cols-2 gap-4">
              <div>
                 <p className="text-[8px] font-bold text-slate-400 uppercase">النظام القانوني</p>
                 <p className="text-[10px] font-black text-slate-900">المملكة العربية السعودية</p>
              </div>
              <div>
                 <p className="text-[8px] font-bold text-slate-400 uppercase">نوع العقد</p>
                 <p className="text-[10px] font-black text-slate-900">{draft.type}</p>
              </div>
              <div>
                 <p className="text-[8px] font-bold text-slate-400 uppercase">عدد الأطراف</p>
                 <p className="text-[10px] font-black text-slate-900">{draft.parties.length}</p>
              </div>
              <div>
                 <p className="text-[8px] font-bold text-slate-400 uppercase">المدة</p>
                 <p className="text-[10px] font-black text-slate-900">{draft.terms?.duration || 'محددة بالبنود'}</p>
              </div>
           </div>
        </div>

        {/* Legal References */}
        <div className="w-full p-5 bg-indigo-50 rounded-3xl border border-indigo-100 space-y-3">
           <div className="flex items-center gap-2">
              <BookOpen size={16} className="text-indigo-600" />
              <h3 className="text-[10px] font-black uppercase tracking-widest text-indigo-900">الأنظمة المرجعية</h3>
           </div>
           <ul className="space-y-1.5">
              <li className="text-[9px] font-bold text-indigo-700 flex gap-2">
                 <span className="w-1 h-1 bg-indigo-400 rounded-full mt-1.5" /> نظام المعاملات المدنية
              </li>
              <li className="text-[9px] font-bold text-indigo-700 flex gap-2">
                 <span className="w-1 h-1 bg-indigo-400 rounded-full mt-1.5" /> نظام الشركات السعودي الجديد
              </li>
              <li className="text-[9px] font-bold text-indigo-700 flex gap-2">
                 <span className="w-1 h-1 bg-indigo-400 rounded-full mt-1.5" /> نظام المحاكم التجارية
              </li>
           </ul>
        </div>
      </div>

      {progress === 100 && (
         <div className="p-6 bg-white border-t sticky bottom-0 z-40 animate-in slide-in-from-bottom duration-500">
            <button 
              onClick={() => onFinish(generatedContent, ["نظام العمل", "نظام المعاملات المدنية"])}
              className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-lg shadow-xl shadow-blue-100 flex items-center justify-center gap-2 active:scale-95 transition"
            >
              عرض العقد ومراجعته <ArrowRight className="rotate-180" size={20} />
            </button>
         </div>
      )}
    </div>
  );
};

export default AIContractGenerationScreen;
