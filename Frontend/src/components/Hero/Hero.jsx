/** @format */
import React, { useState } from "react";
import { motion } from "framer-motion";

const Hero = ({ title, highlight, subtitle, description }) => {
  const [isLoading, setIsLoading] = useState({ login: false, register: false });

  // Mock API Call Handler
  const handleAuth = async (type) => {
    setIsLoading((prev) => ({ ...prev, [type]: true }));

    // Simulate API latency
    console.log(`Calling API: /api/v1/auth/${type}`);
    await new Promise((resolve) => setTimeout(resolve, 2000));

    setIsLoading((prev) => ({ ...prev, [type]: false }));
    alert(`${type.toUpperCase()} successful (Demo Mode)`);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.8 } },
  };

  return (
    <section className='relative min-h-screen flex items-center justify-center bg-[#050505] overflow-hidden'>
      {/* Background Grid & Glow (Kept from previous version) */}
      <div
        className='absolute inset-0 opacity-10'
        style={{
          backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
          backgroundSize: "50px 50px",
        }}
      />
      <div className='absolute w-[500px] h-[500px] bg-emerald-500/10 blur-[120px] rounded-full' />

      <motion.div
        variants={containerVariants}
        initial='hidden'
        animate='visible'
        className='relative z-10 max-w-4xl text-center px-6'>
        <motion.h1
          variants={itemVariants}
          className='text-6xl md:text-8xl font-black text-white tracking-tighter'>
          {title} <br />
          <span className='bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent'>
            {highlight} {subtitle}
          </span>
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className='mt-8 text-neutral-500 text-lg md:text-xl max-w-2xl mx-auto'>
          {description}
        </motion.p>

        {/* API Action Buttons */}
        <motion.div
          variants={itemVariants}
          className='mt-12 flex flex-wrap justify-center gap-6'>
          {/* Register Button (Primary) */}
          <motion.button
            onClick={() => handleAuth("register")}
            disabled={isLoading.register || isLoading.login}
            whileHover={{
              scale: 1.02,
              boxShadow: "0 0 25px rgba(16, 185, 129, 0.4)",
            }}
            whileTap={{ scale: 0.98 }}
            className='relative group px-10 py-4 bg-emerald-600 rounded-full overflow-hidden'>
            <span
              className={`relative z-10 text-black font-black flex items-center gap-2`}>
              {isLoading.register ? (
                <div className='w-5 h-5 border-2 border-black/30 border-t-black rounded-full animate-spin' />
              ) : (
                "Get Started"
              )}
            </span>
          </motion.button>

          {/* Login Button (Secondary Glass) */}
          <motion.button
            onClick={() => handleAuth("login")}
            disabled={isLoading.register || isLoading.login}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.1)" }}
            whileTap={{ scale: 0.98 }}
            className='px-10 py-4 bg-white/5 border border-white/10 text-white font-bold rounded-full backdrop-blur-md transition-all flex items-center gap-2'>
            {isLoading.login ? (
              <div className='w-5 h-5 border-2 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin' />
            ) : (
              "Existing User? Login"
            )}
          </motion.button>
        </motion.div>

        {/* Bottom text for visual balance */}
        <motion.p
          variants={itemVariants}
          className='mt-8 text-[10px] text-neutral-600 uppercase tracking-[0.5em]'>
          No Credit Card Required • 
        </motion.p>
      </motion.div>
    </section>
  );
};

export default Hero;
