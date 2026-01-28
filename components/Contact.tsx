
import React from 'react';

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-32 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-6 text-center space-y-12">
        <h2 className="text-xl md:text-2xl font-bold tracking-tight text-white uppercase tracking-widest">작업 문의</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-6">
          <div className="p-10 bg-[#141414] border border-white/5 rounded-2xl space-y-4 hover:border-[#ffa04d]/30 transition-all duration-300">
            <span className="text-xs uppercase tracking-[0.2em] text-[#ffa04d] font-bold">Email</span>
            <p className="text-xl md:text-2xl font-light text-white">zlqordhtlq@gmail.com</p>
          </div>
          <div className="p-10 bg-[#141414] border border-white/5 rounded-2xl space-y-4 hover:border-[#ffa04d]/30 transition-all duration-300">
            <span className="text-xs uppercase tracking-[0.2em] text-[#ffa04d] font-bold">Phone</span>
            <p className="text-xl md:text-2xl font-light text-white">010-4479-9296</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
