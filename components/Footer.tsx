import { Github, Linkedin, Mail } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      icon: Github,
      href: "https://github.com/david-estrera",
      label: "GitHub",
    },
    {
      icon: Linkedin,
      href: "https://www.linkedin.com/in/david-estrera",
      label: "LinkedIn",
    },
    {
      icon: Mail,
      href: "mailto:davidestrera.work@gmail.com",
      label: "Email",
    },
  ];

  return (
    <footer className="border-t border-line py-10 px-4 sm:px-6 lg:px-8 pb-28 sm:pb-32">
      <div className="max-w-content mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-ink-faint text-sm text-center sm:text-left">
          © {currentYear} David Estrera
        </p>
        <div className="flex items-center gap-4">
          {socialLinks.map((social) => {
            const Icon = social.icon;
            return (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-ink-faint hover:text-primary-500 transition-colors cursor-pointer"
                aria-label={social.label}
              >
                <Icon size={18} aria-hidden="true" />
              </a>
            );
          })}
        </div>
      </div>
    </footer>
  );
}
