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
      <div className="container mx-auto px-6 md:px-12 text-center mb-12">
        <h2 className="sponsors-header text-3xl md:text-5xl font-display font-black tracking-tighter text-white mb-4">
          POWERED BY <span className="text-primary text-glow">THE BEST</span>
        </h2>
        <p className="text-zinc-500 text-sm">Our partners and sponsors fuel the mission.</p>
      </div>

      <div className="flex flex-col gap-6 opacity-70">
        <div className="marquee-row"><MarqueeRow items={row1} speed={35} /></div>
        <div className="marquee-row"><MarqueeRow items={row2} reverse speed={40} /></div>
      </div>
    </section>
  );
};

export default SponsorsSection;
