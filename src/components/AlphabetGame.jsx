import React, { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Volume2, Award, CircleHelp } from 'lucide-react';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function getRandomLetter() {
  const idx = Math.floor(Math.random() * LETTERS.length);
  return LETTERS[idx];
}

function speak(text) {
  try {
    const synth = window.speechSynthesis;
    if (!synth) return;
    const utter = new SpeechSynthesisUtterance(text);
    utter.rate = 0.9;
    utter.pitch = 1.1;
    synth.cancel();
    synth.speak(utter);
  } catch (e) {
    // no-op if unsupported
  }
}

export default function AlphabetGame({ onEarnBanana }) {
  const [target, setTarget] = useState(getRandomLetter());
  const [choices, setChoices] = useState([]);
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong'
  const [streak, setStreak] = useState(0);

  const generateRound = () => {
    const correct = getRandomLetter();
    const pool = new Set([correct]);
    while (pool.size < 6) {
      pool.add(getRandomLetter());
    }
    const shuffled = Array.from(pool).sort(() => Math.random() - 0.5);
    setTarget(correct);
    setChoices(shuffled);
  };

  useEffect(() => {
    generateRound();
  }, []);

  const handleChoice = (letter) => {
    const isCorrect = letter === target;
    setFeedback(isCorrect ? 'correct' : 'wrong');

    if (isCorrect) {
      onEarnBanana();
      setStreak((s) => s + 1);
      speak(`${letter}! Great job!`);
      setTimeout(() => {
        setFeedback(null);
        generateRound();
      }, 850);
    } else {
      setStreak(0);
      speak(`Oops, that's ${letter}. Try ${target}.`);
      setTimeout(() => setFeedback(null), 650);
    }
  };

  const prompt = useMemo(() => {
    return `Tap the letter: ${target}`;
  }, [target]);

  return (
    <section id="play" className="mt-8 md:mt-10">
      <div className="rounded-3xl bg-white/80 backdrop-blur border border-orange-200/70 p-5 md:p-7 shadow-[0_10px_40px_-15px_rgba(245,158,11,0.35)]">
        <div className="flex items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-orange-700">Alphabet Challenge</h2>
            <p className="text-orange-800/70 mt-1 font-medium">Select the correct letter to earn a banana.</p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => speak(prompt)}
              className="inline-flex items-center gap-2 rounded-full bg-orange-100 hover:bg-orange-200 text-orange-700 px-4 py-2 font-semibold border border-orange-200 transition-colors"
              aria-label="Speak prompt"
            >
              <Volume2 className="w-5 h-5" /> Hear it
            </button>
            <div className="hidden sm:flex items-center gap-1 text-orange-700/80 font-semibold bg-yellow-100/80 border border-yellow-200 rounded-full px-3 py-2">
              <Award className="w-4 h-4" /> Streak: {streak}
            </div>
          </div>
        </div>

        <div className="mt-5">
          <div className="text-center text-lg md:text-xl font-bold text-orange-800/90">
            {prompt}
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3 sm:gap-4 mt-4">
            {choices.map((ch) => {
              const isCorrect = feedback === 'correct' && ch === target;
              const isWrong = feedback === 'wrong' && ch !== target;
              return (
                <motion.button
                  key={ch}
                  layout
                  onClick={() => handleChoice(ch)}
                  className={`relative aspect-square rounded-2xl border text-2xl sm:text-3xl font-black flex items-center justify-center select-none focus:outline-none focus:ring-4 transition-all ${
                    isCorrect
                      ? 'bg-green-100 border-green-300 text-green-800 scale-105'
                      : isWrong
                      ? 'bg-orange-50 border-orange-200 text-orange-700 opacity-60'
                      : 'bg-white border-orange-200/70 text-orange-700 hover:bg-orange-50'
                  }`}
                  whileTap={{ scale: 0.96 }}
                >
                  <span>{ch}</span>
                  {isCorrect && (
                    <motion.span
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -6 }}
                      className="absolute -bottom-2 translate-y-full text-[11px] font-extrabold text-green-700"
                    >
                      Banana +1
                    </motion.span>
                  )}
                </motion.button>
              );
            })}
          </div>

          <div className="mt-5 flex items-center justify-center gap-2 text-sm text-orange-800/70">
            <CircleHelp className="w-4 h-4" /> Tip: Tap the speaker to hear the prompt.
          </div>
        </div>
      </div>
    </section>
  );
}
