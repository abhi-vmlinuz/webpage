import { useEffect, useRef } from "react";

interface ColorBendsProps {
  rotation?: number;
  speed?: number;
  colors?: string[];
  transparent?: boolean;
  autoRotate?: number;
  scale?: number;
  frequency?: number;
  warpStrength?: number;
  mouseInfluence?: number;
  parallax?: number;
  noise?: number;
  className?: string;
  style?: React.CSSProperties;
}

const ColorBends = ({
  rotation = 45,
  speed = 0.2,
  colors = ["#ffffff", "#cf2a2a", "#f50000"],
  autoRotate = 0,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  noise = 0.1,
  className = "",
  style = {},
}: ColorBendsProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let currentRotation = (rotation * Math.PI) / 180;
    let time = 0;
    let animationId: number;

    const hexToRgb = (hex: string) => {
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result
        ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16),
          }
        : { r: 0, g: 0, b: 0 };
    };

    const colorRgbs = colors.map(hexToRgb);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio, 2);
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const width = parent.clientWidth;
      const height = parent.clientHeight;
      
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.scale(dpr, dpr);
    };

    resize();
    window.addEventListener("resize", resize);

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    
    const lerpColor = (c1: { r: number; g: number; b: number }, c2: { r: number; g: number; b: number }, t: number) => ({
      r: Math.round(lerp(c1.r, c2.r, t)),
      g: Math.round(lerp(c1.g, c2.g, t)),
      b: Math.round(lerp(c1.b, c2.b, t)),
    });

    const draw = () => {
      const parent = canvas.parentElement;
      if (!parent) return;
      
      const width = parent.clientWidth;
      const height = parent.clientHeight;

      time += speed * 0.016;
      
      if (autoRotate !== 0) {
        currentRotation += (autoRotate * Math.PI) / 180 * 0.016;
      }

      // Create gradient bands
      const numBands = 20;
      
      ctx.save();
      ctx.translate(width / 2, height / 2);
      ctx.rotate(currentRotation);
      ctx.scale(scale, scale);
      ctx.translate(-width / 2, -height / 2);

      for (let i = 0; i < numBands; i++) {
        const t = i / numBands;
        const nextT = (i + 1) / numBands;
        
        // Warp effect
        const warp = Math.sin(t * Math.PI * 2 * frequency + time) * warpStrength * 20;
        const nextWarp = Math.sin(nextT * Math.PI * 2 * frequency + time) * warpStrength * 20;
        
        // Add noise
        const noiseOffset = (Math.sin(t * 50 + time * 2) * noise * 10);
        
        // Calculate color
        const colorPos = (t + Math.sin(time * 0.5) * 0.1 + noiseOffset * 0.01) % 1;
        const colorIndex = colorPos * (colorRgbs.length - 1);
        const colorIdx1 = Math.floor(colorIndex);
        const colorIdx2 = Math.min(colorIdx1 + 1, colorRgbs.length - 1);
        const colorBlend = colorIndex - colorIdx1;
        
        const color = lerpColor(colorRgbs[colorIdx1], colorRgbs[colorIdx2], colorBlend);
        
        // Draw band
        const y1 = t * height * 1.5 - height * 0.25 + warp;
        const y2 = nextT * height * 1.5 - height * 0.25 + nextWarp;
        
        ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`;
        ctx.beginPath();
        ctx.moveTo(-width * 0.5, y1);
        ctx.lineTo(width * 1.5, y1);
        ctx.lineTo(width * 1.5, y2);
        ctx.lineTo(-width * 0.5, y2);
        ctx.closePath();
        ctx.fill();
      }

      ctx.restore();

      animationId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, [rotation, speed, colors, autoRotate, scale, frequency, warpStrength, noise]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        ...style,
      }}
    />
  );
};

export default ColorBends;
