import { motion } from "framer-motion";
import { Shield } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-border">
      <div className="max-w-6xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-center justify-between gap-4"
        >
          {/* Logo / Name */}
          <div className="flex items-center gap-2 text-muted-foreground">
            <Shield className="w-5 h-5 text-primary" />
            <span className="font-semibold">Abhishek Vincent</span>
          </div>

          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © {currentYear} — Designed & built with security in mind
          </p>

          {/* Back to top */}
          <a
            href="#"
            className="text-sm text-muted-foreground hover:text-primary transition-colors duration-200"
          >
            Back to top ↑
          </a>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;
