import React, { useEffect, useRef, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Rewards = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const grandRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.rewards-header', {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });

      gsap.from(cardsRef.current, {
        opacity: 0, y: 150, scale: 0.85, rotationX: 10,
        duration: 1.2, stagger: 0.2, ease: 'back.out(1.4)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      });

      if (grandRef.current) {
        gsap.to(grandRef.current, {
          y: -10, duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true
        });
      }

      gsap.from('.trophy-emoji', {
        scale: 0, rotation: -20, opacity: 0,
        duration: 0.8, delay: 0.8, ease: 'elastic.out(1, 0.4)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 70%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleGrandMouseMove = useCallback((e) => {
    if (!grandRef.current) return;
    const rect = grandRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const spotlight = grandRef.current.querySelector('.grand-spotlight');
    if (spotlight) {
      spotlight.style.background = `radial-gradient(circle at ${x}px ${y}px, rgba(0,230,118,0.15) 0%, transparent 50%)`;
    }
  }, []);

  const handleGrandMouseLeave = useCallback(() => {
    if (!grandRef.current) return;
    const spotlight = grandRef.current.querySelector('.grand-spotlight');
    if (spotlight) spotlight.style.background = 'none';
  }, []);

  return (
    <section id="prizes" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5 bg-gradient-to-b from-transparent to-black/80">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="rewards-header text-4xl md:text-6xl font-display font-black tracking-tighter text-white mb-6">
          WHAT'S ON <span className="text-primary animate-glow-pulse">THE LINE</span>
        </h2>
        <p className="text-zinc-400 mb-16 max-w-xl mx-auto">Cash prizes, certificates, and bragging rights await the best energy innovators.</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Runner Up */}
          <div ref={el => cardsRef.current[0] = el} className="md:mt-12 bg-carbon border border-white/10 p-8 rounded-t-xl hover:border-zinc-400 transition-all duration-300 relative group cursor-default hover:-translate-y-1">
            <div className="text-4xl mb-4">🥈</div>
            <h3 className="text-2xl font-display font-black text-white mb-2 group-hover:text-zinc-300">Cash Prize</h3>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">Runner Up</p>
          </div>
          
          {/* Winner */}
          <div 
            ref={el => { cardsRef.current[1] = el; grandRef.current = el; }}
            className="bg-gradient-to-b from-primary/20 to-carbon border border-primary p-10 rounded-t-xl border-glow relative overflow-hidden cursor-default"
            style={{ transformStyle: 'preserve-3d' }}
            onMouseMove={handleGrandMouseMove}
            onMouseLeave={handleGrandMouseLeave}
          >
            <div className="grand-spotlight absolute inset-0 z-0 pointer-events-none"></div>
            <div className="absolute inset-0 shine-border opacity-30 pointer-events-none rounded-t-xl"></div>
            <div className="relative z-10">
              <div className="absolute -top-6 left-1/2 -translate-x-1/2 bg-primary text-black px-4 py-1 rounded-full font-bold text-sm tracking-widest uppercase mb-4 shadow-[0_0_15px_rgba(0,230,118,0.5)]">
                Winner
              </div>
              <div className="trophy-emoji text-4xl mt-4 mb-4">🏆</div>
              <h3 className="text-3xl font-display font-black text-primary mb-2 animate-glow-pulse">Cash Prize</h3>
              <p className="text-zinc-300 font-bold uppercase tracking-widest text-sm">Champion Team</p>
            </div>
          </div>

          {/* Certificates */}
          <div ref={el => cardsRef.current[2] = el} className="md:mt-12 bg-carbon border border-white/10 p-8 rounded-t-xl hover:border-accent transition-all duration-300 relative group cursor-default hover:-translate-y-1">
            <div className="text-4xl mb-4">📜</div>
            <h3 className="text-2xl font-display font-black text-white mb-2 group-hover:text-accent">Certificates</h3>
            <p className="text-zinc-500 font-bold uppercase tracking-widest text-sm">All Participants</p>
            <p className="text-zinc-600 text-xs mt-2">Boost your portfolio</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rewards;
