import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen flex flex-col justify-center items-center px-6 overflow-hidden bg-[#0a0a0a]">
      {/* 배경 조명 효과 */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-orange-500/5 rounded-full blur-[120px] -z-10"></div>
      
      <div className="max-w-4xl text-center space-y-10">
        <h2 className="text-lg md:text-xl font-light text-gray-400 tracking-[0.2em] animate-[fadeIn_1s_ease-out]">
          이아현 Editor
        </h2>
        
        <h1 className="text-7xl md:text-9xl font-serif italic font-bold tracking-tight text-white animate-[slideUp_1.2s_ease-out]">
          Portfolio.
        </h1>
        
        <div className="h-px w-24 bg-white/20 mx-auto"></div>
        
        <p className="text-xl md:text-2xl font-light text-gray-300 leading-relaxed max-w-2xl mx-auto animate-[fadeIn_1.5s_ease-out]">
          콘텐츠에 맞는 디자인부터 편집까지
        </p>

        <div className="pt-12 animate-[fadeIn_2s_ease-out]">
          <a href="#portfolio" className="group flex flex-col items-center gap-4 text-[10px] font-bold uppercase tracking-[0.4em] text-gray-500 hover:text-white transition-colors">
            Scroll down
            <div className="w-px h-16 bg-gradient-to-b from-white/20 to-transparent group-hover:h-20 transition-all duration-500"></div>
          </a>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
};

export default Hero;