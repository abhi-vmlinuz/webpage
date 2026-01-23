import { motion } from "framer-motion";
import { FileDown } from "lucide-react";

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact", href: "#contact" },
];

const Navbar = () => {
  const resumeUrl = "https://drive.google.com/file/d/YOUR_RESUME_ID/view"; // Replace with actual resume URL

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="fixed top-6 left-1/2 -translate-x-1/2 z-50"
    >
      <div className="glass px-2 py-2 flex items-center gap-1">
        {navItems.map((item) => (
          <a
            key={item.label}
            href={item.href}
            className="nav-pill"
          >
            {item.label}
          </a>
        ))}
        <a
          href={resumeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="ml-1 px-4 py-2 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all duration-200 flex items-center gap-2"
        >
          <FileDown className="w-4 h-4" />
          Resume
        </a>
      </div>
    </motion.nav>
  );
};

export default Navbar;
