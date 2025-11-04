
import React, { useRef, useEffect } from 'react';

const CursorFollower: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // Start mouse off-screen
  const mouse = useRef({ x: -200, y: -200 });
  const particles = useRef<Particle[]>([]);

  class Particle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    life: number;
    maxLife: number;
    ctx: CanvasRenderingContext2D;

    constructor(ctx: CanvasRenderingContext2D) {
      this.ctx = ctx;
      this.x = mouse.current.x + (Math.random() * 20 - 10);
      this.y = mouse.current.y + (Math.random() * 20 - 10);
      this.size = Math.random() * 6 + 2;
      this.speedX = Math.random() * 2 - 1;
      this.speedY = Math.random() * 2 - 1;
      // Using a HSL color palette for a "magical" neo feel
      this.color = `hsl(${Math.random() * 80 + 260}, 100%, 70%)`;
      this.maxLife = Math.random() * 80 + 40; // particle lifetime
      this.life = this.maxLife;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;
      this.life -= 1;
      if (this.size > 0.2) this.size -= 0.08;
    }

    draw() {
      this.ctx.fillStyle = this.color;
      this.ctx.globalAlpha = this.life / this.maxLife;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      this.ctx.fill();
      this.ctx.globalAlpha = 1; // reset global alpha
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const handleMouseMove = (event: MouseEvent) => {
      mouse.current.x = event.clientX;
      mouse.current.y = event.clientY;
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    const handleParticles = () => {
      // Add new particles
      for (let i = 0; i < 2; i++) {
        particles.current.push(new Particle(ctx));
      }

      // Update and draw existing particles
      for (let i = particles.current.length - 1; i >= 0; i--) {
        particles.current[i].update();
        particles.current[i].draw();
        // Remove dead particles
        if (particles.current[i].life <= 0 || particles.current[i].size <= 0.2) {
          particles.current.splice(i, 1);
        }
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      handleParticles();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 -z-10 pointer-events-none"
    />
  );
};

export default CursorFollower;
