"use client";

import { ExternalLink, Github, Download, Mail } from "lucide-react";
import { projects } from "@/data/projects";
import { experiences } from "@/data/experience";
import { skillCategories } from "@/data/skills";
import TypewriterText from "@/components/TypewriterText";

export function handleDownloadResume() {
  const link = document.createElement("a");
  link.href = "/_Resume.pdf";
  link.download = "David_Joshua_Estrera_Resume.pdf";
  link.click();
}

type Props = {
  /** Larger type for immersive DOM screen */
  immersive?: boolean;
  playTypewriter?: boolean;
};

/** Shared portfolio UI — used on 3D screen and immersive takeover */
export default function PortfolioDesktopContent({
  immersive = false,
  playTypewriter = true,
}: Props) {
  const pad = immersive ? "px-6 py-8 md:px-10 md:py-10" : "px-4 py-6";
  const h1 = immersive
    ? "text-3xl md:text-4xl font-semibold tracking-tight text-white mb-3"
    : "text-2xl font-semibold tracking-tight text-white mb-2";
  const h2 = immersive
    ? "text-xl md:text-2xl font-semibold text-white mb-4"
    : "text-lg font-semibold text-white mb-3";
  const body = immersive
    ? "text-zinc-400 text-sm md:text-base leading-relaxed"
    : "text-zinc-400 text-[11px]";
  const label = immersive
    ? "text-[10px] md:text-xs uppercase tracking-[0.18em] text-emerald-500 mb-2"
    : "text-[9px] uppercase tracking-[0.18em] text-emerald-500 mb-1";

  return (
    <>
      <header className="sticky top-0 z-10 flex items-center justify-between px-3 py-2 md:px-4 bg-[#121416]/95 backdrop-blur border-b border-zinc-800">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-amber-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>
        <p className="text-[10px] md:text-xs uppercase tracking-[0.14em] text-emerald-500/90">
          David Estrera
        </p>
        <span className="text-[10px] text-zinc-500">
          {immersive ? "Scroll inside" : "Scroll"}
        </span>
      </header>

      <section
        id="welcome"
        className={`${pad} min-h-[70%] flex flex-col justify-center border-b border-zinc-800/80`}
      >
        <p className={label}>Welcome</p>
        <h1 className={h1}>
          {playTypewriter ? (
            <TypewriterText text="Hi, I'm David" speed={55} />
          ) : (
            "Hi, I'm David"
          )}
        </h1>
        <p className={`${body} max-w-xl`}>
          AI &amp; data engineer and full-stack developer building reliable
          systems from data pipelines to production delivery.
        </p>
        <div className="mt-5 flex flex-wrap gap-3">
          <button
            type="button"
            onClick={handleDownloadResume}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-emerald-600 text-white text-sm font-medium cursor-pointer hover:bg-emerald-500 transition-colors"
          >
            <Download size={16} aria-hidden="true" />
            Resume
          </button>
          <a
            href="mailto:davidestrera.work@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md border border-zinc-700 text-zinc-200 text-sm cursor-pointer hover:border-emerald-600/50 transition-colors"
          >
            <Mail size={16} aria-hidden="true" />
            Email
          </a>
        </div>
      </section>

      <section id="about" className={`${pad} border-b border-zinc-800/80`}>
        <p className={label}>About</p>
        <h2 className={h2}>AI, data, and delivery</h2>
        <div className={`space-y-3 ${body}`}>
          <p>
            Computer Science student at De La Salle University — BS (Honors)
            with a Minor in Data Science and MS in Computer Science.
          </p>
          <p>
            Work spans AI systems, data engineering, full-stack products, and
            DevOps — most recently as a Shared Tech DevOps Engineer Intern at
            ING (GitHub provisioning and Azure DevOps → GitHub migrations).
          </p>
          <p>
            Also contributed at DLSU TE3D House &amp; CeHCI, and shipped data /
            AI work at P&amp;G and WTW.
          </p>
        </div>
      </section>

      <section id="projects" className={`${pad} border-b border-zinc-800/80`}>
        <p className={label}>Projects</p>
        <h2 className={h2}>Selected work</h2>
        <div
          className={`grid gap-3 ${immersive ? "sm:grid-cols-2" : "grid-cols-2"}`}
        >
          {projects.map((p) => (
            <article
              key={p.title}
              className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-3 md:p-4"
            >
              <h3
                className={
                  immersive
                    ? "text-base font-semibold text-white mb-1"
                    : "text-[12px] font-semibold text-white mb-1"
                }
              >
                {p.title}
              </h3>
              <p
                className={
                  immersive
                    ? "text-sm text-zinc-400 mb-3"
                    : "text-[10px] text-zinc-400 mb-2 line-clamp-3"
                }
              >
                {p.description}
              </p>
              <div className="flex flex-wrap gap-1.5 mb-3">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="text-[10px] px-2 py-0.5 border border-zinc-700 text-zinc-400 rounded"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <div className="flex gap-4">
                <a
                  href={p.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-emerald-500 hover:text-emerald-400 cursor-pointer"
                >
                  <ExternalLink size={14} aria-hidden="true" /> Live
                </a>
                <a
                  href={p.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 cursor-pointer"
                >
                  <Github size={14} aria-hidden="true" /> Code
                </a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="skills" className={`${pad} border-b border-zinc-800/80`}>
        <p className={label}>Skills</p>
        <h2 className={h2}>Technical toolkit</h2>
        <div
          className={`grid gap-4 ${immersive ? "sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-2"}`}
        >
          {skillCategories.map((cat) => (
            <div key={cat.title}>
              <h3 className="text-sm font-semibold text-emerald-400 mb-2">
                {cat.title}
              </h3>
              <ul className="space-y-1">
                {cat.skills.map((s) => (
                  <li key={s} className={immersive ? "text-sm text-zinc-400" : "text-[10px] text-zinc-400"}>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      <section id="experience" className={`${pad} border-b border-zinc-800/80`}>
        <p className={label}>Experience</p>
        <h2 className={h2}>Where I&apos;ve worked</h2>
        <div className="space-y-5">
          {experiences.map((exp) => (
            <article
              key={`${exp.company}-${exp.title}`}
              className="border-l-2 border-zinc-700 pl-3 md:pl-4"
            >
              <p className="text-xs text-zinc-500">{exp.period}</p>
              <h3
                className={
                  immersive
                    ? "text-base font-semibold text-white"
                    : "text-[12px] font-semibold text-white"
                }
              >
                {exp.title}
              </h3>
              <p className="text-sm text-emerald-500 mb-2">{exp.company}</p>
              <ul className="space-y-1">
                {(immersive ? exp.description : exp.description.slice(0, 2)).map(
                  (d) => (
                    <li
                      key={d}
                      className={
                        immersive
                          ? "text-sm text-zinc-400"
                          : "text-[10px] text-zinc-400"
                      }
                    >
                      {d}
                    </li>
                  )
                )}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section id="contact" className={`${pad} pb-16`}>
        <p className={label}>Contact</p>
        <h2 className={h2}>Let&apos;s work together</h2>
        <p className={`${body} mb-4`}>
          Open to roles, collaborations, and interesting problems.
        </p>
        <a
          href="mailto:davidestrera.work@gmail.com"
          className="text-base text-emerald-400 hover:text-emerald-300 cursor-pointer"
        >
          davidestrera.work@gmail.com
        </a>
        <div className="mt-4 flex gap-5">
          <a
            href="https://github.com/david-estrera"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-300 cursor-pointer hover:text-white"
          >
            GitHub
          </a>
          <a
            href="https://www.linkedin.com/in/david-estrera"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-zinc-300 cursor-pointer hover:text-white"
          >
            LinkedIn
          </a>
        </div>
        <button
          type="button"
          onClick={handleDownloadResume}
          className="mt-6 inline-flex items-center gap-2 px-4 py-2.5 rounded-md bg-emerald-600 text-white text-sm font-medium cursor-pointer hover:bg-emerald-500"
        >
          <Download size={16} aria-hidden="true" />
          Download resume
        </button>
        <p className="mt-10 text-xs text-zinc-600">
          © {new Date().getFullYear()} David Estrera
        </p>
      </section>
    </>
  );
}
