/** @format */
import React from "react";
import { motion } from "framer-motion";

const Explore = ({ features = [] }) => {
  return (
    <section className='relative min-h-screen bg-black text-white px-6 py-24 overflow-hidden'>
      {/* Background Decorative Elements */}
      <div className='absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none'>
        <div className='absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-emerald-900/20 rounded-full blur-[120px]' />
        <div className='absolute bottom-[10%] right-[0%] w-[30%] h-[30%] bg-emerald-600/10 rounded-full blur-[100px]' />
      </div>

      <div className='relative z-10 max-w-7xl mx-auto'>
        {/* Header Section */}
        <div className='text-center mb-20'>
          <h2 className='text-emerald-500 font-semibold tracking-widest uppercase text-sm mb-4'>
            Intelligence Unleashed
          </h2>
          <h1 className='text-5xl md:text-7xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-500'>
            Explore WisperHub
          </h1>
          <p className='max-w-2xl mx-auto text-neutral-400 text-lg md:text-xl leading-relaxed'>
            Experience the next generation of communication tools designed for
            speed, security, and seamless integration.
          </p>
        </div>

        {/* Features Grid */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {features.map((feature, i) => (
            <div
              key={i}
              className='group relative p-[1px] rounded-[2.5rem] bg-gradient-to-b from-neutral-700 to-transparent hover:from-emerald-500 transition-all duration-500'>
              {/* Inner Card */}
              <div className='relative h-full bg-[#0a0a0a] rounded-[2.4rem] p-10 flex flex-col items-start overflow-hidden'>
                {/* Glow Effect on Hover */}
                <div className='absolute inset-0 bg-emerald-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500' />

                {/* Icon Container */}
                <div className='relative mb-8 p-4 bg-neutral-900 rounded-2xl border border-neutral-800 group-hover:border-emerald-500/50 group-hover:text-emerald-400 transition-colors duration-300 text-5xl'>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className='text-2xl font-bold mb-4 group-hover:text-emerald-300 transition-colors'>
                  {feature.title}
                </h3>

                <p className='text-neutral-400 leading-relaxed text-base'>
                  {feature.description}
                </p>

                {/* Decorative Accent */}
                <div className='mt-8 w-12 h-[2px] bg-neutral-800 group-hover:w-full group-hover:bg-emerald-500/50 transition-all duration-500' />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;
