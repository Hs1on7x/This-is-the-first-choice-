import React, { useState, useMemo } from 'react';
import { 
  ArrowRight, ShieldAlert, Activity, Clock, FileText, CheckCircle2, 
  ChevronLeft, RefreshCw, Download, Plus, Search, Filter, 
  ShieldCheck, BellRing, ArrowUpRight, X, Sparkles, MessageSquare, 
  Gavel, Check, List, Settings, Bell, Mail, Smartphone,
  FileSearch, BarChart3, Fingerprint, ExternalLink
} from 'lucide-react';

interface MonitoringScreenProps {
  onBack: () => void;
}

interface MonitorItem {
  id: string;
  title: string;
  status: 'healthy' | 'warning' | 'critical';
  nextMilestone: string;
  risk: 'low' | 'medium' | 'high';
  complianceScore: number;
  lastSync: string;
  details: {
    clausesCount: number;
    violationsDetected: number;
    upcomingDeadlines: number;
  };
}

const MonitoringScreen: React.FC<MonitoringScreenProps> = ({ onBack }) => {
  const [isSyncing, setIsSyncing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [riskFilter, setRiskFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [activeTab, setActiveTab] = useState<'live' | 'history'>('live');
  
  // Modal States
  const [showDetailedReport, setShowDetailedReport] = useState<MonitorItem | null>(null);
  const [showAlertSettings, setShowAlertSettings] = useState<MonitorItem | null>(null);
  const [showAddModal, setShowAddModal] = useState(false);

  const [monitors] = useState<MonitorItem[]>([
    { 
      id: '1', title: 'عقد توريد - سابك', status: 'healthy', nextMilestone: 'الدفعة المالية القادمة (٥ أيام)', risk: 'low', complianceScore: 98, lastSync: 'منذ ١٠ دقائق',
      details: { clausesCount: 24, violationsDetected: 0, upcomingDeadlines: 2 }
    },
    { 
      id: '2', title: 'عقد إيجار تجاري - المعيقلية', status: 'warning', nextMilestone: 'انتهاء فترة الإخطار بالتجديد', risk: 'medium', complianceScore: 82, lastSync: 'منذ ساعة',
      details: { clausesCount: 18, violationsDetected: 1, upcomingDeadlines: 1 }
    },
    { 
      id: '3', title: 'اتفاقية المساهمين - TechX', status: 'critical', nextMilestone: 'اجتماع الجمعية العمومية', risk: 'high', complianceScore: 65, lastSync: 'الآن',
      details: { clausesCount: 42, violationsDetected: 3, upcomingDeadlines: 4 }
    },
    { 
      id: '4', title: 'عقد تطوير برمجيات - الحلول الذكية', status: 'healthy', nextMilestone: 'تسليم المسودة النهائية (١٢ يوماً)', risk: 'low', complianceScore: 100, lastSync: 'منذ ٣ ساعات',
      details: { clausesCount: 15, violationsDetected: 0, upcomingDeadlines: 1 }
    },
  ]);

  const handleSync = () => {
    setIsSyncing(true);
    setTimeout(() => setIsSyncing(false), 2000);
  };

  const filteredMonitors = useMemo(() => {
    return monitors.filter(m => {
      const matchesSearch = m.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesRisk = riskFilter === 'all' || m.risk === riskFilter;
      return matchesSearch && matchesRisk;
    });
  }, [monitors, searchQuery, riskFilter]);

  const stats = useMemo(() => {
    const total = monitors.length;
    const avgCompliance = Math.round(monitors.reduce((acc, curr) => acc + curr.complianceScore, 0) / total);
    return { total, avgCompliance };
  }, [monitors]);

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in fade-in duration-300 overflow-y-auto pb-32">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-40 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
              <ArrowRight className="text-slate-700" />
            </button>
            <div>
              <h1 className="text-lg font-black text-slate-900">المراقبة الاستباقية</h1>
              <p className="text-[10px] text-blue-600 font-bold uppercase tracking-widest">إدارة الامتثال الحي</p>
            </div>
          </div>
          <div className="flex gap-1">
            <button 
              onClick={handleSync}
              className={`p-2 rounded-xl transition ${isSyncing ? 'text-blue-600 animate-spin' : 'text-slate-400 hover:text-blue-600'}`}
            >
              <RefreshCw size={20} />
            </button>
            <button className="p-2 text-slate-400 hover:text-blue-600 transition"><Download size={20} /></button>
          </div>
        </div>

        {/* Tab Selector */}
        <div className="flex p-1 bg-slate-100 rounded-2xl mb-4">
           <button 
             onClick={() => setActiveTab('live')}
             className={`flex-1 py-2 rounded-xl text-[11px] font-black transition-all ${activeTab === 'live' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
           >
              الامتثال الحي
           </button>
           <button 
             onClick={() => setActiveTab('history')}
             className={`flex-1 py-2 rounded-xl text-[11px] font-black transition-all ${activeTab === 'history' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
           >
              سجل المراقبة
           </button>
        </div>

        {/* Search & Filter Bar */}
        <div className="flex gap-2">
          <div className="flex-1 relative group">
            <input 
              type="text" 
              placeholder="ابحث في العقود..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-slate-50 border border-slate-100 rounded-2xl py-2.5 pr-10 pl-4 text-xs font-medium focus:ring-4 focus:ring-blue-100 transition outline-none"
            />
            <Search className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-blue-600 transition" size={16} />
          </div>
          <button className="p-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-slate-400 hover:text-blue-600 transition">
             <Filter size={20} />
          </button>
        </div>

        {/* Risk Filters */}
        <div className="flex gap-2 mt-4 overflow-x-auto no-scrollbar scrollbar-hide pb-1">
           {[
             { id: 'all', label: 'الكل', color: 'bg-slate-900' },
             { id: 'high', label: 'مخاطر عالية', color: 'bg-red-500' },
             { id: 'medium', label: 'مخاطر متوسطة', color: 'bg-amber-500' },
             { id: 'low', label: 'مستقر', color: 'bg-emerald-500' }
           ].map(f => (
             <button
               key={f.id}
               onClick={() => setRiskFilter(f.id as any)}
               className={`whitespace-nowrap px-4 py-2 rounded-xl text-[10px] font-black uppercase transition-all ${
                 riskFilter === f.id ? `${f.color} text-white shadow-lg` : 'bg-white text-slate-400 border border-slate-100'
               }`}
             >
               {f.label}
             </button>
           ))}
        </div>
      </div>

      <div className="p-6 space-y-8">
        {/* Performance Overview */}
        <div className="grid grid-cols-2 gap-4">
           <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                 <Activity className="text-blue-600" size={24} />
                 <ArrowUpRight size={14} className="text-emerald-500" />
              </div>
              <div>
                 <div className="text-2xl font-black text-slate-900 leading-none">{stats.avgCompliance}%</div>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">الامتثال العام</p>
              </div>
           </div>
           <div className="bg-white p-5 rounded-[2rem] border border-slate-100 shadow-sm space-y-3">
              <div className="flex items-center justify-between">
                 <BellRing className="text-amber-600" size={24} />
                 <div className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              </div>
              <div>
                 <div className="text-2xl font-black text-slate-900 leading-none">03</div>
                 <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest mt-1">تنبيهات حرجة</p>
              </div>
           </div>
        </div>

        {/* Monitors List */}
        <section className="space-y-4">
           <div className="flex items-center justify-between px-1">
              <h3 className="font-black text-slate-900 text-sm">العقود المراقبة ({filteredMonitors.length})</h3>
              <button 
                onClick={() => setShowAddModal(true)}
                className="flex items-center gap-1.5 text-blue-600 text-[10px] font-black uppercase hover:underline"
              >
                 <Plus size={14} /> إضافة عقد
              </button>
           </div>

           <div className="space-y-4">
              {filteredMonitors.length === 0 ? (
                <div className="text-center py-20 bg-white rounded-3xl border border-dashed border-slate-200">
                   <Search size={48} className="mx-auto text-slate-200 mb-4" />
                   <p className="text-sm font-bold text-slate-400">لا توجد عقود تطابق البحث</p>
                </div>
              ) : (
                filteredMonitors.map((m) => (
                  <div 
                    key={m.id} 
                    className="bg-white p-6 rounded-[2.2rem] border border-slate-100 shadow-sm space-y-5 group hover:border-blue-600 transition-all"
                  >
                    <div className="flex items-start justify-between">
                       <div className="flex items-center gap-4">
                          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${
                            m.risk === 'high' ? 'bg-red-50 text-red-500' : m.risk === 'medium' ? 'bg-amber-50 text-amber-500' : 'bg-emerald-50 text-emerald-600'
                          }`}>
                             {m.risk === 'high' ? <ShieldAlert size={24} /> : m.risk === 'medium' ? <Clock size={24} /> : <ShieldCheck size={24} />}
                          </div>
                          <div>
                             <h4 className="font-black text-slate-900 text-sm leading-tight">{m.title}</h4>
                             <p className="text-[10px] text-slate-400 font-bold mt-0.5 uppercase tracking-widest flex items-center gap-1">
                                <Clock size={10} /> تحديث: {m.lastSync}
                             </p>
                          </div>
                       </div>
                       <div className="text-left">
                          <div className={`text-lg font-black ${
                            m.risk === 'high' ? 'text-red-500' : m.risk === 'medium' ? 'text-amber-500' : 'text-emerald-500'
                          }`}>{m.complianceScore}%</div>
                       </div>
                    </div>
                    
                    <div className="space-y-3">
                       <div className="flex items-center justify-between text-[10px] font-bold text-slate-500">
                          <div className="flex items-center gap-2">
                             <div className={`w-2 h-2 rounded-full ${
                               m.risk === 'high' ? 'bg-red-500' : m.risk === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                             }`} />
                             <span>{m.nextMilestone}</span>
                          </div>
                       </div>
                       <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                          <div 
                            className={`h-full rounded-full transition-all duration-1000 ${
                              m.risk === 'high' ? 'bg-red-500' : m.risk === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                            }`} 
                            style={{ width: `${m.complianceScore}%` }} 
                          />
                       </div>
                    </div>

                    <div className="flex gap-2 pt-1 opacity-0 group-hover:opacity-100 transition-all translate-y-2 group-hover:translate-y-0">
                       <button 
                         onClick={() => setShowDetailedReport(m)}
                         className="flex-1 py-3 bg-slate-900 text-white rounded-xl text-[10px] font-black uppercase active:scale-95 transition flex items-center justify-center gap-2"
                       >
                          <BarChart3 size={14} /> تقرير تفصيلي
                       </button>
                       <button 
                         onClick={() => setShowAlertSettings(m)}
                         className="px-5 py-3 bg-blue-50 text-blue-600 rounded-xl text-[10px] font-black uppercase active:scale-95 transition flex items-center justify-center gap-2"
                       >
                          <Bell size={14} /> ضبط التنبيهات
                       </button>
                    </div>
                  </div>
                ))
              )}
           </div>
        </section>
      </div>

      {/* MODAL: Detailed Report */}
      {showDetailedReport && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-sm rounded-[3rem] flex flex-col shadow-2xl animate-in zoom-in duration-300 overflow-hidden max-h-[90vh]">
              <div className={`p-6 ${showDetailedReport.risk === 'high' ? 'bg-red-600' : 'bg-blue-600'} text-white flex items-center justify-between`}>
                 <div className="flex items-center gap-3">
                    <BarChart3 size={24} />
                    <h3 className="text-lg font-black truncate max-w-[200px]">تقرير الامتثال: {showDetailedReport.title}</h3>
                 </div>
                 <button onClick={() => setShowDetailedReport(null)} className="p-2 bg-white/10 rounded-xl hover:bg-white/20 transition">
                    <X size={20} />
                 </button>
              </div>
              
              <div className="p-8 flex-1 overflow-y-auto space-y-8 no-scrollbar">
                 <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-1">الدرجة الكلية</p>
                       <p className="text-3xl font-black text-blue-600">{showDetailedReport.complianceScore}%</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-2xl text-center border border-slate-100">
                       <p className="text-[10px] font-black text-slate-400 uppercase mb-1">المخاطر</p>
                       <p className={`text-xl font-black uppercase ${showDetailedReport.risk === 'high' ? 'text-red-600' : 'text-amber-500'}`}>{showDetailedReport.risk}</p>
                    </div>
                 </div>

                 <div className="space-y-4">
                    <h4 className="text-[11px] font-black text-slate-900 uppercase tracking-widest flex items-center gap-2">
                       <CheckCircle2 size={16} className="text-emerald-500" /> تحليل البنود الحية
                    </h4>
                    <div className="space-y-3">
                       {[
                         { label: 'البند المالي والضمان', score: 100, status: 'مستقر' },
                         { label: 'الجدول الزمني للتسليم', score: 75, status: 'تأخير محتمل' },
                         { label: 'معايير الجودة الفنية', score: 90, status: 'جيد' },
                         { label: 'بند حل النزاعات', score: 100, status: 'مفعل' }
                       ].map((b, i) => (
                         <div key={i} className="space-y-2 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex justify-between items-center">
                               <span className="text-xs font-bold text-slate-700">{b.label}</span>
                               <span className={`text-[10px] font-black ${b.score === 100 ? 'text-emerald-600' : 'text-amber-600'}`}>{b.status}</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
                               <div className={`h-full ${b.score === 100 ? 'bg-emerald-500' : 'bg-amber-500'}`} style={{ width: `${b.score}%` }} />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="p-5 bg-blue-50 rounded-[2rem] border border-blue-100 space-y-3">
                    <div className="flex items-center gap-2 text-blue-600">
                       <Sparkles size={18} />
                       <h5 className="text-[11px] font-black uppercase">توصية AI الاستباقية</h5>
                    </div>
                    <p className="text-[11px] text-blue-800 leading-relaxed font-medium">
                       نقترح البدء في طلب إفادة رسمية من الطرف الثاني بخصوص تقدم المرحلة القادمة لتجنب أي تأخير محتمل في الجدول الزمني بنسبة (١٥٪).
                    </p>
                 </div>
              </div>

              <div className="p-6 bg-slate-50 border-t flex gap-3">
                 <button className="flex-1 py-4 bg-blue-600 text-white rounded-2xl font-black text-sm active:scale-95 transition shadow-xl shadow-blue-100 flex items-center justify-center gap-2">
                    <Download size={18} /> تحميل التقرير
                 </button>
                 <button onClick={() => setShowDetailedReport(null)} className="px-6 py-4 bg-white border border-slate-200 text-slate-400 rounded-2xl font-black text-sm">إغلاق</button>
              </div>
           </div>
        </div>
      )}

      {/* MODAL: Alert Settings */}
      {showAlertSettings && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-md animate-in fade-in duration-300">
           <div className="bg-white w-full max-w-sm rounded-[3rem] p-8 space-y-8 shadow-2xl animate-in zoom-in duration-300">
              <div className="flex items-center justify-between">
                 <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center">
                       <Bell size={24} />
                    </div>
                    <div>
                       <h3 className="text-lg font-black text-slate-900">ضبط التنبيهات</h3>
                       <p className="text-[10px] text-slate-400 font-bold uppercase">{showAlertSettings.title}</p>
                    </div>
                 </div>
                 <button onClick={() => setShowAlertSettings(null)} className="p-2 text-slate-300 hover:text-red-500 transition"><X size={24} /></button>
              </div>

              <div className="space-y-6">
                 <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">قنوات الاستلام</p>
                    <div className="space-y-3">
                       {[
                         { id: 'sms', label: 'رسائل نصية SMS', icon: <Smartphone size={16} />, active: true },
                         { id: 'email', label: 'البريد الإلكتروني', icon: <Mail size={16} />, active: true },
                         { id: 'push', label: 'تنبيهات المنصة', icon: <Bell size={16} />, active: true }
                       ].map((ch) => (
                         <div key={ch.id} className="flex items-center justify-between p-4 bg-slate-50 rounded-2xl border border-slate-100">
                            <div className="flex items-center gap-3">
                               <div className="text-blue-600">{ch.icon}</div>
                               <span className="text-xs font-bold text-slate-700">{ch.label}</span>
                            </div>
                            <div className="w-10 h-5 bg-blue-600 rounded-full relative">
                               <div className="absolute left-5 top-1 w-3 h-3 bg-white rounded-full" />
                            </div>
                         </div>
                       ))}
                    </div>
                 </div>

                 <div className="space-y-4">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest px-1">تنبيهات المخاطر</p>
                    <div className="grid grid-cols-1 gap-2">
                       {['تنبيه فوري عند رصد انتهاك', 'تذكير قبل أسبوع من الموعد', 'تقرير أداء أسبوعي ملخص'].map((pref, i) => (
                         <label key={i} className="flex items-center gap-3 p-4 bg-slate-50 rounded-2xl border border-slate-100 cursor-pointer hover:bg-white transition group">
                            <div className="w-5 h-5 rounded-lg border-2 border-slate-200 group-hover:border-blue-500 flex items-center justify-center transition-all bg-white">
                               <Check size={12} className="text-blue-600" />
                            </div>
                            <span className="text-xs font-bold text-slate-700">{pref}</span>
                         </label>
                       ))}
                    </div>
                 </div>

                 <button 
                   onClick={() => setShowAlertSettings(null)}
                   className="w-full py-5 bg-blue-600 text-white rounded-[1.8rem] font-black text-lg shadow-xl shadow-blue-100 active:scale-95 transition"
                 >
                    حفظ التفضيلات
                 </button>
              </div>
           </div>
        </div>
      )}

      {/* Floating Sync Button Indicator */}
      {isSyncing && (
        <div className="fixed bottom-32 right-1/2 translate-x-1/2 bg-slate-900 text-white px-6 py-3 rounded-full shadow-2xl flex items-center gap-3 animate-in slide-in-from-bottom duration-300 z-50">
           <RefreshCw size={18} className="animate-spin text-blue-400" />
           <span className="text-xs font-black uppercase tracking-widest">جاري مزامنة بيانات الامتثال...</span>
        </div>
      )}

      <style>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
      `}</style>
    </div>
  );
};

export default MonitoringScreen;