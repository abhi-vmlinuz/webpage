import { motion } from "framer-motion";
import { Server } from "lucide-react";
const Hero = () => {
  return <section className="min-h-screen relative overflow-hidden items-center justify-start flex flex-row">
      {/* Background gradient effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-0 w-80 h-80 bg-accent/10 rounded-full blur-[100px]" />
      </div>

      {/* Grid pattern overlay */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.02]" style={{
      backgroundImage: `linear-gradient(hsl(var(--foreground)) 1px, transparent 1px),
                           linear-gradient(90deg, hsl(var(--foreground)) 1px, transparent 1px)`,
      backgroundSize: '50px 50px'
    }} />

      <div className="section-container relative z-10 mx-[80px]">
        <div className="max-w-3xl">
          {/* Greeting */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.2
        }} className="text-muted-foreground text-lg mb-4 font-medium">
            Hi,
          </motion.p>

          {/* Name */}
          <motion.h1 initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.3
        }} className="text-5xl md:text-7xl font-bold tracking-tight mb-8">
            I'm{" "}
            <span className="text-gradient-primary text-destructive-foreground">
              Abhishek Vincent
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }} className="text-xl md:text-2xl text-secondary-foreground leading-relaxed max-w-2xl">
            A <span className="highlight-accent">security-focused platform engineer</span> with 
            a DevSecOps mindset, passionate about building robust infrastructure, 
            automating everything, and crafting <span className="highlight-primary text-gray-300">real systems that matter</span>.
          </motion.p>

          {/* Floating icons */}
          

          {/* Scroll indicator */}
          <motion.div initial={{
          opacity: 0
        }} animate={{
          opacity: 1
        }} transition={{
          duration: 0.5,
          delay: 1
        }} className="absolute bottom-12 left-6">
            <div className="flex flex-col items-center gap-2 text-muted-foreground">
              
              
            </div>
          </motion.div>
        </div>
      </div>
    </section>;
};
export default Hero;