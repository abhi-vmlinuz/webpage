import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ColorBends from "@/components/ui/ColorBends";
import ErrorBoundary from "@/components/ErrorBoundary";

const Index = () => {
  return (
    <div className="min-h-screen bg-background relative">
      {/* Global ColorBends Background - Increased visibility */}
      <div className="fixed inset-0 opacity-50 pointer-events-none z-0">
        <ErrorBoundary>
          <ColorBends
            colors={["#ef4444", "#dc2626", "#991b1b"]}
            rotation={-13}
            speed={0.1}
            scale={1.5}
            frequency={0.8}
            warpStrength={1}
            mouseInfluence={0}
            parallax={0}
            noise={0.03}
            transparent
            autoRotate={0}
          />
        </ErrorBoundary>
      </div>

      {/* Content */}
      <div className="relative z-10">
        <Navbar />
        <main>
          <Hero />
          <About />
          <Projects />
          <Contact />
        </main>
        <Footer />
      </div>
    </div>
  );
};

export default Index;

