import { motion, useSpring } from 'framer-motion';
import { useState } from 'react';
import { FaArrowRight } from 'react-icons/fa';

// Data for selected works
const projects = [
    {
        title: "Academic Avenger",
        category: "EdTech Platform",
        year: "2024",
        link: "https://academicavenger.onrender.com/",
        image: "/Screenshot (65).png"
    },


    {
        title: "CityWeatherHub",
        category: "Weather Application",
        year: "2025",
        link: "#"
    },

];

/**
 * Projects Component
 * 
 * Displays a list of selected works with a minimal, interactive design.
 * Features hover animations that shift text and rotate the arrow icon.
 */
const Projects = () => {
    const [hoveredProject, setHoveredProject] = useState(null);

    // Spring physics for smooth mouse following
    const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };
    const mouseX = useSpring(0, springConfig);
    const mouseY = useSpring(0, springConfig);

    const handleMouseMove = (e) => {
        const { clientX, clientY } = e;
        mouseX.set(clientX - 150); // Center offset
        mouseY.set(clientY - 100); // Center offset
    };

    return (
        <section id="projects" className="py-32 bg-transparent text-white relative z-10" onMouseMove={handleMouseMove}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-6xl md:text-8xl font-bold mb-20 tracking-tighter"
                >
                    Selected Work
                </motion.h2>

                {/* Project List */}
                <div className="flex flex-col" onMouseLeave={() => setHoveredProject(null)}>
                    {projects.map((project, index) => (
                        <motion.a
                            key={index}
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            onMouseEnter={() => setHoveredProject(index)}
                            className={`group border-t border-white/20 py-16 flex flex-col md:flex-row md:items-center justify-between transition-all duration-500 cursor-none ${hoveredProject !== null && hoveredProject !== index ? 'opacity-20 blur-[2px]' : 'opacity-100'}`}
                        >
                            {/* Project Number & Title */}
                            <div className="flex flex-col md:flex-row md:items-baseline md:gap-12 pointer-events-none">
                                <span className="text-gray-500 text-sm font-mono mb-2 md:mb-0">0{index + 1}</span>
                                <h3 className="text-4xl md:text-6xl font-medium tracking-tight group-hover:translate-x-4 transition-transform duration-500 ease-out">
                                    {project.title}
                                </h3>
                            </div>

                            {/* Project Meta & Arrow Icon */}
                            <div className="flex items-center gap-12 mt-4 md:mt-0 pointer-events-none">
                                <div className="text-right hidden md:block overflow-hidden">
                                    <motion.div
                                        variants={{
                                            hover: { y: -20 },
                                            initial: { y: 0 }
                                        }}
                                        className="relative transition-transform duration-500"
                                    >
                                        <p className="text-base font-bold uppercase tracking-wider text-white">{project.category}</p>
                                        <p className="text-gray-500 text-sm">{project.year}</p>
                                    </motion.div>
                                </div>
                                {/* Arrow rotates on hover */}
                                <div className="relative w-12 h-12 flex items-center justify-center rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition-all duration-500">
                                    <FaArrowRight className="text-xl transform -rotate-45 group-hover:rotate-0 transition-transform duration-500" />
                                </div>
                            </div>
                        </motion.a>
                    ))}
                    <div className="border-t border-white/20" />
                </div>
            </div>

            {/* Floating Image Reveal - Fixed to viewport to follow mouse globally within section */}
            <motion.div
                className="fixed top-0 left-0 pointer-events-none z-50 hidden md:block overflow-hidden rounded-lg bg-gray-800"
                style={{
                    width: 300,
                    height: 200,
                    x: mouseX,
                    y: mouseY,
                }}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{
                    opacity: hoveredProject !== null ? 1 : 0,
                    scale: hoveredProject !== null ? 1 : 0.5,
                }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
                {/* Placeholder for project image - swap logic when images exist */}
                <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-900 to-black text-white/50 font-mono text-sm overflow-hidden">
                    {hoveredProject !== null && projects[hoveredProject] && projects[hoveredProject].image ? (
                        <img
                            src={projects[hoveredProject].image}
                            alt={projects[hoveredProject].title}
                            className="w-full h-full object-cover opacity-90"
                        />
                    ) : (
                        <span className="p-4 text-center">{hoveredProject !== null ? "View Project" : ""}</span>
                    )}
                </div>
            </motion.div>
        </section>
    );
};

export default Projects;
