/** @format */
import React from "react";

const Hero = ({
  badge,
  title,
  highlight,
  subtitle,
  description,
  primaryCta,
  secondaryCta,
}) => {
  return (
    <section className='relative min-h-[85vh] flex items-center justify-center bg-[#050505] overflow-hidden'>
      {/* --- BACKGROUND LAYER --- */}
      <div className='absolute inset-0 z-0'>
        {/* High-Visibility Grid */}
        <div
          className='absolute inset-0 bg-[linear-gradient(to_right,#ffffff1a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff1a_1px,transparent_1px)] bg-[size:35px_35px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]'
          /* #ffffff1a is roughly 10% opacity white. 
             If you want it even brighter, change to #ffffff33 (20%).
          */
        />

        {/* Main Emerald Glow */}
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[120px] rounded-full pointer-events-none' />
      </div>

      {/* --- CONTENT LAYER --- */}
      <div className='relative z-10 max-w-4xl text-center px-6'>
        {/* Compact Badge */}
        <div className='flex justify-center animate-[fadeIn_0.8s_ease-out]'>
          <span className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black border border-emerald-500/30 text-emerald-500 text-[10px] font-bold tracking-[0.2em] uppercase backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.1)]'>
            <span className='h-1 w-1 rounded-full bg-emerald-500 animate-pulse' />
            {badge}
          </span>
        </div>

        {/* Heading */}
        <h1 className='mt-6 text-3xl md:text-6xl font-bold tracking-tight text-white leading-tight'>
          <span className='inline-block opacity-0 animate-[fadeIn_1s_forwards] text-neutral-200'>
            {title}
          </span>
          <br />
          <span className='relative mt-1 inline-block text-emerald-400 typing-container font-semibold'>
            {highlight} {subtitle}
          </span>
        </h1>

        {/* Description */}
        <p className='mt-6 text-neutral-400 text-sm md:text-base max-w-xl mx-auto leading-relaxed opacity-0 animate-[fadeIn_1.4s_forwards]'>
          {description}
        </p>

        {/* Buttons */}
        <div className='mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 opacity-0 animate-[fadeIn_1.6s_forwards]'>
          <button className='px-6 py-2.5 bg-emerald-600 text-white text-sm font-semibold rounded-lg transition-all hover:bg-emerald-500 hover:shadow-[0_0_25px_rgba(16,185,129,0.4)] hover:-translate-y-0.5 active:translate-y-0'>
            {primaryCta}
          </button>

          <button className='px-6 py-2.5 bg-neutral-900/50 text-neutral-300 text-sm font-semibold rounded-lg border border-neutral-800 hover:text-white hover:bg-neutral-800 transition-all backdrop-blur-sm'>
            {secondaryCta || "Documentation"}
          </button>
        </div>
      </div>

      {/* CSS Animations */}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(15px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .typing-container {
          display: inline-block;
          overflow: hidden;
          white-space: nowrap;
          border-right: 2px solid #10b981;
          width: 0;
          animation: typing 4s steps(30) infinite;
        }

        @keyframes typing {
          0%, 10% { width: 0 }
          45%, 80% { width: 100% }
          95%, 100% { width: 0 }
        }
      `}</style>
    </section>
  );
};

export default Hero;
