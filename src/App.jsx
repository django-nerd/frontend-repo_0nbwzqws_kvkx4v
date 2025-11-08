import React, { useState } from 'react';
import Hero3D from './components/Hero3D';
import MonkeyStatus from './components/MonkeyStatus';
import AlphabetGame from './components/AlphabetGame';
import BananaBar from './components/BananaBar';

export default function App() {
  const [bananas, setBananas] = useState(0);

  const handleEarnBanana = () => setBananas((b) => b + 1);

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-orange-50 text-orange-900">
      <div className="mx-auto max-w-[1200px] px-4 md:px-6 lg:px-8 py-6 md:py-8">
        <Hero3D />

        <div className="mt-6 md:mt-8 grid md:grid-cols-5 gap-6">
          <div className="md:col-span-2">
            <MonkeyStatus bananas={bananas} />
            <BananaBar bananas={bananas} />
          </div>
          <div className="md:col-span-3">
            <AlphabetGame onEarnBanana={handleEarnBanana} />
          </div>
        </div>

        <footer className="mt-10 md:mt-16 text-center text-xs md:text-sm text-orange-800/60">
          Designed for 1512 x 982 screens · Playful micro-interactions · 3D hero powered by Spline
        </footer>
      </div>
    </div>
  );
}
