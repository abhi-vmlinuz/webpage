import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Server, Shield, Terminal, Wrench } from "lucide-react";
const projects = [{
  title: "Nexus Engine",
  description: "A high-performance CTF platform built for hosting capture-the-flag competitions. Features dynamic flag generation, real-time scoreboards, and containerized challenge deployment.",
  tags: ["Python", "Docker", "Kubernetes", "PostgreSQL"],
  icon: Server,
  github: "#",
  live: "#"
}, {
  title: "SecurePipe",
  description: "CI/CD security pipeline framework that integrates SAST, DAST, and container scanning into existing workflows. Built for DevSecOps teams.",
  tags: ["Go", "GitHub Actions", "Docker", "Trivy"],
  icon: Shield,
  github: "#",
  live: null
}, {
  title: "InfraBot",
  description: "Automated infrastructure provisioning and security hardening toolkit. Terraform modules with built-in CIS benchmarks and compliance checks.",
  tags: ["Terraform", "Ansible", "AWS", "Python"],
  icon: Terminal,
  github: "#",
  live: null
}, {
  title: "VulnLab",
  description: "Personal vulnerable lab environment for security research and training. Self-hosted vulnerable applications with guided exploitation paths.",
  tags: ["Docker", "Vagrant", "Linux", "Networking"],
  icon: Wrench,
  github: "#",
  live: "#"
}];
const Projects = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section id="projects" className="relative" ref={ref}>
      {/* Background accent */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[150px]" />
      </div>

      <div className="section-container relative z-10">
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
            Projects
          </span>
          <h2 className="section-heading">
            Things I've Built
          </h2>
          <p className="section-subheading mb-16">
            From CTF infrastructure to security automation — projects that solve real problems 
            and push the boundaries of what's possible.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, index) => <motion.article key={project.title} initial={{
          opacity: 0,
          y: 30
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.5,
          delay: 0.2 + index * 0.1
        }} className="group relative p-8 rounded-2xl bg-card border border-border card-hover overflow-hidden">
              {/* Hover gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative z-10">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  
                  <div className="flex items-center gap-3">
                    {project.github && <a href={project.github} className="p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-secondary transition-all duration-200" aria-label="View on GitHub">
                        <Github className="w-5 h-5" />
                      </a>}
                    {project.live && <a href={project.live} className="p-2 rounded-lg text-muted-foreground hover:text-primary hover:bg-secondary transition-all duration-200" aria-label="View live project">
                        <ExternalLink className="w-5 h-5" />
                      </a>}
                  </div>
                </div>

                {/* Content */}
                <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors duration-300">
                  {project.title}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {project.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => <span key={tag} className="px-3 py-1 rounded-full text-xs font-medium bg-secondary text-secondary-foreground border border-border">
                      {tag}
                    </span>)}
                </div>
              </div>
            </motion.article>)}
        </div>
      </div>
    </section>;
};
export default Projects;