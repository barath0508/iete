import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import heroBg from '../../assets/hero.png';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Badge float in
      gsap.from('.hero-badge', {
        opacity: 0, y: -30, scale: 0.8,
        duration: 1, delay: 0.2, ease: 'elastic.out(1, 0.5)'
      });
      
      // Continuous badge float
      gsap.to('.hero-badge', {
        y: -5, rotation: 0.5,
        duration: 3, ease: 'sine.inOut', repeat: -1, yoyo: true, delay: 1.2
      });

      // Title line 1 — clip & slide reveal
      gsap.fromTo('.hero-title-1', 
        { clipPath: 'inset(0 100% 0 0)', opacity: 0, x: -60 },
        { clipPath: 'inset(0 0% 0 0)', opacity: 1, x: 0, duration: 1.2, delay: 0.4, ease: 'power4.out' }
      );

      // Title line 2 — clip & slide reveal
      gsap.fromTo('.hero-title-2',
        { clipPath: 'inset(0 0 0 100%)', opacity: 0, x: 60 },
        { clipPath: 'inset(0 0 0 0%)', opacity: 1, x: 0, duration: 1.2, delay: 0.7, ease: 'power4.out' }
      );

      // Subtitle
      gsap.fromTo('.hero-subtitle',
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.8, delay: 1.0, ease: 'power3.out' }
      );

      // Lightning bolt pulse
      gsap.to('.hero-bolt', {
        scale: 1.2, opacity: 0.6,
        duration: 0.8, ease: 'power2.inOut', repeat: -1, yoyo: true, delay: 1.5
      });

      // Glitch flicker
      const glitchTl = gsap.timeline({ delay: 2.5, repeat: -1, repeatDelay: 6 });
      glitchTl
        .to('.hero-glitch-overlay', { opacity: 0.8, duration: 0.05 })
        .to('.hero-glitch-overlay', { opacity: 0, duration: 0.05 })
        .to('.hero-glitch-overlay', { opacity: 0.6, duration: 0.03 })
        .to('.hero-glitch-overlay', { opacity: 0, duration: 0.08 })
        .to('.hero-glitch-overlay', { x: -3, duration: 0.05 })
        .to('.hero-glitch-overlay', { x: 3, duration: 0.05 })
        .to('.hero-glitch-overlay', { x: 0, opacity: 0, duration: 0.05 });

      // Description fade
      gsap.from('.hero-desc', { opacity: 0, y: 30, duration: 1, delay: 1.2, ease: 'power3.out' });

      // Info pills stagger
      gsap.from('.hero-pill', {
        opacity: 0, y: 20, scale: 0.9,
        duration: 0.6, delay: 1.4, stagger: 0.1, ease: 'back.out(1.5)'
      });

      // Button elastic entrance
      gsap.from('.hero-btn', {
        opacity: 0, scale: 0, y: 40,
        duration: 0.8, delay: 1.8, stagger: 0.2,
        ease: 'elastic.out(1, 0.5)'
      });

      // Background slow drift
      gsap.to('.hero-bg-img', {
        scale: 1.08, duration: 12, ease: 'none', repeat: -1, yoyo: true
      });

      // Parallax on scroll
      gsap.to('.hero-bg-img', {
        y: 150, ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

      gsap.to('.hero-content', {
        y: -50, ease: 'none',
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: 'bottom top',
          scrub: 1,
        }
      });

    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={containerRef} className="min-h-screen relative flex items-center justify-center pt-20 px-6 overflow-hidden">
      {/* Background Image */}
      <div 
        className="hero-bg-img absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-screen scale-110"
        style={{ backgroundImage: `url(${heroBg})` }}
      ></div>
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/80 to-background z-10 pointer-events-none"></div>
      
      <div className="hero-content container mx-auto text-center relative z-20">
        {/* Bolt + Badge */}
        <div className="hero-badge inline-flex items-center gap-2 mb-6 px-5 py-2 border border-primary/30 rounded-full bg-primary/10 text-primary text-sm font-bold tracking-widest backdrop-blur-md">
          <span className="hero-bolt text-lg">⚡</span> APRIL 8, 2026 • 8:30 AM – 1:30 PM
        </div>
        
        <h1 className="text-5xl md:text-7xl lg:text-[9rem] font-display font-black tracking-tighter text-white leading-none mb-2 relative overflow-hidden">
          <span className="hero-title-1 text-transparent bg-clip-text bg-gradient-to-b from-white to-zinc-400 block">
            ENERGIZE
          </span>
          <span className="hero-title-2 text-primary block -mt-2 md:-mt-4">
            2026
          </span>
          {/* Glitch overlay */}
          <span className="hero-glitch-overlay absolute inset-0 text-5xl md:text-7xl lg:text-[9rem] font-display font-black tracking-tighter opacity-0 pointer-events-none flex flex-col items-center justify-center" aria-hidden="true"
            style={{ mixBlendMode: 'screen', clipPath: 'inset(10% 0 60% 0)' }}
          >
            <span className="block text-cyan-400">ENERGIZE</span>
            <span className="block text-emerald-400 -mt-2 md:-mt-4">2026</span>
          </span>
        </h1>

        <p className="hero-subtitle text-xl md:text-2xl font-display font-bold text-accent tracking-wide mb-4">
          Bridging Bytes & Bricks
        </p>
        
        <p className="hero-desc text-base md:text-lg text-zinc-400 max-w-2xl mx-auto mb-8 font-medium">
          Ready to build the future of energy? The IETE Students' Forum at Rajalakshmi Institute of Technology invites you to a high-stakes, on-spot hackathon where code meets carbon neutrality.
        </p>

        {/* Info pills */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
          {[
            { icon: '📍', text: 'Green Building, 4th Floor' },
            { icon: '👥', text: '2–4 Members' },
            { icon: '💰', text: '₹200 per team' },
          ].map((pill, i) => (
            <div key={i} className="hero-pill px-4 py-2 bg-carbon border border-white/10 rounded-full text-sm text-zinc-300 flex items-center gap-2 backdrop-blur-sm">
              <span>{pill.icon}</span> {pill.text}
            </div>
          ))}
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button className="hero-btn w-full sm:w-auto px-8 py-4 bg-primary text-black font-bold text-lg hover:bg-primary-dark transition-all rounded-sm border-glow active:scale-95 uppercase tracking-wider hover:shadow-[0_0_30px_rgba(0,230,118,0.4)] hover:-translate-y-0.5 duration-300">
            ⚡ Register Now
          </button>
          <button className="hero-btn w-full sm:w-auto px-8 py-4 bg-transparent border border-white/20 text-white font-bold text-lg hover:bg-white/5 transition-all rounded-sm active:scale-95 uppercase tracking-wider hover:border-primary/50 hover:-translate-y-0.5 duration-300">
            View Tracks
          </button>
        </div>
      </div>
    </section>
  );
};

export default Hero;
