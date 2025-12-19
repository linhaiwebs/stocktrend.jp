import { useEffect, useRef } from 'react';

export const CrystalGeometricBackground = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);

    class GeometricShape {
      x: number;
      y: number;
      size: number;
      rotation: number;
      rotationSpeed: number;
      velocityX: number;
      velocityY: number;
      sides: number;
      opacity: number;
      hueOffset: number;

      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 80 + 40;
        this.rotation = Math.random() * Math.PI * 2;
        this.rotationSpeed = (Math.random() - 0.5) * 0.005;
        this.velocityX = (Math.random() - 0.5) * 0.3;
        this.velocityY = (Math.random() - 0.5) * 0.3;
        this.sides = Math.floor(Math.random() * 4) + 3;
        this.opacity = Math.random() * 0.15 + 0.05;
        this.hueOffset = Math.random() * 360;
      }

      update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.rotation += this.rotationSpeed;

        if (this.x < -this.size) this.x = canvas!.width + this.size;
        if (this.x > canvas!.width + this.size) this.x = -this.size;
        if (this.y < -this.size) this.y = canvas!.height + this.size;
        if (this.y > canvas!.height + this.size) this.y = -this.size;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        ctx.save();
        ctx.translate(this.x, this.y);
        ctx.rotate(this.rotation);

        ctx.beginPath();
        for (let i = 0; i < this.sides; i++) {
          const angle = (Math.PI * 2 * i) / this.sides;
          const x = Math.cos(angle) * this.size;
          const y = Math.sin(angle) * this.size;
          if (i === 0) {
            ctx.moveTo(x, y);
          } else {
            ctx.lineTo(x, y);
          }
        }
        ctx.closePath();

        const hue = (this.hueOffset + time * 20) % 360;
        const gradient = ctx.createLinearGradient(-this.size, -this.size, this.size, this.size);
        gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, ${this.opacity})`);
        gradient.addColorStop(0.5, `hsla(${(hue + 60) % 360}, 80%, 60%, ${this.opacity * 0.5})`);
        gradient.addColorStop(1, `hsla(${(hue + 120) % 360}, 80%, 60%, ${this.opacity})`);

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = `hsla(${hue}, 90%, 70%, ${this.opacity * 2})`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      }
    }

    const shapes: GeometricShape[] = [];
    for (let i = 0; i < 15; i++) {
      shapes.push(new GeometricShape());
    }

    const drawGrid = (ctx: CanvasRenderingContext2D, time: number) => {
      const gridSize = 50;
      const offsetX = (time * 10) % gridSize;
      const offsetY = (time * 10) % gridSize;

      ctx.strokeStyle = 'rgba(200, 200, 200, 0.1)';
      ctx.lineWidth = 1;

      for (let x = -gridSize + offsetX; x < canvas.width + gridSize; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvas.height);
        ctx.stroke();
      }

      for (let y = -gridSize + offsetY; y < canvas.height + gridSize; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvas.width, y);
        ctx.stroke();
      }
    };

    const animate = () => {
      time += 0.01;

      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height);
      gradient.addColorStop(0, '#F0F0F0');
      gradient.addColorStop(1, '#FFFFFF');
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      drawGrid(ctx, time);

      shapes.forEach(shape => {
        shape.update();
        shape.draw(ctx, time);
      });

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', setCanvasSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
};
