import { useEffect, useRef } from 'react';

interface CrystalAILogoProps {
  size?: number;
  className?: string;
}

export const CrystalAILogo = ({ size = 120, className = '' }: CrystalAILogoProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;

    const centerX = size / 2;
    const centerY = size / 2;
    const crystalSize = size * 0.35;

    class OrbitingShape {
      angle: number;
      radius: number;
      speed: number;
      size: number;
      sides: number;

      constructor() {
        this.angle = Math.random() * Math.PI * 2;
        this.radius = size * 0.4;
        this.speed = 0.02 + Math.random() * 0.02;
        this.size = 8;
        this.sides = 3 + Math.floor(Math.random() * 3);
      }

      update() {
        this.angle += this.speed;
      }

      draw(ctx: CanvasRenderingContext2D, time: number) {
        const x = centerX + Math.cos(this.angle) * this.radius;
        const y = centerY + Math.sin(this.angle) * this.radius;

        ctx.save();
        ctx.translate(x, y);
        ctx.rotate(time * 2);

        ctx.beginPath();
        for (let i = 0; i < this.sides; i++) {
          const angle = (Math.PI * 2 * i) / this.sides;
          const px = Math.cos(angle) * this.size;
          const py = Math.sin(angle) * this.size;
          if (i === 0) {
            ctx.moveTo(px, py);
          } else {
            ctx.lineTo(px, py);
          }
        }
        ctx.closePath();

        const hue = (time * 100 + this.angle * 50) % 360;
        ctx.strokeStyle = `hsla(${hue}, 80%, 60%, 0.6)`;
        ctx.lineWidth = 2;
        ctx.stroke();

        ctx.restore();
      }
    }

    const orbitingShapes: OrbitingShape[] = [];
    for (let i = 0; i < 6; i++) {
      orbitingShapes.push(new OrbitingShape());
    }

    const drawCrystal = (ctx: CanvasRenderingContext2D, time: number) => {
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.rotate(time * 0.5);

      const facets = [
        { x: 0, y: -crystalSize, color: 0 },
        { x: crystalSize * 0.866, y: crystalSize * 0.5, color: 120 },
        { x: -crystalSize * 0.866, y: crystalSize * 0.5, color: 240 },
      ];

      facets.forEach((facet, i) => {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        const nextFacet = facets[(i + 1) % facets.length];
        ctx.lineTo(facet.x, facet.y);
        ctx.lineTo(nextFacet.x, nextFacet.y);
        ctx.closePath();

        const hue = (facet.color + time * 50) % 360;
        const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, crystalSize);
        gradient.addColorStop(0, `hsla(${hue}, 80%, 70%, 0.8)`);
        gradient.addColorStop(0.5, `hsla(${(hue + 60) % 360}, 80%, 60%, 0.6)`);
        gradient.addColorStop(1, `hsla(${(hue + 120) % 360}, 80%, 50%, 0.4)`);

        ctx.fillStyle = gradient;
        ctx.fill();

        ctx.strokeStyle = `hsla(${hue}, 90%, 80%, 0.9)`;
        ctx.lineWidth = 2;
        ctx.stroke();
      });

      ctx.beginPath();
      facets.forEach((facet, i) => {
        if (i === 0) {
          ctx.moveTo(facet.x, facet.y);
        } else {
          ctx.lineTo(facet.x, facet.y);
        }
      });
      ctx.closePath();

      const outlineHue = (time * 80) % 360;
      ctx.strokeStyle = `hsla(${outlineHue}, 90%, 80%, 1)`;
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.restore();
    };

    const drawAIText = (ctx: CanvasRenderingContext2D, time: number) => {
      ctx.save();
      ctx.translate(centerX, centerY);

      ctx.font = `bold ${size * 0.25}px Arial`;
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';

      const hue = (time * 100) % 360;
      const gradient = ctx.createLinearGradient(-size * 0.2, 0, size * 0.2, 0);
      gradient.addColorStop(0, `hsl(${hue}, 80%, 60%)`);
      gradient.addColorStop(0.5, `hsl(${(hue + 60) % 360}, 80%, 60%)`);
      gradient.addColorStop(1, `hsl(${(hue + 120) % 360}, 80%, 60%)`);

      ctx.fillStyle = gradient;
      ctx.fillText('AI', 0, 0);

      ctx.strokeStyle = 'rgba(255, 255, 255, 0.9)';
      ctx.lineWidth = 2;
      ctx.strokeText('AI', 0, 0);

      ctx.restore();
    };

    const drawRefractionRays = (ctx: CanvasRenderingContext2D, time: number) => {
      const rays = 8;
      for (let i = 0; i < rays; i++) {
        const angle = (Math.PI * 2 * i) / rays + time;
        const startX = centerX + Math.cos(angle) * crystalSize;
        const startY = centerY + Math.sin(angle) * crystalSize;
        const endX = centerX + Math.cos(angle) * (crystalSize * 1.8);
        const endY = centerY + Math.sin(angle) * (crystalSize * 1.8);

        const pulse = Math.sin(time * 3 + i) * 0.5 + 0.5;
        const hue = (time * 100 + i * 45) % 360;

        ctx.beginPath();
        ctx.moveTo(startX, startY);
        ctx.lineTo(endX, endY);

        ctx.strokeStyle = `hsla(${hue}, 80%, 60%, ${pulse * 0.4})`;
        ctx.lineWidth = 2;
        ctx.stroke();
      }
    };

    const animate = () => {
      time += 0.02;

      ctx.clearRect(0, 0, size, size);

      drawRefractionRays(ctx, time);

      orbitingShapes.forEach(shape => {
        shape.update();
        shape.draw(ctx, time);
      });

      drawCrystal(ctx, time);
      drawAIText(ctx, time);

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      width={size}
      height={size}
      className={className}
      style={{ display: 'block' }}
    />
  );
};
