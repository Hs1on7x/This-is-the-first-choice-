
import React, { useState } from 'react';
import { ArrowRight, Target, Upload, FileText, CheckCircle2, AlertTriangle, ShieldCheck, Sparkles, MessageSquare, Scale, Gavel, ChevronLeft } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

interface DisputeEvaluationScreenProps {
  onBack: () => void;
}

const DisputeEvaluationScreen: React.FC<DisputeEvaluationScreenProps> = ({ onBack }) => {
  const [description, setDescription] = useState('');
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [report, setReport] = useState<any>(null);

  const handleEvaluate = async () => {
    if (!description.trim()) return;
    setIsEvaluating(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `أنت خبير تقييم قضايا ونزاعات قانونية في المملكة العربية السعودية. قم بتحليل النزاع التالي وتقديم تقرير مفصل.
النزاع:
${description}

يجب أن يشمل التقرير في المخرجات JSON:
1. نسبة قوة الموقف القانوني (0-100).
2. نقاط القوة (Strengths).
3. نقاط الضعف والمخاطر (Weaknesses).
4. الأنظمة السعودية ذات الصلة.
5. استراتيجية الحل المقترحة (صلح، مرافعة، تحكيم).`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              strengthScore: { type: Type.NUMBER },
              strengths: { type: Type.ARRAY, items: { type: Type.STRING } },
              weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
              relevantLaws: { type: Type.ARRAY, items: { type: Type.STRING } },
              strategy: { type: Type.STRING },
              aiInsight: { type: Type.STRING }
            }
          }
        }
      });
      setReport(JSON.parse(response.text || "{}"));
    } catch (e) {
      console.error(e);
    } finally {
      setIsEvaluating(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-300 overflow-y-auto pb-24">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight className="text-slate-700" />
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-900">تقييم الموقف القانوني</h1>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">تحليل استراتيجي للنزاعات</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {!report ? (
          <div className="space-y-6 animate-in fade-in">
             <div className="space-y-1">
                <h2 className="text-xl font-black text-slate-900">هل موقفك في النزاع قوي؟</h2>
                <p className="text-slate-500 text-xs">صف النزاع وارفع الأدلة المتاحة ليقوم AI بتقدير احتمالات نجاحك.</p>
             </div>

             <div className="space-y-4">
                <textarea 
                  value={description}
                  onChange={e => setDescription(e.target.value)}
                  placeholder="اشرح تفاصيل النزاع هنا..."
                  className="w-full h-48 bg-white border border-slate-200 rounded-3xl p-6 text-sm focus:ring-4 focus:ring-blue-100 transition outline-none resize-none shadow-inner"
                />
                <button className="w-full py-4 border-2 border-dashed border-slate-200 rounded-2xl flex flex-col items-center gap-2 text-slate-400 hover:border-blue-300 hover:text-blue-600 transition">
                   <Upload size={24} />
                   <span className="text-xs font-bold">ارفع الأدلة (عقود، صور محادثات، فواتير)</span>
                </button>
                <button 
                  onClick={handleEvaluate}
                  disabled={!description.trim() || isEvaluating}
                  className="w-full py-5 bg-blue-600 text-white rounded-3xl font-black text-lg shadow-xl shadow-blue-100 disabled:opacity-50 transition active:scale-95"
                >
                  {isEvaluating ? (
                    <div className="flex items-center justify-center gap-2">
                       <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> جاري التقييم الاستراتيجي...
                    </div>
                  ) : "بدء التقييم الآن"}
                </button>
             </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in zoom-in duration-500">
             {/* Score Header */}
             <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white text-center relative overflow-hidden shadow-2xl">
                <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                   <Target size={200} className="absolute -bottom-10 -right-10" />
                </div>
                <div className="relative z-10 space-y-4">
                   <div className="inline-flex flex-col items-center">
                      <span className="text-5xl font-black text-blue-400">{report.strengthScore}%</span>
                      <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-2">فرصة نجاح الموقف</span>
                   </div>
                   <div className="pt-4 border-t border-white/10">
                      <p className="text-xs text-slate-300 leading-relaxed font-medium italic">"{report.aiInsight}"</p>
                   </div>
                </div>
             </div>

             {/* Strengths & Weaknesses */}
             <div className="grid grid-cols-1 gap-4">
                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                   <div className="flex items-center gap-2 text-emerald-600">
                      <CheckCircle2 size={18} />
                      <h4 className="font-black text-sm">نقاط القوة</h4>
                   </div>
                   <ul className="space-y-2">
                      {report.strengths.map((s:string, i:number) => (
                        <li key={i} className="text-xs text-slate-700 flex gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                           {s}
                        </li>
                      ))}
                   </ul>
                </div>

                <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                   <div className="flex items-center gap-2 text-red-600">
                      <AlertTriangle size={18} />
                      <h4 className="font-black text-sm">نقاط الضعف والمخاطر</h4>
                   </div>
                   <ul className="space-y-2">
                      {report.weaknesses.map((w:string, i:number) => (
                        <li key={i} className="text-xs text-slate-700 flex gap-2">
                           <span className="w-1.5 h-1.5 rounded-full bg-red-400 mt-1.5 shrink-0" />
                           {w}
                        </li>
                      ))}
                   </ul>
                </div>
             </div>

             {/* Strategy Card */}
             <div className="p-6 bg-blue-600 rounded-3xl text-white shadow-xl shadow-blue-100 space-y-4">
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                      <Scale size={20} />
                   </div>
                   <h4 className="font-black text-sm">استراتيجية الحل الموصى بها</h4>
                </div>
                <p className="text-sm leading-relaxed font-medium">{report.strategy}</p>
                <div className="flex gap-2 pt-2">
                   <button className="flex-1 bg-white text-blue-600 py-3 rounded-xl text-[10px] font-black uppercase active:scale-95 transition">بدء الصلح الودي</button>
                   <button className="flex-1 bg-blue-500 text-white py-3 rounded-xl text-[10px] font-black uppercase active:scale-95 transition">توكيل محامٍ</button>
                </div>
             </div>

             {/* Laws */}
             <div className="space-y-3">
                <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">الأنظمة المرجعية</h4>
                <div className="flex flex-wrap gap-2">
                   {report.relevantLaws.map((law:string, i:number) => (
                      <span key={i} className="bg-white px-3 py-1.5 border rounded-lg text-[10px] font-bold text-slate-700 shadow-sm">{law}</span>
                   ))}
                </div>
             </div>

             <button 
               onClick={() => setReport(null)}
               className="w-full py-4 bg-slate-900 text-white rounded-3xl font-black text-sm active:scale-95 transition"
             >
               إعادة التقييم بمعطيات جديدة
             </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DisputeEvaluationScreen;
