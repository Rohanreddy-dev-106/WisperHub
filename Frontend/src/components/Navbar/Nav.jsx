/** @format */
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const Nav = ({ logo, Title, navdata }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [hoveredIndex, setHoveredIndex] = useState(null);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={`
        flex items-center justify-between
        px-8 md:px-12
        sticky top-0 z-[100]
        transition-all duration-300
        ${
          isScrolled
            ? "bg-black/80 backdrop-blur-xl border-b border-white/10 py-3"
            : "bg-transparent border-b border-transparent py-4"
        }
      `}>
      {/* Logo → Home */}
      <a href='#home' className='flex items-center gap-3 group cursor-pointer'>
        <motion.div
          whileHover={{ rotate: 360 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className='relative'>
          <img
            src={logo}
            alt='logo'
            className='w-9 h-9 rounded-full border border-emerald-500/30
                       group-hover:border-emerald-500 transition-colors'
          />
          <div
            className='absolute inset-0 rounded-full bg-emerald-500/20
                          blur-md opacity-0 group-hover:opacity-100 transition-opacity'
          />
        </motion.div>

        <span className='text-white font-bold text-lg tracking-tighter uppercase'>
          {Title}
        </span>
      </a>

      {/* Nav Links */}
      <ul className='hidden md:flex items-center gap-2'>
        {navdata.map((item, i) => (
          <li
            key={i}
            className='relative'
            onMouseEnter={() => setHoveredIndex(i)}
            onMouseLeave={() => setHoveredIndex(null)}>
            <a
              href={item.href}
              className={`
                relative z-10 px-4 py-2 text-xs font-bold uppercase tracking-widest
                transition-colors duration-300
                ${hoveredIndex === i ? "text-emerald-400" : "text-neutral-400"}
              `}>
              {item.label}
            </a>

            <AnimatePresence>
              {hoveredIndex === i && (
                <motion.div
                  layoutId='nav-hover'
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className='absolute inset-0 bg-emerald-500/10
                             rounded-lg border-b border-emerald-500/50 z-0'
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
            </AnimatePresence>
          </li>
        ))}
      </ul>
    </motion.nav>
  );
};

export default Nav;
