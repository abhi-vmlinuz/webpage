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

        {/* Projects list */}
        <div className="border-t border-border">
          {projects.map((project, index) => (
            <motion.article 
              key={project.title} 
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + index * 0.08 }}
              className="group border-b border-border"
            >
              <div className="py-8 flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
                {/* Project number */}
                <span className="text-sm font-mono text-muted-foreground md:w-12 shrink-0">
                  {String(index + 1).padStart(2, '0')}
                </span>
                
                {/* Title & Description */}
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg md:text-xl font-semibold mb-1 group-hover:text-primary transition-colors duration-200">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed line-clamp-2">
                    {project.description}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 md:w-64 shrink-0">
                  {project.tags.slice(0, 3).map(tag => (
                    <span 
                      key={tag} 
                      className="px-2 py-0.5 text-xs font-mono text-muted-foreground"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex items-center gap-2 shrink-0">
                  {project.github && (
                    <a 
                      href={project.github} 
                      className="p-2 text-muted-foreground hover:text-foreground transition-colors duration-200" 
                      aria-label="View on GitHub"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.live && (
                    <a 
                      href={project.live} 
                      className="p-2 text-muted-foreground hover:text-primary transition-colors duration-200" 
                      aria-label="View live project"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>;
};
export default Projects;