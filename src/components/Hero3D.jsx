import React from 'react';
import Spline from '@splinetool/react-spline';
import { motion } from 'framer-motion';

export default function Hero3D() {
  return (
    <section className="relative w-full h-[520px] md:h-[640px] overflow-hidden rounded-3xl bg-gradient-to-br from-orange-100 via-amber-50 to-yellow-100 border border-orange-200/50 shadow-[0_20px_60px_-20px_rgba(251,146,60,0.45)]">
      <div className="absolute inset-0">
        <Spline
          scene="https://prod.spline.design/95Gu7tsx2K-0F3oi/scene.splinecode"
          style={{ width: '100%', height: '100%' }}
        />
      </div>

      {/* Soft gradient overlay for readability (non-blocking) */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-white/80 via-white/30 to-transparent" />

      <div className="relative z-10 h-full flex items-end md:items-center">
        <div className="p-6 sm:p-10 md:p-14 lg:p-16 w-full max-w-3xl">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-orange-700 drop-shadow-[0_2px_0_rgba(255,255,255,0.6)]"
          >
            Banana Buddy: Learn Your ABCs
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="mt-3 md:mt-4 text-orange-800/80 text-base md:text-lg font-medium"
          >
            Pick the right letter to earn bananas. Collect more to make the monkey smile!
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-5 md:mt-6 flex gap-3"
          >
            <a
              href="#play"
              className="inline-flex items-center justify-center rounded-full bg-orange-600 text-white px-5 py-3 text-sm md:text-base font-semibold shadow-lg shadow-orange-500/30 hover:shadow-orange-500/40 hover:bg-orange-700 transition-all"
            >
              Start Playing
            </a>
            <span className="inline-flex items-center rounded-full bg-white/80 backdrop-blur px-4 py-3 text-sm md:text-base text-orange-700 border border-orange-200/70">
              Ages 4–6 · Friendly & Fun
            </span>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
