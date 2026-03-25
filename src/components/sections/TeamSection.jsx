import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const LinkedinIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/>
    <rect width="4" height="12" x="2" y="9"/>
    <circle cx="4" cy="4" r="2"/>
  </svg>
);

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/>
    <circle cx="9" cy="7" r="4"/>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"/>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"/>
  </svg>
);

const TeamSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef([]);
  const headerRef = useRef(null);

  const organizers = [
    { badge: 'FACULTY ADVISOR', name: 'DR. R. SURESH KUMAR', role: 'HOD - ECE Department', contact: '+91 9876543210', link: '#' },
    { badge: 'FACULTY COORDINATOR', name: 'MS. PRIYA VENKATESH', role: 'IETE Faculty Coordinator', contact: '+91 9876543211', link: '#' },
    { badge: 'CHAIRPERSON', name: 'ARUN PRAKASH S', role: 'IETE ISF Chairperson', contact: '+91 9876543212', link: '#' },
    { badge: 'VICE CHAIRPERSON', name: 'DIVYA LAKSHMI R', role: 'IETE ISF Vice Chairperson', contact: '+91 9876543213', link: '#' },
    { badge: 'SECRETARY', name: 'KARTHIK RAJA M', role: 'IETE ISF Secretary', contact: '+91 9876543214', link: '#' },
    { badge: 'TECH LEAD', name: 'NITHYA SHREE B', role: 'Technical Lead', contact: '+91 9876543215', link: '#' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          opacity: 0, x: -40, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        });
      }
      cardsRef.current.forEach((card, i) => {
        if (!card) return;
        gsap.fromTo(card,
          { opacity: 0, y: 60, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8, delay: i * 0.1, ease: 'power3.out',
            scrollTrigger: { trigger: card, start: 'top 90%', toggleActions: 'play none none reverse' }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="team" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5 bg-[#030a07]">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">
        <div ref={headerRef} className="flex items-start gap-6 mb-16">
          <div className="p-3 border border-white/10 rounded-sm bg-black/50">
            <UsersIcon />
          </div>
          <div className="text-left">
            <p className="text-primary/70 text-xs font-bold tracking-[0.2em] mb-1 uppercase">IETE STUDENTS' FORUM</p>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white">
              ORGANIZING <span className="text-primary">TEAM</span>
            </h2>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {organizers.map((person, i) => (
            <div 
              key={i}
              ref={el => cardsRef.current[i] = el}
              className="team-card relative bg-transparent border border-white/5 p-8 rounded-sm hover:border-primary/40 hover:shadow-[0_0_25px_rgba(0,230,118,0.08)] hover:scale-[1.02] transition-all duration-500 flex flex-col h-full group cursor-default"
            >
              <div className="flex justify-between items-start mb-8">
                <div className="px-3 py-1 rounded-full border border-primary/30 bg-primary/5 text-primary text-[10px] font-bold tracking-[0.1em] uppercase shadow-[0_0_10px_rgba(0,230,118,0.05)] group-hover:bg-primary/10 transition-all duration-300">
                  {person.badge}
                </div>
                <a href={person.link} className="p-1.5 border border-white/10 rounded border-primary/20 text-primary/70 hover:text-primary hover:bg-primary/10 transition-all duration-300" aria-label="LinkedIn">
                  <LinkedinIcon />
                </a>
              </div>
              <div className="text-left mb-6">
                <h3 className="text-lg font-display font-black text-primary group-hover:animate-glow-pulse mb-2 transition-all duration-300">{person.name}</h3>
                <p className="text-zinc-300 text-sm tracking-wide">{person.role}</p>
              </div>
              <div className="text-left mt-auto">
                <p className="text-primary/70 text-[10px] font-black tracking-[0.15em] mb-1 uppercase">CONTACT</p>
                <p className="text-zinc-300 text-[13px] font-mono font-medium tracking-wider">{person.contact}</p>
              </div>
              <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full transition-all duration-700 rounded-full"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TeamSection;
