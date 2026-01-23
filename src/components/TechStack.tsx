import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
const techStacks = [{
  name: "Bash/Shell",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/bash/bash-original.svg"
}, {
  name: "Python",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg"
}, {
  name: "C",
  icon: "https://cdn.simpleicons.org/c/A8B9CC"
}, {
  name: "C++",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/cplusplus/cplusplus-original.svg"
}, {
  name: "Java",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg"
}, {
  name: "Go",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/go/go-original-wordmark.svg"
}, {
  name: "MySQL",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mysql/mysql-original.svg"
}, {
  name: "PostgreSQL",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg"
}, {
  name: "Redis",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redis/redis-original.svg"
}, {
  name: "Docker",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg"
}, {
  name: "Kubernetes",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kubernetes/kubernetes-plain.svg"
}, {
  name: "GitHub",
  icon: "https://cdn.simpleicons.org/github/white"
}, {
  name: "REST APIs",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/fastapi/fastapi-original.svg"
}, {
  name: "Linux",
  icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg"
}];
const securityTools = [{
  name: "Wireshark",
  icon: "/placeholder.svg",
  isText: true
}, {
  name: "Metasploit",
  icon: "/placeholder.svg",
  isText: true
}, {
  name: "Nmap",
  icon: "/placeholder.svg",
  isText: true
}, {
  name: "Burp Suite",
  icon: "/placeholder.svg",
  isText: true
}, {
  name: "KernelSU",
  icon: "/placeholder.svg",
  isText: true
}, {
  name: "Binwalk",
  icon: "/placeholder.svg",
  isText: true
}, {
  name: "Autopsy",
  icon: "/placeholder.svg",
  isText: true
}, {
  name: "Boot.img Patching",
  icon: "/placeholder.svg",
  isText: true
}, {
  name: "Privilege Escalation",
  icon: "/placeholder.svg",
  isText: true
}, {
  name: "Digital Forensics",
  icon: "/placeholder.svg",
  isText: true
}];
const TechStack = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section className="py-16" ref={ref}>
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} animate={isInView ? {
      opacity: 1,
      y: 0
    } : {}} transition={{
      duration: 0.6,
      delay: 0.4
    }}>
        <h3 className="text-2xl font-semibold mb-8 text-center">Tech Stack</h3>
        
        {/* First row - scrolling left */}
        <div className="relative overflow-hidden mb-6">
          <div className="flex animate-scroll-left">
            {[...techStacks, ...techStacks].map((tech, index) => <div key={`${tech.name}-${index}`} className="flex-shrink-0 mx-4 group">
                <div className="w-20 h-20 rounded-xl bg-card border border-border flex items-center justify-center p-4 transition-all duration-300 group-hover:border-primary/50 group-hover:shadow-[0_0_20px_rgba(var(--primary-rgb),0.2)]">
                  <img src={tech.icon} alt={tech.name} className="w-10 h-10 object-contain transition-transform duration-300 group-hover:scale-110" />
                </div>
                <p className="text-xs text-muted-foreground text-center mt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {tech.name}
                </p>
              </div>)}
          </div>
        </div>

        {/* Second row - Security tools scrolling right */}
        <div className="relative overflow-hidden">
          <div className="flex animate-scroll-right">
            {[...securityTools, ...securityTools].map((tool, index) => <div key={`${tool.name}-${index}`} className="flex-shrink-0 mx-3 group">
                <div className="px-5 py-3 rounded-full bg-card border border-border flex items-center justify-center transition-all duration-300 group-hover:border-accent/50 group-hover:shadow-[0_0_20px_rgba(var(--accent-rgb),0.2)]">
                  <span className="text-sm font-medium text-muted-foreground group-hover:text-accent transition-colors duration-300">
                    {tool.name}
                  </span>
                </div>
              </div>)}
          </div>
        </div>
      </motion.div>
    </section>;
};
export default TechStack;