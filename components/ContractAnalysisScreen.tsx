
import React, { useState } from 'react';
import { ArrowRight, Upload, FileText, CheckCircle2, AlertTriangle, Scale, ShieldAlert, Sparkles, ChevronDown, List, Info } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

interface ContractAnalysisScreenProps {
  onBack: () => void;
}

const ContractAnalysisScreen: React.FC<ContractAnalysisScreenProps> = ({ onBack }) => {
  const [contractText, setContractText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!contractText.trim()) return;
    setAnalyzing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `قم بتحليل العقد التالي تحليلاً قانونياً شاملاً وفقاً للأنظمة السعودية والشريعة الإسلامية.
يجب أن يشمل التحليل:
1. التحليل الهيكلي (الأطراف، النوع، الالتزامات الرئيسية).
2. التحليل القانوني والامتثال (مطابقة نظام المعاملات المدنية، نظام الشركات، أو الأنظمة ذات الصلة).
3. تقييم المخاطر (عالية، متوسطة، منخفضة) مع شرح لكل خطر.

العقد:
${contractText}`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              type: { type: Type.STRING },
              parties: { type: Type.ARRAY, items: { type: Type.STRING } },
              obligations: { type: Type.ARRAY, items: { type: Type.STRING } },
              complianceScore: { type: Type.NUMBER },
              shariaNotes: { type: Type.ARRAY, items: { type: Type.STRING } },
              risks: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    level: { type: Type.STRING },
                    description: { type: Type.STRING },
                    type: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      });

      setAnalysis(JSON.parse(response.text || "{}"));
    } catch (error) {
      console.error(error);
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-500 overflow-y-auto pb-24">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight className="text-slate-700" />
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-900">تحليل العقود الذكي</h1>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">مدعوم بـ Gemini 3 Pro</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {!analysis ? (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900">ابدأ فحص عقدك</h2>
              <p className="text-slate-500 text-xs">قم بلصق نص العقد أو رفعه ليقوم AI بتحليل الثغرات والمخاطر.</p>
            </div>

            <div className="space-y-4">
              <textarea 
                value={contractText}
                onChange={(e) => setContractText(e.target.value)}
                placeholder="أدخل نص العقد هنا للتحليل..."
                className="w-full h-64 bg-white border border-slate-200 rounded-3xl p-6 text-sm focus:ring-4 focus:ring-blue-100 outline-none resize-none shadow-inner"
              />
              
              <div className="flex gap-2">
                <button className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 transition">
                  <Upload size={16} /> رفع ملف PDF
                </button>
                <button 
                  onClick={handleAnalyze}
                  disabled={!contractText.trim() || analyzing}
                  className="flex-[2] py-4 bg-blue-600 text-white rounded-2xl font-bold text-xs flex items-center justify-center gap-2 shadow-xl shadow-blue-100 disabled:opacity-50 transition"
                >
                  {analyzing ? (
                    <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> جاري التحليل...</>
                  ) : (
                    <><Sparkles size={16} /> تحليل العقد الآن</>
                  )}
                </button>
              </div>
            </div>

            <div className="p-5 bg-indigo-50 rounded-3xl border border-indigo-100 flex gap-4">
              <Info className="text-indigo-600 shrink-0" size={24} />
              <div className="space-y-1">
                <p className="text-xs font-black text-indigo-900 uppercase tracking-widest">كيف يعمل التحليل؟</p>
                <p className="text-[10px] text-indigo-700 leading-relaxed">
                  يقوم المحرك الذكي بمطابقة بنود عقدك مع أكثر من ٥٠٠ نظام ولائحة تنفيذية سعودية، مع رصد بنود "الغرر" أو البنود الباطلة شرعاً.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in zoom-in duration-500">
            {/* Risk Summary Header */}
            <div className={`p-6 rounded-[2.5rem] text-white flex items-center justify-between shadow-xl ${
              analysis.risks.some((r:any) => r.level === 'high') ? 'bg-red-600' : 'bg-emerald-600'
            }`}>
              <div>
                <h3 className="text-2xl font-black">نتائج الفحص</h3>
                <p className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-80">
                  {analysis.risks.some((r:any) => r.level === 'high') ? 'يوجد مخاطر حرجة تتطلب انتباهك' : 'العقد متوافق بنسبة عالية'}
                </p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                {analysis.risks.some((r:any) => r.level === 'high') ? <ShieldAlert size={32} /> : <CheckCircle2 size={32} />}
              </div>
            </div>

            {/* Assessment Cards */}
            <div className="grid grid-cols-1 gap-4">
              {/* Structural */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-indigo-600">
                  <List size={20} />
                  <h4 className="font-black text-sm">التحليل الهيكلي</h4>
                </div>
                <div className="space-y-2">
                  <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">نوع العقد: <span className="text-slate-900">{analysis.type}</span></p>
                  <div className="flex flex-wrap gap-2">
                    {analysis.parties.map((p:string, i:number) => (
                      <span key={i} className="px-3 py-1 bg-slate-100 rounded-lg text-[10px] font-bold text-slate-600">{p}</span>
                    ))}
                  </div>
                </div>
                <div className="space-y-2 pt-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">الالتزامات الرئيسية:</p>
                  <ul className="space-y-2">
                    {analysis.obligations.slice(0, 3).map((obj:string, i:number) => (
                      <li key={i} className="text-xs text-slate-700 flex gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 mt-1.5 shrink-0" />
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Legal & Sharia */}
              <div className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center gap-2 text-blue-600">
                  <Scale size={20} />
                  <h4 className="font-black text-sm">الامتثال القانوني والشرعي</h4>
                </div>
                <div className="flex items-center justify-between p-3 bg-blue-50 rounded-2xl border border-blue-100">
                  <span className="text-xs font-bold text-blue-900">نسبة المطابقة النظامية</span>
                  <span className="text-lg font-black text-blue-600">{analysis.complianceScore}%</span>
                </div>
                <div className="space-y-2">
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">ملاحظات شرعية:</p>
                  <ul className="space-y-2">
                    {analysis.shariaNotes.map((note:string, i:number) => (
                      <li key={i} className="text-xs text-slate-600 flex gap-2">
                        <div className="w-4 h-4 rounded bg-emerald-100 text-emerald-600 flex items-center justify-center shrink-0">
                          <CheckCircle2 size={10} />
                        </div>
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Risks */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm px-1">المخاطر المرصودة</h4>
                {analysis.risks.map((risk:any, i:number) => (
                  <div key={i} className={`p-4 rounded-3xl border flex gap-4 ${
                    risk.level === 'high' ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'
                  }`}>
                    <AlertTriangle className={risk.level === 'high' ? 'text-red-500' : 'text-amber-500'} size={24} />
                    <div className="space-y-1">
                      <p className={`text-xs font-black uppercase tracking-widest ${risk.level === 'high' ? 'text-red-900' : 'text-amber-900'}`}>{risk.type}</p>
                      <p className="text-[10px] text-slate-700 leading-relaxed font-medium">{risk.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => setAnalysis(null)}
              className="w-full py-4 bg-slate-900 text-white rounded-3xl font-black text-sm shadow-xl transition active:scale-95"
            >
              فحص عقد جديد
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractAnalysisScreen;
