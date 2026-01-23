import { useEffect, useRef } from "react";
import * as THREE from "three";

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
  transparent = true,
  autoRotate = 0,
  scale = 1,
  frequency = 1,
  warpStrength = 1,
  mouseInfluence = 0,
  parallax = 0.5,
  noise = 0.1,
  className = "",
  style = {},
}: ColorBendsProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      alpha: transparent,
      antialias: true,
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // Convert hex colors to vec3
    const colorVecs = colors.slice(0, 8).map((hex) => {
      const color = new THREE.Color(hex);
      return new THREE.Vector3(color.r, color.g, color.b);
    });

    // Pad with black if less than 8 colors
    while (colorVecs.length < 8) {
      colorVecs.push(new THREE.Vector3(0, 0, 0));
    }

    const uniforms = {
      uTime: { value: 0 },
      uRotation: { value: (rotation * Math.PI) / 180 },
      uScale: { value: scale },
      uFrequency: { value: frequency },
      uWarpStrength: { value: warpStrength },
      uNoise: { value: noise },
      uColors: { value: colorVecs },
      uColorCount: { value: Math.min(colors.length, 8) },
      uResolution: { value: new THREE.Vector2(width, height) },
      uMouse: { value: new THREE.Vector2(0.5, 0.5) },
      uMouseInfluence: { value: mouseInfluence },
      uParallax: { value: parallax },
    };

    const vertexShader = `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = vec4(position, 1.0);
      }
    `;

    const fragmentShader = `
      precision highp float;
      
      varying vec2 vUv;
      
      uniform float uTime;
      uniform float uRotation;
      uniform float uScale;
      uniform float uFrequency;
      uniform float uWarpStrength;
      uniform float uNoise;
      uniform vec3 uColors[8];
      uniform int uColorCount;
      uniform vec2 uResolution;
      uniform vec2 uMouse;
      uniform float uMouseInfluence;
      uniform float uParallax;
      
      // Simple noise function
      float hash(vec2 p) {
        return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
      }
      
      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }
      
      mat2 rotate2D(float angle) {
        float s = sin(angle);
        float c = cos(angle);
        return mat2(c, -s, s, c);
      }
      
      void main() {
        vec2 uv = vUv - 0.5;
        float aspect = uResolution.x / uResolution.y;
        uv.x *= aspect;
        
        // Apply rotation
        uv = rotate2D(uRotation) * uv;
        
        // Apply scale
        uv /= uScale;
        
        // Warp effect
        float warp = sin(uv.y * uFrequency * 6.28318 + uTime) * uWarpStrength * 0.1;
        uv.x += warp;
        
        // Add noise
        float n = noise(uv * 5.0 + uTime * 0.5) * uNoise;
        uv += n;
        
        // Create gradient bands
        float bands = sin((uv.x + uv.y) * uFrequency * 3.14159 + uTime * 0.5) * 0.5 + 0.5;
        bands = pow(bands, 0.8);
        
        // Color mixing
        vec3 color = uColors[0];
        if (uColorCount > 1) {
          float colorPos = bands * float(uColorCount - 1);
          int idx1 = int(floor(colorPos));
          int idx2 = min(idx1 + 1, uColorCount - 1);
          float blend = fract(colorPos);
          
          vec3 c1 = uColors[0];
          vec3 c2 = uColors[0];
          
          for (int i = 0; i < 8; i++) {
            if (i == idx1) c1 = uColors[i];
            if (i == idx2) c2 = uColors[i];
          }
          
          color = mix(c1, c2, blend);
        }
        
        // Add subtle highlights
        float highlight = sin(uv.x * 20.0 + uTime) * 0.05 + 0.95;
        color *= highlight;
        
        gl_FragColor = vec4(color, 1.0);
      }
    `;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const material = new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      transparent,
    });

    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    let currentRotation = (rotation * Math.PI) / 180;
    let animationId: number;

    const animate = () => {
      uniforms.uTime.value += speed * 0.016;

      // Auto rotate
      if (autoRotate !== 0) {
        currentRotation += (autoRotate * Math.PI) / 180 * 0.016;
        uniforms.uRotation.value = currentRotation;
      }

      renderer.render(scene, camera);
      animationId = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      renderer.setSize(newWidth, newHeight);
      uniforms.uResolution.value.set(newWidth, newHeight);
    };

    window.addEventListener("resize", handleResize);
    animate();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
      material.dispose();
      geometry.dispose();
    };
  }, [rotation, speed, colors, transparent, autoRotate, scale, frequency, warpStrength, mouseInfluence, parallax, noise]);

  return (
    <div
      ref={containerRef}
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
