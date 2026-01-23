import { motion } from "framer-motion";

const Hero = () => {
  return <section className="min-h-screen relative overflow-hidden">
      {/* Sleek dark gradient background */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-background via-background to-card/30" />
      
      {/* Subtle ambient glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-accent/5 rounded-full blur-[120px]" />
      </div>

      <div className="section-container relative z-10 w-full">
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
        }} className="mb-4 font-medium text-2xl text-destructive-foreground">
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
        }} className="text-xl md:text-2xl leading-relaxed max-w-2xl font-thin text-destructive-foreground">
            A <span className="highlight-accent font-extrabold bg-popover text-destructive">Cybersecurity Student </span> with 
            a DevSecOps mindset, passionate about building robust infrastructure, 
            automating everything, and crafting <span className="highlight-primary text-slate-50">real systems that matter</span>.
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