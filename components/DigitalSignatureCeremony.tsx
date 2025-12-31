
import React, { useState, useRef, useEffect } from 'react';
import { 
  ArrowRight, ShieldCheck, PenTool, Edit3, Upload, 
  CheckCircle2, Lock, Smartphone, Fingerprint, Scan, 
  ChevronLeft, Info, Bot, Clock, ExternalLink, 
  Download, FileText, Check, X, Sparkles, RefreshCw,
  MoreVertical, ShieldAlert, Globe, Monitor, Printer
} from 'lucide-react';
import { ContractDraft, UserProfile } from '../types';

interface DigitalSignatureCeremonyProps {
  draft: ContractDraft;
  user: UserProfile;
  onBack: () => void;
  onFinish: () => void;
}

const DigitalSignatureCeremony: React.FC<DigitalSignatureCeremonyProps> = ({ draft, user, onBack, onFinish }) => {
  const [activeTab, setActiveTab] = useState<'draw' | 'type' | 'upload' | 'certified'>('draw');
  const [isSigning, setIsSigning] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [legalCheck, setLegalCheck] = useState(false);
  const [typedName, setTypedName] = useState(user.legalName || '');
  const [password, setPassword] = useState('');
  const [showBiometric, setShowBiometric] = useState(false);
  const [biometricVerified, setBiometricVerified] = useState(false);
  
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // Metadata Simulation
  const metadata = {
    timestamp: new Date().toLocaleString('ar-SA'),
    location: 'الرياض، المملكة العربية السعودية',
    ip: '192.168.1.104',
    device: 'iPhone 15 Pro / منصة واثق الذكية',
    hash: 'SHA-256: a3f2e1b4c5d6e7f890123456789abcdef0123456789abcdef0123456789ab'
  };

  useEffect(() => {
    if (activeTab === 'draw' && canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.strokeStyle = '#0f172a';
        ctx.lineWidth = 3;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
      }
    }
  }, [activeTab]);

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    setIsDrawing(true);
    const pos = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.beginPath();
    ctx?.moveTo(pos.x, pos.y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    const ctx = canvasRef.current?.getContext('2d');
    ctx?.lineTo(pos.x, pos.y);
    ctx?.stroke();
  };

  const stopDrawing = () => setIsDrawing(false);

  const getPos = (e: any) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return {
      x: (clientX - rect.left) * (canvas.width / rect.width),
      y: (clientY - rect.top) * (canvas.height / rect.height)
    };
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext('2d');
    ctx?.clearRect(0, 0, canvas?.width || 0, canvas?.height || 0);
  };

  const handleSign = () => {
    setIsSigning(true);
    setTimeout(() => {
      setIsSigning(false);
      setIsSuccess(true);
    }, 4500);
  };

  // Improved Download function to match the "Wathiq" letterhead in the image
  const handleDownloadPDF = () => {
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    const htmlContent = `
      <!DOCTYPE html>
      <html lang="ar" dir="rtl">
      <head>
        <meta charset="UTF-8">
        <title>عقد موثق - واثق</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Cairo:wght@400;700;900&display=swap');
          body { font-family: 'Cairo', sans-serif; margin: 0; padding: 40px; color: #1e293b; background: white; }
          
          /* Letterhead Header - Based on provided image */
          .header { display: flex; justify-content: space-between; align-items: flex-start; border-bottom: 2px solid #e2e8f0; padding-bottom: 20px; margin-bottom: 40px; }
          .logo-area { display: flex; align-items: center; gap: 10px; }
          .logo-icon { width: 50px; height: 50px; background: #2563eb; color: white; border-radius: 12px; display: flex; items-center; justify-content: center; font-size: 30px; font-weight: 900; }
          .logo-text { color: #1e3a8a; }
          .logo-text h1 { margin: 0; font-size: 32px; font-weight: 900; }
          .logo-text p { margin: 0; font-size: 10px; font-weight: 700; letter-spacing: 1px; color: #64748b; }
          
          .contact-details { text-align: left; font-size: 11px; color: #475569; line-height: 1.6; }
          .contact-details strong { color: #1e293b; font-size: 13px; }

          /* Content Area */
          .content { line-height: 2; font-size: 14px; text-align: justify; padding: 0 10px; }
          .title { text-align: center; margin-bottom: 40px; }
          .title h2 { font-size: 24px; font-weight: 900; color: #0f172a; border-bottom: 4px solid #3b82f6; display: inline-block; padding-bottom: 5px; }
          
          .clause-title { font-weight: 900; font-size: 16px; color: #1e40af; margin-top: 30px; display: block; }
          .metadata-box { background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 16px; padding: 20px; margin-top: 50px; font-size: 10px; color: #64748b; }
          .metadata-box h4 { margin: 0 0 10px 0; color: #1e293b; font-weight: 900; text-transform: uppercase; border-bottom: 1px solid #cbd5e1; padding-bottom: 5px; }
          
          /* Footer - Based on provided image */
          .footer { position: fixed; bottom: 40px; left: 40px; right: 40px; border-top: 2px solid #e2e8f0; padding-top: 15px; display: flex; justify-content: space-between; font-size: 9px; color: #94a3b8; font-weight: 700; }

          @media print {
            .no-print { display: none; }
            body { padding: 20px; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <div class="logo-area">
            <div class="logo-text">
              <h1>واثق</h1>
              <p>Secure E-Contracts</p>
            </div>
            <div style="font-size: 40px; color: #2563eb; transform: rotate(10deg); margin-right: 10px;">✔</div>
          </div>
          <div class="contact-details">
            <strong>Aramin Teten</strong><br>
            Neto Kuff, Inatitic<br>
            2025 1225.238<br>
            wathiq@gmail.com
          </div>
        </div>

        <div class="content">
          <div class="title">
            <h2>${draft.type || 'وثيقة قانونية'}</h2>
            <p style="font-size: 10px; color: #94a3b8; margin-top: 5px;">الرقم المرجعي: #2024-001234 | تاريخ التوثيق: ${metadata.timestamp}</p>
          </div>

          <span class="clause-title">أطراف العقد:</span>
          <p>${draft.parties.map((p, i) => `${i + 1}. ${p.role}: ${p.name}`).join(' | ')}</p>

          <span class="clause-title">محتوى الاتفاقية:</span>
          <p>${(draft.generatedText || 'لا يوجد نص متوفر حالياً').replace(/\n/g, '<br>')}</p>

          <div class="metadata-box">
            <h4>سجل التوثيق الرقمي (WATHIQ AUDIT TRAIL)</h4>
            <div style="display: grid; grid-template-cols: 1fr 1fr; gap: 10px;">
              <div>• بصمة المستند: ${metadata.hash}</div>
              <div>• عنوان IP الموقع: ${metadata.ip}</div>
              <div>• الجهاز المستخدم: ${metadata.device}</div>
              <div>• الموقع الجغرافي: ${metadata.location}</div>
              <div style="color: #059669; font-weight: 900;">• حالة التوقيع: مكتمل وموثق رقمياً عبر Blockchain ✓</div>
            </div>
          </div>
        </div>

        <div class="footer">
          <div>منصة واثق للعقود الإلكترونية</div>
          <div>+1 120 566 7878</div>
          <div>www.wathiq-contracts.com</div>
        </div>

        <script>
          window.onload = function() { window.print(); };
        </script>
      </body>
      </html>
    `;

    printWindow.document.write(htmlContent);
    printWindow.document.close();
  };

  const triggerBiometric = () => {
    setShowBiometric(true);
    setTimeout(() => {
      setBiometricVerified(true);
      setTimeout(() => setShowBiometric(false), 1500);
    }, 2000);
  };

  if (isSuccess) {
    return (
      <div className="flex-1 flex flex-col bg-white p-8 items-center justify-center text-center animate-in zoom-in duration-500 overflow-y-auto">
        <div className="relative mb-10">
           <div className="w-32 h-32 bg-emerald-50 text-emerald-600 rounded-[3rem] flex items-center justify-center shadow-2xl shadow-emerald-100 animate-in zoom-in duration-700">
              <CheckCircle2 size={72} className="animate-bounce" />
           </div>
           <div className="absolute -top-4 -right-4 w-14 h-14 bg-white rounded-2xl shadow-xl flex items-center justify-center animate-pulse">
              <Sparkles size={28} className="text-amber-500" />
           </div>
           <div className="absolute -bottom-6 -left-6 w-12 h-12 bg-white rounded-2xl shadow-xl flex items-center justify-center animate-pulse [animation-delay:0.5s]">
              <ShieldCheck size={24} className="text-blue-600" />
           </div>
        </div>

        <div className="space-y-3 mb-10">
           <h2 className="text-3xl font-black text-slate-900 tracking-tight">تم التوقيع بنجاح!</h2>
           <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-[300px] mx-auto">
             تم تسجيل توقيعك وتوثيق العقد في سجلات <span className="font-black text-blue-600">Blockchain</span> واثق غير القابلة للتلاعب.
           </p>
        </div>

        <div className="w-full bg-slate-50 rounded-[2.5rem] p-6 space-y-4 mb-10 border border-slate-100 shadow-inner relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-blue-100/30 rounded-full -mr-12 -mt-12 blur-2xl" />
           <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span>رقم العقد الرسمي:</span>
              <span className="text-slate-900">#2024-001234</span>
           </div>
           <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span>رقم العملية (TX):</span>
              <span className="text-blue-600 font-mono truncate max-w-[150px] mr-2">0xa3f2e1b4c5d6e7f8...</span>
           </div>
           <div className="flex justify-between items-center text-[10px] font-black uppercase tracking-widest text-slate-400">
              <span>الختم الزمني (Wathiq):</span>
              <span className="text-slate-900">{metadata.timestamp}</span>
           </div>
           <div className="pt-3 border-t border-slate-200 mt-2 flex justify-center gap-4">
              <div className="flex items-center gap-1 text-[9px] font-black text-emerald-600 uppercase">
                 <ShieldCheck size={12} /> توثيق معتمد
              </div>
              <div className="flex items-center gap-1 text-[9px] font-black text-blue-600 uppercase">
                 <RefreshCw size={12} /> مزامنة آمنة
              </div>
           </div>
        </div>

        <div className="w-full space-y-4">
           <button 
             onClick={handleDownloadPDF}
             className="w-full py-5 bg-blue-600 text-white rounded-[1.8rem] font-black text-lg shadow-2xl shadow-blue-200 active:scale-95 transition flex items-center justify-center gap-3 relative overflow-hidden group"
           >
              <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
              <Printer size={24} /> طباعة/تحميل نسخة واثق PDF
           </button>
           <div className="grid grid-cols-2 gap-3">
              <button onClick={onFinish} className="py-4 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs active:scale-95 transition">العودة للرئيسية</button>
              <button className="py-4 bg-slate-100 text-slate-600 rounded-[1.5rem] font-black text-xs hover:bg-slate-200 transition">عرض الحالة</button>
           </div>
        </div>

        <div className="mt-8 p-4 bg-blue-50/50 rounded-2xl border border-blue-100 flex items-center gap-3 animate-pulse">
           <Info size={16} className="text-blue-600" />
           <p className="text-[10px] text-blue-800 font-bold leading-relaxed">📧 تم إرسال نسخة رسمية بتصميم واثق لبريدك الإلكتروني.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-bottom duration-500 overflow-y-auto pb-48">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-40 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
            <ArrowRight className="text-slate-700" />
          </button>
          <div>
            <h1 className="text-lg font-black text-slate-900">مراسم التوقيع الرقمي</h1>
            <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">التوثيق الرسمي والمحمي بالبلوكتشين</p>
          </div>
        </div>
        <button className="p-2 text-slate-400"><MoreVertical size={20} /></button>
      </div>

      <div className="p-6 space-y-8">
        {/* Contract Summary Ceremony View */}
        <section className="bg-slate-900 p-8 rounded-[3rem] text-white shadow-2xl relative overflow-hidden group">
           <div className="absolute top-0 left-0 w-full h-full opacity-5 pointer-events-none">
              <FileText size={300} className="absolute -bottom-20 -right-20 rotate-12" />
           </div>
           <div className="flex items-start justify-between relative z-10">
              <div className="space-y-4">
                 <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-600/20 rounded-xl flex items-center justify-center border border-blue-500/20">
                       <FileText size={20} className="text-blue-400" />
                    </div>
                    <div>
                       <span className="text-[9px] font-black uppercase tracking-widest text-blue-400">وثيقة العقد الجاهزة</span>
                       <h3 className="text-base font-black uppercase tracking-tight truncate max-w-[150px]">{draft.type || 'خدمات'}</h3>
                    </div>
                 </div>
                 <div className="space-y-1">
                    <p className="text-[8px] font-black text-slate-500 uppercase tracking-[0.2em]">إجمالي القيمة التعاقدية</p>
                    <p className="text-3xl font-black text-white">٥٧,٥٠٠ <span className="text-xs font-bold text-blue-400 uppercase tracking-widest mr-1">SAR</span></p>
                 </div>
              </div>
              <div className="w-16 h-16 bg-white/10 rounded-[1.8rem] flex items-center justify-center backdrop-blur-xl shrink-0 border border-white/5 shadow-2xl group-hover:rotate-6 transition-transform duration-500">
                 <ShieldCheck size={36} className="text-blue-400" />
              </div>
           </div>
        </section>

        {/* Signature Methods Tab System */}
        <section className="space-y-4">
           <div className="flex gap-1 bg-white p-1 rounded-2xl shadow-sm border border-slate-100 overflow-x-auto no-scrollbar scrollbar-hide">
              {[
                { id: 'draw', label: 'رسم', icon: <PenTool size={14} /> },
                { id: 'type', label: 'كتابة', icon: <Edit3 size={14} /> },
                { id: 'upload', label: 'رفع', icon: <Upload size={14} /> },
                { id: 'certified', label: 'نفاذ/معتمد', icon: <Lock size={14} /> }
              ].map(t => (
                <button
                  key={t.id}
                  onClick={() => setActiveTab(t.id as any)}
                  className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl text-[10px] font-black uppercase transition-all whitespace-nowrap ${
                    activeTab === t.id ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-slate-400 hover:bg-slate-50'
                  }`}
                >
                   {t.icon} {t.label}
                </button>
              ))}
           </div>

           {/* Tab Content: Draw */}
           {activeTab === 'draw' && (
             <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-2xl p-8 space-y-6 animate-in zoom-in duration-300">
                <div className="flex items-center justify-between px-2">
                   <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                      <PenTool size={14} /> أرسم توقيعك في المساحة أدناه
                   </h4>
                   <button onClick={clearCanvas} className="text-[10px] font-black text-red-500 uppercase hover:underline flex items-center gap-1">
                      <RefreshCw size={12} /> مسح الكل
                   </button>
                </div>
                <div className="aspect-[4/2] w-full bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 relative group cursor-crosshair overflow-hidden shadow-inner">
                   <canvas 
                     ref={canvasRef}
                     width={600}
                     height={300}
                     className="w-full h-full"
                     onMouseDown={startDrawing}
                     onMouseMove={draw}
                     onMouseUp={stopDrawing}
                     onMouseLeave={stopDrawing}
                     onTouchStart={startDrawing}
                     onTouchMove={draw}
                     onTouchEnd={stopDrawing}
                   />
                   {!isDrawing && (
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                         <PenTool size={48} className="text-slate-400" />
                      </div>
                   )}
                </div>
                <div className="flex items-center gap-3 bg-blue-50 p-4 rounded-2xl border border-blue-100">
                   <Info size={20} className="text-blue-600 shrink-0" />
                   <p className="text-[10px] text-blue-800 font-bold leading-relaxed italic">يُرجى رسم التوقيع بشكل يطابق توقيعك في الهوية الوطنية لضمان أعلى مستويات القبول القانوني.</p>
                </div>
             </div>
           )}

           {/* Tab Content: Type */}
           {activeTab === 'type' && (
             <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-2xl p-8 space-y-6 animate-in zoom-in duration-300">
                <div className="space-y-1">
                   <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">اكتب اسمك الكامل باللغة العربية</label>
                   <input 
                     type="text" 
                     value={typedName}
                     onChange={e => setTypedName(e.target.value)}
                     placeholder="محمد أحمد السعيد"
                     className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-lg font-black text-slate-900 focus:bg-white focus:border-blue-600 outline-none transition shadow-inner"
                   />
                </div>
                {typedName && (
                  <div className="space-y-3 pt-4 border-t border-slate-50">
                     <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-2">معاينة التوقيع الرقمي المقترح:</p>
                     <div className="p-12 bg-slate-50 rounded-3xl border border-slate-100 flex items-center justify-center font-['Cairo'] italic text-4xl font-black text-slate-900 tracking-wider shadow-inner text-center leading-normal">
                        {typedName}
                     </div>
                     <p className="text-center text-[9px] font-bold text-slate-400">سيتم استخدام هذا الخط الرقمي كتمثيل لتوقيعك الشخصي في الوثيقة.</p>
                  </div>
                )}
             </div>
           )}

           {/* Tab Content: Certified (Saudi Digital Signature) */}
           {activeTab === 'certified' && (
             <div className="bg-white rounded-[2.5rem] border-2 border-slate-100 shadow-2xl p-8 space-y-6 animate-in zoom-in duration-300 text-center">
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-[2rem] flex items-center justify-center mx-auto mb-4">
                   <ShieldCheck size={48} />
                </div>
                <div className="space-y-2">
                   <h4 className="text-lg font-black text-slate-900">التوقيع عبر "نفاذ" (Nafath)</h4>
                   <p className="text-xs text-slate-500 leading-relaxed font-medium">أقوى أنواع التوقيع الرقمي في المملكة العربية السعودية. سيتم التحقق من هويتك وتوقيع العقد بختم هيئة الاتصالات والفضاء والتقنية.</p>
                </div>
                <button className="w-full py-4 bg-emerald-600 text-white rounded-2xl font-black text-sm shadow-xl active:scale-95 transition flex items-center justify-center gap-3">
                   <ExternalLink size={18} /> بدء التوثيق عبر نفاذ
                </button>
             </div>
           )}
        </section>

        {/* Biometric Verification Simulation */}
        <section className="bg-white p-8 rounded-[3rem] border border-slate-100 shadow-sm space-y-5">
           <div className="flex items-center gap-4 text-slate-900">
              <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-colors shadow-inner ${biometricVerified ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-blue-600'}`}>
                 {biometricVerified ? <CheckCircle2 size={28} /> : <Fingerprint size={28} />}
              </div>
              <div className="flex-1">
                 <h4 className="font-black text-sm uppercase tracking-widest">التحقق البيومتري</h4>
                 <p className="text-[10px] text-slate-400 font-medium">إثبات الهوية عبر بصمة الإصبع أو الوجه لزيادة الأمان.</p>
              </div>
              {biometricVerified && (
                 <span className="text-[8px] font-black text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full uppercase">تم التحقق</span>
              )}
           </div>
           {!biometricVerified ? (
             <div className="grid grid-cols-2 gap-3">
                <button onClick={triggerBiometric} className="flex items-center justify-center gap-3 p-5 bg-slate-50 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-2xl transition active:scale-95 group">
                   <Fingerprint size={24} className="text-slate-400 group-hover:text-blue-600" />
                   <span className="text-[10px] font-black uppercase text-slate-600">بصمة الإصبع</span>
                </button>
                <button onClick={triggerBiometric} className="flex items-center justify-center gap-3 p-5 bg-slate-50 hover:bg-blue-50 border border-transparent hover:border-blue-200 rounded-2xl transition active:scale-95 group">
                   <Scan size={24} className="text-slate-400 group-hover:text-blue-600" />
                   <span className="text-[10px] font-black uppercase text-slate-600">بصمة الوجه</span>
                </button>
             </div>
           ) : (
             <div className="p-4 bg-emerald-50/50 rounded-2xl border border-emerald-100 flex items-center gap-3 animate-in fade-in">
                <ShieldCheck size={18} className="text-emerald-600" />
                <p className="text-[10px] text-emerald-800 font-bold">تم ربط بصمتك بنجاح بطلب التوقيع الحالي.</p>
             </div>
           )}
        </section>

        {/* Legal Acknowledgment & Password */}
        <section className="bg-white p-8 rounded-[3.5rem] border border-slate-100 shadow-xl space-y-8 relative overflow-hidden">
           <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 blur-2xl" />
           <div className="flex items-center gap-4 text-slate-900 border-b border-slate-50 pb-5">
              <ShieldCheck size={24} className="text-blue-600" />
              <h4 className="font-black text-sm uppercase tracking-widest">الإقرار القانوني والتوثيق</h4>
           </div>
           
           <label className="flex items-start gap-4 cursor-pointer group relative z-10">
              <div className={`mt-1 w-7 h-7 rounded-xl border-2 flex items-center justify-center shrink-0 transition-all ${
                legalCheck ? 'bg-blue-600 border-blue-600 text-white shadow-xl shadow-blue-200' : 'border-slate-200 group-hover:border-blue-400'
              }`}>
                 <input type="checkbox" className="hidden" checked={legalCheck} onChange={e => setLegalCheck(e.target.checked)} />
                 {legalCheck && <Check size={18} />}
              </div>
              <div className="flex-1 space-y-2 text-[10px] text-slate-600 font-bold leading-relaxed">
                 <p>• أقر بأنني الشخص المخول قانوناً بالتوقيع عن نفسي أو عن الكيان الذي أمثله في هذا العقد.</p>
                 <p>• قرأت وفهمت جميع بنود العقد وأوافق على الالتزام الكامل بما ورد فيه من حقوق والتزامات.</p>
                 <p>• أدرك أن هذا التوقيع الرقمي يعتبر توقيعاً معتبراً وملزماً قانوناً بموجب نظام التعاملات الإلكترونية السعودي.</p>
                 <p>• أوافق على تسجيل تفاصيل العملية (البصمة الرقمية، الختم الزمني، الموقع) في شبكة Blockchain العامة لـ "واثق".</p>
              </div>
           </label>

           <div className="space-y-3 relative z-10 pt-4 border-t border-slate-50">
              <div className="flex justify-between items-center px-1">
                 <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <Lock size={14} className="text-blue-500" /> كلمة المرور للتأكيد النهائي
                 </label>
              </div>
              <div className="relative group">
                 <input 
                   type="password" 
                   value={password}
                   onChange={e => setPassword(e.target.value)}
                   placeholder="••••••••"
                   className="w-full bg-slate-50 border-2 border-transparent rounded-2xl p-5 text-center text-xl font-black focus:bg-white focus:border-blue-600 outline-none transition shadow-inner"
                 />
                 <Lock className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-200 group-focus-within:text-blue-600 transition" size={20} />
              </div>
           </div>
        </section>

        {/* Real-time Documentation Details (Metadata) */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-2">
              <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                 <Clock size={14} /> تفاصيل جلسة التوقيع (Metadata)
              </h4>
              <span className="text-[8px] font-black text-emerald-600 uppercase tracking-tighter bg-emerald-50 px-2 py-0.5 rounded flex items-center gap-1">
                 <Globe size={10} /> تشفير نشط
              </span>
           </div>
           <div className="bg-slate-900 rounded-[2.5rem] p-6 space-y-4 font-mono text-[9px] text-slate-500 uppercase shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />
              <div className="grid grid-cols-2 gap-6 relative z-10">
                 <div className="space-y-1">
                    <span className="text-slate-600 flex items-center gap-1"><Globe size={10} /> IP ADDRESS</span>
                    <span className="text-blue-400 font-bold">{metadata.ip}</span>
                 </div>
                 <div className="space-y-1 text-left">
                    <span className="text-slate-600 flex items-center gap-1 justify-end">DEVICE <Monitor size={10} /></span>
                    <span className="text-blue-400 font-bold">{metadata.device}</span>
                 </div>
                 <div className="space-y-1">
                    <span className="text-slate-600 flex items-center gap-1">LOCATION</span>
                    <span className="text-blue-400 font-bold">{metadata.location}</span>
                 </div>
                 <div className="space-y-1 text-left">
                    <span className="text-slate-600 flex items-center gap-1 justify-end">METHOD <PenTool size={10} /></span>
                    <span className="text-blue-400 font-bold uppercase">{activeTab === 'certified' ? 'NAFATH/KYC' : activeTab}</span>
                 </div>
              </div>
              <div className="pt-4 border-t border-white/5 mt-2 flex justify-between items-center relative z-10">
                 <span className="text-slate-600">CERTIFICATE HASH</span>
                 <span className="text-slate-400 font-bold truncate max-w-[150px]">{metadata.hash}</span>
              </div>
              <div className="flex items-center gap-2 text-blue-500/50 pt-2 animate-pulse">
                 <Bot size={10} />
                 <span className="text-[8px] font-black tracking-widest">WATHIQ-GATEWAY: READY FOR BLOCKCHAIN COMMIT</span>
              </div>
           </div>
        </section>
      </div>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto p-6 bg-white/90 backdrop-blur-md border-t z-50 shadow-[0_-20px_50px_rgba(0,0,0,0.1)] space-y-4">
         <div className="flex gap-3">
            <button 
              onClick={handleSign}
              disabled={isSigning || !legalCheck || password.length < 4}
              className={`flex-[3] py-5 rounded-[1.8rem] font-black text-lg shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 relative overflow-hidden group ${
                !isSigning && legalCheck && password.length >= 4
                ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' 
                : 'bg-slate-100 text-slate-300 cursor-not-allowed'
              }`}
            >
               {isSigning ? (
                 <>
                   <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                   <span className="animate-pulse">جاري التوثيق بختم "واثق"...</span>
                 </>
               ) : (
                 <>توقيع العقد الآن ✓</>
               )}
               {!isSigning && <div className="absolute top-0 right-0 w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />}
            </button>
            <button onClick={onBack} className="flex-1 bg-slate-50 text-slate-400 rounded-[1.8rem] font-black text-xs hover:bg-slate-100 transition active:scale-95 border border-slate-100">إلغاء</button>
         </div>
         <p className="text-center text-[8px] font-black text-slate-300 uppercase tracking-tighter">
            🔒 تشفير نهاية لنهاية • تسجيل بلوكتشين "واثق" • وقت NTP رسمي • IP: {metadata.ip}
         </p>
      </div>

      {/* Biometric Simulation Modal */}
      {showBiometric && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-xl animate-in fade-in duration-300">
           <div className="bg-white w-72 rounded-[3.5rem] p-10 flex flex-col items-center space-y-8 shadow-2xl animate-in zoom-in duration-300 border border-white/20">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-500 ${biometricVerified ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600 animate-pulse'}`}>
                 {biometricVerified ? <CheckCircle2 size={64} className="animate-in zoom-in" /> : <Fingerprint size={64} />}
              </div>
              <div className="text-center space-y-2">
                 <h3 className="text-xl font-black text-slate-900">{biometricVerified ? 'تم التحقق!' : 'تحقق بيومتري'}</h3>
                 <p className="text-xs text-slate-500 font-medium">{biometricVerified ? 'بصمتك مطابقة لهويتك المسجلة' : 'المس مستشعر البصمة أو انظر للكاميرا'}</p>
              </div>
              {!biometricVerified && <div className="w-12 h-1 bg-slate-100 rounded-full animate-pulse" />}
           </div>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #e2e8f0; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default DigitalSignatureCeremony;
