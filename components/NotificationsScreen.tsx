
import React from 'react';
import { 
  ArrowRight, Bell, Clock, CheckCircle2, 
  AlertTriangle, FileText, Gavel, Wallet, 
  MessageSquare, MoreVertical, Search, CheckCheck
} from 'lucide-react';
import { Notification } from '../types';

interface NotificationsScreenProps {
  onBack: () => void;
}

const NotificationsScreen: React.FC<NotificationsScreenProps> = ({ onBack }) => {
  const notifications: Notification[] = [
    { id: '1', title: 'تم توقيع العقد رقم #1234', desc: 'قام الطرف الثاني بالتوقيع على العقد بنجاح. العقد الآن نشط وقيد التنفيذ.', time: 'منذ ساعتين', type: 'contract', unread: true },
    { id: '2', title: 'موعد استحقاق دفعة مالية', desc: 'تنبيه: الدفعة الثانية لعقد توريد سابك مستحقة خلال ٤٨ ساعة.', time: 'منذ ٥ ساعات', type: 'payment', unread: true },
    { id: '3', title: 'طلب استشارة جديد', desc: 'لديك طلب استشارة نصية جديد بخصوص قانون العمل.', time: 'منذ يوم', type: 'consult', unread: false },
    { id: '4', title: 'إشعار نزاع قانوني', desc: 'تم فتح نزاع من قبل الطرف الآخر في عقد إيجار شقة الرياض.', time: 'منذ يومين', type: 'dispute', unread: false }
  ];

  const getIcon = (type: string) => {
    switch (type) {
      case 'contract': return <FileText size={20} className="text-blue-600" />;
      case 'payment': return <Wallet size={20} className="text-emerald-600" />;
      case 'dispute': return <Gavel size={20} className="text-red-600" />;
      case 'consult': return <MessageSquare size={20} className="text-indigo-600" />;
      default: return <Bell size={20} className="text-slate-400" />;
    }
  };

  const getBg = (type: string) => {
    switch (type) {
      case 'contract': return 'bg-blue-50';
      case 'payment': return 'bg-emerald-50';
      case 'dispute': return 'bg-red-50';
      case 'consult': return 'bg-indigo-50';
      default: return 'bg-slate-50';
    }
  };

  return (
    <div className="flex-1 flex flex-col bg-slate-50 animate-in slide-in-from-left duration-500 overflow-y-auto pb-24">
      {/* Header */}
      <div className="p-4 bg-white border-b sticky top-0 z-30 shadow-sm flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition"><ArrowRight size={20} /></button>
          <h1 className="text-lg font-black text-slate-900">مركز الإشعارات</h1>
        </div>
        <button className="p-2 text-blue-600"><CheckCheck size={20} /></button>
      </div>

      <div className="p-4 space-y-3">
        {notifications.map(notif => (
          <div key={notif.id} className={`p-5 rounded-[1.8rem] border flex gap-4 transition-all hover:border-blue-200 cursor-pointer ${notif.unread ? 'bg-white border-blue-100 shadow-xl shadow-blue-50' : 'bg-slate-50/50 border-transparent opacity-70'}`}>
            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 shadow-inner ${getBg(notif.type)}`}>
               {getIcon(notif.type)}
            </div>
            <div className="flex-1 space-y-1">
               <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black text-slate-900">{notif.title}</h4>
                  <span className="text-[8px] font-bold text-slate-300 uppercase">{notif.time}</span>
               </div>
               <p className="text-[10px] text-slate-500 leading-relaxed font-medium">{notif.desc}</p>
            </div>
            {notif.unread && (
              <div className="w-1.5 h-1.5 bg-blue-600 rounded-full mt-2 shrink-0 animate-pulse" />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default NotificationsScreen;
