import { motion } from "framer-motion";
import { Terminal, Shield, Server } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.02]"
        style={{
          backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
          backgroundSize: '50px 50px'
        }}
      />

      <div className="section-container relative z-10">
        <div className="max-w-3xl">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-muted-foreground text-lg mb-4 font-medium"
          >
            Hi,
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="text-5xl md:text-7xl font-bold tracking-tight mb-8"
          >
            I'm{" "}
            <span className="text-gradient-primary">
              Abhishek Vincent
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-xl md:text-2xl text-secondary-foreground leading-relaxed max-w-2xl"
          >
            A <span className="highlight-accent">security-focused platform engineer</span> with 
            a DevSecOps mindset, passionate about building robust infrastructure, 
            automating everything, and crafting <span className="highlight-primary">real systems that matter</span>.
          </motion.p>

          {/* Floating icons */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="flex items-center gap-6 mt-12"
          >
            <div className="p-3 rounded-xl bg-secondary/50 border border-border animate-float">
              <Terminal className="w-6 h-6 text-primary" />
            </div>
            <div className="p-3 rounded-xl bg-secondary/50 border border-border animate-float delay-200" style={{ animationDelay: '1s' }}>
              <Shield className="w-6 h-6 text-accent" />
            </div>
            <div className="p-3 rounded-xl bg-secondary/50 border border-border animate-float" style={{ animationDelay: '2s' }}>
              <Server className="w-6 h-6 text-primary" />
            </div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1 }}
            className="absolute bottom-12 left-6"
          >
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              <span className="text-sm font-medium tracking-wider uppercase">Scroll</span>
              <div className="w-px h-12 bg-gradient-to-b from-muted-foreground to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
