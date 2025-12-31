
import React, { useState } from 'react';
import { ArrowRight, Mail, Phone, Lock, Eye, EyeOff, User, Building2, Gavel } from 'lucide-react';
import { AccountType, UserProfile } from '../types';

interface LoginScreenProps {
  onBack: () => void;
  onSuccess: (data: Partial<UserProfile>) => void;
}

const LoginScreen: React.FC<LoginScreenProps> = ({ onBack, onSuccess }) => {
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<AccountType>(AccountType.INDIVIDUAL);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Simulate Login - Allows any input
    setTimeout(() => {
      setLoading(false);
      onSuccess({ emailOrPhone, accountType });
    }, 1000);
  };

  const isFormValid = emailOrPhone.length > 5 && password.length >= 4;

  return (
    <div className="flex-1 flex flex-col animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white border-b sticky top-0 z-10">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
          <ArrowRight className="text-slate-700" />
        </button>
        <h1 className="text-xl font-bold text-slate-900">تسجيل الدخول</h1>
        <div className="w-10"></div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 flex-1 space-y-8">
        <div className="space-y-4">
          <h3 className="text-sm font-black text-slate-400 uppercase tracking-widest text-center">نوع الحساب</h3>
          {/* Account Type Toggle */}
          <div className="grid grid-cols-3 gap-3">
            <button
              type="button"
              onClick={() => setAccountType(AccountType.INDIVIDUAL)}
              className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${accountType === AccountType.INDIVIDUAL ? 'border-blue-600 bg-blue-50 shadow-lg shadow-blue-50' : 'border-slate-100 bg-white'}`}
            >
              <User className={accountType === AccountType.INDIVIDUAL ? 'text-blue-600' : 'text-slate-400'} size={24} />
              <span className={`font-black text-[10px] ${accountType === AccountType.INDIVIDUAL ? 'text-blue-900' : 'text-slate-500'}`}>فرد</span>
            </button>
            <button
              type="button"
              onClick={() => setAccountType(AccountType.COMPANY)}
              className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${accountType === AccountType.COMPANY ? 'border-blue-600 bg-blue-50 shadow-lg shadow-blue-50' : 'border-slate-100 bg-white'}`}
            >
              <Building2 className={accountType === AccountType.COMPANY ? 'text-blue-600' : 'text-slate-400'} size={24} />
              <span className={`font-black text-[10px] ${accountType === AccountType.COMPANY ? 'text-blue-900' : 'text-slate-500'}`}>شركة</span>
            </button>
            <button
              type="button"
              onClick={() => setAccountType(AccountType.LAWYER)}
              className={`p-3 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 ${accountType === AccountType.LAWYER ? 'border-indigo-600 bg-indigo-50 shadow-lg shadow-indigo-50' : 'border-slate-100 bg-white'}`}
            >
              <Gavel className={accountType === AccountType.LAWYER ? 'text-indigo-600' : 'text-slate-400'} size={24} />
              <span className={`font-black text-[10px] ${accountType === AccountType.LAWYER ? 'text-indigo-900' : 'text-slate-500'}`}>محامي</span>
            </button>
          </div>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block pr-1">البريد الإلكتروني أو الهاتف</label>
            <div className="relative">
              <input
                type="text"
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder="example@mail.com"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-12 focus:border-blue-500 transition outline-none"
                required
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <Mail size={20} />
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-black text-slate-400 uppercase tracking-widest block pr-1">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-4 px-12 focus:border-blue-500 transition outline-none"
                required
              />
              <div className="absolute inset-y-0 right-4 flex items-center pointer-events-none text-slate-400">
                <Lock size={20} />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-4 flex items-center text-slate-400"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>
          
          <div className="text-left">
            <button type="button" className="text-xs font-bold text-blue-600 hover:underline">نسيت كلمة المرور؟</button>
          </div>
        </div>

        {/* Footer Action */}
        <div className="pt-4 space-y-4">
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-4 rounded-2xl font-black text-lg shadow-xl transition flex items-center justify-center gap-2 ${isFormValid && !loading ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'دخول'
            )}
          </button>
          
          <p className="text-center text-slate-500 text-sm">
            ليس لديك حساب؟ <button type="button" onClick={onBack} className="text-blue-600 font-bold hover:underline">سجل الآن</button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default LoginScreen;
