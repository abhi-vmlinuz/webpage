import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import TechStack from "./TechStack";
const About = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section id="about" className="relative" ref={ref}>
      <div className="section-container">
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6
      }}>
          <span className="text-sm font-semibold tracking-wider uppercase mb-4 block text-destructive">
            About Me
          </span>
          <h2 className="section-heading">
            Building Secure Systems
          </h2>
          <p className="section-subheading mb-16">
            I thrive at the intersection of security and infrastructure — designing systems 
            that are not just functional, but resilient, scalable, and hardened against real-world threats.
          </p>
        </motion.div>

        {/* About content */}
        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <motion.div initial={{
          opacity: 0,
          x: -40
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.2
        }} className="space-y-6">
            <p className="text-secondary-foreground text-lg leading-relaxed">
              I'm a platform engineer with deep roots in cybersecurity. My journey started 
              with capture-the-flag competitions and evolved into building production-grade 
              infrastructure that organizations depend on.
            </p>
            <p className="text-secondary-foreground text-lg leading-relaxed">
              Whether it's architecting <span className="highlight-accent text-destructive">CTF platforms</span>, 
              automating security workflows, or designing <span className="highlight-primary text-destructive">zero-trust networks</span>, 
              I bring a security-first mindset to every system I build.
            </p>
            <p className="text-secondary-foreground text-lg leading-relaxed">
              Currently focused on platform engineering, container security, and building 
              tools that make security accessible to development teams.
            </p>
          </motion.div>

          {/* Terminal-like element */}
          <motion.div initial={{
          opacity: 0,
          x: 40
        }} animate={isInView ? {
          opacity: 1,
          x: 0
        } : {}} transition={{
          duration: 0.6,
          delay: 0.3
        }} className="glass p-6 rounded-2xl font-mono text-sm">
            <div className="flex items-center gap-2 mb-4 pb-4 border-b border-border">
              <div className="w-3 h-3 rounded-full bg-destructive/80" />
              <div className="w-3 h-3 rounded-full bg-accent/80" />
              <div className="w-3 h-3 rounded-full bg-primary/80" />
              <span className="ml-2 text-muted-foreground text-xs">~/abhishek</span>
            </div>
            <div className="space-y-2 text-muted-foreground">
              <p><span className="text-primary">$</span> whoami</p>
              <p className="text-foreground pl-4">security-engineer && platform-builder</p>
              <p><span className="text-primary">$</span> cat interests.txt</p>
              <p className="text-foreground pl-4">Cybersecurity, DevSecOps, Cloud Security, Automation</p>
              <p><span className="text-primary">$</span> ls -la skills/</p>
              <p className="text-foreground pl-4">linux/ docker/ kubernetes/ git/ python/</p>
              <p><span className="text-primary">$</span> <span className="animate-pulse">_</span></p>
            </div>
          </motion.div>
        </div>

        {/* Tech Stack Carousel */}
        <TechStack />
      </div>
    </section>;
};
export default About;