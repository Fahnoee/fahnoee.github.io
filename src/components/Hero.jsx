import React, { useEffect, useRef } from 'react';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/personal';

class Particle {
  constructor(canvas) {
    this.canvas = canvas;
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height;
    this.size = Math.random() * 1.5 + 0.5;
    this.speedX = Math.random() * 0.3 - 0.15;
    this.speedY = Math.random() * 0.3 - 0.15;
    this.baseSpeedX = this.speedX;
    this.baseSpeedY = this.speedY;
    this.brightness = Math.random() * 0.3 + 0.7;
    this.brightnessDelta = Math.random() * 0.01 - 0.005;
    this.baseSize = this.size;
    this.sizeDelta = Math.random() * 0.02 - 0.01;
  }

  update(mouse) {
    this.brightness += this.brightnessDelta;
    if (this.brightness <= 0.7 || this.brightness >= 1) {
      this.brightnessDelta *= -1;
    }

    this.size += this.sizeDelta;
    if (this.size <= this.baseSize - 0.2 || this.size >= this.baseSize + 0.2) {
      this.sizeDelta *= -1;
    }

    this.x += this.speedX;
    this.y += this.speedY;

    if (mouse.x !== undefined && mouse.y !== undefined) {
      const dx = mouse.x - this.x;
      const dy = mouse.y - this.y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      
      if (distance < mouse.radius) {
        const angle = Math.atan2(dy, dx);
        const force = (mouse.radius - distance) / mouse.radius;
        const repelStrength = 3;
        
        this.speedX = this.speedX * 0.9 - Math.cos(angle) * force * repelStrength;
        this.speedY = this.speedY * 0.9 - Math.sin(angle) * force * repelStrength;
      } else {
        this.speedX = this.speedX * 0.98 + this.baseSpeedX * 0.02;
        this.speedY = this.speedY * 0.98 + this.baseSpeedY * 0.02;
      }
    }

    if (this.x <= 0 || this.x >= this.canvas.width) {
      this.speedX *= -0.6;
      this.x = Math.max(0, Math.min(this.x, this.canvas.width));
    }
    if (this.y <= 0 || this.y >= this.canvas.height) {
      this.speedY *= -0.6;
      this.y = Math.max(0, Math.min(this.y, this.canvas.height));
    }
  }

  draw(ctx) {
    const gradient = ctx.createRadialGradient(
      this.x, this.y, 0,
      this.x, this.y, this.size * 2
    );
    const alpha = this.brightness * 0.7;
    gradient.addColorStop(0, `rgba(59, 130, 246, ${alpha})`);
    gradient.addColorStop(0.5, `rgba(59, 130, 246, ${alpha * 0.5})`);
    gradient.addColorStop(1, 'rgba(59, 130, 246, 0)');
    
    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

function Hero() {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: undefined, y: undefined, radius: 80 });
  const particlesRef = useRef([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    function init() {
      const rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
      
      particlesRef.current = [];
      const numberOfParticles = (canvas.width * canvas.height) / 7000;
      for (let i = 0; i < numberOfParticles; i++) {
        particlesRef.current.push(new Particle(canvas));
      }
    }

    function connect(particles) {
      const connectionDistance = 100;
      const maxConnections = 4;
      
      particles.forEach((particle, i) => {
        let connections = 0;
        for (let j = i + 1; j < particles.length && connections < maxConnections; j++) {
          const dx = particle.x - particles[j].x;
          const dy = particle.y - particles[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < connectionDistance) {
            connections++;
            const opacity = (1 - (distance / connectionDistance)) * 
                          particle.brightness * 
                          particles[j].brightness * 
                          0.3;
            
            const gradient = ctx.createLinearGradient(
              particle.x, particle.y,
              particles[j].x, particles[j].y
            );
            gradient.addColorStop(0, `rgba(59, 130, 246, ${opacity})`);
            gradient.addColorStop(0.5, `rgba(91, 91, 246, ${opacity * 0.8})`);
            gradient.addColorStop(1, `rgba(124, 58, 237, ${opacity})`);
            
            ctx.strokeStyle = gradient;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(particle.x, particle.y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      });
    }

    function animate() {
      // Clean clear
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particlesRef.current.forEach(particle => {
        particle.update(mouseRef.current);
        particle.draw(ctx);
      });
      
      connect(particlesRef.current);
      
      animationFrameId = requestAnimationFrame(animate);
    }

    function handleMouseMove(e) {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        radius: 80
      };
    }

    function handleMouseLeave() {
      mouseRef.current = {
        x: undefined,
        y: undefined,
        radius: 80
      };
    }

    init();
    animate();

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);
    window.addEventListener('resize', init);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('resize', init);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <section className="relative min-h-screen w-full bg-gray-900">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ 
          zIndex: 0,
          pointerEvents: 'all'
        }}
      />
      
      <div className="relative z-10 min-h-screen flex items-center justify-center px-6 pointer-events-none">
        <div className="text-center space-y-6">
          <h1 className="text-6xl font-bold animate-fadeIn">
            <span className="bg-gradient-to-r from-blue-500 to-purple-500 bg-clip-text text-transparent">
              {personalInfo.title}
            </span>
          </h1>
          <p className="text-xl text-gray-400 max-w-2xl mx-auto animate-fadeIn animation-delay-200">
            {personalInfo.tagline}
          </p>
          <div className="flex justify-center space-x-4 animate-fadeIn animation-delay-400 pointer-events-auto">
            <a 
              href={personalInfo.github} 
              target="_blank" 
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform"
            >
              <Github className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-colors" />
            </a>
            <a 
              href={personalInfo.linkedin} 
              target="_blank" 
              rel="noopener noreferrer"
              className="transform hover:scale-110 transition-transform"
            >
              <Linkedin className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-colors" />
            </a>
            <a 
              href={`mailto:${personalInfo.email}`}
              className="transform hover:scale-110 transition-transform"
            >
              <Mail className="w-6 h-6 hover:text-blue-500 cursor-pointer transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;