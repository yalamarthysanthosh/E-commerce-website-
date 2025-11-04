
import React, { useRef, useEffect } from 'react';

const BackgroundAnimation: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const circles = useRef<Circle[]>([]);

  class Circle {
    x: number;
    y: number;
    size: number;
    speedX: number;
    speedY: number;
    color: string;
    ctx: CanvasRenderingContext2D;
    canvas: HTMLCanvasElement;

    constructor(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
      this.ctx = ctx;
      this.canvas = canvas;
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 20 + 10;
      this.speedX = Math.random() * 0.4 - 0.2;
      this.speedY = Math.random() * 0.4 - 0.2;
      // Neo color palette: cyan, fuchsia, purple
      const colors = [
        'hsla(180, 100%, 50%, 0.2)', // cyan
        'hsla(300, 100%, 50%, 0.2)', // fuchsia
        'hsla(270, 100%, 50%, 0.2)', // purple
      ];
      this.color = colors[Math.floor(Math.random() * colors.length)];
    }

    update() {
      if (this.x > this.canvas.width || this.x < 0) {
        this.speedX = -this.speedX;
      }
      if (this.y > this.canvas.height || this.y < 0) {
        this.speedY = -this.speedY;
      }
      this.x += this.speedX;
      this.y += this.speedY;
    }

    draw() {
      this.ctx.fillStyle = this.color;
      this.ctx.beginPath();
      this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    
    const init = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      circles.current = [];
      const numberOfCircles = Math.floor(canvas.width / 50);
      for (let i = 0; i < numberOfCircles; i++) {
        circles.current.push(new Circle(ctx, canvas));
      }
    };

    const handleResize = () => {
      init();
    };

    init();
    window.addEventListener('resize', handleResize);

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const circle of circles.current) {
        circle.update();
        circle.draw();
      }
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 -z-20 pointer-events-none"
    />
  );
};

export default BackgroundAnimation;
