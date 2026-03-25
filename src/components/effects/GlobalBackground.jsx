import React, { useEffect, useRef } from 'react';

const GlobalBackground = () => {
  const canvasRef = useRef(null);
  const cursorRef = useRef(null);

  // Particle system — electric green energy particles
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let particles = [];

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    class Particle {
      constructor() {
        this.reset();
      }
      reset() {
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 100;
        this.size = Math.random() * 2.5 + 0.5;
        this.speedY = -(Math.random() * 0.6 + 0.15);
        this.speedX = (Math.random() - 0.5) * 0.3;
        this.opacity = Math.random() * 0.5 + 0.1;
        this.fadeSpeed = Math.random() * 0.003 + 0.001;
        this.pulse = Math.random() * Math.PI * 2;
        // Alternate between green and cyan particles
        this.isCyan = Math.random() > 0.7;
      }
      update() {
        this.y += this.speedY;
        this.x += this.speedX;
        this.pulse += 0.02;
        this.opacity -= this.fadeSpeed;
        if (this.opacity <= 0 || this.y < -10) this.reset();
      }
      draw() {
        const glowOpacity = this.opacity * (0.7 + 0.3 * Math.sin(this.pulse));
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        if (this.isCyan) {
          ctx.fillStyle = `rgba(0, 188, 212, ${glowOpacity})`;
          ctx.shadowColor = `rgba(0, 188, 212, ${glowOpacity * 0.5})`;
        } else {
          ctx.fillStyle = `rgba(0, 230, 118, ${glowOpacity})`;
          ctx.shadowColor = `rgba(0, 230, 118, ${glowOpacity * 0.5})`;
        }
        ctx.shadowBlur = this.size * 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
    }

    for (let i = 0; i < 80; i++) {
      const p = new Particle();
      p.y = Math.random() * canvas.height;
      particles.push(p);
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => {
        p.update();
        p.draw();
      });
      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', resize);
    };
  }, []);

  // Cursor glow follower
  useEffect(() => {
    const cursor = cursorRef.current;
    if (!cursor) return;
    let mouseX = -500, mouseY = -500;
    
    const handleMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top = mouseY + 'px';
      cursor.style.opacity = '1';
    };
    const handleLeave = () => {
      cursor.style.opacity = '0';
    };

    window.addEventListener('mousemove', handleMove);
    document.addEventListener('mouseleave', handleLeave);
    return () => {
      window.removeEventListener('mousemove', handleMove);
      document.removeEventListener('mouseleave', handleLeave);
    };
  }, []);

  return (
    <>
      {/* Canvas Particle System */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-0 pointer-events-none"
        style={{ opacity: 0.7 }}
      />

      {/* Ambient top glow — green energy */}
      <div className="fixed inset-0 z-0 pointer-events-none bg-[radial-gradient(circle_at_50%_0%,_rgba(0,230,118,0.06)_0%,_transparent_60%)]"></div>

      {/* Grid overlay */}
      <div className="fixed inset-0 z-0 pointer-events-none grid-overlay opacity-40"></div>

      {/* Cursor Glow */}
      <div ref={cursorRef} className="cursor-glow hidden md:block" style={{ opacity: 0 }}></div>
      
      {/* Hardware-accelerated Marquee Text */}
      <div className="fixed top-1/2 -translate-y-1/2 left-0 right-0 z-0 pointer-events-none overflow-hidden opacity-[0.03] select-none flex will-change-transform">
        <div className="whitespace-nowrap flex font-display font-black text-[15vw] tracking-tighter text-white animate-marquee leading-none pb-4" style={{ width: 'max-content' }}>
          <span className="px-8">ENERGIZE</span>
          <span className="px-8" style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>POWER</span>
          <span className="px-8">BYTES</span>
          <span className="px-8" style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>BRICKS</span>
          <span className="px-8">ENERGIZE</span>
          <span className="px-8" style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>POWER</span>
          <span className="px-8">BYTES</span>
          <span className="px-8" style={{ WebkitTextStroke: '2px white', color: 'transparent' }}>BRICKS</span>
        </div>
      </div>
    </>
  );
};

export default GlobalBackground;
