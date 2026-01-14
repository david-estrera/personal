# Portfolio Website

A modern, responsive portfolio website built with Next.js 14, featuring Apple-style scroll animations, dark mode design, and a green primary color scheme.

## Features

- 🎨 **Apple-Style Scroll Animations** - Smooth parallax effects and reveal animations
- 📱 **Fully Responsive** - Mobile-first design optimized for all devices
- 🎯 **Green Primary Color** - Consistent green accent throughout
- ⚡ **Performance Optimized** - Fast loading and smooth animations
- 🌙 **Dark Mode** - Beautiful dark theme with subtle glows

## Tech Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React

## Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. Install dependencies:
```bash
npm install
```

2. Run the development server:
```bash
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) in your browser

### Build for Production

```bash
npm run build
npm start
```

## Project Structure

```
portfolio-website/
├── app/
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Main page
│   └── globals.css         # Global styles
├── components/
│   ├── Navbar.tsx          # Navigation bar
│   ├── Hero.tsx            # Hero section
│   ├── About.tsx           # About section
│   ├── Projects.tsx         # Projects showcase
│   ├── Skills.tsx           # Skills section
│   ├── Experience.tsx      # Work experience
│   ├── Contact.tsx         # Contact form
│   ├── Footer.tsx          # Footer
│   └── ScrollIndicator.tsx # Scroll progress
├── lib/
│   └── animations.ts       # Animation variants
├── data/
│   └── projects.ts         # Projects data
└── public/                 # Static assets
```

## Customization

- Update project data in `data/projects.ts`
- Modify colors in `tailwind.config.ts`
- Adjust animations in `lib/animations.ts`

## License

MIT License
