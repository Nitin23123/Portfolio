import { useRef } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate, useMotionValue, useSpring } from 'framer-motion';
import MagneticWrapper from './MagneticWrapper';
import Experience3D from './Experience3D';

/**
 * Experience Component
 * 
 * "Parallax Glass" Implementation
 * Features:
 * - Deep 3D Tilt Interaction
 * - Parallax Depth Layers (Content floats above background)
 * - Premium Frosted Glass Aesthetic
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
        <section ref={containerRef} id="experience" className="relative z-10 text-white min-h-screen">
            <Experience3D scrollYProgress={scrollYProgress} />

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 relative z-20">
                <div className="flex flex-col lg:flex-row gap-16">

                    {/* Left Panel: Sticky Title */}
                    <div className="lg:w-1/3">
                        <div className="lg:sticky lg:top-32 space-y-8">
                            <motion.div
                                initial={{ opacity: 0, x: -50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                                className="relative mix-blend-difference"
                            >
                                <span className="absolute -top-12 -left-12 text-[120px] font-bold text-white/[0.05] pointer-events-none select-none font-mono">
                                    02
                                </span>
                                <h2 className="text-6xl md:text-8xl font-bold tracking-tighter leading-none mb-6">
                                    <span className="block text-white">WORK</span>
                                    <span className="block font-mono text-white/50 text-4xl mt-2 tracking-widest border-b border-white/20 pb-4">HISTORY</span>
                                </h2>
                                <p className="text-gray-400 text-lg max-w-sm leading-relaxed border-l-2 border-white/20 pl-6 backdrop-blur-sm bg-black/50 py-4">
                                    Architecting digital solutions.
                                </p>
                            </motion.div>
                        </div>
                    </div>

                    {/* Right Panel: Parallax Cards */}
                    <div className="lg:w-2/3 relative space-y-24">
                        {experiences.map((exp, index) => (
                            <ParallaxCard key={index} data={exp} index={index} />
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};

const ParallaxCard = ({ data, index }) => {
    const ref = useRef(null);

    // Mouse tracking for tilt
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics for tilt
    const mouseXSpring = useSpring(x);
    const mouseYSpring = useSpring(y);

    const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["15deg", "-15deg"]);
    const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-15deg", "15deg"]);

    const handleMouseMove = (e) => {
        const rect = ref.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;
        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        x.set(0);
        y.set(0);
    };

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: index * 0.1 }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            style={{
                top: "100px",
                transformStyle: "preserve-3d",
                rotateX,
                rotateY,
            }}
            className="relative group w-full perspective-1000"
        >
            {/* Background Layer (Deepest) */}
            <div
                style={{ transform: "translateZ(0px)" }}
                className="absolute inset-0 bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl shadow-2xl transition-all duration-300 group-hover:border-white/30"
            />

            {/* Glow/Sheen Effect */}
            <div
                style={{ transform: "translateZ(20px)" }}
                className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
            />

            {/* Content Layer (Floats above background) */}
            <div style={{ transform: "translateZ(50px)" }} className="relative p-8 md:p-12">
                <div className="flex flex-col md:flex-row gap-8 items-start">

                    {/* Floating Date Tag */}
                    <div className="md:w-auto">
                        <div style={{ transform: "translateZ(30px)" }} className="inline-block px-4 py-2 border border-white/20 bg-black/50 backdrop-blur-md rounded-lg mx-auto md:mx-0 shadow-lg">
                            <span className="font-mono text-sm tracking-widest text-white/90 font-bold">{data.period}</span>
                        </div>
                    </div>

                    <div className="space-y-6 flex-1">
                        <div>
                            {/* Company Name with Lift */}
                            <h3 style={{ transform: "translateZ(20px)" }} className="text-4xl font-black text-white mb-2 uppercase tracking-tighter mix-blend-overlay group-hover:mix-blend-normal transition-all">
                                {data.company}
                            </h3>
                            <p style={{ transform: "translateZ(15px)" }} className="text-xl text-gray-400 font-mono tracking-wide">
                                {data.role}
                            </p>
                        </div>

                        <p className="text-gray-300 leading-relaxed font-light text-lg">
                            {data.description}
                        </p>

                        {/* Tech Stack Bubbles */}
                        <div style={{ transform: "translateZ(25px)" }} className="flex flex-wrap gap-2">
                            {data.tech.map((tech, i) => (
                                <span key={i} className="px-4 py-2 rounded-full text-xs font-bold text-black bg-white/80 backdrop-blur-sm border border-transparent hover:scale-110 transition-transform cursor-crosshair">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        {/* Action Buttons */}
                        <div style={{ transform: "translateZ(40px)" }} className="flex flex-wrap gap-4 pt-4">
                            {data.mainUrl && (
                                <MagneticWrapper strength={0.2}>
                                    <a href={data.mainUrl} target="_blank" rel="noopener noreferrer"
                                        className="px-8 py-4 bg-white text-black font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors rounded-xl shadow-lg hover:shadow-white/20">
                                        Launch Project
                                    </a>
                                </MagneticWrapper>
                            )}
                            {data.demoUrl && (
                                <MagneticWrapper strength={0.2}>
                                    <a href={data.demoUrl} target="_blank" rel="noopener noreferrer"
                                        className="px-8 py-4 border border-white/50 text-white font-bold uppercase tracking-wider hover:bg-white hover:text-black transition-all rounded-xl backdrop-blur-sm">
                                        Demo
                                    </a>
                                </MagneticWrapper>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default Experience;
