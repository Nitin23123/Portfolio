import { motion } from 'framer-motion';
import { FaArrowRight } from 'react-icons/fa';

// Data for selected works
const projects = [
    {
        title: "E-Commerce Dashboard",
        category: "Web Application",
        year: "2025",
        link: "#"
    },
    {
        title: "Portfolio Website",
        category: "Design & Dev",
        year: "2026",
        link: "#"
    }
];

/**
 * Projects Component
 * 
 * Displays a list of selected works with a minimal, interactive design.
 * Features hover animations that shift text and rotate the arrow icon.
 */
const Projects = () => {
    return (
        <section id="projects" className="py-32 bg-transparent text-white">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <motion.h2
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-5xl font-bold mb-20 tracking-tight"
                >
                    Selected Work
                </motion.h2>

                {/* Project List */}
                <div className="flex flex-col">
                    {projects.map((project, index) => (
                        <motion.a
                            key={index}
                            href={project.link}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="group border-t border-gray-200 py-12 flex flex-col md:flex-row md:items-center justify-between hover:bg-gray-50 transition-colors duration-300"
                        >
                            {/* Project Number & Title */}
                            <div className="flex flex-col md:flex-row md:items-baseline md:gap-8">
                                <span className="text-gray-400 text-sm font-mono mb-2 md:mb-0">0{index + 1}</span>
                                <h3 className="text-4xl md:text-5xl font-medium tracking-tight group-hover:translate-x-2 transition-transform duration-300">
                                    {project.title}
                                </h3>
                            </div>

                            {/* Project Meta & Arrow Icon */}
                            <div className="flex items-center gap-8 mt-4 md:mt-0">
                                <div className="text-right hidden md:block">
                                    <p className="text-sm font-bold uppercase tracking-wider">{project.category}</p>
                                    <p className="text-gray-500 text-sm">{project.year}</p>
                                </div>
                                {/* Arrow rotates 45degs on hover */}
                                <FaArrowRight className="text-2xl transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                            </div>
                        </motion.a>
                    ))}
                    <div className="border-t border-gray-200" />
                </div>
            </div>
        </section>
    );
};

export default Projects;
