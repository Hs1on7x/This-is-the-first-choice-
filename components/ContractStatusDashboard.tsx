import React, { useState } from 'react';
import { 
  ArrowRight, FileText, Download, Printer, Share2, 
  MessageSquare, Gavel, ShieldCheck, Clock, CheckCircle2, 
  ChevronLeft, ExternalLink, Paperclip, CreditCard, 
  History, Info, Bell, MoreVertical, Link as LinkIcon, Lock,
  Check, X, Sparkles, Star, AlertTriangle
} from 'lucide-react';

interface ContractStatusDashboardProps {
  onBack: () => void;
  onOpenDispute: () => void;
}

const ContractStatusDashboard: React.FC<ContractStatusDashboardProps> = ({ onBack, onOpenDispute }) => {
  const [activeTab, setActiveTab] = useState<'info' | 'docs' | 'finance' | 'signatures' | 'activity'>('info');

  const contractInfo = {
    name: "عقد خدمات - تطوير موقع",
    id: "#2024-001234",
    status: "Active",
    statusAr: "نشط وقيد التنفيذ",
    statusColor: "bg-emerald-500",
    type: "عقد تقديم خدمات",
    date: "2024-12-30",
    duration: "3 أشهر",
    startDate: "2025-01-01",
    endDate: "2025-03-31",
    totalValue: 57500
  };

  const timeline = [
    { label: 'إنشاء العقد', date: 'Dec 28, 2024', status: 'done' },
    { label: 'التفاوض والتعديلات', date: 'Dec 29, 2024', status: 'done' },
    { label: 'التوقيع - الطرف الأول', date: 'Dec 30, 2024', status: 'done' },
    { label: 'التوقيع - الطرف الثاني', date: 'Dec 30, 2024', status: 'done' },
    { label: 'بدء التنفيذ', date: 'Jan 01, 2025', status: 'current' },
    { label: 'الإنجاز والتسليم', date: 'Mar 31, 2025', status: 'pending' },
    { label: 'الإغلاق', date: 'المتوقع: Apr 07, 2025', status: 'pending' },
  ];

  const milestones = [
    { label: 'Milestone 1: التصميم الأولي', date: '2025-01-15', status: 'completed' },
    { label: 'Milestone 2: تطوير التطبيق', date: '2025-02-28', status: 'active', progress: 65 },
    { label: 'Milestone 3: مرحلة الاختبار', date: '2025-03-15', status: 'pending' },
    { label: 'Milestone 4: التسليم النهائي', date: '2025-03-31', status: 'pending' }
  ];

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-500 overflow-y-auto pb-24">
      {/* Header */}
      <div className="bg-white p-4 sticky top-0 z-30 shadow-sm border-b">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
              <ArrowRight className="text-slate-700" />
            </button>
            <div>
              <h1 className="text-sm font-black text-slate-900 leading-tight">{contractInfo.name}</h1>
              <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">رقم العقد: {contractInfo.id}</p>
            </div>
          </div>
          <button className="p-2 text-slate-400"><MoreVertical size={20} /></button>
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Large Status Badge */}
        <div className="flex flex-col items-center gap-4">
          <div className={`${contractInfo.statusColor} text-white px-10 py-4 rounded-[2rem] font-black text-sm uppercase tracking-widest shadow-xl shadow-emerald-100 animate-pulse text-center`}>
             {contractInfo.statusAr}
          </div>
          <div className="flex items-center gap-2 text-emerald-600 bg-emerald-50 px-4 py-1.5 rounded-full border border-emerald-100">
             <ShieldCheck size={14} />
             <span className="text-[10px] font-black uppercase">عقد موثق قانونياً</span>
          </div>
        </div>

        {/* Progress Timeline View */}
        <section className="bg-white p-6 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-6">
           <h3 className="font-black text-slate-900 text-sm flex items-center gap-2 px-1">
              <Clock size={16} className="text-blue-600" /> مراحل العقد
           </h3>
           
           <div className="space-y-0 relative">
              <div className="absolute top-4 bottom-4 right-5 w-0.5 bg-slate-50" />
              {timeline.map((step, i) => (
                <div key={i} className="flex items-start gap-4 pr-12 pb-8 relative group">
                   <div className={`absolute right-[-2.4rem] top-1.5 w-4 h-4 rounded-full border-4 border-white shadow-md transition-all ${
                     step.status === 'done' ? 'bg-emerald-500 ring-4 ring-emerald-50' : 
                     step.status === 'current' ? 'bg-blue-600 ring-8 ring-blue-50 animate-pulse' : 'bg-slate-200'
                   }`} />
                   <div className="space-y-1">
                      <p className={`text-xs font-black ${step.status === 'done' ? 'text-slate-900' : step.status === 'current' ? 'text-blue-600' : 'text-slate-300'}`}>{step.label}</p>
                      <p className="text-[9px] font-bold text-slate-400 uppercase">{step.date}</p>
                   </div>
                </div>
              ))}
           </div>
        </section>

        {/* Contract Details Tabs */}
        <section className="space-y-4">
           <div className="flex gap-1 bg-white p-1 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto no-scrollbar scrollbar-hide">
              {[
                { id: 'info', label: 'معلومات' },
                { id: 'docs', label: 'مستندات' },
                { id: 'finance', label: 'مالية' },
                { id: 'signatures', label: 'توقيعات' },
                { id: 'activity', label: 'نشاطات' }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`flex-1 px-4 py-3 rounded-xl text-[9px] font-black uppercase transition-all whitespace-nowrap ${activeTab === t.id ? 'bg-slate-900 text-white shadow-lg' : 'text-slate-400'}`}
                >
                  {t.label}
                </button>
              ))}
           </div>

           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm p-6 animate-in slide-in-from-bottom duration-300">
              {activeTab === 'info' && (
                <div className="space-y-6">
                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-1">
                         <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">نوع العقد</span>
                         <p className="text-xs font-bold text-slate-900">{contractInfo.type}</p>
                      </div>
                      <div className="space-y-1">
                         <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">تاريخ التوثيق</span>
                         <p className="text-xs font-bold text-slate-900">{contractInfo.date}</p>
                      </div>
                      <div className="space-y-1">
                         <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">البداية</span>
                         <p className="text-xs font-bold text-slate-900">{contractInfo.startDate}</p>
                      </div>
                      <div className="space-y-1">
                         <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">الانتهاء</span>
                         <p className="text-xs font-bold text-slate-900">{contractInfo.endDate}</p>
                      </div>
                   </div>
                   <div className="pt-4 border-t border-slate-50 space-y-4">
                      <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest">الأطراف المتعاقدة</span>
                      <div className="space-y-3">
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600 text-[10px] font-black">أ س</div>
                            <p className="text-xs font-bold text-slate-900">أحمد السعيد (مقدم الخدمة)</p>
                         </div>
                         <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-slate-100 rounded-lg flex items-center justify-center text-slate-400 text-[10px] font-black">ش ن</div>
                            <p className="text-xs font-bold text-slate-900">شركة النجاح للتقنية (العميل)</p>
                         </div>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'docs' && (
                <div className="space-y-4">
                   <div className="p-4 bg-blue-50 rounded-2xl border border-blue-100 flex items-center justify-between group cursor-pointer hover:bg-white transition-all">
                      <div className="flex items-center gap-3">
                         <FileText size={20} className="text-blue-600" />
                         <div>
                            <p className="text-xs font-black text-slate-900">contract_signed.pdf</p>
                            <p className="text-[8px] font-bold text-slate-400 uppercase tracking-tighter">العقد الموقع رقمياً</p>
                         </div>
                      </div>
                      <Download size={16} className="text-slate-300 group-hover:text-blue-600" />
                   </div>
                   <div className="space-y-2">
                      <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest px-1">المرفقات الإضافية</p>
                      {['عرض_السعر.pdf', 'المواصفات.docx', 'التصاميم.zip'].map((doc, i) => (
                        <div key={i} className="p-4 bg-slate-50 rounded-2xl flex items-center justify-between hover:bg-slate-100 transition cursor-pointer">
                           <div className="flex items-center gap-3">
                              <Paperclip size={16} className="text-slate-400" />
                              <span className="text-xs font-bold text-slate-600">{doc}</span>
                           </div>
                           <ExternalLink size={12} className="text-slate-300" />
                        </div>
                      ))}
                   </div>
                </div>
              )}

              {activeTab === 'finance' && (
                <div className="space-y-6">
                   <div className="flex items-center justify-between p-5 bg-slate-900 rounded-[1.8rem] text-white shadow-xl relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-24 h-24 bg-blue-500/10 rounded-full blur-2xl" />
                      <div className="relative z-10">
                         <p className="text-[8px] font-black uppercase text-blue-400 tracking-widest mb-1">إجمالي قيمة العقد</p>
                         <h4 className="text-2xl font-black">٥٧,٥٠٠ <span className="text-xs font-medium uppercase">SAR</span></h4>
                      </div>
                      <CreditCard size={32} className="text-blue-600 opacity-50 relative z-10" />
                   </div>
                   <div className="space-y-4">
                      <div className="p-4 bg-white border border-slate-100 rounded-2xl space-y-3 shadow-sm relative overflow-hidden group hover:border-emerald-200 transition">
                         <div className="absolute top-0 right-0 w-1 h-full bg-emerald-500" />
                         <div className="flex justify-between items-center">
                            <h5 className="text-xs font-black text-slate-900">الدفعة الأولى: ٢٨,٧٥٠ ريال</h5>
                            <span className="text-[8px] font-black bg-emerald-50 text-emerald-600 px-2 py-0.5 rounded uppercase">مدفوعة ✓</span>
                         </div>
                         <div className="flex items-center gap-2 text-[9px] font-bold text-slate-400">
                            <Lock size={10} className="text-blue-500" /> محجوزة في نظام Escrow 🔒
                         </div>
                      </div>
                      <div className="p-4 bg-white border border-slate-100 rounded-2xl space-y-3 shadow-sm relative overflow-hidden group hover:border-amber-200 transition">
                         <div className="absolute top-0 right-0 w-1 h-full bg-amber-500" />
                         <div className="flex justify-between items-center">
                            <h5 className="text-xs font-black text-slate-400">الدفعة الثانية: ٢٨,٧٥٠ ريال</h5>
                            <span className="text-[8px] font-black bg-slate-50 text-slate-400 px-2 py-0.5 rounded uppercase">معلقة</span>
                         </div>
                         <p className="text-[9px] font-bold text-slate-300 uppercase">تاريخ الاستحقاق المتوقع: ٣١ مارس ٢٠٢٥</p>
                      </div>
                   </div>
                </div>
              )}

              {activeTab === 'signatures' && (
                <div className="space-y-4">
                   <div className="p-5 bg-white border-2 border-emerald-100 rounded-[2rem] space-y-4 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-1 h-full bg-emerald-500" />
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shadow-inner"><CheckCircle2 size={28} /></div>
                            <div>
                               <p className="text-sm font-black text-slate-900">محمد أحمد السعيد</p>
                               <p className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">تم التوقيع والمصادقة ✓</p>
                            </div>
                         </div>
                         <button className="text-[9px] font-black text-blue-600 uppercase hover:underline">التحقق</button>
                      </div>
                      <div className="pt-3 border-t border-slate-50 flex flex-col gap-1 text-[9px] font-bold text-slate-400 uppercase">
                         <p>التاريخ: Dec 30, 2024, 02:32 PM</p>
                         <p className="text-blue-600 font-mono">Blockchain: 0xa3f2e1...</p>
                      </div>
                   </div>

                   <div className="p-5 bg-white border border-amber-100 rounded-[2rem] space-y-4 relative overflow-hidden group">
                      <div className="absolute top-0 right-0 w-1 h-full bg-amber-500" />
                      <div className="flex items-center justify-between">
                         <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center"><Clock size={28} /></div>
                            <div>
                               <p className="text-sm font-black text-slate-400">شركة النجاح للتقنية</p>
                               <p className="text-[9px] font-bold text-amber-600 uppercase tracking-widest">بانتظار التوقيع الرقمي</p>
                            </div>
                         </div>
                         <button className="px-4 py-1.5 bg-blue-600 text-white rounded-lg text-[9px] font-black uppercase shadow-lg shadow-blue-100 active:scale-95 transition">إرسال تذكير</button>
                      </div>
                      <p className="text-[9px] font-bold text-slate-300 uppercase">آخر إشعار تم إرساله: اليوم ١٤:٠٠ م</p>
                   </div>
                </div>
              )}

              {activeTab === 'activity' && (
                <div className="space-y-6">
                   {[
                     { t: 'Dec 30, 14:32', msg: 'محمد أحمد وقّع العقد رقمياً وتم التوثيق على Blockchain', icon: <CheckCircle2 className="text-emerald-500" /> },
                     { t: 'Dec 30, 14:00', msg: 'تم إرسال النسخة النهائية للأطراف للتوقيع', icon: <Bell className="text-blue-500" /> },
                     { t: 'Dec 30, 12:00', msg: 'تم دفع وإيداع الدفعة الأولى في محفظة الضمان (Escrow)', icon: <CreditCard className="text-emerald-500" /> },
                     { t: 'Dec 29, 16:00', msg: 'تم الاتفاق النهائي على جميع بنود العقد والملاحق', icon: <CheckCircle2 className="text-blue-500" /> },
                     { t: 'Dec 29, 10:00', msg: 'الطرف الثاني اقترح تعديلاً على البند الخامس', icon: <History className="text-amber-500" /> }
                   ].map((act, i) => (
                     <div key={i} className="flex gap-4 group">
                        <div className="shrink-0 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center group-hover:scale-110 transition-transform">
                           {act.icon}
                        </div>
                        <div className="space-y-0.5">
                           <p className="text-[9px] font-black text-slate-300 uppercase tracking-widest">{act.t}</p>
                           <p className="text-xs font-bold text-slate-700 leading-relaxed">{act.msg}</p>
                        </div>
                     </div>
                   ))}
                </div>
              )}
           </div>
        </section>

        {/* Milestones / Deliverables Section */}
        <section className="space-y-4">
           <h3 className="font-black text-slate-900 text-sm px-2 flex items-center gap-2">
              <Star size={16} className="text-blue-600" /> المراحل الرئيسية للمشروع
           </h3>
           <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
              {milestones.map((m, i) => (
                <div key={i} className="p-5 border-b last:border-0 flex flex-col gap-3 hover:bg-slate-50 transition-colors cursor-pointer group">
                   <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                         <div className={`w-7 h-7 rounded-full flex items-center justify-center transition-all ${
                           m.status === 'completed' ? 'bg-emerald-500 text-white' : 
                           m.status === 'active' ? 'bg-blue-600 text-white ring-4 ring-blue-50 animate-pulse' : 'bg-slate-100 text-slate-400'
                         }`}>
                            {m.status === 'completed' ? <Check size={16} /> : <div className="w-2 h-2 rounded-full bg-current" />}
                         </div>
                         <span className={`text-[11px] font-black ${m.status === 'pending' ? 'text-slate-400' : 'text-slate-900'}`}>{m.label}</span>
                      </div>
                      <span className="text-[9px] font-bold text-slate-400 uppercase">{m.date}</span>
                   </div>
                   {m.status === 'active' && (
                     <div className="flex items-center gap-4 animate-in fade-in duration-700">
                        <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                           <div className="h-full bg-blue-600 rounded-full transition-all duration-1000" style={{ width: `${m.progress}%` }} />
                        </div>
                        <span className="text-[10px] font-black text-blue-600">{m.progress}%</span>
                     </div>
                   )}
                </div>
              ))}
           </div>
        </section>

        {/* Alerts Section */}
        <section className="space-y-3">
           <h3 className="font-black text-slate-900 text-sm px-2 flex items-center gap-2">
              <Bell size={16} className="text-red-500" /> التنبيهات والمهام
           </h3>
           <div className="space-y-2">
              <div className="p-5 bg-amber-50 rounded-[1.8rem] border border-amber-100 flex gap-4 animate-in slide-in-from-left duration-300 shadow-sm shadow-amber-100/50">
                 <AlertTriangle size={24} className="text-amber-500 shrink-0 mt-0.5" />
                 <div className="space-y-1">
                    <h4 className="text-xs font-black text-amber-900">تنبيه استحقاق مالي</h4>
                    <p className="text-[10px] text-amber-700 leading-relaxed font-medium">الدفعة الثانية بقيمة ٢٨,٧٥٠ ريال مستحقة خلال ٣٠ يوماً. يرجى التأكد من جاهزية الرصيد.</p>
                 </div>
              </div>
              <div className="p-5 bg-blue-50 rounded-[1.8rem] border border-blue-100 flex gap-4 animate-in slide-in-from-left duration-300 delay-150">
                 <Info size={24} className="text-blue-500 shrink-0 mt-0.5" />
                 <div className="space-y-1">
                    <h4 className="text-xs font-black text-blue-900">تذكير التوقيع</h4>
                    <p className="text-[10px] text-blue-700 leading-relaxed font-medium">لم يقم الطرف الثاني بالتوقيع بعد. هل ترغب في إرسال تذكير عبر البريد أو الرسائل القصيرة؟</p>
                    <button className="text-[10px] font-black text-blue-600 underline mt-1">إرسال تذكير الآن</button>
                 </div>
              </div>
           </div>
        </section>

        {/* Blockchain Verification Section */}
        <section className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl space-y-6 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />
           <div className="flex items-center gap-4 relative z-10">
              <div className="w-14 h-14 bg-white/10 rounded-[1.2rem] flex items-center justify-center backdrop-blur-md shrink-0 border border-white/5">
                 <LinkIcon size={32} className="text-blue-400" />
              </div>
              <div className="space-y-1">
                 <h3 className="text-sm font-black uppercase tracking-widest text-blue-300">التوثيق على Blockchain</h3>
                 <p className="text-[9px] text-slate-400 font-medium">سجل غير قابل للتلاعب في شبكة Saudi Blockchain</p>
              </div>
           </div>

           <div className="bg-white/5 border border-white/10 rounded-2xl p-5 space-y-4 font-mono text-[10px] text-slate-500 uppercase tracking-tight relative z-10">
              <div className="flex justify-between items-center">
                 <span className="text-slate-600">Transaction ID:</span>
                 <span className="text-blue-400 font-black truncate max-w-[140px] text-left">0xa3f2e1b4c5d6...</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-slate-600">Block Number:</span>
                 <span className="text-white font-bold">15,234,567</span>
              </div>
              <div className="flex justify-between items-center">
                 <span className="text-slate-600">Timestamp (UTC):</span>
                 <span className="text-white">2024-12-30 14:32:45</span>
              </div>
           </div>

           <button className="w-full py-4 bg-white text-slate-900 rounded-2xl font-black text-xs shadow-xl active:scale-95 transition-transform flex items-center justify-center gap-2 group-hover:translate-y-[-2px]">
              <ExternalLink size={16} /> التحقق في Blockchain Explorer
           </button>
           <p className="text-[8px] text-emerald-400 text-center font-black uppercase tracking-[0.2em] relative z-10 animate-pulse">✓ العقد موثق ولا يمكن التلاعب به</p>
        </section>

        {/* Quick Actions Grid Footer */}
        <div className="grid grid-cols-3 gap-3">
           {[
             { id: 'print', label: 'طباعة', icon: <Printer size={20} /> },
             { id: 'share', label: 'مشاركة', icon: <Share2 size={20} /> },
             { id: 'dispute', label: 'نزاع', icon: <Gavel size={20} />, color: 'text-red-500 hover:bg-red-50' }
           ].map(action => (
             <button
               key={action.id}
               onClick={() => action.id === 'dispute' && onOpenDispute()}
               className={`flex flex-col items-center gap-2 p-4 bg-white rounded-3xl border border-slate-100 shadow-sm transition active:scale-95 ${action.color || 'text-slate-600 hover:bg-slate-50'}`}
             >
                {action.icon}
                <span className="text-[10px] font-black uppercase tracking-tighter">{action.label}</span>
             </button>
           ))}
        </div>
      </div>

      {/* Primary Floating Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/90 backdrop-blur-md border-t z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] flex gap-3">
         <button className="flex-[3] py-5 bg-blue-600 text-white rounded-[1.8rem] font-black text-sm shadow-xl shadow-blue-100 active:scale-95 transition-all flex items-center justify-center gap-3 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <MessageSquare size={20} /> المحادثة المباشرة
         </button>
         <button className="flex-1 py-5 bg-slate-100 text-slate-600 rounded-[1.8rem] font-black text-sm hover:bg-slate-200 active:scale-95 transition-all flex items-center justify-center">
            <Download size={20} />
         </button>
      </div>

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        @keyframes spin-slow { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .animate-spin-slow { animation: spin-slow 12s linear infinite; }
        @keyframes bounce-slow { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
        .animate-bounce-slow { animation: bounce-slow 2s ease-in-out infinite; }
      `}</style>
    </div>
  );
};

export default ContractStatusDashboard;