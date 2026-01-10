# Portfolio 2026 - Interactive Experience

> A high-performance, visually immersive portfolio engineered with modern web technologies. This project showcases advanced frontend techniques including hardware-accelerated animations, physics-based interactions, and WebGL-like canvas rendering without the overhead of 3D libraries.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/react-18.x-61DAFB?logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/vite-5.x-646CFF?logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/tailwindcss-3.x-38B2AC?logo=tailwindcss&logoColor=white)
![Framer Motion](https://img.shields.io/badge/motion-11.x-0055FF?logo=framer&logoColor=white)

## 🏗️ Architecture & Tech Stack

This application is built on a **Vite** powered **React** architecture, prioritizing sub-millisecond load times and 60fps rendering performance.

### Core Stack
- **Runtime**: React 18 (Concurrent Mode enabled)
- **Bundler**: Vite (ESBuild for faster HMR)
- **Styling**: Tailwind CSS (JIT Engine) + Custom CSS Variables for dynamic themes
- **Animation**: Framer Motion (Orchestration & Gestures) + Spring Physics
- **Scroll System**: Lenis (Virtual Scroll) + Custom Scrollytelling Canvas

## 🚀 Key Features

### 1. Canvas-Based Scrollytelling
Instead of heavy video files, the background animation utilizes a **High-Performance Canvas Renderer (`ScrollyCanvas.jsx`)**. 
- **Technique**: Preloads a sequence of 75 high-res frames and renders them onto a 2D context synced to scroll progress.
- **Optimization**: Uses `requestAnimationFrame` and off-screen buffering to ensure tear-free rendering.
- **Physics**: Integrated `useSpring` hooks to interpolate frame indices, masking scroll jitter and simulating fluid momentum.

### 2. Spotlight Reveal System
The **About Section** implements a dynamic masking layer using CSS `mix-blend-mode` and reactive gradients.
- **Logic**: Tracks mouse coordinates in real-time via `useMotionValue`.
- **Performance**: Bypass React renders by directly manipulating the DOM style text node via Framer Motion's `useMotionTemplate`.

### 3. Magnetic & Physics Interactions
UI elements (buttons, cards, icons) feature a custom **Magnetic Field Wrapper (`MagneticWrapper.jsx`)**.
- **Behavior**: Elements resist cursor movement within a defined threshold using spring physics, creating a tactile "sticky" feel closer to native mobile apps than traditional web UIs.

### 4. Apple-Style Inertial Scrolling
Integrated **Lenis** for unified smooth scrolling normalization across devices.
- **Config**: Tuned damping (`0.1`) and duration (`1.2s`) to mimic macOS trackpad inertia on all input devices.

## 🛠️ Installation & Setup

Ensure you have **Node.js 18+** installed.

```bash
# Clone the repository
git clone https://github.com/yourusername/portfolio-2026.git

# Navigate to project root
cd portfolio-2026

# Install dependencies (utilizing npm ci for deterministic tree)
npm ci

# Start Development Server (HMR enabled)
npm run dev
```

## 📦 Build for Production

The production build pipeline optimizes assets, tree-shakes unused code, and generates a static distribution.

```bash
# Generate production build
npm run build

# Preview production build locally
npm run preview
```

## 📂 Project Structure

```
src/
├── components/        # Atomic reusable UI components
│   ├── ScrollyCanvas.jsx  # Core scroll animation engine
│   ├── MagneticWrapper.jsx# Physics interaction layer
│   └── ...
├── assets/           # Static assets (images, fonts)
└── App.jsx           # Root layout & Scroll Context Provider
public/
└── sequence/         # Scrollytelling frame assets (75 frames)
```

## 🤝 Contributing

Contributions are welcome. Please ensure all PRs adhere to the existing code style (ESLint + Prettier config provided) and maintain the animation performance budget (avoid layout thrashing in render loops).

---

**© 2026 Nitin Tanwar.** Engineered with precision.
