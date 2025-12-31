
import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Phone, Lock, Eye, EyeOff, User, Building2, CheckCircle, XCircle } from 'lucide-react';
import { AccountType, UserProfile } from '../types';

interface SignUpScreenProps {
  onBack: () => void;
  onSuccess: (data: Partial<UserProfile>) => void;
}

const SignUpScreen: React.FC<SignUpScreenProps> = ({ onBack, onSuccess }) => {
  const [mode, setMode] = useState<'email' | 'phone'>('email');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [accountType, setAccountType] = useState<AccountType>(AccountType.INDIVIDUAL);
  const [agreed, setAgreed] = useState(false);
  const [loading, setLoading] = useState(false);

  // Validation States
  const [pwdStrength, setPwdStrength] = useState<{ label: string; color: string; strength: number }>({
    label: 'ضعيف',
    color: 'bg-red-400',
    strength: 0
  });

  useEffect(() => {
    const checks = [
      password.length >= 8,
      /[A-Z]/.test(password),
      /[a-z]/.test(password),
      /[0-9]/.test(password),
      /[^A-Za-z0-9]/.test(password)
    ];
    const score = checks.filter(Boolean).length;
    
    if (score <= 2) setPwdStrength({ label: 'ضعيف', color: 'bg-red-400', strength: score });
    else if (score <= 4) setPwdStrength({ label: 'متوسط', color: 'bg-yellow-400', strength: score });
    else setPwdStrength({ label: 'قوي', color: 'bg-green-500', strength: score });
  }, [password]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) return;
    
    setLoading(true);
    // Simulate API Call
    setTimeout(() => {
      setLoading(false);
      onSuccess({ emailOrPhone, accountType });
    }, 1500);
  };

  const isFormValid = 
    emailOrPhone.length > 5 && 
    password.length >= 8 && 
    password === confirmPassword && 
    agreed;

  return (
    <div className="flex-1 flex flex-col animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex items-center justify-between p-6 bg-white border-b sticky top-0 z-10">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition">
          <ArrowRight className="text-slate-700" />
        </button>
        <h1 className="text-xl font-bold text-slate-900">إنشاء حساب جديد</h1>
        <div className="w-10"></div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 flex-1 space-y-6">
        {/* Account Type Toggle */}
        <div className="grid grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setAccountType(AccountType.INDIVIDUAL)}
            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${accountType === AccountType.INDIVIDUAL ? 'border-blue-600 bg-blue-50' : 'border-slate-100 bg-white'}`}
          >
            <User className={accountType === AccountType.INDIVIDUAL ? 'text-blue-600' : 'text-slate-400'} />
            <span className={`font-bold ${accountType === AccountType.INDIVIDUAL ? 'text-blue-900' : 'text-slate-500'}`}>فرد</span>
          </button>
          <button
            type="button"
            onClick={() => setAccountType(AccountType.COMPANY)}
            className={`p-4 rounded-xl border-2 transition-all flex flex-col items-center gap-2 ${accountType === AccountType.COMPANY ? 'border-blue-600 bg-blue-50' : 'border-slate-100 bg-white'}`}
          >
            <Building2 className={accountType === AccountType.COMPANY ? 'text-blue-600' : 'text-slate-400'} />
            <span className={`font-bold ${accountType === AccountType.COMPANY ? 'text-blue-900' : 'text-slate-500'}`}>شركة</span>
          </button>
        </div>

        {/* Auth Mode Toggle */}
        <div className="bg-slate-100 p-1 rounded-xl flex">
          <button
            type="button"
            onClick={() => setMode('email')}
            className={`flex-1 py-2 rounded-lg font-bold transition-all ${mode === 'email' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
          >
            بريد إلكتروني
          </button>
          <button
            type="button"
            onClick={() => setMode('phone')}
            className={`flex-1 py-2 rounded-lg font-bold transition-all ${mode === 'phone' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500'}`}
          >
            رقم هاتف
          </button>
        </div>

        {/* Input Fields */}
        <div className="space-y-4">
          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 block pr-1">
              {mode === 'email' ? 'البريد الإلكتروني' : 'رقم الهاتف'}
            </label>
            <div className="relative">
              <input
                type={mode === 'email' ? 'email' : 'tel'}
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                placeholder={mode === 'email' ? 'example@mail.com' : '05XXXXXXXX'}
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-10 focus:border-blue-500 transition"
                required
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                {mode === 'email' ? <Mail size={20} /> : <Phone size={20} />}
              </div>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 block pr-1">كلمة المرور</label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-10 focus:border-blue-500 transition"
                required
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                <Lock size={20} />
              </div>
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 left-3 flex items-center text-slate-400"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {/* Strength Indicator */}
            <div className="mt-2 space-y-1">
              <div className="flex gap-1 h-1">
                {[1, 2, 3, 4, 5].map((s) => (
                  <div key={s} className={`flex-1 rounded-full transition-all duration-500 ${s <= pwdStrength.strength ? pwdStrength.color : 'bg-slate-200'}`} />
                ))}
              </div>
              <p className={`text-[10px] font-bold text-left ${pwdStrength.color.replace('bg-', 'text-')}`}>
                قوة كلمة المرور: {pwdStrength.label}
              </p>
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-sm font-bold text-slate-700 block pr-1">تأكيد كلمة المرور</label>
            <div className="relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className={`w-full bg-slate-50 border rounded-xl py-3 px-10 focus:border-blue-500 transition ${confirmPassword && confirmPassword !== password ? 'border-red-400' : 'border-slate-200'}`}
                required
              />
              <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none text-slate-400">
                <Lock size={20} />
              </div>
            </div>
          </div>
        </div>

        {/* Agreements */}
        <div className="space-y-3">
          <label className="flex items-start gap-3 cursor-pointer group">
            <input 
              type="checkbox" 
              checked={agreed}
              onChange={(e) => setAgreed(e.target.checked)}
              className="mt-1 w-5 h-5 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-sm text-slate-600 leading-relaxed">
              أوافق على <button type="button" className="text-blue-600 font-bold hover:underline">الشروط والأحكام</button> و <button type="button" className="text-blue-600 font-bold hover:underline">سياسة الخصوصية</button> الخاصة بالمنصة.
            </span>
          </label>
        </div>

        {/* Footer Action */}
        <div className="pt-4 space-y-4">
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full py-4 rounded-xl font-bold text-lg shadow-lg transition flex items-center justify-center gap-2 ${isFormValid && !loading ? 'bg-blue-600 text-white shadow-blue-200 active:scale-95' : 'bg-slate-200 text-slate-400 cursor-not-allowed'}`}
          >
            {loading ? (
              <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              'إنشاء الحساب'
            )}
          </button>
          
          <p className="text-center text-slate-500 text-sm">
            لديك حساب بالفعل؟ <button type="button" onClick={onBack} className="text-blue-600 font-bold hover:underline">تسجيل الدخول</button>
          </p>
        </div>
      </form>
    </div>
  );
};

export default SignUpScreen;
