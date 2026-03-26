import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const Mission = () => {
  const sectionRef = useRef(null);
  const textRef = useRef(null);
  const statsRef = useRef([]);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(lineRef.current,
        { width: 0 },
        {
          width: '100%', duration: 1.2, ease: 'power3.inOut',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        }
      );

      gsap.from(textRef.current.children, {
        opacity: 0, y: 40, duration: 0.9, stagger: 0.15, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
      });

      gsap.from(statsRef.current, {
        opacity: 0, scale: 0.8, y: 60, rotationX: 15,
        duration: 0.8, stagger: 0.12, ease: 'back.out(1.7)',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 60%' }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const handleMouseMove = (e, el) => {
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    gsap.to(el, {
      rotationY: x * 15, rotationX: -y * 15,
      duration: 0.3, ease: 'power2.out', transformPerspective: 800,
    });
  };
  const handleMouseLeave = (el) => {
    gsap.to(el, { rotationY: 0, rotationX: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
  };

  const stats = [
    { icon: '📅', value: 'APR 8', label: 'Date', suffix: '' },
    { icon: '⏰', value: '5 HRS', label: 'Duration', suffix: '' },
    { icon: '👥', value: '2–4', label: 'Team Size', suffix: '' },
    { icon: '💰', value: '₹200', label: 'Per Team', suffix: '' },
  ];

  return (
    <section id="about" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5">
      <div ref={lineRef} className="absolute top-0 left-0 h-px bg-gradient-to-r from-primary via-primary/50 to-transparent" style={{ width: 0 }}></div>

      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div ref={textRef}>
            <div className="flex flex-col items-center text-center mb-6">
              <div className="p-3 border border-white/10 rounded-sm bg-black/50 mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z" /><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z" /><path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" /><path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </div>
              <p className="text-primary/70 text-xs font-bold tracking-[0.2em] mb-1 uppercase">THE MISSION</p>
              <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white">
                IT'S NOT JUST A <span className="text-primary">HACKATHON.</span>
              </h2>
            </div>
            <p className="text-zinc-400 text-lg mb-6 leading-relaxed">
              Whether you're a software wizard or a hardware geek, it's time to innovate the grid! ENERGIZE 2026 challenges you to build the future of sustainable energy technology.
            </p>
            <p className="text-zinc-400 text-lg leading-relaxed">
              Organized by the <span className="text-accent font-semibold">IETE Students' Forum</span> at <span className="text-white font-semibold">Rajalakshmi Institute of Technology</span>, this high-stakes on-spot hackathon is where code meets carbon neutrality.
            </p>
          </div>
          
          <div className="relative">
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, i) => (
                <div 
                  key={i} 
                  ref={el => statsRef.current[i] = el}
                  className="bg-carbon border border-white/5 p-8 rounded-lg text-center hover:border-primary/50 transition-colors group cursor-default"
                  style={{ transformStyle: 'preserve-3d' }}
                  onMouseMove={(e) => handleMouseMove(e, statsRef.current[i])}
                  onMouseLeave={() => handleMouseLeave(statsRef.current[i])}
                >
                  <div className="text-2xl mb-3">{stat.icon}</div>
                  <div className="text-3xl md:text-4xl font-display font-black text-white group-hover:text-primary transition-colors mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-zinc-500 font-bold uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Mission;
