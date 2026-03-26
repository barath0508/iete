import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const sponsors = [
  'IETE ISF', 'RIT Chennai', 'Green Energy Co', 'TechGrid Labs', 'EcoVolt', 'SolarSync',
  'PowerNode', 'CleanTech AI', 'Grid Innovate', 'Renewable Hub', 'SmartMeter Pro', 'EcoCircuit',
];

const MarqueeRow = ({ items, reverse = false, speed = 30 }) => (
  <div className="flex gap-8 group" style={{ overflow: 'hidden' }}>
    <div 
      className="flex gap-8 shrink-0 group-hover:[animation-play-state:paused]"
      style={{
        animation: `${reverse ? 'marquee-scroll-reverse' : 'marquee-scroll'} ${speed}s linear infinite`,
        width: 'max-content'
      }}
    >
      {[...items, ...items].map((name, i) => (
        <div 
          key={i}
          className="h-20 w-44 bg-carbon border border-white/10 rounded-sm flex items-center justify-center shrink-0 hover:border-primary/50 hover:bg-[#0a1510] hover:shadow-[0_0_20px_rgba(0,230,118,0.15)] hover:scale-105 transition-all duration-300 cursor-pointer group/item"
        >
          <span className="font-mono text-zinc-500 text-sm font-bold uppercase tracking-widest group-hover/item:text-primary transition-colors duration-300">{name}</span>
        </div>
      ))}
    </div>
  </div>
);

const SponsorsSection = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.sponsors-header', {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
      gsap.from('.marquee-row', {
        opacity: 0, x: (i) => i === 0 ? -100 : 100,
        duration: 1.2, stagger: 0.3, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const row1 = sponsors.slice(0, 6);
  const row2 = sponsors.slice(6);

  return (
    <section id="sponsors" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5 bg-black overflow-hidden">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl mb-12">
        <div className="sponsors-header flex flex-col items-center text-center mb-6">
          <div className="p-3 border border-white/10 rounded-sm bg-black/50 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <path d="m11 17 2 2a1 1 0 1 0 3-3" /><path d="m14 14 2.5 2.5a1 1 0 1 0 3-3l-3.88-3.88a3 3 0 0 0-4.24 0l-.88.88a1 1 0 1 1-3-3l2.81-2.81a5.79 5.79 0 0 1 7.06-.87l.47.28a2 2 0 0 0 1.42.25L21 4" /><path d="m21 3 1 11h-2" /><path d="M3 3 2 14h2" /><path d="m3 3 2.08 1.56a2 2 0 0 0 1.68.34l.47-.14a5.79 5.79 0 0 1 5.15.78" />
            </svg>
          </div>
          <p className="text-primary/70 text-xs font-bold tracking-[0.2em] mb-1 uppercase">OUR PARTNERS</p>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white">
            POWERED BY <span className="text-primary">THE BEST</span>
          </h2>
        </div>
        <p className="text-zinc-400 mb-6 max-w-xl mx-auto text-center">Our partners and sponsors fuel the mission.</p>
      </div>

      <div className="flex flex-col gap-6 opacity-70">
        <div className="marquee-row"><MarqueeRow items={row1} speed={35} /></div>
        <div className="marquee-row"><MarqueeRow items={row2} reverse speed={40} /></div>
      </div>
    </section>
  );
};

export default SponsorsSection;
