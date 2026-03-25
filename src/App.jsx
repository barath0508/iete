import React, { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/layout/Navbar';
import FloatingCalendar from './components/layout/FloatingCalendar';
import Hero from './components/sections/Hero';
import Mission from './components/sections/Mission';
import Domains from './components/sections/Domains';
import TimelineSection from './components/sections/TimelineSection';
import Rewards from './components/sections/Rewards';
import SponsorsSection from './components/sections/SponsorsSection';
import GallerySection from './components/sections/GallerySection';
import TeamSection from './components/sections/TeamSection';
import FAQSection from './components/sections/FAQSection';
import Footer from './components/layout/Footer';
import GlobalBackground from './components/effects/GlobalBackground';

gsap.registerPlugin(ScrollTrigger);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical',
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1,
      smoothTouch: false,
      touchMultiplier: 2,
      infinite: false,
    });
    
    window.lenis = lenis;

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    
    gsap.ticker.lagSmoothing(0);

    setTimeout(() => {
      ScrollTrigger.refresh();
    }, 1000);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(lenis.raf);
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-zinc-100 overflow-x-hidden relative">
      <GlobalBackground />
      <Navbar />
      
      <main className="relative z-10 flex flex-col w-full">
        <Hero />
        <Mission />
        <Domains />
        <TimelineSection />
        <Rewards />
        <SponsorsSection />
        <GallerySection />
        <TeamSection />
        <FAQSection />
      </main>

      <Footer />
      <FloatingCalendar />
    </div>
  );
}

export default App;
