
import React, { useState, useRef, useEffect } from 'react';
/* Added Loader2 to imports */
import { 
  ArrowRight, Users, MessageSquare, Target, Sparkles, 
  Send, Paperclip, ChevronLeft, Check, X, 
  History, Clock, ShieldCheck, User, Bot, Plus, 
  ArrowUpRight, Info, AlertTriangle, ChevronRight, 
  Layers, Search, FileText, CheckCircle2, Loader2
} from 'lucide-react';
import { ContractDraft, UserProfile, Message, NegotiationProposal } from '../types';

interface ContractNegotiationScreenProps {
  draft: ContractDraft;
  user: UserProfile;
  onBack: () => void;
  onFinish: () => void;
}

const ContractNegotiationScreen: React.FC<ContractNegotiationScreenProps> = ({ draft, user, onBack, onFinish }) => {
  const [selectedClauseId, setSelectedClauseId] = useState<string>('c5');
  const [activeTabMobile, setActiveTabMobile] = useState<'contract' | 'negotiation' | 'chat'>('negotiation');
  const [isAiMediatorLoading, setIsAiMediatorLoading] = useState(false);
  const [showApprovalModal, setShowApprovalModal] = useState(false);

  const [proposals, setProposals] = useState<NegotiationProposal[]>([
    {
      id: 'p1', clauseId: 'c5', proposedBy: 'الطرف الثاني (شركة المستقبل)', 
      proposedText: 'يلتزم الطرف الأول بدفع مبلغ ١٢,٠٠٠ ريال سعودي نظير الخدمات المقدمة بدلاً من ١٠,٠٠٠ ريال.',
      reason: 'ارتفاع تكاليف المواد الخام اللوجستية بنسبة ١٥٪ منذ تاريخ المسودة الأولى.',
      status: 'pending', timestamp: 'منذ ١٠ دقائق', isOwn: false
    },
    {
      id: 'p2', clauseId: 'c3', proposedBy: 'أنت', 
      proposedText: 'مدة العقد سنة واحدة تبدأ من تاريخ التوقيع الفعلي.',
      reason: 'لضمان مراجعة الأداء سنوياً بدقة ومطابقة التقارير المالية.',
      status: 'accepted', timestamp: 'منذ ساعة', isOwn: true
    },
    {
      id: 'p3', clauseId: 'c5', proposedBy: 'أنت', 
      proposedText: 'يلتزم الطرف الأول بدفع مبلغ ١١,٠٠٠ ريال سعودي.',
      reason: 'مقترح وسط لتقريب وجهات النظر.',
      status: 'rejected', timestamp: 'منذ ساعتين', isOwn: true
    }
  ]);

  const clauses = [
    { id: 'c1', title: 'البند 1: التعريفات', content: 'يقصد بالمصطلحات التالية المعاني الموضحة أمام كل منها ما لم يقتضِ السياق خلاف ذلك...', status: 'agreed' },
    { id: 'c2', title: 'البند 2: موضوع العقد', content: 'اتفق الطرفان على قيام الطرف الثاني بتقديم الخدمات التقنية الموضحة في الملحق (أ)...', status: 'agreed' },
    { id: 'c3', title: 'البند 3: مدة العقد', content: 'يسري هذا العقد لمدة سنة واحدة تبدأ من تاريخ توقيع الأطراف عليه...', status: 'agreed' },
    { id: 'c4', title: 'البند 4: السرية', content: 'يلتزم الطرفان بالمحافظة على سرية المعلومات المتبادلة طوال مدة العقد ولمدة سنتين من تاريخ انتهائه...', status: 'unreviewed' },
    { id: 'c5', title: 'البند 5: المقابل المالي', content: 'يلتزم الطرف الأول بدفع مبلغ ١٠,٠٠٠ ريال سعودي نظير الخدمات المقدمة من الطرف الثاني...', status: 'discussion' },
    { id: 'c6', title: 'البند 6: فض النزاعات', content: 'في حالة نشوء نزاع حول تفسير أو تنفيذ هذا العقد، يتم حله ودياً، وفي حال تعذر ذلك يتم اللجوء إلى القضاء...', status: 'discussion' }
  ];

  const chatMessages: Message[] = [
    { id: 'm1', role: 'negotiator', content: 'مرحباً، هل يمكننا مراجعة البند الخامس؟ المبلغ المقترح لا يغطي تكاليف الشحن الجديدة.', timestamp: new Date(Date.now() - 600000) },
    { id: 'm2', role: 'user', content: 'أنا متفهم لوجهة نظرك، ولكن ميزانية المشروع محددة بـ ١١,٠٠٠ كحد أقصى.', timestamp: new Date(Date.now() - 300000) },
    { id: 'm3', role: 'negotiator', content: 'دعنا نبحث عن حل وسط يرضي الطرفين.', timestamp: new Date(Date.now() - 60000) }
  ];

  const handleProposeSolution = () => {
    setIsAiMediatorLoading(true);
    setTimeout(() => {
      setIsAiMediatorLoading(false);
      alert('تم إرسال مقترح الحل الوسط للطرف الآخر بنجاح.');
    }, 1500);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'agreed': return 'bg-emerald-500';
      case 'discussion': return 'bg-amber-500';
      case 'rejected': return 'bg-red-500';
      default: return 'bg-slate-100';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-500 overflow-hidden h-screen">
      {/* Header */}
      <div className="bg-white border-b sticky top-0 z-40 shadow-sm p-4">
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-3">
              <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
                 <ArrowRight className="text-slate-700" />
              </button>
              <div>
                 <h1 className="text-sm font-black text-slate-900">التفاوض على العقد</h1>
                 <div className="flex gap-2 items-center mt-0.5">
                    <div className="flex -space-x-1.5 rtl:space-x-reverse">
                       <div className="w-6 h-6 rounded-full bg-blue-600 border-2 border-white flex items-center justify-center text-[8px] text-white font-black shadow-sm ring-1 ring-blue-100">أنت</div>
                       <div className="w-6 h-6 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px] text-slate-600 font-black shadow-sm">ط.٢</div>
                    </div>
                    <span className="text-[9px] font-black text-emerald-600 flex items-center gap-1">
                       <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" /> الطرف الثاني متصل
                    </span>
                 </div>
              </div>
           </div>
           <div className="flex items-center gap-3">
              <button className="hidden md:flex p-2 bg-slate-50 rounded-xl text-slate-400 hover:text-blue-600 transition"><Layers size={18} /></button>
              <button 
                onClick={() => setShowApprovalModal(true)}
                className="px-5 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black shadow-xl shadow-blue-100 hover:bg-blue-700 active:scale-95 transition"
              >
                المراجعة النهائية
              </button>
           </div>
        </div>
      </div>

      {/* Mobile Nav Tabs */}
      <div className="lg:hidden flex bg-white border-b p-1 z-30">
        {[
          { id: 'contract', label: 'العقد', icon: <FileText size={14} /> },
          { id: 'negotiation', label: 'التفاوض', icon: <Target size={14} /> },
          { id: 'chat', label: 'المحادثة', icon: <MessageSquare size={14} /> }
        ].map(t => (
          <button
            key={t.id}
            onClick={() => setActiveTabMobile(t.id as any)}
            className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-[10px] font-black transition-all ${activeTabMobile === t.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400'}`}
          >
            {t.icon} {t.label}
          </button>
        ))}
      </div>

      {/* 3-Panel Layout */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* PANEL 1: Left - Contract Structure (40% desktop) */}
        <div className={`w-full lg:w-[35%] bg-white border-l flex flex-col ${activeTabMobile === 'contract' ? 'flex' : 'hidden lg:flex'}`}>
           <div className="p-4 border-b bg-slate-50/50 flex items-center justify-between">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <FileText size={14} className="text-blue-500" /> مسودة العقد الحالية
              </h3>
              <div className="flex gap-2">
                 <button className="p-1 text-slate-300 hover:text-blue-600 transition"><Search size={14} /></button>
              </div>
           </div>
           <div className="flex-1 overflow-y-auto p-4 space-y-3 custom-scrollbar">
              {clauses.map((c) => (
                <button
                  key={c.id}
                  onClick={() => { setSelectedClauseId(c.id); setActiveTabMobile('negotiation'); }}
                  className={`w-full p-5 rounded-[1.8rem] border text-right transition-all group relative overflow-hidden ${
                    selectedClauseId === c.id ? 'border-blue-600 bg-blue-50/20 shadow-lg shadow-blue-50 ring-2 ring-blue-600/5' : 'border-slate-50 hover:border-slate-200 hover:bg-slate-50/30'
                  }`}
                >
                  <div className={`absolute top-0 left-0 w-1.5 h-full ${getStatusColor(c.status)}`} />
                  <div className="flex items-center justify-between mb-2">
                     <span className={`text-[10px] font-black ${selectedClauseId === c.id ? 'text-blue-900' : 'text-slate-600'}`}>{c.title}</span>
                     {c.status === 'agreed' ? <CheckCircle2 size={12} className="text-emerald-500" /> : c.status === 'discussion' ? <Clock size={12} className="text-amber-500" /> : null}
                  </div>
                  <p className={`text-[10px] leading-relaxed line-clamp-2 ${selectedClauseId === c.id ? 'text-blue-800/70' : 'text-slate-400'} font-medium`}>{c.content}</p>
                </button>
              ))}
           </div>
           <div className="p-4 bg-slate-50 border-t flex items-center justify-between">
              <div className="flex gap-2">
                 <div className="flex items-center gap-1 text-[8px] font-black text-slate-400"><div className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> متفق عليه</div>
                 <div className="flex items-center gap-1 text-[8px] font-black text-slate-400"><div className="w-1.5 h-1.5 rounded-full bg-amber-500" /> نقاش</div>
              </div>
              <button className="text-[9px] font-black text-blue-600 uppercase hover:underline">مقارنة الإصدارات</button>
           </div>
        </div>

        {/* PANEL 2: Center - Negotiation Core (40% desktop) */}
        <div className={`flex-1 bg-slate-50 overflow-y-auto flex flex-col p-6 space-y-8 ${activeTabMobile === 'negotiation' ? 'flex' : 'hidden lg:flex'}`}>
           {selectedClauseId ? (
             <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 space-y-8 max-w-2xl mx-auto w-full">
                {/* Active Clause Header */}
                <div className="flex items-center justify-between">
                   <div className="space-y-1">
                      <h2 className="text-2xl font-black text-slate-900">{clauses.find(c => c.id === selectedClauseId)?.title}</h2>
                      <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">تعديل النص الأصلي ومناقشة الشروط</p>
                   </div>
                   <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase ${
                     clauses.find(c => c.id === selectedClauseId)?.status === 'agreed' ? 'bg-emerald-50 text-emerald-600' : 'bg-amber-50 text-amber-600'
                   }`}>
                      {clauses.find(c => c.id === selectedClauseId)?.status === 'agreed' ? '✓ تم التوصل لاتفاق' : '⏳ قيد المراجعة والرد'}
                   </div>
                </div>

                {/* Main Content Box */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-sm relative group">
                   <p className="text-base font-serif leading-[1.8] text-slate-800">{clauses.find(c => c.id === selectedClauseId)?.content}</p>
                   <button className="absolute top-4 left-4 p-2 bg-slate-50 text-slate-400 rounded-xl opacity-0 group-hover:opacity-100 transition hover:text-blue-600">
                      <Plus size={18} />
                   </button>
                </div>

                {/* Proposals History */}
                <div className="space-y-4">
                   <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-4 flex items-center gap-2">
                      <History size={14} className="text-blue-400" /> سجل التعديلات والمقترحات
                   </h3>
                   
                   {proposals.filter(p => p.clauseId === selectedClauseId).map((prop) => (
                     <div key={prop.id} className={`p-6 rounded-[2.2rem] border shadow-sm space-y-5 relative transition-all group ${
                       prop.status === 'accepted' ? 'bg-emerald-50 border-emerald-100 ring-2 ring-emerald-500/10' : 
                       prop.status === 'rejected' ? 'bg-red-50/30 border-red-100 grayscale-[0.5]' : 'bg-white border-slate-100'
                     }`}>
                        <div className="flex items-center justify-between">
                           <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-2xl flex items-center justify-center text-[10px] font-black uppercase shadow-sm ${
                                prop.isOwn ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'
                              }`}>
                                 {prop.isOwn ? 'أنت' : 'ط.٢'}
                              </div>
                              <div>
                                 <p className="text-xs font-black text-slate-900">{prop.proposedBy}</p>
                                 <p className="text-[9px] text-slate-400 font-bold flex items-center gap-1"><History size={10} /> {prop.timestamp}</p>
                              </div>
                           </div>
                           <div className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-wider ${
                             prop.status === 'accepted' ? 'bg-emerald-600 text-white' : prop.status === 'rejected' ? 'bg-red-500 text-white' : 'bg-amber-500 text-white shadow-lg shadow-amber-100'
                           }`}>
                              {prop.status === 'accepted' ? 'مقبول' : prop.status === 'rejected' ? 'مرفوض' : 'بانتظار ردك'}
                           </div>
                        </div>

                        <div className={`p-5 rounded-3xl border border-slate-100/50 text-sm leading-relaxed font-serif relative overflow-hidden ${
                          prop.status === 'rejected' ? 'line-through text-slate-400' : 'text-slate-700 italic'
                        }`}>
                           {prop.status === 'accepted' && <div className="absolute top-0 right-0 w-1 h-full bg-emerald-500" />}
                           "{prop.proposedText}"
                        </div>

                        <div className="flex gap-3 px-1">
                           <div className="w-1.5 h-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                           <p className="text-[11px] text-slate-500 leading-relaxed"><span className="font-black text-slate-900 underline decoration-blue-200 underline-offset-4">سبب التعديل:</span> {prop.reason}</p>
                        </div>

                        {!prop.isOwn && prop.status === 'pending' && (
                          <div className="flex gap-3 pt-3">
                             <button className="flex-1 py-4 bg-emerald-600 text-white rounded-[1.2rem] font-black text-xs shadow-xl shadow-emerald-100 hover:bg-emerald-700 active:scale-95 transition flex items-center justify-center gap-2">
                                <Check size={16} /> قبول التعديل
                             </button>
                             <button className="flex-1 py-4 bg-white border border-red-100 text-red-500 rounded-[1.2rem] font-black text-xs hover:bg-red-50 transition flex items-center justify-center gap-2">
                                <X size={16} /> رفض
                             </button>
                             <button className="px-5 py-4 bg-slate-100 text-slate-600 rounded-[1.2rem] font-black text-[10px] hover:bg-slate-200 transition">اقتراح آخر</button>
                          </div>
                        )}
                     </div>
                   ))}

                   <button className="w-full py-8 border-2 border-dashed border-slate-200 rounded-[2.5rem] text-slate-400 hover:border-blue-300 hover:text-blue-600 hover:bg-blue-50/20 transition flex flex-col items-center justify-center gap-3 active:scale-95 group">
                      <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-sm group-hover:scale-110 transition">
                        <Plus size={24} />
                      </div>
                      <span className="text-[11px] font-black uppercase tracking-widest">اقترح تعديلك الخاص على هذا البند</span>
                   </button>
                </div>

                {/* AI Mediator Tool */}
                <div className="p-8 bg-gradient-to-br from-indigo-900 to-slate-900 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full -mr-32 -mt-32 blur-3xl animate-pulse" />
                   <div className="relative z-10 flex flex-col md:flex-row items-start gap-6">
                      <div className="w-16 h-16 bg-white/10 rounded-[1.5rem] flex items-center justify-center backdrop-blur-xl shrink-0 shadow-2xl border border-white/5 group-hover:rotate-12 transition-transform duration-500">
                         <Bot size={32} className="text-blue-400" />
                      </div>
                      <div className="space-y-4">
                         <div className="space-y-1">
                            <h4 className="text-xs font-black uppercase tracking-widest text-blue-300">الوسيط الذكي (AI Mediator)</h4>
                            <p className="text-sm text-slate-200 leading-relaxed font-medium">
                              رصدت وجود خلاف حول "المقابل المالي". بالنظر لبيانات السوق السعودي الحالية وعقود مشابهة، أقترح عليك:
                            </p>
                         </div>
                         <div className="bg-white/5 border border-white/10 p-4 rounded-2xl space-y-2">
                            <p className="text-xs font-bold text-amber-300 flex items-center gap-2"><Sparkles size={14} /> حل وسط مقترح (١١,٥٠٠ ريال)</p>
                            <p className="text-[10px] text-slate-400 leading-relaxed">المتوسط المعتمد في عقود الخدمات التقنية لهذا القطاع هو ١١,٥٠٠ ريال مع تمديد فترة الدفع لـ ١٥ يوماً بدلاً من ٥.</p>
                         </div>
                         <div className="flex gap-2">
                            <button 
                              onClick={handleProposeSolution}
                              disabled={isAiMediatorLoading}
                              className="px-6 py-2.5 bg-blue-600 text-white rounded-xl text-[10px] font-black shadow-xl active:scale-95 transition flex items-center gap-2"
                            >
                               {isAiMediatorLoading ? <Loader2 size={14} className="animate-spin" /> : <Check size={14} />} 
                               اعتماد كحل وسط
                            </button>
                            <button className="px-6 py-2.5 bg-white/5 text-white border border-white/10 rounded-xl text-[10px] font-black hover:bg-white/10 transition">بيانات السوق</button>
                         </div>
                      </div>
                   </div>
                </div>

                {/* Deadlock Resolution Indicator */}
                <div className="p-6 border border-amber-100 bg-amber-50/50 rounded-[2rem] flex items-center gap-4">
                   <div className="w-10 h-10 bg-amber-100 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
                      <AlertTriangle size={24} />
                   </div>
                   <div className="flex-1">
                      <p className="text-[10px] text-amber-800 font-bold leading-tight">لم يتم التوصل لاتفاق بعد ٥ أيام من النقاش.</p>
                      <div className="flex gap-3 mt-2">
                         <button className="text-[9px] font-black text-amber-600 underline">تمديد التفاوض</button>
                         <button className="text-[9px] font-black text-blue-600 underline">طلب وساطة محامٍ</button>
                      </div>
                   </div>
                </div>
             </div>
           ) : (
             <div className="flex-1 flex flex-col items-center justify-center text-center p-12 opacity-30">
                <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mb-6">
                   <History size={48} className="text-slate-400" />
                </div>
                <h3 className="text-xl font-black text-slate-900">بدء التفاوض</h3>
                <p className="text-xs text-slate-500 font-medium max-w-[200px] mt-2">اختر أحد بنود العقد من القائمة الجانبية لبدء النقاش واقتراح التعديلات.</p>
             </div>
           )}
        </div>

        {/* PANEL 3: Right - Activity & Chat (25% desktop) */}
        <div className={`w-full lg:w-[25%] bg-white border-r flex flex-col ${activeTabMobile === 'chat' ? 'flex' : 'hidden lg:flex'}`}>
           <div className="p-4 border-b bg-slate-50/50">
              <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <MessageSquare size={14} className="text-blue-500" /> المحادثة المباشرة والنشاط
              </h3>
           </div>
           
           <div className="flex-1 overflow-y-auto p-4 space-y-6 custom-scrollbar">
              {/* Mini Log Segment */}
              <div className="space-y-2 pb-6 border-b border-slate-50">
                 <p className="text-[8px] font-black text-slate-300 uppercase tracking-widest mb-3">اليوم - ٣٠ ديسمبر</p>
                 {[
                   { t: '١٠:٤٥ ص', msg: 'الطرف الثاني قبل البند ٣', type: 'success' },
                   { t: '١٠:٣٠ ص', msg: 'أنت اقترحت تعديل البند ٥', type: 'info' },
                   { t: '١٠:١٥ ص', msg: 'الطرف الثاني رفض مقترح البند ٥', type: 'error' }
                 ].map((log, i) => (
                   <div key={i} className="flex gap-3 text-[9px] font-bold items-center group">
                      <span className="text-slate-300 group-hover:text-blue-600 transition whitespace-nowrap">{log.t}</span>
                      <div className={`w-1 h-1 rounded-full ${log.type === 'success' ? 'bg-emerald-500' : log.type === 'error' ? 'bg-red-500' : 'bg-blue-500'}`} />
                      <span className="text-slate-500 group-hover:text-slate-800 truncate">{log.msg}</span>
                   </div>
                 ))}
              </div>

              {/* Chat Messages UI */}
              <div className="space-y-4">
                {chatMessages.map(m => (
                  <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-start' : 'justify-end'}`}>
                    <div className={`max-w-[85%] space-y-1 ${m.role === 'user' ? 'text-right' : 'text-left'}`}>
                       <div className={`p-4 rounded-3xl text-[10px] font-medium leading-relaxed shadow-sm ${
                         m.role === 'user' ? 'bg-blue-600 text-white rounded-tr-none' : 'bg-slate-100 text-slate-700 rounded-tl-none'
                       }`}>
                          {m.content}
                       </div>
                       <p className="text-[8px] text-slate-300 font-bold uppercase">{m.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </div>
                  </div>
                ))}
              </div>
           </div>

           {/* Chat Input Field */}
           <div className="p-4 bg-white border-t space-y-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              <div className="relative group">
                 <input 
                   type="text" 
                   placeholder="اكتب رسالة تفاوض..."
                   className="w-full bg-slate-50 border-none rounded-2xl py-4 px-5 pr-12 text-[11px] font-medium outline-none focus:ring-2 focus:ring-blue-100 transition shadow-inner"
                 />
                 <button className="absolute left-4 top-1/2 -translate-y-1/2 text-blue-600 p-2 bg-white rounded-xl shadow-sm hover:scale-105 active:scale-95 transition">
                   <Send size={16} />
                 </button>
              </div>
              <div className="flex justify-between items-center px-1">
                 <div className="flex gap-3">
                   <button className="text-slate-300 hover:text-blue-500 transition"><Paperclip size={16} /></button>
                   <button className="text-slate-300 hover:text-amber-500 transition"><AlertTriangle size={16} /></button>
                 </div>
                 <div className="flex items-center gap-1 text-[8px] font-black text-slate-300 uppercase tracking-widest">
                    <ShieldCheck size={10} className="text-emerald-500" /> تشفير كامل
                 </div>
              </div>
           </div>
        </div>
      </div>

      {/* Approval Overlay / Modal */}
      {showApprovalModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/60 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-sm rounded-[2.5rem] p-8 space-y-6 shadow-2xl animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto shadow-inner">
                 <CheckCircle2 size={48} />
              </div>
              <div className="text-center space-y-2">
                 <h3 className="text-xl font-black text-slate-900">هل أنت مستعد للمراجعة؟</h3>
                 <p className="text-xs text-slate-500 leading-relaxed">سيتم إغلاق باب التفاوض وتحويل العقد إلى وثيقة نهائية جاهزة للتوقيع الرقمي.</p>
              </div>
              <div className="space-y-3">
                 <button 
                   onClick={() => { setShowApprovalModal(false); onFinish(); }}
                   className="w-full py-4 bg-blue-600 text-white rounded-2xl font-black text-sm shadow-xl shadow-blue-100 active:scale-95 transition"
                 >
                   تأكيد وإنهاء التفاوض
                 </button>
                 <button 
                   onClick={() => setShowApprovalModal(false)}
                   className="w-full py-4 bg-slate-50 text-slate-400 rounded-2xl font-black text-sm hover:bg-slate-100 transition"
                 >
                   إكمال التفاوض
                 </button>
              </div>
           </div>
        </div>
      )}

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: #cbd5e1; }
      `}</style>
    </div>
  );
};

export default ContractNegotiationScreen;
