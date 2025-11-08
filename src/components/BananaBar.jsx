import React from 'react';
import { motion } from 'framer-motion';

export default function BananaBar({ bananas }) {
  const total = 5;
  const filled = Math.min(bananas, total);

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-2">
        <div className="text-sm font-semibold text-orange-800/80">Banana Meter</div>
        <div className="text-sm font-bold text-orange-700">{filled} / {total}</div>
      </div>
      <div className="h-3 w-full rounded-full bg-orange-100 border border-orange-200 overflow-hidden">
        <motion.div
          initial={false}
          animate={{ width: `${(filled / total) * 100}%` }}
          transition={{ type: 'spring', stiffness: 180, damping: 20 }}
          className="h-full bg-gradient-to-r from-yellow-400 via-amber-400 to-orange-400"
        />
      </div>
      <div className="mt-2 flex gap-1">
        {Array.from({ length: total }).map((_, i) => (
          <motion.span
            key={i}
            initial={{ scale: 0.9, opacity: 0.6 }}
            animate={{ scale: i < filled ? 1 : 0.95, opacity: i < filled ? 1 : 0.6 }}
            className="text-lg select-none"
            role="img"
            aria-label="banana"
          >
            🍌
          </motion.span>
        ))}
      </div>
    </div>
  );
}
