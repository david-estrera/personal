"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Menu, X } from "lucide-react";
import SimpleModeToggle from "./SimpleModeToggle";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About", href: "#about" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Experience", href: "#experience" },
  { name: "Contact", href: "#contact" },
];

type Props = {
  /** When true (simple mode), nav is always shown */
  forceVisible?: boolean;
};

export default function Navbar({ forceVisible = false }: Props) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [pastIntro, setPastIntro] = useState(forceVisible);

  useEffect(() => {
    if (forceVisible) {
      setPastIntro(true);
      setIsScrolled(window.scrollY > 48);
    }

    const handleScroll = () => {
      if (forceVisible) {
        setPastIntro(true);
        setIsScrolled(window.scrollY > 48);
      } else {
        const intro = document.getElementById("laptop-intro");
        const threshold = intro
          ? Math.max(0, intro.offsetHeight - window.innerHeight * 0.2)
          : 500;
        setPastIntro(window.scrollY > threshold);
        setIsScrolled(window.scrollY > threshold + 48);
      }

      const sections = navItems.map((item) => item.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of [...sections].reverse()) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition) {
          setActiveSection(section);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, [forceVisible]);

  const handleNavClick = (href: string) => {
    setIsMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const visible = forceVisible || pastIntro;

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-[opacity,background-color,border-color,transform] duration-300 ${
        visible
          ? "opacity-100 translate-y-0 pointer-events-auto"
          : "opacity-0 -translate-y-2 pointer-events-none"
      } ${
        isScrolled
          ? "bg-surface/85 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <div className="max-w-content mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 md:h-[4.25rem]">
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              handleNavClick("#home");
            }}
            className="font-heading text-lg md:text-xl font-semibold tracking-tight text-ink hover:text-primary-500 transition-colors cursor-pointer"
          >
            David<span className="text-primary-600">.</span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick(item.href);
                }}
                className={`text-sm font-medium cursor-pointer transition-colors duration-200 ${
                  activeSection === item.href.substring(1)
                    ? "text-primary-500"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                {item.name}
              </a>
            ))}
            <SimpleModeToggle variant="nav" />
          </div>

          <button
            type="button"
            className="md:hidden flex min-h-[44px] min-w-[44px] items-center justify-center p-2 text-ink-muted hover:text-ink transition-colors cursor-pointer touch-manipulation"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden overflow-hidden bg-surface/95 backdrop-blur-md border-t border-line"
          >
            <div className="px-4 py-4 space-y-1">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  onClick={(e) => {
                    e.preventDefault();
                    handleNavClick(item.href);
                  }}
                  className={`block py-3 text-base font-medium cursor-pointer transition-colors ${
                    activeSection === item.href.substring(1)
                      ? "text-primary-500"
                      : "text-ink-muted hover:text-ink"
                  }`}
                >
                  {item.name}
                </a>
              ))}
              <div className="pt-3 pb-1">
                <SimpleModeToggle variant="nav" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
