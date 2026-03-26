import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const QuestionIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
    <path d="M10 10.3c.2-.4.5-.8.9-1a2.1 2.1 0 0 1 2.6.4c.3.4.5.8.5 1.3 0 1.3-2 2-2 2"/>
    <path d="M12 17h.01"/>
  </svg>
);

const ChevronIcon = ({ isOpen }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
    className={`shrink-0 transition-colors duration-300 ${isOpen ? 'text-primary' : 'text-zinc-500'}`}
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const FAQSection = () => {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);
  const contentRefs = useRef([]);
  const chevronRefs = useRef([]);
  const itemsRef = useRef([]);

  const faqs = [
    { q: "What is ENERGIZE 2026?", a: "ENERGIZE 2026 is an on-spot hackathon organized by the IETE Students' Forum at RIT, focused on sustainable energy solutions through software and hardware innovation." },
    { q: "What are the two tracks?", a: "Track 1: The Algorithmic Grid (Software) — Predictive AI, carbon trackers, gamified energy apps. Track 2: The Kinetic Circuit (Hardware) — Energy harvesting, smart meters, automated load balancing." },
    { q: "How much is the registration fee?", a: "The registration fee is ₹200 per team. Each team can have 2–4 members." },
    { q: "Where and when is the event?", a: "April 8, 2026, from 8:30 AM to 1:30 PM at the Green Building, 4th Floor, Rajalakshmi Institute of Technology." },
    { q: "What can we win?", a: "Cash prizes for Winners and Runners-up! All participants receive certificates to boost their portfolios." },
    { q: "Do we need to bring our own hardware?", a: "For the Hardware track, yes — bring your own components and tools. Basic power supplies and workspace will be provided at the venue." },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-header', {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 85%' }
      });
      itemsRef.current.forEach((item, i) => {
        if (!item) return;
        gsap.fromTo(item,
          { opacity: 0, y: 30 },
          { opacity: 1, y: 0, duration: 0.6, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const toggleFaq = useCallback((i) => {
    const content = contentRefs.current[i];
    const chevron = chevronRefs.current[i];
    
    if (openIndex !== null && openIndex !== i) {
      const prevContent = contentRefs.current[openIndex];
      const prevChevron = chevronRefs.current[openIndex];
      if (prevContent) gsap.to(prevContent, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.inOut' });
      if (prevChevron) gsap.to(prevChevron, { rotation: 0, duration: 0.3 });
    }

    if (openIndex === i) {
      if (content) gsap.to(content, { height: 0, opacity: 0, duration: 0.4, ease: 'power2.inOut' });
      if (chevron) gsap.to(chevron, { rotation: 0, duration: 0.3 });
      setOpenIndex(null);
    } else {
      if (content) {
        gsap.set(content, { height: 'auto', opacity: 1 });
        const fullHeight = content.scrollHeight;
        gsap.fromTo(content, { height: 0, opacity: 0 }, { height: fullHeight, opacity: 1, duration: 0.5, ease: 'power2.out' });
      }
      if (chevron) gsap.to(chevron, { rotation: 180, duration: 0.3, ease: 'power2.out' });
      setOpenIndex(i);
    }
  }, [openIndex]);

  return (
    <section id="faqs" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5 bg-[#030a07]">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        <div className="faq-header flex flex-col items-center text-center mb-6">
          <div className="p-3 border border-white/10 rounded-sm bg-black/50 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
              <circle cx="12" cy="12" r="10" /><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" /><path d="M12 17h.01" />
            </svg>
          </div>
          <p className="text-primary/70 text-xs font-bold tracking-[0.2em] mb-1 uppercase">GOT QUESTIONS?</p>
          <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white">
            FREQUENTLY ASKED <span className="text-primary">QUESTIONS</span>
          </h2>
        </div>
        <p className="text-zinc-400 mb-16 max-w-xl mx-auto text-center">Everything you need to know before powering up.</p>

        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div 
              key={i}
              ref={el => itemsRef.current[i] = el}
              className={`relative border rounded-lg overflow-hidden transition-all duration-500 ${
                openIndex === i 
                  ? 'border-primary/40 shadow-[0_0_20px_rgba(0,230,118,0.08)] bg-primary/[0.02]' 
                  : 'border-white/10 hover:border-primary/20 bg-transparent'
              }`}
            >
              <div className={`absolute left-0 top-0 bottom-0 w-0.5 rounded-full transition-all duration-500 z-10 ${
                openIndex === i ? 'bg-primary shadow-[0_0_8px_rgba(0,230,118,0.5)]' : 'bg-transparent'
              }`}></div>

              <button className="w-full flex items-center p-5 text-left bg-transparent relative z-10" onClick={() => toggleFaq(i)}>
                <div className={`p-2 border rounded mr-6 shrink-0 transition-all duration-300 ${
                  openIndex === i ? 'border-primary/40 text-primary bg-primary/10' : 'border-primary/20 text-primary bg-primary/5'
                }`}>
                  <QuestionIcon />
                </div>
                <span className={`font-sans font-bold text-[15px] md:text-[17px] flex-1 transition-colors duration-300 ${openIndex === i ? 'text-primary' : 'text-zinc-100'}`}>
                  {faq.q}
                </span>
                <div ref={el => chevronRefs.current[i] = el}>
                  <ChevronIcon isOpen={openIndex === i} />
                </div>
              </button>
              <div ref={el => contentRefs.current[i] = el} className="overflow-hidden" style={{ height: 0, opacity: 0 }}>
                <p className="p-6 pt-2 pl-20 text-zinc-400 text-sm leading-relaxed border-t border-white/5">{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
