"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Mail, Github, Linkedin, Download } from "lucide-react";
import { fadeInUp, staggerContainer } from "@/lib/animations";

export default function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: false, margin: "-100px" });
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
    
    // Create mailto link with form data
    const subject = encodeURIComponent(`Contact from ${formData.name}`);
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    const mailtoLink = `mailto:davidestrera.work@gmail.com?subject=${subject}&body=${body}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Reset form
    setFormData({ name: "", email: "", message: "" });
    setSubmitStatus("success");
    
    // Reset status after 3 seconds
    setTimeout(() => {
      setSubmitStatus("idle");
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "davidestrera.work@gmail.com",
      href: "mailto:davidestrera.work@gmail.com",
    },
  ];

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
      ref={ref}
      className="min-h-screen py-20 md:py-32 px-4 sm:px-6 lg:px-8 bg-black"
    >
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={fadeInUp}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4">
            Get In <span className="text-primary-500">Touch</span>
          </h2>
          <div className="w-24 h-1 bg-primary-600 mx-auto"></div>
          <p className="text-gray-400 mt-6 text-lg max-w-2xl mx-auto">
            Let's connect and discuss how we can work together
          </p>
        </motion.div>

        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12"
        >
          {/* Contact Information */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Contact Information</h3>
            {contactInfo.map((info) => {
              const Icon = info.icon;
              return (
                <motion.div
                  key={info.label}
                  whileHover={{ x: 5 }}
                  className="flex items-start gap-4 p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg hover:border-primary-600/50 transition-all duration-300"
                >
                  <div className="p-3 bg-primary-600/20 rounded-lg text-primary-600">
                    <Icon size={24} />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1">{info.label}</p>
                    {info.href ? (
                      <a
                        href={info.href}
                        className="text-white hover:text-primary-500 transition-colors duration-300"
                      >
                        {info.value}
                      </a>
                    ) : (
                      <p className="text-white">{info.value}</p>
                    )}
                  </div>
                </motion.div>
              );
            })}

            {/* Social Links */}
            <div className="pt-4">
              <h4 className="text-xl font-bold text-white mb-4">Social Links</h4>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <motion.a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      whileHover={{ scale: 1.1, y: -5 }}
                      whileTap={{ scale: 0.9 }}
                      className="p-4 bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-lg hover:border-primary-600/50 text-gray-400 hover:text-primary-600 transition-all duration-300"
                    >
                      <Icon size={24} />
                    </motion.a>
                  );
                })}
              </div>
            </div>

            {/* Download Resume Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDownloadResume}
              className="w-full md:w-auto px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-300 flex items-center justify-center gap-2 shadow-lg shadow-primary-600/50"
            >
              <Download size={20} />
              Download Resume
            </motion.button>
          </motion.div>

          {/* Contact Form */}
          <motion.div variants={fadeInUp} className="space-y-6">
            <h3 className="text-2xl font-bold text-white mb-6">Send a Message</h3>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-gray-400 text-sm mb-2">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-600 transition-colors duration-300"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-400 text-sm mb-2">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-600 transition-colors duration-300"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label htmlFor="message" className="block text-gray-400 text-sm mb-2">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-primary-500 transition-colors resize-none"
                  placeholder="Your message..."
                ></textarea>
              </div>
              {submitStatus === "success" && (
                <div className="p-3 bg-primary-600/20 border border-primary-600/50 rounded-lg text-primary-400 text-sm">
                  Your email client should open shortly!
                </div>
              )}
              <motion.button
                type="submit"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="w-full px-8 py-4 bg-primary-600 text-white font-semibold rounded-lg hover:bg-primary-700 transition-all duration-300 shadow-lg shadow-primary-600/50"
              >
                Send Message
              </motion.button>
            </form>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
