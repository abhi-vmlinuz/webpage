import { useEffect, useRef, useCallback } from "react";

interface SplashCursorProps {
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  COLOR_UPDATE_SPEED?: number;
}

interface Splat {
  x: number;
  y: number;
  vx: number;
  vy: number;
  color: { r: number; g: number; b: number };
  radius: number;
  life: number;
  maxLife: number;
}

const SplashCursor = ({
  SPLAT_RADIUS = 0.2,
  SPLAT_FORCE = 3000,
  COLOR_UPDATE_SPEED = 10,
}: SplashCursorProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const splatsRef = useRef<Splat[]>([]);
  const mouseRef = useRef({ x: 0, y: 0, prevX: 0, prevY: 0 });
  const colorTimerRef = useRef(0);
  const currentColorRef = useRef({ r: 0.2, g: 0.8, b: 1 });

  const generateColor = useCallback(() => {
    const h = Math.random();
    const s = 1;
    const v = 1;
    
    const i = Math.floor(h * 6);
    const f = h * 6 - i;
    const p = v * (1 - s);
    const q = v * (1 - f * s);
    const t = v * (1 - (1 - f) * s);
    
    let r = 0, g = 0, b = 0;
    switch (i % 6) {
      case 0: r = v; g = t; b = p; break;
      case 1: r = q; g = v; b = p; break;
      case 2: r = p; g = v; b = t; break;
      case 3: r = p; g = q; b = v; break;
      case 4: r = t; g = p; b = v; break;
      case 5: r = v; g = p; b = q; break;
    }
    
    return { r, g, b };
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const createSplat = (x: number, y: number, vx: number, vy: number) => {
      const speed = Math.sqrt(vx * vx + vy * vy);
      if (speed < 1) return;

      const numParticles = Math.min(Math.floor(speed / 5) + 2, 8);
      
      for (let i = 0; i < numParticles; i++) {
        const angle = Math.random() * Math.PI * 2;
        const spread = Math.random() * 50 + 20;
        
        splatsRef.current.push({
          x: x + Math.cos(angle) * Math.random() * 10,
          y: y + Math.sin(angle) * Math.random() * 10,
          vx: vx * 0.1 + Math.cos(angle) * spread * 0.1,
          vy: vy * 0.1 + Math.sin(angle) * spread * 0.1,
          color: { ...currentColorRef.current },
          radius: (SPLAT_RADIUS * 100 * Math.random() + 10) * (speed / 50 + 0.5),
          life: 1,
          maxLife: 1,
        });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = e.clientX;
      mouseRef.current.y = e.clientY;

      const vx = (mouseRef.current.x - mouseRef.current.prevX) * (SPLAT_FORCE / 100);
      const vy = (mouseRef.current.y - mouseRef.current.prevY) * (SPLAT_FORCE / 100);
      
      createSplat(e.clientX, e.clientY, vx, vy);
    };

    const handleTouchMove = (e: TouchEvent) => {
      const touch = e.touches[0];
      mouseRef.current.prevX = mouseRef.current.x;
      mouseRef.current.prevY = mouseRef.current.y;
      mouseRef.current.x = touch.clientX;
      mouseRef.current.y = touch.clientY;

      const vx = (mouseRef.current.x - mouseRef.current.prevX) * (SPLAT_FORCE / 100);
      const vy = (mouseRef.current.y - mouseRef.current.prevY) * (SPLAT_FORCE / 100);
      
      createSplat(touch.clientX, touch.clientY, vx, vy);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);

    let lastTime = performance.now();
    let animationId: number;

    const animate = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.016);
      lastTime = now;

      // Update color
      colorTimerRef.current += dt * COLOR_UPDATE_SPEED;
      if (colorTimerRef.current >= 1) {
        colorTimerRef.current = 0;
        currentColorRef.current = generateColor();
      }

      // Clear with fade
      ctx.fillStyle = "rgba(0, 0, 0, 0.1)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Update and draw splats
      splatsRef.current = splatsRef.current.filter((splat) => {
        splat.x += splat.vx;
        splat.y += splat.vy;
        splat.vx *= 0.98;
        splat.vy *= 0.98;
        splat.life -= dt * 1.5;
        splat.radius *= 0.995;

        if (splat.life <= 0 || splat.radius < 1) return false;

        const alpha = splat.life * 0.6;
        const gradient = ctx.createRadialGradient(
          splat.x, splat.y, 0,
          splat.x, splat.y, splat.radius
        );
        gradient.addColorStop(0, `rgba(${Math.floor(splat.color.r * 255)}, ${Math.floor(splat.color.g * 255)}, ${Math.floor(splat.color.b * 255)}, ${alpha})`);
        gradient.addColorStop(1, `rgba(${Math.floor(splat.color.r * 255)}, ${Math.floor(splat.color.g * 255)}, ${Math.floor(splat.color.b * 255)}, 0)`);
        
        ctx.beginPath();
        ctx.arc(splat.x, splat.y, splat.radius, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        return true;
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [SPLAT_RADIUS, SPLAT_FORCE, COLOR_UPDATE_SPEED, generateColor]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 9999,
      }}
    />
  );
};

export default SplashCursor;
