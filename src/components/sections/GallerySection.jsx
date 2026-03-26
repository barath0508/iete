import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const EyeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="text-primary">
    <path d="M2.062 12.348a1 1 0 0 1 0-.696 10.75 10.75 0 0 1 19.876 0 1 1 0 0 1 0 .696 10.75 10.75 0 0 1-19.876 0" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const GallerySection = () => {
  const sectionRef = useRef(null);
  const headerRef = useRef(null);
  const imagesRef = useRef([]);
  const descRef = useRef(null);

  const images = [
    { src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800', alt: 'Solar panels at sunset', caption: 'Harnessing Solar Energy' },
    { src: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800', alt: 'Smart grid control room', caption: 'Smart Grid Innovation' },
    { src: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800', alt: 'Wind turbines on green hills', caption: 'Wind Power Revolution' },
    { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800', alt: 'Hardware prototyping lab', caption: 'Rapid Prototyping' },
    { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', alt: 'Circuit boards and electronics', caption: 'Embedded Systems' },
    { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800', alt: 'Digital energy network visualization', caption: 'Digital Energy Networks' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      if (headerRef.current) {
        gsap.from(headerRef.current.children, {
          opacity: 0, x: -40, duration: 0.8, stagger: 0.15, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
        });
      }

      // Description text animation
      if (descRef.current) {
        gsap.from(descRef.current, {
          opacity: 0, y: 30, duration: 0.8, ease: 'power3.out',
          scrollTrigger: { trigger: sectionRef.current, start: 'top 75%' }
        });
      }

      // Image cards animation
      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        gsap.fromTo(img,
          { opacity: 0, y: 40, scale: 0.95 },
          {
            opacity: 1, y: 0, scale: 1,
            duration: 0.8, ease: 'power3.out',
            scrollTrigger: { trigger: img, start: 'top 88%', toggleActions: 'play none none reverse' }
          }
        );
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5 bg-black">
      <div className="container mx-auto px-6 md:px-12 max-w-7xl">

        {/* Header - aligned like other sections */}
        <div ref={headerRef} className="flex items-start gap-6 mb-6">
          <div className="p-3 border border-white/10 rounded-sm bg-black/50">
            <EyeIcon />
          </div>
          <div className="text-left">
            <p className="text-primary/70 text-xs font-bold tracking-[0.2em] mb-1 uppercase">ENERGIZE 2026</p>
            <h2 className="text-3xl md:text-5xl font-display font-black tracking-tighter text-white">
              THE <span className="text-primary">VISION</span>
            </h2>
          </div>
        </div>

        {/* Description */}
        <p ref={descRef} className="text-zinc-400 text-lg leading-relaxed max-w-3xl mb-16">
          We envision a future powered by clean, intelligent energy systems. ENERGIZE 2026 brings together the brightest minds to prototype sustainable solutions — from solar-powered grids to AI-driven energy optimization. Here's a glimpse of the world we're building toward.
        </p>
        
        {/* Image Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <div 
              key={i} 
              ref={el => imagesRef.current[i] = el}
              className="relative overflow-hidden group aspect-video rounded-sm border border-white/10 hover:border-primary/80 transition-colors duration-500"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity z-10 pointer-events-none duration-700"></div>
              <div className="absolute inset-0 bg-primary mix-blend-color opacity-0 group-hover:opacity-20 transition-opacity z-10 pointer-events-none duration-500"></div>
              <img 
                src={img.src} alt={img.alt} 
                className="w-full h-full object-cover grayscale opacity-70 group-hover:grayscale-0 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700 ease-out"
                loading="lazy"
              />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black via-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500 z-20">
                <p className="text-left font-mono text-xs text-primary font-bold tracking-widest uppercase truncate">{img.caption}</p>
                <p className="text-left text-zinc-400 text-[11px] mt-1 tracking-wide">{img.alt}</p>
              </div>
              <div className="absolute top-0 right-0 w-0 h-0 border-t-[40px] border-t-primary/0 border-l-[40px] border-l-transparent group-hover:border-t-primary/30 transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GallerySection;
