"use client";

import { motion } from "motion/react";
import { useState } from "react";
import { Mail, Github, Linkedin, Download } from "lucide-react";
import { fadeInUp, staggerContainer, viewportOnce } from "@/lib/animations";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success">("idle");

  const handleDownloadResume = () => {
    const link = document.createElement("a");
    link.href = "/_Resume.pdf";
    link.download = "David_Joshua_Estrera_Resume.pdf";
    link.click();
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:davidestrera.work@gmail.com?subject=${subject}&body=${body}`;

    setFormData({ name: "", email: "", message: "" });
    setSubmitStatus("success");
    setTimeout(() => setSubmitStatus("idle"), 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const socialLinks = [
    {
      icon: Github,
      label: "GitHub",
      href: "https://github.com/david-estrera",
    },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/david-estrera",
    },
  ];

  return (
    <section
      id="contact"
      className="py-24 md:py-32 px-4 sm:px-6 lg:px-8 border-t border-line"
    >
      <motion.div
        className="max-w-content mx-auto"
        initial="hidden"
        whileInView="visible"
        viewport={viewportOnce}
        variants={staggerContainer}
      >
        <motion.div variants={fadeInUp} className="mb-14 md:mb-16 max-w-2xl">
          <p className="font-heading text-sm uppercase tracking-[0.18em] text-primary-500 mb-3">
            Contact
          </p>
          <h2 className="font-heading text-3xl sm:text-4xl md:text-5xl font-semibold tracking-tight text-ink mb-4">
            Let&apos;s work together
          </h2>
          <p className="text-ink-muted text-lg">
            Open to roles, collaborations, and interesting problems.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          <motion.div variants={fadeInUp} className="space-y-8">
            <div className="flex items-start gap-4">
              <div className="p-2.5 border border-line rounded-md text-primary-500">
                <Mail size={20} aria-hidden="true" />
              </div>
              <div>
                <p className="text-sm text-ink-faint mb-1">Email</p>
                <a
                  href="mailto:davidestrera.work@gmail.com"
                  className="text-ink hover:text-primary-500 transition-colors cursor-pointer"
                >
                  davidestrera.work@gmail.com
                </a>
              </div>
            </div>

            <div>
              <p className="text-sm text-ink-faint mb-3">Social</p>
              <div className="flex gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={social.label}
                      className="p-3 border border-line rounded-md text-ink-muted hover:text-primary-500 hover:border-primary-600/40 transition-colors cursor-pointer"
                    >
                      <Icon size={20} aria-hidden="true" />
                    </a>
                  );
                })}
              </div>
            </div>

            <button
              type="button"
              onClick={handleDownloadResume}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors cursor-pointer"
            >
              <Download size={18} aria-hidden="true" />
              Download resume
            </button>
          </motion.div>

          <motion.form
            variants={fadeInUp}
            onSubmit={handleSubmit}
            className="space-y-4"
          >
            <div>
              <label htmlFor="name" className="block text-sm text-ink-faint mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-surface-muted border border-line rounded-md text-ink placeholder:text-ink-faint focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600/40 transition-[border-color,box-shadow] duration-200"
                placeholder="Your name"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm text-ink-faint mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 bg-surface-muted border border-line rounded-md text-ink placeholder:text-ink-faint focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600/40 transition-[border-color,box-shadow] duration-200"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm text-ink-faint mb-2">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full px-4 py-3 bg-surface-muted border border-line rounded-md text-ink placeholder:text-ink-faint focus:outline-none focus:border-primary-600 focus:ring-1 focus:ring-primary-600/40 transition-[border-color,box-shadow] duration-200 resize-none"
                placeholder="Your message..."
              />
            </div>
            {submitStatus === "success" && (
              <p className="text-sm text-primary-500" role="status">
                Your email client should open shortly.
              </p>
            )}
            <button
              type="submit"
              className="w-full px-6 py-3.5 bg-primary-600 text-white font-medium rounded-md hover:bg-primary-700 transition-colors cursor-pointer"
            >
              Send message
            </button>
          </motion.form>
        </div>
      </motion.div>
    </section>
  );
}
