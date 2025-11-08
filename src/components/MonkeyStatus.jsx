import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Smile, Meh } from 'lucide-react';

export default function MonkeyStatus({ bananas }) {
  const happy = bananas >= 5;
  const message = happy
    ? 'The monkey is thrilled! Keep going!'
    : 'Collect 5 bananas to make the monkey smile!';

  return (
    <div className="rounded-2xl bg-gradient-to-br from-yellow-50 to-orange-50 border border-orange-200/60 p-5 md:p-6 flex items-center gap-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.6),0_8px_30px_rgba(251,146,60,0.18)]">
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={happy ? 'smile' : 'meh'}
          initial={{ scale: 0.8, opacity: 0, rotate: -8 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          exit={{ scale: 0.8, opacity: 0, rotate: 8 }}
          transition={{ type: 'spring', stiffness: 220, damping: 18 }}
          className={`w-14 h-14 rounded-full flex items-center justify-center border ${
            happy ? 'bg-yellow-200/70 border-yellow-300' : 'bg-orange-100/70 border-orange-200'
          }`}
        >
          {happy ? (
            <Smile className="w-8 h-8 text-orange-700" />
          ) : (
            <Meh className="w-8 h-8 text-orange-600" />
          )}
        </motion.div>
      </AnimatePresence>

      <div className="flex-1">
        <div className="text-sm font-semibold text-orange-800/80">Monkey Mood</div>
        <div className="text-lg md:text-xl font-extrabold text-orange-700">{message}</div>
      </div>

      <div className="text-center min-w-[92px]">
        <div className="text-[11px] uppercase tracking-wide font-bold text-orange-800/60">Bananas</div>
        <motion.div
          key={bananas}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', stiffness: 300, damping: 18 }}
          className="text-2xl md:text-3xl font-extrabold text-orange-700"
        >
          {bananas}
        </motion.div>
      </div>
    </div>
  );
}
