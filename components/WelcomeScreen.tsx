
import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, Scale } from 'lucide-react';

interface WelcomeScreenProps {
  onNext: () => void;
  onLogin: () => void;
  onGuest: () => void;
}

const slides = [
  {
    title: "أدِر جميع علاقاتك القانونية في مكان واحد",
    description: "بساطة في التعامل، سرعة في الإنجاز، وأمان كامل لجميع معاملاتك.",
    icon: "📁"
  },
  {
    title: "استشارات قانونية ذكية متوفرة 24/7",
    description: "فريق من الخبراء والذكاء الاصطناعي في خدمتك طوال الوقت.",
    icon: "🤖"
  },
  {
    title: "عقود موثقة ومحمية بتقنية Blockchain",
    description: "أعلى معايير الحماية والشفافية لعقودك واتفاقياتك.",
    icon: "🔗"
  },
  {
    title: "حل النزاعات بذكاء وشفافية",
    description: "حلول تقنية وقانونية لضمان العدالة والسرعة في فض النزاعات.",
    icon: "⚖️"
  }
];

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ onNext, onLogin, onGuest }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    if (currentSlide < slides.length - 1) {
      setCurrentSlide(currentSlide + 1);
    } else {
      onNext();
    }
  };

  return (
    <div className="flex-1 flex flex-col p-6 text-center animate-in fade-in duration-500">
      {/* Logo */}
      <div className="mt-12 mb-12 flex flex-col items-center">
        <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-4">
          <Scale size={40} />
        </div>
        <h1 className="text-2xl font-black text-blue-900">المنصة القانونية</h1>
      </div>

      {/* Slider Content */}
      <div className="flex-1 flex flex-col items-center justify-center transition-all duration-500 transform">
        <div className="text-6xl mb-8 transform hover:scale-110 transition cursor-default">
          {slides[currentSlide].icon}
        </div>
        <h2 className="text-2xl font-bold text-slate-800 mb-4 px-4 leading-relaxed h-[64px]">
          {slides[currentSlide].title}
        </h2>
        <p className="text-slate-500 text-sm leading-relaxed px-6 h-[48px]">
          {slides[currentSlide].description}
        </p>
      </div>

      {/* Indicators */}
      <div className="flex justify-center gap-2 my-10">
        {slides.map((_, idx) => (
          <button 
            key={idx}
            onClick={() => setCurrentSlide(idx)}
            className={`h-2 transition-all duration-300 rounded-full ${idx === currentSlide ? 'w-8 bg-blue-600' : 'w-2 bg-slate-200'}`}
          />
        ))}
      </div>

      {/* Action Buttons */}
      <div className="space-y-4 mb-8">
        <button 
          onClick={onNext}
          className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold text-lg shadow-lg shadow-blue-200 transition active:scale-95"
        >
          إنشاء حساب جديد
        </button>
        <button 
          onClick={onLogin}
          className="w-full py-4 bg-slate-100 hover:bg-slate-200 text-blue-900 rounded-xl font-bold text-lg transition active:scale-95"
        >
          تسجيل الدخول
        </button>
        <button 
          onClick={onGuest}
          className="text-slate-400 font-medium hover:text-blue-600 transition"
        >
          تخطي - استكشاف كضيف
        </button>
      </div>
    </div>
  );
};

export default WelcomeScreen;
