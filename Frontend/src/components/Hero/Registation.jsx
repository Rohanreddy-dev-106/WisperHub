/** @format */
import React, { useState } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

const Registration = () => {
  const [formData, setFormData] = useState({
    age: "",
    bio: "",
    password: "",
    avatar: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [isError, setIsError] = useState(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files && files[0]) {
      setFormData({ ...formData, [name]: files[0] });
      setPreview(URL.createObjectURL(files[0]));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const data = new FormData();
      Object.entries(formData).forEach(([key, value]) =>
        data.append(key, value),
      );

      const res = await axios.post("http://localhost:5000/api/register", data);
      setIsError(false);
      setMessage(res.data.message || "Welcome to the shadows.");
    } catch (err) {
      setIsError(true);
      setMessage(err.response?.data?.message || "Transmission failed.");
    } finally {
      setLoading(false);
    }
  };

  // Animation Variants
  const containerVars = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, staggerChildren: 0.1 },
    },
  };

  const itemVars = {
    hidden: { opacity: 0, x: -10 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <div className='min-h-screen flex items-center justify-center bg-[#050505] text-white px-4 relative overflow-hidden'>
      {/* Background Glows */}
      <div className='absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-[radial-gradient(circle_at_center,rgba(16,185,129,0.05),transparent_70%)] pointer-events-none' />

      <motion.div
        variants={containerVars}
        initial='hidden'
        animate='visible'
        className='w-full max-w-md relative z-10'>
        <form
          onSubmit={handleSubmit}
          className='backdrop-blur-2xl bg-white/[0.02] border border-white/10 rounded-[2rem] p-8 shadow-2xl space-y-6'>
          {/* Header */}
          <motion.div variants={itemVars} className='text-center space-y-2'>
            <h2 className='text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-emerald-300 to-emerald-600'>
              Join WisperHub
            </h2>
            <p className='text-xs text-neutral-500 uppercase tracking-widest font-medium'>
              Initialize Anonymity Protocol
            </p>
          </motion.div>

          {/* Status Message */}
          <AnimatePresence mode='wait'>
            {message && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className={`text-xs p-3 rounded-xl border text-center font-medium ${
                  isError
                    ? "bg-red-500/10 text-red-400 border-red-500/20"
                    : "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                }`}>
                {message}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Avatar Upload */}
          <motion.div
            variants={itemVars}
            className='flex flex-col items-center gap-4'>
            <motion.label
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className='relative group cursor-pointer'>
              <div className='w-24 h-24 rounded-full border-2 border-dashed border-emerald-500/30 flex items-center justify-center overflow-hidden transition-colors group-hover:border-emerald-500'>
                {preview ? (
                  <img
                    src={preview}
                    alt='avatar'
                    className='w-full h-full object-cover'
                  />
                ) : (
                  <div className='text-center flex flex-col items-center'>
                    <span className='text-2xl opacity-50'>👤</span>
                  </div>
                )}
                <div className='absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center'>
                  <span className='text-[10px] font-bold uppercase tracking-tighter'>
                    Change
                  </span>
                </div>
              </div>
              <input
                type='file'
                name='avatar'
                accept='image/*'
                onChange={handleChange}
                className='hidden'
              />
            </motion.label>
          </motion.div>

          {/* Form Fields */}
          <div className='space-y-4'>
            {[
              {
                label: "Age",
                name: "age",
                type: "number",
                placeholder: "Min. 18",
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                placeholder: "••••••••",
              },
            ].map((field) => (
              <motion.div variants={itemVars} key={field.name}>
                <label className='text-[10px] uppercase tracking-widest text-neutral-500 ml-1 mb-2 block font-bold'>
                  {field.label}
                </label>
                <input
                  {...field}
                  value={formData[field.name]}
                  onChange={handleChange}
                  required
                  className='w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 focus:border-emerald-500/50 focus:bg-white/[0.05] outline-none transition-all text-sm'
                />
              </motion.div>
            ))}

            <motion.div variants={itemVars}>
              <label className='text-[10px] uppercase tracking-widest text-neutral-500 ml-1 mb-2 block font-bold'>
                Bio
              </label>
              <textarea
                name='bio'
                value={formData.bio}
                onChange={handleChange}
                rows='2'
                placeholder='A brief whisper about yourself...'
                className='w-full px-4 py-3 rounded-xl bg-white/[0.03] border border-white/5 focus:border-emerald-500/50 focus:bg-white/[0.05] outline-none transition-all text-sm resize-none'
              />
            </motion.div>
          </div>

          {/* Submit Button */}
          <motion.button
            variants={itemVars}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type='submit'
            disabled={loading}
            className='w-full py-4 rounded-xl bg-emerald-600 text-white font-bold text-sm tracking-widest uppercase hover:bg-emerald-500 transition-all shadow-[0_0_20px_rgba(16,185,129,0.2)] disabled:opacity-50'>
            {loading ? "Decrypting..." : "Create Identity"}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
};

export default Registration;
