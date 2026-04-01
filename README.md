<div align="center">
  <br />
  <h1>✨ Portfolio 2026</h1>
  <h3>Interactive Experience & Creative Development</h3>
  <br />
  
  ![License](https://img.shields.io/badge/license-MIT-blue.svg?style=flat-square)
  ![React](https://img.shields.io/badge/react-18.x-61DAFB?logo=react&logoColor=black&style=flat-square)
  ![Vite](https://img.shields.io/badge/vite-5.x-646CFF?logo=vite&logoColor=white&style=flat-square)
  ![Tailwind](https://img.shields.io/badge/tailwindcss-3.x-38B2AC?logo=tailwindcss&logoColor=white&style=flat-square)
  ![Framer Motion](https://img.shields.io/badge/motion-11.x-0055FF?logo=framer&logoColor=white&style=flat-square)

  <br />
  <p align="center">
    A high-performance, visually immersive portfolio engineered with modern web technologies. <br/>
    Featuring hardware-accelerated animations, physics-based interactions, and WebGL-like canvas rendering.
  </p>
</div>


<br />

## 🌟 Overview

This project represents the cutting edge of modern frontend development, prioritizing sub-millisecond load times and silky smooth 60fps rendering. It moves beyond traditional static portfolios to offer a dynamic, application-like experience.

## 🚀 Key Features

| Feature | Description |
|:--- |:--- |
| **🎨 Scrollytelling Canvas** | High-performance 2D context rendering synced to scroll progress, using off-screen buffering for tear-free animation. |
| **🔦 Spotlight Reveal** | Dynamic masking layer using CSS `mix-blend-mode` and reactive gradients that track mouse movements in real-time. |
| **🧲 Magnetic Interactions** | Custom physics-based magnetic field wrapper for UI elements, creating a tactile "sticky" feel. |
| **🍎 Inertial Scrolling** | Integrated `Lenis` for unified, apple-style smooth scrolling normalization across all devices. |
| **⚡ Performance First** | Built on Vite with React 18 Concurrent Mode, fully optimized for minimal layout thrashing. |

## 🛠️ Architecture & Tech Stack

This application utilizes a modern **Vite** powered **React** architecture.

-   **Core**: React 18
-   **Build Tool**: Vite (ESBuild)
-   **Styling**: Tailwind CSS (JIT) + CSS Variables
-   **Animation**: Framer Motion + Spring Physics
-   **Scroll**: Lenis + Custom Canvas Engine

## 📦 Installation

Ensure you have **Node.js 18+** installed.

```bash
# 1. Clone the repository
git clone https://github.com/nitin101/portfolio-2026.git

# 2. Navigate to project directory
cd portfolio-2026

# 3. Install dependencies
npm ci

# 4. Start the development server
npm run dev
```

## 🏗️ Project Structure

```
src/
├── components/          # 🧩 Atomic reusable UI components
│   ├── ScrollyCanvas.jsx    # Core scroll animation logic
│   ├── MagneticWrapper.jsx  # Physics interaction layer
│   └── ...
├── assets/              # 🖼️ Static assets (images, fonts)
└── App.jsx              # ⚛️ Root layout & Scroll Context
```

## 🤝 Contributing

Contributions are welcome! Please ensure that your pull requests adhere to the existing code style and maintain the performance budget.

1.  Fork the repository
2.  Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

<div align="center">
  <sub>Designed and Engineered by Nitin Tanwar</sub>
</div>
