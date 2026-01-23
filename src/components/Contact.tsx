import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, Github, Linkedin, ArrowUpRight } from "lucide-react";
const contactLinks = [{
  label: "Email",
  value: "hello@abhishekvincent.dev",
  href: "mailto:hello@abhishekvincent.dev",
  icon: Mail
}, {
  label: "GitHub",
  value: "@abhishekvincent",
  href: "https://github.com/abhishekvincent",
  icon: Github
}, {
  label: "LinkedIn",
  value: "Abhishek Vincent",
  href: "https://linkedin.com/in/abhishekvincent",
  icon: Linkedin
}];
const Contact = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px"
  });
  return <section id="contact" className="relative" ref={ref}>
      <div className="section-container">
        <motion.div initial={{
        opacity: 0,
        y: 40
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.6
      }} className="text-center max-w-2xl mx-auto mb-16">
          <span className="text-sm font-semibold tracking-wider uppercase mb-4 block text-destructive">
            Contact
          </span>
          <h2 className="section-heading">
            Let's Connect
          </h2>
          <p className="section-subheading mx-auto">
            Got a project in mind, a security challenge to tackle, or just want to chat about 
            infrastructure? I'd love to hear from you.
          </p>
        </motion.div>

        {/* Contact cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {contactLinks.map((link, index) => <motion.a key={link.label} href={link.href} target={link.label !== "Email" ? "_blank" : undefined} rel={link.label !== "Email" ? "noopener noreferrer" : undefined} initial={{
          opacity: 0,
          y: 20
        }} animate={isInView ? {
          opacity: 1,
          y: 0
        } : {}} transition={{
          duration: 0.5,
          delay: 0.2 + index * 0.1
        }} className="group p-6 rounded-2xl bg-card border border-border card-hover text-center">
              
              <h3 className="font-semibold text-lg mb-1">{link.label}</h3>
              <p className="text-muted-foreground text-sm flex items-center justify-center gap-1">
                {link.value}
                <ArrowUpRight className="w-4 h-4 opacity-0 -translate-y-1 translate-x-1 group-hover:opacity-100 group-hover:translate-y-0 group-hover:translate-x-0 transition-all duration-300" />
              </p>
            </motion.a>)}
        </div>

        {/* CTA */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} animate={isInView ? {
        opacity: 1,
        y: 0
      } : {}} transition={{
        duration: 0.5,
        delay: 0.5
      }} className="mt-16 text-center">
          <a href="mailto:hello@abhishekvincent.dev" className="inline-flex items-center gap-3 px-8 py-4 rounded-full text-primary-foreground font-semibold transition-all duration-300 glow-primary hover:scale-105 bg-secondary-foreground">
            <Mail className="w-5 h-5" />
            Send me a message
          </a>
        </motion.div>
      </div>
    </section>;
};
export default Contact;