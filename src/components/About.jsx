import { useRef, useState } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaNodeJs, FaGitAlt, FaGithub, FaNpm, FaFigma, FaRocket, FaLinux } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiFramer, SiExpress, SiMongodb, SiVite, SiVercel } from 'react-icons/si';

import MagneticWrapper from './MagneticWrapper';
import TechCube from './TechCube';

/**
 * ScrollRevealWord Component
 * A helper component that applies a cinematic blur effect to individual words
 * as the user scrolls.
 */
const ScrollRevealWord = ({ text, range, progress }) => {
    // Cinematic Blur: Fade in + Blur out + Slide up
    const opacity = useTransform(progress, range, [0, 1]); // Fade in
    const blur = useTransform(progress, range, ["8px", "0px"]); // Despeckle blur
    const y = useTransform(progress, range, [20, 0]); // Slide up

    return (
        <span className="inline-block align-bottom pb-1 mx-1">
            <motion.span
                style={{ opacity, filter: `blur(${blur})`, y, display: "inline-block" }}
            >
                {text}
            </motion.span>
        </span>
    );
};

/**
 * About Component - Spotlight Reveal Edition
 * 
 * Features:
 * - "Spotlight" effect: A mouse-following gradient reveals the scrolly background.
 * - Premium Typography Bio: "I'm Nitin Tanwar..."
 * - Glassmorphism Timeline: Cleaned up for better contrast against the dynamic background.
 */
const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"]
    });

    // Spotlight Mouse Tracking with Spring Smoothing
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const smoothMouseX = useSpring(mouseX, { stiffness: 500, damping: 30 });
    const smoothMouseY = useSpring(mouseY, { stiffness: 500, damping: 30 });

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    // Dynamic Background Gradient
    const background = useMotionTemplate`radial-gradient(
        600px circle at ${smoothMouseX}px ${smoothMouseY}px,
        rgba(0, 0, 0, 0.1),
        rgba(0, 0, 0, 0.7) 40%
    )`;

    // Timeline Data
    const timelineData = [
        {
            year: "The Foundation",
            title: "Where it all started",
            description: "Building the web structure and style.",
            items: [
                { name: "HTML", icon: <FaHtml5 />, color: "#E34F26" },
                { name: "CSS", icon: <FaCss3Alt />, color: "#1572B6" },
                { name: "JavaScript", icon: <SiJavascript />, color: "#F7DF1E" },
            ]
        },
        {
            year: "Frontend Mastery",
            title: "Crafting Interactions",
            description: "Creating dynamic and responsive user interfaces.",
            items: [
                { name: "React", icon: <FaReact />, color: "#61DAFB" },
                { name: "Tailwind", icon: <SiTailwindcss />, color: "#06B6D4" },
                { name: "Bootstrap", icon: <FaBootstrap />, color: "#7952B3" },
                { name: "Figma", icon: <FaFigma />, color: "#F24E1E" },
                { name: "Framer Motion", icon: <SiFramer />, color: "#0055FF" },
            ]
        },
        {
            year: "Full Stack Integration",
            title: "Powering the Logic",
            description: "Handling data and server-side operations.",
            items: [
                { name: "Node.js", icon: <FaNodeJs />, color: "#339933" },
                { name: "Express.js", icon: <SiExpress />, color: "#000000" },
                { name: "MongoDB", icon: <SiMongodb />, color: "#47A248" },
                { name: "Linux", icon: <FaLinux />, color: "#000000" },
            ]
        },
        {
            year: "Professional Tooling",
            title: "DevOps & Design",
            description: "Tools that streamline workflow and deployment.",
            items: [
                { name: "Git", icon: <FaGitAlt />, color: "#F05032" },
                { name: "GitHub", icon: <FaGithub />, color: "#181717" },
                { name: "npm", icon: <FaNpm />, color: "#CB3837" },
                { name: "Vite", icon: <SiVite />, color: "#646CFF" },
                { name: "Vercel", icon: <SiVercel />, color: "#000000" },
                { name: "Antigravity", icon: <FaRocket />, color: "#9333EA" },
            ]
        }
    ];

    return (
        <section
            ref={containerRef}
            id="about"
            className="relative py-32 overflow-hidden text-white font-['Inter']"
            onMouseMove={handleMouseMove}
        >
            {/* Spotlight Overlay Layer */}
            <motion.div
                className="absolute inset-0 z-0 pointer-events-none transition-opacity duration-500"
                style={{ background }}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
            />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

                {/* Intro / Bio Section */}
                <div className="mb-32 text-center max-w-4xl mx-auto">

                    {/* Restored ScrollRevealWord Title */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="mb-12"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight flex justify-center flex-wrap gap-x-3 gap-y-1">
                            {/* Anchor: "From" is always visible */}
                            <span className="inline-block">From</span>

                            {/* Animated Words triggered by scroll progress */}
                            {[
                                { text: "Curiosity", range: [0.2, 0.3] },
                                { text: "to", range: [0.35, 0.45] },
                                { text: "Code", range: [0.5, 0.6] }
                            ].map((word, index) => (
                                <ScrollRevealWord
                                    key={index}
                                    text={word.text}
                                    range={word.range}
                                    progress={scrollYProgress}
                                />
                            ))}

                            {/* Anchor: "(Tech Stack)" is always visible */}
                            <span className="inline-block text-gray-400 font-medium">(Tech Stack)</span>
                        </h2>
                    </motion.div>

                </div>

                {/* Timeline Items */}
                <div className="space-y-24">
                    {timelineData.map((phase, index) => (
                        <motion.div
                            key={index}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: "-100px" }}
                            variants={{
                                hidden: { opacity: 0, y: 50 },
                                visible: {
                                    opacity: 1,
                                    y: 0,
                                    transition: { duration: 0.8, staggerChildren: 0.2 }
                                }
                            }}
                            className={`flex flex-col md:flex-row items-center justify-between gap-12 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                        >
                            {/* Text Content */}
                            <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'text-left md:text-right' : 'text-left'}`}>
                                <h3 className="text-4xl font-bold text-white mb-2">{phase.year}</h3>
                                <h4 className="text-2xl font-semibold text-purple-400 mb-4">{phase.title}</h4>
                                <p className="text-gray-400 text-lg leading-relaxed">{phase.description}</p>
                            </div>

                            {/* Center Connector (Hidden on Mobile) */}
                            <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full border border-white/10 bg-black/50 backdrop-blur-sm relative z-10">
                                <div className="w-3 h-3 rounded-full bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.5)]" />
                            </div>

                            {/* Skills Grid */}
                            <div className="w-full md:w-5/12">
                                <div className={`grid grid-cols-3 gap-6 ${index % 2 === 0 ? 'justify-items-start' : 'justify-items-end'}`}>
                                    {phase.items.map((item, i) => (
                                        <MagneticWrapper key={i} strength={0.3}>
                                            <motion.div
                                                className="flex flex-col items-center gap-4 group cursor-pointer"
                                                variants={{
                                                    hidden: { opacity: 0, scale: 0 },
                                                    visible: { opacity: 1, scale: 1 }
                                                }}
                                            >
                                                {/* RESTORED TECH CUBE */}
                                                <TechCube icon={item.icon} color={item.color} />
                                                <span className="text-xs font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                                                    {item.name}
                                                </span>
                                            </motion.div>
                                        </MagneticWrapper>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
