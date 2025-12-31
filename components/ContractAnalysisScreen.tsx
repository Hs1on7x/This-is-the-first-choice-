import React, { useState } from 'react';
/* Added missing icon imports from lucide-react: X, ShieldCheck, Download */
import { ArrowRight, Upload, FileText, CheckCircle2, AlertTriangle, Scale, ShieldAlert, Sparkles, ChevronDown, List, Info, Loader2, Search, Check, X, ShieldCheck, Download } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

interface ContractAnalysisScreenProps {
  onBack: () => void;
}

const ContractAnalysisScreen: React.FC<ContractAnalysisScreenProps> = ({ onBack }) => {
  const [contractText, setContractText] = useState('');
  const [analyzing, setAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState<any>(null);
  const [uploading, setUploading] = useState(false);

  const handleAnalyze = async () => {
    if (!contractText.trim()) return;
    setAnalyzing(true);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-pro-preview',
        contents: `قم بتحليل العقد التالي تحليلاً قانونياً دقيقاً وفقاً للأنظمة السعودية الحديثة (مثل نظام المعاملات المدنية).
يجب أن تعيد النتيجة بتنسيق JSON حصراً:
1. نوع العقد (type).
2. الأطراف المستخرجة (parties).
3. الالتزامات الرئيسية (obligations).
4. درجة الامتثال من 100 (complianceScore).
5. ملاحظات شرعية وقانونية (shariaNotes).
6. قائمة المخاطر (risks) حيث كل خطر له: المستوى (level: high/medium/low)، الوصف (description)، والنوع (type).

العقد المراد تحليله:
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

      const result = JSON.parse(response.text || "{}");
      setAnalysis(result);
    } catch (error) {
      console.error(error);
      alert("عذراً، حدث خطأ أثناء التحليل. يرجى التأكد من نص العقد والمحاولة لاحقاً.");
    } finally {
      setAnalyzing(false);
    }
  };

  const simulateFileUpload = () => {
    setUploading(true);
    setTimeout(() => {
      setUploading(false);
      setContractText("عقد تقديم خدمات تقنية\nإنه في تاريخ 2025/01/01 تم الاتفاق بين شركة الحلول (طرف أول) ومحمد علي (طرف ثاني) على تطوير منصة إلكترونية. يلتزم الطرف الثاني بتسليم المشروع في شهر واحد. المقابل المالي 15,000 ريال. لا يحق للطرف الثاني المطالبة بأي تعويض في حال التأخير الناتج عن الموردين.");
    }, 1500);
  };

  const handleApplyRec = () => {
    alert("تم نسخ التوصيات المقترحة للحافظة. يمكنك لصقها وتعديل عقدك الآن.");
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
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">فحص الثغرات والمخاطر القانونية</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {!analysis ? (
          <div className="space-y-6">
            <div className="space-y-1">
              <h2 className="text-xl font-black text-slate-900">ابدأ فحص عقدك</h2>
              <p className="text-slate-500 text-xs font-medium leading-relaxed">قم بلصق نص العقد أدناه أو ارفع ملف PDF ليقوم المساعد الذكي بتحديد المخاطر القانونية فوراً.</p>
            </div>

            <div className="space-y-4">
              <div className="relative">
                <textarea 
                  value={contractText}
                  onChange={(e) => setContractText(e.target.value)}
                  placeholder="أدخل نص العقد هنا للتحليل (مثلاً: عقد إيجار، عقد عمل...)"
                  className="w-full h-64 bg-white border-2 border-slate-100 rounded-[2rem] p-6 text-sm focus:border-blue-600 outline-none resize-none shadow-inner transition font-serif"
                />
                {contractText.length > 0 && (
                  <button onClick={() => setContractText('')} className="absolute top-4 left-4 p-2 bg-slate-100 text-slate-400 rounded-xl hover:text-red-500 transition"><X size={16} /></button>
                )}
              </div>
              
              <div className="flex gap-3">
                <button 
                  onClick={simulateFileUpload}
                  disabled={uploading}
                  className="flex-1 py-4 bg-slate-100 text-slate-700 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 hover:bg-slate-200 active:scale-95 transition"
                >
                  {uploading ? <Loader2 size={16} className="animate-spin" /> : <Upload size={16} />} 
                  رفع PDF
                </button>
                <button 
                  onClick={handleAnalyze}
                  disabled={!contractText.trim() || analyzing}
                  className="flex-[2] py-4 bg-blue-600 text-white rounded-3xl font-black text-sm flex items-center justify-center gap-2 shadow-xl shadow-blue-200 disabled:opacity-50 active:scale-95 transition overflow-hidden relative group"
                >
                  <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                  {analyzing ? (
                    <><Loader2 size={18} className="animate-spin" /> جاري الفحص القانوني...</>
                  ) : (
                    <><Sparkles size={18} /> بدء التحليل الفوري</>
                  )}
                </button>
              </div>
            </div>

            <div className="p-5 bg-indigo-50 rounded-3xl border border-indigo-100 flex gap-4 animate-pulse">
              <Info className="text-indigo-600 shrink-0" size={24} />
              <div className="space-y-1">
                <p className="text-xs font-black text-indigo-900 uppercase tracking-widest">تغطية الأنظمة</p>
                <p className="text-[10px] text-indigo-700 leading-relaxed font-medium">
                  يغطي التحليل نظام المعاملات المدنية، نظام الشركات، ونظام العمل، بالإضافة إلى رصد بنود "الغرر" والجهالة الشرعية.
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="space-y-6 animate-in zoom-in duration-500">
            {/* Risk Summary Header */}
            <div className={`p-8 rounded-[3rem] text-white flex items-center justify-between shadow-2xl relative overflow-hidden ${
              analysis.risks.some((r:any) => r.level === 'high') ? 'bg-red-600' : 'bg-emerald-600'
            }`}>
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16 blur-2xl" />
              <div className="relative z-10">
                <h3 className="text-2xl font-black">نتيجة الفحص</h3>
                <p className="text-[10px] font-black uppercase tracking-widest mt-1 opacity-80 flex items-center gap-2">
                  {analysis.risks.some((r:any) => r.level === 'high') ? (
                    <><ShieldAlert size={14} /> تم رصد مخاطر حرجة تتطلب التعديل</>
                  ) : (
                    <><CheckCircle2 size={14} /> العقد سليم قانونياً بنسبة كبيرة</>
                  )}
                </p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-[1.5rem] flex items-center justify-center backdrop-blur-md shadow-2xl border border-white/10">
                {analysis.risks.some((r:any) => r.level === 'high') ? <AlertTriangle size={32} /> : <ShieldCheck size={32} />}
              </div>
            </div>

            {/* Assessment Cards */}
            <div className="grid grid-cols-1 gap-4">
              {/* Compliance Score */}
              <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm space-y-4">
                <div className="flex items-center justify-between">
                   <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shadow-inner"><Scale size={24} /></div>
                      <h4 className="font-black text-sm uppercase tracking-widest">مؤشر الامتثال</h4>
                   </div>
                   <span className={`text-2xl font-black ${analysis.complianceScore > 70 ? 'text-emerald-500' : 'text-amber-500'}`}>{analysis.complianceScore}%</span>
                </div>
                <div className="w-full h-2 bg-slate-50 rounded-full overflow-hidden">
                   <div className={`h-full transition-all duration-1000 ${analysis.complianceScore > 70 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${analysis.complianceScore}%` }} />
                </div>
              </div>

              {/* Parties & Obligations */}
              <div className="bg-white p-7 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
                <div className="flex items-center gap-3 text-indigo-600">
                  <List size={20} />
                  <h4 className="font-black text-sm uppercase tracking-widest">الأطراف والالتزامات</h4>
                </div>
                <div className="space-y-3">
                  <div className="flex flex-wrap gap-2">
                    {analysis.parties.map((p:string, i:number) => (
                      <span key={i} className="px-4 py-1.5 bg-slate-50 border border-slate-100 rounded-xl text-[10px] font-black text-slate-600 shadow-sm">{p}</span>
                    ))}
                  </div>
                  <div className="space-y-3 pt-3 border-t border-slate-50">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">البنود الجوهرية المستخرجة:</p>
                    <ul className="space-y-2.5">
                      {analysis.obligations.map((obj:string, i:number) => (
                        <li key={i} className="text-xs text-slate-700 flex gap-3 leading-relaxed">
                          <CheckCircle2 size={14} className="text-blue-500 shrink-0 mt-0.5" />
                          <span className="font-medium">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Detailed Risks */}
              <section className="space-y-4">
                <h4 className="font-black text-slate-900 text-sm px-2 uppercase tracking-widest">⚠️ المخاطر القانونية المرصودة</h4>
                {analysis.risks.map((risk:any, i:number) => (
                  <div key={i} className={`p-6 rounded-[2.2rem] border shadow-sm flex gap-5 group transition-all hover:translate-x-[-4px] ${
                    risk.level === 'high' ? 'bg-red-50 border-red-100' : 'bg-amber-50 border-amber-100'
                  }`}>
                    <div className={`w-12 h-12 rounded-2xl shrink-0 flex items-center justify-center shadow-inner ${
                       risk.level === 'high' ? 'bg-white text-red-500' : 'bg-white text-amber-500'
                    }`}>
                       <ShieldAlert size={28} />
                    </div>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                         <span className={`text-[8px] font-black uppercase px-2 py-0.5 rounded-full ${
                            risk.level === 'high' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white'
                         }`}>{risk.level === 'high' ? 'عالي الخطورة' : 'متوسط'}</span>
                         <p className="text-[10px] font-black text-slate-900 uppercase tracking-tighter opacity-40">{risk.type}</p>
                      </div>
                      <p className="text-xs font-bold text-slate-800 leading-relaxed">{risk.description}</p>
                      <button onClick={handleApplyRec} className="text-[9px] font-black text-blue-600 uppercase hover:underline pt-2 flex items-center gap-1">
                         تطبيق التعديل المقترح <ChevronDown size={10} className="rotate-90" />
                      </button>
                    </div>
                  </div>
                ))}
              </section>

              {/* Sharia & Legal Notes */}
              <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white shadow-2xl space-y-6">
                 <div className="flex items-center gap-3 text-blue-400">
                    <CheckCircle2 size={24} />
                    <h4 className="font-black text-sm uppercase tracking-widest">ملاحظات الامتثال الشرعي</h4>
                 </div>
                 <div className="space-y-4">
                    {analysis.shariaNotes.map((note:string, i:number) => (
                      <div key={i} className="flex gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 group hover:bg-white/10 transition-colors">
                         <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2 shrink-0 group-hover:animate-ping" />
                         <p className="text-xs text-slate-300 leading-relaxed font-medium italic">"{note}"</p>
                      </div>
                    ))}
                 </div>
              </div>
            </div>

            <div className="flex gap-3">
               <button 
                 onClick={() => setAnalysis(null)}
                 className="flex-1 py-4 bg-white border border-slate-200 text-slate-500 rounded-3xl font-black text-sm hover:bg-slate-50 transition active:scale-95 shadow-sm"
               >
                 فحص عقد آخر
               </button>
               <button 
                 onClick={handleApplyRec}
                 className="flex-[2] py-4 bg-blue-600 text-white rounded-3xl font-black text-sm shadow-xl shadow-blue-200 active:scale-95 transition flex items-center justify-center gap-2"
               >
                 <Download size={18} /> تصدير التقرير القانوني
               </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContractAnalysisScreen;