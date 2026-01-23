import { motion } from "framer-motion";
import { FileDown } from "lucide-react";
const navItems = [{
  label: "About",
  href: "#about"
}, {
  label: "Projects",
  href: "#projects"
}, {
  label: "Contact",
  href: "#contact"
}];
const Navbar = () => {
  const resumeUrl = "https://drive.google.com/file/d/1tygIDV8EuQhphBpx_9j-RRVROafs4MZk/view?usp=sharing";

  return (
    <div className="fixed top-4 md:top-6 left-1/2 -translate-x-1/2 z-50 w-[calc(100%-2rem)] md:w-auto max-w-2xl">
      <motion.nav
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="glass px-3 md:px-4 py-3 gap-2 flex items-center justify-center">
          {navItems.map(item => (
            <a key={item.label} href={item.href} className="nav-pill text-xs md:text-sm px-3 md:px-4">
              {item.label}
            </a>
          ))}
          <a
            href={resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex ml-1 px-4 py-2 rounded-full text-sm font-medium text-primary-foreground transition-all duration-200 items-center gap-2 bg-destructive-foreground"
          >
            <FileDown className="w-4 h-4" />
            Resume
          </a>
        </div>
      </motion.nav>
    </div>
  );
};
export default Navbar;