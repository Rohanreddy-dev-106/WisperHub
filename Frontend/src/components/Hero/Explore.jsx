/** @format */
import React from "react";
import { motion } from "framer-motion";

const Explore = ({ features = [] }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
  };

  return (
    <section
      id='explore'
      className='relative min-h-screen bg-black text-white px-6 py-32 overflow-hidden'>
      <div className='relative z-10 max-w-7xl mx-auto'>
        <div className='text-center mb-20'>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className='text-4xl md:text-5xl font-extrabold tracking-tight'>
            Explore <span className='text-emerald-500'>WisperHub</span>
          </motion.h2>
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: "80px" }}
            className='h-1 bg-emerald-500 mx-auto mt-4 rounded-full'
          />
        </div>

        <div className='grid md:grid-cols-3 gap-6'>
          {features.map((feature, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              initial='hidden'
              whileInView='visible'
              viewport={{ once: true, margin: "-50px" }}
              whileHover={{ y: -10, borderColor: "rgba(16,185,129,0.4)" }}
              className='group bg-neutral-900/40 p-8 rounded-[2rem] border border-neutral-800/50 hover:bg-neutral-900/60 transition-all duration-300'>
              <div className='w-12 h-12 mb-6 flex items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-500 group-hover:scale-110 transition-transform'>
                {feature.icon}
              </div>
              <h3 className='text-xl font-bold mb-3'>{feature.title}</h3>
              <p className='text-neutral-500 leading-relaxed text-sm group-hover:text-neutral-400 transition-colors'>
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Explore;
