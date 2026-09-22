"use client";

import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Skills from "@/components/Skills";
import Experience from "@/components/Experience";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import ScrollIndicator from "@/components/ScrollIndicator";
import ErrorBoundary from "@/components/ErrorBoundary";
import SimpleModeToggle from "@/components/SimpleModeToggle";
import { useHasHydrated, useSimpleMode } from "@/lib/simple-mode";

const LaptopIntro = dynamic(() => import("@/components/LaptopIntro"), {
  ssr: false,
});

export default function Home() {
  const hydrated = useHasHydrated();
  const { simple } = useSimpleMode();

  // Wait one frame for localStorage so we don't mount WebGL when Simple is saved
  const showIntro = hydrated && !simple;

  return (
    <main className="relative bg-[#0c0c0e]">
      <SimpleModeToggle />
      {showIntro && <ScrollIndicator />}
      {showIntro && (
        <ErrorBoundary>
          <LaptopIntro />
        </ErrorBoundary>
      )}

      <div
        id="site"
        className={`relative z-10 bg-[#0c0c0e] ${showIntro ? "-mt-[100svh]" : ""}`}
      >
        <Navbar forceVisible={simple || !hydrated} />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Experience />
        <Contact />
        <Footer />
      </div>
    </main>
  );
}
