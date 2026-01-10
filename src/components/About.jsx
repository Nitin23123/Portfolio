import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { FaHtml5, FaCss3Alt, FaReact, FaBootstrap, FaNodeJs, FaGitAlt, FaGithub, FaNpm, FaFigma, FaRocket, FaLinux } from 'react-icons/fa';
import { SiJavascript, SiTailwindcss, SiFramer, SiExpress, SiMongodb, SiVite, SiVercel } from 'react-icons/si';

import MagneticWrapper from './MagneticWrapper';
import TechCube from './TechCube';

// Helper component for word-level scroll reveal
// Helper component for word-level scroll reveal (Cinematic Blur Effect)
const ScrollRevealWord = ({ text, range, progress }) => {
    // Cinematic Blur: Fade in + Blur out + Slide up
    const opacity = useTransform(progress, range, [0, 1]);
    const blur = useTransform(progress, range, ["8px", "0px"]);
    const y = useTransform(progress, range, [20, 0]);

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

const About = () => {
    const containerRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end end"] // Start drawing when section enters, finish when it ends
    });
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
        <section ref={containerRef} id="about" className="py-20 bg-white text-black font-['Inter'] relative overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="text-center mb-20"
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-4 tracking-tight flex justify-center flex-wrap gap-x-3 gap-y-1">
                        {/* Anchor: "From" is always visible */}
                        <span className="inline-block">From</span>

                        {/* Animated Words */}
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
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                        From the basics to advanced architectural systems.
                    </p>
                </motion.div>

                {/* Robust Story Line (Energy Beam) */}
                <div className="absolute left-1/2 transform -translate-x-1/2 h-full top-32 bottom-0 hidden md:block w-1 bg-gray-100/50 rounded-full overflow-hidden">
                    <motion.div
                        className="w-full h-full bg-gradient-to-b from-blue-500 via-purple-500 to-pink-500 origin-top"
                        style={{ scaleY: scrollYProgress }}
                    />
                </div>

                {/* Ambient Particles Background */}
                <div className="absolute inset-0 overflow-hidden pointer-events-none">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className={`absolute rounded-full ${i % 3 === 0 ? 'bg-blue-400' : i % 3 === 1 ? 'bg-purple-400' : 'bg-pink-400'}`}
                            initial={{
                                x: Math.random() * 100 + "%",
                                y: Math.random() * 100 + "%",
                                opacity: 0.1 + Math.random() * 0.2,
                                scale: 0.5 + Math.random() * 1
                            }}
                            animate={{
                                y: [null, Math.random() * -30 - 20, null],
                                opacity: [null, 0.3, null]
                            }}
                            transition={{
                                duration: 5 + Math.random() * 10,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{ width: Math.random() * 6 + 2, height: Math.random() * 6 + 2 }}
                        />
                    ))}
                </div>

                <div className="space-y-24 relative z-10">
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
                                    transition: {
                                        duration: 0.8,
                                        staggerChildren: 0.2 // Stagger text and skills
                                    }
                                }
                            }}
                            className={`flex flex-col md:flex-row items-center justify-between gap-8 ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}
                        >
                            {/* Text Content */}
                            <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'text-left md:text-right' : 'text-left'}`}>
                                <motion.h3
                                    variants={{
                                        hidden: { opacity: 0, x: index % 2 === 0 ? -20 : 20 },
                                        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                                    }}
                                    className="text-2xl font-bold text-gray-900 mb-2"
                                >
                                    {phase.year}
                                </motion.h3>
                                <motion.h4
                                    variants={{
                                        hidden: { opacity: 0, x: index % 2 === 0 ? -20 : 20 },
                                        visible: { opacity: 1, x: 0, transition: { duration: 0.5 } }
                                    }}
                                    className="text-xl font-semibold text-gray-700 mb-2"
                                >
                                    {phase.title}
                                </motion.h4>
                                <motion.p
                                    variants={{
                                        hidden: { opacity: 0, y: 10 },
                                        visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
                                    }}
                                    className="text-gray-500"
                                >
                                    {phase.description}
                                </motion.p>
                            </div>

                            {/* Story Node (Checkpoint) */}
                            <motion.div
                                className="relative items-center justify-center w-10 h-10 rounded-full bg-white border-2 border-gray-200 z-10 hidden md:flex shadow-lg"
                                whileInView={{
                                    scale: 1.2,
                                    borderColor: "#8B5CF6",
                                    boxShadow: "0 0 20px rgba(139, 92, 246, 0.5)"
                                }}
                                viewport={{ margin: "-50% 0px -50% 0px" }}
                                transition={{ duration: 0.5 }}
                            >
                                {/* Pulse Effect */}
                                <motion.div
                                    className="absolute inset-0 rounded-full border border-purple-500"
                                    initial={{ scale: 1, opacity: 0 }}
                                    whileInView={{
                                        scale: 2.5,
                                        opacity: [0.5, 0]
                                    }}
                                    viewport={{ margin: "-50% 0px -50% 0px" }}
                                    transition={{
                                        duration: 1.5,
                                        repeat: Infinity,
                                        delay: 0.5
                                    }}
                                />
                                <motion.div
                                    className="w-4 h-4 rounded-full bg-gray-300"
                                    whileInView={{ backgroundColor: "#8B5CF6" }}
                                    viewport={{ margin: "-50% 0px -50% 0px" }}
                                />
                            </motion.div>

                            {/* Icons Grid (Skill Generation) */}
                            <motion.div
                                className="w-full md:w-5/12"
                                variants={{
                                    // Start from center (simulate emerging from line)
                                    hidden: { opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.8 },
                                    visible: {
                                        opacity: 1,
                                        x: 0,
                                        scale: 1,
                                        transition: {
                                            type: "spring",
                                            bounce: 0.4,
                                            duration: 1,
                                            delayChildren: 0.3,
                                            staggerChildren: 0.1
                                        }
                                    }
                                }}
                            >
                                <div className="grid grid-cols-3 gap-6 justify-items-center">
                                    {phase.items.map((item, i) => (
                                        <MagneticWrapper strength={0.3}>
                                            <motion.div
                                                className="flex flex-col items-center gap-4 group cursor-pointer"
                                                variants={{
                                                    hidden: { opacity: 0, scale: 0 },
                                                    visible: { opacity: 1, scale: 1 }
                                                }}
                                            >
                                                <TechCube icon={item.icon} color={item.color} />
                                                <span className="text-xs font-medium text-gray-400 group-hover:text-black transition-colors duration-300">
                                                    {item.name}
                                                </span>
                                            </motion.div>
                                        </MagneticWrapper>
                                    ))}
                                </div>
                            </motion.div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default About;
