import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ClockIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
    <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
  </svg>
);

const TimelineSection = () => {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);
  const itemsRef = useRef([]);
  const nodesRef = useRef([]);

  const schedule = [
    { tag: '08:30 AM', title: 'Registration & Check-in', desc: 'Arrive, register your team, and get settled.', right: false },
    { tag: '09:00 AM', title: 'Opening Ceremony', desc: 'Welcome address, rules briefing, and track reveals.', right: true },
    { tag: '09:30 AM', title: 'Hacking Begins ⚡', desc: 'Start ideating and building your energy solutions.', right: false },
    { tag: '12:00 PM', title: 'Midway Check & Mentoring', desc: 'Progress reviews and mentor guidance.', right: true },
    { tag: '01:00 PM', title: 'Final Submissions & Judging', desc: 'Submit your projects and present to judges.', right: false },
    { tag: '01:30 PM', title: 'Awards & Closing', desc: 'Prize distribution and certificates for all!', right: true },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.schedule-header', {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });

      gsap.to(lineRef.current, {
        height: '100%', ease: 'none',
        scrollTrigger: { trigger: sectionRef.current, start: 'top center', end: 'bottom center', scrub: 1 }
      });

      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        const isRight = schedule[i].right;
        gsap.fromTo(item,
          { opacity: 0, x: isRight ? 80 : -80, y: 30 },
          {
            opacity: 1, x: 0, y: 0, duration: 1, ease: 'power3.out',
            scrollTrigger: { trigger: item, start: 'top 88%', toggleActions: 'play none none reverse' }
          }
        );
      });

      nodesRef.current.forEach((node) => {
        if (!node) return;
        gsap.fromTo(node, { scale: 0 }, {
          scale: 1, duration: 0.5, ease: 'back.out(3)',
          scrollTrigger: { trigger: node, start: 'top 75%', toggleActions: 'play none none reverse' }
        });
      });

      itemsRef.current.forEach((item) => {
        if (!item) return;
        const card = item.querySelector('.timeline-card');
        if (!card) return;
        ScrollTrigger.create({
          trigger: item, start: 'top 70%', end: 'bottom 30%',
          onEnter: () => gsap.to(card, { borderColor: 'rgba(0,230,118,0.4)', boxShadow: '0 0 20px rgba(0,230,118,0.1)', duration: 0.5 }),
          onLeaveBack: () => gsap.to(card, { borderColor: 'rgba(255,255,255,0.05)', boxShadow: 'none', duration: 0.5 }),
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="schedule" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6 md:px-12">
        <div className="schedule-header flex items-start gap-6 mb-6">
          <div className="p-3 border border-white/10 rounded-sm bg-black/50">
            <ClockIcon />
          </div>
          <div className="text-left">
            <p className="text-primary/70 text-xs font-bold tracking-[0.2em] mb-1 uppercase">APRIL 8, 2026</p>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white">
              THE <span className="text-primary">SCHEDULE</span>
            </h2>
          </div>
        </div>
        <p className="text-zinc-400 mb-16 max-w-3xl">A power-packed 5 hours of innovation.</p>

        <div className="relative max-w-3xl mx-auto pl-8 md:pl-0">
          <div className="absolute top-0 bottom-0 left-8 md:left-1/2 md:-translate-x-1/2 w-0.5 bg-white/10"></div>
          <div ref={lineRef} className="absolute top-0 left-8 md:left-1/2 md:-translate-x-1/2 w-0.5 bg-primary shadow-[0_0_15px_rgba(0,230,118,0.5)] origin-top" style={{ height: 0 }}></div>

          {schedule.map((item, i) => (
            <div 
              key={i} 
              ref={el => itemsRef.current[i] = el}
              className={`relative mb-12 md:w-1/2 ${item.right ? 'md:ml-auto md:pl-16' : 'md:pr-16 md:text-right'} pl-12`}
            >
              <div 
                ref={el => nodesRef.current[i] = el}
                className="absolute top-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-background border-[3px] border-primary shadow-[0_0_10px_rgba(0,230,118,0.5)]" 
                style={item.right ? { left: '-10px' } : { left: '-10px' }}
              >
                <span className="absolute top-1/2 left-1/2 w-5 h-5 rounded-full border-2 border-primary animate-node-pulse"></span>
              </div>
              
              <div className="timeline-card bg-carbon border border-white/5 p-6 rounded-lg hover:border-primary/30 transition-all duration-500 group">
                <span className="text-primary text-xs font-bold tracking-widest font-mono">{item.tag}</span>
                <h4 className="text-xl font-display font-bold text-white mt-1 mb-2 group-hover:text-primary transition-colors duration-300">{item.title}</h4>
                <div className="text-zinc-500 text-sm">{item.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TimelineSection;
