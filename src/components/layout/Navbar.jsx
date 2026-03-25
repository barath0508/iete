import React, { useState, useEffect, useRef } from 'react';
import { Volume2, VolumeX, Menu } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import bgMusic from '../../assets/hayden-folker-cloud-nine.mp3';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [soundOn, setSoundOn] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const audioRef = useRef(null);

  // Initialize audio
  useEffect(() => {
    const audio = new Audio(bgMusic);
    audio.loop = true;
    audio.volume = 0.4;
    audioRef.current = audio;
    return () => {
      audio.pause();
      audio.src = '';
    };
  }, []);

  // Play / pause based on soundOn
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (soundOn) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }, [soundOn]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target && window.lenis) {
      window.lenis.scrollTo(target);
    } else if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const navLinks = [
    { name: 'ABOUT', href: '#mission' },
    { name: 'DOMAINS', href: '#domains' },
    { name: 'TIMELINE', href: '#timeline' },
    { name: 'PRIZES', href: '#rewards' },
    { name: 'FAQS', href: '#faqs' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent ${
        isScrolled ? 'bg-background/80 backdrop-blur-md border-white/5 py-4' : 'bg-transparent py-6'
      }`}
    >
      <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3 relative z-50">
          <a href="#" className="font-display font-black text-2xl tracking-tighter text-white flex items-center gap-2 group">
            <span className="text-primary group-hover:text-glow transition-all duration-300">HACK</span>HUSTLE
            <div className="h-1.5 w-1.5 bg-primary rounded-full animate-pulse-slow"></div>
          </a>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              className="text-xs font-bold tracking-widest text-zinc-400 hover:text-primary transition-colors relative group"
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-[2px] bg-primary transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </nav>

        {/* Right Actions */}
        <div className="flex items-center gap-4 relative z-50">
          <button 
            onClick={() => setSoundOn(!soundOn)}
            className="p-2 text-zinc-400 hover:text-primary transition-colors border border-white/10 rounded-full hover:border-primary w-10 h-10 flex items-center justify-center bg-black/50 backdrop-blur-sm"
            aria-label="Toggle Sound"
          >
            {soundOn ? <Volume2 size={16} /> : <VolumeX size={16} />}
          </button>
          
          <button 
            className="hidden lg:block px-6 py-2.5 bg-primary text-black font-bold text-sm hover:bg-primary-dark transition-all rounded-sm border-glow active:scale-95 uppercase tracking-wide"
          >
            Register Now
          </button>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden p-2 text-white"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-background/95 backdrop-blur-xl border-b border-white/10 p-6 flex flex-col gap-6 md:hidden shadow-2xl"
          >
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href}
                className="text-lg font-display font-bold text-zinc-200 hover:text-primary"
                onClick={(e) => handleNavClick(e, link.href)}
              >
                {link.name}
              </a>
            ))}
            <button className="w-full px-6 py-3 bg-primary text-black font-bold transition-all rounded-sm active:scale-95 mt-4">
              REGISTER NOW
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Navbar;
