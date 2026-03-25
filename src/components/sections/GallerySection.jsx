import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const GallerySection = () => {
  const sectionRef = useRef(null);
  const imagesRef = useRef([]);

  const images = [
    { src: 'https://images.unsplash.com/photo-1509391366360-2e959784a276?auto=format&fit=crop&q=80&w=800', alt: 'Solar panels at sunset' },
    { src: 'https://images.unsplash.com/photo-1558449028-b53a39d100fc?auto=format&fit=crop&q=80&w=800', alt: 'Smart grid control room' },
    { src: 'https://images.unsplash.com/photo-1497435334941-8c899ee9e8e9?auto=format&fit=crop&q=80&w=800', alt: 'Wind turbines on green hills' },
    { src: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=800', alt: 'Hardware prototyping lab' },
    { src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=800', alt: 'Circuit boards and electronics' },
    { src: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&q=80&w=800', alt: 'Digital energy network visualization' },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-header', {
        opacity: 0, y: 40, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' }
      });

      imagesRef.current.forEach((img, i) => {
        if (!img) return;
        const isLeft = i % 3 === 0;
        gsap.fromTo(img,
          { clipPath: isLeft ? 'inset(0 100% 0 0)' : 'inset(0 0 100% 0)', opacity: 0 },
          {
            clipPath: 'inset(0 0% 0% 0)', opacity: 1,
            duration: 1.2, ease: 'power3.inOut',
            scrollTrigger: { trigger: img, start: 'top 88%' }
          }
        );
        gsap.to(img, {
          y: i % 2 === 0 ? -30 : 30, ease: 'none',
          scrollTrigger: { trigger: img, start: 'top bottom', end: 'bottom top', scrub: 1 }
        });
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section id="gallery" ref={sectionRef} className="py-24 md:py-32 relative z-10 border-t border-white/5 bg-black">
      <div className="container mx-auto px-6 md:px-12 text-center">
        <h2 className="gallery-header text-4xl md:text-6xl font-display font-black tracking-tighter text-white mb-16">
          THE <span className="text-primary text-glow">VISION</span>
        </h2>
        
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
                <p className="text-left font-mono text-xs text-primary font-bold tracking-widest uppercase truncate">{img.alt}</p>
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
