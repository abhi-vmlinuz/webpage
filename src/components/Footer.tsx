import { motion } from "framer-motion";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-12">
        {/* Steve Jobs Quote */}
        <motion.div initial={{
        opacity: 0,
        y: 20
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.6
      }} className="text-center mb-10">
          <blockquote className="text-lg md:text-xl text-muted-foreground italic max-w-2xl mx-auto">
            "The people who are crazy enough to think they can change the world are the ones who do."
          </blockquote>
          <p className="text-sm text-muted-foreground/60 mt-3">— Steve Jobs</p>
        </motion.div>

        <motion.div initial={{
        opacity: 0
      }} whileInView={{
        opacity: 1
      }} viewport={{
        once: true
      }} transition={{
        duration: 0.5,
        delay: 0.2
      }} className="flex flex-col md:flex-row items-center justify-between gap-4 pt-8 border-t border-border/50">
          {/* Logo / Name */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <span className="font-bold" style={{
            fontFamily: "'Google Sans', sans-serif"
          }}>Abhishek Vincent    </span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} — Designed & built with security in mind
          </p>

          {/* Back to top */}
          <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200">
            Back to top ↑
          </a>
        </motion.div>
      </div>
    </footer>;
};
export default Footer;