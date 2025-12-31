
import React, { useState, useRef } from 'react';
import { 
  ArrowRight, CheckCircle2, ShieldCheck, Download, Printer, 
  ChevronDown, CreditCard, Save, User, Users, FileText, 
  Landmark, Check, Bold, Italic, Underline, AlignRight, 
  AlignCenter, Share2, Edit3, Trash2, List
} from 'lucide-react';
import { ContractDraft } from '../types';

interface ContractFinalReviewProps {
  draft: ContractDraft;
  onBack: () => void;
  onNext: () => void;
  onSaveDraft: () => void;
}

const ContractFinalReview: React.FC<ContractFinalReviewProps> = ({ draft, onBack, onNext, onSaveDraft }) => {
  const [contractContent, setContractContent] = useState(draft.generatedText || '');
  const [isEditing, setIsEditing] = useState(false);
  const [checklist, setChecklist] = useState({
    readFull: false,
    understoodTerms: false,
    reviewedFinancials: false,
    verifiedAttachments: false
  });
  const editorRef = useRef<HTMLDivElement>(null);

  const handleFormat = (command: string) => {
    document.execCommand(command, false);
    if (editorRef.current) {
      setContractContent(editorRef.current.innerHTML);
    }
  };

  const isReady = Object.values(checklist).every(v => v === true);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-500 overflow-y-auto pb-48">
      <div className="p-4 bg-white border-b sticky top-0 z-40 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight className="text-slate-700" />
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-900">المراجعة اليدوية والنهائية</h1>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">تنسيق بنود العقد</p>
          </div>
        </div>
        <div className="flex gap-1">
          <button onClick={() => window.print()} className="p-2 text-slate-400 hover:text-blue-600"><Printer size={18} /></button>
          <button className="p-2 text-slate-400 hover:text-blue-600"><Share2 size={18} /></button>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Rich Text Editor Toolbar */}
        <div className="bg-white rounded-2xl border border-slate-200 p-2 flex items-center gap-2 sticky top-20 z-30 shadow-sm overflow-x-auto no-scrollbar">
          <button onClick={() => setIsEditing(!isEditing)} className={`p-2 rounded-xl transition ${isEditing ? 'bg-blue-600 text-white shadow-lg' : 'bg-slate-50 text-slate-400'}`}>
            <Edit3 size={18} />
          </button>
          <div className="h-6 w-px bg-slate-200 mx-1" />
          <button onClick={() => handleFormat('bold')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"><Bold size={18} /></button>
          <button onClick={() => handleFormat('italic')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"><Italic size={18} /></button>
          <button onClick={() => handleFormat('underline')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"><Underline size={18} /></button>
          <div className="h-6 w-px bg-slate-200 mx-1" />
          <button onClick={() => handleFormat('justifyRight')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"><AlignRight size={18} /></button>
          <button onClick={() => handleFormat('justifyCenter')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"><AlignCenter size={18} /></button>
          <button onClick={() => handleFormat('insertUnorderedList')} className="p-2 hover:bg-slate-100 rounded-lg text-slate-600"><List size={18} /></button>
        </div>

        {/* Contract Content Area */}
        <div 
          ref={editorRef}
          contentEditable={isEditing}
          onBlur={(e) => setContractContent(e.currentTarget.innerHTML)}
          dangerouslySetInnerHTML={{ __html: contractContent }}
          className={`bg-white p-10 rounded-[2.5rem] shadow-xl border border-slate-200 font-serif leading-[2.2] text-slate-800 text-sm min-h-[600px] focus:outline-none focus:ring-4 focus:ring-blue-50 transition-all ${isEditing ? 'ring-2 ring-blue-400 cursor-text' : 'cursor-default'}`}
        />

        {/* Verification Checklist */}
        <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-6">
          <h3 className="font-black text-slate-900 text-sm px-2 flex items-center gap-2">
            <ShieldCheck size={18} className="text-blue-600" /> إقرار الجاهزية القانونية
          </h3>
          <div className="grid grid-cols-1 gap-3">
            {[
              { id: 'readFull', label: 'أقر بأنني قرأت العقد كاملاً وراجعت كافة البنود.' },
              { id: 'understoodTerms', label: 'أوافق على جميع الالتزامات المالية والزمنية.' },
              { id: 'reviewedFinancials', label: 'أوافق على نظام حجز المبالغ (Escrow).' },
              { id: 'verifiedAttachments', label: 'تحققت من صحة جميع الأطراف المضافة.' }
            ].map((item) => (
              <label key={item.id} className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl cursor-pointer hover:bg-blue-50 transition group">
                <div className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${checklist[item.id as keyof typeof checklist] ? 'bg-blue-600 border-blue-600 text-white shadow-lg' : 'border-slate-200 bg-white group-hover:border-blue-300'}`}>
                  <input 
                    type="checkbox" 
                    className="hidden" 
                    checked={checklist[item.id as keyof typeof checklist]} 
                    onChange={() => setChecklist(prev => ({...prev, [item.id]: !prev[item.id as keyof typeof checklist]}))}
                  />
                  {checklist[item.id as keyof typeof checklist] && <Check size={14} />}
                </div>
                <span className="text-xs font-bold text-slate-700">{item.label}</span>
              </label>
            ))}
          </div>
        </section>
      </div>

      {/* Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/90 backdrop-blur-md border-t z-50 shadow-2xl flex gap-3">
        <button 
          onClick={onNext}
          disabled={!isReady}
          className={`flex-[3] py-5 rounded-[2rem] font-black text-lg shadow-xl transition-all flex items-center justify-center gap-3 ${isReady ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' : 'bg-slate-100 text-slate-300 cursor-not-allowed'}`}
        >
          الاعتماد والتوقيع <ArrowRight className="rotate-180" size={24} />
        </button>
        <button onClick={onSaveDraft} className="flex-1 bg-slate-50 text-slate-400 rounded-[2rem] font-black text-xs hover:bg-slate-100 border border-slate-100 flex flex-col items-center justify-center">
           <Save size={20} />
           <span>مسودة</span>
        </button>
      </div>
    </div>
  );
};

export default ContractFinalReview;
