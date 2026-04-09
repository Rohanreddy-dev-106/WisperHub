/** @format */
import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0 },
  };

  const socialLinks = [
    { name: "LinkedIn", url: "https://www.linkedin.com/in/rohan-reddy" },
    { name: "GitHub", url: "https://github.com/rohan-reddy" },
    { name: "X", url: "https://twitter.com/rohan_reddy" },
  ];

  return (
    <motion.footer
      initial='hidden'
      whileInView='visible'
      viewport={{ once: true }}
      variants={containerVars}
      className='relative bg-black border-t border-white/5 py-12 px-6 overflow-hidden'>
      {/* Subtle background accent */}
      <div className='absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-24 bg-emerald-500/5 blur-[100px] pointer-events-none' />

      <div className='max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8 relative z-10'>
        {/* Left Side: Brand/Creator */}
        <motion.div
          variants={itemVars}
          className='flex flex-col items-center md:items-start gap-2'>
          <div className='flex items-center gap-2'>
            <div className='h-2 w-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]' />
            <span className='text-white font-bold tracking-tighter text-lg'>
              WisperHub
            </span>
          </div>
          <p className='text-sm text-neutral-500'>
            Crafted with precision by{" "}
            <motion.span
              whileHover={{ color: "#34d399" }}
              className='text-neutral-300 font-medium cursor-pointer transition-colors'>
              Rohan Reddy
            </motion.span>
          </p>
        </motion.div>

        {/* Right Side: Social Links */}
        <motion.div variants={itemVars} className='flex items-center gap-3'>
          {socialLinks.map((link) => (
            <motion.a
              key={link.name}
              href={link.url}
              target='_blank'
              rel='noopener noreferrer'
              whileHover={{ y: -3, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='px-4 py-1.5 rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 text-xs font-semibold hover:border-emerald-500/50 hover:text-emerald-400 transition-colors'>
              {link.name}
            </motion.a>
          ))}
        </motion.div>
      </div>

      {/* Bottom Row */}
      <motion.div
        variants={itemVars}
        className='max-w-6xl mx-auto mt-12 pt-8 border-t border-white/[0.03] flex flex-col md:flex-row justify-between items-center gap-4'>
        <p className='text-[10px] uppercase tracking-[0.2em] text-neutral-600'>
          &copy; {currentYear} WisperHub Identity Systems.
        </p>
        <div className='flex gap-6 text-[10px] uppercase tracking-widest text-neutral-600'>
          <a href='#' className='hover:text-emerald-500 transition-colors'>
            Privacy
          </a>
          <a href='#' className='hover:text-emerald-500 transition-colors'>
            Terms
          </a>
        </div>
      </motion.div>
    </motion.footer>
  );
};

export default Footer;
