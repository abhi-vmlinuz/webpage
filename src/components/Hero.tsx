import { motion } from "framer-motion";
import { ShinyButton } from "@/components/ui/shiny-button";
const Hero = () => {
  return <section className="min-h-screen relative overflow-hidden flex items-center">
      {/* Content Container - Matching About section structure exactly */}
      <div className="section-container">
        <div className="space-y-6 md:space-y-8">
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
        }} className="text-base text-secondary-foreground md:text-2xl font-bold">
            Hi, I'm
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
        }} className="text-5xl md:text-7xl lg:text-8xl xl:text-9xl font-bold tracking-tight leading-none">
            <span className="text-foreground">Abhishek</span>
            <br />
            <span className="text-destructive">Vincent</span>
          </motion.h1>

          {/* Description */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.4
        }} className="space-y-4">
            <p className="text-lg md:text-xl lg:text-2xl text-muted-foreground font-light leading-relaxed">
              <span className="text-destructive font-semibold">Cybersecurity Student</span> with
              a DevSecOps mindset
            </p>
            <p className="text-sm md:text-base lg:text-lg text-muted-foreground/80 leading-relaxed">
              Passionate about building robust infrastructure, automating everything,
              and crafting <span className="text-foreground font-medium">real systems that matter</span>.
            </p>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div initial={{
          opacity: 0,
          y: 20
        }} animate={{
          opacity: 1,
          y: 0
        }} transition={{
          duration: 0.5,
          delay: 0.5
        }} className="flex flex-col sm:flex-row flex-wrap gap-3 md:gap-4 pt-4 md:pt-6">
            <ShinyButton href="#contact">
              Get in touch
            </ShinyButton>

            <a href="#projects" className="px-8 md:px-10 py-4 md:py-5 border-2 border-muted-foreground/20 text-foreground rounded-full font-medium hover:border-muted-foreground/40 hover:bg-muted/5 transition-all duration-300 text-base md:text-lg text-center">
              View work
            </a>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div initial={{
      opacity: 0
    }} animate={{
      opacity: 1
    }} transition={{
      duration: 0.5,
      delay: 1
    }} className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <span className="text-sm font-light">Scroll to explore</span>
          <svg className="w-6 h-6 animate-bounce" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
            <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
          </svg>
        </div>
      </motion.div>
    </section>;
};
export default Hero;