import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue } from 'framer-motion';
import MagneticWrapper from './MagneticWrapper';
import Experience3D from './Experience3D';

/**
 * Experience Component
 * 
 * A premium, Awwwards-style implementation of work history.
 * Features:
 * - 3D Journey Background (Three.js)
 * - Sticky sidebar layout for the title
 * - Cinematic scroll animations
 * - Holographic/Glassmorphism cards
 * - Magnetic interactive elements
 */
const Experience = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end end"]
    });

    const experiences = [
        {
            company: "Academic Avenger",
            role: "Frontend Intern",
            period: "July 2024 - Aug 2024",
            description: "Developed a demo website for Academic Avenger. Built with modern frontend technologies.",
            mainUrl: "https://academicavengers.com/",
            demoUrl: "https://academicavenger.onrender.com/",
            tech: ["React", "Tailwind", "Framer Motion"],
            internshipUrl: "/internship.pdf"
        },
        {
            company: "Novus Aegis AI",
            role: "Full Stack Developer",
            period: "Jan 2026 - Present",
            description: "Full-time position based in Texas, United States (Remote).",
            mainUrl: "",
            demoUrl: "",
            tech: [],
            internshipUrl: ""
        }
    ];

    return (
        <section ref={containerRef} id="experience" className="relative z-10 text-white">
            <Experience3D scrollYProgress={scrollYProgress} />
            <div className="max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-20">
                <div className="flex flex-col lg:flex-row gap-20">

                    {/* Sticky Title Section */}
                    <div className="lg:w-1/3">
                        <div className="lg:sticky lg:top-32">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="relative"
                            >
                                <span className="absolute -top-10 -left-10 text-[200px] font-bold text-white/[0.03] pointer-events-none select-none font-serif">
                                    02
                                </span>
                                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-[0.9] mb-8">
                                    <span className="block text-transparent bg-clip-text bg-gradient-to-br from-white to-white/50">WORK</span>
                                    <span className="block font-serif italic text-purple-400/90 font-light">History</span>
                                </h2>
                                <p className="text-gray-400 text-lg max-w-sm leading-relaxed border-l-2 border-purple-500/30 pl-6">
                                    A journey of building digital products with engineering precision and creative flair.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Scrollable Experience Cards */}
                    <div className="lg:w-2/3 space-y-16 lg:pt-20">
                        {experiences.map((exp, index) => (
                            <ExperienceCard key={index} data={exp} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const ExperienceCard = ({ data, index }) => {
    const cardRef = useRef(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    const handleMouseMove = ({ currentTarget, clientX, clientY }) => {
        const { left, top } = currentTarget.getBoundingClientRect();
        mouseX.set(clientX - left);
        mouseY.set(clientY - top);
    };

    return (
        <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 100 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1.0, ease: [0.22, 1, 0.36, 1], delay: index * 0.1 }}
            className="group relative"
            onMouseMove={handleMouseMove}
        >
            {/* Spotlight Border Effect */}
            <div className="absolute inset-0 rounded-3xl overflow-hidden pointer-events-none">
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                650px circle at ${mouseX}px ${mouseY}px,
                                rgba(147, 51, 234, 0.4),
                                transparent 80%
                            )
                        `
                    }}
                />
            </div>

            {/* Card Content Container */}
            <div className="relative p-[1px] rounded-3xl overflow-hidden">
                {/* Subtle static border */}
                <div className="absolute inset-0 rounded-3xl border border-white/5" />

                {/* Moving Spotlight Highlight on the border */}
                <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                        background: useMotionTemplate`
                            radial-gradient(
                                800px circle at ${mouseX}px ${mouseY}px,
                                rgba(255, 255, 255, 0.15),
                                transparent 40%
                            )
                        `
                    }}
                />

                <div className="relative p-10 rounded-3xl bg-neutral-900/40 backdrop-blur-xl group-hover:bg-neutral-900/30 transition-colors duration-500">
                    <div className="flex flex-col md:flex-row gap-10">
                        {/* Period (Left/Top) */}
                        <div className="md:w-1/4">
                            <span className="inline-block px-4 py-1.5 rounded-full border border-purple-500/20 bg-purple-500/5 text-purple-300 font-mono text-xs uppercase tracking-wider backdrop-blur-md">
                                {data.period}
                            </span>
                        </div>

                        {/* Content (Right) */}
                        <div className="md:w-3/4 space-y-6">
                            <div>
                                <h3 className="text-4xl font-bold text-white mb-2">{data.company}</h3>
                                <p className="text-xl text-gray-400 font-light italic">{data.role}</p>
                            </div>

                            <p className="text-gray-300 leading-relaxed text-lg">
                                {data.description}
                            </p>

                            {/* Tech Tags */}
                            <div className="flex flex-wrap gap-2">
                                {data.tech.map((tech, i) => (
                                    <span key={i} className="text-xs font-semibold text-gray-500 bg-white/5 px-3 py-1 rounded-md border border-white/5 transition-colors group-hover:border-white/10 group-hover:bg-white/10 group-hover:text-gray-300">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            {/* Actions */}
                            <div className="flex flex-wrap gap-4 pt-4">
                                {data.mainUrl && (
                                    <MagneticWrapper strength={0.2}>
                                        <a
                                            href={data.mainUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-white text-black font-semibold transition-transform hover:scale-105"
                                        >
                                            Visit Live Site
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                                        </a>
                                    </MagneticWrapper>
                                )}

                                {data.demoUrl && (
                                    <MagneticWrapper strength={0.2}>
                                        <a
                                            href={data.demoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                                        >
                                            View Demo
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                                        </a>
                                    </MagneticWrapper>
                                )}

                                {data.internshipUrl && (
                                    <MagneticWrapper strength={0.2}>
                                        <a
                                            href={data.internshipUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition-colors"
                                        >
                                            Internship Certificate
                                            <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                        </a>
                                    </MagneticWrapper>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Experience;
