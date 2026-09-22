"use client";

import { motion } from "motion/react";
import { ArrowDown, Download } from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";
import TypewriterText from "./TypewriterText";

type Props = {
  /** Intro overlay — skip typewriter / whileInView so copy is instantly readable */
  preview?: boolean;
};

export default function Hero({ preview = false }: Props) {
  const handleScrollDown = () => {
    document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
  };

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/_Resume.pdf";
    link.download = "David_Joshua_Estrera_Resume.pdf";
    link.click();
  };

  return (
    <section
      id={preview ? undefined : "home"}
      className={`relative flex min-h-[100svh] items-center justify-center px-4 pt-[max(5.5rem,env(safe-area-inset-top)+4rem)] pb-[max(4rem,env(safe-area-inset-bottom)+2rem)] sm:px-6 lg:px-8 ${
        preview ? "bg-[#0c0c0e]" : ""
      }`}
    >
      <div
        className="pointer-events-none absolute inset-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute top-1/3 left-1/2 h-[min(90vw,42rem)] w-[min(90vw,42rem)] -translate-x-1/2 -translate-y-1/2 rounded-full bg-emerald-600/10 blur-3xl" />
      </div>

      <motion.div
        className="relative z-10 mx-auto max-w-3xl text-center"
        initial={preview ? "visible" : "hidden"}
        animate={preview ? "visible" : undefined}
        whileInView={preview ? undefined : "visible"}
        viewport={preview ? undefined : viewportOnce}
        variants={staggerContainer}
      >
        <motion.p
          variants={fadeInUp}
          className="mb-5 text-xs uppercase tracking-[0.2em] text-emerald-500"
        >
          Welcome
        </motion.p>
        <motion.h1
          variants={fadeInUp}
          className="font-heading text-4xl font-semibold leading-[1.05] tracking-tight text-white sm:text-6xl md:text-7xl"
        >
          {preview ? (
            "Hi, I'm David"
          ) : (
            <TypewriterText text="Hi, I'm David" speed={70} />
          )}
        </motion.h1>

        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-6 max-w-xl text-base leading-relaxed text-zinc-400 sm:text-lg md:text-xl"
        >
          AI &amp; data engineer and full-stack developer building reliable
          systems from data pipelines to production delivery.
        </motion.p>

        <motion.div
          variants={fadeInUp}
          className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <button
            type="button"
            onClick={handleScrollDown}
            className="w-full min-h-[48px] min-w-[10.5rem] cursor-pointer touch-manipulation rounded-md bg-emerald-600 px-7 py-3.5 font-medium text-white transition-colors hover:bg-emerald-500 sm:w-auto"
          >
            View my work
          </button>
          <button
            type="button"
            onClick={handleDownloadResume}
            className="inline-flex w-full min-h-[48px] min-w-[10.5rem] cursor-pointer touch-manipulation items-center justify-center gap-2 rounded-md border border-zinc-600 px-7 py-3.5 font-medium text-zinc-100 transition-colors hover:border-emerald-600/50 hover:text-emerald-400 sm:w-auto"
          >
            <Download size={18} aria-hidden="true" />
            Resume
          </button>
        </motion.div>
      </motion.div>

      {!preview && (
        <button
          type="button"
          onClick={handleScrollDown}
          className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 cursor-pointer text-zinc-500 transition-colors hover:text-emerald-500"
          aria-label="Scroll to about"
        >
          <ArrowDown size={22} />
        </button>
      )}
    </section>
  );
}
