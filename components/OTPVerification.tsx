
import React, { useState, useEffect, useRef } from 'react';
import { ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

interface OTPVerificationProps {
  target: string;
  onBack: () => void;
  onSuccess: () => void;
  onChangeTarget: () => void;
}

const OTPVerification: React.FC<OTPVerificationProps> = ({ target, onBack, onSuccess, onChangeTarget }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(180); // 3:00
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s.toString().padStart(2, '0')}`;
  };

  const handleChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    setError(false);

    if (value && index < 5) {
      inputs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleVerify = () => {
    const code = otp.join('');
    if (code.length < 6) return;

    setLoading(true);
    // Simulate verification
    setTimeout(() => {
      setLoading(false);
      if (code === '123456') {
        setIsSuccess(true);
        setTimeout(onSuccess, 1500);
      } else {
        setError(true);
        setOtp(['', '', '', '', '', '']);
        inputs.current[0]?.focus();
      }
    }, 1500);
  };

  // Auto-submit
  useEffect(() => {
    if (otp.join('').length === 6) {
      handleVerify();
    }
  }, [otp]);

  return (
    <div className="flex-1 flex flex-col p-6 animate-in slide-in-from-left duration-300">
      <div className="mb-8">
        <button onClick={onBack} className="p-2 hover:bg-slate-100 rounded-full transition mb-4">
          <ArrowRight className="text-slate-700" />
        </button>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">تحقق من حسابك</h1>
        <p className="text-slate-500">
          أدخل الرمز المكون من 6 أرقام المرسل إلى <span className="text-blue-600 font-bold" dir="ltr">{target}</span>
        </p>
      </div>

      <div className="flex-1 flex flex-col items-center">
        {isSuccess ? (
          <div className="flex flex-col items-center justify-center space-y-4 animate-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
              <CheckCircle2 size={48} />
            </div>
            <p className="text-xl font-bold text-green-600">تم التحقق بنجاح ✓</p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-6 gap-2 w-full mb-8" dir="ltr">
              {otp.map((digit, idx) => (
                <input
                  key={idx}
                  // Fix: wrapped assignment in braces to return void instead of assigned element
                  ref={(el) => { inputs.current[idx] = el; }}
                  type="text"
                  inputMode="numeric"
                  value={digit}
                  onChange={(e) => handleChange(idx, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(idx, e)}
                  className={`w-full aspect-square text-center text-2xl font-bold rounded-xl border-2 transition-all ${error ? 'border-red-400 bg-red-50 text-red-600' : digit ? 'border-blue-600 bg-blue-50 text-blue-900' : 'border-slate-100 bg-slate-50'}`}
                />
              ))}
            </div>

            <div className="flex flex-col items-center gap-4 w-full">
              <div className="text-slate-500 font-medium">
                الرمز صالح لمدة: <span className="text-blue-600 font-mono font-bold">{formatTime(timer)}</span>
              </div>

              <button
                onClick={handleVerify}
                disabled={otp.join('').length < 6 || loading}
                className="w-full py-4 bg-blue-600 text-white rounded-xl font-bold text-lg shadow-lg hover:bg-blue-700 disabled:bg-slate-200 disabled:text-slate-400 transition flex items-center justify-center gap-2"
              >
                {loading ? (
                   <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                ) : 'تحقق'}
              </button>

              <div className="flex flex-col items-center gap-2 mt-4">
                <button
                  disabled={timer > 0}
                  className={`flex items-center gap-2 font-bold transition ${timer === 0 ? 'text-blue-600 hover:underline' : 'text-slate-300'}`}
                >
                  <RefreshCw size={18} />
                  إعادة إرسال الرمز
                </button>
                <button
                  onClick={onChangeTarget}
                  className="text-slate-400 text-sm hover:text-slate-600 transition"
                >
                  تغيير البريد/الهاتف
                </button>
              </div>
            </div>
          </>
        )}
      </div>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-xl text-center font-bold animate-bounce mt-4">
          الرمز المدخل غير صحيح، يرجى المحاولة مرة أخرى
        </div>
      )}
    </div>
  );
};

export default OTPVerification;
