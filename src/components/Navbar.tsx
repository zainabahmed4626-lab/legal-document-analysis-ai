import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Sun, Moon } from "lucide-react";
import { useTheme } from "@/hooks/use-theme";

const NAV_ITEMS = [
  { label: "Home", id: "hero" },
  { label: "Results", id: "metrics" },
  { label: "Dataset", id: "dataset" },
  { label: "Architecture", id: "architecture" },
  { label: "Code", id: "code" },
  { label: "Demo", id: "demo" },
  { label: "Performance", id: "performance" },
];

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("hero");
  const [mobileOpen, setMobileOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const offsets = NAV_ITEMS.map(({ id }) => {
        const el = document.getElementById(id);
        if (!el) return { id, top: Infinity };
        return { id, top: Math.abs(el.getBoundingClientRect().top - 80) };
      });
      const closest = offsets.reduce((a, b) => (a.top < b.top ? a : b));
      setActiveId(closest.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMobileOpen(false);
  };

  return (
    <motion.nav
      initial={{ y: -60 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.4 }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-background/80 backdrop-blur-xl border-b border-border shadow-lg shadow-background/20"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-5xl mx-auto px-6 flex items-center justify-between h-14">
        <button onClick={() => scrollTo("hero")} className="font-mono font-bold text-sm text-foreground hover:text-primary transition-colors">
          Contract<span className="text-primary">AI</span>
        </button>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              className={`px-3 py-1.5 rounded-md text-xs font-mono transition-all ${
                activeId === id
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              {label}
            </button>
          ))}
          <button
            onClick={toggleTheme}
            className="ml-2 p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-secondary/50 transition-all"
            aria-label="Toggle theme"
          >
            {theme === "dark" ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          onClick={() => setMobileOpen(!mobileOpen)}
          className="md:hidden p-2 text-muted-foreground hover:text-foreground transition-colors"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="px-6 py-3 space-y-1">
              {NAV_ITEMS.map(({ label, id }) => (
                <button
                  key={id}
                  onClick={() => scrollTo(id)}
                  className={`block w-full text-left px-3 py-2 rounded-md text-sm font-mono transition-all ${
                    activeId === id
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
