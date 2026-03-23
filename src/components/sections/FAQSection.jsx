import React, { useEffect, useRef, useState } from 'react';
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

const ChevronIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="m6 9 6 6 6-6"/>
  </svg>
);

const FAQSection = () => {
  const sectionRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(null);

  const faqs = [
    { q: "What if I don't have a team?", a: "You can find teammates on our Discord server or team building sessions during the event." },
    { q: "Is the event offline?", a: "Yes, Hack Hustle Code Knight is an exclusive in-person event." },
    { q: "Is food provided?", a: "Yes, we provide meals, snacks, and drinks throughout the entire hackathon." },
    { q: "Is the hackathon free?", a: "Absolutely! Registration is completely free for all accepted participants." },
    { q: "Will accommodation be provided?", a: "Yes, we provide dedicated resting areas and sleeping arrangements at the venue." },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.faq-item', {
        opacity: 0, 
        y: 20, 
        duration: 0.6, 
        stagger: 0.1, 
        ease: 'power2.out',
        scrollTrigger: { 
          trigger: sectionRef.current, 
          start: 'top 85%' 
        }
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="faqs" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5 bg-[#050505]">
      <div className="container mx-auto px-6 md:px-12 max-w-4xl">
        
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-primary/90 text-sm font-bold tracking-[0.25em] mb-4 uppercase">INTELLIGENCE BRIEF</p>
          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-white mb-1 uppercase">
            CLASSIFIED FILES
          </h2>
          <h2 className="text-4xl md:text-5xl font-display font-black tracking-tighter text-primary mb-6 uppercase">
            (FAQ)
          </h2>
          <p className="text-zinc-400 text-sm md:text-base font-medium">
            Everything you need to know before joining the mission.
          </p>
        </div>

        {/* Accordion */}
        <div className="flex flex-col gap-4">
          {faqs.map((faq, i) => (
            <div 
              key={i} 
              className={`faq-item border border-white/10 hover:border-primary/20 bg-transparent rounded-lg overflow-hidden transition-all duration-300`}
            >
              <button 
                className="w-full flex items-center p-5 text-left bg-transparent"
                onClick={() => setOpenIndex(openIndex === i ? null : i)}
              >
                <div className="p-2 border border-primary/20 rounded mr-6 text-primary shrink-0 bg-primary/5">
                  <QuestionIcon />
                </div>
                <span className={`font-sans font-bold text-[15px] md:text-[17px] flex-1 ${openIndex === i ? 'text-primary' : 'text-zinc-100'} transition-colors`}>
                  {faq.q}
                </span>
                <ChevronIcon className={`transform transition-transform shrink-0 ${openIndex === i ? 'rotate-180 text-primary' : 'text-zinc-500'}`} />
              </button>
              <div 
                className="overflow-hidden transition-all duration-300 ease-in-out bg-white/[0.02]"
                style={{ maxHeight: openIndex === i ? '200px' : '0', opacity: openIndex === i ? 1 : 0 }}
              >
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
